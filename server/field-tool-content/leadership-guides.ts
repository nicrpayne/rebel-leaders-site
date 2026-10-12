export type AIGuidePage = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
  callout: string;
  table?: string[][];
  sources?: { name: string; url: string }[];
};

const chapter = (
  label: string,
  title: string,
  intro: string,
  sections: [string, string][],
  callout: string
): AIGuidePage => ({
  eyebrow: label,
  title,
  intro,
  sections: sections.map(([title, body]) => ({ title, body })),
  callout,
});
const privateChapter = (situation: string, outcome: string) =>
  chapter(
    "02 / PREPARE YOURSELF",
    "Get clear before you go back into the room.",
    situation,
    [
      [
        "Separate the event from your interpretation",
        "Write the actual request, words, or decision. Then name the story you're adding about the person. You can feel frustrated and still ask a useful question about their constraints.",
      ],
      ["Name your Why", outcome],
      [
        "Paint a future they can help shape",
        "Describe what better would look like in daily work: customers can plan, the team can focus, or decisions happen before commitments change. Invite the other person to improve the picture. A shared ambition needs their authorship too.",
      ],
      [
        "Keep private preparation private",
        "Private notes stay only in the open Lab tab: they are not saved or exported. Refreshing or leaving clears them. You can reflect without typing. Export the working brief you want others to see; don't send your untested motive story.",
      ],
    ],
    "Try: I want us to make this work. Can we look together at the outcome, the constraints, and the decision we need?"
  );
const practiceChapter = (next: string) =>
  chapter(
    "09 / MAKE IT A WORKING PRACTICE",
    "Use the next conversation to learn.",
    "A useful brief changes what happens next. Give it an owner, take it into your existing work tools, and return to the evidence.",
    [
      ["Follow through on one move", next],
      [
        "Rehearse with a trusted peer",
        "Read your opening aloud. Ask: Is the observation fair? Is the recommendation specific? Could the other person disagree without being cast as the villain? Revise the wording before the real conversation.",
      ],
      [
        "Keep a record you can return to",
        "Shared Lab drafts stay in this browser on this device. Private reflection is not saved or exported. Copy, download, or print your outputs. Export before clearing browser data or moving devices. The tool does not send messages, update your roadmap, or create authority.",
      ],
      [
        "Judge the change by what happens",
        "What did the other person hear? Was a decision made? Did anyone act? Review the next real result rather than treating completion of the Lab as proof that the organizational problem is solved.",
      ],
    ],
    "You arrive with a situation. You leave with a proposal, a decision record, or a specific question that somebody can act on."
  );

export const LEADERSHIP_GUIDE_PAGES: Record<string, AIGuidePage[]> = {
  "deadline-reset": [
    chapter(
      "01 / START HERE",
      "The date matters. So does the work.",
      "Someone has already promised a date. You're the PM who now has to connect that promise to what the team can responsibly deliver.",
      [
        [
          "Respect the reason for the date",
          "A launch event, contract, customer commitment, or funding window may be real. Start by understanding the consequence of missing it. That helps you shape an alternative that serves the actual need.",
        ],
        [
          "Separate three different things",
          "A forecast describes what the evidence currently suggests. A commitment names what somebody has agreed to do under conditions. A target names what people want. Ask which one this date is, who owns it, and which scope it covers.",
        ],
        [
          "Your win as the PM",
          "Help the room choose between viable options, protect the conditions required to ship, and give stakeholders an update they can use. You don't need to make uncertainty disappear to lead the next decision.",
        ],
        [
          "How this kit helps",
          "Read the Guide for judgment and language. Use the Lab for one live commitment. Leave with a Reality Map, an Options Brief, and a Stakeholder Update you can review before sharing.",
        ],
      ],
      "Start with one date and one promised outcome. You can use the Lab before the meeting, then finish the decision record afterward."
    ),
    privateChapter(
      "A deadline can feel like a judgment on your competence. Take a few minutes to separate that pressure from the decision the organization needs.",
      "Who is depending on this delivery? What would a useful, trustworthy release change for them? Make that outcome the reason for the reset; the point is to serve it responsibly."
    ),
    chapter(
      "03 / MAP THE REALITY",
      "What is fixed, and who says so?",
      "The first job is to stop treating every part of the promise as equally immovable.",
      [
        [
          "Capture the actual promise",
          "Write the communicated date, scope, recipient, and person who made the commitment. An internal target and an external contractual promise may need different owners and different communication.",
        ],
        [
          "Check the constraint",
          "Record the source: event booking, contract, regulatory requirement, or accountable stakeholder. If a constraint needs interpretation, ask the relevant owner. Don't turn your own assumption into a rule.",
        ],
        [
          "Name the unknowns",
          "List uncertain scope, integration dependencies, approvals, and capacity. For each important unknown, identify who can check it and what evidence would change the plan.",
        ],
        [
          "Use delivery evidence",
          "Work with your lead on completed work, remaining work, team capacity, and dependencies. An AI-generated prototype can make a date feel closer while integration, access decisions, testing, and review remain. A desired date is not evidence of feasibility. The Lab records your assessment; it does not generate a schedule.",
        ],
      ],
      "Reality Map: what was promised, what is genuinely constrained, and what still needs evidence."
    ),
    chapter(
      "04 / CREATE OPTIONS",
      "Give them a choice they can actually make.",
      "A vague warning that the date is risky leaves leadership with the same problem. Put credible alternatives beside the current promise.",
      [
        [
          "Keep the date; change the scope",
          "Define the smallest useful customer outcome for that window. Say what it includes, what moves later, and what it would let people do. Ask Engineering to assess it before calling it feasible.",
        ],
        [
          "Keep the scope; revisit the date",
          "Use a team-supported forecast or describe the assessment needed. Keep dependencies and confidence visible. Don't invent a precise new date merely to replace an uncomfortable old one.",
        ],
        [
          "Change capacity only when it helps",
          "A specialist, a resolved dependency, or removing other work may help. More people can also add onboarding and review. Name the actual change and get the delivery team's judgment.",
        ],
        [
          "Protect the release conditions",
          "Quality, security, safety, and required approvals are part of usable delivery. Reducing scope can be a responsible trade; silently removing those checks changes the risk people are agreeing to.",
        ],
      ],
      "Recommend one option, explain its consequence, and show the credible alternative."
    ),
    chapter(
      "05 / STATE CONFIDENCE",
      "Make your confidence explainable.",
      "A confidence label is only useful when the reader knows which plan it describes and why you hold it.",
      [
        [
          "Attach confidence to a specific plan",
          "Medium confidence in the core workflow by November 1 says more than medium confidence in the project. Name the scope, date, team, and important conditions.",
        ],
        [
          "State the basis",
          "Name the completed work, delivery assessment, confirmed dependency, or unresolved risk. Low, medium, and high in this Lab are qualitative judgments. They are not calculated percentages.",
        ],
        [
          "Choose an evidence checkpoint",
          "What will materially change the assessment? A tested integration, an approval, or acceptance of the smaller workflow? Name the owner and date, not only another status meeting.",
        ],
        [
          "Say what changes if the evidence fails",
          "Agree when a failed dependency check should trigger a scope or date decision. That gives stakeholders a response plan while there is still time to act.",
        ],
      ],
      "Try: For this scope, our confidence is medium because the integration is unverified. Thursday's check will tell us whether we can keep this plan."
    ),
    chapter(
      "06 / HAVE THE CONVERSATION",
      "Reset the plan while protecting trust.",
      "You are helping the organization keep a worthwhile promise in a form the work can support.",
      [
        [
          "Open with the shared outcome",
          "I know the event matters. I want customers to have a reliable workflow they can actually use there. Here's what the team currently knows, and the choice that would help us protect that outcome.",
        ],
        [
          "But we've already promised it",
          "Ask who owns changing the external commitment. Offer the smaller outcome and the communication needed. Don't assume you can revise a customer promise on someone else's behalf.",
        ],
        [
          "Can't the team just push harder?",
          "Show the constraint that effort alone will not remove: access approval, integration evidence, specialist review, or missing capacity. Offer a real tradeoff with its owner.",
        ],
        [
          "I need a yes or no",
          "State what you can support now, which part is still unverified, and when the evidence arrives. If a commitment is required sooner, name the risk and route that decision to the accountable owner.",
        ],
      ],
      "Useful language: I recommend this option to protect the customer outcome. Here is its cost, and here is the decision I need from you."
    ),
    chapter(
      "07 / WORKED EXAMPLE",
      "Keep the event. Reset the assumed launch.",
      "Fictional case: a sponsor has promised a full launch for a November 1 customer event before an integration has been verified.",
      [
        [
          "The Reality Map",
          "The event date is confirmed. Full reporting at launch is an assumption. The team has evidence on the core workflow, but the integration remains a delivery condition.",
        ],
        [
          "The Options Brief",
          "Option A: core workflow for the event, reporting later, subject to Thursday's integration check. Option B: retain full scope and reassess the delivery range. Security and acceptance checks stay required.",
        ],
        [
          "The recommendation",
          "PM recommends A. Medium confidence applies only to the smaller scope under the integration condition. The sponsor must approve the scope reset and own the external update by Wednesday.",
        ],
        [
          "The decision and follow-through",
          "In this fictional case, the sponsor accepts the smaller scope and owns the customer update. PM records agreement after the meeting. Thursday's integration check remains a condition; a failed check returns the plan to the sponsor. The Lab example begins with the proposal so you can rehearse this conversation.",
        ],
      ],
      "They leave with one shared plan, a clear customer message, and a checkpoint that can change the commitment."
    ),
    chapter(
      "08 / PLAY THE LAB",
      "One situation. Three useful records.",
      "Open your Deadline Reset Lab on your phone or computer. Nic's walkthrough follows this same process on a realistic example.",
      [
        [
          "Reality",
          "Enter the outcome, promise, source of the constraint, assumptions, and unknowns. Use the private questions to prepare yourself. Build the Reality Map when you need to check the facts with someone.",
        ],
        [
          "Options",
          "Describe scope, date, and capacity alternatives. Select your recommendation and explain it. Export the Options Brief for the conversation; selecting an option does not approve it.",
        ],
        [
          "Confidence",
          "Name the scope your confidence applies to, evidence behind it, and the next checkpoint. Avoid treating the label as a probability.",
        ],
        [
          "Update",
          "Name the decision, owner, needed-by date, and communication plan. Record the actual response when it happens. Copy, download, or print the Stakeholder Update for your existing work tools.",
        ],
      ],
      "Use Load Examples in a Lab step to see the expected kind of answer. It replaces only that step; export those answers first if you need to keep them."
    ),
    practiceChapter(
      "After the decision, make sure the sponsor updates the people who relied on the original promise. Revisit confidence when the agreed evidence arrives. A revised plan without revised communication leaves the old commitment alive."
    ),
  ],
  "priority-whiplash": [
    chapter(
      "01 / START HERE",
      "The new request might matter. What would it replace?",
      "You're the PM carrying a team plan while urgent requests keep arriving. You need a way to welcome opportunities without quietly creating another promise.",
      [
        [
          "Make the existing work visible",
          "People often ask for new work without seeing the commitments it would interrupt. Put the request beside what customers and colleagues already depend on.",
        ],
        [
          "Turn urgency into a tradeoff",
          "Ask what needs to happen, why now, and what consequence makes it urgent. Then name what would move if the request enters. The useful question is which outcome deserves the next available capacity.",
        ],
        [
          "Your win as the PM",
          "Give the decision owner an explicit choice, protect essential conditions, and update the people affected. You can recommend a change without making the team absorb it invisibly.",
        ],
        [
          "How this kit helps",
          "The Guide teaches the conversation. The Lab puts one new ask beside the current plan. You leave with a Priority Stack, a Displacement Map, and a Tradeoff Brief.",
        ],
      ],
      "Every new yes needs a plan for the work it changes. A real emergency can change the plan; it still has a consequence."
    ),
    privateChapter(
      "A new urgent request can feel like disrespect for the work you've already agreed. Before responding, get clear about the actual competing outcomes.",
      "What customer, team, or company outcome does the current plan protect? What might the new request improve? You can care about both while recommending which one gets capacity now."
    ),
    chapter(
      "03 / BUILD THE STACK",
      "Show the commitments people already rely on.",
      "List the work before debating which stakeholder has the loudest request.",
      [
        [
          "Start with the current goal",
          "Name the outcome and the commitments supporting it. Include customer dates and dependencies rather than a list of feature names with no consequences.",
        ],
        [
          "Include the work outside the roadmap",
          "A request to adopt an AI workflow competes for learning, verification, and reviewer time alongside delivery. Support, maintenance, review, incidents, and required approvals use capacity too. Leave room for other commitments beyond the top three in the Lab.",
        ],
        [
          "Check the urgent request",
          "Ask for the timing, beneficiary, and evidence of the consequence. A Friday customer meeting is a real coordination need; a full production feature may not be the only way to meet it.",
        ],
        [
          "Use a common window",
          "Compare work competing for the same team and time. Don't add story points from different teams or compare a day of engineering with a week of calendar waiting as though they were the same unit.",
        ],
      ],
      "Priority Stack: current commitments, the new request, why it matters now, and the capacity they share."
    ),
    chapter(
      "04 / SHOW DISPLACEMENT",
      "Make the cost of the new yes concrete.",
      "A useful recommendation tells people who benefits, who waits, and what changes.",
      [
        [
          "Name the displaced work",
          "Say which commitment moves, shrinks, or pauses and who relies on it. If you don't know, ask the team before promising that the new request fits.",
        ],
        [
          "Offer more than accept or refuse",
          "Could you narrow the request, defer it to a named checkpoint, or provide a different artifact? Describe how that alternative meets the actual need and what it costs.",
        ],
        [
          "Protect essential work",
          "Keep safety, security, and acceptance requirements visible. If a new ask endangers the current goal, discuss the effect explicitly with the people who own that goal and plan.",
        ],
        [
          "Use the capacity check honestly",
          "The optional Lab check adds entered person-days of existing work and the new request, then compares them with entered capacity. It is planning arithmetic, not a forecast. Unknown estimates do not become zero.",
        ],
      ],
      "Try: We can take this on by moving the reporting commitment. The customer then waits another week. Is that the tradeoff we want?"
    ),
    chapter(
      "05 / RECOMMEND A CHOICE",
      "Recommend the move within your mandate.",
      "A PM should bring judgment to the conversation. Make clear when you can decide and when the business tradeoff belongs elsewhere.",
      [
        [
          "Use the outcome to explain the choice",
          "I recommend a narrow demo because it supports Friday's customer conversation with less disruption than a production feature. Say which benefit justifies the cost.",
        ],
        [
          "Find the actual decision owner",
          "If the trade crosses customer, funding, or policy boundaries, name the person who can decide it. Don't send every ordinary backlog choice to an executive if it is already yours to make.",
        ],
        [
          "Set a decision time",
          "State when the choice is needed and what the current plan remains while waiting. Urgency should not become an unrecorded change by default.",
        ],
        [
          "Keep the plan coherent",
          "Where Scrum applies, involve the Product Owner and Developers in changes to the work. A stakeholder's new request is a proposal to consider, not an independent second backlog for the team.",
        ],
      ],
      "Useful language: My recommendation is X because it serves Y. It changes Z. Can you confirm that tradeoff by this time?"
    ),
    chapter(
      "06 / HANDLE THE PUSHBACK",
      "Stay useful when everything still sounds urgent.",
      "Treat the other person's need as legitimate. Keep the consequence visible without making the conversation a contest.",
      [
        [
          "They're all top priority",
          "Ask which outcome should get the next unit of capacity when two requests conflict. Present a sequence and its consequences. Equal labels don't resolve competition for the same time.",
        ],
        [
          "It will only take a day",
          "Check implementation, review, testing, deployment, and coordination with the team. Even a small task can interrupt a larger commitment. Use an estimate with its basis rather than debating the adjective small.",
        ],
        [
          "Don't move anything",
          "Show the gap in the current assumptions. Ask which scope, sequence, capacity, or date may change. If none can, record the unresolved demand and ask the owner to choose.",
        ],
        [
          "It's a real incident",
          "Respond through the team's incident process. Capture the interrupted commitments, notify affected people, and re-plan when the immediate response is stable. The tool supports the follow-up tradeoff; it doesn't replace emergency procedures.",
        ],
      ],
      "Try: I want to support the request. Let's agree what it changes so the team and the affected customer get one clear plan."
    ),
    chapter(
      "07 / WORKED EXAMPLE",
      "A Friday demo meets a full week.",
      "Fictional case: an executive requests a customer demo midweek. The same team is finishing onboarding, a security review, and a reporting update.",
      [
        [
          "The Priority Stack",
          "For the stated planning window, the team enters 10 available person-days, 10 person-days of existing work, and 2 for the demo including review. Entered demand is 12, leaving a 2-person-day gap before displacement.",
        ],
        [
          "The Displacement Map",
          "PM recommends a narrow demo and moving 2 person-days of reporting work. Onboarding and the security review remain protected. Reporting's customer update must change.",
        ],
        [
          "The alternative",
          "Keep the reporting commitment and use the existing prototype in Friday's meeting. The prototype can support feedback, but it cannot demonstrate a finished production workflow.",
        ],
        [
          "The decision and follow-through",
          "In this fictional case, the sponsor chooses the narrow demo with reporting displacement Wednesday. PM records the choice and updates the team and reporting stakeholder Thursday. They review the result Friday. The Lab example starts before that agreement; the arithmetic supports the conversation, not a promised delivery date.",
        ],
      ],
      "One request enters, named work moves, and the affected people receive one coherent plan."
    ),
    chapter(
      "08 / PLAY THE LAB",
      "Put the request beside the work, then export the choice.",
      "Use your Priority Whiplash Lab before or during a priority conversation. Nic's walkthrough shows the same instrument on a realistic example.",
      [
        [
          "The Stack",
          "Enter the current goal, commitments, other work, and new request. Check the urgency. Private reflection stays out of shared records. Build the Priority Stack when you need to show the competing work.",
        ],
        [
          "Displacement",
          "Choose accept, narrow, defer, or decline as a recommendation. Name what changes, the consequence, protected work, and an alternative. Add the optional capacity assumptions when they help.",
        ],
        [
          "Recommend",
          "Explain your choice and name the decision owner and needed-by date. Export the Displacement Map for discussion.",
        ],
        [
          "Record",
          "Set the decision status and enter what was actually agreed. Name communication and review owners. Export the Tradeoff Brief to your team's existing work tools; the Lab doesn't change the backlog itself.",
        ],
      ],
      "Use Load Examples in a Lab step to rehearse. It replaces only that step; export those answers first if you need to keep them."
    ),
    practiceChapter(
      "Check that the new choice changed the actual plan and the affected stakeholder communication. Review whether the displacement was sufficient. If new work enters again, reuse the same visible tradeoff rather than starting a hidden plan."
    ),
  ],
  "mandate-reset": [
    chapter(
      "01 / START HERE",
      "You own the outcome. Can you move the lever?",
      "You're accountable for progress, but the decision that would change it sits somewhere else. More effort may not resolve that operating condition.",
      [
        [
          "Start with one blocked decision",
          "Which outcome are you expected to deliver? Which specific scope, budget, dependency, or approval decision prevents it? A concrete lever is easier to discuss than a general feeling of powerlessness.",
        ],
        [
          "Distinguish influence from authority",
          "You can prepare a recommendation and build understanding without having the final decision right. That distinction matters when your performance depends on a choice only someone else can make.",
        ],
        [
          "Your win as the PM",
          "Make the mismatch visible, request a bounded right or escalation rule, and agree what you will do while waiting. You don't need to take over every decision to create a workable path.",
        ],
        [
          "How this kit helps",
          "Use the Guide for language and judgment. Use the Lab to map one actual decision. Leave with a Decision Rights Map, an Authority Gap Statement, and a Reset Request.",
        ],
      ],
      "A Reset Request proposes a change. It does not grant permission or cancel an existing approval requirement."
    ),
    privateChapter(
      "When you're blamed for an outcome you can't control, it is easy to make the next conversation about fairness alone. Prepare a request the other person can act on.",
      "What would a working decision path let the team achieve? Connect the reset to customer value, responsible delivery, and less time waiting for conflicting instructions."
    ),
    chapter(
      "03 / MAP THE RIGHTS",
      "The org chart is a starting point, not the answer.",
      "Describe how this decision actually happens. Then ask the people involved to verify the map.",
      [
        [
          "Recommendation",
          "Who frames the options and brings evidence? That person may be you. A good recommendation makes the consequence of each option clear; it is not the same as approval.",
        ],
        [
          "Decision and execution",
          "Who may make the final choice, and who carries it out? A sponsor deciding scope does not replace Engineering's responsibility for technical acceptance or a specialist's required approval.",
        ],
        [
          "Constraints and accountability",
          "Who can stop or materially constrain the choice? Who is judged on the outcome? Include legitimate policy and safety controls, not only people who seem difficult.",
        ],
        [
          "Confirmed versus assumed",
          "Record which rights come from policy, agreement, or an observed decision. If the final owner is unknown, make naming that owner your next request. Don't turn an uncertain map into organizational fact.",
        ],
      ],
      "Decision Rights Map: who recommends, decides, executes, constrains, and carries accountability for this particular decision."
    ),
    chapter(
      "04 / NAME THE GAP",
      "Describe the operating condition without diagnosing the people.",
      "A useful gap statement lets leadership see the lever and its consequence.",
      [
        [
          "Use observable events",
          "Three stakeholders added work to the release. Only the sponsor can approve removing it. Product is still being held to the unchanged delivery date. That is more actionable than nobody respects Product.",
        ],
        [
          "Connect the gap to the outcome",
          "Name waiting time, conflicting instructions, repeated rework, or an unowned decision. Attribute estimated costs and distinguish them from observed effects.",
        ],
        [
          "Check for a legitimate boundary",
          "Some rights belong elsewhere for good reasons. Security, safety, data, or spending controls may be necessary. The reset should clarify how to work with those owners, not remove them through a clever phrase.",
        ],
        [
          "Ask for the missing condition",
          "Is the problem a missing owner, an unclear boundary, inconsistent decisions, or slow response? Choose a request matched to the actual problem.",
        ],
      ],
      "Try: I'm accountable for X. Y determines it. At present, I can recommend Y but cannot decide it, and no response rule is agreed."
    ),
    chapter(
      "05 / REQUEST THE RESET",
      "Ask for a specific right or a workable rule.",
      "Vague empowerment is difficult to grant and difficult to verify. Make the proposed operating change bounded.",
      [
        [
          "Define the right",
          "For this release, may Product sequence scope within the approved budget and outcome, subject to Engineering's acceptance conditions? Name the decision, limits, and retained approvals.",
        ],
        [
          "Offer an escalation alternative",
          "If the right stays with the sponsor, ask for a recipient, response time, and agreed interim action. While waiting, keep working within current authority rather than interpreting silence as consent.",
        ],
        [
          "Name the response you need",
          "Approve the rule, revise it, decline it with a workable alternative, or identify the correct owner. Ask by a date connected to the actual consequence.",
        ],
        [
          "Define a review",
          "After the next two decisions, check whether the rule reduces waiting or conflicting work. A right that exists only in the meeting notes may need another reset.",
        ],
      ],
      "Useful request: Every new scope request goes to one sponsor for an explicit displacement decision before the release plan changes."
    ),
    chapter(
      "06 / HAVE THE CONVERSATION",
      "Give leadership something they can fix.",
      "You can be direct about the mismatch while remaining curious about constraints you may not see.",
      [
        [
          "Open with the shared outcome",
          "I want us to deliver a coherent release and give the team one plan. Here's the decision path we're using and the place where it gets stuck. I'd like to agree a workable rule.",
        ],
        [
          "You need to be more influential",
          "Ask which decision you are expected to influence, who retains authority, and what response route supports that responsibility. Influence can help; it doesn't by itself define a decision right.",
        ],
        [
          "You already own it",
          "Ask for a concrete example of what you may decide and which limits apply. Invite the sponsor to confirm that boundary with the people who can currently override it.",
        ],
        [
          "We can't change the authority",
          "Offer a response rule and safe interim plan. If the risk remains, document the unresolved condition and escalate through the appropriate route. Don't claim an agreement that was not made.",
        ],
      ],
      "Try: If the decision stays with you, can we agree how quickly it gets a response and what plan remains in place while we wait?"
    ),
    chapter(
      "07 / WORKED EXAMPLE",
      "A roadmap owner with no scope rule.",
      "Fictional case: several executives add requests, one sponsor may displace them, and the PM remains accountable for the roadmap date.",
      [
        [
          "The Decision Rights Map",
          "PM recommends; sponsor decides; Product and Engineering execute. Requesting executives can introduce competing demands. Security keeps its required approval. The sponsor still needs to confirm the proposed operating map.",
        ],
        [
          "The Authority Gap Statement",
          "The date depends on scope choices that Product cannot make. New requests are being treated as additions before the sponsor names displaced work. That creates a plan the team cannot reconcile.",
        ],
        [
          "The Reset Request",
          "Ask for one sponsor rule: every new request names the displaced commitment before the plan changes. Preserve budget, security, and Engineering acceptance conditions. If disputed, escalate within one working day.",
        ],
        [
          "The decision and follow-through",
          "In this fictional case, the sponsor agrees to the response rule before planning and confirms it with requesting executives. PM records the agreement. They review the next two requests for explicit displacement and one updated plan. The Lab example starts with the request, before agreement.",
        ],
      ],
      "The PM now has a workable decision route. The sponsor keeps the scope right and commits to using it before the team plan changes."
    ),
    chapter(
      "08 / PLAY THE LAB",
      "Map one decision, then make the request portable.",
      "Open your Mandate Reset Lab. Nic's walkthrough demonstrates the same process on a realistic example.",
      [
        [
          "Accountability",
          "Enter the outcome, blocked decision, and consequence. Use private reflection to prepare; those notes don't appear in the exported records.",
        ],
        [
          "Decision Rights",
          "Map the five roles and record which rights are verified. Name necessary specialist approvals. Export the map when you need someone to check it.",
        ],
        [
          "Reset",
          "Write the gap, requested right or rule, operating boundaries, and fallback. Export the Authority Gap Statement for the conversation.",
        ],
        [
          "Request",
          "Name the action owner, response date, decision status, actual response, interim action, and review. Copy, download, or print the Reset Request. If you are accountable for a new app but cannot approve its data access or change its permissions, name the owner of those decisions. The tool doesn't change your organization's permissions.",
        ],
      ],
      "Use Load Examples in a Lab step to rehearse the request. It replaces only that step; export those answers first if you need to keep them."
    ),
    practiceChapter(
      "Confirm the agreed decision rule with the people it affects. Check the next actual decision: who chose, how long it took, and which plan changed. Revisit a mismatch that continues rather than compensating for it indefinitely."
    ),
  ],
  "product-project-translator": [
    chapter(
      "01 / START HERE",
      "What do they need that answer for?",
      "You're running Product. Your stakeholder asks for final requirements, a fixed date, or a complete plan while important facts are still being learned.",
      [
        [
          "Begin with their decision",
          "They may need to reserve funding, coordinate a customer message, or sequence another team. Ask what the requested certainty would let them do. Their need deserves a usable answer.",
        ],
        [
          "Locate the actual uncertainty",
          "Some delivery work is well understood and can be planned. Other work needs discovery. Don't label every request project thinking; show which assumption needs evidence in this particular situation.",
        ],
        [
          "Your win as the PM",
          "Give the stakeholder something dependable now: a bounded commitment, a useful checkpoint, and a decision they can make. Keep your relationship intact while making uncertainty workable.",
        ],
        [
          "How this kit helps",
          "The Guide teaches the translation. The Lab walks one real request into a Request Decoder, a Commitment Card, and a Stakeholder Response you can take into the meeting.",
        ],
      ],
      "Lead with the answer that helps them coordinate. Explain the product method only when it helps that decision."
    ),
    privateChapter(
      "A certainty request can sound like someone misunderstanding your job. Before correcting them, ask what they are trying to protect.",
      "What outcome could you and this stakeholder create together? Reliable budgeting, a customer message people can trust, or a delivery sequence that can adapt without surprises?"
    ),
    chapter(
      "03 / DECODE THE NEED",
      "Treat your interpretation as a question.",
      "You can't know the stakeholder's motive from the sentence alone. Confirm the coordination need before designing your response.",
      [
        [
          "Final requirements",
          "Ask which decision needs the requirements and which details must be stable. Funding may need an outcome, spending boundary, and staged decision rather than every interaction settled in advance.",
        ],
        [
          "A committed date",
          "Ask what is tied to it: contract, customer communication, staffing, or another team's work. You may need a delivery forecast and tradeoff, not simply a lecture about uncertainty.",
        ],
        [
          "A complete roadmap",
          "Ask the planning horizon and decisions it supports. Explain which near-term work is committed, which later work is directional, and when evidence could change the sequence.",
        ],
        [
          "Record what they actually said",
          "The Lab separates your assumed need from the confirmation. If you haven't asked yet, the decoder stays a hypothesis to check with the stakeholder.",
        ],
      ],
      "Try: What decision will this answer help you make, and by when? Which part needs to be dependable for that decision?"
    ),
    chapter(
      "04 / OFFER A COMMITMENT",
      "Replace vague uncertainty with a bounded offer.",
      "What can you responsibly provide now? Make it specific enough for someone else to plan around.",
      [
        [
          "Known and supported",
          "State the customer outcome, constraints, and evidence already available. If you have a reliable delivery forecast for a known slice of work, use it with its conditions.",
        ],
        [
          "Unknown and consequential",
          "Name the uncertainty that changes the plan: customer behavior, technical feasibility, approval, or dependency. Say how it will be tested or resolved, by whom, and when.",
        ],
        [
          "A commitment you can own",
          "Commit to an agreed discovery scope, evidence review, assessment, or delivery slice with the relevant owners. Don't promise a result beyond your control merely because a date is requested.",
        ],
        [
          "A boundary people can use",
          "Define budget, scope, quality, approvals, and a stopping or revision condition. A discovery checkpoint should lead to a decision rather than becoming indefinite permission to explore.",
        ],
      ],
      "Commitment Card: what we will do, under which conditions, with which owner, and what decision the evidence will support."
    ),
    chapter(
      "05 / WRITE THE ANSWER",
      "Give the room a short, useful response.",
      "The first paragraph should help the stakeholder act. Put the detail in the Commitment Card.",
      [
        [
          "Recognize their need",
          "I understand you need a funding decision for next quarter. Use the need they have actually confirmed rather than a motive you've assigned.",
        ],
        [
          "State the dependable offer",
          "We can define the outcome and a capped discovery investment now. The team will test two workflow options within that boundary before we ask for the full build budget.",
        ],
        [
          "Name the next evidence and decision",
          "At the two-week review, we'll bring customer findings and a delivery assessment. You can then approve, revise, or stop the next investment.",
        ],
        [
          "Ask for the decision you need",
          "Can you approve the discovery boundary and name the budget decision owner by Thursday? This turns the response into a working agreement people can accept or change.",
        ],
      ],
      "Response pattern: I understand you need X. We can offer Y now. Z remains open. We'll bring evidence by this date so you can decide A."
    ),
    chapter(
      "06 / HANDLE COMMON REQUESTS",
      "Adapt the answer to the real need.",
      "These are conversation starters, not scripts for dismissing a reasonable request.",
      [
        [
          "Just give me the date",
          "Offer the team-supported forecast for a defined scope if one exists. If it doesn't, state the assessment and checkpoint needed. If a hard date is real, use Deadline Reset to shape the scope tradeoff.",
        ],
        [
          "We can't approve an open-ended budget",
          "Propose a capped phase, an owner, evidence criteria, and a funding gate. Say what that phase will and will not establish. The budget owner can decline or revise it.",
        ],
        [
          "We need to tell the customer something",
          "Give approved wording about the current outcome, delivery status, and next update. Coordinate with the person who owns the external message. Don't substitute your preferred wording for a contractual commitment.",
        ],
        [
          "Why does the roadmap keep changing?",
          "Show which evidence changed, the outcome that stays stable, and the choice now being made. Separate learning from avoidable churn, and acknowledge communication or planning failures where they happened.",
        ],
      ],
      "Useful translation meets their coordination need and leaves the remaining uncertainty visible."
    ),
    chapter(
      "07 / WORKED EXAMPLE",
      "Finance needs a decision, not every requirement.",
      "Fictional case: a finance sponsor requests final requirements before reserving next-quarter funding for a new customer workflow.",
      [
        [
          "The Request Decoder",
          "PM asks what the requirements will support. Finance confirms the funding need. The final workflow is not yet tested; the customer outcome and initial investment boundary can be defined.",
        ],
        [
          "The Commitment Card",
          "Propose testing two candidate workflows within a capped two-week discovery phase. PM owns the customer study; Engineering owns the delivery assessment. No production release is promised by that checkpoint.",
        ],
        [
          "The Stakeholder Response",
          "I can give you the outcome, investment boundary, and next funding decision now. At the two-week review, we'll bring customer evidence and a delivery assessment before asking you to commit to the full build.",
        ],
        [
          "The decision and follow-through",
          "In this fictional case, Finance approves the capped phase Thursday. PM records the agreement and schedules the two-week evidence review. A prototype can help people see the possibility; it does not resolve integration, permissions, review, or production operation. Full-build funding remains open; a negative result can justify revising or stopping. The Lab example starts with the proposal so you can rehearse the funding conversation.",
        ],
      ],
      "Finance can reserve a bounded investment. Product has a learning commitment and a clear next funding decision."
    ),
    chapter(
      "08 / PLAY THE LAB",
      "Translate one live request into a usable answer.",
      "Open your Product / Project Translator Lab. Nic's walkthrough works through the same process on a realistic example.",
      [
        [
          "The Request",
          "Capture the actual sentence, stakeholder, and context. Starter prompts can help you rehearse. Private reflection stays out of every shared output.",
        ],
        [
          "Decode",
          "Choose the coordination need, record what the stakeholder confirmed, and identify the assumption to check. Export the Request Decoder to prepare the conversation.",
        ],
        [
          "Commitment",
          "Write the outcome, known evidence, unknowns, bounded commitment, and next checkpoint. Export the Commitment Card as the detail behind your answer.",
        ],
        [
          "Respond",
          "Draft the short message, decision request, owner, and date. Keep status as a proposal until agreement. Record the response and next action, then copy, download, or print the Stakeholder Response.",
        ],
      ],
      "Use Load Examples in a Lab step to rehearse. These are illustrative answers; they do not mean a real stakeholder has agreed."
    ),
    practiceChapter(
      "Check whether the response helped the stakeholder make their actual decision. Bring the promised evidence on the agreed date. If the need was misunderstood or the commitment was too vague, revise the offer and confirm it again."
    ),
  ],
};
