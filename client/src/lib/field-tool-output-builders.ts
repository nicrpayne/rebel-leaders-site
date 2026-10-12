import {
  buildAITrialPackage,
  buildTrialCard,
  buildEvidenceRecord,
  buildDecisionBrief,
} from "./ai-trial";

export const FIELD_OUTPUT_BUILDERS: Record<
  string,
  (v: Record<string, string>) => string
> = {
  "ai-stalemate": buildAITrialPackage,
  "deadline-reset": v => `DEADLINE RESET — STAKEHOLDER UPDATE

CURRENT COMMITMENT
The communicated date is ${v.date || "[date]"}.
The current promise is: ${v.promise || "[promise not entered]"}.

WHAT IS ACTUALLY FIXED
${v.fixed || "[not entered]"}

WHAT IS STILL ASSUMED / UNKNOWN
Assumptions: ${v.assumed || "[not entered]"}
Unknowns: ${v.unknown || "[not entered]"}

TRADEOFF
To protect the date, the responsible scope/capacity move is:
Scope / sequence: ${v.scopeMove || "[not entered]"}
Capacity: ${v.capacityMove || "[not entered]"}

IF NOTHING CHANGES
${v.consequence || "[not entered]"}

GUARDRAILS WE WILL NOT TRADE
${v.qualityGuardrails || "[not entered]"}

CURRENT CONFIDENCE
${v.confidence || "[not selected]"}

WHAT CHANGES CONFIDENCE NEXT
${v.evidenceNext || "[not entered]"}

DECISION NEEDED NOW
${v.decisionNeeded || "[not entered]"}

NEXT CHECKPOINT / OWNER
${v.checkpoint || "[date]"} — ${v.owner || "[owner]"}`,
  "priority-whiplash": v => `PRIORITY WHIPLASH — TRADEOFF BRIEF

CURRENT PRIORITIES
1. ${v.p1 || "[not entered]"}
2. ${v.p2 || "[not entered]"}
3. ${v.p3 || "[not entered]"}

NEW REQUEST
${v.newAsk || "[not entered]"}

WHY NOW
${v.whyNow || "[not entered]"}

IF THIS ENTERS, WHAT MOVES
${v.moves || "[not entered]"}

CONSEQUENCE
${v.impact || "[not entered]"}

WHAT STAYS PROTECTED
${v.protected || "[not entered]"}

RECOMMENDATION
${v.recommendation || "[not entered]"}

DECISION OWNER / DATE
${v.decisionOwner || "[owner]"} — ${v.decisionDate || "[date]"}

FINAL DECISION
${v.finalDecision || "[not entered]"}`,
  "mandate-reset": v => `MANDATE RESET — DECISION RIGHTS BRIEF

OUTCOME I AM ACCOUNTABLE FOR
${v.outcome || "[not entered]"}

DECISION I CANNOT CURRENTLY MAKE
${v.blockedDecision || "[not entered]"}

CURRENT DECISION PATH
Recommend: ${v.recommend || "[unknown]"}
Approve / decide: ${v.approve || "[unknown]"}
Execute: ${v.execute || "[unknown]"}
Can block: ${v.block || "[unknown]"}
Held accountable: ${v.accountable || "[unknown]"}

THE AUTHORITY GAP
${v.gap || "[not entered]"}

CONSEQUENCE IF UNRESOLVED
${v.consequence || "[not entered]"}

REQUESTED RESET
${v.request || "[not entered]"}

IF THAT CANNOT CHANGE
${v.fallback || "[not entered]"}

ACTION OWNER / DATE
${v.owner || "[owner]"} — ${v.date || "[date]"}`,
  "product-project-translator": v => `PRODUCT / PROJECT TRANSLATOR

ORIGINAL REQUEST
"${v.request || "[not entered]"}"

WHO IS ASKING
${v.stakeholder || "[not entered]"}

WHAT THEY LIKELY NEED
${v.need || "[not selected]"}
Context: ${v.context || "[not entered]"}

PROJECT ASSUMPTION TO TRANSLATE
${v.assumption || "[not entered]"}

PRODUCT REALITY
Known now: ${v.known || "[not entered]"}
Still unknown: ${v.unknown || "[not entered]"}
We can responsibly commit to: ${v.commit || "[not entered]"}
Next evidence / checkpoint: ${v.checkpoint || "[not entered]"}

RESPONSIBLE RESPONSE
${v.response || "[not entered]"}`,
};
export const AI_OUTPUT_BUILDERS = {
  "trial-card": buildTrialCard,
  "evidence-record": buildEvidenceRecord,
  "decision-brief": buildDecisionBrief,
  "working-record": buildAITrialPackage,
};
