import { AI_DEV_GUIDE } from "./ai-dev-guide.ts";
import { aiDevLab } from "./ai-dev-lab.ts";
import { readinessStep, readinessChapters } from "./ai-readiness.ts";
import { buildReadinessBrief } from "../../client/src/lib/ai-trial.ts";
import { AI_STALEMATE_GUIDE_PAGES } from "./ai-guide.ts";
import { FIELD_LABS } from "./labs.ts";
export type Audience = "pm" | "lead-dev";

// The two paths share evidence standards, but each speaks to one reader.
export function aiGuideFor(audience: Audience) {
  if (audience === "lead-dev") return structuredClone(AI_DEV_GUIDE);
  const pages = structuredClone(AI_STALEMATE_GUIDE_PAGES);
  const pm = audience === "pm";
  pages[0].title = pm
    ? "You think AI could help. Your lead has questions."
    : "Your PM wants to try AI. You have questions.";
  pages[0].intro = pm
    ? "You see work waiting, customers chasing, and tools that might help. Your lead sees responsibilities you may not. Let’s share the bigger picture and ask whether you’re willing to explore a better way together."
    : "Your PM sees possibilities in AI. You will help turn an idea into something the team can build and support. Let’s understand the business pressure, explain your concerns, and help choose a worthwhile next step together.";
  pages[0].sections[0].body = pm
    ? "A useful repair-request workflow keeps slipping while support staff copy everything twice. You hear what that costs them in customer conversations your lead may not attend. Bring that context, and own any gaps in scope or decisions that are slowing the team down."
    : "Ask why the work matters now. A repair-request workflow keeps slipping while support staff copy everything twice. Your PM may have customer or leadership context you haven’t heard. Share what you see slowing delivery too.";
  pages[0].sections[1].body = pm
    ? "Ask what your lead finds hardest about the change. Is it extra work, another rushed promise, a tool they don’t trust, or something else? Hear their answer before trying to solve it. You’re inviting them to help shape the approach."
    : "Be specific about what worries you: review capacity, reliability, maintenance, or what this means for your work. You don’t have to defend every part of today’s process to care about quality. Say what you would be willing to explore.";
  pages[1].callout = pm
    ? "Try: ‘We keep pushing this back, and people are still doing the work by hand. Are you willing to explore some different tools or ways of working with me? I’d like us to choose something useful to learn.’"
    : "Try: ‘I can see why waiting matters. Could you share what you’ve heard from users? Then let’s choose something worth trying and make room for the team to learn it properly.’";
  pages[2].callout = pm
    ? "Try: ‘I’m excited about the possibility, but I don’t need my first idea to win. What would be worth exploring together?’"
    : "Try: ‘I care about the quality of what we build. I’m willing to explore a different approach. Could we agree what we want to learn and what support the team gets?’";
  pages[3].title = pm
    ? "Before you talk with your lead."
    : "Before you talk with your product manager.";
  pages[3].sections[2].body = pm
    ? "AI can be exciting. Be honest about that, then ask whose problem you are solving. Cool toys without a useful problem don’t help anyone. Include the business context your lead hasn’t heard and why the team’s growth matters to you."
    : "What parts of engineering give you pride? What do you worry about losing, and what would you like to learn? Those questions can sit alongside concrete concerns about the software. You don’t have to speak for everyone on the team.";
  pages[4].intro = pm
    ? "Work out the experiment with your lead. Bring the user problem, the business context, and room for their ideas. Ask what the team wants to learn. Use what you already know before setting up another test."
    : "Work out the experiment with your PM. Help choose the task, tool, and review approach. Ask for the business context and agree time, training, and a usage budget. You can propose a different approach if it would teach you more.";
  pages[5].intro = pm
    ? "Start with the benefit users and the business might get, then the team effort it would take. These invented estimates show one way to compare options. They are not measured savings or evidence that AI caused an improvement."
    : "Help your PM estimate the whole team’s effort, including review and fixes. Ask how the expected business value was estimated. These invented numbers compare options; they don’t rank developers or prove an AI productivity gain.";
  pages[7].intro = pm
    ? "Fictional case: support staff keep entering repair requests twice while the replacement workflow slips. You want to explore AI and different ways of working. Your lead wants the team to be able to review and support what it builds."
    : "Fictional case: your PM wants to explore AI because a replacement repair workflow keeps slipping. You see review and support work that a quick demo won’t settle. You both want to find a useful way forward.";
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
  if (audience === "lead-dev") return aiDevLab();
  const base = FIELD_LABS["ai-stalemate"];
  const steps = structuredClone(base.steps);
  const pm = audience === "pm";
  steps[0].title = pm
    ? "Before you talk with your lead."
    : "Before you talk with your product manager.";
  steps[0].intro = pm
    ? "Let’s get your idea ready to talk through. What needs to get better, what could the team learn, and what would you like to understand from your lead? These notes are just for you."
    : "Let’s make room for what looks useful and what gives you pause. What would you want your PM to understand, and what do you need to ask them? These notes are just for you.";
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
        observed: "What have you seen or checked yourself?",
        prediction: "What do you think might happen but haven’t checked yet?",
        changeMind: "What would change your mind about this use of AI?",
        askOther: "What do you still need to ask your lead?",
      }
    : {
        happened:
          "What conversations have you and your PM already had, and where do things stand?",
        story: "What are you assuming about your PM's motives?",
        protecting: "What do you want to protect, improve, or learn?",
        why: "What would make this worth your time?",
        futurePicture:
          "If you and your product manager made this work, what could be better?",
        observed: "What have you seen happen when people do this work?",
        prediction:
          "What do you think could help or go wrong, but haven’t checked yet?",
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
        hint: "What would a customer notice? Describe something they could do more easily or reliably.",
      },
      {
        id: "visionCompany",
        label: "What could this mean for the company, your lead, and you?",
        hint: "What could you learn or help other teams do? Ask your lead what they’d like to make possible too. Keep hopes for career opportunities separate from promises you can make.",
      }
    );
  }
  steps[1].title = pm
    ? "Plan an experiment with your lead."
    : "Plan an experiment with your product manager.";
  steps[1].intro = pm
    ? "If an experiment would help, let’s plan it with your lead. What will you try, how much time will you spend, and what would make it worth doing again?"
    : "If an experiment would help, let’s plan it with your PM. Agree the task, time, and checks together before anyone starts.";
  steps[2].title = pm
    ? "What value did it create, and what did it take?"
    : "What helped, and what did the whole task take?";
  const qualityNotes = steps[2].fields.find(f => f.id === "quality");
  steps[2].fields.unshift({
    id: "valueAndEffort",
    label:
      "What value did users get, what did the team learn, and what did it cost?",
    type: "textarea",
    hint: "Keep estimates separate from measured results. You can compare estimated annual business value with total team hours, including product, design, engineering, and review. Record adoption, tool costs, and ongoing work. The minutes table below helps if your question is about task effort.",
  });
  if (qualityNotes) {
    qualityNotes.label =
      "What other problems, fixes, or review work should we know about?";
    qualityNotes.hint =
      "Use the checklist below for what you checked and what happened. Add other problems or what the reviewer found here.";
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
      hint: "Approval to run this experiment doesn’t automatically cover live customer systems, more data, or wider use. Name who would need to approve those changes.",
    }
  );
  steps[3].fields.push({
    id: "unresolvedPlan",
    label: "If no agreement is reached, what happens next?",
    type: "textarea",
    hint: "Name who can decide, what you’re allowed to do while waiting, and when you’ll ask again. Silence doesn’t mean yes.",
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
