import { Link } from "wouter";
import RebelLogo from "@/components/RebelLogo";

export default function FieldToolsNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-[#07130f]/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-[#e9f0e7]">
          <RebelLogo size={30} className="text-[#a8c39c]" />
          <span className="font-pixel text-[9px] tracking-[0.18em] md:text-[10px]">REBEL LEADERS</span>
        </Link>

        <nav className="flex items-center gap-5 md:gap-8 font-ui text-sm text-[#dce7df]">
          <Link href="/field-tools" className="hidden transition-colors hover:text-white sm:inline">Tools</Link>
          <Link href="/assessment" className="transition-colors hover:text-white">Assessment</Link>
          <Link href="/about" className="hidden transition-colors hover:text-white sm:inline">About</Link>
        </nav>
      </div>
    </header>
  );
}
