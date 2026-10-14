export const LEADERSHIP_SAMPLES: Record<string, Record<string, string>> = {
  "deadline-reset": {
    outcome:
      "Let customers book a repair appointment online at the November 1 customer event.",
    date: "November 1",
    promise:
      "Fictional example: our sales director told customers they could book repairs online and download service reports from November 1.",
    fixed:
      "The customer event is booked for November 1. Customers need to see how online booking will work.",
    constraintBasis:
      "The sales director confirmed the event date. No contract requires both features to be ready that day.",
    assumed:
      "We assumed the booking page would connect to the repair calendar without more work, and that downloadable reports would be ready too.",
    unknown:
      "We have not checked whether bookings reach the repair calendar correctly or how much testing is left.",
    scopeMove:
      "Aim to offer online booking on November 1 and add downloadable service reports later. The engineering lead needs to check the calendar connection on Thursday before confirming that plan.",
    dateMove:
      "If both booking and reports must be ready together, ask the engineering lead for a new delivery estimate after Thursday's check. We do not have a reliable replacement date yet.",
    capacityMove:
      "Keep the current team. Reserve time for checking the calendar connection and testing bookings. Do not assume anyone will work overtime.",
    qualityGuardrails:
      "Customers must only see their own bookings. The team must test that appointments are recorded correctly and complete its security review.",
    consequence:
      "If we keep promising both features for November 1, we risk letting customers down because the calendar connection and remaining testing are still unconfirmed.",
    chosenOption: "Keep date / change scope",
    recommendation:
      "Keep the event, aim for working online booking, and explain that reports will come later. Confirm what we can promise after Thursday's calendar check.",
    confidence: "Medium",
    confidenceScope:
      "Online booking by November 1, provided Thursday's calendar check succeeds.",
    forecastBasis:
      "The booking page is built. The engineering lead thinks the remaining work can fit, but has not yet checked the calendar connection.",
    evidenceNext:
      "The engineering lead will send test bookings to the repair calendar on Thursday and list any fixes or testing still needed.",
    checkpoint: "Thursday afternoon, after the calendar check",
    decisionNeeded:
      "Agree to focus on booking for the event, or ask for a new date when booking and reports can both be ready.",
    owner: "Sales director, who made the customer promise",
    decisionBy: "Wednesday, before the next customer update",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision:
      "We have not discussed this recommendation with the sales director yet.",
    communication:
      "The sales director will tell customers what to expect. After a decision, the product manager will update the team's plan.",
    privateReaction:
      "I am frustrated that customers were promised this before we checked the calendar connection.",
    privateAssumption:
      "I am assuming the sales director ignored the risks. I need to ask what customers were told and what they need for the event.",
    checkpointFallback:
      "If the calendar check fails, ask the sales director on Thursday whether the event should show a demonstration only. Tell customers by Friday that online booking is not yet available.",
    unresolvedPlan:
      "If we cannot get a decision, ask who can make it and when they can respond. Keep working to the last agreed plan within our existing authority. Check again on the date recorded above; silence does not mean yes.",
  },
  "priority-whiplash": {
    outcome:
      "Help new customers join their account, keep customer information private, and give customers accurate report figures.",
    p1: "Fix the broken invitation link that stops new customers joining their account.",
    p2: "Check that customers cannot see another customer's information before releasing the next software update.",
    p3: "Correct the inaccurate totals in a customer's monthly report.",
    otherWork:
      "The team's estimate of 10 days of existing work includes customer support and checking each other's changes.",
    newAsk:
      "Fictional example: the sales director asks us to show a customer how a proposed report screen would work at Friday's meeting.",
    whyNow: "The customer meeting has just been added for Friday.",
    urgencyBasis:
      "The sales director confirmed that the customer wants to react to the proposed screen. They do not need working reporting software for the meeting.",
    priorityChoice: "Narrow the request",
    moves:
      "Make a simple clickable demonstration and put off two days of work on the incorrect report totals. Check the new report-fix date with the team before promising it.",
    impact:
      "The customer waiting for accurate report totals would wait longer. Their account manager needs the revised date and must tell them what is happening.",
    protected:
      "Keep the invitation-link fix and the checks that protect customer information.",
    alternative:
      "Keep all three current commitments and show the customer the sketches we already have. They could discuss the idea, but would not be able to click through it.",
    availableCapacity: "10",
    existingLoad: "10",
    requestLoad: "2",
    capacityWindow: "The remaining working time from now to Friday",
    capacityBasis:
      "Fictional estimates: the people involved have 10 days of work time between them before Friday. Existing work needs all 10 days; the simple demonstration needs 2 more. These totals include support and review, with no overtime.",
    recommendation:
      "Use a simple clickable demonstration for Friday only if we agree to delay the report correction. It lets the customer react to the idea without asking the team to build the full feature.",
    decisionOwner:
      "Product director, who can approve changes to these customer commitments",
    decisionDate: "Wednesday afternoon",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "The product director has not made the decision yet.",
    communication:
      "After the decision, the product manager will update the team and the account manager by Thursday morning. The account manager will tell the customer waiting for the report correction.",
    reviewDate:
      "Friday after the customer meeting: did the demonstration help, and was the report customer told about the delay?",
    privateReaction:
      "I feel as though the work we already promised has been forgotten.",
    privateAssumption:
      "I am assuming the demonstration is just to impress someone. I need to ask what the customer needs to see.",
    unresolvedPlan:
      "If we cannot get a decision, ask who can make it and when they can respond. Keep working to the last agreed plan within our existing authority. Check again on the date recorded above; silence does not mean yes.",
  },
  "mandate-reset": {
    outcome:
      "Release an online repair-booking page on the agreed date, with one plan the team can follow.",
    blockedDecision:
      "Who can decide whether a new request replaces work already planned for this release?",
    consequence:
      "Different directors keep asking developers to add features. I am expected to meet the original date, but cannot postpone those requests.",
    recommend:
      "Product manager: brings the options and explains what each would change.",
    approve:
      "Product director: can make the final call about what goes into this release.",
    execute:
      "Developers build and test the changes; the product manager updates the plan.",
    block:
      "Other directors can ask for work. The security reviewer can withhold release approval if customer information is not protected.",
    accountable:
      "The product manager must explain delivery progress. The engineering lead is responsible for the software checks.",
    rightsEvidence:
      "The product director has approved release changes before. We still need them to confirm how new requests should be handled and tell the other directors.",
    requiredApprovals:
      "The security reviewer must approve the customer-data checks. The finance manager approves extra spending. The engineering lead confirms that the software is ready to release.",
    consult:
      "Ask the developers about the work involved and the account manager about customer promises before making the final call.",
    gap: "I am held responsible for the release date, but directors can add work and I cannot say what should wait. We have no agreed way to get a quick decision.",
    request:
      "Send new requests to the product director before adding them to the team's plan. The director should say whether to add them now and, if they do not fit, what should wait.",
    boundaries:
      "Keep the agreed budget and the required security and software checks. This changes how we choose work; it does not remove those approvals.",
    fallback:
      "If I cannot make that call, ask the product director to respond within one working day. Keep the last agreed plan while waiting.",
    owner: "Product director",
    date: "Before Monday's planning meeting",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision:
      "The product director has not agreed to this way of handling requests yet.",
    interimAction:
      "I will collect the new requests and check how much work they involve. I will not change the agreed plan without permission.",
    reviewDate:
      "After the next two requests, check whether the director responded in time and the team received one clear plan.",
    privateReaction: "I feel blamed for a date I cannot protect.",
    privateAssumption:
      "I am assuming the directors are avoiding the decision. I need to check what they think I am allowed to decide.",
    unresolvedPlan:
      "If we cannot get a decision, ask who can make it and when they can respond. Keep working to the last agreed plan within our existing authority. Check again on the date recorded above; silence does not mean yes.",
  },
  "product-project-translator": {
    request:
      "Fictional example: Please give me the final list of features before I reserve next quarter's budget.",
    stakeholder: "Finance director",
    context:
      "Finance needs to decide how much money to set aside for a new online repair-booking service.",
    need: "Budget / staffing",
    needEvidence:
      "The finance director confirmed they need a spending limit by Thursday. They do not need every screen agreed yet.",
    assumption:
      "We are assuming we can choose the booking screens before customers have tried either design.",
    outcome:
      "Find a booking design customers can use without phoning the service desk.",
    known:
      "Customers currently phone to book repairs. We have sketches of two booking designs, but customers have not tried them.",
    unknown:
      "Can customers complete a booking using either design, and what would it take to build the better one?",
    commit:
      "Propose spending up to $5,000 over two weeks to let five customers try both designs and ask Engineering what each would take to build. The product manager arranges the customer sessions; the engineering lead estimates the build work.",
    commitmentBounds:
      "Maximum $5,000 and two weeks, including customer sessions and Engineering's assessment. No working booking service or full-build budget is promised at the end.",
    checkpoint:
      "If Finance approves, book a review two weeks after we start. Bring the customer results, Engineering's estimate, and a recommendation to build, change the design, or stop.",
    response:
      "I understand you need a spending limit by Thursday. Could we set aside up to $5,000 for two weeks to try both booking designs with five customers and check the build work with Engineering? We would then bring you the results and a recommendation before asking for the full build budget.",
    spokenResponse:
      "You need a budget by Thursday. Could we approve up to $5,000 for two weeks of customer testing first? Then we can show you which design works and what it would take to build before you commit to the full cost.",
    decisionNeeded:
      "Approve or change the proposed $5,000, two-week customer test and Engineering assessment.",
    owner: "Finance director",
    decisionDate: "Thursday, before booking the customer sessions",
    decisionStatus: "PROPOSAL — awaiting a decision",
    finalDecision: "The finance director has not responded yet.",
    nextAction:
      "The product manager will discuss the proposal with Finance on Thursday. Book the customer sessions and review meeting only after approval.",
    privateReaction: "I feel pushed to promise details we have not worked out.",
    privateAssumption:
      "I am assuming Finance wants to control the design. I need to ask what they need the feature list for.",
    unresolvedPlan:
      "If we cannot get a decision, ask who can make it and when they can respond. Keep working to the last agreed plan within our existing authority. Check again on the date recorded above; silence does not mean yes.",
  },
};
