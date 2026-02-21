import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import RebelLogo from "./RebelLogo";

const navItems = [
  { label: "The Map", href: "/manifesto" },
  { label: "Archives", href: "/archives" },
  { label: "The Shelf", href: "/shelf" },
  { label: "Residency", href: "/residency" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-forest-deep/95 backdrop-blur-sm border-b-2 border-wood/30"
            : "bg-forest-deep/70 backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between h-14 md:h-16">
          {/* Logo — always links home */}
          <Link
            href="/"
            className="text-gold hover:text-parchment transition-colors duration-300"
          >
            <RebelLogo size={28} withText />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-pixel text-[8px] transition-colors relative group ${
                  location === item.href
                    ? "text-gold"
                    : "text-parchment-dim hover:text-gold"
                }`}
              >
                {item.label.toUpperCase()}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-200 ${
                    location === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/start"
              className="font-pixel text-[8px] text-forest-deep bg-gold/80 hover:bg-gold px-3 py-1.5 tracking-wider transition-all duration-300"
            >
              NEW PLAYER
            </Link>
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
            className="fixed inset-0 z-40 bg-forest-deep/98 flex flex-col items-center justify-center gap-6"
          >
            <div className="text-gold mb-4">
              <RebelLogo size={48} />
            </div>

            {/* Home link */}
            <Link
              href="/"
              className="font-pixel text-sm text-parchment hover:text-gold transition-colors"
            >
              {">"} THE STUDY
            </Link>

            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`font-pixel text-sm transition-colors ${
                    location === item.href
                      ? "text-gold"
                      : "text-parchment hover:text-gold"
                  }`}
                >
                  {">"} {item.label.toUpperCase()}
                </Link>
              </motion.div>
            ))}

            {/* Secondary links in mobile */}
            <div className="mt-6 pt-6 border-t border-wood/20 flex flex-col items-center gap-4">
              <p className="font-pixel text-[7px] text-parchment-dim/40 tracking-wider">SIDE QUESTS</p>
              {[
                { label: "Start Here", href: "/start" },
                { label: "The Game", href: "/game" },
                { label: "The Mirror", href: "/mirror" },
                { label: "The Armory", href: "/armory" },
                { label: "Community", href: "/community" },
                { label: "The Manuscript", href: "/book" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-pixel text-[9px] text-parchment-dim/50 hover:text-gold transition-colors"
                >
                  {item.label.toUpperCase()}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
