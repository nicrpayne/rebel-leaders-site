export type WelcomeCopy = {
  heading: string;
  intro: string;
  outcomes: [string, string, string];
};
const welcome: Record<string, WelcomeCopy> = {
  "priority-whiplash": {
    heading: "You’re in. Let’s get you a quick win.",
    intro:
      "Bring the new request and what’s already on your team’s plate. Let’s work out what can fit and what would have to wait, so you’re ready for that conversation.",
    outcomes: [
      "See what’s already on the team’s plate",
      "Work out what the new request would change",
      "Prepare a recommendation to talk through",
    ],
  },
  "deadline-reset": {
    heading: "Let’s see what’s possible by that date.",
    intro:
      "Bring the date you’ve been given and what the team needs to deliver. Let’s compare the options so you can explain what’s possible and what still needs checking.",
    outcomes: [
      "Understand why the date matters",
      "Compare what the team could deliver and when",
      "Prepare an update you can stand behind",
    ],
  },
  "mandate-reset": {
    heading: "Let’s get that decision moving.",
    intro:
      "Bring one decision that’s holding up your work. Let’s work out who can make it and what you need from them, so you can ask for help clearly.",
    outcomes: [
      "Name the decision that’s holding things up",
      "Find out who can make it",
      "Put your request into words",
    ],
  },
  "product-project-translator": {
    heading: "Let’s find an answer you can stand behind.",
    intro:
      "Bring the question you’ve been asked, in their words. Let’s work out what they need to know and write a helpful reply that doesn’t promise more than you know.",
    outcomes: [
      "Understand what the person needs to know",
      "Separate what you know from what you need to check",
      "Write a reply that sounds like you",
    ],
  },
  "ai-stalemate/pm": {
    heading: "Let’s put your AI idea into words.",
    intro:
      "Bring one thing you think AI could improve. Let’s explain why it matters, understand your lead’s concerns, and prepare for a conversation about what to do next.",
    outcomes: [
      "Describe what you hope AI could help with",
      "Understand your lead’s concerns",
      "Prepare a next step to discuss with your lead",
    ],
  },
  "ai-stalemate/lead-dev": {
    heading: "Let’s get your questions on the table.",
    intro:
      "Bring the AI idea you’ve been asked to consider. Let’s see what it could help with, spell out what needs checking, and get ready to talk it through with your PM.",
    outcomes: [
      "Understand what your PM hopes to improve",
      "Put your questions and concerns into words",
      "Prepare a next step to discuss with your PM",
    ],
  },
};
export function fieldToolWelcome(slug: string, audience: "pm" | "lead-dev") {
  return welcome[slug === "ai-stalemate" ? `${slug}/${audience}` : slug];
}
