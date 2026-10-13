import { fieldToolForPath } from "@/lib/field-tool-paths";
import {
  fieldToolBase,
  fieldToolPresentation,
  type Audience,
} from "@/lib/field-tool-paths";
import { Link, Redirect } from "wouter";
import { ArrowLeft, ArrowRight, Check, LockKeyhole } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { getFieldTool } from "@/lib/field-tools";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import RelatedFieldTools from "@/components/field-tools/RelatedFieldTools";
import FieldToolKitPreview from "@/components/field-tools/FieldToolKitPreview";

export default function FieldToolPurchase({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const base = fieldToolBase(slug, audience);
  const tool = fieldToolForPath(slug, audience);
  const presentation = fieldToolPresentation(slug, audience);
  const checkout = trpc.fieldTools.checkout.useQuery(
    { slug, audience },
    { enabled: Boolean(tool), retry: false }
  );
  if (slug === "ai-stalemate") return <Redirect to={`${base}#purchase`} />;
  if (!tool || !presentation)
    return (
      <main className="min-h-screen bg-[#07110d] p-10 text-white">
        <h1 className="font-display text-4xl">Field Tool not found.</h1>
        <Link href="/field-tools" className="mt-5 inline-block underline">
          Browse the tools
        </Link>
      </main>
    );
  return (
    <main className="relative min-h-screen bg-[#07110d] text-[#f5f0e6]">
      <FieldToolsNav />
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-10 md:pt-36">
        <Link
          href={base}
          className="inline-flex items-center gap-2 font-ui text-xs text-[#afc0af]"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to {tool.name}
        </Link>
        <div className="mt-9 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
          <div>
            <p className="font-ui text-[11px] tracking-[.2em] text-[#b7c8ae]">
              {tool.eyebrow} / WORKING EDITION
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-tight md:text-6xl">
              {tool.name}
            </h1>
            <p className="mt-5 max-w-2xl font-display text-3xl leading-tight text-[#d9b34d]">
              {presentation.promise}
            </p>
            {
              <figure className="mt-7 overflow-hidden rounded-sm">
                <FieldToolKitPreview slug={slug} audience={audience} />
              </figure>
            }
            <div className="mt-9 space-y-6">
              {(slug === "ai-stalemate"
                ? [
                    {
                      name: "Shared Next-Step Brief",
                      copy: "A clear proposal for the next conversation: clarify, prepare, experiment, or stop this use.",
                    },
                    ...presentation.artifacts,
                  ]
                : presentation.artifacts
              ).map(artifact => (
                <div key={artifact.name} className="flex gap-4">
                  <Check
                    size={19}
                    className="mt-1 shrink-0 text-[#d9b34d]"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-ui text-base font-semibold">
                      {artifact.name}
                    </h2>
                    <p className="mt-2 max-w-xl font-ui text-sm leading-6 text-[#adbfaf]">
                      {artifact.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 border-t border-[#435a46] pt-6 font-ui text-sm leading-7 text-[#adbfaf]">
              <p>
                Includes the interactive Lab, printable Field Guide, and your
                shareable output. Secure access through your purchase email. No
                AI subscription required.
              </p>
              <p className="mt-3">
                The walkthrough shows how to use the process on a realistic
                case.
              </p>
              <p className="mt-3">{presentation.session}</p>
            </div>
          </div>
          <aside className="border border-[#778b6c] bg-[#10251a] p-7 md:p-9">
            <p className="font-ui text-xs tracking-[.15em] text-[#b5c4ab]">
              ONE-TIME PURCHASE
            </p>
            <p className="mt-5 font-display text-7xl font-semibold text-[#e4bc59]">
              ${tool.price}
              <span className="ml-3 font-ui text-sm font-normal text-[#afbfaa]">
                USD
              </span>
            </p>
            <p className="mt-3 font-ui text-sm leading-6 text-[#b9c8b3]">
              One Field Tool. No subscription.
            </p>
            {checkout.isPending ? (
              <p role="status" className="mt-7 font-ui text-sm text-[#cbd5c5]">
                Checking checkout availability…
              </p>
            ) : checkout.data?.checkoutUrl ? (
              <>
                <a
                  href={checkout.data.checkoutUrl}
                  className="ft-button ft-button-gold mt-7 w-full"
                >
                  Continue to checkout
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <p className="mt-4 flex items-center gap-2 font-ui text-xs text-[#adbfaa]">
                  <LockKeyhole size={13} aria-hidden="true" />
                  Payment handled by {checkout.data.provider}.
                </p>
                <p className="mt-3 font-ui text-xs leading-6 text-[#adbfaa]">
                  Any applicable tax is shown at checkout. Review the order
                  total and terms before paying.
                </p>
              </>
            ) : (
              <div className="mt-7 border border-[#7a8258] bg-[#1c2d1a] p-4">
                <p
                  role="status"
                  className="font-ui text-sm font-semibold text-[#ead69a]"
                >
                  {checkout.error
                    ? "Checkout is temporarily unavailable."
                    : "Checkout is being prepared."}
                </p>
                <p className="mt-2 font-ui text-xs leading-6 text-[#c0ccb7]">
                  Return to the product page to see the example and what is
                  included.
                </p>
                {checkout.error && (
                  <button
                    type="button"
                    onClick={() => checkout.refetch()}
                    className="mt-3 font-ui text-xs underline"
                  >
                    Check again
                  </button>
                )}
              </div>
            )}
            <div className="mt-7 flex flex-col gap-4 border-t border-[#435a46] pt-6 font-ui text-xs text-[#c0cfb9]">
              <Link
                href={`${base}/access`}
                className="underline underline-offset-4"
              >
                Already bought it? Open your tool →
              </Link>
              <Link href={base} className="underline underline-offset-4">
                See the product →
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <RelatedFieldTools slug={slug} audience={audience} />
    </main>
  );
}
