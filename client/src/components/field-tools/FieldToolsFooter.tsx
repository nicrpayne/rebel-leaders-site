import FieldToolLink from "@/components/field-tools/FieldToolLink";

export default function FieldToolsFooter() {
  return (
    <footer className="border-t border-[var(--ft-line)] bg-[var(--ft-paper)] px-5 py-8 font-ui text-xs text-[var(--ft-muted)] print:hidden">
      <nav
        aria-label="Explore Rebel Leaders"
        className="mx-auto flex max-w-6xl flex-wrap gap-6"
      >
        <FieldToolLink href="/field-tools">All Field Tools</FieldToolLink>
        <FieldToolLink href="https://rebel-leader.com/about">About Nic</FieldToolLink>
        <FieldToolLink href="/field-tools/purchase-help">Purchase & refunds</FieldToolLink>
        <FieldToolLink href="/field-tools/purchase-help#privacy">Privacy & email</FieldToolLink>
        <FieldToolLink href="mailto:hello@rebel-leader.com" data-ft-action="get_help">Get help</FieldToolLink>
        <FieldToolLink href="https://leaderrebellion.substack.com/subscribe?simple=true" rel="noopener noreferrer" data-ft-action="newsletter_open">
          Get Nic’s notes<span className="sr-only"> (Substack, opens in a new tab)</span>
        </FieldToolLink>
        <FieldToolLink
          href="https://leaderrebellion.substack.com/p/you-have-a-culture-problem"
          rel="noopener noreferrer"
        >
          Read: You Have a Culture Problem
          <span className="sr-only"> (Substack, opens in a new tab)</span>
        </FieldToolLink>
      </nav>
      <div className="mx-auto mt-7 flex max-w-6xl justify-end">
        <FieldToolLink
          className="ft-footer-signature"
          href="https://rebel-leader.com/workbench/gravitas"
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
        </FieldToolLink>
      </div>
    </footer>
  );
}
