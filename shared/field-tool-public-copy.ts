// Keep the sales pages, browser titles, and share previews on the same promise.
export const FIELD_TOOLS_PUBLIC_COPY = {
  headline: "Everyone’s busy.",
  accent: "The work’s still stuck.",
  description:
    "Field Guides and interactive Labs to work out what’s holding things up—and prepare the conversation or change that could move it forward.",
};

export function fieldToolKitLabel(slug: string) {
  return slug === "ai-stalemate" ? "Field Guide and interactive Labs" : "Field Guide and interactive Lab";
}

export const AI_LABS = "two interactive Labs, the Conversation Companion and the Delivery Map";

export const AI_LAB_UPDATES =
  "All future software updates and upgrades to both Labs are included.";

export const LAB_UPDATES =
  "Your purchase includes all future software updates and upgrades to this Lab.";

export const AI_STALEMATE_PUBLIC_COPY = {
  pm: {
    headline: "My lead dev thinks AI is a toy.",
    promise:
      "You can see where AI might help. Your lead sees what it would take to build, secure, and support it. Work out what’s worth trying—and what needs to be in place first.",
  },
  "lead-dev": {
    headline: "My PM won’t shut up about AI.",
    promise:
      "Everyone wants the team to ship sooner. You know there’s more to it than faster coding. Work through the engineering concerns, find what’s holding delivery up, and prepare clear next steps to discuss with your PM.",
  },
};
