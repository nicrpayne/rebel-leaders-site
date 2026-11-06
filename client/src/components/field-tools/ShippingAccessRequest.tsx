import FieldToolLink from "@/components/field-tools/FieldToolLink";
import { useEffect, useState } from "react";
import { Copy, Download, Plus, ArrowRight } from "lucide-react";
import type { Audience } from "@/lib/field-tool-paths";
import {
  ACCESS_ACTIONS,
  AI_USE_LABELS,
  accessRequest,
  emptyAccessGroup,
  type AccessDraft,
  type AccessGroup,
} from "@/lib/shipping-access";

type Props = {
  draft: AccessDraft;
  onChange: (draft: AccessDraft) => void;
  example: boolean;
  audience: Audience;
  onOtherWork: () => void;
};
export default function ShippingAccessRequest({
  draft,
  onChange,
  example,
  audience,
  onOtherWork,
}: Props) {
  const [message, setMessage] = useState("");
  const [removed, setRemoved] = useState<{
    group: AccessGroup;
    index: number;
  } | null>(null);
  const request = accessRequest(draft, example);
  useEffect(() => {
    setMessage("");
  }, [request]);
  function edit<K extends keyof AccessDraft>(key: K, value: AccessDraft[K]) {
    onChange({ ...draft, [key]: value });
  }
  function groupEdit(index: number, changes: Partial<AccessGroup>) {
    edit(
      "groups",
      draft.groups.map((g, i) => (i === index ? { ...g, ...changes } : g))
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(request);
      setMessage(
        "Request copied. Review it, then paste it into your ticket or message."
      );
    } catch {
      setMessage(
        "Copy wasn’t available. Download the request or select the text under Full request."
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([request], { type: "text/plain;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-app-access-request.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Request downloaded.");
  }
  const input = (
    key: "name" | "recipient" | "neededBy",
    label: string,
    placeholder: string
  ) => (
    <label className="shipping-name">
      {label}
      <input
        maxLength={key === "name" ? 180 : 3000}
        value={draft[key]}
        placeholder={placeholder}
        onChange={e => edit(key, e.target.value)}
      />
    </label>
  );
  const area = (
    key: "purpose" | "data" | "pathNotes" | "aiService",
    label: string,
    placeholder: string,
    rows = 2
  ) => (
    <label className="shipping-plan-field">
      {label}
      <textarea
        rows={rows}
        maxLength={3000}
        value={draft[key]}
        placeholder={placeholder}
        onChange={e => edit(key, e.target.value)}
      />
    </label>
  );
  return (
    <section aria-labelledby="access-request-title" className="shipping-access">
      <div className="shipping-access-intro">
        <h2 id="access-request-title">From app idea to access request.</h2>
        <p>
          {audience === "pm"
            ? "Bring the users and the first useful outcome. Your lead and system owner can help fill the technical gaps."
            : "Bring what you know about the build. Your PM can help pin down the users and the first useful outcome."}{" "}
          Unknowns become questions in the draft.
        </p>
      </div>
      <div className="shipping-access-grid">
        <div className="shipping-access-fields" id="access-request-details">
          <section
            className="shipping-access-card"
            aria-labelledby="access-idea-title"
          >
            <div className="shipping-section-heading">
              <span className="shipping-number">01</span>
              <h3 id="access-idea-title">What are we trying to build?</h3>
            </div>
            {input("name", "App or change", "e.g. Pilot request tracker")}
            {area(
              "purpose",
              "What should it help people do?",
              "One useful task, and what would improve for the people doing it."
            )}
            <label className="shipping-plan-field">
              Where does AI come in?
              <select
                aria-label="Where does AI come in?"
                value={draft.aiUse}
                onChange={e =>
                  edit("aiUse", e.target.value as AccessDraft["aiUse"])
                }
              >
                {Object.entries(AI_USE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {(draft.aiUse === "feature" || draft.aiUse === "both") &&
              area(
                "aiService",
                "Which AI service would receive what data?",
                "If known: service, what it receives, and what it keeps. Leave unknowns open."
              )}
          </section>
          <section
            className="shipping-access-card"
            aria-labelledby="access-people-title"
          >
            <div className="shipping-section-heading">
              <span className="shipping-number">02</span>
              <h3 id="access-people-title">Who needs to do what?</h3>
            </div>
            <p className="shipping-helper">
              Describe groups and record boundaries. Choose only the actions
              each group needs. These are proposed permissions for review.
            </p>
            {area(
              "data",
              "What data would the app use?",
              "Describe the source and type of data, including anything sensitive. Leave the actual records out.",
              3
            )}
            {draft.groups.map((group, index) => (
              <fieldset className="shipping-access-group" key={index}>
                <legend>Group {index + 1}</legend>
                <label className="shipping-name">
                  People in this group
                  <input
                    aria-label={`Group ${index + 1} — people`}
                    maxLength={180}
                    value={group.name}
                    placeholder="e.g. Pilot coordinators"
                    onChange={e => groupEdit(index, { name: e.target.value })}
                  />
                </label>
                <label className="shipping-name">
                  Which records can they access?
                  <input
                    aria-label={`Group ${index + 1} — records`}
                    maxLength={1000}
                    value={group.scope}
                    placeholder="e.g. Requests assigned to their team"
                    onChange={e => groupEdit(index, { scope: e.target.value })}
                  />
                </label>
                <div
                  className="shipping-access-permissions"
                  role="group"
                  aria-label={`Group ${index + 1} — proposed actions`}
                >
                  {ACCESS_ACTIONS.map(action => (
                    <label key={action}>
                      <input
                        type="checkbox"
                        checked={group.actions.includes(action)}
                        onChange={e =>
                          groupEdit(index, {
                            actions: e.target.checked
                              ? [...group.actions, action]
                              : group.actions.filter(a => a !== action),
                          })
                        }
                      />
                      {action}
                    </label>
                  ))}
                </div>
                {!group.actions.length && (
                  <p className="shipping-small">
                    No actions chosen yet. The request will ask what this group
                    needs.
                  </p>
                )}
                {draft.groups.length > 1 && (
                  <button
                    className="shipping-text-button"
                    onClick={() => {
                      setRemoved({ group, index });
                      edit(
                        "groups",
                        draft.groups.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    Remove group {index + 1}
                  </button>
                )}
              </fieldset>
            ))}
            <div className="shipping-access-group-actions">
              <button
                className="shipping-text-button"
                disabled={draft.groups.length >= 8}
                onClick={() =>
                  edit("groups", [...draft.groups, emptyAccessGroup()])
                }
              >
                <Plus size={16} />
                Add a group
              </button>
              {removed && draft.groups.length < 8 && (
                <button
                  className="shipping-text-button"
                  onClick={() => {
                    const groups = [...draft.groups];
                    groups.splice(removed.index, 0, removed.group);
                    edit("groups", groups);
                    setRemoved(null);
                  }}
                >
                  Undo last removal
                </button>
              )}
            </div>
          </section>
          <section
            className="shipping-access-card"
            aria-labelledby="access-gap-title"
          >
            <div className="shipping-section-heading">
              <span className="shipping-number">03</span>
              <h3 id="access-gap-title">What needs sorting out?</h3>
            </div>
            <label className="shipping-plan-field">
              Is an access setup already in place?
              <select
                aria-label="Is an access setup already in place?"
                value={draft.path}
                onChange={e =>
                  edit("path", e.target.value as AccessDraft["path"])
                }
              >
                <option value="unknown">I don’t know yet</option>
                <option value="existing">
                  There’s an existing setup to check
                </option>
                <option value="missing">
                  This app’s setup still needs building
                </option>
              </select>
            </label>
            {area(
              "pathNotes",
              "What do you know so far?",
              "e.g. Company sign-in exists, but this app has no user groups or data connection yet."
            )}
            <details className="shipping-access-routing">
              <summary>
                Who should receive it, and when? <span>Optional</span>
              </summary>
              {input(
                "recipient",
                "Person or team to ask",
                "e.g. Identity / platform owner"
              )}
              {input(
                "neededBy",
                "When would an answer help?",
                "e.g. Before we commit to the pilot date"
              )}
            </details>
          </section>
        </div>
        <aside
          className="shipping-access-output"
          aria-label="Access request draft"
        >
          <div className="shipping-access-output-heading">
            <p className="shipping-eyebrow">
              {example
                ? "EXAMPLE · HERE’S WHAT YOU LEAVE WITH"
                : "YOUR REQUEST · UPDATES AS YOU GO"}
            </p>
            <h3>A request someone can act on.</h3>
            <FieldToolLink
              href="#access-request-details"
              className="shipping-access-edit-link"
            >
              Edit the details below ↓
            </FieldToolLink>
            <p>
              Copy it into your ticket or message. The open questions travel
              with it.
            </p>
          </div>
          <div className="shipping-access-export">
            <div className="shipping-share">
              <button className="shipping-copy" onClick={copy}>
                <Copy size={16} />
                Copy request
              </button>
              <button className="shipping-text-button" onClick={download}>
                <Download size={16} />
                Download
              </button>
            </div>
            <p role="status" className="shipping-small shipping-status">
              {message}
            </p>
            <p className="shipping-small">
              {example
                ? "Invented details for a walkthrough. Use “Use my own work” for your real request."
                : "This saves in this browser. Nothing is sent to an owner until you share it."}
            </p>
          </div>
          <div className="shipping-access-letter">
            <p className="shipping-access-to">
              TO {draft.recipient.trim() || "SYSTEM / IDENTITY OWNER"}
            </p>
            <h4>Access setup for {draft.name.trim() || "your app"}</h4>
            <p>
              {draft.purpose.trim() ||
                "Add what the app needs to help people do. You can leave technical details for the owner to answer."}
            </p>
            <p className="shipping-access-ai">{AI_USE_LABELS[draft.aiUse]}</p>
            <p className="shipping-access-label">PROPOSED ACCESS</p>
            <ul>
              {draft.groups.map((g, i) => (
                <li key={i}>
                  <strong>
                    {g.name.trim() || `Group ${i + 1} to confirm`}
                  </strong>
                  <span>
                    {g.actions.length
                      ? g.actions.join(" · ")
                      : "Actions to confirm"}
                  </span>
                  <span>{g.scope.trim() || "Record boundary to confirm"}</span>
                </li>
              ))}
            </ul>
            <p className="shipping-access-label">THE NEXT ANSWER WE NEED</p>
            <p>
              {draft.path === "missing"
                ? "Who can own the missing access setup, and what will it take?"
                : draft.path === "existing"
                  ? "Does the existing setup support these people, records, and actions?"
                  : "Is there an approved setup we can reuse, and who owns it?"}
            </p>
            <details className="shipping-export">
              <summary>Full request · review before sharing</summary>
              <pre>{request}</pre>
            </details>
          </div>
        </aside>
      </div>
      <div className="shipping-access-next">
        <div>
          <h3>Use the answer to choose the next move.</h3>
          <p>
            An existing route might make a small pilot possible. Missing setup
            gives you work to name and plan with its owner. Bring that answer
            back to your PM or lead before setting a delivery expectation.
          </p>
        </div>
        <button className="shipping-text-button" onClick={onOtherWork}>
          Look at another part of the work <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
