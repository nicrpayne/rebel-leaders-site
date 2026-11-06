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
      "A replacement repair workflow keeps slipping. The PM wants to explore new tools and ways of working; the lead wants time and support to review the work. They need to choose something worth learning together.",
    sampleValues: {
      betBasis:
        "Fictional example. The replacement repair-request workflow keeps slipping. Support still types everything twice. We want to find out whether a different tool and review approach could help us get something useful in front of users sooner.",
      betHypothesis:
        "If we use an approved AI tool on one small workflow, with an experienced partner and time for review, could we reach useful user feedback sooner? We also want to see what the team learns and where the work gets stuck.",
      expectedLift:
        "We hope to show Support a working prototype within one week and twelve total team hours. That's a guess, not an agreed delivery promise. We'll compare the effort and elapsed time with a recent, similar prototype and record the differences.",
      betQualitative:
        "Can support staff complete a repair request without entering it twice? Ask the developer what they learned and the reviewer what helped or got in the way. Ask users to show us the task, rather than just say they like the demo.",
      task: "Prototype one repair-request workflow with made-up records in an isolated environment. Try an approved coding assistant and automated checks with human review. No live records, connections, release, or full replacement app.",
      comparator:
        "Use our recent prototype of a similar request form as a starting point. Check its scope, design, product, coding, and review time. Note differences in complexity and experience. If the work isn't comparable, don't claim a percentage improvement.",
      tool: "An approved coding assistant and review tools chosen with the lead. We still need to choose them.",
      toolVersion: "Write down the tool, model, and version before starting.",
      inputs:
        "Made-up repair requests and code approved for the prototype. No real customer information or live credentials.",
      approvalOwner:
        "The engineering manager confirms the tools and environment. The product director agrees time and budget with the team.",
      qualityBar:
        "Support can enter a request once and see it reach the right place. We check missing or invalid information and ask users to complete a realistic task. The reviewer checks the code and isolation from live systems. We record production checks separately.",
      capacity:
        "Proposal: twelve hours across product, design, engineering, user feedback, and review, including up to three reviewer hours. At an assumed blended $150/hour that's $1,800, plus a $100 tools and token cap: $1,900 total. Can the help-page updates wait? No extra evening work.",
      betTimebox:
        "One week once the people, tools, and budget are agreed. We'd review next Tuesday; we still need everyone to confirm the dates and time.",
      betRabbitHoles:
        "Stop and talk if this turns into a full replacement app, needs real customer records, or requires changing live systems. We are learning about one workflow.",
      success:
        "Users can complete the chosen task, the prototype passes its agreed checks, and the team can explain what it built. We stay within twelve team hours, three reviewer hours, and $100 tool usage. Decide together whether what we learned justifies another step.",
      stop: "Stop if we reach a time or usage cap, a required check fails, or the task needs unapproved data or access. Bring what we've learned to the review instead of quietly expanding the work.",
      owners:
        "The PM arranges user feedback. A developer pairs with an experienced engineer, who reviews the work. The engineering manager agrees technical conditions; the product director agrees what can wait. Confirm names and next Tuesday's review before starting.",
      betStatus: "PROPOSED — NOT YET ACCEPTED",
      betResult:
        "We haven't run the experiment. We don't have a result about delivery time, quality, or value yet.",
      betLearning:
        "We were arguing about AI in general. Talking it through gave us a smaller question: could we get this workflow in front of users sooner, with support for the team and time to review it? We still need agreement to try it.",
      happened:
        "We've discussed AI twice while the repair workflow keeps slipping. I keep pointing to what other teams are doing. My lead keeps asking who will review and support it. We haven't talked properly about what we could try together.",
      story:
        "I've been treating the hesitation as resistance to change. I haven't asked what worries my lead most or whether we've given the team enough support.",
      protecting:
        "I want Support to stop entering everything twice and the team to have a chance to learn better ways of working.",
      why: "People keep asking when this will be ready. I care about helping them, and I'm excited about AI. I need to stay open to a better idea than mine.",
      futurePicture:
        "Support enters a repair once. The team can get useful changes to users sooner and feels confident choosing, checking, and explaining the tools it uses.",
      observed:
        "Support showed me the duplicate entry. Our delivery date has moved twice. My lead described the review queue. I haven't measured what AI would change here.",
      prediction:
        "A different tool and review approach might help us learn sooner. Other teams' stories don't tell us how much time we'd save.",
      changeMind:
        "If a simpler workflow solves the problem, let's use it. If the experiment adds work without useful learning or a better outcome, I'd change the plan.",
      askOther:
        "Are you willing to explore some different tools or ways of working with me? What would make that worthwhile for you and the team?",
      visionTeam:
        "People have time to learn, an experienced partner to ask, and skills they want for this role or a future one. We ask each person what matters to them.",
      visionProduct:
        "Support enters a repair once, sees it reach the right people, and spends less time chasing it.",
      visionCompany:
        "We get better at choosing useful work and delivering it. Both of us can explain what we learned and help other teams where it applies.",
      counterpartConcern:
        "My lead says the team is already stretched and doesn't want a quick demo to turn into a service nobody has time to review or support. I still need to ask what else worries them.",
      openQuestions:
        "We both want the duplicate entry gone. We need to choose a useful experiment, hear what the team wants to learn, and agree help, review time, and a tool budget. We also need to check the benefit estimate.",
      conversationStatus: "PROPOSED — NOT YET AGREED",
      outcome:
        "Support can enter a repair request once. The team learns whether a different way of working can help it deliver useful changes sooner.",
      sharedVision:
        "Less copying and chasing for Support. A team with time and help to learn, and more confidence in what it can deliver. I'd like my lead and the team to help shape that.",
      businessContext:
        "Fictional example. Support is still entering repair requests twice while the replacement workflow slips. I've heard what that means for customers in meetings my lead hasn't attended. I want to share that context and explore a better approach together.",
      businessBasis:
        "The sponsor estimates $180,000 in annual business value. Finance hasn’t checked the assumptions about adoption or time saved. At 600 total team hours, that's $300 of estimated annual value per team hour. At a hypothetical 400 hours it would be $450. Those aren't measured returns or proof of an AI gain.",
      growthOpportunity:
        "Ask each teammate what they want to learn. Could we make time with an experienced partner, choose tools together, and budget tokens and review help? The skills should help them beyond this one experiment too.",
      accessModel:
        "For this prototype, only the agreed team and test users can access made-up records. Real customer access rules belong in a separate production plan.",
      securityChecks:
        "The lead and reviewer check the prototype is isolated, uses made-up data, and has no live connections or credentials. Before any live use, we need approved access rules and tests of allowed and blocked requests.",
      automationBoundary:
        "No AI access to live customer data or release credentials. Only approved prototype code and made-up records. A person checks suggested changes; the tool cannot release to live systems.",
      teamReadiness:
        "The team knows the workflow but has different experience with these tools. We need time to learn together and someone experienced to help with setup and review.",
      readinessSupport:
        "Arrange an experienced reviewer and pairing time. Try automated tests and review assistance where useful. Include that work in the twelve-hour proposal and agree the $100 usage cap before starting.",
      readinessDecision: "PREPARE FIRST",
      prerequisitePlan:
        "By Friday the PM checks the benefit estimate and asks which work can wait. The lead asks the team what they want to learn, chooses a partner and tools, and confirms the checks. Then we agree the twelve hours and $100 cap. Review next Tuesday if those arrangements are in place.",
      decision: "PAUSE",
      reason:
        "Let's hold off starting until we've agreed the people, time, and tool budget. We have a useful question to try together, but no one has committed that time yet.",
      limits:
        "No experiment has run. The annual value and lower-hour estimate are assumptions. We haven't shown that users will adopt the workflow or that AI will speed up delivery.",
      next: "Agree the scope, learning support, reviewer, time, and usage cap. Confirm what other work waits. Then decide together whether to start, and review next Tuesday.",
      leadershipUpdate:
        "PROPOSED — NOT YET AGREED\n\nWe're holding off starting until we've agreed time, people, and a tool budget. Could we make room for twelve team hours and $100 in usage, including review and user feedback? The PM and lead will confirm the plan with the team by Friday and review next Tuesday. We have no experiment results yet.",
      valueAndEffort:
        "No results yet. The sponsor's annual value estimate still needs checking. We will record total team hours, tool costs, user feedback, learning, and remaining work before making any claim about value or time saved.",
      conversationLeadershipUpdate:
        "PROPOSED — NOT YET AGREED\n\nSupport is still entering repairs twice. Could we try a small prototype to learn whether a different tool and review approach helps? We're asking for twelve total team hours and a $100 tools and token cap, with an experienced partner. Please help us agree what other work can wait by Friday. We'll review next Tuesday. The annual benefit estimate still needs checking.",
      conversationTeamUpdate:
        "PROPOSED — NOT YET AGREED\n\nWe'd like to try one repair-request workflow using made-up records. What would you want to learn, and what help would make this worthwhile? We're asking for time, an experienced partner, and a tool budget. Nothing has been added to your workload yet. Let's choose the approach together.",
      teamUpdate:
        "PROPOSED — NOT YET AGREED\n\nWe haven't started the experiment. First let's agree the task, what you'd like to learn, who will help and review, and which work waits. The proposal is twelve team hours and a $100 tool cap. We'll use made-up records and keep the prototype away from live systems. Please help us improve the plan.",
      qualityChecks:
        '[{"id":"workflow","check":"Support can complete the task","expected":"A test user enters a repair once and can see where it went, using made-up records.","status":"NOT CHECKED","observed":"","evidence":"","verifier":"PM and a support user — names to agree"},{"id":"isolation","check":"The prototype stays separate","expected":"No real customer records, live credentials, or live-system connections. The agreed checks pass.","status":"NOT CHECKED","observed":"","evidence":"","verifier":"An experienced reviewer — name to agree"}]',
      returnRecord:
        "We haven't had the check-in yet. Next Tuesday we'll see what has been agreed, what is still getting in the way, and whether we're ready to start.",
    },
  },
  "deadline-reset": {
    image: "/assets/field-tools/deadline-reset-hero-v2.webp",
    imageLayout: "wide",
    lead: "They already promised the date.",
    accent: "Now you have to work out what's possible.",
    promise:
      "Prepare to reset a customer promise with Sales, using what Engineering can actually confirm.",
    session:
      "Bring the customer promise. Read the sections you need, then prepare your update in the Lab or your own notes.",
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
  },
  "priority-whiplash": {
    image: "/assets/field-tools/priority-whiplash-hero-v2.webp",
    imageLayout: "wide",
    lead: "The team is already busy.",
    accent: "Then another urgent request arrives.",
    promise:
      "Help with the urgent request without quietly asking the team to keep every old promise too.",
    session:
      "Bring the new request and the work it would interrupt. Use the Guide as a reference while you prepare the choice.",
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
        copy: "The work that would actually stop, the customer who would wait, and a smaller way to help.",
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
  },
  "mandate-reset": {
    image: "/assets/field-tools/mandate-reset-hero-v3.webp",
    imageLayout: "wide",
    lead: "You're expected to deliver.",
    accent: "But someone else keeps changing the plan.",
    promise:
      "Prepare the conversation with your manager about which calls are yours, and who will back them.",
    session:
      "Bring one decision that was blocked or overridden. Use the Guide to prepare a specific request to your manager.",
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
        copy: "The permission or backing you need from your manager, its limits, and how you will handle the next request.",
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
  },
  "when-the-team-goes-quiet": {
    image: "/assets/field-tools/when-the-team-goes-quiet-hero-v2.webp",
    imageLayout: "wide",
    lead: "The meeting ends.",
    accent: "Then you find out what people really think.",
    promise:
      "For the PM who hears concerns after the meeting: prepare to listen, own your part, and change what happens next.",
    session:
      "Choose one meeting. Read what helps, prepare an invitation, and return to the later sections after you have talked.",
    benefits: [
      "Notice what happens in the room",
      "Ask without putting someone on the spot",
      "Follow through on what you hear",
    ],
    artifacts: [
      {
        name: "Your Conversation Plan",
        copy: "An opening, a question, and a way to invite the conversation.",
      },
      {
        name: "A Change to Try",
        copy: "Something you can do differently and a way to check whether it helps.",
      },
      {
        name: "Your Follow-through",
        copy: "Only what you’re ready to share: the change, the next step, and when you’ll check back.",
      },
    ],
    example:
      "A data analyst starts to raise a concern about a release. The PM moves the meeting on. Later, the analyst explains that a report Support relies on may miss the new bookings. The PM needs to hear what was missed and look at how they handled the question.",
    sampleValues: {
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
  },
};
