import { useState, useEffect } from "react";
import { CODEX_ENTRIES } from "@/lib/workbench/codex-data";
import { PRAXIS_REPS } from "@/lib/praxis-data";

// ─── Types ────────────────────────────────────────────────────────────────────

type Assessment = {
  id: number;
  sessionNumber: number;
  dimensionScores: { identity: number; relationship: number; vision: number; culture: number };
  archetype: string;
  leak: string;
  force: string;
  firstMove: string;
  createdAt: Date;
};

type Season = {
  id: number;
  cartridgeId: string;
  firstMove: string;
  status: string;
  lockedAt: Date;
  completedAt: Date | null;
};

export type FormationData = {
  assessments: Assessment[];
  deltas: unknown[];
  seasons: Season[];
  reflectionCounts: Record<number, number>;
  wallOfferingCount: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const DIMS = ["identity", "relationship", "vision", "culture"] as const;
type Dim = (typeof DIMS)[number];

const DIM_COLORS: Record<Dim, string> = {
  identity: "#c4943c",
  relationship: "#4a9e7c",
  vision: "#4a7ece",
  culture: "#9e6a9e",
};

const PAD_X = 52;
const PAD_Y = 18;
const CHART_W = 680;
const CHART_H = 150;
const SVG_W = CHART_W + PAD_X * 2;
const SVG_H = CHART_H + PAD_Y * 2 + 16;
const LARGE_DASH = 3000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreToY(score: number): number {
  return PAD_Y + CHART_H - ((score - 1) / 4) * CHART_H;
}

function indexToX(i: number, total: number): number {
  if (total <= 1) return PAD_X + CHART_W / 2;
  return PAD_X + (i / (total - 1)) * CHART_W;
}

function fmtDate(d: Date | string): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" });
}

function daysBetween(a: Date | string, b: Date | string): number {
  return Math.max(0, Math.floor((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000));
}

// ─── Shared style objects ─────────────────────────────────────────────────────

const MONO: React.CSSProperties = { fontFamily: "'Share Tech Mono', monospace" };
const SERIF: React.CSSProperties = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const LABEL: React.CSSProperties = {
  ...MONO,
  color: "rgba(196,148,60,0.45)",
  fontSize: 9,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};
const ACCENT: React.CSSProperties = {
  ...MONO,
  color: "#c4943c",
  fontSize: 9,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

type Tab = "arc" | "log" | "intel";

// ─── Main component ───────────────────────────────────────────────────────────

export default function FormationPortrait({ data }: { data: FormationData | null | undefined }) {
  const [tab, setTab] = useState<Tab>("arc");

  if (!data || data.assessments.length === 0) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(6px, 1.1cqw, 10px)", letterSpacing: "0.35em", color: "rgba(196,148,60,0.4)", textTransform: "uppercase", margin: 0 }}>
          Run Gravitas to begin your formation record
        </p>
      </div>
    );
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "arc", label: "Formation Arc" },
    { id: "log", label: "Season Log" },
    { id: "intel", label: "Field Intelligence" },
  ];

  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ background: "#09100a", border: "1px solid rgba(196,148,60,0.14)" }}>
      <div className="px-5 pt-5">
        <p style={{ ...ACCENT, fontSize: 8, letterSpacing: "0.3em", marginBottom: 14 }}>Formation Portrait</p>
        <div className="flex" style={{ borderBottom: "1px solid rgba(196,148,60,0.12)" }}>
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                ...MONO,
                fontSize: 8,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: tab === id ? "#c4943c" : "rgba(196,148,60,0.35)",
                padding: "8px 14px",
                background: "transparent",
                border: "none",
                borderBottom: tab === id ? "1px solid #c4943c" : "1px solid transparent",
                marginBottom: -1,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5">
        {tab === "arc" && <FormationArc data={data} />}
        {tab === "log" && <SeasonLog data={data} />}
        {tab === "intel" && <FieldIntelligence data={data} />}
      </div>
    </div>
  );
}

// ─── Tab 1: Formation Arc ─────────────────────────────────────────────────────

function FormationArc({ data }: { data: FormationData }) {
  const { assessments, seasons } = data;
  const N = assessments.length;
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 60);
    return () => clearTimeout(t);
  }, []);

  function buildPath(dim: Dim): string {
    return assessments
      .map((a, i) => `${i === 0 ? "M" : "L"} ${indexToX(i, N).toFixed(1)} ${scoreToY(a.dimensionScores[dim]).toFixed(1)}`)
      .join(" ");
  }

  const bands = seasons.flatMap((s, sIdx) => {
    const sStart = new Date(s.lockedAt).getTime();
    const sEnd = s.completedAt ? new Date(s.completedAt).getTime() : Date.now();
    const inSeason = assessments
      .map((a, i) => ({ i, t: new Date(a.createdAt).getTime() }))
      .filter(({ t }) => t >= sStart && t <= sEnd)
      .map(({ i }) => i);
    if (inSeason.length === 0) return [];
    const minI = Math.min(...inSeason);
    const maxI = Math.max(...inSeason);
    return [{ x: indexToX(minI, N), w: Math.max(indexToX(maxI, N) - indexToX(minI, N), 1), sIdx }];
  });

  const netChange: Record<Dim, number> = { identity: 0, relationship: 0, vision: 0, culture: 0 };
  const totalMove: Record<Dim, number> = { identity: 0, relationship: 0, vision: 0, culture: 0 };
  for (let i = 1; i < N; i++) {
    for (const dim of DIMS) {
      const d = assessments[i].dimensionScores[dim] - assessments[i - 1].dimensionScores[dim];
      netChange[dim] += d;
      totalMove[dim] += Math.abs(d);
    }
  }

  return (
    <div>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width: "100%", minWidth: 280, display: "block" }}>
          <defs>
            <style>{`@keyframes fp-pulse{0%,100%{r:4;opacity:1}50%{r:5.5;opacity:0.55}}`}</style>
          </defs>

          {[1, 2, 3, 4, 5].map((v) => (
            <g key={v}>
              <line x1={PAD_X} x2={PAD_X + CHART_W} y1={scoreToY(v)} y2={scoreToY(v)} stroke="rgba(196,148,60,0.07)" strokeWidth={1} />
              <text x={PAD_X - 6} y={scoreToY(v) + 3} textAnchor="end" fontSize={7} fill="rgba(196,148,60,0.35)" fontFamily="'Share Tech Mono',monospace">
                {v}.0
              </text>
            </g>
          ))}

          {bands.map((b, i) => (
            <rect key={i} x={b.x} y={PAD_Y} width={b.w} height={CHART_H} fill={`rgba(196,148,60,${b.sIdx % 2 === 0 ? 0.04 : 0.07})`} />
          ))}

          {N > 1 &&
            DIMS.map((dim) => (
              <path
                key={dim}
                d={buildPath(dim)}
                fill="none"
                stroke={DIM_COLORS[dim]}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={LARGE_DASH}
                strokeDashoffset={drawn ? 0 : LARGE_DASH}
                style={{
                  transition: drawn ? "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)" : "none",
                  opacity: 0.9,
                }}
              />
            ))}

          {assessments.map((a, i) =>
            DIMS.map((dim) => {
              const isLast = i === N - 1;
              return (
                <circle
                  key={`${dim}-${i}`}
                  cx={indexToX(i, N)}
                  cy={scoreToY(a.dimensionScores[dim])}
                  r={isLast ? 4 : 2.5}
                  fill={DIM_COLORS[dim]}
                  opacity={isLast ? 1 : 0.55}
                  style={isLast ? { animation: "fp-pulse 2.2s ease-in-out infinite" } : {}}
                />
              );
            })
          )}

          {assessments.map((_, i) => (
            <text key={i} x={indexToX(i, N)} y={SVG_H - 2} textAnchor="middle" fontSize={7} fill="rgba(196,148,60,0.3)" fontFamily="'Share Tech Mono',monospace">
              S{i + 1}
            </text>
          ))}
        </svg>
      </div>

      <div className="flex flex-wrap gap-4 mt-1 mb-5">
        {DIMS.map((dim) => (
          <div key={dim} className="flex items-center gap-1.5">
            <div style={{ width: 14, height: 1.5, background: DIM_COLORS[dim] }} />
            <span style={{ ...LABEL, fontSize: 8 }}>{dim}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
        {DIMS.map((dim) => {
          const net = netChange[dim];
          const sign = net > 0.005 ? "+" : "";
          return (
            <div key={dim} className="rounded px-3 py-2.5" style={{ background: "rgba(196,148,60,0.04)", border: "1px solid rgba(196,148,60,0.1)" }}>
              <p style={{ ...ACCENT, fontSize: 7, color: DIM_COLORS[dim], marginBottom: 4 }}>{dim}</p>
              <p style={{ ...SERIF, color: "#c4943c", fontSize: 20, fontWeight: 600, lineHeight: 1 }}>
                {sign}{net.toFixed(2)}
              </p>
              <p style={{ ...LABEL, fontSize: 7, marginTop: 3 }}>{totalMove[dim].toFixed(2)} total</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: "1px solid rgba(196,148,60,0.08)" }}>
        <span style={{ ...LABEL, fontSize: 8 }}>Field Offerings</span>
        <span style={{ ...SERIF, color: "#c4943c", fontSize: 16, fontWeight: 600 }}>{data.wallOfferingCount}</span>
      </div>
    </div>
  );
}

// ─── Tab 2: Season Log ────────────────────────────────────────────────────────

function SeasonLog({ data }: { data: FormationData }) {
  const { seasons, reflectionCounts } = data;
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const hasActive = seasons.some((s) => s.status === "active");

  return (
    <div className="space-y-2">
      {!hasActive && (
        <div
          className="rounded p-4"
          style={{ background: "rgba(196,148,60,0.03)", border: "1px dashed rgba(196,148,60,0.2)", marginBottom: 8 }}
        >
          <p style={{ ...LABEL, fontSize: 8 }}>No active season — lock a cartridge in Praxis to begin</p>
        </div>
      )}

      {seasons.map((s, idx) => {
        const entry = CODEX_ENTRIES.find((e) => e.id === s.cartridgeId);
        const rep = PRAXIS_REPS[s.cartridgeId];
        const isOpen = expandedId === s.id;
        const isActive = s.status === "active";
        const days = daysBetween(s.lockedAt, s.completedAt ?? new Date());
        const reflCount = reflectionCounts[s.id] ?? 0;

        return (
          <div key={s.id} className="rounded overflow-hidden" style={{ border: `1px solid rgba(196,148,60,${isActive ? 0.28 : 0.1})` }}>
            <button
              className="w-full text-left px-4 py-3"
              style={{ background: isActive ? "rgba(196,148,60,0.05)" : "transparent", cursor: "pointer" }}
              onClick={() => setExpandedId(isOpen ? null : s.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ ...LABEL, fontSize: 7 }}>Season {idx + 1}</span>
                    <span
                      style={{
                        ...MONO,
                        fontSize: 6.5,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        padding: "1px 5px",
                        borderRadius: 2,
                        background: isActive ? "rgba(196,148,60,0.14)" : "rgba(255,255,255,0.04)",
                        color: isActive ? "#c4943c" : "rgba(196,148,60,0.3)",
                      }}
                    >
                      {s.status}
                    </span>
                  </div>
                  <p style={{ ...SERIF, color: "#e8d9b0", fontSize: 15, fontWeight: 600 }}>
                    {entry?.title ?? s.cartridgeId}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p style={{ ...LABEL, fontSize: 7 }}>{fmtDate(s.lockedAt)}</p>
                  <p style={{ ...LABEL, fontSize: 7, marginTop: 3 }}>{days}d · {reflCount} refl</p>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4" style={{ borderTop: "1px solid rgba(196,148,60,0.08)" }}>
                <div className="pt-3 space-y-3">
                  {rep ? (
                    <>
                      <p style={{ ...SERIF, color: "rgba(232,217,176,0.65)", fontSize: 13, fontStyle: "italic", lineHeight: 1.55 }}>
                        {rep.rootNote}
                      </p>
                      <div className="space-y-3 pt-1">
                        {([ ["Day 1", rep.day1], ["Day 7", rep.day7], ["Day 14", rep.day14] ] as [string, string][]).map(([label, text]) => (
                          <div key={label}>
                            <p style={{ ...ACCENT, fontSize: 7, marginBottom: 3 }}>{label}</p>
                            <p style={{ ...SERIF, color: "rgba(232,217,176,0.6)", fontSize: 12.5, lineHeight: 1.55 }}>{text}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p style={{ ...LABEL, fontSize: 8 }}>Rep data not available for this cartridge</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Tab 3: Field Intelligence ────────────────────────────────────────────────

function FieldIntelligence({ data }: { data: FormationData }) {
  const { assessments } = data;
  const N = assessments.length;
  const latest = assessments[N - 1];

  const totalMove: Record<Dim, number> = { identity: 0, relationship: 0, vision: 0, culture: 0 };
  for (let i = 1; i < N; i++) {
    for (const dim of DIMS) {
      totalMove[dim] += Math.abs(assessments[i].dimensionScores[dim] - assessments[i - 1].dimensionScores[dim]);
    }
  }

  const identityFirstMover = N >= 2 && totalMove.identity > 0.4 && totalMove.relationship > 0.4;

  return (
    <div className="space-y-4">
      {identityFirstMover ? (
        <div className="rounded p-4" style={{ background: "rgba(196,148,60,0.05)", border: "1px solid rgba(196,148,60,0.22)" }}>
          <p style={{ ...ACCENT, fontSize: 7, marginBottom: 6 }}>Pattern Detected</p>
          <p style={{ ...SERIF, color: "#e8d9b0", fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Identity-First Mover</p>
          <p style={{ ...SERIF, color: "rgba(232,217,176,0.65)", fontSize: 13, lineHeight: 1.6 }}>
            Your formation shows significant movement in both Identity and Relationship — the two dimensions most tied to personal presence and relational trust. You lead by anchoring yourself first, then reaching toward the field.
          </p>
        </div>
      ) : N < 2 ? (
        <div className="rounded p-4" style={{ background: "rgba(196,148,60,0.02)", border: "1px dashed rgba(196,148,60,0.15)" }}>
          <p style={{ ...LABEL, fontSize: 8 }}>Run a second Gravitas scan to begin pattern detection</p>
        </div>
      ) : null}

      <div className="rounded p-4" style={{ background: "rgba(196,148,60,0.03)", border: "1px solid rgba(196,148,60,0.1)" }}>
        <p style={{ ...LABEL, fontSize: 7, marginBottom: 5 }}>Current Archetype</p>
        <p style={{ ...SERIF, color: "#e8d9b0", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{latest.archetype}</p>
        <p style={{ ...SERIF, color: "rgba(232,217,176,0.6)", fontSize: 13, lineHeight: 1.6 }}>
          Your most recent scan reads {latest.archetype} — shaped by a dominant force of{" "}
          {latest.force.toLowerCase()} and a primary leak of {latest.leak.toLowerCase()}.
        </p>
      </div>
    </div>
  );
}
