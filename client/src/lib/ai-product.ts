import type { Audience } from "./field-tool-paths";

// One inventory for the product page, start page, and review desk.
export const AI_GUIDE_PAGE_COUNT = 18;
export const AI_PRODUCT_INVENTORY = [
  { title: "Field Guide & discussion guide", detail: "A visual, printable guide to the conversation, with questions you can use together.", destination: "guide" },
  { title: "Your interactive Lab", detail: "Think privately, understand each other, and shape a useful next move. Start where your conversation stands.", destination: "lab" },
  { title: "Shared Next-Step Brief", detail: "A proposal or agreement, plus updates you can adapt for leadership and your team.", destination: "lab?step=1" },
  { title: "Bet, Evidence & Decision Briefs", detail: "If you test: govern the experiment, count the whole effort, and record what the evidence supports.", destination: "lab?step=2" },
  { title: "Worked walkthrough", detail: "Follow a realistic case from disagreement to a responsible next move.", destination: "walkthrough" },
  { title: "Tools & study library", detail: "Coding, review, testing, access, and delivery resources—with a question to bring back to the work.", destination: "resources" },
] as const;

export function aiProductCopy(audience: Audience) {
  return audience === "pm" ? {
    role: "FOR PRODUCT MANAGERS", headline: "Your lead isn’t convinced.", accent: "Find a move you can make together.",
    promise: "Get clear on the opportunity. Shape the next move with your lead. Explain it to the people who need to act.",
    first: "Bring the AI conversation you’re already having. Start with the Guide’s opening or go straight to private preparation in the Lab. You can read the matching chapter as you work.",
  } : {
    role: "FOR LEAD DEVELOPERS", headline: "My PM won’t shut up about AI.", accent: "",
    promise: "Make the concerns concrete. Understand the opportunity. Shape a responsible next move with your PM.",
    first: "Bring the AI conversation you’re already having. Start with the Guide’s opening or prepare privately in the Lab. Turn the concerns into questions, conditions, and a next move your PM can act on.",
  };
}
