import { fieldToolChoiceLabel } from "./field-tool-choice-labels";
import type { Audience } from "./field-tool-paths";
export function communicationDraft(
  values: Record<string, string>,
  audience: Audience,
  phase: "conversation" | "decision",
  recipient: "leadership" | "team"
) {
  const text = (key: string, fallback: string) =>
    values[key]?.trim() || fallback;
  const status = text("conversationStatus", "PROPOSED — NOT YET AGREED");
  const next =
    phase === "decision"
      ? text("next", "[who will do what next, and when]")
      : text("prerequisitePlan", "[who will do what next, and when]");
  const move =
    phase === "decision"
      ? text("decision", "[decision not recorded]")
      : fieldToolChoiceLabel(
          "readinessDecision",
          text("readinessDecision", "[next step not selected]")
        );
  const context = text(
    "businessContext",
    text("outcome", "[what we want to improve and why it matters]")
  );
  const concern = text(
    "counterpartConcern",
    "[what your colleague needs or is worried about; check with them]"
  );
  const unresolved = text(
    "openQuestions",
    "[what we agree on and what we still need to work out]"
  );
  const vision = values.sharedVision?.trim()
    ? `\nWhat we hope will be better: ${values.sharedVision.trim()}`
    : "";
  return recipient === "leadership"
    ? `Context: ${context}${vision}\nCurrent status: ${status}\nWhat needs attention: ${concern}\nWhat we still need to work out: ${unresolved}\n${phase === "decision" ? "Recorded choice" : "Proposed or agreed next step"}: ${move}\nNext action: ${next}\nDecision or support needed from you: [what we need, who can decide, and when we need an answer]`
    : `Here is where ${audience === "pm" ? "my lead and I" : "my PM and I"} are on this use of AI.\nWhy it matters: ${context}${vision}\nCurrent status: ${status}\nWhat we need to check: ${concern}\n${phase === "decision" ? "Recorded choice" : "Proposed or agreed next step"}: ${move}\nWhat happens next: ${next}\nWhat changes for the team: [what work, review time, or access changes; say if nothing changes yet]\nQuestions or input we need: ${unresolved}`;
}
