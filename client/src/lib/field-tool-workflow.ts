/** Zero-based chapters: keep each step beside the thinking its fields use. */
export const FIELD_TOOL_GUIDE_CHAPTERS: Record<string, number[]> = {
  "ai-stalemate": [3, 4, 7, 8, 9],
  "deadline-reset": [2, 3, 4, 5],
  "priority-whiplash": [2, 3, 4, 5],
  "mandate-reset": [0, 2, 4, 5],
  "product-project-translator": [0, 2, 3, 4],
};
export const FIELD_TOOL_START: Record<string, string> = {
  "deadline-reset":
    "Bring one promised date. Open The Promise in the Lab and write what the customer was told. Check the options with the team before asking the person responsible for the promise to choose.",
  "priority-whiplash":
    "Bring the new request and your current work list. Open Current Work in the Lab. Find out what the request needs, ask the team what would have to wait, and take that choice to the person who can decide.",
  "mandate-reset":
    "Bring one decision you keep getting stuck on. Open The Problem in the Lab. Write what you are expected to deliver and what you cannot decide. Check who can help before drafting your request.",
  "product-project-translator":
    "Bring the exact words someone used. Open The Request in the Lab. Ask what they need your answer for, then work out what you can promise and when you will know more.",
  "ai-stalemate":
    "Start with the conversation you are already having. Prepare on your own, then talk through what matters to each of you. Write down the next step and who will do it. Come back to record what you agreed or learned.",
};

export function fieldToolLabStep(slug: string, chapter: number): number {
  const starts = FIELD_TOOL_GUIDE_CHAPTERS[slug] ?? [0];
  let step = 0;
  starts.forEach((firstChapter, index) => {
    if (chapter >= firstChapter) step = index;
  });
  return step;
}
