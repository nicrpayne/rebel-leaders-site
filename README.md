# Rebel Leaders

**"You've been playing the wrong game."**

A gamified thought-leadership platform built as a 16-bit RPG experience. Pixel art meets philosophical depth — SNES-era visual language applied to leadership content that challenges conventional wisdom.

---

## Design Philosophy

The design movement is **16-bit RPG Nostalgia meets Philosophical Depth**. The dissonance IS the brand. Nobody expects divided brain theory in a SNES dialogue box. The site unfolds like an RPG storyline: scroll = journey.

### Color Palette (from the actual office)

| Token | Hex | Usage |
|---|---|---|
| Deep Forest Green | `#1a3a2a` | Wall anchor, primary background |
| Warm Wood Brown | `#6b4c2a` | Shelves, warmth |
| Tolkien Gold | `#d4a843` | Accents, highlights, UI chrome |
| Leather Red | `#8b3a3a` | Emphasis |
| Parchment Cream | `#f0e6d0` | Text |
| Pixel Black | `#0d1a12` | Deepest background |

### Typography

- **Press Start 2P** — UI elements, headings, navigation (pixel font)
- **Cormorant Garamond** — Body text, quotes, long-form content (serif)
- **VT323** — Plugin UI elements, terminal/hardware aesthetic (monospace pixel)

---

## Site Structure

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero scene with RPG dialogue box, narrator typewriter, CTA |
| `/map` | The Map (Manifesto) | Side-scroller game + manifesto content |
| `/new-player` | Start Here | Onboarding page for new visitors |
| `/archives` | Archives | YouTube videos (Visions) and Shorts (Quick Strikes) via Manus Data API |
| `/shelf` | The Shelf | Curated book recommendations with category filters |
| `/workbench` | Workbench | Plugin hub — Gravitas, Codex, and future tools |
| `/workbench/gravitas` | Gravitas | Leadership gravity diagnostic (15 questions, 3 minutes) |
| `/workbench/results` | Results | Gravitas scan results with Side-Chain handoff to Codex |
| `/workbench/codex` | The Codex | Library of 26 leadership protocols in a hardware cabinet UI |
| `/residency` | Residency | Coaching/consulting intake |
| `/about` | About | Nic's story and philosophy |
| `/mirror` | The Mirror | Substack newsletter integration |
| `/hidden-assets` | Asset Vault | Hidden page — all CDN image assets with download links |

---

## The Workbench (Plugin System)

The Workbench at `/workbench` is the hub for interactive leadership tools. It replaces the former "Armory" page.

### Architecture

Plugins follow a **Cartridge** architecture — each tool is a self-contained module that slots into the Workbench. The landing page displays all 14 planned plugins as cards with category filters (Mirror, Map, Move, Signal) and status badges (Active, Locked, Coming Soon).

### Active Plugins

**Gravitas** (`/workbench/gravitas`) — A leadership gravity diagnostic. 15 questions across 5 dimensions (Identity, Relationship, Vision, Culture, Field Strength). Takes ~3 minutes. Results show orbital scores with a radar visualization inside a hardware "GravitasShell" frame with dust particle effects.

**The Codex** (`/workbench/codex`) — A library of 26 high-leverage leadership scripts and protocols. Displayed in a physical cabinet UI with CRT monitors, cartridge slots, and category filters (Identity, Relationship, Vision, Culture). Features a ReaderPanel with audio narration support, VU meter, and rotary knob controls.

### Side-Chain Handoff

After completing a Gravitas scan, the Results page offers a "Side-Chain" button that passes the user's lowest-scoring dimension to the Codex as a URL parameter (`?signal=identity`). The Codex auto-filters to protocols matching that dimension and displays a signal banner, creating a guided remediation flow.

### Plugin Categories

| Category | Description |
|---|---|
| Mirror | Self-reflection and diagnostic tools |
| Map | Assessment and measurement tools |
| Move | Action-oriented protocols and frameworks |
| Signal | Communication and influence tools |

### Future Plugins (Locked)

The Workbench displays 12 additional locked plugins including LaaS Calibrator, Friction Mapper, Orbit Planner, Resonance Engine, Signal Flare, Shadow Board Sim, Drift Detector, Culture Compiler, Succession Sandbox, Feedback Forge, Alignment Radar, and HID Scan.

---

## Gamification System

The site features a persistent XP and achievement system tracked via localStorage. The GameHud displays in the bottom-right corner.

### XP Breakdown (100 XP max)

| Source | XP Each | Count | Total |
|---|---|---|---|
| Page visits | 5 | 9 pages | 45 XP |
| Scroll completion (Home, Manifesto) | 10 | 2 pages | 20 XP |
| Easter eggs | 7 | 5 eggs | 35 XP |

Without Easter eggs, the maximum reachable XP is 65 (65%).

### Achievements (17 total)

| Achievement | Trigger | Icon |
|---|---|---|
| Quest Begun | Visit first page | ⚔️ |
| Explorer | Visit 5 pages | 🗺️ |
| Cartographer | Visit all 9 pages | 🏆 |
| Deep Reader | Scroll full Home page | 📜 |
| Map Walker | Scroll full Manifesto | 🧭 |
| Initiate | Reach 25 XP | 🌱 |
| Journeyman | Reach 50 XP | 🔥 |
| Rebel | Reach 65 XP (max without secrets) | ⭐ |
| Secret Found | Find first Easter egg | 🥚 |
| Loremaster | Find all 5 Easter eggs | 👑 |
| Fully Alive | 100% completion | ✨ |
| Present | 30 minutes on site | ⏳ |
| Committed | 1 hour on site | 🕐 |
| Level Complete | Beat the Manifesto side-scroller | 🎮 |
| Toolsmith | Visit the Workbench | 🔧 |
| Field Operative | Complete a Gravitas scan | 📡 |
| Protocol Officer | Read a Codex protocol | 📋 |

### Easter Eggs (5 total)

| ID | Page | Trigger | Quote |
|---|---|---|---|
| egg-home-logo | Home | Triple-click the logo | Marcel Proust — "The real voyage of discovery..." |
| egg-map-x | Manifesto | Click the X | J.R.R. Tolkien — "Not all those who wander are lost." |
| egg-about-tolkien | About | Hover over content | J.R.R. Tolkien — "All that is gold does not glitter..." |
| egg-shelf-book | The Shelf | Click hidden text | George R.R. Martin — "A reader lives a thousand lives..." |
| egg-konami | Start Here | Konami code (↑↑↓↓←→←→BA) | "It's dangerous to go alone!" — Ancient Gamer Wisdom |

---

## Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, Wouter (routing), Framer Motion
- **Backend**: Express 4, tRPC 11, Superjson
- **Database**: MySQL/TiDB via Drizzle ORM
- **Auth**: Manus OAuth
- **Content**: YouTube via Manus Data API, Substack RSS
- **Assets**: All static assets hosted on CDN (manuscdn.com / CloudFront)
- **Fonts**: Google Fonts (Press Start 2P, Cormorant Garamond, VT323)

---

## Key Directories

```
client/src/pages/           → Main site pages (Home, Archives, Shelf, etc.)
client/src/pages/workbench/ → Plugin pages (GravityCheck, Results, Codex)
client/src/components/      → Shared components (Navigation, Footer, GameHud, etc.)
client/src/components/workbench/ → Plugin components (GravitasShell, CabinetDeck, CodexShelf, etc.)
client/src/lib/workbench/   → Plugin data and logic (questions, scoring, codex-data, audio)
client/src/contexts/        → React contexts (GameContext for XP/achievements)
server/                     → tRPC routers, YouTube/Substack data fetching
drizzle/                    → Database schema and migrations
```

---

## Development

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server
pnpm test           # Run vitest tests
pnpm db:push        # Push schema changes to database
```

---

## Domains

- **Production**: [rebel-leader.com](https://www.rebel-leader.com)
- **Staging**: rebelleadrs-7wrwmpfk.manus.space
