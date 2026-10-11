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

export function buildTrialCard(v: Values) {
  return `AI STALEMATE — TRIAL CARD

WORK OUTCOME
${answer(v, "outcome")}

SHARED AMBITION / WHY THIS MATTERS
${answer(v, "sharedVision")}

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

SUCCESS BAR
${answer(v, "success")}

STOP RULE
${answer(v, "stop")}

TASK / REVIEWER / DECISION OWNERS / REVIEW DATE
${answer(v, "owners")}

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

COMPARATOR / COMPARABILITY LIMITS
${answer(v, "comparator")}
${answer(v, "comparability", "[comparability limits not entered]")}

RECORDED PERSON-MINUTES
${rows}

TOTAL RECORDED EFFORT
${totals}
${difference}

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
  const effort =
    baseline.complete && ai.complete
      ? `${baseline.minutes} person-minutes without AI; ${ai.minutes} with AI.`
      : "Effort comparison remains incomplete. See the Evidence Record.";
  return `AI STALEMATE — DECISION BRIEF

WORK OUTCOME / TESTED TASK
${answer(v, "outcome")}
${answer(v, "task")}

SHARED AMBITION
${answer(v, "sharedVision")}

CONDITIONS / COMPARATOR
${answer(v, "tool")} — ${answer(v, "toolVersion")}
${answer(v, "comparator")}

EVIDENCE
${effort}
${answer(v, "quality")}

DECISION
${answer(v, "decision", "[not selected]")}

WHY / UNRESOLVED DISAGREEMENT
${answer(v, "reason")}

LIMITS OF THIS EVIDENCE
${answer(v, "limits")}

NEXT ACTION / ACCOUNTABLE OWNER / DATE
${answer(v, "next")}

UPDATE TO LEADERSHIP
${answer(v, "leadershipUpdate")}`;
}

export function buildAITrialPackage(v: Values) {
  return [
    buildTrialCard(v),
    buildEvidenceRecord(v),
    buildDecisionBrief(v),
  ].join("\n\n\n");
}
