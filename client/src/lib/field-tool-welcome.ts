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
    heading: "Let’s get your AI conversation moving.",
    intro:
      "You see a way AI could help. Your lead sees work or risks that need attention. Prepare that conversation, or follow one piece of work to see what else is slowing delivery.",
    outcomes: [
      "Explain the improvement you’re hoping for and hear your lead’s concerns",
      "Look beyond coding to find where work gets stuck",
      "Take a clearer question or next step back to your lead",
    ],
  },
  "ai-stalemate/lead-dev": {
    heading: "Let’s work through what’s being asked.",
    intro:
      "Your PM wants the team to build and ship differently. Put the engineering concerns into words, or follow one piece of work to see where time is being lost. Start with what would help you today.",
    outcomes: [
      "Explain what security, access, and team readiness mean for this request",
      "Find what else is holding delivery up, even if coding gets faster",
      "Prepare a question or recommendation to discuss with your PM",
    ],
  },
};
export function fieldToolWelcome(slug: string, audience: "pm" | "lead-dev") {
  return welcome[slug === "ai-stalemate" ? `${slug}/${audience}` : slug];
}
