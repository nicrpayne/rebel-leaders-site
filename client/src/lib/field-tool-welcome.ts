export type WelcomeCopy = {
  heading: string;
  intro: string;
  note: string;
  first: string;
  outcomes: [string, string, string];
};
const welcome: Record<string, WelcomeCopy> = {
  "priority-whiplash": {
    heading: "Let’s sort out what comes first.",
    intro:
      "Another request lands. The team is already busy. Before anyone promises more, let’s work out what can fit—and how to talk about what needs to wait.",
    note: "You don’t need to have it all figured out. Start with what you know, and we’ll take it from there.",
    first: "Start with one request that’s on your mind.",
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
    note: "You can care about the deadline and still ask what it will take. This is a place to work that out.",
    first: "Start with the date everyone is talking about.",
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
    note: "You don’t have to make a case for more power in general. We can start with the thing that’s stopping you right now.",
    first: "Start with one decision you’re waiting on.",
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
    note: "Bring the words they actually said. You don’t have to turn them into product language before we begin.",
    first: "Start with one question or request you’ve been given.",
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
    note: "You don’t need to arrive with the winning argument. Start with what matters to you, and make room to hear what matters to them.",
    first: "Start with the AI conversation you’re already having.",
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
    note: "You can take the possibility seriously and ask careful questions. Both belong in this conversation.",
    first: "Start with the AI conversation you’re already having.",
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
