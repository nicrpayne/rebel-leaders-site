export const AI_EFFORT_STAGES = [
  { id: "setup", label: "Setup, context, and prompting" },
  { id: "drafting", label: "Drafting / implementation" },
  { id: "verification", label: "Author verification and tests" },
  { id: "review", label: "Reviewer checking" },
  { id: "rework", label: "Rework and fixes" },
  { id: "followup", label: "Follow-up work" },
] as const;

type Values = Record<string, string>;
export type EffortSummary = {
  minutes: number;
  entered: number;
  complete: boolean;
};

export function effortMinutes(value: string | undefined): number | null {
  if (!value?.trim()) return null;
  const minutes = Number(value);
  return Number.isFinite(minutes) && minutes >= 0 ? minutes : null;
}

export function summarizeEffort(
  values: Values,
  method: "baseline" | "ai"
): EffortSummary {
  const entries = AI_EFFORT_STAGES.map(stage =>
    effortMinutes(values[`${method}_${stage.id}`])
  );
  return {
    minutes:
      Math.round(
        entries.reduce<number>((sum, value) => sum + (value ?? 0), 0) * 100
      ) / 100,
    entered: entries.filter(value => value !== null).length,
    complete: entries.every(value => value !== null),
  };
}

const answer = (v: Values, key: string, fallback = "[not entered]") =>
  v[key]?.trim() || fallback;

export function buildReadinessBrief(v: Values) {
  const optional = [
    ["WORK OUTCOME / SHARED AMBITION", [v.outcome, v.sharedVision]],
    ["BUSINESS BASIS / VALIDATION OWNER", [v.businessBasis]],
    ["TEAM / COMPANY OPPORTUNITY", [v.growthOpportunity]],
    ["ACCESS MODEL / POLICY OWNER", [v.accessModel]],
    ["API / PERMISSION VERIFICATION", [v.securityChecks]],
    ["AI / AGENT OPERATING BOUNDARIES", [v.automationBoundary]],
    ["DEMONSTRATED TEAM CAPABILITY", [v.teamReadiness]],
    ["TRAINING / PAIRING / QUALIFIED REVIEW", [v.readinessSupport]],
  ] as const;
  return `AI STALEMATE — SHARED NEXT-STEP BRIEF

CONVERSATION STATUS
${answer(v, "conversationStatus", "PROPOSED — NOT YET AGREED")}

OUTCOME / CONTEXT
${answer(v, "businessContext")}

COUNTERPART'S CONCERN / NEED
${answer(v, "counterpartConcern")}

SHARED UNDERSTANDING / OPEN QUESTIONS
${answer(v, "openQuestions")}

PROPOSED OR AGREED NEXT MOVE
${answer(v, "readinessDecision", "[not selected]")}

NEXT ACTION / OWNERS / REVIEW DATE
${answer(v, "prerequisitePlan")}
${optional
  .map(([title, entries]) => {
    const text = entries.filter(value => value?.trim()).join("\n");
    return text ? "\n" + title + "\n" + text + "\n" : "";
  })
  .join("")}
This record supports the conversation; it does not create agreement or certify security or team readiness. Appropriate owners must verify technical conditions. Private preparation is excluded.`;
}

export function buildTrialCard(v: Values) {
  return `AI STALEMATE — BET BRIEF

THE PITCH

OBSERVED PROBLEM / EVIDENCE BASIS
${answer(v, "betBasis")}

HYPOTHESIS / WHY WE EXPECT THIS
${answer(v, "betHypothesis")}

PREDICTED IMPROVEMENT / BASELINE / MEASURE
${answer(v, "expectedLift")}

EXPECTED QUALITATIVE CHANGES
${answer(v, "betQualitative", "[not specified]")}

WORK OUTCOME
${answer(v, "outcome")}

SHARED AMBITION / WHY THIS MATTERS
${answer(v, "sharedVision")}

READINESS / PREREQUISITES
${answer(v, "readinessDecision", "[readiness decision not recorded]")}
${answer(v, "prerequisitePlan")}

SYSTEM / TEAM CONDITIONS
Access: ${answer(v, "accessModel")}
Verification: ${answer(v, "securityChecks")}
Agent boundaries: ${answer(v, "automationBoundary")}
Team support: ${answer(v, "readinessSupport")}

BOUNDED TASK / OUT OF SCOPE
${answer(v, "task")}

COMPARATOR / WHY IT IS COMPARABLE
${answer(v, "comparator")}

AI TOOL / VERSION
${answer(v, "tool")}
Version: ${answer(v, "toolVersion")}

ALLOWED INPUTS / APPROVAL OWNER
${answer(v, "inputs")}
Approval owner: ${answer(v, "approvalOwner")}

QUALITY BAR / ACCEPTANCE OWNER
${answer(v, "qualityBar")}

PROTECTED CAPACITY / DISPLACED WORK
${answer(v, "capacity")}

TIMEBOX / EVIDENCE CHECKPOINT
${answer(v, "betTimebox")}

RABBIT HOLES / CONTAINMENT
${answer(v, "betRabbitHoles", "[none recorded]")}

SUCCESS BAR
${answer(v, "success")}

STOP RULE
${answer(v, "stop")}

TASK / REVIEWER / DECISION OWNERS / REVIEW DATE
${answer(v, "owners")}

BET ACCEPTANCE
${answer(v, "betStatus", "PROPOSED — NOT YET ACCEPTED")}

Record these shared conditions before the trial. Private preparation is excluded.`;
}

export function buildEvidenceRecord(v: Values) {
  const baseline = summarizeEffort(v, "baseline");
  const ai = summarizeEffort(v, "ai");
  const rows = AI_EFFORT_STAGES.map(stage => {
    const without = effortMinutes(v[`baseline_${stage.id}`]);
    const withAi = effortMinutes(v[`ai_${stage.id}`]);
    return `${stage.label}\n  Without AI: ${without === null ? "[not entered]" : without + " min"}\n  With AI: ${withAi === null ? "[not entered]" : withAi + " min"}`;
  }).join("\n\n");
  const totals = `Without AI: ${baseline.minutes} min${baseline.complete ? "" : " (partial; " + baseline.entered + "/6 stages)"}\nWith AI: ${ai.minutes} min${ai.complete ? "" : " (partial; " + ai.entered + "/6 stages)"}`;
  const difference =
    baseline.complete && ai.complete
      ? `Recorded effort difference: ${Math.round((ai.minutes - baseline.minutes) * 100) / 100} min (with AI minus without AI).`
      : "Comparison pending: enter all stages for both methods. Enter 0 when no effort occurred; blank means unknown.";
  return `AI STALEMATE — EVIDENCE RECORD

TESTED TASK
${answer(v, "task")}

PREDICTION / MINIMUM WORTHWHILE RESULT
${answer(v, "expectedLift")}
${answer(v, "success")}

RESULT AGAINST THE BET
${answer(v, "betResult")}

COMPARATOR / COMPARABILITY LIMITS
${answer(v, "comparator")}
${answer(v, "comparability", "[comparability limits not entered]")}

RECORDED PERSON-MINUTES
${rows}

TOTAL RECORDED EFFORT
${totals}
${difference}
${baseline.complete && ai.complete && baseline.minutes > 0 ? `Observed effort reduction: ${Math.round(((baseline.minutes - ai.minutes) / baseline.minutes) * 1000) / 10}%. Negative means more effort with AI. This is a descriptive comparison, not a causal estimate.` : "Observed percentage reduction unavailable: both methods need complete effort and a positive baseline."}

AUTHOR / COMPARATOR NOTES
${answer(v, "withoutAi")}
${answer(v, "withAi")}

QUALITY CHECKS / DEFECTS / REVIEWER EXPERIENCE
${answer(v, "quality")}

ELAPSED TIME / TOOL COST / LEARNING EFFECTS
${answer(v, "otherCosts")}

LATER DEFECT CHECK / OWNER / DATE
${answer(v, "laterCheck")}

These totals describe recorded effort for this task. They do not establish quality, causation, or a universal productivity result.`;
}

export function buildDecisionBrief(v: Values) {
  const baseline = summarizeEffort(v, "baseline");
  const ai = summarizeEffort(v, "ai");
  const hasEvidence =
    baseline.entered > 0 ||
    ai.entered > 0 ||
    Boolean(v.quality?.trim() || v.withoutAi?.trim() || v.withAi?.trim());
  const preTrial =
    !hasEvidence &&
    (!v.readinessDecision ||
      [
        "CLARIFY THE CONVERSATION",
        "ASK A SPECIALIST",
        "PREPARE FIRST",
        "STOP THIS USE",
      ].includes(v.readinessDecision));
  const effort = preTrial
    ? "No trial result is recorded for this preparation decision."
    : baseline.complete && ai.complete
      ? `${baseline.minutes} person-minutes without AI; ${ai.minutes} with AI.`
      : "Effort comparison remains incomplete. See the Evidence Record.";
  return `AI STALEMATE — DECISION BRIEF

CONVERSATION STATUS
${answer(v, "conversationStatus", "PROPOSED — NOT YET AGREED")}

WORK OUTCOME / ${preTrial ? "PROPOSED USE" : "TESTED TASK"}
${answer(v, "outcome")}
${answer(v, "task", preTrial ? "No trial has been agreed or run." : "[not entered]")}

SHARED AMBITION
${answer(v, "sharedVision")}

REPORTED BUSINESS CONTEXT / BASIS
${answer(v, "businessContext")}
${answer(v, "businessBasis")}

READINESS / REQUIRED INVESTMENT
${answer(v, "readinessDecision")}
${answer(v, "prerequisitePlan")}
Access: ${answer(v, "accessModel")}
Verification: ${answer(v, "securityChecks")}
Agent boundaries: ${answer(v, "automationBoundary")}
Team support: ${answer(v, "readinessSupport")}

CONDITIONS / COMPARATOR
${answer(v, "tool", preTrial ? "[tool/use not approved for a trial]" : "[not entered]")} — ${answer(v, "toolVersion")}
${answer(v, "comparator", preTrial ? "[no trial comparator agreed]" : "[not entered]")}

EVIDENCE
${effort}
${answer(v, "quality")}

DECISION
${answer(v, "decision", "[not selected]")}

WHY / UNRESOLVED DISAGREEMENT
${answer(v, "reason")}

LEARNING / POSSIBLE EXPLANATIONS
${answer(v, "betLearning")}

LIMITS OF THIS EVIDENCE
${answer(v, "limits")}

NEXT ACTION / ACCOUNTABLE OWNER / DATE
${answer(v, "next")}

UPDATE TO LEADERSHIP
${answer(v, "leadershipUpdate")}`;
}

export function buildAITrialPackage(v: Values) {
  return [
    buildReadinessBrief(v),
    ...(((!v.readinessDecision && !v.task?.trim()) ||
      [
        "CLARIFY THE CONVERSATION",
        "ASK A SPECIALIST",
        "PREPARE FIRST",
        "STOP THIS USE",
      ].includes(v.readinessDecision)) &&
    !AI_EFFORT_STAGES.some(
      stage => v[`ai_${stage.id}`]?.trim() || v[`baseline_${stage.id}`]?.trim()
    ) &&
    !v.quality?.trim()
      ? []
      : [buildTrialCard(v), buildEvidenceRecord(v)]),
    buildDecisionBrief(v),
  ].join("\n\n\n");
}
