import type { Audience } from "./field-tool-paths";
export function communicationDraft(values: Record<string, string>, audience: Audience, phase: "conversation" | "decision", recipient: "leadership" | "team") {
  const text = (key: string, fallback: string) => values[key]?.trim() || fallback;
  const status = text("conversationStatus", "PROPOSED — NOT YET AGREED");
  const next = phase === "decision" ? text("next", "[next action, owner, and date]") : text("prerequisitePlan", "[next action, owner, and date]");
  const move = phase === "decision" ? text("decision", "[decision not recorded]") : text("readinessDecision", "[next move not selected]");
  const context = text("businessContext", text("outcome", "[shared outcome and context]"));
  const concern = text("counterpartConcern", "[counterpart's concern or need—confirm with them]");
  const unresolved = text("openQuestions", "[shared understanding and unresolved questions]");
  const vision = values.sharedVision?.trim() ? `\nFuture we are exploring: ${values.sharedVision.trim()}` : "";
  return recipient === "leadership" ? `Context: ${context}${vision}\nCurrent status: ${status}\nWhat needs attention: ${concern}\nWhat remains unresolved: ${unresolved}\n${phase === "decision" ? "Recorded choice" : "Proposed or agreed next move"}: ${move}\nNext action: ${next}\nDecision or support needed from you: [specific request, decision owner, and response date]` : `Here is where ${audience === "pm" ? "my lead and I" : "my PM and I"} are on this use of AI.\nWhy it matters: ${context}${vision}\nCurrent status: ${status}\nWhat we are taking seriously: ${concern}\n${phase === "decision" ? "Recorded choice" : "Proposed or agreed next move"}: ${move}\nWhat happens next: ${next}\nWhat changes for the team: [work, capacity, review, permissions, or no change yet]\nQuestions or input we need: ${unresolved}`;
}
