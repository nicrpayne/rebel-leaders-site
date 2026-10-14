import { fieldToolForPath } from "@/lib/field-tool-paths";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import { Link, Redirect, useSearch } from "wouter";
import FieldToolBuyActions from "@/components/field-tools/FieldToolBuyActions";
import FieldToolGiftForm from "@/components/field-tools/FieldToolGiftForm";
import { ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";
import RelatedFieldTools from "@/components/field-tools/RelatedFieldTools";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
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
  const checkout = trpc.fieldTools.checkout.useQuery(
    { slug, audience },
    { enabled: Boolean(tool), retry: false }
  );
  if (slug === "ai-stalemate" && !isGift)
    return <Redirect to={`${base}#purchase`} />;
  if (!tool)
    return (
      <main className="min-h-screen bg-[var(--ft-paper)] p-10 text-[var(--ft-ink)]">
        <h1 className="font-display text-4xl">Field Tool not found.</h1>
        <Link href="/field-tools" className="mt-5 inline-block underline">
          Browse the tools
        </Link>
      </main>
    );
  return (
    <main className="ft-purchase relative min-h-screen bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolsNav />
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-24 md:px-10 md:pt-28">
        <Link
          href={base}
          className="inline-flex items-center gap-2 font-ui text-xs text-[var(--ft-muted)]"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to product
        </Link>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
          {tool.name}
          {slug === "ai-stalemate"
            ? ` / ${audience === "pm" ? "PM" : "Lead Developer"}`
            : ""}
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(280px,.8fr)] md:items-start">
          <figure className="overflow-hidden rounded-sm">
            <FieldToolKitPreview slug={slug} audience={audience} />
          </figure>
          <aside
            aria-label="Purchase options"
            className="border border-[var(--ft-line)] bg-[var(--ft-tint)] p-6 md:p-8"
          >
            <p className="font-display text-6xl font-semibold text-[var(--ft-accent)]">
              ${tool.price}{" "}
              <span className="font-ui text-sm font-normal text-[var(--ft-muted)]">
                USD · one time
              </span>
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
                    className="mt-4 font-ui text-sm text-[var(--ft-muted)]"
                  >
                    Checking checkout…
                  </p>
                ) : checkout.data?.checkoutUrl ? (
                  <p className="mt-4 font-ui text-xs text-[var(--ft-muted)]">
                    Tax shown at checkout.
                  </p>
                ) : (
                  <div className="mt-4 font-ui text-sm text-[var(--ft-muted)]">
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
              <p className="mt-4 font-ui text-xs leading-6 text-[var(--ft-muted)]">
                Payment through Lemon Squeezy. Any tax is shown before you pay.
              </p>
            )}
          </aside>
        </div>
      </section>
      <RelatedFieldTools slug={slug} audience={audience} />
    </main>
  );
}
