# Field Tools purchase and access

## Buyer experience

Nic approved a 60-day full-refund policy on 27 October 2026, without requiring a reason or proof of use. Customer help is hello@rebel-leader.com, the existing website contact address. Squarespace forwards it to Nic's monitored Gmail inbox; Nic confirmed a test arrived on 27 October. Customer replies and transactional access emails still require separate verification. Public purchase/access/refund details live at `/field-tools/purchase-help` and are linked from purchase pages, sign-in help, and the Field Tools footer.

AI Stalemate has two distinct paths:

- `/field-tools/ai-stalemate/pm`: PM landing page; append `/buy`, `/access`, `/guide`, or `/lab`.
- `/field-tools/ai-stalemate/lead-dev`: lead-developer landing page, with the same four endpoints.

Each has its own copy, private questions, PDF, and browser-local draft. The experiment and evidence fields align across paths. Each AI Stalemate edition costs $47 and unlocks only that edition. Legacy orders recorded as `ai-stalemate` continue to unlock both editions; new verified orders use `ai-stalemate/pm` or `ai-stalemate/lead-dev`. Sharing exported records with a colleague is the intended use. Live co-editing and cross-device draft synchronization are not included.

The AI Stalemate Lab opens with two independent paths: Prepare your conversation (`/lab/conversation`) and Find where work gets stuck (`/lab/delivery`). The conversation companion includes private preparation, a conversation draft, and optional experiment/results/decision work. The delivery map follows one change from idea to use, asks about observations and previous attempts, then helps draft a question, conversation, or small proposed change. Neither path requires completing the Guide or the other path. Existing drafts and earlier delivery tools are preserved.

Both role-specific PDFs have 21 pages, including their visual companions and Holistic Shaping/source notes. The PM example concerns a repair-request workflow; the Lead Developer example separates a restricted-data app from a proposed agentic development workflow. Both are explicitly fictional and claim no measured AI productivity result. Each edition has its own audience framing, preparation questions, and examples; shared evidence standards let colleagues compare their work. The final practical chapter now introduces both interactive Labs.

Buy -> hosted Lemon Squeezy checkout -> confirmation/receipt links to the matching `/access` page -> enter purchase email -> secure sign-in email -> edition welcome page (bookmark here) -> Guide/PDF and Lab -> shareable outputs.

The receipt comes from Lemon Squeezy. The app sends access emails on request, avoiding duplicate welcome emails on webhook retries. Email links expire after 15 minutes. The browser that requested the link can redeem it immediately. Another browser gets a sign-in button so mail scanners cannot redeem links on page load. Sessions last 30 days. Only token hashes are stored; link redemption is serialized in a database transaction. Sign-out revokes the server session. Full refunds/fraud revoke that order's access; partial refunds retain access. Another active purchase of the same tool still grants access.

## Required service configuration

Never put credentials into client/VITE variables or repository files.

- `DATABASE_URL`: MySQL connection. Startup applies the commerce and gift migrations, including `0006_field_tool_gifts.sql`.
- `APP_URL`: this service's HTTPS public origin; access email links are built from it.
- `RESEND_API_KEY`: transactional-email account with a verified sender.
- `FIELD_TOOL_EMAIL_FROM`: verified sender, e.g. Rebel Leaders <hello@rebel-leader.com>.
- `LEMONSQUEEZY_STORE_ID`: expected store ID.
- `LEMONSQUEEZY_MODE`: `test` or `live`. Use separate databases/services for each mode.
- `LEMONSQUEEZY_WEBHOOK_SECRET`: random shared signing secret entered in the provider dashboard.
- `LEMONSQUEEZY_VARIANT_MAP`: JSON map from provider variant IDs to tool slugs, e.g. `{"123456":"ai-stalemate/pm","123457":"ai-stalemate/lead-dev"}`. Do not use that example ID in a real configuration.
- `FIELD_TOOL_AI_STALEMATE_PM_CHECKOUT_URL` and `FIELD_TOOL_AI_STALEMATE_LEAD_DEV_CHECKOUT_URL`: two distinct hosted checkout URLs, each for its matching $47 edition variant. New checkout never falls back to `FIELD_TOOL_AI_STALEMATE_CHECKOUT_URL`. Keep any old variant mapping to `ai-stalemate` unchanged for refunds and legacy access.
- `FIELD_TOOL_AI_STALEMATE_WALKTHROUGH_URL`: final hosted walkthrough URL. It is revealed in authorized content. A separately hosted video needs its own privacy/access settings; this app cannot enforce permissions on an unrestricted external URL.

Other tools use the existing per-tool checkout variables. The checkout button remains unavailable when required fulfilment configuration is incomplete. This is a one-tool-per-order integration using the first order item; bundles/cart fulfilment need a separate implementation before selling them.

## Lemon Squeezy dashboard setup

1. Activate the store, complete business/identity verification, and connect payouts.
2. Create AI Stalemate / Product Manager and AI Stalemate / Lead Developer as two $47 one-time products in test mode. Record store and variant IDs. Configure tax presentation and customer-facing refund/support terms.
3. Set confirmation and receipt button text to Open your Field Tool and the URL to the intended path's `/access` page. The PM product must point to `/field-tools/ai-stalemate/pm/access`; the Lead Developer product must point to `/field-tools/ai-stalemate/lead-dev/access`. Use different variants and checkout links for the two products. Verify the configured URL charges for the same variant recorded in the entitlement map.
4. Create a webhook at `APP_URL/api/field-tools/lemon-webhook` for `order_created` and `order_refunded`, using the configured signing secret.
5. Test payment, receipt, access email, login, PDF, Lab, return visits, and full/partial refunds in the test service. Duplicate or delayed webhook delivery must not restore refunded access.
6. Copy the product into live mode and configure live IDs/URLs/secrets on the production service. Disable preview. Finish all purchase and refund testing in Lemon Squeezy test mode using its test cards. Do not use the owner’s real card to test live purchases. Only enable live checkout after test-mode delivery has passed and the published purchase/refund terms are ready.

## Review preview

`FIELD_TOOL_PREVIEW=true` exposes the paid content for review, with an explicit banner. It is ignored if `LEMONSQUEEZY_MODE=live`. Preview mode cannot enable checkout. The existing Railway preview has no database, Resend, or Lemon Squeezy account configuration. It is for product review, not payment acceptance.

## Content protection

### Optional Shipping sooner prototype — 2 November 2026

The review desk links to `/field-tools/ai-stalemate/pm/shipping-sooner` and `/field-tools/ai-stalemate/lead-dev/shipping-sooner`. Each uses the existing edition access gate. This short experiment planner and optional comparison sit alongside the existing Labs; all existing routes, drafts, Guides, PDFs, and purchase copy are preserved while Nic evaluates the package.

The starting path does not require timings: name one piece of work (or name it later), choose where it became difficult, choose a specific observed cause or “not sure,” and compare two practical experiments. Suggestions are curated and matched to the selected cause, not inferred from the longest stage or generated by a model. PM and lead developer versions explain the role each can play. Users can adapt suggested text or write their own idea, agree the scope/owner/check-in, export a proposal, and later record results and a keep/adapt/stop decision. Quality, rework, and load on people are part of the check. Missing fields remain a draft, not a fabricated agreement or result.

The suggestions are our adaptations informed by Atlassian’s 2026 State of Developer Experience report and DORA guidance on small batches, WIP limits, continuous delivery, and team experimentation. The report surveyed 1,155 individual contributors and 405 engineering leaders; its methodology (PDF page 25 / printed page 24) explicitly describes self-reported experiences and perceptions, not system telemetry or causal evidence. It informs questions about information, coordination, learning, and review load. Neither the report nor our suggestions establishes that a specific change will improve a given team. Source links are available in the tool. No private company audit details are included.

- https://www.atlassian.com/teams/software-development/state-of-developer-experience-2026
- https://dora.dev/capabilities/working-in-small-batches/
- https://dora.dev/capabilities/wip-limits/
- https://dora.dev/capabilities/continuous-delivery/
- https://dora.dev/capabilities/team-experimentation/

The optional calculator compares non-overlapping elapsed working days for one change across coding, review/testing, rework, waiting, and release. The initial illustrative example is 20 days overall with two days of coding: halving coding alone gives 19 days, a 5% reduction. Users can change any stage, including increases. Blank or invalid times do not count as zero. This is scenario arithmetic, not a delivery forecast, throughput model, or evidence of AI savings. Time outside coding is not assumed to be waste.

Each edition's own draft is browser-local under its existing `rebel-shipping-sooner-v1-{audience}` key, independent from its editable example and the existing Lab draft. The envelope is now version 3; version 1 names, timings, and scenario values migrate unchanged with an empty action plan. Version 2 plans migrate unchanged; both older versions gain an empty access request. Plans are retained by option when users explore another suggestion and switch back. Inputs are never added to URLs or sent to a service. Copy/text export includes provenance and assumptions. Mobile/tablet layouts and draft persistence were checked in the browser; targeted tests cover calculations, invalid inputs, action selection, legacy migration, draft retention, exports, and storage validation.

### AI app access request iteration — 2 November 2026 (retained as an optional tool)

This earlier iteration opened Shipping Sooner with the AI question and a concrete access-request path: “We could build it. Who can use it?” A fresh visit shows an invented, editable request immediately. Users specify the user task, whether AI writes code or runs inside the app (or both), the data source, each user group's record boundaries and proposed actions, and whether an access setup exists. Optional recipient and timing fields complete a copyable/downloadable request for the system or identity owner. Missing information remains an explicit question. The tool neither sends a message nor approves or configures access.

The request distinguishes coding-tool approval from runtime model data processing, retention, and output access. Existing setup is a route to check for fit, not evidence that the new app is approved. The invented demo uses synthetic data. The approach is informed by Microsoft's least-privileged access guidance: https://learn.microsoft.com/en-us/entra/identity-platform/secure-least-privileged-access.

The alternate path retains the cause-based experiments and optional time comparison. An access suggestion also leads to the request builder, with the earlier experiment plan still available. Edition-specific Guide and conversation Lab links explain where this tool fits. No Guide, PDF, Lab, or checkout behavior changes in this iteration.

Access requests save independently from earlier work names/plans/numbers under the same edition's browser-local key. Earlier drafts remain available in the workflow and access workspaces. The default entry now opens the delivery journey described below. Example edits do not overwrite own work. Group removal offers undo. Conditional model-processing text is retained when changing AI mode, but is exported only when relevant. TypeScript, production build, and 26 targeted tests pass; browser checks cover legacy work retention, own/example separation, request persistence, group removal/undo, conditional AI fields and permissions in copied output, text download, desktop, 390px phone, and 768px tablet layouts.

### Smaller first release — 2 November 2026 (retained as a contextual tool)

The smaller-release tool asks “What’s the smallest useful thing we could ship?” It uses a reporting dashboard example and a three-step flow: the feature/user/outcome, smaller scope, then usefulness/dependency/quality checks. Four curated prompts suggest one user group, one complete task, fewer variations, or reusing an existing component. These are thinking aids; the tool does not infer scope, assess feasibility, or call a model.

Users edit scope items and place each in first release, later, or needs checking. New items start in needs checking. Optional boundary notes persist when exploring different prompts. A live proposal reflects the choices, with copy and text download. Empty fields, failed checks, unresolved dependencies, and learning questions remain explicit. No dates, estimated savings, or approval are fabricated. Essential security, accessibility, reliability, and testing remain part of the first release.

Each edition saves its own draft under `rebel-first-release-v1-{audience}` with a v1 envelope; example edits remain separate. The existing comparison/action/access keys and formats are unchanged. Switching tools keeps the first-release component mounted, preserving in-memory work even if storage is unavailable. Scope deletion has undo. The review desk points to the same edition routes; earlier workflow experiments, calculator, and access request remain reachable. Guides, PDFs, Labs, and checkout are unchanged.

### Delivery journey — 2 November 2026

Shipping Sooner now opens a visual journey from Decide → Shape → Build → Check → Release → In use. Each stage expands into recognisable situations and specific possible explanations: 14 situations and 29 circumstances, including the work needed to understand AI output. Users can walk through without timings, jump directly to a stage, or try an explicitly fictional review-delay example. Nothing noticed, an unanswered question, and an unexplored stage remain distinct; reaching the end without identifying an issue is a valid result.

A map can retain multiple hypotheses at the same stage, with notes, an author-selected hunch/checked-example status, and possible return paths such as Check → Shape. It neither ranks bottlenecks nor infers time savings. Open questions accept the user's own circumstances. Findings can be removed and restored with Undo. Each explanation offers a check, a proportionate experiment, the people who need to agree, and observations covering delivery, quality, and workload.

Contextual draft helpers provide review agreements, decision requests, shared examples, dependency requests, release improvements, and small bets. Suggested changes and observations are editable; scope, owner, and review date start empty. Users can return to record results and a keep/adjust/stop decision. All saved plans and the map are included in copy/text export, with unknowns and evidence limits explicit. Scope-related paths also open the existing smaller-release tool. All older tools remain accessible under “Open a specific tool”; existing Guide/Lab routes and commerce controls are unchanged.

Each edition saves own work under `rebel-delivery-journey-v1-{audience}` with a version 1 envelope, separately from its editable example, first-release draft, and older calculator/action/access draft. The journey and first-release components stay mounted while switching workspaces so in-memory drafts survive tool changes even if storage fails. No answers are sent to an AI model or another service. The page continues to use the existing ownership gate and Field Tool analytics suppression.

The prompts adapt DORA's value-stream mapping guidance into plain-language starting points; they are not a validated diagnostic questionnaire. The sources remain visible in the product. https://dora.dev/guides/value-stream-management/

### Integrated AI Stalemate Lab and deeper inquiry — 2 November 2026

Both editions now enter a Lab hub at `/field-tools/ai-stalemate/{audience}/lab`. The Guide remains a separate reading path. The Lab offers the existing interactive conversation companion at `/lab/conversation` and the delivery journey at `/lab/delivery`. Neither requires finishing the other. Welcome pages and the review desk point to the hub. Existing `/shipping-sooner` links remain valid. Older Guide/PDF `/lab?step=N` links redirect to the conversation route with the same step; that route consumes the query once and resumes its saved step on refresh. Both paths retain the same edition ownership gate and analytics suppression.

The delivery hook is “We’re all busy. Why does everything still take so long?” After selecting a possible explanation, users can record a recent example, narrow the constraint, say what has already been tried and what happened, identify who can agree a change, and note whose perspective is missing. Review and rework have additional distinctions such as competing commitments, dependence on one specialist, another team's priorities, missing context, and conflicting standards. Other stages offer capacity, coordination, and disagreement prompts alongside their existing circumstances. These are curated possibilities, not inferred causes or a complete organizational assessment.

The next step can be finding one thing out, preparing a conversation, or proposing a small change. Unknown history or influence suggests further inquiry; previous attempts or shared authority suggest a conversation. Users can choose any path. Each produces an editable draft with scope, people, follow-up, and copy/text export. Previous attempts stay visible instead of disappearing behind another recommendation. Saved plans are never silently regenerated when the inquiry changes.

The existing v1 delivery storage envelope now accepts optional inquiry fields and a plan kind. Legacy drafts gain empty/unknown inquiry values and retain existing plans as change proposals; no history, ownership, or agreement is manufactured. Own/example and PM/lead-developer drafts remain separate. Existing conversation, calculator, access, and smaller-release work is retained. No PDF rebuild or commerce configuration is part of this iteration.

Validation: 68 targeted tests across inquiry, journey, older tools, analytics, privacy, edition access, and sessions; TypeScript and production build passed. Browser checks covered both hubs, canonical navigation and old step links, legacy plan retention, new question/discussion drafts, export preview, reload persistence, and 390px/768px layouts. Provider checkout and transactional email remain separate outstanding launch checks.

### Guides and Labs

Guide chapters and Lab instructions now live under `server/field-tool-content`; client code receives them only after ownership checks. Public samples and short marketing excerpts are intentionally public. The PDFs live under `private/field-tools` and are served only by an ownership-checked API route. The former public PDF URL returns 410.

PDFs are generated from the same role-specific chapter data as the web Guide:

`python3 scripts/build-ai-stalemate-guide.py pm`

`python3 scripts/build-ai-stalemate-guide.py lead-dev`

Set `GUIDE_APP_URL` to the intended deployment origin when rebuilding PDFs before production release. The checked-in review PDFs link to the preview Labs.

The remaining four tools now have ten-page PDFs and matching nine-chapter web readers. Generate all four with `python3 scripts/build-leadership-guides.py`. Their welcome pages offer direct PDF downloads and one product-specific first move. Each Lab has three exports; its final brief records recommendation, decision status, actual response, owners, and next checkpoint. Private reflection is excluded. Priority Whiplash's optional person-day check is planning arithmetic rather than a forecast. See `docs/field-tools-v1-review.md` for the buyer review and research boundaries.

## Validation limits

Automated checks cover signatures, store/variant/mode boundaries, order status mapping, anonymous content/PDF denial, the retired public PDF URL, rate limiting, and distinct role instructions. Local production HTTP checks verify preview content and private downloads. The actual provider-to-database-to-email purchase journey remains unverified until account connections are configured. Do not describe an actual purchase as tested based on protocol/unit tests.

## Gifts and welcome pages — 14 October 2026

Every product has a “Gift to someone” option at its existing `/buy?gift=1` route. The buyer gives their name, the recipient’s email (entered twice), an optional recipient name, and an optional note. The buyer uses their own email at Lemon Squeezy checkout for the receipt. Gifts are sent after confirmed payment; scheduled delivery is not included.

Gift details are saved on the server. Only a random reference is passed to Lemon Squeezy as `checkout[custom][field_tool_gift]`; recipient details and notes are not put in the checkout URL. The signed order webhook verifies the store, mode, and purchased variant, binds the reference to one matching order, and grants access to the recipient. The buyer does not gain access from that gift order. The recipient receives only the purchased AI edition. The server checks that the paid variant matches the edition stored with the gift.

The recipient gets a gift notification pointing to the normal access page, then requests a secure sign-in link with their own email. The sender receives no access to the recipient’s Lab answers. Refunds revoke the recipient’s entitlement for that order, including refund webhooks without custom metadata. Duplicate notifications are suppressed with a database marker and a stable Resend idempotency key. Failed notification sends return a retryable webhook response; review provider delivery logs for unresolved failures. Resend’s idempotency window is 24 hours, so this is not an unlimited exactly-once delivery guarantee.

All six welcome paths now use a light, warm layout, Nic’s portrait, situation-specific introductions, and one main “Open my Lab” action. Guide/PDF links remain available below. Saving, returning, sharing, and Holistic Shaping resources are explained in expandable answers. Draft storage and authentication behavior are unchanged.

Required pre-launch gift test: use test mode to buy for a different email; verify the buyer receipt, recipient notification, recipient sign-in, access to the purchased AI edition, denial of the other edition, and denial of access for the buyer unless they separately own the tool. Exercise duplicate and delayed webhooks, failed email/retry, wrong or reused gift references, full and partial refunds. Verify the migration against the configured MySQL database. Confirm receipt wording makes clear that the recipient gets the gift; the buyer’s receipt link does not grant the buyer access.

Current verification: the main preview production build and 106 tests across 11 Field Tool suites pass. Edition tests cover independent access, historical purchases, PDF denial, matching paid variants, and gift ownership. See `field-tools-editions-responsive.md` for the layout matrix. Gift tests use mocked database and email services. Browser checks cover all six welcome paths, gifts, and desktop/phone layouts. The full repository suite still has failures in unchanged legacy logout/YouTube tests. Real provider checkout, MySQL transactions, and email delivery remain unverified until the test service is configured. Both review previews keep checkout disabled.
