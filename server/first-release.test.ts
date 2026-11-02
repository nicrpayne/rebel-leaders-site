import { describe, expect, it } from "vitest";
import {
  emptyReleaseDraft,
  exampleReleaseDraft,
  hasReleaseWork,
  readReleaseDraft,
  releaseGaps,
  releaseGroups,
  releaseSummary,
} from "../client/src/lib/first-release";
import {
  exampleShippingDraft,
  readShippingDraft,
} from "../client/src/lib/shipping-sooner";

describe("first-release proposals", () => {
  it("exports an incomplete proposal honestly without inventing scope or an outcome", () => {
    const draft = emptyReleaseDraft();
    const text = releaseSummary(draft, false);
    expect(hasReleaseWork(draft)).toBe(false);
    expect(text).toContain("[users to agree]");
    expect(text).toContain("[task or result to agree]");
    expect(text).toContain("[first-release scope to agree]");
    expect(text).not.toContain("Account managers");
    expect(text).not.toContain("Yes —");
    expect(releaseGaps(draft)).toHaveLength(7);
  });
  it("moves scope into exactly one export section and keeps deferred work explicit", () => {
    const draft = exampleReleaseDraft();
    draft.items[1].choice = "later";
    const grouped = releaseGroups(draft);
    expect(grouped.first.map(i => i.id)).toEqual(["overdue"]);
    expect(grouped.later.map(i => i.id)).toContain("export");
    const text = releaseSummary(draft, false);
    expect(text.split("CAN WAIT")[0]).not.toContain("Export that list");
    expect(text.split("CAN WAIT")[1]).toContain("Export that list");
    expect(text).toContain(
      "Confirm the existing renewal data is accurate enough"
    );
  });
  it("treats a failed dependency check as rework, not release approval", () => {
    const draft = exampleReleaseDraft();
    draft.useful = "yes";
    draft.independent = "no";
    draft.quality = "unknown";
    expect(releaseGaps(draft)).toContain(
      "Rework needed: Check dependencies on the work marked later."
    );
    const text = releaseSummary(draft, false);
    expect(text).toContain("No — needs reworking.");
    expect(text).toContain("Not checked yet.");
    expect(text).toContain(
      "Keep essential security, accessibility, reliability, and testing"
    );
    expect(text).toContain(
      "does not predict a delivery date or AI time saving"
    );
  });
  it("preserves multiple boundaries and open questions even after all checks are yes", () => {
    const draft = exampleReleaseDraft();
    draft.boundaries.people = "Account managers in one region";
    draft.lens = "reuse";
    draft.useful = draft.independent = draft.quality = "yes";
    const text = releaseSummary(draft, false);
    expect(text).toContain(draft.boundaries.people);
    expect(text).toContain(draft.boundaries.path);
    expect(text).toContain(draft.unknowns);
    expect(text).toContain("entered by the author; confirm together");
    expect(text).not.toContain("approved for release");
    expect(readReleaseDraft(JSON.stringify({ version: 1, draft }))).toEqual(
      draft
    );
  });
  it("normalizes damaged saved fields conservatively and gives duplicate item IDs distinct identities", () => {
    const raw = {
      version: 1,
      draft: {
        feature: 55,
        useful: true,
        quality: "approved",
        lens: "magic",
        boundaries: { path: "Keep this", rogue: "Ignore this" },
        items: [
          { id: "x", text: "A", choice: "release" },
          { id: "x", text: "B", choice: "later" },
          null,
        ],
      },
    };
    const restored = readReleaseDraft(JSON.stringify(raw));
    expect(restored.feature).toBe("");
    expect(restored.useful).toBe("unknown");
    expect(restored.quality).toBe("unknown");
    expect(restored.items[0].choice).toBe("check");
    expect(restored.items[1].choice).toBe("later");
    expect(new Set(restored.items.map(i => i.id)).size).toBe(2);
    expect(restored.boundaries).toEqual({ path: "Keep this" });
    for (const input of [
      null,
      "bad",
      "null",
      '{"version":99}',
      '{"version":1}',
    ])
      expect(readReleaseDraft(input)).toEqual(emptyReleaseDraft());
  });
  it("keeps example data isolated and recognizes unfinished own work", () => {
    const own = emptyReleaseDraft();
    const example = exampleReleaseDraft();
    example.items[0].text = "Edited example";
    expect(own.items).toEqual([]);
    own.items.push({ id: "mine", text: "", choice: "check" });
    expect(hasReleaseWork(own)).toBe(true);
    expect(releaseGaps(own)).toContain("Name or remove the empty scope items.");
    expect(exampleReleaseDraft().items[0].text).not.toBe("Edited example");
    expect(releaseSummary(example, true)).toContain("Illustrative example");
    expect(releaseSummary(own, false)).not.toContain("Illustrative example");
  });
  it("keeps earlier comparison, action, and access work in its existing format", () => {
    const previous = exampleShippingDraft();
    previous.access.name = "Existing access draft";
    previous.now.coding = "9";
    const saved = JSON.stringify({ version: 3, draft: previous });
    expect(readShippingDraft(saved)).toEqual(previous);
    expect(readReleaseDraft(saved)).toEqual(emptyReleaseDraft());
  });
});
