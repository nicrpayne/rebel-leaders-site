import type { Audience } from "./field-tool-paths";

// One inventory for the product page, start page, and review desk.
export const AI_GUIDE_PAGE_COUNT = 18;
export const AI_PRODUCT_INVENTORY = [
  {
    title: "Field Guide & discussion guide",
    detail:
      "A visual, printable guide to the conversation, with questions you can use together.",
    destination: "guide",
  },
  {
    title: "Your interactive Lab",
    detail:
      "Prepare on your own, talk it through, and decide what to do next. Start with the questions you need now.",
    destination: "lab",
  },
  {
    title: "Next Step Together",
    detail:
      "A proposal or agreement, plus updates you can adapt for leadership and your team.",
    destination: "lab?step=1",
  },
  {
    title: "Experiment Plan, Results Record & Decision Brief",
    detail:
      "If you run an experiment, agree the plan, count everyone’s work, and decide what the results tell you.",
    destination: "lab?step=2",
  },
  {
    title: "Worked walkthrough",
    detail:
      "Follow a fictional conversation from the first disagreement to a proposal for what happens next.",
    destination: "walkthrough",
  },
  {
    title: "Tools & study library",
    detail:
      "Choose a reading or tool for the question you have about writing, checking, or releasing code. Each includes a question to discuss with your colleague.",
    destination: "resources",
  },
] as const;

export function aiProductCopy(audience: Audience) {
  return audience === "pm"
    ? {
        role: "FOR PRODUCT MANAGERS",
        headline: "Your lead isn’t convinced.",
        accent: "Work out what would help you both move forward.",
        promise:
          "Explain what you hope AI could improve, hear your lead’s concerns, and work out what to do next together.",
        first:
          "Bring the AI conversation you’re already having. Read the opening of the Guide or start with Before You Talk in the Lab. Each Lab step links to a chapter that explains its questions.",
      }
    : {
        role: "FOR LEAD DEVELOPERS",
        headline: "Your PM thinks AI could help.",
        accent: "You have questions about the work.",
        promise:
          "Help your PM understand the checks, review, and support the idea would need. Decide together whether to try it and what needs to happen first.",
        first:
          "Bring the AI conversation you’re already having. Read the Guide or start with Before You Talk in the Lab. Think about what worries you, what you need to ask your PM, and what might help you both move forward.",
      };
}
