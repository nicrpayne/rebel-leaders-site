export default function FieldToolsReviewVersions() {
  return (
    <section
      aria-label="Current review status"
      className="mx-auto max-w-6xl border-y border-[var(--ft-line)] px-5 py-7 md:px-8"
    >
      <p className="mb-3 font-ui text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--ft-accent)]">
        AI Stalemate updated · 23 October 2026
      </p>
      <h2 className="font-display text-2xl">
        Next up: read the Lead Developer edition.
      </h2>
      <p className="mt-3 text-sm leading-7 text-[var(--ft-muted)]">
        Your latest PM notes are now reflected in both editions: the Guides,
        PDFs, Lab examples, and worked walkthroughs. Each edition is a separate
        $47 purchase. The links below go straight to the current materials.
      </p>
      <a
        href="/field-tools/ai-stalemate/lead-dev/guide"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center font-ui text-sm font-semibold text-[var(--ft-accent)] underline underline-offset-4"
      >
        Read the Lead Developer Guide ↗
      </a>
      <p className="mt-3 text-xs leading-6 text-[var(--ft-muted)]">
        Checkout remains disabled here. Test-mode purchases, delivery, and
        refund testing are still required before launch.
      </p>
    </section>
  );
}
