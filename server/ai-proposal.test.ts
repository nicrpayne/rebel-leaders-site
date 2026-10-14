import { describe, expect, it } from "vitest";
import { communicationDraft } from "../client/src/lib/ai-communication";
import {
  readQualityChecks,
  qualityChecksRecord,
} from "../client/src/lib/ai-quality";
import {
  buildReadinessBrief,
  buildDecisionBrief,
  buildEvidenceRecord,
  buildAITrialPackage,
} from "../client/src/lib/ai-trial";
import { sharedDraftValues } from "../client/src/lib/field-tool-drafts";
import { aiSampleFor } from "./field-tool-content/ai-readiness";
import { aiCompanionFor } from "./field-tool-content/ai-companion";
import { aiGuideFor } from "./field-tool-content/ai-paths";
import { AI_TOOLS, AI_STUDY } from "./field-tool-content/ai-resources";
import { AI_GUIDE_PAGE_COUNT } from "../client/src/lib/ai-product";

describe("AI proposal: usable communication without invented agreement or results", () => {
  it("fills both fictional communication examples without leaving template prompts", () => {
    for (const role of ["pm", "lead-dev"] as const) {
      const sample = aiSampleFor(role);
      for (const id of [
        "conversationLeadershipUpdate",
        "conversationTeamUpdate",
      ]) {
        expect(sample[id]).not.toMatch(/\[[^\]]+\]/);
        expect(sample[id]).toContain("PROPOSED — NOT YET AGREED");
      }
    }
  });
  it("builds updates exclusively from shared context, with an explicit decision request", () => {
    const v = {
      businessContext: "Improve the service",
      counterpartConcern: "Access is unverified",
      readinessDecision: "PREPARE FIRST",
      story: "PRIVATE MOTIVE",
      why: "PRIVATE WHY",
      leadershipReflection: "PRIVATE LEARNING",
    };
    for (const recipient of ["leadership", "team"] as const) {
      const draft = communicationDraft(v, "pm", "conversation", recipient);
      expect(draft).toContain("PROPOSED — NOT YET AGREED");
      expect(draft).toContain("PREPARE FIRST");
      expect(draft).not.toContain("PRIVATE");
    }
    expect(communicationDraft(v, "pm", "conversation", "leadership")).toContain(
      "Decision or support needed from you"
    );
  });
  it("includes phase-specific edits and the shared return record, while excluding reflection", () => {
    const v = {
      ...aiSampleFor("pm"),
      conversationLeadershipUpdate: "START UPDATE",
      conversationTeamUpdate: "START TEAM",
      leadershipUpdate: "FINAL UPDATE",
      teamUpdate: "FINAL TEAM",
      returnRecord: "Reviewed on Friday",
      leadershipReflection: "PRIVATE REFLECTION",
    };
    expect(buildReadinessBrief(v)).toContain("START UPDATE");
    expect(buildReadinessBrief(v)).toContain("START TEAM");
    expect(buildDecisionBrief(v)).toContain("FINAL TEAM");
    expect(buildDecisionBrief(v)).toContain("Reviewed on Friday");
    expect(buildAITrialPackage(v)).not.toContain("PRIVATE REFLECTION");
    expect(sharedDraftValues(v)).not.toHaveProperty("leadershipReflection");
    expect(sharedDraftValues(v)).toHaveProperty("returnRecord");
  });
  it("keeps invalid or absent quality results unknown and preserves contrary evidence", () => {
    expect(qualityChecksRecord()).toContain("NOT CHECKED");
    expect(readQualityChecks("malformed")[0].status).toBe("NOT CHECKED");
    const checks = JSON.stringify([
      {
        check: "Denied access",
        expected: "403",
        status: "FAILED",
        observed: "200",
        evidence: "case-42",
        verifier: "Owner",
      },
      { check: "Acceptance", status: "approved" },
    ]);
    const record = buildEvidenceRecord({ qualityChecks: checks });
    expect(record).toContain("Denied access: FAILED");
    expect(record).toContain("Observed: 200");
    expect(record).toContain("Evidence: case-42");
    expect(record).toContain("Acceptance: NOT CHECKED");
    expect(record).toContain(
      "We need all stages for both methods before comparing them"
    );
  });
  it("does not turn a not-checked checklist into an experiment result", () => {
    const sample = aiSampleFor("pm");
    const record = buildAITrialPackage(sample);
    expect(record).toContain("No experiment result is recorded");
    expect(record).not.toContain("— EVIDENCE RECORD");
    expect(record).not.toContain("— BET BRIEF");
  });
  it("keeps both role paths, companion page counts, and unique resource identities consistent", () => {
    for (const role of ["pm", "lead-dev"] as const) {
      expect(aiGuideFor(role).length + aiCompanionFor(role).length + 1).toBe(
        AI_GUIDE_PAGE_COUNT
      );
      expect(aiSampleFor(role).qualityChecks).toBeDefined();
    }
    const all = [...AI_TOOLS, ...AI_STUDY];
    expect(new Set(all.map(r => r.id)).size).toBe(all.length);
    expect(
      all.every(
        r => r.url.startsWith("https://") && r.pmQuestion && r.devQuestion
      )
    ).toBe(true);
  });
});
