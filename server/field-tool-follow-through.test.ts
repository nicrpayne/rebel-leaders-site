import { describe, expect, it } from "vitest";
import { LEADERSHIP_LABS } from "./field-tool-content/leadership-labs";
import { LEADERSHIP_GUIDE_PAGES } from "./field-tool-content/leadership-guides";
import { FIELD_TOOL_GUIDE_CHAPTERS } from "../client/src/lib/field-tool-workflow";
import {
  buildDeadlineUpdate,
  buildMandateRequest,
  buildRightsMap,
  buildTradeoffBrief,
} from "../client/src/lib/leadership-output";
import { aiLabFor } from "./field-tool-content/ai-paths";
import { buildTrialCard, buildDecisionBrief } from "../client/src/lib/ai-trial";

describe("working records follow the actual conversation", () => {
  it("offers decision-rights and conversation records only after their input steps", () => {
    for (const slug of ["mandate-reset", "when-the-team-goes-quiet"]) {
      const lab = LEADERSHIP_LABS[slug];
      expect(lab.outputs!.filter(o => o.fromStep <= 0)).toEqual([]);
      expect(lab.outputs!.filter(o => o.fromStep <= 1)).toHaveLength(1);
      expect(lab.outputs!.filter(o => o.fromStep <= 2)).toHaveLength(2);
    }
  });
  it("links options and commitment fields to the corresponding teaching", () => {
    expect(
      LEADERSHIP_GUIDE_PAGES["deadline-reset"][
        FIELD_TOOL_GUIDE_CHAPTERS["deadline-reset"][1]
      ].eyebrow
    ).toContain("COMPARE THE OPTIONS");
    expect(
      LEADERSHIP_GUIDE_PAGES["priority-whiplash"][
        FIELD_TOOL_GUIDE_CHAPTERS["priority-whiplash"][1]
      ].eyebrow
    ).toContain("WHAT WOULD CHANGE");
    expect(
      LEADERSHIP_GUIDE_PAGES["when-the-team-goes-quiet"][
        FIELD_TOOL_GUIDE_CHAPTERS["when-the-team-goes-quiet"][2]
      ].eyebrow
    ).toContain("LISTEN AND CHECK");
  });
  it("includes entered fallbacks and keeps absent optional additions out of exports", () => {
    const values = {
      unresolvedPlan: "Continue approved work; revisit Friday with sponsor.",
      privateReaction: "PRIVATE",
    };
    for (const build of [
      buildDeadlineUpdate,
      buildMandateRequest,
      buildTradeoffBrief,
    ]) {
      expect(build(values)).toContain(values.unresolvedPlan);
      expect(build(values)).not.toContain("PRIVATE");
      expect(build({})).not.toContain(
        "IF NO DECISION IS REACHED / INTERIM MOVE / REVISIT"
      );
    }
    expect(
      buildDeadlineUpdate({
        checkpointFallback: "Sponsor chooses reduced scope Thursday",
      })
    ).toContain("Sponsor chooses reduced scope Thursday");
    expect(
      buildTradeoffBrief({
        emergencyException: "Incident owner; stop demo; review at 16:00",
      })
    ).toContain("Incident owner; stop demo; review at 16:00");
  });
  it("distinguishes input, formal agreement, and the final decision in the rights record", () => {
    const output = buildRightsMap({
      consult: "Customer lead contributes input",
      requiredApprovals: "Security release approval",
      approve: "Sponsor decides scope",
    });
    expect(output).toContain("WHO WE ASKED FOR ADVICE");
    expect(output).toContain("REQUIRED APPROVAL");
    expect(output).toContain("Makes the call: Sponsor decides scope");
  });
  it("keeps a bounded AI bet separate from wider deployment permission on both paths", () => {
    for (const audience of ["pm", "lead-dev"] as const) {
      const lab = aiLabFor(audience);
      expect(
        lab.steps[2].fields.some(f => f.id === "deploymentPermission")
      ).toBe(true);
      const values = {
        deploymentPermission: "Security owner must approve production access",
        decisionRights: "PM recommends; lead decides test acceptance",
        unresolvedPlan: "Ask sponsor; revisit Friday",
      };
      expect(buildTrialCard(values)).toContain(values.deploymentPermission);
      expect(buildTrialCard(values)).toContain(values.decisionRights);
      expect(buildDecisionBrief(values)).toContain(values.unresolvedPlan);
    }
  });
});
