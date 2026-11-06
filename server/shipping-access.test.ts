import { describe, expect, it } from "vitest";
import {
  accessQuestions,
  accessRequest,
  emptyAccessDraft,
  exampleAccessDraft,
  hasAccessWork,
  readAccessDraft,
} from "../client/src/lib/shipping-access";
import {
  emptyShippingDraft,
  exampleShippingDraft,
  readShippingDraft,
} from "../client/src/lib/shipping-sooner";

describe("AI app access request", () => {
  it("keeps each group's records and actions distinct, with unknown actions explicit", () => {
    const draft = exampleAccessDraft();
    draft.groups[1].actions = [];
    const text = accessRequest(draft, false);
    expect(text).toContain(
      "1. Pilot coordinators\n   Records: Requests assigned to their team\n   Proposed actions: View, Add, Change"
    );
    expect(text).toContain(
      "2. Team leads\n   Records: Requests owned by their team\n   Proposed actions: [actions to confirm]"
    );
    expect(text).not.toContain("Export");
    expect(text).toContain("access outside them will be denied");
    expect(accessQuestions(draft)).toContain(
      "What should Team leads be allowed to do with those records?"
    );
  });
  it("distinguishes coding AI from runtime AI without losing a previously entered service", () => {
    const draft = exampleAccessDraft();
    draft.aiService = "Test service, request summaries only; retention unknown";
    expect(accessRequest(draft, false)).not.toContain(draft.aiService);
    expect(accessRequest(draft, false)).toContain(
      "AI inside the app is not part of this request"
    );
    draft.aiUse = "feature";
    expect(accessRequest(draft, false)).toContain(draft.aiService);
    expect(accessQuestions(draft).some(q => q.includes("coding tool"))).toBe(
      false
    );
    draft.aiUse = "both";
    expect(accessQuestions(draft).some(q => q.includes("coding tool"))).toBe(
      true
    );
    expect(accessQuestions(draft).some(q => q.includes("retention"))).toBe(
      true
    );
    expect(draft.aiService).toBe(
      "Test service, request summaries only; retention unknown"
    );
  });
  it("asks different next questions for existing and missing setup without treating either as approved", () => {
    const draft = exampleAccessDraft();
    expect(
      accessQuestions(draft).some(q => q.includes("still need work"))
    ).toBe(true);
    draft.path = "existing";
    expect(
      accessQuestions(draft).some(q =>
        q.includes("existing access setup enforce")
      )
    ).toBe(true);
    expect(accessRequest(draft, false)).toContain(
      "access has not been approved"
    );
    expect(accessRequest(draft, false)).toContain(
      "existing access setup to check for fit"
    );
  });
  it("exports gaps as questions and never invents users, permissions, or a recipient", () => {
    const draft = emptyAccessDraft();
    expect(hasAccessWork(draft)).toBe(false);
    const text = accessRequest(draft, false);
    expect(text).toContain("[app name to confirm]");
    expect(text).toContain("[system / identity owner]");
    expect(text).toContain("[record boundary to confirm]");
    expect(text).toContain("AI use is still to be agreed");
    expect(text).not.toContain("Pilot coordinators");
    expect(text).not.toContain("Illustrative example");
    draft.groups[0].actions = ["Add"];
    expect(hasAccessWork(draft)).toBe(true);
  });
  it("marks examples and emits a usable request including timing and a reply to ask for", () => {
    const text = accessRequest(exampleAccessDraft(), true);
    expect(text).toContain("ILLUSTRATIVE EXAMPLE");
    expect(text).toContain("Subject: Access setup for Pilot request tracker");
    expect(text).toContain("Before we commit to the pilot date");
    expect(text).toContain("Please reply with the approved route");
    expect(text).toContain("an estimate of the work involved");
  });
  it("normalizes damaged saved requests without adding permissions", () => {
    const draft = readAccessDraft({
      name: "x".repeat(500),
      aiUse: "automatic",
      path: "approved",
      groups: [
        {
          name: "Operators",
          scope: "Own team",
          actions: ["Admin", "Export", "Export"],
        },
        null,
      ],
    });
    expect(draft.name).toHaveLength(180);
    expect(draft.aiUse).toBe("unknown");
    expect(draft.path).toBe("unknown");
    expect(draft.groups).toEqual([
      { name: "Operators", scope: "Own team", actions: ["Export"] },
    ]);
    expect(readAccessDraft({ groups: [] }).groups).toHaveLength(1);
  });
  it("migrates v1 and v2 without changing existing timing or experiment work", () => {
    const { access, ...legacy } = exampleShippingDraft();
    legacy.action.plans.decision.owner = "Existing owner";
    legacy.now.coding = "9";
    for (const version of [1, 2]) {
      const restored = readShippingDraft(
        JSON.stringify({ version, draft: legacy })
      );
      expect(restored).toEqual({ ...legacy, access: emptyAccessDraft() });
    }
    const draft = emptyShippingDraft();
    draft.access = exampleAccessDraft();
    expect(readShippingDraft(JSON.stringify({ version: 3, draft }))).toEqual(
      draft
    );
  });
});
