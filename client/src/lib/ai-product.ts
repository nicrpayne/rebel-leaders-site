import type { Audience } from "./field-tool-paths";

// One compact inventory for the sales page, checkout, and review desk.
// Cover + chapters + visual companions; the PDF adds the edition’s source/teaching companion.
export const AI_GUIDE_PAGE_COUNT: Record<Audience, number> = {
  pm: 18,
  "lead-dev": 19,
};
export const AI_PRODUCT_INVENTORY = [
  {
    title: "The Field Guide",
    detail:
      "Understand the opportunity, the concerns, and what would make a useful next step. Read online or keep the printable PDF.",
    destination: "guide",
  },
  {
    title: "Prepare your conversation",
    detail:
      "Put the opportunity into words, hear your lead’s concerns, and prepare what you want to ask and propose.",
    destination: "lab/conversation",
  },
  {
    title: "Find where work gets stuck",
    detail:
      "Follow one piece of work beyond the coding. Explore what holds it up and leave with a question to check, a conversation to have, or a small change to try.",
    destination: "lab/delivery",
  },
] as const;

export function aiProductCopy(audience: Audience) {
  return audience === "pm"
    ? {
        role: "FOR PRODUCT MANAGERS",
        headline: "You see a possibility for AI.",
        accent: "Let’s find out whether it’s worth pursuing.",
        promise:
          "Get past the AI argument. Explain the opportunity, understand your lead’s concerns, and explore what would actually help your team deliver.",
        first:
          "Bring the AI conversation you’re already having. Read the opening of the Guide or start with Before You Talk in the Lab. Each Lab step links to a chapter that explains its questions.",
      }
    : {
        role: "FOR LEAD DEVELOPERS",
        // The playful headline is intentionally paired with Nic's laughing portrait.
        headline: "My PM won’t shut up about AI.",
        accent: "",
        promise:
          "They want the team to ship sooner. You have questions about what that will take. Work through the engineering concerns, explore where delivery gets stuck, and prepare a useful next step.",
        first:
          "Bring the change your PM is asking for. Use the Guide to think it through, then prepare your position in the Lab. A smaller approach, preparation, specialist advice, or stopping this use can all be useful outcomes.",
      };
}

export function aiProductInventory(audience: Audience) {
  return AI_PRODUCT_INVENTORY.map(item =>
    audience === "lead-dev" && item.destination === "lab/conversation"
      ? {
          ...item,
          detail:
            "Work through security, quality, and what the team can take on. Prepare the questions and recommendation you want to discuss with your PM.",
        }
      : item
  );
}
