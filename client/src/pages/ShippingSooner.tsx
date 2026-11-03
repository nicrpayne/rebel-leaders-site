import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Copy, Download } from "lucide-react";
import FirstRelease from "@/components/field-tools/FirstRelease";
import DeliveryJourney from "@/components/field-tools/DeliveryJourney";
import ShippingAccessRequest from "@/components/field-tools/ShippingAccessRequest";
import { hasAccessWork } from "@/lib/shipping-access";
import ShippingActionPlanner from "@/components/field-tools/ShippingActionPlanner";
import { ACTION_SOURCES } from "@/lib/shipping-actions";
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
    hasAccessWork(own.access) ||
    own.name.trim() ||
    own.action.cause ||
    DELIVERY_STAGES.some(({ id }) => own.now[id] !== "")
      ? "own"
      : "example"
  );
  const [workspace, setWorkspace] = useState<
    "journey" | "slice" | "access" | "workflow"
  >("journey");
  const pageHeading = useRef<HTMLHeadingElement>(null);
  function openWorkspace(next: typeof workspace) {
    setWorkspace(next);
    requestAnimationFrame(() => pageHeading.current?.focus());
  }
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
        JSON.stringify({ version: 3, draft: own })
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
            <p className="shipping-eyebrow">AI STALEMATE / SHIPPING SOONER</p>
            <Link href="/field-tools/review">
              Review desk <ArrowRight size={14} />
            </Link>
          </div>
          <h1 ref={pageHeading} tabIndex={-1}>
            {workspace === "journey" ? (
              <>
                Code is moving faster.
                <br />
                <em>What’s still holding up delivery?</em>
              </>
            ) : workspace === "slice" ? (
              <>
                What’s the smallest useful thing <em>we could ship?</em>
              </>
            ) : workspace === "access" ? (
              <>
                Make the access question <em>clear enough to answer.</em>
              </>
            ) : (
              <>
                See the whole piece <em>of work.</em>
              </>
            )}
          </h1>
          <p>
            {workspace === "journey"
              ? `If AI helps you build faster, what else could help the work reach people sooner? Follow one recent feature with your ${audience === "pm" ? "developer" : "PM"}. Find a place it stalled, then choose something useful to try together.`
              : "Use this tool to work on a specific part of the journey. Your delivery map and other drafts stay available."}
          </p>
        </header>

        {workspace !== "journey" && (
          <button
            className="shipping-text-button journey-back"
            onClick={() => openWorkspace("journey")}
          >
            ← Back to my delivery map
          </button>
        )}
        {(workspace === "workflow" || workspace === "access") && (
          <div
            className="shipping-mode"
            role="group"
            aria-label="Choose your work"
          >
            <button
              aria-pressed={mode === "example"}
              onClick={() => setMode("example")}
            >
              Try an example
            </button>
            <button
              aria-pressed={mode === "own"}
              onClick={() => setMode("own")}
            >
              Use my own work
            </button>
            <span>
              {mode === "example"
                ? "An invented situation. Explore the options and make it your own."
                : "Your work saves in this browser. The example stays separate."}
            </span>
          </div>
        )}

        <div hidden={workspace !== "journey"}>
          <DeliveryJourney
            key={audience}
            audience={audience}
            onTool={openWorkspace}
          />
        </div>
        <div hidden={workspace !== "slice"}>
          <FirstRelease key={audience} audience={audience} />
        </div>
        {workspace === "slice" || workspace === "journey" ? null : workspace ===
          "access" ? (
          <ShippingAccessRequest
            key={mode}
            draft={draft.access}
            example={mode === "example"}
            audience={audience}
            onChange={access => setDraft(previous => ({ ...previous, access }))}
            onOtherWork={() => openWorkspace("workflow")}
          />
        ) : (
          <>
            <div className="shipping-workflow-intro">
              <h2>Where would faster coding actually help?</h2>
              <p>
                Take one recent change. Look at what happened around the code,
                choose a small change to try, or use the time comparison below
                to explore an AI saving.
              </p>
            </div>
            <ShippingActionPlanner
              key={mode}
              name={draft.name}
              onAccessRequest={() => openWorkspace("access")}
              onFirstRelease={() => openWorkspace("slice")}
              action={draft.action}
              audience={audience}
              example={mode === "example"}
              onNameChange={name =>
                setDraft(previous => ({ ...previous, name }))
              }
              onChange={action =>
                setDraft(previous => ({ ...previous, action }))
              }
            />
            <details className="shipping-calculator">
              <summary>
                Compare possible time savings{" "}
                <span>Optional · explore the whole piece of work</span>
              </summary>
              <p className="shipping-helper">
                Have rough timings? Explore what a change might do to the total.
                These numbers stay separate from your plan; choosing a
                suggestion won’t invent a saving.
              </p>
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
                    Think of one recent change, from starting work to reaching
                    users. Count elapsed <strong>working days</strong>,
                    including waiting—not everyone’s hours added together.
                  </p>
                  <table className="shipping-times">
                    <caption className="sr-only">
                      Current elapsed time and a possible scenario, in working
                      days
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
                    Decimals are fine. Use 0 for none; a blank means unknown.
                    Count each stretch of elapsed time once. Put time waiting
                    for a reviewer or release in the waiting row.
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
                    “Try this” follows “Now” until you edit it. Try less
                    waiting, or more review and fixes. Reset changes makes the
                    two columns match.
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
                                {comparison.saved > 0 ? "less" : "more"} elapsed
                                time.
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
                          <strong>
                            {displayNumber(comparison.codingShare)}%
                          </strong>{" "}
                          of the current elapsed time. Halving it alone would
                          take the total to{" "}
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
                          Time outside coding isn’t automatically waste. Which
                          part could you actually change?
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
                      <p
                        role="status"
                        className="shipping-small shipping-status"
                      >
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
                        Fill in every row in both columns, using 0 when no time
                        was spent. “Now” needs a total greater than zero. Check
                        any highlighted numbers before comparing.
                      </p>
                      <p>
                        Missing time stays unknown. We won’t turn a blank into a
                        saving.
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </details>
          </>
        )}
        <details className="shipping-other-tools">
          <summary>Open a specific tool</summary>
          <p>
            Work on a smaller release, prepare an experiment, compare timings,
            or clarify an access dependency. Each tool keeps its own drafts.
          </p>
          <div className="shipping-companion-links">
            <button
              className="shipping-text-button"
              onClick={() => openWorkspace("slice")}
            >
              Shape a smaller first release <ArrowRight size={14} />
            </button>
            <button
              className="shipping-text-button"
              onClick={() => openWorkspace("workflow")}
            >
              Open the earlier experiment planner and time comparison{" "}
              <ArrowRight size={14} />
            </button>
            <button
              className="shipping-text-button"
              onClick={() => openWorkspace("access")}
            >
              Open the access-request builder <ArrowRight size={14} />
            </button>
          </div>
        </details>
        <div className="shipping-product-connection">
          <p>
            <strong>Need to work through the AI conversation first?</strong> The
            Guide helps you understand each other’s position. The Lab helps you
            put your own conversation notes together. This companion helps you
            find what else holds up delivery and prepare a change to try
            together.
          </p>
          <div>
            <Link href={`${base}/guide`}>
              Read the Guide <ArrowRight size={14} />
            </Link>
            <Link href={`${base}/lab`}>
              Open the conversation Lab <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <footer className="shipping-notes">
          {storageFailed && (
            <p role="alert">
              Your browser couldn’t save your work. Copy or download your
              request, plan, and any comparison before leaving.
            </p>
          )}
          {workspace === "workflow" && (
            <details>
              <summary>What this comparison can—and can’t—tell you</summary>
              <p>
                This adds up non-overlapping time for one piece of work. If
                activities overlap, use the elapsed route that determines when
                the change reaches users; don’t add parallel tasks together.
                Keep the scope and quality the same.
              </p>
              <p>
                These are scenarios, not delivery promises or measured AI
                savings. Faster coding may change review and rework too. Adjust
                those rows when exploring that possibility. This doesn’t model
                queues, team capacity, or how many changes the team can ship.
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
          )}
          <details className="shipping-research">
            <summary>What informs the suggestions?</summary>
            <p>
              The journey draws on DORA’s guidance on seeing the whole flow of
              work, including waiting, handoffs, and rework. The situations and
              small bets are our practical prompts, not a validated diagnostic
              or a score. Your selections identify possibilities to check.
            </p>
            <p>
              Atlassian’s 2026 report describes people’s reported experience,
              including finding information, context switching, and reviewing AI
              output. It is not a measurement of delivery times or proof that a
              particular change will help your team. DORA’s guidance informs the
              smaller batches, feedback, and workflow experiments.
            </p>
            {workspace === "access" && (
              <p>
                The access request asks about people, data boundaries, and the
                actions they need, following Microsoft’s guidance on{" "}
                <a
                  href="https://learn.microsoft.com/en-us/entra/identity-platform/secure-least-privileged-access"
                  target="_blank"
                  rel="noreferrer"
                >
                  least-privileged access ↗
                </a>
                . It prepares questions for your system owner; it does not
                approve or configure access.
              </p>
            )}
            <ul>
              {Object.values(ACTION_SOURCES).map(source => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <div className="shipping-bottom">
            <span>
              Your own proposals, plans, and numbers save on this browser only.
              Download them to take them elsewhere. Your existing Lab is still
              available.
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
