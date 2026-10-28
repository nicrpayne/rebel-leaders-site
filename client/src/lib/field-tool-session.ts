import { AI_EFFORT_STAGES } from "./ai-trial";
export type LabValues = Record<string, string>;

export function labDefaults(slug: string): LabValues {
  return slug === "ai-stalemate"
    ? {
        conversationStatus: "PROPOSED — NOT YET AGREED",
        betStatus: "PROPOSED — NOT YET ACCEPTED",
      }
    : {
        decisionStatus:
          slug === "when-the-team-goes-quiet"
            ? "PROPOSAL — not discussed yet"
            : "PROPOSAL — awaiting a decision",
      };
}

export function withLabDefaults(slug: string, values: LabValues): LabValues {
  const result = { ...values };
  for (const [id, fallback] of Object.entries(labDefaults(slug))) {
    if (!result[id]?.trim()) result[id] = fallback;
  }
  return result;
}

export function examplePatch(
  slug: string,
  step: number,
  fields: { id: string }[],
  sample: LabValues
): LabValues {
  const ids = new Set(fields.map(field => field.id));
  if (slug === "priority-whiplash" && step === 1) {
    ["availableCapacity", "existingLoad", "requestLoad"].forEach(id =>
      ids.add(id)
    );
  }
  if (slug === "ai-stalemate" && step === 3) {
    AI_EFFORT_STAGES.forEach(stage => {
      ids.add(`ai_${stage.id}`);
      ids.add(`baseline_${stage.id}`);
    });
  }
  return Object.fromEntries(Array.from(ids).map(id => [id, sample[id] ?? ""]));
}

export function editLabValues(values: LabValues, patch: LabValues): LabValues {
  const next = { ...values, ...patch };
  if (
    "readinessDecision" in patch &&
    patch.readinessDecision !== values.readinessDecision
  ) {
    // A previous decision needs reconsideration; measured evidence and notes remain intact.
    next.decision =
      patch.readinessDecision === "STOP THIS USE"
        ? "STOP"
        : [
              "CLARIFY THE CONVERSATION",
              "ASK A SPECIALIST",
              "PREPARE FIRST",
            ].includes(patch.readinessDecision)
          ? "PAUSE"
          : "";
  }
  return next;
}

export function labReviewPrompts(slug: string, values: LabValues): string[] {
  const prompts: string[] = [];
  if (slug === "ai-stalemate") {
    if (values.readinessDecision && !values.prerequisitePlan?.trim())
      prompts.push(
        "Who will take that next step, and when will you check back?"
      );
    if (values.readinessDecision === "READY FOR A BOUNDED TEST") {
      if (!values.approvalOwner?.trim())
        prompts.push(
          "Who can approve the AI tool and the information you’ll use? Check with them before starting."
        );
      if (!values.stop?.trim())
        prompts.push(
          "What would make you stop the experiment? Agree that before starting."
        );
    }
  } else {
    if (
      (values.date || values.decisionDate || values.decisionBy) &&
      !(values.owner || values.decisionOwner)?.trim()
    )
      prompts.push("You’ve added a date. Who can make this decision?");
    if (
      values.decisionStatus?.startsWith("AGREED") &&
      !values.finalDecision?.trim()
    )
      prompts.push(
        "You’ve marked this as agreed. Add what they agreed to before sharing it."
      );
  }
  return prompts;
}
