/*
 * MANIFESTO RUNNER — Hardcoded Scroll-Driven Animation
 *
 * A choreographed pixel-art animation that plays along the bottom of The Map
 * page as the reader scrolls. Every jump, kill, smash, and camera move is
 * keyed to an exact scroll percentage. Not a game engine — a short film.
 *
 * CINEMATIC INTRO:
 *   - Strip is invisible on page load (opacity 0, translated down)
 *   - At ~1.5% scroll the strip slides up and fades in
 *   - Nic drops in from above with a landing dust puff
 *
 * ZONES:
 *   1 (0-25%)   Corporate landscape — goombas, buzzword bricks
 *   2 (25-50%)  Crumbling world — bats, turtles, chaos
 *   3 (50-75%)  Green growth — fewer enemies, breathing room
 *   4 (75-100%) Golden summit — victory run, flag, celebration
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { useGame } from "@/contexts/GameContext";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const CANVAS_H = 160;
const PX = 2;
const GROUND_Y = CANVAS_H - 18;
const LEVEL_LEN = 4000;

// Intro timing (scroll percentages)
// Phase 1: Canvas appears (pure darkness — just enough to see Nic drop)
const STRIP_FADE_START = 0.005;  // canvas starts to appear (pure black)
const STRIP_FADE_END = 0.012;    // canvas fully visible (still pure black)
// Phase 2: Nic drops through the darkness
const NIC_DROP_START = 0.012;
const NIC_DROP_END = 0.025;       // Nic lands (first bounce)
// Phase 3: World materializes AFTER Nic lands
const WORLD_FADE_START = 0.025;  // world starts appearing exactly when Nic touches down
const WORLD_FADE_END = 0.045;    // world fully materialized (slightly longer fade for drama)

/* ═══════════════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════════════ */

const C = {
  skin: "#e8c090", hair: "#4a3520", shirt: "#1a472a", pants: "#2d1b0e",
  saber: "#60e0ff", saberCore: "#ffffff",
  meetingBody: "#6b6b6b", meetingEyes: "#ff4444", meetingLabel: "#ffcc00",
  batWing: "#5a3a6a", batBody: "#7a4a8a", batEyes: "#ff6666",
  turtleShell: "#3a6a3a", turtleBody: "#5a8a5a", turtleFace: "#e8c090",
  brickBase: "#8a6a3a", brickHi: "#c09a5a", brickSh: "#5a4020",
  brickLabel: "#ffcc00", rebelWord: "#60e0ff",
  z1Sky: "#2a2a3a", z1Ground: "#4a4a5a", z1Bldg: "#3a3a4a",
  z2Sky: "#3a2020", z2Ground: "#5a3a3a",
  z3Sky: "#1a3a2a", z3Ground: "#2a5a3a", z3Grass: "#3a8a4a",
  z4Sky: "#1a1a3a", z4Ground: "#5a4a20", z4Gold: "#d4a017",
  gold: "#d4a017", forest: "#0d1a0a",
};

/* ═══════════════════════════════════════════════════════════════
   DRAWING HELPERS
   ═══════════════════════════════════════════════════════════════ */

function px(ctx: CanvasRenderingContext2D, ax: number, ay: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(ax * PX, ay * PX, PX, PX);
}

function pxRect(ctx: CanvasRenderingContext2D, ax: number, ay: number, aw: number, ah: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(ax * PX, ay * PX, aw * PX, ah * PX);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function easeOutBounce(t: number): number {
  if (t < 1 / 2.75) return 7.5625 * t * t;
  if (t < 2 / 2.75) { const t2 = t - 1.5 / 2.75; return 7.5625 * t2 * t2 + 0.75; }
  if (t < 2.5 / 2.75) { const t2 = t - 2.25 / 2.75; return 7.5625 * t2 * t2 + 0.9375; }
  const t2 = t - 2.625 / 2.75;
  return 7.5625 * t2 * t2 + 0.984375;
}

/* ═══════════════════════════════════════════════════════════════
   SPRITE DRAWING
   ═══════════════════════════════════════════════════════════════ */

function drawNic(ctx: CanvasRenderingContext2D, ax: number, ay: number, frame: number, alpha = 1) {
  if (alpha <= 0) return;
  ctx.globalAlpha = alpha;
  const f = frame % 4;
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect((ax - 1) * PX, ay * PX, 8 * PX, PX);
  // Legs
  const lo1 = f === 1 ? -1 : f === 3 ? 1 : 0;
  const lo2 = f === 1 ? 1 : f === 3 ? -1 : 0;
  pxRect(ctx, ax + 1 + lo1, ay - 3, 2, 3, C.pants);
  pxRect(ctx, ax + 4 + lo2, ay - 3, 2, 3, C.pants);
  pxRect(ctx, ax + lo1, ay - 1, 3, 1, "#1a1a1a");
  pxRect(ctx, ax + 4 + lo2, ay - 1, 3, 1, "#1a1a1a");
  // Torso + belt
  pxRect(ctx, ax + 1, ay - 7, 5, 4, C.shirt);
  pxRect(ctx, ax + 1, ay - 4, 5, 1, "#3a2a1a");
  px(ctx, ax + 3, ay - 4, C.gold);
  // Arms
  const armS = f === 1 ? -1 : f === 3 ? 1 : 0;
  pxRect(ctx, ax, ay - 7 + armS, 1, 2, C.shirt);
  px(ctx, ax, ay - 5 + armS, C.skin);
  pxRect(ctx, ax + 6, ay - 7, 1, 2, C.shirt);
  px(ctx, ax + 6, ay - 5, C.skin);
  // Lightsaber
  pxRect(ctx, ax + 7, ay - 6, 1, 2, "#6a6a6a");
  px(ctx, ax + 7, ay - 5, "#aaaaaa");
  const bladeLen = 8;
  for (let i = 0; i < bladeLen; i++) {
    const a = 1 - (i / bladeLen) * 0.3;
    ctx.fillStyle = `rgba(96, 224, 255, ${a * alpha})`;
    ctx.fillRect((ax + 7) * PX, (ay - 7 - i) * PX, PX, PX);
  }
  for (let i = 0; i < bladeLen - 1; i++) {
    const a = 1 - (i / bladeLen) * 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.7 * alpha})`;
    ctx.fillRect((ax + 7) * PX + 1, (ay - 7 - i) * PX + 1, PX - 2, PX - 2);
  }
  ctx.shadowColor = C.saber;
  ctx.shadowBlur = 6;
  ctx.fillStyle = `rgba(96, 224, 255, ${0.08 * alpha})`;
  ctx.fillRect((ax + 6) * PX, (ay - 7 - bladeLen) * PX, 3 * PX, (bladeLen + 2) * PX);
  ctx.shadowBlur = 0;
  // Head
  pxRect(ctx, ax + 2, ay - 11, 4, 3, C.skin);
  pxRect(ctx, ax + 1, ay - 12, 5, 2, C.hair);
  pxRect(ctx, ax + 1, ay - 11, 1, 2, C.hair);
  px(ctx, ax + 3, ay - 10, "#1a1a1a");
  px(ctx, ax + 5, ay - 10, "#1a1a1a");
  px(ctx, ax + 4, ay - 9, "#c08060");
  ctx.globalAlpha = 1;
}

/** Landing dust puff */
function drawDustPuff(ctx: CanvasRenderingContext2D, ax: number, groundAY: number, t: number) {
  if (t <= 0 || t >= 1) return;
  const alpha = 1 - t;
  ctx.globalAlpha = alpha * 0.6;
  const spread = t * 12;
  // Little dust clouds expanding outward
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const dx = Math.cos(angle) * spread;
    const dy = Math.sin(angle) * spread * 0.3; // flatter spread
    ctx.fillStyle = "#8a8a6a";
    ctx.fillRect((ax + 4 + dx) * PX, (groundAY - 1 + dy) * PX, PX, PX);
  }
  // Central cloud
  ctx.fillStyle = "#aaa";
  ctx.fillRect((ax + 2 - spread * 0.5) * PX, (groundAY - 1) * PX, (6 + spread) * PX, PX);
  ctx.globalAlpha = 1;
}

/** Enemy death: squish flat + pop particles */
function drawEnemyDeath(ctx: CanvasRenderingContext2D, ax: number, ay: number, t: number, color: string) {
  if (t <= 0 || t >= 1) return;
  const alpha = 1 - t;

  // Squished body (first 30% of animation)
  if (t < 0.3) {
    const squish = t / 0.3;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    const squishH = Math.max(1, Math.floor((1 - squish) * 6));
    const squishW = 8 + Math.floor(squish * 4);
    ctx.fillRect((ax + 4 - squishW / 2) * PX, (ay - squishH) * PX, squishW * PX, squishH * PX);
    ctx.globalAlpha = 1;
  }

  // Pop particles (after 20%)
  if (t > 0.2) {
    const pt = (t - 0.2) / 0.8;
    ctx.globalAlpha = alpha;
    const particles = [[-3, -6], [4, -8], [-5, -2], [6, -5], [0, -10], [3, -1], [-2, -9], [5, -3]];
    for (const [dx, dy] of particles) {
      ctx.fillStyle = color;
      ctx.fillRect((ax + 4 + dx * pt * 4) * PX, (ay - 4 + dy * pt * 3) * PX, PX, PX);
    }
    // Score flash: "+1"
    if (pt < 0.7) {
      ctx.fillStyle = C.gold;
      ctx.font = `bold ${PX * 4}px "Press Start 2P", monospace`;
      ctx.textAlign = "center";
      ctx.fillText("+1", (ax + 4) * PX, (ay - 10 - pt * 20) * PX);
      ctx.textAlign = "left";
    }
    ctx.globalAlpha = 1;
  }
}

function drawGoomba(ctx: CanvasRenderingContext2D, ax: number, ay: number, frame: number, label: string) {
  const f = frame % 2;
  pxRect(ctx, ax + 1, ay - 7, 6, 4, C.meetingBody);
  pxRect(ctx, ax, ay - 6, 8, 3, C.meetingBody);
  pxRect(ctx, ax + 2, ay - 8, 4, 1, C.meetingBody);
  px(ctx, ax + 2, ay - 6, "#333");
  px(ctx, ax + 5, ay - 6, "#333");
  px(ctx, ax + 3, ay - 5, C.meetingEyes);
  px(ctx, ax + 5, ay - 5, C.meetingEyes);
  pxRect(ctx, ax + 3, ay - 4, 3, 1, "#333");
  const fo = f === 0 ? 0 : 1;
  pxRect(ctx, ax + 1 - fo, ay - 3, 3, 3, "#4a4a4a");
  pxRect(ctx, ax + 5 + fo, ay - 3, 3, 3, "#4a4a4a");
  ctx.fillStyle = C.meetingLabel;
  ctx.font = `bold ${PX * 4}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText(label, (ax + 4) * PX, (ay - 10) * PX);
  ctx.textAlign = "left";
}

function drawBat(ctx: CanvasRenderingContext2D, ax: number, ay: number, frame: number, label: string) {
  const wingUp = frame % 2 === 0;
  pxRect(ctx, ax + 3, ay - 4, 3, 3, C.batBody);
  px(ctx, ax + 3, ay - 3, C.batEyes);
  px(ctx, ax + 5, ay - 3, C.batEyes);
  if (wingUp) {
    pxRect(ctx, ax, ay - 5, 3, 2, C.batWing);
    pxRect(ctx, ax + 6, ay - 5, 3, 2, C.batWing);
    pxRect(ctx, ax + 1, ay - 6, 2, 1, C.batWing);
    pxRect(ctx, ax + 6, ay - 6, 2, 1, C.batWing);
  } else {
    pxRect(ctx, ax, ay - 2, 3, 2, C.batWing);
    pxRect(ctx, ax + 6, ay - 2, 3, 2, C.batWing);
  }
  ctx.fillStyle = "#cc88ff";
  ctx.font = `bold ${PX * 4}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText(label, (ax + 4) * PX, (ay - 8) * PX);
  ctx.textAlign = "left";
}

function drawTurtle(ctx: CanvasRenderingContext2D, ax: number, ay: number, frame: number, label: string) {
  const f = frame % 2;
  pxRect(ctx, ax + 1, ay - 7, 6, 4, C.turtleShell);
  pxRect(ctx, ax + 2, ay - 8, 4, 1, "#2a5a2a");
  px(ctx, ax + 3, ay - 6, "#2a5a2a");
  px(ctx, ax + 5, ay - 6, "#2a5a2a");
  pxRect(ctx, ax + 7, ay - 6, 2, 2, C.turtleFace);
  px(ctx, ax + 8, ay - 6, "#1a1a1a");
  const lo = f === 0 ? 0 : 1;
  pxRect(ctx, ax + 2 - lo, ay - 3, 2, 3, C.turtleBody);
  pxRect(ctx, ax + 5 + lo, ay - 3, 2, 3, C.turtleBody);
  ctx.fillStyle = "#88cc88";
  ctx.font = `bold ${PX * 4}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText(label, (ax + 4) * PX, (ay - 10) * PX);
  ctx.textAlign = "left";
}

function drawBrick(ctx: CanvasRenderingContext2D, ax: number, ay: number, label: string) {
  const S = 8;
  pxRect(ctx, ax, ay - S, S, S, C.brickBase);
  pxRect(ctx, ax, ay - S, S, 1, C.brickHi);
  pxRect(ctx, ax, ay - S, 1, S, C.brickHi);
  pxRect(ctx, ax, ay - 1, S, 1, C.brickSh);
  pxRect(ctx, ax + S - 1, ay - S, 1, S, C.brickSh);
  pxRect(ctx, ax + 1, ay - S / 2, S - 2, 1, C.brickSh);
  ctx.fillStyle = C.brickLabel;
  ctx.font = `bold ${PX * 3}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText(label.length > 7 ? "?" : label, (ax + S / 2) * PX, (ay - S / 2 + 1) * PX);
  ctx.textAlign = "left";
}

function drawSmash(ctx: CanvasRenderingContext2D, ax: number, ay: number, t: number, word: string) {
  const alpha = 1 - t;
  if (alpha <= 0) return;
  // Brick fragments exploding outward
  const frags: [number, number, string][] = [
    [-3, -6, C.brickBase], [4, -8, C.brickHi], [-5, -2, C.brickSh],
    [6, -5, C.brickBase], [-1, -9, C.brickHi], [3, -1, C.brickSh],
    [-4, -7, C.brickBase], [5, -3, C.brickHi],
  ];
  for (const [dx, dy, col] of frags) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = col;
    const size = t < 0.3 ? PX * 1.5 : PX;
    ctx.fillRect((ax + 4 + dx * t * 4) * PX, (ay - 4 + dy * t * 4) * PX, size, size);
  }
  // Rebel word rising up with glow
  ctx.globalAlpha = alpha;
  ctx.fillStyle = C.rebelWord;
  ctx.font = `bold ${PX * 5}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.shadowColor = C.rebelWord;
  ctx.shadowBlur = 10 * alpha;
  ctx.fillText(word, (ax + 4) * PX, (ay - 14 - t * 22) * PX);
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
}

function drawFlag(ctx: CanvasRenderingContext2D, ax: number, groundAY: number, waveT: number) {
  pxRect(ctx, ax, groundAY - 24, 1, 24, "#ccc");
  px(ctx, ax, groundAY - 24, C.gold);
  // Waving flag
  const wave = Math.sin(waveT * 3) * 1;
  ctx.fillStyle = C.z4Gold;
  ctx.fillRect((ax + 1) * PX, (groundAY - 24 + wave) * PX, 10 * PX, 6 * PX);
  ctx.fillStyle = C.forest;
  ctx.font = `bold ${PX * 3}px "Press Start 2P", monospace`;
  ctx.fillText("RL", (ax + 2) * PX, (groundAY - 20 + wave) * PX);
}

/** Victory sparkles */
function drawVictorySparkles(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (t <= 0) return;
  const alpha = Math.min(1, t * 2);
  ctx.globalAlpha = alpha * 0.8;
  // Gold sparkles rising from bottom
  for (let i = 0; i < 20; i++) {
    const sx = ((i * 137 + 42) % Math.floor(w));
    const speed = 0.5 + (i % 5) * 0.3;
    const sy = h - (t * speed * h * 1.5) + ((i * 73) % 60);
    if (sy < -10 || sy > h + 10) continue;
    const sparkleAlpha = Math.sin(t * 8 + i) * 0.5 + 0.5;
    ctx.fillStyle = i % 3 === 0 ? C.gold : i % 3 === 1 ? "#fff" : C.saber;
    ctx.globalAlpha = alpha * sparkleAlpha * 0.6;
    const size = (i % 2 === 0) ? PX : PX * 0.7;
    ctx.fillRect(sx, sy, size, size);
  }
  ctx.globalAlpha = 1;
}

/** Zone transition flash */
function drawZoneFlash(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (t <= 0 || t >= 1) return;
  const alpha = t < 0.5 ? t * 2 : (1 - t) * 2;
  ctx.globalAlpha = alpha * 0.15;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND
   ═══════════════════════════════════════════════════════════════ */

function drawBackground(ctx: CanvasRenderingContext2D, camX: number, w: number, h: number, progress: number) {
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  if (progress < 0.25) {
    grad.addColorStop(0, C.z1Sky);
    grad.addColorStop(1, "#3a3a4a");
  } else if (progress < 0.5) {
    const t = (progress - 0.25) / 0.25;
    grad.addColorStop(0, `rgb(${Math.floor(lerp(42, 58, t))},${Math.floor(lerp(42, 32, t))},${Math.floor(lerp(58, 32, t))})`);
    grad.addColorStop(1, C.z2Ground);
  } else if (progress < 0.75) {
    grad.addColorStop(0, C.z3Sky);
    grad.addColorStop(1, "#1a2a1a");
  } else {
    grad.addColorStop(0, C.z4Sky);
    grad.addColorStop(1, "#2a2a1a");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Stars / particles
  const farOff = camX * 0.1;
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < 30; i++) {
    const sx = ((i * 197 + 42) % 600) - (farOff % 600);
    const sy = (i * 131 + 42) % (h * 0.5);
    if (sx >= -4 && sx <= w + 4) {
      ctx.fillStyle = progress > 0.75 ? C.z4Gold : progress > 0.5 ? "#4a8a4a" : "#6a6a7a";
      ctx.fillRect(sx, sy, (i % 3 === 0) ? PX : 1, (i % 3 === 0) ? PX : 1);
    }
  }
  ctx.globalAlpha = 1;

  // Mid silhouettes
  const midOff = camX * 0.4;
  const gTop = GROUND_Y;
  ctx.globalAlpha = 0.35;
  if (progress < 0.3) {
    for (let i = 0; i < 12; i++) {
      const bx = i * 100 - (midOff % 1200);
      if (bx < -60 || bx > w + 60) continue;
      const bh = 30 + (i * 17) % 30;
      ctx.fillStyle = C.z1Bldg;
      ctx.fillRect(bx, gTop - bh, 40, bh);
      ctx.fillStyle = "#5a5a6a";
      for (let wy = 5; wy < bh - 8; wy += 8) {
        for (let wx = 5; wx < 35; wx += 10) {
          ctx.fillRect(bx + wx, gTop - bh + wy, 4, 4);
        }
      }
    }
  } else if (progress < 0.55) {
    for (let i = 0; i < 8; i++) {
      const bx = i * 140 - (midOff % 1120);
      if (bx < -80 || bx > w + 80) continue;
      const bh = 20 + (i * 13) % 25;
      ctx.fillStyle = "#4a2a2a";
      ctx.fillRect(bx, gTop - bh, 30, bh);
      ctx.fillRect(bx + 10, gTop - bh - 5, 10, 5);
    }
  } else if (progress < 0.8) {
    for (let i = 0; i < 10; i++) {
      const tx = i * 120 - (midOff % 1200);
      if (tx < -40 || tx > w + 40) continue;
      ctx.fillStyle = "#3a2a1a";
      ctx.fillRect(tx + 8, gTop - 25, 4, 25);
      ctx.fillStyle = "#2a5a2a";
      ctx.beginPath();
      ctx.arc(tx + 10, gTop - 30, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    for (let i = 0; i < 6; i++) {
      const mx = i * 200 - (midOff % 1200);
      if (mx < -100 || mx > w + 100) continue;
      ctx.fillStyle = "#3a3a2a";
      ctx.beginPath();
      ctx.moveTo(mx, gTop);
      ctx.lineTo(mx + 50, gTop - 50);
      ctx.lineTo(mx + 100, gTop);
      ctx.fill();
      ctx.fillStyle = "#8a8a7a";
      ctx.beginPath();
      ctx.moveTo(mx + 35, gTop - 35);
      ctx.lineTo(mx + 50, gTop - 50);
      ctx.lineTo(mx + 65, gTop - 35);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // Ground
  const gc = progress < 0.25 ? C.z1Ground : progress < 0.5 ? C.z2Ground : progress < 0.75 ? C.z3Ground : C.z4Ground;
  ctx.fillStyle = gc;
  ctx.fillRect(0, gTop, w, h - gTop);
  ctx.fillStyle = progress > 0.5 ? C.z3Grass : "#5a5a6a";
  ctx.fillRect(0, gTop, w, PX);
  const detOff = camX * 0.8;
  for (let i = 0; i < 40; i++) {
    const dx = (i * 47) - (detOff % 1880);
    if (dx >= 0 && dx <= w) {
      ctx.fillStyle = progress > 0.5 ? "#4a7a4a" : "#3a3a4a";
      ctx.fillRect(dx, gTop + 4, 1, 1);
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   CHOREOGRAPHY TIMELINE
   ═══════════════════════════════════════════════════════════════ */

type EventType = "enemy" | "block";
interface TimelineEvent {
  type: EventType;
  approachAt: number;
  jumpStartAt: number;
  peakAt: number;
  landAt: number;
  enemyType?: "goomba" | "bat" | "turtle";
  label: string;
  rebelWord?: string;
  worldX: number;
  blockY?: number;
}

function makeEvent(
  approachPct: number, type: EventType, label: string, worldX: number,
  opts?: { enemyType?: "goomba" | "bat" | "turtle"; rebelWord?: string; blockY?: number }
): TimelineEvent {
  return {
    type, approachAt: approachPct,
    jumpStartAt: approachPct + 0.005,
    peakAt: approachPct + 0.012,
    landAt: approachPct + 0.022,
    label, worldX,
    enemyType: opts?.enemyType,
    rebelWord: opts?.rebelWord,
    blockY: opts?.blockY ?? 18,
  };
}

const TIMELINE: TimelineEvent[] = [
  // ═══ ZONE 1: Corporate Landscape (0-25%) ═══
  makeEvent(0.04, "enemy", "Quick Mtg", 160, { enemyType: "goomba" }),
  makeEvent(0.07, "block", "SYNERGY", 280, { rebelWord: "PRESENCE" }),
  makeEvent(0.10, "enemy", "Standup", 400, { enemyType: "goomba" }),
  makeEvent(0.13, "enemy", "Quick Sync", 520, { enemyType: "goomba" }),
  makeEvent(0.16, "block", "ALIGN", 640, { rebelWord: "TRUTH" }),
  makeEvent(0.19, "enemy", "Hop On?", 760, { enemyType: "goomba" }),
  makeEvent(0.22, "block", "BUY-IN", 880, { rebelWord: "REPAIR" }),

  // ═══ ZONE 2: Crumbling World (25-50%) ═══
  makeEvent(0.28, "enemy", "Reply All", 1120, { enemyType: "bat" }),
  makeEvent(0.31, "enemy", "Compliance", 1240, { enemyType: "turtle" }),
  makeEvent(0.34, "block", "LEVERAGE", 1360, { rebelWord: "BELONGING" }),
  makeEvent(0.37, "enemy", "Following Up", 1480, { enemyType: "bat" }),
  makeEvent(0.40, "enemy", "Process", 1600, { enemyType: "turtle" }),
  makeEvent(0.43, "block", "OPTIMIZE", 1720, { rebelWord: "AGENCY" }),
  makeEvent(0.46, "enemy", "Urgent!", 1840, { enemyType: "bat" }),
  makeEvent(0.49, "enemy", "Per My Email", 1960, { enemyType: "bat" }),

  // ═══ ZONE 3: Green Growth (50-75%) ═══
  makeEvent(0.55, "enemy", "Grab You?", 2200, { enemyType: "goomba" }),
  makeEvent(0.60, "block", "BANDWIDTH", 2400, { rebelWord: "MEANING", blockY: 16 }),
  makeEvent(0.65, "enemy", "Quick Call", 2600, { enemyType: "goomba" }),
  makeEvent(0.70, "block", "RESOURCES", 2800, { rebelWord: "WHOLENESS", blockY: 16 }),

  // ═══ ZONE 4: Golden Summit (75-100%) ═══
  makeEvent(0.80, "enemy", "Precedent", 3200, { enemyType: "turtle" }),
  makeEvent(0.86, "enemy", "Policy", 3500, { enemyType: "turtle" }),
];

const FLAG_X = 3900;

// Zone transition scroll points
const ZONE_TRANSITIONS = [0.25, 0.50, 0.75];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ManifestoRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef(0);
  const lastProgressRef = useRef(0);
  const realTimeRef = useRef(0);
  const [visible, setVisible] = useState(true);
  const [completed, setCompleted] = useState(false);
  const { awardAchievement } = useGame();

  const getScrollProgress = useCallback(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    return docH > 0 ? Math.max(0, Math.min(1, window.scrollY / docH)) : 0;
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.width = w * dpr;
      canvas.height = CANVAS_H * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${CANVAS_H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let running = true;
    let lastTime = performance.now();
    const groundAY = Math.floor(GROUND_Y / PX);

    const render = (now: number) => {
      if (!running) return;
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      realTimeRef.current += dt;

      const progress = getScrollProgress();
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = CANVAS_H;

      // Animation frame (scroll-driven)
      const delta = Math.abs(progress - lastProgressRef.current);
      const isMoving = delta > 0.0001;
      if (isMoving) animFrameRef.current += 0.15;
      lastProgressRef.current = progress;
      const frame = Math.floor(animFrameRef.current);

      // ── INTRO PHASE 1: Canvas (dark void) fades in ──
      const stripT = Math.max(0, Math.min(1, (progress - STRIP_FADE_START) / (STRIP_FADE_END - STRIP_FADE_START)));
      const stripOpacity = stripT;

      // ── INTRO PHASE 2: Nic drops through the void ──
      const dropT = Math.max(0, Math.min(1, (progress - NIC_DROP_START) / (NIC_DROP_END - NIC_DROP_START)));
      const dropBounce = easeOutBounce(dropT);
      const nicDropOffset = progress < NIC_DROP_START ? -60 : (1 - dropBounce) * -60;
      const nicAlpha = progress < NIC_DROP_START ? 0 : Math.min(1, dropT * 2.5);

      // ── INTRO PHASE 3: World materializes when Nic lands ──
      const worldT = Math.max(0, Math.min(1, (progress - WORLD_FADE_START) / (WORLD_FADE_END - WORLD_FADE_START)));

      // Dust puff timing (appears right when Nic lands)
      const dustT = dropT > 0.85 ? Math.min(1, (dropT - 0.85) / 0.15 + (progress - NIC_DROP_END) / 0.01) : -1;

      // ── GAME PROGRESS (only starts after world is materialized) ──
      const gameProgress = Math.max(0, progress - WORLD_FADE_END) / (1 - WORLD_FADE_END);

      // ── NIC'S WORLD POSITION ──
      const nicWorldAX = gameProgress * LEVEL_LEN;

      // ── NIC'S SCREEN POSITION (moves across screen) ──
      const nicScreenFraction = lerp(0.20, 0.75, gameProgress);
      const nicScreenCSS = w * nicScreenFraction;
      const nicScreenAX = Math.floor(nicScreenCSS / PX) - 5;

      // ── CAMERA ──
      const camAX = nicWorldAX - nicScreenAX;
      const camCSS = camAX * PX;

      // ── JUMP HEIGHT ──
      let nicJumpY = 0;
      for (const evt of TIMELINE) {
        if (progress >= evt.jumpStartAt && progress <= evt.landAt) {
          const jumpDuration = evt.landAt - evt.jumpStartAt;
          const t = (progress - evt.jumpStartAt) / jumpDuration;
          const peakHeight = evt.type === "block" ? 22 : 18;
          nicJumpY = Math.sin(t * Math.PI) * peakHeight;
          break;
        }
      }

      // ── RENDER ──
      ctx.clearRect(0, 0, w, h);

      // Apply strip opacity for intro fade-in
      ctx.globalAlpha = stripOpacity;

      // Draw pure darkness first (nothing visible until Nic lands)
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);

      // World draws on top with worldT opacity (materializes when Nic lands)
      ctx.globalAlpha = stripOpacity * worldT;
      drawBackground(ctx, camCSS, w, h, progress);

      const toScreen = (worldAX: number) => worldAX - camAX;

      // World materialization flash (bright pulse when world appears)
      if (worldT > 0 && worldT < 1) {
        const matFlash = Math.sin(worldT * Math.PI) * 0.25;
        ctx.globalAlpha = stripOpacity;
        ctx.fillStyle = `rgba(255, 255, 255, ${matFlash})`;
        ctx.fillRect(0, 0, w, h);
      }

      // Zone transition flash
      for (const zt of ZONE_TRANSITIONS) {
        const flashDist = Math.abs(progress - zt);
        if (flashDist < 0.015) {
          drawZoneFlash(ctx, w, h, 1 - flashDist / 0.015);
        }
      }

      // Draw blocks (only after world materializes)
      ctx.globalAlpha = stripOpacity * worldT;
      for (const evt of TIMELINE) {
        if (evt.type !== "block") continue;
        const screenAX = toScreen(evt.worldX);
        if (screenAX < -20 || screenAX > w / PX + 20) continue;
        const blockAY = groundAY - (evt.blockY ?? 18);

        const isSmashed = progress > evt.peakAt + 0.003;
        if (isSmashed) {
          const smashT = Math.min(1, (progress - evt.peakAt - 0.003) / 0.04);
          drawSmash(ctx, screenAX, blockAY, smashT, evt.rebelWord ?? "");
        } else {
          // Brick bob animation (subtle float)
          const bob = Math.sin(realTimeRef.current * 2 + evt.worldX * 0.05) * 0.5;
          drawBrick(ctx, screenAX, blockAY + bob, evt.label);
        }
      }

      // Draw enemies (only after world materializes)
      ctx.globalAlpha = stripOpacity * worldT;
      for (const evt of TIMELINE) {
        if (evt.type !== "enemy") continue;
        const screenAX = toScreen(evt.worldX);
        if (screenAX < -20 || screenAX > w / PX + 20) continue;

        const isDead = progress > evt.peakAt + 0.003;

        if (isDead) {
          // Death animation
          const deathT = Math.min(1, (progress - evt.peakAt - 0.003) / 0.02);
          const deathColor = evt.enemyType === "goomba" ? C.meetingBody :
            evt.enemyType === "bat" ? C.batBody : C.turtleShell;
          const deathY = evt.enemyType === "bat" ? groundAY - 12 : groundAY;
          drawEnemyDeath(ctx, screenAX, deathY, deathT, deathColor);
        } else {
          const batBob = Math.sin(realTimeRef.current * 3 + evt.worldX * 0.1) * 3;
          switch (evt.enemyType) {
            case "goomba":
              drawGoomba(ctx, screenAX, groundAY, frame, evt.label);
              break;
            case "bat":
              drawBat(ctx, screenAX, groundAY - 12 - batBob, frame, evt.label);
              break;
            case "turtle":
              drawTurtle(ctx, screenAX, groundAY, frame, evt.label);
              break;
          }
        }
      }

      // Victory flag (only after world materializes)
      ctx.globalAlpha = stripOpacity * worldT;
      if (gameProgress > 0.7) {
        const flagScreenAX = toScreen(FLAG_X);
        if (flagScreenAX > -20 && flagScreenAX < w / PX + 20) {
          drawFlag(ctx, flagScreenAX, groundAY, realTimeRef.current);
        }
      }

      // Victory sparkles
      if (gameProgress > 0.92) {
        const sparkleT = (gameProgress - 0.92) / 0.08;
        drawVictorySparkles(ctx, w, h, sparkleT);
      }

      // ── NIC (drawn independently of world — he appears first in the void) ──
      ctx.globalAlpha = 1; // Reset for Nic
      const nicFeetAY = groundAY - nicJumpY + nicDropOffset;
      drawNic(ctx, nicScreenAX, nicFeetAY, isMoving ? frame : 0, nicAlpha * stripOpacity);

      // Landing dust puff
      if (dustT >= 0 && dustT < 1) {
        drawDustPuff(ctx, nicScreenAX, groundAY, dustT);
      }

      // Top fade overlay (the forest-dark vignette) — only when world is visible
      const fadeH = h * 0.35;
      const fadeGrad = ctx.createLinearGradient(0, 0, 0, fadeH);
      fadeGrad.addColorStop(0, "rgba(13, 26, 10, 1)");
      fadeGrad.addColorStop(0.5, "rgba(13, 26, 10, 0.5)");
      fadeGrad.addColorStop(1, "rgba(13, 26, 10, 0)");
      ctx.globalAlpha = stripOpacity * worldT;
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, w, fadeH);

      // Re-draw Nic on top of fade when jumping high (breaking-out effect)
      if (nicJumpY > 8) {
        drawNic(ctx, nicScreenAX, nicFeetAY, isMoving ? frame : 0, nicAlpha * stripOpacity);
      }

      ctx.globalAlpha = 1;

      // Victory achievement
      if (gameProgress > 0.95 && !completed) {
        setCompleted(true);
        awardAchievement("runner_complete");
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
    return () => { running = false; window.removeEventListener("resize", resize); };
  }, [visible, getScrollProgress, completed, awardAchievement]);

  // Container visibility driven by scroll
  const [containerOpacity, setContainerOpacity] = useState(0);
  const [containerTranslateY, setContainerTranslateY] = useState(100);

  // Update container visibility from scroll progress
  useEffect(() => {
    if (!visible) return;
    const updateContainerVisibility = () => {
      const progress = getScrollProgress();
      // Container starts sliding up and fading in at STRIP_FADE_START
      const t = Math.max(0, Math.min(1, (progress - STRIP_FADE_START) / (STRIP_FADE_END - STRIP_FADE_START)));
      setContainerOpacity(t);
      setContainerTranslateY((1 - t) * 100); // 100% -> 0%
    };
    updateContainerVisibility();
    window.addEventListener("scroll", updateContainerVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateContainerVisibility);
  }, [visible, getScrollProgress]);

  // Mobile check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return null;

  // The toggle button is always visible (so user can show/hide)
  // but the canvas container slides up from below only when scrolling begins
  return (
    <>
      {/* Toggle button — always visible at bottom-right */}
      <button
        onClick={() => setVisible(!visible)}
        className="fixed bottom-2 right-2 z-50 pointer-events-auto font-pixel text-[8px] text-gold/50 hover:text-gold bg-forest-deep/80 hover:bg-forest-deep border border-gold/20 hover:border-gold/40 px-2 py-1 rounded-sm transition-all"
      >
        {visible ? "HIDE GAME" : "SHOW GAME"}
      </button>

      {/* Game strip container — hidden on load, slides up on scroll */}
      {visible && (
        <div
          ref={containerRef}
          className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
          style={{
            height: CANVAS_H,
            opacity: containerOpacity,
            transform: `translateY(${containerTranslateY}%)`,
            willChange: "opacity, transform",
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      )}
    </>
  );
}
