# Field Tools purchase and access

## Buyer experience

Nic approved a 60-day full-refund policy on 27 October 2026, without requiring a reason or proof of use. Customer help is hello@rebel-leader.com, the existing website contact address; inbox routing/delivery still needs confirmation. Public purchase/access/refund details live at `/field-tools/purchase-help` and are linked from purchase pages, sign-in help, and the Field Tools footer.

AI Stalemate has two distinct paths:

- `/field-tools/ai-stalemate/pm`: PM landing page; append `/buy`, `/access`, `/guide`, or `/lab`.
- `/field-tools/ai-stalemate/lead-dev`: lead-developer landing page, with the same four endpoints.

Each has its own copy, private questions, PDF, and browser-local draft. The experiment and evidence fields align across paths. Each AI Stalemate edition costs $47 and unlocks only that edition. Legacy orders recorded as `ai-stalemate` continue to unlock both editions; new verified orders use `ai-stalemate/pm` or `ai-stalemate/lead-dev`. Sharing exported records with a colleague is the intended use. Live co-editing and cross-device draft synchronization are not included.

The AI Stalemate Lab has five stages: Private Prep, Readiness, Shared Work, Evidence, and Decision. Readiness brings together business context, the basis for cost-of-delay claims, growth opportunities, access and agent boundaries, and team capability and support. Its shareable Readiness Brief excludes private preparation. Prepare First leads directly to a PAUSE decision with prerequisites, owners, and a review date; Stop This Use leads to STOP; Use Existing Evidence opens the evidence stage. A bounded test is one possible next move. Existing drafts retain their original stage after this addition.

Both role-specific PDFs have 21 pages: cover, 12 chapters, five visual companion pages, and three Holistic Shaping/source pages. The expanded edition includes discussion guidance, quality evidence, communication drafts, a worked walkthrough, and a resource library. Its fictional example treats the sponsor's $500k-per-week estimate as unvalidated and records no measured AI productivity result. Each edition has its own audience framing, preparation questions, and companion introduction; shared evidence standards let colleagues compare their work.

Buy -> hosted Lemon Squeezy checkout -> confirmation/receipt links to the matching `/access` page -> enter purchase email -> secure sign-in email -> click Open my Field Tool -> welcome -> Guide/PDF and Lab -> shareable outputs.

The receipt comes from Lemon Squeezy. The app sends access emails on request, avoiding duplicate welcome emails on webhook retries. Email links expire after 15 minutes and require a button click to redeem, protecting them from simple email link scanners. Sessions last 30 days. Only token hashes are stored; link redemption is serialized in a database transaction. Sign-out revokes the server session. Full refunds/fraud revoke that order's access; partial refunds retain access. Another active purchase of the same tool still grants access.

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
