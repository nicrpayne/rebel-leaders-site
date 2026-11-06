import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleHelp,
  Copy,
  Download,
  RotateCcw,
  Compass,
  PencilRuler,
  Code2,
  ScanSearch,
  Send,
  Users,
  X,
} from "lucide-react";
import type { Audience } from "@/lib/field-tool-paths";
import {
  JOURNEY_STAGES,
  addJourneyFinding,
  emptyJourneyDraft,
  exampleJourneyDraft,
  journeyCase,
  journeyStageState,
  journeySummary,
  journeyPlanTemplate,
  journeyWorkingQuestion,
  journeySuggestedAction,
  prepareJourneyPlan,
  readJourneyDraft,
  type JourneyDraft,
  type JourneyFinding,
  type JourneyPlan,
  type JourneyStageId,
} from "@/lib/delivery-journey";
import "./delivery-journey.css";
import JourneyInquiryForm from "./JourneyInquiryForm";
import {
  suggestedNextKind,
  NEXT_STEP_NAMES,
  type NextStepKind,
} from "@/lib/journey-inquiry";

type View =
  | "map"
  | "symptoms"
  | "causes"
  | "action"
  | "investigate"
  | "evidence"
  | "plan"
  | "walked";
const stageIcons = {
  decide: Compass,
  shape: PencilRuler,
  build: Code2,
  check: ScanSearch,
  release: Send,
  use: Users,
};
export default function DeliveryJourney({
  audience,
  onTool,
}: {
  audience: Audience;
  onTool: (tool: "slice" | "access" | "workflow") => void;
}) {
  const storageKey = `rebel-delivery-journey-v1-${audience}`;
  const [own, setOwn] = useState(() => {
    try {
      return readJourneyDraft(localStorage.getItem(storageKey));
    } catch {
      return emptyJourneyDraft();
    }
  });
  const [example, setExample] = useState(exampleJourneyDraft);
  const [mode, setMode] = useState<"own" | "example">("own");
  const [stageId, setStageId] = useState<JourneyStageId | null>(null);
  const [symptomId, setSymptomId] = useState<string | null>(null);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [view, setView] = useState<View>("map");
  const [message, setMessage] = useState("");
  const [storageFailed, setStorageFailed] = useState(false);
  const [removed, setRemoved] = useState<{
    finding: JourneyFinding;
    index: number;
    wasFocus: boolean;
  } | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const detail = useRef<HTMLDivElement>(null);
  const draft = mode === "own" ? own : example;
  const setDraft = mode === "own" ? setOwn : setExample;
  const stage = JOURNEY_STAGES.find(s => s.id === stageId);
  const symptom = stage?.symptoms.find(s => s.id === symptomId);
  const match = caseId ? journeyCase(caseId) : undefined;
  const finding = draft.findings.find(f => f.caseId === caseId);
  const template = finding ? journeyPlanTemplate(finding) : undefined;
  const summary = journeySummary(draft, mode === "example");
  const loops = draft.findings.filter(
    f => journeyCase(f.caseId)?.cause.returnsTo
  );
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ version: 1, draft: own })
      );
      setStorageFailed(false);
    } catch {
      setStorageFailed(true);
    }
  }, [own, storageKey]);
  useEffect(() => setMessage(""), [summary, mode]);
  function reveal(next: View) {
    setView(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function selectStage(id: JourneyStageId) {
    setStageId(id);
    setSymptomId(null);
    setCaseId(null);
    reveal("symptoms");
  }
  function selectFinding(id: string) {
    const m = journeyCase(id);
    if (!m) return;
    setStageId(m.stage.id);
    setSymptomId(m.symptom.id);
    setCaseId(id);
    setDraft(d => ({ ...d, focus: id }));
    reveal(
      draft.findings.find(f => f.caseId === id)?.plan.prepared
        ? "plan"
        : "investigate"
    );
  }
  function switchMode(next: "own" | "example") {
    setMode(next);
    setRemoved(null);
    setMessage("");
    setStageId(next === "example" ? "check" : null);
    setSymptomId(next === "example" ? "check-1" : null);
    setCaseId(next === "example" ? "check-1-1" : null);
    reveal(next === "example" ? "investigate" : "map");
  }
  function editFinding(change: (f: JourneyFinding) => JourneyFinding) {
    if (caseId)
      setDraft(d => ({
        ...d,
        findings: d.findings.map(f => (f.caseId === caseId ? change(f) : f)),
      }));
  }
  function planField(key: keyof JourneyPlan, value: string) {
    editFinding(f => ({ ...f, plan: { ...f.plan, [key]: value } }));
  }
  function keep(prepare: boolean, kind: NextStepKind = "try") {
    if (!caseId) return;
    setDraft(d => {
      const next = addJourneyFinding(d, caseId);
      return prepare
        ? {
            ...next,
            findings: next.findings.map(f =>
              f.caseId === caseId ? prepareJourneyPlan(f, kind) : f
            ),
          }
        : next;
    });
    setMessage(
      prepare
        ? "Draft started. Agree the details with the people involved."
        : "Added to your map as a possibility to check."
    );
    if (prepare) reveal("plan");
  }
  function unsure() {
    if (!stageId) return;
    setDraft(d => ({
      ...d,
      unknown: Array.from(new Set([...d.unknown, stageId])),
      clear: d.clear.filter(id => id !== stageId),
    }));
    reveal("evidence");
  }
  function nextStage(markClear: boolean) {
    if (!stageId) return;
    if (
      markClear &&
      !draft.findings.some(f => journeyCase(f.caseId)?.stage.id === stageId)
    )
      setDraft(d => ({
        ...d,
        clear: Array.from(new Set([...d.clear, stageId])),
        unknown: d.unknown.filter(id => id !== stageId),
      }));
    const i = JOURNEY_STAGES.findIndex(s => s.id === stageId);
    if (i === JOURNEY_STAGES.length - 1) {
      setStageId(null);
      setCaseId(null);
      setSymptomId(null);
      reveal("walked");
    } else selectStage(JOURNEY_STAGES[i + 1].id);
  }
  function remove(id: string) {
    const index = draft.findings.findIndex(f => f.caseId === id);
    if (index < 0) return;
    setRemoved({
      finding: draft.findings[index],
      index,
      wasFocus: draft.focus === id,
    });
    setDraft(d => ({
      ...d,
      findings: d.findings.filter(f => f.caseId !== id),
      focus: d.focus === id ? null : d.focus,
    }));
    if (caseId === id) {
      setCaseId(null);
      reveal("symptoms");
    }
  }
  function undo() {
    if (!removed) return;
    setDraft(d => {
      if (d.findings.some(f => f.caseId === removed.finding.caseId)) return d;
      const findings = [...d.findings];
      findings.splice(
        Math.min(removed.index, findings.length),
        0,
        removed.finding
      );
      return {
        ...d,
        findings,
        focus: removed.wasFocus ? removed.finding.caseId : d.focus,
      };
    });
    setRemoved(null);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setMessage("Map and saved plans copied.");
    } catch {
      setMessage(
        "Copy wasn’t available. Download your notes or select the full text below."
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "shipping-sooner-map-and-plan.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Map and saved plans downloaded.");
  }
  const planInput = (
    key: keyof JourneyPlan,
    label: string,
    placeholder = "",
    multiline = false
  ) => (
    <label key={key}>
      {label}
      {multiline ? (
        <textarea
          maxLength={3000}
          value={String(finding?.plan[key] || "")}
          placeholder={placeholder}
          onChange={e => planField(key, e.target.value)}
        />
      ) : (
        <input
          maxLength={3000}
          type="text"
          value={String(finding?.plan[key] || "")}
          placeholder={placeholder}
          onChange={e => planField(key, e.target.value)}
        />
      )}
    </label>
  );

  return (
    <section
      className="delivery-journey"
      aria-label="Explore your delivery journey"
    >
      <div
        className="shipping-mode"
        role="group"
        aria-label="Choose your journey"
      >
        <button aria-pressed={mode === "own"} onClick={() => switchMode("own")}>
          Follow my work
        </button>
        <button
          aria-pressed={mode === "example"}
          onClick={() => switchMode("example")}
        >
          Try the review-delay example
        </button>
        <span>
          {mode === "own"
            ? "Start anywhere. Exact timings aren’t needed."
            : "Invented example. Your own map stays separate."}
        </span>
      </div>
      {storageFailed && (
        <p className="journey-alert" role="alert">
          This browser couldn’t save your map. Copy or download it before
          leaving.
        </p>
      )}
      <details className="journey-context">
        <summary>
          {draft.name || "Which piece of work are you thinking of?"}{" "}
          <span>Optional · keep the same example in mind</span>
        </summary>
        <div className="journey-context-fields">
          <label>
            One recent feature or change
            <input
              maxLength={300}
              value={draft.name}
              placeholder="e.g. Renewal reminders"
              onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
            />
          </label>
          <label>
            What should it help someone do?
            <input
              maxLength={1000}
              value={draft.outcome}
              placeholder="The useful result you wanted to reach people sooner."
              onChange={e => setDraft(d => ({ ...d, outcome: e.target.value }))}
            />
          </label>
        </div>
      </details>
      <div
        className="journey-map"
        role="group"
        aria-label="From idea to people using it"
      >
        {JOURNEY_STAGES.map(s => {
          const status = journeyStageState(draft, s.id);
          const StageIcon = stageIcons[s.id];
          return (
            <button
              key={s.id}
              className={`journey-stop journey-stop-${status.state}`}
              aria-pressed={stageId === s.id}
              aria-label={`${s.name}: ${status.label}`}
              onClick={() => selectStage(s.id)}
            >
              <span className="journey-station" aria-hidden="true">
                {status.state === "clear" ? (
                  <Check size={19} />
                ) : status.state === "unknown" ? (
                  <CircleHelp size={19} />
                ) : (
                  <StageIcon size={22} strokeWidth={1.7} />
                )}
              </span>
              <strong>{s.name}</strong>
              <span className="journey-stop-state">
                {status.state === "noticed" && (
                  <span aria-hidden="true">● </span>
                )}
                {status.label}
              </span>
              {!!status.findings.length && (
                <span className="journey-marks">
                  {Array.from(
                    new Set(
                      status.findings.map(
                        f => journeyCase(f.caseId)!.symptom.mark
                      )
                    )
                  ).join(" · ")}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="journey-map-caption">
        <span>
          Pick a place to open it up. Your work may loop back or overlap.
        </span>
        <span>Marks show what you noticed, not a ranking.</span>
      </div>
      {!!loops.length && (
        <div className="journey-loops" aria-label="Places work may loop back">
          {loops.map(f => {
            const m = journeyCase(f.caseId)!;
            return (
              <button key={f.caseId} onClick={() => selectFinding(f.caseId)}>
                <RotateCcw size={15} />
                <span>
                  {m.stage.name} →{" "}
                  {JOURNEY_STAGES.find(s => s.id === m.cause.returnsTo)!.name}:{" "}
                  {m.symptom.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <a className="journey-mobile-jump" href="#journey-noticed">
        See the places you’ve marked ↓
      </a>
      <div className="journey-layout">
        <div
          key={`${mode}:${view}:${stageId}:${symptomId}:${caseId}`}
          className="journey-detail"
          ref={detail}
          id="journey-detail"
        >
          {stage && (
            <div className="journey-crumbs">
              <button onClick={() => selectStage(stage.id)}>
                {stage.name}
              </button>
              {symptom && (
                <>
                  <span>›</span>
                  <button onClick={() => reveal("causes")}>
                    {symptom.label}
                  </button>
                </>
              )}
            </div>
          )}
          {(view === "map" || view === "walked") && (
            <>
              <p className="journey-eyebrow">FOLLOW ONE PIECE OF WORK</p>
              <h2 ref={heading} tabIndex={-1}>
                {view === "walked"
                  ? draft.findings.length
                    ? "Which of these is worth checking first?"
                    : "No obvious sticking point yet."
                  : "Where did it stop moving?"}
              </h2>
              <p>
                {view === "walked"
                  ? draft.findings.length
                    ? "Choose a place from your map. Talk with the people involved before deciding what to change. You can revisit any part of the journey."
                    : "That is useful too. You don’t need to invent a problem. Compare notes with someone involved, or try another recent piece of work."
                  : `Think of one feature you’ve worked on with your ${audience === "pm" ? "developer" : "PM"}. Pick a place that feels familiar, or walk through the journey together.`}
              </p>
              <div className="journey-actions">
                <button
                  className="journey-primary"
                  onClick={() => selectStage("decide")}
                >
                  Walk me through <ArrowRight size={16} />
                </button>
                <button
                  className="journey-link"
                  onClick={() => switchMode("example")}
                >
                  Show me an example
                </button>
              </div>
              <p className="journey-quiet">
                Look at waiting, interruptions, repeated work, and handoffs.
                Necessary learning and checks are part of delivery too.
              </p>
            </>
          )}
          {view === "symptoms" && stage && (
            <>
              <p className="journey-eyebrow">WHAT SOUNDS FAMILIAR?</p>
              <h2 ref={heading} tabIndex={-1}>
                {stage.question}
              </h2>
              <div className="journey-choices">
                {stage.symptoms.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSymptomId(s.id);
                      reveal("causes");
                    }}
                  >
                    <span>{s.label}</span>
                    <ArrowRight size={17} />
                  </button>
                ))}
              </div>
              <div className="journey-actions">
                <button
                  className="journey-link"
                  onClick={() => nextStage(true)}
                >
                  {draft.findings.some(
                    f => journeyCase(f.caseId)?.stage.id === stageId
                  )
                    ? "Explore the next part"
                    : "Nothing like this on this piece of work"}{" "}
                  <ArrowRight size={15} />
                </button>
                <button className="journey-link" onClick={unsure}>
                  Not sure / something else
                </button>
              </div>
            </>
          )}
          {view === "causes" && symptom && (
            <>
              <p className="journey-eyebrow">GET CLOSER TO WHAT HAPPENED</p>
              <h2 ref={heading} tabIndex={-1}>
                {symptom.question}
              </h2>
              <div className="journey-choices">
                {symptom.cases.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCaseId(c.id);
                      setDraft(d => addJourneyFinding(d, c.id));
                      reveal("investigate");
                    }}
                  >
                    <span>{c.label}</span>
                    <ArrowRight size={17} />
                  </button>
                ))}
              </div>
              <p className="journey-quiet">
                More than one may fit. Keep each possibility you want to
                explore.
              </p>
              <button className="journey-link" onClick={unsure}>
                Not sure / something else
              </button>
            </>
          )}
          {view === "evidence" && stage && (
            <>
              <p className="journey-eyebrow">LOOK BEFORE CHANGING SOMETHING</p>
              <h2 ref={heading} tabIndex={-1}>
                One thing to check together.
              </h2>
              <p className="journey-check">{stage.evidence}</p>
              <label>
                What else happened, or what do you need to find out?
                <textarea
                  maxLength={3000}
                  value={draft.questions[stage.id] || ""}
                  placeholder="Capture your own situation. The choices don’t need to cover it."
                  onChange={e =>
                    setDraft(d => ({
                      ...d,
                      questions: { ...d.questions, [stage.id]: e.target.value },
                    }))
                  }
                />
              </label>
              <p className="journey-quiet">
                This stays on your map as an open question. Unknown is different
                from nothing noticed.
              </p>
              <div className="journey-actions">
                <button
                  className="journey-primary"
                  onClick={() => selectStage(stage.id)}
                >
                  Back to the possibilities
                </button>
                <button
                  className="journey-link"
                  onClick={() => nextStage(false)}
                >
                  Explore the next part <ArrowRight size={15} />
                </button>
              </div>
            </>
          )}
          {view === "investigate" && match && finding && (
            <>
              <p className="journey-eyebrow">UNDERSTAND WHAT KEEPS IT STUCK</p>
              <h2 ref={heading} tabIndex={-1}>
                What happens when you try to move this?
              </h2>
              <p>
                {match.cause.label} Start with what you have seen. Leave
                anything you don't know open.
              </p>
              <JourneyInquiryForm finding={finding} onChange={editFinding} />
              <div className="journey-actions">
                <button
                  className="journey-primary"
                  onClick={() => reveal("action")}
                >
                  Choose a useful next step <ArrowRight size={16} />
                </button>
              </div>
              <p className="journey-quiet">
                Your notes stay on the map. You can leave with a question to
                investigate.
              </p>
            </>
          )}
          {view === "action" && match && finding && (
            <>
              <p className="journey-eyebrow">CHOOSE WHAT WOULD HELP NEXT</p>
              <h2 ref={heading} tabIndex={-1}>
                What would move this forward?
              </h2>
              <p className="journey-check">
                <strong>A question worth checking:</strong>{" "}
                {journeyWorkingQuestion(finding)}
              </p>
              {finding.inquiry.tried === "yes" && (
                <div className="journey-prior-attempt">
                  <p className="journey-eyebrow">
                    KEEP THE PREVIOUS ATTEMPT IN VIEW
                  </p>
                  <p>
                    {finding.inquiry.attempt ||
                      "You said something has already been tried. Record it before repeating the advice."}
                  </p>
                  <p>
                    {finding.inquiry.obstacle ||
                      "What helped, and what got in the way? That is still worth checking."}
                  </p>
                </div>
              )}
              <p className="journey-quiet">
                Based on the choices you made. Check the explanation with
                someone involved.
              </p>
              {finding.plan.prepared ? (
                <div className="journey-actions">
                  <button
                    className="journey-primary"
                    onClick={() => reveal("plan")}
                  >
                    Continue your saved next step <ArrowRight size={16} />
                  </button>
                  <p className="journey-quiet">
                    Your earlier draft is kept as you revise your understanding.
                    Edit it to reflect what you now know.
                  </p>
                </div>
              ) : (
                <div className="journey-next-options">
                  {(["check", "discuss", "try"] as NextStepKind[]).map(kind => (
                    <button key={kind} onClick={() => keep(true, kind)}>
                      {suggestedNextKind(
                        finding.inquiry,
                        finding.observation
                      ) === kind && (
                        <span className="journey-eyebrow">
                          A USEFUL STARTING POINT
                        </span>
                      )}
                      <strong>
                        {NEXT_STEP_NAMES[kind]} <ArrowRight size={16} />
                      </strong>
                      <span>
                        {kind === "check"
                          ? "Prepare one question, and identify who or what could help answer it."
                          : kind === "discuss"
                            ? "Bring the example, previous attempts, and a decision or trade-off to the people involved."
                            : finding.inquiry.influence === "team"
                              ? "Draft a bounded change to agree with the team, including what must not get worse."
                              : "Draft a possible change to take to the people who can agree it. Permission and capacity still need discussing."}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <details className="journey-possibility">
                <summary>One possibility to consider together</summary>
                <p>{journeySuggestedAction(finding)}</p>
                <p>
                  <strong>Who may need to be involved:</strong>{" "}
                  {match.cause.people} Check who holds those responsibilities in
                  your organisation.
                </p>
                <p>
                  <strong>If you try a change:</strong> {match.cause.watch}
                </p>
              </details>
              <button
                className="journey-link"
                onClick={() => reveal("investigate")}
              >
                Back to what happened and what you've tried
              </button>
              {match.cause.tool === "slice" && (
                <button
                  className="journey-tool-link"
                  onClick={() => onTool("slice")}
                >
                  Open the smaller-release tool <ArrowRight size={16} />
                </button>
              )}
            </>
          )}
          {view === "plan" && match && finding && template && (
            <>
              <p className="journey-eyebrow">A DRAFT TO AGREE TOGETHER</p>
              <h2 ref={heading} tabIndex={-1}>
                {template.title}
              </h2>
              <p>
                {finding.plan.kind === "check"
                  ? "You can make progress by answering one useful question."
                  : finding.plan.kind === "discuss"
                    ? "Bring one question to the people involved. What needs deciding now, and what can move ahead already?"
                    : "Start small: one useful change to agree with the people involved, then learn from what happens."}
              </p>
              <div className="journey-plan-fields">
                {planInput("first", template.first, template.firstHint, true)}
                {planInput(
                  "second",
                  template.second,
                  template.secondHint,
                  true
                )}
                <details>
                  <summary>
                    The proposed next step and what to watch{" "}
                    <span>Edit to fit your work</span>
                  </summary>
                  {planInput("change", "Proposed next step", "", true)}
                  {planInput(
                    "measure",
                    "How will we tell whether it helped?",
                    "",
                    true
                  )}
                  {planInput("protect", "What must not get worse?", "", true)}
                </details>
                {planInput(
                  "scope",
                  finding.plan.kind === "try"
                    ? "Try it on"
                    : "Which piece of work will you look at?",
                  "One piece of work, or a small set of similar changes."
                )}
                <div className="journey-plan-pair">
                  {planInput(
                    "owner",
                    "Who needs to agree and own it?",
                    "Names to agree together"
                  )}
                  {planInput(
                    "reviewOn",
                    "When will you look back?",
                    "e.g. Friday 13 November, after three changes"
                  )}
                </div>
                {(finding.plan.kind === "discuss" ||
                  (finding.plan.kind === "try" &&
                    match.cause.tool === "decision") ||
                  finding.plan.decisionNotes.trim()) && (
                  <details>
                    <summary>
                      A complicated decision? <span>Optional</span>
                    </summary>
                    <p>
                      If several people need to be involved, separate who brings
                      the recommendation, whose input helps, who must sign off,
                      who makes the call, and who carries it out. Use only what
                      this decision needs.
                    </p>
                    {planInput(
                      "decisionNotes",
                      "What needs untangling?",
                      "Who is needed for which part? What can move ahead already, and what would make it time to revisit the rest?",
                      true
                    )}
                  </details>
                )}
                <details>
                  <summary>
                    When you come back{" "}
                    <span>What happened, and what next?</span>
                  </summary>
                  {planInput(
                    "result",
                    "What happened, and what did you learn?",
                    "Did it help the people using the work? Look at the delay, team workload, quality, and what else might explain the result.",
                    true
                  )}
                  <label>
                    What will you do next?
                    <select
                      value={finding.plan.decision}
                      onChange={e => planField("decision", e.target.value)}
                    >
                      <option value="unreviewed">Not decided yet</option>
                      <option value="keep">
                        {finding.plan.kind === "try"
                          ? "Keep trying this"
                          : "Follow up on this"}
                      </option>
                      <option value="adjust">
                        {finding.plan.kind === "try"
                          ? "Adjust and try again"
                          : "Adjust the next step"}
                      </option>
                      <option value="stop">
                        {finding.plan.kind === "try"
                          ? "Stop this change"
                          : "Stop pursuing this step"}
                      </option>
                    </select>
                  </label>
                </details>
              </div>
              <div className="journey-actions">
                <button className="journey-primary" onClick={copy}>
                  <Copy size={16} /> Copy map and plan
                </button>
                <button className="journey-link" onClick={download}>
                  <Download size={16} /> Download
                </button>
              </div>
              <button className="journey-link" onClick={() => reveal("action")}>
                Back to choosing a next step
              </button>
              {match.cause.tool === "slice" && (
                <button
                  className="journey-tool-link"
                  onClick={() => onTool("slice")}
                >
                  Shape the first release <ArrowRight size={16} />
                </button>
              )}
            </>
          )}
          <p role="status" className="journey-message">
            {message}
          </p>
        </div>
        <aside
          className="journey-board"
          id="journey-noticed"
          aria-label="Places you’ve marked"
        >
          <p className="journey-eyebrow">YOUR MAP</p>
          <h2>What you’re noticing.</h2>
          <p className="journey-quiet">
            Keep the possibilities here. Start with one that matters for this
            work and that you can learn more about.
          </p>
          {!draft.findings.length && (
            <p className="journey-empty">
              The places you keep will appear here. Start with something you
              recognise.
            </p>
          )}
          {draft.findings.map(f => {
            const m = journeyCase(f.caseId)!;
            return (
              <div
                key={f.caseId}
                className={`journey-finding ${draft.focus === f.caseId ? "journey-finding-active" : ""}`}
              >
                <button
                  className="journey-finding-open"
                  onClick={() => selectFinding(f.caseId)}
                  aria-label={`Open ${m.cause.label}`}
                >
                  <span className="journey-eyebrow">
                    {m.stage.name} ·{" "}
                    {f.evidence === "hunch" ? "HUNCH" : "CHECKED EXAMPLE"}
                  </span>
                  <strong>{m.cause.label}</strong>
                  <span>
                    {f.plan.prepared
                      ? draft.focus === f.caseId
                        ? "Chosen next step · draft saved"
                        : "Draft saved"
                      : "Narrow this down"}
                  </span>
                </button>
                <button
                  className="journey-remove"
                  aria-label={`Remove ${m.cause.label}`}
                  onClick={() => remove(f.caseId)}
                >
                  <X size={15} />
                </button>
              </div>
            );
          })}
          {removed && (
            <div className="journey-undo" role="status">
              Removed from the map. <button onClick={undo}>Undo</button>
            </div>
          )}
          {draft.unknown.map(id => (
            <button
              className="journey-question"
              key={id}
              onClick={() => {
                setStageId(id);
                setSymptomId(null);
                setCaseId(null);
                reveal("evidence");
              }}
            >
              <CircleHelp size={15} />
              <span>
                {JOURNEY_STAGES.find(s => s.id === id)!.name}: still a question
              </span>
            </button>
          ))}
          <div className="journey-board-share">
            <button onClick={copy}>
              <Copy size={15} /> Copy notes
            </button>
            <button onClick={download}>
              <Download size={15} /> Download
            </button>
          </div>
          <details className="journey-full-notes">
            <summary>Read everything you’ll share</summary>
            <pre>{summary}</pre>
          </details>
          <p className="journey-quiet">
            {mode === "own"
              ? "Saved in this browser. Download to take it to another device."
              : "Example only. Switch to Follow my work for your own map."}
          </p>
          <a className="journey-mobile-jump" href="#journey-detail">
            Back to exploring ↑
          </a>
        </aside>
      </div>
    </section>
  );
}
