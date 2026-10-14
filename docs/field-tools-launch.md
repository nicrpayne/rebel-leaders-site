# Field Tools preview and launch

The main review preview contains six separately purchasable $47 Field Tools across five situations. AI Stalemate / Product Manager and AI Stalemate / Lead Developer are separate expanded editions. Deadline Reset, Priority Whiplash, Mandate Reset, and Product / Project Translator complete the catalog.

## Review routes

The hub is `/field-tools`. AI editions start at `/field-tools/ai-stalemate/pm` and `/field-tools/ai-stalemate/lead-dev`. Other tools start at `/field-tools/:slug`.

Each has `/buy`, `/buy?gift=1`, `/access`, `/guide`, and `/lab`. AI editions also have `/walkthrough` and `/resources`. Shared Holistic Shaping resources are at `/field-tools/resources`. The free Pressure Test is `/assessment`.

Buy pages keep the product image, purchase/gift controls, and related tools. Full product details stay on the preceding landing page. Each welcome page starts with the situation and a direct Lab action, with Guide/PDF and optional resources below.

## Expanded AI editions

Each PDF contains 21 pages: cover, 12 chapters, five companion pages, and three source/teaching pages. The online Guide, five-stage Lab, worked walkthrough, and library are included in the same edition. The two audiences have distinct preparation questions, framing, and guidance, with common experiment/evidence standards for working together. No outcome of adopting AI is presumed.

The Lab supports a useful next conversation, preparation, specialist input, an experiment, existing evidence, or stopping. Six effort stages record person-minutes for both methods. Blank means unknown; zero means none occurred. Incomplete totals cannot produce a saving claim. Quality and comparability remain separate judgments. Shared exports exclude private preparation. Drafts stay in the current browser; signing in elsewhere does not sync them.

## Checkout and access

See `field-tools-commerce.md` for exact service setup, receipt routes, gifts, access links, refunds, and validation limits. Two AI variant mappings and checkout URLs are required. New purchases unlock their own edition only; historical purchases sold with both retain both. The review preview intentionally exposes content with a banner and cannot accept payment.

Use Lemon Squeezy test mode and test cards to verify the complete purchase/delivery/refund journey. Database, payment-provider, and email-provider mocks do not establish that actual delivery works. Published purchase/refund terms, final walkthrough links, and account configuration remain launch tasks.

## Verification and publication

See `field-tools-editions-responsive.md` for the current responsive matrix, PDF checks, and the 106 passing Field Tool tests. TypeScript and production build pass. The full legacy repository suite is not claimed green; unrelated auth/RSS/YouTube failures were recorded in earlier reviews.

Nic authorized publishing code/assets to `nicrpayne/rebel-leaders-site` on 11 October 2026. Keep these changes on `field-tools-launch` and PR #3. The expanded proposal has now been selected and incorporated into the main review preview. Do not merge to production `main` until Nic approves.

PDF sources live in `server/field-tool-content`. Rebuild each base AI PDF with `scripts/build-ai-stalemate-guide.py pm` or `lead-dev`, then append the teaching resource pages once with `scripts/append-teaching-resources.py`. Set `GUIDE_APP_URL` to the intended deployment origin. Checked-in review PDFs use the main preview origin.
