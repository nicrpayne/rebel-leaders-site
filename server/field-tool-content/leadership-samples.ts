export const LEADERSHIP_SAMPLES: Record<string, Record<string, string>> = {
  "deadline-reset": {
    outcome: "Customers can book a repair online at our November 1 event.",
    date: "November 1",
    promise:
      "Fictional example: our sales director told customers they'd be able to book repairs online and download service reports from November 1.",
    fixed:
      "The event is already booked for November 1. We need something we can show customers that day.",
    constraintBasis:
      "I've checked with Sales: the event date is fixed, but we haven't signed a contract promising both features that day.",
    assumed:
      "We thought connecting the booking page to the engineers' calendar would be straightforward. We also assumed we'd have time for the reports.",
    unknown:
      "We haven't checked whether bookings reach the calendar properly. We don't yet know how much fixing and testing is left.",
    scopeMove:
      "Could we have booking ready for the event and add reports later? Our engineering lead needs to check the calendar connection on Thursday before we can promise that.",
    dateMove:
      "If customers need both at once, we'll need another date. Let's get Thursday's results before we give them one.",
    capacityMove:
      "Let's give the team time to check the calendar connection and test bookings. I'm not counting on anyone working evenings to get this done.",
    qualityGuardrails:
      "Bookings need to reach the right calendar, and customers must only see their own details. We still need to finish the security review.",
    consequence:
      "We're still telling customers both features will be ready, but we haven't checked that we can do it. I'd rather change the promise now than let them down on the day.",
    chosenOption: "Keep date / change scope",
    recommendation:
      "I'd keep the event and focus on booking. Reports can follow. Let's check the calendar connection on Thursday before we tell customers booking will be ready.",
    confidence: "Medium",
    confidenceScope:
      "Getting booking ready by November 1, if Thursday's calendar check goes well.",
    forecastBasis:
      "The booking page is built. Our engineering lead thinks the rest can fit, but the calendar connection is still a question mark.",
    evidenceNext:
      "On Thursday, our engineering lead will try sending bookings to the calendar and tell us what still needs fixing or testing.",
    checkpoint: "Thursday afternoon, after the calendar check",
    decisionNeeded:
      "Can we focus on booking for the event and deliver reports later? If both need to launch together, can we agree to change the date?",
    owner: "Sales director, who made the customer promise",
    decisionBy: "Wednesday, before the next customer update",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "",
    communication:
      "Once we've agreed, the sales director will tell customers what to expect. I'll update the team's plan.",
    privateReaction:
      "I'm annoyed that I'm now the one who has to question the date. I'm tempted to forward the email to Engineering and ask them to rescue it.",
    privateAssumption:
      "I'm assuming Sales knew this wasn't checked. I need to ask whether they used an earlier estimate and what the customer is counting on.",
    checkpointFallback:
      "I'd like Sales to agree a demo fallback on Wednesday. If Thursday's calendar check fails, we'd use that only if agreed and tell customers by Friday that booking isn't live. Otherwise I need a decision that day.",
    unresolvedPlan:
      "If we don't hear back by Wednesday, I'll ask the sales director who can make the call. We'll stick with the work already agreed and check again after Thursday's calendar test. No answer doesn't mean we can change the promise.",
  },
  "priority-whiplash": {
    outcome:
      "New customers can join their account, their information stays private, and their reports show the right figures.",
    p1: "Fix the broken invitation link. New customers can't join their account.",
    p2: "Before the next update goes out, check that customers can't see each other's information.",
    p3: "Fix the inaccurate totals in a customer's monthly report.",
    otherWork:
      "The 10 days already planned include answering support questions and checking each other's changes.",
    newAsk:
      "Fictional example: Sales wants a demo of the new report screen for a customer meeting on Friday.",
    whyNow: "The meeting's just been booked for Friday.",
    urgencyBasis:
      "I asked Sales what the customer needs. They want to click through the idea and give us feedback. It doesn't need to be working software yet.",
    priorityChoice: "Narrow the request",
    moves:
      "We could make a clickable demo, but we'd have to put two days of report fixes on hold. I'll check with the team before giving that customer a new date.",
    impact:
      "The customer with the wrong report figures would wait longer. Their account manager needs to explain the delay and agree a new date with them.",
    protected:
      "We'll still fix the invitation link and check that customer information stays private.",
    alternative:
      "We could show the sketches we already have. The customer couldn't click through them, but they could still tell us what they think. All three jobs would stay on track.",
    availableCapacity: "10",
    existingLoad: "10",
    requestLoad: "2",
    capacityWindow: "From now until Friday",
    capacityBasis:
      "Fictional estimates checked with the lead: 10 person-days available before Friday and 10 already planned. The demo adds 2. The same developer is needed for the demo and report fix. Support and review are included; extra hours aren't.",
    recommendation:
      "I'd make the small demo if we're willing to delay the report fix. If not, let's use the sketches. We don't need to build the whole feature for this meeting.",
    decisionOwner:
      "Product director — they can agree to change what we've promised customers",
    decisionDate: "Wednesday afternoon",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "",
    communication:
      "Once we have an answer, I'll tell the team and the account manager by Thursday morning. The account manager will contact the customer waiting for the report fix.",
    reviewDate:
      "Friday, after the meeting. Did the demo help? Did we tell the other customer about the delay?",
    privateReaction:
      "I don't want to be the person who always says no. But I also don't want to tell the team we've squeezed this in and leave them to find the extra time.",
    privateAssumption:
      "I'm assuming Sales just wants something impressive. I need to ask what the customer will decide on Friday and whether anyone has already started the demo.",
    unresolvedPlan:
      "If we haven't heard by Wednesday afternoon, I'll follow up with the product director. Until someone agrees to the change, we'll keep going with the three jobs already planned.",
  },
  "mandate-reset": {
    outcome:
      "Get online repair booking out on the agreed date, with one plan everyone can follow.",
    blockedDecision:
      "Who gets to say whether a new request goes into this release, and what has to wait if it does?",
    consequence:
      "On Tuesday I deferred the reports request. On Wednesday a director asked a developer to start it anyway. On Friday I was asked why booking had slipped.",
    recommend:
      "I'll bring the options and explain what each would mean for the team and the date.",
    approve:
      "The product director makes the final call on what goes into this release.",
    execute:
      "The developers build and test it. I update the plan and tell people what's changed.",
    block:
      "Other directors can ask for changes. Our security reviewer can stop a release if customer information isn't protected.",
    accountable:
      "I explain where we are with delivery. The engineering lead makes sure the software passes the checks it needs.",
    rightsEvidence:
      "The product director has made these calls before. I still need them to confirm this is how we'll handle new requests and tell the other directors.",
    requiredApprovals:
      "Security still needs to approve how we protect customer data. Finance signs off extra spending. Our engineering lead confirms the software is ready to go out.",
    consult:
      "Before deciding, let's ask the developers what the change involves and the account manager what we've promised the customer.",
    gap: "I'm responsible for the date, but I can't stop more work being added. When two requests clash, we don't know who to ask for a quick answer.",
    request:
      "Could you confirm that new requests need your decision before a developer starts them? I'd bring you the options. If another director gives a different instruction, I need you to settle it and confirm what happens to the date.",
    boundaries:
      "We'd keep the same budget and all the security and release checks. I'm asking to change how we choose the work, not skip those checks.",
    fallback:
      "If I can't make that call, could you give us an answer within one working day? While we're waiting, we'd stick with the plan you've already agreed.",
    owner: "Product director",
    date: "Before Monday's planning meeting",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "",
    interimAction:
      "I'll collect the requests and ask the team what each would involve. I won't add them to the plan until we have an answer.",
    reviewDate:
      "After the next two requests: did we get an answer in time, and did everyone know which plan to follow?",
    privateReaction:
      "I worry that asking for help will sound like I can't do the job. But negotiating a different plan with every director isn't working.",
    privateAssumption:
      "I'm assuming my manager knows how often my decisions get changed. I need to show them an example and ask what they expected me to do.",
    unresolvedPlan:
      "If we don't have an answer before Monday's planning meeting, I'll ask the product director when we can talk. We'll keep the last agreed plan in the meantime.",
  },
  "when-the-team-goes-quiet": {
    moment:
      "Fictional example: in Monday’s planning meeting, our data analyst started to raise a question about the booking report. I said, “Can we stick to the release plan?” Nobody raised it again.",
    effect:
      "Afterward, I heard that the report might miss bookings from the new page. Support uses that report to plan the next day’s work.",
    privateReaction:
      "I’m embarrassed that I cut the question off. Part of me wants to explain how rushed we were.",
    privateAssumption:
      "I’m assuming people don’t feel able to disagree with me. I haven’t asked. The analyst may also have needed time to check the numbers.",
    person: "The data analyst I interrupted",
    setting:
      "Ask for a short chat, away from the team meeting. Offer to hear it in writing if that’s easier.",
    opening:
      "I cut you off when you started talking about the report on Monday. I’m sorry. I was trying to keep us moving, but I didn’t hear what you were trying to tell us.",
    question:
      "What did I miss? And what was it like trying to raise that in the meeting?",
    quietHeard:
      "Practice example only: “I was trying to explain that the report wouldn’t include the new bookings. When you moved on, I thought the decision had already been made.”",
    quietCorrection:
      "Practice example only: they weren’t asking to cancel the release. They wanted us to check the report before we committed to Friday.",
    understanding: "",
    myChange:
      "At the next planning meeting, I’ll hear questions about the plan before I ask whether we’re ready to go ahead. If someone raises a concern, I’ll ask them to finish before I respond.",
    sharePermission:
      "I haven’t asked what they’re comfortable sharing yet. I won’t repeat a private comment or name them in the team update.",
    decisionStatus: "PROPOSAL — not discussed yet",
    finalDecision: "",
    nextAction:
      "Invite the analyst to talk today. Check what needs to happen with the report separately; don’t wait for the next team meeting to deal with that.",
    checkpoint:
      "After the next two planning meetings, ask whether people had enough time to raise a concern and what happened when they did.",
    unresolvedPlan:
      "If they’d rather not talk, don’t press. I can still acknowledge the interruption and change how I handle questions.",
    teamUpdate:
      "For the next two planning meetings, I’ll send the proposed plan the day before and leave time to hear concerns before we decide. You can also send me a question beforehand. Let’s check afterward whether that helped.",
  },
};
