import TeachingNote, { FrameworkResources } from "./TeachingNote";
import { fieldToolLabStep } from "@/lib/field-tool-workflow";
import FieldToolsFooter from "./FieldToolsFooter";
import { getFieldTool } from "@/lib/field-tools";
import { fieldToolBase } from "@/lib/field-tool-paths";
import { Link } from "wouter";
import FieldToolsNav from "./FieldToolsNav";
import { useFieldToolContent } from "./FieldToolGate";
import { useEffect, useRef, useState } from "react";

export default function ChapterGuide({ slug }: { slug: string }) {
  const content = useFieldToolContent();
  const base = fieldToolBase(slug, content.audience);
  const tool = getFieldTool(slug)!;
  const AI_STALEMATE_GUIDE_PAGES = content.guidePages ?? [];
  const chapters = useRef<(HTMLElement | null)[]>([]);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const chapterCount = AI_STALEMATE_GUIDE_PAGES.length;

  useEffect(() => {
    // The chapters arrive after the access check, so the browser may have
    // tried to follow the fragment before its target existed.
    const match = /^#guide-(\d+)$/.exec(window.location.hash);
    if (!match) return;
    const frame = window.requestAnimationFrame(() => {
      chapters.current[Number(match[1])]?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [slug, content.audience, chapterCount]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = Math.min(160, window.innerHeight * 0.25);
      let current: number | null = null;
      chapters.current.slice(0, chapterCount).forEach((chapter, index) => {
        if (chapter && chapter.getBoundingClientRect().top <= readingLine) {
          current = index;
        }
      });
      // A short final chapter still becomes current at the end of the page.
      if (
        current !== null &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
      ) {
        current = chapterCount - 1;
      }
      setActiveChapter(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    const observer = new ResizeObserver(schedule);
    chapters.current.slice(0, chapterCount).forEach(chapter => {
      if (chapter) observer.observe(chapter);
    });
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [slug, content.audience, chapterCount]);

  return (
    <main className="ft-guide min-h-screen bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <div className="print:hidden">
        <FieldToolsNav />
      </div>
      <header className="bg-[var(--ft-paper)] px-5 pb-14 pt-32 text-[var(--ft-ink)] md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-[11px] tracking-[.2em] text-[var(--ft-accent)]">
            REBEL LEADERS / {tool.eyebrow} / THE FIELD GUIDE
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-.035em] md:text-6xl">
            {tool.name}
          </h1>
          <p className="mt-5 max-w-3xl font-ui text-lg leading-8 text-[var(--ft-accent)]">
            {slug === "ai-stalemate"
              ? content.audience === "pm"
                ? "You think AI could help. Your lead has questions. Start by understanding what matters to each of you."
                : "Your PM thinks AI could help. Explain your concerns and work out what to do next together."
              : content.guide.deck}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 print:hidden">
            <a
              href={`/api/field-tools/${slug}/pdf?audience=${content.audience}`}
              download
              className="ft-button ft-button-gold"
            >
              Download PDF ↓
            </a>
            <Link href={`${base}/lab`} className="ft-button ft-button-outline">
              Open the Lab →
            </Link>
          </div>
          <p className="mt-6 font-ui text-xs text-[var(--ft-muted)]">By Nic Payne</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-10 lg:grid-cols-[.65fr_2fr] lg:py-20">
        <aside className="print:hidden">
          <nav
            aria-label="Guide chapters"
            className="space-y-2 lg:sticky lg:top-8"
          >
            <p className="font-ui text-[10px] tracking-[.18em] text-[var(--ft-muted)]">
              INSIDE THE GUIDE
            </p>
            {AI_STALEMATE_GUIDE_PAGES.map((chapter, index) => (
              <a
                key={chapter.eyebrow}
                href={`#guide-${index}`}
                aria-current={activeChapter === index ? "location" : undefined}
                className={`block rounded-r-sm border-l-2 px-4 py-1 font-ui text-sm leading-6 transition-[background-color,border-color,box-shadow,color] duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-accent)] ${activeChapter === index ? "border-[var(--ft-accent)] bg-[var(--ft-white)] text-[var(--ft-ink)] shadow-none" : "border-[var(--ft-line)] text-[var(--ft-muted)] hover:border-[var(--ft-accent)] hover:text-[var(--ft-ink)]"}`}
              >
                {chapter.eyebrow}
              </a>
            ))}
          </nav>
        </aside>
        <article className="min-w-0 space-y-14">
          {AI_STALEMATE_GUIDE_PAGES.map((chapter, index) => (
            <section
              key={chapter.eyebrow}
              id={`guide-${index}`}
              ref={element => {
                chapters.current[index] = element;
              }}
              className="scroll-mt-8 border-b border-[var(--ft-line)] pb-14 last:border-0"
            >
              <p className="font-ui text-[10px] tracking-[.18em] text-[var(--ft-muted)]">
                {chapter.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-.025em] md:text-5xl">
                {chapter.title}
              </h2>
              <p className="mt-5 font-ui text-base leading-8 text-[var(--ft-muted)]">
                {chapter.intro}
              </p>
              {chapter.table && (
                <div className="mt-7 overflow-x-auto">
                  <table className="w-full font-ui text-sm">
                    <thead className="bg-[var(--ft-tint)] text-[var(--ft-ink)]">
                      <tr>
                        {chapter.table[0].map(cell => (
                          <th
                            key={cell}
                            scope="col"
                            className="px-4 py-4 text-left font-medium"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {chapter.table.slice(1).map((row, rowIndex) => (
                        <tr
                          key={row[0]}
                          className={
                            rowIndex === (chapter.table?.length ?? 0) - 2
                              ? "bg-[var(--ft-tint)] font-semibold"
                              : "border-b border-[var(--ft-line)]"
                          }
                        >
                          {row.map((cell, column) =>
                            column === 0 ? (
                              <th
                                key={cell}
                                scope="row"
                                className="px-4 py-3 text-left font-normal"
                              >
                                {cell}
                              </th>
                            ) : (
                              <td
                                key={column}
                                className="whitespace-nowrap px-4 py-3"
                              >
                                {cell}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-8 space-y-6">
                {chapter.sections.map(section => (
                  <div key={section.title}>
                    <h3 className="font-ui text-base font-semibold">
                      {section.title}
                    </h3>
                    <p className="mt-2 font-ui text-sm leading-7 text-[var(--ft-muted)]">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
              <TeachingNote slug={slug} chapter={index} />
              {chapter.sources && (
                <div className="mt-6 flex flex-col gap-2 font-ui text-xs text-[var(--ft-muted)]">
                  {chapter.sources.map(source => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4"
                    >
                      {source.name} ↗
                    </a>
                  ))}
                </div>
              )}
              <div className="ft-guide-callout mt-8 border-l-[3px] border-[var(--ft-accent)] bg-[var(--ft-tint)] px-6 py-5 font-ui text-sm leading-7 text-[var(--ft-ink)]">
                {chapter.callout}
              </div>
              <Link
                href={`${base}/lab?step=${fieldToolLabStep(slug, index)}`}
                className="mt-5 inline-block font-ui text-sm underline underline-offset-4 print:hidden"
              >
                Use this in the Lab →
              </Link>
            </section>
          ))}
          <FrameworkResources />
          <div className="flex flex-wrap gap-4 print:hidden">
            <Link
              href={`${base}/lab`}
              className="ft-action-primary ft-button bg-[var(--ft-tint)] text-[var(--ft-ink)]"
            >
              Open the Lab →
            </Link>
            <Link
              href={`${base}/access`}
              className="ft-button border-[var(--ft-line)]"
            >
              Your Field Tool →
            </Link>
          </div>
        </article>
      </div>
      <FieldToolsFooter />
    </main>
  );
}
