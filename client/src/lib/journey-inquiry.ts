// Curated questions, not an automatic root-cause assessment.
export type NextStepKind = "check" | "discuss" | "try";
export type JourneyInquiry = {
  context: string;
  detail: string;
  tried: "unknown" | "not-yet" | "yes";
  attempt: string;
  obstacle: string;
  influence: "unknown" | "team" | "shared" | "outside";
  otherView: string;
};
export const emptyJourneyInquiry = (): JourneyInquiry => ({
  context: "",
  detail: "",
  tried: "unknown",
  attempt: "",
  obstacle: "",
  influence: "unknown",
  otherView: "",
});
export type InquiryOption = {
  id: string;
  label: string;
  question: string;
  action: string;
};
const capacity: InquiryOption = {
  id: "commitments",
  label: "Review comes on top of everyone's committed work.",
  question:
    "What delivery work could wait to make review possible, and who can agree that trade-off?",
  action:
    "Bring one recent review delay and the work already committed. Ask the people setting priorities to agree what will wait so the next few reviews fit inside normal working hours.",
};
const specialist: InquiryOption = {
  id: "specialist",
  label: "Everything needs the same experienced person.",
  question:
    "Which decisions require that person's expertise or approval, and which could someone else learn to handle with support?",
  action:
    "Choose one type of change and ask the experienced reviewer to identify the judgment it needs. Discuss a supported second reviewer for that type of work, keeping required approvals and making room for the learning.",
};
const otherTeam: InquiryOption = {
  id: "other-team",
  label: "The reviewer belongs to another team with other priorities.",
  question:
    "Who on each side can agree the priority, and what is their actual availability?",
  action:
    "Bring a specific review request, the effect of waiting, and the other team's commitments to the people who can decide. Agree a realistic slot or change your delivery plan; do not create a deadline on their behalf.",
};
const sharedStandards: InquiryOption = {
  id: "standards",
  label: "Different reviewers keep asking for different things.",
  question:
    "Which comments reflect required standards, which are preferences, and who can settle the design choice?",
  action:
    "Take one disputed change to the relevant reviewers together. Agree the decision and a concrete example of the expected standard before another rewrite. Keep required checks in place.",
};
const context: InquiryOption = {
  id: "context",
  label: "They have to work out what the change is for before reviewing it.",
  question:
    "What did the reviewer have to reconstruct: the user task, the approach, or the evidence that it works?",
  action:
    "Ask the reviewer to point to one missing piece of context on a recent change. Add that to the next handoff and check whether it was enough to begin; keep the explanation proportionate.",
};
const size: InquiryOption = {
  id: "size",
  label: "Too many things changed at once to follow it confidently.",
  question:
    "Is there an independently checkable part, or would splitting it hide a dependency the reviewer needs to see?",
  action:
    "Author and reviewer choose one independently checkable part, with a short explanation of how it fits the whole. Agree any effect on release scope with the person responsible for the user outcome.",
};
const reviewOptions: Record<string, InquiryOption[]> = {
  "check-1-1": [capacity, specialist, otherTeam],
  "check-1-2": [
    {
      id: "unowned",
      label: "Everyone assumes someone else will pick it up.",
      question:
        "Who knows the area and has agreed to take this review, with a backup?",
      action:
        "Agree an owner and backup for the next few changes, including how they will know a review is ready and what work makes room for it.",
    },
    specialist,
    otherTeam,
  ],
  "check-1-3": [
    context,
    size,
    {
      id: "lost-decision",
      label: "The reasoning is scattered across chats and meetings.",
      question:
        "Which decision does the reviewer need, and where can its owner confirm it?",
      action:
        "Capture the one decision the reviewer needs, its reason, and the person who can clarify it alongside the change. Avoid reconstructing every conversation.",
    },
  ],
  "check-2-1": [
    {
      id: "interpretation",
      label: "We all read the same request differently.",
      question:
        "Can each person describe what should happen for the same user in the same situation?",
      action:
        "Walk through one real user task and an awkward case together. Agree the expected result in plain language before changing the implementation again.",
    },
    {
      id: "new-request",
      label: "Someone added a new expectation after we started.",
      question:
        "Is this necessary for the original outcome, a new priority, or useful learning from seeing the work?",
      action:
        "Make the new expectation explicit. Agree whether to change the current scope, swap something out, or save it for a later change, including the effect on the release.",
    },
    sharedStandards,
  ],
  "check-2-2": [size, specialist, context],
  "check-3-1": [
    {
      id: "no-time",
      label: "We know which checks repeat. Nobody gets time to improve them.",
      question:
        "Which repeated check costs enough effort to justify making room for a small improvement?",
      action:
        "Bring one repeatable check, its recent effort, and a bounded improvement proposal to the people setting commitments. Include maintenance and test it with a known failure before relying on it.",
    },
    {
      id: "judgment",
      label: "Some of this checking needs a person's judgment.",
      question:
        "Which steps have a stable expected result, and which involve learning or exploring?",
      action:
        "Separate one repeatable check from the exploratory work. Improve the repeatable part while retaining the human judgment the change needs.",
    },
  ],
  "check-3-2": [
    {
      id: "flaky",
      label: "The same test passes when we rerun it, without a code change.",
      question:
        "Under what conditions does it fail, and who can help reproduce those conditions?",
      action:
        "Trace one inconsistent test with its owner. Record the conditions, repair one cause, and confirm it still catches a known failure. Do not hide failures to get a green build.",
    },
    {
      id: "environment",
      label: "We're waiting for a usable environment or test data.",
      question:
        "What exactly is unavailable, who owns it, and is it a one-off or a repeated wait?",
      action:
        "Agree an answerable request with the environment or data owner and a realistic next step. If the wait repeats, discuss a supported way to prepare what is needed earlier.",
    },
  ],
};
const genericOptions: InquiryOption[] = [
  {
    id: "capacity",
    label: "The improvement keeps losing out to other work.",
    question: "What would need to wait to make room, and who decides that?",
    action:
      "Bring one concrete example and a small, bounded proposal to the people setting commitments. Agree what will wait before adding improvement work.",
  },
  {
    id: "ownership",
    label: "People agree it's a problem, but nobody can move it alone.",
    question:
      "Which decision or dependency crosses the team's boundary, and who can help resolve it?",
    action:
      "Name the specific decision needed and bring the people who can make it together with the people affected. Include a realistic alternative if it cannot change now.",
  },
  {
    id: "disagreement",
    label: "We don't agree on what's causing it.",
    question:
      "What would each person expect to see if their explanation were right?",
    action:
      "Compare explanations against one recent example together. Choose one missing fact to check before committing to a process change.",
  },
];
export function inquiryOptions(caseId: string) {
  return reviewOptions[caseId] ?? genericOptions;
}
export function inquiryOption(caseId: string, id: string) {
  return inquiryOptions(caseId).find(o => o.id === id);
}
export function suggestedNextKind(
  inquiry: JourneyInquiry,
  observation: string
): NextStepKind {
  if (
    !observation.trim() ||
    inquiry.context === "unsure" ||
    inquiry.context === "other" ||
    !inquiry.context ||
    inquiry.influence === "unknown" ||
    inquiry.tried === "unknown"
  )
    return "check";
  if (inquiry.influence !== "team" || inquiry.tried === "yes") return "discuss";
  return "try";
}
export const NEXT_STEP_NAMES: Record<NextStepKind, string> = {
  check: "Find one thing out",
  discuss: "Prepare a conversation",
  try: "Try a small change",
};
export const INFLUENCE_LABELS = {
  unknown: "We still need to find out who can change this",
  team: "Our team can agree a change",
  shared: "We need another person or team to agree",
  outside: "The decision sits outside our team",
};
