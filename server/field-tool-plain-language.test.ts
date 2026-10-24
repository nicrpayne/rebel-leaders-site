import { describe, expect, it } from "vitest";
import { fieldToolChoiceLabel } from "../client/src/lib/field-tool-choice-labels";
import {
  fieldToolLabStep,
  FIELD_TOOL_GUIDE_CHAPTERS,
} from "../client/src/lib/field-tool-workflow";
import { editLabValues } from "../client/src/lib/field-tool-session";
import { buildTrialCard } from "../client/src/lib/ai-trial";
import {
  buildDeadlineUpdate,
  capacitySnapshot,
} from "../client/src/lib/leadership-output";
import { LEADERSHIP_SAMPLES } from "./field-tool-content/leadership-samples";
describe("plain language without changing saved work", () => {
  it("keeps saved choices usable for routing while showing the same readable label in forms and documents", () => {
    const old = {
      readinessDecision: "READY FOR A BOUNDED TEST",
      decision: "CONTINUE",
      task: "My own bounded task wording",
    };
    expect(buildTrialCard(old)).toContain(
      fieldToolChoiceLabel("readinessDecision", old.readinessDecision)
    );
    expect(buildTrialCard(old)).toContain(old.task);
    expect(
      editLabValues(old, { readinessDecision: "PREPARE FIRST" }).decision
    ).toBe("PAUSE");
    expect(old.readinessDecision).toBe("READY FOR A BOUNDED TEST");
    expect(
      buildDeadlineUpdate({ chosenOption: "Keep date / change scope" })
    ).toContain("Keep the date; deliver less first");
  });
  it("returns each teaching chapter to the same Lab step that links to it", () => {
    for (const [slug, chapters] of Object.entries(FIELD_TOOL_GUIDE_CHAPTERS)) {
      chapters.forEach((chapter, step) =>
        expect(fieldToolLabStep(slug, chapter)).toBe(step)
      );
      expect(fieldToolLabStep(slug, 0)).toBe(0);
    }
  });
  it("keeps the specific Priority Whiplash example and its calculator consistent", () => {
    const sample = LEADERSHIP_SAMPLES["priority-whiplash"];
    expect(capacitySnapshot(sample)).toMatchObject({
      available: 10,
      existing: 10,
      request: 2,
      total: 12,
      gap: 2,
    });
    expect(sample.p1).toContain("invitation link");
    expect(sample.p3).toContain("inaccurate totals");
    expect(sample.decisionStatus).toBe("PROPOSAL — awaiting a decision");
    expect(sample.finalDecision).toBe("");
  });
});
