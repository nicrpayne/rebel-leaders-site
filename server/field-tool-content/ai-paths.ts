import { readinessStep, readinessChapters } from "./ai-readiness.ts";
import { buildReadinessBrief } from "../../client/src/lib/ai-trial.ts";
import { AI_STALEMATE_GUIDE_PAGES } from "./ai-guide.ts";
import { FIELD_LABS } from "./labs.ts";
export type Audience = "pm" | "lead-dev";

// The two paths share evidence standards, but each speaks to one reader.
export function aiGuideFor(audience: Audience) {
  const pages = structuredClone(AI_STALEMATE_GUIDE_PAGES);
  if (audience === "pm") {
    pages[0] = {
      ...pages[0],
      title: "You see an opportunity. Your lead sees a cost.",
      intro:
        "You want your team to move forward with AI. Your lead developer is not convinced. Before the next conversation, get specific about the outcome you want and curious about the work they would carry.",
      sections: [
        {
          title: "Start with the outcome you own",
          body: "What would improve for your customers or your team? Faster drafting is one possible means. Name the customer wait, repeated task, missed learning, or capacity problem you actually want to change.",
        },
        {
          title: "Ask your lead what they would carry",
          body: "Your lead is accountable for what ships: quality, maintainability, data boundaries, and review. Ask which part of your proposal adds work or risk. Their answer may reveal how to improve it.",
        },
        {
          title: "Keep the event separate from your story",
          body: "Your lead declined a trial using customer data. That is an observation. They are afraid of change is an interpretation. Take the observable event into the conversation and ask for their account.",
        },
        {
          title: "Make a proposal they can help shape",
          body: "Try: I want to reduce the full effort of accepted work. Where might AI help, and what would we need to protect? Give your lead authority over technical suitability and the acceptance bar.",
        },
      ],
      callout:
        "Your win: lead a worthwhile opportunity with your developer, then explain the decision to the organization with evidence.",
    };
    pages[1].intro =
      "Before asking your lead to try a tool, get clear about your own Why. Paint a future they can recognize, then invite them to improve the picture with you.";
    pages[1].sections[0].body =
      "As the PM, which customer or team outcome makes this worth pursuing? Name the problem, who experiences it, and why you care. Connect the AI proposal to that outcome.";
    pages[1].sections[3].body =
      "Ask your lead: What would responsible use look like here? What would you change in this picture? Let their judgment change the task, the conditions, and the approach.";
    pages[1].callout =
      "Try: If we can find a responsible way to reduce repetitive work, we could give the team more time for the hard problems. We could help this company set a standard other teams trust, and create opportunities for both of us. I'd like us to shape that together. What would make it worth pursuing for you?";
    pages[2].intro =
      "When your lead raises a concern, ask what it means in this workflow. These questions help you turn the concern into a condition or change your proposal. Your lead owns technical suitability; you help make the investment and tradeoff explicit.";
    pages[3].intro =
      "Take 5-10 minutes before you talk with your lead. These notes are yours. Get clear about your outcome and assumptions so you can arrive curious, with a proposal worth discussing.";
    pages[4].intro =
      "Invite your lead into about 30 minutes of shared design. Bring the outcome and make room for their conditions. Use existing evidence if it answers the question; ask for a trial when there is a useful uncertainty to resolve.";
    pages[4].sections[2].body =
      "Ask your lead to confirm the tool, model/version, permitted inputs, and approval owner. A leadership request does not grant permission to use an unapproved tool or sensitive inputs.";
    pages[4].sections[3].body =
      "Ask your lead to define acceptance checks. Agree an effort budget, timebox, rabbit holes, and what work moves to protect author and reviewer time. If the priority decision belongs to someone else, take that tradeoff to them.";
    pages[5].intro =
      "When the result comes back, ask about everyone's work. Count setup, verification, review, rework, and follow-up alongside drafting. You need accepted work at a defensible full cost to make a case to leadership.";
    pages[6].intro =
      "Review the evidence with your lead and the agreed decision owner. Explain what this particular test supports, what remains uncertain, and the next action you are asking the organization to support.";
    pages[7].intro =
      "Here is what you can take back to your boss after working with your lead. Faster drafting did not mean less total effort. Both leaders changed the proposal instead of defending their first positions.";
    pages[8].intro =
      "Use the Guide to prepare your judgment, then open your PM Lab to work the situation in front of you. Nic's walkthrough shows the same process on a realistic example.";
    pages[8].sections[0].body =
      "Open Private Prep in the PM Lab. Write what happened, your Why, the future you want to help create, and what you still need to ask your lead.";
  } else {
    pages[0] = {
      ...pages[0],
      title: "Your PM sees potential. You own what ships.",
      intro:
        "Your PM wants the team to use AI. You may see promise, but you also see the verification, review, and maintenance it creates. This is a way to make your judgment useful and help shape the opportunity.",
      sections: [
        {
          title: "Get specific about the outcome",
          body: "Ask your PM what they want to improve for customers or the team. Is the problem a customer wait, repeated work, missed learning, or constrained capacity? A clear outcome gives you something to evaluate.",
        },
        {
          title: "Name the cost you actually carry",
          body: "Point to the work or risk in this use: acceptance checks, missing codebase context, data boundaries, reviewer effort, or maintenance. Make your concern concrete enough to change the proposal.",
        },
        {
          title: "Check your story about the request",
          body: "Your PM asked for a trial by Friday. That is an event. They do not care about quality is an interpretation. Ask what is driving the request before treating your interpretation as their intent.",
        },
        {
          title: "Help author the approach",
          body: "Try: I can see why that outcome matters. Here is the use I would consider, the quality bar I would keep, and the capacity we would need. Your technical judgment can shape a better proposal.",
        },
      ],
      callout:
        "Your win: help the team learn where AI earns its place, protect the standards you own, and make a decision others can trust.",
    };
    pages[1].intro =
      "Get clear about the future you would want to help build. You can lead responsible adoption by connecting engineering judgment to a customer and team outcome your PM cares about.";
    pages[1].sections[0].body =
      "Which improvement would be worth your engineering attention? Less repetitive work, more time for design, faster reliable feedback, or practices other developers can trust? Say why you would invest in it.";
    pages[1].sections[3].body =
      "Ask your PM: Which outcome matters most? What would you change in this picture? Co-author the ambition and ask them to help protect the time needed to pursue it responsibly.";
    pages[1].callout =
      "Try: I'd like us to find the uses that actually improve accepted work. If we can make those practices trustworthy, we could help set the company's standard and give our team more room for the hard problems. That could create opportunities for both of us. Which outcome would make this worth pursuing from your side?";
    pages[2].intro =
      "Make your concerns useful to the PM. Describe where the proposed use breaks down, what condition could make it workable, or why the evidence already supports stopping. Ask for the priority tradeoff when capacity is the issue.";
    pages[3].intro =
      "Take 5-10 minutes before you meet your PM. Write the specific work you would protect, the outcome you could support, and what evidence would change your view.";
    pages[4].intro =
      "Spend about 30 minutes with your PM shaping one test you could trust. You bring technical suitability and acceptance checks; your PM helps clarify the outcome and the priority tradeoff.";
    pages[4].sections[2].body =
      "Confirm the approved tool, model/version, allowed inputs, and approval owner. If permission is missing, name exactly what must be resolved before work can start.";
    pages[4].sections[3].body =
      "Define the acceptance checks and accountable engineering owner. Set an effort budget and timebox, including protected author and reviewer time. Ask your PM to make the displaced work visible to the priority owner.";
    pages[5].intro =
      "Record the work you and the reviewer actually do, including checks, rework, and later defects. Give your PM a full picture of cost and quality that they can responsibly communicate.";
    pages[6].intro =
      "Review the evidence with your PM and the agreed decision owner. Be specific about what this use supports, what would need to change, and when another test would be worthwhile.";
    pages[7].intro =
      "Here is a decision you and your PM can both defend. AI drafted faster, but verification and review increased. Your observations changed the approach and gave leadership a concrete next move.";
    pages[8].intro =
      "Use this Guide to prepare your judgment, then open your Lead Developer Lab to work your actual situation. Nic's walkthrough demonstrates the same method on a realistic case.";
    pages[8].sections[0].body =
      "Open Private Prep in the Lead Developer Lab. Write the event, the cost you carry, your Why, the future you could help create, and what you still need to ask your PM.";
  }
  pages[3].callout =
    "You can reflect without typing. Any private notes you type stay only in this open tab: they are not saved by the Lab or included in shared exports. Refreshing or leaving the Lab clears them.";
  pages[8].sections.at(-1)!.body =
    "Shared drafts stay in this browser on this device. Private reflection stays only in the open tab and is not saved or exported. Export shared work before changing devices. There is no cloud synchronization.";
  if (audience === "pm") {
    pages[1].sections[1].body =
      "Optional: picture six months from now. What can the team do confidently? What is better for customers? What could responsible progress enable for the company, your lead, and you? One sentence for each is enough. Use the short vision prompts in Private Prep, then invite your lead to improve the picture.";
  }
  const privateStep = aiLabFor(audience).steps[0];
  pages[3].title = privateStep.title;
  const prompts = privateStep.fields.filter(
    f => !["why", "futurePicture", "prediction"].includes(f.id)
  );
  pages[3].sections = pages[3].sections.map((section, index) => ({
    ...section,
    title: prompts[index]?.label ?? section.title,
  }));
  pages[5].sections[0].title = "A separate effort example";
  pages[7] = {
    ...pages[7],
    title: "A worthwhile opportunity. Preparation first.",
    intro:
      audience === "pm"
        ? "Fictional case: your sponsor reports a costly delay. Your lead identifies unverified API permissions and gaps in the team's engineering practice. You bring both into one investment decision."
        : "Fictional case: your PM hears a costly delay from the sponsor. You identify unverified API permissions and gaps in the team's engineering practice. Together, you define what responsible progress requires.",
    sections: [
      {
        title: "The business context",
        body: "The sponsor estimates $500,000 per week in operational opportunity. The figure is not yet validated. The PM will clarify the assumptions with Finance. The team sees why the outcome matters.",
      },
      {
        title: "The system and team prerequisites",
        body: "Access roles and record boundaries across apps are unresolved. Routes need allowed/denied-access tests. Developers need pairing, qualified review, and practice explaining, testing, deploying, and rolling back a change.",
      },
      {
        title: "The Shared Next-Step Brief",
        body: "PREPARE FIRST. No production connection or agent write/deploy permissions. The data/security owner defines access policy. The engineering manager leads a supervised exercise. The PM protects capacity and validates the business assumptions.",
      },
      {
        title: "The Decision Brief",
        body: "PAUSE this proposed use. Review readiness next Tuesday, with access-test evidence and a demonstrated engineering workflow. Then decide whether an approved synthetic-data trial would answer a useful question.",
      },
      {
        title: "The update to leadership",
        body: "We propose preparation time to resolve access boundaries and build team readiness. This protects a worthwhile opportunity while making the conditions for responsible delivery explicit. No AI productivity result has been measured.",
      },
    ],
    callout:
      "They leave with a responsible investment and an accountable next move. The opportunity stays visible, and the prerequisites receive owners.",
  };
  pages[8].callout =
    "Use Load Examples in each Lab step to see the expected kind of answer. It replaces only that step. Watch Nic work a realistic case to see how the thinking connects.";
  pages[8].sections.splice(1, 0, {
    title: "2. Understand each other and choose a move",
    body: "Open Conversation. Share the outcome, ask what your counterpart is concerned about, and name what remains unresolved. Export the Shared Next-Step Brief as a proposal or an agreement. Clarifying, asking a specialist, preparing, reviewing evidence, testing, and stopping are all possible next moves.",
  });
  pages[8].sections[2].title = "3. Shape a Bet Brief when appropriate";
  pages[8].sections[3].title = "4. Return with evidence";
  pages[8].sections[4].title = "5. Write the decision";
  pages[8].sections[4].body =
    "Choose Continue, Revise, Stop, or Pause. A conversation or preparation decision can go straight to Decision without a trial. Name the reason, limits, next action, owner, date, and leadership update.";
  pages.splice(4, 0, ...readinessChapters(audience));
  pages.forEach((page, index) => {
    page.eyebrow =
      String(index + 1).padStart(2, "0") +
      " / " +
      page.eyebrow.replace(/^\d+ \/ /, "");
  });
  pages[1].callout =
    audience === "pm"
      ? "Optional 30-second opening - adapt it: I want us to find where AI could improve the work without moving hidden cost onto your team. Here is the outcome I care about. What would make it worthwhile from your side, and what should we protect? We can decide together whether the next move is preparation, a bounded bet, or stopping this use."
      : "Optional 30-second opening - adapt it: I want us to find responsible uses that improve delivery. Here are the risks and review costs I can see. Can we connect them to the outcome you need, agree what must be protected, and choose whether to prepare first, test a bounded use, or stop this proposal?";
  pages[7].callout +=
    " Approval for a bounded experiment does not authorize production deployment, new data access, or wider rollout. Name the owner and required approvals for each next decision.";
  return pages;
}
export function aiLabFor(audience: Audience) {
  const base = FIELD_LABS["ai-stalemate"];
  const steps = structuredClone(base.steps);
  const pm = audience === "pm";
  steps[0].title = pm
    ? "Let's get ready to talk with your lead."
    : "Let's get ready to talk with your PM.";
  steps[0].intro = pm
    ? "You have an opportunity in mind. Let's get clear about it and the questions you need to ask your lead."
    : "You carry the technical consequences. Let's make your judgment concrete and find the outcome you could help pursue.";
  steps[0].fields = steps[0].fields.filter(f => f.id !== "side");
  const labels: Record<string, string> = pm
    ? {
        happened:
          "What conversations have you and your lead already had, and where do things stand?",
        story: "What are you assuming about your lead's motives?",
        protecting: "What customer or team outcome are you trying to protect?",
        why: "Why does this improvement matter to you as the PM?",
        futurePicture:
          "What future could you and your lead help create together?",
        observed: "What evidence have you seen yourself?",
        prediction: "What are you still predicting?",
        changeMind: "What would change your mind about this use of AI?",
        askOther:
          "What do you need to ask your lead to understand where they are?",
      }
    : {
        happened:
          "What conversations have you and your PM already had, and where do things stand?",
        story: "What are you assuming about your PM's motives?",
        protecting:
          "What quality, review, or maintenance responsibility are you protecting?",
        why: "Why would this improvement be worth your engineering attention?",
        futurePicture:
          "What future could you and your PM help create together?",
        observed: "What have you observed in the actual workflow?",
        prediction: "What risk or benefit are you still predicting?",
        changeMind: "What evidence would change your assessment of this use?",
        askOther:
          "What do you need to ask your PM about the outcome or priority?",
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
    ? "Shape a worthwhile bet with your lead."
    : "Shape a worthwhile bet with your PM.";
  steps[1].intro = pm
    ? "Bring your outcome and invite your lead to shape the approach. Agree what you expect to improve, how much effort you will invest, and what evidence would earn another bet."
    : "Bring your technical judgment and shape the approach with your PM. Agree the hypothesis, effort budget, timebox, and quality conditions before you accept the bet.";
  steps[2].title = pm
    ? "Ask what the whole workflow cost."
    : "Make the real effort and quality visible.";
  const qualityNotes = steps[2].fields.find(f => f.id === "quality");
  if (qualityNotes) { qualityNotes.label = "Additional defects, rework, or reviewer experience"; qualityNotes.hint = "Use the checklist below for expected and observed quality results. Record other defects or the reviewer's experience here."; }
  steps[3].title = pm
    ? "Make the next move clear to leadership."
    : "Help your PM carry a defensible decision forward.";
  steps[1].fields.push(
    {
      id: "decisionRights",
      label:
        "Optional: who recommends, contributes input, gives required approval, decides, and carries out this bet?",
      type: "textarea",
      hint: "Use RAPID for this decision if ownership is unclear. Input is not a veto. Required formal approval and the final decision are separate rights. Name affected people and when they will hear the decision.",
    },
    {
      id: "deploymentPermission",
      label: "What further approval would deployment or expansion require?",
      type: "textarea",
      hint: "Acceptance of this bounded experiment grants only its agreed scope. Production, wider access, or rollout need their own permission.",
    }
  );
  steps[3].fields.push({
    id: "unresolvedPlan",
    label: "If no agreement is reached, what happens next?",
    type: "textarea",
    hint: "Name the right decision owner, a safe interim move within your authority, and a revisit date. Silence is not approval.",
  });
  steps.splice(1, 0, readinessStep(audience));
  return {
    ...base,
    steps,
    outputs: [
      {
        id: "readiness-brief",
        title: "Shared Next-Step Brief",
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
