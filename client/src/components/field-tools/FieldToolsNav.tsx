import { Link, useLocation } from "wouter";
import "./field-tools.css";
import RebelLogo from "@/components/RebelLogo";
import { fieldToolAccessPath } from "@/lib/field-tool-paths";
import { getFieldTool } from "@/lib/field-tools";

export default function FieldToolsNav() {
  const [location] = useLocation();
  const myTool = fieldToolAccessPath(location);
  const tool = getFieldTool(location.split("/")[2]);
  const inTool =
    /(?:\/access|\/guide|\/lab(?:\/(?:conversation|delivery))?|\/walkthrough|\/resources|\/shipping-sooner)$/.test(
      location
    ) && myTool !== "/field-tools";
  const links = inTool
    ? [
        [myTool, "Start"],
        [myTool.replace(/\/access$/, "/guide"), "Field Guide"],
        [myTool.replace(/\/access$/, "/lab"), "Lab"],
      ]
    : [
        ["/field-tools", "Field Tools"],
        [
          myTool === "/field-tools" ? "/field-tools/sign-in" : myTool,
          "Open your tool",
        ],
        ["https://rebel-leader.com", "Rebel Leaders ↗"],
      ];
  const items = links.map(([href, label]) => {
    const active =
      location === href ||
      (href.endsWith("/lab") &&
        (location.startsWith(`${href}/`) ||
          location === href.replace(/\/lab$/, "/shipping-sooner")));
    return href.startsWith("https://") ? (
      <a key={label} href={href}>
        {label}
      </a>
    ) : (
      <Link key={label} href={href} aria-current={active ? "page" : undefined}>
        {label}
      </Link>
    );
  });
  return (
    <header className="ft-nav relative z-40 print:hidden">
      <div className="ft-header-top">
        <Link href="/field-tools" className="ft-header-brand">
          <span className="ft-header-mark" aria-hidden="true">
            <RebelLogo size={64} />
          </span>
          <span className="ft-header-wordmark">
            REBEL LEADERS
            <small>
              FIELD TOOLS{tool ? ` / ${tool.name}` : " / THE COLLECTION"}
            </small>
          </span>
        </Link>
      </div>
      <nav aria-label="Field Tools" className="ft-header-tabs">
        {items}
      </nav>
    </header>
  );
}
