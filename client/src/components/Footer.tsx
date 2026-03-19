import { Link } from "wouter";
import RebelLogo from "./RebelLogo";
import SubstackSignup from "./SubstackSignup";

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-wood/20 py-12 md:py-16 bg-forest-deep">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo icon */}
          <div className="flex justify-center mb-6">
            <RebelLogo size={36} className="text-gold/40" />
          </div>

          <p className="font-pixel text-[8px] md:text-[10px] text-gold/50 mb-6 leading-loose tracking-wider">
            "HOPE IS REBELLIOUS."
          </p>

          {/* Substack signup — compact inline */}
          <div className="max-w-xs mx-auto mb-8">
            <p className="font-pixel text-[6px] text-parchment-dim/30 tracking-wider mb-2">JOIN THE REBELLION</p>
            <SubstackSignup variant="inline" />
          </div>

          {/* Main nav links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6">
            {[
              { label: "The Study", href: "/" },
              { label: "The Map", href: "/manifesto" },
              { label: "Archives", href: "/archives" },
              { label: "The Shelf", href: "/shelf" },
              { label: "Residency", href: "/residency" },
              { label: "About", href: "/about" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-pixel text-[7px] text-parchment-dim/40 hover:text-gold transition-colors"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Secondary links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {[
              { label: "Start Here", href: "/start" },
              { label: "The Game", href: "/game" },
              { label: "The Mirror", href: "/mirror" },
              { label: "Workbench", href: "/workbench" },
              { label: "Community", href: "/community" },
              { label: "The Manuscript", href: "/book" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-pixel text-[6px] text-parchment-dim/25 hover:text-gold/60 transition-colors"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://www.youtube.com/@LeaderRebellion"
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[7px] text-parchment-dim/30 hover:text-gold transition-colors"
            >
              YOUTUBE
            </a>
            <a
              href="https://substack.com/@leaderrebellion"
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[7px] text-parchment-dim/30 hover:text-gold transition-colors"
            >
              SUBSTACK
            </a>
          </div>

          <div className="w-24 h-[2px] mx-auto mb-6 bg-wood/15" />

          <p className="font-pixel text-[6px] text-parchment-dim/25 tracking-wider">
            &copy; {new Date().getFullYear()} REBEL LEADERS
          </p>
          <p className="font-pixel text-[6px] text-parchment-dim/15 mt-2 tracking-wider">
            SAVE POINT REACHED. PROGRESS SAVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
