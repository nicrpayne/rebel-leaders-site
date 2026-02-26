/**
 * STANDALONE GAME STRIP — Full-Screen Recording Mode
 *
 * Hidden route at /game-standalone for recording the side-scroller
 * without the Manifesto page behind it. Features:
 *   - Full viewport canvas (not a thin strip)
 *   - Auto-scroll with Play/Pause controls
 *   - Countdown before auto-scroll starts
 *   - Speed control
 *   - No navigation, no page content — just the game
 *
 * The trick: ManifestoRunner reads scroll progress from the page.
 * We create a tall invisible div and programmatically scroll it.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import ManifestoRunner from "@/components/ManifestoRunner";

export default function GameStandalone() {
  const [state, setState] = useState<"ready" | "countdown" | "playing" | "paused" | "done">("ready");
  const [countdown, setCountdown] = useState(3);
  const [speed, setSpeed] = useState(1); // multiplier
  const [progress, setProgress] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const speedRef = useRef(speed);

  // Keep speedRef in sync
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // The page needs to be tall enough for scroll-driven animation to work.
  // ManifestoRunner reads window.scrollY / (scrollHeight - innerHeight).
  // We make the page ~50x viewport height for smooth scrolling.
  const PAGE_HEIGHT_MULTIPLIER = 50;

  // Track progress for the progress bar
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? window.scrollY / docH : 0;
      setProgress(p);
      if (p >= 0.995 && state === "playing") {
        setState("done");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [state]);

  // Auto-scroll logic
  const startAutoScroll = useCallback(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;

    // Scroll speed: complete the full scroll in ~60 seconds at 1x speed
    const baseDuration = 60000; // ms

    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      const currentProgress = window.scrollY / docH;
      if (currentProgress >= 0.998) {
        window.scrollTo(0, docH);
        setState("done");
        return;
      }

      // Pixels per ms at 1x speed
      const pxPerMs = docH / baseDuration;
      const scrollAmount = pxPerMs * dt * speedRef.current;
      window.scrollBy(0, scrollAmount);

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
    }
  }, []);

  // Handle state transitions
  useEffect(() => {
    if (state === "countdown") {
      setCountdown(3);
      const timer1 = setTimeout(() => setCountdown(2), 1000);
      const timer2 = setTimeout(() => setCountdown(1), 2000);
      const timer3 = setTimeout(() => {
        setState("playing");
      }, 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
    if (state === "playing") {
      startAutoScroll();
      return () => stopAutoScroll();
    }
    if (state === "paused") {
      stopAutoScroll();
    }
  }, [state, startAutoScroll, stopAutoScroll]);

  // Reset to top
  const handleReset = () => {
    stopAutoScroll();
    window.scrollTo(0, 0);
    setState("ready");
    setProgress(0);
  };

  return (
    <div
      ref={scrollerRef}
      className="relative bg-black"
      style={{ minHeight: `${PAGE_HEIGHT_MULTIPLIER * 100}vh` }}
    >
      {/* Fixed control overlay */}
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        {/* Progress bar */}
        <div className="w-full h-1 bg-black/50">
          <div
            className="h-full bg-[#60e0ff] transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Controls — only show when not in countdown */}
        {state !== "countdown" && (
          <div className="flex items-center justify-between px-4 py-2 pointer-events-auto">
            {/* Left: Play/Pause/Reset */}
            <div className="flex items-center gap-3">
              {state === "ready" && (
                <button
                  onClick={() => setState("countdown")}
                  className="font-pixel text-[10px] text-black bg-[#60e0ff] hover:bg-[#80f0ff] px-4 py-2 tracking-wider transition-colors"
                >
                  ▶ PLAY
                </button>
              )}
              {state === "playing" && (
                <button
                  onClick={() => setState("paused")}
                  className="font-pixel text-[10px] text-black bg-[#ffcc00] hover:bg-[#ffdd44] px-4 py-2 tracking-wider transition-colors"
                >
                  ⏸ PAUSE
                </button>
              )}
              {state === "paused" && (
                <button
                  onClick={() => setState("playing")}
                  className="font-pixel text-[10px] text-black bg-[#60e0ff] hover:bg-[#80f0ff] px-4 py-2 tracking-wider transition-colors"
                >
                  ▶ RESUME
                </button>
              )}
              {state === "done" && (
                <button
                  onClick={handleReset}
                  className="font-pixel text-[10px] text-black bg-[#60e0ff] hover:bg-[#80f0ff] px-4 py-2 tracking-wider transition-colors"
                >
                  ↺ REPLAY
                </button>
              )}
              {(state === "playing" || state === "paused") && (
                <button
                  onClick={handleReset}
                  className="font-pixel text-[10px] text-parchment/50 hover:text-parchment px-2 py-2 tracking-wider transition-colors"
                >
                  ↺ RESET
                </button>
              )}
            </div>

            {/* Right: Speed control */}
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[8px] text-parchment/40 tracking-wider">SPEED</span>
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`font-pixel text-[9px] px-2 py-1 tracking-wider transition-colors ${
                    speed === s
                      ? "text-black bg-[#60e0ff]"
                      : "text-parchment/40 hover:text-parchment"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Countdown overlay */}
      {state === "countdown" && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80">
          <div className="text-center">
            <div className="font-pixel text-[80px] text-[#60e0ff] animate-pulse">
              {countdown}
            </div>
            <div className="font-pixel text-[12px] text-parchment/40 mt-4 tracking-wider">
              RECORDING STARTS IN...
            </div>
          </div>
        </div>
      )}

      {/* Done overlay */}
      {state === "done" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 pointer-events-none">
          <div className="text-center">
            <div className="font-pixel text-[24px] text-[#ffcc00] tracking-wider">
              TUTORIAL COMPLETE
            </div>
            <div className="font-pixel text-[10px] text-parchment/40 mt-2 tracking-wider">
              Press REPLAY to go again
            </div>
          </div>
        </div>
      )}

      {/* The ManifestoRunner — it will read scroll progress from the page */}
      <ManifestoRunner standalone />
    </div>
  );
}
