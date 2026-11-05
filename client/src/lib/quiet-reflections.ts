export const QUIET_RESPONSES = [
  { id: "connect", name: "Acknowledge and reconnect", source: "Affiliative", use: "A concern was brushed aside or a relationship needs repair.", cost: "Warmth alone can leave the work problem untouched.", opening: "I moved past your concern. I would like to understand what I missed, if you are willing to talk.", condition: "Make time to hear the answer and follow through on the issue." },
  { id: "participate", name: "Invite real influence", source: "Democratic", use: "There is an open decision that people can help shape.", cost: "Asking for input after deciding can make the next invitation harder to trust.", opening: "This part of the plan is still open. What do you see that could change it?", condition: "Say what can change, who decides, and when. Leave time to think." },
  { id: "direction", name: "Make the direction clearer", source: "Authoritative", use: "People need the purpose and boundaries before they can contribute.", cost: "A leader's announced direction is not yet the co-created Vision of Holistic Shaping.", opening: "Here is the purpose and what is fixed. What needs to stay open for us to find a workable way forward?", condition: "Explain the constraints and give people room to shape the approach." },
  { id: "coach", name: "Support learning", source: "Coaching", use: "Someone wants to develop and has room to practise.", cost: "Coaching cannot supply missing authority, time, or equipment by itself.", opening: "What would you like to get better at here, and what support would help you try?", condition: "Protect practice time, feedback, and a real decision the person can make." },
  { id: "pace", name: "Agree a short push", source: "Pacesetting", use: "A capable team agrees to a small, bounded effort.", cost: "Your own pace can become a hidden demand for extra hours.", opening: "Could we focus on this small piece until this point? What needs to move to make that possible?", condition: "Agree scope, what pauses, the end point, and recovery." },
  { id: "contain", name: "Contain an immediate risk", source: "Coercive", use: "An immediate incident needs a narrow, clear instruction.", cost: "Urgent direction can become an ordinary habit that silences judgment.", opening: "We need to stop this activity because of the immediate risk. Here is who is coordinating, and when we will review the restriction.", condition: "Limit the instruction, name its review point, and restore participation." },
];
export const QUIET_WAVELENGTH = [
  ["risk", "Risk", "Prefer a protected step", "Comfortable with a bigger bet"],
  ["change", "Change", "Prefer continuity", "Energised by change"],
  ["variables", "Variables", "Focus on a few moving parts", "Hold many possibilities"],
  ["reasoning", "Reasoning", "Build a clear sequence", "Connect ideas, then fill gaps"],
  ["ambiguity", "Ambiguity", "Want concrete information", "Explore with open questions"],
  ["opportunity", "Opportunity", "Notice the work and problems", "Notice new possibilities"],
] as const;
export const QUIET_HEALTH = [
  ["spiritual", "Spiritual", "Can people question work that conflicts with meaning or conscience?"],
  ["emotional", "Emotional", "What happens when someone names uncertainty or frustration?"],
  ["leading", "Leading", "Can people influence decisions they are responsible for carrying?"],
  ["technical", "Technical", "Is there time, knowledge, and support to do the work well?"],
  ["physical", "Physical", "What does this practice ask of people's time, energy, and recovery?"],
] as const;
export const QUIET_PRIVATE_IDS = [
  "quietLensResponse", "quietLensBridge", "quietLensPractice", "quietLensRoot", "quietLensEvidence",
  "quietLensElement", "quietLensFormation", "quietLensCulture", "quietLensBoundary",
  ...QUIET_WAVELENGTH.flatMap(([id]) => [`quietLensPreferred_${id}`, `quietLensNeeded_${id}`]),
];
