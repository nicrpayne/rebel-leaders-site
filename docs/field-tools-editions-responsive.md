# Expanded AI editions and responsive review — 14 October 2026

## Decisions implemented

- Ship expanded AI Stalemate in the main review preview.
- Sell Product Manager and Lead Developer editions separately at $47 each: six purchasable tools across five situations.
- New purchases and gifts unlock only the verified paid edition. Historical orders sold with both editions retain both.
- Use “Hope is rebellious.” in the hero portrait caption. The obsolete line is removed.
- Keep the warm paper/green visual style, simple buy pages, and related products.

## What changed

The two editions have separate catalog offers, landing pages, buy/gift routes, welcome pages, Guides, PDFs, Lab drafts, walkthroughs, and resource libraries. The developer framing starts with engineering responsibility, review and maintenance, and evidence for proceeding or stopping. The PM framing starts with the proposed improvement and understanding what the lead needs. Shared experiment/evidence standards let the two people compare their work without favoring an AI adoption outcome.

The expanded product adds five visual companion sections, discussion guidance, editable leadership/team updates, structured quality evidence, return-to-the-work reflection, a five-stage fictional walkthrough, and a searchable resource library. PDFs contain 21 pages each and link to the matching edition on the main preview.

The hero now keeps copy and the portrait in natural flow on narrow screens. Large reserved gaps and the washed-out mobile portrait are gone. At desktop/intermediate widths, the AI headline stays on a quiet background. Navigation changes to an accessible menu on small screens; Escape closes it and returning to another page resets it. Welcome layouts, wrapping buttons, facts, long field labels, preview records, and resource cards fit their available space. Mobile input text is at least 16px. Optional Lab guidance is under “Help with this step”; saving/private-note status remains beside the fields.

All six desktop/mobile product preview screens and two phone close-ups were recaptured. The approved screen perspective is unchanged.

## Verification completed

- 45 product/page variations at 320, 360, 390, 430, 600, 768, 820, 960, 1024, 1280, and 1440 CSS pixels: 495 combinations, with no document-level horizontal overflow.
- 26 Lab stages at 320, 820, and 1440 pixels: 78 checks, including fictional examples and field bounds. Small-screen inputs meet the 16px size check.
- Six representative routes at 640×360 and 844×390 for short landscape screens.
- Mobile navigation open/close/Escape and Guide navigation; searchable library/tool map; all five walkthrough stages and example records; Priority Whiplash output preview.
- Visual inspections of narrow phone, intermediate tablet/desktop, large desktop, and updated device mockups.
- 106 tests across 11 Field Tool suites, including new edition-level authorization and gift tests. Existing privacy, incomplete-evidence, workflow, and commerce tests pass.
- Both 21-page PDFs rebuilt, all pages rendered and visually reviewed; chapter/companion text verified; 46 links per PDF inspected for matching audience and main-preview destinations.
- Production build passes. These are browser viewport checks, not physical-device Safari tests.

## Still required before taking money

1. Configure two separate $47 Lemon Squeezy products/variants and checkout URLs, with receipts pointing to their own edition’s welcome page. Keep old variant mappings for historical access/refunds.
2. Configure the test commerce database, verified email sender, webhook, and variant map as described in `field-tools-commerce.md`.
3. Complete real provider test-mode purchase → receipt → email link → correct edition → PDF/Lab, including gifts, wrong-edition denial, returns, and refunds.
4. Nic reviews the two edition contents, particularly whether the Lead Developer voice reflects his intent, and checks the preview on his actual iPhone/Safari.
5. Set published refund/support terms and provide/confirm the final walkthrough video destinations.
6. Production remains unchanged until approval. Review preview checkout stays disabled.
