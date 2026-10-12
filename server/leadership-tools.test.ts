import { describe, expect, it } from "vitest";
import { LEADERSHIP_LABS } from "./field-tool-content/leadership-labs";
import { LEADERSHIP_SAMPLES } from "./field-tool-content/leadership-samples";
import { LEADERSHIP_GUIDE_PAGES } from "./field-tool-content/leadership-guides";
import {
  capacitySnapshot,
  LEADERSHIP_OUTPUT_BUILDERS,
  buildDeadlineUpdate,
  buildTradeoffBrief,
  buildMandateRequest,
  buildStakeholderResponse,
} from "../client/src/lib/leadership-output";
import { readFieldToolDraft } from "../client/src/lib/field-tool-drafts";
import { fieldToolAccessPath } from "../client/src/lib/field-tool-paths";

describe("four complete working kits", () => {
  for (const [slug, lab] of Object.entries(LEADERSHIP_LABS)) {
    it(`${slug} can produce every promised artifact from its worked example`, () => {
      const sample = LEADERSHIP_SAMPLES[slug];
      for (const output of lab.outputs!) {
        const text = output.build(sample);
        expect(text.length).toBeGreaterThan(250);
        expect(text).not.toContain("[not recorded]");
        expect(text).not.toContain(sample.privateReaction);
        expect(text).not.toContain(sample.privateAssumption);
        expect(LEADERSHIP_OUTPUT_BUILDERS[output.id]).toBeTypeOf("function");
      }
      expect(lab.buildOutput(sample)).toContain(
        "PROPOSAL — awaiting a decision"
      );
      expect(lab.buildOutput(sample)).not.toContain(
        "AGREED — decision recorded"
      );
    });
    it(`${slug} preserves earlier drafts and accepts its example choices`, () => {
      const sample = LEADERSHIP_SAMPLES[slug];
      for (const f of lab.steps.flatMap(s => s.fields)) {
        if (f.type === "select" && sample[f.id])
          expect(f.options).toContain(sample[f.id]);
      }
      const earlier = {
        step: 3,
        values: {
          finalDecision: "Keep the actual response",
          privateReaction: "Keep my private note",
        },
      };
      expect(
        readFieldToolDraft(
          { getItem: () => JSON.stringify(earlier) },
          "existing",
          lab.steps.length
        )
      ).toEqual({
        step: earlier.step,
        values: { finalDecision: "Keep the actual response" },
      });
    });
    it(`${slug} teaches the buyer how to use this exact Lab and export its records`, () => {
      const pages = LEADERSHIP_GUIDE_PAGES[slug];
      const text = JSON.stringify(pages);
      expect(pages).toHaveLength(9);
      expect(text).toContain("private");
      expect(text).toContain("Load Examples");
      expect(text).toContain("browser");
      for (const output of lab.outputs!) expect(text).toContain(output.title);
    });
  }
});

describe("decision fidelity", () => {
  it("keeps recommendations unapproved when agreement is absent", () => {
    for (const build of [
      buildDeadlineUpdate,
      buildTradeoffBrief,
      buildMandateRequest,
      buildStakeholderResponse,
    ]) {
      const output = build({
        recommendation: "Recommendation only",
        privateReaction: "PRIVATE_REACTION",
        privateAssumption: "PRIVATE_STORY",
      });
      expect(output).toContain("PROPOSAL — agreement not recorded");
      expect(output).toContain("No ");
      expect(output).not.toContain("PRIVATE_");
    }
  });
  it("carries a recorded decline and next step without changing it into approval", () => {
    const output = buildMandateRequest({
      ...LEADERSHIP_SAMPLES["mandate-reset"],
      decisionStatus: "DECLINED — response recorded",
      finalDecision:
        "Sponsor retains the scope right; agrees a one-day response rule.",
    });
    expect(output).toContain("DECLINED — response recorded");
    expect(output).toContain("one-day response rule");
    expect(output).toContain("Security/data approvals");
    expect(output).not.toContain("AGREED — decision recorded");
  });
  it("keeps a stakeholder need unconfirmed until the buyer records confirmation", () => {
    const output = LEADERSHIP_OUTPUT_BUILDERS["request-decoder"]({
      request: "Final requirements",
      need: "Budget / staffing",
    });
    expect(output).toContain("Underlying need is a hypothesis");
    expect(buildDeadlineUpdate({ confidence: "High" })).toContain(
      "not a calculated probability"
    );
  });
});

describe("capacity assumptions", () => {
  it("shows the gap before displacement without calculating a release date", () => {
    expect(capacitySnapshot(LEADERSHIP_SAMPLES["priority-whiplash"])).toEqual({
      available: 10,
      existing: 10,
      request: 2,
      total: 12,
      gap: 2,
    });
    const output = buildTradeoffBrief(LEADERSHIP_SAMPLES["priority-whiplash"]);
    expect(output).toContain("demand beyond entered capacity: 2");
    expect(output).toContain("not a delivery forecast");
  });
  it("keeps blanks, invalid numbers, negatives, and overflow unknown", () => {
    for (const value of ["", " ", "no estimate", "-3", "Infinity", "1e309"]) {
      expect(
        capacitySnapshot({
          availableCapacity: "10",
          existingLoad: "10",
          requestLoad: value,
        })
      ).toBeNull();
    }
  });
  it("recognizes explicit zero and does not invent a negative gap", () => {
    expect(
      capacitySnapshot({
        availableCapacity: "10",
        existingLoad: "0",
        requestLoad: "0",
      })
    ).toEqual({ available: 10, existing: 0, request: 0, total: 0, gap: 0 });
  });
});

describe("returning to the purchased tool", () => {
  it("keeps each product's landing, checkout, Guide, and Lab on its own access path", () => {
    for (const slug of Object.keys(LEADERSHIP_LABS)) {
      for (const suffix of ["", "/buy", "/guide", "/lab", "/access"]) {
        expect(fieldToolAccessPath(`/field-tools/${slug}${suffix}`)).toBe(
          `/field-tools/${slug}/access`
        );
      }
    }
  });
  it("preserves both AI audiences and routes unknown tools to the catalog", () => {
    expect(fieldToolAccessPath("/field-tools/ai-stalemate/lead-dev/lab")).toBe(
      "/field-tools/ai-stalemate/lead-dev/access"
    );
    expect(fieldToolAccessPath("/field-tools/ai-stalemate/pm/guide")).toBe(
      "/field-tools/ai-stalemate/pm/access"
    );
    for (const location of [
      "/field-tools",
      "/about",
      "/field-tools/__proto__",
      "/field-tools/unknown",
    ])
      expect(fieldToolAccessPath(location)).toBe("/field-tools");
  });
});
