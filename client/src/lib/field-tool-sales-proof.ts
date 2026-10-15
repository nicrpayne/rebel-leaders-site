// Excerpts from current output builders with built-in fictional examples.
export const SALES_PROOF: Record<
  string,
  {
    name: string;
    title: string;
    context: string;
    sections: { title: string; body: string }[];
  }
> = {
  "deadline-reset": {
    name: "Deadline Reset",
    title: "Decision Update",
    context:
      "Sales has promised online repair bookings and service reports for an event. Check what can be ready and who can change the promise.",
    sections: [
      {
        title: "RECOMMENDATION / WHAT WOULD CHANGE",
        body: "Keep the date; deliver less first\nKeep the event, aim for working online booking, and explain that reports will come later. Confirm what we can promise after Thursday's calendar check.\nWork included: Aim to offer online booking on November 1 and add downloadable service reports later. The engineering lead needs to check the calendar connection on Thursday before confirming that plan.\nDate alternative: If both booking and reports must be ready together, ask the engineering lead for a new delivery estimate after Thursday's check. We do not have a reliable replacement date yet.\nCapacity: Keep the current team. Reserve time for checking the calendar connection and testing bookings. Do not assume anyone will work overtime.",
      },
      {
        title: "DECISION NEEDED / WHO CAN MAKE IT / WHEN",
        body: "Agree to focus on booking for the event, or ask for a new date when booking and reports can both be ready.\nSales director, who made the customer promise — Wednesday, before the next customer update",
      },
      {
        title: "DECISION STATUS",
        body: "PROPOSAL — awaiting a decision",
      },
    ],
  },
  "priority-whiplash": {
    name: "Priority Whiplash",
    title: "Priority Decision Brief",
    context:
      "The team has ten days of work time between them. Existing work needs all ten; a Friday demonstration needs two more. What would have to wait?",
    sections: [
      {
        title: "CAPACITY CHECK",
        body: "Planning window: The remaining working time from now to Friday\nUsing entered person-days:\nAvailable: 10; existing work: 10; new request: 2.\nBefore changing the plan, work totals: 12; work that does not fit: 2.\nOne person-day is one person working for one day. These estimates do not calculate a finish date. How we estimated them: Fictional estimates: the people involved have 10 days of work time between them before Friday. Existing work needs all 10 days; the simple demonstration needs 2 more. These totals include support and review, with no overtime.",
      },
      {
        title: "RECOMMENDATION / WHAT WOULD WAIT",
        body: "Narrow the request\nUse a simple clickable demonstration for Friday only if we agree to delay the report correction. It lets the customer react to the idea without asking the team to build the full feature.\nWhat moves: Make a simple clickable demonstration and put off two days of work on the incorrect report totals. Check the new report-fix date with the team before promising it.\nConsequence: The customer waiting for accurate report totals would wait longer. Their account manager needs the revised date and must tell them what is happening.",
      },
      {
        title: "DECISION STATUS",
        body: "PROPOSAL — awaiting a decision",
      },
    ],
  },
  "mandate-reset": {
    name: "Mandate Reset",
    title: "Decision Request",
    context:
      "Several directors ask for more features; the PM cannot turn them down. Ask for one person to decide which requests change the plan.",
    sections: [
      {
        title: "WHAT I CANNOT DECIDE / WHY IT MATTERS",
        body: "I am held responsible for the release date, but directors can add work and I cannot say what should wait. We have no agreed way to get a quick decision.\nDifferent directors keep asking developers to add features. I am expected to meet the original date, but cannot postpone those requests.",
      },
      {
        title: "WHAT I AM ASKING FOR / LIMITS",
        body: "Send new requests to the product director before adding them to the team's plan. The director should say whether to add them now and, if they do not fit, what should wait.\nKeep the agreed budget and the required security and software checks. This changes how we choose work; it does not remove those approvals.\nRequired approval: The security reviewer must approve the customer-data checks. The finance manager approves extra spending. The engineering lead confirms that the software is ready to release.",
      },
      {
        title: "DECISION STATUS",
        body: "PROPOSAL — awaiting a decision",
      },
    ],
  },
  "when-the-team-goes-quiet": {
    name: "When the Team Goes Quiet",
    title: "Your Follow-through",
    context:
      "A data analyst starts to raise a concern about a release. The PM moves the meeting on. Later, the analyst explains that a report Support relies on may miss the new bookings. The PM needs to hear what was missed and look at how they handled the question.",
    sections: [
      {
        title: "MY NEXT STEP",
        body: "Invite the analyst to talk today. Check what needs to happen with the report separately; don’t wait for the next team meeting to deal with that.",
      },
      {
        title: "A CHANGE I’M PROPOSING",
        body: "At the next planning meeting, I’ll hear questions about the plan before I ask whether we’re ready to go ahead. If someone raises a concern, I’ll ask them to finish before I respond.",
      },
      {
        title: "STATUS",
        body: "PROPOSAL — not discussed yet",
      },
    ],
  },
  "ai-stalemate-pm": {
    name: "AI Stalemate / PM",
    title: "Next Step Together",
    context:
      "Explain the repeated work you hope to remove, ask about your lead’s concerns, and agree what needs checking first.",
    sections: [
      {
        title: "CONVERSATION STATUS",
        body: "PROPOSED — NOT YET AGREED",
      },
      {
        title: "WHAT THE OTHER PERSON NEEDS OR IS WORRIED ABOUT",
        body: "We have not checked who can access which repair records, and nobody has time set aside to review the code.",
      },
      {
        title: "WHAT WE WANT TO DO NEXT",
        body: "PREPARE FIRST",
      },
      {
        title: "WHO WILL DO WHAT / WHEN WE WILL CHECK AGAIN",
        body: "The PM checks the claimed benefit with Finance Thursday. The data and security owners agree who may access the records Friday. The engineering manager arranges the practice and review. The PM and lead check progress next Tuesday.",
      },
    ],
  },
  "ai-stalemate-lead-dev": {
    name: "AI Stalemate / Lead Developer",
    title: "Next Step Together",
    context:
      "Help your PM understand the permission checks and review the idea would need, while making room for the problem they want to solve.",
    sections: [
      {
        title: "CONVERSATION STATUS",
        body: "PROPOSED — NOT YET AGREED",
      },
      {
        title: "WHAT THE OTHER PERSON NEEDS OR IS WORRIED ABOUT",
        body: "Support staff copy repair requests twice, and some are missed. My PM wants to save that work and stop customers having to chase us.",
      },
      {
        title: "WHAT WE WANT TO DO NEXT",
        body: "PREPARE FIRST",
      },
      {
        title: "WHO WILL DO WHAT / WHEN WE WILL CHECK AGAIN",
        body: "The PM checks the claimed benefit with Finance Thursday. The data and security owners agree who may access the records Friday. The engineering manager arranges the practice and review. The PM and lead check progress next Tuesday.",
      },
    ],
  },
};
