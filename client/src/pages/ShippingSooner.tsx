import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Copy, Download } from "lucide-react";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import {
  DELIVERY_STAGES,
  deliveryDays,
  displayNumber,
  emptyShippingDraft,
  exampleShippingDraft,
  readShippingDraft,
  scenarioValue,
  shippingComparison,
  shippingSummary,
  unchangedScenario,
  type DeliveryStage,
} from "@/lib/shipping-sooner";
import "@/components/field-tools/shipping-sooner.css";

export default function ShippingSooner({ audience }: { audience: Audience }) {
  const storageKey = `rebel-shipping-sooner-v1-${audience}`;
  const [own, setOwn] = useState(() => {
    try {
      return readShippingDraft(localStorage.getItem(storageKey));
    } catch {
      return emptyShippingDraft();
    }
  });
  const [example, setExample] = useState(exampleShippingDraft);
  const [mode, setMode] = useState<"example" | "own">(() =>
    DELIVERY_STAGES.some(({ id }) => own.now[id] !== "") ? "own" : "example"
  );
  const [storageFailed, setStorageFailed] = useState(false);
  const [message, setMessage] = useState("");
  const draft = mode === "example" ? example : own;
  const setDraft = mode === "example" ? setExample : setOwn;
  const comparison = shippingComparison(draft);
  const summary = shippingSummary(draft, mode === "example");
  const base = fieldToolBase("ai-stalemate", audience);

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
  useEffect(() => {
    setMessage("");
  }, [draft, mode]);

  function updateTime(
    id: DeliveryStage,
    column: "now" | "scenario",
    value: string
  ) {
    setDraft(previous => ({
      ...previous,
      [column]: { ...previous[column], [id]: value },
    }));
  }
  function halveCoding() {
    const coding = deliveryDays(draft.now.coding);
    if (coding === null) return;
    setDraft(previous => ({
      ...previous,
      scenario: { ...unchangedScenario(), coding: String(coding / 2) },
    }));
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setMessage("Copied. Ready to paste into your conversation.");
    } catch {
      setMessage(
        "Copy wasn’t available. Download the comparison or select it in the preview below."
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "shipping-sooner-comparison.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Comparison downloaded.");
  }

  return (
    <main className="shipping-sooner">
      <FieldToolsNav />
      <div className="shipping-shell">
        <header className="shipping-heading">
          <div className="shipping-topline">
            <p className="shipping-eyebrow">
              AI STALEMATE / A SMALL TOOL TO TRY
            </p>
            <Link href="/field-tools/review">
              Review desk <ArrowRight size={14} />
            </Link>
          </div>
          <h1>
            Will this get us <em>shipping sooner?</em>
          </h1>
          <p>
            Faster coding changes part of the picture. See what it could change
            for the whole piece of work.
          </p>
        </header>

        <div
          className="shipping-mode"
          role="group"
          aria-label="Choose your numbers"
        >
          <button
            aria-pressed={mode === "example"}
            onClick={() => setMode("example")}
          >
            Try an example
          </button>
          <button aria-pressed={mode === "own"} onClick={() => setMode("own")}>
            Use my own numbers
          </button>
          <span>
            {mode === "example"
              ? "Invented numbers. Change them and see what happens."
              : "Your numbers stay in this browser. The example stays separate."}
          </span>
        </div>

        <div className="shipping-workspace">
          <section
            className="shipping-inputs"
            aria-labelledby="shipping-times-title"
          >
            <div className="shipping-section-heading">
              <span className="shipping-number">01</span>
              <h2 id="shipping-times-title">Where does the time go?</h2>
            </div>
            <p className="shipping-helper">
              Think of one recent change, from starting work to reaching users.
              Count elapsed <strong>working days</strong>, including waiting—not
              everyone’s hours added together.
            </p>
            <label className="shipping-name">
              Piece of work <span>(optional)</span>
              <input
                value={draft.name}
                maxLength={180}
                placeholder="e.g. The new request form"
                onChange={e =>
                  setDraft(previous => ({ ...previous, name: e.target.value }))
                }
              />
            </label>
            <table className="shipping-times">
              <caption className="sr-only">
                Current elapsed time and a possible scenario, in working days
              </caption>
              <thead>
                <tr>
                  <th scope="col">Part of the work</th>
                  <th scope="col">Now</th>
                  <th scope="col">Try this</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY_STAGES.map(stage => (
                  <tr key={stage.id}>
                    <th scope="row">
                      <span
                        className="shipping-dot"
                        style={{ background: stage.color }}
                        aria-hidden="true"
                      />
                      {stage.label}
                    </th>
                    {(["now", "scenario"] as const).map(column => {
                      const value =
                        column === "now"
                          ? draft.now[stage.id]
                          : scenarioValue(draft, stage.id);
                      const invalid =
                        value !== "" && deliveryDays(value) === null;
                      return (
                        <td key={column}>
                          <input
                            type="number"
                            min="0"
                            max="1000000"
                            step="any"
                            inputMode="decimal"
                            aria-label={`${stage.label} — ${column === "now" ? "now" : "scenario"} (working days)`}
                            aria-invalid={invalid || undefined}
                            aria-describedby="shipping-input-help"
                            value={value}
                            placeholder="—"
                            onChange={e =>
                              updateTime(stage.id, column, e.target.value)
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <p id="shipping-input-help" className="shipping-small">
              Decimals are fine. Use 0 for none; a blank means unknown. Count
              each stretch of elapsed time once. Put time waiting for a reviewer
              or release in the waiting row.
            </p>
            <div className="shipping-presets">
              <button
                className="shipping-pill"
                onClick={halveCoding}
                disabled={deliveryDays(draft.now.coding) === null}
              >
                Halve coding only
              </button>
              <button
                className="shipping-text-button"
                onClick={() =>
                  setDraft(previous => ({
                    ...previous,
                    scenario: unchangedScenario(),
                  }))
                }
              >
                Reset changes
              </button>
            </div>
            <p className="shipping-small">
              “Try this” follows “Now” until you edit it. Try less waiting, or
              more review and fixes. Reset changes makes the two columns match.
            </p>
          </section>

          <section
            className="shipping-results"
            aria-labelledby="shipping-result-title"
          >
            <div className="shipping-section-heading">
              <span className="shipping-number">02</span>
              <h2 id="shipping-result-title">What would that change?</h2>
            </div>
            {comparison ? (
              <>
                <div
                  className="shipping-outcome"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <p className="shipping-eyebrow">
                    {mode === "example"
                      ? "IN THIS EXAMPLE"
                      : "WITH THESE ASSUMPTIONS"}
                  </p>
                  <p className="shipping-total">
                    <span>{displayNumber(comparison.current)}</span>
                    <ArrowRight aria-label="to" />
                    <strong>{displayNumber(comparison.scenario)}</strong>
                    <small>working days</small>
                  </p>
                  <p className="shipping-difference">
                    {comparison.saved === 0 ? (
                      "No change in total elapsed time."
                    ) : (
                      <>
                        <strong>
                          {displayNumber(Math.abs(comparison.percent))}%{" "}
                          {comparison.saved > 0 ? "less" : "more"} elapsed time.
                        </strong>{" "}
                        {displayNumber(Math.abs(comparison.saved))}{" "}
                        {Math.abs(comparison.saved) === 1
                          ? "working day"
                          : "working days"}{" "}
                        {comparison.saved > 0 ? "saved" : "added"}.
                      </>
                    )}
                  </p>
                </div>
                <div
                  className="shipping-bars"
                  aria-label="Elapsed time comparison"
                >
                  {(["now", "scenario"] as const).map(column => (
                    <div className="shipping-bar-row" key={column}>
                      <p>
                        <span>
                          {column === "now" ? "Now" : "Your scenario"}
                        </span>
                        <span>
                          {displayNumber(
                            column === "now"
                              ? comparison.current
                              : comparison.scenario
                          )}{" "}
                          days
                        </span>
                      </p>
                      <div className="shipping-track" aria-hidden="true">
                        {comparison.rows.map(row => (
                          <span
                            key={row.id}
                            title={`${row.label}: ${displayNumber(row[column])} days`}
                            style={{
                              width: `${(row[column] / Math.max(comparison.current, comparison.scenario)) * 100}%`,
                              background: row.color,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <p className="shipping-small">
                    Same scale. Colors match the input rows.
                  </p>
                </div>
                <div className="shipping-insight">
                  <h3>The coding part of the picture.</h3>
                  <p>
                    Coding is{" "}
                    <strong>{displayNumber(comparison.codingShare)}%</strong> of
                    the current elapsed time. Halving it alone would take the
                    total to{" "}
                    <strong>
                      {displayNumber(comparison.codingOnlyTotal)} days
                    </strong>
                    —a{" "}
                    <strong>
                      {displayNumber(comparison.codingOnlyPercent)}%
                    </strong>{" "}
                    reduction, if everything else stayed the same.
                  </p>
                  <p>
                    Time outside coding isn’t automatically waste. Which part
                    could you actually change?
                  </p>
                </div>
                <div className="shipping-share">
                  <button className="shipping-copy" onClick={copy}>
                    <Copy size={16} /> Copy comparison
                  </button>
                  <button
                    className="shipping-text-button"
                    onClick={download}
                    aria-label="Download comparison as text"
                  >
                    <Download size={17} /> Download
                  </button>
                </div>
                <p role="status" className="shipping-small shipping-status">
                  {message}
                </p>
                <details className="shipping-export">
                  <summary>Preview what you’ll share</summary>
                  <pre>{summary}</pre>
                </details>
              </>
            ) : (
              <div className="shipping-empty" role="status">
                <h3>Start with the time you know.</h3>
                <p>
                  Fill in every row in both columns, using 0 when no time was
                  spent. “Now” needs a total greater than zero. Check any
                  highlighted numbers before comparing.
                </p>
                <p>
                  Missing time stays unknown. We won’t turn a blank into a
                  saving.
                </p>
              </div>
            )}
          </section>
        </div>

        <footer className="shipping-notes">
          {storageFailed && (
            <p role="alert">
              Your browser couldn’t save these numbers. Copy or download the
              comparison before leaving.
            </p>
          )}
          <details>
            <summary>What this comparison can—and can’t—tell you</summary>
            <p>
              This adds up non-overlapping time for one piece of work. If
              activities overlap, use the elapsed route that determines when the
              change reaches users; don’t add parallel tasks together. Keep the
              scope and quality the same.
            </p>
            <p>
              These are scenarios, not delivery promises or measured AI savings.
              Faster coding may change review and rework too. Adjust those rows
              when exploring that possibility. This doesn’t model queues, team
              capacity, or how many changes the team can ship.
            </p>
            <p>
              Unknown times need checking against actual work. There’s no
              automatic judgment about which stage should be faster.{" "}
              <a
                href="https://dora.dev/capabilities/work-visibility-in-value-stream/"
                target="_blank"
                rel="noreferrer"
              >
                DORA’s guide to seeing the whole delivery process ↗
              </a>
            </p>
          </details>
          <div className="shipping-bottom">
            <span>
              Your own numbers save on this browser only. Copy them to take them
              elsewhere.
            </span>
            <Link href={`${base}/guide`}>
              Back to the Field Guide <ArrowRight size={14} />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
