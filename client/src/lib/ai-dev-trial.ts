import {
  buildAITrialPackage,
  buildTrialCard,
  buildEvidenceRecord,
  buildDecisionBrief,
} from "./ai-trial.ts";
import { fieldToolChoiceLabel } from "./field-tool-choice-labels.ts";
type Values = Record<string, string>;
const fields = [
  ["changeRequested", "THE CHANGE BEING REQUESTED"],
  ["businessContext", "WHAT MY PM NEEDS / WHY NOW"],
  ["counterpartConcern", "WHAT I HEARD FROM MY PM"],
  ["engineeringPosition", "MY POSITION / WHAT SUPPORTS IT"],
  ["alternatives", "OTHER WAYS TO MEET THE NEED"],
  ["accessModel", "APP ACCESS / DATA / WHO OWNS THE MISSING WORK"],
  ["securityChecks", "SECURITY CHECKS / WHO WILL VERIFY THEM"],
  ["automationBoundary", "WHAT THE DEVELOPMENT TOOL MAY ACCESS OR DO"],
  ["teamReadiness", "WHAT THE TEAM CAN OWN / WHERE IT NEEDS HELP"],
  ["readinessSupport", "REVIEW CAPACITY / LEARNING TIME / SUPPORT"],
  ["openQuestions", "WHAT IS STILL UNANSWERED OR DISAGREED"],
  ["prerequisitePlan", "RECOMMENDED NEXT ACTION / OWNER / RETURN DATE"],
] as const;
export function buildDevConversation(v: Values) {
  return `AI STALEMATE — LEAD DEVELOPER CONVERSATION NOTES\n\nSTATUS: ${fieldToolChoiceLabel("conversationStatus", v.conversationStatus || "PROPOSED — NOT YET AGREED")}\n\n${fields.map(([id, label]) => `${label}\n${v[id]?.trim() || "Add what is relevant before sharing."}`).join("\n\n")}\n\nNEXT MOVE\n${fieldToolChoiceLabel("readinessDecision", v.readinessDecision || "Choose a next move.")}\n\n${[
    ["sharedVision", "WHAT WE WANT TO MAKE BETTER"],
    ["businessBasis", "BASIS FOR THE BUSINESS ESTIMATE"],
    ["growthOpportunity", "WHAT THE TEAM WANTS TO LEARN"],
    ["conversationLeadershipUpdate", "UPDATE TO THE SPONSOR"],
    ["conversationTeamUpdate", "UPDATE TO THE TEAM"],
  ]
    .filter(([id]) => v[id]?.trim())
    .map(([id, label]) => `${label}\n${v[id].trim()}`)
    .join(
      "\n\n"
    )}\n\nCheck this reflects the conversation before sharing. Private preparation is excluded.`;
}
function position(v: Values) {
  return ["changeRequested", "engineeringPosition", "alternatives"]
    .filter(id => v[id]?.trim())
    .map(id => `${fields.find(([key]) => key === id)![1]}\n${v[id].trim()}`)
    .join("\n\n");
}
export function buildDevDecision(v: Values) {
  return `AI STALEMATE — LEAD DEVELOPER RECOMMENDATION\n\n${position(v)}\n\n${buildDecisionBrief(v).replace(/^AI STALEMATE — DECISION BRIEF\s*/, "")}`;
}
export function buildDevPackage(v: Values) {
  // Keep the common evidence rules: a preparation decision must not invent results,
  // and existing measurements remain available when a later request needs preparation.
  const common = buildAITrialPackage(v);
  return [
    buildDevConversation(v),
    ...(common.includes("AI STALEMATE — EXPERIMENT PLAN")
      ? [buildTrialCard(v), buildEvidenceRecord(v)]
      : []),
    buildDevDecision(v),
  ].join("\n\n\n");
}
export const AI_DEV_OUTPUT_BUILDERS = {
  "readiness-brief": buildDevConversation,
  "trial-card": buildTrialCard,
  "evidence-record": buildEvidenceRecord,
  "decision-brief": buildDevDecision,
  "working-record": buildDevPackage,
};
