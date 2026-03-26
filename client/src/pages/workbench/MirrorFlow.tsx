/**
 * MirrorFlow — The Mirror Question Experience
 *
 * Three-act cinematic flow:
 *   Act 1 (Approach): Wide conservatory shot, slow Ken Burns zoom
 *   Act 2 (Threshold): Fade to black, ritual framing text, "Look Into the Basin"
 *   Act 3 (Basin): Close basin view — ALL answer texts visible around the lower
 *                   arc of the basin rim. Knob cycles which answer glows bright.
 *                   Press/click knob to confirm.
 *
 * After questions: scoring → navigate to /workbench/mirror/reading
 *
 * Design: Warm amber/gold on dark glass. Quieter than Gravitas.
 * Functional logic is IDENTICAL to the original — only visuals changed.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  active: "#e8c55a",
  dim: "rgba(139,115,64,0.35)",
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

// ─── Arc Geometry ───────────────────────────────────────────────────
// Position answer TEXT labels along the lower arc of the basin ellipse.
// Each position includes x, y (percentage), and rotation angle.

function getArcPositions(count: number): { x: number; y: number; rotation: number }[] {
  // Hand-tuned positions for 2, 4, and 5 option layouts.
  // Answers are spread across the lower basin with staggered heights
  // to prevent text overlap while following the rim curvature.

  if (count === 2) {
    // Confirmation pair: left and right
    return [
      { x: 28, y: 55, rotation: -3 },
      { x: 72, y: 55, rotation: 3 },
    ];
  }

  if (count === 4) {
    // Q1 layout: spread across lower basin, staggered heights
    return [
      { x: 22, y: 56, rotation: -3 },   // far left, higher
      { x: 38, y: 68, rotation: -1 },    // center-left, lower
      { x: 62, y: 68, rotation: 1 },     // center-right, lower
      { x: 78, y: 56, rotation: 3 },     // far right, higher
    ];
  }

  // 5 options (Q2-Q7): two-row stagger to prevent center crowding
  // Row 1 (upper): positions 1, 3, 5 — spread wide
  // Row 2 (lower): positions 2, 4 — fill the gaps
  return [
    { x: 15, y: 52, rotation: -4 },   // far left, upper row
    { x: 33, y: 68, rotation: -1 },   // left-center, lower row
    { x: 50, y: 52, rotation: 0 },    // dead center, upper row
    { x: 67, y: 68, rotation: 1 },    // right-center, lower row
    { x: 82, y: 52, rotation: 3 },    // far right, upper row
  ];
}

// ─── Basin Question Component ────────────────────────────────────────
// All answers visible around the arc. Knob cycles highlight. Press confirms.

interface BasinQuestionProps {
  question: MirrorQuestion;
  onSelect: (option: MirrorAnswerOption) => void;
  isTransitioning: boolean;
  questionNumber: number;
  totalQuestions: number;
}

function BasinQuestion({
  question,
  onSelect,
  isTransitioning,
  questionNumber,
  totalQuestions,
}: BasinQuestionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const options = question.options;
  const positions = useMemo(() => getArcPositions(options.length), [options.length]);

  // Reset when question changes
  useEffect(() => {
    setActiveIndex(0);
    setConfirmed(false);
  }, [question.id]);

  // Keyboard: arrows cycle, Enter/Space confirms
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isTransitioning || confirmed) return;

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleConfirm();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [options.length, isTransitioning, confirmed, activeIndex]);

  // Confirm selection
  const handleConfirm = useCallback(() => {
    if (isTransitioning || confirmed) return;
    setConfirmed(true);
    onSelect(options[activeIndex]);
  }, [isTransitioning, confirmed, activeIndex, options, onSelect]);

  // Knob click = cycle forward
  const handleKnobClick = useCallback(() => {
    if (isTransitioning || confirmed) return;
    setActiveIndex((prev) => (prev + 1) % options.length);
  }, [options.length, isTransitioning, confirmed]);

  // Knob press (mousedown hold > 300ms or double-click) = confirm
  const knobPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleKnobMouseDown = useCallback(() => {
    if (isTransitioning || confirmed) return;
    knobPressTimer.current = setTimeout(() => {
      handleConfirm();
      knobPressTimer.current = null;
    }, 400);
  }, [isTransitioning, confirmed, handleConfirm]);

  const handleKnobMouseUp = useCallback(() => {
    if (knobPressTimer.current) {
      clearTimeout(knobPressTimer.current);
      knobPressTimer.current = null;
      // Short click = cycle
      handleKnobClick();
    }
  }, [handleKnobClick]);

  // Scroll/wheel on knob to cycle
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isTransitioning || confirmed) return;
      e.preventDefault();
      if (e.deltaY > 0) {
        setActiveIndex((prev) => (prev + 1) % options.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
      }
    },
    [options.length, isTransitioning, confirmed],
  );

  // Knob rotation angle based on active index
  const knobRotation = options.length > 1
    ? (activeIndex / (options.length - 1)) * 270 - 135
    : 0;

  return (
    <div
      className="relative w-full outline-none"
      style={{ height: "55vh", maxHeight: "550px" }}
      tabIndex={0}
    >
      {/* Progress dots at top */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex gap-1.5"
        style={{ top: "2%" }}
      >
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === questionNumber - 1 ? "8px" : "4px",
              height: "4px",
              backgroundColor:
                i < questionNumber - 1
                  ? AMBER.warm
                  : i === questionNumber - 1
                    ? AMBER.active
                    : AMBER.dim,
              boxShadow:
                i === questionNumber - 1
                  ? `0 0 6px ${AMBER.glow}`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Question counter */}
      <div
        className="absolute"
        style={{ top: "2%", right: "4%" }}
      >
        <span
          className="font-pixel text-[8px] tracking-widest"
          style={{ color: AMBER.dim, opacity: 0.8 }}
        >
          {questionNumber}/{totalQuestions}
        </span>
      </div>

      {/* Question text — centered in upper portion of basin */}
      <div
        key={question.id}
        className="absolute left-1/2 -translate-x-1/2 text-center px-6"
        style={{
          top: "10%",
          width: "85%",
          animation: "basinTextReveal 0.6s ease-out",
        }}
      >
        <p
          className="text-lg md:text-xl lg:text-2xl leading-snug"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: PARCHMENT.light,
            textShadow: `0 0 20px rgba(232,220,200,0.25), 0 2px 8px rgba(0,0,0,0.6)`,
          }}
        >
          {question.text}
        </p>
      </div>

      {/* Answer texts positioned around the lower arc */}
      {options.map((option, idx) => {
        const pos = positions[idx];
        const isActive = idx === activeIndex;
        const isConfirmed = confirmed && isActive;

        return (
          <div
            key={`answer-${option.id}`}
            className="absolute transition-all duration-300 text-center cursor-default select-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
              maxWidth: options.length <= 4 ? "155px" : "120px",
              zIndex: isActive ? 20 : 10,
            }}
          >
            <p
              className="text-xs leading-snug transition-all duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: isActive ? 600 : 400,
                fontStyle: "italic",
                color: isConfirmed
                  ? AMBER.active
                  : isActive
                    ? AMBER.bright
                    : AMBER.muted,
                opacity: isActive ? 1 : 0.5,
                textShadow: isConfirmed
                  ? `0 0 20px ${AMBER.glow}, 0 0 40px ${AMBER.faintGlow}`
                  : isActive
                    ? `0 0 14px ${AMBER.glow}, 0 2px 6px rgba(0,0,0,0.5)`
                    : `0 1px 4px rgba(0,0,0,0.5)`,
                transform: isActive ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease-out",
              }}
            >
              {option.text}
            </p>
          </div>
        );
      })}

      {/* Brass knob — bottom center */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: "2%", zIndex: 25 }}
      >
        <div
          className="relative cursor-pointer select-none"
          onMouseDown={handleKnobMouseDown}
          onMouseUp={handleKnobMouseUp}
          onMouseLeave={() => {
            if (knobPressTimer.current) {
              clearTimeout(knobPressTimer.current);
              knobPressTimer.current = null;
            }
          }}
          onWheel={handleWheel}
          title="Turn to cycle • Press to confirm"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: `radial-gradient(circle at 40% 35%, #c9a84c 0%, #a08030 40%, #7a6020 70%, #5a4515 100%)`,
            boxShadow: `
              0 2px 8px rgba(0,0,0,0.5),
              0 0 16px ${AMBER.faintGlow},
              inset 0 1px 2px rgba(255,255,255,0.2),
              inset 0 -1px 2px rgba(0,0,0,0.3)
            `,
            border: `1px solid rgba(160,128,48,0.4)`,
          }}
        >
          {/* Indicator notch */}
          <div
            className="absolute"
            style={{
              top: "6px",
              left: "50%",
              transform: `translateX(-50%) rotate(${knobRotation}deg)`,
              transformOrigin: "50% 20px",
              width: "3px",
              height: "10px",
              borderRadius: "1.5px",
              backgroundColor: AMBER.active,
              boxShadow: `0 0 6px ${AMBER.glow}`,
              transition: "transform 0.3s ease-out",
            }}
          />
          {/* Center dot */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "rgba(200,170,80,0.4)",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes basinTextReveal {
          from { opacity: 0; transform: translate(-50%, 0) translateY(8px); }
          to { opacity: 1; transform: translate(-50%, 0) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Basin Pair Component ────────────────────────────────────────────
// Two long-form options visible. Knob toggles, press confirms.

interface BasinPairProps {
  pair: ConfirmationPair;
  onSelect: (optionId: string, supportsFamily: PatternFamily, weight: number) => void;
  isTransitioning: boolean;
  selectedOption: string | null;
}

function BasinPair({
  pair,
  onSelect,
  isTransitioning,
  selectedOption,
}: BasinPairProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const pairOptions = useMemo(
    () => [pair.option_a, pair.option_b],
    [pair],
  );

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isTransitioning || confirmed) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev === 0 ? 1 : 0));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleConfirm();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isTransitioning, confirmed, activeIndex]);

  const handleConfirm = useCallback(() => {
    if (isTransitioning || confirmed) return;
    setConfirmed(true);
    const opt = pairOptions[activeIndex];
    onSelect(opt.id, opt.supports_family, opt.weight);
  }, [isTransitioning, confirmed, activeIndex, pairOptions, onSelect]);

  // Knob: click cycles, long-press confirms
  const knobPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleKnobMouseDown = useCallback(() => {
    if (isTransitioning || confirmed) return;
    knobPressTimer.current = setTimeout(() => {
      handleConfirm();
      knobPressTimer.current = null;
    }, 400);
  }, [isTransitioning, confirmed, handleConfirm]);

  const handleKnobMouseUp = useCallback(() => {
    if (knobPressTimer.current) {
      clearTimeout(knobPressTimer.current);
      knobPressTimer.current = null;
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }
  }, []);

  const knobRotation = activeIndex * 180;

  return (
    <div
      className="relative w-full outline-none"
      style={{ height: "55vh", maxHeight: "550px" }}
      tabIndex={0}
    >
      {/* Header */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{ top: "3%" }}
      >
        <span
          className="font-pixel text-[9px] tracking-widest uppercase"
          style={{ color: AMBER.muted, opacity: 0.6 }}
        >
          ONE MORE DISTINCTION
        </span>
      </div>

      {/* Instruction */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center px-8"
        style={{ top: "10%", width: "80%" }}
      >
        <p
          className="text-sm leading-relaxed italic"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: PARCHMENT.muted,
          }}
        >
          Both may feel partially true. Choose the one that feels{" "}
          <em>more</em> true under real pressure.
        </p>
      </div>

      {/* Two options — left and right of center */}
      {pairOptions.map((opt, idx) => {
        const isActive = idx === activeIndex;
        const isConfirmed = confirmed && isActive;
        // Position: option A on the left, option B on the right
        const xPos = idx === 0 ? 25 : 75;

        return (
          <div
            key={opt.id}
            className="absolute transition-all duration-300 text-center cursor-default select-none"
            style={{
              left: `${xPos}%`,
              top: "45%",
              transform: "translate(-50%, -50%)",
              maxWidth: "200px",
              zIndex: isActive ? 20 : 10,
            }}
          >
            <p
              className="text-xs leading-snug transition-all duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: isActive ? 600 : 400,
                fontStyle: "italic",
                color: isConfirmed
                  ? AMBER.active
                  : isActive
                    ? AMBER.bright
                    : AMBER.muted,
                opacity: isActive ? 1 : 0.4,
                textShadow: isConfirmed
                  ? `0 0 20px ${AMBER.glow}, 0 0 40px ${AMBER.faintGlow}`
                  : isActive
                    ? `0 0 14px ${AMBER.glow}, 0 2px 6px rgba(0,0,0,0.5)`
                    : `0 1px 4px rgba(0,0,0,0.5)`,
                transform: isActive ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease-out",
              }}
            >
              {opt.text}
            </p>
          </div>
        );
      })}

      {/* OR label between the two */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: "45%", transform: "translate(-50%, -50%)", opacity: 0.25 }}
      >
        <span
          className="font-pixel text-[8px] tracking-widest"
          style={{ color: PARCHMENT.faint }}
        >
          OR
        </span>
      </div>

      {/* Brass knob */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: "2%", zIndex: 25 }}
      >
        <div
          className="relative cursor-pointer select-none"
          onMouseDown={handleKnobMouseDown}
          onMouseUp={handleKnobMouseUp}
          onMouseLeave={() => {
            if (knobPressTimer.current) {
              clearTimeout(knobPressTimer.current);
              knobPressTimer.current = null;
            }
          }}
          title="Turn to cycle • Press to confirm"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: `radial-gradient(circle at 40% 35%, #c9a84c 0%, #a08030 40%, #7a6020 70%, #5a4515 100%)`,
            boxShadow: `
              0 2px 8px rgba(0,0,0,0.5),
              0 0 16px ${AMBER.faintGlow},
              inset 0 1px 2px rgba(255,255,255,0.2),
              inset 0 -1px 2px rgba(0,0,0,0.3)
            `,
            border: `1px solid rgba(160,128,48,0.4)`,
          }}
        >
          <div
            className="absolute"
            style={{
              top: "6px",
              left: "50%",
              transform: `translateX(-50%) rotate(${knobRotation}deg)`,
              transformOrigin: "50% 20px",
              width: "3px",
              height: "10px",
              borderRadius: "1.5px",
              backgroundColor: AMBER.active,
              boxShadow: `0 0 6px ${AMBER.glow}`,
              transition: "transform 0.3s ease-out",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "rgba(200,170,80,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
            }}
          />
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
    return (
      <DesktopOnly toolName="Mirror">
        <MirrorShell>
          <BasinQuestion
            question={currentQuestion}
            onSelect={handleSelectOption}
            isTransitioning={isTransitioning}
            questionNumber={progress.current}
            totalQuestions={progress.total}
          />
        </MirrorShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Confirmation Pair ───────────────────────────────────

  if (phase === "confirmation_pair" && activePair) {
    return (
      <DesktopOnly toolName="Mirror">
        <MirrorShell>
          <BasinPair
            pair={activePair}
            onSelect={handlePairSelect}
            isTransitioning={isTransitioning}
            selectedOption={selectedOption}
          />
        </MirrorShell>
      </DesktopOnly>
    );
  }

  // ─── Render: Adaptive Question ───────────────────────────────────

  if (phase === "adaptive_question" && adaptiveQuestion) {
    return (
      <DesktopOnly toolName="Mirror">
        <MirrorShell>
          <BasinQuestion
            question={adaptiveQuestion}
            onSelect={handleAdaptiveSelect}
            isTransitioning={isTransitioning}
            questionNumber={progress.total + 1}
            totalQuestions={progress.total + 1}
          />
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
