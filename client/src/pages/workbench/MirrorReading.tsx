/**
 * MirrorReading — The Reading Display Page
 *
 * Renders the assembled Mirror reading in 6-7 sections.
 * Reads MirrorResult from localStorage, retrieves the content block,
 * and displays it with the CRT instrument aesthetic.
 *
 * Exits to:
 *   - /workbench/codex (with Mirror framing flags)
 *   - /workbench/results (back to Gravitas results)
 */

import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import PluginShell from "@/components/workbench/PluginShell";
import DesktopOnly from "@/components/workbench/DesktopOnly";
import { cn } from "@/lib/utils";
import {
  getReadingBlock,
  type MirrorResult,
  type ReadingBlock,
  type GravitasPrior,
} from "@/lib/mirror";
import SaveReadingPrompt from "@/components/workbench/SaveReadingPrompt";

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
  isPlaceholder?: boolean;
}

function ReadingSection({ label, content, index, isPlaceholder }: ReadingSectionProps) {
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
        <div className="w-1.5 h-1.5 rounded-full bg-green-800" />
        <h3 className="text-green-500/80 font-pixel text-[10px] tracking-[0.25em] uppercase">
          {label}
        </h3>
      </div>

      {/* Section content */}
      <div
        className={cn(
          "pl-5 border-l border-[#1a1a1a]",
          isContentPlaceholder ? "opacity-50" : "",
        )}
      >
        {isContentPlaceholder ? (
          <p className="text-green-900/60 text-sm font-mono leading-relaxed italic">
            This section is being written. Your reading will be richer when the content arrives.
          </p>
        ) : (
          <p className="text-green-300/80 text-sm font-mono leading-relaxed whitespace-pre-wrap">
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
    high: { label: "HIGH CONFIDENCE", color: "text-green-500", dot: "bg-green-500" },
    medium: { label: "MEDIUM CONFIDENCE", color: "text-amber-500", dot: "bg-amber-500" },
    low: { label: "BLENDED SIGNAL", color: "text-orange-500", dot: "bg-orange-500" },
  }[band] || { label: "SIGNAL", color: "text-green-500", dot: "bg-green-500" };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      <span className={cn("font-pixel text-[9px] tracking-widest", config.color)}>
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

    // Retrieve reading content
    const block = getReadingBlock(result);
    setReading(block);

    // Reveal with a brief delay for dramatic effect
    setTimeout(() => setIsRevealed(true), 400);
  }, [navigate]);

  // ─── Handle Codex Navigation ─────────────────────────────────────

  const buildCodexUrl = () => {
    if (!mirrorResult || !gravitasPrior) return null;

    const params = new URLSearchParams();
    params.set("archetype", gravitasPrior.archetype);
    params.set("leak", gravitasPrior.leak);
    params.set("force", gravitasPrior.force);

    // Mirror enrichments
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

    // Prefetch the Codex page module in the background
    const prefetchPromise = import("./Codex").then(() => {
      codexReadyRef.current = true;
    }).catch(() => {
      // If prefetch fails, we'll navigate anyway on the cap timer
    });

    // Minimum interstitial display: 1.2 seconds (so the copy lands emotionally)
    const minDisplayPromise = new Promise((resolve) => setTimeout(resolve, 1200));

    // Navigate when both the module is ready AND the minimum display has passed
    // Cap at 3 seconds regardless
    const capTimer = setTimeout(() => navigate(url), 3000);
    transitionTimerRef.current = capTimer;

    Promise.all([prefetchPromise, minDisplayPromise]).then(() => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      navigate(url);
    });
  };

  // ─── Render: Loading ─────────────────────────────────────────────

  if (!mirrorResult || !reading) {
    return (
      <DesktopOnly toolName="Mirror">
        <PluginShell title="MIRROR" category="READING" status="LOADING" statusColor="text-yellow-600">
          <div className="flex items-center justify-center h-64">
            <p className="text-green-900 font-pixel text-sm animate-pulse">
              LOADING READING...
            </p>
          </div>
        </PluginShell>
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

  // Add wisdom thread if present
  if (reading.wisdom_thread) {
    sections.push({ label: "A Thread Worth Pulling", content: reading.wisdom_thread });
  }

  return (
    <DesktopOnly toolName="Mirror">
      <PluginShell
        title="MIRROR"
        category="READING"
        status="COMPLETE"
        statusColor="text-green-500"
        footerControls={
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => navigate("/workbench/results")}
              className="text-[10px] font-pixel text-[#444] tracking-widest uppercase hover:text-[#666] transition-colors"
            >
              ← BACK TO GRAVITAS
            </button>
            <button
              onClick={handleSideChainToCodex}
              className={cn(
                "px-6 py-2 rounded-sm border transition-all duration-300",
                "bg-green-900/20 border-green-700/50 text-green-400",
                "hover:bg-green-900/40 hover:border-green-500/70 hover:text-green-300",
                "hover:shadow-[0_0_15px_rgba(74,222,128,0.15)]",
                "font-pixel text-[10px] tracking-widest uppercase",
              )}
            >
              SIDE-CHAIN TO CODEX →
            </button>
          </div>
        }
      >
        <div
          className={cn(
            "px-6 md:px-10 py-8 space-y-10 transition-opacity duration-700",
            isRevealed ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Header */}
          <div className="space-y-4 border-b border-[#1a1a1a] pb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-green-400 font-pixel text-sm tracking-widest uppercase">
                Your Mirror Reading
              </h2>
              <ConfidenceBadge band={mirrorResult.confidence_band} />
            </div>

            {/* Signal summary */}
            <div className="flex flex-wrap gap-4 text-[10px] font-pixel tracking-widest uppercase">
              {gravitasPrior && (
                <>
                  <span className="text-[#444]">
                    GRAVITAS: <span className="text-green-800">{gravitasPrior.archetype}</span>
                  </span>
                  <span className="text-[#333]">|</span>
                  <span className="text-[#444]">
                    LEAK: <span className="text-red-900">{gravitasPrior.leak}</span>
                  </span>
                  <span className="text-[#333]">|</span>
                  <span className="text-[#444]">
                    FORCE: <span className="text-green-800">{gravitasPrior.force}</span>
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
          <div className="border-t border-[#1a1a1a] pt-8 text-center space-y-4">
            <p className="text-green-300/60 text-sm font-mono leading-relaxed max-w-lg mx-auto">
              Mirror has named the pattern. The Codex holds the move.
            </p>
            <button
              onClick={handleSideChainToCodex}
              className={cn(
                "px-8 py-3 rounded-sm border transition-all duration-300",
                "bg-green-900/20 border-green-700/50 text-green-400",
                "hover:bg-green-900/40 hover:border-green-500/70 hover:text-green-300",
                "hover:shadow-[0_0_15px_rgba(74,222,128,0.15)]",
                "font-pixel text-sm tracking-widest uppercase",
              )}
            >
              Get Your Move
            </button>
          </div>
        </div>

        {/* Inline keyframes */}
        <style>{`
          @keyframes sectionFadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </PluginShell>

      {/* Codex Transition Interstitial */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: "#0a0a0a",
            animation: "interstitialFadeIn 0.5s ease-out",
          }}
        >
          <div className="text-center space-y-6" style={{ animation: "interstitialTextReveal 0.8s ease-out 0.3s backwards" }}>
            <p className="text-green-300/70 text-sm font-mono leading-relaxed max-w-md mx-auto">
              Mirror has named the pattern.
            </p>
            <p className="text-green-400/90 text-sm font-mono leading-relaxed max-w-md mx-auto">
              The Codex holds the move.
            </p>
            <div className="pt-4">
              <div className="w-16 h-[1px] bg-green-900/50 mx-auto" style={{ animation: "interstitialBarGrow 1.5s ease-in-out" }} />
            </div>
          </div>
        </div>
      )}

      <style>{`
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
