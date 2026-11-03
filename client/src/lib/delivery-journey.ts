import {
  emptyJourneyInquiry,
  inquiryOption,
  INFLUENCE_LABELS,
  type JourneyInquiry,
  type NextStepKind,
} from "./journey-inquiry";
import {
  JOURNEY_STAGES,
  type JourneyStageId,
  type JourneyTool,
} from "./delivery-journey-catalog";
export { JOURNEY_STAGES } from "./delivery-journey-catalog";
export type { JourneyStageId } from "./delivery-journey-catalog";

export const JOURNEY_TEMPLATES: Record<
  JourneyTool,
  {
    title: string;
    first: string;
    second: string;
    firstHint: string;
    secondHint: string;
  }
> = {
  decision: {
    title: "A decision request",
    first: "What decision do we need?",
    second: "What do we recommend, and what is the trade-off?",
    firstHint: "The specific choice that is holding up this piece of work.",
    secondHint: "A recommendation the decision owner can respond to.",
  },
  review: {
    title: "A review agreement",
    first: "Who will review, and when can they make room?",
    second: "What will we pause or provide to make that workable?",
    firstHint: "Agree coverage and a backup with the people involved.",
    secondHint:
      "Time, context, or a smaller change. Fit review into normal working hours.",
  },
  example: {
    title: "A shared example",
    first: "What should happen in one real situation?",
    second: "What awkward case or constraint do we need to check?",
    firstHint: "A user, their task, and the expected result.",
    secondHint: "Something that could change how we build this.",
  },
  release: {
    title: "A release improvement to discuss",
    first: "Which release step or handoff will we change?",
    second: "What must be checked before using the new approach?",
    firstHint: "One specific part of one release.",
    secondHint: "Required controls, an authorized owner, and a way to recover.",
  },
  experiment: {
    title: "A small bet",
    first: "What will we try differently?",
    second: "What will we make room for or leave alone?",
    firstHint: "A change the people involved can actually try.",
    secondHint: "Name the trade-off so this does not become extra work.",
  },
  slice: {
    title: "A smaller release to test",
    first: "Who will it help, and what can they finish?",
    second: "What could wait without breaking that result?",
    firstHint: "One group and one complete task.",
    secondHint: "Keep essential quality, security, and accessibility checks.",
  },
  dependency: {
    title: "A dependency request",
    first: "What exactly do we need from the other team?",
    second: "What happens if it cannot be done when we need it?",
    firstHint: "An answerable request with the context they need.",
    secondHint:
      "A real trade-off or alternative to discuss, not a deadline imposed on them.",
  },
};
export type JourneyPlan = {
  kind: NextStepKind;
  prepared: boolean;
  first: string;
  second: string;
  scope: string;
  owner: string;
  reviewOn: string;
  change: string;
  measure: string;
  protect: string;
  result: string;
  decision: "unreviewed" | "keep" | "adjust" | "stop";
};
export type JourneyFinding = {
  caseId: string;
  observation: string;
  inquiry: JourneyInquiry;
  evidence: "hunch" | "checked";
  plan: JourneyPlan;
};
export type JourneyDraft = {
  name: string;
  outcome: string;
  findings: JourneyFinding[];
  unknown: JourneyStageId[];
  clear: JourneyStageId[];
  questions: Partial<Record<JourneyStageId, string>>;
  focus: string | null;
};
export function journeyCase(id: string) {
  for (const stage of JOURNEY_STAGES)
    for (const symptom of stage.symptoms) {
      const cause = symptom.cases.find(c => c.id === id);
      if (cause) return { stage, symptom, cause };
    }
  return undefined;
}
export const emptyJourneyPlan = (): JourneyPlan => ({
  kind: "try",
  prepared: false,
  first: "",
  second: "",
  scope: "",
  owner: "",
  reviewOn: "",
  change: "",
  measure: "",
  protect: "",
  result: "",
  decision: "unreviewed",
});
export const emptyJourneyDraft = (): JourneyDraft => ({
  name: "",
  outcome: "",
  findings: [],
  unknown: [],
  clear: [],
  questions: {},
  focus: null,
});
export function addJourneyFinding(
  draft: JourneyDraft,
  caseId: string
): JourneyDraft {
  const match = journeyCase(caseId);
  if (!match) return draft;
  return {
    ...draft,
    focus: caseId,
    clear: draft.clear.filter(s => s !== match.stage.id),
    findings: draft.findings.some(f => f.caseId === caseId)
      ? draft.findings
      : [
          ...draft.findings,
          {
            caseId,
            observation: "",
            inquiry: emptyJourneyInquiry(),
            evidence: "hunch",
            plan: emptyJourneyPlan(),
          },
        ],
  };
}
export function journeyWorkingQuestion(finding: JourneyFinding) {
  const m = journeyCase(finding.caseId)!;
  const q =
    inquiryOption(finding.caseId, finding.inquiry.context)?.question ||
    m.cause.check;
  return finding.inquiry.tried === "yes"
    ? `${q} What would have to be different from the previous attempt for another step to be useful?`
    : q;
}
export function journeySuggestedAction(finding: JourneyFinding) {
  const m = journeyCase(finding.caseId)!;
  const action =
    inquiryOption(finding.caseId, finding.inquiry.context)?.action ||
    m.cause.action;
  if (
    finding.inquiry.influence === "outside" ||
    finding.inquiry.influence === "shared"
  )
    return `First discuss this with the people who can agree the change. A proposal to consider: ${action}`;
  return action;
}
export function journeyPlanTemplate(finding: JourneyFinding) {
  if (finding.plan.kind === "check")
    return {
      title: "One question to investigate",
      first: "What do we need to find out?",
      second: "Who or what could help us check it?",
      firstHint: "A question that could change what you do next.",
      secondHint:
        "A person, recent piece of work, or record to look at together.",
    };
  if (finding.plan.kind === "discuss")
    return {
      title: "A conversation to move this forward",
      first: "What do we need to agree or understand together?",
      second: "What example, previous attempt, and trade-off will we bring?",
      firstHint: "One question or decision for the people involved.",
      secondHint:
        "Give them enough context to respond. Include what you cannot change alone.",
    };
  return JOURNEY_TEMPLATES[journeyCase(finding.caseId)!.cause.tool];
}
export function prepareJourneyPlan(
  finding: JourneyFinding,
  kind: NextStepKind = "try"
): JourneyFinding {
  const match = journeyCase(finding.caseId);
  if (!match || finding.plan.prepared) return finding;
  const check = kind === "check",
    discuss = kind === "discuss";
  return {
    ...finding,
    plan: {
      ...finding.plan,
      kind,
      prepared: true,
      first: check || discuss ? journeyWorkingQuestion(finding) : "",
      second: check
        ? finding.inquiry.otherView
        : discuss
          ? [
              finding.observation && `What we saw: ${finding.observation}`,
              finding.inquiry.tried === "yes" &&
                finding.inquiry.attempt &&
                `What we tried: ${finding.inquiry.attempt}`,
              finding.inquiry.tried === "yes" &&
                finding.inquiry.obstacle &&
                `What happened: ${finding.inquiry.obstacle}`,
            ]
              .filter(Boolean)
              .join("\n\n")
          : "",
      change: check
        ? "Look at one recent example with someone involved. Record what supports or challenges the explanation."
        : journeySuggestedAction(finding),
      measure: check
        ? "Did we answer the question? What is still uncertain, and does the answer change our next step?"
        : discuss
          ? "Did we reach a decision or identify what is needed to make it? Record disagreements and any commitments explicitly."
          : match.cause.watch,
      protect:
        "Keep essential checks. Make room inside normal working hours; agree what will wait.",
    },
  };
}
export function exampleJourneyDraft(): JourneyDraft {
  let d = emptyJourneyDraft();
  d.name = "A renewal reminder feature";
  d.outcome =
    "Account managers can follow up before a customer’s renewal is missed.";
  d = addJourneyFinding(d, "check-1-1");
  d.findings[0].observation =
    "The pull request was ready on Tuesday. The first review was Friday. The reviewer was finishing another feature.";
  d = addJourneyFinding(d, "check-2-1");
  d.findings[1].observation =
    "At review, we discovered we had different ideas about when the reminder should be sent. We went back to agree the behaviour.";
  d.findings[0].inquiry = {
    ...emptyJourneyInquiry(),
    context: "commitments",
    tried: "yes",
    attempt: "We asked everyone to pick up reviews sooner.",
    obstacle: "Everyone still had the same delivery commitments.",
    influence: "shared",
    otherView: "Ask the reviewer and the person setting delivery commitments.",
  };
  d.focus = "check-1-1";
  return d;
}
export function hasJourneyWork(d: JourneyDraft) {
  return !!(
    d.name.trim() ||
    d.outcome.trim() ||
    d.findings.length ||
    d.unknown.length ||
    d.clear.length ||
    Object.values(d.questions).some(Boolean)
  );
}
const str = (v: unknown, max = 3000) =>
  typeof v === "string" ? v.slice(0, max) : "";
const object = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {};
export function readJourneyDraft(raw: string | null): JourneyDraft {
  try {
    const saved = object(JSON.parse(raw || "null"));
    if (saved.version !== 1) return emptyJourneyDraft();
    const d = object(saved.draft),
      seen = new Set<string>();
    if (!Array.isArray(d.findings)) return emptyJourneyDraft();
    const findings: JourneyFinding[] = [];
    for (const entry of (Array.isArray(d.findings) ? d.findings : []).slice(
      0,
      60
    )) {
      const f = object(entry),
        caseId = str(f.caseId, 80);
      if (!journeyCase(caseId) || seen.has(caseId)) continue;
      seen.add(caseId);
      const p = object(f.plan),
        plan = emptyJourneyPlan();
      for (const k of [
        "first",
        "second",
        "scope",
        "owner",
        "reviewOn",
        "change",
        "measure",
        "protect",
        "result",
      ] as const)
        plan[k] = str(p[k]);
      plan.kind = p.kind === "check" || p.kind === "discuss" ? p.kind : "try";
      plan.prepared = p.prepared === true;
      plan.decision = ["keep", "adjust", "stop"].includes(String(p.decision))
        ? (p.decision as JourneyPlan["decision"])
        : "unreviewed";
      const source = object(f.inquiry),
        inquiry = emptyJourneyInquiry();
      for (const k of ["detail", "attempt", "obstacle", "otherView"] as const)
        inquiry[k] = str(source[k]);
      inquiry.context =
        source.context === "unsure" ||
        source.context === "other" ||
        inquiryOption(caseId, str(source.context))
          ? str(source.context, 80)
          : "";
      inquiry.tried =
        source.tried === "yes" || source.tried === "not-yet"
          ? source.tried
          : "unknown";
      inquiry.influence = ["team", "shared", "outside"].includes(
        String(source.influence)
      )
        ? (source.influence as JourneyInquiry["influence"])
        : "unknown";
      findings.push({
        inquiry,
        caseId,
        observation: str(f.observation),
        evidence: f.evidence === "checked" ? "checked" : "hunch",
        plan,
      });
    }
    const stageIds = (v: unknown) =>
      Array.from(new Set(Array.isArray(v) ? v : [])).filter(
        (x): x is JourneyStageId => JOURNEY_STAGES.some(s => s.id === x)
      );
    const q = object(d.questions);
    const questions = Object.fromEntries(
      JOURNEY_STAGES.filter(s => typeof q[s.id] === "string").map(s => [
        s.id,
        str(q[s.id]),
      ])
    );
    return {
      name: str(d.name, 300),
      outcome: str(d.outcome, 1000),
      findings,
      questions,
      unknown: stageIds(d.unknown),
      clear: stageIds(d.clear).filter(
        s => !findings.some(f => journeyCase(f.caseId)?.stage.id === s)
      ),
      focus: typeof d.focus === "string" && seen.has(d.focus) ? d.focus : null,
    };
  } catch {
    return emptyJourneyDraft();
  }
}
export function journeyStageState(d: JourneyDraft, id: JourneyStageId) {
  const findings = d.findings.filter(
    f => journeyCase(f.caseId)?.stage.id === id
  );
  if (findings.length)
    return {
      state: "noticed",
      label: `${findings.length} ${findings.length === 1 ? "place" : "places"} to look`,
      findings,
    };
  if (d.unknown.includes(id))
    return { state: "unknown", label: "Still a question", findings };
  if (d.clear.includes(id))
    return { state: "clear", label: "Nothing noticed", findings };
  return { state: "unexplored", label: "Not explored", findings };
}
const given = (v: string, placeholder: string) =>
  v.trim() || `[${placeholder}]`;
export function journeySummary(d: JourneyDraft, example: boolean): string {
  const lines = [
    "WHERE’S THE WORK GETTING STUCK?",
    example
      ? "Illustrative example — not your team’s evidence."
      : "Working notes — confirm together.",
    "",
    `Piece of work: ${given(d.name, "name one piece of work")}`,
    `Useful result: ${given(d.outcome, "outcome to agree")}`,
    "",
    "PLACES WE NOTICED",
  ];
  if (!d.findings.length)
    lines.push(
      "No possible delays recorded yet. This does not establish that there are none."
    );
  for (const f of d.findings) {
    const m = journeyCase(f.caseId)!;
    lines.push(
      "",
      `${m.stage.name} — ${m.symptom.label}`,
      `Possible explanation: ${m.cause.label}`,
      `Evidence: ${f.evidence === "checked" ? "Checked against a real example (author’s assessment; not proof of causation)." : "A hunch to check."}`,
      `What we noticed: ${given(f.observation, "observation to add")}`,
      `Question worth checking: ${journeyWorkingQuestion(f)}`,
      `What makes this hard to change: ${inquiryOption(f.caseId, f.inquiry.context)?.label || (f.inquiry.context === "other" ? "Another situation" : "Still to find out")}`,
      `More context: ${given(f.inquiry.detail, "context to add if useful")}`,
      `Previous attempts: ${f.inquiry.tried === "yes" ? given(f.inquiry.attempt, "describe what was tried") : f.inquiry.tried === "not-yet" ? "Nothing tried yet" : "Not sure yet"}`,
      ...(f.inquiry.tried === "yes"
        ? [
            `What happened / what got in the way: ${given(f.inquiry.obstacle, "check what happened")}`,
          ]
        : []),
      `Influence: ${INFLUENCE_LABELS[f.inquiry.influence]}`,
      `Another perspective to seek: ${given(f.inquiry.otherView, "person or question to identify")}`
    );
    if (m.cause.returnsTo)
      lines.push(
        `Possible return: ${m.stage.name} → ${JOURNEY_STAGES.find(s => s.id === m.cause.returnsTo)!.name}`
      );
  }
  lines.push("", "STILL TO EXPLORE");
  const pending = JOURNEY_STAGES.filter(s =>
    ["unknown", "unexplored"].includes(journeyStageState(d, s.id).state)
  );
  lines.push(
    ...pending.map(
      s => `${s.name}: ${journeyStageState(d, s.id).label}. ${s.evidence}`
    )
  );
  if (!pending.length)
    lines.push(
      "No untouched stages; this map is not a complete audit or a ranking of delays."
    );
  for (const s of JOURNEY_STAGES.filter(
    s => d.unknown.includes(s.id) || d.questions[s.id]?.trim()
  ))
    lines.push(
      `Open question at ${s.name}: ${d.questions[s.id]?.trim() || s.evidence}`
    );
  const clear = d.clear.filter(
    id => !d.findings.some(f => journeyCase(f.caseId)?.stage.id === id)
  );
  if (clear.length)
    lines.push(
      "",
      `Nothing noticed on this piece of work: ${clear.map(id => JOURNEY_STAGES.find(s => s.id === id)!.name).join(", ")}. This is not evidence that these stages are always clear.`
    );
  for (const f of d.findings.filter(f => f.plan.prepared)) {
    const m = journeyCase(f.caseId)!,
      p = f.plan,
      t = journeyPlanTemplate(f);
    lines.push(
      "",
      `${d.focus === f.caseId ? "CHOSEN NEXT STEP" : "SAVED DRAFT"} — ${t.title}`,
      p.kind === "try" ? m.cause.title : `About: ${m.cause.label}`,
      `${t.first}: ${given(p.first, "agree together")}`,
      `${t.second}: ${given(p.second, "agree together")}`,
      `Proposed next step: ${given(p.change, "next step to agree")}`,
      `${p.kind === "try" ? "Try it on" : "Piece of work to look at"}: ${given(p.scope, "one piece of work or small sample")}`,
      `Owner / people agreeing: ${given(p.owner, "owner to agree")}`,
      `Review on: ${given(p.reviewOn, "date to agree")}`,
      `Watch: ${given(p.measure, "what to observe")}`,
      `Protect: ${given(p.protect, "what must not get worse")}`,
      `What happened: ${given(p.result, "not reviewed yet")}`,
      `Next decision: ${p.decision === "unreviewed" ? "Not made yet" : p.decision}`
    );
  }
  lines.push(
    "",
    "These are possibilities to investigate, not a diagnosis, a delivery forecast, or a measured AI saving. Keep necessary checks and learning. Consider the whole journey and the people doing the work."
  );
  return lines.join("\n");
}
