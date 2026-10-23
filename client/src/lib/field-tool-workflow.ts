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
    "Let’s work through one deadline and get you ready to talk about what’s possible.",
  "priority-whiplash":
    "Let’s see how the new request fits with the work already promised.",
  "mandate-reset":
    "Let’s work out who can help with the decision and what you need to ask them.",
  "when-the-team-goes-quiet":
    "Let’s start with one meeting and a conversation you want to have.",
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
