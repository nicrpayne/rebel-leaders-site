import { Link } from "wouter";

export default function FieldToolsFooter() {
  return (
    <footer className="border-t border-[#c8d0c5] bg-[#f3efe4] px-5 py-8 font-ui text-xs text-[#657268] print:hidden">
      <nav
        aria-label="Explore Rebel Leaders"
        className="mx-auto flex max-w-6xl flex-wrap gap-6"
      >
        <Link href="/field-tools">All Field Tools</Link>
        <Link href="/about">About Nic</Link>
        <Link href="/">Rebel Leaders →</Link>
      </nav>
    </footer>
  );
}
