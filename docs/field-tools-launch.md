# Field Tools preview and launch

Each $47 tool combines a Field Guide, an interactive Lab, and an exported work artifact. AI Stalemate now has an ten-page PDF and web reader built from the same chapter data, with document-style Lab outputs. Five distinct wide photographic heroes sit behind the coded UI (smiling, standing, couch, angled standing, and armchair portraits). Nic's walkthrough is the fourth part of the experience. Customer-facing copy describes the completed product; internal release checks cover media and checkout configuration.

## Routes

The hub is `/field-tools`; the free ten-question Pressure Test is `/assessment`.

Each of `ai-stalemate`, `deadline-reset`, `priority-whiplash`, `mandate-reset`, and `product-project-translator` has:

- `/field-tools/:slug`: sales page, real portrait, sample artifact, process, inclusions, FAQs.
- `/field-tools/:slug/guide`: printable Field Guide.
- `/field-tools/:slug/lab`: browser-local instrument and fictional example.
- `/field-tools/:slug/buy`: order summary and configured hosted checkout link.
- `/field-tools/:slug/access`: the Guide/Lab starting point for delivery.

## AI Stalemate

Export the Trial Card from Shared Work before running the trial. Return to record evidence and export the Evidence Record, then choose Continue, Revise, Stop, or Pause and export the Decision Brief. A full working record is also available.

Six effort stages record person-minutes for both methods. Blank means unknown, 0 means none occurred, and incomplete totals do not produce a saving claim. Quality and comparability remain separate judgments. No shared export includes private preparation.

Drafts use the existing `rl_field_lab_:slug` browser keys. Existing string values are preserved. Storage failures are shown; important work should be exported. There is no account, cloud persistence, or synchronized team editing.

## Checkout configuration

Set one HTTPS hosted checkout URL per tool on the intended Railway service:

| Tool | Environment variable |
| --- | --- |
| AI Stalemate | `FIELD_TOOL_AI_STALEMATE_CHECKOUT_URL` |
| Deadline Reset | `FIELD_TOOL_DEADLINE_RESET_CHECKOUT_URL` |
| Priority Whiplash | `FIELD_TOOL_PRIORITY_WHIPLASH_CHECKOUT_URL` |
| Mandate Reset | `FIELD_TOOL_MANDATE_RESET_CHECKOUT_URL` |
| Product / Project Translator | `FIELD_TOOL_PRODUCT_PROJECT_TRANSLATOR_CHECKOUT_URL` |

The existing launch plan prefers Lemon Squeezy. The adapter also recognizes Stripe Payment Links. An absent or invalid URL leaves purchase unavailable; the page never fabricates a successful order.

Configure the provider's receipt/delivery with the appropriate `/access` URL and guide link, and its return destination as supported. The access page does not verify a payment. Labs and guides are public in this preview, with no entitlement gate. This is the lightweight access model in the handoff, not paid access enforcement.

Before taking payment, activate the store, create and review the $47 product, configure receipt delivery and published purchase/refund terms, add its checkout URL, and complete a provider test-mode purchase through delivery. Do not describe the checkout or delivery as tested until this has happened.

## Verification for this change

- TypeScript and production build pass.
- Field Tool workflow tests cover all five sample outputs, effort completeness, zero/invalid values, transferred reviewer effort, private-output isolation, pre-trial exports, pause decisions, draft recovery, and checkout URL handling.
- The repository-wide test run has failures in unchanged legacy auth/RSS/YouTube tests (cookie count, live RSS network access, and outdated YouTube integration mocks). They are outside the Field Tool change; the full suite is not green.
- Railway preview verification is recorded in the PR once deployment completes.

Keep changes on `field-tools-launch` and PR #3. Merge to `main` only after Nic approves the preview.

## Current publication state

Nic explicitly authorized publishing code and assets to `nicrpayne/rebel-leaders-site` on October 11, 2026. Changes remain on the `field-tools-launch` preview branch; production merge still awaits review.

Rebuild the portable guide with `python3 scripts/build-ai-stalemate-guide.py` (Python/ReportLab plus Node with TypeScript stripping). Its source chapters are in `client/src/lib/ai-stalemate-guide.ts`.

## Shared vision

The Guide teaches Why, a concrete future, shared professional stakes, an invitation to co-author, and a credible next move. Private Why and future reflections stay out of exports. Only the agreed shared ambition appears in the Trial Card and Decision Brief. A concerns chapter turns common objections into questions and locally appropriate conditions, with primary-source reading links.
