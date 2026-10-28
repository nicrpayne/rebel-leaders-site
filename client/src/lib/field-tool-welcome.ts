export type WelcomeCopy = {
  heading: string;
  intro: string;
  outcomes: [string, string, string];
};
const welcome: Record<string, WelcomeCopy> = {
  "priority-whiplash": {
    heading: "Let’s work out what this request would change.",
    intro:
      "Bring the urgent request and the customer work already promised. Prepare a recommendation that says what starts, what waits, and who needs to make the call.",
    outcomes: [
      "See what’s already on the team’s plate",
      "Work out what the new request would change",
      "Prepare a recommendation to talk through",
    ],
  },
  "deadline-reset": {
    heading: "Let’s see what’s possible by that date.",
    intro:
      "Bring the customer promise and what your engineering lead has confirmed. Let’s prepare the conversation with Sales about what can be delivered, what is still uncertain, and who will update the customer.",
    outcomes: [
      "Understand why the date matters",
      "Compare what the team could deliver and when",
      "Prepare an update you can stand behind",
    ],
  },
  "mandate-reset": {
    heading: "Let’s get clear on what you can actually decide.",
    intro:
      "Bring one decision that was blocked or overridden. Prepare to ask your manager which calls are yours, what backing you need, and what the team should do when instructions conflict.",
    outcomes: [
      "Name the decision that’s holding things up",
      "Find out who can make it",
      "Put your request into words",
    ],
  },
  "when-the-team-goes-quiet": {
    heading: "Let’s make room for what you’re not hearing.",
    intro:
      "Bring a planning or review meeting where the concerns reached you afterward. Prepare to ask what you missed, hear how you handled the moment, and change something in the next meeting.",
    outcomes: [
      "Find a way to bring it up",
      "Practise what to say when the answer is uncomfortable",
      "Leave with a small change you can follow through on",
    ],
  },
  "ai-stalemate/pm": {
    heading: "Let’s put your AI idea into words.",
    intro:
      "Bring the conversation you’re already having. Share why change matters, hear what your lead is concerned about, and choose something useful to learn together.",
    outcomes: [
      "Describe what you hope AI could help with",
      "Understand your lead’s concerns",
      "Prepare a next step to discuss with your lead",
    ],
  },
  "ai-stalemate/lead-dev": {
    heading: "Let’s get clear on your position.",
    intro:
      "Bring the request to change how your team builds and ships. Understand what your PM needs, explain the engineering concerns, and prepare a recommendation you can stand behind.",
    outcomes: [
      "Understand what your PM hopes to improve",
      "Explain the security, access, and team-readiness concerns",
      "Prepare your recommendation and the next conversation",
    ],
  },
};
export function fieldToolWelcome(slug: string, audience: "pm" | "lead-dev") {
  return welcome[slug === "ai-stalemate" ? `${slug}/${audience}` : slug];
}
