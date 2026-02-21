import RebelLogo from "./RebelLogo";

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

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            {[
              { label: "Quest Log", href: "#the-work" },
              { label: "Lore", href: "#writing" },
              { label: "Party", href: "#about" },
              { label: "Join", href: "#join" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-pixel text-[7px] text-parchment-dim/40 hover:text-gold transition-colors"
              >
                {item.label.toUpperCase()}
              </a>
            ))}
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
