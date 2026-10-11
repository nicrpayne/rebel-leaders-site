export type FieldTool = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  headline: string;
  accentLine: string;
  subhead: string;
  price: number;
  chips: [string, string, string];
  sectionEyebrow: string;
  sectionHeadline: string;
  sectionCopy: string;
  cards: Array<{ title: string; copy: string }>;
  who: string;
  nextTools: string[];
  checkoutUrl?: string;
};

export const FIELD_TOOLS: FieldTool[] = [
  {
    slug: "ai-stalemate",
    number: "01",
    name: "AI Stalemate",
    eyebrow: "FIELD TOOL 01",
    headline: "Your team is stuck on AI.",
    accentLine: "Start here.",
    subhead:
      "For product and engineering leaders who need to turn a recurring AI argument into one bounded test and a useful decision.",
    price: 47,
    chips: ["Name the tension", "Run one shared test", "Make a useful decision"],
    sectionEyebrow: "TWO LEADERS. SAME TEAM. DIFFERENT RISK.",
    sectionHeadline: "Stop having the same AI conversation.",
    sectionCopy:
      "Surface what each side is protecting, define evidence both can trust, and leave with a decision instead of another opinion.",
    cards: [
      { title: "Your view", copy: "Separate what actually happened from the story you are adding. Name the outcome or responsibility you are protecting." },
      { title: "Their view", copy: "Make the other leader's cost visible before either side tries to persuade the other." },
      { title: "Shared work", copy: "Build one bounded trial, count the full cost, then Continue, Revise, Stop, or Pause." },
    ],
    who: "For PMs, Product Owners, Engineering Leads, Tech Leads, and Engineering Managers caught in a real AI stalemate.",
    nextTools: ["deadline-reset", "mandate-reset"],
  },
  {
    slug: "deadline-reset",
    number: "02",
    name: "Deadline Reset",
    eyebrow: "FIELD TOOL 02",
    headline: "They already promised the date.",
    accentLine: "Now what?",
    subhead:
      "Reset the conversation around certainty, scope, and delivery before your team pays for a fantasy schedule.",
    price: 47,
    chips: ["Surface what's fixed", "Show the real tradeoff", "Write the update"],
    sectionEyebrow: "ADAPTIVE WORK NEEDS RESPONSIBLE COMMITMENTS.",
    sectionHeadline: "Turn a deadline into a decision.",
    sectionCopy:
      "Separate the actual constraint from the assumptions around it, make the scope/date/quality tradeoff visible, and give stakeholders an update you can defend.",
    cards: [
      { title: "Reality", copy: "Clarify what is truly fixed, what is forecast, what is assumed, and which dependencies still move." },
      { title: "Tradeoff", copy: "Show what must flex when the date does not: scope, sequence, capacity, quality guardrails, or confidence." },
      { title: "Update", copy: "Leave with a clear stakeholder brief: current confidence, decisions needed, and the next evidence point." },
    ],
    who: "For product leaders carrying a delivery forecast after someone else has already turned it into a promise.",
    nextTools: ["priority-whiplash", "product-project-translator"],
  },
  {
    slug: "priority-whiplash",
    number: "03",
    name: "Priority Whiplash",
    eyebrow: "FIELD TOOL 03",
    headline: "Everything is “top priority.”",
    accentLine: "That's not a priority system.",
    subhead:
      "Make the tradeoff visible, show what gets displaced, and stop absorbing new work without a decision.",
    price: 47,
    chips: ["Stack the real priorities", "Show what moves", "Write the tradeoff brief"],
    sectionEyebrow: "EVERY YES IS ALSO A NO.",
    sectionHeadline: "From overload to an explicit choice.",
    sectionCopy:
      "Put the work on one surface, expose the cost of the new ask, and turn priority pressure into a decision instead of invisible overtime.",
    cards: [
      { title: "Stack", copy: "Put the current commitments and the new request in one visible priority stack." },
      { title: "Displace", copy: "Name exactly what moves, slips, shrinks, or loses capacity if the new work enters." },
      { title: "Decide", copy: "Give the accountable stakeholder a clean tradeoff brief and record the choice." },
    ],
    who: "For product leaders caught between stakeholder asks and finite team capacity.",
    nextTools: ["deadline-reset", "mandate-reset"],
  },
  {
    slug: "mandate-reset",
    number: "04",
    name: "Mandate Reset",
    eyebrow: "FIELD TOOL 04",
    headline: "You're accountable.",
    accentLine: "You can't decide.",
    subhead:
      "Clarify decision rights, expose the authority gap, and create a useful path forward instead of carrying impossible ownership.",
    price: 47,
    chips: ["Map who decides", "Name the authority gap", "Create the escalation brief"],
    sectionEyebrow: "OWNERSHIP WITHOUT AUTHORITY IS A SYSTEM PROBLEM.",
    sectionHeadline: "Put responsibility and decision rights back in the same room.",
    sectionCopy:
      "Map the real decision path, distinguish recommendation from authority, and stop compensating for unclear governance with personal overfunctioning.",
    cards: [
      { title: "Map", copy: "Identify who recommends, who approves, who executes, who can block, and who is actually accountable." },
      { title: "Gap", copy: "Name the places where responsibility is landing on someone who cannot move the necessary lever." },
      { title: "Reset", copy: "Create a specific decision-rights request or escalation brief with an owner and date." },
    ],
    who: "For PMs and product leaders carrying outcomes they do not have the authority to decide.",
    nextTools: ["priority-whiplash", "product-project-translator"],
  },
  {
    slug: "product-project-translator",
    number: "05",
    name: "Product / Project Translator",
    eyebrow: "FIELD TOOL 05",
    headline: "You're running product.",
    accentLine: "They think you're running a project.",
    subhead:
      "Translate certainty-seeking requests into responsible product leadership so you can align the room without faking certainty.",
    price: 47,
    chips: ["Decode the request", "Translate the assumption", "Give a responsible answer"],
    sectionEyebrow: "THE REQUEST IS OFTEN REASONABLE. THE MODEL MAY NOT BE.",
    sectionHeadline: "Translate certainty into something the work can actually support.",
    sectionCopy:
      "Use the language your stakeholders already use, uncover the coordination need beneath it, then answer with product reality instead of project theater.",
    cards: [
      { title: "Decode", copy: "What are they really asking for: confidence, coordination, sequencing, budget protection, or accountability?" },
      { title: "Translate", copy: "Turn project language like final scope and fixed date into the evidence, ranges, tradeoffs, and checkpoints product work can support." },
      { title: "Respond", copy: "Leave with a concise answer, artifact, or meeting script that protects trust without pretending uncertainty is gone." },
    ],
    who: "For PMs working in organizations that want product outcomes but still manage adaptive work with project assumptions.",
    nextTools: ["deadline-reset", "priority-whiplash"],
  },
];

export function getFieldTool(slug: string) {
  return FIELD_TOOLS.find((tool) => tool.slug === slug);
}
