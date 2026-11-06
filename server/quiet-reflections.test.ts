import { describe, expect, it } from "vitest";
import { QUIET_PRIVATE_IDS } from "../client/src/lib/quiet-reflections";
import { sharedDraftValues, readFieldToolDraft } from "../client/src/lib/field-tool-drafts";
import { buildQuietConversation, buildQuietChange, buildQuietFollowThrough } from "../client/src/lib/leadership-output";
import { LEADERSHIP_LABS } from "./field-tool-content/leadership-labs";

describe("optional In the Room reflections", () => {
  it("keeps existing four-step drafts usable and has no new mandatory inputs", () => {
    expect(LEADERSHIP_LABS['when-the-team-goes-quiet'].steps.map(s => s.eyebrow)).toEqual(['NOTICE','INVITE','LISTEN','FOLLOW THROUGH']);
    const draft={values:{opening:'My existing words',myChange:'Send the plan earlier'},step:2};
    expect(readFieldToolDraft({getItem:()=>JSON.stringify(draft)},'saved',4)).toEqual(draft);
  });
  it("keeps every wavelength and HID field out of storage and all three exports", () => {
    const values={opening:'Deliberately chosen opening',myChange:'My proposed change',...Object.fromEntries(QUIET_PRIVATE_IDS.map(id=>[id,'PRIVATE_LENS']))};
    expect(sharedDraftValues(values)).toEqual({opening:values.opening,myChange:values.myChange});
    for(const build of [buildQuietConversation,buildQuietChange,buildQuietFollowThrough])expect(build(values)).not.toContain('PRIVATE_LENS');
    expect(buildQuietConversation(values)).toContain(values.opening);
    expect(buildQuietChange(values)).toContain(values.myChange);
  });
});
