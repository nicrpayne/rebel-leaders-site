import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/workbench/codex-schema";
import { CODEX_ENTRIES } from "@/lib/workbench/codex-data";
import { getBestCartridge, type GravitasSignal, type RankingRationale } from "@/lib/workbench/codex-ranking";
import { codexAudio } from "@/lib/workbench/CodexAudio";
import CabinetDeck from "@/components/workbench/CabinetDeck";
import { useGame } from "@/contexts/GameContext";
import DesktopOnly from "@/components/workbench/DesktopOnly";
import { events } from "@/lib/analytics";

import { ReaderPanel } from "@/components/workbench/reader";
import CodexShelf from "@/components/workbench/CodexShelf";

/* ─────────────────────────────────────────────
   CODEX V5 — Full Cabinet Layout
   Hero image cabinet (pager bank + deck) on top,
   shelves below, all in one cohesive view.
   ───────────────────────────────────────────── */

interface GravitasScores {
  identity: number;
  relationship: number;
  vision: number;
  culture: number;
}

export default function Codex() {
  const { awardAchievement } = useGame();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [loadedEntry, setLoadedEntry] = useState<CodexEntry | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerMode, setReaderMode] = useState<"READ" | "RUN">("READ");
  const [recentEntryIds, setRecentEntryIds] = useState<string[]>([]);
  const [gravitasScores, setGravitasScores] = useState<GravitasScores | null>(null);
  const [isReceivingSignal, setIsReceivingSignal] = useState(false);
  const [bottleneckCategory, setBottleneckCategory] = useState<string | null>(null);
  const [firstMove, setFirstMove] = useState<string | null>(null);
  const [rankingRationale, setRankingRationale] = useState<RankingRationale | null>(null);
  const [gravitasSignalData, setGravitasSignalData] = useState<GravitasSignal | null>(null);

  // Mirror enrichment signals (read from URL params, stored for future use)
  const [mirrorFamily, setMirrorFamily] = useState<string | null>(null);
  const [mirrorConfidence, setMirrorConfidence] = useState<string | null>(null);
  const [mirrorFraming, setMirrorFraming] = useState<string[]>([]);
  const [mirrorResistance, setMirrorResistance] = useState<string | null>(null);

  // Load recent entries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("codexRecentEntries");
      if (saved) setRecentEntryIds(JSON.parse(saved));
    } catch {}
  }, []);

  // Save recent entries when they change
  const addToRecent = (entryId: string) => {
    setRecentEntryIds((prev) => {
      const updated = [entryId, ...prev.filter((id) => id !== entryId)].slice(0, 5);
      localStorage.setItem("codexRecentEntries", JSON.stringify(updated));
      return updated;
    });
  };

  // Load GRAVITAS Results & Signal Handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const signal = params.get("signal");

    // Parse Mirror enrichment params (if arriving from Mirror reading)
    const mirrorFamilyParam = params.get("mirrorFamily");
    const mirrorConfidenceParam = params.get("mirrorConfidence");
    const mirrorFramingParam = params.get("mirrorFraming");
    const mirrorResistanceParam = params.get("mirrorResistance");
    if (mirrorFamilyParam) setMirrorFamily(mirrorFamilyParam);
    if (mirrorConfidenceParam) setMirrorConfidence(mirrorConfidenceParam);
    if (mirrorFramingParam) setMirrorFraming(mirrorFramingParam.split(","));
    if (mirrorResistanceParam) setMirrorResistance(mirrorResistanceParam);
    if (mirrorFamilyParam) {
      console.log("[Codex] Mirror signal received:", {
        family: mirrorFamilyParam,
        confidence: mirrorConfidenceParam,
        framing: mirrorFramingParam,
        resistance: mirrorResistanceParam,
      });
    }
    const bottleneck = params.get("bottleneck");
    const firstMoveParam = params.get("firstMove");

    // Read localStorage once — reused by both signal path and scores path below
    const savedResults = localStorage.getItem("gravityCheckResults");

    if (signal === "received") {
      window.scrollTo(0, 0);
      setIsReceivingSignal(true);
      setBottleneckCategory(bottleneck);
      if (firstMoveParam) setFirstMove(decodeURIComponent(firstMoveParam));
      import("@/lib/workbench/CodexAudio").then(({ codexAudio }) => {
        codexAudio.playLoad();
      });

      if (bottleneck) {
        // Build a GravitasSignal from stored results + URL params
        let gravitasSignal: GravitasSignal | null = null;
        if (savedResults) {
          try {
            const r = JSON.parse(savedResults);
            gravitasSignal = {
              identity: r.identity ?? 3,
              relationship: r.relationship ?? 3,
              vision: r.vision ?? 3,
              culture: r.culture ?? 3,
              leak: bottleneck,
              force: r.force ?? "",
              firstMove: firstMoveParam ? decodeURIComponent(firstMoveParam) : (r.firstMove ?? ""),
              total: r.total ?? 12,
            };
          } catch {}
        }

        // Use ranking function if we have a full signal, otherwise fall back
        let targetEntry: CodexEntry;
        if (gravitasSignal) {
          const best = getBestCartridge(CODEX_ENTRIES, gravitasSignal);
          targetEntry = best ? best.entry : CODEX_ENTRIES[0];
          // Store rationale for pager telemetry + log for debugging
          if (best) {
            setRankingRationale(best.rationale);
            console.log("[Codex Ranking] Top cartridge:", best.entry.title, "Score:", best.score);
            console.log("[Codex Ranking] Rationale:", best.rationale);
          }
          setGravitasSignalData(gravitasSignal);
        } else {
          // Fallback: simple bottleneck mapping if no stored results
          let targetId = "";
          switch (bottleneck) {
            case "IDENTITY": targetId = "MOVE_NAME_THE_COST"; break;
            case "RELATIONSHIP": targetId = "MOVE_REPAIR_48H"; break;
            case "VISION": targetId = "MOVE_STOP_LIST"; break;
            case "CULTURE": targetId = "MOVE_MEETING_REWRITE"; break;
            default: targetId = "MOVE_REPAIR_48H";
          }
          targetEntry = CODEX_ENTRIES.find((e) => e.id === targetId) || CODEX_ENTRIES[0];
        }
        setTimeout(() => {
          window.scrollTo(0, 0);
          handleLoad(targetEntry);
          setIsReceivingSignal(false);
        }, 3000);
      } else {
        setTimeout(() => setIsReceivingSignal(false), 2500);
      }
      // Clear signal params but preserve any existing hash
      window.history.replaceState({}, "", `/workbench/codex${window.location.hash}`);
    }

    // Parse GRAVITAS scores (reuses savedResults from above)
    if (savedResults) {
      try {
        const results = JSON.parse(savedResults);
        setGravitasScores({
          identity: results.identity,
          relationship: results.relationship,
          vision: results.vision,
          culture: results.culture,
        });
        // Find bottleneck
        const scores = [
          { category: "Identity", score: results.identity },
          { category: "Relationship", score: results.relationship },
          { category: "Vision", score: results.vision },
          { category: "Culture", score: results.culture },
        ];
        scores.sort((a, b) => a.score - b.score);
        setBottleneckCategory(scores[0].category);
      } catch {
        setGravitasScores(null);
      }
    }
  }, []);

  // Sound Effects — static import, no async delay
  const scanStopRef = useRef<(() => void) | null>(null);
  const playSound = (type: "load" | "eject" | "click" | "buttonPress" | "buttonRelease" | "scanTone" | "scanComplete") => {
    switch (type) {
      case "load": codexAudio.playLoad(); break;
      case "eject": codexAudio.playEject(); break;
      case "click": codexAudio.playClick(); break;
      case "buttonPress": codexAudio.playButtonPress(); break;
      case "buttonRelease": codexAudio.playButtonRelease(); break;
      case "scanTone":
        if (scanStopRef.current) scanStopRef.current();
        scanStopRef.current = codexAudio.playScanTone(2.6);
        break;
      case "scanComplete":
        if (scanStopRef.current) { scanStopRef.current(); scanStopRef.current = null; }
        codexAudio.playScanComplete();
        break;
    }
  };

  // Initialize Audio Context on first interaction
  useEffect(() => {
    const initAudio = () => {
      codexAudio.resume();
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
    window.addEventListener("click", initAudio);
    window.addEventListener("keydown", initAudio);
    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
  }, []);

  // Interaction Handlers
  const handleLoad = (entry: CodexEntry) => {
    events.codexLoaded(entry.id, isReceivingSignal);
    setLoadedEntry(entry);
    addToRecent(entry.id);
    playSound("load");
    // Persist entry ID in URL hash so refresh restores state
    window.history.replaceState({}, "", `/workbench/codex#${entry.id}`);
  };

  const handleEject = () => {
    setLoadedEntry(null);
    setIsReaderOpen(false);
    playSound("eject");
    // Clear hash on eject
    window.history.replaceState({}, "", "/workbench/codex");
  };

  const handleRead = () => {
    if (loadedEntry) {
      setReaderMode("READ");
      setIsReaderOpen(true);
      playSound("buttonRelease"); // device mechanical click
      // Award "Protocol Officer" achievement on first protocol read
      awardAchievement("protocol-officer");
    }
  };

  const handleRun = () => {
    if (loadedEntry) {
      setReaderMode("RUN");
      setIsReaderOpen(true);
    }
  };

  return (
    <DesktopOnly toolName="The Codex">
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-amber-900 selection:text-amber-50">
      <div className="w-full max-w-6xl mx-auto">

        {/* ── CABINET DECK (Hero image with overlays) ── */}
        <CabinetDeck
          loadedEntry={loadedEntry}
          onEject={handleEject}
          onRead={handleRead}
          onRun={handleRun}
          playSound={playSound}
          isReaderOpen={isReaderOpen}
          gravitasScores={gravitasScores}
          isReceivingSignal={isReceivingSignal}
          bottleneckCategory={bottleneckCategory}
          firstMove={firstMove}
          rankingRationale={rankingRationale}
          gravitasSignalData={gravitasSignalData}
        />

        {/* ── SHELVES (directly below cabinet, no gap) ── */}
        <div className={cn(
          "relative -mt-1 transition-all duration-500",
          isReaderOpen ? "opacity-40 pointer-events-none blur-[1px]" : "opacity-100"
        )}>
          <CodexShelf
            entries={CODEX_ENTRIES}
            loadedEntryId={loadedEntry?.id || null}
            onLoad={handleLoad}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            recentEntryIds={recentEntryIds}
          />
        </div>
      </div>

      {/* ── GRAVITAS FOOTER LINK ── */}
      <div className="w-full flex items-center justify-center gap-8 py-6 pb-10">
        <a
          href="/workbench"
          style={{ color: "rgba(160, 160, 180, 0.4)", fontFamily: "'VT323', monospace", fontSize: "13px", letterSpacing: "0.25em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(160, 160, 180, 0.8)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(160, 160, 180, 0.4)")}
        >
          WORKBENCH
        </a>
        <span style={{ color: "rgba(100, 100, 120, 0.3)", fontFamily: "'VT323', monospace", fontSize: "13px" }}>|</span>
        <a
          href="/workbench/gravitas"
          style={{ color: "rgba(197, 160, 89, 0.4)", fontFamily: "'VT323', monospace", fontSize: "13px", letterSpacing: "0.25em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(197, 160, 89, 0.85)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(197, 160, 89, 0.4)")}
        >
          RUN GRAVITAS
        </a>
      </div>

      {/* ── READER PANEL (Lantern Panel) ── */}
      {loadedEntry && (
        <ReaderPanel
          entry={loadedEntry}
          isOpen={isReaderOpen}
          onClose={() => {
            setIsReaderOpen(false);
            // Keep hash (entry stays loaded in deck) but could clear if desired
          }}
          initialMode={readerMode}
          skipEnterAnimation={false}
        />
      )}
    </div>
    </DesktopOnly>
  );
}
