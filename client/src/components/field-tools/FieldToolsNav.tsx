import { Link, useLocation } from "wouter";
import "./field-tools.css";
import RebelLogo from "@/components/RebelLogo";
import { fieldToolAccessPath } from "@/lib/field-tool-paths";

export default function FieldToolsNav() {
  const [location] = useLocation();
  const myTool = fieldToolAccessPath(location);
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-[#06100c]/82 backdrop-blur-lg">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-3 px-4 md:px-10">
        <Link
          href="/field-tools"
          className="flex shrink-0 items-center gap-2 text-[#f3efe4]"
        >
          <RebelLogo size={28} className="text-[#d9b14f]" />
          <span className="font-display text-[20px] font-semibold tracking-[-0.02em] md:text-[28px]">
            Rebel Leaders
          </span>
        </Link>

        <nav
          aria-label="Field Tools"
          className="flex items-center gap-3 font-ui text-[11px] text-[#dce5de] md:gap-9 md:text-sm"
        >
          {/(?:\/access|\/guide|\/lab)$/.test(location) &&
          myTool !== "/field-tools" ? (
            <>
              <Link href={myTool}>Start</Link>
              <Link href={myTool.replace(/\/access$/, "/guide")}>
                Field Guide
              </Link>
              <Link href={myTool.replace(/\/access$/, "/lab")}>Lab</Link>
            </>
          ) : (
            <>
              <Link href="/field-tools">Field Tools</Link>
              <Link href={myTool}>Open your tool</Link>
              <Link href="/about" className="hidden sm:inline">
                About Nic
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
