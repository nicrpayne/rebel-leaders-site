/*
 * MANIFESTO RUNNER — Sprite-Based Scroll-Driven Animation
 *
 * A choreographed pixel-art animation that plays along the bottom of The Map
 * page as the reader scrolls. Every jump, kill, smash, and camera move is
 * keyed to an exact scroll percentage. Not a game engine — a short film.
 *
 * SPRITES: Uses pre-processed sprite strip PNGs loaded from CDN.
 *   - Nic: 64x64 frames (run=4, jump=3, idle=2)
 *   - Enemies: 48x48 frames (goomba=2, bat=2, turtle=2)
 *   - Brick: 32x32, Flag: 64x64
 *
 * CINEMATIC INTRO:
 *   - Strip is invisible on page load (opacity 0, translated down)
 *   - At ~0.5% scroll the strip slides up and fades in (pure darkness)
 *   - Nic drops in from above with a landing dust puff
 *   - World materializes AFTER Nic lands
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
   CDN SPRITE URLS
   ═══════════════════════════════════════════════════════════════ */

const SPRITES = {
  nicRun:   "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/NbXkjdorVgqUcilx.png",
  nicJump:  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/DjyFCombPKtvIAse.png",
  nicIdle:  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/yJbGgdWrupYGmAAu.png",
  goomba:   "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/nBERaIlYpCEOiWnP.png",
  bat:      "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/SYHEtkMnhFfFNKbp.png",
  turtle:   "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/slKsYBACRStroewa.png",
  brick:    "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/CZIKNFXWjzlvpjEI.png",
  flag:     "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/XErroFrcgEbnlBdi.png",
};

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const CANVAS_H = 240;
const GROUND_Y = CANVAS_H - 28;
const LEVEL_LEN = 4000;

// Sprite render sizes (CSS pixels on canvas)
const NIC_SIZE = 48;
const ENEMY_SIZE = 36;
const BRICK_SIZE = 28;
const FLAG_SIZE = 56;

// Intro timing (scroll percentages)
// Strip slides up after user scrolls past the hero section
const STRIP_FADE_START = 0.03;
const STRIP_FADE_END = 0.05;
// Nic drops through darkness
const NIC_DROP_START = 0.05;
const NIC_DROP_END = 0.07;
// World materializes AFTER Nic lands (clear gap)
const WORLD_FADE_START = 0.08;
const WORLD_FADE_END = 0.12;

/* ═══════════════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════════════ */

const C = {
  saber: "#60e0ff",
  meetingBody: "#6b6b6b", meetingLabel: "#ffcc00",
  batBody: "#7a4a8a", turtleShell: "#3a6a3a",
  brickBase: "#8a6a3a", brickHi: "#c09a5a", brickSh: "#5a4020",
  brickLabel: "#ffcc00", rebelWord: "#60e0ff",
  z1Sky: "#2a2a3a", z1Ground: "#4a4a5a", z1Bldg: "#3a3a4a",
  z2Ground: "#5a3a3a",
  z3Sky: "#1a3a2a", z3Ground: "#2a5a3a", z3Grass: "#3a8a4a",
  z4Sky: "#1a1a3a", z4Ground: "#5a4a20", z4Gold: "#d4a017",
  gold: "#d4a017", forest: "#0d1a0a",
};

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

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
   IMAGE LOADER
   ═══════════════════════════════════════════════════════════════ */

interface SpriteSheet {
  img: HTMLImageElement;
  frameW: number;
  frameH: number;
  frameCount: number;
  loaded: boolean;
}

function loadSpriteSheet(url: string, frameCount: number): SpriteSheet {
  const img = new Image();
  // Note: no crossOrigin needed — CDN doesn't require CORS for rendering
  const sheet: SpriteSheet = { img, frameW: 0, frameH: 0, frameCount, loaded: false };
  img.onload = () => {
    sheet.frameW = img.naturalWidth / frameCount;
    sheet.frameH = img.naturalHeight;
    sheet.loaded = true;
  };
  img.src = url;
  return sheet;
}

function loadSingleSprite(url: string): SpriteSheet {
  return loadSpriteSheet(url, 1);
}

/* ═══════════════════════════════════════════════════════════════
   SPRITE DRAWING
   ═══════════════════════════════════════════════════════════════ */

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sheet: SpriteSheet,
  frame: number,
  cx: number,
  bottomY: number,
  renderW: number,
  renderH: number,
  alpha = 1,
) {
  if (!sheet.loaded || alpha <= 0) return;
  const f = frame % sheet.frameCount;
  const sx = f * sheet.frameW;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(
    sheet.img,
    sx, 0, sheet.frameW, sheet.frameH,
    cx - renderW / 2, bottomY - renderH, renderW, renderH
  );
  ctx.restore();
}

function drawNicSprite(
  ctx: CanvasRenderingContext2D,
  sheets: { run: SpriteSheet; jump: SpriteSheet; idle: SpriteSheet },
  cx: number,
  bottomY: number,
  frame: number,
  isMoving: boolean,
  isJumping: boolean,
  jumpT: number,
  alpha = 1,
) {
  if (alpha <= 0) return;

  let sheet: SpriteSheet;
  let spriteFrame: number;

  if (isJumping) {
    sheet = sheets.jump;
    if (jumpT < 0.35) spriteFrame = 0;
    else if (jumpT < 0.65) spriteFrame = 1;
    else spriteFrame = 2;
  } else if (isMoving) {
    sheet = sheets.run;
    spriteFrame = frame % 4;
  } else {
    sheet = sheets.idle;
    spriteFrame = frame % 2;
  }

  // Shadow on ground
  ctx.save();
  ctx.globalAlpha = alpha * 0.3;
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.beginPath();
  ctx.ellipse(cx, GROUND_Y, NIC_SIZE * 0.3, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw sprite
  drawSprite(ctx, sheet, spriteFrame, cx, bottomY, NIC_SIZE, NIC_SIZE, alpha);

  // Lightsaber glow aura
  if (alpha > 0.3) {
    ctx.save();
    ctx.globalAlpha = alpha * 0.12;
    ctx.shadowColor = C.saber;
    ctx.shadowBlur = 14;
    ctx.fillStyle = C.saber;
    ctx.beginPath();
    ctx.arc(cx + NIC_SIZE * 0.25, bottomY - NIC_SIZE * 0.55, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/* ═══════════════════════════════════════════════════════════════
   EFFECTS (procedural)
   ═══════════════════════════════════════════════════════════════ */

function drawDustPuff(ctx: CanvasRenderingContext2D, cx: number, groundY: number, t: number) {
  if (t <= 0 || t >= 1) return;
  const alpha = 1 - t;
  ctx.save();
  ctx.globalAlpha = alpha * 0.6;
  const spread = t * 20;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const dx = Math.cos(angle) * spread;
    const dy = Math.sin(angle) * spread * 0.3;
    ctx.fillStyle = "#8a8a6a";
    ctx.fillRect(cx + dx - 1, groundY - 2 + dy, 3, 3);
  }
  ctx.fillStyle = "#aaa";
  ctx.fillRect(cx - spread * 0.5, groundY - 2, spread, 2);
  ctx.restore();
}

function drawEnemyDeath(ctx: CanvasRenderingContext2D, cx: number, bottomY: number, t: number, color: string) {
  if (t <= 0 || t >= 1) return;
  const alpha = 1 - t;

  if (t < 0.3) {
    const squish = t / 0.3;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    const squishH = Math.max(2, Math.floor((1 - squish) * ENEMY_SIZE * 0.5));
    const squishW = ENEMY_SIZE * (1 + squish * 0.5);
    ctx.fillRect(cx - squishW / 2, bottomY - squishH, squishW, squishH);
    ctx.restore();
  }

  if (t > 0.2) {
    const pt = (t - 0.2) / 0.8;
    ctx.save();
    ctx.globalAlpha = alpha;
    const particles = [[-8, -12], [10, -16], [-12, -4], [14, -10], [0, -20], [8, -2], [-6, -18], [12, -6]];
    for (const [dx, dy] of particles) {
      ctx.fillStyle = color;
      ctx.fillRect(cx + dx * pt * 3, bottomY - ENEMY_SIZE / 2 + dy * pt * 2.5, 3, 3);
    }
    if (pt < 0.7) {
      ctx.fillStyle = C.gold;
      ctx.font = `bold 10px "Press Start 2P", monospace`;
      ctx.textAlign = "center";
      ctx.fillText("+1", cx, bottomY - ENEMY_SIZE - pt * 30);
      ctx.textAlign = "left";
    }
    ctx.restore();
  }
}

function drawSmash(ctx: CanvasRenderingContext2D, cx: number, cy: number, t: number, word: string) {
  const alpha = 1 - t;
  if (alpha <= 0) return;

  const frags: [number, number, string][] = [
    [-6, -10, C.brickBase], [8, -14, C.brickHi], [-10, -3, C.brickSh],
    [12, -8, C.brickBase], [-2, -16, C.brickHi], [6, -2, C.brickSh],
    [-8, -12, C.brickBase], [10, -5, C.brickHi],
  ];
  ctx.save();
  for (const [dx, dy, col] of frags) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = col;
    const size = t < 0.3 ? 4 : 3;
    ctx.fillRect(cx + dx * t * 4, cy + dy * t * 4, size, size);
  }
  ctx.globalAlpha = alpha;
  ctx.fillStyle = C.rebelWord;
  ctx.font = `bold 12px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.shadowColor = C.rebelWord;
  ctx.shadowBlur = 10 * alpha;
  ctx.fillText(word, cx, cy - 20 - t * 30);
  ctx.shadowBlur = 0;
  ctx.textAlign = "left";
  ctx.restore();
}

function drawVictorySparkles(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (t <= 0) return;
  const alpha = Math.min(1, t * 3);
  ctx.save();
  // More sparkles, bigger, more dramatic
  for (let i = 0; i < 50; i++) {
    const sx = ((i * 137 + 42) % Math.floor(w));
    const speed = 0.4 + (i % 5) * 0.25;
    const sy = h - (t * speed * h * 1.8) + ((i * 73) % 80);
    if (sy < -10 || sy > h + 10) continue;
    const sparkleAlpha = Math.sin(t * 10 + i) * 0.5 + 0.5;
    ctx.fillStyle = i % 4 === 0 ? C.gold : i % 4 === 1 ? "#fff" : i % 4 === 2 ? C.saber : "#ffdd44";
    ctx.globalAlpha = alpha * sparkleAlpha * 0.8;
    const size = (i % 3 === 0) ? 4 : (i % 3 === 1) ? 3 : 2;
    ctx.fillRect(sx, sy, size, size);
  }
  ctx.restore();
}

function drawVictoryBanner(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (t <= 0) return;
  const alpha = Math.min(1, t * 4);
  ctx.save();
  ctx.globalAlpha = alpha;

  // Golden glow behind text
  const glowAlpha = Math.sin(t * 6) * 0.15 + 0.25;
  ctx.fillStyle = `rgba(196, 164, 105, ${glowAlpha})`;
  const bannerY = h * 0.25;
  ctx.fillRect(w * 0.15, bannerY - 20, w * 0.7, 44);

  // Banner border
  ctx.strokeStyle = C.gold;
  ctx.lineWidth = 2;
  ctx.strokeRect(w * 0.15, bannerY - 20, w * 0.7, 44);

  // "REBELLION COMPLETE" text
  ctx.fillStyle = C.gold;
  ctx.font = `bold 14px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText("REBELLION COMPLETE", w / 2, bannerY + 6);

  // Subtitle
  ctx.fillStyle = "#fff";
  ctx.font = `8px "Press Start 2P", monospace`;
  ctx.fillText("The real game begins now.", w / 2, bannerY + 22);

  ctx.textAlign = "left";
  ctx.restore();
}

function drawZoneFlash(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (t <= 0 || t >= 1) return;
  const alpha = t < 0.5 ? t * 2 : (1 - t) * 2;
  ctx.save();
  ctx.globalAlpha = alpha * 0.15;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND (procedural parallax)
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

  // Stars
  const farOff = camX * 0.1;
  ctx.save();
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < 30; i++) {
    const sx = ((i * 197 + 42) % 600) - (farOff % 600);
    const sy = (i * 131 + 42) % (h * 0.5);
    if (sx >= -4 && sx <= w + 4) {
      ctx.fillStyle = progress > 0.75 ? C.z4Gold : progress > 0.5 ? "#4a8a4a" : "#6a6a7a";
      const sz = (i % 3 === 0) ? 2 : 1;
      ctx.fillRect(sx, sy, sz, sz);
    }
  }
  ctx.restore();

  // Mid silhouettes
  const midOff = camX * 0.4;
  ctx.save();
  ctx.globalAlpha = 0.35;
  if (progress < 0.3) {
    for (let i = 0; i < 12; i++) {
      const bx = i * 100 - (midOff % 1200);
      if (bx < -60 || bx > w + 60) continue;
      const bh = 40 + (i * 17) % 35;
      ctx.fillStyle = C.z1Bldg;
      ctx.fillRect(bx, GROUND_Y - bh, 45, bh);
      ctx.fillStyle = "#5a5a6a";
      for (let wy = 6; wy < bh - 10; wy += 10) {
        for (let wx = 6; wx < 40; wx += 12) {
          ctx.fillRect(bx + wx, GROUND_Y - bh + wy, 5, 5);
        }
      }
    }
  } else if (progress < 0.55) {
    for (let i = 0; i < 8; i++) {
      const bx = i * 140 - (midOff % 1120);
      if (bx < -80 || bx > w + 80) continue;
      const bh = 25 + (i * 13) % 30;
      ctx.fillStyle = "#4a2a2a";
      ctx.fillRect(bx, GROUND_Y - bh, 35, bh);
      ctx.fillRect(bx + 12, GROUND_Y - bh - 6, 12, 6);
    }
  } else if (progress < 0.8) {
    for (let i = 0; i < 10; i++) {
      const tx = i * 120 - (midOff % 1200);
      if (tx < -40 || tx > w + 40) continue;
      ctx.fillStyle = "#3a2a1a";
      ctx.fillRect(tx + 8, GROUND_Y - 30, 5, 30);
      ctx.fillStyle = "#2a5a2a";
      ctx.beginPath();
      ctx.arc(tx + 10, GROUND_Y - 36, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    for (let i = 0; i < 6; i++) {
      const mx = i * 200 - (midOff % 1200);
      if (mx < -100 || mx > w + 100) continue;
      ctx.fillStyle = "#3a3a2a";
      ctx.beginPath();
      ctx.moveTo(mx, GROUND_Y);
      ctx.lineTo(mx + 55, GROUND_Y - 55);
      ctx.lineTo(mx + 110, GROUND_Y);
      ctx.fill();
      ctx.fillStyle = "#8a8a7a";
      ctx.beginPath();
      ctx.moveTo(mx + 38, GROUND_Y - 40);
      ctx.lineTo(mx + 55, GROUND_Y - 55);
      ctx.lineTo(mx + 72, GROUND_Y - 40);
      ctx.fill();
    }
  }
  ctx.restore();

  // Ground
  const gc = progress < 0.25 ? C.z1Ground : progress < 0.5 ? C.z2Ground : progress < 0.75 ? C.z3Ground : C.z4Ground;
  ctx.fillStyle = gc;
  ctx.fillRect(0, GROUND_Y, w, h - GROUND_Y);
  ctx.fillStyle = progress > 0.5 ? C.z3Grass : "#5a5a6a";
  ctx.fillRect(0, GROUND_Y, w, 2);
  const detOff = camX * 0.8;
  ctx.save();
  ctx.globalAlpha = 0.4;
  for (let i = 0; i < 40; i++) {
    const dx = (i * 47) - (detOff % 1880);
    if (dx >= 0 && dx <= w) {
      ctx.fillStyle = progress > 0.5 ? "#4a7a4a" : "#3a3a4a";
      ctx.fillRect(dx, GROUND_Y + 5, 2, 2);
    }
  }
  ctx.restore();
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

/**
 * Auto-calculate worldX from the scroll percentage so Nic is always
 * AT the event when it triggers. The enemy/block is placed slightly
 * ahead (+30px) so Nic visually walks up to it before jumping.
 */
function pctToWorldX(pct: number): number {
  const gp = Math.max(0, pct - WORLD_FADE_END) / (1 - WORLD_FADE_END);
  return gp * LEVEL_LEN;
}

function makeEvent(
  approachPct: number, type: EventType, label: string,
  opts?: { enemyType?: "goomba" | "bat" | "turtle"; rebelWord?: string; blockY?: number }
): TimelineEvent {
  const worldX = pctToWorldX(approachPct) + 95; // enemy ahead of Nic — offset accounts for Nic's forward movement during jump
  return {
    type, approachAt: approachPct,
    jumpStartAt: approachPct + 0.005,
    peakAt: approachPct + 0.012,
    landAt: approachPct + 0.022,
    label, worldX,
    enemyType: opts?.enemyType,
    rebelWord: opts?.rebelWord,
    blockY: opts?.blockY ?? 24,
  };
}

const TIMELINE: TimelineEvent[] = [
  // Zone 1: Corporate Landscape — all events AFTER WORLD_FADE_END (0.12)
  makeEvent(0.15, "enemy", "Quick Mtg", { enemyType: "goomba" }),
  makeEvent(0.18, "block", "SYNERGY", { rebelWord: "PRESENCE" }),
  makeEvent(0.20, "enemy", "Standup", { enemyType: "goomba" }),
  makeEvent(0.22, "enemy", "Quick Sync", { enemyType: "goomba" }),
  makeEvent(0.24, "block", "ALIGN", { rebelWord: "TRUTH" }),
  makeEvent(0.26, "enemy", "Hop On?", { enemyType: "goomba" }),
  makeEvent(0.28, "block", "BUY-IN", { rebelWord: "REPAIR" }),

  // Zone 2: Crumbling World
  makeEvent(0.32, "enemy", "Reply All", { enemyType: "bat" }),
  makeEvent(0.35, "enemy", "Compliance", { enemyType: "turtle" }),
  makeEvent(0.38, "block", "LEVERAGE", { rebelWord: "BELONGING" }),
  makeEvent(0.41, "enemy", "Following Up", { enemyType: "bat" }),
  makeEvent(0.44, "enemy", "Process", { enemyType: "turtle" }),
  makeEvent(0.47, "block", "OPTIMIZE", { rebelWord: "AGENCY" }),
  makeEvent(0.50, "enemy", "Urgent!", { enemyType: "bat" }),
  makeEvent(0.53, "enemy", "Per My Email", { enemyType: "bat" }),

  // Zone 3: Green Growth
  makeEvent(0.58, "enemy", "Grab You?", { enemyType: "goomba" }),
  makeEvent(0.63, "block", "BANDWIDTH", { rebelWord: "MEANING", blockY: 22 }),
  makeEvent(0.68, "enemy", "Quick Call", { enemyType: "goomba" }),
  makeEvent(0.73, "block", "RESOURCES", { rebelWord: "WHOLENESS", blockY: 22 }),

  // Zone 4: Golden Summit
  makeEvent(0.82, "enemy", "Precedent", { enemyType: "turtle" }),
  makeEvent(0.88, "enemy", "Policy", { enemyType: "turtle" }),
];

const FLAG_X = pctToWorldX(0.95) + 95;
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

  // Load all sprite sheets once (lazy init, not in render)
  const spritesRef = useRef<{
    nicRun: SpriteSheet;
    nicJump: SpriteSheet;
    nicIdle: SpriteSheet;
    goomba: SpriteSheet;
    bat: SpriteSheet;
    turtle: SpriteSheet;
    brick: SpriteSheet;
    flag: SpriteSheet;
  } | null>(null);

  if (!spritesRef.current) {
    spritesRef.current = {
      nicRun:  loadSpriteSheet(SPRITES.nicRun, 4),
      nicJump: loadSpriteSheet(SPRITES.nicJump, 3),
      nicIdle: loadSpriteSheet(SPRITES.nicIdle, 2),
      goomba:  loadSpriteSheet(SPRITES.goomba, 2),
      bat:     loadSpriteSheet(SPRITES.bat, 2),
      turtle:  loadSpriteSheet(SPRITES.turtle, 2),
      brick:   loadSingleSprite(SPRITES.brick),
      flag:    loadSingleSprite(SPRITES.flag),
    };
  }

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
    const sprites = spritesRef.current!;

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

      // ── INTRO PHASES ──
      const stripT = Math.max(0, Math.min(1, (progress - STRIP_FADE_START) / (STRIP_FADE_END - STRIP_FADE_START)));
      const dropT = Math.max(0, Math.min(1, (progress - NIC_DROP_START) / (NIC_DROP_END - NIC_DROP_START)));
      const dropBounce = easeOutBounce(dropT);
      const nicDropOffset = progress < NIC_DROP_START ? -80 : (1 - dropBounce) * -80;
      const nicAlpha = progress < NIC_DROP_START ? 0 : Math.min(1, dropT * 2.5);
      const worldT = Math.max(0, Math.min(1, (progress - WORLD_FADE_START) / (WORLD_FADE_END - WORLD_FADE_START)));
      const dustT = dropT > 0.85 ? Math.min(1, (dropT - 0.85) / 0.15 + (progress - NIC_DROP_END) / 0.01) : -1;

      // ── GAME PROGRESS ──
      const gameProgress = Math.max(0, progress - WORLD_FADE_END) / (1 - WORLD_FADE_END);
      const nicWorldX = gameProgress * LEVEL_LEN;
      const nicScreenFraction = lerp(0.20, 0.75, gameProgress);
      const nicScreenCX = w * nicScreenFraction;
      const camX = nicWorldX - nicScreenCX;

      // ── JUMP ──
      let nicJumpY = 0;
      let isJumping = false;
      let jumpT = 0;
      for (const evt of TIMELINE) {
        if (progress >= evt.jumpStartAt && progress <= evt.landAt) {
          const jumpDuration = evt.landAt - evt.jumpStartAt;
          jumpT = (progress - evt.jumpStartAt) / jumpDuration;
          const peakHeight = evt.type === "block" ? 30 : 24;
          nicJumpY = Math.sin(jumpT * Math.PI) * peakHeight;
          isJumping = true;
          break;
        }
      }

      // ── RENDER ──
      ctx.clearRect(0, 0, w, h);

      // Dark void
      ctx.save();
      ctx.globalAlpha = stripT;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // World background
      ctx.save();
      ctx.globalAlpha = stripT * worldT;
      drawBackground(ctx, camX, w, h, progress);
      ctx.restore();

      const toScreenX = (worldX: number) => worldX - camX;

      // World materialization flash
      if (worldT > 0 && worldT < 1) {
        const matFlash = Math.sin(worldT * Math.PI) * 0.25;
        ctx.save();
        ctx.globalAlpha = stripT;
        ctx.fillStyle = `rgba(255, 255, 255, ${matFlash})`;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      // Zone transition flashes
      for (const zt of ZONE_TRANSITIONS) {
        const flashDist = Math.abs(progress - zt);
        if (flashDist < 0.015) {
          drawZoneFlash(ctx, w, h, 1 - flashDist / 0.015);
        }
      }

      // ── BLOCKS ──
      ctx.save();
      ctx.globalAlpha = stripT * worldT;
      for (const evt of TIMELINE) {
        if (evt.type !== "block") continue;
        const screenCX = toScreenX(evt.worldX) + BRICK_SIZE / 2;
        if (screenCX < -40 || screenCX > w + 40) continue;
        const blockBottomY = GROUND_Y - (evt.blockY ?? 24);

        const isSmashed = progress > evt.peakAt + 0.003;
        if (isSmashed) {
          const smashT = Math.min(1, (progress - evt.peakAt - 0.003) / 0.04);
          drawSmash(ctx, screenCX, blockBottomY, smashT, evt.rebelWord ?? "");
        } else {
          const bob = Math.sin(realTimeRef.current * 2 + evt.worldX * 0.05) * 1.5;
          drawSprite(ctx, sprites.brick, 0, screenCX, blockBottomY + bob, BRICK_SIZE, BRICK_SIZE);
          // Label above brick
          ctx.save();
          ctx.fillStyle = C.brickLabel;
          ctx.font = `bold 7px "Press Start 2P", monospace`;
          ctx.textAlign = "center";
          ctx.fillText(evt.label.length > 7 ? "?" : evt.label, screenCX, blockBottomY - BRICK_SIZE - 4 + bob);
          ctx.textAlign = "left";
          ctx.restore();
        }
      }
      ctx.restore();

      // ── ENEMIES ──
      ctx.save();
      ctx.globalAlpha = stripT * worldT;
      for (const evt of TIMELINE) {
        if (evt.type !== "enemy") continue;
        const screenCX = toScreenX(evt.worldX) + ENEMY_SIZE / 2;
        if (screenCX < -50 || screenCX > w + 50) continue;

        const isDead = progress > evt.peakAt + 0.003;

        if (isDead) {
          const deathT = Math.min(1, (progress - evt.peakAt - 0.003) / 0.02);
          const deathColor = evt.enemyType === "goomba" ? C.meetingBody :
            evt.enemyType === "bat" ? C.batBody : C.turtleShell;
          const deathY = evt.enemyType === "bat" ? GROUND_Y - 16 : GROUND_Y;
          drawEnemyDeath(ctx, screenCX, deathY, deathT, deathColor);
        } else {
          const batBob = Math.sin(realTimeRef.current * 3 + evt.worldX * 0.1) * 4;
          switch (evt.enemyType) {
            case "goomba":
              drawSprite(ctx, sprites.goomba, frame % 2, screenCX, GROUND_Y, ENEMY_SIZE, ENEMY_SIZE);
              break;
            case "bat":
              drawSprite(ctx, sprites.bat, frame % 2, screenCX, GROUND_Y - 16 - batBob, ENEMY_SIZE, ENEMY_SIZE);
              break;
            case "turtle":
              drawSprite(ctx, sprites.turtle, frame % 2, screenCX, GROUND_Y, ENEMY_SIZE, ENEMY_SIZE);
              break;
          }
          // Enemy label
          ctx.save();
          ctx.fillStyle = evt.enemyType === "goomba" ? C.meetingLabel :
            evt.enemyType === "bat" ? "#cc88ff" : "#88cc88";
          ctx.font = `bold 7px "Press Start 2P", monospace`;
          ctx.textAlign = "center";
          const labelY = evt.enemyType === "bat" ? GROUND_Y - 16 - batBob - ENEMY_SIZE - 4 : GROUND_Y - ENEMY_SIZE - 4;
          ctx.fillText(evt.label, screenCX, labelY);
          ctx.textAlign = "left";
          ctx.restore();
        }
      }
      ctx.restore();

      // ── FLAG ──
      ctx.save();
      ctx.globalAlpha = stripT * worldT;
      if (gameProgress > 0.7) {
        const flagScreenCX = toScreenX(FLAG_X) + FLAG_SIZE / 2;
        if (flagScreenCX > -60 && flagScreenCX < w + 60) {
          drawSprite(ctx, sprites.flag, 0, flagScreenCX, GROUND_Y, FLAG_SIZE, FLAG_SIZE);
        }
      }
      ctx.restore();

      // Victory celebration — Nic stops at flag, sparkles + banner
      const reachedFlag = gameProgress > 0.93;
      if (gameProgress > 0.88) {
        const sparkleT = (gameProgress - 0.88) / 0.12;
        drawVictorySparkles(ctx, w, h, sparkleT);
      }
      if (reachedFlag) {
        const bannerT = (gameProgress - 0.93) / 0.07;
        drawVictoryBanner(ctx, w, h, bannerT);
      }

      // ── NIC (drawn independently of world) ──
      const nicFeetY = GROUND_Y - nicJumpY + nicDropOffset;
      // Nic stops running and goes idle when he reaches the flag
      const nicIsMoving = reachedFlag ? false : isMoving;
      const nicIsJumping = reachedFlag ? false : isJumping;
      drawNicSprite(
        ctx,
        { run: sprites.nicRun, jump: sprites.nicJump, idle: sprites.nicIdle },
        nicScreenCX,
        nicFeetY,
        frame,
        nicIsMoving,
        nicIsJumping,
        jumpT,
        nicAlpha * stripT,
      );

      // Landing dust puff
      if (dustT >= 0 && dustT < 1) {
        drawDustPuff(ctx, nicScreenCX, GROUND_Y, dustT);
      }

      // (Top fade handled by CSS mask-image on the container div)

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

  useEffect(() => {
    if (!visible) return;
    const updateContainerVisibility = () => {
      const progress = getScrollProgress();
      const t = Math.max(0, Math.min(1, (progress - STRIP_FADE_START) / (STRIP_FADE_END - STRIP_FADE_START)));
      setContainerOpacity(t);
      setContainerTranslateY((1 - t) * 100);
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

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setVisible(!visible)}
        className="fixed bottom-2 right-2 z-50 pointer-events-auto font-pixel text-[8px] text-gold/50 hover:text-gold bg-forest-deep/80 hover:bg-forest-deep border border-gold/20 hover:border-gold/40 px-2 py-1 rounded-sm transition-all"
      >
        {visible ? "HIDE GAME" : "SHOW GAME"}
      </button>

      {/* Game strip container */}
      {visible && (
        <div
          ref={containerRef}
          className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
          style={{
            height: CANVAS_H,
            opacity: containerOpacity,
            transform: `translateY(${containerTranslateY}%)`,
            willChange: "opacity, transform",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
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
