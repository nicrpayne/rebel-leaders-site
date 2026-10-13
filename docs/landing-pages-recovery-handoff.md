# Landing pages: recovery and review handoff

Verified October 13, 2026. This is the current starting point for continuing the Field Tools work. Historical progress messages alone are not proof that a file was committed or a feature was launched.

## Start here

- [Main review desk: all five products and six paths](https://rebel-leaders-field-tools-preview-production.up.railway.app/field-tools/review)
- [Separate AI Stalemate proposal: both roles and all new materials](https://rebel-ai-stalemate-proposal-production.up.railway.app/field-tools/proposal)
- [Draft PR #3: existing Field Tools into production](https://github.com/nicrpayne/rebel-leaders-site/pull/3)
- [Draft PR #4: AI Stalemate proposal into the Field Tools preview](https://github.com/nicrpayne/rebel-leaders-site/pull/4)
- [Website images](../client/public/assets/field-tools/), [preserved source images](../assets/source-originals/), and [asset inventory with checksums](field-tools-asset-inventory.json).

Nic uses the main review desk as the central entry point. Its version selector links to both the existing preview and the new AI proposal, plus these notes and saved images. AI Stalemate has two different review versions; neither should be mistaken for a completed paid launch.

## What is done

| Area | Existing preview | AI proposal |
| --- | --- | --- |
| Products | Five products; AI has PM and Lead Developer paths | Same five products; AI is the revised proposal |
| Sales pages | Separate landing and buy pages | One AI product page per role; old AI `/buy` paths redirect |
| Guide PDFs | AI: 13 pages per role; other four: 10 pages each | AI: 18 pages per role; other four unchanged |
| Labs | Role-specific AI flow and four other product Labs | Adds editable leadership/team updates, structured quality evidence, and return/reflection prompts |
| Outputs | Working briefs, examples, copy/download/print | Adds richer communication and explicit PASSED / FAILED / NOT CHECKED quality records |
| Walkthrough | Start-page entry points; no hosted recording configured | An interactive AI worked example is implemented; no recorded video |
| Resources | Existing Guide links | 16 tool entries and 10 study/framework entries with role-specific questions |
| Privacy | Shared drafts remain in the browser; private prep is excluded from saved drafts and exports | Same boundary, including private leadership reflection |
| Assets | Website-ready images and all six PDFs in GitHub | New library portrait, real covers, and separate real Lab captures saved |

One AI purchase is designed to unlock both role paths. There is no real-time co-editing or cross-device draft synchronization. An experiment is optional: the worked example can end honestly at PREPARE FIRST, without invented results or an agreed Bet.

## What the interruption left unfinished, and what was recovered

GitHub and the proposal deployment initially stopped at `0787cc12bb3b2d35b0ab8d162e6e85414d5fda24` (the main proposal rebuild). The base preview was `5e0241c6cc6e6cf7d701aacf671024f3d0ddeecb`. The proposal did not yet have a pull request.

Recovered from the old execution history and its completed upload payloads:

- Nine modified source files: readable body typography; role-specific kit imagery; resource shortcut scrolling after filters reset; artifact heading punctuation; shared vision available during Conversation; clearer quality notes; concrete support requests in the sample updates.
- Both final Lab captures, exactly 97,714 bytes (PM) and 95,512 bytes (Lead Developer). These were uploaded to GitHub as blobs but not attached to a commit.
- The previously uncommitted proposal review/adoption notes, now in `docs/ai-stalemate-proposal-review.md`.
- The supplied portrait PNG, unchanged, in `assets/source-originals/`.

Recovery additions: draft PR #4; links connecting both review desks; this handoff; a complete saved-asset inventory; and a fix for the decorative phone being clipped in the mobile product illustration. The original single Lab-preview image is retained as a recoverable older asset.

## Still not done

1. **Nic's review and adoption decision.** Approve the proposal as a whole, request changes, or select the product-page, Lab/output, Guide/PDF, and library groups. Do not merge to production before that decision.
2. **Commerce configuration and actual purchase testing.** The payment adapter, webhook checks, ownership checks, and email-token code exist. The review services have no payment/email/database configuration. Complete the exact checklist in `docs/field-tools-commerce.md`, including provider/store/variant settings, database migration, email sender, receipts, refund behavior, and a real end-to-end test before selling.
3. **Recorded walkthrough videos.** No hosted recording is configured. The AI proposal's interactive worked walkthrough is available now.
4. **The six cloud-generated original PNG files.** Their website-ready WebP counterparts are saved. The original files were last listed in the old cloud workspace, but its recovery worker has not returned any actions or files. A separate recovery branch was requested; do not assume it exists until verified. See the source-image README for exact filenames. This does not prevent reviewing or running the proposal.
5. **Applying the new proposal treatment to the other four products.** They retain their existing landing/buy pages, Guides and Labs. That broader redesign is future work after AI review.
6. **Editorial upkeep of the resource library.** Maintenance is documented and manual; there is no automatic update service. Resource records were marked reviewed October 12, 2026; this recovery did not re-audit every external resource.
7. **Real device and paid-buyer acceptance.** A 390-pixel browser check is useful but does not replace physical phone testing, assistive-technology testing, or a real purchase journey.

Separate older site issue: `docs/workbench-asset-recovery-manifest.json` lists an original Workbench desk image and Drift cover still missing. Those are broader Workbench assets, not new Field Tools failures. Seven ChatGPT project sources were not synced into this local project; the local `sources/` directory was empty. Do not claim all background research or notes have been recovered.

## Verified in this recovery

- Production build and TypeScript pass using the repository's pinned pnpm 10.4.1 lockfile install.
- All 75 focused tests pass across proposal behavior, readiness, privacy, workflow, follow-through, leadership tools, and commerce. One local HTTP test first hit a sandbox port restriction and passed when rerun with local-server permission.
- Both AI PDFs contain 18 pages, and the other four contain 10 pages each. Rendered overviews of all 36 AI pages and full-size sampled pages were inspected. PDF hyperlinks point to the separate proposal and the intended reference sources.
- The saved inventory initially contains 31 website images, six PDFs, and one user-supplied PNG. Each entry records file size, SHA-256, and dimensions or page count.
- The live proposal at the recovery starting commit was successful on Railway. Its PM page and review desk rendered with the expected role links and review access. Final deployment checks are recorded below as they complete.
- Mobile product review identified and fixed a clipped phone illustration. The PM page had no horizontal overflow at a 390-pixel viewport.

The repository-wide legacy auth/RSS/YouTube failures documented by earlier work are outside this recovery; the full suite was not rerun and is not claimed green. Build warnings about the older `/noise.png` reference, mixed CodexAudio imports, and large bundles remain.

## Branches and deployments

| Purpose | Branch | Railway service |
| --- | --- | --- |
| Public site (`rebel-leader.com`) | `main` | `rebel-leaders-site` |
| Existing review desk and five products | `field-tools-launch` | `rebel-leaders-field-tools-preview` |
| New AI proposal | `ai-stalemate-library-proposal` | `rebel-ai-stalemate-proposal` |

The small main-desk navigation addition is made on the preview branch. Product replacement stays on the proposal branch. PR #4 compares the proposal with `field-tools-launch`; PR #3 compares Field Tools with `main`. Keep those decisions separate. The proposal service uses port 8080 and both `FIELD_TOOL_PREVIEW=true` and `FIELD_TOOL_PROPOSAL=true`. Its Railway project is `patient-acceptance` (`a2a37327-0190-4908-8c3a-4824107636bb`), production environment `605ca4ab-0ec1-4967-bb45-ce0f286913e0`; service IDs are available from the Railway connector.

## Continue safely

Start by reading this handoff and the latest Git log, then checking that Railway's successful deployment SHA equals the branch head. Read `docs/ai-stalemate-proposal-review.md` for adoption groups and `docs/field-tools-commerce.md` for launch requirements. Preserve the role-specific voice, proposal-versus-agreement status, optional experiment, whole-workflow effort, and private-reflection exclusions.

Use the package manager specified by `package.json`: pnpm 10.4.1. The bundled pnpm 11 ignored the legacy overrides setting and rejected a frozen install; default `npm ci` hit an existing peer-dependency conflict. The successful install used `npm exec --yes --package=pnpm@10.4.1 -- pnpm install --frozen-lockfile`. No lockfile changes were needed. Then use `npm run build` and the seven focused test files listed above. Guide build scripts require the appropriate Python PDF packages and a Node runtime supporting their TypeScript-loading approach.

The old cloud worker's execution chat ID is `01a12d05-1e1e-7185-912e-0c39253130fb` on host `durable`; its workspace was `/workspace/scratch/8fabfe6c7f41`. Nic explicitly authorized a narrow asset-recovery request. It was asked to preserve originals and screenshots on `recovery/landing-assets-2026-10-13`, without changing proposal, preview, or main. Inspect its eventual result before importing anything; never overwrite these recovered changes with an older cloud checkout. The current local repository and this handoff are the continuation source.

## Final publication verification

The recovery application is live and verified:

- Proposal application commit: `86ffec4fce7afef95ef5710083760e40af385a5d`; Railway deployment `78e4796f-6597-4f1e-a66b-2ce5a5cb95c6` is SUCCESS.
- Existing review desk commit: `4ca218becbb7ab6dca619dc6f553943fb496026d`; deployment `6f8859e5-e6f9-4bba-8b75-0a01da4b4e99` is SUCCESS.
- Public `main` remains at `8cb8c54`; no product proposal was merged into production.
- All 43 live-file comparisons passed: six PDF endpoints on each review deployment and 31 proposal website images return the intended file type and exactly match the local SHA-256.
- Browser verified the published review desk's version selector and recovery links, the live AI `/buy` redirect to the unified page's purchase section, both role-specific screenshots, and the resource shortcut resetting filters and scrolling to its source.
- The later handoff/verification commit changes documentation only. No further application changes are included.

The original-PNG recovery request remains unanswered. The six original PNGs must stay on the outstanding list until their actual bytes are saved. The source-ready WebPs and all recovered product code are committed and available now.
