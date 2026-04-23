import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { FIRST_MOVE_CONTEXT, FIRST_MOVE_TO_CARTRIDGE, DELTA_FIELD_NOTES, getDeltaNoteIndex, PRAXIS_REPS } from "@/lib/praxis-data";

const BG_IMAGE = "https://pub-26b8c09d5ff84d568bb62f776d03c004.r2.dev/Praxis%20Plugin/Praxis%20Final%20Interactive%20Upscaled%202x.png";

const AMBIENT_LIGHTS: { left: string; top: string; duration: number; delay: number }[] = [];

const PANEL: React.CSSProperties = {
  position: "absolute",
  left: "31%",
  top: "13%",
  width: "37%",
  height: "61%",
  padding: "3px",
  overflowY: "auto",
  boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)",
};

const PRAXIS_INTRO_KEY = "praxis_intro_seen";

const IS_DEV = typeof window !== "undefined" && window.location.hostname === "localhost";

const MOCK_SEASON = {
  id: 999,
  cartridgeId: "MOVE_TRUTH_WEATHER",
  firstMove: "THE OXYGEN PROTOCOL",
  seasonThesis: "This season I am practicing honest weather.",
  witnessEmail: null as null,
  lockedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  status: "active" as const,
  reflections: [] as any[],
};

const MOCK_ASSESSMENT = {
  archetype: "COMPENSATION ORBIT",
  leak: "VISION",
  force: "IDENTITY",
  firstMove: "THE WEIGHT REDISTRIBUTION",
  dimensionScores: { identity: 3.6, relationship: 3.2, vision: 2.8, culture: 3.1 },
  sessionNumber: 1,
  createdAt: new Date(),
};

const MOCK_DELTA = {
  identityDelta: "0.4",
  relationshipDelta: "-0.3",
  visionDelta: "0.7",
  cultureDelta: "0.1",
  archetypeShift: false,
  leakShift: true,
  previousArchetype: "FRICTION BELT",
  currentArchetype: "COMPENSATION ORBIT",
  previousLeak: "RELATIONSHIP",
  currentLeak: "VISION",
  previousDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  currentDate: new Date(),
};

type DevScreen = "1a" | "1b" | "2" | "3" | null;

export default function Praxis() {
  const [, navigate] = useLocation();
  const [introSeen, setIntroSeen] = useState<boolean>(() => {
    try { return localStorage.getItem(PRAXIS_INTRO_KEY) === "complete"; } catch { return false; }
  });
  const handleIntroEnter = useCallback(() => {
    try { localStorage.setItem(PRAXIS_INTRO_KEY, "complete"); } catch {}
    setIntroSeen(true);
  }, []);

  const [devScreen, setDevScreen] = useState<DevScreen>(null);

  const { data: currentUser } = trpc.auth.me.useQuery();
  const { data: praxisState, isLoading, refetch } = trpc.auth.getPraxisState.useQuery(
    undefined,
    { enabled: !!currentUser }
  );

  const lockMutation = trpc.auth.lockPraxisSeason.useMutation({
    onSuccess: () => refetch(),
  });

  // Dev overrides — local only, no DB
  let panelContent: React.ReactNode;
  if (IS_DEV && devScreen === "1a") {
    panelContent = (
      <LockScreen
        latestAssessment={MOCK_ASSESSMENT}
        onLock={() => {}}
        locking={false}
      />
    );
  } else if (IS_DEV && devScreen === "1b") {
    panelContent = <ActiveScreen season={MOCK_SEASON} />;
  } else if (IS_DEV && devScreen === "2") {
    panelContent = <ReflectionRoom season={MOCK_SEASON} onBack={() => setDevScreen("1b")} isDev />;
  } else if (IS_DEV && devScreen === "3") {
    panelContent = <ComparatorScreen delta={MOCK_DELTA} latestAssessment={praxisState?.latestAssessment ?? null} />;
  } else if (!currentUser) {
    panelContent = <PanelMessage text="Sign in to access Praxis" />;
  } else if (isLoading || !praxisState) {
    panelContent = <PanelMessage text="Reading field…" />;
  } else {
    const { activeSeason, latestAssessment, latestDelta } = praxisState;
    let screen: "lock" | "active" | "compare";
    if (!activeSeason) {
      screen = "lock";
    } else if (latestDelta) {
      screen = "compare";
    } else {
      screen = "active";
    }
    if (screen === "lock") {
      panelContent = (
        <LockScreen
          latestAssessment={latestAssessment}
          onLock={(cartridgeId, firstMove, sessionNumber) =>
            lockMutation.mutate({ cartridgeId, firstMove, sessionNumberAtLock: sessionNumber })
          }
          locking={lockMutation.isPending}
        />
      );
    } else if (screen === "active" && activeSeason) {
      panelContent = <ActiveScreen season={activeSeason} />;
    } else if (screen === "compare" && activeSeason && latestDelta) {
      panelContent = <ComparatorScreen delta={latestDelta} latestAssessment={latestAssessment} />;
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#0a0a0d" }}>
      {!introSeen && <PraxisWelcome onEnter={handleIntroEnter} />}

      {IS_DEV && (
        <DevPanel
          current={devScreen}
          onSelect={setDevScreen}
        />
      )}

      {/* Instrument — fills viewport via object-fit: cover */}
      <motion.div
        data-praxis-container
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Background image */}
        <img
          src={BG_IMAGE}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          onError={(e) => console.error("[Praxis] Image failed to load:", (e.target as HTMLImageElement).src)}
        />

        {/* Screen panel — content depends on auth/state */}
        <div data-praxis-overlay style={PANEL}>
          {panelContent}
        </div>

        {/* Ambient light pulses over indicator LEDs */}
        {AMBIENT_LIGHTS.map((light, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: light.left,
              top: light.top,
              transform: "translate(-50%, -50%)",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #c4943c 0%, rgba(196,148,60,0.3) 70%, transparent 100%)",
              animation: `ambientPulse ${light.duration}s ease-in-out ${light.delay}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Sticky note overlay */}
        <img
          src="https://pub-26b8c09d5ff84d568bb62f776d03c004.r2.dev/Praxis%20Plugin/praxis_navigation_lined_strip_v2-removebg.png"
          alt=""
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "90%",
            width: "14%",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Knob 1 — Navigate (DEV: red hitbox visible) */}
        <div
          onClick={() => console.log('NAVIGATE clicked')}
          style={{
            position: "absolute",
            left: "44.53%",
            top: "84.8%",
            width: "40px",
            height: "40px",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            border: "2px solid red",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 10,
          }}
        />

        {/* Knob 2 — Commit */}
        <div
          onClick={() => console.log('COMMIT clicked')}
          style={{
            position: "absolute",
            left: "49.56%",
            top: "84.8%",
            width: "40px",
            height: "40px",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            border: "2px solid red",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 10,
          }}
        />

        {/* Knob 3 — Return */}
        <div
          onClick={() => console.log('RETURN clicked')}
          style={{
            position: "absolute",
            left: "54.59%",
            top: "84.8%",
            width: "40px",
            height: "40px",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            border: "2px solid red",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 10,
          }}
        />

        {/* Knob 4 — Power */}
        <div
          onClick={() => console.log('POWER clicked')}
          style={{
            position: "absolute",
            left: "58.2%",
            top: "84.8%",
            width: "40px",
            height: "40px",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            border: "2px solid red",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 10,
          }}
        />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Shared: Panel message (auth / loading states)
// ─────────────────────────────────────────────────

function PanelMessage({ text }: { text: string }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.88) 22%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "8%" }}>
      <p style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(7px, 1.2cqw, 11px)", letterSpacing: "0.25em", color: "#4a5e4c", textTransform: "uppercase", textAlign: "center", margin: 0 }}>
        {text}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Screen 1a — Lock Screen
// ─────────────────────────────────────────────────

interface LockScreenProps {
  latestAssessment: { firstMove: string; sessionNumber: number } | null;
  onLock: (cartridgeId: string, firstMove: string, sessionNumber: number) => void;
  locking: boolean;
}

function LockScreen({ latestAssessment, onLock, locking }: LockScreenProps) {
  const firstMove = latestAssessment?.firstMove ?? null;
  const sessionNumber = latestAssessment?.sessionNumber ?? 1;
  const ctx = firstMove ? FIRST_MOVE_CONTEXT.find(c => c.firstMove === firstMove) : null;
  const cartridgeId = firstMove ? FIRST_MOVE_TO_CARTRIDGE[firstMove] : null;
  const rep = cartridgeId ? PRAXIS_REPS[cartridgeId] : null;

  const panelBg: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.88) 22%)",
    padding: "10% 8%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  };

  if (!firstMove || !ctx) {
    return (
      <div style={panelBg}>
        <p style={{ fontFamily: "'Courier New', monospace", fontSize: "1.2cqw", letterSpacing: "0.25em", color: "#4a5e4c", textTransform: "uppercase", margin: 0 }}>
          Run Gravitas first to unlock Praxis.
        </p>
      </div>
    );
  }

  return (
    <div style={panelBg}>
      {/* Header */}
      <div>
        <p style={{ margin: "0 0 4% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(6px, 1.1cqw, 10px)", letterSpacing: "0.35em", color: "#b8860b", textTransform: "uppercase" }}>
          Praxis — Season Ready
        </p>
        <p style={{ margin: "0 0 2% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(7px, 1.5cqw, 13px)", letterSpacing: "0.2em", color: "#d4a853", textTransform: "uppercase", fontWeight: "bold", lineHeight: 1.2 }}>
          {firstMove}
        </p>
        <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(7px, 1.2cqw, 11px)", fontStyle: "italic", color: "#6a7e6c", lineHeight: 1.5 }}>
          {ctx.seasonSummary}
        </p>
      </div>

      {/* Intent */}
      <div>
        <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(6px, 1.05cqw, 10px)", color: "#4a5e4c", lineHeight: 1.6 }}>
          {ctx.intent}
        </p>
      </div>

      {/* Rep preview */}
      {rep && (
        <div style={{ borderTop: "1px solid #1a2a1a", paddingTop: "4%", marginTop: "2%" }}>
          <p style={{ margin: "0 0 2% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(5px, 0.9cqw, 8px)", letterSpacing: "0.3em", color: "#4a5e4c", textTransform: "uppercase" }}>
            Day 1 Rep
          </p>
          <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(6px, 1.05cqw, 10px)", color: "#6a7e6c", lineHeight: 1.5 }}>
            {rep.day1}
          </p>
        </div>
      )}

      {/* Lock button */}
      <button
        onClick={() => cartridgeId && onLock(cartridgeId, firstMove, sessionNumber)}
        disabled={locking || !cartridgeId}
        style={{
          marginTop: "4%",
          background: "none",
          border: "1px solid #b8860b",
          borderRadius: 2,
          padding: "4% 6%",
          cursor: locking ? "default" : "pointer",
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(5px, 1cqw, 9px)",
          letterSpacing: "0.3em",
          color: locking ? "#4a5e4c" : "#d4a853",
          textTransform: "uppercase",
          opacity: locking ? 0.5 : 1,
          transition: "opacity 0.15s",
        }}
      >
        {locking ? "Locking…" : "Begin This Season →"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Screen 1b — Active Season (stub)
// ─────────────────────────────────────────────────

function ActiveScreen({ season }: { season: any }) {
  const rep = PRAXIS_REPS[season.cartridgeId];
  const ctx = FIRST_MOVE_CONTEXT.find(c => c.firstMove === season.firstMove);

  const panelBg: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.88) 22%)",
    padding: "10% 8%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  };

  return (
    <div style={panelBg}>
      <div>
        <p style={{ margin: "0 0 4% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(6px, 1.1cqw, 10px)", letterSpacing: "0.35em", color: "#4ade80", textTransform: "uppercase" }}>
          Season Active
        </p>
        <p style={{ margin: "0 0 2% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(7px, 1.5cqw, 13px)", letterSpacing: "0.2em", color: "#d4a853", textTransform: "uppercase", fontWeight: "bold", lineHeight: 1.2 }}>
          {season.firstMove}
        </p>
        {ctx && (
          <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(6px, 1.05cqw, 10px)", fontStyle: "italic", color: "#6a7e6c", lineHeight: 1.5 }}>
            {ctx.seasonSummary}
          </p>
        )}
      </div>

      {rep && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4%", marginTop: "6%" }}>
          {[{ label: "Day 1", text: rep.day1 }, { label: "Day 7", text: rep.day7 }, { label: "Day 14", text: rep.day14 }].map(({ label, text }) => (
            <div key={label}>
              <p style={{ margin: "0 0 1.5% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(5px, 0.9cqw, 8px)", letterSpacing: "0.3em", color: "#b8860b", textTransform: "uppercase" }}>
                {label}
              </p>
              <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(6px, 1cqw, 9px)", color: "#6a7e6c", lineHeight: 1.5 }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      )}

      {rep && (
        <div style={{ borderTop: "1px solid #1a2a1a", paddingTop: "4%", marginTop: "2%" }}>
          <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(6px, 0.95cqw, 9px)", fontStyle: "italic", color: "#4a5e4c", lineHeight: 1.5 }}>
            {rep.rootNote}
          </p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────
// Screen 2 — Reflection Room
// ─────────────────────────────────────────────────

const REFLECTION_PROMPTS = [
  "WHAT HAPPENED?",
  "WHAT RESISTED YOU?",
  "WHAT SURPRISED YOU?",
  "DID THE FIELD SHIFT?",
] as const;

interface ReflectionRoomProps {
  season: any;
  onBack: () => void;
  isDev?: boolean;
}

function ReflectionRoom({ season, onBack, isDev }: ReflectionRoomProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const panelBg: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.88) 22%)",
    padding: "8% 7% 6%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "3%",
    overflow: "hidden",
  };

  const taStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,0,0,0.55)",
    border: "1px solid rgba(196,148,60,0.3)",
    borderRadius: 1,
    color: "#c8b898",
    fontFamily: "Georgia, serif",
    fontSize: "clamp(6px, 1cqw, 9px)",
    lineHeight: 1.5,
    padding: "4px 6px",
    resize: "none",
    outline: "none",
    rows: 3,
  } as React.CSSProperties;

  const btnBase: React.CSSProperties = {
    flex: 1,
    background: "transparent",
    border: "1px solid rgba(196,148,60,0.35)",
    borderRadius: 1,
    color: "rgba(196,148,60,0.7)",
    fontFamily: "var(--font-pixel)",
    fontSize: "clamp(4px, 0.75cqw, 7px)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "5px 3px",
    cursor: "pointer",
  };

  function handleAction(mode: "private" | "witness" | "wall") {
    if (isDev) {
      console.log("[Dev] ReflectionRoom submit:", mode, answers);
      onBack();
      return;
    }
    // TODO: wire tRPC saveReflection
  }

  return (
    <div style={panelBg}>
      <p style={{ margin: 0, fontFamily: "var(--font-pixel)", fontSize: "clamp(5px, 0.9cqw, 8px)", letterSpacing: "0.3em", color: "#b8860b", textTransform: "uppercase" }}>
        REFLECTION ROOM — CLOSE THE LOOP
      </p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4%", overflow: "hidden" }}>
        {REFLECTION_PROMPTS.map((prompt) => (
          <div key={prompt} style={{ display: "flex", flexDirection: "column", gap: "2%" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-pixel)", fontSize: "clamp(4px, 0.7cqw, 6px)", letterSpacing: "0.25em", color: "#4a5e4c", textTransform: "uppercase" }}>
              {prompt}
            </p>
            <textarea
              rows={2}
              value={answers[prompt] ?? ""}
              onChange={(e) => setAnswers(prev => ({ ...prev, [prompt]: e.target.value }))}
              style={taStyle}
              placeholder=""
            />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "3%", marginTop: "2%" }}>
        <button style={btnBase} onClick={() => handleAction("private")}>KEEP PRIVATE</button>
        <button style={btnBase} onClick={() => handleAction("witness")}>SEND TO WITNESS</button>
        <button style={{ ...btnBase, color: "rgba(196,148,60,0.9)", borderColor: "rgba(196,148,60,0.55)" }} onClick={() => handleAction("wall")}>POST TO THE WALL →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Screen 3 — Comparator (below frame, stub)
// ─────────────────────────────────────────────────

function ComparatorScreen({ delta, latestAssessment }: { delta: any; latestAssessment: any }) {
  const noteIndex = getDeltaNoteIndex({
    identityDelta: parseFloat(delta.identityDelta),
    relationshipDelta: parseFloat(delta.relationshipDelta),
    visionDelta: parseFloat(delta.visionDelta),
    cultureDelta: parseFloat(delta.cultureDelta),
    archetypeShift: delta.archetypeShift,
    leakShift: delta.leakShift,
    previousArchetype: delta.previousArchetype ?? "",
    currentArchetype: delta.currentArchetype ?? "",
  });
  const note = DELTA_FIELD_NOTES[noteIndex];

  const panelBg: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.88) 22%)",
    padding: "10% 8%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  };

  return (
    <div style={panelBg}>
      <div>
        <p style={{ margin: "0 0 4% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(6px, 1.1cqw, 10px)", letterSpacing: "0.35em", color: "#38bdf8", textTransform: "uppercase" }}>
          Field Intelligence
        </p>
        {latestAssessment && (
          <p style={{ margin: "0 0 4% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(7px, 1.5cqw, 13px)", letterSpacing: "0.2em", color: "#d4a853", textTransform: "uppercase", fontWeight: "bold", lineHeight: 1.2 }}>
            {latestAssessment.archetype}
          </p>
        )}
      </div>

      <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(6px, 1.1cqw, 10px)", color: "#c8b898", lineHeight: 1.7 }}>
        {note}
      </p>

      <div style={{ borderTop: "1px solid #1a2a1a", paddingTop: "4%", marginTop: "2%", display: "flex", gap: "8%" }}>
        {[
          { label: "Identity", delta: parseFloat(delta.identityDelta), color: "#4ade80" },
          { label: "Relation", delta: parseFloat(delta.relationshipDelta), color: "#38bdf8" },
          { label: "Vision", delta: parseFloat(delta.visionDelta), color: "#facc15" },
          { label: "Culture", delta: parseFloat(delta.cultureDelta), color: "#a78bfa" },
        ].map(({ label, delta: d, color }) => (
          <div key={label} style={{ flex: 1, textAlign: "center" }}>
            <p style={{ margin: "0 0 2% 0", fontFamily: "'Courier New', monospace", fontSize: "clamp(4px, 0.8cqw, 7px)", letterSpacing: "0.25em", color: "#4a5e4c", textTransform: "uppercase" }}>
              {label}
            </p>
            <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(6px, 1.2cqw, 11px)", color: d >= 0 ? color : "#ef4444" }}>
              {d >= 0 ? "+" : ""}{d.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Dev-only: screen-forcing utility panel
// ─────────────────────────────────────────────────

interface DevPanelProps {
  current: DevScreen;
  onSelect: (s: DevScreen) => void;
}

function DevPanel({ current, onSelect }: DevPanelProps) {
  const buttons: { id: DevScreen; label: string }[] = [
    { id: "1a", label: "1a — LOCK" },
    { id: "1b", label: "1b — ACTIVE" },
    { id: "2",  label: "2 — REFLECT" },
    { id: "3",  label: "3 — COMPARE" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        left: 12,
        zIndex: 9999,
        background: "rgba(0,0,0,0.8)",
        border: "1px solid rgba(196,148,60,0.5)",
        borderRadius: 2,
        padding: 6,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span style={{ fontFamily: "var(--font-pixel)", fontSize: 6, color: "#ef4444", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 }}>
        DEV
      </span>
      <div style={{ display: "flex", gap: 4 }}>
        {buttons.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onSelect(current === id ? null : id)}
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 8,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: current === id ? "#000" : "rgba(196,148,60,0.8)",
              background: current === id ? "rgba(196,148,60,0.8)" : "transparent",
              border: "1px solid rgba(196,148,60,0.4)",
              borderRadius: 1,
              padding: "3px 5px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Onboarding modal — first visit only
// ─────────────────────────────────────────────────

function PraxisWelcome({ onEnter }: { onEnter: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { btnRef.current?.focus(); }, []);

  return (
    <>
      <style>{`
        @keyframes praxis-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes praxis-scan-line {
          0%   { opacity: 0.05; }
          50%  { opacity: 0.12; }
          100% { opacity: 0.05; }
        }
      `}</style>
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)",
          background: "rgba(0,0,0,0.82)",
          animation: "praxis-fade-in 0.5s ease forwards",
        }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="praxis-welcome-title"
      >
        <div
          style={{
            position: "relative", display: "flex", flexDirection: "column",
            width: 480, maxWidth: "92vw", overflow: "hidden",
            background: "#0c0a07",
            border: "1px solid #3d2e14",
            borderRadius: 3,
            boxShadow: "0 0 0 1px rgba(196,148,60,0.08), 0 24px 64px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.02)",
          }}
        >
          {/* Scan-line texture */}
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              animation: "praxis-scan-line 4s ease-in-out infinite",
            }}
          />

          {/* Header bar */}
          <div
            style={{
              position: "relative", display: "flex", alignItems: "center",
              justifyContent: "space-between", padding: "8px 16px",
              background: "#0f0c08", borderBottom: "1px solid #2a1f0a",
              borderRadius: "3px 3px 0 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#c4943c", boxShadow: "0 0 6px #c4943c88" }} />
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#5a4a2a", boxShadow: "0 0 3px #5a4a2a66" }} />
            </div>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3d2e14" }}>
              PRAXIS ● LONG WORK ROOM
            </span>
          </div>

          {/* Body */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 32px 28px" }}>
            <h2
              id="praxis-welcome-title"
              style={{
                fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#c4943c", margin: "0 0 4px",
                textShadow: "0 0 14px rgba(196,148,60,0.35)",
              }}
            >
              LONG WORK ROOM — PATCH TABLE
            </h2>

            {/* Dot divider */}
            <div style={{ display: "flex", gap: 6, margin: "8px 0 24px" }}>
              {[0,1,2,3,4].map(i => (
                <span key={i} style={{ display: "inline-block", width: 3, height: 3, borderRadius: "50%", background: "#2a1f0a" }} />
              ))}
            </div>

            <p style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "#b8a07a", lineHeight: 1.8, textAlign: "center", maxWidth: 360, letterSpacing: "0.015em", margin: "0 0 12px" }}>
              This is where the work compounds.
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "#7a6a4a", lineHeight: 1.8, textAlign: "center", maxWidth: 360, letterSpacing: "0.015em", margin: "0 0 12px" }}>
              Praxis holds your active season — one move, practiced over time. Every return surfaces your next rep. Every reflection closes a loop. When you run Gravitas again, the Comparator shows what actually changed.
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "#5a4a3a", lineHeight: 1.8, textAlign: "center", maxWidth: 360, letterSpacing: "0.015em", margin: "0 0 28px" }}>
              The instrument has three states: the Lock Screen before a season begins, the Active Season during practice, and the Comparator after your second reading.
            </p>

            {/* Readout strip */}
            <div
              style={{
                width: "100%", display: "flex", justifyContent: "space-around",
                padding: "8px 0", marginBottom: 24,
                background: "#0a0805", border: "1px solid #2a1f0a", borderRadius: 2,
              }}
            >
              {[
                { label: "SEASON", value: "READY", valueColor: "#c4943c" },
                { label: "REPS", value: "27 CARTRIDGES", valueColor: "#8a7040" },
                { label: "LOOP", value: "STANDING BY", valueColor: "#5a4a2a" },
              ].map(({ label, value, valueColor }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <span style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: "#3d2e14" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-pixel)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: valueColor }}>{value}</span>
                </div>
              ))}
            </div>

            <button
              ref={btnRef}
              onClick={onEnter}
              style={{
                width: "100%", padding: "11px 0",
                fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.28em",
                textTransform: "uppercase", cursor: "pointer",
                background: "#1a1005", border: "1px solid #c4943c", borderRadius: 2,
                color: "#c4943c", boxShadow: "0 0 12px rgba(196,148,60,0.08)",
                transition: "background 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#221507"; e.currentTarget.style.boxShadow = "0 0 22px rgba(196,148,60,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1a1005"; e.currentTarget.style.boxShadow = "0 0 12px rgba(196,148,60,0.08)"; }}
            >
              ENTER THE LONG WORK ROOM →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
