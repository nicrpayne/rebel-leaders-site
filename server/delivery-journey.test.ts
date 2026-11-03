import { describe, expect, it } from "vitest";
import {
  JOURNEY_STAGES,
  JOURNEY_TEMPLATES,
  addJourneyFinding,
  emptyJourneyDraft,
  exampleJourneyDraft,
  hasJourneyWork,
  journeyCase,
  journeyStageState,
  journeySummary,
  prepareJourneyPlan,
  readJourneyDraft,
} from "../client/src/lib/delivery-journey";
import {
  exampleShippingDraft,
  readShippingDraft,
} from "../client/src/lib/shipping-sooner";
import {
  exampleReleaseDraft,
  readReleaseDraft,
} from "../client/src/lib/first-release";

describe("delivery journey", () => {
  it("does not turn an unexplored journey into a diagnosis, zero delay, or invented data", () => {
    const d = emptyJourneyDraft();
    expect(hasJourneyWork(d)).toBe(false);
    for (const s of JOURNEY_STAGES)
      expect(journeyStageState(d, s.id).state).toBe("unexplored");
    const text = journeySummary(d, false);
    expect(text).toContain("This does not establish that there are none");
    expect(text).toContain("[outcome to agree]");
    expect(text).not.toContain("Friday");
    expect(text).not.toContain("% faster");
  });
  it("keeps concurrent explanations and rework loops without declaring one the bottleneck", () => {
    const d = exampleJourneyDraft();
    expect(journeyStageState(d, "check").findings).toHaveLength(2);
    const text = journeySummary(d, true);
    expect(text).toContain("Illustrative example");
    expect(text).toContain("Reviewers were busy");
    expect(text).toContain("We disagreed about what it should do");
    expect(text).toContain("Possible return: Check → Shape");
    expect(text.match(/A hunch to check/g)).toHaveLength(2);
  });
  it("revisiting a saved cause preserves its edited plan and observation", () => {
    let d = addJourneyFinding(emptyJourneyDraft(), "check-1-1");
    d.findings[0] = prepareJourneyPlan(d.findings[0]);
    d.findings[0].observation = "We looked at three recent reviews.";
    d.findings[0].plan.change = "A specific team agreement";
    const again = addJourneyFinding(d, "check-1-1");
    expect(again.findings).toHaveLength(1);
    expect(prepareJourneyPlan(again.findings[0])).toEqual(d.findings[0]);
    expect(addJourneyFinding(d, "missing")).toBe(d);
  });
  it("maps different explanations to different practical help while leaving commitments unfilled", () => {
    const capacity = journeyCase("check-1-1")!;
    const ownership = journeyCase("check-1-2")!;
    expect(capacity.cause.action).toContain("Start less new work");
    expect(ownership.cause.action).toContain("reviewer and backup");
    expect(journeyCase("shape-2-1")!.cause.tool).toBe("slice");
    const d = addJourneyFinding(emptyJourneyDraft(), "check-1-1");
    const f = prepareJourneyPlan(d.findings[0]);
    expect(f.plan.owner).toBe("");
    expect(f.plan.reviewOn).toBe("");
    expect(f.plan.result).toBe("");
    expect(f.plan.decision).toBe("unreviewed");
    expect(f.evidence).toBe("hunch");
    expect(f.plan.protect).toContain("normal working hours");
  });
  it("keeps unknown, nothing noticed, and recognised issues distinct, including unanswered questions in a marked stage", () => {
    let d = emptyJourneyDraft();
    d.unknown = ["release", "check"];
    d.clear = ["shape"];
    d.questions.check = "Does the reviewer have enough context?";
    expect(journeyStageState(d, "release").state).toBe("unknown");
    expect(journeyStageState(d, "shape").state).toBe("clear");
    d = addJourneyFinding(d, "check-1-1");
    expect(journeyStageState(d, "check").state).toBe("noticed");
    expect(journeySummary(d, false)).toContain(d.questions.check);
    d = addJourneyFinding(d, "shape-1-1");
    expect(d.clear).not.toContain("shape");
  });
  it("round trips personal evidence and several saved plans, including an unfinished result", () => {
    const d = exampleJourneyDraft();
    d.findings = d.findings.map(prepareJourneyPlan);
    d.findings[0].evidence = "checked";
    d.findings[0].plan.owner = "Alex and Jo";
    d.findings[0].plan.reviewOn = "2026-11-13";
    d.findings[0].plan.result =
      "Review started earlier, but this change was also smaller.";
    d.findings[0].plan.decision = "adjust";
    expect(readJourneyDraft(JSON.stringify({ version: 1, draft: d }))).toEqual(
      d
    );
    const text = journeySummary(d, false);
    expect(text).toContain("CHOSEN NEXT STEP — A review agreement");
    expect(text).toContain("SAVED DRAFT");
    expect(text).toContain("not proof of causation");
    expect(text).toContain("[owner to agree]");
    expect(text).toContain("Next decision: adjust");
    expect(text).toContain("Next decision: Not made yet");
  });
  it("handles damaged storage conservatively instead of inventing checked evidence or valid ownership", () => {
    const d = readJourneyDraft(
      JSON.stringify({
        version: 1,
        draft: {
          name: 8,
          findings: [
            null,
            { caseId: "not-real" },
            {
              caseId: "check-1-1",
              evidence: true,
              plan: { prepared: "yes", decision: "approved", owner: 99 },
            },
            { caseId: "check-1-1" },
          ],
          unknown: ["release", "release", "magic"],
          clear: ["check"],
          focus: "bad",
          questions: {
            release: "Who can release?",
            secret: "discard",
            build: 9,
          },
        },
      })
    );
    expect(d.name).toBe("");
    expect(d.findings).toHaveLength(1);
    expect(d.findings[0].evidence).toBe("hunch");
    expect(d.findings[0].plan.prepared).toBe(false);
    expect(d.findings[0].plan.owner).toBe("");
    expect(d.findings[0].plan.decision).toBe("unreviewed");
    expect(d.clear).toEqual([]);
    expect(d.unknown).toEqual(["release"]);
    expect(d.questions).toEqual({ release: "Who can release?" });
    expect(d.focus).toBe(null);
    for (const raw of [
      null,
      "bad",
      "null",
      '{"version":4}',
      '{"version":1,"draft":null}',
    ])
      expect(readJourneyDraft(raw)).toEqual(emptyJourneyDraft());
  });
  it("keeps the example and all older tool storage independent", () => {
    const a = exampleJourneyDraft(),
      b = exampleJourneyDraft();
    a.findings[0].plan.first = "Changed example";
    expect(b.findings[0].plan.first).toBe("");
    const old = exampleShippingDraft(),
      release = exampleReleaseDraft();
    const oldRaw = JSON.stringify({ version: 3, draft: old });
    const releaseRaw = JSON.stringify({ version: 1, draft: release });
    expect(readShippingDraft(oldRaw)).toEqual(old);
    expect(readReleaseDraft(releaseRaw)).toEqual(release);
    expect(readJourneyDraft(oldRaw)).toEqual(emptyJourneyDraft());
    expect(readJourneyDraft(releaseRaw)).toEqual(emptyJourneyDraft());
  });
  it("every path resolves to a complete, distinct action and a valid return stage", () => {
    const cases = JOURNEY_STAGES.flatMap(s =>
      s.symptoms.flatMap(sy => sy.cases)
    );
    expect(new Set(cases.map(c => c.id)).size).toBe(cases.length);
    for (const c of cases) {
      expect(journeyCase(c.id)?.cause).toBe(c);
      expect(JOURNEY_TEMPLATES[c.tool]).toBeDefined();
      for (const field of ["check", "action", "people", "watch"] as const)
        expect(c[field].length).toBeGreaterThan(20);
      if (c.returnsTo)
        expect(JOURNEY_STAGES.some(s => s.id === c.returnsTo)).toBe(true);
    }
  });
});
