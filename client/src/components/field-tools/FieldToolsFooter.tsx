import { Link } from "wouter";

export default function FieldToolsFooter() {
  return (
    <footer className="border-t border-[var(--ft-line)] bg-[var(--ft-paper)] px-5 py-8 font-ui text-xs text-[var(--ft-muted)] print:hidden">
      <nav
        aria-label="Explore Rebel Leaders"
        className="mx-auto flex max-w-6xl flex-wrap gap-6"
      >
        <Link href="/field-tools">All Field Tools</Link>
        <Link href="/about">About Nic</Link>
        <a href="https://rebel-leader.com" target="_blank" rel="noreferrer">
          Rebel Leaders →
        </a>
      </nav>
      <p className="ft-footer-hope mx-auto max-w-6xl mt-7">
        Hope is rebellious.
      </p>
    </footer>
  );
}
