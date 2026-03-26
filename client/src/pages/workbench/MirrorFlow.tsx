/**
 * MirrorFlow — The Mirror Question Experience
 *
 * Three-act cinematic flow:
 *   Act 1 (Approach): Wide conservatory shot, slow Ken Burns zoom
 *   Act 2 (Threshold): Fade to black, ritual framing text, "Look Into the Basin"
 *   Act 3 (Basin): Close basin view — ALL answer texts visible around the lower
 *                   arc of the basin. Drag/scroll knob to cycle highlight.
 *                   Click highlighted answer to confirm.
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

const GOLD = {
  active: "#d4a853",       // warm gold, full brightness for active answer
  inactive: "#c5a059",     // same warm gold, just dimmer via opacity
  question: "#C9A84C",     // warm antique gold, same family as answer text
  muted: "#8b7340",        // muted gold for UI chrome
  glow: "rgba(197,160,89,0.35)",
  faintGlow: "rgba(197,160,89,0.12)",
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
// Uses polar coordinates: center of basin as origin, answers placed at
// angles along the lower semicircle (210° to 330° for 4 options,
// 200° to 340° for 5 options).
//
// The basin's dark water is an ellipse roughly centered in the content area.
// We use percentage-based x/y from the content area's top-left.

function getArcPositions(count: number): { x: number; y: number; rotation: number }[] {
  // Hand-tuned positions to match the concept art exactly.
  // Answers follow the lower arc of the basin, with outer answers higher
  // (following the rim curvature) and inner answers lower (closer to bottom).
  // All positions are percentages of the content area.

  if (count === 2) {
    // Confirmation pair: left and right, centered vertically in lower basin
    return [
      { x: 28, y: 58, rotation: -2 },
      { x: 72, y: 58, rotation: 2 },
    ];
  }

  if (count === 4) {
    // 4 options: spread across lower arc like compass points 7→5 o'clock
    // Outer answers sit higher (following the rim), inner answers sit lower
    return [
      { x: 28, y: 62, rotation: -3 },
      { x: 44, y: 72, rotation: -1 },
      { x: 56, y: 72, rotation: 1 },
      { x: 72, y: 62, rotation: 3 },
    ];
  }

  // 5 options: spread across lower arc from ~7 o'clock to ~5 o'clock
  // Two-row layout: positions 1,3,5 on upper row; 2,4 on lower row
  // Wider horizontal spread to prevent overlap with long answer text
  return [
    { x: 25, y: 57, rotation: -4 },   // far left, upper row — ~7 o'clock (shifted right+down into dark water)
    { x: 35, y: 68, rotation: -2 },   // left-center, lower row — ~8 o'clock
    { x: 50, y: 54, rotation: 0 },    // dead center, upper row — ~6 o'clock
    { x: 65, y: 68, rotation: 2 },    // right-center, lower row — ~4 o'clock
    { x: 80, y: 54, rotation: 4 },    // far right, upper row — ~5 o'clock
  ];
}

// ─── Basin Question Component ────────────────────────────────────────
// Single answer at a time, displayed as SVG curved text.
// Knob/arrows cycle, click or Enter confirms.

function splitIntoLines(text: string, wordsPerLine: number = 6): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '));
  }
  return lines;
}

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

  // ─── Drag-to-turn knob interaction ────────────────────────────────
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragAccumulated = useRef(0);

  const handleKnobMouseDown = useCallback((e: React.MouseEvent) => {
    if (isTransitioning || confirmed) return;
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragAccumulated.current = 0;
    e.preventDefault();
  }, [isTransitioning, confirmed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || isTransitioning || confirmed) return;
      const delta = dragStartY.current - e.clientY;
      dragAccumulated.current += delta;
      dragStartY.current = e.clientY;

      // Every ~25px of drag = advance one option
      if (Math.abs(dragAccumulated.current) > 25) {
        const direction = dragAccumulated.current > 0 ? 1 : -1;
        setActiveIndex((prev) => {
          const next = prev + direction;
          return ((next % options.length) + options.length) % options.length;
        });
        dragAccumulated.current = 0;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [options.length, isTransitioning, confirmed]);

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

  const lines = splitIntoLines(options[activeIndex].text, 6);
  const totalLines = lines.length;

  return (
    <div
      className="relative w-full select-none outline-none"
      style={{ height: "60vh", maxHeight: "600px" }}
      tabIndex={0}
    >
      {/* Question text */}
      <div
        key={question.id}
        className="absolute left-1/2 -translate-x-1/2 text-center px-6"
        style={{
          top: "18%",
          width: "85%",
          animation: "basinTextReveal 0.6s ease-out",
        }}
      >
        <p
          className="text-2xl md:text-3xl lg:text-4xl leading-snug"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: GOLD.question,
            textShadow: `0 0 20px rgba(232,220,200,0.2), 0 2px 8px rgba(0,0,0,0.6)`,
          }}
        >
          {question.text}
        </p>
      </div>

      {/* Single answer — SVG curved text */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        key={`answer-${activeIndex}`}
        onClick={handleConfirm}
        style={{
          top: "58%",
          width: "80%",
          transform: "translateX(-50%)",
          animation: "basinTextReveal 0.35s ease-out",
          cursor: "pointer",
        }}
      >
        <svg
          viewBox="0 0 500 160"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {lines.map((_, i) => (
              <path
                key={`curve-${i}`}
                id={`curve-${i}`}
                d={`M 30 ${50 + (totalLines - 1 - i) * 42} Q 250 ${100 + (totalLines - 1 - i) * 42} 470 ${50 + (totalLines - 1 - i) * 42}`}
                fill="none"
              />
            ))}
          </defs>
          {lines.map((line, i) => (
            <text
              key={`line-${i}`}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "17px",
                fill: GOLD.active,
                filter: `drop-shadow(0 0 6px ${GOLD.glow})`,
              }}
            >
              <textPath
                href={`#curve-${i}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {line}
              </textPath>
            </text>
          ))}
        </svg>
      </div>

      {/* Navigation dots */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex gap-3"
        style={{ top: "78%", transform: "translateX(-50%)" }}
      >
        {options.map((_, idx) => (
          <div
            key={idx}
            onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
            style={{
              width: idx === activeIndex ? "8px" : "6px",
              height: idx === activeIndex ? "8px" : "6px",
              borderRadius: "50%",
              backgroundColor: GOLD.active,
              opacity: idx === activeIndex ? 1 : 0.3,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Confirm hint */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{ top: "85%", transform: "translateX(-50%)", opacity: 0.4 }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "11px",
            fontStyle: "italic",
            color: GOLD.muted,
            letterSpacing: "0.12em",
          }}
        >
          click to choose · scroll or drag knob to cycle
        </span>
      </div>

      {/* Invisible knob overlay */}
      <div
        className="absolute left-1/2 -translate-x-1/2 select-none"
        style={{
          bottom: "-8%",
          zIndex: 30,
          width: "80px",
          height: "80px",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          opacity: 0,
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        onMouseDown={handleKnobMouseDown}
        onWheel={handleWheel}
      />

      <style>{`
        @keyframes basinTextReveal {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Basin Pair Component ────────────────────────────────────────────
// Two long-form options visible. Drag/scroll knob toggles, click confirms.

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

  const positions = useMemo(() => getArcPositions(2), []);

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

  // ─── Drag-to-turn knob interaction ────────────────────────────────
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragAccumulated = useRef(0);

  const handleKnobMouseDown = useCallback((e: React.MouseEvent) => {
    if (isTransitioning || confirmed) return;
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragAccumulated.current = 0;
    e.preventDefault();
  }, [isTransitioning, confirmed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || isTransitioning || confirmed) return;
      const delta = dragStartY.current - e.clientY;
      dragAccumulated.current += delta;
      dragStartY.current = e.clientY;

      if (Math.abs(dragAccumulated.current) > 25) {
        setActiveIndex((prev) => (prev === 0 ? 1 : 0));
        dragAccumulated.current = 0;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isTransitioning, confirmed]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isTransitioning || confirmed) return;
      e.preventDefault();
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    },
    [isTransitioning, confirmed],
  );

  return (
    <div
      className="relative w-full select-none outline-none"
      style={{ height: "60vh", maxHeight: "600px" }}
      tabIndex={0}
    >
      {/* Header */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{ top: "3%" }}
      >
        <span
          className="font-pixel text-[9px] tracking-widest uppercase"
          style={{ color: GOLD.muted, opacity: 0.6 }}
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

      {/* Two options — positioned on the arc */}
      {pairOptions.map((opt, idx) => {
        const isActive = idx === activeIndex;
        const isConfirmed = confirmed && isActive;
        const pos = positions[idx];

        return (
          <div
            key={opt.id}
            className="absolute select-none"
            onClick={() => {
              if (isTransitioning || confirmed) return;
              if (isActive) {
                handleConfirm();
              } else {
                setActiveIndex(idx);
              }
            }}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
              maxWidth: "200px",
              zIndex: isActive ? 20 : 10,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <p
              className="text-xs leading-snug transition-all duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontStyle: "italic",
                color: GOLD.active,
                opacity: isConfirmed ? 1 : isActive ? 1 : 0.7,
                textShadow: isConfirmed
                  ? `0 0 18px ${GOLD.glow}, 0 0 36px ${GOLD.faintGlow}`
                  : isActive
                    ? `0 0 12px ${GOLD.glow}, 0 1px 4px rgba(0,0,0,0.5)`
                    : `0 1px 3px rgba(0,0,0,0.5)`,
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
        style={{ top: "55%", transform: "translate(-50%, -50%)", opacity: 0.2 }}
      >
        <span
          className="font-pixel text-[8px] tracking-widest"
          style={{ color: PARCHMENT.faint }}
        >
          OR
        </span>
      </div>

      {/* Invisible knob overlay */}
      <div
        className="absolute left-1/2 -translate-x-1/2 select-none"
        style={{
          bottom: "-12%",
          zIndex: 30,
          width: "70px",
          height: "70px",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          opacity: 0,
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        onMouseDown={handleKnobMouseDown}
        onWheel={handleWheel}
      />
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
            style={{ color: GOLD.muted }}
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
                color: GOLD.active,
                textShadow: `0 0 20px ${GOLD.glow}`,
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
                  color: GOLD.active,
                  borderColor: GOLD.muted,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GOLD.active;
                  e.currentTarget.style.boxShadow = `0 0 15px ${GOLD.faintGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = GOLD.muted;
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
        <MirrorShell>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-32 h-[1px] overflow-hidden" style={{ backgroundColor: "rgba(197,160,89,0.2)" }}>
              <div
                className="h-full"
                style={{
                  backgroundColor: GOLD.active,
                  animation: "scoringBar 1.5s ease-out forwards",
                }}
              />
            </div>
            <p
              className="font-pixel text-[10px] tracking-widest uppercase animate-pulse"
              style={{ color: GOLD.muted }}
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
