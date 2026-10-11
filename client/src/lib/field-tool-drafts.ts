export type FieldToolDraft = { values: Record<string, string>; step: number };

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
              ([, value]) => typeof value === "string"
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
