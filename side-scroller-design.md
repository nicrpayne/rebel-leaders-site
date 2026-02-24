# Side-Scroller Design Notes

## Core Concept
Scroll-driven side-scroller at bottom ~120px of the Manifesto page. Nic runs through a level that mirrors the philosophical content. Scroll position = game position. Not playable — visual companion to reading.

## Nic's Character
- Pixel art sprite, 4-frame run animation
- Carries a lightsaber-style energy sword (glowing, pixel art)
- Auto-jumps over enemies as scroll progresses
- Jump transparency: top of game area fades, but Nic does NOT fade when jumping high — looks like he's breaking out of the game frame

## Background Tilesets (4 zones matching chapters)
Tilesets = the repeating background art that scrolls behind Nic. Like parallax layers in classic games.
1. Chapter I (Roots): Corporate gray cubicle landscape, fluorescent lights, gray sky
2. Chapter II (Disconnections): Crumbling bridges, isolated islands, storm clouds
3. Chapter III (The Path): Green growth, planted seeds sprouting, sunrise
4. Chapter IV (Ethos): Golden summit, flag planted, clear sky with stars

## Top Edge Treatment
- Top of the game strip fades to transparent (blends into page content above)
- BUT Nic's sprite does NOT get transparent when jumping high — creates illusion of jumping "out" of the game into the page

## Tone
- Playful/humorous but classy. Elegant 8-bit. Not silly/ridiculous.
- "A nod to 8-bit but very grown up. Very quality."
- 1-2 things that poke fun (e.g., "hop on a quick call")

## Enemy Types (3 for v1)
1. **Quick Meeting Goomba** — dumb, frequent, walks toward you. Variants: "Quick Sync", "Can I Grab You?", "Standup"
2. **Slack Ping Bat** — airborne, swoops down. Variants: "@here", "Urgent", "Following up"  
3. **Policy Turtle** — slow, armored. Variants: "Compliance", "Process", "Precedent"

## Blocks (smashable)
**Buzzword Bricks**: INFLUENCE, ALIGNMENT, BUY-IN, LEVERAGE, OPTIMIZE, BEST PRACTICE, SYNERGY, RESOURCES, BANDWIDTH
When smashed, they pop out rebel translations: PRESENCE, TRUTH, REPAIR, BELONGING, AGENCY, MEANING

## Fun Pokes
- "Hop on a quick call" enemy
- "Reply All" projectile
- "Please Advise" fog

## Level Structure
- Total level length maps to full page scroll (0% to 100%)
- Zone 1 (0-25%): Corporate landscape, Quick Meeting goombas, Buzzword bricks
- Zone 2 (25-50%): Crumbling world, Slack Ping bats, Policy Turtles
- Zone 3 (50-75%): Green growth, fewer enemies, planting seeds
- Zone 4 (75-100%): Golden summit, victory run, flag

## Integration
- Self-contained Canvas component
- Fixed to bottom of Manifesto page only
- Toggle button to hide/show
- Completing the run = XP achievement
- Mobile: hide on small screens (< 768px)

## Safety
- 100% isolated component
- No existing code modified except one import in Manifesto.tsx
- Canvas rendering off main DOM
- requestAnimationFrame with scroll throttling
- Checkpoint before starting
