import { readinessStep, readinessChapters } from "./ai-readiness.ts";
import { buildReadinessBrief } from "../../client/src/lib/ai-trial.ts";
import { AI_STALEMATE_GUIDE_PAGES } from "./ai-guide.ts";
import { FIELD_LABS } from "./labs.ts";
export type Audience = "pm" | "lead-dev";

// The two paths share evidence standards, but each speaks to one reader.
export function aiGuideFor(audience: Audience) {
  const pages = structuredClone(AI_STALEMATE_GUIDE_PAGES);
  const pm = audience === "pm";
  pages[0].title = pm
    ? "You think AI could help. Your lead has questions."
    : "Your PM wants to try AI. You have questions.";
  pages[0].intro = pm
    ? "You can see work AI might help with. Your lead is not convinced. Before trying to persuade them again, get specific about what you want to improve and ask what they would need to check."
    : "You may see something useful in your PM’s idea. You can also see code to check, mistakes to fix, and software someone will have to maintain. Explain those concerns in terms your PM can work with.";
  pages[0].sections[0].body = pm
    ? "Perhaps your support team copies repair requests into two systems, and customers have to call again when one is missed. Tell your lead about that problem. Ask whether an app would help and where AI might make the work easier."
    : "Ask your PM what they want to make better. Perhaps support staff copy repair requests into two systems and customers have to call again when one is missed. That gives you a specific problem to discuss.";
  pages[0].sections[1].body = pm
    ? "Your lead may need to check that the app cannot expose one customer’s records to another. They may also need someone to review the code. Ask what work your proposal adds and what would make it possible."
    : "Show your PM the concern: the app must prevent one customer from seeing another’s records, and someone needs time to review the code. Say what you would need to check and who could help.";
  pages[1].callout = pm
    ? "Try: ‘The team keeps copying these requests by hand. I think we could make that easier. Could we look at whether AI would help us build something useful? I’d like to understand what you’d need to check.’"
    : "Try: ‘I can see why you want to fix this. I’m worried about who could see the customer records. Can we work through that and make time for someone to check the code before we try it?’";
  pages[3].title = pm
    ? "Before you talk with your lead."
    : "Before you talk with your product manager.";
  pages[3].sections[2].body = pm
    ? "Describe who would benefit and why it matters to you. Include what your lead might not have heard in your conversations with customers or leadership."
    : "Describe the checks, review, and maintenance you would take responsibility for. Include what could be useful about the idea as well as what worries you.";
  pages[4].intro = pm
    ? "Work out the experiment with your lead. Bring the problem you want to solve and let their judgment change the plan. Use what you already know before asking the team to run another test."
    : "Plan the experiment with your product manager. Explain which task is suitable, what needs checking, and how much review time you need. Ask them to help agree what other work will wait.";
  pages[5].intro = pm
    ? "Ask about everyone’s work, including review and fixes. Two people working for 30 minutes use 60 person-minutes. A faster first draft is useful only if the finished work is worth the total time spent."
    : "Count your work and the reviewer’s work, including checks and fixes. Two people working for 30 minutes use 60 person-minutes. Give your PM the full picture of time and quality.";
  pages[7].intro = pm
    ? "Fictional case: your support team copies repair requests between two systems. You think an AI-assisted app could help. Your lead raises questions about who can see the customer records and how the team will check the code."
    : "Fictional case: your PM wants to help support staff stop copying repair requests between two systems. You see questions about who can see the customer records and whether the team can check and release the code safely.";
  pages.splice(4, 0, ...readinessChapters(audience));
  pages.forEach((page, index) => {
    page.eyebrow =
      String(index + 1).padStart(2, "0") +
      " / " +
      page.eyebrow.replace(/^\d+ \/ /, "");
  });
  return pages;
}
export function aiLabFor(audience: Audience) {
  const base = FIELD_LABS["ai-stalemate"];
  const steps = structuredClone(base.steps);
  const pm = audience === "pm";
  steps[0].title = pm
    ? "Before you talk with your lead."
    : "Before you talk with your product manager.";
  steps[0].intro = pm
    ? "You think AI could help. Your lead has questions. Take a moment to write down what you want to improve and what you still need to ask them."
    : "Your product manager wants to try AI. You may see a useful idea and some problems. Write down both before the conversation.";
  steps[0].fields = steps[0].fields.filter(f => f.id !== "side");
  const labels: Record<string, string> = pm
    ? {
        happened:
          "What conversations have you and your lead already had, and where do things stand?",
        story: "What are you assuming about your lead's motives?",
        protecting:
          "What do you want to make better for customers or the team?",
        why: "Why does that matter to you?",
        futurePicture:
          "If you and your lead made this work, what could be better?",
        observed: "What evidence have you seen yourself?",
        prediction: "What are you still predicting?",
        changeMind: "What would change your mind about this use of AI?",
        askOther: "What do you still need to ask your lead?",
      }
    : {
        happened:
          "What conversations have you and your PM already had, and where do things stand?",
        story: "What are you assuming about your PM's motives?",
        protecting: "What would you have to check, review, or look after?",
        why: "What would make this worth your time?",
        futurePicture:
          "If you and your product manager made this work, what could be better?",
        observed: "What have you seen happen when people do this work?",
        prediction: "What risk or benefit are you still predicting?",
        changeMind: "What would change your mind about this use of AI?",
        askOther:
          "What do you still need to ask your product manager about the request?",
      };
  for (const f of steps[0].fields) f.label = labels[f.id] ?? f.label;
  if (pm) {
    const future = steps[0].fields.find(f => f.id === "futurePicture");
    if (future)
      future.hint =
        "Optional: picture six months from now. What would be better for the team, product, company, and both of you? Expand the short prompts below if that helps.";
    steps[0].fields.push(
      {
        id: "visionTeam",
        section: "OPTIONAL / SIX MONTHS FROM NOW",
        label: "What would your team’s daily work and skills look like?",
        hint: "Picture a normal week: what can they do confidently, and what takes less effort? A sentence is enough.",
      },
      {
        id: "visionProduct",
        label: "What would be better for customers and the product?",
        hint: "Name a visible improvement rather than an AI adoption target.",
      },
      {
        id: "visionCompany",
        label: "What could this mean for the company, your lead, and you?",
        hint: "Possible standards, influence, learning, or career opportunities. Invite your lead to help shape this future; avoid promising rewards.",
      }
    );
  }
  steps[1].title = pm
    ? "Plan an experiment with your lead."
    : "Plan an experiment with your product manager.";
  steps[1].intro = pm
    ? "Work out the plan together. What will you try? How much time will you spend? What would make it worth doing again?"
    : "Work out the plan together. Agree what you expect, how long you will spend, and which checks the result must pass before starting.";
  steps[2].title = pm
    ? "Did it save time once everything was checked?"
    : "What did it take to get work you could approve?";
  const qualityNotes = steps[2].fields.find(f => f.id === "quality");
  if (qualityNotes) {
    qualityNotes.label = "Additional defects, rework, or reviewer experience";
    qualityNotes.hint =
      "Use the checklist below for expected and observed quality results. Record other defects or the reviewer's experience here.";
  }
  steps[3].title = pm
    ? "What will you do next?"
    : "What will you and your product manager do next?";
  steps[1].fields.push(
    {
      id: "decisionRights",
      label:
        "Optional: who needs to be involved in the decision to run this experiment?",
      type: "textarea",
      hint: "Name who brings the recommendation, who gives advice, whose approval is required, who makes the final call, and who does the work. Tell the people affected what was decided.",
    },
    {
      id: "deploymentPermission",
      label:
        "What permission would you need to use this in live software or with more people?",
      type: "textarea",
      hint: "Approval to run this experiment does not automatically cover live customer systems, more data, or wider use. Name who would need to approve those changes.",
    }
  );
  steps[3].fields.push({
    id: "unresolvedPlan",
    label: "If no agreement is reached, what happens next?",
    type: "textarea",
    hint: "Name who can decide, what you are allowed to do while waiting, and when you will ask again. Silence does not mean yes.",
  });
  steps.splice(1, 0, readinessStep(audience));
  return {
    ...base,
    steps,
    outputs: [
      {
        id: "readiness-brief",
        title: "Next Step Together",
        fromStep: 1,
        build: buildReadinessBrief,
      },
      ...(base.outputs ?? []).map(output => ({
        ...output,
        fromStep: output.fromStep + 1,
      })),
    ],
  };
}
