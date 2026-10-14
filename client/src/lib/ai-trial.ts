import { fieldToolChoiceLabel } from "./field-tool-choice-labels.ts";
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
    [
      "WHAT THIS COULD MAKE POSSIBLE FOR THE TEAM OR COMPANY",
      [v.growthOpportunity],
    ],
    ["WHO MAY ACCESS WHICH RECORDS / WHO DECIDES", [v.accessModel]],
    ["CHECKING DATA ACCESS", [v.securityChecks]],
    ["WHAT THE AI IS ALLOWED TO DO", [v.automationBoundary]],
    ["WHAT THE TEAM HAS SHOWN IT CAN DO", [v.teamReadiness]],
    ["TRAINING / WORKING WITH AN EXPERIENCED REVIEWER", [v.readinessSupport]],
  ] as const;
  return `AI STALEMATE — NEXT STEP TOGETHER

CONVERSATION STATUS
${answer(v, "conversationStatus", "PROPOSED — NOT YET AGREED")}

WHAT WE WANT TO IMPROVE / WHY IT MATTERS
${answer(v, "businessContext")}

WHAT THE OTHER PERSON NEEDS OR IS WORRIED ABOUT
${answer(v, "counterpartConcern")}

WHAT WE AGREE ON / WHAT WE STILL NEED TO ASK
${answer(v, "openQuestions")}

WHAT WE WANT TO DO NEXT
${answer(v, "readinessDecision", "Choose what you want to do next.")}

WHO WILL DO WHAT / WHEN WE WILL CHECK AGAIN
${answer(v, "prerequisitePlan")}
${optional
  .map(([title, entries]) => {
    const text = entries.filter(value => value?.trim()).join("\n");
    return text ? "\n" + title + "\n" + text + "\n" : "";
  })
  .join("")}
Use this to talk through the next step. A proposal still needs agreement, and the people responsible must check the technical details and support the team needs. Your private notes are left out.`;
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

WHAT WE WANT TO IMPROVE
${answer(v, "outcome")}

WHAT WE WANT TO IMPROVE TOGETHER
${answer(v, "sharedVision")}

WHAT NEEDS TO HAPPEN BEFORE WE START
${answer(v, "readinessDecision", "Add what needs to happen before you start.")}
${answer(v, "prerequisitePlan")}

WHAT THE SYSTEM AND TEAM NEED
Access: ${answer(v, "accessModel")}
Checks: ${answer(v, "securityChecks")}
What the AI is allowed to do: ${answer(v, "automationBoundary")}
Team support: ${answer(v, "readinessSupport")}

THE TASK / WHAT WE WILL NOT DO
${answer(v, "task")}

WORK WITHOUT AI / WHY THE COMPARISON IS FAIR
${answer(v, "comparator")}

AI TOOL / VERSION
${answer(v, "tool")}
Version: ${answer(v, "toolVersion")}

INFORMATION WE MAY USE / WHO APPROVES IT
${answer(v, "inputs")}
Who can approve it: ${answer(v, "approvalOwner")}

CHECKS THE WORK MUST PASS / WHO CHECKS
${answer(v, "qualityBar")}

TIME WE WILL SET ASIDE / WORK THAT WOULD WAIT
${answer(v, "capacity")}

START AND FINISH / WHEN WE WILL REVIEW
${answer(v, "betTimebox")}

WHAT COULD MAKE THIS A BIGGER JOB / WHEN TO STOP
${answer(v, "betRabbitHoles", "None recorded; check before sharing.")}

WHAT WOULD MAKE THIS WORTH DOING AGAIN
${answer(v, "success")}

WHEN WE WILL STOP
${answer(v, "stop")}

WHO DOES THE WORK / WHO REVIEWS / WHO DECIDES / WHEN
${answer(v, "owners")}

HAS THE EXPERIMENT BEEN AGREED?
${answer(v, "betStatus", "PROPOSED — NOT YET ACCEPTED")}

Agree this plan with the people doing and approving the work before starting. Your private notes are left out.${optionalRecord(v, "decisionRights", "WHO CAN DECIDE / WHO NEEDS TO BE INVOLVED")}${optionalRecord(v, "deploymentPermission", "APPROVAL NEEDED FOR LIVE SYSTEMS OR WIDER USE")}`;
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
      ? `Difference in total working time: ${Math.round((ai.minutes - baseline.minutes) * 100) / 100} min (with AI minus without AI).`
      : "We need all stages for both methods before comparing them. Enter 0 when no time was spent; leave it blank if you do not know.";
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
${baseline.complete && ai.complete && baseline.minutes > 0 ? `Reduction in working time: ${Math.round(((baseline.minutes - ai.minutes) / baseline.minutes) * 1000) / 10}%. A negative number means it took longer with AI. This compares the two tasks; it does not show that AI caused the difference.` : "To calculate a percentage, add all the times for both tasks. The task without AI must have taken more than zero minutes."}

NOTES ABOUT THE TWO TASKS
${answer(v, "withoutAi")}
${answer(v, "withAi")}

QUALITY CHECKS / DEFECTS / REVIEWER EXPERIENCE
${answer(v, "quality")}

WAITING TIME / TOOL COSTS / LEARNING TO USE IT
${answer(v, "otherCosts")}

WHO WILL CHECK FOR LATER PROBLEMS / WHEN
${answer(v, "laterCheck")}

These totals show the time entered for this task. Check quality and differences between the tasks too; this result cannot tell us whether AI will help on every task.`;
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
      : "Some working times are still missing. Check the Results Record before comparing the tasks.";
  return `AI STALEMATE — DECISION BRIEF

CONVERSATION STATUS
${answer(v, "conversationStatus", "PROPOSED — NOT YET AGREED")}

WHAT WE WANT TO IMPROVE / ${preTrial ? "PROPOSED USE" : "TESTED TASK"}
${answer(v, "outcome")}
${answer(v, "task", preTrial ? "No experiment has been agreed or run." : "Add this before sharing.")}

WHAT WE HOPE TO MAKE POSSIBLE TOGETHER
${answer(v, "sharedVision")}

WHAT WE HAVE HEARD / WHERE IT CAME FROM
${answer(v, "businessContext")}
${answer(v, "businessBasis")}

WHAT NEEDS TO HAPPEN FIRST / HELP NEEDED
${answer(v, "readinessDecision")}
${answer(v, "prerequisitePlan")}
Access: ${answer(v, "accessModel")}
Checks: ${answer(v, "securityChecks")}
What the AI is allowed to do: ${answer(v, "automationBoundary")}
Team support: ${answer(v, "readinessSupport")}

AGREED CONDITIONS / WORK WITHOUT AI
${answer(v, "tool", preTrial ? "No tool or use approved for an experiment." : "Add this before sharing.")}${v.toolVersion?.trim() ? " — " + v.toolVersion.trim() : ""}
${answer(v, "comparator", preTrial ? "We have not yet agreed which task without AI to compare with." : "Add this before sharing.")}

EVIDENCE
${effort}
${answer(v, "quality")}

DECISION
${answer(v, "decision", "Choose and record the decision.")}

WHY / UNRESOLVED DISAGREEMENT
${answer(v, "reason")}

LEARNING / POSSIBLE EXPLANATIONS
${answer(v, "betLearning")}

LIMITS OF THIS EVIDENCE
${answer(v, "limits")}

WHO WILL DO WHAT NEXT / WHEN
${answer(v, "next")}${optionalRecord(v, "unresolvedPlan", "IF WE HAVE NOT AGREED / WHAT WE WILL DO WHILE WAITING / WHEN TO TALK AGAIN")}${optionalRecord(v, "deploymentPermission", "APPROVAL NEEDED FOR LIVE SYSTEMS OR WIDER USE")}

UPDATE TO LEADERSHIP
${answer(v, "leadershipUpdate")}`;
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
    !v.quality?.trim()
      ? []
      : [buildTrialCard(v), buildEvidenceRecord(v)]),
    buildDecisionBrief(v),
  ].join("\n\n\n");
}
