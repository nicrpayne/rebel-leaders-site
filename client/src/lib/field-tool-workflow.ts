export const AI_DEV_GUIDE_CHAPTERS = [3, 7, 8, 9, 10];
/** Zero-based chapters: keep each step beside the thinking its fields use. */
export const FIELD_TOOL_GUIDE_CHAPTERS: Record<string, number[]> = {
  "ai-stalemate": [3, 4, 7, 8, 9],
  "deadline-reset": [2, 3, 4, 5],
  "priority-whiplash": [2, 3, 4, 5],
  "mandate-reset": [0, 2, 4, 5],
  "when-the-team-goes-quiet": [1, 2, 3, 6],
};
export const FIELD_TOOL_START: Record<string, string> = {
  "deadline-reset":
    "Let’s check the customer promise with Engineering and prepare what you need to take back to Sales.",
  "priority-whiplash":
    "Let’s work out what this urgent request would put on hold, and who needs to make that choice.",
  "mandate-reset":
    "Let’s prepare the conversation with your manager about what you can decide and who will back you.",
  "when-the-team-goes-quiet":
    "Let’s start with the meeting where you missed a concern, and prepare to hear it properly.",
  "ai-stalemate":
    "Let’s work through the idea, the questions, and a next step you can discuss together.",
};

export function fieldToolLabStep(
  slug: string,
  chapter: number,
  audience?: string
): number {
  const starts = (slug === "ai-stalemate" && audience === "lead-dev"
    ? AI_DEV_GUIDE_CHAPTERS
    : FIELD_TOOL_GUIDE_CHAPTERS[slug]) ?? [0];
  let step = 0;
  starts.forEach((firstChapter, index) => {
    if (chapter >= firstChapter) step = index;
  });
  return step;
}
