import { fieldToolForPath } from "@/lib/field-tool-paths";
import {
  fieldToolBase,
  fieldToolPresentation,
  type Audience,
} from "@/lib/field-tool-paths";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  FileText,
  FlaskConical,
  MessageSquare,
  Scale,
  Compass,
} from "lucide-react";
import FieldToolHero from "@/components/field-tools/FieldToolHero";
import FocusedFieldToolLanding from "@/components/field-tools/FocusedFieldToolLanding";
import { getFieldTool } from "@/lib/field-tools";
import { FIELD_TOOL_PUBLIC_GUIDE_EXCERPTS } from "@/lib/field-tool-public-samples";
import { FIELD_TOOL_PUBLIC_SAMPLES } from "@/lib/field-tool-public-samples";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";

export default function FieldToolLanding({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const base = fieldToolBase(slug, audience);
  const tool = fieldToolForPath(slug, audience);
  const presentation = fieldToolPresentation(slug, audience);
  const guide =
    slug === "ai-stalemate"
      ? {
          reframe:
            audience === "pm"
              ? "You see a customer or team opportunity. Your lead sees the consequences of what ships. Get both into the conversation so you can shape a proposal worth pursuing together."
              : "Your PM sees potential. You carry quality, review, and maintenance. Make your judgment concrete so you can help shape responsible use together.",
          rules: FIELD_TOOL_PUBLIC_GUIDE_EXCERPTS[slug].rules,
        }
      : FIELD_TOOL_PUBLIC_GUIDE_EXCERPTS[slug];

  if (!tool || !presentation || !guide) {
    return (
      <main className="min-h-screen bg-[#07110d] px-6 py-24 text-[#f5f0e6]">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-5xl">
            That tool isn't on the bench yet.
          </h1>
          <Link href="/field-tools" className="mt-8 inline-block underline">
            Browse Field Tools →
          </Link>
        </div>
      </main>
    );
  }
  if (!["ai-stalemate"].includes(slug))
    return <FocusedFieldToolLanding slug={slug} />;
  const related = tool.nextTools.map(getFieldTool).filter(Boolean);
  const icons = [MessageSquare, FlaskConical, Compass];
  const sample = FIELD_TOOL_PUBLIC_SAMPLES[slug];
  const faqs = [
    [
      "Is this a course or a subscription?",
      "Neither. This is one focused Field Tool, offered as a one-time purchase. The interactive Lab, printable Field Guide, and output workflow work together around one problem.",
    ],
    [
      "How much time should I set aside?",
      presentation.session +
        " It is a suggested working session, not a promise that the organizational problem will be solved in that time.",
    ],
    [
      "Do I need an account or an AI subscription?",
      "Sign in with your purchase email to open the Lab. These are guided working tools; they do not call an AI model or require an AI subscription.",
    ],
    [
      "Where does my work go?",
      "Lab drafts stay in this browser on this device. You can copy, download, or print your output. Browser storage is not a backup: export important work before clearing browser data or changing devices.",
    ],
    [
      "Can I use it with another person?",
      "Yes. Prepare privately where needed, then use the shared process in a real conversation. Take the exported brief into your team's existing tools. There is no live collaboration or team workspace in this edition.",
    ],
  ];
  return (
    <main className="min-h-screen bg-[#f3efe4] text-[#102019]">
      <FieldToolHero
        eyebrow={tool.eyebrow}
        headline={
          <>
            {presentation.lead} <em>{presentation.accent}</em>
          </>
        }
        description={
          slug === "ai-stalemate"
            ? audience === "pm"
              ? "PM to PM: get clear about your Why, invite your lead to shape the opportunity, and leave with a decision you can take back to leadership."
              : "Help your PM understand the risks—and agree what your team needs to move forward."
            : tool.subhead
        }
        image={presentation.image}
        imageLayout={presentation.imageLayout}
        primary={{
          label: `Get the Field Tool — $${tool.price}`,
          href: `${base}/buy`,
        }}
        secondary={{
          label: "Take the free Pressure Test",
          href: "/assessment",
        }}
        facts={[
          "One-time $47 purchase",
          "Interactive Lab + Field Guide",
          "Copy, download, or print",
          "Secure email access",
        ]}
      >
        <p className="ft-product-label">
          {tool.name}
          {slug === "ai-stalemate"
            ? audience === "pm"
              ? " / FOR PRODUCT MANAGERS"
              : " / FOR LEAD DEVELOPERS"
            : ""}
        </p>
        {(slug === "priority-whiplash" ||
          slug === "product-project-translator") && (
          <p className="mt-2 font-display text-xl text-[#c7d2c9]">
            {tool.accentLine}
          </p>
        )}
        <div className="ft-benefits">
          {tool.chips.map((chip, index) => {
            const Icon = icons[index];
            return (
              <div key={chip}>
                <Icon aria-hidden="true" />
                <p>{chip}</p>
                <small>{presentation.benefits[index]}</small>
              </div>
            );
          })}
        </div>
      </FieldToolHero>

      <section className="border-b border-[#cdd4c8] bg-[#e9ebdf] px-5 py-14 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-[11px] tracking-[.2em] text-[#56715b]">
            THE FIELD TOOL EXPERIENCE
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold">
            Understand it. Work it. Take a move back.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01 / FIELD GUIDE",
                "Build your judgment",
                "Understand the pressure, the working rules, and a realistic example before the conversation.",
              ],
              [
                "02 / INTERACTIVE LAB",
                "Work your situation",
                "Bring one real problem. The instrument sequences the thinking and keeps your draft in this browser.",
              ],
              [
                "03 / YOUR ARTIFACT",
                "Leave with a move",
                "Build a brief from your own inputs. Copy it, download it, or print it for the people who need to act.",
              ],
              [
                "04 / WALKTHROUGH",
                "See how Nic plays it",
                "Watch Nic work through a realistic case, from the first conversation to a decision you can explain.",
              ],
            ].map(([label, title, copy]) => (
              <article key={label} className="border-t-2 border-[#9baa8e] pt-4">
                <p className="font-ui text-[10px] tracking-[.1em] text-[#56715b]">
                  {label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {title}
                </h3>
                <p className="mt-3 font-ui text-sm leading-6 text-[#5b685e]">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr] md:items-end">
            <div>
              <p className="font-ui text-[11px] tracking-[.2em] text-[#56715b]">
                WHAT YOU LEAVE WITH
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-.03em] md:text-5xl">
                {presentation.promise}
              </h2>
            </div>
            <div>
              <p className="font-ui text-sm leading-7 text-[#546258]">
                {tool.who}
              </p>
              <p className="mt-3 font-ui text-sm leading-6 text-[#546258]">
                {presentation.session}
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {presentation.artifacts.map((artifact, i) => (
              <article
                key={artifact.name}
                className="border border-[#ccd4c8] bg-[#fbf9f3] p-6"
              >
                <span className="font-pixel text-[8px] text-[#68816b]">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-3xl font-semibold">
                  {artifact.name}
                </h3>
                <p className="mt-3 font-ui text-sm leading-6 text-[#5b685e]">
                  {artifact.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#cdd4c8] bg-[#e9ebdf] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-ui text-[11px] tracking-[.2em] text-[#56715b]">
              SEE THE OUTPUT
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
              A mess becomes a move.
            </h2>
            <p className="mt-5 font-ui text-base leading-7 text-[#536259]">
              {presentation.example}
            </p>
            <p className="mt-4 font-ui text-xs leading-6 text-[#6a756b]">
              Illustrative example, using the same output builder as the Lab.
            </p>
            <Link
              href={`${base}/lab`}
              className="mt-7 inline-flex items-center gap-2 font-ui text-sm font-semibold text-[#264c32] underline underline-offset-4"
            >
              Open your Lab <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="min-w-0 border border-[#a7b89f] bg-[#fbf9f3] shadow-[8px_8px_0_#d2dacb]">
            <div className="flex items-center justify-between border-b border-[#d4dbcf] px-6 py-4">
              <span className="font-ui text-[11px] tracking-[.14em] text-[#56715b]">
                SAMPLE / {tool.name.toUpperCase()}
              </span>
              <FileText
                size={18}
                className="shrink-0 text-[#668167]"
                aria-hidden="true"
              />
            </div>
            <pre
              className="ft-sample max-h-[480px] overflow-y-auto p-6 font-mono text-xs leading-6 text-[#35463a]"
              tabIndex={0}
              aria-label={`${tool.name} sample output`}
            >
              {sample}
            </pre>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-[11px] tracking-[.2em] text-[#56715b]">
            {tool.sectionEyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
            {tool.sectionHeadline}
          </h2>
          <p className="mt-5 max-w-3xl font-ui text-base leading-7 text-[#536259]">
            {tool.sectionCopy}
          </p>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {tool.cards.map((card, i) => (
              <article
                key={card.title}
                className="border-t-2 border-[#9baa8e] pt-5"
              >
                <span className="font-ui text-xs text-[#6d866b]">
                  STEP {i + 1}
                </span>
                <h3 className="mt-3 font-display text-3xl font-semibold">
                  {card.title}
                </h3>
                <p className="mt-3 font-ui text-sm leading-7 text-[#57665b]">
                  {card.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="get-tool"
        className="bg-[#10271d] px-5 py-16 text-[#f1f0e5] md:px-10 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_.7fr] md:items-center">
          <div>
            <p className="font-ui text-[11px] tracking-[.2em] text-[#cfb466]">
              THE WORKING EDITION
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              One problem.
              <br />
              One working process.
            </h2>
            <ul className="mt-7 space-y-4 font-ui text-sm text-[#cedbce]">
              {[
                "Interactive Lab with a guided process",
                "Printable Field Guide with rules and a worked example",
                "Your own brief to copy, download, or print",
                "Working Edition improvements to the web tool",
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <Check
                    size={17}
                    className="shrink-0 text-[#d9b34d]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[#687b5e] bg-[#0c1e15] p-7 md:p-9">
            <p className="font-display text-2xl text-[#d9e3d6]">{tool.name}</p>
            <p className="mt-4 font-display text-6xl font-semibold text-[#e4bc59]">
              ${tool.price}
              <span className="ml-3 font-ui text-sm font-normal text-[#a4b6a4]">
                USD · one time
              </span>
            </p>
            <p className="mt-4 font-ui text-sm leading-6 text-[#adbfac]">
              A practical instrument for the conversation you're already
              carrying. No subscription. No course portal.
            </p>
            <Link
              href={`${base}/buy`}
              className="ft-button ft-button-gold mt-7 w-full"
            >
              Get the Field Tool <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 font-ui text-xs text-[#b6c9b2]">
              <Link
                href={`${base}/lab`}
                className="underline underline-offset-4"
              >
                Open your Lab
              </Link>
              <Link
                href={`${base}/guide`}
                className="underline underline-offset-4"
              >
                Read the Field Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.7fr_1fr]">
          <div>
            <Scale size={30} className="text-[#708568]" aria-hidden="true" />
            <h2 className="mt-5 font-display text-4xl font-semibold">
              Built for the actual conversation.
            </h2>
            <p className="mt-5 font-ui text-sm leading-7 text-[#5c6a60]">
              {guide.reframe}
            </p>
          </div>
          <div className="border-l-2 border-[#b1bb9c] pl-6">
            <p className="font-ui text-[11px] tracking-[.2em] text-[#56715b]">
              THE RULES BEHIND THE TOOL
            </p>
            <ul className="mt-6 space-y-4">
              {guide.rules.map(rule => (
                <li
                  key={rule}
                  className="flex gap-3 font-ui text-sm leading-6 text-[#4f6053]"
                >
                  <Check
                    size={16}
                    className="mt-1 shrink-0 text-[#77875f]"
                    aria-hidden="true"
                  />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-[#ccd4c8] bg-[#ecebdc] px-5 py-12 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-7 sm:flex-row sm:items-center">
          <img
            src="/assets/field-tools/ai-stalemate-hero.webp"
            alt="Nic Payne"
            loading="lazy"
            width="112"
            height="112"
            className="h-28 w-28 shrink-0 rounded-full object-cover object-[center_25%]"
          />
          <div>
            <p className="font-ui text-[11px] tracking-[.2em] text-[#56715b]">
              FROM A WORKING PRODUCT LEADER
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              I'm Nic. I build tools for the rooms we're already in.
            </h2>
            <p className="mt-3 max-w-3xl font-ui text-sm leading-7 text-[#56645b]">
              Rebel Leaders starts with the conditions shaping our work. These
              Field Tools take one familiar pressure and turn it into a clearer
              conversation, a shared decision, and something useful to carry
              forward.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-ui text-[11px] tracking-[.2em] text-[#56715b]">
            BEFORE YOU START
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold">
            A few practical questions.
          </h2>
          <div className="mt-8 divide-y divide-[#cbd4c6] border-y border-[#cbd4c6]">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer font-ui text-base font-semibold text-[#243d2b]">
                  {question}
                </summary>
                <p className="mt-4 max-w-3xl font-ui text-sm leading-7 text-[#5a685f]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#ccd4c8] px-5 py-14 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-ui text-[11px] tracking-[.2em] text-[#56715b]">
            IF THE PRESSURE LIVES SOMEWHERE ELSE
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {related.map(
              next =>
                next && (
                  <Link
                    key={next.slug}
                    href={`/field-tools/${next.slug}`}
                    className="border border-[#ccd4c8] bg-[#fbf9f3] p-6 transition-colors hover:border-[#6e8c72]"
                  >
                    <p className="font-ui text-xs text-[#6b7c6c]">
                      {next.name}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-semibold">
                      {next.headline}
                    </h3>
                    <span className="mt-5 inline-block font-ui text-sm font-semibold">
                      See the tool →
                    </span>
                  </Link>
                )
            )}
          </div>
        </div>
      </section>
      <footer className="bg-[#07110d] px-5 py-12 text-[#b8c9b9] md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="font-display text-3xl text-[#f5f0e6]">
              Arrive with a mess. Leave with a move.
            </p>
            <Link
              href="/field-tools"
              className="mt-4 inline-block font-ui text-xs underline underline-offset-4"
            >
              Rebel Leaders / All Field Tools
            </Link>
          </div>
          <Link href={`${base}/buy`} className="ft-button ft-button-gold">
            Get {tool.name} — ${tool.price}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
