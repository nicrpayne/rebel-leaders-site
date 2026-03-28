/**
 * MirrorReading — The Reading Display Page
 *
 * Renders the assembled Mirror reading in 6-7 sections.
 * Reads MirrorResult from localStorage, retrieves the content block,
 * and displays it with the warm amber conservatory aesthetic.
 *
 * Exits to:
 *   - /workbench/codex (with Mirror framing flags)
 *   - /workbench/results (back to Gravitas results)
 *
 * Design: warm amber/parchment on dark background. Scrollable reading.
 */

import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import DesktopOnly from "@/components/workbench/DesktopOnly";
import { cn } from "@/lib/utils";
import {
  getReadingBlock,
  type MirrorResult,
  type ReadingBlock,
  type GravitasPrior,
} from "@/lib/mirror";
import SaveReadingPrompt from "@/components/workbench/SaveReadingPrompt";

// ─── Design Tokens ──────────────────────────────────────────────────

const AMBER = {
  bright: "#d4a853",
  warm: "#c5a059",
  muted: "#8b7340",
  glow: "rgba(197,160,89,0.4)",
  faintGlow: "rgba(197,160,89,0.15)",
};

const PARCHMENT = {
  light: "#e8dcc8",
  mid: "#d4c8b0",
  muted: "#a09080",
  faint: "#706050",
};

// ─── CDN Assets ─────────────────────────────────────────────────────

const BASIN_CLOSE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/5e5kxa7Hxu2DiYaSmWbPxb/mirror-basin-close_697b33ca.png";

// ─── Data Loaders ────────────────────────────────────────────────────

function loadMirrorResult(): MirrorResult | null {
  try {
    const raw = localStorage.getItem("mirrorResult");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function loadGravitasPrior(): GravitasPrior | null {
  try {
    const raw = localStorage.getItem("gravityCheckResults");
    if (!raw) return null;
    const data = JSON.parse(raw);
    return {
      archetype: data.archetype || "",
      leak: data.leak || "",
      force: data.force || "",
      identity: data.identity || 0,
      relationship: data.relationship || 0,
      vision: data.vision || 0,
      culture: data.culture || 0,
      total: data.total || 0,
    };
  } catch {
    return null;
  }
}

// ─── Reading Section Component ───────────────────────────────────────

interface ReadingSectionProps {
  label: string;
  content: string;
  index: number;
}

function ReadingSection({ label, content, index }: ReadingSectionProps) {
  const isContentPlaceholder = content.startsWith("[PLACEHOLDER");

  return (
    <div
      className="space-y-3"
      style={{
        animation: `sectionFadeIn 0.6s ease-out ${index * 200}ms backwards`,
      }}
    >
      {/* Section label */}
      <div className="flex items-center gap-3">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: AMBER.warm }}
        />
        <h3
          style={{ 
  fontFamily: "'Cormorant Garamond', serif", 
  fontSize: "18px", 
  letterSpacing: "0.25em", 
  color: AMBER.bright 
}}
        >
          {label}
        </h3>
      </div>

      {/* Section content */}
      <div
        className={cn(
          "pl-5 border-l",
          isContentPlaceholder ? "opacity-50" : "",
        )}
        style={{ borderColor: "rgba(197,160,89,0.15)" }}
      >
        {isContentPlaceholder ? (
          <p
            className="text-sm leading-relaxed italic"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: PARCHMENT.faint,
            }}
          >
            This section is being written. Your reading will be richer when the content arrives.
          </p>
        ) : (
          <p
            className="text-sm leading-relaxed whitespace-pre-wrap"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: PARCHMENT.mid,
            }}
          >
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Confidence Badge ────────────────────────────────────────────────

function ConfidenceBadge({ band }: { band: string }) {
  const config = {
    high: { label: "High Confidence", color: AMBER.bright, dot: AMBER.bright },
    medium: { label: "Medium Confidence", color: AMBER.warm, dot: AMBER.warm },
    low: { label: "Blended Signal", color: PARCHMENT.muted, dot: PARCHMENT.muted },
  }[band] || { label: "Signal", color: AMBER.warm, dot: AMBER.warm };
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.dot }}
      />
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "18px",
          letterSpacing: "0.15em",
          color: config.color,
        }}
      >
        {config.label}
      </span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────

export default function MirrorReading() {
  const [, navigate] = useLocation();
  const [mirrorResult, setMirrorResult] = useState<MirrorResult | null>(null);
  const [gravitasPrior, setGravitasPrior] = useState<GravitasPrior | null>(null);
  const [reading, setReading] = useState<ReadingBlock | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ─── Load Data ───────────────────────────────────────────────────

  useEffect(() => {
    const result = loadMirrorResult();
    const prior = loadGravitasPrior();

    if (!result) {
      navigate("/workbench/mirror");
      return;
    }

    setMirrorResult(result);
    setGravitasPrior(prior);

    const block = getReadingBlock(result);
    setReading(block);

    setTimeout(() => setIsRevealed(true), 400);
  }, [navigate]);

  // ─── Handle Codex Navigation ─────────────────────────────────────

  const buildCodexUrl = () => {
    if (!mirrorResult || !gravitasPrior) return null;

    const params = new URLSearchParams();
    params.set("archetype", gravitasPrior.archetype);
    params.set("leak", gravitasPrior.leak);
    params.set("force", gravitasPrior.force);

    if (mirrorResult.top_family) {
      params.set("mirrorFamily", mirrorResult.top_family);
    }
    if (mirrorResult.confidence_band) {
      params.set("mirrorConfidence", mirrorResult.confidence_band);
    }
    if (mirrorResult.codex_framing_flags.length > 0) {
      params.set("mirrorFraming", mirrorResult.codex_framing_flags.join(","));
    }
    if (mirrorResult.resistance_core_key) {
      params.set("mirrorResistance", mirrorResult.resistance_core_key);
    }
params.set("signal", "received");
params.set("bottleneck", gravitasPrior.leak.toUpperCase());
    return `/workbench/codex?${params.toString()}`;
  };

  const codexReadyRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSideChainToCodex = () => {
    if (!mirrorResult || !gravitasPrior) return;
    setIsTransitioning(true);
    codexReadyRef.current = false;

    const url = buildCodexUrl();
    if (!url) return;

    const prefetchPromise = import("./Codex").then(() => {
      codexReadyRef.current = true;
    }).catch(() => {});

    const minDisplayPromise = new Promise((resolve) => setTimeout(resolve, 1200));

    const capTimer = setTimeout(() => navigate(url), 3000);
    transitionTimerRef.current = capTimer;

    Promise.all([prefetchPromise, minDisplayPromise]).then(() => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      window.scrollTo(0, 0);
      navigate(url);
    });
  };

  // ─── Render: Loading ─────────────────────────────────────────────

  if (!mirrorResult || !reading) {
    return (
      <DesktopOnly toolName="Mirror">
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0c10" }}>
          <p
            className="font-pixel text-sm animate-pulse tracking-widest uppercase"
            style={{ color: AMBER.muted }}
          >
            LOADING READING...
          </p>
        </div>
      </DesktopOnly>
    );
  }

  // ─── Render: Reading ─────────────────────────────────────────────

  const sections = [
    { label: "What Mirror Sees", content: reading.opening_interpretation },
    { label: "What May Be Shaping This", content: reading.what_may_be_shaping_this },
    { label: "What Your Strength May Cover", content: reading.what_strength_may_cover },
    { label: "What This May Cost Others", content: reading.what_this_may_cost_others },
    { label: "What Kind of Move", content: reading.what_kind_of_move },
    { label: "Why This Is Hard", content: reading.why_this_is_hard },
  ];

  if (reading.wisdom_thread) {
    sections.push({ label: "A Thread Worth Pulling", content: reading.wisdom_thread });
  }

  return (
    <DesktopOnly toolName="Mirror">
      {/* Dark reading environment with subtle basin texture */}
      <div
        className="min-h-screen relative"
        style={{ backgroundColor: "#0a0c10", userSelect: "none"  }}
      >
        {/* Very faint basin background — just a hint of the conservatory */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${BASIN_CLOSE_URL})`,
            opacity: 0.06,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 py-12">
          {/* Top nav */}
          <div className="flex items-center justify-between mb-10">
            <button
              onClick={() => navigate("/workbench/results")}
              className="transition-colors duration-200"
style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "13px", color: PARCHMENT.faint }}
              onMouseEnter={(e) => { e.currentTarget.style.color = PARCHMENT.muted; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = PARCHMENT.faint; }}
            >
              ← BACK TO GRAVITAS
            </button>
            <span
  style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "13px",
    letterSpacing: "0.3em",
    color: AMBER.muted,
  }}
>
  Mirror · Reading
</span>
          </div>

          {/* Reading body */}
          <div
            className={cn(
              "space-y-10 transition-opacity duration-700",
              isRevealed ? "opacity-100" : "opacity-0",
            )}
          >
            {/* Header */}
            <div
              className="space-y-4 pb-6"
              style={{ borderBottom: `1px solid rgba(197,160,89,0.12)` }}
            >
              <div className="flex items-center justify-between">
                <h2
                  className="tracking-widest uppercase"
                  style={{ color: AMBER.bright, fontFamily: "'Cormorant Garamond', serif", fontSize: "24px"}}
                >
                  Your Mirror Reading
                </h2>
                <ConfidenceBadge band={mirrorResult.confidence_band} />
              </div>

              {/* Signal summary */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", letterSpacing: "0.15em" }}>
  {gravitasPrior && (
    <>
      <span style={{ color: PARCHMENT.faint }}>
        Gravitas: <span style={{ color: AMBER.muted }}>{gravitasPrior.archetype}</span>
      </span>
      <span style={{ color: "rgba(197,160,89,0.15)" }}>|</span>
      <span style={{ color: PARCHMENT.faint }}>
        Leak: <span style={{ color: "#8b4040" }}>{gravitasPrior.leak}</span>
      </span>
      <span style={{ color: "rgba(197,160,89,0.15)" }}>|</span>
      <span style={{ color: PARCHMENT.faint }}>
        Force: <span style={{ color: AMBER.muted }}>{gravitasPrior.force}</span>
      </span>
    </>
  )}
</div>
            </div>

            {/* Reading Sections */}
            <div className="space-y-8">
              {sections.map((section, idx) => (
                <ReadingSection
                  key={section.label}
                  label={section.label}
                  content={section.content}
                  index={idx}
                />
              ))}
            </div>

            {/* Save Reading Prompt */}
            <SaveReadingPrompt context="mirror" />

            {/* Bottom CTA */}
            <div
              className="pt-8 text-center space-y-4"
              style={{ borderTop: `1px solid rgba(197,160,89,0.12)` }}
            >
              <p
                className="text-sm leading-relaxed max-w-lg mx-auto"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: PARCHMENT.muted,
                }}
              >
                Mirror has named the pattern. The Codex holds the move.
              </p>
              <button
                onClick={handleSideChainToCodex}
                className="px-8 py-3 border transition-all duration-300 text-sm tracking-widest uppercase"
                style={{
                  color: AMBER.bright,
                  borderColor: AMBER.muted,
                  backgroundColor: "transparent",
                   fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.2em"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = AMBER.bright;
                  e.currentTarget.style.boxShadow = `0 0 15px ${AMBER.faintGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = AMBER.muted;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Get Your Move
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Codex Transition Interstitial */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: "#050505",
            animation: "interstitialFadeIn 0.5s ease-out",
          }}
        >
          <div
            className="text-center space-y-6"
            style={{ animation: "interstitialTextReveal 0.8s ease-out 0.3s backwards" }}
          >
            <p
              className="text-sm leading-relaxed max-w-md mx-auto"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PARCHMENT.muted,
              }}
            >
              Mirror has named the pattern.
            </p>
            <p
              className="text-sm leading-relaxed max-w-md mx-auto"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PARCHMENT.light,
              }}
            >
              The Codex holds the move.
            </p>
            <div className="pt-4">
              <div
                className="h-[1px] mx-auto"
                style={{
                  backgroundColor: AMBER.muted,
                  opacity: 0.4,
                  animation: "interstitialBarGrow 1.5s ease-in-out",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Inline keyframes */}
      <style>{`
        @keyframes sectionFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes interstitialFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes interstitialTextReveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes interstitialBarGrow {
          from { width: 0; }
          to { width: 4rem; }
        }
      `}</style>
    </DesktopOnly>
  );
}
