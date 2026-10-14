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
export function teachingFor(slug: string, chapter: number) {
  return teaching.notes.find(
    note => note.slug === slug && note.chapter === chapter
  );
}

export function TeachingNoteBody({ note }: { note: Teaching }) {
  return (
    <>
      <h3 className="font-display text-2xl leading-tight text-[#193025]">
        {note.title}
      </h3>
      {note.quote && (
        <blockquote className="mt-4 border-l-2 border-[#c3a14b] pl-4 font-display text-xl leading-7 text-[#193025]">
          “{note.quote}”
          <cite className="mt-2 block font-ui text-xs not-italic">
            Nic Payne · {teachingSources[note.quoteSource!]?.title}
          </cite>
        </blockquote>
      )}
      <p className="mt-3 font-ui text-sm leading-7 text-[#536659]">
        {note.body}
      </p>
      <p className="mt-4 font-ui text-sm leading-7 text-[#193025]">
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
              <span className="block text-[#637465]">
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
}: {
  slug: string;
  chapter: number;
}) {
  const note = teachingFor(slug, chapter);
  return note ? (
    <aside
      aria-label="The thinking behind this step"
      className="mt-8 border border-[#c8d1bf] bg-[#e8eddf] p-5 md:p-6"
    >
      <p className="mb-3 font-ui text-[10px] uppercase tracking-[.16em] text-[#617358]">
        The thinking behind this step
      </p>
      <TeachingNoteBody note={note} />
    </aside>
  ) : null;
}

export function LabTeachingNote({
  slug,
  step,
}: {
  slug: string;
  step: number;
}) {
  const note = teaching.notes.find(
    note => note.slug === slug && note.labStep === step
  );
  return note ? (
    <details className="mt-7 border-t border-[#bec9b5] pt-5">
      <summary className="cursor-pointer font-ui text-sm leading-6 text-[#193025]">
        What is this way of working doing to people?
      </summary>
      <div className="mt-4 border-l-2 border-[#c3a14b] pl-4">
        <TeachingNoteBody note={note} />
        <p className="mt-4 font-ui text-xs leading-6 text-[#637465]">
          You can reflect without writing anything down. Reading and video links
          open in another tab.
        </p>
      </div>
    </details>
  ) : null;
}

export function FrameworkResources() {
  return (
    <aside className="mt-10 border-t border-[#c8d1bf] pt-7">
      <h2 className="font-display text-3xl text-[#193025]">
        What work does to people.
      </h2>
      <p className="mt-3 max-w-2xl font-ui text-sm leading-7 text-[#536659]">
        These tools come from Holistic Shaping. The work matters, and so does
        who we become while doing it together. Explore the two maps behind that
        approach.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {["orbital", "hid"].map(id => {
          const s = teachingSources[id];
          return (
            <a
              key={id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="border border-[#bfcbb6] bg-[#e8eddf] p-5 hover:border-[#75866d]"
            >
              <h3 className="font-display text-2xl">{s.title} ↗</h3>
              <p className="mt-2 font-ui text-sm leading-6 text-[#536659]">
                {s.summary}
              </p>
            </a>
          );
        })}
      </div>
      <a
        href="/field-tools/resources"
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block font-ui text-sm underline underline-offset-4"
      >
        More from Nic, with reading and listening for each tool ↗
      </a>
    </aside>
  );
}
