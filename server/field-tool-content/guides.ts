export type GuideSection = {
  title: string;
  body?: string;
  bullets?: string[];
};

export type FieldGuide = {
  slug: string;
  title: string;
  deck: string;
  reframe: string;
  rules: string[];
  sections: GuideSection[];
  exampleTitle: string;
  example: string[];
};

export const FIELD_GUIDES: Record<string, FieldGuide> = {
  "ai-stalemate": {
    slug: "ai-stalemate",
    title: "AI Stalemate Field Guide",
    deck: "Two leaders. Same team. Different risk. One useful decision.",
    reframe:
      "The AI argument is often not really about whether AI is good. Product may be carrying the cost of missed opportunity while Engineering carries the cost of verification, maintainability, security, and owning what ships.",
    rules: [
      "No villain. Assume both people may be protecting something legitimate.",
      "Observation before motive. Describe what happened before diagnosing why.",
      "The proposal is allowed to change.",
      "Count the full workflow cost, not only drafting speed.",
      "STOP is a legitimate experimental outcome.",
    ],
    sections: [
      {
        title: "1. Prepare privately",
        body: "Before you ask the other leader to change, get clean about your own story.",
        bullets: [
          "What actually happened?",
          "What interpretation are you adding?",
          "What are you protecting?",
          "What evidence do you already have?",
          "What would change your mind?",
        ],
      },
      {
        title: "2. Work the problem together",
        body: "Clarify the exact work outcome. Make both the opportunity and the transferred cost visible. Do not debate AI in general.",
      },
      {
        title: "3. Run one bounded test",
        bullets: [
          "One specific task.",
          "Existing quality bar stays intact.",
          "Approved tool and inputs.",
          "Protected author and reviewer capacity.",
          "Comparator or baseline.",
          "Success bar and stop rule written before the experiment.",
          "Named decision owner and review date.",
        ],
      },
      {
        title: "4. Decide from evidence",
        body: "Choose Continue, Revise, Stop, or Pause. Record what the experiment did and did not establish.",
      },
    ],
    exampleTitle: "Worked example — test generation",
    example: [
      "Product asks whether AI can reduce test-writing time.",
      "Engineering says generated tests create review burden.",
      "The team narrows the experiment to one approved unit-test task and preserves the existing acceptance standard.",
      "They measure drafting + author verification + reviewer time + rework.",
      "Drafting is faster, but reviewer burden rises enough that the agreed bar is missed.",
      "Decision: REVISE. Narrow the use case and change the review workflow before repeating.",
    ],
  },

  "deadline-reset": {
    slug: "deadline-reset",
    title: "Deadline Reset Field Guide",
    deck: "A date can be fixed. That does not make the work fully knowable.",
    reframe:
      "The problem is not that stakeholders want dates. They need coordination. The failure begins when a forecast, a scope hypothesis, and a promise are treated as the same thing.",
    rules: [
      "Separate the communicated promise from current delivery reality.",
      "Name what is genuinely fixed and what is only assumed.",
      "If the date cannot move, something else must.",
      "Do not trade away quality or safety without naming the consequence.",
      "Update confidence when evidence changes; that is learning, not failure.",
    ],
    sections: [
      {
        title: "1. Build the Reality Map",
        bullets: [
          "What date was communicated?",
          "Who made the commitment?",
          "What is truly fixed?",
          "What remains assumed?",
          "What important facts are still unknown?",
        ],
      },
      {
        title: "2. Make the tradeoff explicit",
        body: "If the date remains fixed, identify what can responsibly change: scope, sequence, capacity, or confidence. Protect non-negotiable safety and quality guardrails.",
      },
      {
        title: "3. State current confidence",
        body: "Use plain language: low, medium, or high. Then name the next evidence point that could materially change it.",
      },
      {
        title: "4. Send a responsible update",
        body: "Give stakeholders the date, current confidence, explicit tradeoff, decision needed, next checkpoint, and accountable owner.",
      },
    ],
    exampleTitle: "Worked example — November 1",
    example: [
      "A customer was told November 1 before discovery finished.",
      "The PM separates the external date from the assumed full scope.",
      "The team identifies a smaller outcome that can credibly fit the window while preserving the quality bar.",
      "A dependency review in two weeks becomes the next evidence checkpoint.",
      "Stakeholders choose the smaller scope instead of asking the team to absorb the gap invisibly.",
    ],
  },

  "priority-whiplash": {
    slug: "priority-whiplash",
    title: "Priority Whiplash Field Guide",
    deck: "A priority system is defined as much by what leaves as by what enters.",
    reframe:
      "Teams do not have a prioritization problem when they have too few labels. They have one when new work enters without an explicit decision about what loses time, scope, or attention.",
    rules: [
      "Put competing work on the same surface.",
      "Every new yes names a displaced no.",
      "Do not let the team quietly make strategy through overtime.",
      "Protect work in progress from endless reshuffling.",
      "Record the choice, owner, consequence, and date.",
    ],
    sections: [
      {
        title: "1. Build the real stack",
        body: "List the current commitments before discussing the new request. Include work that is politically important even if nobody calls it a priority.",
      },
      {
        title: "2. Name displacement",
        body: "If the new request enters, identify exactly what moves, shrinks, pauses, or loses capacity — and the consequence.",
      },
      {
        title: "3. Put the tradeoff with the owner",
        body: "Product can recommend. The accountable stakeholder should own the business choice when priorities conflict.",
      },
      {
        title: "4. Publish the decision",
        body: "A short tradeoff brief prevents tomorrow's version of the meeting from pretending nothing changed.",
      },
    ],
    exampleTitle: "Worked example — the executive urgent request",
    example: [
      "A new executive request arrives mid-sprint and is declared urgent.",
      "Instead of adding it on top, the PM places it beside the current top three commitments.",
      "The team shows that entering it moves a customer-facing item by one week.",
      "The executive chooses the displacement explicitly.",
      "The team works one priority system instead of two hidden ones.",
    ],
  },

  "mandate-reset": {
    slug: "mandate-reset",
    title: "Mandate Reset Field Guide",
    deck: "Accountability without decision rights creates overfunctioning, not ownership.",
    reframe:
      "If you are responsible for an outcome but cannot move the lever that determines it, the problem may not be confidence or influence. It may be an authority gap in the operating system.",
    rules: [
      "Name the outcome before mapping authority.",
      "Recommendation, approval, execution, veto, and accountability are different roles.",
      "Ask for a specific decision right, not vague empowerment.",
      "Do not compensate indefinitely for unclear governance.",
      "If authority cannot move, define an escalation path and operating rule.",
    ],
    sections: [
      {
        title: "1. Name the accountability",
        body: "What outcome are you expected to own, and what decision is currently blocking it?",
      },
      {
        title: "2. Map the real decision path",
        bullets: [
          "Who recommends?",
          "Who can approve?",
          "Who executes?",
          "Who can block?",
          "Who is held accountable if the outcome misses?",
        ],
      },
      {
        title: "3. Name the gap",
        body: "Write one sentence describing where accountability and authority diverge. Avoid diagnosing people; describe the system.",
      },
      {
        title: "4. Request the reset",
        body: "Ask for the decision right, owner, escalation path, or operating rule needed — with a date.",
      },
    ],
    exampleTitle: "Worked example — roadmap owner without scope authority",
    example: [
      "A PM is accountable for a roadmap outcome but cannot remove stakeholder-requested scope.",
      "The PM maps who can add work, who can remove it, and who is judged on the date.",
      "The authority gap becomes visible: scope can be added by several executives but displaced only by one sponsor.",
      "The PM requests a clear sponsor decision rule for new work.",
      "The issue moves from 'PM needs to push harder' to an operating condition leadership can fix.",
    ],
  },

  "product-project-translator": {
    slug: "product-project-translator",
    title: "Product / Project Translator Field Guide",
    deck: "A project plan is not bad. It is the wrong instrument when the most important facts are still being discovered.",
    reframe:
      "Most project-style requests are not irrational. Stakeholders are usually asking for confidence, sequencing, budget protection, customer communication, or accountability. Product leadership should answer that need without inventing certainty.",
    rules: [
      "Do not shame stakeholders for wanting coordination.",
      "Decode the need beneath the request.",
      "Translate false certainty into evidence, ranges, tradeoffs, and checkpoints.",
      "Always offer a useful alternative — not just 'we can't know.'",
      "Treat changing plans as new information becoming visible.",
    ],
    sections: [
      {
        title: "1. Capture the exact request",
        body: "Write the sentence you actually heard: final requirements, fixed date, committed roadmap, complete estimate, or similar.",
      },
      {
        title: "2. Decode the coordination need",
        body: "Ask what the stakeholder is trying to protect: confidence, budget, sequence, a customer message, accountability, or risk.",
      },
      {
        title: "3. Translate into product reality",
        bullets: [
          "What is known now?",
          "What remains uncertain?",
          "What can responsibly be committed?",
          "What tradeoff increases certainty?",
          "What evidence arrives next?",
        ],
      },
      {
        title: "4. Give the better answer",
        body: "Offer the artifact or statement that meets the real need: confidence range, scope hypothesis, checkpoint, tradeoff brief, decision owner, or forecast.",
      },
    ],
    exampleTitle: "Worked example — 'final requirements and a date'",
    example: [
      "A stakeholder asks for final requirements and a committed launch date before discovery.",
      "The PM recognizes the underlying need: budget and customer coordination.",
      "Instead of rejecting the request, Product provides the current scope hypothesis, key unknowns, confidence range, and two evidence checkpoints.",
      "The stakeholder gets a coordination mechanism without pretending discovery is finished.",
    ],
  },
};

export function getFieldGuide(slug: string) {
  return FIELD_GUIDES[slug];
}
