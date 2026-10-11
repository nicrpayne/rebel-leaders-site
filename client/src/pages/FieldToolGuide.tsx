import { Link } from "wouter";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { getFieldTool } from "@/lib/field-tools";
import { getFieldGuide } from "@/lib/field-tool-guides";
import AIStalemateGuide from "@/components/field-tools/AIStalemateGuide";

export default function FieldToolGuide({ slug }: { slug: string }) {
  if (slug === "ai-stalemate") return <AIStalemateGuide />;
  const tool = getFieldTool(slug);
  const guide = getFieldGuide(slug);

  if (!tool || !guide) {
    return (
      <main className="min-h-screen bg-[#07130f] p-8 text-white">
        Field Guide not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3efe4] text-[#102019]">
      <div className="print:hidden">
        <FieldToolsNav />
      </div>

      <header className="bg-[#07130f] px-5 pb-12 pt-28 text-[#f1f4ef] md:px-8 print:bg-white print:pb-8 print:pt-8 print:text-black">
        <div className="mx-auto max-w-5xl">
          <p className="font-pixel text-[8px] tracking-[0.22em] text-[#a3ba9d] print:text-[#49634e]">
            {tool.eyebrow} / FIELD GUIDE
          </p>
          <h1 className="mt-5 max-w-4xl font-ui text-5xl font-semibold leading-[.98] tracking-[-0.045em] md:text-7xl print:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-6 max-w-3xl font-display text-2xl italic text-[#b9d5ad] print:text-[#49634e]">
            {guide.deck}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <Link
              href={"/field-tools/" + slug + "/lab"}
              className="bg-[#b9d5ad] px-5 py-3 font-ui text-sm font-semibold text-[#07130f]"
            >
              Open the Lab →
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="border border-white/20 px-5 py-3 font-ui text-sm"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </header>

      <article className="px-5 py-12 md:px-8 md:py-16 print:px-0 print:py-6">
        <div className="mx-auto max-w-5xl">
          <section className="grid gap-6 border-b border-[#cbd3c7] pb-12 md:grid-cols-[.75fr_1.25fr]">
            <p className="font-pixel text-[8px] tracking-[0.22em] text-[#58715d]">
              THE REFRAME
            </p>
            <p className="font-ui text-xl leading-8 text-[#283a2f]">
              {guide.reframe}
            </p>
          </section>

          <section className="border-b border-[#cbd3c7] py-12">
            <p className="font-pixel text-[8px] tracking-[0.22em] text-[#58715d]">
              FIVE RULES
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {guide.rules.map((rule, index) => (
                <li
                  key={rule}
                  className="border border-[#cbd3c7] bg-[#fbf9f3] p-5 font-ui text-sm leading-6"
                >
                  <span className="mr-3 font-pixel text-[8px] text-[#6c876f]">
                    0{index + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ol>
          </section>

          <section className="py-12">
            <p className="font-pixel text-[8px] tracking-[0.22em] text-[#58715d]">
              THE PROCESS
            </p>
            <div className="mt-7 space-y-5">
              {guide.sections.map(section => (
                <section
                  key={section.title}
                  className="border-l-2 border-[#8ea58f] pl-5 md:pl-7"
                >
                  <h2 className="font-ui text-2xl font-semibold tracking-[-0.025em]">
                    {section.title}
                  </h2>
                  {section.body && (
                    <p className="mt-3 max-w-3xl font-ui text-sm leading-7 text-[#56635a]">
                      {section.body}
                    </p>
                  )}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map(bullet => (
                        <li
                          key={bullet}
                          className="flex gap-3 font-ui text-sm leading-6 text-[#4e5d53]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#5e7a64]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </section>

          <section className="bg-[#10271d] p-7 text-[#ecf2ed] md:p-9 print:border print:border-[#809284] print:bg-white print:text-black">
            <p className="font-pixel text-[8px] tracking-[0.22em] text-[#b5cbaa] print:text-[#58715d]">
              WORKED EXAMPLE
            </p>
            <h2 className="mt-4 font-ui text-3xl font-semibold tracking-[-0.03em]">
              {guide.exampleTitle}
            </h2>
            <ol className="mt-6 space-y-4">
              {guide.example.map((line, index) => (
                <li
                  key={line}
                  className="grid grid-cols-[32px_1fr] gap-3 font-ui text-sm leading-6 text-[#c9d6cc] print:text-[#4e5d53]"
                >
                  <span className="font-pixel text-[8px] text-[#b9d5ad] print:text-[#58715d]">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12 grid gap-5 border-t border-[#cbd3c7] pt-10 md:grid-cols-2 print:hidden">
            <div>
              <p className="font-pixel text-[8px] tracking-[0.22em] text-[#58715d]">
                READY TO USE IT?
              </p>
              <h2 className="mt-3 font-ui text-3xl font-semibold tracking-[-0.03em]">
                Take this into the work.
              </h2>
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <Link
                href={"/field-tools/" + slug + "/lab"}
                className="bg-[#173c2a] px-5 py-3 font-ui text-sm font-semibold text-white"
              >
                Open the Lab →
              </Link>
              <Link
                href={"/field-tools/" + slug}
                className="border border-[#aab6a7] px-5 py-3 font-ui text-sm"
              >
                Product page
              </Link>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
