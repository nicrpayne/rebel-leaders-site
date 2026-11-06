# Field Tools preview and launch

## 4–5 November 2026 — buyer welcome and release preparation

- Welcome pages now describe both Lab paths, retain Nic’s smiling “Glad you’re here” portrait, and offer Open my Lab plus Read the Guide with more space around the actions.
- Sign-in, access emails, gift notifications, purchase confirmations and receipt notes use the same warm, personal voice. Both Resend messages explicitly direct replies to hello@rebel-leader.com. The email layout keeps the transparent wordmark and live heading that Nic approved.
- Saved and reloaded the live hidden PM (1499373) and Lead Developer (1499367) confirmation/receipt settings in Lemon Squeezy. Both buttons point to their edition’s canonical tools.rebel-leader.com welcome page. Prices and storefront visibility were not changed.
- Rebuilt both 21-page AI PDFs with canonical customer links and removed the Working Edition cover label. All 42 pages were rendered and visually checked. Existing section reading estimates (1–2 minutes; 5–10 minutes for preparation notes) remain in place.
- Added a server-side private-preview gate, before content/API/static routes, with no-store and noindex responses. A private credential is stored outside Git; only its hash is configured in Railway. Buyer sites retain their existing purchase-based access.
- Removed the public domain from the obsolete October proposal service; its code, branch and service are preserved.
- Added cleanup for both rejected and thrown email-provider failures, allowing a fresh link on retry. 68 focused commerce, entitlement, gift, privacy, domain, email and preview-boundary checks pass; TypeScript and the production build pass.
- Deployment and actual-provider follow-up results are recorded separately below. Tax completion, separate-device confirmation and the support reply check remain Nic’s checks. Public launch/merge approval is still separate.

### Deployed and verified — 5 November

Application commit `e67836e` is deployed to the customer/reviewer, isolated checkout-test and private-preview services. Both customer welcome pages and canonical PDF downloads were verified; downloaded files match the reviewed PDFs byte for byte. The merged production build and 16 additional Quiet/expansion checks passed after preserving concurrent work.

The isolated email-failure exercise showed a useful retry message, then successfully delivered and redeemed a fresh access link after restoring the normal sender. Customer email configuration was unchanged. Actual test gift #4961814 (API order 9955352) verified recipient delivery/access, buyer exclusion, no duplicate gift email on paid-event replay, full-refund revocation, and continued denial after replaying the original paid payload. All three replay/refund deliveries returned 200. The actual receipt includes the new welcome note and opens the correct test edition. No real money was charged.

Anonymous preview page/API requests now return 401; Nic's private review login returns 200. The retired proposal domain returns 404. Private review credentials and screenshots are outside Git in `/Users/nicholaspayne/Documents/Codex/ai-stalemate-release-proof`. See the dated launch-checklist entry for exact test evidence and the remaining owner/device/release checks.

## 4 November 2026 — email and public analytics setup

This dated section records the current email/analytics work; the older launch and review notes below are historical, not a claim that all launch checks are complete.

- Public analytics dashboard: https://us.posthog.com/project/380901/dashboard/2305716 (requires Nic's PostHog account).
- Newsletter subscribers: https://leaderrebellion.substack.com/publish/subscribers. Substack remains the single newsletter list.
- Main-site signup placements: Home, The Map/Manifesto, Start Here, and the shared footer. They use the same official Substack embed, opened on request. Field Tools welcome pages also offer an optional signup; purchase and gift emails are not automatically enrolled or passed into the embed.
- The main site's About page and shared footer link to Field Tools. Workbench listings were not added.
- Email confirmation is required. One authorized test signup was submitted, confirmed by email, appeared as a Free subscriber, and received the new welcome email. The test alias remains subscribed. No broadcast was sent.
- Welcome subject: “Welcome to Rebel Leaders. Glad you're here.” It introduces essays, videos, occasional Field Tools notes, the Culture Problem article, and the Field Tools catalogue. Purchase access emails remain separate.

The dashboard contains public page loads, edition interest, selected button clicks, broad referral sources, viewport-size categories, and approximate active seconds per page load. Reading time is visible/active time with an idle cutoff, not exact attention. Clicks are not purchases; Lemon Squeezy is the sales source of truth. Substack is the confirmed-subscriber source of truth. These new Field Tools events start on 4 November; historical traffic is not backfilled. Blocking software and privacy preferences can reduce recorded traffic.

The Field Tools SDK is restricted to the catalogue, AI edition sales pages, and purchase pages on tools.rebel-leader.com. Private Guides, Labs, sign-in and access pages are excluded, as are preview/test hosts. It uses cookieless capture, no person profiles, no session replay or automatic field capture, canonical URLs without query strings, and an explicit property allowlist. Do Not Track and Global Privacy Control are honored. PostHog receives the raw browser user agent transiently for its cookieless hash; it is not retained as a raw event property. PostHog may derive anonymous hash/session metadata server-side.

Verification: live browser navigation generated `field_tools_page_viewed`, `field_tools_action` (example, edition, Buy), and `field_tools_engagement`. QA mode (`?analytics_test=1`) stays active across same-document navigation, and all six dashboard insights exclude `is_test=true`; the exclusion was confirmed against ingested test visits. The latest deployed Field Tools commit is d7916e3 (Railway deployment 392aed86-9a7d-4209-aabe-4cce590a1f32, SUCCESS). Main-site signup/link changes are ce2ebcd. TypeScript, production build, and targeted analytics checks passed; the final hashing fix passed TypeScript and all seven public analytics tests, followed by the successful Railway build.

Check the dashboard weekly once real visits accumulate: which edition gets interest, which example steps people use, whether Buy clicks follow, and whether mobile visitors engage differently. Avoid interpreting tiny sample sizes as a verdict on the offer. For changes, compare one meaningful revision at a time.

The main review preview contains six separately purchasable $47 Field Tools across five situations. AI Stalemate / Product Manager and AI Stalemate / Lead Developer are separate expanded editions. Deadline Reset, Priority Whiplash, Mandate Reset, and When the Team Goes Quiet complete the catalog.

## Review routes

The hub is `/field-tools`. AI editions start at `/field-tools/ai-stalemate/pm` and `/field-tools/ai-stalemate/lead-dev`. Other tools start at `/field-tools/:slug`.

Each has `/buy`, `/buy?gift=1`, `/access`, `/guide`, and `/lab`. Every product has a `/walkthrough`. AI editions also have their own `/resources` library. The unfinished shared `/field-tools/resources` pages are hidden; teaching links lead to existing published sources. The free Pressure Test is `/assessment`.

Buy pages keep the product image, purchase/gift controls, and related tools. Full product details stay on the preceding landing page. Each welcome page starts with the situation and a direct Lab action, with Guide/PDF and optional resources below.

## Expanded AI editions

Each PDF contains 21 pages, including its visual companions and source/teaching notes. The online Guide, two-path Lab, worked walkthrough, and library are included in the same edition. The Lab offers conversation preparation and a delivery map; either can be used independently. The two audiences have distinct preparation questions, framing, and guidance, with common experiment/evidence standards for working together. No outcome of adopting AI is presumed.

The Lab supports a useful next conversation, preparation, specialist input, an experiment, existing evidence, or stopping. Six effort stages record person-minutes for both methods. Blank means unknown; zero means none occurred. Incomplete totals cannot produce a saving claim. Quality and comparability remain separate judgments. Shared exports exclude private preparation. Drafts stay in the current browser; signing in elsewhere does not sync them.

## Checkout and access

See `field-tools-commerce.md` for exact service setup, receipt routes, gifts, access links, refunds, and validation limits. Two AI variant mappings and checkout URLs are required. New purchases unlock their own edition only; historical purchases sold with both retain both. The review preview requires Nic's private review login, then exposes draft content with a banner and cannot accept payment. Customer/reviewer and checkout-test sites enforce purchase access.

Use Lemon Squeezy test mode and test cards to verify the complete purchase/delivery/refund journey. Database, payment-provider, and email-provider mocks do not establish that actual delivery works. Published purchase/refund terms, final walkthrough links, and account configuration remain launch tasks.

## Verification and publication

See `field-tools-editions-responsive.md` for the current responsive matrix, PDF checks, and the 106 passing Field Tool tests. TypeScript and production build pass. The full legacy repository suite is not claimed green; unrelated auth/RSS/YouTube failures were recorded in earlier reviews.

Nic authorized publishing code/assets to `nicrpayne/rebel-leaders-site` on 11 October 2026. Keep these changes on `field-tools-launch` and PR #3. The expanded proposal has now been selected and incorporated into the main review preview. Do not merge to production `main` until Nic approves.

PDF sources live in `server/field-tool-content`. Rebuild each base AI PDF with `scripts/build-ai-stalemate-guide.py pm` or `lead-dev`, then append the teaching resource pages once with `scripts/append-teaching-resources.py`. Set `GUIDE_APP_URL` to the intended deployment origin. The checked-in AI Stalemate PDFs now use https://tools.rebel-leader.com (4 November); other unfinished products remain review drafts.

When the Team Goes Quiet replaces the unpublished Translator concept. It has its own slug, draft storage and checkout configuration: `FIELD_TOOL_WHEN_THE_TEAM_GOES_QUIET_CHECKOUT_URL`. Before live launch, configure its Lemon Squeezy variant under `when-the-team-goes-quiet` in `LEMONSQUEEZY_VARIANT_MAP`; do not reuse a Translator checkout link. Existing Translator page links redirect to the new product. The original draft files and PDF remain in Git history.


## 23 October AI Stalemate review

Both editions now center the willingness to explore useful tools and ways of working, shared customer/business context, craft and other concerns without assigning motives, and each teammate’s learning goals. Experiment plans include all team effort, review/pairing support, tool or token budgets, and work that waits. A worked value-per-team-hour comparison uses explicitly invented estimates and distinguishes capacity from cash savings or proven AI gains. Private review attachments informed the changes; their organizational names, workplace statements, and business figures are not published.

Both 21-page PDFs, online Guides, walkthroughs, loaded Lab examples, shared exports, and product previews are aligned. PM cover uses the existing thoughtful portrait; Lead Developer retains the laughing portrait. The PM desktop crop keeps the full head visible and moves the fade clear of the face. Results begin with value and learning, followed by the optional task-effort comparison.

Validation: TypeScript and production build pass. The 102 targeted product checks passed before final QA; the readiness suite passes all 9 checks after an additional regression check for audience-specific sample voice (103 targeted checks in total). All 42 PDF pages were rendered and visually inspected. Browser checks covered 320px, 390px, 961px, 1347px, and 1440px widths across the affected pages, with no page overflow observed. Existing large-bundle build warning remains. No production merge or real checkout test is included in this review.
