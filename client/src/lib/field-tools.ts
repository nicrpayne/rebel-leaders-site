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
};

export const FIELD_TOOLS: FieldTool[] = [
  {
    slug: "ai-stalemate",
    number: "01",
    name: "AI Stalemate",
    eyebrow: "FIELD TOOL 01",
    headline: "You keep having the same conversation about AI.",
    accentLine: "What would help you move forward?",
    subhead:
      "Talk through what you hope AI could improve, what worries your colleague, and what you can try or resolve together.",
    price: 47,
    chips: [
      "Explain what you hope to improve",
      "Understand the concerns",
      "Agree what happens next",
    ],
    sectionEyebrow: "START WITH THE CONVERSATION",
    sectionHeadline: "You both need something worth saying yes to.",
    sectionCopy:
      "One of you sees time being wasted. The other sees work that still needs checking. Put both on the table. You might agree to an experiment—or discover something you need to sort out first.",
    cards: [
      {
        title: "Before you talk",
        copy: "Write down what happened and what you are assuming about the other person. Decide what you still need to ask.",
      },
      {
        title: "Talk it through",
        copy: "Explain what you want to improve. Ask what they would have to check, review, or take responsibility for.",
      },
      {
        title: "Choose the next step",
        copy: "Agree what to do, who will do it, and when you will talk again. If you run an experiment, count all the work, including review and fixes.",
      },
    ],
    who: "For product managers and lead developers whose conversations about AI keep getting stuck.",
    nextTools: ["deadline-reset", "mandate-reset"],
  },
  {
    slug: "deadline-reset",
    number: "02",
    name: "Deadline Reset",
    eyebrow: "FIELD TOOL 02",
    headline: "They already promised the date.",
    accentLine: "Now you have to work out what's possible.",
    subhead:
      "Find out what was promised, check what the team can deliver, and give the person responsible a clear choice.",
    price: 47,
    chips: ["Check the promise", "Work out the options", "Ask for a decision"],
    sectionEyebrow: "THE DATE IS ONLY PART OF THE PROMISE",
    sectionHeadline: "What does the customer actually need by then?",
    sectionCopy:
      "A customer meeting may be fixed. The list of features may still be negotiable. Find out which is which before everyone starts working late to deliver a promise nobody checked.",
    cards: [
      {
        title: "What was promised?",
        copy: "Write down the date, the work it includes, and who told the customer. Check what genuinely cannot change.",
      },
      {
        title: "What could we do?",
        copy: "Ask the team what could be ready by that date, what would take longer, and whether extra help would actually help.",
      },
      {
        title: "Who needs to choose?",
        copy: "Recommend an option. Say what still needs checking, who can approve it, and when the customer needs an update.",
      },
    ],
    who: "For product managers asked to deliver work by a date someone has already promised.",
    nextTools: ["priority-whiplash", "when-the-team-goes-quiet"],
  },
  {
    slug: "priority-whiplash",
    number: "03",
    name: "Priority Whiplash",
    eyebrow: "FIELD TOOL 03",
    headline: "The team is already busy.",
    accentLine: "Then another urgent request arrives.",
    subhead:
      "Find out what is really needed, show what would have to wait, and get a decision everyone can work from.",
    price: 47,
    chips: [
      "List the work already promised",
      "Show what would wait",
      "Agree what happens next",
    ],
    sectionEyebrow: "THERE ARE STILL THE SAME NUMBER OF HOURS",
    sectionHeadline: "What would we have to put off?",
    sectionCopy:
      "The new request may matter. So does the work people are already counting on. Get specific about both, then help the person who can decide make the choice.",
    cards: [
      {
        title: "What are we already doing?",
        copy: "List the promised work, including support and review. Check what the new request actually requires.",
      },
      {
        title: "What would have to wait?",
        copy: "Work out what you would postpone, reduce, or stop—and who would feel the effect.",
      },
      {
        title: "Who can make the call?",
        copy: "Bring a recommendation and an alternative. Record the answer and tell the people whose plans change.",
      },
    ],
    who: "For product managers trying to fit another urgent request into a team’s already full week.",
    nextTools: ["deadline-reset", "mandate-reset"],
  },
  {
    slug: "mandate-reset",
    number: "04",
    name: "Mandate Reset",
    eyebrow: "FIELD TOOL 04",
    headline: "You're expected to deliver.",
    accentLine: "But someone else keeps changing the plan.",
    subhead:
      "Work out who can make the decision you need, then ask for a specific change in how decisions get made.",
    price: 47,
    chips: [
      "Find out who can decide",
      "Explain what is getting stuck",
      "Ask for a specific change",
    ],
    sectionEyebrow: "RESPONSIBILITY NEEDS A WAY TO MAKE DECISIONS",
    sectionHeadline: "What do you need permission to decide?",
    sectionCopy:
      "Being told to ‘own it’ does not help when you cannot turn down new work or get an answer. Name the decision that keeps getting stuck and ask for a workable arrangement.",
    cards: [
      {
        title: "Name the problem",
        copy: "Describe what you are expected to deliver and the decision you cannot make.",
      },
      {
        title: "Find the right people",
        copy: "Check who makes the final call, whose advice matters, and which approvals are required.",
      },
      {
        title: "Ask for a change",
        copy: "Ask for permission to make a specific decision, or agree who will answer, how quickly, and what you do while waiting.",
      },
    ],
    who: "For product managers held responsible for results when key decisions are outside their control.",
    nextTools: ["priority-whiplash", "when-the-team-goes-quiet"],
  },
  {
    slug: "when-the-team-goes-quiet",
    number: "05",
    name: "When the Team Goes Quiet",
    eyebrow: "FIELD TOOL 05",
    headline: "The meeting ends.",
    accentLine: "Then you find out what people really think.",
    subhead:
      "Make room for the conversation you’re missing, and work out what you can change.",
    price: 47,
    chips: [
      "Notice what happens in the room",
      "Ask without putting someone on the spot",
      "Follow through on what you hear",
    ],
    sectionEyebrow: "START WITH WHAT HAPPENED",
    sectionHeadline: "“Why didn’t anyone say something?”",
    sectionCopy:
      "It’s a fair question. But before you ask the team, think about what happened the last time someone did. Let’s look at one meeting and find a better way to have the next conversation.",
    cards: [
      {
        title: "Notice the moment",
        copy: "What was said? What did you do? Start there, before deciding why someone stayed quiet.",
      },
      {
        title: "Open the conversation",
        copy: "Ask about their experience. Hear them out, and check you understood before explaining your side.",
      },
      {
        title: "Give them something to go on",
        copy: "Choose one thing you can change. Then come back and ask whether it helped.",
      },
    ],
    who: "For product managers, team leads, and anyone who runs a meeting where the real concerns come out afterward.",
    nextTools: ["mandate-reset", "priority-whiplash"],
  },
];

export function getFieldTool(slug: string) {
  return FIELD_TOOLS.find(tool => tool.slug === slug);
}

// The two AI editions are separate purchases within the same situation family.
export const FIELD_TOOL_OFFERS = FIELD_TOOLS.flatMap(tool =>
  tool.slug === "ai-stalemate"
    ? (["pm", "lead-dev"] as const).map(audience => ({
        ...tool,
        slug: `${tool.slug}/${audience}`,
        name: `AI Stalemate / ${audience === "pm" ? "Product Manager" : "Lead Developer"}`,
        eyebrow: `FIELD TOOL 01 / ${audience === "pm" ? "PRODUCT MANAGERS" : "LEAD DEVELOPERS"}`,
        headline:
          audience === "pm"
            ? "You see a possibility for AI."
            : "My PM won’t shut up about AI.",
        accentLine:
          audience === "pm" ? "Is it worth pursuing?" : "",
        subhead:
          audience === "pm"
            ? "Explain the opportunity, invite your lead to question it, and decide what to explore together."
            : "Assess the engineering work, the risks, and the evidence you need to make a sound decision.",
      }))
    : [tool]
);
