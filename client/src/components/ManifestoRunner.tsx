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
  turtle:   "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/tAUdctTTtbAZnbfH.png",
  brick:    "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/CZIKNFXWjzlvpjEI.png",
  flag:     "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/XErroFrcgEbnlBdi.png",
  nicVictory: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/VrAjRkmkMHEOwWhA.png",
};

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const CANVAS_H = 240;
const GROUND_Y = CANVAS_H - 28;
const LEVEL_LEN = 4000;

// Sprite render sizes (CSS pixels on canvas)
const NIC_SIZE = 64;
const ENEMY_SIZE = 48;
const BRICK_SIZE = 32;
const FLAG_SIZE = 64;

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
  sheets: { run: SpriteSheet; jump: SpriteSheet; idle: SpriteSheet; victory: SpriteSheet },
  cx: number,
  bottomY: number,
  frame: number,
  isMoving: boolean,
  isJumping: boolean,
  jumpT: number,
  alpha = 1,
  isVictory = false,
) {
  if (alpha <= 0) return;

  let sheet: SpriteSheet;
  let spriteFrame: number;

  if (isVictory) {
    // Victory pose: front-facing sprite with sword raised, drawn at NIC_SIZE to match running Nic
    sheet = sheets.victory;
    spriteFrame = frame % 2;
  } else if (isJumping) {
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

  // Scale each sprite state so the visible character matches the running sprite's visual weight.
  // Measured character widths within 64x64 frames:
  //   Running avg ~50px (reference), Idle avg ~37px, Jump avg ~48px, Victory ~40px.
  // We scale the *render size* per-state so transitions look consistent.
  let renderSize = NIC_SIZE;
  if (isVictory) {
    renderSize = NIC_SIZE * 1.25;      // 40px char → 50px visual (50/40)
  } else if (!isMoving && !isJumping) {
    renderSize = NIC_SIZE * 1.17;      // idle: reduced 15% per user feedback
  } else if (isJumping) {
    renderSize = NIC_SIZE * 1.42;      // jump: bigger per user feedback
  }
  // Running stays at NIC_SIZE — it's the reference
  drawSprite(ctx, sheet, spriteFrame, cx, bottomY, renderSize, renderSize, alpha);

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

  // SNES-style dust puff: pronounced cloud burst on stomp
  if (t < 0.6) {
    const dustT = t / 0.6;
    ctx.save();
    ctx.globalAlpha = (1 - dustT) * 0.65;
    // More particles, bigger, wider spread
    const dustPuffs: [number, number, number][] = [
      [-14, 0, 5], [16, -1, 4.5], [-8, -3, 4], [10, 2, 4.5], [0, -1, 5.5],
      [-18, 1, 3.5], [20, -2, 3], [-3, -4, 3.5], [6, 3, 3],
    ];
    for (const [dx, dy, r] of dustPuffs) {
      const spread = 1 + dustT * 3;
      // Two-tone dust: lighter center, darker edge
      ctx.fillStyle = dustT < 0.3 ? "#e0d4b8" : "#c8b898";
      ctx.beginPath();
      ctx.arc(cx + dx * spread, bottomY + dy - 3, r + dustT * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    // Ground dust line
    ctx.fillStyle = "#b8a878";
    const lineW = 30 + dustT * 20;
    ctx.globalAlpha = (1 - dustT) * 0.4;
    ctx.fillRect(cx - lineW / 2, bottomY - 1, lineW, 2);
    ctx.restore();
  }

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

function drawVictoryConfetti(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (t <= 0) return;
  const alpha = Math.min(1, t * 5);
  ctx.save();
  const confettiColors = [C.gold, "#ff4444", "#44ff44", C.saber, "#ff88ff", "#ffdd44", "#ffffff", "#ff8844", "#44aaff", "#ffaa00"];

  // Wave 1: main burst — 140 pieces
  for (let i = 0; i < 140; i++) {
    const cx = ((i * 97 + 23) % Math.floor(w));
    const fallSpeed = 0.4 + (i % 7) * 0.1;
    const startY = -10 - (i % 12) * 4;
    const cy = startY + t * fallSpeed * h * 3;
    if (cy > h + 10) continue;
    const fadeOut = cy > h * 0.7 ? Math.max(0, 1 - (cy - h * 0.7) / (h * 0.3)) : 1;
    const sway = Math.sin(t * 5 + i * 0.7) * 12;
    const rotation = Math.sin(t * 8 + i * 1.3);
    const pw = 3 + Math.abs(rotation) * 5;
    const ph = 2 + (1 - Math.abs(rotation)) * 6;
    ctx.fillStyle = confettiColors[i % confettiColors.length];
    ctx.globalAlpha = alpha * fadeOut * 0.9;
    ctx.fillRect(cx + sway - pw / 2, cy - ph / 2, pw, ph);
  }

  // Wave 2: delayed secondary burst — 60 pieces, starts at t=0.15
  const t2 = t - 0.15;
  if (t2 > 0) {
    const alpha2 = Math.min(1, t2 * 4);
    for (let i = 0; i < 60; i++) {
      const cx = ((i * 173 + 67) % Math.floor(w));
      const fallSpeed = 0.35 + (i % 5) * 0.14;
      const startY = -5 - (i % 6) * 5;
      const cy = startY + t2 * fallSpeed * h * 2.5;
      if (cy > h + 10) continue;
      const fadeOut = cy > h * 0.6 ? Math.max(0, 1 - (cy - h * 0.6) / (h * 0.4)) : 1;
      const sway = Math.sin(t2 * 4 + i * 1.1) * 15;
      const rotation = Math.sin(t2 * 6 + i * 0.9);
      const pw = 2 + Math.abs(rotation) * 3;
      const ph = 2 + (1 - Math.abs(rotation)) * 4;
      ctx.fillStyle = confettiColors[(i + 3) % confettiColors.length];
      ctx.globalAlpha = alpha2 * fadeOut * 0.7;
      ctx.fillRect(cx + sway - pw / 2, cy - ph / 2, pw, ph);
    }
  }

  ctx.restore();
}

function drawVictoryBanner(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (t <= 0) return;
  const alpha = Math.min(1, t * 4);
  ctx.save();
  ctx.globalAlpha = alpha;

  // Fully opaque dark background — no bleed-through
  const bannerH = 48;
  const bannerY = h * 0.15; // positioned in the top fifth, well above Nic
  const bannerX = w * 0.2;
  const bannerW = w * 0.6;

  // Dark background fill
  ctx.fillStyle = "rgba(10, 18, 10, 0.95)";
  ctx.fillRect(bannerX, bannerY, bannerW, bannerH);

  // Clean gold border — single pixel
  ctx.strokeStyle = C.gold;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(bannerX, bannerY, bannerW, bannerH);

  // "REBELLION COMPLETE" text — centered in banner
  ctx.fillStyle = C.gold;
  ctx.font = `bold 12px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText("REBELLION COMPLETE", w / 2, bannerY + 20);

  // Subtitle — smaller, softer
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = `7px "Press Start 2P", monospace`;
  ctx.fillText("The real game begins now.", w / 2, bannerY + 36);

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
 * Convert worldX → scroll percentage (inverse of the game progress formula).
 * gameProgress = (scrollPct - WORLD_FADE_END) / (1 - WORLD_FADE_END)
 * nicWorldX = gameProgress * LEVEL_LEN
 * So: scrollPct = (worldX / LEVEL_LEN) * (1 - WORLD_FADE_END) + WORLD_FADE_END
 */
function worldXToScrollPct(worldX: number): number {
  return (worldX / LEVEL_LEN) * (1 - WORLD_FADE_END) + WORLD_FADE_END;
}

// Jump timing: symmetric around the peak.
// LEAD_PX shifts the peak so Nic is just IN FRONT of the enemy at peak
// (sword reaching) rather than overlapping through it.
const JUMP_HALF = 0.009;   // scroll % from jump start to peak (and peak to land)
const LEAD_PX = 36;        // Nic peaks this many world-px BEFORE the enemy

function makeEvent(
  worldX: number, type: EventType, label: string,
  opts?: { enemyType?: "goomba" | "bat" | "turtle"; rebelWord?: string; blockY?: number }
): TimelineEvent {
  // Peak when Nic is LEAD_PX world-pixels before the enemy,
  // so his sword reaches the target instead of his body overlapping it.
  const peakPct = worldXToScrollPct(worldX - LEAD_PX);
  return {
    type,
    approachAt: peakPct - JUMP_HALF - 0.005,  // visual approach cue
    jumpStartAt: peakPct - JUMP_HALF,          // jump begins
    peakAt: peakPct,                           // PEAK = sword-reach distance before enemy
    landAt: peakPct + JUMP_HALF,               // symmetric landing
    label, worldX,
    enemyType: opts?.enemyType,
    rebelWord: opts?.rebelWord,
    blockY: opts?.blockY ?? 24,
  };
}

const TIMELINE: TimelineEvent[] = [
  // Zone 1: Corporate Landscape (worldX 150-1000)
  makeEvent(200,  "enemy", "Quick Mtg",  { enemyType: "goomba" }),
  makeEvent(380,  "block", "SYNERGY",    { rebelWord: "PRESENCE" }),
  makeEvent(520,  "enemy", "Standup",    { enemyType: "goomba" }),
  makeEvent(660,  "enemy", "Quick Sync", { enemyType: "goomba" }),
  makeEvent(800,  "block", "ALIGN",      { rebelWord: "TRUTH" }),
  makeEvent(940,  "enemy", "Hop On?",    { enemyType: "goomba" }),
  makeEvent(1080, "block", "BUY-IN",     { rebelWord: "REPAIR" }),

  // Zone 2: Crumbling World (worldX 1200-2200)
  makeEvent(1250, "enemy", "Reply All",     { enemyType: "bat" }),
  makeEvent(1400, "enemy", "Compliance",    { enemyType: "turtle" }),
  makeEvent(1550, "block", "LEVERAGE",      { rebelWord: "BELONGING" }),
  makeEvent(1700, "enemy", "Following Up",  { enemyType: "bat" }),
  makeEvent(1850, "enemy", "Process",       { enemyType: "turtle" }),
  makeEvent(2000, "block", "OPTIMIZE",      { rebelWord: "AGENCY" }),
  makeEvent(2150, "enemy", "Urgent!",       { enemyType: "bat" }),
  makeEvent(2300, "enemy", "Per My Email",  { enemyType: "bat" }),

  // Zone 3: Green Growth (worldX 2400-3100)
  makeEvent(2500, "enemy", "Grab You?",   { enemyType: "goomba" }),
  makeEvent(2700, "block", "BANDWIDTH",   { rebelWord: "MEANING", blockY: 22 }),
  makeEvent(2900, "enemy", "Quick Call",   { enemyType: "goomba" }),
  makeEvent(3100, "block", "RESOURCES",   { rebelWord: "WHOLENESS", blockY: 22 }),

  // Zone 4: Golden Summit (worldX 3300-3700)
  makeEvent(3400, "enemy", "Precedent",   { enemyType: "turtle" }),
  makeEvent(3650, "enemy", "Policy",      { enemyType: "turtle" }),
];

const FLAG_X = 3850;  // near end of LEVEL_LEN (4000)
const FLAG_STOP_X = FLAG_X - 8;  // Nic stops 8px before flag (right next to it)
const ZONE_TRANSITIONS = [0.25, 0.50, 0.75];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

interface ManifestoRunnerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function ManifestoRunner({ onVisibilityChange }: ManifestoRunnerProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef(0);
  const lastProgressRef = useRef(0);
  const realTimeRef = useRef(0);
  const shakeRef = useRef(0); // screen shake timer (counts down)
  const [visible, setVisible] = useState(true);
  const [completed, setCompleted] = useState(false);
  const { awardAchievement } = useGame();

  // Load all sprite sheets once (lazy init, not in render)
  const spritesRef = useRef<{
    nicRun: SpriteSheet;
    nicJump: SpriteSheet;
    nicIdle: SpriteSheet;
    nicVictory: SpriteSheet;
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
      nicVictory: loadSpriteSheet(SPRITES.nicVictory, 2),
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
      const reachedFlag = nicWorldX >= FLAG_STOP_X;
      // Clamp Nic's world position so he stops in front of the flag
      const nicDrawWorldX = reachedFlag ? FLAG_STOP_X : nicWorldX;
      const nicScreenFraction = lerp(0.20, 0.75, gameProgress);
      const nicScreenCX = w * nicScreenFraction;
      const camX = nicWorldX - nicScreenCX;
      // Nic's actual screen X: if clamped, he drifts left relative to camera (natural stop)
      const nicDrawScreenCX = nicDrawWorldX - camX;

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

      // ── SCREEN SHAKE (subtle 2px for enemy/block deaths) ──
      // Trigger shake when an enemy/block just died
      for (const evt of TIMELINE) {
        const deathMoment = evt.peakAt + 0.003;
        const justDied = progress >= deathMoment && progress < deathMoment + 0.004;
        if (justDied) { shakeRef.current = 0.15; break; }
      }
      if (shakeRef.current > 0) {
        shakeRef.current = Math.max(0, shakeRef.current - dt);
      }
      const shakeX = shakeRef.current > 0 ? (Math.random() - 0.5) * 4 : 0;
      const shakeY = shakeRef.current > 0 ? (Math.random() - 0.5) * 3 : 0;

      // ── RENDER ──
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(shakeX, shakeY);

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
          ctx.save();
          if (evt.enemyType === "turtle") {
            // Turtle sprite already faces LEFT (toward Nic) — draw without flip
            switch (evt.enemyType) {
              case "turtle":
                drawSprite(ctx, sprites.turtle, 0, screenCX, GROUND_Y, ENEMY_SIZE, ENEMY_SIZE);
                break;
            }
          } else {
            // Flip goombas and bats horizontally so they face LEFT (toward Nic)
            ctx.translate(screenCX, 0);
            ctx.scale(-1, 1);
            switch (evt.enemyType) {
              case "goomba":
                drawSprite(ctx, sprites.goomba, frame % 2, 0, GROUND_Y, ENEMY_SIZE, ENEMY_SIZE);
                break;
              case "bat":
                drawSprite(ctx, sprites.bat, frame % 2, 0, GROUND_Y - 16 - batBob, ENEMY_SIZE, ENEMY_SIZE);
                break;
            }
          }
          ctx.restore();
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

      // ── FLAG (SNES-style animated wave) ──
      ctx.save();
      ctx.globalAlpha = stripT * worldT;
      if (gameProgress > 0.7) {
        const flagScreenCX = toScreenX(FLAG_X) + FLAG_SIZE / 2;
        if (flagScreenCX > -60 && flagScreenCX < w + 60) {
          // Draw the flag with a wave distortion effect
          const flagSheet = sprites.flag;
          if (flagSheet.loaded) {
            const rt = realTimeRef.current;
            ctx.save();
            // Draw the flag in vertical slices with a sine wave offset for ripple
            const sliceCount = 16;
            const sliceW = flagSheet.frameW / sliceCount;
            const renderSliceW = FLAG_SIZE / sliceCount;
            for (let s = 0; s < sliceCount; s++) {
              // Wave: each slice gets a slightly different vertical offset
              const wavePhase = s / sliceCount * Math.PI * 2;
              const waveAmp = 1.5 + s * 0.15; // amplitude increases toward flag edge
              const waveOffset = Math.sin(rt * 4 + wavePhase) * waveAmp;
              const sx = s * sliceW;
              const dx = flagScreenCX - FLAG_SIZE / 2 + s * renderSliceW;
              const dy = GROUND_Y - FLAG_SIZE + waveOffset;
              ctx.drawImage(
                flagSheet.img,
                sx, 0, sliceW, flagSheet.frameH,
                dx, dy, renderSliceW, FLAG_SIZE
              );
            }
            ctx.restore();
          }
        }
      }
      ctx.restore();

      // Victory celebration — confetti + banner
      if (reachedFlag) {
        // Calculate how far past the flag we are for animation timing
        const flagGP = FLAG_STOP_X / LEVEL_LEN;
        const victoryT = Math.max(0, (gameProgress - flagGP) / (1 - flagGP));
        drawVictoryConfetti(ctx, w, h, victoryT);
        // Banner fades in quickly after reaching the flag
        const bannerT = Math.min(1, victoryT * 3);
        drawVictoryBanner(ctx, w, h, bannerT);
      }

      // ── NIC (drawn at clamped position, stops in front of flag) ──
      // Victory pose: slight upward bob when at the flag
      const victoryBob = reachedFlag ? Math.sin(Date.now() * 0.003) * 2 : 0;
      const nicFeetY = GROUND_Y - nicJumpY + nicDropOffset - victoryBob;
      // Nic is idle during intro (before world scrolls) and at the flag
      const introComplete = progress > WORLD_FADE_END && gameProgress > 0.005;
      const nicIsMoving = reachedFlag ? false : (introComplete ? isMoving : false);
      const nicIsJumping = reachedFlag ? false : isJumping;
      drawNicSprite(
        ctx,
        { run: sprites.nicRun, jump: sprites.nicJump, idle: sprites.nicIdle, victory: sprites.nicVictory },
        nicDrawScreenCX,
        nicFeetY,
        frame,
        nicIsMoving,
        nicIsJumping,
        jumpT,
        nicAlpha * stripT,
        reachedFlag,  // victory pose
      );

      // Landing dust puff
      if (dustT >= 0 && dustT < 1) {
        drawDustPuff(ctx, nicDrawScreenCX, GROUND_Y, dustT);
      }

      // (Top fade handled by CSS mask-image on the container div)

      ctx.restore(); // end screen shake transform
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
      {/* Toggle button — bottom-left, small and unassuming, always visible */}
      <button
        onClick={() => { const next = !visible; setVisible(next); onVisibilityChange?.(next); }}
        className="fixed bottom-2 left-2 z-50 pointer-events-auto font-pixel text-[7px] text-parchment-dim/30 hover:text-gold/70 bg-forest-deep/60 hover:bg-forest-deep/80 border border-gold/10 hover:border-gold/30 px-1.5 py-0.5 rounded-sm transition-all"
        title={visible ? "Hide the game strip" : "Show the game strip"}
      >
        {visible ? "HIDE" : "SHOW"}  
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
