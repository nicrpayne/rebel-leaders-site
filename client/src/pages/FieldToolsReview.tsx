import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import FieldToolsReviewVersions from "@/components/field-tools/FieldToolsReviewVersions";
import "@/components/field-tools/field-tools.css";

const products: {
  slug: string;
  name: string;
  audience: Audience;
  edition: string;
  pages: number;
  image: string;
}[] = [
  {
    slug: "ai-stalemate",
    name: "AI Stalemate",
    audience: "pm",
    edition: "PM path",
    pages: 18,
    image: "ai-stalemate-pm-hero-v5.webp",
  },
  {
    slug: "ai-stalemate",
    name: "AI Stalemate",
    audience: "lead-dev",
    edition: "Lead Developer path",
    pages: 18,
    image: "ai-stalemate-hero-v2.webp",
  },
  {
    slug: "deadline-reset",
    name: "Deadline Reset",
    audience: "pm",
    edition: "Field Tool 02",
    pages: 10,
    image: "deadline-reset-hero-v2.webp",
  },
  {
    slug: "priority-whiplash",
    name: "Priority Whiplash",
    audience: "pm",
    edition: "Field Tool 03",
    pages: 10,
    image: "priority-whiplash-hero-v2.webp",
  },
  {
    slug: "mandate-reset",
    name: "Mandate Reset",
    audience: "pm",
    edition: "Field Tool 04",
    pages: 10,
    image: "mandate-reset-hero-v3.webp",
  },
  {
    slug: "product-project-translator",
    name: "Product / Project Translator",
    audience: "pm",
    edition: "Field Tool 05",
    pages: 10,
    image: "product-project-translator-hero-v2.webp",
  },
];

const linkStyle =
  "flex items-center justify-center border border-[var(--ft-line)] px-3 py-3 text-center font-ui text-xs font-semibold transition-colors hover:border-[var(--ft-accent)] hover:bg-[var(--ft-tint)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-accent)]";

export default function FieldToolsReview() {
  return (
    <main className="min-h-screen bg-[var(--ft-paper)] font-ui text-[var(--ft-ink)]">
      <header className="bg-[var(--ft-paper)] px-5 py-9 text-[var(--ft-ink)] md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs tracking-[.18em] text-[var(--ft-accent)]">
              REBEL LEADERS / REVIEW DESK
            </p>
            <a
              href="/field-tools"
              className="text-xs text-[var(--ft-muted)] underline underline-offset-4"
            >
              Open the store ↗
            </a>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-.03em] md:text-5xl">
            All your Field Tools. One place.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--ft-muted)]">
            Six products across five situations. Open the pages, download the
            current PDFs, and try the Labs. Links open in a new tab so this desk
            stays handy.
          </p>
        </div>
      </header>

      <FieldToolsReviewVersions />

      <section
        aria-label="Product review links"
        className="mx-auto grid max-w-6xl gap-5 px-5 py-8 md:grid-cols-2 md:px-0 lg:grid-cols-3"
      >
        {products.map(product => {
          const base = fieldToolBase(product.slug, product.audience);
          return (
            <article
              key={base}
              aria-label={`${product.name} / ${product.edition}`}
              className="flex flex-col border border-[var(--ft-line)] bg-[var(--ft-white)] p-5"
            >
              <div className="flex min-h-[90px] items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--ft-muted)]">
                    {product.edition}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold leading-tight">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-xs text-[var(--ft-muted)]">
                    {product.pages}-page Field Guide
                  </p>
                </div>
                <img
                  src={`/assets/field-tools/${product.image}`}
                  alt=""
                  className="h-[78px] w-[66px] shrink-0 object-cover object-right"
                />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  className={linkStyle}
                  href={base}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Landing page ↗
                </a>
                <a
                  className={linkStyle}
                  href={`${base}/access`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start & walkthrough ↗
                </a>
                <a
                  className={linkStyle}
                  href={`${base}/guide`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Guide ↗
                </a>
                <a
                  className={linkStyle}
                  href={`/api/field-tools/${product.slug}/pdf?audience=${product.audience}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF ↓
                </a>
                <a
                  className={`${linkStyle} col-span-2 border-[var(--ft-accent)] bg-[var(--ft-tint)] text-[var(--ft-ink)] hover:bg-[var(--ft-tint)]`}
                  href={`${base}/lab`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Lab & build outputs ↗
                </a>
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-[var(--ft-muted)]">
                <a
                  href={`${base}/buy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Checkout page ↗
                </a>
                <a
                  href={`/assets/field-tools/${product.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Hero image ↗
                </a>
              </div>
            </article>
          );
        })}
      </section>

      <section
        aria-label="Shared project resources"
        className="mx-auto max-w-6xl border-t border-[var(--ft-line)] px-5 py-7 md:px-0"
      >
        <h2 className="font-display text-2xl font-semibold">
          Shared links & notes
        </h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <a
            href="/assessment"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Pressure Test ↗
          </a>
          <a
            href="https://github.com/nicrpayne/rebel-leaders-site/pull/3"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            GitHub changes ↗
          </a>
          <a
            href="https://github.com/nicrpayne/rebel-leaders-site/blob/field-tools-launch/docs/field-tools-v1-review.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Product review notes ↗
          </a>
          <a
            href="https://github.com/nicrpayne/rebel-leaders-site/blob/field-tools-launch/docs/field-tools-commerce.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Purchase & access setup ↗
          </a>
        </div>
        <p className="mt-5 text-xs leading-6 text-[var(--ft-muted)]">
          Outputs are generated from your entries inside each Lab. Walkthrough
          access lives on each Start page. This is the review preview; payment
          setup is still in progress.
        </p>
      </section>
    </main>
  );
}
