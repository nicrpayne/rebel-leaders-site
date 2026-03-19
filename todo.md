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

## Phase 62: Relocate HIDE GAME Button
- [x] Moved HIDE/SHOW button to bottom-left, 7px pixel font at 30% opacity, completely independent of HUD state

## Phase 63: Polish Pass — Confetti, HUD, Tooltips, Dust
- [x] More confetti: 140+60 pieces in two waves (up from 80), bigger particles, more colors, secondary delayed burst
- [x] HUD auto-minimized: always starts collapsed (small XP icon), user can expand manually
- [x] Tooltips added: HIDE/SHOW button, XP minimized icon, XP bar, PAGES, SECRETS, TIME IN THE REBELLION, achievements
- [x] SNES-style dust puffs: 9 particles (up from 5), 65% opacity (up from 30%), wider spread, two-tone coloring, ground dust line

## Phase 64: Game Strip Label List + Animated Flag Wave
- [x] Generated ordered list of all 21 game strip elements (enemies, blocks) across 4 zones for user review
- [x] Implemented SNES-style animated flag wave: 16-slice vertical distortion with sine wave, amplitude increases toward flag edge, runs on realTimeRef for continuous animation

## Phase 65: Hide Footer + Clean Up Victory Bann- [x] Footer hidden on Manifesto page when game is visible; reappears when game is hidden via HIDE button
- [x] Victory banner cleaned up: opaque dark bg (rgba 10,18,10,0.95), tighter 48px height, positioned at top 15% of canvas, thinner 1.5px gold border, slightly smaller textove Nic/flag

## Phase 66: Fix Footer Hiding Approach
- [x] Changed from conditional rendering ({!hideFooter && <Footer />}) to visibility:hidden wrapper so footer still takes up space and page scrolls fully, but content is invisible when game is active

## Phase 67: Fix Inconsistent Nic Sprite Sizes
- [x] Analyzed all Nic sprite states: measured exact bounding boxes (run avg 50px, idle avg 37px, jump avg 48px, victory 40px within 64x64 frames)
- [x] Applied per-state scale factors: idle 1.35x, jump 1.10x, victory 1.25x, running 1.0x (reference)
- [x] Verified visual consistency across all animation states in browser
- [x] All 9 tests passing

## Phase 68: Adjust Nic Sprite Scaling Per User Feedback
- [x] Reduce idle Nic scale by 15% (from 1.35x to ~1.17x)
- [x] Increase jumping Nic scale by 15% (from 1.10x to ~1.27x)
- [x] All 9 tests passing

## Phase 69: Fix Sprite Scaling — Jumping Too Big, Need to Understand States
- [ ] Jumping Nic (mid-air, sword overhead) is too big at 1.27x — reduce
- [ ] User wants the mid-air sprite slightly larger but 1.27x overshoots
- [ ] Verify which sprite state is active during landing-on-enemy vs mid-air

## Phase 70: Fix Nic Transparency/Flashing on Scroll
- [x] Found root cause: Nic sprite PNGs have 61-79% semi-transparent pixels vs enemies at 3-32%
- [x] Processed all 4 Nic sprites: alpha > 40 → fully opaque, edges softly boosted
- [x] Uploaded fixed sprites to CDN and swapped URLs
- [x] Reverted CSS mask back to original 40% gradient per user request
- [x] Kept nicAlpha clamp for intro sequence

## Phase 71: Fix Nic Drawn Behind Background / Color Washout
- [x] Root cause: fractional pixel sampling — non-integer frameW from naturalWidth/frameCount causes drawImage to blend adjacent transparent pixels
- [x] Fix 1: Math.floor on frameW in loadSpriteSheet
- [x] Fix 2: Math.round on all destination coords (dx, dy, dw, dh) in drawSprite
- [x] Fix 3: imageSmoothingEnabled = false on every render frame and in drawSprite
- [x] These fixes prevent subpixel blending that was washing out Nic's colors

## Phase 72: Definitive Fix for Nic Sprite Flashing
- [x] Traced git history: flashing started at Phase 67 when per-state scale multipliers were introduced
- [x] Reverted all 3 Nic sprite URLs to originals (run, jump, idle, victory)
- [x] Reverted drawNicSprite to original clean version — no per-state scaling, only victory 1.15x
- [x] Reverted drawSprite and loadSpriteSheet to originals (no Math.floor/Math.round hacks)
- [x] Removed imageSmoothingEnabled override
- [x] All 9 tests passing

## Phase 73: Canvas State Reset + Alpha Hardening (Diagnostic Fixes)
- [x] Fix #1: Hard-reset canvas state (globalAlpha, globalCompositeOperation, filter, imageSmoothingEnabled) at top of every render frame
- [x] Fix #2: Force Nic alpha to exactly 1 after intro completes (eliminate floating-point near-1 values)
- [x] Fix #3: Wrap every glow/shadow effect in save/restore to prevent state leaking into Nic draw

## Phase 74: Sprite Alpha Fix (Root Cause Found)
- [x] Sprite swap diagnostic: goomba solid, Nic flashing → confirmed PNG alpha issue
- [x] Analyzed alpha channels: Nic 21-38% opaque vs goomba 68% opaque
- [x] Fixed all 4 Nic sprites: alpha >= 40 → 255, alpha 10-39 → 230
- [x] Uploaded fixed sprites to CDN and swapped URLs
- [x] Removed diagnostic goomba code

## Phase 75: Chat's Diagnostic Tests for Nic Transparency
- [x] Test A: Snap Nic coords to integers + snap drawSprite destination coords to integers
- [x] Test B: Disable lightsaber glow (shadowBlur) entirely
- [x] Test C: Remove CSS mask-image if A+B don't fix it

## Phase 76: Fractional Frame Slicing Fix
- [x] Fix frameW to integer via Math.floor in sprite loader
- [x] Fix drawSprite source rects to integers (sx, sw, sh)
- [x] Lock Nic to frame 0 as diagnostic test
- [x] Log naturalWidth/frameCount for all Nic sheets

## Phase 77: User-Provided Clean Sprites (Final Fix)
- [x] Used pre-processed fixed sprites with boosted alpha (81-89% high-alpha, matching goomba's 82%)
- [x] Sprites already in correct format: idle 128x64, run 256x64, jump 192x64, victory 128x64
- [x] Uploaded all 4 fixed sprite sheets to CDN (verified PNG format with RGBA preserved)
- [x] Swapped all 4 Nic sprite URLs in ManifestoRunner.tsx
- [x] Restored lightsaber glow aura (was disabled for diagnostic)
- [x] CSS mask-image already present (40% gradient)
- [x] Kept defense-in-depth fixes: Math.floor frameW, Math.round dest coords, imageSmoothingEnabled=false, canvas state reset
- [x] Removed diagnostic console.log/warn statements from sprite loader
- [x] All 9 tests passing
- [x] Nic renders solid and opaque in browser — victory pose clearly visible

## Phase 78: Replace Nic with User's Actual Google Drive Sprites
- [x] Download the 4 Google Drive files (the user's NEW character art, not old AI sprites)
- [x] Identify what each file contains: file1=idle(2 frames), file2=jump(3 frames), file3=run(4 frames), file4=victory(1 frame)
- [x] Process into proper horizontal sprite sheets: idle 72x64, run 208x64, jump 168x64, victory 84x64
- [x] Upload to CDN (4/4 success) and swap all 4 URLs in ManifestoRunner.tsx
- [x] Verify Nic uses the new art in browser (confirmed new art visible in all states including victory)
- [x] Tests passing (9/9), checkpoint saved

## Phase 79: Victory Sprite Swap + Frame Size Normalization
- [x] Download new victory sprite from Google Drive (sword-in-air pose)
- [x] Measure all source frames at original pixel scale to find Nic's "true" body height
- [x] Normalize all sprite sheets so Nic's body is the same height across all states
- [x] Upload normalized sheets to CDN and swap URLs
- [x] Test and checkpoint

## Phase 79b: Manual Sprite Size Tuning
- [x] Idle: tuned to 105% width / 110% height + render multiplier 1.10
- [x] Run: render multiplier 0.94 (6% smaller)
- [x] Jump: frames 0-1 render multiplier 1.20, frame 2 (stomp) 1.0
- [x] Victory: render multiplier 1.70
- [x] Upload final tuned sprites and swap URLs
- [x] Test — all sprites look correctly sized

## Phase 80: Generate Matching Victory Sprite
- [x] Analyzed proportions of existing sprites (semi-realistic, not chibi)
- [x] Generated front-facing victory pose (sword raised) matching existing art style
- [x] Processed, uploaded, and swapped in ManifestoRunner.tsx
- [x] Victory sprite looks great — user confirmed "perfect"

## Phase 81: Checkpoint, GitHub Sync & Publish Fix
- [x] Save checkpoint with all sprite tuning changes (version 58e7534e)
- [ ] Push to GitHub
- [ ] Diagnose why published version shows older content

## Phase 82: Landing Dust & Lightsaber Trail
- [x] Add landing dust particles when Nic lands from any jump (4 particles, 0.25s duration)
- [x] Reduce dust to 1-2 particles when enemy death particles are also active
- [x] Add subtle lightsaber trail effect during movement (4 ghost positions, 0.07 opacity, screen blend)
- [x] Test and checkpoint — all 9 tests passing, no regressions

## Phase 83: Game Strip Label Rework — Tone Alignment
- [x] Review Manifesto themes and current game strip labels
- [x] Brainstorm cohesive naming system for enemies, blocks, and rebel words
- [x] Recommend direction that matches Manifesto's philosophical voice (not corporate satire)
- [x] Get user approval on direction before implementing
- [x] Swap all enemy labels to mythic-philosophical inner states (Perform, Comply, Prove, Control, Cynicism, etc.)
- [x] Swap all block labels to system buzzwords (OPTIMIZE, ALIGN, SCALE, LEVERAGE, DISRUPT, METRICS, BRAND)
- [x] Swap all rebel words to Manifesto recovery vocabulary (PRESENCE, TRUTH, REPAIR, BELONGING, AGENCY, MEANING, WHOLENESS)
- [x] Verify all labels render correctly in browser
- [x] Run tests and checkpoint — all 9 tests passing

## Phase 84: Victory Banner Text
- [x] Change "REBELLION COMPLETE" to "TUTORIAL COMPLETE"

## Phase 85: Fix Green Badge Text Contrast
- [x] Find all green badge/level boxes with hard-to-read text (LVL badges on Home, etc.)
- [x] Improve text contrast: changed text-forest-light to text-gold, added border-gold/30 for definition
- [x] Verify fixes across all pages where badges appear — all 9 tests passing

## Phase 86: Standalone Game Page + Arthur Brooks
- [x] Build hidden /game-standalone route with full-screen ManifestoRunner
- [x] Add auto-scroll with Play/Pause/Reset controls, countdown, and speed selector (0.5x-2x)
- [x] Hide ManifestoRunner toggle button in standalone mode
- [x] Register /game-standalone route in App.tsx (not in navigation)
- [x] Add Arthur Brooks to Behavioral Science & Culture section on About page
- [x] All 9 tests passing, verified in browser

## Phase 87: Smart HUD Open/Close Behavior
- [x] Default HUD to expanded for first-time visitors (no previous visit in localStorage)
- [x] Auto-minimize HUD on Map page (restore previous state when leaving)
- [x] Returning visitors: HUD starts minimized (they already know it exists)
- [x] Respect manual toggle state across page navigations
- [x] All 9 tests passing, code logic verified

## Phase 88: Fix YouTube Video Loading on Archives Page
- [x] Diagnosed root cause: YouTube RSS feed blocked from production server IP
- [x] Replaced RSS-based fetching with Manus Data API (Youtube/get_channel_videos)
- [x] Shorts now auto-detected via "shorts_latest" filter (no more hardcoded IDs)
- [x] All 12 tests passing (8 YouTube Data API + 3 Substack RSS + 1 auth), verified in browser

## Phase 89: Hidden Assets Gallery Page
- [x] Scanned all CDN image URLs from codebase (21 assets found)
- [x] Built /hidden-assets page with thumbnail grid, search, category filters, and full-quality download links
- [x] Registered route in App.tsx (hidden from navigation)
- [x] Tested — all 21 assets render, download/copy/open-in-tab buttons work, mobile action row visible
- [x] All 12 tests passing, checkpoint saved

## Phase 90: Integrate Rebel OS Plugins (Gravitas + Codex) — Replace Armory with Workbench
- [x] Cloned and studied plugins repo — 20+ files, all client-side, no server/DB changes needed
- [x] Studied main site's Armory, routing, XP system, navigation structure
- [x] Presented detailed merge plan — user approved routes, nav placement, full integration approach
- [x] Executed merge — copied 20 files into workbench/ subdirs, updated all import paths and route prefixes
- [x] Built branded Workbench landing page with 8-bit desk hero, filter sidebar, 14 plugin cards
- [x] Uploaded all plugin assets to CDN (cover art, frames, textures, sounds, sticker)
- [x] Updated Navigation (Workbench after Shelf), Footer, Home page links, removed Armory
- [x] Added VT323 font to index.html for plugin UI compatibility
- [x] Wired 3 XP achievements: Toolsmith (visit Workbench), Field Operative (complete Gravitas), Protocol Officer (read Codex protocol)
- [x] Tested in browser — Workbench landing, Gravitas shell, Results + Side-Chain, Codex cabinet all working
- [x] All 12 tests passing, TypeScript compiles clean, no console errors
- [x] Checkpoint and deliver

## Phase 91: Fix broken button label images on Codex (READ, SCAN, EJECT)
- [x] Found broken /labels/label_read.png, label_scan.png, label_eject.png in CabinetDeck.tsx
- [x] Uploaded 3 label images to CDN and replaced local paths
- [x] No remaining local asset paths in workbench files

## Phase 92: Gamification inventory + README update + mobile discussion
- [x] Compiled full XP (100 max), 17 achievements, 5 easter eggs inventory
- [x] Created comprehensive README.md with full site structure, plugins, gamification, tech stack
- [x] Discussed mobile strategy — plugins stay desktop-only, landing page responsive
- [x] Checkpoint and deliver

## Phase 93: Mobile gate for plugin pages
- [x] Build reusable DesktopOnly wrapper component with branded message
- [x] Wrap Gravitas, Results, and Codex pages
- [x] Test on mobile viewport (12/12 tests pass, no build errors)
- [x] Checkpoint and deliver

## Phase 96: Tweak rotary knob tick sound — mechanical click like combination lock / turn signal
- [x] Replace playTickSound with a light, crisp mechanical click (noise burst + bandpass, 12ms)
- [x] Test and checkpoint (12/12 tests pass, zero TS errors)

## Phase 97: Add Underground plugin cover to Workbench
- [x] Upload Underground cover image to CDN
- [x] Update Workbench.tsx: rename Soil Test to Underground, update description, category (MAP), and cover image
- [x] Ensure LaaS Calibrator remains as a separate plugin
- [x] Test and checkpoint (12/12 tests pass, zero TS errors)

## Phase 98: Brighten locked plugin cards on Workbench
- [x] Reduce opacity/grayscale on locked cards with cover images (85% opacity, 15% grayscale, hover to 95%/0%)
- [x] Keep placeholder "INCOMING" cards slightly more muted (65% opacity, 30% grayscale)
- [x] Test and checkpoint (12/12 tests pass, zero TS errors)

## Phase 99: Move status badges below image and make LOCKED more visible
- [x] Remove status badge overlay from cover image area
- [x] Place status badge inline with title in card body
- [x] Make LOCKED badge more prominent (red-tinted: bg-red-900/20, text-red-400/80)
- [x] Remove redundant LOCKED text from footer
- [x] Test and checkpoint (12/12 tests pass, zero TS errors)

## Phase 100: Polish badge position and brighten Underground
- [x] Nudge badge slightly right and up (-mt-1 -mr-1)
- [x] Brighten cover-image cards further (opacity 85→95%, grayscale 15→8%, hover to 100%/0%)
- [x] Test and checkpoint (12/12 tests pass, zero TS errors)

## Phase 101: Add The Terrain cover image to Workbench
- [x] Upload Terrain cover to CDN
- [x] Update The Terrain plugin card with cover image
- [x] Test and checkpoint (12/12 tests pass, zero TS errors)

## Phase 102: Rename Calling Compass to Astrolabe and add cover image
- [x] Upload Astrolabe cover to CDN
- [x] Add Astrolabe as new MIRROR plugin ("Vocational bearing. Find true north when everything around you is spinning.")
- [x] Add cover image to the card
- [x] Test and checkpoint (12/12 tests pass, zero TS errors)
