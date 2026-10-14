import { Link } from "wouter";

export default function FieldToolsFooter() {
  return (
    <footer className="border-t border-[var(--ft-line)] bg-[var(--ft-paper)] px-5 py-8 font-ui text-xs text-[var(--ft-muted)] print:hidden">
      <nav
        aria-label="Explore Rebel Leaders"
        className="mx-auto flex max-w-6xl flex-wrap gap-6"
      >
        <Link href="/field-tools">All Field Tools</Link>
        <Link href="/field-tools/resources">Reading, listening & frameworks</Link>
        <Link href="/about">About Nic</Link>
        <Link href="/">Rebel Leaders →</Link>
      </nav>
    </footer>
  );
}
