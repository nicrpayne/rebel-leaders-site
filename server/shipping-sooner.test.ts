import { describe, expect, it } from "vitest";
import {
  deliveryDays,
  emptyShippingDraft,
  exampleShippingDraft,
  readShippingDraft,
  shippingComparison,
  shippingSummary,
  unchangedScenario,
} from "../client/src/lib/shipping-sooner";

describe("Shipping sooner scenarios", () => {
  it("halving the coding tenth saves 5% of the whole elapsed time", () => {
    expect(shippingComparison(exampleShippingDraft())).toMatchObject({
      current: 20,
      scenario: 19,
      saved: 1,
      percent: 5,
      codingShare: 10,
      codingOnlySaved: 1,
      codingOnlyTotal: 19,
      codingOnlyPercent: 5,
    });
  });
  it("also shows substantial gains when coding accounts for most of the time", () => {
    const draft = emptyShippingDraft();
    draft.now = {
      coding: "8",
      review: "1",
      rework: "0",
      waiting: "1",
      release: "0",
    };
    draft.scenario.coding = "4";
    expect(shippingComparison(draft)).toMatchObject({
      current: 10,
      scenario: 6,
      percent: 40,
    });
  });
  it("includes extra review work and can show a slower result", () => {
    const draft = exampleShippingDraft();
    draft.scenario.review = "5";
    expect(shippingComparison(draft)).toMatchObject({
      current: 20,
      scenario: 21,
      saved: -1,
      percent: -5,
    });
    expect(shippingSummary(draft, false)).toContain("5% more elapsed time");
  });
  it("compares a combined process change independently of the coding-only scenario", () => {
    const draft = exampleShippingDraft();
    draft.scenario.waiting = "6";
    expect(shippingComparison(draft)).toMatchObject({
      scenario: 13,
      percent: 35,
      codingOnlyTotal: 19,
    });
  });
  it("lets unchanged stages follow baseline edits without changing explicit scenario inputs", () => {
    const draft = exampleShippingDraft();
    draft.now.waiting = "4";
    draft.now.coding = "6";
    expect(shippingComparison(draft)).toMatchObject({
      current: 16,
      scenario: 11,
    });
  });
  it("does not present unknown or invalid time as zero or a saving", () => {
    for (const value of ["", " ", "-1", "Infinity", "NaN", "abc", "1000001"]) {
      const draft = exampleShippingDraft();
      draft.now.review = value;
      expect(deliveryDays(value)).toBeNull();
      expect(shippingComparison(draft)).toBeNull();
      expect(shippingSummary(draft, false)).toBe("");
    }
    const draft = exampleShippingDraft();
    draft.scenario.review = "";
    expect(shippingComparison(draft)).toBeNull();
  });
  it("handles zero, equal, and fractional totals without false improvements", () => {
    const draft = exampleShippingDraft();
    draft.scenario = unchangedScenario();
    expect(shippingComparison(draft)?.saved).toBe(0);
    draft.now = {
      coding: "0",
      review: "0",
      rework: "0",
      waiting: "0",
      release: "0",
    };
    expect(shippingComparison(draft)).toBeNull();
    draft.now.coding = "0.5";
    draft.scenario.coding = "0";
    expect(shippingComparison(draft)).toMatchObject({
      scenario: 0,
      percent: 100,
    });
    draft.now = {
      coding: "0.1",
      review: "0.2",
      rework: "0",
      waiting: "0",
      release: "0",
    };
    draft.scenario = { ...unchangedScenario(), coding: "0.2", review: "0.1" };
    expect(shippingComparison(draft)?.saved).toBe(0);
  });
  it("keeps the scenario assumptions and example provenance in the exported comparison", () => {
    const text = shippingSummary(exampleShippingDraft(), true);
    expect(text).toContain("Illustrative example — not measured team data");
    expect(text).toContain("20 → 19 working days");
    expect(text).toContain("non-overlapping elapsed time");
    expect(text).toContain("not a delivery forecast");
  });
  it("restores its own versioned draft and rejects damaged storage", () => {
    const draft = exampleShippingDraft();
    expect(readShippingDraft(JSON.stringify({ version: 1, draft }))).toEqual(
      draft
    );
    for (const raw of [
      null,
      "{",
      "null",
      "{}",
      '{"version":2}',
      JSON.stringify({ version: 1, draft: { name: "bad" } }),
    ]) {
      expect(readShippingDraft(raw)).toEqual(emptyShippingDraft());
    }
  });
});
