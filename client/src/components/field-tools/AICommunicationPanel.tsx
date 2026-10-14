import { communicationDraft } from "@/lib/ai-communication";
import type { Audience } from "@/lib/field-tool-paths";
import "./ai-library.css";
export default function AICommunicationPanel({
  values,
  audience,
  phase,
  onChange,
}: {
  values: Record<string, string>;
  audience: Audience;
  phase: "conversation" | "decision";
  onChange: (id: string, value: string) => void;
}) {
  const leadershipKey =
    phase === "conversation"
      ? "conversationLeadershipUpdate"
      : "leadershipUpdate";
  const teamKey =
    phase === "conversation" ? "conversationTeamUpdate" : "teamUpdate";
  return (
    <details className="ai-workbench-panel">
      <summary className="cursor-pointer font-display text-2xl">
        Write an update for leadership or your team.
      </summary>
      <p className="mt-3 text-xs leading-6">
        Explain what has happened and what you need from the people reading your
        update. These drafts are included in the document you build from this
        step. Read and edit them before sharing.
      </p>
      {(
        [
          {
            key: leadershipKey,
            recipient: "leadership",
            label: "Update to leadership / sponsor",
          },
          { key: teamKey, recipient: "team", label: "Update to your team" },
        ] as const
      ).map(item => (
        <div key={item.key}>
          <label>
            {item.label}
            <textarea
              rows={7}
              value={values[item.key] ?? ""}
              onChange={e => onChange(item.key, e.target.value)}
              placeholder="Write your update, or use your answers above to make a starting draft."
            />
          </label>
          <button
            type="button"
            className="mt-2 text-xs underline"
            onClick={() => {
              if (
                values[item.key]?.trim() &&
                !window.confirm(
                  "Replace this update with a draft made from your answers in this step?"
                )
              )
                return;
              onChange(
                item.key,
                communicationDraft(values, audience, phase, item.recipient)
              );
            }}
          >
            Build a starting draft →
          </button>
        </div>
      ))}
      <p className="mt-4 text-xs leading-6">
        Explain what is happening, what you know, and what you need from the
        reader. Say who will do what next and when. Building a draft does not
        send it.
      </p>
    </details>
  );
}
