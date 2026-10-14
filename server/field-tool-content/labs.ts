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
        eyebrow: "BEFORE YOU TALK",
        title: "What has happened so far?",
        intro:
          "Take a few minutes to get your thoughts straight before you talk. These notes are just for you.",
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
              "What do you want to improve, and what are you worried about losing?",
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
            label: "If this went well, what would be better for people?",
            type: "textarea",
            hint: "Picture an ordinary day for a customer or teammate. What would be easier or better? You can be ambitious without promising that it will happen.",
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
        eyebrow: "EXPERIMENT",
        title: "What would be worth trying?",
        intro:
          "Check what you already know. If a test would help, agree the task, the time you will spend, and who needs to approve it before starting.",
        fields: [
          {
            id: "outcome",
            section: "01 / WHAT WE WANT TO IMPROVE",
            label: "What do we want to make better?",
            type: "textarea",
          },
          {
            id: "sharedVision",
            label: "What do you both want to achieve, and why does it matter?",
            type: "textarea",
            hint: "Ask the other person what they would add or change. Record what you have agreed, or mark it as a suggestion you still need to discuss.",
          },
          {
            id: "task",
            label: "What will you try, and what will you leave out?",
            type: "textarea",
          },
          {
            id: "betBasis",
            label: "What problem have you seen that makes this worth trying?",
            type: "textarea",
            hint: "Describe what happened and how you know. Your private notes are not copied here; choose what you want to share.",
          },
          {
            id: "betHypothesis",
            label: "What do you think will happen, and why?",
            type: "textarea",
            hint: "Try: “If we use AI for this task, we think it will help because...” Say what you want to find out.",
          },
          {
            id: "expectedLift",
            label: "What improvement do you predict?",
            type: "textarea",
            hint: "For example: this usually takes 90 minutes in total; we think it might take 72 with AI. Explain how you will measure it. This is a prediction, not a promise.",
          },
          {
            id: "betQualitative",
            label: "What else might change for the team or customers?",
            type: "textarea",
            hint: "Optional. Would checking the work feel easier or harder? Would people learn something useful? Say who you will ask or what you will look for.",
          },
          {
            id: "comparator",
            label:
              "Which similar task done without AI will you compare this with?",
            type: "textarea",
            hint: "Choose work of similar difficulty, done by people with similar experience and checked to the same standard. Say what differs.",
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
            label:
              "What information and code are you allowed to put into the tool?",
            type: "textarea",
          },
          {
            id: "approvalOwner",
            label:
              "Who can approve this tool and the information you will use?",
            type: "text",
          },
          {
            id: "qualityBar",
            section: "03 / CHECKS AND TIME",
            label: "What checks must the result pass, and who will check it?",
            type: "textarea",
          },
          {
            id: "capacity",
            label:
              "How much work time and money will you spend? What would have to wait?",
            type: "textarea",
            hint: "Include the person doing the task and the person reviewing it. Set a maximum and say which other work would wait. This is how much you agree to spend, not a prediction of how long it will take.",
          },
          {
            id: "betTimebox",
            label: "When does the experiment start and end?",
            type: "textarea",
            hint: "Set start and finish dates and a time to review the result. A one-week test does not mean everyone works on it all week; record their work-time limits above.",
          },
          {
            id: "betRabbitHoles",
            label: "What could turn this into a much bigger job?",
            type: "textarea",
            hint: "Optional. Name complications that could use up the agreed time, and say when you would stop or ask for another decision.",
          },
          {
            id: "success",
            label: "What result would make another experiment worthwhile?",
            type: "textarea",
            section: "04 / WHEN TO CONTINUE OR STOP",
            hint: "Agree the smallest improvement worth the effort, the checks that must still pass, and the maximum review time. That minimum can be lower than your prediction.",
          },
          {
            id: "stop",
            label: "What would make you stop the experiment?",
            type: "textarea",
          },
          {
            id: "owners",
            label:
              "Who does the task, who reviews it, and who decides what happens next? When will you meet?",
            type: "textarea",
          },
          {
            id: "betStatus",
            label: "Have the people responsible agreed to this experiment?",
            type: "select",
            options: [
              "PROPOSED — NOT YET ACCEPTED",
              "ACCEPTED — CONDITIONS AGREED",
              "NOT ACCEPTED",
              "NOT ATTEMPTED",
            ],
            hint: "Keep this as proposed until the people responsible for the work and approvals have agreed. Filling in the plan does not count as permission.",
          },
        ],
      },
      {
        eyebrow: "RESULTS",
        title: "Did it save work overall?",
        intro:
          "Count the time spent checking and fixing the result as well as writing it. A faster first draft may leave somebody else with more work.",
        fields: [
          {
            id: "betResult",
            label:
              "What happened compared with what you expected? Was it enough to be worthwhile?",
            type: "textarea",
            hint: "Compare the result with your prediction and the minimum you agreed. Include time, quality, and people's experience. Say if you do not have enough information to decide.",
          },
          {
            id: "comparability",
            label: "What differences might make this an unfair comparison?",
            type: "textarea",
            hint: "Was one task harder? Did one person have more experience? Was someone learning the tool for the first time? Were both results checked to the same standard?",
          },
          {
            id: "withoutAi",
            label: "What happened when the work was done without AI?",
            type: "textarea",
          },
          {
            id: "withAi",
            label: "What happened when the work was done with AI?",
            type: "textarea",
          },
          {
            id: "quality",
            label:
              "Did the work pass the checks? What problems did the reviewer find?",
            type: "textarea",
          },
          {
            id: "otherCosts",
            label:
              "What else affected the result: waiting, tool costs, or learning to use it?",
            type: "textarea",
            hint: "The table adds up everyone's work time. Record waiting time and money separately; those are different costs.",
          },
          {
            id: "laterCheck",
            label: "Who will check for problems that appear later, and when?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "NEXT STEP",
        title: "Continue, revise, stop, or pause.",
        intro:
          "Use what you found to choose what happens next. Finding that this use of AI does not help is a useful result too.",
        fields: [
          {
            id: "decision",
            label: "Decision",
            type: "select",
            options: ["CONTINUE", "REVISE", "STOP", "PAUSE"],
          },
          {
            id: "reason",
            label: "Why this decision? What do you still disagree about?",
            type: "textarea",
          },
          {
            id: "betLearning",
            label: "What did you learn, and what might explain the result?",
            type: "textarea",
            hint: "Say what happened, then what might explain it. If you never ran the experiment, say that rather than treating it as a failure.",
          },
          {
            id: "limits",
            label: "What can you not conclude from this result?",
            type: "textarea",
          },
          {
            id: "next",
            label: "What happens next, who will do it, and by when?",
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
        title: "Experiment Plan",
        fromStep: 1,
        build: buildTrialCard,
      },
      {
        id: "evidence-record",
        title: "Results Record",
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
