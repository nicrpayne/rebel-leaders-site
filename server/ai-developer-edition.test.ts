import { describe, it, expect } from "vitest";
import { aiGuideFor, aiLabFor } from "./field-tool-content/ai-paths";
import { aiSampleFor } from "./field-tool-content/ai-readiness";
import {
  AI_DEV_OUTPUT_BUILDERS,
  buildDevPackage,
} from "../client/src/lib/ai-dev-trial";
import { PRIVATE_FIELD_IDS } from "../client/src/lib/field-tool-drafts";
import {
  AI_DEV_GUIDE_CHAPTERS,
  fieldToolLabStep,
} from "../client/src/lib/field-tool-workflow";
import { devWalkthrough } from "../client/src/lib/ai-dev-walkthrough";

describe("independent lead developer edition", () => {
  it("starts from changing engineering work, with concrete access and readiness concerns", () => {
    const dev = aiGuideFor("lead-dev");
    expect(dev).toHaveLength(12);
    expect(dev[0].title).toContain("build differently");
    expect(dev[4].title).toContain("own");
    expect(dev[5].title).toContain("data");
    expect(JSON.stringify(dev)).not.toContain("repair-request");
    expect(dev[2].sections[2].body).toContain("wrong category");
    expect(aiGuideFor("pm")[0].title).toBe(
      "You think AI could help. Your lead has questions."
    );
    dev[0].title = "changed";
    expect(aiGuideFor("lead-dev")[0].title).not.toBe("changed");
  });
  it("exports the developer position and alternatives without any private notes", () => {
    const v = {
      ...aiSampleFor("lead-dev"),
      ...Object.fromEntries(
        [...PRIVATE_FIELD_IDS].map(id => [id, "PRIVATE_SENTINEL"])
      ),
    };
    for (const build of Object.values(AI_DEV_OUTPUT_BUILDERS))
      expect(build(v)).not.toContain("PRIVATE_SENTINEL");
    for (const id of [
      "readiness-brief",
      "decision-brief",
      "working-record",
    ] as const) {
      expect(AI_DEV_OUTPUT_BUILDERS[id](v)).toContain(v.engineeringPosition);
      expect(AI_DEV_OUTPUT_BUILDERS[id](v)).toContain(v.alternatives);
    }
    const outputs = aiLabFor("lead-dev").outputs!;
    expect(outputs.find(x => x.id === "readiness-brief")!.build(v)).toBe(
      AI_DEV_OUTPUT_BUILDERS["readiness-brief"](v)
    );
  });
  it("allows preparation without inventing results but retains entered evidence", () => {
    const sample = aiSampleFor("lead-dev");
    expect(buildDevPackage(sample)).toContain(
      "No experiment result is recorded"
    );
    expect(buildDevPackage(sample)).not.toContain(
      "AI STALEMATE — EXPERIMENT PLAN"
    );
    expect(
      buildDevPackage({ ...sample, quality: "Observed reviewer finding" })
    ).toContain("Observed reviewer finding");
    expect(
      buildDevPackage({ ...sample, quality: "Observed reviewer finding" })
    ).toContain("AI STALEMATE — RESULTS RECORD");
    expect(
      JSON.parse(sample.qualityChecks).every(
        (x: { status: string }) => x.status === "NOT CHECKED"
      )
    ).toBe(true);
  });
  it("keeps the walkthrough, per-step examples, and guide links aligned", () => {
    const sample = aiSampleFor("lead-dev");
    for (const step of aiLabFor("lead-dev").steps) {
      for (const f of step.fields)
        expect(Object.hasOwn(sample, f.id), f.id).toBe(true);
    }
    AI_DEV_GUIDE_CHAPTERS.forEach((chapter, step) =>
      expect(fieldToolLabStep("ai-stalemate", chapter, "lead-dev")).toBe(step)
    );
    const scenes = devWalkthrough(sample);
    expect(scenes).toHaveLength(5);
    expect(scenes[1].record).toContain(sample.engineeringPosition);
    expect(scenes[4].record).toContain("No experiment result is recorded");
  });
});
