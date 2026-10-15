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
        "Fictional example. We need tests that check who can see each repair record. We think AI might help write them, but we haven't tried it. First we need to agree the access rules and make time for someone to review the code.",
      betHypothesis:
        "Could AI help us write these tests with less work overall, once we've counted the checking and fixes? They still need to prove that people can see the records they're allowed to see, and can't see the others.",
      expectedLift:
        "Our guess is 20% less time, including checking and fixes. We haven't measured that. First we'll record how long a similar job takes without AI.",
      betQualitative:
        "Ask the developer and reviewer: was this easier to write and check? Can you explain what each test is checking?",
      task: "Try writing permission tests for one part of the repair app's API, using made-up customer records. That's the connection other software uses to reach the app. We won't connect to the live system, use real records, redesign permissions, or change unrelated code.",
      comparator:
        "Compare it with a similar set of tests written without AI. Keep the size of the job, the developer's experience, and the checks as close as we can. Note anything that makes the comparison less fair.",
      tool: "A coding assistant the team is allowed to use. We still need to confirm which one.",
      toolVersion: "We'll write down the model and version before we start.",
      inputs:
        "Made-up customer records and code we're allowed to use in the test. No real customer information.",
      approvalOwner:
        "Our engineering manager and security owner need to confirm which tool, code, and data we're allowed to use.",
      qualityBar:
        "An experienced reviewer checks that people can see the right repair records and can't get into anyone else's, even by going straight to the API. All our usual automated checks still need to pass.",
      capacity:
        "Could we allow four hours across everyone involved, with no more than one hour of review? The PM will ask whether the help-page updates can wait to make room. Nobody has agreed to that yet.",
      betTimebox:
        "One week, once we've agreed the permissions and who will review the work. We still need to choose the dates and book the final review.",
      betRabbitHoles:
        "If we find we need to redesign permissions or connect to live systems, we'll stop and talk about that separately.",
      success:
        "We'd want at least 10% less time overall, all the same checks passing, and no more than an hour of review. Let's agree those limits before we start.",
      stop: "Stop if we come across data or tool access we haven't approved, a permission test fails, or we run out of the time agreed for the work or review.",
      owners:
        "A developer works with an experienced engineer, who reviews the tests. Our engineering manager signs off the technical work. The product director decides what other work can wait. We still need names and a review date.",
      betStatus: "PROPOSED — NOT YET ACCEPTED",
      betResult:
        "We haven't run the experiment yet. We don't know whether AI will save us time or how good the work will be.",
      betLearning:
        "Talking it through showed us two things to sort out first: who can see the records, and how we'll check and release the code. We haven't tried the AI work yet, so we can't say whether it helps.",
      happened:
        "We've talked about using AI for the repair app twice. I want to stop the support team typing every request into two systems. My lead keeps asking who can see the records and who'll check the code. We haven't worked out what to do next.",
      story:
        "I've been taking their hesitation as a no. I haven't asked what they'd need before we could try it.",
      protecting:
        "I want to stop the double typing and the missed repairs customers keep chasing us about.",
      why: "I'd like the team to have more time to help customers, instead of copying information from one place to another.",
      futurePicture:
        "Someone enters a repair once, sees it's reached the right person, and doesn't have to chase it.",
      observed:
        "My lead showed me that we haven't tested whether one customer could get into another's records. We also haven't measured how much time AI would save.",
      prediction:
        "AI might help us get a first version written faster. I don't know how much checking and fixing we'd need afterward.",
      changeMind:
        "If we spend more time checking and fixing than we save, or the work doesn't pass our checks, I'd rethink this.",
      askOther:
        "What would you need to check before we could try a small piece of this?",
      visionTeam:
        "The developers understand the code they're changing, and reviewers have time to help as we go. Nobody gets a pile of unfamiliar code at the last minute.",
      visionProduct:
        "Customers enter a repair request once and know it's reached the right team.",
      visionCompany:
        "If this helps, we could show other teams what worked. I'd like both of us to help decide how we use AI here.",
      counterpartConcern:
        "We haven't agreed who can see which records, and nobody has time set aside to check the code.",
      openQuestions:
        "We both want to stop the double typing. We still need to check the money claim, agree who can see the records, and find time for review.",
      conversationStatus: "PROPOSED — NOT YET AGREED",
      outcome:
        "Support staff enter each repair once, and customers' records stay private.",
      sharedVision:
        "Less time copying and chasing requests. An app the team understands and can look after. And, if it works, something we can teach other teams.",
      businessContext:
        "Fictional example. Support staff type repair requests into two systems, and some get missed. The PM thinks AI could help us build an app to avoid that. The sales director says fixing the delays could be worth $500,000 a week. We haven't seen the calculation.",
      businessBasis:
        "That figure came from the sales director. Finance hasn’t checked it. We don't know whether they mean money we're losing, possible future sales, or staff time. The PM will ask by Thursday.",
      growthOpportunity:
        "We could get better at checking AI-generated code and protecting customer records, then help other teams learn it too. That might open doors for people, but we shouldn't promise it.",
      accessModel:
        "Support staff and repair engineers need to see different things. We haven't agreed who can see or change each record, who gives them access, or who takes it away when they leave.",
      securityChecks:
        "We've checked the screens, but not what happens when someone asks the API for a record directly. Our security owner needs to check the rules, and we need tests for both allowed and blocked access before connecting to live systems.",
      automationBoundary:
        "No AI access to live customer data or release credentials, and no permission to change live systems. If we agree to a test later, we'll use an approved test environment and made-up records.",
      teamReadiness:
        "The team knows support and IT services. We still need to practise checking permissions, reviewing code, and putting out a change we can undo if it goes wrong.",
      readinessSupport:
        "Our engineering manager will arrange practice with an experienced reviewer. The PM will ask for the time. Before Tuesday's review, we'll show a checked code change, working permission tests, and how to restore the previous version.",
      readinessDecision: "PREPARE FIRST",
      prerequisitePlan:
        "The PM will ask Finance about the $500,000 figure on Thursday. The data and security owners will agree who can see the records on Friday. Our engineering manager will arrange the practice and review. The PM and lead will check in next Tuesday.",
      decision: "PAUSE",
      reason:
        "This could save us time, but we're not ready to try it yet. We need to agree who can see the records and practise checking, releasing, and undoing a change.",
      limits:
        "We haven't tried the AI work or checked the sales director's figure yet. We're only deciding what to do about this repair app, not whether AI is useful everywhere.",
      next: "Let's agree who can see the records, test those rules, and practise putting out a small change we can undo. An experienced engineer will help. The PM and engineering manager will check in next Tuesday.",
      leadershipUpdate:
        "We want to stop the support team typing each request twice. Before we try AI, we need to sort out who can see the records and practise checking and releasing the code. Could we make time for that? We'll check in next Tuesday.",
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
      privateReaction:
        "I feel like I'm being blamed for a date I can't protect.",
      privateAssumption:
        "I'm assuming the directors are ducking the decision. I should ask what they think I'm already allowed to decide.",
      unresolvedPlan:
        "If we don't have an answer before Monday's planning meeting, I'll ask the product director when we can talk. We'll keep the last agreed plan in the meantime.",
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
  },
};
