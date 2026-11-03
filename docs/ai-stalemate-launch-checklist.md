# AI Stalemate launch checklist

Updated 3 November 2026. Launch scope: PM and Lead Developer editions, sold separately for $47 each. Keep the approved design, portraits, and Guides.

## 1. Protect private work — Codex
- [x] Stop analytics and session replay when entering any Field Tool from another page, including Back/Forward navigation.
- [x] Mask input fields and exclude the Field Tool DOM from capture.
- [x] Test direct visits, internal navigation, event suppression, and private draft/export behavior.

## 2. Make starting easier — Codex
- [x] Show three initial prompts in each AI Lab; put deeper prompts behind an optional section.
- [x] Offer a direct path past private reflection to the conversation.
- [x] Produce useful notes from the three conversation answers without filling the export with blank optional sections.
- [x] Preserve existing answers, privacy, and proposal/agreement distinctions.
- [x] Check both editions in the desktop browser, including three-answer output and private-note exclusion.
- [x] Recheck current PM hub, conversation, and delivery map at a measured 390px viewport with no horizontal overflow (3 November). Lead Developer phone layout was checked in the preceding purchase-page review.
- [x] Publish and verify the review preview. Railway deployment 163398dd-34c8-49c5-ba81-394de3881e96 succeeded for application commit de0ee28; the deployed purchase/refund links and copy were checked. Live checkout remains disabled.

### Shipping sooner companion — 2 November 2026
- [x] Add an optional, compact comparison tool for both editions at `/shipping-sooner`, linked from the review desk. Preserve all existing Labs, drafts, Guides, and PDFs.
- [x] Compare non-overlapping elapsed working days for one change. Show coding-only savings separately from changes to waiting, review, rework, and release; allow slower scenarios too.
- [x] Keep examples separate from browser-local user drafts. Provide copy/text export with assumptions; suppress results when time is unknown or invalid.
- [x] Check calculation/export/storage tests, TypeScript, and build. Browser checks cover saved drafts, copy output, missing values, desktop, 390px phone, and 768px tablet layouts.
- [x] Extend the companion with a no-timings-required path: observed friction → relevant experiments → editable proposal with scope, owner, check-in, quality/load checks, and optional follow-up. Keep the comparison optional.
- [x] Preserve v1 timing drafts and edited plans when switching suggestions. Keep example and own-work drafts separate.
- [x] Ground practical suggestions in Atlassian 2026 and DORA, with visible sources and explicit self-report/causality limits.
- [x] Verify expanded flow on desktop, 390px phone, and 768px tablet: PM/lead guidance, no-number entry, custom plan, draft persistence, preserved earlier calculator inputs, option switching, copy/download, and follow-up. TypeScript, build, and 19 targeted tests pass.
- [x] Publish the expanded companion and verify the deployed review links. Railway deployment `9fbfd1c2-9aab-4598-9100-4c7e755eea05` succeeded for application commit `78fe27e`; the review desk and published suggestion flow were checked. Checkout remains disabled in the preview.
- [x] Iterate around the AI hook and add a concrete app-access request: scoped groups/records/actions, coding AI versus app AI, existing/missing setup, open questions, and copy/text export. Keep earlier plans, timing drafts, and Labs intact. Verify v1/v2 migration to v3, persistence, example isolation, group undo, export, phone/tablet layouts; TypeScript, build, and 26 targeted tests pass.
- [x] Publish and verify this access-request iteration on the review preview. Railway deployment `d8c580d6-15c0-4ea7-852c-bf80a6320d8c` succeeded for application commit `e174b65`; the published review desk, PM and lead routes, example request, and copied output were checked. Live checkout remains disabled.
- [x] Make the smaller-first-release tool the default for both editions: three-step flow, four narrowing prompts, editable scope choices, dependency/usefulness/quality checks, and live copy/text proposal. Keep earlier tools and saved drafts available. TypeScript, production build, and 33 targeted tests pass; browser checks cover scope edits, undo, export/download, saved checks after reload, old drafts, and phone/tablet layouts.
- [x] Publish and verify the smaller-first-release iteration on the review preview. Railway deployment `81d49f80-b856-47ef-9508-77ffeeaeedd5` succeeded for application commit `cca5e8a`; the review desk, PM and lead developer routes, editable example scope, and copied proposal were checked. Live checkout remains disabled.
- [x] Verify the delivery-journey iteration: 42 targeted tests, TypeScript, production build, and browser checks at desktop, tablet (768px), and phone (390px). Confirmed multiple hypotheses and return loops, unknown/custom questions, contextual action drafts, copy/download with follow-up, reload persistence, separate PM/lead-dev and example/own drafts, preserved tool handoffs, and the no-obvious-problem path.
- [x] Publish and verify the delivery journey on the review preview. Application commit `ce9233b231d1ae505a168b58cf88a0d561c63711`; Railway deployment `81faef2f-1888-4e02-a0a1-ff132c1839f3` succeeded. Both edition routes, the review desk, example drill-down, and copy output were checked on the deployed site; no browser console errors observed. Screenshot: `/Users/nicholaspayne/Documents/Codex/shipping-sooner-proof/delivery-journey-published.png`.
- [x] Nic approved the packaging: Guide plus one Lab containing the interactive conversation companion and delivery map. No existing app work is retired.
- [x] Build both edition Lab hubs, canonical conversation/delivery routes, and compatible redirects for existing Guide/PDF step links. Keep the shipping-sooner alias and all earlier draft keys.
- [x] Add contextual inquiry before advice: one observed example, possible constraint, previous attempt and outcome, decision authority, and missing perspectives. Offer a question to investigate, a conversation to prepare, or a small change to propose.
- [x] Validate with 68 targeted tests, TypeScript, production build, and browser checks of both hubs, older Guide step links, preserved saved plans, question/discussion paths, exports, reload persistence, phone (390px), and tablet (768px).
- [x] Publish and verify this integrated Lab iteration on the review preview. Application commit `a1bb39078a71b1972a3d2b6059905eeaba3992b7`; Railway deployment `39727952-9db0-46c9-847e-ffc70d5a3716` succeeded. Both hubs, canonical paths, the PM Guide step redirect, review-page links, example inquiry/discussion draft, copy feedback, and downloaded notes were checked on the published site. No browser console errors observed. Screenshot: `/Users/nicholaspayne/Documents/Codex/shipping-sooner-proof/ai-stalemate-lab-published.png`. Paid launch checks below remain outstanding.

### Keep decisions proportionate — 3 November 2026
- [x] Weave smallest useful steps, user value, learning, and decisions that can wait into existing delivery prompts. Do not add a stage or require a decision before useful work can continue.
- [x] Limit deeper decision-role help to a closed, optional disclosure for conversation/decision plans. One notes box; no role matrix, mandatory fields, or assigned authority. Ordinary review and investigation paths keep their existing fields.
- [x] Preserve old saved plans and new optional notes through reloads. Include notes in exports only when entered. Keep Agile, Scrum, and Bain sources in the existing research disclosure.
- [x] Verify 39 targeted tests, TypeScript, and production build. Browser checks cover existing simple plans, the decision path, optional notes and text download, reload persistence, and 390px phone layout. No browser console errors observed.
- [x] Publish and verify on the review preview. Application commit `17b1c23e4c39fb28b17603d7a657877baf70310b`; Railway deployment `ef3827c2-12f3-470e-a0c1-9a891d18beb1` succeeded. Confirmed the deployed conversation wording and closed optional decision help. Screenshot: `/Users/nicholaspayne/Documents/Codex/shipping-sooner-proof/small-decisions-published.png`. Both editions use the shared flow; PM investigation and lead-developer decision/simple-review paths were checked locally. Paid launch checks below remain outstanding.

### Clearer purchase pages and tactile exploration — 3 November 2026
- [x] Simplify both AI editions' sales and checkout pages around the Guide and two optional Lab paths. Collapse the longer example, keep the edition distinction and 60-day refund visible, and place checkout options before the large kit image on phones.
- [x] Add stage icons, raised buttons, press/hover feedback, and brief panel reveals to the delivery map. Keep the existing flow, saved drafts, and all earlier tools; honor reduced-motion preferences.
- [x] Verify 54 targeted tests, TypeScript, and production build. Browser checks cover both editions' purchase copy, desktop and 390px layouts, optional example expansion, keyboard drill-down, existing plans, editing and reload persistence. No browser console errors observed.
- [x] Publish and verify this iteration on the review preview. Application commit `06358707e10c86f36bf2c0013b11b126f8b8f1c7`; Railway deployment `ecb896f3-134e-41c0-8956-a1f288b7e17f` succeeded. Checked the deployed lead sales page, PM checkout contents/disabled purchase, and delivery map selection. No map console errors observed. Screenshots: `/Users/nicholaspayne/Documents/Codex/shipping-sooner-proof/simpler-ai-offer-published.png` and `/Users/nicholaspayne/Documents/Codex/shipping-sooner-proof/tactile-map-published.png`. Live checkout remains disabled.

## 3. Explain purchases and support — Nic + Codex
- [x] Replace the shared generic AI sales FAQ with edition-specific answers and tighten the Lead Developer Guide description (3 November). Audited the dev hero, contents, kit image selection, worked example, all seven FAQ answers, purchase/gift/access links, and explicit other-edition link. Confirmed the PM audience remains correct. TypeScript, production build, and local browser checks pass.
- [x] Nic approved 60 days, full refund, no explanation needed (27 October).
- [x] Add the agreed policy, support contact, and browser-local draft explanation to the purchase/access experience.
- [x] Confirm hello@rebel-leader.com reaches a mailbox Nic monitors. Squarespace forwards it to nicpaynedev@gmail.com; Nic confirmed a test email arrived on 27 October. Outgoing customer replies and transactional access emails are separate checks.
- [x] Verify the transactional email sender separately from the support inbox. The test PM access email arrived from hello@rebel-leader.com on 3 November, observed in Gmail and confirmed by Nic.

Refund research: Lemon Squeezy lets sellers choose their policy; comparable digital guides offer 30 days (Refactoring.Guru) and 60 days (Refactoring UI), both full refunds. Nic approved: “Try it for 60 days. If it isn’t useful to you, email hello@rebel-leader.com and we’ll refund you in full. No explanation needed.”

- https://docs.lemonsqueezy.com/help/payments/refunds-chargebacks
- https://refactoring.guru/design-patterns/book
- https://refactoringui.com/

## 4. Connect checkout in test mode — Nic + Codex
- [x] Confirm Lemon Squeezy store activation and bank connection. Activation email and signed-in dashboard checked 27 October.
- [ ] Nic completes the outstanding tax information at https://app.lemonsqueezy.com/settings/payouts/tax-details. The dashboard still reports action required; payouts are not yet cleared.
- [x] Create separate PM and Lead Developer $47 one-time test drafts, hidden from the storefront. PM product: 1478553. Lead Developer product: 1478557. Both were subsequently published in test mode on 3 November; no live products created.
- [x] Finish test product images, confirmation/receipt/access URLs, publish in test mode, and record variant IDs and checkout URLs. Draft tax category is Digital Goods or Services; confirm the appropriate category for the Guide/Lab package before live release.
- [x] Configure a separate test database/service, Resend sender, webhook secret, store/mode and variant map. Never paste secrets into this checklist or commit them.
- [x] Apply commerce/gift migrations; the actual PM test purchase webhook was accepted and an access email was delivered. Startup still logs an unrelated legacy `walls.is_featured` alteration warning; investigate separately before production release.
- [ ] Follow the exact settings in field-tools-commerce.md. Keep production checkout disabled until verification passes.

### Final review and test setup — 3 November 2026
- [x] Re-read both Guides, render all 42 PDF pages, and check the edition-specific offer and FAQ copy. Both PDFs remain 21 pages; the review desk already has the correct counts.
- [x] Add a brief signpost in each Guide's practical chapter to the delivery map, alongside the conversation companion. Rebuild both PDFs and inspect the changed pages.
- [x] Run the 150 targeted product/privacy/access/commerce tests. Two HTTP-boundary tests initially hit the local sandbox's port restriction and passed when rerun with permission. These are automated checks, not provider purchase proof.
- [x] Confirm Lemon Squeezy is signed in and in test mode. Store `496181`; PM product/variant `1478553` / `2305039`; Lead Developer product/variant `1478557` / `2305045`. Both are $47 test-mode products, hidden from the storefront.
- [x] Recheck payout settings: bank connected; tax information is still marked Action Required.
- [x] Create separate Railway services `field-tools-test-db` (`7a73622a-aab4-44cd-80c6-0636d7ea9037`) and `field-tools-checkout-test` (`a1fb2583-430d-4a1d-a27d-d545ff52436d`). Database is private with its own volume; app builds from `field-tools-launch`. No live-site settings were changed.
- [x] Nic explicitly approved the isolated checkout-test site. Configured https://field-tools-checkout-test-production.up.railway.app with preview bypass disabled, its own database, test-only Lemon Squeezy settings, and the existing Resend sender reference. Deployment `93f51182-5833-4a80-8d85-8048539ebea7` succeeded. Anonymous access to the Guide displays the sign-in gate. No live-site settings changed.
- [x] Finish each edition's confirmation/receipt URL and test checkout link. Nic entered and saved the signing secret for test webhook `148916`, listening only for `order_created` and `order_refunded`. The first real provider test-mode PM purchase completed; its webhook returned HTTP 200. Nic confirmed purchaser/seller confirmations and the access email arrived. A declined test card showed the expected insufficient-funds message.
- [x] Complete buyer content for both editions, gift recipient sign-in, and full/partial refund checks. Remaining robustness/device checks are listed below; production is not enabled.
- [x] Clarify temporary sign-in versus ongoing purchase access. Add a branded access email with the correct edition, single-use link, separate permanent welcome-page bookmark, return instructions, support, and browser-local draft reminder. Make bookmarking visible on welcome/sign-in pages; include return instructions in gift email. Build and 24 targeted tests pass; local email rendering checked.

## 5. Prove the whole journey — Codex + Nic
- [x] Test each purchase through provider test checkout, receipt, access email, welcome, Guide/PDF, and Lab. PM test order `4961811` and Lead Developer test order `4961812` completed on 3 November. Both protected PDF downloads match the reviewed 21-page files byte for byte; both conversation and delivery routes opened with buyer access.
- [x] Verify the other edition stays locked (PM buyer opening the Lead Developer Guide). Confirm returning with a fresh email sign-in link.
- [ ] Confirm a fresh sign-in on Nic’s separate phone/tablet; receiving the email there alone does not prove product access.
- [x] Actual PM partial refund ($5): access remains available. Actual full remaining refund: the Lab and protected PDF return to the sign-in gate. Refund webhooks returned HTTP 200.
- [x] Observe a used/expired sign-in link fail, then successfully request and use a fresh link.
- [ ] Complete duplicate/delayed-event state verification and provider email-failure/retry verification. The original PM paid event was replayed after refund and returned HTTP 200; automated stale-event protection passes, but a fresh PM identity check is still needed before calling that replay fully verified.
- [x] Complete a real provider test-mode gift purchase (`4961813`), recipient notification, recipient sign-in and Lab access, then full refund and verified recipient access revocation. The test buyer and recipient use different email aliases.
- [ ] Finish gift buyer-denial and duplicate-notification checks; apply the branded email treatment to the initial gift notification, which remains plain.
- [x] Nic confirms an incoming support test message arrives (27 October).
- [ ] Confirm Nic can reply to a support message and the sender receives the response.

## 6. Prepare and release — Codex, then Nic's production approval
- [ ] Confirm the customer domain, then rebuild both PDFs with final links and remove Working Edition. Keep preview PDFs pointing to working preview routes until release.
- [ ] Check final public purchase/refund/support copy and production access controls.
- [ ] Close or protect the open content-review preview as part of release, while preserving Nic's review access until then.
- [ ] Run build and relevant checks, review the release diff, and obtain Nic's final production go-ahead before merging main/enabling live checkout.
- [ ] Verify the deployed landing pages, checkout links, receipt destinations and protected content.

## 7. Small first release — Nic
- [ ] Invite two or three actual PMs/leads to use it for a current conversation without coaching; note where they stall and what they use.
- [ ] Check support and order/email delivery after first purchases. Video is optional follow-up work, not a launch requirement.

The 27 October implementation passed 114 targeted tests across 14 suites, TypeScript, and the production build. Both three-answer Lab paths and the refund/help page were checked in the local browser. Provider checkout and email delivery were subsequently verified for both AI editions on 3 November as recorded above. Outstanding cases remain unchecked; a passing mocked test alone does not establish delivery.

### Email dark-mode correction — 3 November 2026
- Nic’s Gmail iPhone screenshot exposed opaque paper backgrounds behind the wordmark and raster heading.
- Replaced the raster heading with live serif/italic text. Rendered the existing brand wordmark on a transparent PNG in a green readable on light and dark surfaces; added explicit dark styles for supporting clients.
- Browser proofs cover both 390px light/dark layouts. These are rendering previews, not a claim of Gmail iOS verification. Production build and all three access-email destination tests pass. Application change: `5e27db7`.
- Gift test order `4961813` completed in Lemon Squeezy test mode. The recipient notification arrived at the recipient alias with the correct PM welcome URL and note; recipient sign-in opened the welcome page and Lab. A full test refund then revoked recipient access on reload.
- Deployed the dark-mode correction successfully to review (`f2ed730b-a06d-4408-826e-de7cd9f95c59`) and isolated checkout test (`747f79c7-2d38-4a21-b799-26c4593f9645`). Actual updated PM/gift-recipient and Lead Developer access emails arrived in Gmail at 4:05 and 4:07 PM Central; live-text heading and correct edition/bookmark were verified. The latest Lead Developer sign-in link was left unused for Nic. Gmail iPhone visual confirmation is still Nic’s check.
