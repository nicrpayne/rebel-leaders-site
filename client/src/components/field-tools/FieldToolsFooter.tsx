import { Link } from "wouter";

export default function FieldToolsFooter() {
  return (
    <footer className="border-t border-[var(--ft-line)] bg-[var(--ft-paper)] px-5 py-8 font-ui text-xs text-[var(--ft-muted)] print:hidden">
      <nav
        aria-label="Explore Rebel Leaders"
        className="mx-auto flex max-w-6xl flex-wrap gap-6"
      >
        <Link href="/field-tools">All Field Tools</Link>
        <a href="https://rebel-leader.com/about">About Nic</a>
        <Link href="/field-tools/purchase-help">Purchase & refunds</Link>
        <a href="mailto:hello@rebel-leader.com">Get help</a>
        <a
          href="https://leaderrebellion.substack.com/p/you-have-a-culture-problem"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read: You Have a Culture Problem ↗
          <span className="sr-only"> (Substack, opens in a new tab)</span>
        </a>
      </nav>
      <div className="mx-auto mt-7 flex max-w-6xl justify-end">
        <a
          className="ft-footer-signature"
          href="https://rebel-leader.com/workbench/gravitas"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hope is rebellious. Explore Gravitas (opens in a new tab)"
          title="Explore Gravitas"
        >
          <span className="ft-footer-hope">Hope is rebellious.</span>
          <span className="ft-footer-sprite" aria-hidden="true">
            <img
              src="/assets/field-tools/nic-victory-transparent.png"
              width="2051"
              height="2051"
              alt=""
              loading="lazy"
            />
          </span>
        </a>
      </div>
    </footer>
  );
}
