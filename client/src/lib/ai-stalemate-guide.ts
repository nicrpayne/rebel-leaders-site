export const AI_STALEMATE_GUIDE_PAGES = [
  {
    eyebrow: "01 / THE REFRAME",
    title: "Two leaders. Different consequences.",
    intro:
      "Product may be carrying the cost of missed opportunity. Engineering may be carrying the cost of what actually ships. Start by making both consequences visible.",
    sections: [
      {
        title: "What Product may be protecting",
        body: "Customer outcomes, time to learn, competitive opportunity, limited capacity, or a leadership mandate. Ask which outcome the proposed AI use would improve.",
      },
      {
        title: "What Engineering may be protecting",
        body: "Quality, security, maintainability, reviewer capacity, and accountability for the result. Ask where the work or risk would move.",
      },
      {
        title: "Observation before motive",
        body: "Observation: The lead declined a trial using customer data. Interpretation: They are afraid of change. The first can be checked. The second is a story that needs examination.",
      },
      {
        title: "Choose a useful question",
        body: "Replace Should we use AI? with Can this approved use improve this specific work outcome, at the quality bar and full cost we agree on?",
      },
    ],
    callout:
      "No villain. The proposal is allowed to change. A justified STOP is a useful leadership outcome.",
  },
  {
    eyebrow: "02 / PRIVATE PREPARATION",
    title: "Get clear about your own side.",
    intro:
      "Allow 5-10 minutes before the shared conversation. This preparation is for you. Bring agreed observations into shared work, rather than forwarding your assumptions about the other person.",
    sections: [
      {
        title: "What actually happened?",
        body: "Use the request, words, or event you can describe. Be precise enough that the other person could recognize it.",
      },
      {
        title: "What story am I adding?",
        body: "Name your interpretation of their motive. Hold it as a hypothesis rather than a fact.",
      },
      {
        title: "What am I protecting?",
        body: "Describe the opportunity, cost, obligation, or outcome you carry. Product and Engineering can both have legitimate answers.",
      },
      {
        title: "What have I observed?",
        body: "Separate a concrete past result from a prediction about future use. An observed failure deserves attention; it does not settle every use case.",
      },
      {
        title: "What would change my mind?",
        body: "Name the evidence that could alter your view. A trial is not useful if neither side would reconsider anything.",
      },
      {
        title: "What do I still need to ask?",
        body: "Leave room for their actual account of the cost. Do not turn private preparation into a better argument for your original position.",
      },
    ],
    callout:
      "The Lab excludes every private-preparation field from the Trial Card, Evidence Record, and Decision Brief.",
  },
  {
    eyebrow: "03 / SHARED TRIAL DESIGN",
    title: "One test you could both believe.",
    intro:
      "Allow about 30 minutes together. Use existing evidence if it already answers the question. Run a trial only when a useful uncertainty, approval, capacity, and ownership are present.",
    sections: [
      {
        title: "Bound the work",
        body: "Name the work outcome, exact task, and work that is out of scope. Choose a comparator without AI and say why the task size, experience, and acceptance bar are comparable.",
      },
      {
        title: "Set the permission boundary",
        body: "Record the AI tool and model/version, allowed inputs, and approval owner. A trial does not grant permission to use an unapproved tool or sensitive inputs.",
      },
      {
        title: "Protect quality and capacity",
        body: "Write the acceptance checks and accountable engineering owner. Reserve author and reviewer time. State which other work is displaced.",
      },
      {
        title: "Agree on the bar beforehand",
        body: "Define success across the full workflow, not just generation speed. Write a stop rule that can be acted on during the trial.",
      },
      {
        title: "Make ownership explicit",
        body: "Name the task owner, reviewer, decision owner, and review date. Export the Trial Card now, before the test. If a prerequisite is missing, name it and choose PAUSE.",
      },
    ],
    callout:
      "A good trial: one approved unit-test task with comparable work and reserved review time. A weak trial: Everyone use AI this week and report whether it felt faster.",
  },
  {
    eyebrow: "04 / FULL-WORKFLOW EVIDENCE",
    title: "Count the work on both sides.",
    intro:
      "Record person-minutes for everyone involved. Effort is not elapsed time. Enter 0 when no effort occurred; leave unknown effort blank. Compare quality alongside the totals.",
    sections: [
      {
        title: "The worked example",
        body: "These fictional measurements describe one matched unit-test task. The acceptance bar passed after rework. Drafting was faster with AI, while verification, review, and rework increased.",
      },
      {
        title: "What the totals establish",
        body: "Drafting took 33 fewer minutes, but the full recorded workflow took 7 more. Reviewer checking increased by 15 minutes. The agreed effort bar was missed in this local test.",
      },
      {
        title: "What remains outside the totals",
        body: "Record acceptance checks, defects, reviewer experience, tool cost, elapsed time, first-use learning, and limits to comparability. Name an owner and date for a later defect check.",
      },
    ],
    table: [
      ["Workflow stage", "Without AI", "With AI"],
      ["Setup / context", "10 min", "15 min"],
      ["Drafting", "45 min", "12 min"],
      ["Author verification", "15 min", "25 min"],
      ["Reviewer checking", "15 min", "30 min"],
      ["Rework", "5 min", "15 min"],
      ["Follow-up", "0 min", "0 min"],
      ["Total person-minutes", "90 min", "97 min"],
    ],
    callout:
      "A complete total is useful evidence. It is not a universal AI productivity claim, a quality verdict, or proof of causation.",
  },
  {
    eyebrow: "05 / THE DECISION",
    title: "Four legitimate next moves.",
    intro:
      "Allow about 15 minutes after the trial. Compare the evidence with the bar agreed beforehand. Choose the move explicitly; the instrument does not make the decision for you.",
    sections: [
      {
        title: "CONTINUE",
        body: "The evidence supports this bounded use under these conditions. Record the operating boundaries and the next review. Continue does not mean AI everywhere.",
      },
      {
        title: "REVISE",
        body: "The use may have value, but the task, inputs, review workflow, or boundaries need to change. Name what will change before another approved trial.",
      },
      {
        title: "STOP",
        body: "The evidence does not support this use, or a guardrail was breached. Record why and preserve what was learned. There is no obligation to turn a failed use case into adoption.",
      },
      {
        title: "PAUSE",
        body: "A prerequisite, approval, owner, capacity, or useful evidence is missing. Name the prerequisite and who will resolve it. Pause can be chosen before a trial starts.",
      },
    ],
    callout:
      "Every decision needs a reason, the limits of the evidence, an accountable next-action owner, and a date. Record unresolved disagreement rather than claiming consensus.",
  },
  {
    eyebrow: "06 / A WORKED DECISION",
    title: "From an argument to a defensible move.",
    intro:
      "Fictional case: Product wants faster test writing. Engineering expects a larger review burden. Both leaders agree to examine one task rather than debate AI in general.",
    sections: [
      {
        title: "The Trial Card",
        body: "Outcome: reduce the effort of producing accepted unit tests. Task: one isolated unit-test task; production code and customer data are out of scope. Use an approved tool with synthetic fixtures and a recorded version.",
      },
      {
        title: "The shared bar",
        body: "Preserve the existing test review and CI checks. Reserve author and reviewer time. Success requires lower total effort without transferring additional checking to the reviewer. Stop for unapproved inputs or a failed quality guardrail.",
      },
      {
        title: "The Evidence Record",
        body: "Without AI: 90 person-minutes. With AI: 97. The quality bar passed after rework, but reviewer checking doubled from 15 to 30 minutes. One local task does not establish a general gain or loss.",
      },
      {
        title: "The Decision Brief",
        body: "REVISE. The current workflow transfers too much work to review. The engineering lead will narrow the task and review workflow before approving another trial, with a named review date.",
      },
      {
        title: "The update to leadership",
        body: "Our first test passed quality after rework but used 97 person-minutes versus 90 without AI. We are revising the review workflow before testing again.",
      },
    ],
    callout:
      "They did not leave with agreement about AI in general. They left with a specific decision, its evidence, and a next action.",
  },
  {
    eyebrow: "07 / PLAY THE INSTRUMENT",
    title: "Take this into the work.",
    intro:
      "The guide gives you language and judgment. The Lab sequences your actual situation. The artifact carries the agreed work into the organization.",
    sections: [
      {
        title: "1. Prepare privately",
        body: "Open AI Stalemate through your Field Tool access page. Start on the side you carry. Your private notes stay out of shared exports.",
      },
      {
        title: "2. Build and export the Trial Card",
        body: "Move to Shared Work. Agree on the task, comparator, permission, quality, capacity, bar, stop rule, owners, and review date. Export the Trial Card before the test.",
      },
      {
        title: "3. Return with evidence",
        body: "Enter full-workflow effort for both methods, quality results, and comparison limits. Export the Evidence Record. Blank effort stays unknown.",
      },
      {
        title: "4. Write the decision",
        body: "Choose Continue, Revise, Stop, or Pause. Name the reason, limits, next action, owner, date, and leadership update. Copy, download, or print the Decision Brief.",
      },
      {
        title: "Keep what matters",
        body: "Drafts live in this browser on this device. Export important work before clearing browser data or changing devices. There is no cloud backup or synchronized team workspace in this edition.",
      },
    ],
    callout:
      "Want to rehearse first? Watch Nic work through a complete case, then load the fictional example in the Lab before bringing your own situation.",
  },
] as const;
