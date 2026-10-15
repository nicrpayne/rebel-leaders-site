export type ConversationCompanion = {
  after: number;
  step: number;
  eyebrow: string;
  title: string;
  intro: string;
  cards: { title: string; body: string }[];
  takeaway: string;
};
export type WorkedScene = {
  title: string;
  move: string;
  dialogue: { speaker: string; words: string }[];
  question: string;
  step: number;
  record?: string;
  values?: Record<string, string>;
};
export type StudyPick = {
  source: string;
  topic: string;
  why: string;
  question: string;
  step: number;
};
export type LeadershipExpansion = {
  welcome: string;
  intro: string;
  companion: ConversationCompanion[];
  scenes: WorkedScene[];
  resources: StudyPick[];
};

export const LEADERSHIP_EXPANSIONS: Record<string, LeadershipExpansion> = {
  "deadline-reset": {
    welcome:
      "Follow a promised launch date through the conversation, the decision, and the next check with the team.",
    intro:
      "A fictional example: customers have been promised online repair booking and reports by November 1. The event is booked, but the team still has something important to check.",
    companion: [
      {
        after: 1,
        step: 0,
        eyebrow: "BEFORE YOU MEET / MAKE ROOM TO LISTEN",
        title: "What is each of you trying to protect?",
        intro:
          "The person who made the promise may feel just as exposed as you do. Give them a way to explain what happened without first defending themselves.",
        cards: [
          {
            title: "Say what you want",
            body: "I want customers to leave the event knowing what they can use. I also want the team to give us an answer it can stand behind.",
          },
          {
            title: "Ask about their position",
            body: "What have customers arranged around this date? What did we tell them? Is there something I haven’t heard that makes changing it difficult?",
          },
          {
            title: "Hear the answer",
            body: "You’re worried that another change will damage their trust. Have I understood? Let them correct you before introducing your options.",
          },
          {
            title: "Bring the team in",
            body: "Ask the people doing the work to explain what is ready and what still needs checking. Give them room to say they don’t know yet.",
          },
        ],
        takeaway:
          "You can take the promise seriously and still ask whether the current plan can deliver it.",
      },
      {
        after: 3,
        step: 1,
        eyebrow: "DISCUSSION GUIDE / COMPARE REAL OPTIONS",
        title: "Find the smallest promise that still helps.",
        intro:
          "A smaller list of features is useful only if it still does something worthwhile for the people waiting. Talk through that together.",
        cards: [
          {
            title: "1 / What must someone be able to do?",
            body: "Would customers need to make a real booking at the event, or would seeing how it will work meet the need? Ask the person responsible for the customer relationship.",
          },
          {
            title: "2 / What would each option take?",
            body: "What is left to build, check, and explain? Who needs to help? Ask the team before turning an option into a promise.",
          },
          {
            title: "3 / Who would the change affect?",
            body: "If reports arrive later, who still has to prepare them by hand? Include that work and tell those people before changing their expectations.",
          },
          {
            title: "4 / Who can change the promise?",
            body: "Who can approve this particular change? Who needs to confirm the checks? The person estimating the work may not be the person allowed to change a customer commitment.",
          },
        ],
        takeaway:
          "Write the recommendation as a proposal. Ask for a response before telling anyone that the promise has changed.",
      },
      {
        after: 4,
        step: 2,
        eyebrow: "WHEN THE ANSWER IS STILL UNCERTAIN",
        title: "Give uncertainty a next step.",
        intro:
          "You don’t need a confident-sounding number to be helpful. You need to explain what the team knows and how it will find out more.",
        cards: [
          {
            title: "What we know",
            body: "The booking page is built. That is useful progress. It does not yet show that a booking reaches the repair calendar correctly.",
          },
          {
            title: "What we will check",
            body: "The engineering lead will send test bookings through on Thursday, check the results, and list any remaining work.",
          },
          {
            title: "What could change",
            body: "If the connection fails, working online booking may not be ready for the event. The smaller promise still depends on that check.",
          },
          {
            title: "What happens then",
            body: "Ask who can approve a demonstration instead and when customers must be told. Agree that response before Thursday if possible.",
          },
        ],
        takeaway:
          "A review date is a promise to return with what you learned. It is not a promise that the software will be finished by then.",
      },
      {
        after: 5,
        step: 3,
        eyebrow: "COMMUNICATION / BEFORE AND AFTER THE ANSWER",
        title: "Help everyone hear the same plan.",
        intro:
          "The sponsor, the team, and the customer need different details. The promise and its conditions should match in every version.",
        cards: [
          {
            title: "Ask the person who can decide",
            body: "Can we focus on booking for the event and move reports later, subject to Thursday’s check? If that check fails, can we show a demonstration instead?",
          },
          {
            title: "Tell the team what is agreed",
            body: "Name the work to do, the work to pause, and the checks to keep. Until there is an answer, describe this as the plan you are asking for.",
          },
          {
            title: "Prepare the customer message",
            body: "Ask the person responsible for the customer to explain what will be available and when they will hear more. Let them review the wording before it goes out.",
          },
          {
            title: "If nobody answers",
            body: "Ask who can respond in time. Record the unanswered question and the current plan. Do what you are already authorized to do; silence does not approve the change.",
          },
        ],
        takeaway:
          "In the Lab’s final step, you can draft separate updates and come back to record what happened after the decision.",
      },
      {
        after: 8,
        step: 3,
        eyebrow: "HOLISTIC SHAPING / WHAT DID THIS MAKE POSSIBLE?",
        title: "Notice what the deadline taught people.",
        intro:
          "The date will pass. What people learned about speaking up, trusting each other, and making promises may last much longer.",
        cards: [
          {
            title: "Identity",
            body: "Could someone admit uncertainty without feeling they had failed? Did you become more willing to ask for help or change your mind?",
          },
          {
            title: "Relationship",
            body: "Did Sales and Engineering understand each other better? What helped them say something difficult while staying in the conversation?",
          },
          {
            title: "Vision",
            body: "Did the customer need remain clear when the feature list changed? Can everyone explain what they are trying to make possible?",
          },
          {
            title: "Culture",
            body: "Did the next promise get checked with the team first? If overtime quietly filled the gap, what would need to change before this happens again?",
          },
        ],
        takeaway:
          "Notice the effects on people as well as the delivery. Reflection can stay private; nobody needs to share personal information to use this tool.",
      },
    ],
    scenes: [
      {
        title: "The promise",
        step: 0,
        record: "deadline-reality",
        move: "The PM hears that online booking and reports have both been promised for November 1. Instead of opening with an argument about the date, they ask what customers are expecting.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "What did we tell customers? I want to know what they’ll be expecting on the day.",
          },
          {
            speaker: "Sales director",
            words:
              "I said booking and reports. The event is fixed, but the thing they most want to see is booking.",
          },
        ],
        question:
          "Which parts of the promise have you confirmed, and which are still your interpretation?",
      },
      {
        title: "Check the options",
        step: 1,
        record: "deadline-options",
        move: "The engineering lead says booking may be possible if reports wait, but the calendar connection has not been tested. They keep the security review and booking checks in the plan.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "If reports come later, what would you still need to check before we promise booking?",
          },
          {
            speaker: "Engineering lead",
            words:
              "Let me check the calendar connection on Thursday. If that doesn’t work, I’ll need to understand why before I can give you another date.",
          },
        ],
        question: "What would make the smaller promise useful and believable?",
      },
      {
        title: "Ask for the change",
        step: 3,
        record: "deadline-update",
        move: "The PM recommends focusing on booking, with a demonstration as a fallback if Thursday’s check fails. This is still a proposal. The sales director needs to respond before the customer update.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "Could reports come later? We’ll know more about booking on Thursday. If it isn’t ready, could we show a demo at the event and explain that?",
          },
          {
            speaker: "Sales director",
            words:
              "Who will tell me what the check found, and when will we update customers?",
          },
        ],
        question: "Have you named both the decision and the next check?",
      },
      {
        title: "Record the answer",
        step: 3,
        record: "deadline-update",
        values: {
          decisionStatus: "AGREED — decision recorded",
          finalDecision:
            "Fictional Wednesday decision: the sales director agrees that reports can come later. Working booking remains conditional on Thursday’s check. If it fails, the event will show a demonstration and customers will be told by Friday.",
        },
        move: "In this fictional continuation, the sales director agrees on Wednesday. The PM records that answer and its conditions. Agreement to a smaller scope is not evidence that the remaining software works.",
        dialogue: [
          {
            speaker: "Sales director",
            words:
              "Yes. Reports can come later. Tell me Thursday what the calendar check shows, and I’ll update customers by Friday.",
          },
          {
            speaker: "PM",
            words:
              "I’ll record that and check it with the team so we’re working from the same plan.",
          },
        ],
        question:
          "Does the written decision say exactly what was agreed, including the conditions?",
      },
      {
        title: "Come back after the check",
        step: 3,
        record: "deadline-update",
        values: {
          decisionStatus: "AGREED — decision recorded",
          finalDecision:
            "Fictional Wednesday decision: focus on booking, with reports later. Use a demonstration if the calendar check fails.",
          returnRecord:
            "Fictional Thursday continuation: a test booking did not reach the repair calendar. The engineering lead reported it. The sales director confirmed the demonstration fallback and will notify customers by Friday. The team will investigate before offering another booking date.",
        },
        move: "For this continuation, the calendar check finds a problem. The team uses the agreed fallback instead of pretending the smaller promise is still safe. They return to the customer and investigate before offering another date.",
        dialogue: [
          {
            speaker: "Engineering lead",
            words:
              "The test booking didn’t reach the calendar. We need to fix that before customers use it.",
          },
          {
            speaker: "Sales director",
            words:
              "Then we’ll show the demonstration, as agreed. I’ll explain the change and when they’ll hear from us next.",
          },
        ],
        question:
          "Did the plan make it easier for someone to report disappointing news in time?",
      },
    ],
    resources: [
      {
        source: "the-magic-of-mr-greenleaf-a-servant",
        topic: "People under pressure",
        why: "When you feel responsible for rescuing the date yourself, use Nic’s story to question what the organization is asking one person to carry.",
        question:
          "What would need to change so meeting this promise does not depend on someone quietly exhausting themselves?",
        step: 0,
      },
      {
        source: "your-companys-god-is-showing",
        topic: "People under pressure",
        why: "Look at what the deadline asks people to sacrifice and what those choices teach them about what matters here.",
        question: "What are we protecting, and who is paying for that choice?",
        step: 1,
      },
      {
        source: "bowl",
        topic: "The conversation",
        why: "Nic’s leadership video offers a way to think about the attention you bring into a tense conversation.",
        question:
          "What might I hear if I make room for the other person before defending my plan?",
        step: 0,
      },
      {
        source: "you-have-a-culture-problem",
        topic: "Holistic Shaping",
        why: "Use the four Base Elements to look beyond the event date and notice what this way of making promises creates.",
        question:
          "What is the team learning about trust, judgment, and the future we are working toward?",
        step: 3,
      },
      {
        source: "when-mattering-isnt-enough",
        topic: "Holistic Shaping",
        why: "Nic asks what becomes possible after people feel valued. Consider whether this plan gives people room to learn and grow.",
        question:
          "Where could this plan damage people, and where could it help them grow?",
        step: 3,
      },
      {
        source: "singer-boundaries",
        topic: "Choosing the work",
        why: "Use the distinction between a time limit and the work inside it when exploring a smaller useful result.",
        question:
          "If the event date stays, what could customers still use or learn from?",
        step: 1,
      },
      {
        source: "bain-rapid",
        topic: "Who decides",
        why: "Clarify who recommends a change, whose approval is required, and who can change the customer promise.",
        question: "Who has the authority to make this particular call?",
        step: 3,
      },
    ],
  },
  "priority-whiplash": {
    welcome:
      "Follow an urgent Friday request from the first question to a decision about what gets done and what waits.",
    intro:
      "A fictional example: the team has a full week, and Sales asks for a customer demonstration on Friday. We’ll find out what is needed, compare the options, and see what happens after the decision.",
    companion: [
      {
        after: 1,
        step: 0,
        eyebrow: "BEFORE YOU REPLY / UNDERSTAND THE REQUEST",
        title: "Find out what Friday is really for.",
        intro:
          "“We need a demo” can mean several different things. A few questions now can spare people a week of work on the wrong answer.",
        cards: [
          {
            title: "Ask what they need to learn",
            body: "What will the customer decide after seeing it? Are they choosing between ideas, checking a workflow, or expecting working software?",
          },
          {
            title: "Ask what would be enough",
            body: "Would sketches let them respond? Do they need to click through the screens? What would a working version tell them that a demonstration would not?",
          },
          {
            title: "Check why now",
            body: "What is fixed about Friday? Who confirmed it? If the timing is a preference, that may give us another option.",
          },
          {
            title: "Say why you are asking",
            body: "I want us to give the customer something useful on Friday. If I understand what they need, I can ask the team what it would take.",
          },
        ],
        takeaway:
          "Let the answer change your understanding of the work before deciding whether it fits.",
      },
      {
        after: 3,
        step: 1,
        eyebrow: "DISCUSSION GUIDE / WHAT CHANGES FOR PEOPLE?",
        title: "Make the choice visible without making it a threat.",
        intro:
          "You are helping people choose how to use the time available. The work already promised and the new opportunity both deserve a fair hearing.",
        cards: [
          {
            title: "1 / Check the whole week",
            body: "Are support, review, meetings, and fixes included? Are these the right people and the same dates? Ask the team to correct the list.",
          },
          {
            title: "2 / Name who would wait",
            body: "Which customer or colleague would lose something if we changed the plan? What have we told them, and who can discuss a different date with them?",
          },
          {
            title: "3 / Keep a smaller option",
            body: "Could sketches answer Friday’s question? Could part of the demonstration wait? Explain what each option would help the customer decide.",
          },
          {
            title: "4 / Check the result together",
            body: "Ten days available and twelve needed exposes a gap. It does not tell us which work to delay or what a new finish date should be.",
          },
        ],
        takeaway:
          "Try: “Here are two ways we could help on Friday. Can we look at what each means for the people already waiting?”",
      },
      {
        after: 4,
        step: 2,
        eyebrow: "WHO DECIDES / ASK FOR A SPECIFIC CHOICE",
        title: "Get the right people into the decision.",
        intro:
          "A request from someone senior can still need a decision from the person who owns the commitments it would change.",
        cards: [
          {
            title: "Who brings the recommendation?",
            body: "The PM gathers the team’s estimates and the customer needs. Include what the requester has told you and what the affected customer is waiting for.",
          },
          {
            title: "Who must be heard?",
            body: "Ask the people building and checking the work, the requester, and the person responsible for the delayed customer promise. Record any unanswered questions.",
          },
          {
            title: "Who can make the call?",
            body: "Name the person allowed to reorder these commitments. Check their authority and the required approvals instead of assuming the loudest request decides it.",
          },
          {
            title: "When do we need the answer?",
            body: "Leave time to change the plan and tell people. If no answer comes, follow the existing agreed plan within your authority and ask when a decision can be made.",
          },
        ],
        takeaway:
          "A recommendation can be accepted, changed, or declined. Record the answer people actually give.",
      },
      {
        after: 5,
        step: 3,
        eyebrow: "COMMUNICATION / THE PLAN PEOPLE WILL FOLLOW",
        title: "Make sure “wait” really means wait.",
        intro:
          "A written tradeoff achieves little if the team is still expected to do both pieces of work. Check what the decision means in practice.",
        cards: [
          {
            title: "For the person deciding",
            body: "Explain what the demonstration helps the customer do, which work would wait, and the alternative. Ask for a response by the time the team needs it.",
          },
          {
            title: "For the team",
            body: "After agreement, name the work to start and the work to pause. Ask whether anyone has received conflicting instructions or is still being measured against the old plan.",
          },
          {
            title: "For the customer who waits",
            body: "Ask the account manager to explain the change and confirm the revised date after the team checks it. Don’t calculate that date by adding the effort gap to the calendar.",
          },
          {
            title: "After Friday",
            body: "Did the demonstration answer the customer’s question? Did the report correction actually wait? If people did both in overtime, bring that back into the next conversation.",
          },
        ],
        takeaway:
          "Use the Lab’s final step to prepare the updates and record what happened when the plan met the real week.",
      },
      {
        after: 8,
        step: 3,
        eyebrow: "HOLISTIC SHAPING / WHAT BECOMES NORMAL?",
        title: "What did this week teach the team?",
        intro:
          "Repeated urgent requests shape more than a work list. Notice the habits people learn from how each request is handled.",
        cards: [
          {
            title: "Identity",
            body: "Can someone be dependable without saying yes to everything? What did this decision teach people about using their judgment?",
          },
          {
            title: "Relationship",
            body: "Did the requester and the team understand each other better? Were the people whose work moved treated with care?",
          },
          {
            title: "Vision",
            body: "Did a clear customer need help you choose, or did the most recent request simply win? What worthwhile result are you protecting?",
          },
          {
            title: "Culture",
            body: "Can people point to work that was genuinely paused? If everything stays urgent, what needs to change in how requests enter the team’s week?",
          },
        ],
        takeaway:
          "Notice the pattern across several weeks, not just one request. You can think about the effects on people without recording personal information.",
      },
    ],
    scenes: [
      {
        title: "Another urgent request",
        step: 0,
        record: "priority-stack",
        move: "The team is fixing broken account invitations, checking customer-data access, and correcting a report. Sales now asks for a demonstration on Friday. The PM first asks what the customer needs from the meeting.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "What do they need to decide on Friday? Do they need the report to work, or to see how the screen might work?",
          },
          {
            speaker: "Sales director",
            words:
              "They want to see the idea and tell us what they think. It doesn’t have to work yet.",
          },
        ],
        question:
          "What does the request mean in actual work, now that you have asked?",
      },
      {
        title: "Look at the time",
        step: 1,
        record: "displacement-map",
        move: "The fictional estimates are ten person-days available, ten already needed, and two for a clickable demonstration. The plan would need twelve. Those figures include support and review; they do not predict a finish date.",
        dialogue: [
          {
            speaker: "Engineering lead",
            words:
              "A clickable demo would take us about two days. We can fit it in if the report fix waits.",
          },
          {
            speaker: "PM",
            words:
              "Let’s also keep the existing sketches as an option. The report customer is waiting for accurate figures.",
          },
        ],
        question:
          "Do the figures cover the same people, dates, and necessary checks?",
      },
      {
        title: "Bring two choices",
        step: 2,
        record: "tradeoff-brief",
        move: "The PM recommends a small clickable demonstration only if the product director agrees to postpone the report correction. The alternative is to use the sketches and keep all current work. The decision is still open.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "I’d do the clickable demo if we can delay the report fix. Otherwise, let’s use the sketches. Could you let us know by Wednesday afternoon?",
          },
          {
            speaker: "Product director",
            words:
              "What would we tell the customer waiting for the corrected report?",
          },
        ],
        question:
          "Have you made the cost to the other customer as clear as the benefit to Friday’s customer?",
      },
      {
        title: "Record what was chosen",
        step: 3,
        record: "tradeoff-brief",
        values: {
          decisionStatus: "AGREED — decision recorded",
          finalDecision:
            "Fictional Wednesday decision: the product director approves the small demonstration and postpones the report correction. The invitation fix and customer-data checks continue. The team must confirm the revised report date before the account manager tells the customer.",
        },
        move: "In this fictional continuation, the director approves the smaller demonstration and the delay. The team checks the report date. The PM updates the plan, and the account manager tells the affected customer.",
        dialogue: [
          {
            speaker: "Product director",
            words:
              "Let’s do the small demo and put the report fix on hold. Keep going with the invitation fix and security checks.",
          },
          {
            speaker: "PM",
            words:
              "I’ll get the report date checked and make sure the account manager can explain the change.",
          },
        ],
        question:
          "Who needs a different instruction now that the decision is made?",
      },
      {
        title: "See what actually happened",
        step: 3,
        record: "tradeoff-brief",
        values: {
          decisionStatus: "AGREED — decision recorded",
          finalDecision:
            "Fictional Wednesday decision: prepare the small demonstration; postpone the report correction; keep invitation and customer-data work.",
          returnRecord:
            "Fictional Friday review: the customer used the demonstration to explain which figures they need. The report correction was paused, and the account manager confirmed the affected customer received the revised date. Next time, Sales and the team will check the meeting purpose before promising a demonstration.",
        },
        move: "This example ends with a check, not a victory lap. The group asks whether the demonstration helped, the delayed customer was told, and the team actually stopped the postponed work.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "Did Friday help the customer decide anything? And did the report work really wait?",
          },
          {
            speaker: "Engineering lead",
            words:
              "Yes. We paused it. Let’s ask what the meeting is for earlier next time.",
          },
        ],
        question:
          "What small change would make the next urgent request easier to handle?",
      },
    ],
    resources: [
      {
        source: "your-companys-god-is-showing",
        topic: "What we reward",
        why: "Use Nic’s essay to examine what repeated urgency says about what matters in the organization.",
        question:
          "What does the team see us protect when we are under pressure?",
        step: 0,
      },
      {
        source: "culture-vulture",
        topic: "What we reward",
        why: "Look at what living with the current pace does to a person over time.",
        question: "Who keeps absorbing the work that never fits?",
        step: 1,
      },
      {
        source: "bowl",
        topic: "The conversation",
        why: "Consider the space you make for the requester and the people already carrying the work.",
        question: "Whose experience has not been heard in this decision?",
        step: 2,
      },
      {
        source: "you-have-a-culture-problem",
        topic: "Holistic Shaping",
        why: "Trace how repeated choices about urgent work become expectations and habits.",
        question:
          "What are we teaching people to expect the next time someone asks?",
        step: 3,
      },
      {
        source: "when-mattering-isnt-enough",
        topic: "Holistic Shaping",
        why: "Nic asks what happens beyond feeling valued. Consider whether the way work is assigned gives people room to grow.",
        question: "What cost to people is missing from our work list?",
        step: 1,
      },
      {
        source: "dora-wip",
        topic: "Choosing the work",
        why: "Use this guide to discuss how much work to start and how to include tasks that are easy to overlook.",
        question:
          "What could we finish sooner if we stopped starting so many things?",
        step: 1,
      },
      {
        source: "singer-boundaries",
        topic: "Choosing the work",
        why: "Explore a smaller useful answer within the time available.",
        question: "What could Friday’s customer learn from something smaller?",
        step: 1,
      },
      {
        source: "bain-rapid",
        topic: "Who decides",
        why: "Check who advises on the choice and who can change the commitments involved.",
        question: "Who can decide which customer promise waits?",
        step: 2,
      },
    ],
  },
  "mandate-reset": {
    welcome:
      "Follow one stuck release decision through the request, the response, and the first chance to test the agreement.",
    intro:
      "A fictional example: a PM is responsible for a booking release, while several directors add requests. The PM needs a clear way to get one decision and one plan for the team.",
    companion: [
      {
        after: 1,
        step: 0,
        eyebrow: "BEFORE YOU ASK / START WITH ONE DECISION",
        title: "Make the problem easy to recognize.",
        intro:
          "“I need more authority” can mean many things. A real example gives you and your manager something you can work on together.",
        cards: [
          {
            title: "Describe the sequence",
            body: "A director asks a developer for another feature. The developer starts it. I’m still asked to deliver the original plan on the original date.",
          },
          {
            title: "Name the missing decision",
            body: "Who can decide whether that feature enters this release, and what waits if it does? Keep the question that specific.",
          },
          {
            title: "Ask how they see it",
            body: "What do you understand me to be allowed to decide here? Has that been explained to the other directors and the team?",
          },
          {
            title: "Invite a workable answer",
            body: "I want us to give the team a plan it can follow. Could we agree who makes this call and how quickly we can get an answer?",
          },
        ],
        takeaway:
          "You may need clearer permission, faster decisions, or people to honor an agreement that already exists. Find out which.",
      },
      {
        after: 2,
        step: 1,
        eyebrow: "DECISION ROLES / USING BAIN’S RAPID",
        title: "Who has which part of this decision?",
        intro:
          "Bain’s RAPID names five roles: Recommend, Agree, Perform, Input, and Decide. Use them to check one decision with the people involved.",
        cards: [
          {
            title: "Recommend",
            body: "One person gathers what matters and brings a proposal. Here, the PM compares the new request with the release plan.",
          },
          {
            title: "Input and Agree",
            body: "Input contributes knowledge and experience. Agree covers specific mandatory requirements. In this example, developers advise on effort; the security reviewer confirms the required customer-data checks.",
          },
          {
            title: "Decide and Perform",
            body: "Decide makes the final call. Perform carries it out. Here, the product director chooses the release work; developers implement it and the PM communicates the plan.",
          },
          {
            title: "Check it with the people named",
            body: "Ask them to confirm the roles, limits, and timing. Writing a person’s name into the Lab does not grant authority or remove an approval.",
          },
        ],
        takeaway:
          "RAPID is Bain & Company’s framework. Follow the resource link for its full explanation; the Lab uses ordinary-language questions to help you apply the distinction.",
      },
      {
        after: 4,
        step: 2,
        eyebrow: "DISCUSSION GUIDE / ASK FOR SOMETHING WORKABLE",
        title: "What would let the work move?",
        intro:
          "There can be more than one good answer. Prepare the change you want and an alternative that still gives the team a usable decision.",
        cards: [
          {
            title: "1 / What would you decide?",
            body: "Could I postpone a new feature to protect the agreed release, within this budget and these required checks? Name the boundary as well as the permission.",
          },
          {
            title: "2 / What would help you use that permission?",
            body: "Do you need better information, help from Engineering, or a shared understanding of the customer goal? More authority alone may not solve it.",
          },
          {
            title: "3 / If the call stays with them",
            body: "Could you answer these requests within one working day? Who should we ask when you are unavailable? What should we do while waiting?",
          },
          {
            title: "4 / Who needs to hear the agreement?",
            body: "Could you confirm this with the directors and the developers? Ask what message would make the arrangement clear to the people using it.",
          },
        ],
        takeaway:
          "Finish with who can decide what, the limits, a response time, and when you will check whether the arrangement is working.",
      },
      {
        after: 5,
        step: 3,
        eyebrow: "COMMUNICATION / TRY THE AGREEMENT IN REAL WORK",
        title: "A reassuring answer needs a practical test.",
        intro:
          "“Of course you own it” may be encouraging. The next request will show whether you have the same understanding of what that means.",
        cards: [
          {
            title: "Read the answer back",
            body: "So the product director decides new release requests within one working day, and the team keeps the last agreed plan while waiting. Is that what we’re agreeing?",
          },
          {
            title: "Make the limits clear",
            body: "Keep required security, release, and spending approvals visible. A quicker way to choose work does not remove those responsibilities.",
          },
          {
            title: "Tell the people who use it",
            body: "Explain where to send requests, who responds, and what happens while waiting. Ask the director to resolve contradictory instructions from another director.",
          },
          {
            title: "Return with an example",
            body: "After two requests, compare the agreement with what happened. If the team still received conflicting instructions, describe those events and ask what needs changing.",
          },
        ],
        takeaway:
          "The Lab’s updates and follow-up record help you keep the agreement connected to the work people actually experience.",
      },
      {
        after: 8,
        step: 3,
        eyebrow: "HOLISTIC SHAPING / AUTHORITY AND GROWTH",
        title: "What kind of responsibility are people learning?",
        intro:
          "A workable decision process can help people use judgment and grow. An unclear one can teach them to wait, hide, or carry responsibility without help.",
        cards: [
          {
            title: "Identity",
            body: "Are people learning that they can make a considered call and explain it? Or that being responsible means taking blame for choices they cannot make?",
          },
          {
            title: "Relationship",
            body: "Can directors and the team question each other without routing everything through private favors? What trust would make the arrangement easier to use?",
          },
          {
            title: "Vision",
            body: "Do people know enough about the purpose to choose well? What information would help them make a decision closer to the work?",
          },
          {
            title: "Culture",
            body: "Does the written arrangement survive a request from someone powerful? What does the response teach everyone else about whose judgment counts?",
          },
        ],
        takeaway:
          "Notice what the arrangement makes possible for people, as well as how quickly decisions happen. Nobody needs to disclose personal health information to discuss the way work is organized.",
      },
    ],
    scenes: [
      {
        title: "The decision that gets stuck",
        step: 0,
        move: "The PM is responsible for a booking release. Developers keep receiving extra feature requests directly from directors. The PM chooses one question to resolve: who decides whether those requests enter this release?",
        dialogue: [
          {
            speaker: "PM",
            words:
              "I’m asked to protect the release date, but new features are being added directly. Can we look at how those requests get decided?",
          },
          {
            speaker: "Product director",
            words:
              "I thought you were already managing that. Show me where it’s getting stuck.",
          },
        ],
        question: "Can both people recognize the same sequence of events?",
      },
      {
        title: "Check who does what",
        step: 1,
        record: "rights-map",
        move: "They map the recommendation, advice, required approvals, final call, and work afterward. The map is their current understanding, not a new grant of authority.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "I can bring the options, and Engineering can explain the work. Do you make the final call about what enters the release?",
          },
          {
            speaker: "Product director",
            words:
              "Yes. Security still needs to approve the data checks, and Finance approves extra spending.",
          },
        ],
        question:
          "Have you separated giving advice, a required approval, and the final decision?",
      },
      {
        title: "Ask for a usable arrangement",
        step: 2,
        record: "authority-gap",
        move: "The PM asks for new requests to go through the product director before entering the team’s plan. If the director keeps the decision, the PM asks for a response within one working day.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "Could you make the call within one working day? And could the team keep the agreed plan until you answer?",
          },
          {
            speaker: "Product director",
            words:
              "That sounds workable. Let’s make sure the other directors know where to send requests.",
          },
        ],
        question:
          "Is that an agreement yet, or an encouraging response that still needs confirming?",
      },
      {
        title: "Confirm it with everyone",
        step: 3,
        record: "mandate-request",
        values: {
          decisionStatus: "AGREED — decision recorded",
          finalDecision:
            "Fictional agreement before Monday: the product director decides new release requests within one working day and communicates the arrangement to directors and developers. The team keeps the last agreed plan while waiting. Required security, spending, and release approvals stay in place.",
        },
        move: "In this fictional continuation, the director explicitly confirms the arrangement before Monday and tells the other directors and developers. The PM records the response time and the plan while waiting.",
        dialogue: [
          {
            speaker: "Product director",
            words:
              "Agreed. I’ll confirm this with everyone today. Bring me the options; keep the current plan until I decide.",
          },
          {
            speaker: "PM",
            words: "Let’s review how it works after the next two requests.",
          },
        ],
        question:
          "Would a developer receiving a new request know what to do now?",
      },
      {
        title: "Use the next two requests",
        step: 3,
        record: "mandate-request",
        values: {
          decisionStatus: "AGREED — decision recorded",
          finalDecision:
            "Fictional agreement: the director decides within one working day; the team keeps the agreed plan while waiting; required approvals remain.",
          returnRecord:
            "Fictional review after two requests: the first received an answer in time. The second arrived while the director was away and remained unanswered. The PM asks the director to name an authorized backup and confirm the response time; no backup has been agreed yet.",
        },
        move: "The first request gets a timely answer. The second stalls while the director is away. The PM brings that example back and asks for an authorized backup. This new request is still a proposal.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "The first request worked well. The second waited while you were away. Who could make the call then?",
          },
          {
            speaker: "Product director",
            words:
              "Let me check who can cover that. Keep the agreed plan for now.",
          },
        ],
        question:
          "What did the real use reveal that the first agreement missed?",
      },
    ],
    resources: [
      {
        source: "the-hollow-crown-why-our-leadership",
        topic: "Responsibility",
        why: "Use Nic’s essay when the conversation keeps returning to whether you are a good enough leader instead of what the work requires.",
        question:
          "Which conditions would need to change for someone else in this role to succeed too?",
        step: 0,
      },
      {
        source: "do-your-replacement-a-favor",
        topic: "Responsibility",
        why: "Consider whether the arrangement could work without your private favors and constant intervention.",
        question: "Could someone new understand how this decision gets made?",
        step: 2,
      },
      {
        source: "bowl-synthesis",
        topic: "The conversation",
        why: "Nic describes leadership as participating in relationships and being changed by them. Use it to stay open to what the other people see.",
        question:
          "What might I need to change in my own understanding of this role?",
        step: 0,
      },
      {
        source: "you-have-a-culture-problem",
        topic: "Holistic Shaping",
        why: "Look at how authority, trust, and a shared purpose influence each other over time.",
        question:
          "What does our decision process teach people about whose judgment matters?",
        step: 3,
      },
      {
        source: "when-mattering-isnt-enough",
        topic: "Holistic Shaping",
        why: "Nic asks what comes after feeling valued. Consider what support people need to grow into the responsibility they have been given.",
        question:
          "Where could a clearer agreement reduce harm and make growth possible?",
        step: 2,
      },
      {
        source: "bain-rapid",
        topic: "Who decides",
        why: "Read Bain’s explanation of Recommend, Agree, Perform, Input, and Decide alongside your Who Can Decide record.",
        question:
          "Do the people named agree that these are their roles for this decision?",
        step: 1,
      },
      {
        source: "marquet-competence-clarity",
        topic: "Who decides",
        why: "Marquet’s article and video connect authority with the understanding needed to use it well.",
        question:
          "What knowledge and shared purpose would help us move this decision closer to the work?",
        step: 2,
      },
    ],
  },
  "when-the-team-goes-quiet": {
    welcome:
      "Follow a quiet planning meeting into the conversation afterward, a small change, and a check on whether it helped.",
    intro:
      "A fictional example: a data analyst tries to raise a question about a report. The PM moves on. Later, they discover the report may miss the new online bookings. Here’s how the conversation could go.",
    companion: [
      {
        after: 1,
        step: 0,
        eyebrow: "OPTIONAL / A LITTLE MORE HELP",
        title: "Prepare without writing a whole script.",
        intro:
          "If you only have five minutes, use these three prompts. You can think them through without writing anything down.",
        cards: [
          {
            title: "The moment",
            body: "What did you notice, in words someone else in the meeting could recognise?",
          },
          {
            title: "Your part",
            body: "What did you say or do that you want to ask about or change?",
          },
          {
            title: "Your invitation",
            body: "Who do you want to understand, and what is one question you could ask them?",
          },
        ],
        takeaway:
          "Stop when you have enough to begin. You can return to the rest after you’ve talked.",
      },
      {
        after: 3,
        step: 2,
        eyebrow: "OPTIONAL / A LITTLE MORE HELP",
        title: "Practise the moment you want to defend yourself.",
        intro:
          "Imagine hearing: “There isn’t much point raising concerns. You’ve already decided.” What happens inside you?",
        cards: [
          {
            title: "Pause",
            body: "You don’t have to agree with the whole statement to ask what led to it.",
          },
          {
            title: "Ask",
            body: "“Can you give me an example? I want to understand what I did.”",
          },
          {
            title: "Check",
            body: "“When I presented the plan as settled, you thought the questions wouldn’t change anything. Have I got that?”",
          },
          {
            title: "Then respond",
            body: "If you did shut the conversation down, own it. If there is a misunderstanding, explain it after checking what you heard.",
          },
        ],
        takeaway: "You’re practising a response, not memorising a performance.",
      },
      {
        after: 4,
        step: 2,
        eyebrow: "OPTIONAL / IF YOUR TEAM USES SCRUM",
        title: "Why we do Scrum this way",
        intro:
          "If your team uses Scrum, these conversations already have a place. The November 2020 Scrum Guide describes opportunities to learn from the work and adjust it. These short summaries explain their purpose; the questions are suggestions for your team.",
        cards: [
          {
            title: "Sprint Planning",
            body: "The whole Scrum Team plans together. Developers select the work with the Product Owner and decide how to do it. Ask: “What do we need to understand before we commit to this?”",
          },
          {
            title: "Daily Scrum",
            body: "Developers spend 15 minutes checking progress toward the Sprint Goal and adjusting their plan. Ask: “What needs to change today?” A report to the manager misses that purpose.",
          },
          {
            title: "Sprint Review",
            body: "The Scrum Team and stakeholders examine results and decide what to adapt. Ask: “What have we learned that should change what happens next?” Leave room for discussion, beyond a demonstration.",
          },
          {
            title: "Sprint Retrospective",
            body: "The Scrum Team plans improvements to quality and effectiveness. Ask: “Which change will we actually make?” Then check what happened.",
          },
        ],
        takeaway:
          "Source: Ken Schwaber and Jeff Sutherland, The Scrum Guide (November 2020). Read the full definitions at scrumguides.org/scrum-guide.html.",
      },
      {
        after: 5,
        step: 2,
        eyebrow: "OPTIONAL / THE REASON BEHIND THE PRACTICE",
        title: "Agile should leave room to learn.",
        intro:
          "Agile is a set of values and principles; Scrum is a framework a team may use. Neither requires you to pretend the plan is right when you’ve learned something that changes it.",
        cards: [
          {
            title: "Work with people",
            body: "The Agile Manifesto gives more weight to people working together than to processes and tools. A board or a meeting format can help; it can’t hear a concern for you.",
          },
          {
            title: "Respond to what you learn",
            body: "A plan is useful. The Manifesto also values responding to change. Explain what you learned and discuss what that means for the work.",
          },
          {
            title: "Make improvement part of the work",
            body: "The Agile principles call for regular reflection followed by changes in how the team works. A concern raised in a retrospective needs a response, not just a sticky note.",
          },
          {
            title: "Keep a pace people can sustain",
            body: "Sustainable work is an Agile principle too. If every honest answer about workload becomes a request for overtime, notice what that teaches people.",
          },
        ],
        takeaway:
          "Sources: the Agile Manifesto and its twelve principles. The meeting questions in this tool are suggestions, not additional Scrum rules.",
      },
      {
        after: 6,
        step: 3,
        eyebrow: "OPTIONAL / A LITTLE MORE HELP",
        title: "Make the next meeting easier to join.",
        intro:
          "Choose a change with the people who use the meeting. These are options to discuss, not a new set of ceremonies.",
        cards: [
          {
            title: "Before",
            body: "Share the question or proposed plan early enough for people to look at it. Ask whose input is missing.",
          },
          {
            title: "During",
            body: "Give people a little time to think. Ask what you might be overlooking before announcing your preferred answer. Let people pass.",
          },
          {
            title: "After",
            body: "Say what changed because of the discussion, or explain why it didn’t. Follow up on questions that still need an answer.",
          },
          {
            title: "If you use Scrum",
            body: "Involve your Scrum Master when the events aren’t helping the team. The Guide describes self-management and the values of commitment, focus, openness, respect, and courage. These aren’t a demand for personal disclosure.",
          },
        ],
        takeaway:
          "A useful check: could someone name one time their input changed what happened?",
      },
    ],
    scenes: [
      {
        title: "The question that got cut short",
        move: "The team is planning Friday’s release of online booking. The report Support uses may not include bookings from the new page.",
        dialogue: [
          {
            speaker: "Data analyst",
            words:
              "There’s something about the booking numbers we need to check.",
          },
          {
            speaker: "PM",
            words:
              "Can we stick to the release plan? We’re running out of time.",
          },
          {
            speaker: "Data analyst, afterward",
            words:
              "I was trying to tell you the report might miss the new bookings.",
          },
        ],
        question:
          "What do we know happened? What are we still guessing about why the analyst didn’t continue?",
        step: 0,
      },
      {
        title: "An invitation to talk",
        move: "The PM asks for a short conversation away from the group.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "I cut you off earlier. I’m sorry. Could we talk about what I missed? Now or later is fine.",
          },
          {
            speaker: "Data analyst",
            words:
              "I wasn’t trying to slow everything down. Support uses those numbers to plan tomorrow’s work.",
          },
          {
            speaker: "PM",
            words: "Tell me more. What do we need to check?",
          },
        ],
        question:
          "Does the opening give the analyst room to explain, or ask them to reassure the PM?",
        step: 1,
        record: "quiet-conversation",
      },
      {
        title: "Checking what was heard",
        move: "The PM listens to the work concern and asks about the meeting.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "Let me check I’ve got this. You wanted us to check the report before we agreed to Friday. When I moved on, it sounded like the decision was already made.",
          },
          {
            speaker: "Data analyst",
            words:
              "Yes. I wasn’t asking us to cancel. I needed someone to hear that there was a check missing.",
          },
          {
            speaker: "PM",
            words:
              "That makes sense. I should have let you finish. Can we get the report owner involved today?",
          },
        ],
        question: "What did the correction change in the PM’s understanding?",
        step: 2,
        record: "quiet-change",
        values: {
          understanding:
            "The analyst wanted the report checked before agreeing to Friday. The report owner needs to be involved today.",
        },
      },
      {
        title: "A change they can try",
        move: "The PM asks about the next meeting and what can be shared.",
        dialogue: [
          {
            speaker: "PM",
            words:
              "I’ll send the plan earlier and leave time for concerns before we decide. Would that help?",
          },
          {
            speaker: "Data analyst",
            words:
              "Yes. And if there’s a question you can’t answer, could we agree who will check it?",
          },
          {
            speaker: "PM",
            words:
              "Yes. Is it okay to tell the team we’re checking the report with its owner? I won’t repeat this conversation.",
          },
          {
            speaker: "Data analyst",
            words: "That’s fine. Let’s keep the rest between us.",
          },
        ],
        question:
          "Which part is the PM’s own promise, and which part did they check with the analyst?",
        step: 3,
        record: "quiet-follow-through",
        values: {
          decisionStatus: "AGREED — change recorded",
          finalDecision:
            "The analyst agreed to trying the meeting change and sharing only the report check. The PM will send the plan earlier and name who will follow up on open questions.",
          sharePermission:
            "We can share the report check. We won’t share the private conversation.",
          understanding:
            "We need to check the report with its owner before confirming Friday.",
        },
      },
      {
        title: "Two meetings later",
        move: "They return to what they said they would try. It’s a small start, with more to learn.",
        dialogue: [
          {
            speaker: "PM",
            words: "Did getting the plan earlier help?",
          },
          {
            speaker: "Data analyst",
            words:
              "Yes. I could check the numbers first. The question got a proper answer this time. We still rushed the last item.",
          },
          {
            speaker: "PM",
            words:
              "I noticed that too. Let’s put that question earlier next time and see how it goes.",
          },
        ],
        question: "What actually improved, and what still needs attention?",
        step: 3,
        record: "quiet-follow-through",
        values: {
          decisionStatus: "AGREED — change recorded",
          finalDecision:
            "The PM and analyst agreed to try the meeting change, share only the report check, and review it after two meetings.",
          returnRecord:
            "The analyst had time to check the numbers and their question received an answer. The last agenda item was still rushed. The PM will move that question earlier next time.",
        },
      },
    ],
    resources: [
      {
        source: "stop-chasing-psychological-safety",
        topic: "When a concern sounds like resistance",
        why: "Nic explores how people can misread one another’s contributions. Read it when a practical concern sounds to you like someone blocking the idea.",
        question: "What was the other person trying to help us see?",
        step: 0,
      },
      {
        source: "chapgpt-schools-me-on-leading-well",
        topic: "Meet the person in front of you",
        why: "A reflection from Nic on how we meet another person. Read or watch before a conversation you’ve already decided the meaning of.",
        question: "Can their answer change my view?",
        step: 1,
      },
      {
        source: "you-have-a-culture-problem",
        topic: "What becomes normal here",
        why: "Nic’s Cultural Orbital Mechanics connects culture, identity, relationship, and vision. Read it alongside the question of what repeated meetings teach people.",
        question: "What are we making normal each time we meet?",
        step: 2,
      },
      {
        source: "when-mattering-isnt-enough",
        topic: "What happens after someone feels heard",
        why: "Nic asks what comes after feeling valued. Read it when you want the conversation to change more than how the meeting feels.",
        question:
          "What room have we made for someone’s judgment to change the work?",
        step: 3,
      },
      {
        source: "the-hollow-crown-why-our-leadership",
        topic: "You don’t have to carry this alone",
        why: "Nic questions the expectation that a better individual leader can solve everything. Read it when the same problem keeps returning despite your efforts.",
        question: "What needs to change beyond my own behaviour?",
        step: 3,
      },
      {
        source: "scrum-guide",
        topic: "Why these Scrum conversations exist",
        why: "The original definitions, accountabilities, events, and values. Use it to check what a meeting is for before changing how you run it.",
        question: "What should this event help us learn or change?",
        step: 2,
      },
      {
        source: "agile-principles",
        topic: "Learning together as part of the work",
        why: "The original twelve principles, including regular reflection and sustainable work. Read them with your team and choose one to discuss.",
        question: "Which principle is hardest to recognise in our week?",
        step: 2,
      },
      {
        source: "agile-manifesto",
        topic: "People, working software, collaboration, and change",
        why: "Read the four values in full. They explain a preference, not permission to discard tools, documentation, agreements, or plans.",
        question:
          "Where does our routine help those values, and where does it get in the way?",
        step: 2,
      },
    ],
  },
};
