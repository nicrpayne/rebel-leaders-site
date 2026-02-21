import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RebelLogo from "./RebelLogo";

const navItems = [
  { label: "Quest Log", href: "#the-work" },
  { label: "Lore", href: "#writing" },
  { label: "Party", href: "#about" },
  { label: "Join", href: "#join" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-forest-deep/95 backdrop-blur-sm border-b-2 border-wood/30"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-14 md:h-16">
          {/* Logo icon + text */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-gold hover:text-parchment transition-colors duration-300"
          >
            <RebelLogo size={28} withText />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="font-pixel text-[8px] text-parchment-dim hover:text-gold transition-colors relative group"
              >
                {item.label.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-200" />
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-parchment hover:text-gold transition-colors font-pixel text-[8px]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? "[X]" : "[=]"}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-forest-deep/98 flex flex-col items-center justify-center gap-8"
          >
            {/* Logo in mobile menu */}
            <div className="text-gold mb-4">
              <RebelLogo size={48} />
            </div>

            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                onClick={() => scrollTo(item.href)}
                className="font-pixel text-sm text-parchment hover:text-gold transition-colors"
              >
                {">"} {item.label.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
