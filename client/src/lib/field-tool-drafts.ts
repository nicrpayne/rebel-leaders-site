export type FieldToolDraft = { values: Record<string, string>; step: number };

// Reflection is ephemeral. Only deliberately shared work belongs in a saved draft.
export const PRIVATE_FIELD_IDS = new Set([
  "side",
  "happened",
  "story",
  "protecting",
  "why",
  "futurePicture",
  "observed",
  "prediction",
  "changeMind",
  "askOther",
  "visionTeam",
  "visionProduct",
  "visionCompany",
  "privateReaction",
  "privateAssumption",
  "leadershipReflection",
]);
export function sharedDraftValues(values: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(values).filter(([id]) => !PRIVATE_FIELD_IDS.has(id))
  );
}

/** Remove previously saved reflection while retaining the person's shared work. */
export function purgeSavedReflection(
  storage: Pick<Storage, "getItem" | "setItem">,
  keys: string[]
) {
  for (const key of keys) {
    const raw = storage.getItem(key);
    if (!raw) continue;
    try {
      const draft = JSON.parse(raw);
      if (
        draft?.values &&
        typeof draft.values === "object" &&
        !Array.isArray(draft.values)
      ) {
        const values = sharedDraftValues(draft.values);
        if (Object.keys(values).length !== Object.keys(draft.values).length)
          storage.setItem(key, JSON.stringify({ ...draft, values }));
      }
    } catch {
      /* A malformed draft is not rewritten. */
    }
  }
}

export function readFieldToolDraft(
  storage: Pick<Storage, "getItem">,
  key: string,
  stepCount: number
): FieldToolDraft {
  try {
    const raw = storage.getItem(key);
    if (!raw) return { values: {}, step: 0 };
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { values: {}, step: 0 };
    const draft = parsed as { values?: unknown; step?: unknown };
    const values =
      draft.values &&
      typeof draft.values === "object" &&
      !Array.isArray(draft.values)
        ? (Object.fromEntries(
            Object.entries(draft.values).filter(
              ([id, value]) =>
                typeof value === "string" && !PRIVATE_FIELD_IDS.has(id)
            )
          ) as Record<string, string>)
        : {};
    const step =
      typeof draft.step === "number" && Number.isInteger(draft.step)
        ? Math.min(Math.max(draft.step, 0), Math.max(stepCount - 1, 0))
        : 0;
    return { values, step };
  } catch {
    return { values: {}, step: 0 };
  }
}

/** Preserve the phase when inserting Readiness into older four-phase AI drafts. */
export function readAIFieldToolDraft(
  storage: Pick<Storage, "getItem">,
  key: string
): FieldToolDraft {
  const draft = readFieldToolDraft(storage, key, 5);
  try {
    const raw = storage.getItem(key);
    if (!raw) return draft;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 2 && draft.step > 0)
      return { ...draft, step: Math.min(4, draft.step + 1) };
  } catch {}
  return draft;
}
