import { useState, useEffect, useCallback, useRef } from "react";

interface TourStep {
  selector: string;
  title: string;
  description: string;
  popoverSide: "top" | "bottom" | "left" | "right";
  doneBtnText?: string;
  spotAdjust?: { left?: number; width?: number; top?: number; height?: number };
}

const STEPS: TourStep[] = [
  {
    selector: '[data-tour="codex-cartridge"]',
    title: "THE CARTRIDGE",
    description:
      "Each entry is a complete field protocol — a script, steps, and the psychology behind it. Click any cartridge to load it into the reader.",
    popoverSide: "top",
    spotAdjust: { left: -20, width: -30 },
  },
  {
    selector: '[data-tour="codex-controls"]',
    title: "SCAN",
    description:
      "Study the full protocol before you run it. Objective, script, steps, and the psychology behind it.",
    popoverSide: "left",
  },
  {
    selector: '[data-tour="codex-read"]',
    title: "READ",
    description:
      "Run the protocol in the field. A live checklist that tracks your progress through each step.",
    popoverSide: "left",
    doneBtnText: "ENTER ARCHIVE",
  },
];

const PAD = 12;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getRect(selector: string): Rect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  console.log(`[CodexTour] rect for "${selector}":`, { top: r.top, left: r.left, width: r.width, height: r.height });
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

interface CodexTourProps {
  onComplete: () => void;
}

export function CodexTour({ onComplete }: CodexTourProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [visible, setVisible] = useState(false);
  const [popoverReady, setPopoverReady] = useState(false);
  const rafRef = useRef<number | null>(null);

  const step = STEPS[stepIndex];

  const measureRect = useCallback(() => {
    if (!step) return;
    const r = getRect(step.selector);
    if (r) setRect(r);
    rafRef.current = requestAnimationFrame(measureRect);
  }, [step]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Scroll target into view first (no scroll lock yet)
    const el = document.querySelector(step.selector);
    if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "center" });
    // Lock scroll at settled position after scroll completes
    const lockedY = window.scrollY;
    const lockScroll = () => window.scrollTo(0, lockedY);
    window.addEventListener("scroll", lockScroll);
    setPopoverReady(false);
    rafRef.current = requestAnimationFrame(measureRect);
    const t = setTimeout(() => setPopoverReady(true), 100);
    return () => {
      clearTimeout(t);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", lockScroll);
    };
  }, [visible, measureRect, stepIndex, step.selector]);

  const handleNext = useCallback(() => {
    if (stepIndex < STEPS.length - 1) {
      setPopoverReady(false);
      setTimeout(() => setStepIndex((i) => i + 1), 80);
    } else {
      onComplete();
    }
  }, [stepIndex, onComplete]);

  const handleBack = useCallback(() => {
    if (stepIndex > 0) {
      setPopoverReady(false);
      setTimeout(() => setStepIndex((i) => i - 1), 80);
    }
  }, [stepIndex]);

  const handleClose = useCallback(() => onComplete(), [onComplete]);

  if (!step) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let clipPath = "none";
  let spotTop = 0, spotLeft = 0, spotRight = 0, spotBottom = 0;

  if (rect) {
    const adj = step.spotAdjust ?? {};
    spotTop    = Math.max(0, rect.top - PAD + (adj.top ?? 0));
    spotLeft   = Math.max(0, rect.left - PAD + (adj.left ?? 0));
    spotRight  = Math.min(vw, rect.left + rect.width + PAD + (adj.left ?? 0) + (adj.width ?? 0));
    spotBottom = Math.min(vh, rect.top + rect.height + PAD + (adj.top ?? 0) + (adj.height ?? 0));

    clipPath = `polygon(
      0px 0px, ${vw}px 0px, ${vw}px ${vh}px, 0px ${vh}px, 0px 0px,
      ${spotLeft}px ${spotTop}px,
      ${spotLeft}px ${spotBottom}px,
      ${spotRight}px ${spotBottom}px,
      ${spotRight}px ${spotTop}px,
      ${spotLeft}px ${spotTop}px
    )`;
  }

  const popoverWidth = 280;
  const popoverGap = 14;
  let popTop = 0, popLeft = 0;

  if (rect) {
    switch (step.popoverSide) {
      case "bottom":
        popTop  = spotBottom + popoverGap;
        popLeft = rect.left + rect.width / 2 - popoverWidth / 2;
        break;
      case "top":
        popTop  = spotTop - popoverGap - 160;
        popLeft = rect.left + rect.width / 2 - popoverWidth / 2;
        break;
      case "left":
        popTop  = rect.top + rect.height / 2 - 80;
        popLeft = spotLeft - popoverWidth - popoverGap;
        break;
      case "right":
        popTop  = rect.top + rect.height / 2 - 80;
        popLeft = spotRight + popoverGap;
        break;
    }
    popLeft = Math.max(12, Math.min(vw - popoverWidth - 12, popLeft));
    popTop  = Math.max(12, Math.min(vh - 220, popTop));
  }

  const isLast = stepIndex === STEPS.length - 1;

  return (
    <>
      {/* Dark overlay with cutout */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(0,0,0,0.75)",
          clipPath: (visible && rect) ? clipPath : undefined,
          pointerEvents: "none",
          transition: "clip-path 0.3s ease",
        }}
      />

      {/* Spotlight border — amber glow */}
      {visible && rect && (
        <div
          style={{
            position: "fixed",
            top: spotTop,
            left: spotLeft,
            width: spotRight - spotLeft,
            height: spotBottom - spotTop,
            zIndex: 9999,
            border: "1px solid rgba(196,148,60,0.5)",
            borderRadius: 3,
            boxShadow: "0 0 0 2px rgba(196,148,60,0.12), inset 0 0 12px rgba(196,148,60,0.05)",
            pointerEvents: "none",
            transition: "all 0.25s ease",
          }}
        />
      )}

      {/* Popover card */}
      {visible && rect && (
        <div
          style={{
            position: "fixed",
            top: popTop,
            left: popLeft,
            width: popoverWidth,
            zIndex: 10000,
            background: "#0c0a07",
            border: "1px solid #3d2e14",
            borderRadius: 3,
            boxShadow: "0 0 0 1px rgba(196,148,60,0.08), 0 16px 48px rgba(0,0,0,0.85)",
            overflow: "hidden",
            opacity: popoverReady ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#0f0c08",
              borderBottom: "1px solid #2a1f0a",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.24em",
                color: "#c4943c",
                textShadow: "0 0 8px rgba(196,148,60,0.35)",
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: "var(--font-pixel)",
              }}
            >
              {step.title}
            </span>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                color: "#3d2e14",
                cursor: "pointer",
                fontSize: 14,
                lineHeight: 1,
                padding: "0 0 0 8px",
                fontFamily: "monospace",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#7a5a20")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3d2e14")}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div
            style={{
              padding: "12px 14px 10px",
              fontSize: 13,
              lineHeight: 1.75,
              letterSpacing: "0.01em",
              color: "#8a7040",
              fontFamily: "var(--font-display)",
            }}
          >
            {step.description}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "10px 14px 12px",
              borderTop: "1px solid #2a1f0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 8, letterSpacing: "0.2em", color: "#3d2e14", fontFamily: "var(--font-pixel)" }}>
              {stepIndex + 1} / {STEPS.length}
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {stepIndex > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    background: "transparent",
                    border: "1px solid #2a1f0a",
                    color: "#5a4020",
                    borderRadius: 2,
                    padding: "5px 10px",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "var(--font-pixel)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3d2e14";
                    e.currentTarget.style.color = "#7a5a20";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2a1f0a";
                    e.currentTarget.style.color = "#5a4020";
                  }}
                >
                  ‹ BACK
                </button>
              )}
              <button
                onClick={handleNext}
                style={{
                  background: "#1a1005",
                  border: "1px solid #c4943c",
                  color: "#c4943c",
                  borderRadius: 2,
                  padding: "5px 10px",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "var(--font-pixel)",
                  boxShadow: "0 0 8px rgba(196,148,60,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#221507";
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(196,148,60,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#1a1005";
                  e.currentTarget.style.boxShadow = "0 0 8px rgba(196,148,60,0.08)";
                }}
              >
                {isLast ? (step.doneBtnText ?? "DONE") : "NEXT ›"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
