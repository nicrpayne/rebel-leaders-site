import { FIELD_LABS, type FieldDef, type LabConfig } from "./labs.ts";
import {
  AI_DEV_OUTPUT_BUILDERS,
  buildDevPackage,
} from "../../client/src/lib/ai-dev-trial.ts";
const field = (id: string, label: string, hint?: string): FieldDef => ({
  id,
  label,
  hint,
  type: "textarea",
});
export function aiDevLab(): LabConfig {
  const base = structuredClone(FIELD_LABS["ai-stalemate"].steps);
  base[0] = {
    eyebrow: "BEFORE YOU TALK",
    title: "What is your position?",
    intro:
      "Start with the change you’re being asked to lead. Sort out what you know, what you expect, and what you need to ask your PM. These notes stay private.",
    fields: [
      field(
        "happened",
        "What has your PM asked the team to change, and where do things stand?",
        "Use their words. Is this about one app, one task, or the way the whole team builds and ships?"
      ),
      field(
        "story",
        "What are you assuming about why your PM wants this?",
        "What could you ask instead of guessing?"
      ),
      field(
        "protecting",
        "What are your strongest concerns?",
        "For example: security, the team’s ability to review and support the work, or missing access infrastructure."
      ),
      field(
        "why",
        "Why do these concerns matter to you and the people doing the work?"
      ),
      field("futurePicture", "What would a worthwhile improvement look like?"),
      field("observed", "What have you seen or checked yourself?"),
      field(
        "prediction",
        "What are you predicting, but have not established yet?"
      ),
      field(
        "changeMind",
        "What new information could change your recommendation?",
        "Keep requirements you cannot waive separate from questions you could investigate."
      ),
      field("askOther", "What do you want to understand from your PM?"),
    ],
  };
  base[1].title = "Would a small spike help?";
  base[1].intro =
    "Only plan a spike if it answers a useful question. Keep the app’s access work and the development workflow investigation separate. Existing evidence or specialist advice may be enough.";
  const labels: Record<string, [string, string?]> = {
    outcome: ["What would this spike help you decide?"],
    sharedVision: ["What improvement would make this worthwhile?"],
    task: ["What is the small task, and what is outside the scope?"],
    betHypothesis: ["What do you think will happen?"],
    qualityBar: [
      "What must the work pass, and can the engineer explain and debug it?",
      "Include behavior, tests, review, and understanding. Name who checks each one.",
    ],
    capacity: [
      "How much team time and tool spend can you invest?",
      "Include pairing, review, fixes, and learning. Name the work that would wait.",
    ],
    success: [
      "What finding would justify another bounded step?",
      "A faster first draft alone is not enough. Agree how you will assess understanding, quality, and review effort.",
    ],
  };
  base[1].fields = base[1].fields.map(f =>
    labels[f.id] ? { ...f, label: labels[f.id][0], hint: labels[f.id][1] } : f
  );
  base[1].fields.push(
    field(
      "decisionRights",
      "Who can approve the spike, and whose advice is needed?"
    ),
    field(
      "deploymentPermission",
      "Who would have to approve real data, deployment, or wider use?",
      "A successful spike does not grant these permissions."
    )
  );
  base[2].title = "Could the team own the result?";
  base[2].intro =
    "Record what happened, including all review work. If you did not run the spike, leave measurements blank and go to your recommendation.";
  base[2].fields.unshift(
    field(
      "valueAndEffort",
      "What did people gain, learn, and spend?",
      "Could the engineer explain and debug the change? Include the experienced reviewer’s time. Keep estimated business benefits separate from measured results."
    )
  );
  base[3].title = "What do you recommend now?";
  base[3].intro =
    "Say what you support, what needs to change, and who can decide. You can make a recommendation from known constraints without running an experiment.";
  const recommendationLabels: Record<string, string> = {
    decision: "What next move do you recommend?",
    betLearning: "What have you learned so far?",
    limits: "What does your recommendation still leave unanswered?",
  };
  base[3].fields = base[3].fields.map(f => ({
    ...f,
    label: recommendationLabels[f.id] ?? f.label,
  }));
  base[3].fields.push(
    field(
      "unresolvedPlan",
      "If you and your PM still disagree, what happens next?",
      "Record both positions fairly, who can decide, what the team will do while waiting, and when you will return."
    )
  );
  const conversation = {
    eyebrow: "CONVERSATION",
    title: "Prepare your recommendation.",
    intro:
      "Use the questions that apply to your situation. Bring the concern, what supports it, and a useful next move. Come back after talking to record what your PM said and what was agreed.",
    fields: [
      field(
        "changeRequested",
        "What exactly is the team being asked to change?",
        "Separate how you build the app from whether the app itself needs AI."
      ),
      field("businessContext", "What does your PM need, and why now?"),
      field(
        "counterpartConcern",
        "What have you heard your PM say?",
        "If you haven’t asked yet, record the question rather than writing an answer for them."
      ),
      field(
        "engineeringPosition",
        "What is your position, and what supports it?",
        "Name a concern, evidence or known requirement, the consequence, and what would need to change. Separate observations from predictions."
      ),
      field(
        "alternatives",
        "What other approach could meet the need?",
        "Consider ordinary code, an existing approved platform, a smaller app, assisted work, or preparation first."
      ),
      field(
        "accessModel",
        "What app access or infrastructure is missing, and who owns it?",
        "Who may see or change which records? Who approves access, provisions the connection, and removes access? Signing in does not answer all of this."
      ),
      field(
        "securityChecks",
        "What security checks does this use need, and who will verify them?",
        "Include server-side allowed and denied access tests, data handling, and any specialist review. State requirements you already know."
      ),
      field(
        "automationBoundary",
        "What may the development tool or agent read, change, or deploy?",
        "Keep these permissions separate from the app’s users. Include data, credentials, repositories, environments, and human approval points."
      ),
      field(
        "teamReadiness",
        "What can the team already explain, debug, test, and support?",
        "Use examples from recent work. Where would an experienced engineer still need to step in?"
      ),
      field(
        "readinessSupport",
        "What review capacity, learning time, or specialist help is available?",
        "Name the people and time. If the support isn’t available, include that in your recommendation."
      ),
      field("openQuestions", "What is still unanswered or disagreed?"),
      {
        id: "readinessDecision",
        label: "What is the next useful move?",
        type: "select" as const,
        options: [
          "CLARIFY THE CONVERSATION",
          "ASK A SPECIALIST",
          "READY FOR A BOUNDED TEST",
          "PREPARE FIRST",
          "USE EXISTING EVIDENCE",
          "STOP THIS USE",
        ],
      },
      field(
        "prerequisitePlan",
        "What do you recommend happens next, who owns it, and when will you return?"
      ),
      {
        id: "conversationStatus",
        label: "Is this your proposal or something you have agreed together?",
        type: "select" as const,
        options: [
          "PROPOSED — NOT YET AGREED",
          "AGREED TOGETHER",
          "STILL DISAGREE",
        ],
      },
      field("sharedVision", "What would you both like to make better?"),
      field("growthOpportunity", "What would the team like to learn?"),
      field(
        "businessBasis",
        "If an estimate is driving the urgency, what is it based on?"
      ),
    ],
  };
  const titles: Record<string, string> = {
    "readiness-brief": "Conversation Notes",
    "trial-card": "Optional Spike Plan",
    "evidence-record": "Results Record",
    "decision-brief": "Engineering Recommendation",
    "working-record": "Working Record",
  };
  return {
    steps: [base[0], conversation, ...base.slice(1)],
    buildOutput: buildDevPackage,
    outputs: Object.entries(AI_DEV_OUTPUT_BUILDERS).map(([id, build], i) => ({
      id,
      title: titles[id],
      fromStep: i === 4 ? 4 : i + 1,
      build,
    })),
  };
}
