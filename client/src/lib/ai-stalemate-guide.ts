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
    eyebrow: "02 / CAST A SHARED VISION",
    title: "Paint a future worth working toward.",
    intro:
      "Before proposing a tool, get clear about your Why. Give the other leader a concrete picture of what could improve and an invitation to help shape it.",
    sections: [
      {
        title: "Name the improvement you care about",
        body: "Whose work or experience could improve? What is costly or frustrating now? Why does it matter enough to invest time? Faster output becomes meaningful when it serves a worthwhile outcome.",
      },
      {
        title: "Paint a recognizable before and after",
        body: "Describe the future in everyday work: shorter customer waits, fewer repetitive tasks, more time for judgment, or patterns other teams can trust. Make the picture specific enough to question and improve.",
      },
      {
        title: "Connect it to a shared stake",
        body: "The company could gain a useful capability. The team could gain mastery and influence over its standards. Building something others trust could also create professional opportunities for both leaders.",
      },
      {
        title: "Invite authorship",
        body: "Ask: What would responsible use look like here? What would you change in this picture? Give the other leader room to shape the outcome, the conditions, and the approach.",
      },
      {
        title: "Connect the picture to the next move",
        body: "A vision gives the work direction. The next move makes it credible: clarify a concern, resolve permission or capacity, use existing evidence, or agree on one bounded test.",
      },
    ],
    callout:
      "Try: If we can show where AI genuinely improves our work, we could help this company set a standard others trust. That could open opportunities for the team and for both of us. I'd like us to shape that together. What would make it worth pursuing from your side?",
  },
  {
    eyebrow: "03 / CONCERNS INTO CONDITIONS",
    title: "Make the concern workable.",
    intro:
      "Use these as questions and options to discuss. Engineering determines technical suitability; the relevant owner determines permission. A concern can change the proposal.",
    sections: [
      {
        title: "The quality is not good enough",
        body: "Which checks or standards fail? Consider a smaller task, clearer acceptance criteria, repository conventions, automated tests, and human review. Keep the existing quality bar.",
      },
      {
        title: "Reviewing it takes longer",
        body: "Where does effort increase? Consider smaller changes, explicit author verification, and protected review time. Measure accepted work across the whole workflow rather than the first draft.",
      },
      {
        title: "Our data or code cannot go into that tool",
        body: "Which inputs and approvals are involved? Establish the permitted tool and input boundary with the approval owner. Synthetic or non-sensitive inputs may be an option; permission comes first.",
      },
      {
        title: "It does not understand our codebase",
        body: "Which context or conventions are missing? Consider explicit repository instructions, a known example, and a contained task. Check whether the available context actually supports that use.",
      },
      {
        title: "We do not have capacity",
        body: "What work would this replace, and who must review it? Ask the priority owner to protect time or decline the investment. Unplanned overtime is not the trial budget.",
      },
      {
        title: "We tried it and it was worse",
        body: "Which task, conditions, and result? Use that evidence. If a materially different use is proposed, name what changed and why another test would answer a useful question.",
      },
    ],
    sources: [
      {
        name: "GitHub: Copilot best practices",
        url: "https://docs.github.com/en/copilot/get-started/best-practices",
      },
      {
        name: "Thoughtworks: reducing AI development friction",
        url: "https://martinfowler.com/articles/reduce-friction-ai/",
      },
    ],
    callout:
      "The useful question is: Which condition would make this proposal workable, and who can decide it? Keep a specific no and an unsupported yes open to the same scrutiny.",
  },
  {
    eyebrow: "04 / PRIVATE PREPARATION",
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
    eyebrow: "05 / SHARED TRIAL DESIGN",
    title: "One test you could both believe.",
    intro:
      "Allow about 30 minutes together. Use existing evidence if it already answers the question. Run a trial only when a useful uncertainty, approval, capacity, and ownership are present.",
    sections: [
      {
        title: "Agree on the ambition",
        body: "Share the future you hope to help create and why it matters. Ask the other leader to shape it. Record only the ambition you both agree to pursue in shared work.",
      },
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
    eyebrow: "06 / FULL-WORKFLOW EVIDENCE",
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
    eyebrow: "07 / THE DECISION",
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
    eyebrow: "08 / A WORKED DECISION",
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
    eyebrow: "09 / PLAY THE INSTRUMENT",
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
