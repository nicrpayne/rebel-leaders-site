import { Link } from "wouter";
import RebelLogo from "@/components/RebelLogo";

export default function FieldToolsNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-[#06100c]/82 backdrop-blur-lg">
      <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-3 text-[#f3efe4]">
          <RebelLogo size={34} className="text-[#d9b14f]" />
          <span className="font-display text-[24px] font-semibold tracking-[-0.02em] md:text-[28px]">
            Rebel Leaders
          </span>
        </Link>

        <nav className="flex items-center gap-5 font-ui text-[13px] text-[#dce5de] md:gap-9 md:text-sm">
          <Link href="/assessment" className="transition-colors hover:text-[#e4bf5b]">Assessment</Link>
          <Link href="/field-tools" className="transition-colors hover:text-[#e4bf5b]">Field Tools</Link>
          <Link href="/about" className="hidden transition-colors hover:text-[#e4bf5b] sm:inline">About</Link>
        </nav>
      </div>
    </header>
  );
}
