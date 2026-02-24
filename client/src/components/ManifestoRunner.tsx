/*
 * MANIFESTO RUNNER — Scroll-Driven Side-Scroller
 * A pixel-art side-scroller that plays along the bottom of The Map page.
 * Nic runs through corporate enemies and buzzword blocks as the reader scrolls.
 * 100% self-contained Canvas component. No external assets.
 *
 * ZONES:
 *   1 (0-25%)  Corporate landscape — Quick Meeting goombas, Buzzword bricks
 *   2 (25-50%) Crumbling world — Slack Ping bats, Policy Turtles
 *   3 (50-75%) Green growth — fewer enemies, seeds sprouting
 *   4 (75-100%) Golden summit — victory run, flag
 *
 * COORDINATE SYSTEM:
 *   All drawing is in CSS pixel space. DPR is handled by canvas transform.
 *   PX = pixel size for 8-bit look (2px squares = one "pixel art pixel").
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { useGame } from "@/contexts/GameContext";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS — all in CSS pixels
   ═══════════════════════════════════════════════════════════════ */

const CANVAS_H = 140;          // CSS height of the runner strip
const PX = 2;                  // one "pixel art pixel" = 2 CSS pixels
const GROUND_Y = CANVAS_H - 16; // ground line (CSS px from top)
const NIC_W = 10;              // Nic width in art-pixels
const NIC_H = 16;              // Nic height in art-pixels
const LEVEL_LEN = 4000;        // virtual level length in art-pixels

/* ═══════════════════════════════════════════════════════════════
   COLOR PALETTES (elegant 8-bit)
   ═══════════════════════════════════════════════════════════════ */

const C = {
  // Nic
  skin: "#e8c090",
  hair: "#4a3520",
  shirt: "#1a472a",
  pants: "#2d1b0e",
  saber: "#60e0ff",
  saberCore: "#ffffff",

  // Enemies
  meetingBody: "#6b6b6b",
  meetingEyes: "#ff4444",
  meetingLabel: "#ffcc00",
  batWing: "#5a3a6a",
  batBody: "#7a4a8a",
  batEyes: "#ff6666",
  turtleShell: "#3a6a3a",
  turtleBody: "#5a8a5a",
  turtleFace: "#e8c090",

  // Blocks
  brickBase: "#8a6a3a",
  brickHi: "#c09a5a",
  brickSh: "#5a4020",
  brickLabel: "#ffcc00",
  rebelWord: "#60e0ff",

  // Zones
  z1Sky: "#2a2a3a", z1Ground: "#4a4a5a", z1Bldg: "#3a3a4a",
  z2Sky: "#3a2020", z2Ground: "#5a3a3a",
  z3Sky: "#1a3a2a", z3Ground: "#2a5a3a", z3Grass: "#3a8a4a",
  z4Sky: "#1a1a3a", z4Ground: "#5a4a20", z4Gold: "#d4a017",

  gold: "#d4a017",
  forest: "#0d1a0a",
};

/* ═══════════════════════════════════════════════════════════════
   HELPER: draw a "pixel art pixel" (PX × PX square)
   ═══════════════════════════════════════════════════════════════ */

/** Draw one art-pixel at art-coords (ax, ay) */
function px(ctx: CanvasRenderingContext2D, ax: number, ay: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(ax * PX, ay * PX, PX, PX);
}

/** Draw a rect of art-pixels */
function pxRect(ctx: CanvasRenderingContext2D, ax: number, ay: number, aw: number, ah: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(ax * PX, ay * PX, aw * PX, ah * PX);
}

/* ═══════════════════════════════════════════════════════════════
   SPRITE DRAWING — coordinates in art-pixels, origin = feet
   ═══════════════════════════════════════════════════════════════ */

/** Nic sprite. (ax, ay) = feet position in art-pixels */
function drawNic(ctx: CanvasRenderingContext2D, ax: number, ay: number, frame: number) {
  const f = frame % 4;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect((ax - 1) * PX, (ay) * PX, 8 * PX, PX);

  // Legs (animated)
  const lo1 = f === 1 ? -1 : f === 3 ? 1 : 0;
  const lo2 = f === 1 ? 1 : f === 3 ? -1 : 0;
  pxRect(ctx, ax + 1 + lo1, ay - 3, 2, 3, C.pants);
  pxRect(ctx, ax + 4 + lo2, ay - 3, 2, 3, C.pants);
  // Boots
  pxRect(ctx, ax + lo1, ay - 1, 3, 1, "#1a1a1a");
  pxRect(ctx, ax + 4 + lo2, ay - 1, 3, 1, "#1a1a1a");

  // Torso
  pxRect(ctx, ax + 1, ay - 7, 5, 4, C.shirt);
  // Belt
  pxRect(ctx, ax + 1, ay - 4, 5, 1, "#3a2a1a");
  px(ctx, ax + 3, ay - 4, C.gold);

  // Arms
  const armS = f === 1 ? -1 : f === 3 ? 1 : 0;
  pxRect(ctx, ax, ay - 7 + armS, 1, 2, C.shirt);
  px(ctx, ax, ay - 5 + armS, C.skin);
  pxRect(ctx, ax + 6, ay - 7, 1, 2, C.shirt);
  px(ctx, ax + 6, ay - 5, C.skin);

  // Lightsaber
  // Hilt
  pxRect(ctx, ax + 7, ay - 6, 1, 2, "#6a6a6a");
  px(ctx, ax + 7, ay - 5, "#aaaaaa");
  // Blade (upward)
  const bladeLen = 8;
  for (let i = 0; i < bladeLen; i++) {
    const a = 1 - (i / bladeLen) * 0.3;
    ctx.fillStyle = `rgba(96, 224, 255, ${a})`;
    ctx.fillRect((ax + 7) * PX, (ay - 7 - i) * PX, PX, PX);
  }
  // Core
  for (let i = 0; i < bladeLen - 1; i++) {
    const a = 1 - (i / bladeLen) * 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.7})`;
    ctx.fillRect((ax + 7) * PX + 1, (ay - 7 - i) * PX + 1, PX - 2, PX - 2);
  }
  // Glow
  ctx.shadowColor = C.saber;
  ctx.shadowBlur = 6;
  ctx.fillStyle = "rgba(96, 224, 255, 0.08)";
  ctx.fillRect((ax + 6) * PX, (ay - 7 - bladeLen) * PX, 3 * PX, (bladeLen + 2) * PX);
  ctx.shadowBlur = 0;

  // Head
  pxRect(ctx, ax + 2, ay - 11, 4, 3, C.skin);
  // Hair
  pxRect(ctx, ax + 1, ay - 12, 5, 2, C.hair);
  pxRect(ctx, ax + 1, ay - 11, 1, 2, C.hair);
  // Eyes
  px(ctx, ax + 3, ay - 10, "#1a1a1a");
  px(ctx, ax + 5, ay - 10, "#1a1a1a");
  // Mouth
  px(ctx, ax + 4, ay - 9, "#c08060");
}

/** Quick Meeting goomba */
function drawGoomba(ctx: CanvasRenderingContext2D, ax: number, ay: number, frame: number, label: string) {
  const f = frame % 2;
  // Body
  pxRect(ctx, ax + 1, ay - 7, 6, 4, C.meetingBody);
  pxRect(ctx, ax, ay - 6, 8, 3, C.meetingBody);
  pxRect(ctx, ax + 2, ay - 8, 4, 1, C.meetingBody);
  // Eyebrows
  px(ctx, ax + 2, ay - 6, "#333");
  px(ctx, ax + 5, ay - 6, "#333");
  // Eyes
  px(ctx, ax + 3, ay - 5, C.meetingEyes);
  px(ctx, ax + 5, ay - 5, C.meetingEyes);
  // Frown
  pxRect(ctx, ax + 3, ay - 4, 3, 1, "#333");
  // Feet
  const fo = f === 0 ? 0 : 1;
  pxRect(ctx, ax + 1 - fo, ay - 3, 3, 3, "#4a4a4a");
  pxRect(ctx, ax + 5 + fo, ay - 3, 3, 3, "#4a4a4a");
  // Label
  ctx.fillStyle = C.meetingLabel;
  ctx.font = `bold ${Math.max(6, PX * 3)}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText(label, (ax + 4) * PX, (ay - 9) * PX);
  ctx.textAlign = "left";
}

/** Slack Ping bat */
function drawBat(ctx: CanvasRenderingContext2D, ax: number, ay: number, frame: number, label: string) {
  const wingUp = frame % 2 === 0;
  // Body
  pxRect(ctx, ax + 3, ay - 4, 3, 3, C.batBody);
  // Eyes
  px(ctx, ax + 3, ay - 3, C.batEyes);
  px(ctx, ax + 5, ay - 3, C.batEyes);
  // Wings
  if (wingUp) {
    pxRect(ctx, ax, ay - 5, 3, 2, C.batWing);
    pxRect(ctx, ax + 6, ay - 5, 3, 2, C.batWing);
    pxRect(ctx, ax + 1, ay - 6, 2, 1, C.batWing);
    pxRect(ctx, ax + 6, ay - 6, 2, 1, C.batWing);
  } else {
    pxRect(ctx, ax, ay - 2, 3, 2, C.batWing);
    pxRect(ctx, ax + 6, ay - 2, 3, 2, C.batWing);
  }
  // Label
  ctx.fillStyle = "#cc88ff";
  ctx.font = `bold ${Math.max(6, PX * 3)}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText(label, (ax + 4) * PX, (ay - 7) * PX);
  ctx.textAlign = "left";
}

/** Policy turtle */
function drawTurtle(ctx: CanvasRenderingContext2D, ax: number, ay: number, frame: number, label: string) {
  const f = frame % 2;
  // Shell
  pxRect(ctx, ax + 1, ay - 7, 6, 4, C.turtleShell);
  pxRect(ctx, ax + 2, ay - 8, 4, 1, "#2a5a2a");
  px(ctx, ax + 3, ay - 6, "#2a5a2a");
  px(ctx, ax + 5, ay - 6, "#2a5a2a");
  // Head
  pxRect(ctx, ax + 7, ay - 6, 2, 2, C.turtleFace);
  px(ctx, ax + 8, ay - 6, "#1a1a1a");
  // Legs
  const lo = f === 0 ? 0 : 1;
  pxRect(ctx, ax + 2 - lo, ay - 3, 2, 3, C.turtleBody);
  pxRect(ctx, ax + 5 + lo, ay - 3, 2, 3, C.turtleBody);
  // Label
  ctx.fillStyle = "#88cc88";
  ctx.font = `bold ${Math.max(6, PX * 3)}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText(label, (ax + 4) * PX, (ay - 9) * PX);
  ctx.textAlign = "left";
}

/** Buzzword brick. (ax, ay) = bottom-left in art-pixels */
function drawBrick(ctx: CanvasRenderingContext2D, ax: number, ay: number, label: string) {
  const S = 8; // brick size in art-pixels
  pxRect(ctx, ax, ay - S, S, S, C.brickBase);
  pxRect(ctx, ax, ay - S, S, 1, C.brickHi);
  pxRect(ctx, ax, ay - S, 1, S, C.brickHi);
  pxRect(ctx, ax, ay - 1, S, 1, C.brickSh);
  pxRect(ctx, ax + S - 1, ay - S, 1, S, C.brickSh);
  pxRect(ctx, ax + 1, ay - S / 2, S - 2, 1, C.brickSh);
  // "?" label
  ctx.fillStyle = C.brickLabel;
  ctx.font = `bold ${Math.max(6, PX * 3)}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.fillText(label.length > 6 ? "?" : label, (ax + S / 2) * PX, (ay - S / 2 + 1) * PX);
  ctx.textAlign = "left";
}

/** Smashed brick particles + rebel word */
function drawSmash(ctx: CanvasRenderingContext2D, ax: number, ay: number, t: number, word: string) {
  const alpha = 1 - t;
  if (alpha <= 0) return;
  const frags = [[-2, -5], [3, -7], [-4, -3], [5, -4], [-1, -8], [3, -2]];
  for (const [dx, dy] of frags) {
    ctx.fillStyle = `rgba(138,106,58,${alpha})`;
    ctx.fillRect((ax + 4 + dx * t * 3) * PX, (ay - 4 + dy * t * 3) * PX, PX, PX);
  }
  ctx.globalAlpha = alpha;
  ctx.fillStyle = C.rebelWord;
  ctx.font = `bold ${Math.max(8, PX * 4)}px "Press Start 2P", monospace`;
  ctx.textAlign = "center";
  ctx.shadowColor = C.rebelWord;
  ctx.shadowBlur = 6;
  ctx.fillText(word, (ax + 4) * PX, (ay - 10 - t * 15) * PX);
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
}

/** Victory flag */
function drawFlag(ctx: CanvasRenderingContext2D, ax: number, groundAY: number) {
  // Pole
  pxRect(ctx, ax, groundAY - 20, 1, 20, "#aaa");
  // Flag
  ctx.fillStyle = C.z4Gold;
  ctx.fillRect((ax + 1) * PX, (groundAY - 20) * PX, 8 * PX, 5 * PX);
  ctx.fillStyle = C.forest;
  ctx.font = `bold ${Math.max(6, PX * 3)}px "Press Start 2P", monospace`;
  ctx.fillText("RL", (ax + 2) * PX, (groundAY - 17) * PX);
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND DRAWING — all in CSS pixels
   ═══════════════════════════════════════════════════════════════ */

function lerp(a: number, b: number, t: number) {
  return Math.floor(a + (b - a) * Math.max(0, Math.min(1, t)));
}

function drawBackground(ctx: CanvasRenderingContext2D, camX: number, w: number, h: number, progress: number) {
  // Sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  if (progress < 0.25) {
    grad.addColorStop(0, C.z1Sky);
    grad.addColorStop(1, "#3a3a4a");
  } else if (progress < 0.5) {
    const t = (progress - 0.25) / 0.25;
    grad.addColorStop(0, `rgb(${lerp(42, 58, t)},${lerp(42, 32, t)},${lerp(58, 32, t)})`);
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

  // Parallax stars (far layer)
  const farOff = camX * 0.1;
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < 30; i++) {
    const sx = ((i * 197 + 42) % 600) - (farOff % 600);
    const sy = ((i * 131 + 42) % (h * 0.5));
    if (sx >= -4 && sx <= w + 4) {
      ctx.fillStyle = progress > 0.75 ? C.z4Gold : progress > 0.5 ? "#4a8a4a" : "#6a6a7a";
      const sz = (i % 3 === 0) ? PX : PX / 2;
      ctx.fillRect(sx, sy, sz, sz);
    }
  }
  ctx.globalAlpha = 1;

  // Mid layer silhouettes
  const midOff = camX * 0.4;
  const gTop = GROUND_Y;
  ctx.globalAlpha = 0.35;
  if (progress < 0.3) {
    // Corporate buildings
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
  let gc: string;
  if (progress < 0.25) gc = C.z1Ground;
  else if (progress < 0.5) gc = C.z2Ground;
  else if (progress < 0.75) gc = C.z3Ground;
  else gc = C.z4Ground;
  ctx.fillStyle = gc;
  ctx.fillRect(0, gTop, w, h - gTop);
  // Surface line
  ctx.fillStyle = progress > 0.5 ? C.z3Grass : "#5a5a6a";
  ctx.fillRect(0, gTop, w, PX);
  // Ground details
  const detOff = camX * 0.8;
  for (let i = 0; i < 40; i++) {
    const dx = (i * 47) - (detOff % 1880);
    if (dx >= 0 && dx <= w) {
      ctx.fillStyle = progress > 0.5 ? "#4a7a4a" : "#3a3a4a";
      ctx.fillRect(dx, gTop + 4, PX / 2, PX / 2);
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   LEVEL DATA
   ═══════════════════════════════════════════════════════════════ */

interface Enemy {
  type: "goomba" | "bat" | "turtle";
  x: number; // art-pixel x in level
  label: string;
  alive: boolean;
}

interface Block {
  x: number;
  y: number; // art-pixels above ground
  label: string;
  rebelWord: string;
  smashed: boolean;
  smashProgress: number;
}

const GOOMBA_LABELS = ["Quick Mtg", "Standup", "Quick Sync", "Grab You?", "Quick Call", "Hop On?"];
const BAT_LABELS = ["@here", "Reply All", "Following Up", "Urgent!", "Per My Email"];
const TURTLE_LABELS = ["Compliance", "Process", "Precedent", "Policy"];
const BRICK_LABELS = ["SYNERGY", "ALIGN", "BUY-IN", "LEVERAGE", "OPTIMIZE", "BANDWIDTH", "BEST PRACTICE", "RESOURCES", "INFLUENCE"];
const REBEL_WORDS = ["PRESENCE", "TRUTH", "REPAIR", "BELONGING", "AGENCY", "MEANING"];

function generateLevel(): { enemies: Enemy[]; blocks: Block[] } {
  const enemies: Enemy[] = [];
  const blocks: Block[] = [];
  const rng = (s: number) => ((s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;

  // Zone 1 (0-1000): Corporate
  for (let i = 0; i < 6; i++) {
    enemies.push({ type: "goomba", x: 100 + i * 140 + Math.floor(rng(i * 7) * 40), label: GOOMBA_LABELS[i % GOOMBA_LABELS.length], alive: true });
  }
  for (let i = 0; i < 4; i++) {
    blocks.push({ x: 150 + i * 200, y: 18, label: BRICK_LABELS[i], rebelWord: REBEL_WORDS[i % REBEL_WORDS.length], smashed: false, smashProgress: 0 });
  }

  // Zone 2 (1000-2000): Crumbling
  for (let i = 0; i < 5; i++) {
    enemies.push({ type: "bat", x: 1100 + i * 160 + Math.floor(rng(i * 13) * 60), label: BAT_LABELS[i % BAT_LABELS.length], alive: true });
  }
  for (let i = 0; i < 3; i++) {
    enemies.push({ type: "turtle", x: 1200 + i * 240, label: TURTLE_LABELS[i % TURTLE_LABELS.length], alive: true });
  }
  for (let i = 0; i < 3; i++) {
    blocks.push({ x: 1150 + i * 280, y: 20, label: BRICK_LABELS[(i + 4) % BRICK_LABELS.length], rebelWord: REBEL_WORDS[(i + 3) % REBEL_WORDS.length], smashed: false, smashProgress: 0 });
  }

  // Zone 3 (2000-3000): Growth
  for (let i = 0; i < 3; i++) {
    enemies.push({ type: "goomba", x: 2200 + i * 300, label: GOOMBA_LABELS[(i + 3) % GOOMBA_LABELS.length], alive: true });
  }
  for (let i = 0; i < 2; i++) {
    blocks.push({ x: 2400 + i * 400, y: 16, label: BRICK_LABELS[(i + 7) % BRICK_LABELS.length], rebelWord: REBEL_WORDS[(i + 4) % REBEL_WORDS.length], smashed: false, smashProgress: 0 });
  }

  // Zone 4 (3000-4000): Summit — minimal
  enemies.push({ type: "turtle", x: 3400, label: "Final Boss", alive: true });

  return { enemies, blocks };
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ManifestoRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef(generateLevel());
  const animFrameRef = useRef(0);
  const lastCamRef = useRef(0);
  const nicJumpY = useRef(0);
  const nicJumpPhase = useRef(0);
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
    const level = levelRef.current;

    // Convert art-pixel ground Y
    const groundAY = Math.floor(GROUND_Y / PX); // art-pixel Y of ground

    const render = () => {
      if (!running) return;

      const progress = getScrollProgress();
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = CANVAS_H;

      // Camera in CSS pixels
      const totalLevelCSS = LEVEL_LEN * PX;
      const camX = progress * Math.max(0, totalLevelCSS - w);
      const nicWorldAX = progress * LEVEL_LEN; // Nic's art-pixel x in level

      // Animation
      const scrollDelta = Math.abs(camX - lastCamRef.current);
      lastCamRef.current = camX;
      const isMoving = scrollDelta > 0.5;
      if (isMoving) animFrameRef.current += 0.15;
      const frame = Math.floor(animFrameRef.current);

      // Auto-jump near enemies
      let shouldJump = false;
      for (const e of level.enemies) {
        if (!e.alive) continue;
        const dist = Math.abs(nicWorldAX - e.x);
        if (dist < 20) {
          shouldJump = true;
          if (dist < 10 && nicJumpY.current > 3) e.alive = false;
        }
      }
      // Auto-smash blocks
      for (const b of level.blocks) {
        if (b.smashed) { b.smashProgress = Math.min(1, b.smashProgress + 0.02); continue; }
        const dist = Math.abs(nicWorldAX - b.x);
        if (dist < 8 && nicJumpY.current > 6) { b.smashed = true; b.smashProgress = 0; }
      }

      // Jump physics
      if (shouldJump && nicJumpPhase.current === 0) nicJumpPhase.current = 1;
      if (nicJumpPhase.current > 0) {
        nicJumpPhase.current += 0.06;
        if (nicJumpPhase.current >= Math.PI) { nicJumpPhase.current = 0; nicJumpY.current = 0; }
        else nicJumpY.current = Math.sin(nicJumpPhase.current) * 14;
      }

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Background
      drawBackground(ctx, camX, w, h, progress);

      // Blocks
      for (const b of level.blocks) {
        const screenAX = b.x - camX / PX;
        if (screenAX < -12 || screenAX > w / PX + 12) continue;
        const blockAY = groundAY - b.y;
        if (b.smashed) drawSmash(ctx, screenAX, blockAY, b.smashProgress, b.rebelWord);
        else drawBrick(ctx, screenAX, blockAY, b.label);
      }

      // Enemies
      for (const e of level.enemies) {
        if (!e.alive) continue;
        const screenAX = e.x - camX / PX;
        if (screenAX < -12 || screenAX > w / PX + 12) continue;
        switch (e.type) {
          case "goomba": drawGoomba(ctx, screenAX, groundAY, frame, e.label); break;
          case "bat": drawBat(ctx, screenAX, groundAY - 12 - Math.sin(animFrameRef.current * 0.5 + e.x * 0.1) * 3, frame, e.label); break;
          case "turtle": drawTurtle(ctx, screenAX, groundAY, frame, e.label); break;
        }
      }

      // Victory flag
      if (progress > 0.85) {
        const flagAX = (LEVEL_LEN - 60) - camX / PX;
        drawFlag(ctx, flagAX, groundAY);
      }

      // Nic (screen-centered)
      const nicScreenAX = Math.floor(w / (2 * PX)) - Math.floor(NIC_W / 2);
      const nicScreenAY = groundAY - nicJumpY.current;

      // Draw Nic (first pass — will be under fade)
      drawNic(ctx, nicScreenAX, nicScreenAY, isMoving ? frame : 0);

      // Top fade overlay (transparent at top → page bg match)
      const fadeH = h * 0.45;
      const fadeGrad = ctx.createLinearGradient(0, 0, 0, fadeH);
      fadeGrad.addColorStop(0, "rgba(13, 26, 10, 1)");
      fadeGrad.addColorStop(0.5, "rgba(13, 26, 10, 0.5)");
      fadeGrad.addColorStop(1, "rgba(13, 26, 10, 0)");
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, w, fadeH);

      // Re-draw Nic ON TOP of fade when jumping high (breaking-out effect)
      if (nicJumpY.current > 5) {
        drawNic(ctx, nicScreenAX, nicScreenAY, isMoving ? frame : 0);
      }

      // Victory
      if (progress > 0.95 && !completed) {
        setCompleted(true);
        awardAchievement("runner_complete");
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
    return () => { running = false; window.removeEventListener("resize", resize); };
  }, [visible, getScrollProgress, completed, awardAchievement]);

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
    <div ref={containerRef} className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none" style={{ height: CANVAS_H }}>
      <button
        onClick={() => setVisible(!visible)}
        className="pointer-events-auto absolute top-2 right-2 z-50 font-pixel text-[8px] text-gold/50 hover:text-gold bg-forest-deep/80 hover:bg-forest-deep border border-gold/20 hover:border-gold/40 px-2 py-1 rounded-sm transition-all"
      >
        {visible ? "HIDE GAME" : "SHOW GAME"}
      </button>
      {visible && (
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ imageRendering: "pixelated" }}
        />
      )}
    </div>
  );
}
