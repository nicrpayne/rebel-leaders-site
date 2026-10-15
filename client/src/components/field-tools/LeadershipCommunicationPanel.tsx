import { leadershipCommunicationDraft } from "@/lib/leadership-communication";
import "./ai-library.css";
export default function LeadershipCommunicationPanel({
  slug,
  values,
  onChange,
}: {
  slug: string;
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}) {
  return (
    <details className="ai-workbench-panel">
      <summary className="cursor-pointer font-display text-2xl">
        Write an update for the people involved.
      </summary>
      <p className="mt-3 text-sm leading-6">
        Use your answers to make a starting draft, then change it to sound like
        you. Keep a proposal clear until someone has agreed to it. These updates
        are included in your final document.
      </p>
      {(
        [
          {
            key: "leadershipUpdate",
            recipient: "leadership",
            label: "For the person you need an answer from",
          },
          {
            key: "teamUpdate",
            recipient: "team",
            label: "For the team doing the work",
          },
        ] as const
      ).map(item => (
        <div key={item.key}>
          <label>
            {item.label}
            <textarea
              rows={7}
              value={values[item.key] ?? ""}
              onChange={event => onChange(item.key, event.target.value)}
              placeholder="Write your update here, or build a starting draft below."
            />
          </label>
          <button
            type="button"
            className="mt-2 min-h-11 text-sm underline underline-offset-4"
            onClick={() => {
              if (
                values[item.key]?.trim() &&
                !window.confirm(
                  "Replace this update with a new draft made from your answers?"
                )
              )
                return;
              onChange(
                item.key,
                leadershipCommunicationDraft(slug, values, item.recipient)
              );
            }}
          >
            Build a starting draft →
          </button>
        </div>
      ))}
      <p className="mt-4 text-xs leading-6">
        Read the draft before sharing. If you change your earlier answers,
        rebuild or edit this update too. Building it does not send it.
      </p>
    </details>
  );
}
