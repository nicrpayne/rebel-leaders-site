/*
 * EASTER EGG — Hidden Secret Component
 * A clickable element that, when discovered, reveals a hidden quote/commentary
 * and awards XP via the game system. Each egg has a unique ID.
 *
 * Modes:
 *   "click"   — click the trigger element to reveal
 *   "triple"  — triple-click to reveal
 *   "konami"  — type the Konami code to reveal
 *   "hover"   — hover for 3 seconds to reveal
 */

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/contexts/GameContext";

interface EasterEggProps {
  id: string;
  mode: "click" | "triple" | "konami" | "hover";
  quote: string;
  attribution?: string;
  children: ReactNode;
  className?: string;
}

export default function EasterEgg({ id, mode, quote, attribution, children, className = "" }: EasterEggProps) {
  const { trackEasterEgg, state } = useGame();
  const [revealed, setRevealed] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const alreadyFound = state.foundEggs.includes(id);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    if (revealed || alreadyFound) {
      // If already found, just toggle the quote display
      setShowQuote((v) => !v);
      return;
    }
    setRevealed(true);
    setShowQuote(true);
    trackEasterEgg(id);
  }, [revealed, alreadyFound, id, trackEasterEgg]);

  // Click handler
  const handleClick = useCallback(() => {
    if (mode === "click") {
      reveal();
    } else if (mode === "triple") {
      clickCount.current += 1;
      if (clickTimer.current) clearTimeout(clickTimer.current);
      if (clickCount.current >= 3) {
        clickCount.current = 0;
        reveal();
      } else {
        clickTimer.current = setTimeout(() => {
          clickCount.current = 0;
        }, 500);
      }
    }
  }, [mode, reveal]);

  // Hover handler
  const handleMouseEnter = useCallback(() => {
    if (mode !== "hover") return;
    hoverTimer.current = setTimeout(() => {
      reveal();
    }, 3000);
  }, [mode, reveal]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  // Konami code listener
  useEffect(() => {
    if (mode !== "konami") return;
    const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let index = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.key === sequence[index]) {
        index++;
        if (index === sequence.length) {
          reveal();
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, reveal]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`cursor-default ${mode === "click" || mode === "triple" ? "cursor-pointer" : ""}`}
        role={mode === "click" || mode === "triple" ? "button" : undefined}
        tabIndex={mode === "click" || mode === "triple" ? 0 : undefined}
        onKeyDown={(e) => {
          if ((mode === "click" || mode === "triple") && (e.key === "Enter" || e.key === " ")) {
            handleClick();
          }
        }}
      >
        {children}
      </span>

      {/* Revealed quote overlay */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-[280px] md:w-[320px]"
            style={{ top: "100%" }}
          >
            <div className="relative bg-forest-deep/98 border-2 border-gold/50 rounded-sm p-4 shadow-xl shadow-black/60">
              {/* Pixel corners */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-gold/40" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-gold/40" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-gold/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-gold/40" />

              {/* Secret badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">🥚</span>
                <span className="font-pixel text-[8px] text-gold tracking-widest uppercase">
                  Secret Found
                </span>
              </div>

              {/* Quote */}
              <p className="font-display text-sm text-parchment italic leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
              {attribution && (
                <p className="font-display text-xs text-parchment-dim/60 mt-1.5 text-right">
                  — {attribution}
                </p>
              )}

              {/* Close hint */}
              <button
                onClick={() => setShowQuote(false)}
                className="absolute top-1.5 right-2 font-pixel text-[8px] text-parchment-dim/40 hover:text-gold transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
