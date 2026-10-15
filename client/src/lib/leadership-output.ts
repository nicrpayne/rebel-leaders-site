import { fieldToolChoiceLabel } from "./field-tool-choice-labels.ts";
export type WorkingValues = Record<string, string>;
const prompts: Record<string, string> = {
  outcome: "Say what you want to make possible for customers or the team.",
  owner: "Name who can make this decision.",
  decisionOwner: "Name who can make this decision.",
  decisionBy: "Record when the decision is needed.",
  decisionDate: "Record when the decision is needed.",
  date: "Record the date and what it applies to.",
  decisionNeeded: "Say what you need someone to decide.",
  p1: "Add the first piece of work already promised.",
  p2: "Add another piece of promised work, or write none.",
  p3: "Add another piece of promised work, or write none.",
  otherWork: "Include support, review, and other work, or write none.",
  newAsk: "Describe the new request.",
  whyNow: "Explain why it is needed now.",
  urgencyBasis: "Say why this is needed now and how you know.",
  requiredApprovals: "Say whose approval is needed and what they must approve.",
  checkpoint: "Say what you will check next and when.",
};
const value = (
  v: WorkingValues,
  key: string,
  fallback = prompts[key] ?? "Add this before sharing."
) => fieldToolChoiceLabel(key, v[key]?.trim() || fallback);
const section = (title: string, body: string) => `${title}\n${body}`;
const record = (title: string, sections: string[]) =>
  `${title}\n\n${sections.filter(Boolean).join("\n\n")}\n\nMade from your answers. Read it through before sharing; your private notes are left out.`;
const optional = (v: WorkingValues, key: string, title: string) =>
  v[key]?.trim() ? section(title, v[key].trim()) : "";
const followThrough = (v: WorkingValues) => [
  optional(v, "leadershipUpdate", "UPDATE FOR THE PERSON DECIDING"),
  optional(v, "teamUpdate", "UPDATE FOR THE TEAM"),
  optional(v, "returnRecord", "AFTERWARD / WHAT HAPPENED AND WHAT NEXT"),
];
const status = (v: WorkingValues) =>
  section(
    "DECISION STATUS",
    value(v, "decisionStatus", "PROPOSAL — agreement not recorded")
  );

export function capacitySnapshot(v: WorkingValues) {
  const keys = ["availableCapacity", "existingLoad", "requestLoad"];
  const raw = keys.map(key => v[key]?.trim() ?? "");
  if (raw.some(x => x === "" || !/^\d+(\.\d+)?$/.test(x))) return null;
  const [available, existing, request] = raw.map(Number);
  if (
    ![available, existing, request, existing + request].every(Number.isFinite)
  )
    return null;
  return {
    available,
    existing,
    request,
    total: existing + request,
    gap: Math.max(0, existing + request - available),
  };
}
function capacityText(v: WorkingValues) {
  const c = capacitySnapshot(v);
  if (!c)
    return "The time estimates are incomplete. We do not yet know whether the new work will fit.";
  return `Dates covered: ${value(v, "capacityWindow", "Add the dates these estimates cover.")}\nWork time, in person-days:\nAvailable: ${c.available}; existing work: ${c.existing}; new request: ${c.request}.\nBefore changing the plan, work totals: ${c.total}; work that does not fit: ${Number(c.gap.toFixed(2))}.\nOne person-day is one person working for one day. These estimates do not calculate a finish date. How we estimated them: ${value(v, "capacityBasis")}`;
}
export function buildDeadlineReality(v: WorkingValues) {
  return record("DEADLINE RESET — DEADLINE FACTS", [
    section("WHAT WE WANT TO IMPROVE", value(v, "outcome")),
    section(
      "THE DATE PEOPLE WERE GIVEN / WHAT WAS PROMISED",
      `${value(v, "date")}\n${value(v, "promise")}`
    ),
    section(
      "WHAT CANNOT CHANGE / HOW WE KNOW",
      `${value(v, "fixed")}\nBasis: ${value(v, "constraintBasis")}`
    ),
    section(
      "WHAT WE ARE ASSUMING / WHAT NEEDS CHECKING",
      `${value(v, "assumed")}\n${value(v, "unknown")}`
    ),
    section("WHAT THE ESTIMATE IS BASED ON", value(v, "forecastBasis")),
  ]);
}
export function buildDeadlineOptions(v: WorkingValues) {
  return record("DEADLINE RESET — DELIVERY OPTIONS", [
    section(
      "WHAT WE WANT TO DELIVER / PROMISED DATE",
      `${value(v, "outcome")}\n${value(v, "date")}`
    ),
    section("KEEP THE DATE / DELIVER LESS FIRST", value(v, "scopeMove")),
    section("DELIVER ALL THE WORK / CHANGE THE DATE", value(v, "dateMove")),
    section("WHAT EXTRA HELP COULD CHANGE", value(v, "capacityMove")),
    section("QUALITY / SAFETY CONDITIONS", value(v, "qualityGuardrails")),
    section("IF NOTHING CHANGES", value(v, "consequence")),
    section(
      "RECOMMENDED OPTION / WHY",
      `${value(v, "chosenOption")}\n${value(v, "recommendation")}`
    ),
    status(v),
  ]);
}
export function buildDeadlineUpdate(v: WorkingValues) {
  return record("DEADLINE RESET — DECISION UPDATE", [
    section(
      "WHAT WE WANT TO DELIVER / WHAT WAS PROMISED",
      `${value(v, "outcome")}\nDate people were given: ${value(v, "date")}\nPromise: ${value(v, "promise")}`
    ),
    section(
      "WHAT IS FIXED / WHAT IS STILL ASSUMED",
      `${value(v, "fixed")}\nSource: ${value(v, "constraintBasis")}\nAssumptions: ${value(v, "assumed")}\nUnknowns: ${value(v, "unknown")}`
    ),
    section(
      "HOW SURE WE ARE / WHY",
      `${value(v, "confidence", "Not assessed")} (your assessment, not a calculated chance of success)\n${value(v, "forecastBasis")}\nApplies to: ${value(v, "confidenceScope")}`
    ),
    section(
      "RECOMMENDATION / WHAT WOULD CHANGE",
      `${value(v, "chosenOption")}\n${value(v, "recommendation")}\nWork included: ${value(v, "scopeMove")}\nAlternative date: ${value(v, "dateMove")}\nExtra help: ${value(v, "capacityMove")}`
    ),
    section(
      "REQUIRED CHECKS / IF NOTHING CHANGES",
      `${value(v, "qualityGuardrails")}\nIf nothing changes: ${value(v, "consequence")}`
    ),
    section(
      "DECISION NEEDED / WHO CAN MAKE IT / WHEN",
      `${value(v, "decisionNeeded")}\n${value(v, "owner")} — ${value(v, "decisionBy")}`
    ),
    status(v),
    section(
      "RECORDED RESPONSE",
      value(
        v,
        "finalDecision",
        "No answer recorded yet. This is still a proposal."
      )
    ),
    section(
      "WHAT WE WILL CHECK NEXT / WHEN",
      `${value(v, "evidenceNext")}\n${value(v, "checkpoint")}`
    ),
    section(
      "WHO NEEDS TELLING / WHO WILL TELL THEM",
      value(v, "communication")
    ),
    optional(
      v,
      "unresolvedPlan",
      "IF WE DO NOT GET AN ANSWER / WHAT WE DO WHILE WAITING"
    ),
    optional(
      v,
      "checkpointFallback",
      "IF THE NEXT CHECK FAILS / WHO WILL DECIDE"
    ),
    ...followThrough(v),
  ]);
}
export function buildPriorityStack(v: WorkingValues) {
  return record("PRIORITY WHIPLASH — CURRENT WORK LIST", [
    section("WHAT WE WANT TO MAKE POSSIBLE", value(v, "outcome")),
    section(
      "CURRENT COMMITMENTS",
      `1. ${value(v, "p1")}\n2. ${value(v, "p2")}\n3. ${value(v, "p3")}\nOther work: ${value(v, "otherWork")}`
    ),
    section(
      "NEW REQUEST / WHY NOW",
      `${value(v, "newAsk")}\n${value(v, "whyNow")}\nWhy it is needed now: ${value(v, "urgencyBasis")}`
    ),
    section("DOES THE WORK FIT", capacityText(v)),
  ]);
}
export function buildDisplacementMap(v: WorkingValues) {
  return record("PRIORITY WHIPLASH — WHAT WOULD CHANGE", [
    section("NEW REQUEST", value(v, "newAsk")),
    section("OPTION BEING RECOMMENDED", value(v, "priorityChoice")),
    section(
      "WHAT WOULD WAIT / WHO IT AFFECTS",
      `${value(v, "moves")}\n${value(v, "impact")}`
    ),
    section("WHAT STAYS PROTECTED", value(v, "protected")),
    section("ANOTHER OPTION / WHAT IT WOULD CHANGE", value(v, "alternative")),
    section("DOES THE WORK FIT", capacityText(v)),
    status(v),
  ]);
}
export function buildTradeoffBrief(v: WorkingValues) {
  return record("PRIORITY WHIPLASH — PRIORITY DECISION BRIEF", [
    section(
      "WHAT WE WANT TO ACHIEVE / CURRENT WORK",
      `${value(v, "outcome")}\n1. ${value(v, "p1")}\n2. ${value(v, "p2")}\n3. ${value(v, "p3")}\nOther work: ${value(v, "otherWork")}`
    ),
    section(
      "NEW REQUEST / WHY IT IS NEEDED NOW",
      `${value(v, "newAsk")}\n${value(v, "whyNow")}\n${value(v, "urgencyBasis")}`
    ),
    section("DOES THE WORK FIT", capacityText(v)),
    section(
      "RECOMMENDATION / WHAT WOULD WAIT",
      `${value(v, "priorityChoice")}\n${value(v, "recommendation")}\nWhat would wait: ${value(v, "moves")}\nWhat this would mean for people: ${value(v, "impact")}`
    ),
    section(
      "PROTECTED WORK / ALTERNATIVE",
      `${value(v, "protected")}\n${value(v, "alternative")}`
    ),
    section(
      "WHO CAN DECIDE / WHEN WE NEED AN ANSWER",
      `${value(v, "decisionOwner")} — ${value(v, "decisionDate")}`
    ),
    status(v),
    section(
      "RECORDED RESPONSE",
      value(
        v,
        "finalDecision",
        "No agreement recorded. Current commitments have not been changed by this brief."
      )
    ),
    section(
      "COMMUNICATION / NEXT REVIEW",
      `${value(v, "communication")}\n${value(v, "reviewDate")}`
    ),
    optional(
      v,
      "unresolvedPlan",
      "IF WE DO NOT GET AN ANSWER / WHAT WE DO WHILE WAITING"
    ),
    optional(
      v,
      "emergencyException",
      "EMERGENCY CHANGE / WHO APPROVED IT / WHEN TO REVIEW"
    ),
    ...followThrough(v),
  ]);
}
export function buildRightsMap(v: WorkingValues) {
  return record("MANDATE RESET — WHO CAN DECIDE", [
    section(
      "WHAT WE WANT TO DO / THE DECISION WE NEED",
      `${value(v, "outcome")}\n${value(v, "blockedDecision")}`
    ),
    section(
      "WHO DOES WHAT TODAY",
      `Recommends: ${value(v, "recommend", "Unknown")}\nMakes the call: ${value(v, "approve", "Unknown")}\nDoes the work: ${value(v, "execute", "Unknown")}\nSets limits or can stop it: ${value(v, "block", "Unknown")}\nAnswers for the result: ${value(v, "accountable", "Unknown")}`
    ),
    section(
      "WHAT PEOPLE HAVE CONFIRMED / WHAT WE NEED TO ASK",
      value(v, "rightsEvidence", "We still need to confirm who can decide.")
    ),
    section("REQUIRED APPROVAL", value(v, "requiredApprovals")),
    optional(v, "consult", "WHO WE ASKED FOR ADVICE"),
  ]);
}
export function buildAuthorityGap(v: WorkingValues) {
  return record("MANDATE RESET — THE DECISION PROBLEM", [
    section(
      "WHAT WE WANT TO DO / THE DECISION HOLDING IT UP",
      `${value(v, "outcome")}\n${value(v, "blockedDecision")}`
    ),
    section("THE DECISION I CANNOT MAKE", value(v, "gap")),
    section(
      "WHAT THIS MEANS FOR THE TEAM OR BUSINESS",
      value(v, "consequence")
    ),
    section("THE CHANGE WE ARE ASKING FOR", value(v, "request")),
    section(
      "LIMITS / REQUIRED APPROVALS",
      `${value(v, "boundaries")}\n${value(v, "requiredApprovals")}`
    ),
    section("IF THEY CANNOT GIVE US PERMISSION", value(v, "fallback")),
    status(v),
  ]);
}
export function buildMandateRequest(v: WorkingValues) {
  return record("MANDATE RESET — DECISION REQUEST", [
    section(
      "WHAT WE WANT TO DO / WHAT IS HOLDING IT UP",
      `${value(v, "outcome")}\n${value(v, "blockedDecision")}`
    ),
    section(
      "WHO CAN DECIDE / WHAT WE HAVE CHECKED",
      `Recommends: ${value(v, "recommend")}\nMakes the call: ${value(v, "approve")}\nDoes the work: ${value(v, "execute")}\nCan stop this going ahead: ${value(v, "block")}\nAnswers for the result: ${value(v, "accountable")}\nBasis: ${value(v, "rightsEvidence")}`
    ),
    section(
      "WHAT I CANNOT DECIDE / WHY IT MATTERS",
      `${value(v, "gap")}\n${value(v, "consequence")}`
    ),
    section(
      "WHAT I AM ASKING FOR / LIMITS",
      `${value(v, "request")}\n${value(v, "boundaries")}\nRequired approval: ${value(v, "requiredApprovals")}`
    ),
    optional(v, "consult", "WHO WE ASKED FOR ADVICE"),
    section("IF THIS CHANGE IS NOT POSSIBLE", value(v, "fallback")),
    section(
      "WHO WE NEED AN ANSWER FROM / WHEN",
      `${value(v, "owner")} — ${value(v, "date")}`
    ),
    status(v),
    section(
      "WHAT THEY SAID / WHAT WE WILL DO WHILE WAITING",
      `${value(v, "finalDecision", "No change has been agreed yet. Current decision permissions still apply.")}\n${value(v, "interimAction")}`
    ),
    section("NEXT REVIEW / WHAT WILL SHOW IT WORKS", value(v, "reviewDate")),
    optional(
      v,
      "unresolvedPlan",
      "IF WE DO NOT GET AN ANSWER / WHAT WE DO WHILE WAITING"
    ),
    ...followThrough(v),
  ]);
}
// Only deliberately shareable fields reach these documents. Private listening notes never do.
export function buildQuietConversation(v: WorkingValues) {
  return record("WHEN THE TEAM GOES QUIET — YOUR CONVERSATION PLAN", [
    section(
      "THE MOMENT I WANT TO ASK ABOUT",
      value(v, "moment", "Choose one moment you noticed.")
    ),
    section(
      "WHY IT MATTERS",
      value(v, "effect", "What might be getting missed?")
    ),
    section(
      "WHO I WANT TO SPEAK WITH / HOW I WILL ASK",
      `${value(v, "person", "Choose one person.")}\n${value(v, "setting", "Offer a time or a way to reply.")}`
    ),
    section(
      "MY OPENING",
      value(v, "opening", "Write a short opening in your own words.")
    ),
    section(
      "THE QUESTION I WANT TO ASK",
      value(v, "question", "Choose one question and leave room for the answer.")
    ),
    "This is preparation for a conversation, not a record of what anyone has agreed.",
  ]);
}
export function buildQuietChange(v: WorkingValues) {
  return record("WHEN THE TEAM GOES QUIET — A CHANGE TO TRY", [
    section(
      "WHAT WE CAN CARRY FORWARD",
      value(
        v,
        "understanding",
        "We have not recorded a shared understanding yet."
      )
    ),
    section(
      "WHAT I COULD DO DIFFERENTLY",
      value(v, "myChange", "Choose something you can change.")
    ),
    section(
      "WHAT WE CAN SHARE",
      value(
        v,
        "sharePermission",
        "Check what the person is comfortable sharing first."
      )
    ),
    section(
      "WHERE WE ARE",
      value(v, "decisionStatus", "PROPOSAL — not discussed yet")
    ),
  ]);
}
export function buildQuietFollowThrough(v: WorkingValues) {
  return record("WHEN THE TEAM GOES QUIET — YOUR FOLLOW-THROUGH", [
    section(
      "WHERE WE ARE",
      value(v, "decisionStatus", "PROPOSAL — not discussed yet")
    ),
    section(
      "WHAT WE AGREED",
      value(v, "finalDecision", "No agreement has been recorded yet.")
    ),
    section(
      "THE CHANGE",
      value(v, "myChange", "Choose something you can change.")
    ),
    section(
      "WHAT I WILL DO NEXT / WHEN",
      value(v, "nextAction", "Name your next step and when you will take it.")
    ),
    section("WHEN WE WILL CHECK BACK", value(v, "checkpoint")),
    optional(v, "teamUpdate", "A NOTE TO SHARE"),
    optional(v, "returnRecord", "AFTERWARD / WHAT HAPPENED"),
    "Before sharing, remove private comments or details that could identify someone who spoke to you in confidence.",
  ]);
}
export const LEADERSHIP_OUTPUT_BUILDERS: Record<
  string,
  (v: WorkingValues) => string
> = {
  "deadline-reality": buildDeadlineReality,
  "deadline-options": buildDeadlineOptions,
  "deadline-update": buildDeadlineUpdate,
  "priority-stack": buildPriorityStack,
  "displacement-map": buildDisplacementMap,
  "tradeoff-brief": buildTradeoffBrief,
  "rights-map": buildRightsMap,
  "authority-gap": buildAuthorityGap,
  "mandate-request": buildMandateRequest,
  "quiet-conversation": buildQuietConversation,
  "quiet-change": buildQuietChange,
  "quiet-follow-through": buildQuietFollowThrough,
};
