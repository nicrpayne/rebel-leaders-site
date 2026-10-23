import type { Audience } from "./field-tool-paths";

// One inventory for the product page, start page, and review desk.
// Cover + chapters + visual companions; the PDF adds the edition’s source/teaching companion.
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
        headline: "You see a possibility for AI.",
        accent: "Let’s find out whether it’s worth pursuing.",
        promise:
          "Explain what you hope AI could improve, hear your lead’s concerns, and work out what to do next together.",
        first:
          "Bring the AI conversation you’re already having. Read the opening of the Guide or start with Before You Talk in the Lab. Each Lab step links to a chapter that explains its questions.",
      }
    : {
        role: "FOR LEAD DEVELOPERS",
        // The playful headline is intentionally paired with Nic's laughing portrait.
        headline: "My PM won’t shut up about AI.",
        accent: "",
        promise:
          "Your PM wants the team to build and ship differently. Work through security, access, and what the team can realistically take on—then prepare a recommendation you can discuss.",
        first:
          "Bring the change your PM is asking for. Use the Guide to think it through, then prepare your position in the Lab. A smaller approach, preparation, specialist advice, or stopping this use can all be useful outcomes.",
      };
}

export function aiProductInventory(audience: Audience) {
  return AI_PRODUCT_INVENTORY.map(item =>
    audience === "lead-dev" && item.title === "Next Step Together"
      ? {
          ...item,
          title: "Conversation Notes",
          detail:
            "Explain the request, your engineering position, alternatives, and the next move you recommend.",
        }
      : audience === "lead-dev" && item.destination === "lab?step=2"
        ? {
            ...item,
            title: "Optional Spike Plan, Results & Engineering Recommendation",
            detail:
              "Investigate a real unknown when useful. Record the evidence and recommend what the team can take on next.",
          }
        : item
  );
}
