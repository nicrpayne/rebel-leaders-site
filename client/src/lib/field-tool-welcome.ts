export type WelcomeCopy = {
  heading: string;
  intro: string;
  outcomes: [string, string, string];
};
const welcome: Record<string, WelcomeCopy> = {
  "priority-whiplash": {
    heading: "Let’s sort out what comes first.",
    intro:
      "Another request lands. The team is already busy. Before anyone promises more, let’s work out what can fit—and how to talk about what needs to wait.",
    outcomes: [
      "See what’s already on the team’s plate",
      "Work out what the new request would change",
      "Get ready to talk through the options",
    ],
  },
  "deadline-reset": {
    heading: "Let’s find a plan you can stand behind.",
    intro:
      "Someone has promised a date, and you’re wondering how the team can possibly make it. Let’s look at what’s needed, what you know so far, and what you can honestly promise.",
    outcomes: [
      "Understand why the date matters",
      "Look at a few workable options",
      "Explain what you can commit to—and what needs checking",
    ],
  },
  "mandate-reset": {
    heading: "Let’s work out what you need to move forward.",
    intro:
      "You’re responsible for making something happen, but a decision you need is out of your hands. Let’s name that decision and get clear about what to ask for.",
    outcomes: [
      "Name the decision that’s holding things up",
      "Find out who can make it",
      "Ask for the authority or support you actually need",
    ],
  },
  "product-project-translator": {
    heading: "Let’s get clear on what they need.",
    intro:
      "“Just give me the roadmap.” “When will it be done?” You want to give a useful answer without promising something you don’t know yet. Let’s work out what they need from you.",
    outcomes: [
      "Understand what the person needs to know",
      "Decide what you can honestly commit to",
      "Write a reply that sounds like you",
    ],
  },
  "ai-stalemate/pm": {
    heading: "Let’s work out whether AI could help.",
    intro:
      "You can see something AI might help with. Your lead has questions. Let’s make room for both: what you hope to improve, what needs checking, and what you could do next together.",
    outcomes: [
      "Explain what you hope could get better",
      "Understand your lead’s concerns",
      "Agree on a useful next step together",
    ],
  },
  "ai-stalemate/lead-dev": {
    heading: "Let’s talk through the idea—and your concerns.",
    intro:
      "Your PM is excited about AI. You can see things the team needs to check before going further. Let’s put those concerns into words and work out what would help you move forward together.",
    outcomes: [
      "Understand what your PM hopes to improve",
      "Explain what needs checking or preparing",
      "Agree on a useful next step together",
    ],
  },
};
export function fieldToolWelcome(slug: string, audience: "pm" | "lead-dev") {
  return welcome[slug === "ai-stalemate" ? `${slug}/${audience}` : slug];
}
