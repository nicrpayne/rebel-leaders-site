type Presentation = {
  image: string;
  imageLayout?: "portrait" | "wide";
  lead: string;
  accent: string;
  promise: string;
  session: string;
  benefits: [string, string, string];
  artifacts: Array<{ name: string; copy: string }>;
  example: string;
  sampleValues: Record<string, string>;
};

export const FIELD_TOOL_PRESENTATIONS: Record<string, Presentation> = {
  "ai-stalemate": {
    image: "/assets/field-tools/ai-stalemate-hero-v2.webp",
    imageLayout: "wide",
    lead: "You keep having the same conversation about AI.",
    accent: "What would help you move forward?",
    promise:
      "Talk through what you hope AI could improve, what worries your colleague, and what you can try or resolve together.",
    session:
      "Take 5–10 minutes to prepare, then talk it through together. If you agree to an experiment, return afterward to record the results.",
    benefits: [
      "Explain what you hope to improve",
      "Understand the concerns",
      "Agree what happens next",
    ],
    artifacts: [
      {
        name: "Experiment Plan",
        copy: "What you will try, how much time you will spend, and what would make it worth doing again.",
      },
      {
        name: "Results Record",
        copy: "Time spent writing, checking, reviewing, and fixing the work, alongside the quality checks.",
      },
      {
        name: "Decision Brief",
        copy: "What you decided, why, and who will do what next.",
      },
    ],
    example:
      "Your support team copies repair requests between two systems. AI might help build an app that saves that work. Your lead wants to check who can see each customer’s records before anyone connects the app to real data.",
    sampleValues: {
      betBasis:
        "Fictional example. The team needs to check who may see repair records and write tests for those rules. It has not measured whether AI saves time. Permission and review arrangements must be agreed first.",
      betHypothesis:
        "We think AI might help write the repetitive permission tests with less total work, including review and fixes. The tests must still prove that allowed access works and forbidden access fails.",
      expectedLift:
        "Prediction for a possible future experiment: 20% less total working time than a similar task without AI. We need to record that comparison task first. This is not a promise.",
      betQualitative:
        "Ask the author and reviewer whether the tests are easier to write and check, and whether they can explain what each test proves.",
      task: "Possible future experiment: write permission tests for one part of the repair app’s API—the connection other software uses—with made-up customer records. No connection to live systems, real customer data, permission redesign, or unrelated code changes.",
      comparator:
        "A similar permission-test task completed without AI. Use a task of similar size, with the same author experience, review, and required checks. Write down any differences that could affect the result.",
      tool: "A team-approved coding assistant; approval still needs confirmation before the test.",
      toolVersion: "Record the approved model/version before starting.",
      inputs:
        "Made-up customer records and code approved for this test environment. No real customer information.",
      approvalOwner:
        "The engineering manager and the person responsible for security must confirm the tool, code, and data are allowed before the test.",
      qualityBar:
        "An experienced reviewer checks that permitted users can see the right repair records and other users cannot, including direct requests to the API. The tests must also pass the team’s usual automated checks.",
      capacity:
        "Proposed limit: four hours of work across everyone involved, including at most one hour of review. The PM will ask the product director whether updating the help pages can wait. This time has not been approved.",
      betTimebox:
        "One week after permission and review arrangements are confirmed. Agree the actual start date, finish date, and final review before starting.",
      betRabbitHoles:
        "Stop if we need to redesign who can access records or connect to live systems. Those changes need separate decisions.",
      success:
        "Proposed minimum: at least 10% less total working time than the task without AI, all the same checks passing, and no more than one hour of review. Agree these before starting.",
      stop: "Stop if we encounter unapproved data or tool access, a permission check fails, or we reach the agreed time limit for the work or review.",
      owners:
        "A developer and experienced engineer work together. The engineer reviews the tests. The engineering manager approves technical results; the product director approves other work being postponed. Confirm names and a review date before starting.",
      betStatus: "PROPOSED — NOT YET ACCEPTED",
      betResult:
        "The experiment has not started. We have no result about time saved or quality. The next step is to prepare.",
      betLearning:
        "Our conversation showed that we need agreed data permissions and practice checking and releasing code. It did not show whether AI saves time.",
      happened:
        "We have talked about using AI to help build the repair app twice. I want to save the support team repeated typing. My lead wants to check who can see the customer records and who will review the code. We have not agreed what to do next.",
      story:
        "I have been reading their hesitation as resistance. I have not asked what they would need to be comfortable trying this.",
      protecting:
        "I want support staff to stop copying the same request twice and customers to stop chasing missed repairs.",
      why: "The team is doing work a useful app could take off their hands. I want them to have time to help customers whose requests are more complicated.",
      futurePicture:
        "Support staff enter a repair request once, can see that it reached the right people, and spend less time chasing it.",
      observed:
        "My lead showed me that we have not tested whether one customer’s records can be seen by another. We have not measured the time AI would save on this work.",
      prediction:
        "AI might help us write the first version faster. We do not know how much checking and fixing it would need.",
      changeMind:
        "If the finished work takes longer after review and fixes, or fails the required checks, I would reconsider this use.",
      askOther:
        "What would you need to check before we could try a small piece of this?",
      visionTeam:
        "Developers can explain and check the changes they make. Reviewers have time to help instead of receiving a pile of unfamiliar code at the end.",
      visionProduct:
        "Customers submit a repair request once and can trust it has reached the right team.",
      visionCompany:
        "If we find a way of working that helps, we could teach it to other teams. Both of us could help shape how the company uses these tools.",
      counterpartConcern:
        "We have not checked who can access which repair records, and nobody has time set aside to review the code.",
      openQuestions:
        "We both want to stop the repeated typing. We still need to check the claimed financial benefit, agree who can see the records, and make time for review.",
      conversationStatus: "PROPOSED — NOT YET AGREED",
      outcome:
        "Help support staff enter each repair request once, while keeping customer records visible only to the right people.",
      sharedVision:
        "Support staff spend less time copying and chasing requests. Developers can explain and check the app, and other teams can learn from what we find.",
      businessContext:
        "Fictional example. Support staff copy repair requests into two systems, and some requests are missed. The PM wants to use AI to help build an app that removes the repeated typing. The sales director says removing the delays could be worth $500,000 a week, but we have not seen how they calculated that figure.",
      businessBasis:
        "The figure comes from the sales director. Finance has not checked it or said whether it means money lost now, possible future income, or time saved. The PM will ask Finance by Thursday.",
      growthOpportunity:
        "The team could learn how to check generated code and protect customer records, then help other teams do the same. That could create opportunities, but we cannot promise them.",
      accessModel:
        "Support staff and repair engineers need different access to customer records. We have not agreed who can see or change each record, who grants access, or who removes it when someone leaves.",
      securityChecks:
        "The engineering manager found that we have not tested direct requests to the app’s API. The security owner will review the permission rules and require tests for allowed and forbidden access before any connection to live systems.",
      automationBoundary:
        "No AI access to live customer data, release credentials, or permission to change live systems. A later test could use an approved test environment and made-up records, after review.",
      teamReadiness:
        "The developers have worked in support and IT services. For this app, they have not yet shown how they will check permissions, review code changes, or release and undo a change.",
      readinessSupport:
        "The engineering manager will pair developers with an experienced reviewer. The PM will ask for time to do it. The team will demonstrate a reviewed change, permission tests, and restoring the previous version before Tuesday’s review.",
      readinessDecision: "PREPARE FIRST",
      prerequisitePlan:
        "The PM checks the claimed benefit with Finance Thursday. The data and security owners agree who may access the records Friday. The engineering manager arranges the practice and review. The PM and lead check progress next Tuesday.",
      decision: "PAUSE",
      reason:
        "The idea could help, but we need agreed data permissions and a team that can check and release the change safely before trying it.",
      limits:
        "We have not measured an AI result or checked the sales director’s financial estimate. This decision covers only the proposed repair-app use.",
      next: "Agree who may access the records, test those rules, and practise releasing and undoing a small change with an experienced engineer. The PM and engineering manager review progress next Tuesday.",
      leadershipUpdate:
        "We want to stop support staff copying requests twice. First we need to agree who can see the records and practise checking and releasing the code. Can we make time for that preparation? We will review progress next Tuesday.",
    },
  },
  "deadline-reset": {
    image: "/assets/field-tools/deadline-reset-hero-v2.webp",
    imageLayout: "wide",
    lead: "They already promised the date.",
    accent: "Now you have to work out what's possible.",
    promise:
      "Find out what was promised, check what the team can deliver, and give the person responsible a clear choice.",
    session:
      "Spend about 20–30 minutes making a first draft. Then check it with the people involved. Come back to record what was decided.",
    benefits: [
      "Check the promise",
      "Work out the options",
      "Ask for a decision",
    ],
    artifacts: [
      {
        name: "Deadline Facts",
        copy: "What was promised, what cannot change, and what still needs checking.",
      },
      {
        name: "Delivery Options",
        copy: "What could be ready by the date, what would take longer, and the checks each option needs.",
      },
      {
        name: "Decision Update",
        copy: "Your recommendation, the decision you need, and who will tell the customer.",
      },
    ],
    example:
      "Sales has promised customers online repair bookings and downloadable service reports by November 1. The customer event is fixed, but the booking system’s connection to the engineers’ calendar has not been tested. Work out what could be ready and who can change the promise.",
    sampleValues: {
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
  },
  "priority-whiplash": {
    image: "/assets/field-tools/priority-whiplash-hero-v2.webp",
    imageLayout: "wide",
    lead: "The team is already busy.",
    accent: "Then another urgent request arrives.",
    promise:
      "Find out what is really needed, show what would have to wait, and get a decision everyone can work from.",
    session:
      "Spend about 20–30 minutes making a first draft. Then check it with the people involved. Come back to record what was decided.",
    benefits: [
      "List the work already promised",
      "Show what would wait",
      "Agree what happens next",
    ],
    artifacts: [
      {
        name: "Current Work List",
        copy: "The work already promised and the new request, in one place.",
      },
      {
        name: "What Would Change",
        copy: "What would wait, who would be affected, and the alternatives.",
      },
      {
        name: "Priority Decision Brief",
        copy: "Your recommendation, who can approve it, and the answer once they have decided.",
      },
    ],
    example:
      "Your team is fixing a broken invitation link, checking that customers cannot see each other’s data, and correcting wrong totals in a customer’s monthly report. The sales director now wants a clickable demonstration of a new report screen for Friday. Find out what the demonstration needs and what would have to wait.",
    sampleValues: {
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
  },
  "mandate-reset": {
    image: "/assets/field-tools/mandate-reset-hero-v3.webp",
    imageLayout: "wide",
    lead: "You're expected to deliver.",
    accent: "But someone else keeps changing the plan.",
    promise:
      "Work out who can make the decision you need, then ask for a specific change in how decisions get made.",
    session:
      "Spend about 20–30 minutes making a first draft. Then check it with the people involved. Come back to record what was decided.",
    benefits: [
      "Find out who can decide",
      "Explain what is getting stuck",
      "Ask for a specific change",
    ],
    artifacts: [
      {
        name: "Who Can Decide",
        copy: "Who makes the call, who gives advice, and whose approval is needed.",
      },
      {
        name: "The Decision Problem",
        copy: "What you are expected to deliver and which decision is getting in the way.",
      },
      {
        name: "Decision Request",
        copy: "The change you are asking for, who can agree it, and what you do while waiting.",
      },
    ],
    example:
      "You are expected to launch online repair bookings on time. Several directors keep asking for more features, and you cannot turn them down or postpone them. Ask for one person to decide which requests change the plan—and what waits when they do.",
    sampleValues: {
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
  },
  "product-project-translator": {
    image: "/assets/field-tools/product-project-translator-hero-v2.webp",
    imageLayout: "wide",
    lead: "‘Just give me the final requirements.’",
    accent: "You haven't worked out the answer yet.",
    promise:
      "Find out what they need to decide. Give them a useful answer without promising work you cannot yet describe.",
    session:
      "Spend about 20–30 minutes making a first draft. Then check it with the people involved. Come back to record what was decided.",
    benefits: [
      "Ask what they need to decide",
      "Say what you know so far",
      "Offer a useful next step",
    ],
    artifacts: [
      {
        name: "What They Need",
        copy: "The original request and what the person needs your answer for.",
      },
      {
        name: "Proposed Commitment",
        copy: "What you can promise now, what is still unknown, and when you will check again.",
      },
      {
        name: "Your Reply",
        copy: "A short reply for the meeting and a written version you can send afterward.",
      },
    ],
    example:
      "Finance asks for the final feature list before reserving money on Thursday. You have two sketches for an online repair-booking screen, but customers have tried neither. Find out what Finance needs to approve now and what you can learn before committing to the full build.",
    sampleValues: {
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
      privateReaction:
        "I feel pushed to promise details we have not worked out.",
      privateAssumption:
        "I am assuming Finance wants to control the design. I need to ask what they need the feature list for.",
      unresolvedPlan:
        "If we cannot get a decision, ask who can make it and when they can respond. Keep working to the last agreed plan within our existing authority. Check again on the date recorded above; silence does not mean yes.",
    },
  },
};
