import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import "./field-tools.css";
import RebelLogo from "@/components/RebelLogo";
import { fieldToolAccessPath } from "@/lib/field-tool-paths";

export default function FieldToolsNav({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const [location] = useLocation();
  const myTool = fieldToolAccessPath(location);
  const inTool =
    /(?:\/access|\/guide|\/lab|\/walkthrough|\/resources)$/.test(location) &&
    myTool !== "/field-tools";
  const links = inTool
    ? [
        [myTool, "Start"],
        [myTool.replace(/\/access$/, "/guide"), "Field Guide"],
        [myTool.replace(/\/access$/, "/lab"), "Lab"],
      ]
    : [
        ["/field-tools", "Field Tools"],
        [myTool, "Open your tool"],
        ["/about", "About Nic"],
      ];
  const items = links.map(([href, label]) => (
    <Link key={label} href={href}>
      {label}
    </Link>
  ));
  return (
    <header className="ft-nav absolute inset-x-0 top-0 z-40 border-b border-[var(--ft-line)]">
      <div className="ft-nav-inner">
        <Link href="/field-tools" className="ft-nav-brand">
          <RebelLogo size={28} className="text-[var(--ft-accent)]" />
          <span className="font-display">Rebel Leaders</span>
        </Link>
        <nav aria-label="Field Tools" className="ft-nav-desktop">
          {items}
        </nav>
        <details
          key={location}
          className="ft-nav-mobile"
          onKeyDown={event => {
            if (event.key === "Escape") {
              event.currentTarget.open = false;
              event.currentTarget.querySelector("summary")?.focus();
            }
          }}
        >
          <summary aria-label="Navigation menu">
            <Menu size={21} aria-hidden="true" />
            <span>Menu</span>
          </summary>
          <nav aria-label="Field Tools mobile">{items}</nav>
        </details>
      </div>
    </header>
  );
}
