import { fieldToolChoiceLabel } from "./field-tool-choice-labels.ts";
import type { WorkingValues } from "./leadership-output";

/** Assemble a starting point from explicit answers only; never infer agreement. */
export function leadershipCommunicationDraft(
  slug: string,
  values: WorkingValues,
  recipient: "leadership" | "team"
): string {
  if (slug === "when-the-team-goes-quiet") {
    return [
      "Here’s what I’m planning to change.",
      "Status: " +
        (values.decisionStatus || "PROPOSAL — agreement not recorded"),
      "Response recorded: " +
        (values.finalDecision || "No answer has been recorded yet."),
      values.myChange || "[The change you want to try]",
      values.nextAction || "[What you will do next and when]",
      "We’ll check back: " +
        (values.checkpoint || "[When you will ask whether it helped]"),
      "Check that this includes only what you agreed could be shared.",
    ].join("\n\n");
  }
  const text = (key: string, missing: string) =>
    fieldToolChoiceLabel(key, values[key]?.trim() || `[${missing}]`);
  const status =
    values.decisionStatus?.trim() || "PROPOSAL — agreement not recorded";
  const response =
    values.finalDecision?.trim() || "No answer has been recorded yet.";
  const opening = `Here’s where we are.\n\nStatus: ${status}\nResponse recorded: ${response}`;
  const facts: Record<string, string> = {
    "deadline-reset": `We want to: ${text("outcome", "what customers need")}\nThe promise: ${text("promise", "what was promised")}\nThe date: ${text("date", "the date people were given")}\nMy recommendation: ${text("recommendation", "the change you are proposing")}\nChecks we need to keep: ${text("qualityGuardrails", "required checks")}\nWhat we still need to find out: ${text("unknown", "what remains uncertain")}`,
    "priority-whiplash": `The new request: ${text("newAsk", "what someone needs")}\nWhy now: ${text("whyNow", "why it is needed now")}\nMy recommendation: ${text("recommendation", "your proposed choice")}\nWork that would wait: ${text("moves", "what would be postponed")}\nWho that affects: ${text("impact", "who would be affected and how")}\nWork to protect: ${text("protected", "what must continue")}\nAnother option: ${text("alternative", "another way to meet the need")}`,
    "mandate-reset": `The decision we are stuck on: ${text("blockedDecision", "the particular decision")}\nWhat this is doing to the work: ${text("consequence", "the effect on the team or customers")}\nWhat I’m asking for: ${text("request", "the change you need")}\nLimits: ${text("boundaries", "the limits of that permission")}\nRequired approvals: ${text("requiredApprovals", "the approvals that still apply")}\nIf that is not possible: ${text("fallback", "another workable arrangement")}`,
  };
  const ownerKey = slug === "priority-whiplash" ? "decisionOwner" : "owner";
  const dateKey =
    slug === "deadline-reset"
      ? "decisionBy"
      : slug === "mandate-reset"
        ? "date"
        : "decisionDate";
  const reviewKey = ["priority-whiplash", "mandate-reset"].includes(slug)
    ? "reviewDate"
    : "checkpoint";
  const next = `Next check: ${text(reviewKey, "what we will check and when")}`;
  const answered =
    !!values.finalDecision?.trim() &&
    !!values.decisionStatus?.trim() &&
    !/PROPOS|NOT YET|PENDING/i.test(status);
  const request =
    recipient === "leadership"
      ? answered
        ? "Please check that this matches your answer, including any conditions."
        : `Can ${text(ownerKey, "who can decide")} respond by ${text(dateKey, "when we need the answer")}?`
      : `Before we change the work, let’s check the recorded response above.\nWhat this means for us next: [name the agreed action, who will do it, and when; if the decision is open, say what we do while waiting]`;
  return `${opening}\n\n${facts[slug] ?? "[Describe the situation.]"}\n\n${request}\n${next}`;
}
