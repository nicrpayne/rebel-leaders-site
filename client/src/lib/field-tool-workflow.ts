/** Zero-based chapters: keep each step beside the thinking its fields use. */
export const FIELD_TOOL_GUIDE_CHAPTERS: Record<string, number[]> = {
  "ai-stalemate": [3, 4, 7, 8, 9],
  "deadline-reset": [2, 3, 4, 5],
  "priority-whiplash": [2, 3, 4, 5],
  "mandate-reset": [0, 2, 4, 5],
  "product-project-translator": [0, 2, 3, 4],
};
export const FIELD_TOOL_START: Record<string, string> = {
  "ai-stalemate":
    "Bring the conversation you are already having about one possible AI use. Prepare alone, then shape the next move together. Share the brief you have reviewed; return to record what was actually agreed or learned.",
  "deadline-reset":
    "Bring one communicated date and the promise behind it. Draft alone, check feasible options with your team, then take the update to the decision owner. Return after the decision or evidence checkpoint.",
  "priority-whiplash":
    "Bring your current commitments and one new request. Draft alone, check displacement with the team, then ask the tradeoff owner to choose. Update affected people and revisit the decision.",
  "mandate-reset":
    "Bring one outcome you own and the decision blocking it. Map the rights alone, verify them with the people involved, then take a specific request to the person who can change them. Record the response and follow-through.",
  "product-project-translator":
    "Bring the stakeholder's actual words. Draft alone, check the need with them, then offer a commitment you can support. Use the short version in conversation and the written response for follow-up; record the next decision.",
};
