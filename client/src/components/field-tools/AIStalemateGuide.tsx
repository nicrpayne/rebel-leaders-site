import { Link } from "wouter";
import FieldToolsNav from "./FieldToolsNav";
import { AI_STALEMATE_GUIDE_PAGES } from "@/lib/ai-stalemate-guide";

export default function AIStalemateGuide() {
  return (
    <main className="ft-guide min-h-screen bg-[#f3efe4] text-[#193025]">
      <div className="print:hidden">
        <FieldToolsNav />
      </div>
      <header className="bg-[#07110d] px-5 pb-14 pt-32 text-[#f3efe4] md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-[11px] tracking-[.2em] text-[#cfb466]">
            REBEL LEADERS / FIELD TOOL 01 / THE FIELD GUIDE
          </p>
          <h1 className="mt-5 font-display text-6xl font-semibold tracking-[-.035em] md:text-8xl">
            AI Stalemate
          </h1>
          <p className="mt-5 max-w-3xl font-display text-3xl leading-tight text-[#e4bc59]">
            Two leaders. Different consequences. One useful decision.
          </p>
          <p className="mt-6 max-w-2xl font-ui text-sm leading-7 text-[#b6c7b8]">
            Build the language and judgment for the conversation. Then use the
            Lab to work your actual situation and carry the result into the
            organization.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 print:hidden">
            <a
              href="/assets/field-tools/ai-stalemate-field-guide.pdf"
              download
              className="ft-button ft-button-gold"
            >
              Download the 8-page Field Guide ↓
            </a>
            <Link
              href="/field-tools/ai-stalemate/lab"
              className="ft-button ft-button-outline"
            >
              Open the Lab →
            </Link>
          </div>
          <p className="mt-6 font-ui text-xs text-[#91a693]">
            Nic Payne / Working Edition / Read here or keep the portable PDF.
          </p>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-10 lg:grid-cols-[.65fr_2fr] lg:py-20">
        <aside className="print:hidden">
          <nav
            aria-label="Guide chapters"
            className="space-y-4 lg:sticky lg:top-8"
          >
            <p className="font-ui text-[10px] tracking-[.18em] text-[#667e66]">
              INSIDE THE GUIDE
            </p>
            {AI_STALEMATE_GUIDE_PAGES.map((chapter, index) => (
              <a
                key={chapter.eyebrow}
                href={`#guide-${index}`}
                className="block border-l border-[#b9c5ad] pl-4 font-ui text-sm leading-6 text-[#576b5d] hover:text-[#193025]"
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
              {"table" in chapter && (
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
                            rowIndex === chapter.table.length - 2
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
              <div className="mt-8 border-l-[3px] border-[#c3a14b] bg-[#153625] px-6 py-5 font-ui text-sm leading-7 text-[#f3efe4]">
                {chapter.callout}
              </div>
            </section>
          ))}
          <div className="flex flex-wrap gap-4 print:hidden">
            <Link
              href="/field-tools/ai-stalemate/lab"
              className="ft-button bg-[#153625] text-[#f3efe4]"
            >
              Work your situation in the Lab →
            </Link>
            <Link
              href="/field-tools/ai-stalemate/access"
              className="ft-button border-[#a8b59d]"
            >
              Your Field Tool →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
