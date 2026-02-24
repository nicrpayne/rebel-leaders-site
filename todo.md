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
