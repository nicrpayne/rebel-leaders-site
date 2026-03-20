# Rebel Leaders

**"You've been playing the wrong game."**

Rebel Leaders is a gamified thought-leadership platform that fuses 16-bit RPG aesthetics with deep philosophical content about leadership, human formation, and organizational culture. The site unfolds like an RPG storyline — scroll equals journey — delivering ideas from Aristotle, Gabor Maté, Iain McGilchrist, Richard Rohr, and others through pixel-art dialogue boxes, side-scroller mini-games, and a professional plugin workbench styled after Native Instruments hardware.

**Live at [rebel-leader.com](https://www.rebel-leader.com)**

---

## Design Philosophy

The design movement is **16-bit RPG Nostalgia meets Philosophical Depth**. The dissonance IS the brand. Nobody expects divided-brain theory in a SNES dialogue box. Every page is built around the idea that leadership content can be intellectually rigorous and visually playful at the same time.

### Color Palette

The palette is drawn from the actual office where the content is created — deep forest greens, warm wood browns, and Tolkien gold accents.

| Token | Hex | Usage |
|---|---|---|
| Deep Forest Green | `#1a3a2a` | Primary background, wall anchor |
| Warm Wood Brown | `#6b4c2a` | Shelves, warmth, secondary surfaces |
| Tolkien Gold | `#d4a843` | Accents, highlights, UI chrome |
| Leather Red | `#8b3a3a` | Emphasis, locked badges |
| Parchment Cream | `#f0e6d0` | Body text, readable surfaces |
| Pixel Black | `#0d1a12` | Deepest background layers |

### Typography

The project uses three fonts that reinforce the RPG-meets-scholarship tension. **Press Start 2P** handles all UI elements, headings, and navigation in a pixel font. **Cormorant Garamond** provides an elegant serif for body text, quotes, and long-form content. **VT323** is used in the Workbench plugin interfaces for a terminal/hardware monospace aesthetic.

---

## Site Structure

The site contains 17 pages across three tiers: the main content site, the interactive Workbench, and hidden/utility pages.

### Main Site Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero scene with pixel-art office, RPG narrator typewriter, six-chapter scroll journey through the Rebel Leaders philosophy |
| `/manifesto` | The Map | The full manifesto — five chapters covering disconnection, formation, and the mission. Includes a scroll-driven side-scroller mini-game |
| `/start` | New Player | 30-second orientation for newcomers: What is this? Is this for me? What do I do? |
| `/archives` | Archives | Auto-populated content hub with three tabs: Visions (YouTube videos), Quick Strikes (Shorts), and Scrolls (Substack articles) |
| `/shelf` | The Shelf | Curated library of 60+ books across 7 categories with a "Start Here" section of 5 essential reads |
| `/residency` | Residency | Coaching and consulting intake page |
| `/about` | About | Nic's story, philosophy, and a skill-tree visualization of intellectual influences |
| `/mirror` | The Mirror | Substack newsletter integration and subscription |
| `/community` | Community | Community hub (coming soon) |
| `/book` | Book | Book project page (coming soon) |
| `/game` | The Game | Game teaser (coming soon) |

### Workbench Pages

| Route | Page | Description |
|---|---|---|
| `/workbench` | Workbench | Plugin hub — 15 plugin cards in a filterable grid with category and status filters |
| `/workbench/gravitas` | Gravitas | Leadership gravity diagnostic: 15 questions, 3 minutes, 5 dimensions |
| `/workbench/results` | Results | Gravitas scan results with radar visualization and Side-Chain handoff to Codex |
| `/workbench/codex` | The Codex | Library of 26 leadership protocols in a hardware cabinet UI with audio narration |

### Utility Pages

| Route | Page | Description |
|---|---|---|
| `/hidden-assets` | Asset Vault | Hidden page listing all CDN image assets with download links |
| `/game-standalone` | Game Standalone | Standalone version of the Manifesto side-scroller |
| `/armory` | Legacy Redirect | Redirects to `/workbench` (former name) |

---

## The Workbench (Plugin System)

The Workbench at `/workbench` is the hub for interactive leadership tools. It follows a **Cartridge** architecture — each tool is a self-contained module that slots into the Workbench shell. The landing page displays all 15 plugins as cards with category filters (Mirror, Map, Move, Signal) and status badges (Active, Locked). Every plugin card features a custom cover image designed in a Native Instruments DAW plugin aesthetic with vintage hardware, brass instruments, and technical readouts.

### Active Plugins

**Gravitas** (`/workbench/gravitas`) is a leadership gravity diagnostic. It presents 15 questions across 5 dimensions (Identity, Relationship, Vision, Culture, Field Strength) in a hardware-styled interface with dust particle effects. The premium rotary knob component uses Web Audio API to synthesize a satisfying mechanical click sound — a 12ms noise burst through a 4kHz bandpass filter. Results display orbital scores with a radar visualization inside the GravitasShell frame.

**The Codex** (`/workbench/codex`) is a library of 26 high-leverage leadership scripts and protocols. It is displayed in a physical cabinet UI with CRT monitors, cartridge slots, and category filters (Identity, Relationship, Vision, Culture). The ReaderPanel features a typewriter heading animation, word-reveal text, audio narration with a VU meter, and rotary knob controls.

### Side-Chain Handoff

After completing a Gravitas scan, the Results page offers a "Side-Chain" button that passes the user's lowest-scoring dimension to the Codex as a URL parameter (`?signal=identity`). The Codex auto-filters to protocols matching that dimension and displays a signal banner, creating a guided remediation flow from diagnosis to action.

### All 15 Plugins

| Plugin | Category | Status | Description |
|---|---|---|---|
| Gravitas | MIRROR | Active | 15 questions. 3 minutes. Reveal the hidden forces shaping your team's orbit. |
| The Codex | MOVE | Active | A library of high-leverage leadership scripts and protocols. |
| LaaS Calibrator | MAP | Locked | Leadership As A Service. Measure your team's dependency ratio. |
| HID Scan | MIRROR | Locked | Depth analysis. Measures if work is touching roots or just symptoms. |
| The Terrain | MAP | Locked | Mythic cartography. Organizations are landscapes, not flat charts. |
| Underground | MAP | Locked | Leadership culture analysis. Map the root system beneath your team's surface. |
| Astrolabe | MIRROR | Locked | Vocational bearing. Find true north when everything around you is spinning. |
| Drift | MAP | Locked | Orbital alignment. Declared center vs. actual center. See where the system is really pulling. |
| Leak Finder | SIGNAL | Locked | Fault detection. Where the system is bleeding trust, clarity, or energy. |
| EYE | MIRROR | Locked | Inner climate scan. Read the pressure system moving through you before it moves through your team. |
| Prism | SIGNAL | Locked | Conflict refraction. See what's really hiding inside the signal before you react. |
| Signal Decoder | SIGNAL | Locked | Signal analysis. Translating recurring tensions into truth. |
| Move Matcher | MOVE | Locked | Tactical routing. Fitting the right move to the actual rupture. |
| Field Notes | SIGNAL | Locked | Expedition log. Reflection as formation. |
| Praxis Builder | MOVE | Locked | Action sequencer. Transformation through repeated embodied practice. |

### Plugin Categories

| Category | Focus | Active | Locked |
|---|---|---|---|
| MIRROR | Self-reflection and diagnostic tools | 1 | 3 |
| MAP | Assessment, measurement, and terrain mapping | 0 | 4 |
| MOVE | Action-oriented protocols and frameworks | 1 | 2 |
| SIGNAL | Communication, influence, and pattern detection | 0 | 4 |

---

## Gamification System

The site features a persistent XP and achievement system tracked entirely via localStorage — no server-side state required. The GameHud displays in the bottom-right corner of every page and can be minimized.

### XP Breakdown (100 XP Total)

| Source | XP Each | Count | Subtotal |
|---|---|---|---|
| Page visits | 5 | 9 pages | 45 XP |
| Scroll completion | 10 | 2 long pages (Home, Manifesto) | 20 XP |
| Easter eggs | 7 | 5 hidden secrets | 35 XP |

Without discovering any Easter eggs, the maximum reachable XP is 65 out of 100 (65%). This is intentional — the XP bar visibly stalls, prompting exploration.

### Achievements (17 Total)

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

### Easter Eggs (5 Total)

| ID | Page | Trigger | Quote |
|---|---|---|---|
| egg-home-logo | Home | Triple-click the logo | Marcel Proust — "The real voyage of discovery..." |
| egg-map-x | Manifesto | Click the X | J.R.R. Tolkien — "Not all those who wander are lost." |
| egg-about-tolkien | About | Hover over content | J.R.R. Tolkien — "All that is gold does not glitter..." |
| egg-shelf-book | The Shelf | Click hidden text | George R.R. Martin — "A reader lives a thousand lives..." |
| egg-konami | Start Here | Konami code (↑↑↓↓←→←→BA) | "It's dangerous to go alone!" — Ancient Gamer Wisdom |

---

## The Manifesto Side-Scroller

The Map page (`/manifesto`) includes a scroll-driven side-scroller mini-game built on HTML5 Canvas. As the user scrolls through the manifesto content, a pixel-art character (Nic, with lightsaber) runs through four themed zones — Corporate, Crumbling, Growth, and Summit — auto-jumping over enemies that represent organizational dysfunction (Quick Meeting goombas, Slack Ping bats, Policy Turtles) and smashing through Buzzword Bricks. The game features parallax background scrolling, sprite animation, and awards the "Level Complete" achievement upon reaching the end.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Tailwind CSS 4, Wouter (routing), Framer Motion |
| Backend | Express 4, tRPC 11, Superjson |
| Database | MySQL / TiDB via Drizzle ORM |
| Auth | Manus OAuth |
| Content Feeds | YouTube RSS (via Manus Data API), Substack RSS |
| Audio | Web Audio API (synthesized mechanical sounds, no audio files) |
| Assets | CloudFront CDN for all static images |
| Fonts | Google Fonts (Press Start 2P, Cormorant Garamond, VT323) |
| Testing | Vitest (12 tests across 3 test files) |
| State | localStorage for gamification, tRPC + React Query for server state |

---

## Project Structure

```
client/
  src/
    pages/                  → 17 main site pages
    pages/workbench/        → Gravitas, Results, Codex plugin pages
    components/             → 21 custom components (Navigation, Footer, GameHud, DialogueBox, etc.)
    components/workbench/   → 8 plugin components (GravitasShell, CabinetDeck, CodexShelf, ReaderPanel, etc.)
    components/ui/          → shadcn/ui component library
    contexts/               → GameContext (XP/achievements), ThemeContext
    hooks/                  → usePageTracker, useScrollTracker, useComposition, usePersistFn
    lib/workbench/          → Plugin data and logic (questions, scoring, codex-data, codex-ranking, audio)
    index.css               → Global theme with custom Tailwind tokens
  public/                   → Static assets (favicon, robots.txt)

server/
  routers.ts                → tRPC procedures (auth, substack RSS, YouTube RSS)
  rss.ts                    → Substack RSS feed parser
  youtube-rss.ts            → YouTube RSS feed parser
  db.ts                     → Database query helpers
  storage.ts                → S3 storage helpers
  *.test.ts                 → Vitest test files (auth, RSS, YouTube)

drizzle/
  schema.ts                 → Database schema (users table)
  relations.ts              → Drizzle relations
  migrations/               → Generated migrations

shared/
  const.ts                  → Shared constants
  types.ts                  → Shared TypeScript types
```

---

## Backend API

The server exposes three tRPC routers through `/api/trpc`:

**auth** handles Manus OAuth. `auth.me` returns the current user session, and `auth.logout` clears the session cookie.

**substack** provides `substack.articles`, which fetches and parses the Substack RSS feed to populate the Scrolls tab on the Archives page.

**youtube** provides `youtube.videos` (full-length videos for the Visions tab) and `youtube.shorts` (Shorts for the Quick Strikes tab), both parsed from the YouTube channel RSS feed.

---

## Mobile Strategy

The main site pages (Home, Map, Archives, Shelf, About, Start Here, Workbench landing) are fully responsive and mobile-friendly. Complex interactive tools — Gravitas, Codex, and Results — are gated behind a `DesktopOnly` component that displays a message on screens under 768px, directing users to a desktop browser. This is a deliberate design choice: the hardware-styled plugin interfaces require sufficient screen real estate to function properly.

---

## Development

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server (Express + Vite)
pnpm test           # Run vitest tests (12 tests, 3 files)
pnpm build          # Production build (Vite + esbuild)
pnpm db:push        # Generate and run database migrations
pnpm check          # TypeScript type checking
pnpm format         # Prettier formatting
```

---

## Domains

| Environment | URL |
|---|---|
| Production | [rebel-leader.com](https://www.rebel-leader.com) |
| Production (www) | [www.rebel-leader.com](https://www.rebel-leader.com) |
| Staging | [rebelleadrs-7wrwmpfk.manus.space](https://rebelleadrs-7wrwmpfk.manus.space) |

---

## Content Philosophy

The site draws on a cross-disciplinary foundation spanning ancient philosophy (Aristotle's akrasia and eudaimonia, Stoic oikeiosis, Tao Te Ching, Rumi, Meister Eckhart), modern behavioral science (Gabor Maté on collective trauma, Iain McGilchrist on hemisphere research, Richard Rohr on the two halves of life, Rory Sutherland on behavioral economics, Richard Boyatzis on resonant leadership), and community thinkers (Robert Putnam on civic collapse, Viktor Frankl on meaning, Martin Buber on relational philosophy, Howard Thurman on vocation). The core thesis is that leadership is not a skill to be optimized but a relational infrastructure that forms humans — and that most organizations have replaced formation with transaction.
