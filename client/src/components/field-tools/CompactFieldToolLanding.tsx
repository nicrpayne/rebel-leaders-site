import FieldToolSalesProof, {
  FieldToolBuyerQuestions,
} from "./FieldToolSalesProof";
import { Link } from "wouter";
import { ArrowRight, Check, Compass, MessageSquare, Users } from "lucide-react";
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
      "Language, practical questions, and a worked example.",
    ],
    [
      engineering ? "Your Lead Developer Lab" : `Your ${tool.name} Lab`,
      engineering
        ? "Explore the concerns, shape responsible conditions, and co-create a next move."
        : LEADERSHIP_SALES[slug].firstMove,
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
    [
      "Worked walkthrough",
      "Follow the fictional case in the Guide and load its examples into each Lab step.",
    ],
  ];
  return (
    <main className="min-h-screen bg-[#f3efe4] text-[#193025]">
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
          label: `Get the Field Tool — $${tool.price}`,
          href: `${base}/buy`,
        }}
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
                    className="mt-1 shrink-0 text-[#6e8056]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-ui text-sm font-semibold">{title}</h3>
                    <p className="mt-1 font-ui text-sm leading-6 text-[#607063]">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[#aab99f] bg-[#fffdf7] p-7">
            <p className="font-display text-2xl">
              {tool.name}
              {engineering ? " / Lead Developer" : ""}
            </p>
            <p className="mt-5 font-display text-6xl font-semibold">
              ${tool.price}{" "}
              <span className="font-ui text-xs font-normal text-[#607063]">
                USD · one time
              </span>
            </p>
            <Link
              href={`${base}/buy`}
              className="ft-button ft-button-gold mt-7 w-full"
            >
              Get the Field Tool <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <p className="mt-5 font-ui text-xs text-[#607063]">
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
      <footer className="border-t border-[#cbd4c6] px-5 py-7 font-ui text-xs text-[#607063] md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
          <span>Nic Payne · Rebel Leaders</span>
          <Link href="/field-tools">All Field Tools →</Link>
        </div>
      </footer>
    </main>
  );
}
