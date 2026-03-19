/*
 * RotaryKnob — Premium tactile rotary control.
 *
 * Design goals (Apple Digital Crown / high-end audio gear):
 *   • 21 detent positions (0, 5, 10 … 100) with magnetic snap
 *   • Momentum / inertia on fast release
 *   • Layered click audio (noise burst + bandpass, speed-responsive)
 *   • Haptic pulse on supported devices
 *   • Visual glow, progressive tick illumination, grab state
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface RotaryKnobProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

/* ─── Audio Engine (sample-based) ─── */
const CLICK_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/7WRWMpfknMabtFgkWWC7KJ/knob-click_65005c8d.mp3";

let _audioCtx: AudioContext | null = null;
let _clickBuffer: AudioBuffer | null = null;
let _loadingClick = false;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return _audioCtx;
}

/** Fetch and decode the mechanical click sample from CDN (cached after first load). */
async function loadClickBuffer(): Promise<void> {
  const ctx = getAudioCtx();
  if (!ctx || _clickBuffer || _loadingClick) return;
  _loadingClick = true;
  try {
    const resp = await fetch(CLICK_URL);
    const arrayBuf = await resp.arrayBuffer();
    _clickBuffer = await ctx.decodeAudioData(arrayBuf);
  } catch (e) {
    console.warn("[RotaryKnob] Failed to load click sample:", e);
  } finally {
    _loadingClick = false;
  }
}

/**
 * Play a single detent click using the mechanical click sample.
 * @param speed 0–1 normalized drag speed. Affects volume + playback rate.
 */
function playDetentClick(speed: number = 0.3) {
  const ctx = getAudioCtx();
  if (!ctx || !_clickBuffer) return;
  if (ctx.state === "suspended") ctx.resume();

  const source = ctx.createBufferSource();
  source.buffer = _clickBuffer;

  // Playback rate: faster drag → slightly higher pitch for variety
  source.playbackRate.value = 0.92 + Math.random() * 0.16 + speed * 0.2;

  // Gain: faster drag → slightly louder (but never harsh)
  const gain = ctx.createGain();
  const vol = 0.15 + speed * 0.25; // 0.15 – 0.40
  gain.gain.value = Math.min(vol, 0.45);

  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

/** Play endpoint thunk: same sample but pitched down and louder for weight. */
function playEndpointThunk() {
  const ctx = getAudioCtx();
  if (!ctx || !_clickBuffer) return;
  if (ctx.state === "suspended") ctx.resume();

  const source = ctx.createBufferSource();
  source.buffer = _clickBuffer;
  source.playbackRate.value = 0.6; // pitched down for a heavier "thunk"

  const gain = ctx.createGain();
  gain.gain.value = 0.5;

  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

/** Haptic pulse for supported devices. */
function hapticTick() {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(4);
  }
}

/* ─── Component ─── */
export default function RotaryKnob({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  className,
}: RotaryKnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);

  // Drag tracking
  const startY = useRef(0);
  const startValue = useRef(0);
  const lastValue = useRef(value);
  const lastDetent = useRef(Math.round(value / 5));
  const lastTime = useRef(0);
  const velocity = useRef(0);

  // Momentum animation
  const momentumRaf = useRef<number>(0);
  const momentumValue = useRef(value);

  // Keep lastValue in sync when value changes externally
  useEffect(() => {
    lastValue.current = value;
    lastDetent.current = Math.round(value / 5);
    momentumValue.current = value;
  }, [value]);

  const range = max - min;

  /** Snap to nearest detent (every 5 units) with magnetic pull. */
  const snapToDetent = useCallback(
    (raw: number): number => {
      const detentSize = 5;
      const snapped = Math.round(raw / detentSize) * detentSize;
      // Magnetic pull: if within 1.5 units of a detent, snap fully
      const dist = Math.abs(raw - snapped);
      if (dist < 1.5) return Math.max(min, Math.min(max, snapped));
      return Math.max(min, Math.min(max, raw));
    },
    [min, max],
  );

  /** Process a new raw value: snap, play audio, fire onChange. */
  const processValue = useCallback(
    (raw: number, dragSpeed: number = 0.3) => {
      const clamped = Math.max(min, Math.min(max, raw));
      const snapped = snapToDetent(clamped);
      const newDetent = Math.round(snapped / 5);

      // Detect endpoint hit
      const wasAtEnd =
        lastValue.current <= min + 0.5 || lastValue.current >= max - 0.5;
      const isAtEnd = snapped <= min + 0.5 || snapped >= max - 0.5;
      if (isAtEnd && !wasAtEnd) {
        playEndpointThunk();
        hapticTick();
      }

      // Detent crossed → click + haptic
      if (newDetent !== lastDetent.current) {
        playDetentClick(dragSpeed);
        hapticTick();
        lastDetent.current = newDetent;
      }

      lastValue.current = snapped;

      // Snap to step for the actual output
      const stepped = step
        ? Math.round(snapped / step) * step
        : snapped;
      onChange(Math.max(min, Math.min(max, stepped)));
    },
    [min, max, step, onChange, snapToDetent],
  );

  /* ─── Pointer Handlers ─── */
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Cancel any running momentum
    if (momentumRaf.current) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = 0;
    }

    setIsDragging(true);
    startY.current = e.clientY;
    startValue.current = value;
    lastTime.current = performance.now();
    velocity.current = 0;

    (e.target as Element).setPointerCapture(e.pointerId);
    document.body.classList.add("knob-dragging");

    // Resume audio context and preload click sample on first interaction
    const ctx = getAudioCtx();
    if (ctx?.state === "suspended") ctx.resume();
    loadClickBuffer();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const now = performance.now();
    const dt = Math.max(now - lastTime.current, 1);
    const deltaY = startY.current - e.clientY;

    // Variable sensitivity: slow drag = fine, fast drag = coarse
    const pixelSpeed = Math.abs(e.movementY) / dt; // px/ms
    const sensitivity = 180 + Math.min(pixelSpeed * 40, 80); // 180–260px for full range
    const deltaValue = (deltaY / sensitivity) * range;

    const raw = startValue.current + deltaValue;

    // Track velocity for momentum
    const valueDelta = raw - lastValue.current;
    velocity.current = valueDelta / dt; // units/ms

    lastTime.current = now;

    const speed = Math.min(Math.abs(velocity.current) * 8, 1); // normalize 0–1
    processValue(raw, speed);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
    document.body.classList.remove("knob-dragging");

    // Momentum: if velocity is significant, coast to a stop
    const v = velocity.current;
    if (Math.abs(v) > 0.02) {
      momentumValue.current = lastValue.current;
      let vel = v;
      const friction = 0.92; // deceleration per frame

      const tick = () => {
        vel *= friction;
        if (Math.abs(vel) < 0.005) {
          // Final snap to nearest detent
          const final5 = Math.round(momentumValue.current / 5) * 5;
          processValue(final5, 0.1);
          momentumRaf.current = 0;
          return;
        }
        momentumValue.current += vel * 16; // ~16ms per frame
        const speed = Math.min(Math.abs(vel) * 8, 1);
        processValue(momentumValue.current, speed);
        momentumRaf.current = requestAnimationFrame(tick);
      };
      momentumRaf.current = requestAnimationFrame(tick);
    } else {
      // Snap to nearest detent on release
      const final5 = Math.round(lastValue.current / 5) * 5;
      processValue(final5, 0.1);
    }
  };

  // Cleanup momentum on unmount
  useEffect(() => {
    return () => {
      if (momentumRaf.current) cancelAnimationFrame(momentumRaf.current);
    };
  }, []);

  /* ─── Visual Calculations ─── */
  const percentage = (value - min) / (max - min);
  const rotation = -135 + percentage * 270;

  // Unique IDs for SVG gradients (avoid clashes if multiple knobs)
  const uid = useRef(`knob-${Math.random().toString(36).slice(2, 8)}`).current;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 select-none touch-none",
        className,
      )}
    >
      <div
        ref={knobRef}
        className={cn(
          "relative w-24 h-24 cursor-ns-resize group touch-none transition-transform duration-200",
          isHovering && !isDragging && "scale-[1.03]",
          isDragging && "scale-[1.01]",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => { setIsHovering(true); loadClickBuffer(); }}
        onMouseLeave={() => setIsHovering(false)}
        style={{ touchAction: "none" }}
      >
        {/* Glow ring when grabbed */}
        <div
          className={cn(
            "absolute -inset-1 rounded-full transition-opacity duration-300 pointer-events-none",
            isDragging ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.12) 40%, transparent 70%)",
          }}
        />

        {/* Shadow behind knob */}
        <div
          className={cn(
            "absolute inset-2 rounded-full blur-md transform translate-y-2 translate-x-1 transition-all duration-200",
            isDragging ? "bg-black/70 blur-lg translate-y-1" : "bg-black/60",
          )}
        />

        {/* The Knob SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-2xl overflow-visible pointer-events-none"
        >
          <defs>
            <linearGradient
              id={`${uid}-body`}
              x1="20%"
              y1="20%"
              x2="80%"
              y2="80%"
            >
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>

            <radialGradient
              id={`${uid}-face`}
              cx="50%"
              cy="50%"
              r="50%"
              fx="30%"
              fy="30%"
            >
              <stop offset="0%" stopColor={isDragging ? "#3a3a3a" : "#333"} />
              <stop offset="100%" stopColor={isDragging ? "#161616" : "#111"} />
            </radialGradient>

            <pattern
              id={`${uid}-knurl`}
              x="0"
              y="0"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <rect width="2" height="4" fill="#151515" />
              <rect x="2" width="2" height="4" fill="#1a1a1a" />
            </pattern>

            {/* Glow filter for indicator */}
            <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Ring (Knurled Texture Base) */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill={`url(#${uid}-knurl)`}
            stroke="#0a0a0a"
            strokeWidth="1"
          />
          <circle cx="50" cy="50" r="48" fill="black" fillOpacity="0.3" />

          {/* Inner Body (Side) */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill={`url(#${uid}-body)`}
            stroke="#000"
            strokeWidth="0.5"
          />

          {/* Top Face (Matte Plastic) */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill={`url(#${uid}-face)`}
            stroke="#333"
            strokeWidth="0.5"
          />

          {/* Inner Shadow for Top Face (Depth) */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeOpacity="0.3"
          />

          {/* Rotating Group */}
          <g transform={`rotate(${rotation} 50 50)`}>
            {/* Indicator groove (indented channel) */}
            <rect
              x="48.5"
              y="18"
              width="3"
              height="14"
              rx="1"
              fill="#000"
              fillOpacity="0.8"
            />
            {/* Indicator line — brightens when dragging */}
            <rect
              x="49.5"
              y="19"
              width="1"
              height="12"
              rx="0.5"
              fill={isDragging ? "#d4af37" : "#fff"}
              fillOpacity={isDragging ? 1 : 0.9}
              filter={isDragging ? `url(#${uid}-glow)` : undefined}
            />
          </g>

          {/* Top-Left Highlight (Specular Reflection) */}
          <path
            d="M 25 25 Q 50 10 75 25"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity={isDragging ? 0.2 : 0.15}
            strokeLinecap="round"
          />

          {/* Bottom-Right Rim Light (Bounce) */}
          <path
            d="M 30 75 Q 50 85 70 75"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.05"
            strokeLinecap="round"
          />
        </svg>

        {/* Tick Marks (Static Ring) — progressive illumination */}
        <div className="absolute -inset-3 pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible"
          >
            {[...Array(21)].map((_, i) => {
              const rot = -135 + i * (270 / 20);
              const isActive = rotation >= rot;
              const isMajor = i % 2 === 0; // every other tick is major

              return (
                <g key={i} transform={`rotate(${rot} 50 50)`}>
                  <line
                    x1="50"
                    y1={isMajor ? "1" : "3"}
                    x2="50"
                    y2={isMajor ? "8" : "7"}
                    stroke={
                      isActive
                        ? isDragging
                          ? "#d4af37"
                          : "#888"
                        : "#2a2a2a"
                    }
                    strokeWidth={isMajor ? "1.5" : "1"}
                    strokeLinecap="round"
                    style={{
                      transition: "stroke 0.15s ease",
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Label */}
      {label && (
        <div
          className={cn(
            "text-[10px] font-pixel tracking-widest uppercase drop-shadow-sm mt-1 select-none transition-colors duration-300",
            isDragging ? "text-[#d4af37]" : "text-[#555]",
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}
