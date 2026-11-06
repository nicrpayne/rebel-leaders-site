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
      "Sales has promised customers a date before Engineering confirmed what can be ready. The PM needs to reset that promise without turning a conditional estimate into another guarantee.",
    sections: [
      {
        title: "RECOMMENDATION / WHAT WOULD CHANGE",
        body: "Keep the date; deliver less first\nI'd keep the event and focus on booking. Reports can follow. Let's check the calendar connection on Thursday before we tell customers booking will be ready.\nWork included: Could we have booking ready for the event and add reports later? Our engineering lead needs to check the calendar connection on Thursday before we can promise that.\nAlternative date: If customers need both at once, we'll need another date. Let's get Thursday's results before we give them one.\nExtra help: Let's give the team time to check the calendar connection and test bookings. I'm not counting on anyone working evenings to get this done.",
      },
      {
        title: "DECISION NEEDED / WHO CAN MAKE IT / WHEN",
        body: "Can we focus on booking for the event and deliver reports later? If both need to launch together, can we agree to change the date?\nSales director, who made the customer promise — Wednesday, before the next customer update",
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
      "The PM is asked to squeeze a Friday demo into a full week. The same engineer is needed for that demo and a report fix an existing customer is waiting for. Someone needs to choose what waits.",
    sections: [
      {
        title: "DOES THE WORK FIT",
        body: "Dates covered: From now until Friday\nWork time, in person-days:\nAvailable: 10; existing work: 10; new request: 2.\nBefore changing the plan, work totals: 12; work that does not fit: 2.\nOne person-day is one person working for one day. These estimates do not calculate a finish date. How we estimated them: Fictional estimates checked with the lead: 10 person-days available before Friday and 10 already planned. The demo adds 2. The same developer is needed for the demo and report fix. Support and review are included; extra hours aren't.",
      },
      {
        title: "RECOMMENDATION / WHAT WOULD WAIT",
        body: "Narrow the request\nI'd make the small demo if we're willing to delay the report fix. If not, let's use the sketches. We don't need to build the whole feature for this meeting.\nWhat would wait: We could make a clickable demo, but we'd have to put two days of report fixes on hold. I'll check with the team before giving that customer a new date.\nWhat this would mean for people: The customer with the wrong report figures would wait longer. Their account manager needs to explain the delay and agree a new date with them.",
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
      "The PM is told to own the release, but directors keep changing the work. Prepare a specific request to the manager: which decisions can the PM make, and who will back them when challenged?",
    sections: [
      {
        title: "WHAT I CANNOT DECIDE / WHY IT MATTERS",
        body: "I'm responsible for the date, but I can't stop more work being added. When two requests clash, we don't know who to ask for a quick answer.\nOn Tuesday I deferred the reports request. On Wednesday a director asked a developer to start it anyway. On Friday I was asked why booking had slipped.",
      },
      {
        title: "WHAT I AM ASKING FOR / LIMITS",
        body: "Could you confirm that new requests need your decision before a developer starts them? I'd bring you the options. If another director gives a different instruction, I need you to settle it and confirm what happens to the date.\nWe'd keep the same budget and all the security and release checks. I'm asking to change how we choose the work, not skip those checks.\nRequired approval: Security still needs to approve how we protect customer data. Finance signs off extra spending. Our engineering lead confirms the software is ready to go out.",
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
        title: "WHAT I WILL DO NEXT / WHEN",
        body: "Invite the analyst to talk today. Check what needs to happen with the report separately; don’t wait for the next team meeting to deal with that.",
      },
      {
        title: "THE CHANGE",
        body: "At the next planning meeting, I’ll hear questions about the plan before I ask whether we’re ready to go ahead. If someone raises a concern, I’ll ask them to finish before I respond.",
      },
      {
        title: "WHERE WE ARE",
        body: "PROPOSAL — not discussed yet",
      },
    ],
  },
  "ai-stalemate-pm": {
    name: "AI Stalemate / PM",
    title: "Next Step Together",
    context:
      "Share why the work matters, hear your lead’s concerns, and choose a useful way to learn together.",
    sections: [
      {
        title: "CONVERSATION STATUS",
        body: "PROPOSED — NOT YET AGREED",
      },
      {
        title: "WHAT THE OTHER PERSON NEEDS OR IS WORRIED ABOUT",
        body: "My lead says the team is already stretched and doesn't want a quick demo to turn into a service nobody has time to review or support. I still need to ask what else worries them.",
      },
      {
        title: "WHAT WE WANT TO DO NEXT",
        body: "PREPARE FIRST",
      },
      {
        title: "WHO WILL DO WHAT / WHEN WE WILL CHECK AGAIN",
        body: "By Friday the PM checks the benefit estimate and asks which work can wait. The lead asks the team what they want to learn, chooses a partner and tools, and confirms the checks. Then we agree the twelve hours and $100 cap. Review next Tuesday if those arrangements are in place.",
      },
    ],
  },
  "ai-stalemate-lead-dev": {
    name: "AI Stalemate / Lead Developer",
    title: "Conversation Notes",
    context:
      "Explain the engineering concern, what supports it, and the next move you recommend to your PM.",
    sections: [
      {
        title: "CONVERSATION STATUS",
        body: "PROPOSED — NOT YET AGREED",
      },
      {
        title: "THE CHANGE BEING REQUESTED",
        body: "My PM wants us to use agents to build an internal app with restricted data and change how the team develops.",
      },
      {
        title: "MY POSITION",
        body: "We haven’t agreed the app’s access setup. Recent changes still need close review. I can support exploring a smaller approach with an experienced reviewer, but I don’t recommend a multi-agent workflow for this team yet.",
      },
      {
        title: "RECOMMENDED NEXT MOVE",
        body: "The PM brings the data owner and Platform together; I check reviewer capacity and compare a smaller approach. Return Friday. We have not agreed or run a spike.",
      },
    ],
  },
};
