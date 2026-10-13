type Presentation = {
  image: string;
  imageLayout?: "portrait" | "wide";
  lead: string;
  accent: string;
  promise: string;
  session: string;
  benefits: [string, string, string];
  artifacts: Array<{ name: string; copy: string }>;
  example: string;
  sampleValues: Record<string, string>;
};

export const FIELD_TOOL_PRESENTATIONS: Record<string, Presentation> = {
  "ai-stalemate": {
    image: "/assets/field-tools/ai-stalemate-hero-v2.webp",
    imageLayout: "wide",
    lead: "Your PM sees an AI opportunity.",
    accent: "You see what needs to be true.",
    promise:
      "Turn the AI argument into a shared ambition and a next move you can both stand behind.",
    session:
      "Allow 5–10 minutes of private preparation, 30 minutes together, and about 15 minutes after the experiment to review the evidence.",
    benefits: [
      "Name what each side protects.",
      "Count the full workflow cost.",
      "Continue, revise, stop, or pause.",
    ],
    artifacts: [
      {
        name: "Bet Brief",
        copy: "Your hypothesis, predicted improvement, timebox, effort budget, quality checks, and stop rule.",
      },
      {
        name: "Evidence Record",
        copy: "Drafting, verification, review, and rework costs beside the quality evidence.",
      },
      {
        name: "Decision Brief",
        copy: "The choice, its limits, and the next action with an owner and date.",
      },
    ],
    example:
      "Product wants faster test writing. Engineering expects more review. They agree on one approved task and count the work on both sides of the handoff.",
    sampleValues: {
      betBasis:
        "Fictional case: a comparable accepted unit-test task took 90 person-minutes, including review and rework. Repetitive drafting is worth investigating, but the full workflow cost is unknown.",
      betHypothesis:
        "If we use the approved AI tool to draft an isolated unit-test task, we expect lower total accepted-work effort because repetitive drafting may take less time.",
      expectedLift:
        "Predict 20% less total effort than the 90-person-minute comparator: 72 person-minutes, with unchanged acceptance checks. This is a prediction for this task, not a guarantee.",
      betQualitative:
        "The author may find repetitive drafting easier; the reviewer may need more verification. Ask both about their experience.",
      betTimebox:
        "Start Monday; finish one isolated task and collect effort evidence by Friday. Check later defects one week afterward.",
      betRabbitHoles:
        "Production integration, role redesign, and unrelated refactoring are out of scope. Stop and raise any unexpected permission boundary with the engineering lead.",
      betStatus: "ACCEPTED — CONDITIONS AGREED",
      betResult:
        "Observed 97 versus 90 person-minutes: about 7.8% more effort. The predicted 20% reduction and minimum worthwhile improvement were not achieved. Acceptance checks passed after rework.",
      betLearning:
        "Faster drafting was offset by verification, review, and rework. Review effort may explain the result; one task cannot establish the cause or generalize to other uses.",
      outcome: "Reduce the full effort of producing accepted unit tests.",
      sharedVision:
        "Build a responsible test-writing practice the team can trust, giving people more time for judgment and helping other teams learn from our evidence.",
      task: "One isolated unit-test task. Production code and customer data are out of scope.",
      comparator:
        "A recent unit-test task of similar size, using the same author, reviewer, and acceptance checks.",
      tool: "Team-approved AI tool. Synthetic fixtures only; engineering lead confirms approval before starting.",
      toolVersion:
        "Record the team's approved model/version before running the experiment.",
      inputs: "Synthetic fixtures only; no production code or customer data.",
      approvalOwner: "Engineering lead",
      qualityBar:
        "Existing test review and CI checks stay intact. Engineering lead owns acceptance.",
      capacity:
        "Budget up to two total person-hours for this isolated task, including no more than 15 reviewer minutes; protect the time by moving one low-priority documentation task with the PM.",
      success:
        "At least 10% lower total effort than the 90-minute comparator (81 minutes or less), with the same quality bar and no more than 15 reviewer minutes.",
      stop: "Stop for unapproved inputs, a missed quality check, or reviewer effort beyond the agreed limit.",
      owners:
        "Author: developer. Reviewer and decision owner: engineering lead. Review: Friday.",
      withoutAi:
        "Use the comparable recent test task as the baseline; record author, review, and rework effort.",
      withAi:
        "Drafting is faster; verification and reviewer effort are higher.",
      baseline_setup: "10",
      baseline_drafting: "45",
      baseline_verification: "15",
      baseline_review: "15",
      baseline_rework: "5",
      baseline_followup: "0",
      ai_setup: "15",
      ai_drafting: "12",
      ai_verification: "25",
      ai_review: "30",
      ai_rework: "15",
      ai_followup: "0",
      comparability:
        "One matched local task. First-use learning may affect the result; these are illustrative person-minutes.",
      otherCosts:
        "Tool cost and elapsed time recorded separately. This example does not calculate ROI.",
      laterCheck:
        "Engineering lead checks for follow-up defects one week later.",
      quality:
        "Quality bar passed after rework. The agreed total-effort bar was missed.",
      decision: "REVISE",
      reason: "The current workflow transfers too much effort to review.",
      limits:
        "One local task does not establish a universal AI productivity gain or loss.",
      next: "Engineering lead narrows the task and review workflow before approving another experiment.",
      leadershipUpdate:
        "The first test passed quality after rework but used 97 person-minutes versus 90 without AI; we are revising the review workflow before testing again.",
    },
  },
  "deadline-reset": {
    image: "/assets/field-tools/deadline-reset-hero-v2.webp",
    imageLayout: "wide",
    lead: "They already promised the date.",
    accent: "Now what?",
    promise:
      "Leave with a delivery conversation you can defend, and an update stakeholders can act on.",
    session:
      "Set aside 20 minutes for a first pass. Bring the decision to the person who can make the tradeoff.",
    benefits: [
      "Separate constraints from assumptions.",
      "Protect the quality guardrails.",
      "Give stakeholders a usable update.",
    ],
    artifacts: [
      {
        name: "Reality Map",
        copy: "The communicated promise, actual constraint, assumptions, and unknowns.",
      },
      {
        name: "Options Brief",
        copy: "What can change in scope or capacity, and what quality must stay protected.",
      },
      {
        name: "Stakeholder Update",
        copy: "Current confidence, the decision needed, and the next evidence checkpoint.",
      },
    ],
    example:
      "A customer has been promised November 1 before discovery finishes. The date matters. The assumed full scope is what needs a decision.",
    sampleValues: {
      date: "November 1",
      promise:
        "The full launch, communicated by the sponsor before discovery finished",
      fixed: "The customer event on November 1.",
      assumed: "All requested features ship together.",
      unknown: "An integration dependency is not yet confirmed.",
      scopeMove:
        "Ship the core customer workflow first; sequence reporting after the event.",
      capacityMove: "Keep the current team; no assumed overtime.",
      qualityGuardrails:
        "Security review and acceptance checks remain required.",
      consequence: "Keeping full scope leaves the date at low confidence.",
      confidence: "Medium",
      evidenceNext:
        "Integration review with the dependency owner to check confidence in the smaller scope.",
      decisionNeeded: "Approve the smaller launch scope or revise the date.",
      checkpoint: "Next Thursday",
      owner: "Product sponsor",
    },
  },
  "priority-whiplash": {
    image: "/assets/field-tools/priority-whiplash-hero-v2.webp",
    imageLayout: "wide",
    lead: "Everything is",
    accent: "“top priority.”",
    promise:
      "Show what the new yes displaces. Leave with an explicit choice instead of invisible overtime.",
    session:
      "Set aside 20 minutes to put the competing work on one surface and prepare the tradeoff.",
    benefits: [
      "Put competing work on one surface.",
      "Name the cost of the new yes.",
      "Record the choice and owner.",
    ],
    artifacts: [
      {
        name: "Priority Stack",
        copy: "Current commitments beside the new request, including why it is urgent.",
      },
      {
        name: "Displacement Map",
        copy: "What moves, shrinks, or pauses, and the consequence of that choice.",
      },
      {
        name: "Tradeoff Brief",
        copy: "A recommendation and decision record that travel beyond the meeting.",
      },
    ],
    example:
      "An executive adds an urgent request mid-sprint. Instead of quietly absorbing it, Product shows which customer commitment would move.",
    sampleValues: {
      p1: "Finish the customer onboarding fix",
      p2: "Complete the security review",
      p3: "Ship the reporting update",
      newAsk: "An executive demo requested mid-sprint.",
      whyNow: "A customer meeting was added for Friday.",
      moves: "Pause the reporting update for one week.",
      impact: "The reporting customer receives a revised date.",
      protected: "Security review and the onboarding fix.",
      recommendation:
        "Accept the demo only with an explicit reporting displacement.",
      decisionOwner: "Product sponsor",
      decisionDate: "Today",
      finalDecision:
        "Sponsor accepts the displacement and owns the customer update.",
    },
  },
  "mandate-reset": {
    image: "/assets/field-tools/mandate-reset-hero-v3.webp",
    imageLayout: "wide",
    lead: "You're accountable.",
    accent: "You can't decide.",
    promise:
      "Turn an authority gap into a specific decision-rights request leadership can act on.",
    session:
      "Set aside 20 minutes to map the decision path and write a specific reset request.",
    benefits: [
      "Distinguish ownership from approval.",
      "Describe the gap without blame.",
      "Ask for one concrete reset.",
    ],
    artifacts: [
      {
        name: "Decision Rights Map",
        copy: "Who recommends, approves, executes, blocks, and carries accountability.",
      },
      {
        name: "Authority Gap Statement",
        copy: "Where the outcome you own depends on a lever you cannot move.",
      },
      {
        name: "Reset Request",
        copy: "A specific decision right or escalation rule, with an owner and date.",
      },
    ],
    example:
      "A PM owns the roadmap date. Several executives can add scope, but only one sponsor can remove it. More personal effort will not repair that decision system.",
    sampleValues: {
      outcome: "Deliver the agreed roadmap outcome.",
      blockedDecision: "Remove or sequence newly requested scope.",
      consequence: "The date slips while Product remains accountable.",
      recommend: "Product manager",
      approve: "Executive sponsor",
      execute: "Product and Engineering",
      block: "Requesting executives",
      accountable: "Product manager",
      gap: "Several executives can add work; the PM accountable for delivery cannot displace it.",
      request:
        "Give the sponsor a single decision rule: every new request names the displaced commitment.",
      fallback:
        "Escalate new requests to the sponsor within one working day before changing the plan.",
      owner: "Executive sponsor",
      date: "Before the next planning session",
    },
  },
  "product-project-translator": {
    image: "/assets/field-tools/product-project-translator-hero-v2.webp",
    imageLayout: "wide",
    lead: "You're running",
    accent: "product.",
    promise:
      "Answer the real coordination need without pretending the uncertainty is gone.",
    session:
      "Set aside 15–20 minutes to translate one live request and prepare a responsible answer.",
    benefits: [
      "Hear the need behind the request.",
      "Make the current evidence clear.",
      "Offer a commitment you can keep.",
    ],
    artifacts: [
      {
        name: "Request Decoder",
        copy: "The exact words and the coordination need underneath them.",
      },
      {
        name: "Commitment Card",
        copy: "The project assumption beside what is known, unknown, and responsibly committable.",
      },
      {
        name: "Stakeholder Response",
        copy: "A clear response and evidence checkpoint to take into the next meeting.",
      },
    ],
    example:
      "A stakeholder asks for final requirements. The underlying need is budget confidence, so Product offers a bounded discovery checkpoint and a decision the budget owner can use.",
    sampleValues: {
      request: "Give me the final requirements.",
      stakeholder: "Finance sponsor",
      need: "Budget / staffing",
      context: "They need to reserve next-quarter funding.",
      assumption:
        "All useful requirements can be fixed before testing the customer workflow.",
      known: "The target customer outcome and initial budget boundary.",
      unknown:
        "Which workflow solves the customer problem with acceptable effort.",
      commit:
        "Test the two candidate workflows within the agreed discovery budget.",
      checkpoint: "Review customer evidence and delivery range in two weeks.",
      response:
        "I can give you the outcome, budget boundary, and the next funding decision now. We'll use the two-week evidence review to narrow scope before committing to the full build.",
    },
  },
};
