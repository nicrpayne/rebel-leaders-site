import { Link } from "wouter";
import { getFieldTool } from "@/lib/field-tools";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";
import { LEADERSHIP_SALES } from "@/lib/leadership-sales";
import FieldToolHero from "./FieldToolHero";

export default function FocusedFieldToolLanding({ slug }: { slug: string }) {
  const tool = getFieldTool(slug)!;
  const p = FIELD_TOOL_PRESENTATIONS[slug];
  const sales = LEADERSHIP_SALES[slug];
  const base = `/field-tools/${slug}`;
  return (
    <main className="bg-[#f3efe4] text-[#193025]">
      <FieldToolHero
        eyebrow={tool.eyebrow}
        headline={
          <>
            {tool.headline} <em>{tool.accentLine}</em>
          </>
        }
        description={sales.subtitle}
        image={p.image}
        imageLayout="wide"
        primary={{ label: `Get ${tool.name} — $47`, href: `${base}/buy` }}
        secondary={{ label: "See what you get", href: "#inside" }}
        facts={[
          "$47 · one time",
          "Field Guide + interactive Lab",
          "Copy, download, or print",
          "Secure purchase-email access",
        ]}
      >
        <p className="ft-product-label">{tool.name} / FOR PRODUCT LEADERS</p>
        <p className="mt-5 max-w-lg font-ui text-sm leading-6 text-[#bbc9bc]">
          {sales.takeaway}
        </p>
      </FieldToolHero>
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-[10px] tracking-[.2em] text-[#667d63]">
              YOUR NEXT USEFUL MOVE
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              {sales.win}
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-[#536659]">
              {sales.firstMove}
            </p>
            <p className="mt-4 text-sm leading-7 text-[#536659]">{p.session}</p>
          </div>
        </div>
      </section>
      <section
        id="inside"
        className="scroll-mt-24 border-y border-[#c9d2c3] bg-[#e7eadf] px-5 py-14 md:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] tracking-[.2em] text-[#667d63]">
            INSIDE YOUR WORKING KIT
          </p>
          <div className="mt-7 grid gap-8 lg:grid-cols-[.7fr_1.5fr]">
            <img
              src={`/assets/field-tools/${slug}-guide-cover.webp`}
              alt={`${tool.name} Field Guide cover`}
              loading="lazy"
              width="420"
              height="594"
              className="mx-auto w-full max-w-[280px] rotate-[-3deg] shadow-xl"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                [
                  "01 / FIELD GUIDE",
                  "Understand the situation",
                  "A short, designed guide with language, judgment, and a worked example.",
                ],
                [
                  "02 / LAB",
                  "Work your real problem",
                  "A guided instrument on your phone or computer. Your draft stays in your browser.",
                ],
                [
                  "03 / YOUR OUTPUTS",
                  "Take the move back",
                  p.artifacts.map(a => a.name).join(" · "),
                ],
                [
                  "04 / WALKTHROUGH",
                  "See Nic use it",
                  "Follow a realistic situation from the first question to the next decision.",
                ],
              ].map(([label, title, copy]) => (
                <article
                  key={label}
                  className="border-t-2 border-[#9aab8e] pt-4"
                >
                  <p className="text-[10px] tracking-[.12em] text-[#667d63]">
                    {label}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#536659]">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-[10px] tracking-[.2em] text-[#667d63]">
              A GLIMPSE OF THE OUTPUT
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight">
              {sales.sampleTitle}
            </h2>
            <p className="mt-5 text-xs leading-6 text-[#667d63]">
              Fictional example excerpt. Your own record uses your inputs and
              keeps proposals separate from agreed decisions.
            </p>
          </div>
          <div className="border border-[#c6d0be] bg-[#fbf9f3] p-6 shadow-[10px_10px_0_#dde3d3] md:p-8">
            <p className="text-[10px] tracking-[.16em] text-[#667d63]">
              REBEL LEADERS / {tool.name.toUpperCase()}
            </p>
            <pre className="mt-5 whitespace-pre-wrap font-ui text-sm leading-7 text-[#354b3d]">
              {sales.sample}
            </pre>
          </div>
        </div>
      </section>
      <section className="bg-[#10271d] px-5 py-14 text-[#f3efe4] md:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[10px] tracking-[.2em] text-[#cdb267]">
              BUILT BY NIC PAYNE
            </p>
            <h2 className="mt-4 font-display text-4xl">
              Let's work the situation you're carrying.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#b6c7b8]">
              PM to PM: bring one real problem. Leave with something useful for
              the conversation you need to have.
            </p>
          </div>
          <div className="border border-[#65815d] p-7">
            <p className="font-display text-5xl">
              $47 <span className="text-base">USD</span>
            </p>
            <p className="mt-2 text-xs text-[#b6c7b8]">
              One-time purchase · no subscription
            </p>
            <Link
              href={`${base}/buy`}
              className="ft-button ft-button-gold mt-5"
            >
              Get the working kit →
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-10">
        <h2 className="font-display text-3xl">Before you start.</h2>
        <div className="mt-6 divide-y divide-[#c9d2c3]">
          {[
            [sales.question, sales.answer],
            [
              "Where does my work go?",
              "Your draft stays in this browser on this device. Copy, download, or print the records you need to keep. Export before changing devices or clearing browser data.",
            ],
            [
              "How do I get access?",
              "Use your purchase email to receive a secure sign-in link. Bookmark your start page to return. No AI subscription is required.",
            ],
          ].map(([question, answer]) => (
            <details key={question} className="py-5">
              <summary className="cursor-pointer text-sm font-semibold">
                {question}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#536659]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>
      <footer className="border-t border-[#c9d2c3] px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 text-xs text-[#667d63]">
          <p>Arrive with a mess. Leave with a move.</p>
          <Link href="/field-tools">All Field Tools →</Link>
          <Link href={`${base}/access`}>
            Already purchased? Open your tool →
          </Link>
        </div>
      </footer>
    </main>
  );
}
