import { LEADERSHIP_LABS } from "./leadership-labs.ts";
import {
  buildAITrialPackage,
  buildTrialCard,
  buildEvidenceRecord,
  buildDecisionBrief,
} from "../../client/src/lib/ai-trial.ts";

type FieldType = "text" | "textarea" | "select";

export type FieldDef = {
  id: string;
  label: string;
  hint?: string;
  section?: string;
  type?: FieldType;
  options?: string[];
};

type StepDef = {
  eyebrow: string;
  title: string;
  intro: string;
  fields: FieldDef[];
};

export type LabConfig = {
  steps: StepDef[];
  buildOutput: (v: Record<string, string>) => string;
  outputs?: Array<{
    id: string;
    title: string;
    fromStep: number;
    build: (v: Record<string, string>) => string;
  }>;
};

export const FIELD_LABS: Record<string, LabConfig> = {
  "ai-stalemate": {
    steps: [
      {
        eyebrow: "PRIVATE PREP",
        title: "Start with your side of the table.",
        intro:
          "Separate observation from interpretation. Your counterpart does not need to see this page.",
        fields: [
          {
            id: "side",
            label: "Which side are you starting from?",
            type: "select",
            options: ["Product / Leadership", "Engineering / Tech Leadership"],
          },
          {
            id: "happened",
            section: "01 / UNDERSTAND THE MOMENT",
            label: "What actually happened?",
            type: "textarea",
            hint: "Use actual words, requests, or events where you can.",
          },
          {
            id: "story",
            label: "What story are you adding about the other person's motive?",
            type: "textarea",
          },
          {
            id: "protecting",
            label:
              "What opportunity, cost, or responsibility are you protecting?",
            type: "textarea",
          },
          {
            id: "why",
            section: "02 / CLARIFY YOUR WHY",
            label: "Why is this improvement worth pursuing?",
            type: "textarea",
            hint: "Whose work or experience could improve? Why does that matter to you?",
          },
          {
            id: "futurePicture",
            label: "What better future could you help create together?",
            type: "textarea",
            hint: "Paint a specific before and after for customers, the team, or the company. Treat career opportunities as a possibility, not a guarantee.",
          },
          {
            id: "observed",
            label: "What have you actually observed?",
            type: "textarea",
          },
          {
            id: "prediction",
            label: "What is still prediction?",
            type: "textarea",
          },
          {
            id: "changeMind",
            label: "What would change your mind?",
            type: "textarea",
          },
          {
            id: "askOther",
            label: "What do you still need to ask the other person?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "SHARED WORK",
        title: "Shape a bet you can learn from.",
        intro:
          "If existing evidence already answers the question, use it. If approval or ownership is missing, pause and name the prerequisite.",
        fields: [
          {
            id: "outcome",
            section: "01 / THE SHARED AMBITION",
            label: "What work outcome are we trying to improve?",
            type: "textarea",
          },
          {
            id: "sharedVision",
            label: "What ambition and Why do you both agree to pursue?",
            type: "textarea",
            hint: "Invite the other leader to shape the picture. Record the shared version here; your private vision notes stay out of exports.",
          },
          {
            id: "task",
            label: "Exact task — and what is explicitly out of scope",
            type: "textarea",
          },
          {
            id: "betBasis",
            label: "What observed problem makes this bet worth considering?",
            type: "textarea",
            hint: "Share facts and their source. Keep your interpretation separate; private preparation is never copied here automatically.",
          },
          {
            id: "betHypothesis",
            label: "What are you betting will happen, and why?",
            type: "textarea",
            hint: "If we try this approach on this task, we expect this outcome because... Name the uncertainty you want to resolve.",
          },
          {
            id: "expectedLift",
            label: "What improvement do you predict?",
            type: "textarea",
            hint: "Name the baseline, expected change, unit, and measurement. A reasoned range is fine. Record qualitative changes separately; this is a prediction, not a promised result.",
          },
          {
            id: "betQualitative",
            label: "What else might change for the team or customers?",
            type: "textarea",
            hint: "Optional: confidence, review experience, clarity, or learning. Say how you would notice it.",
          },
          {
            id: "comparator",
            label:
              "Comparator — what work without AI will you compare against?",
            type: "textarea",
            hint: "Name the comparable task and why its complexity, quality bar, and experience are similar.",
          },
          {
            id: "tool",
            label: "AI tool",
            type: "text",
            section: "02 / TOOL AND PERMISSION",
          },
          { id: "toolVersion", label: "Tool / model version", type: "text" },
          {
            id: "inputs",
            label: "Allowed inputs and data boundaries",
            type: "textarea",
          },
          {
            id: "approvalOwner",
            label: "Who approves the tool and these inputs?",
            type: "text",
          },
          {
            id: "qualityBar",
            section: "03 / QUALITY AND CAPACITY",
            label: "Acceptance checks and accountable engineering owner",
            type: "textarea",
          },
          {
            id: "capacity",
            label:
              "Appetite — effort budget, reviewer time, and work displaced",
            type: "textarea",
            hint: "How much effort are you willing to invest in learning? Set author and reviewer limits, any tool budget, and the work that moves. This is a budget, not a delivery estimate.",
          },
          {
            id: "betTimebox",
            label: "When does the experiment start and end?",
            type: "textarea",
            hint: "Set a start, end, and evidence checkpoint. Calendar time and person-hours are different constraints.",
          },
          {
            id: "betRabbitHoles",
            label: "Rabbit holes — what could pull this beyond the budget?",
            type: "textarea",
            hint: "Optional: flag known complications and how you will contain them. Put excluded work in the task's out-of-scope boundary.",
          },
          {
            id: "success",
            label: "What result would make this bet worth continuing?",
            type: "textarea",
            section: "04 / THE BAR AND OWNERS",
            hint: "Agree the minimum worthwhile improvement before running the experiment, plus quality and reviewer guardrails. It can differ from your predicted improvement.",
          },
          { id: "stop", label: "Stop rule", type: "textarea" },
          {
            id: "owners",
            label: "Task owner, reviewer, decision owner, review date",
            type: "textarea",
          },
          {
            id: "betStatus",
            label: "Has this bet been accepted by the accountable owners?",
            type: "select",
            options: [
              "PROPOSED — NOT YET ACCEPTED",
              "ACCEPTED — CONDITIONS AGREED",
              "NOT ACCEPTED",
              "NOT ATTEMPTED",
            ],
            hint: "A completed brief does not create agreement. Record acceptance with the owners before starting.",
          },
        ],
      },
      {
        eyebrow: "EVIDENCE",
        title: "Count the full cost.",
        intro:
          "Drafting speed is not team productivity if the burden simply moves to verification, review, rework, or later defects.",
        fields: [
          {
            id: "betResult",
            label:
              "How close were the results to your prediction and success bar?",
            type: "textarea",
            hint: "Compare the expected improvement with observed effort, quality, and qualitative changes. Say supported, not supported, or inconclusive; a small local experiment does not prove a universal claim.",
          },
          {
            id: "comparability",
            label: "What limits the comparison?",
            type: "textarea",
            hint: "Different task size, author experience, first-use learning, or changed quality bar?",
          },
          {
            id: "withoutAi",
            label: "Without-AI workflow notes",
            type: "textarea",
          },
          { id: "withAi", label: "With-AI workflow notes", type: "textarea" },
          {
            id: "quality",
            label: "Quality checks, defects, and reviewer experience",
            type: "textarea",
          },
          {
            id: "otherCosts",
            label: "Elapsed time, tool cost, and learning effects",
            type: "textarea",
            hint: "Person-minutes above are effort, not elapsed time or a financial ROI calculation.",
          },
          {
            id: "laterCheck",
            label: "Later defect check — what, who, and when?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "DECISION",
        title: "Continue, revise, stop, or pause.",
        intro:
          "A failed use case can be a successful leadership outcome if it gives you evidence you can act on.",
        fields: [
          {
            id: "decision",
            label: "Decision",
            type: "select",
            options: ["CONTINUE", "REVISE", "STOP", "PAUSE"],
          },
          {
            id: "reason",
            label: "Reason and unresolved disagreement",
            type: "textarea",
          },
          {
            id: "betLearning",
            label: "What did you learn, and what might explain the result?",
            type: "textarea",
            hint: "Separate observations from possible explanations. If the bet was never attempted, say so; that is not a failed experiment.",
          },
          {
            id: "limits",
            label: "What this evidence does not establish",
            type: "textarea",
          },
          {
            id: "next",
            label: "Next action, accountable owner, and date",
            type: "textarea",
          },
          {
            id: "leadershipUpdate",
            label: "One-sentence update to leadership",
            type: "textarea",
          },
        ],
      },
    ],
    buildOutput: buildAITrialPackage,
    outputs: [
      {
        id: "trial-card",
        title: "Bet Brief",
        fromStep: 1,
        build: buildTrialCard,
      },
      {
        id: "evidence-record",
        title: "Evidence Record",
        fromStep: 2,
        build: buildEvidenceRecord,
      },
      {
        id: "decision-brief",
        title: "Decision Brief",
        fromStep: 3,
        build: buildDecisionBrief,
      },
      {
        id: "working-record",
        title: "Full working record",
        fromStep: 3,
        build: buildAITrialPackage,
      },
    ],
  },

  ...LEADERSHIP_LABS,
};
