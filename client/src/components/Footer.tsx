export default function Footer() {
  return (
    <footer className="relative border-t border-[oklch(0.25_0.01_60/0.5)] py-16 md:py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-2xl md:text-3xl italic text-gold mb-8">
            "Hope is an act of rebellion."
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
            {[
              { label: "The Work", href: "#the-work" },
              { label: "Writing", href: "#writing" },
              { label: "About", href: "#about" },
              { label: "Join", href: "#join" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-ui text-xs tracking-widest uppercase text-parchment-dim hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="w-16 h-px mx-auto mb-8" style={{
            background: "linear-gradient(90deg, transparent, oklch(0.78 0.12 75 / 0.4), transparent)",
          }} />

          <p className="font-ui text-xs text-parchment-dim/50 tracking-wider">
            &copy; {new Date().getFullYear()} Rebel Leaders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
