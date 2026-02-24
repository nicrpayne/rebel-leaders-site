# Rebel Leaders Multi-Page Build

## Phase 1: Assets
- [ ] Upload hopeisrebellious.jpg to CDN
- [ ] Generate pixel art: straight-on bookshelf scene for The Shelf page
- [ ] Generate pixel art: tavern/gathering scene for coming soon pages

## Phase 2: Navigation & Routes
- [ ] Update App.tsx with all routes
- [ ] Rebuild Navigation with clean grouped dropdown nav (5-6 top items)
- [ ] Pages: Home, NewPlayer, Archives, Shelf, Manifesto, Armory, Mirror, Residency, QuestGiver, Game, Manuscript, Tavern

## Phase 3: Content-Rich Pages
- [ ] The Archives (YouTube embeds + Substack links)
- [ ] The Shelf (books/podcasts with straight-on office photo)
- [ ] The Quest-Giver (full About + contact)
- [ ] The Residency (port from existing site)
- [ ] The Manifesto / The Map (full manifesto document)

## Phase 4: Coming Soon + New Player
- [ ] New Player (Start Here guided entry)
- [ ] The Game (coming soon teaser)
- [ ] The Manuscript (coming soon teaser)
- [ ] The Tavern (community coming soon)
- [ ] The Mirror (assessment coming soon)
- [ ] The Armory / The Moves (digital downloads coming soon)

## Phase 5: Final
- [ ] Test all pages and navigation
- [ ] Mobile responsiveness check
- [ ] Checkpoint and deliver

## Phase 6: Full-Stack Upgrade & Integrations
- [x] Resolve web-db-user upgrade conflicts (Home.tsx)
- [x] Run pnpm db:push to sync database schema
- [x] Swap Shelf and About hero images
- [x] Build backend RSS endpoint for Substack feed auto-population
- [x] Update Scrolls tab to auto-fetch from RSS instead of hardcoded articles
- [x] Verify full-stack upgrade works end-to-end
- [x] Write vitest tests for RSS integration (4/4 passing)

## Phase 7: YouTube RSS Integration
- [x] Find YouTube channel RSS feed URL (UCQvL3b2AbMM_K38lY3FHdLg)
- [x] Build backend YouTube RSS endpoint
- [x] Update Visions tab to auto-fetch videos from RSS
- [x] Update Quick Strikes tab to auto-fetch Shorts from RSS
- [x] Write vitest tests for YouTube RSS integration (5/5 passing, 9/9 total)
## Phase 8: Portrait Update
- [x] Replace About page portrait with new transparent-background pixel art (v3)

## Phase 9: Home Page Content Updates
- [x] Change "We call this the Great Transfer" to "This is the Great Transfer"
- [x] Make Great Transfer, Vulture Culture, Hollow Crown gold hyperlinks to Substack articles
- [x] Update flywheel definitions (Vision, Relationship, Identity) from Substack article
- [x] Replace 'framework' with 'orbital system' across entire site
- [x] Update Maps/Mirrors/Moves box descriptions
- [x] Replace 'Bowl and the Flow' with 'Bowl, Water, and Current' across entire site
- [x] Combine Chapter V into About section (remove from Home)
- [x] Remove military service reference from About (was in Chapter V, now removed)
- [x] Replace 'repurposed' with 'mobilized'

## Phase 10: Minor Content Tweaks
- [x] Change "THE REBEL CREED" speaker label to "THE REBEL PHILOSOPHY" in Chapter II dialogue box
- [x] Update first sentence to "Eudaimonia — human flourishing is the point."

## Phase 11: Ancient Wisdom & Cross-Discipline Integration
- [x] Home Chapter I: Aristotle's akrasia, Tao Te Ching quote, eudaimonia
- [x] Home Chapter II: Meister Eckhart, Rumi quotes; attribution on belief cards (Aristotle, Havel)
- [x] Home Chapter III: Phronesis, kenosis, beginner's mind — cross-discipline origins
- [x] Home Chapter IV Lore: "Ancient wisdom recovered · Cross-discipline secrets uncovered"
- [x] Home Chapter V Vision: Cosmopolis, shalom, ikigai; kenosis reference on Rebel Oath
- [x] Home Chapter VI Join: Ubuntu philosophy; Buddhist dukkha; Lao Tzu quote
- [x] About page: Skill Tree reorganized into 5 categories with Lao Tzu, Aristotle, Stoics, Desert Fathers, Rumi, Eckhart, Thurman, Buber, Havel added
- [x] Manifesto: Tao Te Ching, oikeiosis, Rilke, Ubuntu, cosmopolis/shalom woven in
- [x] StartHere: Aristotle's akrasia, eudaimonia, Rumi, phronesis/kenosis/wu wei added

## Phase 12: Modern Cross-Discipline Thinkers Integration
- [x] Home: Maté (collective trauma), Sutherland (metrics irony), Rohr (everything belongs, non-dualism, second half of life, naming the shadow), McGilchrist (hemisphere research), Boyatzis (resonant leadership)
- [x] Manifesto: Maté (institutional trauma), McGilchrist (left hemisphere tyranny), Rohr (first/second half of life, False Self), Putnam, Frankl
- [x] StartHere: McGilchrist (hemisphere drift), Maté (collective trauma), Rohr (everything belongs), Sutherland + Boyatzis in Rebel OS
- [x] About Skill Tree: Added Rory Sutherland, Paul Tillich, Nassim Taleb; renamed category to "Behavioral Science & Culture"
- [x] Balance achieved: subtitle updated to "Ancient wisdom recovered. Modern science confirmed."

## Phase 13: Slim Down Home Page Chapters I & II
- [x] Remove Tao Te Ching quote from Chapter I
- [x] Remove Rory Sutherland line from Chapter I
- [x] Remove Meister Eckhart + Richard Rohr + non-dualism sentences from Chapter II
- [x] Remove Rumi quote from Chapter II
- [x] Add "a formation crisis" to the existential line in Chapter II

## Phase 14: Home Page Copy Tweaks (Chapters III, V, Rebel Oath)
- [x] Chapter III: Change Maté sentence to "organizations keep producing traumatized leaders who reproduce traumatic systems"
- [x] Chapter V: Remove Stoics/prophets/Rohr opening lines
- [x] Chapter V: Replace ikigai ending with boss fights (loneliness epidemic, leadership crisis, climate change)
- [x] Rebel Oath: Remove kenosis reference

## Phase 15: Chapter VI — Remove Ubuntu, Add Hope as Rebellion
- [x] Remove Ubuntu sentence from Chapter VI
- [x] Rewrite closing line with "hope is an act of rebellion" framing

## Phase 16: Manifesto (The Map) — Deduplicate Against Home Page
- [x] Read and document all ideas in Home page
- [x] Read and document all ideas in Manifesto
- [x] Identify duplicates and unique-to-Manifesto ideas (see /home/ubuntu/manifesto-analysis.md)
- [x] Rewrite Manifesto: 9 chapters → 5 chapters + opening + closing. Removed all duplicate diagnosis/belief/flywheel/invitation content. Kept: oikeiosis, Rohr's two halves, Rilke, three disconnections (Rohr/Putnam/Frankl), HID, Transformed Teachers, three-step mission, unique ethos lines, Hope Is Rebellious image.

## Phase 17: Restore "SO THAT..." Outcomes List
- [x] Add the "SO THAT..." outcomes list back into the Manifesto (Chapter IV: The Path)

## Phase 18: Remove Manifesto Chapter III, Move Core Insight
- [x] Move "you cannot change behavior directly; you must first shape the environment" to Chapter I Core Belief box
- [x] Remove Chapter III (The Deeper Architecture / HID) entirely
- [x] Renumber remaining chapters (IV→III, V→IV)

## Phase 19: Manifesto Narrator Box Update
- [x] Change Narrator dialogue box to "We don't teach leadership..." line

## Phase 20: Rewrite Manifesto Chapter II — Three Disconnections as Causal Chain
- [x] Self: Maté authenticity vs attachment, Industrial Revolution, False Self, "most deformed get promoted"
- [x] Others: Bowling Alone stats, civic institutions collapsed, unmet need flooded into workplace
- [x] Purpose: Ontology before Why, how purpose is practiced reveals beliefs, wrong container = wrong Why
- [x] Connected as causal chain: "a single fracture... each break causing the next"

## Phase 21: Manifesto Chapter I — Core Belief Box Rewrite
- [x] Replace Core Belief box with "redefine leadership as relational infrastructure that forms humans" line

## Phase 22: Manifesto Tweaks — Transaction/Transformation + YOUR MISSION Rewrite
- [x] Change "transaction, not formation" to "transaction, not transformation" in Chapter II
- [x] Rewrite YOUR MISSION dialogue box with new 3-step content (Notice/Reclaim/Tend)

## Phase 23: Manifesto Chapter IV — Ethos Rewrite
- [x] Rewrite ethos quotes with new 4-line format (quote + parenthetical explanation)

## Phase 24: Build Out The Shelf Page
- [x] Read current Shelf.tsx to understand existing structure
- [x] Populate with all books from user's list, organized into 7 categories (60+ books)
- [x] Add "Start Here" section with 5 essential reads (McGilchrist, Rohr, Frankl, Maté, Buber)
- [x] Add placeholder "Voices" section for Substackers / bloggers
- [x] Category tab navigation with RPG visual style, ★ START HERE badges

## Phase 25: Replace Bottom Image on Start Here / New Player Page
- [x] Replace bottom-of-page photo with the same image used at the top of the page

## Phase 26: Rewrite New Player Page as 30-Second Orientation
- [x] Read current StartHere.tsx and identify duplicates with Home page
- [x] Rewrite as tight orientation: What is this? Is this for me? What do I do?
- [x] Remove all content that duplicates Home page (Great Transfer, akrasia, Rebel OS details, Maps/Mirrors/Moves all removed)
- [x] Keep it under 30 seconds of reading (262 lines → 190 lines, ~60% less text)
- [x] Choose-your-path section with descriptions for future gamification hook

## Phase 27: Add Younger Audience Line to New Player
- [x] Add resonance line for younger people who find "leadership" cringe

## Phase 28: Manifesto Opening Cleanup
- [x] Remove meta-reference to Home page from Manifesto opening paragraph

## Phase 29: Gamification Layer — Phase 1
- [x] Build XP engine context (React context + localStorage persistence)
- [x] Define XP rewards: page visits (5 XP each), scroll completion (10 XP for long pages), Easter eggs (reserved, 15% of total)
- [x] Build pixel-art HUD component (XP bar bottom-right, time counter, minimizable)
- [x] Build achievement toast system (pixel-art pop-ups for milestones)
- [x] Define achievements: first visit each page, scroll-complete Home, scroll-complete Map, subscribe, total XP milestones
- [x] Integrate page-visit tracking into all 9 major pages
- [x] Integrate scroll-completion tracking into Home, Map, and About pages
- [x] Add time-played counter (localStorage, updates every minute)
- [x] Ensure XP bar can't reach 100% without Easter eggs (cap at ~85%)
- [x] Wire HUD + GameProvider into App.tsx so it's always visible
- [x] Test all XP awards and achievement triggers (9/9 existing tests passing, gamification is client-side only)

## Phase 30: HUD Minimize Button Visibility
- [x] Make the HUD minimize/expand button more obvious and clickable (larger hit area, ▾ icon, hover border/bg)

## Phase 31: Scroll-Driven Side-Scroller (The Map Page)
### Sprite Assets
- [x] Generate Nic running sprite (4-frame animation, lightsaber)
- [x] Generate Quick Meeting goomba enemy sprite
- [x] Generate Slack Ping bat enemy sprite
- [x] Generate Policy Turtle enemy sprite
- [x] Generate Buzzword Brick block sprites
- [x] Generate 4 background tilesets (corporate, crumbling, growth, summit)
- [x] Generate ground/platform tiles

### Canvas Engine
- [x] Build scroll-driven Canvas renderer component
- [x] Implement parallax background scrolling (2-3 layers)
- [x] Implement sprite animation system (frame cycling)
- [x] Implement Nic auto-movement tied to scroll position
- [x] Implement auto-jump over enemies
- [x] Implement block smashing with rebel word pop-outs
- [x] Add top-edge fade transparency (but Nic stays opaque on high jumps)

### Level Design
- [x] Zone 1 (0-25%): Corporate landscape with goombas and buzzword bricks
- [x] Zone 2 (25-50%): Crumbling world with bats and turtles
- [x] Zone 3 (50-75%): Green growth, fewer enemies
- [x] Zone 4 (75-100%): Golden summit, victory run

### Integration
- [x] Mount as fixed overlay on Manifesto page bottom
- [x] Add toggle button to show/hide
- [x] Connect to XP system (completion = achievement)
- [x] Hide on mobile (< 768px)
- [x] Performance: requestAnimationFrame with scroll throttling

## Phase 32: Easter Eggs (5 Hidden Secrets for 100% XP)
- [x] Easter Egg 1: Triple-click Rebel Logo on Home page (Proust quote)
- [x] Easter Egg 2: Click X on Manifesto hero (Tolkien quote)
- [x] Easter Egg 3: Hover on Tolkien entry in About Skill Tree (LOTR poem)
- [x] Easter Egg 4: Click ??? book on Shelf hero (GRRM quote)
- [x] Easter Egg 5: Konami code on New Player page (gamer wisdom)
- [x] Each egg reveals a quote/commentary and awards 7 XP via trackEasterEgg()
- [x] Visual feedback: pixel-art reveal animation when found

## Phase 33: Achievements Panel
- [x] Build expandable achievements panel showing all 14 achievements
- [x] Show locked (grayed out) vs unlocked (gold) states
- [x] Add descriptions for each achievement
- [x] Accessible from HUD via click on achievements count (→ arrow)

## Phase 34: Fix Side-Scroller Jump/Entity Alignment
- [x] Fix Nic's jumps to properly correspond to enemy and brick positions (scroll-driven arc)
- [x] Ensure Nic jumps OVER enemies and hits bricks from below at the right time
- [x] Verify visual alignment across all 4 zones (all entities trigger jumps correctly)
- [x] Fix entity spacing to minimum 80+ art-px gaps between all entities

## Phase 35: Rebuild ManifestoRunner as Hardcoded Scroll Animation
- [ ] Analyze Manifesto page scroll length and map content to scroll percentages
- [ ] Design full choreography timeline (every jump, kill, smash at exact scroll %)
- [ ] Rewrite ManifestoRunner as timeline-driven animation (no reactive game logic)
- [ ] Nic moves across screen left-to-right as progress increases
- [ ] Make all labels, enemy names, and rebel words large and clearly readable
- [ ] Choreograph special moments (dramatic pauses, zone transitions, victory sequence)
- [ ] Taller canvas strip for better visibility
- [ ] Test full scroll range in browser
- [ ] Polish and save checkpoint

## Phase 36: Cinematic Intro & Fun Animations
- [x] Game strip hidden on page load, fades in when user starts scrolling (~1.5% scroll)
- [x] Nic drops in from above with easeOutBounce + landing dust puff
- [x] Enemy death pop animations (squish flat + particle burst + "+1" score flash)
- [x] Brick smash particle burst with rebel word floating up with glow
- [x] Victory celebration at the end (gold/white/cyan sparkles rising)
- [x] Zone transition effects (white flash at 25%, 50%, 75%)
- [x] Bricks bob subtly with real-time sine wave
- [x] Flag waves at summit
- [x] Smooth overall feel — every moment is a little treat

## Phase 37: Reworked Cinematic Intro
- [x] Nothing visible on page load (no buildings, no enemies, no ground — just dark void)
- [x] Phase 1 (0.5-1.2%): Dark void canvas fades in
- [x] Phase 2 (1.2-2.5%): Nic drops through the void with easeOutBounce
- [x] Phase 3 (2.3-4%): World materializes when Nic lands (white pulse flash)
- [x] Enemies, blocks, ground, buildings all tied to worldT opacity
- [x] Cinematic story: the game world is born from the reader's attention

## Phase 38: Fix Game Strip Visibility on Page Load
- [x] Game strip container div completely hidden at scroll 0 (opacity:0, translateY:100%)
- [x] CSS opacity + translateY on container div driven by scroll-state React state
- [x] Nothing visible until user starts scrolling — verified at scroll 0
- [x] Toggle button (HIDE/SHOW GAME) separated from container, always accessible

## Phase 39: World Materializes Only After Nic Lands
- [x] Everything invisible until Nic's first bounce lands (WORLD_FADE_START = 0.025 = NIC_DROP_END)
- [x] World (city, ground, enemies, bricks) melts into view only after landing
- [x] Nic drops through pure darkness (#0a0a0a), no hints of world until touchdown
- [x] Longer world fade (0.025-0.045) for dramatic reveal

## Phase 40: Gather-Quality Sprite Upgrade
- [x] Generate Nic sprite sheets (run 4-frame, jump 3-frame, idle 2-frame) with dark hair, green shirt, lightsaber
- [x] Generate enemy sprite sheets (Quick Meeting goomba 2-frame, Slack Ping bat 2-frame, Policy Turtle 2-frame)
- [x] Generate brick and flag sprites
- [x] Process all sprites: extract frames, remove backgrounds, create transparent PNG strips
- [x] Upload 8 processed sprite strips to CDN
- [x] Rebuild ManifestoRunner to render sprite sheet images instead of fillRect shapes
- [x] Increase game strip height to 200px for better visibility
- [x] Maintain all cinematic features (fade-in, Nic drop, world materialize, zone transitions)
- [x] Sprite-based drawSprite() system with frame cycling from sprite sheets
- [x] All enemy types rendered from sprite sheets with animation frames

## Phase 41: CORS Fix & Full-Stack Upgrade
- [x] Fix sprite CORS issue: remove crossOrigin="anonymous" that caused 0x0 image loading
- [x] Complete web-db-user upgrade (db, server, user features)
- [x] Run pnpm db:push to sync database schema
- [x] Verify all 9 existing tests pass after upgrade

## Phase 42: Game Strip Polish — World Timing & Top Fade
- [x] Fix world materialization: pushed WORLD_FADE_START to 0.035 (gap after Nic lands at 0.025), WORLD_FADE_END to 0.065
- [x] Top of game strip fades to transparent via CSS mask-image (removed canvas gradient overlay, added mask-image on container div)

## Phase 43: Push Game Strip Intro Much Later
- [x] Push all intro timing constants significantly later: STRIP 3-5%, NIC_DROP 5-7%, WORLD 8-12% (was 0.5-6.5%)

## Phase 44: Fix Game Strip Timing & Positioning Bugs
- [x] Fix world materializing too early: redistributed all events after WORLD_FADE_END (12%)
- [x] Fix double landing glitch: events now start at 15% (well after intro completes at 12%)
- [x] Fix Nic not moving forward: auto-calculate worldX from approachPct via makeEvent helper
- [x] Ensure camera follows Nic and events trigger relative to his actual position
- [x] Ensure box hit (+1) only shows when Nic is actually near the box

## Phase 45: Nudge Nic Position Back
- [x] Increased event worldX offset from +30 to +55 to account for Nic's forward movement during jump arc

## Phase 46: Offset Bump + Flag Celebration
- [x] Bumped event worldX offset from +70 to +85
- [x] Enhanced flag celebration: "REBELLION COMPLETE" banner with golden glow, bigger sparkles (50 particles), Nic stops and goes idle at flag

## Phase 47: Offset +95 & Taller Strip
- [x] Bumped event worldX offset from +85 to +95
- [x] Increased game strip height from 200px to 240px (GROUND_Y adjusted to 212)

## Phase 48: Offset +105 & Idle After Landing
- [x] Bumped event worldX offset from +95 to +105
- [x] Nic now stands idle after landing until world is fully materialized and scrolling begins (introComplete check)
- [x] Dust cloud from landing remains visible during idle phase

## Phase 49: Position-Based Collision System (Inverse-Function Approach)
- [x] Replace fixed scroll-percentage + offset event triggers with inverse-function collision system
- [x] Enemies placed at fixed worldX positions; scroll percentages derived via worldXToScrollPct()
- [x] peakAt = atEnemyPct exactly (0.0px error, math-guaranteed)
- [x] Symmetric jump timing (JUMP_HALF = 0.009) so peak is at exact midpoint of arc (sin(0.5*PI) = 1.0)
- [x] Eliminated the need for manual offset adjustments (+30, +55, +70, +85, +95, +105, +110, +115 all removed)
- [x] Verified alignment across all 4 zones in browser
- [x] All 9 tests passing
- [x] Keep sprite sizes at 64/48/32/64 (the larger sizes user likes)

## Phase 50: Fix Nic's Visual Position Relative to Enemies
- [x] Added LEAD_PX = 36 constant: Nic peaks 36 world-pixels BEFORE the enemy
- [x] At peak, Nic's sword tip reaches the enemy's left edge (4px gap, consistent across all zones)
- [x] Eliminated 32px overlap that caused Nic to phase through enemies
- [x] Verified alignment in Zone 1 (goombas), Zone 2 (bats/turtles), Zone 3, and end-game flag
- [x] All 9 tests passing

## Phase 51: Fix End-Game Flag Behavior
- [x] Nic keeps running animation all the way to the flag (reachedFlag now based on worldX >= FLAG_STOP_X)
- [x] Nic stops IN FRONT of the flag (FLAG_STOP_X = FLAG_X - 48px, clamped draw position)

## Phase 52: End-Game Victory Celebration
- [x] Move Nic closer to the flag (FLAG_STOP_X = FLAG_X - 8, only 8px gap now)
- [x] Add sword-raise victory pose (jump sprite frame 1 with subtle bob animation)
- [x] Replace sparkles with proper confetti (60 colored rectangles falling from top with sway + rotation)
- [x] Banner and confetti both trigger at reachedFlag (no more hardcoded 0.93 threshold)
- [x] All 9 tests passing

## Phase 53: Victory Sprite, Confetti Burst, Enemy Flip
- [x] Generated front-facing victory sprite (2-frame, Nic facing camera, sword raised)
- [x] Integrated nicVictory sprite sheet into drawNicSprite (used when reachedFlag)
- [x] Confetti burst: 80 pieces release at once from top, fall with sway/rotation, fade at bottom
- [x] Flipped all enemy sprites horizontally via ctx.translate + ctx.scale(-1,1) — face LEFT toward Nic
- [x] All 9 tests passing

## Phase 54: Sprite Fixes, Screen-Shake, Scroll Arrow
- [x] Regenerated victory sprite scaled 1.6x (24px char → 38px, matching other Nic sprites)
- [x] Regenerated turtle sprite with filing cabinet shell + hard hat; fixed frame 2 flip
- [x] Added subtle screen-shake (2-4px random offset for 0.15s) triggered on enemy/block death
- [x] Added "▼ SCROLL TO BEGIN ▼" pulsing arrow on Manifesto page (matches Home page style)
- [x] All 9 tests passing

## Phase 55: Fix Turtle Glitch and Victory Nic Size
- [x] Fixed turtle animation: uses static frame 0 only (no more flip/glitch alternation)
- [x] Fixed victory Nic: uses existing jump sprite frame 1 (sword raised) — same art style and size as running Nic
- [x] All 9 tests passing

## Phase 56: Fix Turtle Direction and Victory Sprite Size
- [x] Flip turtles to face LEFT toward Nic (removed special case that skipped flip; turtles now use same ctx.scale(-1,1) as goombas/bats)
- [x] Increased victory Nic sprite from 1.25x (80px) to 1.5x (96px) for better visual weight matching with running Nic
- [x] All 9 tests passing

## Phase 57: Fix Victory Nic Proportions (Stretched/Too Big)
- [x] Analyzed sprite dimensions: both victory and running sprites are 64x64 frames, but victory character is 38px wide vs running's 42-54px
- [x] Removed the 1.5x scale multiplier that was causing horizontal stretching/bloating
- [x] Victory Nic now renders at exactly NIC_SIZE (64x64) — same as running Nic, no distortion
- [x] All 9 tests passing

## Phase 58: Victory Nic Height Tweak
- [x] Increased victory Nic render height to 1.15x (73.6px) while keeping width at 64px — taller without horizontal stretch

## Phase 59: Generate New Victory Sprite to Match Running Nic
- [x] Studied running sprite art style — dark green shirt, grey pants, brown boots, dark hair with silver streak, beard, cyan lightsaber
- [x] Generated new front-facing victory sprite with diagonal sword pose for better proportions at 64x64
- [x] Processed into 128x64 sprite sheet (2 frames of 64x64, character fills 40x60px)
- [x] Uploaded to CDN and replaced sprite URL in ManifestoRunner.tsx
- [x] Removed all scaling — renders at NIC_SIZE (64x64) with no adjustments
- [x] Visual test confirms match, all 9 tests passing

## Phase 60: Victory Sprite Size Bump
- [x] Increased victory Nic render size uniformly to 1.15x (both width and height) so it reads slightly larger to the eye

## Phase 61: Fix Turtles Direction + Dust Particles
- [x] Fixed turtles: turtle sprite naturally faces LEFT, so removed the horizontal flip for turtles only (goombas/bats still flipped)
- [x] Added subtle dust-puff particles on enemy stomps: 5 small warm-colored circles at 30% max opacity, expanding outward and fading quickly
