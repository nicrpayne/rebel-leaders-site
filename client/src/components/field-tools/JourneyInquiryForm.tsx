import type { JourneyFinding } from "@/lib/delivery-journey";
import { inquiryOptions, type JourneyInquiry } from "@/lib/journey-inquiry";

export default function JourneyInquiryForm({
  finding,
  onChange,
}: {
  finding: JourneyFinding;
  onChange: (change: (f: JourneyFinding) => JourneyFinding) => void;
}) {
  const q = finding.inquiry;
  const set = <K extends keyof JourneyInquiry>(
    key: K,
    value: JourneyInquiry[K]
  ) => onChange(f => ({ ...f, inquiry: { ...f.inquiry, [key]: value } }));
  return (
    <div className="journey-inquiry">
      <label>
        What happened the last time?{" "}
        <span className="journey-field-hint">
          One example is enough to start. What was waiting, and for what?
        </span>
        <textarea
          maxLength={3000}
          value={finding.observation}
          placeholder="e.g. Ready Tuesday. First review Friday. We don't yet know what filled the gap."
          onChange={e => onChange(f => ({ ...f, observation: e.target.value }))}
        />
      </label>
      <fieldset>
        <legend>What makes this hard to change?</legend>
        <p className="journey-quiet">
          Choose one possibility to look into. You can change it as you learn.
        </p>
        <div className="journey-inquiry-options">
          {[
            ...inquiryOptions(finding.caseId),
            { id: "other", label: "Something else is going on." },
            { id: "unsure", label: "I'm not sure yet." },
          ].map(option => (
            <label
              key={option.id}
              className={
                q.context === option.id ? "journey-option-selected" : ""
              }
            >
              <input
                type="radio"
                name={`context-${finding.caseId}`}
                checked={q.context === option.id}
                onChange={() => set("context", option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {q.context === "other" && (
        <label>
          What is happening instead?
          <textarea
            maxLength={3000}
            value={q.detail}
            onChange={e => set("detail", e.target.value)}
            placeholder="Use your own words. You don't have to fit one of our explanations."
          />
        </label>
      )}
      <label>
        Have you tried changing this already?
        <select
          value={q.tried}
          onChange={e =>
            set("tried", e.target.value as JourneyInquiry["tried"])
          }
        >
          <option value="unknown">I'm not sure / haven't checked</option>
          <option value="not-yet">Not yet</option>
          <option value="yes">Yes, we've tried something</option>
        </select>
      </label>
      {q.tried === "yes" && (
        <div className="journey-prior-attempt">
          <label>
            What did you try?
            <textarea
              maxLength={3000}
              value={q.attempt}
              onChange={e => set("attempt", e.target.value)}
              placeholder="e.g. We asked people to pick up reviews sooner."
            />
          </label>
          <label>
            What happened? What got in the way?
            <textarea
              maxLength={3000}
              value={q.obstacle}
              onChange={e => set("obstacle", e.target.value)}
              placeholder="e.g. Everyone still had the same delivery commitments. Or tell us what did improve."
            />
          </label>
          <p className="journey-quiet">
            That attempt is useful evidence. Check what would need to be
            different before repeating it.
          </p>
        </div>
      )}
      <label>
        Who can agree a change here?
        <select
          value={q.influence}
          onChange={e =>
            set("influence", e.target.value as JourneyInquiry["influence"])
          }
        >
          <option value="unknown">We need to find out</option>
          <option value="team">Our team can agree it</option>
          <option value="shared">We need someone else to agree too</option>
          <option value="outside">The decision sits outside our team</option>
        </select>
      </label>
      <details>
        <summary>
          Whose view are we missing?{" "}
          <span>
            Optional · another person may see a different part of the problem
          </span>
        </summary>
        <label>
          Who could help us check this explanation?
          <textarea
            maxLength={3000}
            value={q.otherView}
            onChange={e => set("otherView", e.target.value)}
            placeholder="e.g. Ask the reviewer what they were waiting for."
          />
        </label>
        {q.context !== "other" && (
          <label>
            Anything else about your situation?
            <textarea
              maxLength={3000}
              value={q.detail}
              onChange={e => set("detail", e.target.value)}
            />
          </label>
        )}
        <label>
          How sure are you about this explanation?
          <select
            value={finding.evidence}
            onChange={e =>
              onChange(f => ({
                ...f,
                evidence: e.target.value as JourneyFinding["evidence"],
              }))
            }
          >
            <option value="hunch">A hunch to check</option>
            <option value="checked">Checked against a real example</option>
          </select>
        </label>
        <p className="journey-quiet">
          Your assessment. One example may not explain what usually happens.
        </p>
      </details>
    </div>
  );
}
