import { describe, it, expect } from "vitest";
import { aiGuideFor, aiLabFor } from "./field-tool-content/ai-paths";
import { AI_READINESS_SAMPLE } from "./field-tool-content/ai-readiness";
import {
  buildAITrialPackage,
  buildReadinessBrief,
  buildTrialCard,
  buildDecisionBrief,
} from "../client/src/lib/ai-trial";
import { readAIFieldToolDraft } from "../client/src/lib/field-tool-drafts";

describe("readiness before AI trials", () => {
  it("offers distinct role language and aligned business/system/team decisions", () => {
    const pm = aiLabFor("pm"),
      dev = aiLabFor("lead-dev");
    for (const lab of [pm, dev]) {
      expect(lab.steps.map(s => s.eyebrow)).toEqual([
        "PRIVATE PREP",
        "READINESS",
        "SHARED WORK",
        "EVIDENCE",
        "DECISION",
      ]);
      expect(lab.steps[1].fields.map(f => f.id)).toEqual([
        "businessContext",
        "businessBasis",
        "growthOpportunity",
        "accessModel",
        "securityChecks",
        "automationBoundary",
        "teamReadiness",
        "readinessSupport",
        "readinessDecision",
        "prerequisitePlan",
      ]);
      expect(lab.outputs?.find(o => o.id === "readiness-brief")?.fromStep).toBe(
        1
      );
      expect(lab.outputs?.find(o => o.id === "trial-card")?.fromStep).toBe(2);
      expect(lab.outputs?.find(o => o.id === "evidence-record")?.fromStep).toBe(
        3
      );
      expect(lab.outputs?.find(o => o.id === "decision-brief")?.fromStep).toBe(
        4
      );
      expect(lab.steps[0].fields.some(f => f.id === "side")).toBe(false);
    }
    expect(pm.steps[1].fields[0].label).not.toBe(dev.steps[1].fields[0].label);
    expect(pm.steps[2].fields.map(f => f.id)).toEqual(
      dev.steps[2].fields.map(f => f.id)
    );
  });
  it("exports preparation with owners and limitations without inventing a trial result", () => {
    const text = buildAITrialPackage(AI_READINESS_SAMPLE);
    expect(text).toContain("READINESS BRIEF");
    expect(text).toContain("PAUSE");
    expect(text).toContain("Finance has not validated");
    expect(text).toContain("next Tuesday");
    expect(text).not.toContain("TRIAL CARD");
    expect(text).not.toContain("EVIDENCE RECORD");
    expect(text).not.toContain("97 person-minutes");
    expect(text).toContain("No trial result is recorded");
  });
  it("keeps private motives and Why out of every new shared record", () => {
    const values = {
      ...AI_READINESS_SAMPLE,
      story: "PRIVATE_MOTIVE",
      why: "PRIVATE_WHY",
      futurePicture: "PRIVATE_FUTURE",
      businessContext: "Shared sponsor estimate",
    };
    for (const build of [
      buildReadinessBrief,
      buildTrialCard,
      buildDecisionBrief,
      buildAITrialPackage,
    ]) {
      expect(build(values)).not.toContain("PRIVATE_");
    }
    expect(buildReadinessBrief(values)).toContain("Shared sponsor estimate");
  });
  it("carries access boundaries and reviewer support into an approved trial design", () => {
    const card = buildTrialCard({
      ...AI_READINESS_SAMPLE,
      readinessDecision: "READY FOR A BOUNDED TEST",
      task: "Approved synthetic-data test",
    });
    expect(card).toContain("Approved synthetic-data test");
    expect(card).toContain("No agent access to production data");
    expect(card).toContain("qualified reviewer");
  });
  it("retains existing measurements when preparation is needed for a next use", () => {
    const values = {
      ...AI_READINESS_SAMPLE,
      quality: "Prior test passed",
      task: "Previous trial",
      ...Object.fromEntries(
        [
          "setup",
          "drafting",
          "verification",
          "review",
          "rework",
          "followup",
        ].flatMap(id => [
          ["baseline_" + id, "10"],
          ["ai_" + id, "12"],
        ])
      ),
    };
    expect(buildDecisionBrief(values)).toContain(
      "60 person-minutes without AI; 72 with AI"
    );
    expect(buildAITrialPackage(values)).toContain("EVIDENCE RECORD");
  });
  it("keeps the Guide aligned with the new readiness and preparation example", () => {
    for (const role of ["pm", "lead-dev"] as const) {
      const pages = aiGuideFor(role);
      expect(pages).toHaveLength(12);
      expect(pages[4].eyebrow).toBe("05 / SHARE THE BUSINESS CONTEXT");
      expect(pages[5].eyebrow).toBe("06 / PROTECT THE SYSTEM");
      expect(pages[6].eyebrow).toBe("07 / PREPARE THE TEAM");
      expect(pages[10].sections.map(s => s.body).join(" ")).toContain(
        "No AI productivity result has been measured"
      );
    }
  });
  it("preserves old trial/evidence/decision draft phases and never shifts a new draft twice", () => {
    for (const oldStep of [1, 2, 3])
      expect(
        readAIFieldToolDraft(
          {
            getItem: () =>
              JSON.stringify({ step: oldStep, values: { task: "Keep this" } }),
          },
          "draft"
        )
      ).toEqual({ step: oldStep + 1, values: { task: "Keep this" } });
    expect(
      readAIFieldToolDraft(
        {
          getItem: () =>
            JSON.stringify({
              version: 2,
              step: 1,
              values: { businessContext: "Keep this" },
            }),
        },
        "draft"
      )
    ).toEqual({ step: 1, values: { businessContext: "Keep this" } });
    expect(readAIFieldToolDraft({ getItem: () => "broken" }, "draft")).toEqual({
      step: 0,
      values: {},
    });
  });
});
