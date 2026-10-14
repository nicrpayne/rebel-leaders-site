import { describe, expect, it } from "vitest";
import {
  AI_EFFORT_STAGES,
  buildAITrialPackage,
  buildDecisionBrief,
  buildEvidenceRecord,
  buildTrialCard,
  summarizeEffort,
} from "../client/src/lib/ai-trial";
import { readFieldToolDraft } from "../client/src/lib/field-tool-drafts";
import { getFieldToolCheckout } from "./field-tool-checkout";
import { FIELD_LABS } from "./field-tool-content/labs";
import { FIELD_TOOL_PRESENTATIONS } from "../client/src/lib/field-tool-presentations";

const allStages = (method: string, minutes: string) =>
  Object.fromEntries(
    AI_EFFORT_STAGES.map(stage => [`${method}_${stage.id}`, minutes])
  );

describe("the five Field Tool examples", () => {
  for (const [slug, presentation] of Object.entries(FIELD_TOOL_PRESENTATIONS)) {
    it(`${slug} produces a populated brief and uses valid select options`, () => {
      const lab = FIELD_LABS[slug];
      expect(lab.buildOutput(presentation.sampleValues).length).toBeGreaterThan(
        300
      );
      for (const field of lab.steps
        .flatMap(step => step.fields)
        .filter(field => field.type === "select")) {
        const value = presentation.sampleValues[field.id];
        if (value) expect(field.options).toContain(value);
      }
    });
  }
});

describe("AI experiment evidence and shared artifacts", () => {
  it("keeps the prediction, investment, and acceptance distinct from observed results", () => {
    const v = {
      betHypothesis: "Hypothesis",
      expectedLift: "20 percent prediction",
      betTimebox: "One week",
      capacity: "Two person-hours",
      betResult: "Target missed",
      betLearning: "Review cost increased",
    };
    const brief = buildTrialCard(v);
    expect(brief).toContain("20 percent prediction");
    expect(brief).toContain("One week");
    expect(brief).toContain("Two person-hours");
    expect(brief).toContain("PROPOSED — NOT YET ACCEPTED");
    expect(brief).not.toContain("Target missed");
    expect(buildEvidenceRecord(v)).toContain("Target missed");
    expect(buildDecisionBrief(v)).toContain("Review cost increased");
  });
  it("does not imply an experiment result when an accepted proposal was never attempted", () => {
    const v = {
      task: "Proposed task",
      readinessDecision: "READY FOR A BOUNDED TEST",
      betStatus: "NOT ATTEMPTED",
      decision: "STOP",
      reason: "Priority changed",
    };
    expect(buildDecisionBrief(v)).toContain("No experiment result is recorded");
    expect(buildAITrialPackage(v)).not.toContain("RESULTS RECORD");
  });
  it("reports descriptive effort reduction only with complete evidence and a positive baseline", () => {
    const v = { ...allStages("baseline", "10"), ...allStages("ai", "8") };
    expect(buildEvidenceRecord(v)).toContain("Observed effort reduction: 20%");
    expect(buildEvidenceRecord({ ...v, baseline_review: "" })).toContain(
      "percentage reduction unavailable"
    );
    expect(
      buildEvidenceRecord({
        ...allStages("baseline", "0"),
        ...allStages("ai", "0"),
      })
    ).toContain("percentage reduction unavailable");
  });
  it("keeps missing effort unknown and recognizes explicit zero", () => {
    expect(summarizeEffort({}, "ai")).toEqual({
      minutes: 0,
      entered: 0,
      complete: false,
    });
    expect(summarizeEffort(allStages("ai", "0"), "ai")).toEqual({
      minutes: 0,
      entered: 6,
      complete: true,
    });
  });
  it("does not treat invalid, negative, or blank entries as complete evidence", () => {
    const v = {
      ...allStages("ai", "10"),
      ai_setup: "-3",
      ai_review: "NaN",
      ai_followup: " ",
    };
    expect(summarizeEffort(v, "ai")).toEqual({
      minutes: 30,
      entered: 3,
      complete: false,
    });
    expect(buildEvidenceRecord(v)).toContain("Comparison pending");
  });
  it("counts transferred costs even when AI drafting is much faster", () => {
    const v = {
      ...allStages("baseline", "0"),
      ...allStages("ai", "0"),
      baseline_drafting: "45",
      baseline_review: "15",
      ai_drafting: "12",
      ai_review: "60",
    };
    expect(summarizeEffort(v, "baseline").minutes).toBe(60);
    expect(summarizeEffort(v, "ai").minutes).toBe(72);
    expect(buildEvidenceRecord(v)).toContain(
      "Recorded effort difference: 12 min"
    );
  });
  it("exports a pre-experiment brief without implying that evidence or a decision exists", () => {
    const card = buildTrialCard({
      task: "Approved test task",
      comparator: "Matched previous task",
      decision: "STOP",
    });
    expect(card).toContain("Matched previous task");
    expect(card).not.toContain("RESULTS RECORD");
    expect(card).not.toContain("STOP\n");
  });
  it("excludes every private preparation field from all shared outputs", () => {
    const v = {
      side: "PRIVATE_SIDE",
      happened: "PRIVATE_EVENT",
      story: "PRIVATE_MOTIVE",
      protecting: "PRIVATE_COST",
      observed: "PRIVATE_OBSERVATION",
      prediction: "PRIVATE_PREDICTION",
      changeMind: "PRIVATE_VIEW",
      why: "PRIVATE_WHY",
      futurePicture: "PRIVATE_FUTURE",
      askOther: "PRIVATE_QUESTION",
      task: "Shared task",
    };
    for (const build of [
      buildTrialCard,
      buildEvidenceRecord,
      buildDecisionBrief,
      buildAITrialPackage,
    ]) {
      expect(build(v)).toContain("Shared task");
      expect(build(v)).not.toContain("PRIVATE_");
    }
  });
  it("exports only the ambition agreed in shared work", () => {
    for (const build of [buildTrialCard, buildDecisionBrief]) {
      expect(
        build({ sharedVision: "Shared ambition", why: "Private why" })
      ).toContain("Shared ambition");
      expect(
        build({ why: "Private why", futurePicture: "Private future" })
      ).not.toMatch(/Private why|Private future/);
    }
  });
  it("supports a pause with a named prerequisite before evidence exists", () => {
    const brief = buildDecisionBrief({
      decision: "PAUSE",
      reason: "Approval missing",
      next: "Engineering lead confirms approval Thursday",
    });
    expect(brief).toContain("PAUSE");
    expect(brief).toContain("Approval missing");
    expect(brief).toContain("No experiment result is recorded");
  });
});

describe("browser draft and checkout resilience", () => {
  it("recovers from corrupt or inaccessible storage", () => {
    expect(
      readFieldToolDraft({ getItem: () => "broken JSON" }, "draft", 4)
    ).toEqual({ values: {}, step: 0 });
    expect(
      readFieldToolDraft(
        {
          getItem: () => {
            throw new Error("blocked");
          },
        },
        "draft",
        4
      )
    ).toEqual({ values: {}, step: 0 });
  });
  it("preserves valid draft strings and bounds the step", () => {
    expect(
      readFieldToolDraft(
        {
          getItem: () =>
            JSON.stringify({
              step: 200,
              values: { task: "Keep this", ai_review: "0", invalid: {} },
            }),
        },
        "draft",
        4
      )
    ).toEqual({ values: { task: "Keep this", ai_review: "0" }, step: 3 });
  });
  it("keeps an unconfigured purchase unavailable and rejects unsafe checkout URLs", () => {
    expect(getFieldToolCheckout("ai-stalemate", {})).toEqual({
      checkoutUrl: null,
      provider: null,
    });
    for (const url of [
      "javascript:alert(1)",
      "http://buy.stripe.com/test",
      "https://name:secret@buy.stripe.com/test",
    ]) {
      expect(
        getFieldToolCheckout("ai-stalemate", {
          FIELD_TOOL_AI_STALEMATE_CHECKOUT_URL: url,
        }).checkoutUrl
      ).toBeNull();
    }
    expect(
      getFieldToolCheckout("ai-stalemate", {
        FIELD_TOOL_AI_STALEMATE_CHECKOUT_URL:
          "https://example.lemonsqueezy.com/buy/test",
      }).provider
    ).toBe("Lemon Squeezy");
    expect(getFieldToolCheckout("__proto__", {}).checkoutUrl).toBeNull();
  });
});
