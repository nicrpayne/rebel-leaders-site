import { Link } from "wouter";
import { ArrowRight, Check, Compass, MessageSquare, Users } from "lucide-react";
import FieldToolHero from "./FieldToolHero";
import { fieldToolPresentation } from "@/lib/field-tool-paths";

const base = "/field-tools/ai-stalemate/pm";
export const PM_AI_HERO_IMAGE =
  "/assets/field-tools/ai-stalemate-pm-hero-v4.webp";

export default function PMAIStalemateLanding() {
  const presentation = fieldToolPresentation("ai-stalemate", "pm");
  const benefits = [
    {
      title: "Clarify your Why",
      detail: "Name the future worth pursuing.",
      Icon: Compass,
    },
    {
      title: "Bring your lead in",
      detail: "Understand what matters to them.",
      Icon: MessageSquare,
    },
    {
      title: "Co-create the next move",
      detail: "Shape the approach together.",
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
      "Clarify your Why, explore concerns, and co-create a next move.",
    ],
    [
      "Shared Next-Step Brief",
      "A proposal or agreement with a next action, owner, and date.",
    ],
    [
      "Trial Card, Evidence Record & Decision Brief",
      "For when a bounded test is the right move.",
    ],
    [
      "Nic’s walkthrough",
      "Watch the whole kit used in a realistic conversation.",
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
        description="Get clear about your Why, invite your lead to shape the opportunity, and leave with a decision you can take back to leadership."
        image={PM_AI_HERO_IMAGE}
        imageLayout="wide"
        showCaption={false}
        primary={{ label: "Get the Field Tool — $47", href: `${base}/buy` }}
        facts={[
          "One-time $47 purchase",
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
      <footer className="border-t border-[#cbd4c6] px-5 py-7 font-ui text-xs text-[#607063] md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
          <span>Nic Payne · Rebel Leaders</span>
          <Link href="/field-tools">All Field Tools →</Link>
        </div>
      </footer>
    </main>
  );
}
