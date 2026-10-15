import { Link, Redirect } from "wouter";
import { trpc } from "@/lib/trpc";
import { AI_PRODUCT_INVENTORY } from "@/lib/ai-product";
import "@/components/field-tools/ai-library.css";
const baseline =
  "https://rebel-leaders-field-tools-preview-production.up.railway.app";
export default function AIProposalReview() {
  const access = trpc.fieldTools.access.useQuery();
  if (access.isPending) return <p className="p-10">Opening review desk…</p>;
  if (!access.data?.proposal) return <Redirect to="/field-tools/review" />;
  return (
    <main className="font-ui min-h-screen bg-[var(--ft-paper)] px-6 py-12 text-[var(--ft-ink)]">
      <div className="mx-auto max-w-6xl">
        <nav
          aria-label="Review navigation"
          className="mb-7 flex flex-wrap gap-5 text-sm"
        >
          <a href={`${baseline}/field-tools/review`} className="underline">
            ← Main review desk
          </a>
          <a
            href="https://github.com/nicrpayne/rebel-leaders-site/pull/4"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Review the GitHub proposal ↗
          </a>
          <a
            href="https://github.com/nicrpayne/rebel-leaders-site/blob/ai-stalemate-library-proposal/docs/landing-pages-recovery-handoff.md"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            What is done & what remains ↗
          </a>
        </nav>
        <p className="ai-eyebrow">NIC’S REVIEW DESK / SEPARATE BRANCH</p>
        <h1 className="mt-4 font-display text-5xl">
          AI Stalemate: the proposal.
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7">
          One product page per path. A visual Guide and discussion companion. A
          Lab that starts with the conversation, adds communication up and down,
          and uses a Bet only when a test is appropriate. The existing preview
          remains available for comparison.
        </p>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {(["pm", "lead-dev"] as const).map(role => {
            const base = `/field-tools/ai-stalemate/${role}`;
            return (
              <section className="ai-library-card" key={role}>
                <p className="ai-eyebrow">
                  {role === "pm" ? "PRODUCT MANAGER" : "LEAD DEVELOPER"}
                </p>
                <h2 className="mt-3 font-display text-3xl">
                  {role === "pm"
                    ? "You see a possibility for AI."
                    : "My PM won’t shut up about AI."}
                </h2>
                <Link href={base} className="ft-button ft-button-gold mt-5">
                  Open the product page →
                </Link>
                <div className="mt-6 grid gap-3 text-sm">
                  {AI_PRODUCT_INVENTORY.map(item => (
                    <Link
                      className="underline"
                      key={item.title}
                      href={`${base}/${item.destination}`}
                    >
                      {item.title} →
                    </Link>
                  ))}
                  <a
                    className="underline"
                    href={`/api/field-tools/ai-stalemate/pdf?audience=${role}`}
                  >
                    Download the expanded PDF ↓
                  </a>
                  <Link className="underline" href={`${base}/access`}>
                    Buyer start page →
                  </Link>
                  <a
                    className="text-xs underline"
                    href={`${baseline}${base}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Compare the current page ↗
                  </a>
                  <a
                    className="text-xs underline"
                    href={`${baseline}${base}/guide`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Compare the current Guide ↗
                  </a>
                </div>
              </section>
            );
          })}
        </div>
        <section className="mt-9 border-t border-[var(--ft-line)] pt-7">
          <h2 className="font-display text-3xl">Review it as a buyer.</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7">
            <li>
              Would the page make the result and contents clear after your
              video?
            </li>
            <li>
              Open the start page. Can you choose a first move without reading
              everything?
            </li>
            <li>
              Use Load Examples in Conversation. Review the brief: does it
              preserve proposal versus agreement and explain who needs to act?
            </li>
            <li>
              Inspect the Bet and Evidence steps. Are scope, permission, whole
              effort, and untested quality visible?
            </li>
            <li>
              Read a Guide visual and open its matching Lab step. Find one
              source and bring its question back.
            </li>
            <li>
              Return after the next action. What changed, what did you learn,
              and what condition should you improve?
            </li>
          </ol>
        </section>
        <aside className="mt-8 bg-[var(--ft-tint)] p-6 text-sm leading-7">
          <strong>Review environment</strong>
          <p>
            This deployment provides open review access and takes no payment.
            Live checkout, receipts, email access, and order fulfillment still
            require the approved commerce configuration and an end-to-end
            purchase test. The interactive worked walkthrough is usable here; a
            recorded video link is not configured.
          </p>
          <p className="mt-3">
            Resource review is editorial and manual, not an automatic update
            service. Selective adoption can follow the page, Lab/output,
            Guide/PDF, and resource-library groups in the draft PR.
          </p>
        </aside>
      </div>
    </main>
  );
}
