/**
 * MirrorFlow — The Mirror Question Experience
 *
 * Three-act cinematic flow:
 *   Act 1 (Approach): Wide conservatory shot, slow Ken Burns zoom
 *   Act 2 (Threshold): Fade to black, ritual framing text, "Look Into the Basin"
 *   Act 3 (Basin): Close basin view, questions float on dark water surface
 *
 * After questions: scoring → navigate to /workbench/mirror/reading
 *
 * Design: Warm amber/gold on dark glass. Quieter than Gravitas.
 * Functional logic is IDENTICAL to the original — only visuals changed.
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import MirrorShell from "@/components/workbench/MirrorShell";
import DesktopOnly from "@/components/workbench/DesktopOnly";
import { cn } from "@/lib/utils";
import {
  MIRROR_CORE_QUESTIONS,
  MIRROR_ADAPTIVE_QUESTIONS,
  CONFIRMATION_PAIRS,
  PAIR_ROUTING,
  scoreMirror,
  buildGravitasComboKey,
  rankFamilies,
  applyGravitasPriors,
  applyAnswerWeights,
  shouldTriggerConfirmationPair,
  isAmbiguous,
  emptyFamilyScores,
  type MirrorAnswerOption,
  type MirrorQuestion,
  type GravitasPrior,
  type MirrorResult,
  type ConfirmationPair,
  type PatternFamily,
} from "@/lib/mirror";

// ─── CDN Assets ─────────────────────────────────────────────────────

const BASIN_WIDE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/5e5kxa7Hxu2DiYaSmWbPxb/mirror-basin-wide_1b4e8990.png";

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

// ─── Gravitas Signal Loader ──────────────────────────────────────────

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

// ─── Flow Phases ─────────────────────────────────────────────────────

type FlowPhase =
  | "loading"
  | "approach"       // Act 1: wide shot zoom
  | "threshold"      // Act 2: black screen, ritual text
  | "core_questions" // Act 3: basin questions
  | "confirmation_pair"
  | "adaptive_question"
  | "scoring"
  | "complete";

// ─── Component ───────────────────────────────────────────────────────

export default function MirrorFlow() {
  const [, navigate] = useLocation();

  // Gravitas signal
  const [gravitasPrior, setGravitasPrior] = useState<GravitasPrior | null>(null);

  // Flow state
  const [phase, setPhase] = useState<FlowPhase>("loading");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, MirrorAnswerOption>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Confirmation pair state
  const [activePair, setActivePair] = useState<ConfirmationPair | null>(null);
  const [pairResult, setPairResult] = useState<string | null>(null);

  // Adaptive question state
  const [adaptiveQuestion, setAdaptiveQuestion] = useState<MirrorQuestion | null>(null);

  // Final result
  const [mirrorResult, setMirrorResult] = useState<MirrorResult | null>(null);

  // Threshold text reveal state
  const [thresholdStep, setThresholdStep] = useState(0);

  // ─── Load Gravitas Signal ────────────────────────────────────────

  useEffect(() => {
    const prior = loadGravitasPrior();
    if (!prior || !prior.archetype) {
      navigate("/workbench/results");
      return;
    }
    setGravitasPrior(prior);
    setPhase("approach");
  }, [navigate]);

  // ─── Act 1 → Act 2 auto-advance ─────────────────────────────────

  useEffect(() => {
    if (phase !== "approach") return;
    const timer = setTimeout(() => setPhase("threshold"), 6000);
    return () => clearTimeout(timer);
  }, [phase]);

  // ─── Threshold text reveal sequence ──────────────────────────────

  useEffect(() => {
    if (phase !== "threshold") return;
    const delays = [800, 2400, 4200, 6000];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setThresholdStep(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // ─── Current Question ────────────────────────────────────────────

  const currentQuestion = useMemo(() => {
    if (phase !== "core_questions") return null;
    return MIRROR_CORE_QUESTIONS[currentQuestionIndex] || null;
  }, [phase, currentQuestionIndex]);

  const progress = useMemo(() => {
    const total = MIRROR_CORE_QUESTIONS.length;
    return {
      current: currentQuestionIndex + 1,
      total,
      percent: ((currentQuestionIndex) / total) * 100,
    };
  }, [currentQuestionIndex]);

  // ─── Handle Option Select ────────────────────────────────────────

  const handleSelectOption = useCallback(
    (option: MirrorAnswerOption) => {
      if (isTransitioning || !currentQuestion) return;

      setSelectedOption(option.id);
      setIsTransitioning(true);

      const newAnswers = { ...answers, [currentQuestion.id]: option };
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentQuestionIndex < MIRROR_CORE_QUESTIONS.length - 1) {
          setCurrentQuestionIndex((i) => i + 1);
          setSelectedOption(null);
          setIsTransitioning(false);
        } else {
          runPostCoreScoring(newAnswers);
        }
      }, 600);
    },
    [isTransitioning, currentQuestion, answers, currentQuestionIndex, gravitasPrior],
  );

  // ─── Post-Core Scoring ───────────────────────────────────────────

  const runPostCoreScoring = useCallback(
    (currentAnswers: Record<string, MirrorAnswerOption>) => {
      if (!gravitasPrior) return;

      const prelimResult = scoreMirror({
        gravitasPrior,
        answers: currentAnswers,
      });

      const ranked = rankFamilies(prelimResult.family_scores);
      const comboKey = buildGravitasComboKey(gravitasPrior);
      const pairSequence = PAIR_ROUTING[comboKey];
      const needsPair = shouldTriggerConfirmationPair(ranked);

      if (needsPair && pairSequence) {
        const pair = CONFIRMATION_PAIRS[pairSequence.first];
        if (pair) {
          setActivePair(pair);
          setPhase("confirmation_pair");
          setSelectedOption(null);
          setIsTransitioning(false);
          return;
        }
      }

      if (isAmbiguous(ranked)) {
        const adaptiveQ = MIRROR_ADAPTIVE_QUESTIONS.find(
          (q) => q.trigger === "ambiguous_top_two",
        );
        if (adaptiveQ) {
          setAdaptiveQuestion(adaptiveQ);
          setPhase("adaptive_question");
          setSelectedOption(null);
          setIsTransitioning(false);
          return;
        }
      }

      finalizeResult(currentAnswers, null, null);
    },
    [gravitasPrior],
  );

  // ─── Handle Confirmation Pair Selection ──────────────────────────

  const handlePairSelect = useCallback(
    (optionId: string, supportsFamily: PatternFamily, weight: number) => {
      if (isTransitioning || !activePair || !gravitasPrior) return;

      setSelectedOption(optionId);
      setPairResult(optionId);
      setIsTransitioning(true);

      const pairAnswer: MirrorAnswerOption = {
        id: optionId,
        text: "",
        family_weights: { [supportsFamily]: weight },
        reading_tone_flag: null,
        codex_framing_flag: null,
      };

      const newAnswers = { ...answers, [`pair_${activePair.id}`]: pairAnswer };
      setAnswers(newAnswers);

      setTimeout(() => {
        const updatedResult = scoreMirror({
          gravitasPrior,
          answers: newAnswers,
        });

        const ranked = rankFamilies(updatedResult.family_scores);

        if (isAmbiguous(ranked)) {
          const adaptiveQ = MIRROR_ADAPTIVE_QUESTIONS.find(
            (q) => q.trigger === "ambiguous_top_two",
          );
          if (adaptiveQ) {
            setAdaptiveQuestion(adaptiveQ);
            setPhase("adaptive_question");
            setSelectedOption(null);
            setIsTransitioning(false);
            return;
          }
        }

        finalizeResult(newAnswers, activePair.id, null);
      }, 600);
    },
    [isTransitioning, activePair, answers, gravitasPrior],
  );

  // ─── Handle Adaptive Question ────────────────────────────────────

  const handleAdaptiveSelect = useCallback(
    (option: MirrorAnswerOption) => {
      if (isTransitioning || !adaptiveQuestion) return;

      setSelectedOption(option.id);
      setIsTransitioning(true);

      const newAnswers = { ...answers, [adaptiveQuestion.id]: option };
      setAnswers(newAnswers);

      setTimeout(() => {
        finalizeResult(
          newAnswers,
          activePair?.id || null,
          adaptiveQuestion.id,
        );
      }, 600);
    },
    [isTransitioning, adaptiveQuestion, answers, activePair],
  );

  // ─── Finalize Result ─────────────────────────────────────────────

  const finalizeResult = useCallback(
    (
      finalAnswers: Record<string, MirrorAnswerOption>,
      confirmationPairUsed: string | null,
      adaptiveQuestionUsed: string | null,
    ) => {
      if (!gravitasPrior) return;

      const result = scoreMirror({
        gravitasPrior,
        answers: finalAnswers,
      });

      result.confirmation_pair_used = confirmationPairUsed;
      result.adaptive_question_used = adaptiveQuestionUsed;

      setMirrorResult(result);
      setPhase("scoring");

      localStorage.setItem("mirrorResult", JSON.stringify(result));

      setTimeout(() => {
        setPhase("complete");
        navigate("/workbench/mirror/reading");
      }, 1500);
    },
    [gravitasPrior, navigate],
  );

  // ═══════════════════════════════════════════════════════════════════
  // RENDER PHASES
  // ═══════════════════════════════════════════════════════════════════

  // ─── Render: Loading ─────────────────────────────────────────────

  if (phase === "loading") {
    return (
      <DesktopOnly toolName="Mirror">
        <div className="min-h-screen bg-black flex items-center justify-center">
          <p
            className="font-pixel text-sm tracking-widest uppercase animate-pulse"
            style={{ color: AMBER.muted }}
          >
            LOADING GRAVITAS SIGNAL...
          </p>
        </div>
      </DesktopOnly>
    );
  }

  // ─── Render: Act 1 — The Approach ────────────────────────────────
  // Wide conservatory shot with slow Ken Burns zoom toward the basin.

  if (phase === "approach") {
    return (
      <DesktopOnly toolName="Mirror">
        <div className="fixed inset-0 bg-black overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${BASIN_WIDE_URL})`,
              animation: "approachZoom 6s ease-in-out forwards",
            }}
          />
          {/* Subtle dark edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          {/* "MIRROR" text at top */}
          <div className="absolute top-8 left-0 right-0 text-center z-10">
            <h1
              className="font-pixel text-2xl tracking-[0.3em] uppercase"
              style={{
                color: AMBER.bright,
                textShadow: `0 0 20px ${AMBER.glow}`,
                animation: "mirrorFadeIn 1.5s ease-out",
              }}
            >
              MIRROR
            </h1>
          </div>
        </div>

        <style>{`
          @keyframes approachZoom {
            from { transform: scale(1); }
            to { transform: scale(1.15); }
          }
          @keyframes mirrorFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </DesktopOnly>
    );
  }

  // ─── Render: Act 2 — The Threshold ───────────────────────────────
  // Fade to black. Ritual framing text reveals in sequence.

  if (phase === "threshold") {
    return (
      <DesktopOnly toolName="Mirror">
        <div
          className="fixed inset-0 flex flex-col items-center justify-center px-8"
          style={{
            backgroundColor: "#050505",
            animation: "thresholdFadeIn 1s ease-out",
          }}
        >
          <div className="max-w-lg text-center space-y-6">
            {/* Line 1 */}
            <p
              className="text-base leading-relaxed transition-opacity duration-700"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PARCHMENT.mid,
                opacity: thresholdStep >= 1 ? 1 : 0,
              }}
            >
              Gravitas showed you the field — the shape of your leadership gravity.
            </p>

            {/* Line 2 */}
            <p
              className="text-base leading-relaxed transition-opacity duration-700"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PARCHMENT.mid,
                opacity: thresholdStep >= 2 ? 1 : 0,
              }}
            >
              Mirror looks underneath. Not at what you do, but at what you protect.
              What you carry. What it costs.
            </p>

            {/* Line 3 */}
            <p
              className="text-sm leading-relaxed transition-opacity duration-700"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PARCHMENT.muted,
                opacity: thresholdStep >= 3 ? 1 : 0,
              }}
            >
              Seven questions. No right answers. Just honest ones.
            </p>

            {/* CTA Button */}
            <div
              className="pt-4 transition-opacity duration-700"
              style={{ opacity: thresholdStep >= 4 ? 1 : 0 }}
            >
              <button
                onClick={() => setPhase("core_questions")}
                className="px-8 py-3 border transition-all duration-300 font-pixel text-sm tracking-widest uppercase"
                style={{
                  color: AMBER.bright,
                  borderColor: AMBER.muted,
                  backgroundColor: "transparent",
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
                Look Into the Basin
              </button>
            </div>
          </div>

          {/* Gravitas signal whisper */}
          {gravitasPrior && thresholdStep >= 3 && (
            <div
              className="absolute bottom-8 text-center transition-opacity duration-700"
              style={{ opacity: 0.4 }}
            >
              <span
                className="font-pixel text-[9px] tracking-widest uppercase"
                style={{ color: PARCHMENT.faint }}
              >
                SIGNAL: {gravitasPrior.archetype} / {gravitasPrior.leak} LEAK / {gravitasPrior.force} FORCE
              </span>
            </div>
          )}
        </div>

        <style>{`
          @keyframes thresholdFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </DesktopOnly>
    );
  }

  // ─── Render: Act 3 — Core Questions (Basin Surface) ──────────────

  if (phase === "core_questions" && currentQuestion) {
    const optionCount = currentQuestion.options.length;
    const isCompact = optionCount >= 5;

    return (
      <DesktopOnly toolName="Mirror">
        <MirrorShell
          footer={
            <div className="flex items-center gap-3">
              {/* Progress dots */}
              {MIRROR_CORE_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i < currentQuestionIndex
                        ? AMBER.bright
                        : i === currentQuestionIndex
                        ? AMBER.warm
                        : "rgba(197,160,89,0.2)",
                    boxShadow:
                      i === currentQuestionIndex
                        ? `0 0 6px ${AMBER.glow}`
                        : "none",
                  }}
                />
              ))}
              <span
                className="ml-2 font-pixel text-[9px] tracking-widest"
                style={{ color: PARCHMENT.faint }}
              >
                {progress.current}/{progress.total}
              </span>
            </div>
          }
        >
          {/* Question text — centered in the dark water */}
          <div
            key={currentQuestion.id}
            className="text-center mb-4"
            style={{ animation: "mirrorFadeIn 0.5s ease-out" }}
          >
            <p
              className={cn(
                "leading-relaxed italic",
                isCompact ? "text-sm" : "text-base md:text-lg"
              )}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PARCHMENT.light,
                textShadow: `0 0 12px rgba(232,220,200,0.3)`,
              }}
            >
              {currentQuestion.text}
            </p>
          </div>

          {/* Answer options — stacked vertically on the dark water */}
          <div
            className="w-full flex flex-col items-center"
            style={{ gap: isCompact ? "4px" : "6px" }}
          >
            {currentQuestion.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                disabled={isTransitioning}
                className="w-full text-center transition-all duration-300 cursor-pointer"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isCompact ? "0.75rem" : "0.8rem",
                  lineHeight: "1.4",
                  color:
                    selectedOption === option.id
                      ? AMBER.bright
                      : PARCHMENT.mid,
                  textShadow:
                    selectedOption === option.id
                      ? `0 0 10px ${AMBER.glow}`
                      : `0 0 6px rgba(0,0,0,0.8)`,
                  opacity:
                    isTransitioning && selectedOption !== option.id
                      ? 0.3
                      : 1,
                  padding: isCompact ? "6px 12px" : "8px 14px",
                  backgroundColor: "rgba(5,8,15,0.3)",
                  borderRadius: "4px",
                  border: selectedOption === option.id
                    ? `1px solid ${AMBER.muted}`
                    : "1px solid transparent",
                  maxWidth: "90%",
                  animation: `mirrorFadeIn 0.3s ease-out ${idx * 80}ms backwards`,
                }}
                onMouseEnter={(e) => {
                  if (selectedOption !== option.id) {
                    e.currentTarget.style.color = AMBER.bright;
                    e.currentTarget.style.textShadow = `0 0 8px ${AMBER.faintGlow}`;
                    e.currentTarget.style.backgroundColor = "rgba(5,8,15,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOption !== option.id) {
                    e.currentTarget.style.color = PARCHMENT.mid;
                    e.currentTarget.style.textShadow = "0 0 6px rgba(0,0,0,0.8)";
                    e.currentTarget.style.backgroundColor = "rgba(5,8,15,0.3)";
                  }
                }}
              >
                {option.text}
              </button>
            ))}
          </div>

          <style>{`
            @keyframes mirrorFadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </MirrorShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Confirmation Pair ───────────────────────────────────

  if (phase === "confirmation_pair" && activePair) {
    return (
      <DesktopOnly toolName="Mirror">
        <MirrorShell>
          {/* Pair prompt */}
          <div className="text-center mb-4">
            <p
              className="font-pixel text-[9px] tracking-widest uppercase mb-3"
              style={{ color: AMBER.muted }}
            >
              One more distinction
            </p>
            <p
              className="text-xs leading-relaxed italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PARCHMENT.muted,
              }}
            >
              Both may feel partially true. Choose the one that feels{" "}
              <em>more</em> true under real pressure.
            </p>
          </div>

          {/* Option A */}
          <button
            onClick={() =>
              handlePairSelect(
                activePair.option_a.id,
                activePair.option_a.supports_family,
                activePair.option_a.weight,
              )
            }
            disabled={isTransitioning}
            className="w-full text-center transition-all duration-300 cursor-pointer mb-3"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.8rem",
              lineHeight: "1.4",
              color:
                selectedOption === activePair.option_a.id
                  ? AMBER.bright
                  : PARCHMENT.mid,
              textShadow:
                selectedOption === activePair.option_a.id
                  ? `0 0 10px ${AMBER.glow}`
                  : `0 0 6px rgba(0,0,0,0.8)`,
              opacity:
                isTransitioning && selectedOption !== activePair.option_a.id
                  ? 0.3
                  : 1,
              padding: "8px 14px",
              backgroundColor: "rgba(5,8,15,0.3)",
              borderRadius: "4px",
              border: selectedOption === activePair.option_a.id
                ? `1px solid ${AMBER.muted}`
                : "1px solid transparent",
              maxWidth: "90%",
            }}
          >
            {activePair.option_a.text}
          </button>

          {/* OR divider */}
          <div className="flex items-center gap-3 my-1 w-3/4">
            <div className="flex-1 h-px" style={{ backgroundColor: AMBER.muted, opacity: 0.2 }} />
            <span className="font-pixel text-[8px] tracking-widest" style={{ color: PARCHMENT.faint }}>
              OR
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: AMBER.muted, opacity: 0.2 }} />
          </div>

          {/* Option B */}
          <button
            onClick={() =>
              handlePairSelect(
                activePair.option_b.id,
                activePair.option_b.supports_family,
                activePair.option_b.weight,
              )
            }
            disabled={isTransitioning}
            className="w-full text-center transition-all duration-300 cursor-pointer mt-3"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.8rem",
              lineHeight: "1.4",
              color:
                selectedOption === activePair.option_b.id
                  ? AMBER.bright
                  : PARCHMENT.mid,
              textShadow:
                selectedOption === activePair.option_b.id
                  ? `0 0 10px ${AMBER.glow}`
                  : `0 0 6px rgba(0,0,0,0.8)`,
              opacity:
                isTransitioning && selectedOption !== activePair.option_b.id
                  ? 0.3
                  : 1,
              padding: "8px 14px",
              backgroundColor: "rgba(5,8,15,0.3)",
              borderRadius: "4px",
              border: selectedOption === activePair.option_b.id
                ? `1px solid ${AMBER.muted}`
                : "1px solid transparent",
              maxWidth: "90%",
            }}
          >
            {activePair.option_b.text}
          </button>
        </MirrorShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Adaptive Question ───────────────────────────────────

  if (phase === "adaptive_question" && adaptiveQuestion) {
    const optionCount = adaptiveQuestion.options.length;
    const isCompact = optionCount >= 5;

    return (
      <DesktopOnly toolName="Mirror">
        <MirrorShell>
          <div className="text-center mb-4">
            <p
              className="font-pixel text-[9px] tracking-widest uppercase mb-3"
              style={{ color: AMBER.muted }}
            >
              One more
            </p>
            <p
              className={cn(
                "leading-relaxed italic",
                isCompact ? "text-sm" : "text-base"
              )}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: PARCHMENT.light,
                textShadow: "0 0 12px rgba(232,220,200,0.3)",
              }}
            >
              {adaptiveQuestion.text}
            </p>
          </div>

          <div
            className="w-full flex flex-col items-center"
            style={{ gap: isCompact ? "4px" : "6px" }}
          >
            {adaptiveQuestion.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleAdaptiveSelect(option)}
                disabled={isTransitioning}
                className="w-full text-center transition-all duration-300 cursor-pointer"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isCompact ? "0.75rem" : "0.8rem",
                  lineHeight: "1.4",
                  color:
                    selectedOption === option.id
                      ? AMBER.bright
                      : PARCHMENT.mid,
                  textShadow:
                    selectedOption === option.id
                      ? `0 0 10px ${AMBER.glow}`
                      : "0 0 6px rgba(0,0,0,0.8)",
                  opacity:
                    isTransitioning && selectedOption !== option.id
                      ? 0.3
                      : 1,
                  padding: isCompact ? "6px 12px" : "8px 14px",
                  backgroundColor: "rgba(5,8,15,0.3)",
                  borderRadius: "4px",
                  border: selectedOption === option.id
                    ? `1px solid ${AMBER.muted}`
                    : "1px solid transparent",
                  maxWidth: "90%",
                  animation: `mirrorFadeIn 0.3s ease-out ${idx * 80}ms backwards`,
                }}
                onMouseEnter={(e) => {
                  if (selectedOption !== option.id) {
                    e.currentTarget.style.color = AMBER.bright;
                    e.currentTarget.style.textShadow = `0 0 8px ${AMBER.faintGlow}`;
                    e.currentTarget.style.backgroundColor = "rgba(5,8,15,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOption !== option.id) {
                    e.currentTarget.style.color = PARCHMENT.mid;
                    e.currentTarget.style.textShadow = "0 0 6px rgba(0,0,0,0.8)";
                    e.currentTarget.style.backgroundColor = "rgba(5,8,15,0.3)";
                  }
                }}
              >
                {option.text}
              </button>
            ))}
          </div>

          <style>{`
            @keyframes mirrorFadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </MirrorShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Scoring ─────────────────────────────────────────────

  if (phase === "scoring") {
    return (
      <DesktopOnly toolName="Mirror">
        <MirrorShell showSticker={false}>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-32 h-[1px] overflow-hidden" style={{ backgroundColor: "rgba(197,160,89,0.2)" }}>
              <div
                className="h-full"
                style={{
                  backgroundColor: AMBER.warm,
                  animation: "scoringBar 1.5s ease-out forwards",
                }}
              />
            </div>
            <p
              className="font-pixel text-[10px] tracking-widest uppercase animate-pulse"
              style={{ color: AMBER.muted }}
            >
              Assembling your reading...
            </p>
          </div>

          <style>{`
            @keyframes scoringBar {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </MirrorShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Fallback ────────────────────────────────────────────

  return (
    <DesktopOnly toolName="Mirror">
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p
          className="font-pixel text-sm tracking-widest uppercase"
          style={{ color: "#4a2020" }}
        >
          NO GRAVITAS SIGNAL DETECTED
        </p>
      </div>
    </DesktopOnly>
  );
}
