# AI Stalemate launch checklist

Updated 27 October 2026. Launch scope: PM and Lead Developer editions, sold separately for $47 each. Keep the approved design, portraits, and Guides.

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
- [ ] Recheck these latest changes at phone size. The browser viewport override did not change the measured 1280px testing tab; do not count it as a phone check.
- [x] Publish and verify the review preview. Railway deployment 163398dd-34c8-49c5-ba81-394de3881e96 succeeded for application commit de0ee28; the deployed purchase/refund links and copy were checked. Live checkout remains disabled.

## 3. Explain purchases and support — Nic + Codex
- [x] Nic approved 60 days, full refund, no explanation needed (27 October).
- [x] Add the agreed policy, support contact, and browser-local draft explanation to the purchase/access experience.
- [x] Confirm hello@rebel-leader.com reaches a mailbox Nic monitors. Squarespace forwards it to nicpaynedev@gmail.com; Nic confirmed a test email arrived on 27 October. Outgoing customer replies and transactional access emails are separate checks.
- [ ] Verify the transactional email sender separately from the support inbox.

Refund research: Lemon Squeezy lets sellers choose their policy; comparable digital guides offer 30 days (Refactoring.Guru) and 60 days (Refactoring UI), both full refunds. Nic approved: “Try it for 60 days. If it isn’t useful to you, email hello@rebel-leader.com and we’ll refund you in full. No explanation needed.”

- https://docs.lemonsqueezy.com/help/payments/refunds-chargebacks
- https://refactoring.guru/design-patterns/book
- https://refactoringui.com/

## 4. Connect checkout in test mode — Nic + Codex
- [x] Confirm Lemon Squeezy store activation and bank connection. Activation email and signed-in dashboard checked 27 October.
- [ ] Nic completes the outstanding tax information at https://app.lemonsqueezy.com/settings/payouts/tax-details. The dashboard still reports action required; payouts are not yet cleared.
- [x] Create separate PM and Lead Developer $47 one-time test drafts, hidden from the storefront. PM product: 1478553. Lead Developer product: 1478557. Neither is published; no live products created.
- [ ] Finish test product images, confirmation/receipt/access URLs, publish in test mode, and record variant IDs and checkout URLs. Draft tax category is Digital Goods or Services; confirm the appropriate category for the Guide/Lab package before live release.
- [ ] Configure a separate test database/service, Resend sender, webhook secret, store/mode and variant map. Never paste secrets into this checklist or commit them.
- [ ] Apply commerce/gift migrations and check database health.
- [ ] Follow the exact settings in field-tools-commerce.md. Keep production checkout disabled until verification passes.

## 5. Prove the whole journey — Codex + Nic
- [ ] Test each purchase through provider test checkout, receipt, access email, welcome, Guide/PDF, and Lab.
- [ ] Verify the other edition stays locked; test returning and signing in from a second device.
- [ ] Test full/partial refunds, duplicate/delayed webhooks, expired access links, and failed email/retry behavior.
- [ ] Test gifts end to end or defer gifting for initial launch; do not count mocked tests as delivery verification.
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

The 27 October implementation passed 114 targeted tests across 14 suites, TypeScript, and the production build. Both three-answer Lab paths and the refund/help page were checked in the local browser. Provider checkout and email delivery remain unverified. Checklist completion requires actual evidence, not a passing mocked test alone.
