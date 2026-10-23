import devTeaching from "../../../../shared/ai-dev-teachings.json";
import teaching from "../../../../shared/field-tool-teachings.json";

export type Teaching = (typeof teaching.notes)[number];
export const teachingSources = teaching.sources as Record<
  string,
  {
    title: string;
    author: string;
    url: string;
    kind: string;
    summary: string;
    date?: string;
  }
>;
const notesFor = (slug: string, audience?: string): Teaching[] =>
  slug === "ai-stalemate" && audience === "lead-dev"
    ? (devTeaching as Teaching[])
    : teaching.notes;
export function teachingFor(slug: string, chapter: number, audience?: string) {
  return notesFor(slug, audience).find(
    note => note.slug === slug && note.chapter === chapter
  );
}

export function TeachingNoteBody({ note }: { note: Teaching }) {
  return (
    <>
      <h3 className="font-display text-2xl leading-tight text-[var(--ft-ink)]">
        {note.title}
      </h3>
      {note.quote && (
        <blockquote className="mt-4 border-l-2 border-[var(--ft-accent)] pl-4 font-display text-xl leading-7 text-[var(--ft-ink)]">
          “{note.quote}”
          <cite className="mt-2 block font-ui text-xs not-italic">
            Nic Payne · {teachingSources[note.quoteSource!]?.title}
          </cite>
        </blockquote>
      )}
      <p className="mt-3 font-ui text-sm leading-7 text-[var(--ft-muted)]">
        {note.body}
      </p>
      <p className="mt-4 font-ui text-sm leading-7 text-[var(--ft-ink)]">
        <strong>Worth asking: </strong>
        {note.question}
      </p>
      <ul className="mt-4 space-y-3">
        {note.sources.map(id => {
          const s = teachingSources[id];
          return (
            <li key={id} className="font-ui text-xs leading-6">
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {s.title} ↗
              </a>
              <span className="block text-[var(--ft-muted)]">
                {s.author} · {s.kind}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function TeachingNote({
  slug,
  chapter,
  audience,
}: {
  slug: string;
  chapter: number;
  audience?: string;
}) {
  const note = teachingFor(slug, chapter, audience);
  return note ? (
    <aside
      aria-label="The thinking behind this step"
      className="ft-teaching-note mt-8 border border-[var(--ft-line)] bg-[var(--ft-tint)] p-5 md:p-6"
    >
      <p className="mb-3 font-ui text-[10px] uppercase tracking-[.16em] text-[var(--ft-muted)]">
        The thinking behind this step
      </p>
      <TeachingNoteBody note={note} />
    </aside>
  ) : null;
}

export function LabTeachingNote({
  slug,
  step,
  audience,
}: {
  slug: string;
  step: number;
  audience?: string;
}) {
  const note = notesFor(slug, audience).find(
    note => note.slug === slug && note.labStep === step
  );
  return note ? (
    <details className="mt-7 border-t border-[var(--ft-line)] pt-5">
      <summary className="cursor-pointer font-ui text-sm leading-6 text-[var(--ft-ink)]">
        What is this way of working doing to people?
      </summary>
      <div className="mt-4 border-l-2 border-[var(--ft-accent)] pl-4">
        <TeachingNoteBody note={note} />
        <p className="mt-4 font-ui text-xs leading-6 text-[var(--ft-muted)]">
          You can reflect without writing anything down. Reading and video links
          open in another tab.
        </p>
      </div>
    </details>
  ) : null;
}
