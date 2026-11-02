import { describe, expect, it } from "vitest";
import {
  actionSummary,
  emptyShippingAction,
  planMissing,
  readShippingAction,
  selectShippingMove,
  suggestedMoves,
} from "../client/src/lib/shipping-actions";
import {
  emptyShippingDraft,
  exampleShippingDraft,
  readShippingDraft,
  shippingComparison,
} from "../client/src/lib/shipping-sooner";

describe("Shipping sooner experiments", () => {
  it("offers relevant actions for access delays and an investigation when the cause is unknown", () => {
    expect(suggestedMoves("waiting-access").map(move => move.id)).toEqual([
      "access",
      "release-path",
    ]);
    expect(suggestedMoves("unknown")[0].id).toBe("trace");
    expect(suggestedMoves("not-a-cause")).toEqual([]);
    const draft = emptyShippingDraft();
    draft.action = selectShippingMove(
      { ...draft.action, cause: "waiting-access" },
      "access"
    );
    expect(draft.action.plans.access.protect).toContain("least privilege");
    expect(shippingComparison(draft)).toBeNull(); // Useful action without invented timing.
    expect(draft.now).toEqual(emptyShippingDraft().now);
  });
  it("restores edited plans when someone explores another option or cause", () => {
    let action = selectShippingMove(
      { ...emptyShippingAction(), cause: "waiting-access" },
      "access"
    );
    action.plans.access.owner = "Sam and the identity team";
    action.plans.access.change = "Agree access for the pilot group";
    action = selectShippingMove(action, "release-path");
    action.plans["release-path"].owner = "Rae";
    action = selectShippingMove(
      { ...action, cause: "waiting-decision", move: "" },
      "decision"
    );
    action = selectShippingMove(
      { ...action, cause: "waiting-access", move: "" },
      "access"
    );
    expect(action.plans.access.owner).toBe("Sam and the identity team");
    expect(action.plans.access.change).toBe("Agree access for the pilot group");
    expect(action.plans["release-path"].owner).toBe("Rae");
    expect(selectShippingMove(action, "unknown-command")).toEqual(action);
  });
  it("preserves existing v1 timing drafts and round-trips the expanded draft", () => {
    const { action: unused, ...legacy } = exampleShippingDraft();
    legacy.name = "Existing customer draft";
    legacy.now.waiting = "7.5";
    legacy.scenario.review = "";
    const migrated = readShippingDraft(
      JSON.stringify({ version: 1, draft: legacy })
    );
    expect(migrated).toEqual({ ...legacy, action: emptyShippingAction() });
    migrated.action = selectShippingMove(
      { ...migrated.action, cause: "waiting-access" },
      "access"
    );
    migrated.action.plans.access.result =
      "Access took two days; no extra support work.";
    migrated.action.plans.access.next = "keep";
    expect(
      readShippingDraft(JSON.stringify({ version: 2, draft: migrated }))
    ).toEqual(migrated);
  });
  it("keeps valid plan text but ignores invalid selections and unexpected stored fields", () => {
    const action = readShippingAction({
      cause: "waiting-access",
      observation: "x".repeat(4000),
      move: "decision",
      plans: {
        decision: { owner: "Jo", next: "force" },
        injected: { owner: "no" },
      },
    });
    expect(action.move).toBe("");
    expect(action.plans.injected).toBeUndefined();
    expect(action.observation).toHaveLength(3000);
    expect(action.plans.decision.owner).toBe("Jo");
    expect(action.plans.decision.next).toBe("undecided");
  });
  it("exports unfinished plans honestly and preserves later observations", () => {
    let action = selectShippingMove(
      { ...emptyShippingAction(), cause: "waiting-access" },
      "access"
    );
    expect(planMissing("", action.plans.access)).toEqual([
      "piece of work",
      "owner",
      "check-in",
    ]);
    let text = actionSummary("", action, false);
    expect(text).toContain("Draft — still to agree");
    expect(text).toContain("A proposal to discuss");
    expect(text).toContain("No result recorded yet");
    expect(text).toContain("no predicted saving");
    action.plans.access.owner = "Sam";
    action.plans.access.checkWhen = "Friday";
    action.plans.access.result =
      "Less waiting, but more support requests. Need to simplify.";
    action.plans.access.next = "adapt";
    text = actionSummary("Request form", action, true);
    expect(text).toContain("Illustrative example");
    expect(text).toContain("Ready to discuss");
    expect(text).toContain("more support requests");
    expect(text).toContain("Next move: Change the approach");
    expect(text).toContain("quality/rework, and the load on people");
  });
  it("lets users start a blank custom experiment without pretending a suggestion was chosen", () => {
    const action = selectShippingMove(
      { ...emptyShippingAction(), cause: "unknown" },
      "custom"
    );
    expect(planMissing("", action.plans.custom)).toHaveLength(7);
    expect(actionSummary("", action, false)).toContain(
      "Change to try: Not yet chosen"
    );
  });
});
