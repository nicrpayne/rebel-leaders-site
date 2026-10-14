import FieldToolSalesProof, {
  FieldToolBuyerQuestions,
} from "./FieldToolSalesProof";
import { Link } from "wouter";
import { ArrowRight, Check, Compass, MessageSquare, Users } from "lucide-react";
import FieldToolHero from "./FieldToolHero";
import RelatedFieldTools from "./RelatedFieldTools";
import { fieldToolPresentation } from "@/lib/field-tool-paths";

const base = "/field-tools/ai-stalemate/pm";
export const PM_AI_HERO_IMAGE =
  "/assets/field-tools/ai-stalemate-pm-hero-v5.webp";

export default function PMAIStalemateLanding() {
  const presentation = fieldToolPresentation("ai-stalemate", "pm");
  const benefits = [
    {
      title: "Say why it matters",
      detail: "Describe what could be better.",
      Icon: Compass,
    },
    {
      title: "Bring your lead in",
      detail: "Understand what matters to them.",
      Icon: MessageSquare,
    },
    {
      title: "Decide together what to do next",
      detail: "Make a plan you both helped write.",
      Icon: Users,
    },
  ];
  const included = [
    [
      "13-page Field Guide",
      "Language, practical questions, and a worked example.",
    ],
    [
      "Your PM Lab",
      "Explain what you hope to improve, ask about the concerns, and agree what happens next.",
    ],
    [
      "Next Step Together",
      "What you want to do next, who will do it, and when. It says whether you have agreed or are still asking.",
    ],
    [
      "Experiment Plan, Results Record & Decision Brief",
      "Use these if you decide an experiment would help.",
    ],
    [
      "Worked walkthrough",
      "Follow the fictional case in the Guide and load its examples into each Lab step.",
    ],
  ];
  return (
    <main className="ft-pm-landing min-h-screen bg-[#f3efe4] text-[#193025]">
      <FieldToolHero
        eyebrow="FIELD TOOL 01"
        headline={
          <>
            {presentation.lead} <em>{presentation.accent}</em>
          </>
        }
        description="Explain what you want to improve. Ask what your lead would need to check. Work out the next step together, then tell leadership what you have agreed."
        image={PM_AI_HERO_IMAGE}
        imageLayout="wide"
        showCaption={false}
        primary={{ label: "Get the Field Tool — $47", href: `${base}/buy` }}
        facts={[
          "One-time $47 USD purchase",
          "Field Guide + interactive Lab",
          "Copy, download, or print",
          "Use on phone or PC",
        ]}
      >
        <p className="ft-product-label">AI Stalemate / FOR PRODUCT MANAGERS</p>
        <div className="ft-benefits">
          {benefits.map(({ title, detail, Icon }) => (
            <div key={title}>
              <Icon aria-hidden="true" />
              <p>{title}</p>
              <small>{detail}</small>
            </div>
          ))}
        </div>
      </FieldToolHero>
      <FieldToolSalesProof slug="ai-stalemate" audience="pm" />

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
            <p className="font-display text-2xl">AI Stalemate / PM</p>
            <p className="mt-5 font-display text-6xl font-semibold">
              $47{" "}
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
      <RelatedFieldTools slug="ai-stalemate" audience="pm" />
      <footer className="border-t border-[#cbd4c6] px-5 py-7 font-ui text-xs text-[#607063] md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
          <span>Nic Payne · Rebel Leaders</span>
          <Link href="/field-tools">All Field Tools →</Link>
        </div>
      </footer>
    </main>
  );
}
