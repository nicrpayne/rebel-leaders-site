// Builds a request from explicit inputs. It neither grants access nor certifies a design.
export const ACCESS_ACTIONS = ["View", "Add", "Change", "Export"] as const;
export type AccessAction = (typeof ACCESS_ACTIONS)[number];
export type AccessGroup = {
  name: string;
  scope: string;
  actions: AccessAction[];
};
export type AccessDraft = {
  name: string;
  purpose: string;
  aiUse: "build" | "feature" | "both" | "unknown";
  data: string;
  groups: AccessGroup[];
  path: "existing" | "missing" | "unknown";
  pathNotes: string;
  aiService: string;
  recipient: string;
  neededBy: string;
};
export const emptyAccessGroup = (): AccessGroup => ({
  name: "",
  scope: "",
  actions: [],
});
export const emptyAccessDraft = (): AccessDraft => ({
  name: "",
  purpose: "",
  aiUse: "unknown",
  data: "",
  groups: [emptyAccessGroup()],
  path: "unknown",
  pathNotes: "",
  aiService: "",
  recipient: "",
  neededBy: "",
});
export const exampleAccessDraft = (): AccessDraft => ({
  name: "Pilot request tracker",
  purpose:
    "Let a small operations team record service requests in one place instead of copying them between spreadsheets.",
  aiUse: "build",
  data: "Service request summaries from our internal tracker. Some records include customer contact details. The data owner still needs to confirm what the pilot can use.",
  groups: [
    {
      name: "Pilot coordinators",
      scope: "Requests assigned to their team",
      actions: ["View", "Add", "Change"],
    },
    {
      name: "Team leads",
      scope: "Requests owned by their team",
      actions: ["View"],
    },
  ],
  path: "missing",
  pathNotes:
    "The demo uses synthetic data. We have company sign-in, but no access groups or data connection for this app yet.",
  aiService: "",
  recipient: "Identity / platform owner",
  neededBy: "Before we commit to the pilot date",
});
export const AI_USE_LABELS = {
  build: "AI helps us write the code",
  feature: "AI is a feature inside the app",
  both: "Both",
  unknown: "Still working that out",
} as const;
const textFields = [
  "name",
  "purpose",
  "data",
  "pathNotes",
  "aiService",
  "recipient",
  "neededBy",
] as const;
export function readAccessDraft(value: unknown): AccessDraft {
  const clean = emptyAccessDraft();
  if (!value || typeof value !== "object") return clean;
  const raw = value as Record<string, unknown>;
  for (const key of textFields)
    clean[key] =
      typeof raw[key] === "string"
        ? raw[key].slice(0, key === "name" ? 180 : 3000)
        : "";
  if (raw.aiUse === "build" || raw.aiUse === "feature" || raw.aiUse === "both")
    clean.aiUse = raw.aiUse;
  if (raw.path === "existing" || raw.path === "missing") clean.path = raw.path;
  if (Array.isArray(raw.groups)) {
    const groups = raw.groups
      .filter(g => g && typeof g === "object")
      .slice(0, 8)
      .map(g => ({
        name: typeof g.name === "string" ? g.name.slice(0, 180) : "",
        scope: typeof g.scope === "string" ? g.scope.slice(0, 1000) : "",
        actions: ACCESS_ACTIONS.filter(
          action => Array.isArray(g.actions) && g.actions.includes(action)
        ),
      }));
    if (groups.length) clean.groups = groups;
  }
  return clean;
}
export function hasAccessWork(draft: AccessDraft) {
  return (
    textFields.some(key => draft[key].trim()) ||
    draft.aiUse !== "unknown" ||
    draft.path !== "unknown" ||
    draft.groups.some(g => g.name.trim() || g.scope.trim() || g.actions.length)
  );
}
export function accessQuestions(draft: AccessDraft): string[] {
  const questions: string[] = [];
  if (!draft.purpose.trim())
    questions.push("What user task should this app help with?");
  if (!draft.data.trim())
    questions.push(
      "Which data would the app use, and who can approve its use?"
    );
  else
    questions.push(
      "Who owns this data, and can they confirm the pilot’s proposed use?"
    );
  for (let i = 0; i < draft.groups.length; i++) {
    const group = draft.groups[i];
    const name = group.name.trim() || `Group ${i + 1}`;
    if (!group.name.trim())
      questions.push(`Who belongs in ${name.toLowerCase()}?`);
    if (!group.scope.trim())
      questions.push(`Which records should ${name} be allowed to access?`);
    if (!group.actions.length)
      questions.push(
        `What should ${name} be allowed to do with those records?`
      );
  }
  if (draft.path === "missing")
    questions.push(
      "Which parts of sign-in, permissions, or the data connection still need work? Who will own that work, and what would it take?"
    );
  else if (draft.path === "existing")
    questions.push(
      "Does the existing access setup enforce these groups, record boundaries, and actions for this app?"
    );
  else
    questions.push(
      "Is there an existing approved access setup we can reuse, and who owns it?"
    );
  if (draft.aiUse === "unknown")
    questions.push(
      "Will AI help write the code, run inside the app, or both? Which tools and data use need approval?"
    );
  else {
    if (draft.aiUse === "build" || draft.aiUse === "both")
      questions.push(
        "Which coding tool and code or data use are approved for this work?"
      );
    if (draft.aiUse === "feature" || draft.aiUse === "both")
      questions.push(
        draft.aiService.trim()
          ? `Can you confirm the proposed AI processing (${draft.aiService.trim()}) is approved for this data, including retention and access to its output?`
          : "Which AI service would receive app data, what would it receive, and what would it retain? Is that use approved?"
      );
  }
  questions.push(
    "Who will check allowed and denied access before we invite pilot users, and support or remove access afterward?"
  );
  return questions;
}
export function accessRequest(draft: AccessDraft, example: boolean): string {
  const name = draft.name.trim() || "[app name to confirm]";
  const groups = draft.groups
    .map(
      (g, i) =>
        `${i + 1}. ${g.name.trim() || "[group to confirm]"}\n   Records: ${g.scope.trim() || "[record boundary to confirm]"}\n   Proposed actions: ${g.actions.length ? g.actions.join(", ") : "[actions to confirm]"}`
    )
    .join("\n");
  const ai =
    draft.aiUse === "unknown"
      ? "AI use is still to be agreed."
      : draft.aiUse === "both"
        ? "We propose using AI to help write the code and as a feature inside the app."
        : draft.aiUse === "build"
          ? "We propose using AI to help write the code. AI inside the app is not part of this request."
          : "We propose an AI feature inside the app. Use of coding tools is outside this request.";
  return [
    `Subject: Access setup for ${name}`,
    example
      ? "ILLUSTRATIVE EXAMPLE — replace these details before sharing."
      : "DRAFT REQUEST — proposed needs for review; access has not been approved or configured by this tool.",
    "",
    `Hi ${draft.recipient.trim() || "[system / identity owner]"},`,
    "",
    `We’d like to build ${name}.`,
    `The aim: ${draft.purpose.trim() || "[user task to confirm]"}`,
    "",
    ai,
    ...(draft.aiUse === "feature" || draft.aiUse === "both"
      ? [
          `Proposed AI processing: ${draft.aiService.trim() || "[service, data sent, and retention to confirm]"}`,
        ]
      : []),
    "",
    "PROPOSED PEOPLE, RECORDS, AND ACTIONS",
    groups,
    "Please confirm these boundaries and how access outside them will be denied. Additional actions or users need a separate decision.",
    "",
    `Data: ${draft.data.trim() || "[data source and type to confirm]"}`,
    "",
    "WHAT EXISTS TODAY",
    draft.path === "existing"
      ? "We believe there is an existing access setup to check for fit."
      : draft.path === "missing"
        ? "The access setup for this app is not in place yet."
        : "We don’t yet know whether there is an existing setup we can reuse.",
    ...(draft.pathNotes.trim() ? [draft.pathNotes.trim()] : []),
    "",
    "COULD YOU HELP US RESOLVE THESE QUESTIONS?",
    ...accessQuestions(draft).map(q => `• ${q}`),
    "",
    `An answer would help: ${draft.neededBy.trim() || "[timing to agree]"}.`,
    "Please reply with the approved route (or what is missing), the owner of the next step, and an estimate of the work involved. If you’re not the right person, who should we involve?",
    "",
    "Possible work while this is resolved: agree whether a prototype using synthetic data would help. A demo does not establish that real-data access is ready.",
  ].join("\n");
}
