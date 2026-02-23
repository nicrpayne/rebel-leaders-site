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
