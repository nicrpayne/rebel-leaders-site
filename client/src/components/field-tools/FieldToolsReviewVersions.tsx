const preview = "https://rebel-leaders-field-tools-preview-production.up.railway.app";
const proposal = "https://rebel-ai-stalemate-proposal-production.up.railway.app";
const repository = "https://github.com/nicrpayne/rebel-leaders-site";

export default function FieldToolsReviewVersions() {
  return (
    <section aria-label="Review versions and saved files" className="mx-auto max-w-6xl border-b border-[var(--ft-line)] px-5 py-7 md:px-0">
      <h2 className="font-display text-2xl font-semibold">Choose the version to review.</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <a href={`${preview}/field-tools/review`} target="_blank" rel="noopener noreferrer" className="block border border-[var(--ft-line)] bg-[var(--ft-white)] p-5 hover:border-[var(--ft-accent)]">
          <h3 className="font-semibold">Existing Field Tools ↗</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--ft-muted)]">All five products and six paths. The AI Guides in this version have 13 pages.</p>
        </a>
        <a href={`${proposal}/field-tools/proposal`} target="_blank" rel="noopener noreferrer" className="block border border-[var(--ft-accent)] bg-[var(--ft-tint)] p-5 text-[var(--ft-ink)] hover:bg-[var(--ft-tint)]">
          <h3 className="font-semibold">AI Stalemate proposal ↗</h3>
          <p className="mt-2 text-sm leading-6">The new PM and Lead Developer product pages, 18-page Guides, communication tools, worked walkthrough, and resource library.</p>
        </a>
      </div>
      <p className="mt-4 text-xs leading-6 text-[var(--ft-muted)]">Both versions are review copies. The proposal awaits your decision; checkout and purchase delivery still need setup and testing.</p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <a href={`${repository}/blob/ai-stalemate-library-proposal/docs/landing-pages-recovery-handoff.md`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">What is done & what remains ↗</a>
        <a href={`${repository}/tree/ai-stalemate-library-proposal/assets/source-originals`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Original images ↗</a>
        <a href={`${repository}/tree/ai-stalemate-library-proposal/client/public/assets/field-tools`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Website images ↗</a>
        <a href={`${repository}/compare/field-tools-launch...ai-stalemate-library-proposal`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Compare the proposal changes ↗</a>
      </div>
    </section>
  );
}
