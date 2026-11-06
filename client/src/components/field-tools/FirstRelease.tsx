import FieldToolLink from "@/components/field-tools/FieldToolLink";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Copy, Download, Plus } from "lucide-react";
import type { Audience } from "@/lib/field-tool-paths";
import {
  SLICE_LENSES,
  RELEASE_CHECKS,
  emptyReleaseDraft,
  exampleReleaseDraft,
  hasReleaseWork,
  readReleaseDraft,
  releaseGroups,
  releaseGaps,
  releaseSummary,
  type ReleaseDraft,
  type ScopeChoice,
  type ScopeItem,
  type ReleaseCheck,
} from "@/lib/first-release";
import "./first-release.css";

export default function FirstRelease({ audience }: { audience: Audience }) {
  const storageKey = `rebel-first-release-v1-${audience}`;
  const [own, setOwn] = useState(() => {
    try {
      return readReleaseDraft(localStorage.getItem(storageKey));
    } catch {
      return emptyReleaseDraft();
    }
  });
  const [example, setExample] = useState(exampleReleaseDraft);
  const [mode, setMode] = useState<"example" | "own">(() =>
    hasReleaseWork(own) ? "own" : "example"
  );
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [storageFailed, setStorageFailed] = useState(false);
  const [pendingItems, setPendingItems] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [removed, setRemoved] = useState<{
    item: ScopeItem;
    index: number;
  } | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const draft = mode === "example" ? example : own;
  const setDraft = mode === "example" ? setExample : setOwn;
  const groups = releaseGroups(draft);
  const gaps = releaseGaps(draft);
  const summary = releaseSummary(draft, mode === "example");
  const lens = SLICE_LENSES.find(l => l.id === draft.lens) ?? SLICE_LENSES[1];
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
  useEffect(() => setMessage(""), [summary]);
  function edit<K extends keyof ReleaseDraft>(key: K, value: ReleaseDraft[K]) {
    setDraft(previous => ({ ...previous, [key]: value }));
  }
  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function switchMode(next: "example" | "own") {
    setMode(next);
    setRemoved(null);
    setPendingItems("");
    setAddMessage("");
    setStep(1);
  }
  function addItems() {
    const lines = pendingItems
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);
    if (!lines.length) return;
    if (lines.some(line => line.length > 500)) {
      setAddMessage(
        "Keep each scope item to a short description (under 500 characters). Your text is still here to edit."
      );
      return;
    }
    if (draft.items.length + lines.length > 30) {
      setAddMessage(
        "Keep this to 30 scope items. Add fewer lines, or combine related items."
      );
      return;
    }
    edit("items", [
      ...draft.items,
      ...lines.map(text => ({
        id: crypto.randomUUID(),
        text: text.slice(0, 500),
        choice: "check" as const,
      })),
    ]);
    setPendingItems("");
    setAddMessage(
      `${lines.length === 1 ? "Item" : `${lines.length} items`} added under Needs checking.`
    );
  }
  function moveItem(id: string, choice: ScopeChoice) {
    edit(
      "items",
      draft.items.map(i => (i.id === id ? { ...i, choice } : i))
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setMessage("Proposal copied. Bring it to your PM or developer.");
    } catch {
      setMessage(
        "Copy wasn’t available. Download the proposal or select the full text below."
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "first-release-proposal.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Proposal downloaded.");
  }
  return (
    <section className="first-release" aria-label="Shape a first release">
      <div
        className="shipping-mode"
        role="group"
        aria-label="Choose your first-release work"
      >
        <button
          aria-pressed={mode === "example"}
          onClick={() => switchMode("example")}
        >
          Try an example
        </button>
        <button aria-pressed={mode === "own"} onClick={() => switchMode("own")}>
          Use my own feature
        </button>
        <span>
          {mode === "example"
            ? "An invented dashboard request. Change it and watch the proposal take shape."
            : "Your draft saves in this browser. The example stays separate."}
        </span>
      </div>
      {storageFailed && (
        <p role="alert" className="first-release-alert">
          Your browser couldn’t save this draft. Copy or download it before
          leaving.
        </p>
      )}
      <FieldToolLink className="first-release-mobile-jump" href="#first-release-proposal">
        See your proposal ↓
      </FieldToolLink>
      <div className="first-release-grid">
        <div className="first-release-editor" id="first-release-choices">
          <nav className="shipping-steps" aria-label="First-release steps">
            {["The feature", "Make it smaller", "Check it"].map((name, i) => (
              <button
                key={name}
                aria-current={step === i + 1 ? "step" : undefined}
                onClick={() => go(i + 1)}
              >
                <span>0{i + 1}</span>
                {name}
              </button>
            ))}
          </nav>
          <div className="first-release-body">
            <h2 ref={heading} tabIndex={-1}>
              {step === 1
                ? "What does someone need to do?"
                : step === 2
                  ? "What belongs in the first release?"
                  : "Would this still be useful?"}
            </h2>
            {step === 1 && (
              <>
                <p className="first-release-help">
                  {audience === "pm"
                    ? "Bring one feature you’re considering. Start with what someone needs, then work through the smaller version with a developer."
                    : "Bring one feature the team is being asked to build. Keep the user’s task in view while you explore a smaller version with your PM."}
                </p>
                <label className="first-release-field">
                  The feature
                  <input
                    maxLength={180}
                    value={draft.feature}
                    placeholder="e.g. A reporting dashboard"
                    onChange={e => edit("feature", e.target.value)}
                  />
                </label>
                <label className="first-release-field">
                  Who could use it first?
                  <input
                    maxLength={180}
                    value={draft.user}
                    placeholder="e.g. Account managers"
                    onChange={e => edit("user", e.target.value)}
                  />
                </label>
                <label className="first-release-field">
                  What should they be able to do?
                  <textarea
                    rows={3}
                    maxLength={3000}
                    value={draft.outcome}
                    placeholder="A task they can finish, or a decision they can make."
                    onChange={e => edit("outcome", e.target.value)}
                  />
                </label>
                <p className="first-release-note">
                  AI might help you build faster. Choosing a smaller useful
                  release can also reduce how much there is to build, review,
                  and test.
                </p>
                <button className="shipping-copy" onClick={() => go(2)}>
                  Find the smaller version <ArrowRight size={16} />
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <p className="first-release-help">
                  Try a way of narrowing the work, then decide what belongs now
                  and what can wait. You can change every choice.
                </p>
                <div
                  className="first-release-lenses"
                  role="group"
                  aria-label="Ways to make it smaller"
                >
                  {SLICE_LENSES.map(l => (
                    <button
                      key={l.id}
                      aria-pressed={draft.lens === l.id}
                      onClick={() => edit("lens", l.id)}
                    >
                      {l.title}
                    </button>
                  ))}
                </div>
                <div className="first-release-lens">
                  <strong>{lens.question}</strong>
                  <p>{lens.hint}</p>
                  <p className="first-release-lens-example">
                    Dashboard example: {lens.example}
                  </p>
                  <label className="first-release-field">
                    Our boundary <span>(optional)</span>
                    <textarea
                      rows={2}
                      maxLength={1000}
                      value={draft.boundaries[lens.id] ?? ""}
                      placeholder="What could this mean for your feature?"
                      onChange={e =>
                        edit("boundaries", {
                          ...draft.boundaries,
                          [lens.id]: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <p className="first-release-note">
                  Keep essential security, accessibility, reliability, and
                  testing in the first release. Move scope, not the checks that
                  make it safe and usable.
                </p>
                <div className="first-release-items">
                  {draft.items.map((item, index) => (
                    <fieldset className="first-release-item" key={item.id}>
                      <legend>Part {index + 1}</legend>
                      <label className="first-release-field">
                        <span className="sr-only">Scope item {index + 1}</span>
                        <textarea
                          aria-label={`Scope item ${index + 1}`}
                          rows={2}
                          maxLength={500}
                          value={item.text}
                          onChange={e =>
                            edit(
                              "items",
                              draft.items.map(i =>
                                i.id === item.id
                                  ? { ...i, text: e.target.value }
                                  : i
                              )
                            )
                          }
                        />
                      </label>
                      <div className="first-release-item-controls">
                        <label>
                          Where does it belong?
                          <select
                            aria-label={`Where scope item ${index + 1} belongs`}
                            value={item.choice}
                            onChange={e =>
                              moveItem(item.id, e.target.value as ScopeChoice)
                            }
                          >
                            <option value="first">First release</option>
                            <option value="later">Later</option>
                            <option value="check">Needs checking</option>
                          </select>
                        </label>
                        <button
                          className="shipping-text-button"
                          aria-label={`Remove scope item ${index + 1}`}
                          onClick={() => {
                            setRemoved({ item, index });
                            edit(
                              "items",
                              draft.items.filter(i => i.id !== item.id)
                            );
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </fieldset>
                  ))}
                </div>
                {!draft.items.length && (
                  <p className="first-release-empty">
                    List what’s being asked for below. Each item starts as
                    “Needs checking” until you choose where it belongs.
                  </p>
                )}
                <label className="first-release-field">
                  Add parts of the request <span>(one per line)</span>
                  <textarea
                    rows={2}
                    maxLength={15000}
                    value={pendingItems}
                    onChange={e => setPendingItems(e.target.value)}
                    placeholder="Custom charts&#10;Export the list&#10;Scheduled emails"
                  />
                </label>
                <div className="first-release-add">
                  <button
                    className="shipping-pill"
                    disabled={!pendingItems.trim()}
                    onClick={addItems}
                  >
                    <Plus size={15} /> Add to the scope
                  </button>
                  {removed && draft.items.length < 30 && (
                    <button
                      className="shipping-text-button"
                      onClick={() => {
                        const items = [...draft.items];
                        items.splice(removed.index, 0, removed.item);
                        edit("items", items);
                        setRemoved(null);
                      }}
                    >
                      Undo last removal
                    </button>
                  )}
                </div>
                <p className="first-release-message" role="status">
                  {addMessage}
                </p>
                <button className="shipping-copy" onClick={() => go(3)}>
                  Check this first release <ArrowRight size={16} />
                </button>
              </>
            )}
            {step === 3 && (
              <>
                <p className="first-release-help">
                  {audience === "pm"
                    ? "Check the user outcome together. Your developer can help spot dependencies that make the first release bigger than it looks."
                    : "Check the dependencies together. Your PM can help confirm the smaller release still solves a real problem."}
                </p>
                {RELEASE_CHECKS.map(c => (
                  <label className="first-release-check" key={c.id}>
                    {c.label}
                    <select
                      value={draft[c.id]}
                      onChange={e => edit(c.id, e.target.value as ReleaseCheck)}
                    >
                      <option value="unknown">Not checked yet</option>
                      <option value="yes">Yes</option>
                      <option value="no">No — needs reworking</option>
                    </select>
                  </label>
                ))}
                <label className="first-release-field">
                  What still needs an answer? <span>(optional)</span>
                  <textarea
                    rows={2}
                    maxLength={3000}
                    value={draft.unknowns}
                    placeholder="A dependency, a user need, or a check you haven’t worked through yet."
                    onChange={e => edit("unknowns", e.target.value)}
                  />
                </label>
                <label className="first-release-field">
                  How will you find out if it helps?
                  <textarea
                    rows={3}
                    maxLength={3000}
                    value={draft.feedback}
                    placeholder="Who could try it, and what do you need to learn from them?"
                    onChange={e => edit("feedback", e.target.value)}
                  />
                </label>
                <p className="first-release-note">
                  Bring the proposal to your PM or developer. Agree what belongs
                  in the first release, resolve the open questions, then
                  estimate the work.
                </p>
                <button className="shipping-text-button" onClick={() => go(2)}>
                  ← Adjust the scope
                </button>
              </>
            )}
          </div>
        </div>
        <aside
          className="first-release-preview"
          aria-label="First-release proposal"
          id="first-release-proposal"
        >
          <div className="first-release-preview-head">
            <p className="shipping-eyebrow">
              {mode === "example"
                ? "EXAMPLE / YOUR TAKEAWAY"
                : "YOUR FIRST-RELEASE PROPOSAL"}
            </p>
            <h2>A smaller thing worth shipping.</h2>
            <FieldToolLink
              className="first-release-mobile-jump"
              href="#first-release-choices"
            >
              Back to your choices ↑
            </FieldToolLink>
            <div className="shipping-share">
              <button className="shipping-copy" onClick={copy}>
                <Copy size={16} /> Copy proposal
              </button>
              <button className="shipping-text-button" onClick={download}>
                <Download size={16} /> Download
              </button>
            </div>
            <p className="first-release-message" role="status">
              {message}
            </p>
          </div>
          <div className="first-release-proposal-body">
            <h3>{draft.feature.trim() || "Your feature"}</h3>
            <p className="first-release-user">
              For {draft.user.trim() || "the first users you choose"}
            </p>
            <p className="first-release-outcome">
              {draft.outcome.trim() ||
                "Name the useful task. The proposal will take shape as you make choices."}
            </p>
            {(
              [
                ["first", "First release"],
                ["later", "Can wait"],
                ["check", "Needs checking"],
              ] as const
            ).map(([key, label]) => (
              <section
                className={`first-release-scope first-release-scope-${key}`}
                key={key}
                aria-label={label}
              >
                <h4>{label}</h4>
                {groups[key].length ? (
                  <ul>
                    {groups[key].map(item => (
                      <li key={item.id}>
                        {item.text.trim() || "Scope item to name"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    {key === "first"
                      ? "Choose the parts that deliver the useful task."
                      : key === "later"
                        ? "Nothing deferred yet."
                        : "No scope items marked for checking."}
                  </p>
                )}
              </section>
            ))}
            {SLICE_LENSES.some(l => draft.boundaries[l.id]?.trim()) && (
              <details className="first-release-details">
                <summary>Boundaries we propose</summary>
                <ul>
                  {SLICE_LENSES.filter(l => draft.boundaries[l.id]?.trim()).map(
                    l => (
                      <li key={l.id}>
                        <strong>{l.title}:</strong> {draft.boundaries[l.id]}
                      </li>
                    )
                  )}
                </ul>
              </details>
            )}
            <p className="first-release-note">
              {gaps.length
                ? "Keep this as a draft while you work through the release checks."
                : "A proposal to agree together. The tool hasn’t verified feasibility or estimated the work."}
            </p>
            {step === 3 && gaps.length > 0 && (
              <ul className="first-release-gaps">
                {gaps.map(g => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            )}
            <details className="first-release-details">
              <summary>Full proposal · review before sharing</summary>
              <pre>{summary}</pre>
            </details>
          </div>
        </aside>
      </div>
    </section>
  );
}
