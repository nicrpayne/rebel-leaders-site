import { describe, expect, it } from "vitest";
import {
  PRIVATE_FIELD_IDS,
  purgeSavedReflection,
  readFieldToolDraft,
  sharedDraftValues,
} from "../client/src/lib/field-tool-drafts";
import { aiLabFor } from "./field-tool-content/ai-paths";
import {
  buildAITrialPackage,
  buildReadinessBrief,
} from "../client/src/lib/ai-trial";

describe("private reflection and conversation records", () => {
  it("never serializes or restores private fields, while retaining shared work", () => {
    const values = {
      task: "Keep shared task",
      ai_review: "0",
      ...Object.fromEntries(
        Array.from(PRIVATE_FIELD_IDS).map(id => [id, "PRIVATE_SECRET"])
      ),
    };
    expect(sharedDraftValues(values)).toEqual({
      task: "Keep shared task",
      ai_review: "0",
    });
    expect(
      readFieldToolDraft(
        { getItem: () => JSON.stringify({ values, step: 2 }) },
        "draft",
        5
      )
    ).toEqual({
      values: { task: "Keep shared task", ai_review: "0" },
      step: 2,
    });
  });
  it("scrubs legacy notes without losing shared answers, phase, version, or unrelated storage", () => {
    const entries = new Map([
      [
        "current",
        JSON.stringify({
          version: 2,
          step: 3,
          values: { story: "PRIVATE_SECRET", task: "Keep current" },
        }),
      ],
      [
        "legacy",
        JSON.stringify({
          step: 1,
          values: {
            privateAssumption: "PRIVATE_SECRET",
            request: "Keep legacy",
          },
        }),
      ],
      ["unrelated", "untouched"],
      ["corrupt", "broken"],
    ]);
    const storage = {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => {
        entries.set(key, value);
      },
    };
    purgeSavedReflection(storage, ["current", "legacy", "corrupt"]);
    expect(JSON.parse(entries.get("current")!)).toEqual({
      version: 2,
      step: 3,
      values: { task: "Keep current" },
    });
    expect(JSON.parse(entries.get("legacy")!)).toEqual({
      step: 1,
      values: { request: "Keep legacy" },
    });
    expect(entries.get("unrelated")).toBe("untouched");
    expect(entries.get("corrupt")).toBe("broken");
  });
  it("supports clarification and specialist help without inventing a test or an agreement", () => {
    for (const readinessDecision of [
      "",
      "CLARIFY THE CONVERSATION",
      "ASK A SPECIALIST",
      "PREPARE FIRST",
      "STOP THIS USE",
    ]) {
      const values = {
        readinessDecision,
        counterpartConcern: "Reviewer capacity",
        openQuestions: "Who can verify access?",
        prerequisitePlan: "PM asks data owner Thursday",
        decision: "PAUSE",
        visionCompany: "PRIVATE_SECRET",
      };
      const record = buildAITrialPackage(values);
      expect(record).toContain("PROPOSED — NOT YET AGREED");
      expect(record).toContain("PM asks data owner Thursday");
      expect(record).not.toMatch(/PRIVATE_SECRET|TRIAL CARD|EVIDENCE RECORD/);
      expect(buildReadinessBrief(values)).not.toContain(
        "API / PERMISSION VERIFICATION"
      );
    }
  });
  it("offers the PM a brief private vision exercise while both roles begin with ongoing conversations", () => {
    for (const audience of ["pm", "lead-dev"] as const) {
      const prep = aiLabFor(audience).steps[0];
      expect(prep.fields.find(f => f.id === "happened")?.label).toContain(
        "where do things stand"
      );
      expect(prep.fields.filter(f => f.id.startsWith("vision"))).toHaveLength(
        audience === "pm" ? 3 : 0
      );
    }
  });
});
