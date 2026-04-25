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

Three fonts reinforce the RPG-meets-scholarship tension. **Press Start 2P** handles all UI elements, headings, and navigation in a pixel font. **Cormorant Garamond** provides an elegant serif for body text, quotes, and long-form content. **VT323** is used in the Workbench plugin interfaces for a terminal/hardware monospace aesthetic.

---

## Site Structure

The site contains pages across three tiers: the main content site, the interactive Workbench, and utility/auth pages.

### Main Site Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero scene with pixel-art office, RPG narrator typewriter, six-chapter scroll journey through the Rebel Leaders philosophy |
| `/manifesto` | The Map | The full manifesto — five chapters covering disconnection, formation, and the mission. Includes a scroll-driven side-scroller mini-game |
| `/start` | New Player | 30-second orientation for newcomers: What is this? Is this for me? What do I do? Includes a five-panel Field Briefing (The Disturbance, The Field, The Instrument, The Roots, The Stewardship Turn) that walks first-time visitors through the conceptual framework before sending them into the tools. |
| `/archives` | Archives | Auto-populated content hub with three tabs: Visions (YouTube full videos), Quick Strikes (Shorts), and Scrolls (Substack articles) |
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
| `/workbench/gravitas` | Gravitas | Leadership gravity diagnostic: questions, 3 minutes, 4 dimensions |
| `/workbench/results` | Results | Gravitas scan results: archetype card, animated dimension bars (Identity, Relationship, Vision, Culture), Leak, Force, and First Move cards. Every label carries an inline ⓘ tooltip (portal-based, hover/tap) with a plain-language definition. Deep Scan results also render five interpretive reading sections (Compensation Pattern, What This Costs, What This Protects, Primary Invitation, Why Codex Recommended This) — one profile per Archetype × Leak combination. Side-Chain button handoff to Codex. Prompts unauthenticated users to save their reading; auto-saves for authenticated users. |
| `/workbench/codex` | The Codex | Library of 27 leadership protocols in a hardware cabinet UI with audio narration |
| `/workbench/mirror` | Mirror Flow | Mirror reading flow (personality/archetype reading) |
| `/workbench/praxis` | Praxis | The active practice layer — lock a season (one Codex cartridge), build reps across three checkpoints, reflect, and surface trajectory after a second Gravitas scan |
| `/workbench/wall/:wallCode` | The Wall | Code-gated community walls for photo submissions |

### Auth & Utility Pages

| Route | Page | Description |
|---|---|---|
| `/auth/verify` | Auth Verify | Magic-link verification callback — validates token, sets session cookie, stitches anonymous session events, retroactively saves any pending Gravitas, Mirror, or Codex data, then redirects to the originating plugin page |
| `/hidden-assets` | Asset Vault | Hidden page listing all CDN image assets with download links |
| `/game-standalone` | Game Standalone | Standalone version of the Manifesto side-scroller |
| `/armory` | Legacy Redirect | Redirects to `/workbench` (former name) |
| `/admin` | Admin | Admin dashboard (authenticated Manus session required) |

---

## The Workbench (Plugin System)

The Workbench at `/workbench` is the hub for interactive leadership tools. It follows a **Cartridge** architecture — each tool is a self-contained module that slots into the Workbench shell. The landing page displays all 15 plugins as cards with category filters (Mirror, Map, Move, Signal) and status badges (Active, Locked). Every plugin card features a custom cover image designed in a Native Instruments DAW plugin aesthetic with vintage hardware, brass instruments, and technical readouts.

### Active Plugins

**Gravitas** (`/workbench/gravitas`) is a leadership gravity diagnostic. It presents questions across 4 dimensions (Identity, Relationship, Vision, Culture) in a hardware-styled interface with dust particle effects. The premium rotary knob component uses the Web Audio API to synthesize a satisfying mechanical click sound — a 12ms noise burst through a 4kHz bandpass filter. Results display an archetype card, animated dimension bars, and Leak/Force/First Move cards — all with inline ⓘ tooltips (`InfoTooltip`, portal-rendered via `createPortal` to escape `overflow-hidden` card boundaries). The archetype name carries a second tooltip with the band definition (Collapsed/Fractured/Stressed/Stable/Resonant Orbit). Deep Scan results add five interpretive reading sections written for each Archetype × Leak combination. All four `ScoringResult` fields include root health hints (`archetypeRootHint`, `leakRootHint`, `forceRootHint`, `firstMoveRootHint`) from the 5 Keys root health system. Analytics events fire on scan start (`gravitas_started`) and completion (`gravitas_completed` with archetype and leak dimension).

**The Codex** (`/workbench/codex`) is a library of 27 high-leverage leadership scripts and protocols displayed in a physical cabinet UI with CRT monitors, cartridge slots, and category filters (Identity, Relationship, Vision, Culture). The ReaderPanel features a typewriter heading animation, word-reveal text, audio narration with a VU meter, and rotary knob controls. First-time visitors see a first-run onboarding flow: a `CodexWelcome` modal (full-screen, dark/gold palette, ARCHIVE ACCESS GRANTED header, vault readouts) followed by a three-step `CodexTour` spotlight that highlights the cartridge shelf, SCAN button, and READ button in sequence. Onboarding state is stored in `localStorage` under `codex_intro_seen`. Each cartridge entry includes 5 Keys root health fields (`root_distortion`, `before_you_run`, `what_this_nourishes`, `keys_primary`, `keys_secondary`, `keys_notes`). Loading a cartridge fires a `codex_loaded` analytics event tagged with whether the user arrived from a Gravitas side-chain.

**Praxis** (`/workbench/praxis`) is the active practice layer and the third stage of the instrument loop. After Gravitas diagnoses a leader's gravity and the Codex surfaces the right protocol, Praxis is where the work actually happens. A user locks a season by selecting one Codex cartridge as their active protocol, then works through three rep checkpoints (Day 1, Day 7, Day 14). At each checkpoint, the Reflection Room presents four guided prompts. After a second Gravitas scan, the Comparator screen surfaces the user's delta across all four dimensions — rendering transformation as data rather than aspiration. First-time visitors see a `PraxisWelcome` onboarding modal (localStorage key: `praxis_intro_seen`). Season and reflection data is persisted server-side via `auth.getPraxisState`, `auth.lockPraxisSeason`, and `auth.saveReflection`. Client-side content lives in `client/src/lib/praxis-data.ts` — DELTA_FIELD_NOTES (19 narrative strings), FIRST_MOVE_CONTEXT (5 entries), PRAXIS_REPS (27 cartridge rep plans with Day 1/7/14 reps and rootNote), and FIRST_MOVE_TO_CARTRIDGE mapping.

### The Instrument Chain: Gravitas → Codex → Praxis

After completing a Gravitas scan, the Results page offers a "Side-Chain" button that passes the user's lowest-scoring dimension (the "leak") and full signal data to the Codex via URL params (`?signal=received&bottleneck=IDENTITY&firstMove=...`). The Codex uses a scoring algorithm (`getBestCartridge`) to select the highest-priority protocol for that signal, auto-loads it with a scan animation, and displays a signal banner — creating a guided remediation flow from diagnosis to action.

Once a protocol is identified, the user can proceed to Praxis to lock that cartridge as their active season. After completing the three-rep sequence and running Gravitas a second time, the Comparator closes the loop by surfacing dimension-level deltas — turning the full instrument chain into a measurable transformation arc.

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
| Praxis | MOVE | Active | The return loop. Lock a season, build reps, reflect, and surface trajectory after a second scan. |

### Plugin Categories

| Category | Focus | Active | Locked |
|---|---|---|---|
| MIRROR | Self-reflection and diagnostic tools | 1 | 3 |
| MAP | Assessment, measurement, and terrain mapping | 0 | 4 |
| MOVE | Action-oriented protocols and frameworks | 2 | 1 |
| SIGNAL | Communication, influence, and pattern detection | 0 | 4 |

---

## The Wall

The Wall (`/workbench/wall/:wallCode`) is a code-gated community photo-wall feature. Each wall is accessed by a short code (e.g. `/workbench/wall/REBEL`). Users must submit their own image (photo or upload) through `WallGate` before they can view other submissions — a contribution-first pattern that keeps the wall alive. Submitted images are stored in Cloudflare R2, queued as `pending`, and displayed only after admin approval.

### Wall Flow

1. User arrives at `/workbench/wall/:wallCode`
2. If not yet submitted (checked via `localStorage`), `WallGate` is shown — a prompt to take/upload a photo
3. On submit, image is uploaded to R2 via a presigned URL, a `wallEntries` row is created with `status: pending`
4. After submission, `WallGrid` shows the live wall (approved entries) with 15-second polling for new approvals
5. Admin moderates at `/workbench/wall/:wallCode?admin=true` using a secret token (`WALL_ADMIN_SECRET`)

### Wall Database Tables

- `walls` — wall definitions (title, description, wallCode, headerImageUrl, promptText)
- `wallEntries` — per-submission rows (imageUrl, status, displayOrder)

---

## Auth System

The site uses a **dual auth** model: legacy Manus OAuth for admin/Nic's account, and **magic-link email auth** for public users.

### Magic-Link Flow

1. On the Results/Mirror/Codex page, unauthenticated users see a save prompt — an email input with Cormorant Garamond styling
2. Before requesting the link, the pending data is stored in localStorage: `gravitas_pending_save`, `mirrorResult`, or `pending_save_codex`. The originating page path is stored in `auth_redirect_after_verify`
3. `auth.requestMagicLink` inserts a 64-char random hex token into `auth_tokens` (15-minute expiry) and sends a branded HTML email via Resend
4. User clicks the link → `/auth/verify?token=<token>&sessionId=<id>`
5. `auth.verifyToken` validates the token, marks it used, creates or updates the `users` row, sets an `rl_session` httpOnly JWT cookie (30-day expiry, signed with `JWT_SECRET`), and triggers session stitching + retroactive saves for any pending plugin data
6. `AuthVerify` calls `identifyUser()` to link the PostHog anonymous identity to the user's ID and email, clears all pending localStorage keys, then redirects to the originating page (from `auth_redirect_after_verify`) after 3 seconds

### Session Stitching

Every browser session has an anonymous `sessionId` (UUID generated at first visit, stored in `localStorage` via `SessionContext`). All `user_events` rows are written with this `sessionId`. When a user authenticates via magic-link, all `user_events` rows matching that `sessionId` have their `userId` backfilled — linking pre-auth behavior to the new user record.

### Retroactive Plugin Data Save

All three active plugins support anonymous-to-authenticated data promotion. If a user interacts before signing in, their data is held in localStorage and promoted on magic-link verification:

- **Gravitas** — result stored in `localStorage('gravitas_pending_save')`; `verifyToken` inserts a `gravitas_assessments` row
- **Mirror** — result stored in `localStorage('mirrorResult')`; `verifyToken` inserts a `mirror_readings` row
- **Codex** — saved cartridge IDs stored in `localStorage('pending_save_codex')` as `{ cartridgeIds: string[] }`; `verifyToken` deduplicates and inserts into `codex_interactions` with `action: "saved"`

All pending keys are cleared from localStorage on successful verification. The `useSaveWithAuth` hook (`client/src/hooks/useSaveWithAuth.ts`) provides a unified interface: authenticated users get a direct DB write; anonymous users get the localStorage + magic-link prompt flow.

### Session Cookie

The `rl_session` cookie is:
- **httpOnly** — not accessible to JavaScript
- **secure** — HTTPS-only in production (`ENV.isProduction`)
- **sameSite: lax** — protects against CSRF while allowing link-click flows
- **maxAge: 30 days**

`auth.me` checks the Manus OAuth session first, then falls back to reading and verifying the `rl_session` JWT. `auth.logout` clears both cookies with matching options to ensure the browser actually removes them.

### GameHud Auth Indicator

When a user is signed in (via magic-link), the bottom of the expanded GameHud panel shows their email in dim gold pixel text alongside a `SIGN OUT` button. Clicking it calls `auth.logout`, resets the PostHog identity (`resetUser()`), and reloads the page.

---

## Analytics

The site uses [PostHog](https://posthog.com) for product analytics, initialized in `client/src/lib/analytics.ts` and called once in `main.tsx` before render.

### Configuration

| Env Var | Purpose |
|---|---|
| `VITE_POSTHOG_API_KEY` | PostHog project API key (required to enable analytics) |
| `VITE_POSTHOG_HOST` | PostHog ingestion host (defaults to `https://us.i.posthog.com`) |

Analytics is **silently disabled** if `VITE_POSTHOG_API_KEY` is not set — no errors, no tracking. This means local development has analytics off by default.

### Session Recording

Session recording is enabled with `maskAllInputs: false` and `maskInputOptions: { password: true }` — email inputs are recorded (useful for seeing form abandonment), password fields are masked.

### Typed Event Helpers

All events go through `events.*` in `analytics.ts` to keep property names consistent:

| Event | Trigger | Properties |
|---|---|---|
| `gravitas_started` | User selects a scan mode | `scanType` |
| `gravitas_completed` | Results page loaded | `archetype`, `leak` |
| `gravitas_abandoned` | User navigates away mid-scan | `questionIndex` |
| `codex_loaded` | Cartridge loaded into deck | `cartridgeId`, `fromGravitas` |
| `codex_read` | Read button pressed | `cartridgeId` |
| `codex_run_started` | Run mode opened | `cartridgeId` |
| `codex_run_completed` | Run checklist completed | `cartridgeId` |
| `wall_viewed` | Wall page rendered | `wallCode` |
| `wall_submitted` | Photo submitted to wall | `wallCode` |
| `workbench_locked_plugin_clicked` | Locked plugin card clicked | `pluginId` |
| `easter_egg_found` | Easter egg discovered | `eggId` |
| `achievement_unlocked` | Achievement awarded | `achievementId` |
| `auth_created` | New user account created | — |
| `auth_returned` | Existing user signed in | — |

---

## Gamification System

The site features a persistent XP and achievement system tracked entirely via `localStorage` — no server-side state required. The `GameHud` displays in the bottom-right corner of every page and can be minimized. When a user is authenticated, the HUD also shows their email and a sign-out button at the bottom of the expanded panel.

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

## Database Schema

The database is MySQL (hosted on Railway) accessed via Drizzle ORM. Migrations are managed as raw SQL files in `drizzle/` alongside a Drizzle journal and snapshot. The server also runs belt-and-suspenders `CREATE TABLE IF NOT EXISTS` guards on startup in `server/_core/index.ts`.

### Tables

| Table | Purpose |
|---|---|
| `users` | All users. `openId` is nullable — Manus OAuth users have it set; magic-link users have it null. `loginMethod` is `oauth` or `magic_link`. |
| `gravitas_results` | Legacy Gravitas scan results (scan mode, 4 dimension scores, archetype, leak, force, full JSON payload) |
| `auth_tokens` | One-time magic-link tokens. 64-char hex, 15-minute expiry, marked `used` after first verification |
| `user_events` | Behavioral event log. Written with `sessionId` (anonymous) then backfilled with `userId` on auth via session stitching |
| `gravitas_assessments` | Normalized Gravitas results with `sessionNumber` for tracking transformation over time. Distinct from `gravitas_results` — this is the authoritative per-user assessment history |
| `gravitas_deltas` | Computed delta between two `gravitas_assessments` rows (per-dimension change, archetype shift, leak shift) — powers trajectory view |
| `codex_interactions` | Protocol engagement (load, read, run, checkbox progress, time spent, whether user arrived from Gravitas side-chain) |
| `mirror_readings` | Mirror plugin reading results stored per session/user |
| `walls` | Wall definitions (title, wallCode, header image, prompt text, active/featured flags) |
| `wallEntries` | Per-submission rows for the Wall feature (imageUrl, status, displayOrder) |
| `praxis_seasons` | Active Praxis season per user — cartridgeId, firstMove, status (active/complete), sessionNumberAtLock, lockedAt, completedAt |
| `praxis_reflections` | Per-checkpoint reflections for a Praxis season — seasonId, userId, day (1/7/14), response text, completedAt |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Tailwind CSS 4, Wouter (routing), Framer Motion |
| Backend | Express 4, tRPC 11, Superjson |
| Database | MySQL on Railway via Drizzle ORM |
| Auth | Dual: Manus OAuth (admin/legacy) + magic-link email (public users) |
| Auth JWT | `jose` v6 — `SignJWT` / `jwtVerify` with HS256 |
| Transactional Email | Resend (`resend` SDK) with branded HTML template |
| Analytics | PostHog (`posthog-js`) — pageview, session recording, 14 typed events |
| Content Feeds | YouTube Data API v3 (playlist-based, 2 units/refresh), Substack RSS |
| Image Storage | Cloudflare R2 (Wall photo submissions via presigned URLs) |
| Audio | Web Audio API — synthesized mechanical sounds, no audio files |
| Assets | CloudFront CDN for all static images |
| Fonts | Google Fonts (Press Start 2P, Cormorant Garamond, VT323) |
| Testing | Vitest (tests across auth, RSS, YouTube modules) |
| State | `localStorage` for gamification + anonymous session ID; tRPC + React Query for server state |
| Deployment | Railway |

---

## Project Structure

```
client/
  src/
    pages/                        → Main site pages (Home, Manifesto, About, Archives, etc.)
    pages/workbench/              → Plugin pages (GravityCheck, Results, Codex, MirrorFlow, MirrorReading, Praxis)
    pages/wall/                   → Wall feature pages (WallPage, WallGate, WallGrid, WallAdmin, WallIndex)
    pages/AuthVerify.tsx          → Magic-link verification callback
    components/                   → Shared components (Navigation, Footer, GameHud, DialogueBox, etc.)
    components/workbench/         → Plugin components (GravitasShell, CabinetDeck, CodexShelf, ReaderPanel, etc.)
    components/SaveReadingPrompt.tsx → Email capture shown on Results when unauthenticated
    components/ui/                → shadcn/ui component library
    contexts/
      GameContext.tsx             → XP, achievements, toasts — all localStorage
      ThemeContext.tsx            → Light/dark theme
      SessionContext.tsx          → Anonymous session ID (UUID, localStorage, lives for session stitching)
    hooks/                        → usePageTracker, useScrollTracker, useComposition, usePersistFn, useSaveWithAuth
    lib/
      analytics.ts                → PostHog init, identifyUser, resetUser, 14 typed event helpers
      trpc.ts                     → tRPC client setup
      workbench/                  → Plugin data and logic (codex-data, codex-schema, codex-ranking, questions, scoring, CodexAudio)
      praxis-data.ts              → Praxis content: DELTA_FIELD_NOTES, FIRST_MOVE_CONTEXT, PRAXIS_REPS (27 cartridge rep plans), FIRST_MOVE_TO_CARTRIDGE
    index.css                     → Global theme with custom Tailwind tokens
    main.tsx                      → App entry: initPostHog() + SessionProvider + createRoot
  public/                         → Static assets (favicon, robots.txt)

server/
  routers.ts                      → tRPC router (auth, substack, youtube, wall, gravitas, admin, system)
  auth.ts                         → Magic-link procedures: requestMagicLink, verifyToken, logEvent, saveGravitasAssessment; getMagicLinkUser helper
  emails/magic-link.ts            → Branded HTML email template for magic-link
  rss.ts                          → Substack RSS feed parser
  youtube-rss.ts                  → YouTube Data API v3 (playlist-based, full videos + shorts, 30-min cache)
  gravitas.ts                     → Gravitas result persistence router
  wall.ts                         → Wall feature router (getWall, getEntries, submit, admin moderation)
  admin.ts                        → Admin dashboard router
  db.ts                           → Drizzle database connection (lazy singleton)
  storage.ts                      → S3/R2 helpers for Wall image uploads
  r2.ts                           → Cloudflare R2 client configuration
  *.test.ts                       → Vitest test files (auth.logout, rss, youtube-rss)
  _core/
    index.ts                      → Server startup: Express + tRPC mount + belt-and-suspenders DB migrations
    env.ts                        → All environment variable bindings (single source of truth)
    trpc.ts                       → tRPC context, router, publicProcedure setup
    context.ts                    → Request context (req, res, user from Manus OAuth)
    cookies.ts                    → Cookie option helpers
    oauth.ts                      → Manus OAuth handling

drizzle/
  schema.ts                       → Full database schema (12 tables)
  relations.ts                    → Drizzle relations
  0001_*.sql … 0004_*.sql         → Migration files (raw SQL, applied in sequence)
  meta/_journal.json              → Migration journal
  meta/*_snapshot.json            → Schema snapshots per migration

shared/
  const.ts                        → Shared constants (cookie names, etc.)
  types.ts                        → Shared TypeScript types
```

---

## Backend API

The server exposes all procedures through `/api/trpc` via tRPC v11. All procedures use the `publicProcedure` base (Manus OAuth user available via `ctx.user` when present).

### `auth` namespace

| Procedure | Type | Description |
|---|---|---|
| `auth.me` | query | Returns the current user. Checks Manus OAuth session first, then reads and verifies the `rl_session` JWT cookie |
| `auth.logout` | mutation | Clears both the Manus OAuth session cookie and the `rl_session` cookie (with matching options) |
| `auth.requestMagicLink` | mutation | Creates a 15-min token in `auth_tokens`, sends a branded email via Resend. Input: `{ email, sessionId }` |
| `auth.verifyToken` | mutation | Validates token, creates/updates user, sets `rl_session` JWT cookie (30 days), stitches session events, retroactively saves any pending plugin data. Input: `{ token, sessionId, pendingGravitasResult?, pendingMirrorResult?, pendingCodexInteractions? }`. Returns `{ success, user: { id, email } }` |
| `auth.logEvent` | mutation | Inserts a row into `user_events` (anonymous or authenticated). Input: `{ sessionId, eventType, payload? }` |
| `auth.saveGravitasAssessment` | mutation | Saves a completed Gravitas scan to `gravitas_assessments` for the authenticated user. No-ops if unauthenticated. Increments `sessionNumber` |
| `auth.saveMirrorReading` | mutation | Saves a Mirror reading result to `mirror_readings` for the authenticated user |
| `auth.getLatestMirrorReading` | query | Returns the most recent `mirror_readings` row for the authenticated user |
| `auth.sendCodexEmail` | mutation | Sends a Codex cartridge email (script + steps + reader link) via Resend. Input: `{ email, cartridgeId }` |
| `auth.saveCodexInteraction` | mutation | Deduplicates and inserts `action: "saved"` rows into `codex_interactions`. Input: `{ cartridgeIds: string[] }`. No-ops if unauthenticated |
| `auth.getSavedCodexCartridges` | query | Returns all cartridgeIds the authenticated user has saved. Returns `[]` if unauthenticated |
| `auth.getPraxisState` | query | Returns the user's Praxis state: active season (with reflections), latest Gravitas assessment, latest delta, and session count. No-ops if unauthenticated |
| `auth.lockPraxisSeason` | mutation | Closes any existing active season and opens a new one. Input: `{ cartridgeId, firstMove, sessionNumberAtLock }` |
| `auth.saveReflection` | mutation | Saves a checkpoint reflection for the active season. Input: `{ seasonId, day: 1 | 7 | 14, response }` |

### `youtube` namespace

| Procedure | Type | Description |
|---|---|---|
| `youtube.videos` | query | Returns full-length videos from the Uploads playlist (filtered to exclude Shorts) |
| `youtube.shorts` | query | Returns Shorts from the UUSH playlist |

Both share a single 30-minute in-memory cache. Two parallel `playlistItems` API calls per refresh (2 quota units total). Falls back to stale cache rather than returning empty on API failure.

### `substack` namespace

| Procedure | Type | Description |
|---|---|---|
| `substack.articles` | query | Fetches and parses the Substack RSS feed |

### `wall` namespace

Handles wall retrieval, entry listing, photo submission (with R2 presigned URLs), and admin moderation (approve/reject entries). Admin actions require `WALL_ADMIN_SECRET` in the request.

### `gravitas` namespace

Handles persistence of legacy Gravitas scan results (pre-auth system, used by the older `gravitas_results` table).

---

## Environment Variables

All environment variables are centralized in `server/_core/env.ts`. The ones marked **Required** will cause silent failures or missing features if absent.

### Server-side

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | MySQL connection string |
| `JWT_SECRET` | ✅ | Secret for signing `rl_session` JWTs. Use a long random string in production |
| `APP_URL` | ✅ | Full base URL (e.g. `https://rebel-leader.com`). Used to construct magic-link URLs in emails |
| `RESEND_API_KEY` | ✅ | Resend API key for transactional email. Without this, magic-link URLs are only logged to the console |
| `YOUTUBE_API_KEY` | ✅ | YouTube Data API v3 key with the YouTube Data API enabled in Google Cloud Console. No IP restrictions — Railway IPs are dynamic |
| `R2_ACCOUNT_ID` | ✅ (Wall) | Cloudflare account ID for R2 |
| `R2_ACCESS_KEY_ID` | ✅ (Wall) | R2 access key |
| `R2_SECRET_ACCESS_KEY` | ✅ (Wall) | R2 secret key |
| `R2_BUCKET_NAME` | ✅ (Wall) | R2 bucket name (default: `rebel-leaders-wall`) |
| `R2_PUBLIC_URL` | ✅ (Wall) | Public base URL for serving R2 objects |
| `WALL_ADMIN_SECRET` | ✅ (Wall) | Secret token for wall admin moderation actions |
| `OAUTH_SERVER_URL` | Legacy | Manus OAuth server URL |
| `OWNER_OPEN_ID` | Legacy | Manus `openId` of the admin account |
| `NODE_ENV` | — | Set to `production` by Railway automatically. Controls cookie `secure` flag and other guards |

### Client-side (Vite env vars — must be prefixed `VITE_`)

| Variable | Required | Description |
|---|---|---|
| `VITE_POSTHOG_API_KEY` | — | PostHog project API key. Analytics are silently disabled if absent (safe for local dev) |
| `VITE_POSTHOG_HOST` | — | PostHog ingestion host. Defaults to `https://us.i.posthog.com` |
| `VITE_APP_ID` | Legacy | Manus platform app ID |

---

## Mobile Strategy

The main site pages (Home, Map, Archives, Shelf, About, Start Here, Workbench landing) are fully responsive and mobile-friendly. Complex interactive tools — Gravitas, Codex, Results, and Praxis — are gated behind a `DesktopOnly` component that displays a redirect message on screens under 768px. This is a deliberate design choice: the hardware-styled plugin interfaces require sufficient screen real estate to function properly.

---

## Development

```bash
pnpm install        # Install dependencies (requires Node 18+, pnpm 10)
pnpm dev            # Start dev server (Express + Vite HMR)
pnpm build          # Production build (Vite + esbuild)
pnpm start          # Run production build
pnpm test           # Run Vitest tests
pnpm check          # TypeScript type checking
pnpm format         # Prettier formatting
pnpm db:push        # Generate and run database migrations
```

### Local environment notes

- Requires **Node 18+** (the project specifies `pnpm@10.4.1` as package manager)
- If using nvm: `nvm use 20`
- Analytics are disabled locally by default (no `VITE_POSTHOG_API_KEY` in `.env.local`)
- Without `RESEND_API_KEY`, magic-link URLs are printed to the console — useful for testing the flow without sending real emails

---

## Deployment

The site is deployed on **Railway** from the `main` branch. Railway runs `pnpm install --frozen-lockfile` then `pnpm build` then `pnpm start`.

The `packageManager` field in `package.json` pins `pnpm@10.4.1` — Railway respects this field and uses that exact version. The lockfile must be generated with the same version to avoid `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`.

### Domains

| Environment | URL |
|---|---|
| Production | [rebel-leader.com](https://www.rebel-leader.com) |
| Production (www) | [www.rebel-leader.com](https://www.rebel-leader.com) |

---

## Content Philosophy

The site draws on a cross-disciplinary foundation spanning ancient philosophy (Aristotle's akrasia and eudaimonia, Stoic oikeiosis, Tao Te Ching, Rumi, Meister Eckhart), modern behavioral science (Gabor Maté on collective trauma, Iain McGilchrist on hemisphere research, Richard Rohr on the two halves of life, Rory Sutherland on behavioral economics, Richard Boyatzis on resonant leadership), and community thinkers (Robert Putnam on civic collapse, Viktor Frankl on meaning, Martin Buber on relational philosophy, Howard Thurman on vocation). The core thesis is that leadership is not a skill to be optimized but a relational infrastructure that forms humans — and that most organizations have replaced formation with transaction.
