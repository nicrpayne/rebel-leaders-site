import FieldToolSalesProof, {
  FieldToolBuyerQuestions,
} from "./FieldToolSalesProof";
import { Link } from "wouter";
import { Check, Compass, MessageSquare, Users } from "lucide-react";
import FieldToolBuyActions from "./FieldToolBuyActions";
import FieldToolHero from "./FieldToolHero";
import RelatedFieldTools from "./RelatedFieldTools";
import {
  fieldToolBase,
  fieldToolForPath,
  fieldToolPresentation,
  type Audience,
} from "@/lib/field-tool-paths";
import { LEADERSHIP_SALES } from "@/lib/leadership-sales";

export default function CompactFieldToolLanding({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const tool = fieldToolForPath(slug, audience)!;
  const p = fieldToolPresentation(slug, audience);
  const base = fieldToolBase(slug, audience);
  const engineering = slug === "ai-stalemate";
  const icons = [Compass, MessageSquare, Users];
  const primaryArtifact = p.artifacts[2];
  const included = [
    [
      `${engineering ? 13 : 10}-page Field Guide`,
      "Practical questions and a written example you can also try in the Lab.",
    ],
    [
      engineering ? "Your Lead Developer Lab" : `Your ${tool.name} Lab`,
      engineering
        ? "Talk through the risks and decide with your PM what to do next."
        : "Work through the questions, then review and share your answers.",
    ],
    [
      engineering ? "Next Step Together" : primaryArtifact.name,
      engineering
        ? "What you want to do next, who will do it, and when. It says whether you have agreed or are still asking."
        : primaryArtifact.copy,
    ],
    [
      engineering
        ? "Experiment Plan, Results Record & Decision Brief"
        : p.artifacts
            .slice(0, 2)
            .map(a => a.name)
            .join(" & "),
      engineering
        ? "Use these if you decide an experiment would help."
        : p.artifacts
            .slice(0, 2)
            .map(a => a.copy)
            .join(" "),
    ],
  ];
  return (
    <main className="min-h-screen bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolHero
        eyebrow={tool.eyebrow}
        headline={
          engineering ? (
            <>
              {p.lead} <em>{p.accent}</em>
            </>
          ) : (
            <>
              {tool.headline} <em>{tool.accentLine}</em>
            </>
          )
        }
        description={
          engineering
            ? "Help your PM understand the risks—and agree what your team needs to move forward."
            : LEADERSHIP_SALES[slug].subtitle
        }
        image={p.image}
        imageLayout={p.imageLayout}
        showCaption={false}
        primary={{
          label: `Buy — $${tool.price}`,
          href: `${base}/buy`,
        }}
        giftHref={`${base}/buy?gift=1`}
        facts={[
          "One-time $47 USD purchase",
          "Field Guide + interactive Lab",
          "Copy, download, or print",
          "Use on phone or PC",
        ]}
      >
        <p className="ft-product-label">
          {tool.name} /{" "}
          {engineering ? "FOR LEAD DEVELOPERS" : "FOR PRODUCT LEADERS"}
        </p>
        <div className="ft-benefits">
          {tool.chips.map((chip, i) => {
            const Icon = icons[i];
            return (
              <div key={chip}>
                <Icon aria-hidden="true" />
                <p>{chip}</p>
              </div>
            );
          })}
        </div>
      </FieldToolHero>
      <FieldToolSalesProof slug={slug} audience={audience} />
      <section id="included" className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.4fr_.8fr] md:items-start">
          <div>
            <h2 className="font-display text-4xl font-semibold">
              What you get
            </h2>
            <ul className="mt-7 space-y-5">
              {included.map(([title, detail]) => (
                <li key={title} className="flex gap-3">
                  <Check
                    size={18}
                    className="mt-1 shrink-0 text-[var(--ft-muted)]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-ui text-sm font-semibold">{title}</h3>
                    <p className="mt-1 font-ui text-sm leading-6 text-[var(--ft-muted)]">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[var(--ft-line)] bg-[var(--ft-white)] p-7">
            <p className="font-display text-2xl">
              {tool.name}
              {engineering ? " / Lead Developer" : ""}
            </p>
            <p className="mt-5 font-display text-6xl font-semibold">
              ${tool.price}{" "}
              <span className="font-ui text-xs font-normal text-[var(--ft-muted)]">
                USD · one time
              </span>
            </p>
            <FieldToolBuyActions
              buyHref={`${base}/buy`}
              giftHref={`${base}/buy?gift=1`}
              className="mt-7"
            />
            <p className="mt-5 font-ui text-xs text-[var(--ft-muted)]">
              Already purchased?{" "}
              <Link
                href={`${base}/access`}
                className="underline underline-offset-4"
              >
                Open your tool →
              </Link>
            </p>
          </div>
        </div>
      </section>
      <FieldToolBuyerQuestions />
      <RelatedFieldTools slug={slug} audience={audience} />
      <footer className="border-t border-[var(--ft-line)] px-5 py-7 font-ui text-xs text-[var(--ft-muted)] md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
          <span>Nic Payne · Rebel Leaders</span>
          <Link href="/field-tools">All Field Tools →</Link>
        </div>
      </footer>
    </main>
  );
}
