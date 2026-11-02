// Our practical experiments, informed by the sources linked in the UI.
// Matching a selected cause offers options; it does not diagnose a team.
export const ACTION_SOURCES = {
  devex: {
    title: "Atlassian · Developer Experience 2026",
    url: "https://www.atlassian.com/teams/software-development/state-of-developer-experience-2026",
  },
  batches: {
    title: "DORA · Small batches",
    url: "https://dora.dev/capabilities/working-in-small-batches/",
  },
  wip: {
    title: "DORA · Work in process limits",
    url: "https://dora.dev/capabilities/wip-limits/",
  },
  delivery: {
    title: "DORA · Continuous delivery",
    url: "https://dora.dev/capabilities/continuous-delivery/",
  },
  experiment: {
    title: "DORA · Team experimentation",
    url: "https://dora.dev/capabilities/team-experimentation/",
  },
} as const;

type Move = {
  id: string;
  title: string;
  why: string;
  steps: string[];
  change: string;
  scope: string;
  measure: string;
  protect: string;
  pm: string;
  lead: string;
  source: keyof typeof ACTION_SOURCES;
};
export const SHIPPING_MOVES: Move[] = [
  {
    id: "slice",
    title: "Find a smaller useful first slice",
    why: "A smaller end-to-end change can get feedback while the rest is still open.",
    steps: [
      "Name one thing a user needs to accomplish.",
      "With a developer, choose the smallest complete path that supports it. Write down what can wait.",
      "Check that this slice can be tested and released without the deferred work.",
    ],
    change:
      "Split the next feature around one useful outcome, then finish that slice before adding more.",
    scope: "One feature, with one named user outcome.",
    measure:
      "Compare time to usable feedback with a recent similar change. Note anything that had to be rebuilt.",
    protect:
      "Keep essential security, accessibility, and reliability. Smaller must still be useful.",
    pm: "Bring the user outcome and negotiate what can wait.",
    lead: "Check dependencies and choose a slice the team can test and release.",
    source: "batches",
  },
  {
    id: "pair",
    title: "Try one AI task with a learning partner",
    why: "A bounded task can show what AI helps with and where the team still needs support.",
    steps: [
      "Choose a small task in an approved environment, with a developer who knows that area.",
      "Work through the output together. Explain the code, test it, and record where the tool needed correction.",
      "Include setup, review, and fixes when deciding whether to try it again.",
    ],
    change:
      "Try AI on one small task with an experienced partner, then review the whole effort together.",
    scope:
      "One task using approved tools and data; no autonomous production changes.",
    measure:
      "Record setup, coding, review, and fixes. Ask whether the developer can explain and maintain the result.",
    protect:
      "Keep human review and existing access controls. Make room for learning without adding overtime.",
    pm: "Protect learning time and agree what useful progress would look like.",
    lead: "Choose the task, partner, checks, and limits on tool access.",
    source: "devex",
  },
  {
    id: "small-review",
    title: "Make the next review easier to pick up",
    why: "A clear, focused change gives the reviewer a smaller problem to understand.",
    steps: [
      "Agree a reviewer and a realistic review window before the change is ready.",
      "Keep one purpose in the change. Include what changed, how it was checked, and the feedback needed.",
      "Track waiting separately from time spent reviewing. Ask the reviewer what was difficult.",
    ],
    change:
      "Send the next two changes as focused reviews with context and an agreed reviewer.",
    scope: "Two changes on one service or feature.",
    measure:
      "Record wait to first review, review rounds, and defects found later.",
    protect:
      "Agree review capacity. Avoid making someone constantly available or skipping checks to hit a target.",
    pm: "Help keep the change focused on one outcome.",
    lead: "Agree reviewer capacity and what makes a change reviewable.",
    source: "batches",
  },
  {
    id: "repeat-check",
    title: "Automate one check you keep repeating",
    why: "A reliable check can remove repeat work and bring feedback closer to the change.",
    steps: [
      "Pick one repeated manual check with a clear pass or fail.",
      "Build the smallest reliable automated check and try it against a known failure.",
      "Keep the manual check until the replacement is trusted; include maintenance in the review.",
    ],
    change:
      "Automate one repeated check and verify it catches a known failure before relying on it.",
    scope: "One check used on the next two relevant changes.",
    measure:
      "Compare checking time and false alarms. Confirm the check catches the failure it was built for.",
    protect:
      "Keep exploratory testing and human judgment. A green check is only evidence about what it tests.",
    pm: "Clarify the user behavior the check needs to protect.",
    lead: "Choose a reliable check and who will maintain it.",
    source: "delivery",
  },
  {
    id: "agree-example",
    title: "Check one concrete example before building",
    why: "People can agree on a ticket title while imagining different behavior.",
    steps: [
      "Walk through one real user situation with product and a developer.",
      "Write an example of the expected result, one awkward case, and what is still unknown.",
      "Use a sketch or small prototype where an answer needs user feedback.",
    ],
    change:
      "Walk through a concrete user example together before committing to the next change.",
    scope:
      "One change; keep the conversation to the behavior that matters for this slice.",
    measure:
      "Track expectation changes discovered after building starts and the rework they cause.",
    protect:
      "Leave room to learn. Do not require a complete specification or delay useful experiments.",
    pm: "Bring the user situation and help resolve product choices.",
    lead: "Surface edge cases and separate necessary decisions from things a prototype can answer.",
    source: "experiment",
  },
  {
    id: "fix-pattern",
    title: "Stop one kind of mistake coming back",
    why: "A repeated defect gives you a concrete place to change the work, not just repair the result.",
    steps: [
      "Pick one recurring defect and trace how it entered the work.",
      "Choose one earlier signal: an example, a test, a review prompt, or a shared component.",
      "Try it on the next relevant change and check whether it caught the problem.",
    ],
    change:
      "Add one earlier check for a recurring defect, then see whether it prevents another round of fixes.",
    scope: "One defect pattern and the next two relevant changes.",
    measure:
      "Record whether the problem recurs, when it is caught, and the extra work the check creates.",
    protect:
      "Discuss the conditions that made the mistake easy. Avoid turning the review into blame.",
    pm: "Explain the consequence for users and help define correct behavior.",
    lead: "Trace the failure and choose the earliest practical check.",
    source: "delivery",
  },
  {
    id: "decision",
    title: "Turn the open question into a decision request",
    why: "A specific choice is easier to resolve than a ticket marked ‘waiting for product’.",
    steps: [
      "Write the decision, your recommendation, and what changes for users.",
      "Agree who can decide and when the answer is needed. Explain what is waiting on it.",
      "Record the answer where the work lives. For a reversible choice, agree whether the team can decide within a boundary.",
    ],
    change:
      "Give the next blocked decision a clear question, a recommendation, an agreed owner, and a needed-by date.",
    scope: "The next two decisions holding up this piece of work.",
    measure:
      "Record days waiting for the decision, follow-up messages, and any rework after the answer.",
    protect:
      "Agree authority rather than assuming it. Escalate a missed decision instead of silently making a risky commitment.",
    pm: "Identify who has authority and bring the business trade-off into the decision.",
    lead: "Explain the technical consequence and which choices can be safely reversed.",
    source: "experiment",
  },
  {
    id: "access",
    title: "Resolve the access dependency before the build",
    why: "A working demo is not ready for real users if nobody has settled who can see the data.",
    steps: [
      "List the intended users, data, and actions they need to perform.",
      "Ask the system or security owner what existing approved access path fits and what is missing.",
      "Agree an owner and next step for the gap. Use synthetic data while access is unresolved.",
    ],
    change:
      "Check users, data permissions, and the approved access path with the responsible owner before building against real data.",
    scope: "One app or integration and its first intended user group.",
    measure:
      "Record the access decisions and elapsed wait. Verify allowed and denied access before any real-data release.",
    protect:
      "Keep least privilege and required approvals. Do not use shared credentials or widen access to save time.",
    pm: "Clarify who needs the app and the consequences of access choices.",
    lead: "Map those needs to the approved identity, data, and deployment setup.",
    source: "delivery",
  },
  {
    id: "context",
    title: "Put the missing context beside the work",
    why: "Repeated searches and handoffs may mean people cannot find the latest answer.",
    steps: [
      "Ask the people doing the work which information they had to chase.",
      "Add a short note beside the ticket or code: purpose, latest decision, source links, and owner.",
      "Have the next person use it, then correct what is missing. Retire duplicate instructions.",
    ],
    change:
      "Add a short, maintained context note where the next person will pick up the work.",
    scope: "One recurring handoff or information gap.",
    measure:
      "Record repeated questions and time spent finding the answer. Ask whether the note was useful.",
    protect:
      "Link to authoritative sources and keep permissions. Avoid creating another place everyone has to update.",
    pm: "Make the purpose and current product decision easy to find.",
    lead: "Link the technical context and name who can keep it accurate.",
    source: "devex",
  },
  {
    id: "finish-one",
    title: "Make room to finish one thing",
    why: "Starting more work can leave every item waiting for the same people.",
    steps: [
      "Make current commitments, support work, and interruptions visible together.",
      "Agree which item to finish and what can wait with the people responsible for priorities.",
      "For a short trial, help unblock that item before pulling in more work.",
    ],
    change:
      "Agree one item to finish and explicitly defer competing starts for a short trial.",
    scope:
      "One team for one week, including time for support and unexpected work.",
    measure:
      "Track elapsed time to finish, interruptions, and whether pressure or overtime changed.",
    protect:
      "Keep capacity for urgent support. Make trade-offs visible rather than asking people to do everything anyway.",
    pm: "Agree the priority and tell affected stakeholders what will wait.",
    lead: "Show capacity, dependencies, and how the team can help finish the item.",
    source: "wip",
  },
  {
    id: "release-path",
    title: "Prove one repeatable path to users",
    why: "Release work is easier to improve when its remaining steps are visible and owned.",
    steps: [
      "Walk one small change through the intended environment with the people who own it.",
      "Record missing setup, permissions, checks, and recovery steps; assign the next action.",
      "Rehearse the repeatable steps in an appropriate test environment before an approved release.",
    ],
    change:
      "Document and rehearse the release path for one small change, including checks and recovery.",
    scope: "One service or app, with its environment and release owners.",
    measure:
      "Record time from accepted change to usable release, manual steps, failures, and recovery work.",
    protect:
      "Keep required release approvals and user protections. A rehearsal is not permission to deploy to production.",
    pm: "Agree the first users, usable outcome, and any rollout constraints.",
    lead: "Bring environment owners into the release and recovery plan.",
    source: "delivery",
  },
  {
    id: "release-small",
    title: "Try a smaller release with earlier feedback",
    why: "Finished changes can sit while a large release waits for everything else.",
    steps: [
      "Find a useful change that can safely ship independently.",
      "Agree the audience, checks, and rollout with the release owner. Keep any required store or compliance steps.",
      "Ask those users what happened and feed the answer into the next slice.",
    ],
    change:
      "Try releasing one useful independent slice before the larger batch is complete.",
    scope:
      "One small release to an agreed audience, where the release process allows it.",
    measure:
      "Record wait from accepted code to users, useful feedback received, and any recovery or rework.",
    protect:
      "Check dependencies and rollback. Do not bypass security, store review, or required approvals.",
    pm: "Choose the first audience and what you need to learn from them.",
    lead: "Verify independence and agree a safe release and recovery path.",
    source: "batches",
  },
  {
    id: "trace",
    title: "Follow one change before picking a fix",
    why: "When the cause is unclear, a short look at actual work is more useful than guessing a saving.",
    steps: [
      "Choose one recently finished change and talk to the people who moved it along.",
      "Mark when work started, when it waited, why, and when users could use it. Check gaps against tickets and builds.",
      "Pick one delay you understand well enough to try changing.",
    ],
    change:
      "Trace one recent change with the people involved and check what actually caused its delays.",
    scope:
      "One completed change; use existing records and a short conversation.",
    measure:
      "Leave with one verified delay, its cause, and one possible next move. Keep unknowns visible.",
    protect:
      "Treat missing records as unknown. Avoid scoring individuals or treating every wait as waste.",
    pm: "Bring decisions, user feedback, and work that happened outside the ticket.",
    lead: "Bring review, build, access, and release context.",
    source: "wip",
  },
];

export const SHIPPING_CAUSES = [
  {
    id: "coding-size",
    stage: "coding",
    label: "The change was too big to get through",
    moves: ["slice", "small-review"],
  },
  {
    id: "coding-learning",
    stage: "coding",
    label: "We were learning the code or an AI workflow",
    moves: ["pair", "context"],
  },
  {
    id: "review-size",
    stage: "review",
    label: "The change was hard to understand or review",
    moves: ["small-review", "slice"],
  },
  {
    id: "review-checks",
    stage: "review",
    label: "We kept doing the same checks by hand",
    moves: ["repeat-check", "fix-pattern"],
  },
  {
    id: "rework-expectations",
    stage: "rework",
    label: "We built different things in our heads",
    moves: ["agree-example", "slice"],
  },
  {
    id: "rework-defects",
    stage: "rework",
    label: "The same kind of mistake kept coming back",
    moves: ["fix-pattern", "repeat-check"],
  },
  {
    id: "waiting-decision",
    stage: "waiting",
    label: "We were waiting for a decision",
    moves: ["decision", "agree-example"],
  },
  {
    id: "waiting-access",
    stage: "waiting",
    label: "We needed access, data, or an environment",
    moves: ["access", "release-path"],
  },
  {
    id: "waiting-context",
    stage: "waiting",
    label: "We kept chasing information or a reviewer",
    moves: ["context", "small-review"],
  },
  {
    id: "waiting-priorities",
    stage: "waiting",
    label: "Too many things were competing for attention",
    moves: ["finish-one", "slice"],
  },
  {
    id: "release-path",
    stage: "release",
    label: "The release path was manual or unproven",
    moves: ["release-path", "repeat-check"],
  },
  {
    id: "release-batch",
    stage: "release",
    label: "Finished work waited for a bigger release",
    moves: ["release-small", "slice"],
  },
  {
    id: "unknown",
    stage: "unknown",
    label: "I’m not sure yet / something else",
    moves: ["trace", "context"],
  },
] as const;
export type ActionPlan = {
  change: string;
  scope: string;
  owner: string;
  checkWhen: string;
  measure: string;
  protect: string;
  result: string;
  next: "undecided" | "keep" | "adapt" | "stop";
};
export type ShippingAction = {
  cause: string;
  observation: string;
  move: string;
  plans: Record<string, ActionPlan>;
};
export const emptyShippingAction = (): ShippingAction => ({
  cause: "",
  observation: "",
  move: "",
  plans: {},
});
export function moveById(id: string) {
  return SHIPPING_MOVES.find(move => move.id === id);
}
export function causeById(id: string) {
  return SHIPPING_CAUSES.find(cause => cause.id === id);
}
export function suggestedMoves(cause: string) {
  return (causeById(cause)?.moves ?? []).map(id => moveById(id)!);
}
export function planForMove(id: string): ActionPlan {
  const move = moveById(id);
  return {
    change: move?.change ?? "",
    scope: move?.scope ?? "",
    owner: "",
    checkWhen: "",
    measure: move?.measure ?? "",
    protect: move?.protect ?? "",
    result: "",
    next: "undecided",
  };
}
export function selectShippingMove(
  action: ShippingAction,
  id: string
): ShippingAction {
  if (
    id !== "custom" &&
    !suggestedMoves(action.cause).some(move => move.id === id)
  )
    return action;
  return {
    ...action,
    move: id,
    plans: { ...action.plans, [id]: action.plans[id] ?? planForMove(id) },
  };
}
export function exampleShippingAction(): ShippingAction {
  const action = selectShippingMove(
    {
      ...emptyShippingAction(),
      cause: "waiting-decision",
      observation:
        "We finished the first version, then waited for an answer about who should be able to use it.",
    },
    "decision"
  );
  action.plans.decision = {
    ...action.plans.decision,
    owner: "PM and lead developer",
    checkWhen: "After the next two decisions",
    change:
      "For the next two decisions, write the question and our recommendation together, then agree who can answer and when.",
  };
  return action;
}
const planFields = [
  "change",
  "scope",
  "owner",
  "checkWhen",
  "measure",
  "protect",
  "result",
] as const;
export function readShippingAction(value: unknown): ShippingAction {
  if (!value || typeof value !== "object") return emptyShippingAction();
  const raw = value as Record<string, unknown>;
  const cause =
    typeof raw.cause === "string" && causeById(raw.cause) ? raw.cause : "";
  const plans: Record<string, ActionPlan> = {};
  if (raw.plans && typeof raw.plans === "object") {
    for (const id of [...SHIPPING_MOVES.map(move => move.id), "custom"]) {
      const plan = (raw.plans as Record<string, unknown>)[id];
      if (!plan || typeof plan !== "object") continue;
      const clean = planForMove(id);
      for (const key of planFields) {
        const val = (plan as Record<string, unknown>)[key];
        clean[key] = typeof val === "string" ? val.slice(0, 3000) : "";
      }
      const next = (plan as Record<string, unknown>).next;
      clean.next =
        next === "keep" || next === "adapt" || next === "stop"
          ? next
          : "undecided";
      plans[id] = clean;
    }
  }
  const move =
    typeof raw.move === "string" &&
    (raw.move === "custom" ||
      suggestedMoves(cause).some(m => m.id === raw.move)) &&
    plans[raw.move]
      ? raw.move
      : "";
  return {
    cause,
    observation:
      typeof raw.observation === "string" ? raw.observation.slice(0, 3000) : "",
    move,
    plans,
  };
}
export function planMissing(name: string, plan: ActionPlan) {
  return [
    !name.trim() && "piece of work",
    !plan.change.trim() && "change to try",
    !plan.scope.trim() && "trial scope",
    !plan.owner.trim() && "owner",
    !plan.checkWhen.trim() && "check-in",
    !plan.measure.trim() && "way to check",
    !plan.protect.trim() && "what to protect",
  ].filter(Boolean) as string[];
}
export function actionSummary(
  name: string,
  action: ShippingAction,
  example: boolean
) {
  const plan = action.plans[action.move];
  if (!plan) return "";
  const missing = planMissing(name, plan);
  const nextLabels = {
    undecided: "Not decided",
    keep: "Keep trying it",
    adapt: "Change the approach",
    stop: "Stop this trial",
  };
  return [
    "SHIPPING SOONER · ONE CHANGE TO TRY",
    name.trim() || "Piece of work: not yet named",
    example
      ? "Illustrative example — not a real team agreement or result."
      : "A proposal to discuss with the team, not an agreed commitment.",
    missing.length
      ? `Draft — still to agree: ${missing.join(", ")}.`
      : "Ready to discuss. Confirm owners and capacity together.",
    "",
    `What got in the way: ${causeById(action.cause)?.label ?? "Not yet identified"}`,
    `What we noticed: ${action.observation.trim() || "Not yet recorded"}`,
    `Change to try: ${plan.change.trim() || "Not yet chosen"}`,
    `Try it on: ${plan.scope.trim() || "Not yet agreed"}`,
    `Owner / people involved: ${plan.owner.trim() || "Not yet agreed"}`,
    `Check back: ${plan.checkWhen.trim() || "Not yet agreed"}`,
    `How we will check: ${plan.measure.trim() || "Not yet agreed"}`,
    `What we will protect: ${plan.protect.trim() || "Not yet agreed"}`,
    "",
    `What happened: ${plan.result.trim() || "No result recorded yet"}`,
    `Next move: ${nextLabels[plan.next]}`,
    "",
    "Check elapsed time, quality/rework, and the load on people. A faster step is not automatically a better outcome. This plan makes no predicted saving.",
    "Suggested practices are starting points to adapt, not a diagnosis or proof that a change will work.",
  ].join("\n");
}
