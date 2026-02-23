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
