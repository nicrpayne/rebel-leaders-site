import { describe, expect, it } from "vitest";
import {
  examplePatch,
  editLabValues,
  labReviewPrompts,
  withLabDefaults,
} from "../client/src/lib/field-tool-session";
import { LEADERSHIP_LABS } from "./field-tool-content/leadership-labs";
import { LEADERSHIP_SAMPLES } from "./field-tool-content/leadership-samples";
import { aiLabFor } from "./field-tool-content/ai-paths";
import { AI_READINESS_SAMPLE } from "./field-tool-content/ai-readiness";
import {
  capacitySnapshot,
  buildDeadlineUpdate,
  buildTradeoffBrief,
  buildQuietConversation,
} from "../client/src/lib/leadership-output";
import {
  buildDecisionBrief,
  buildReadinessBrief,
} from "../client/src/lib/ai-trial";

describe("review feedback regressions", () => {
  it("asks for missing decision ownership and experiment boundaries without pretending to approve them", () => {
    expect(labReviewPrompts("deadline-reset", { date: "Friday" })).toContain(
      "You’ve added a date. Who can make this decision?"
    );
    expect(
      labReviewPrompts("deadline-reset", { date: "Friday", owner: "Sponsor" })
    ).toEqual([]);
    expect(
      labReviewPrompts("ai-stalemate", {
        readinessDecision: "READY FOR A BOUNDED TEST",
        prerequisitePlan: "Review Tuesday",
      })
    ).toHaveLength(2);
  });
  it("loads all three capacity inputs only in the displacement step", () => {
    const slug = "priority-whiplash",
      sample = LEADERSHIP_SAMPLES[slug];
    const stack = examplePatch(
      slug,
      0,
      LEADERSHIP_LABS[slug].steps[0].fields,
      sample
    );
    const displacement = examplePatch(
      slug,
      1,
      LEADERSHIP_LABS[slug].steps[1].fields,
      sample
    );
    expect(stack.availableCapacity).toBeUndefined();
    expect(stack.existingLoad).toBeUndefined();
    expect(stack.requestLoad).toBeUndefined();
    expect(capacitySnapshot(displacement)).toEqual({
      available: 10,
      existing: 10,
      request: 2,
      total: 12,
      gap: 2,
    });
    expect(displacement.p1).toBeUndefined();
  });
  it("keeps step replacement scoped and includes evidence-table fields", () => {
    for (const audience of ["pm", "lead-dev"] as const) {
      const lab = aiLabFor(audience);
      const sample = {
        ...AI_READINESS_SAMPLE,
        ai_setup: "12",
        baseline_setup: "6",
      };
      const patch = examplePatch(
        "ai-stalemate",
        3,
        lab.steps[3].fields,
        sample
      );
      expect(patch.ai_setup).toBe("12");
      expect(patch.baseline_setup).toBe("6");
      expect(patch.businessContext).toBeUndefined();
      expect(patch.story).toBeUndefined();
    }
  });
  it("displays only valid conservative status defaults without selecting a next move", () => {
    for (const [slug, lab] of Object.entries(LEADERSHIP_LABS)) {
      const defaults = withLabDefaults(slug, { decisionStatus: "" });
      const field = lab.steps
        .flatMap(step => step.fields)
        .find(field => field.id === "decisionStatus")!;
      expect(field.options).toContain(defaults.decisionStatus);
    }
    const values = withLabDefaults("ai-stalemate", {});
    const fields = aiLabFor("pm").steps.flatMap(step => step.fields);
    for (const id of ["conversationStatus", "betStatus"])
      expect(fields.find(field => field.id === id)?.options).toContain(
        values[id]
      );
    expect(values.readinessDecision).toBeUndefined();
    expect(buildReadinessBrief(values)).not.toContain("PREPARE FIRST");
    expect(
      withLabDefaults("ai-stalemate", {
        betStatus: "ACCEPTED — CONDITIONS AGREED",
      }).betStatus
    ).toBe("ACCEPTED — CONDITIONS AGREED");
  });
  it("invalidates a prior decision after changing the next move without erasing measured evidence", () => {
    const before = {
      readinessDecision: "READY FOR A BOUNDED TEST",
      decision: "CONTINUE",
      ai_setup: "12",
      baseline_setup: "6",
      evidence: "Observed reviewer effort",
      next: "Talk with sponsor",
    };
    const next = editLabValues(before, { readinessDecision: "PREPARE FIRST" });
    expect(next.decision).toBe("PAUSE");
    expect(next.ai_setup).toBe("12");
    expect(next.evidence).toBe(before.evidence);
    expect(next.next).toBe(before.next);
    expect(buildDecisionBrief(next)).not.toContain("READY FOR A BOUNDED TEST");
    expect(
      editLabValues(next, { readinessDecision: "USE EXISTING EVIDENCE" })
        .decision
    ).toBe("");
    expect(
      editLabValues(next, { readinessDecision: "STOP THIS USE" }).decision
    ).toBe("STOP");
  });
  it("cleans generated prompts without editing entered text or removing fictional provenance", () => {
    expect(buildTradeoffBrief({})).not.toContain("[not recorded]");
    expect(buildDecisionBrief({})).not.toMatch(/\[(not entered|tool\/use)/);
    expect(
      buildTradeoffBrief(LEADERSHIP_SAMPLES["priority-whiplash"])
    ).not.toContain("For The");
    expect(
      buildTradeoffBrief(LEADERSHIP_SAMPLES["priority-whiplash"])
    ).toContain("Fictional example");
    expect(
      buildDeadlineUpdate(LEADERSHIP_SAMPLES["deadline-reset"]).match(
        /your assessment, not a calculated chance of success/g
      )
    ).toHaveLength(1);
    expect(
      buildQuietConversation({
        moment: "Sam started to ask about the report, and I interrupted.",
      })
    ).toContain("Sam started to ask about the report, and I interrupted.");
    expect(
      buildQuietConversation({
        moment: "Literal [not recorded] from my colleague",
      })
    ).toContain("Literal [not recorded] from my colleague");
  });
});
