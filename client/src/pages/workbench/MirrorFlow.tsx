/**
 * MirrorFlow — The Mirror Question Experience
 *
 * Flow:
 *   1. Read Gravitas signal from localStorage
 *   2. Show 7 core questions (one at a time, felt-language options)
 *   3. Score after core questions
 *   4. If ambiguous → show confirmation pair
 *   5. If still ambiguous → show adaptive deepener
 *   6. Final score → navigate to /workbench/mirror/reading
 *
 * UI: Uses PluginShell for the instrument chassis.
 * Sound: No sounds until we decide (per user preference).
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import PluginShell from "@/components/workbench/PluginShell";
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
  | "intro"
  | "core_questions"
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

  // ─── Load Gravitas Signal ────────────────────────────────────────

  useEffect(() => {
    const prior = loadGravitasPrior();
    if (!prior || !prior.archetype) {
      // No Gravitas signal — redirect back
      navigate("/workbench/results");
      return;
    }
    setGravitasPrior(prior);
    setPhase("intro");
  }, [navigate]);

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

      // Record answer
      const newAnswers = { ...answers, [currentQuestion.id]: option };
      setAnswers(newAnswers);

      // Transition to next question or scoring
      setTimeout(() => {
        if (currentQuestionIndex < MIRROR_CORE_QUESTIONS.length - 1) {
          setCurrentQuestionIndex((i) => i + 1);
          setSelectedOption(null);
          setIsTransitioning(false);
        } else {
          // Core questions complete — run initial scoring
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

      // Run a preliminary score to check if we need confirmation
      const prelimResult = scoreMirror({
        gravitasPrior,
        answers: currentAnswers,
      });

      const ranked = rankFamilies(prelimResult.family_scores);
      const comboKey = buildGravitasComboKey(gravitasPrior);
      const pairSequence = PAIR_ROUTING[comboKey];
      const needsPair = shouldTriggerConfirmationPair(ranked);

      if (needsPair && pairSequence) {
        // Show confirmation pair
        const pair = CONFIRMATION_PAIRS[pairSequence.first];
        if (pair) {
          setActivePair(pair);
          setPhase("confirmation_pair");
          setSelectedOption(null);
          setIsTransitioning(false);
          return;
        }
      }

      // No pair needed — check if adaptive question needed
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

      // Clear signal — finalize
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

      // Create a synthetic answer option from the pair selection
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
        // Re-score with pair answer included
        const updatedResult = scoreMirror({
          gravitasPrior,
          answers: newAnswers,
        });

        const ranked = rankFamilies(updatedResult.family_scores);

        // Check if still ambiguous — might need a second pair or adaptive Q
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

        // Finalize
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

      // Patch in the pair/adaptive metadata
      result.confirmation_pair_used = confirmationPairUsed;
      result.adaptive_question_used = adaptiveQuestionUsed;

      setMirrorResult(result);
      setPhase("scoring");

      // Save to localStorage
      localStorage.setItem("mirrorResult", JSON.stringify(result));

      // Brief scoring animation, then navigate
      setTimeout(() => {
        setPhase("complete");
        navigate("/workbench/mirror/reading");
      }, 1500);
    },
    [gravitasPrior, navigate],
  );

  // ─── Render: Loading ─────────────────────────────────────────────

  if (phase === "loading") {
    return (
      <DesktopOnly toolName="Mirror">
        <PluginShell title="MIRROR" category="DIAGNOSTIC" status="LOADING" statusColor="text-yellow-600">
          <div className="flex items-center justify-center h-64">
            <p className="text-green-900 font-pixel text-sm animate-pulse">
              LOADING GRAVITAS SIGNAL...
            </p>
          </div>
        </PluginShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Intro ───────────────────────────────────────────────

  if (phase === "intro") {
    return (
      <DesktopOnly toolName="Mirror">
        <PluginShell title="MIRROR" category="DIAGNOSTIC" status="READY" statusColor="text-green-700">
          <div className="flex flex-col items-center justify-center px-8 py-12 space-y-8">
            {/* CRT-style intro text */}
            <div className="max-w-lg text-center space-y-6">
              <h2 className="text-green-400 font-pixel text-lg tracking-widest uppercase">
                Go Deeper
              </h2>
              <div className="space-y-4 text-green-300/80 text-sm leading-relaxed font-mono">
                <p>
                  Gravitas showed you the field — the shape of your leadership gravity.
                </p>
                <p>
                  Mirror looks underneath. Not at what you do, but at what you protect.
                  What you carry. What it costs.
                </p>
                <p>
                  Seven questions. No right answers. Just honest ones.
                </p>
              </div>
            </div>

            {/* Begin button */}
            <button
              onClick={() => {
                setPhase("core_questions");
              }}
              className={cn(
                "px-8 py-3 rounded-sm border transition-all duration-300",
                "bg-green-900/20 border-green-700/50 text-green-400",
                "hover:bg-green-900/40 hover:border-green-500/70 hover:text-green-300",
                "hover:shadow-[0_0_15px_rgba(74,222,128,0.15)]",
                "font-pixel text-sm tracking-widest uppercase",
              )}
            >
              Begin
            </button>

            {/* Gravitas signal indicator */}
            {gravitasPrior && (
              <div className="text-[10px] font-pixel text-[#333] tracking-widest uppercase">
                SIGNAL: {gravitasPrior.archetype} / {gravitasPrior.leak} LEAK / {gravitasPrior.force} FORCE
              </div>
            )}
          </div>
        </PluginShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Core Questions ──────────────────────────────────────

  if (phase === "core_questions" && currentQuestion) {
    return (
      <DesktopOnly toolName="Mirror">
        <PluginShell
          title="MIRROR"
          category="DIAGNOSTIC"
          status="ACTIVE"
          statusColor="text-green-500"
          footerControls={
            <div className="flex items-center gap-4 w-full">
              {/* Progress bar */}
              <div className="flex-1 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-800 transition-all duration-500 ease-out"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <span className="text-[10px] font-pixel text-[#444] tracking-widest">
                {progress.current}/{progress.total}
              </span>
            </div>
          }
        >
          <div className="px-6 md:px-10 py-8 space-y-8">
            {/* Question text */}
            <div
              key={currentQuestion.id}
              className="animate-[fadeIn_0.4s_ease-out]"
            >
              <p className="text-green-400 text-base md:text-lg leading-relaxed font-mono max-w-2xl">
                {currentQuestion.text}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 max-w-2xl">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  disabled={isTransitioning}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-sm border transition-all duration-300",
                    "font-mono text-sm leading-relaxed",
                    selectedOption === option.id
                      ? "bg-green-900/30 border-green-500/60 text-green-300 shadow-[0_0_10px_rgba(74,222,128,0.1)]"
                      : "bg-[#0a0a0a] border-[#222] text-green-300/70 hover:border-green-800/50 hover:bg-[#111] hover:text-green-300",
                    isTransitioning && selectedOption !== option.id && "opacity-40",
                  )}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animation: "fadeIn 0.3s ease-out backwards",
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          {/* Inline keyframes */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </PluginShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Confirmation Pair ───────────────────────────────────

  if (phase === "confirmation_pair" && activePair) {
    return (
      <DesktopOnly toolName="Mirror">
        <PluginShell title="MIRROR" category="DIAGNOSTIC" status="REFINING" statusColor="text-amber-600">
          <div className="px-6 md:px-10 py-8 space-y-8">
            <div className="space-y-3">
              <p className="text-amber-500/80 font-pixel text-xs tracking-widest uppercase">
                One more distinction
              </p>
              <p className="text-green-400/80 text-sm font-mono leading-relaxed max-w-2xl">
                Both of these may feel partially true. Choose the one that feels
                <em> more </em> true under real pressure.
              </p>
            </div>

            <div className="space-y-4 max-w-2xl">
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
                className={cn(
                  "w-full text-left px-6 py-5 rounded-sm border transition-all duration-300",
                  "font-mono text-sm leading-relaxed",
                  selectedOption === activePair.option_a.id
                    ? "bg-green-900/30 border-green-500/60 text-green-300"
                    : "bg-[#0a0a0a] border-[#222] text-green-300/70 hover:border-green-800/50 hover:bg-[#111] hover:text-green-300",
                  isTransitioning && selectedOption !== activePair.option_a.id && "opacity-40",
                )}
              >
                {activePair.option_a.text}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#222]" />
                <span className="text-[10px] font-pixel text-[#444] tracking-widest">OR</span>
                <div className="flex-1 h-px bg-[#222]" />
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
                className={cn(
                  "w-full text-left px-6 py-5 rounded-sm border transition-all duration-300",
                  "font-mono text-sm leading-relaxed",
                  selectedOption === activePair.option_b.id
                    ? "bg-green-900/30 border-green-500/60 text-green-300"
                    : "bg-[#0a0a0a] border-[#222] text-green-300/70 hover:border-green-800/50 hover:bg-[#111] hover:text-green-300",
                  isTransitioning && selectedOption !== activePair.option_b.id && "opacity-40",
                )}
              >
                {activePair.option_b.text}
              </button>
            </div>
          </div>
        </PluginShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Adaptive Question ───────────────────────────────────

  if (phase === "adaptive_question" && adaptiveQuestion) {
    return (
      <DesktopOnly toolName="Mirror">
        <PluginShell title="MIRROR" category="DIAGNOSTIC" status="DEEPENING" statusColor="text-amber-600">
          <div className="px-6 md:px-10 py-8 space-y-8">
            <div className="space-y-3">
              <p className="text-amber-500/80 font-pixel text-xs tracking-widest uppercase">
                One more
              </p>
              <p className="text-green-400 text-base md:text-lg leading-relaxed font-mono max-w-2xl">
                {adaptiveQuestion.text}
              </p>
            </div>

            <div className="space-y-3 max-w-2xl">
              {adaptiveQuestion.options.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => handleAdaptiveSelect(option)}
                  disabled={isTransitioning}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-sm border transition-all duration-300",
                    "font-mono text-sm leading-relaxed",
                    selectedOption === option.id
                      ? "bg-green-900/30 border-green-500/60 text-green-300"
                      : "bg-[#0a0a0a] border-[#222] text-green-300/70 hover:border-green-800/50 hover:bg-[#111] hover:text-green-300",
                    isTransitioning && selectedOption !== option.id && "opacity-40",
                  )}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animation: "fadeIn 0.3s ease-out backwards",
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </PluginShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Scoring ─────────────────────────────────────────────

  if (phase === "scoring") {
    return (
      <DesktopOnly toolName="Mirror">
        <PluginShell title="MIRROR" category="DIAGNOSTIC" status="PROCESSING" statusColor="text-green-500">
          <div className="flex flex-col items-center justify-center h-64 space-y-6">
            <div className="w-48 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{
                  animation: "scoringBar 1.5s ease-out forwards",
                }}
              />
            </div>
            <p className="text-green-800 font-pixel text-xs tracking-widest uppercase animate-pulse">
              Assembling your reading...
            </p>
          </div>

          <style>{`
            @keyframes scoringBar {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </PluginShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Fallback ────────────────────────────────────────────

  return (
    <DesktopOnly toolName="Mirror">
      <PluginShell title="MIRROR" category="DIAGNOSTIC" status="OFF" statusColor="text-red-900">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-900 font-pixel text-sm">
            NO GRAVITAS SIGNAL DETECTED
          </p>
        </div>
      </PluginShell>
    </DesktopOnly>
  );
}
