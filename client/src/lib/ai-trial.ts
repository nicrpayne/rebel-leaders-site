import { fieldToolChoiceLabel } from "./field-tool-choice-labels.ts";
import { qualityChecksRecord, qualityChecksObserved } from "./ai-quality.ts";
export const AI_EFFORT_STAGES = [
  { id: "setup", label: "Getting ready and giving the tool instructions" },
  { id: "drafting", label: "Writing the first version" },
  { id: "verification", label: "Checking and testing your own work" },
  { id: "review", label: "Someone else reviewing the work" },
  { id: "rework", label: "Making corrections" },
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

const answer = (
  v: Values,
  key: string,
  fallback = "Add this before sharing."
) => fieldToolChoiceLabel(key, v[key]?.trim() || fallback);

export function buildReadinessBrief(v: Values) {
  const optional = [
    ["WHAT WE WANT TO IMPROVE TOGETHER", [v.outcome, v.sharedVision]],
    ["WHERE THE ESTIMATE CAME FROM / WHO WILL CHECK IT", [v.businessBasis]],
    ["TEAM / COMPANY OPPORTUNITY", [v.growthOpportunity]],
    ["WHO MAY ACCESS WHICH RECORDS / WHO DECIDES", [v.accessModel]],
    ["CHECKING DATA ACCESS", [v.securityChecks]],
    ["WHAT THE AI IS ALLOWED TO DO", [v.automationBoundary]],
    ["WHAT THE TEAM HAS SHOWN IT CAN DO", [v.teamReadiness]],
    ["TRAINING / WORKING WITH AN EXPERIENCED REVIEWER", [v.readinessSupport]],
    ["UPDATE TO LEADERSHIP / SPONSOR", [v.conversationLeadershipUpdate]],
    ["UPDATE TO THE TEAM", [v.conversationTeamUpdate]],
  ] as const;
  return `AI STALEMATE — NEXT STEP TOGETHER

CONVERSATION STATUS
${answer(v, "conversationStatus", "PROPOSED — NOT YET AGREED")}

OUTCOME / CONTEXT
${answer(v, "businessContext")}

WHAT THE OTHER PERSON NEEDS OR IS WORRIED ABOUT
${answer(v, "counterpartConcern")}

WHAT WE AGREE ON / WHAT WE STILL NEED TO ASK
${answer(v, "openQuestions")}

WHAT WE WANT TO DO NEXT
${answer(v, "readinessDecision", "Choose and record the next move.")}

WHO WILL DO WHAT / WHEN WE WILL CHECK AGAIN
${answer(v, "prerequisitePlan")}
${optional
  .map(([title, entries]) => {
    const text = entries.filter(value => value?.trim()).join("\n");
    return text ? "\n" + title + "\n" + text + "\n" : "";
  })
  .join("")}
This record supports the conversation; it does not create agreement or certify security or team readiness. Appropriate owners must verify technical conditions. Private preparation is excluded.`;
}

const optionalRecord = (v: Values, key: string, title: string) =>
  v[key]?.trim() ? `\n\n${title}\n${v[key].trim()}` : "";

export function buildTrialCard(v: Values) {
  return `AI STALEMATE — EXPERIMENT PLAN

WHY TRY THIS?

THE PROBLEM / WHAT WE HAVE SEEN
${answer(v, "betBasis")}

WHAT WE THINK WILL HAPPEN / WHY
${answer(v, "betHypothesis")}

WHAT WE EXPECT / WHAT WE WILL COMPARE AND MEASURE
${answer(v, "expectedLift")}

OTHER CHANGES WE WILL LOOK FOR
${answer(v, "betQualitative", "Describe if relevant.")}

WORK OUTCOME
${answer(v, "outcome")}

WHAT WE WANT TO IMPROVE TOGETHER
${answer(v, "sharedVision")}

WHAT NEEDS TO HAPPEN BEFORE WE START
${answer(v, "readinessDecision", "Record the readiness decision.")}
${answer(v, "prerequisitePlan")}

SYSTEM / TEAM CONDITIONS
Access: ${answer(v, "accessModel")}
Verification: ${answer(v, "securityChecks")}
Agent boundaries: ${answer(v, "automationBoundary")}
Team support: ${answer(v, "readinessSupport")}

THE TASK / WHAT WE WILL NOT DO
${answer(v, "task")}

WORK WITHOUT AI / WHY THE COMPARISON IS FAIR
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
${answer(v, "betRabbitHoles", "None recorded; check before sharing.")}

SUCCESS BAR
${answer(v, "success")}

STOP RULE
${answer(v, "stop")}

TASK / REVIEWER / DECISION OWNERS / REVIEW DATE
${answer(v, "owners")}

HAS THE EXPERIMENT BEEN AGREED?
${answer(v, "betStatus", "PROPOSED — NOT YET ACCEPTED")}

Record these shared conditions before the experiment. Private preparation is excluded.${optionalRecord(v, "decisionRights", "DECISION RIGHTS / AFFECTED PEOPLE")}${optionalRecord(v, "deploymentPermission", "FURTHER APPROVAL FOR DEPLOYMENT OR EXPANSION")}`;
}

export function buildEvidenceRecord(v: Values) {
  const baseline = summarizeEffort(v, "baseline");
  const ai = summarizeEffort(v, "ai");
  const rows = AI_EFFORT_STAGES.map(stage => {
    const without = effortMinutes(v[`baseline_${stage.id}`]);
    const withAi = effortMinutes(v[`ai_${stage.id}`]);
    return `${stage.label}\n  Without AI: ${without === null ? "Add this before sharing." : without + " min"}\n  With AI: ${withAi === null ? "Add this before sharing." : withAi + " min"}`;
  }).join("\n\n");
  const totals = `Without AI: ${baseline.minutes} min${baseline.complete ? "" : " (partial; " + baseline.entered + "/6 stages)"}\nWith AI: ${ai.minutes} min${ai.complete ? "" : " (partial; " + ai.entered + "/6 stages)"}`;
  const difference =
    baseline.complete && ai.complete
      ? `Recorded effort difference: ${Math.round((ai.minutes - baseline.minutes) * 100) / 100} min (with AI minus without AI).`
      : "Comparison pending: enter all stages for both methods. Enter 0 when no effort occurred; blank means unknown.";
  return `AI STALEMATE — RESULTS RECORD

TESTED TASK
${answer(v, "task")}

PREDICTION / MINIMUM WORTHWHILE RESULT
${answer(v, "expectedLift")}
${answer(v, "success")}

RESULT COMPARED WITH WHAT WE EXPECTED
${answer(v, "betResult")}

WORK WITHOUT AI / DIFFERENCES THAT AFFECT THE COMPARISON
${answer(v, "comparator")}
${answer(v, "comparability", "Record the limits of this comparison.")}

RECORDED WORKING MINUTES
${rows}

TOTAL RECORDED EFFORT
${totals}
${difference}
${baseline.complete && ai.complete && baseline.minutes > 0 ? `Observed effort reduction: ${Math.round(((baseline.minutes - ai.minutes) / baseline.minutes) * 1000) / 10}%. Negative means more effort with AI. This is a descriptive comparison, not a causal estimate.` : "Observed percentage reduction unavailable: both methods need complete effort and a positive baseline."}

NOTES ABOUT THE TWO TASKS
${answer(v, "withoutAi")}
${answer(v, "withAi")}

QUALITY CHECKS / DEFECTS / REVIEWER EXPERIENCE
${answer(v, "quality")}

STRUCTURED QUALITY CHECKS
${qualityChecksRecord(v.qualityChecks)}

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
    Boolean(
      v.quality?.trim() ||
        v.withoutAi?.trim() ||
        v.withAi?.trim() ||
        qualityChecksObserved(v.qualityChecks)
    );
  const preTrial =
    !hasEvidence &&
    (v.betStatus === "NOT ATTEMPTED" ||
      v.betStatus === "NOT ACCEPTED" ||
      !v.readinessDecision ||
      [
        "CLARIFY THE CONVERSATION",
        "ASK A SPECIALIST",
        "PREPARE FIRST",
        "STOP THIS USE",
      ].includes(v.readinessDecision));
  const effort = preTrial
    ? "No experiment result is recorded for this preparation decision."
    : baseline.complete && ai.complete
      ? `${baseline.minutes} person-minutes without AI; ${ai.minutes} with AI.`
      : "Effort comparison remains incomplete. See the Results Record.";
  return `AI STALEMATE — DECISION BRIEF

CONVERSATION STATUS
${answer(v, "conversationStatus", "PROPOSED — NOT YET AGREED")}

WORK OUTCOME / ${preTrial ? "PROPOSED USE" : "TESTED TASK"}
${answer(v, "outcome")}
${answer(v, "task", preTrial ? "No experiment has been agreed or run." : "Add this before sharing.")}

SHARED AMBITION
${answer(v, "sharedVision")}

REPORTED BUSINESS CONTEXT / BASIS
${answer(v, "businessContext")}
${answer(v, "businessBasis")}

WHAT NEEDS TO HAPPEN FIRST / HELP NEEDED
${answer(v, "readinessDecision")}
${answer(v, "prerequisitePlan")}
Access: ${answer(v, "accessModel")}
Verification: ${answer(v, "securityChecks")}
Agent boundaries: ${answer(v, "automationBoundary")}
Team support: ${answer(v, "readinessSupport")}

AGREED CONDITIONS / WORK WITHOUT AI
${answer(v, "tool", preTrial ? "No tool or use approved for an experiment." : "Add this before sharing.")}${v.toolVersion?.trim() ? " — " + v.toolVersion.trim() : ""}
${answer(v, "comparator", preTrial ? "No experiment comparator agreed." : "Add this before sharing.")}

EVIDENCE
${effort}
${answer(v, "quality")}
${qualityChecksRecord(v.qualityChecks)}

DECISION
${answer(v, "decision", "Choose and record the decision.")}

WHY / UNRESOLVED DISAGREEMENT
${answer(v, "reason")}

LEARNING / POSSIBLE EXPLANATIONS
${answer(v, "betLearning")}

LIMITS OF THIS EVIDENCE
${answer(v, "limits")}

WHO WILL DO WHAT NEXT / WHEN
${answer(v, "next")}${optionalRecord(v, "unresolvedPlan", "IF UNRESOLVED / INTERIM MOVE / REVISIT")}${optionalRecord(v, "deploymentPermission", "FURTHER APPROVAL FOR DEPLOYMENT OR EXPANSION")}

UPDATE TO LEADERSHIP
${answer(v, "leadershipUpdate")}${optionalRecord(v, "teamUpdate", "UPDATE TO THE TEAM")}${optionalRecord(v, "decisionRights", "DECISION RIGHTS / AFFECTED PEOPLE")}${optionalRecord(v, "returnRecord", "RETURN TO THE WORK / WHAT CHANGED / NEXT REVIEW")}`;
}

export function buildAITrialPackage(v: Values) {
  return [
    buildReadinessBrief(v),
    ...((v.betStatus === "NOT ATTEMPTED" ||
      v.betStatus === "NOT ACCEPTED" ||
      (!v.readinessDecision && !v.task?.trim()) ||
      [
        "CLARIFY THE CONVERSATION",
        "ASK A SPECIALIST",
        "PREPARE FIRST",
        "STOP THIS USE",
      ].includes(v.readinessDecision)) &&
    !AI_EFFORT_STAGES.some(
      stage => v[`ai_${stage.id}`]?.trim() || v[`baseline_${stage.id}`]?.trim()
    ) &&
    !v.quality?.trim() &&
    !qualityChecksObserved(v.qualityChecks)
      ? []
      : [buildTrialCard(v), buildEvidenceRecord(v)]),
    buildDecisionBrief(v),
  ].join("\n\n\n");
}
