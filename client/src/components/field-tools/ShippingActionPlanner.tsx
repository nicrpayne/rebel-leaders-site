import { useEffect, useRef, useState } from "react";
import { ArrowRight, Copy, Download } from "lucide-react";
import type { Audience } from "@/lib/field-tool-paths";
import { DELIVERY_STAGES } from "@/lib/shipping-sooner";
import {
  SHIPPING_CAUSES,
  actionSummary,
  causeById,
  planMissing,
  selectShippingMove,
  suggestedMoves,
  type ActionPlan,
  type ShippingAction,
} from "@/lib/shipping-actions";

type Props = {
  name: string;
  onNameChange: (name: string) => void;
  action: ShippingAction;
  onChange: (action: ShippingAction) => void;
  audience: Audience;
  example: boolean;
};

export default function ShippingActionPlanner({
  name,
  onNameChange,
  action,
  onChange,
  audience,
  example,
}: Props) {
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState<string>(
    causeById(action.cause)?.stage ?? ""
  );
  const [message, setMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const cause = causeById(action.cause);
  const plan = action.plans[action.move];
  const summary = actionSummary(name, action, example);
  const missing = plan ? planMissing(name, plan) : [];
  useEffect(() => {
    setMessage("");
  }, [summary]);
  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus();
    });
  }
  function choose(id: string) {
    onChange(selectShippingMove(action, id));
    go(3);
  }
  function edit(key: keyof ActionPlan, value: string) {
    onChange({
      ...action,
      plans: { ...action.plans, [action.move]: { ...plan, [key]: value } },
    });
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setMessage("Copied. Ready to share with your team.");
    } catch {
      setMessage(
        "Copy wasn’t available. Download the plan or select the text in the preview below."
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "shipping-sooner-one-change.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Plan downloaded.");
  }
  const field = (
    key: Exclude<keyof ActionPlan, "next">,
    label: string,
    placeholder?: string
  ) => (
    <label className="shipping-plan-field">
      {label}
      <textarea
        rows={key === "change" || key === "result" ? 3 : 2}
        maxLength={3000}
        value={plan[key]}
        placeholder={placeholder}
        onChange={e => edit(key, e.target.value)}
      />
    </label>
  );
  return (
    <section className="shipping-planner" aria-label="Choose one change to try">
      <nav className="shipping-steps" aria-label="Plan steps">
        {["Spot the friction", "Choose a change", "Make it yours"].map(
          (label, i) => (
            <button
              key={label}
              aria-current={step === i + 1 ? "step" : undefined}
              disabled={(i === 1 && !cause) || (i === 2 && !plan)}
              onClick={() => go(i + 1)}
            >
              <span>0{i + 1}</span>
              {label}
            </button>
          )
        )}
      </nav>
      <div className="shipping-planner-body">
        <div className="shipping-section-heading">
          <h2 ref={heading} tabIndex={-1}>
            {step === 1
              ? "What got in the way?"
              : step === 2
                ? "Pick one thing to try."
                : "A small plan you can use."}
          </h2>
        </div>
        {step === 1 && (
          <>
            <p className="shipping-helper">
              Think of one recent piece of work. Where did it get harder or
              slower than it needed to? You don’t need exact timings.
            </p>
            <label className="shipping-name">
              Piece of work <span>(you can name it later)</span>
              <input
                value={name}
                maxLength={180}
                placeholder="e.g. The new request form"
                onChange={e => onNameChange(e.target.value)}
              />
            </label>
            <fieldset className="shipping-stage-picker">
              <legend>Which part would you like to look at?</legend>
              <div>
                {[
                  ...DELIVERY_STAGES,
                  { id: "unknown", label: "Not sure / something else" },
                ].map(item => (
                  <button
                    key={item.id}
                    aria-pressed={stage === item.id}
                    onClick={() => {
                      if (stage === item.id) return;
                      setStage(item.id);
                      onChange({
                        ...action,
                        cause: item.id === "unknown" ? "unknown" : "",
                        move: "",
                      });
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            {stage && (
              <fieldset className="shipping-cause-picker">
                <legend>What sounds closest to what happened?</legend>
                {SHIPPING_CAUSES.filter(item => item.stage === stage).map(
                  item => (
                    <label key={item.id}>
                      <input
                        type="radio"
                        name="shipping-cause"
                        value={item.id}
                        checked={action.cause === item.id}
                        onChange={() =>
                          onChange({ ...action, cause: item.id, move: "" })
                        }
                      />
                      <span>{item.label}</span>
                    </label>
                  )
                )}
                {stage !== "unknown" && (
                  <button
                    className="shipping-text-button"
                    onClick={() => {
                      setStage("unknown");
                      onChange({ ...action, cause: "unknown", move: "" });
                    }}
                  >
                    Something else, or I’m not sure
                  </button>
                )}
              </fieldset>
            )}
            {cause && (
              <label className="shipping-plan-field">
                What happened on this piece of work? <span>(optional)</span>
                <textarea
                  rows={2}
                  maxLength={3000}
                  value={action.observation}
                  placeholder="e.g. The review was ready, but nobody knew who could pick it up."
                  onChange={e =>
                    onChange({ ...action, observation: e.target.value })
                  }
                />
              </label>
            )}
            <button
              className="shipping-copy"
              disabled={!cause}
              onClick={() => go(2)}
            >
              See things we could try <ArrowRight size={16} />
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <p className="shipping-helper">
              You chose: <strong>{cause?.label}</strong>. These are two starting
              points. Pick what fits, adapt it, or use your own idea.
            </p>
            <div className="shipping-moves">
              {suggestedMoves(action.cause).map(move => (
                <article className="shipping-move" key={move.id}>
                  <h3>{move.title}</h3>
                  <p>{move.why}</p>
                  <ol>
                    {move.steps.map(text => (
                      <li key={text}>{text}</li>
                    ))}
                  </ol>
                  <div className="shipping-role">
                    <strong>
                      {audience === "pm"
                        ? "Your part as PM"
                        : "Your part as lead developer"}
                    </strong>
                    <p>{audience === "pm" ? move.pm : move.lead}</p>
                  </div>
                  <details>
                    <summary>What to watch for</summary>
                    <p>{move.protect}</p>
                  </details>
                  <button
                    className="shipping-copy"
                    onClick={() => choose(move.id)}
                  >
                    Try this change <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>
            <button
              className="shipping-text-button"
              onClick={() => choose("custom")}
            >
              Use my own idea
            </button>
          </>
        )}
        {step === 3 && plan && (
          <>
            <p className="shipping-helper">
              Make this fit the actual work. Then agree it with the people
              involved. Start with one small trial.
            </p>
            <div className="shipping-plan-grid">
              <div>
                <label className="shipping-name">
                  Piece of work
                  <input
                    value={name}
                    maxLength={180}
                    onChange={e => onNameChange(e.target.value)}
                    placeholder="Which change will you try this on?"
                  />
                </label>
                {field("change", "What will we try?")}
                <div className="shipping-plan-pair">
                  {field(
                    "owner",
                    "Who needs to be involved?",
                    "Name an owner and who they need"
                  )}
                  {field(
                    "checkWhen",
                    "When will we check back?",
                    "A date or after the next two changes"
                  )}
                </div>
                <details
                  className="shipping-plan-refine"
                  open={action.move === "custom" ? true : undefined}
                >
                  <summary>
                    Scope and checks{" "}
                    <span>Adapt the suggested starting points</span>
                  </summary>
                  {field("scope", "Keep the trial small")}
                  {field("measure", "How will we tell whether it helped?")}
                  {field("protect", "What do we need to protect?")}
                </details>
              </div>
              <aside className="shipping-plan-share">
                <p className="shipping-eyebrow">
                  {example ? "EXAMPLE PLAN" : "YOUR PROPOSAL"}
                </p>
                <h3>
                  {missing.length
                    ? "Still a draft. That’s fine."
                    : "Ready to discuss."}
                </h3>
                <p>
                  {missing.length
                    ? `Still to agree: ${missing.join(", ")}. You can share it now and fill those gaps together.`
                    : "Check the owner, capacity, and timing with your team before treating this as a commitment."}
                </p>
                <p className="shipping-small">
                  The plan includes your scope, checks, and what to protect. No
                  time estimate is required.
                </p>
                <div className="shipping-share">
                  <button className="shipping-copy" onClick={copy}>
                    <Copy size={16} />
                    Copy plan
                  </button>
                  <button className="shipping-text-button" onClick={download}>
                    <Download size={16} />
                    Download plan
                  </button>
                </div>
                <p role="status" className="shipping-small shipping-status">
                  {message}
                </p>
                <details className="shipping-export">
                  <summary>Preview what you’ll share</summary>
                  <pre>{summary}</pre>
                </details>
              </aside>
            </div>
            <details className="shipping-followup">
              <summary>
                After you’ve tried it{" "}
                <span>Optional · come back to record what happened</span>
              </summary>
              <p>
                Did work reach users sooner? What happened to review, rework,
                and the load on people? Keep what you don’t know visible.
              </p>
              {field(
                "result",
                "What happened?",
                "Include what helped, what got harder, and what you would change."
              )}
              <label className="shipping-plan-field">
                What next?
                <select
                  aria-label="What next?"
                  value={plan.next}
                  onChange={e => edit("next", e.target.value)}
                >
                  <option value="undecided">Not decided yet</option>
                  <option value="keep">Keep trying it</option>
                  <option value="adapt">Change the approach</option>
                  <option value="stop">Stop this trial</option>
                </select>
              </label>
            </details>
            <button className="shipping-text-button" onClick={() => go(2)}>
              Look at the other options
            </button>
          </>
        )}
      </div>
      <div className="shipping-planner-foot">
        One change. One trial. Check what it does for the work and the people
        doing it.
      </div>
    </section>
  );
}
