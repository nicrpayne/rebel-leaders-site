export type WorkingValues = Record<string, string>;
const value = (v: WorkingValues, key: string, fallback = "[not recorded]") =>
  v[key]?.trim() || fallback;
const section = (title: string, body: string) => `${title}\n${body}`;
const record = (title: string, sections: string[]) =>
  `${title}\n\n${sections.filter(Boolean).join("\n\n")}\n\nWorking record from your inputs. Verify before sharing. Private preparation is excluded.`;
const optional = (v: WorkingValues, key: string, title: string) =>
  v[key]?.trim() ? section(title, v[key].trim()) : "";
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
    return "Capacity is not fully quantified. Do not interpret missing estimates as spare capacity.";
  return `For ${value(v, "capacityWindow", "[window not recorded]")}, using entered person-days:\nAvailable: ${c.available}; existing work: ${c.existing}; new request: ${c.request}.\nBefore displacement, demand: ${c.total}; demand beyond entered capacity: ${Number(c.gap.toFixed(2))}.\nThese are planning assumptions, not a delivery forecast. Basis: ${value(v, "capacityBasis")}`;
}
export function buildDeadlineReality(v: WorkingValues) {
  return record("DEADLINE RESET — REALITY MAP", [
    section("CUSTOMER / TEAM OUTCOME", value(v, "outcome")),
    section(
      "COMMUNICATED DATE / PROMISE",
      `${value(v, "date")}\n${value(v, "promise")}`
    ),
    section(
      "ACTUAL CONSTRAINT / SOURCE",
      `${value(v, "fixed")}\nBasis: ${value(v, "constraintBasis")}`
    ),
    section(
      "ASSUMPTIONS / UNKNOWNS",
      `${value(v, "assumed")}\n${value(v, "unknown")}`
    ),
    section("FORECAST EVIDENCE", value(v, "forecastBasis")),
  ]);
}
export function buildDeadlineOptions(v: WorkingValues) {
  return record("DEADLINE RESET — OPTIONS BRIEF", [
    section(
      "OUTCOME / COMMUNICATED DATE",
      `${value(v, "outcome")}\n${value(v, "date")}`
    ),
    section("KEEP THE DATE / CHANGE THE SCOPE", value(v, "scopeMove")),
    section("KEEP THE SCOPE / REVISIT THE DATE", value(v, "dateMove")),
    section("CHANGE CAPACITY RESPONSIBLY", value(v, "capacityMove")),
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
  return record("DEADLINE RESET — STAKEHOLDER UPDATE", [
    section(
      "OUTCOME / CURRENT COMMITMENT",
      `${value(v, "outcome")}\nDate communicated: ${value(v, "date")}\nPromise: ${value(v, "promise")}`
    ),
    section(
      "WHAT IS FIXED / WHAT IS STILL ASSUMED",
      `${value(v, "fixed")}\nSource: ${value(v, "constraintBasis")}\nAssumptions: ${value(v, "assumed")}\nUnknowns: ${value(v, "unknown")}`
    ),
    section(
      "CURRENT CONFIDENCE / BASIS",
      `${value(v, "confidence", "Not assessed")} (qualitative judgment, not a calculated probability)\n${value(v, "forecastBasis")}\nApplies to: ${value(v, "confidenceScope")}`
    ),
    section(
      "RECOMMENDATION / TRADEOFF",
      `${value(v, "chosenOption")}\n${value(v, "recommendation")}\nScope: ${value(v, "scopeMove")}\nDate alternative: ${value(v, "dateMove")}\nCapacity: ${value(v, "capacityMove")}`
    ),
    section(
      "PROTECTED GUARDRAILS / CONSEQUENCE",
      `${value(v, "qualityGuardrails")}\nIf nothing changes: ${value(v, "consequence")}`
    ),
    section(
      "DECISION NEEDED / OWNER / BY",
      `${value(v, "decisionNeeded")}\n${value(v, "owner")} — ${value(v, "decisionBy")}`
    ),
    status(v),
    section(
      "RECORDED RESPONSE",
      value(
        v,
        "finalDecision",
        "No agreement recorded. Recommendation remains a proposal."
      )
    ),
    section(
      "NEXT EVIDENCE / CHECKPOINT",
      `${value(v, "evidenceNext")}\n${value(v, "checkpoint")}`
    ),
    section(
      "WHO NEEDS THE UPDATE / COMMUNICATION OWNER",
      value(v, "communication")
    ),
    optional(
      v,
      "unresolvedPlan",
      "IF NO DECISION IS REACHED / INTERIM MOVE / REVISIT"
    ),
    optional(
      v,
      "checkpointFallback",
      "IF THE EVIDENCE CHECKPOINT FAILS / DECISION OWNER"
    ),
  ]);
}
export function buildPriorityStack(v: WorkingValues) {
  return record("PRIORITY WHIPLASH — PRIORITY STACK", [
    section("OUTCOME WE ARE PROTECTING", value(v, "outcome")),
    section(
      "CURRENT COMMITMENTS",
      `1. ${value(v, "p1")}\n2. ${value(v, "p2")}\n3. ${value(v, "p3")}\nOther work: ${value(v, "otherWork")}`
    ),
    section(
      "NEW REQUEST / WHY NOW",
      `${value(v, "newAsk")}\n${value(v, "whyNow")}\nUrgency basis: ${value(v, "urgencyBasis")}`
    ),
    section("CAPACITY CHECK", capacityText(v)),
  ]);
}
export function buildDisplacementMap(v: WorkingValues) {
  return record("PRIORITY WHIPLASH — DISPLACEMENT MAP", [
    section("NEW REQUEST", value(v, "newAsk")),
    section("OPTION BEING RECOMMENDED", value(v, "priorityChoice")),
    section(
      "WHAT MOVES / CONSEQUENCE",
      `${value(v, "moves")}\n${value(v, "impact")}`
    ),
    section("WHAT STAYS PROTECTED", value(v, "protected")),
    section("ALTERNATIVE / ITS CONSEQUENCE", value(v, "alternative")),
    section("CAPACITY CHECK", capacityText(v)),
    status(v),
  ]);
}
export function buildTradeoffBrief(v: WorkingValues) {
  return record("PRIORITY WHIPLASH — TRADEOFF BRIEF", [
    section(
      "OUTCOME / CURRENT PRIORITIES",
      `${value(v, "outcome")}\n1. ${value(v, "p1")}\n2. ${value(v, "p2")}\n3. ${value(v, "p3")}\nOther work: ${value(v, "otherWork")}`
    ),
    section(
      "NEW REQUEST / URGENCY EVIDENCE",
      `${value(v, "newAsk")}\n${value(v, "whyNow")}\n${value(v, "urgencyBasis")}`
    ),
    section("CAPACITY CHECK", capacityText(v)),
    section(
      "RECOMMENDATION / DISPLACEMENT",
      `${value(v, "priorityChoice")}\n${value(v, "recommendation")}\nWhat moves: ${value(v, "moves")}\nConsequence: ${value(v, "impact")}`
    ),
    section(
      "PROTECTED WORK / ALTERNATIVE",
      `${value(v, "protected")}\n${value(v, "alternative")}`
    ),
    section(
      "DECISION OWNER / NEEDED BY",
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
      "IF NO DECISION IS REACHED / INTERIM MOVE / REVISIT"
    ),
    optional(
      v,
      "emergencyException",
      "TEMPORARY EMERGENCY EXCEPTION / OWNER / EXPIRY"
    ),
  ]);
}
export function buildRightsMap(v: WorkingValues) {
  return record("MANDATE RESET — DECISION RIGHTS MAP", [
    section(
      "OUTCOME / SPECIFIC DECISION",
      `${value(v, "outcome")}\n${value(v, "blockedDecision")}`
    ),
    section(
      "CURRENT DECISION PATH",
      `Recommends (R): ${value(v, "recommend", "Unknown")}\nFinal decision (D): ${value(v, "approve", "Unknown")}\nPerforms (P): ${value(v, "execute", "Unknown")}\nCan constrain / block: ${value(v, "block", "Unknown")}\nAccountable for outcome: ${value(v, "accountable", "Unknown")}`
    ),
    section(
      "CONFIRMED RIGHTS / OPEN QUESTIONS",
      value(v, "rightsEvidence", "Decision rights are not yet verified.")
    ),
    section("REQUIRED AGREEMENT (A)", value(v, "requiredApprovals")),
    optional(v, "consult", "CONSULTED INPUT (I)"),
  ]);
}
export function buildAuthorityGap(v: WorkingValues) {
  return record("MANDATE RESET — AUTHORITY GAP STATEMENT", [
    section(
      "OUTCOME / BLOCKED DECISION",
      `${value(v, "outcome")}\n${value(v, "blockedDecision")}`
    ),
    section("OBSERVABLE AUTHORITY GAP", value(v, "gap")),
    section("BUSINESS / TEAM CONSEQUENCE", value(v, "consequence")),
    section("SPECIFIC RESET REQUEST", value(v, "request")),
    section(
      "BOUNDS / REQUIRED APPROVALS",
      `${value(v, "boundaries")}\n${value(v, "requiredApprovals")}`
    ),
    section("FALLBACK IF AUTHORITY CANNOT CHANGE", value(v, "fallback")),
    status(v),
  ]);
}
export function buildMandateRequest(v: WorkingValues) {
  return record("MANDATE RESET — RESET REQUEST", [
    section(
      "OUTCOME / CURRENT BLOCK",
      `${value(v, "outcome")}\n${value(v, "blockedDecision")}`
    ),
    section(
      "CURRENT DECISION RIGHTS / VERIFICATION",
      `Recommend (R): ${value(v, "recommend")}\nDecide (D): ${value(v, "approve")}\nPerform (P): ${value(v, "execute")}\nCan block: ${value(v, "block")}\nAccountable: ${value(v, "accountable")}\nBasis: ${value(v, "rightsEvidence")}`
    ),
    section(
      "AUTHORITY GAP / CONSEQUENCE",
      `${value(v, "gap")}\n${value(v, "consequence")}`
    ),
    section(
      "REQUEST / OPERATING BOUNDARIES",
      `${value(v, "request")}\n${value(v, "boundaries")}\nRequired agreement (A): ${value(v, "requiredApprovals")}`
    ),
    optional(v, "consult", "CONSULTED INPUT (I)"),
    section("IF THE REQUEST CANNOT BE GRANTED", value(v, "fallback")),
    section(
      "ACTION OWNER / NEEDED BY",
      `${value(v, "owner")} — ${value(v, "date")}`
    ),
    status(v),
    section(
      "RECORDED RESPONSE / INTERIM ACTION",
      `${value(v, "finalDecision", "No reset agreed. This brief does not grant new authority.")}\n${value(v, "interimAction")}`
    ),
    section("NEXT REVIEW / WHAT WILL SHOW IT WORKS", value(v, "reviewDate")),
    optional(
      v,
      "unresolvedPlan",
      "IF NO DECISION IS REACHED / INTERIM MOVE / REVISIT"
    ),
  ]);
}
export function buildRequestDecoder(v: WorkingValues) {
  return record("PRODUCT / PROJECT TRANSLATOR — REQUEST DECODER", [
    section(
      "EXACT REQUEST / STAKEHOLDER",
      `${value(v, "request")}\n${value(v, "stakeholder")}`
    ),
    section(
      "COORDINATION NEED / CONTEXT",
      `${value(v, "need")}\n${value(v, "context")}`
    ),
    section(
      "WHAT WE ASKED / WHAT THEY CONFIRMED",
      value(
        v,
        "needEvidence",
        "Underlying need is a hypothesis; confirm it with the stakeholder."
      )
    ),
    section("ASSUMPTION TO CHECK", value(v, "assumption")),
  ]);
}
export function buildProductTranslation(v: WorkingValues) {
  return record("PRODUCT / PROJECT TRANSLATOR — COMMITMENT CARD", [
    section(
      "OUTCOME / COORDINATION NEED",
      `${value(v, "outcome")}\n${value(v, "need")}\n${value(v, "needEvidence")}`
    ),
    section("KNOWN / EVIDENCE", value(v, "known")),
    section(
      "UNKNOWN / HOW WE WILL LEARN",
      `${value(v, "unknown")}\n${value(v, "checkpoint")}`
    ),
    section(
      "PROPOSED COMMITMENT / BOUNDARIES",
      `${value(v, "commit")}\n${value(v, "commitmentBounds")}`
    ),
    section(
      "OWNER / DATE / DECISION NEEDED",
      `${value(v, "owner")} — ${value(v, "decisionDate")}\n${value(v, "decisionNeeded")}`
    ),
    status(v),
  ]);
}
export function buildStakeholderResponse(v: WorkingValues) {
  return record("PRODUCT / PROJECT TRANSLATOR — STAKEHOLDER RESPONSE", [
    section("MESSAGE / MEETING SCRIPT", value(v, "response")),
    section(
      "ORIGINAL REQUEST / WHO IS ASKING",
      `${value(v, "request")}\n${value(v, "stakeholder")}`
    ),
    section(
      "COORDINATION NEED / CONFIRMATION",
      `${value(v, "need")}\n${value(v, "context")}\n${value(v, "needEvidence")}`
    ),
    section("KNOWN / UNKNOWN", `${value(v, "known")}\n${value(v, "unknown")}`),
    section(
      "PROPOSED COMMITMENT / BOUNDS",
      `${value(v, "commit")}\n${value(v, "commitmentBounds")}`
    ),
    section("NEXT EVIDENCE CHECKPOINT", value(v, "checkpoint")),
    section(
      "DECISION NEEDED / OWNER / BY",
      `${value(v, "decisionNeeded")}\n${value(v, "owner")} — ${value(v, "decisionDate")}`
    ),
    status(v),
    section(
      "RECORDED RESPONSE / NEXT ACTION",
      `${value(v, "finalDecision", "No stakeholder agreement recorded.")}\n${value(v, "nextAction")}`
    ),
    optional(
      v,
      "unresolvedPlan",
      "IF NO DECISION IS REACHED / INTERIM MOVE / REVISIT"
    ),
    optional(v, "spokenResponse", "SHORT SPOKEN VERSION"),
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
  "request-decoder": buildRequestDecoder,
  "commitment-card": buildProductTranslation,
  "stakeholder-response": buildStakeholderResponse,
};
