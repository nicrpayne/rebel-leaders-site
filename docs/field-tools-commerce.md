# Field Tools purchase and access

## Buyer experience

AI Stalemate has two distinct paths:

- `/field-tools/ai-stalemate/pm`: PM landing page; append `/buy`, `/access`, `/guide`, or `/lab`.
- `/field-tools/ai-stalemate/lead-dev`: lead-developer landing page, with the same four endpoints.

Each has its own copy, private questions, PDF, and browser-local draft. The trial and evidence fields align across paths. One AI Stalemate purchase unlocks the tool; the path controls the reader experience, not a second charge. Sharing exported records with a colleague is the intended use. Live co-editing and cross-device draft synchronization are not included.

The AI Stalemate Lab has five stages: Private Prep, Readiness, Shared Work, Evidence, and Decision. Readiness brings together business context, the basis for cost-of-delay claims, growth opportunities, access and agent boundaries, and team capability and support. Its shareable Readiness Brief excludes private preparation. Prepare First leads directly to a PAUSE decision with prerequisites, owners, and a review date; Stop This Use leads to STOP; Use Existing Evidence opens the evidence stage. A bounded test is one possible next move. Existing drafts retain their original stage after this addition.

Both role-specific PDFs have 13 pages (cover plus 12 chapters), including business context, access design, team preparation, and a fictional preparation-first example. The example treats the sponsor's $500k-per-week estimate as unvalidated and records no measured AI productivity result. Landing-page headlines and subtitles are unchanged by these additions.

Buy -> hosted Lemon Squeezy checkout -> confirmation/receipt links to the matching `/access` page -> enter purchase email -> secure sign-in email -> click Open my Field Tool -> welcome -> Guide/PDF and Lab -> shareable outputs.

The receipt comes from Lemon Squeezy. The app sends access emails on request, avoiding duplicate welcome emails on webhook retries. Email links expire after 15 minutes and require a button click to redeem, protecting them from simple email link scanners. Sessions last 30 days. Only token hashes are stored; link redemption is serialized in a database transaction. Sign-out revokes the server session. Full refunds/fraud revoke that order's access; partial refunds retain access. Another active purchase of the same tool still grants access.

## Required service configuration

Never put credentials into client/VITE variables or repository files.

- `DATABASE_URL`: MySQL connection. Startup applies migration `0005_field_tool_commerce.sql`.
- `APP_URL`: this service's HTTPS public origin; access email links are built from it.
- `RESEND_API_KEY`: transactional-email account with a verified sender.
- `FIELD_TOOL_EMAIL_FROM`: verified sender, e.g. Rebel Leaders <hello@rebel-leader.com>.
- `LEMONSQUEEZY_STORE_ID`: expected store ID.
- `LEMONSQUEEZY_MODE`: `test` or `live`. Use separate databases/services for each mode.
- `LEMONSQUEEZY_WEBHOOK_SECRET`: random shared signing secret entered in the provider dashboard.
- `LEMONSQUEEZY_VARIANT_MAP`: JSON map from provider variant IDs to tool slugs, e.g. `{"123456":"ai-stalemate"}`. Do not use that example ID in a real configuration.
- `FIELD_TOOL_AI_STALEMATE_CHECKOUT_URL`: hosted checkout URL. Optional per-path overrides: `FIELD_TOOL_AI_STALEMATE_PM_CHECKOUT_URL`, `FIELD_TOOL_AI_STALEMATE_LEAD_DEV_CHECKOUT_URL`.
- `FIELD_TOOL_AI_STALEMATE_WALKTHROUGH_URL`: final hosted walkthrough URL. It is revealed in authorized content. A separately hosted video needs its own privacy/access settings; this app cannot enforce permissions on an unrestricted external URL.

Other tools use the existing per-tool checkout variables. The checkout button remains unavailable when required fulfilment configuration is incomplete. This is a one-tool-per-order integration using the first order item; bundles/cart fulfilment need a separate implementation before selling them.

## Lemon Squeezy dashboard setup

1. Activate the store, complete business/identity verification, and connect payouts.
2. Create AI Stalemate as a $47 one-time product in test mode. Record store and variant IDs. Configure tax presentation and customer-facing refund/support terms.
3. Set confirmation and receipt button text to Open your Field Tool and the URL to the intended path's `/access` page. Use separate checkout settings/links for path-specific destinations if desired. The generic default can point to the PM access page; it does not restrict the buyer from the lead-developer path.
4. Create a webhook at `APP_URL/api/field-tools/lemon-webhook` for `order_created` and `order_refunded`, using the configured signing secret.
5. Test payment, receipt, access email, login, PDF, Lab, return visits, and full/partial refunds in the test service. Duplicate or delayed webhook delivery must not restore refunded access.
6. Copy the product into live mode and configure live IDs/URLs/secrets on the production service. Disable preview. Repeat the full journey with a genuine live purchase/refund before launch.

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
