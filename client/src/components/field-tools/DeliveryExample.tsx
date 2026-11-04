import { useState } from "react";
import {
  ArrowRight,
  Code2,
  Compass,
  PencilRuler,
  ScanSearch,
  Send,
  Users,
} from "lucide-react";
import "./delivery-example.css";

const stages = [
  { label: "Decide", icon: Compass },
  { label: "Shape", icon: PencilRuler },
  { label: "Build", icon: Code2 },
  { label: "Check", icon: ScanSearch },
  { label: "Release", icon: Send },
  { label: "In use", icon: Users },
];

const steps = [
  {
    label: "What happened",
    heading: "The code was ready Tuesday. The first review happened Friday.",
    body: "A renewal reminder sat waiting while the reviewer finished another feature. When the review started, the team disagreed about when the reminder should be sent. More changes followed.",
    note: "Faster coding could help with the build. It wouldn’t, by itself, resolve this wait or the disagreement.",
  },
  {
    label: "What to ask",
    heading: "What would have had to move for the review to happen sooner?",
    body: "Had anyone made room for the review, or was everyone already committed? And had we agreed when the reminder should be sent before building it?",
    note: "“Please review faster” has already been tried. Check what made that hard before asking again.",
  },
  {
    label: "What to try",
    heading: "Could we make room for the next small change?",
    body: "Bring this to the PM and reviewer: “For the next three small changes, can we agree the behaviour before coding and name a reviewer? What new work would we need to hold back to make time?”",
    note: "A proposal to discuss, not an agreed plan. Check the wait to first review, rework, and the reviewer’s workload before deciding whether to keep it.",
  },
];

// A public, fictional excerpt. This never reads or changes a buyer's Lab drafts.
export default function DeliveryExample() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return (
    <section
      id="delivery-example"
      className="ft-delivery-example"
      aria-labelledby="delivery-example-title"
    >
      <div className="ft-example-intro">
        <p className="ft-collection-eyebrow">A short example · fictional</p>
        <h2 id="delivery-example-title">
          “Can we just get reviews done faster?”
        </h2>
        <p>
          Follow one piece of work. Look at what happened, ask what kept it
          stuck, then prepare something you can discuss.
        </p>
      </div>
      <div className="ft-example-preview">
        <ol
          className="ft-example-stream"
          aria-label="Delivery stages; this example focuses on Check"
        >
          {stages.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className={label === "Check" ? "is-current" : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ol>
        <div
          className="ft-example-controls"
          role="group"
          aria-label="Explore the review-delay example"
        >
          {steps.map((item, index) => (
            <button
              type="button"
              key={item.label}
              aria-pressed={active === index}
              aria-controls="delivery-example-panel"
              onClick={() => setActive(index)}
            >
              <span aria-hidden="true">0{index + 1}</span> {item.label}
            </button>
          ))}
        </div>
        <div
          id="delivery-example-panel"
          className="ft-example-panel"
          aria-live="polite"
          aria-atomic="true"
        >
          <h3>{step.heading}</h3>
          <p>{step.body}</p>
          <p className="ft-example-note">{step.note}</p>
        </div>
        <div className="ft-example-bottom">
          <span>From the delivery map · included in either edition</span>
          {active < steps.length - 1 ? (
            <button type="button" onClick={() => setActive(active + 1)}>
              {steps[active + 1].label}{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          ) : (
            <button type="button" onClick={() => setActive(0)}>
              Back to the start
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
