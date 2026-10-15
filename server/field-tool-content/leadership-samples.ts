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
    finalDecision: "We haven't spoken to the sales director about this yet.",
    communication:
      "Once we've agreed, the sales director will tell customers what to expect. I'll update the team's plan.",
    privateReaction:
      "I'm frustrated that we promised this before checking whether it would work.",
    privateAssumption:
      "I'm assuming Sales ignored the risks. I need to find out what they actually promised and what customers need from the event.",
    checkpointFallback:
      "If the calendar check fails, I'll ask Sales on Thursday whether we should show a demo at the event instead. We'd need to tell customers by Friday that they won't be able to book yet.",
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
      "Fictional estimates: we've got 10 working days between us before Friday, and all 10 are spoken for. The demo needs another 2. That includes support and checking the work; nobody's working extra hours to make it fit.",
    recommendation:
      "I'd make the small demo if we're willing to delay the report fix. If not, let's use the sketches. We don't need to build the whole feature for this meeting.",
    decisionOwner:
      "Product director — they can agree to change what we've promised customers",
    decisionDate: "Wednesday afternoon",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "The product director hasn’t made the decision yet.",
    communication:
      "Once we have an answer, I'll tell the team and the account manager by Thursday morning. The account manager will contact the customer waiting for the report fix.",
    reviewDate:
      "Friday, after the meeting. Did the demo help? Did we tell the other customer about the delay?",
    privateReaction:
      "It feels like we've forgotten everything we already promised.",
    privateAssumption:
      "I'm assuming this is just about impressing someone. I haven't asked what the customer actually needs to see.",
    unresolvedPlan:
      "If we haven't heard by Wednesday afternoon, I'll follow up with the product director. Until someone agrees to the change, we'll keep going with the three jobs already planned.",
  },
  "mandate-reset": {
    outcome:
      "Get online repair booking out on the agreed date, with one plan everyone can follow.",
    blockedDecision:
      "Who gets to say whether a new request goes into this release, and what has to wait if it does?",
    consequence:
      "Directors keep going straight to developers with more features. I'm still expected to hit the date, but I can't say no or move anything out.",
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
      "Could new requests come to you before we add them to the plan? We'd need you to say whether they go in now and, if there's no room, what comes out.",
    boundaries:
      "We'd keep the same budget and all the security and release checks. I'm asking to change how we choose the work, not skip those checks.",
    fallback:
      "If I can't make that call, could you give us an answer within one working day? While we're waiting, we'd stick with the plan you've already agreed.",
    owner: "Product director",
    date: "Before Monday's planning meeting",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "The product director hasn't agreed to this yet.",
    interimAction:
      "I'll collect the requests and ask the team what each would involve. I won't add them to the plan until we have an answer.",
    reviewDate:
      "After the next two requests: did we get an answer in time, and did everyone know which plan to follow?",
    privateReaction: "I feel like I'm being blamed for a date I can't protect.",
    privateAssumption:
      "I'm assuming the directors are ducking the decision. I should ask what they think I'm already allowed to decide.",
    unresolvedPlan:
      "If we don't have an answer before Monday's planning meeting, I'll ask the product director when we can talk. We'll keep the last agreed plan in the meantime.",
  },
  "product-project-translator": {
    request:
      "Fictional example: ‘Can you send me the final feature list? I need to set aside next quarter's budget.’",
    stakeholder: "Finance director",
    context: "Finance needs to set aside money for online repair booking.",
    need: "Budget / staffing",
    needEvidence:
      "I asked what they need by Thursday. It's a spending limit, not a decision on every screen.",
    assumption:
      "We're acting as though we know which design to build, but no customer has tried either one yet.",
    outcome:
      "Customers can book a repair themselves without having to phone us.",
    known:
      "Customers phone us to book repairs today. We've sketched two ways they could do it online, but haven't tried either with customers.",
    unknown:
      "Can customers finish a booking with either design? What would it take to build the one that works better?",
    commit:
      "Could we spend up to $5,000 over two weeks trying both designs with five customers? I'll arrange the sessions, and our engineering lead will check what each design would take to build.",
    commitmentBounds:
      "We'd spend no more than $5,000 and two weeks, including the customer sessions and the engineering estimate. We wouldn't be promising a working service or agreeing the full build budget yet.",
    checkpoint:
      "If Finance says yes, let's meet two weeks after we start. We'll show what customers could and couldn't do, what the build would involve, and whether we think we should build it, change it, or stop.",
    response:
      "Could we set aside up to $5,000 for two weeks first? That would let us try both designs with five customers and check the build work with Engineering. We'd bring you what we learn before asking you to fund the whole thing. Would that give you enough to work with on Thursday?",
    spokenResponse:
      "Could we fund two weeks first, up to $5,000? We'd try both designs with five customers and check what they'd take to build. Then we'd have a better basis for the full budget.",
    decisionNeeded:
      "Can we spend up to $5,000 over two weeks on customer sessions and an engineering estimate, or do we need to change that plan?",
    owner: "Finance director",
    decisionDate: "Thursday, before booking the customer sessions",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "The finance director hasn't responded yet.",
    nextAction:
      "I'll talk this through with Finance on Thursday. If they say yes, I'll book the customer sessions and the review meeting.",
    privateReaction:
      "I feel pushed to promise something we haven't figured out yet.",
    privateAssumption:
      "I'm assuming Finance wants to control the design. I need to ask what they need the list for.",
    unresolvedPlan:
      "If we don't get an answer on Thursday, I'll ask Finance what they still need and when we can talk again. I won't book the paid sessions until we've agreed the money.",
  },
};
