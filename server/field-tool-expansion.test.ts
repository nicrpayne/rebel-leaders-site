import { describe, expect, it } from "vitest";
import { LEADERSHIP_EXPANSIONS } from "./field-tool-content/leadership-expansion";
import { LEADERSHIP_GUIDE_PAGES } from "./field-tool-content/leadership-guides";
import { LEADERSHIP_LABS } from "./field-tool-content/leadership-labs";
import { LEADERSHIP_SAMPLES } from "./field-tool-content/leadership-samples";
import {
  LEADERSHIP_OUTPUT_BUILDERS,
  capacitySnapshot,
} from "../client/src/lib/leadership-output";
import { leadershipCommunicationDraft } from "../client/src/lib/leadership-communication";
import {
  readFieldToolDraft,
  sharedDraftValues,
} from "../client/src/lib/field-tool-drafts";
import teachings from "../shared/field-tool-teachings.json";

describe("expanded leadership products", () => {
  for (const [slug, expansion] of Object.entries(LEADERSHIP_EXPANSIONS)) {
    it(`${slug}: each companion and resource leads to an existing chapter, Lab step and source`, () => {
      expect(expansion.companion).toHaveLength(5);
      expect(expansion.scenes).toHaveLength(5);
      for (const companion of expansion.companion) {
        expect(LEADERSHIP_GUIDE_PAGES[slug][companion.after]).toBeDefined();
        expect(LEADERSHIP_LABS[slug].steps[companion.step]).toBeDefined();
      }
      for (const pick of expansion.resources) {
        expect(teachings.sources).toHaveProperty(pick.source);
        expect(
          (teachings.sources as Record<string, { url: string }>)[pick.source]
            .url
        ).not.toContain("/field-tools/resources");
        expect(LEADERSHIP_LABS[slug].steps[pick.step]).toBeDefined();
      }
      expect(
        expansion.resources.some(r => r.source === "when-mattering-isnt-enough")
      ).toBe(true);
      expect(
        expansion.resources.some(r => r.source === "you-have-a-culture-problem")
      ).toBe(true);
    });
    it(`${slug}: fictional agreement and follow-up do not alter the starting example`, () => {
      const sample = LEADERSHIP_SAMPLES[slug];
      const before = JSON.stringify(sample);
      for (const scene of expansion.scenes) {
        if (!scene.record) continue;
        const build = LEADERSHIP_OUTPUT_BUILDERS[scene.record];
        expect(build).toBeTypeOf("function");
        const result = build({
          ...sample,
          ...scene.values,
          leadershipReflection: "PRIVATE_CANARY",
        });
        expect(result).not.toContain("PRIVATE_CANARY");
        if (scene.values?.finalDecision)
          expect(result).toContain(scene.values.finalDecision);
        if (scene.values?.returnRecord)
          expect(result).toContain(scene.values.returnRecord);
      }
      expect(JSON.stringify(sample)).toBe(before);
      expect(sample.decisionStatus).toMatch(/PROPOS|NOT YET/);
    });
    it(`${slug}: updates remain drafts and final exports include only shared follow-up`, () => {
      const empty = leadershipCommunicationDraft(slug, {}, "leadership");
      expect(empty).toContain("PROPOSAL — agreement not recorded");
      expect(empty).toContain("No answer has been recorded yet.");
      expect(empty).toContain("[");
      const values = {
        ...LEADERSHIP_SAMPLES[slug],
        leadershipUpdate: "Shared sponsor update",
        teamUpdate: "Shared team update",
        returnRecord: "Shared follow-up",
        leadershipReflection: "PRIVATE_CANARY",
        privateReaction: "PRIVATE_CANARY",
      };
      for (const recipient of ["leadership", "team"] as const)
        expect(
          leadershipCommunicationDraft(slug, values, recipient)
        ).not.toContain("PRIVATE_CANARY");
      const id = expansion.scenes.at(-1)!.record!;
      const output = LEADERSHIP_OUTPUT_BUILDERS[id](values);
      for (const shared of [
        values.leadershipUpdate,
        values.teamUpdate,
        values.returnRecord,
      ])
        expect(output).toContain(shared);
      expect(output).not.toContain("PRIVATE_CANARY");
      const serialized = JSON.stringify({
        values: sharedDraftValues(values),
        step: 3,
      });
      const saved = readFieldToolDraft(
        { getItem: () => serialized },
        "test",
        4
      );
      expect(saved.values.returnRecord).toBe(values.returnRecord);
      expect(serialized).not.toContain("PRIVATE_CANARY");
    });
  }
  it("keeps the capacity example consistent with the actual calculator", () => {
    expect(capacitySnapshot(LEADERSHIP_SAMPLES["priority-whiplash"])).toEqual({
      available: 10,
      existing: 10,
      request: 2,
      total: 12,
      gap: 2,
    });
  });
  it("asks for confirmation of an actual response rather than pretending a filled proposal is agreed", () => {
    const draft = leadershipCommunicationDraft(
      "mandate-reset",
      {
        decisionStatus: "AGREED — decision recorded",
        finalDecision: "Director confirmed the decision process.",
      },
      "leadership"
    );
    expect(draft).toContain("Please check that this matches your answer");
    const pending = leadershipCommunicationDraft(
      "mandate-reset",
      {
        decisionStatus: "PROPOSAL — not yet agreed",
        finalDecision: "We hope to hear on Friday",
      },
      "leadership"
    );
    expect(pending).toContain("Can [who can decide] respond");
  });
});
