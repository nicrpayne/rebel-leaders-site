export type ScopeChoice = "first" | "later" | "check";
export type ReleaseCheck = "unknown" | "yes" | "no";
export type ScopeItem = { id: string; text: string; choice: ScopeChoice };
export type ReleaseDraft = {
  feature: string;
  user: string;
  outcome: string;
  items: ScopeItem[];
  lens: string;
  boundaries: Record<string, string>;
  useful: ReleaseCheck;
  independent: ReleaseCheck;
  quality: ReleaseCheck;
  unknowns: string;
  feedback: string;
};

export const SLICE_LENSES = [
  {
    id: "people",
    title: "One group first",
    question: "Who could get value from this first?",
    hint: "Pick a group with a real need. Check whether they can use it without bringing everyone else in.",
    example: "Account managers first. Other teams can wait.",
  },
  {
    id: "path",
    title: "One complete task",
    question: "What can someone do from start to finish?",
    hint: "Keep enough of the journey to get a useful result. A screen or an API on its own may not do that.",
    example: "See overdue renewals, then export the list to follow up.",
  },
  {
    id: "variations",
    title: "Fewer choices",
    question: "Which options can wait?",
    hint: "Try one format or a sensible default. Keep any variations people need for accessibility or to use it correctly.",
    example:
      "One standard report first. Custom charts and saved filters can wait.",
  },
  {
    id: "reuse",
    title: "Use what’s already there",
    question: "What could you reuse instead of building?",
    hint: "Check that an existing component or process actually fits. Include its limitations and any extra work it creates for people.",
    example:
      "Use the existing table and export component, if it fits the data and permissions.",
  },
] as const;
export const RELEASE_CHECKS = [
  {
    id: "useful",
    label: "Can someone complete the useful task with this release?",
    concern: "Check that this release lets someone complete the useful task.",
  },
  {
    id: "independent",
    label: "Can it work without the things you’ve put off?",
    concern: "Check dependencies on the work marked later.",
  },
  {
    id: "quality",
    label: "Have you kept the essential safeguards and checks?",
    concern:
      "Agree the security, accessibility, reliability, and testing this release needs.",
  },
] as const;
export const emptyReleaseDraft = (): ReleaseDraft => ({
  feature: "",
  user: "",
  outcome: "",
  items: [],
  lens: "path",
  boundaries: {},
  useful: "unknown",
  independent: "unknown",
  quality: "unknown",
  unknowns: "",
  feedback: "",
});
export const exampleReleaseDraft = (): ReleaseDraft => ({
  ...emptyReleaseDraft(),
  feature: "A reporting dashboard",
  user: "Account managers",
  outcome:
    "See which renewals are overdue and get a list they can use to follow up.",
  items: [
    {
      id: "overdue",
      text: "Show overdue renewals in a standard table",
      choice: "first",
    },
    { id: "export", text: "Export that list for follow-up", choice: "first" },
    { id: "charts", text: "Build custom charts", choice: "later" },
    { id: "filters", text: "Save custom filters", choice: "later" },
    { id: "emails", text: "Send scheduled report emails", choice: "later" },
    {
      id: "data",
      text: "Confirm the existing renewal data is accurate enough",
      choice: "check",
    },
  ],
  boundaries: {
    path: "See the overdue renewals, then export the list. Keep the existing follow-up process for now.",
  },
  unknowns:
    "Can we reuse the existing table and export component? Confirm account managers only see records they’re allowed to use.",
  feedback:
    "Ask two account managers to use it for their next follow-up. Can they find the right renewals without going back to the spreadsheet?",
});
export function hasReleaseWork(draft: ReleaseDraft) {
  return !!(
    draft.feature.trim() ||
    draft.user.trim() ||
    draft.outcome.trim() ||
    draft.items.length ||
    Object.values(draft.boundaries).some(v => v.trim()) ||
    draft.unknowns.trim() ||
    draft.feedback.trim() ||
    RELEASE_CHECKS.some(c => draft[c.id] !== "unknown")
  );
}
export function readReleaseDraft(raw: string | null): ReleaseDraft {
  const clean = emptyReleaseDraft();
  if (!raw) return clean;
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed.version !== 1 ||
      !parsed.draft ||
      typeof parsed.draft !== "object"
    )
      return clean;
    const d = parsed.draft;
    for (const key of [
      "feature",
      "user",
      "outcome",
      "unknowns",
      "feedback",
    ] as const)
      clean[key] =
        typeof d[key] === "string"
          ? d[key].slice(0, key === "feature" || key === "user" ? 180 : 3000)
          : "";
    if (SLICE_LENSES.some(l => l.id === d.lens)) clean.lens = d.lens;
    for (const lens of SLICE_LENSES) {
      if (typeof d.boundaries?.[lens.id] === "string")
        clean.boundaries[lens.id] = d.boundaries[lens.id].slice(0, 1000);
    }
    const ids = new Set<string>();
    if (Array.isArray(d.items))
      clean.items = d.items
        .slice(0, 30)
        .filter((i: unknown) => i && typeof i === "object")
        .map((i: any, n: number) => {
          let id =
            typeof i.id === "string" && i.id.length <= 100 && i.id
              ? i.id
              : `item-${n}`;
          while (ids.has(id)) id = `${id}-${n}`;
          ids.add(id);
          return {
            id,
            text: typeof i.text === "string" ? i.text.slice(0, 500) : "",
            choice:
              i.choice === "first" || i.choice === "later" ? i.choice : "check",
          };
        });
    for (const check of RELEASE_CHECKS)
      if (d[check.id] === "yes" || d[check.id] === "no")
        clean[check.id] = d[check.id];
    return clean;
  } catch {
    return clean;
  }
}
export function releaseGroups(draft: ReleaseDraft) {
  return {
    first: draft.items.filter(i => i.choice === "first"),
    later: draft.items.filter(i => i.choice === "later"),
    check: draft.items.filter(i => i.choice === "check"),
  };
}
export function releaseGaps(draft: ReleaseDraft) {
  const gaps: string[] = [];
  if (!draft.feature.trim()) gaps.push("Name the feature you’re shaping.");
  if (!draft.user.trim()) gaps.push("Choose the first users.");
  if (!draft.outcome.trim()) gaps.push("Say what they should be able to do.");
  if (!draft.items.some(i => i.choice === "first" && i.text.trim()))
    gaps.push("Choose at least one part of the first release.");
  if (draft.items.some(i => !i.text.trim()))
    gaps.push("Name or remove the empty scope items.");
  for (const c of RELEASE_CHECKS)
    if (draft[c.id] !== "yes")
      gaps.push(`${draft[c.id] === "no" ? "Rework needed: " : ""}${c.concern}`);
  return gaps;
}
export function releaseSummary(draft: ReleaseDraft, example: boolean) {
  const groups = releaseGroups(draft);
  const list = (items: ScopeItem[], fallback: string) =>
    items.length
      ? items.map(i => `• ${i.text.trim() || "[scope item to name]"}`)
      : [fallback];
  const boundaries = SLICE_LENSES.filter(l => draft.boundaries[l.id]?.trim());
  return [
    "FIRST-RELEASE PROPOSAL",
    example
      ? "Illustrative example — replace these details before sharing."
      : "Draft for discussion — agree scope and feasibility with the team.",
    "",
    `Feature: ${draft.feature.trim() || "[feature to name]"}`,
    `First users: ${draft.user.trim() || "[users to agree]"}`,
    `Useful outcome: ${draft.outcome.trim() || "[task or result to agree]"}`,
    "",
    "IN THE FIRST RELEASE",
    ...list(groups.first, "[first-release scope to agree]"),
    "",
    "CAN WAIT",
    ...list(groups.later, "Nothing deferred yet."),
    ...(boundaries.length
      ? [
          "",
          "BOUNDARIES WE PROPOSE",
          ...boundaries.map(
            l => `• ${l.title}: ${draft.boundaries[l.id].trim()}`
          ),
        ]
      : []),
    "",
    "STILL TO CHECK",
    ...list(groups.check, "No scope items marked for checking."),
    ...(draft.unknowns.trim() ? [draft.unknowns.trim()] : []),
    "",
    "RELEASE CHECKS",
    ...RELEASE_CHECKS.map(
      c =>
        `${c.label} ${draft[c.id] === "yes" ? "Yes — entered by the author; confirm together." : draft[c.id] === "no" ? "No — needs reworking." : "Not checked yet."}`
    ),
    "Keep essential security, accessibility, reliability, and testing in this release. Smaller scope does not remove those responsibilities.",
    "",
    "HOW WE’LL FIND OUT IF IT HELPS",
    draft.feedback.trim() || "[who will try it, and what we need to learn]",
    "",
    "NEXT CONVERSATION",
    "Agree the first release and resolve its dependencies with product and engineering. Then estimate the work. This proposal does not predict a delivery date or AI time saving.",
  ].join("\n");
}
