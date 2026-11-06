import { describe, expect, it } from "vitest";
import { buildReadinessBrief } from "../client/src/lib/ai-trial";
import { buildDevConversation } from "../client/src/lib/ai-dev-trial";

describe("a short first conversation", () => {
  it("builds useful PM notes from three answers without a page of empty prompts", () => {
    const output = buildReadinessBrief({
      businessContext: "Support copies every request twice.",
      counterpartConcern: "My lead needs time for review.",
      prerequisitePlan: "Ask Sam on Friday which small task we could explore.",
      happened: "PRIVATE THOUGHT",
    });
    expect(output).toContain("PROPOSED — NOT YET AGREED");
    expect(output).toContain("Support copies every request twice.");
    expect(output).toContain("My lead needs time for review.");
    expect(output).toContain("Ask Sam on Friday");
    expect(output).not.toMatch(
      /PRIVATE THOUGHT|Add this before sharing|Choose what you want/
    );
  });
  it("keeps a developer's known gap visible without inventing optional evidence", () => {
    const output = buildDevConversation({
      changeRequested: "Use agents to build the restricted-data app.",
      engineeringPosition: "We have no permissions model for these records.",
      prerequisitePlan: "Ask Platform and the data owner to meet Friday.",
      accessModel: "Only the operations team may see these records.",
      protecting: "PRIVATE THOUGHT",
    });
    expect(output).toContain("PROPOSED — NOT YET AGREED");
    expect(output).toContain("We have no permissions model");
    expect(output).toContain("Only the operations team");
    expect(output).not.toMatch(
      /PRIVATE THOUGHT|Add what is relevant|SECURITY CHECKS/
    );
  });
  it("does not imply agreement or hide saved optional answers", () => {
    for (const build of [buildReadinessBrief, buildDevConversation]) {
      const output = build({
        conversationStatus: "STILL DISAGREE",
        openQuestions: "Who has time to review?",
        readinessDecision: "PREPARE FIRST",
        securityChecks: "Denied requests have not been tested.",
      });
      expect(output).toContain("Who has time to review?");
      expect(output).toContain("Denied requests have not been tested.");
      expect(output).not.toContain("AGREED TOGETHER");
    }
  });
});
