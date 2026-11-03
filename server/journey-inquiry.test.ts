import { describe, it, expect } from "vitest";
import {
  addJourneyFinding,
  emptyJourneyDraft,
  prepareJourneyPlan,
  journeyPlanTemplate,
  journeyWorkingQuestion,
  journeySuggestedAction,
  journeySummary,
  readJourneyDraft,
  JOURNEY_STAGES,
} from "../client/src/lib/delivery-journey";
import {
  emptyJourneyInquiry,
  inquiryOptions,
  suggestedNextKind,
} from "../client/src/lib/journey-inquiry";
const finding = () =>
  addJourneyFinding(emptyJourneyDraft(), "check-1-1").findings[0];

describe("inquiry before action", () => {
  it("starts with a question when context, influence, or previous attempts are unknown", () => {
    const q = emptyJourneyInquiry();
    expect(suggestedNextKind(q, "")).toBe("check");
    q.context = "commitments";
    q.influence = "team";
    expect(suggestedNextKind(q, "Ready Tuesday; first review Friday")).toBe(
      "check"
    );
    q.tried = "not-yet";
    expect(suggestedNextKind(q, "Ready Tuesday; first review Friday")).toBe(
      "try"
    );
    q.context = "other";
    expect(suggestedNextKind(q, "Another situation")).toBe("check");
  });
  it("adapts to commitments, specialist knowledge, and another team's priorities without claiming a root cause", () => {
    const f = finding();
    f.inquiry.context = "specialist";
    expect(journeyWorkingQuestion(f)).toContain("expertise or approval");
    expect(journeySuggestedAction(f)).toContain("supported second reviewer");
    f.inquiry.context = "other-team";
    f.inquiry.influence = "outside";
    f.inquiry.tried = "not-yet";
    expect(suggestedNextKind(f.inquiry, "We waited")).toBe("discuss");
    expect(journeySuggestedAction(f)).toContain("people who can agree");
    expect(journeySuggestedAction(f)).toContain(
      "do not create a deadline on their behalf"
    );
  });
  it("brings a previous attempt into the question and the conversation draft", () => {
    const f = finding();
    f.observation = "Review waited three days.";
    f.inquiry = {
      ...emptyJourneyInquiry(),
      context: "commitments",
      tried: "yes",
      attempt: "Asked for reviews sooner",
      obstacle: "Commitments stayed unchanged",
      influence: "team",
    };
    expect(suggestedNextKind(f.inquiry, f.observation)).toBe("discuss");
    expect(journeyWorkingQuestion(f)).toContain(
      "different from the previous attempt"
    );
    const next = prepareJourneyPlan(f, "discuss");
    expect(next.plan.second).toContain(f.inquiry.obstacle);
    expect(journeyPlanTemplate(next).title).toContain("conversation");
    expect(next.plan.owner).toBe("");
    expect(next.plan.reviewOn).toBe("");
  });
  it("can leave with a bounded question instead of a process change", () => {
    const f = finding();
    f.inquiry.otherView = "Ask Jo what filled the gap.";
    const next = prepareJourneyPlan(f, "check");
    expect(next.plan.kind).toBe("check");
    expect(next.plan.second).toBe(f.inquiry.otherView);
    expect(next.plan.measure).toContain("still uncertain");
    expect(next.plan.decision).toBe("unreviewed");
    expect(journeyPlanTemplate(next).first).toBe(
      "What do we need to find out?"
    );
  });
  it("preserves old saved plans and supplies empty inquiry fields without manufacturing history", () => {
    const f = finding();
    const old = { ...f } as Record<string, unknown>;
    delete old.inquiry;
    old.plan = {
      prepared: true,
      first: "Our original reviewer agreement",
      owner: "Jo",
      change: "Already edited",
      decision: "adjust",
    };
    const d = readJourneyDraft(
      JSON.stringify({ version: 1, draft: { findings: [old] } })
    );
    expect(d.findings[0].inquiry).toEqual(emptyJourneyInquiry());
    expect(d.findings[0].plan.kind).toBe("try");
    expect(prepareJourneyPlan(d.findings[0], "check")).toEqual(d.findings[0]);
    expect(journeySummary(d, false)).toContain(
      "Our original reviewer agreement"
    );
  });
  it("round trips question drafts, context, prior attempts and missing perspectives in exports", () => {
    const d = addJourneyFinding(emptyJourneyDraft(), "check-1-1");
    d.findings[0].inquiry = {
      context: "other",
      detail: "Vendor owns the review",
      tried: "yes",
      attempt: "Sent a request",
      obstacle: "No owner identified",
      influence: "outside",
      otherView: "Ask the vendor lead",
    };
    d.findings[0] = prepareJourneyPlan(d.findings[0], "check");
    expect(readJourneyDraft(JSON.stringify({ version: 1, draft: d }))).toEqual(
      d
    );
    const text = journeySummary(d, false);
    for (const value of [
      "Vendor owns the review",
      "Sent a request",
      "No owner identified",
      "Ask the vendor lead",
      "One question to investigate",
    ])
      expect(text).toContain(value);
  });
  it("rejects invalid saved context and influence and offers inquiry for every current case", () => {
    const d = readJourneyDraft(
      JSON.stringify({
        version: 1,
        draft: {
          findings: [
            {
              caseId: "check-1-1",
              inquiry: {
                context: "environment",
                tried: "definitely",
                influence: "authorized",
                detail: 42,
              },
              plan: { kind: "approved" },
            },
          ],
        },
      })
    );
    expect(d.findings[0].inquiry).toEqual(emptyJourneyInquiry());
    expect(d.findings[0].plan.kind).toBe("try");
    for (const c of JOURNEY_STAGES.flatMap(s =>
      s.symptoms.flatMap(s => s.cases)
    )) {
      const options = inquiryOptions(c.id);
      expect(new Set(options.map(o => o.id)).size).toBe(options.length);
      expect(options.length).toBeGreaterThan(1);
      options.forEach(o => {
        expect(o.question.length).toBeGreaterThan(20);
        expect(o.action.length).toBeGreaterThan(20);
      });
    }
  });
});
