import { fieldToolForPath } from "@/lib/field-tool-paths";
import {
  fieldToolBase,
  fieldToolPresentation,
  type Audience,
} from "@/lib/field-tool-paths";
import { Link, useSearch } from "wouter";
import FieldToolBuyActions from "@/components/field-tools/FieldToolBuyActions";
import FieldToolGiftForm from "@/components/field-tools/FieldToolGiftForm";
import { ArrowLeft, Check, LockKeyhole } from "lucide-react";
import { trpc } from "@/lib/trpc";
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
  const search = useSearch();
  const isGift = new URLSearchParams(search).get("gift") === "1";
  const base = fieldToolBase(slug, audience);
  const tool = fieldToolForPath(slug, audience);
  const presentation = fieldToolPresentation(slug, audience);
  const checkout = trpc.fieldTools.checkout.useQuery(
    { slug, audience },
    { enabled: Boolean(tool), retry: false }
  );
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
              {tool.eyebrow} / FIELD GUIDE + LAB
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
                      name: "Next Step Together",
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
                Includes the Field Guide, written examples, and interactive Lab.
                Sign in with your email. No subscription needed.
              </p>
            </div>
          </div>
          <aside className="border border-[#778b6c] bg-[#10251a] p-7 md:p-9">
            <p className="font-ui text-xs tracking-[.15em] text-[#b5c4ab]">
              ONE-TIME PURCHASE
            </p>
            <p className="mt-5 font-display text-7xl font-semibold text-[#e4bc59]">
              ${tool.price}{" "}
              <span className="ml-3 font-ui text-sm font-normal text-[#afbfaa]">
                USD
              </span>
            </p>
            <p className="mt-3 font-ui text-sm leading-6 text-[#b9c8b3]">
              One Field Tool. No subscription.
            </p>
            {isGift && (
              <Link
                href={`${base}/buy`}
                className="mt-6 inline-block font-ui text-sm underline underline-offset-4"
              >
                ← Buy for myself
              </Link>
            )}
            {isGift && (
              <FieldToolGiftForm
                key={slug + audience}
                slug={slug}
                audience={audience}
                name={tool.name}
                available={Boolean(checkout.data?.checkoutUrl)}
              />
            )}
            {!isGift && (
              <>
                <FieldToolBuyActions
                  buyHref={checkout.data?.checkoutUrl}
                  giftHref={`${base}/buy?gift=1`}
                  tone="dark"
                  className="mt-7"
                />
                {checkout.isPending ? (
                  <p
                    role="status"
                    className="mt-4 font-ui text-sm text-[#cbd5c5]"
                  >
                    Checking checkout…
                  </p>
                ) : checkout.data?.checkoutUrl ? (
                  <p className="mt-4 flex items-start gap-2 font-ui text-xs leading-6 text-[#adbfaa]">
                    <LockKeyhole
                      size={13}
                      className="mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    Payment through {checkout.data.provider}. Any tax is shown
                    before you pay.
                  </p>
                ) : (
                  <div className="mt-4 font-ui text-sm text-[#ead69a]">
                    <p role="status">
                      {checkout.error
                        ? "Checkout is temporarily unavailable."
                        : "Purchases are not open yet."}
                    </p>
                    {checkout.error && (
                      <button
                        type="button"
                        onClick={() => checkout.refetch()}
                        className="mt-3 underline"
                      >
                        Check again
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
            {isGift && checkout.data?.checkoutUrl && (
              <p className="mt-4 font-ui text-xs leading-6 text-[#adbfaa]">
                Payment through Lemon Squeezy. Any tax is shown before you pay.
              </p>
            )}
            <div className="mt-7 flex flex-col gap-4 border-t border-[#435a46] pt-6 font-ui text-xs text-[#c0cfb9]">
              <Link
                href={`${base}/access`}
                className="underline underline-offset-4"
              >
                Already have this? Open your tool →
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
