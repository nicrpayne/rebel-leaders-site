import type { Audience } from "./field-tool-paths";
import { AI_STALEMATE_PUBLIC_COPY } from "@shared/field-tool-public-copy";

// One compact inventory for the sales page, checkout, and review desk.
// Cover + chapters + visual companions; the PDF adds the edition’s source/teaching companion.
export const AI_GUIDE_PAGE_COUNT: Record<Audience, number> = {
  pm: 18,
  "lead-dev": 19,
};
export const AI_PRODUCT_INVENTORY = [
  {
    label: "Read as needed",
    title: "The Field Guide",
    detail:
      "Understand the opportunity, the concerns, and what would make a useful next step. Read online or keep the printable PDF.",
    destination: "guide",
  },
  {
    label: "Conversation Companion",
    title: "Prepare your conversation",
    detail:
      "Clarify your thoughts, put the opportunity into words, listen to your team’s concerns, and prepare what you want to ask and propose.",
    destination: "lab/conversation",
  },
  {
    label: "Delivery Map",
    title: "Find where work gets stuck",
    detail:
      "Follow one piece of work beyond the coding. Explore what holds it up and leave with a conversation to have, or a small change to try.",
    destination: "lab/delivery",
  },
] as const;

export function aiProductCopy(audience: Audience) {
  return audience === "pm"
    ? {
        role: "FOR PRODUCT MANAGERS",
        ...AI_STALEMATE_PUBLIC_COPY.pm,
        accent: "",
        first:
          "Bring the AI conversation you’re already having. Read the opening of the Guide or start with Before You Talk in the Lab. Each Lab step links to a chapter that explains its questions.",
      }
    : {
        role: "FOR LEAD DEVELOPERS",
        // The playful headline is intentionally paired with Nic's laughing portrait.
        ...AI_STALEMATE_PUBLIC_COPY["lead-dev"],
        accent: "",
        first:
          "Bring the change your PM is asking for. Use the Guide to think it through, then prepare your position in the Lab. A smaller approach, preparation, specialist advice, or stopping this use can all be useful outcomes.",
      };
}

export function aiProductInventory(audience: Audience) {
  return AI_PRODUCT_INVENTORY.map(item =>
    audience === "lead-dev" && item.destination === "guide"
      ? {
          ...item,
          detail:
            "Think through the change your PM is asking for, the engineering concerns, and what your team can take on. Read online or keep the printable PDF.",
        }
      : audience === "lead-dev" && item.destination === "lab/conversation"
        ? {
            ...item,
            detail:
              "Work through security, quality, and what the team can take on. Prepare the questions and recommendation you want to discuss with your PM.",
          }
        : item
  );
}
