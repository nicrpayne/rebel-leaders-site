import TeachingNote, { FrameworkResources } from "./TeachingNote";
import { fieldToolLabStep } from "@/lib/field-tool-workflow";
import FieldToolsFooter from "./FieldToolsFooter";
import { getFieldTool } from "@/lib/field-tools";
import { fieldToolBase } from "@/lib/field-tool-paths";
import { Link } from "wouter";
import FieldToolsNav from "./FieldToolsNav";
import { useFieldToolContent } from "./FieldToolGate";
import { useEffect, useRef, useState } from "react";
import AIGuideVisual from "./AIGuideVisual";

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
    <main className="ft-guide min-h-screen bg-[#f3efe4] text-[#193025]">
      <div className="print:hidden">
        <FieldToolsNav />
      </div>
      <header className="bg-[#07110d] px-5 pb-14 pt-32 text-[#f3efe4] md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-[11px] tracking-[.2em] text-[#cfb466]">
            REBEL LEADERS / {tool.eyebrow} / THE FIELD GUIDE
          </p>
          <h1 className="mt-5 font-display text-6xl font-semibold tracking-[-.035em] md:text-8xl">
            {tool.name}
          </h1>
          <p className="mt-5 max-w-3xl font-display text-3xl leading-tight text-[#e4bc59]">
            {slug === "ai-stalemate"
              ? content.audience === "pm"
                ? "You think AI could help. Your lead has questions. Start by understanding what matters to each of you."
                : "Your PM thinks AI could help. Explain your concerns and work out what to do next together."
              : content.guide.deck}
          </p>
          <p className="mt-6 max-w-2xl font-ui text-sm leading-7 text-[#b6c7b8]">
            Read the Guide to understand the questions and see an example. Then
            use the Lab to prepare for your own conversation and write down what
            happens next.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 print:hidden">
            <a
              href={`/api/field-tools/${slug}/pdf?audience=${content.audience}`}
              download
              className="ft-button ft-button-gold"
            >
              Download the Field Guide ↓
            </a>
            <Link href={`${base}/lab`} className="ft-button ft-button-outline">
              Open the Lab →
            </Link>
          </div>
          <p className="mt-6 font-ui text-xs text-[#91a693]">
            Nic Payne / Working Edition / Read online or download the PDF.
          </p>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-10 lg:grid-cols-[.65fr_2fr] lg:py-20">
        <aside className="print:hidden">
          <nav
            aria-label="Guide chapters"
            className="space-y-2 lg:sticky lg:top-8"
          >
            <p className="font-ui text-[10px] tracking-[.18em] text-[#667e66]">
              INSIDE THE GUIDE
            </p>
            {AI_STALEMATE_GUIDE_PAGES.map((chapter, index) => (
              <a
                key={chapter.eyebrow}
                href={`#guide-${index}`}
                aria-current={activeChapter === index ? "location" : undefined}
                className={`block rounded-r-sm border-l-2 px-4 py-1 font-ui text-sm leading-6 transition-[background-color,border-color,box-shadow,color] duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c3a14b] ${activeChapter === index ? "border-[#c3a14b] bg-[#fff9e9] text-[#193025] shadow-[0_0_18px_rgba(195,161,75,0.18)]" : "border-[#b9c5ad] text-[#576b5d] hover:border-[#c3a14b] hover:text-[#193025]"}`}
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
              className="scroll-mt-8 border-b border-[#ccd4c8] pb-14 last:border-0"
            >
              <p className="font-ui text-[10px] tracking-[.18em] text-[#667e66]">
                {chapter.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-.025em] md:text-5xl">
                {chapter.title}
              </h2>
              <p className="mt-5 font-ui text-base leading-8 text-[#536659]">
                {chapter.intro}
              </p>
              {chapter.table && (
                <div className="mt-7 overflow-x-auto">
                  <table className="w-full font-ui text-sm">
                    <thead className="bg-[#153625] text-[#f3efe4]">
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
                              ? "bg-[#dce3d4] font-semibold"
                              : "border-b border-[#cbd4c6]"
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
                    <p className="mt-2 font-ui text-sm leading-7 text-[#57695d]">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
              <TeachingNote slug={slug} chapter={index} />
              {chapter.sources && (
                <div className="mt-6 flex flex-col gap-2 font-ui text-xs text-[#667e66]">
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
              <div className="mt-8 border-l-[3px] border-[#c3a14b] bg-[#153625] px-6 py-5 font-ui text-sm leading-7 text-[#f3efe4]">
                {chapter.callout}
              </div>
              <Link
                href={`${base}/lab?step=${fieldToolLabStep(slug, index)}`}
                className="mt-5 inline-block font-ui text-sm underline underline-offset-4 print:hidden"
              >
                Use this in the Lab →
              </Link>
              {slug === "ai-stalemate" && <AIGuideVisual index={index} />}
            </section>
          ))}
          <FrameworkResources />
          <div className="flex flex-wrap gap-4 print:hidden">
            <Link
              href={`${base}/lab`}
              className="ft-button bg-[#153625] text-[#f3efe4]"
            >
              Work your situation in the Lab →
            </Link>
            <Link
              href={`${base}/access`}
              className="ft-button border-[#a8b59d]"
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
