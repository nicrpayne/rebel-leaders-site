export type AIGuidePage = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
  callout: string;
  table?: string[][];
  sources?: { name: string; url: string }[];
};

export const LEADERSHIP_GUIDE_PAGES: Record<string, AIGuidePage[]> = {
  "deadline-reset": [
    {
      eyebrow: "01 / START HERE",
      title: "The date has already been promised. Now what?",
      intro:
        "You find out that customers have been promised a launch date. The team has not finished checking the work. Somehow, you are now expected to make those two things fit.",
      sections: [
        {
          title: "Start with why the date matters",
          body: "Is there an event booked? Has a customer planned around it? Ask what would happen if the date changed. You need to understand the promise before proposing a different one.",
        },
        {
          title: "Find out what kind of date it is",
          body: "A target is a date we would like to hit. An estimate is when the team currently thinks it can finish. A promise is something someone has told another person they can rely on. Ask which this is and what work it includes.",
        },
        {
          title: "Give people a choice they can understand",
          body: "Perhaps customers need online booking by the event, but reports could come later. Perhaps both features matter more than the date. Work through those options with the people building the software.",
        },
        {
          title: "What you will leave with",
          body: "The Lab helps you write down the facts, compare delivery options, and prepare an update asking for a decision. You can return after the meeting to record the answer.",
        },
      ],
      callout:
        "Start with one promised date. You are trying to work out what can be delivered and what people need to be told.",
    },
    {
      eyebrow: "02 / BEFORE THE CONVERSATION",
      title: "You can be frustrated and still be curious.",
      intro:
        "It is easy to hear an unrealistic date as “just work harder.” Before replying, separate that frustration from the question you need answered.",
      sections: [
        {
          title: "What actually happened?",
          body: "Write down what was said or done. Then notice what you have added. “They asked for Friday” and “They do not care about the team” are different statements. You can check the first. You need to ask about the second.",
        },
        {
          title: "Why do you care?",
          body: "Who would be better off if this worked? A customer could stop chasing an answer. Your team could finish the work it promised. Start there. Give the other person a chance to tell you what matters to them too.",
        },
        {
          title: "What would better look like?",
          body: "Imagine the next few weeks going well. What would people be doing differently? Describe that in ordinary words, then ask the other person what they would add or change.",
        },
        {
          title: "Keep these notes to yourself",
          body: "Private notes in the Lab stay only in the open tab. They disappear when you refresh or leave and never appear in your exported documents. You can also think through these questions without typing.",
        },
      ],
      callout:
        "An opening you can adapt: “I want us to find a way through this. Can we look at what is happening and work out what to do next?”",
    },
    {
      eyebrow: "03 / CHECK THE PROMISE",
      title: "What exactly have people been told?",
      intro:
        "“We promised November 1” is only the start. Promised what, to whom, and by whom?",
      sections: [
        {
          title: "Write down the promise",
          body: "Name the date, the features or service promised, the people expecting it, and the person who told them. Quote the actual message if you can.",
        },
        {
          title: "Check what really cannot change",
          body: "For example, the event venue may be booked, but nobody has agreed which features must be shown. Ask the person responsible for the event or contract to confirm.",
        },
        {
          title: "List what still needs checking",
          body: "Does the booking page put appointments into the repair calendar? Can customers see only their own bookings? Has the team tested those things, or are we assuming they work?",
        },
        {
          title: "Explain what is at risk",
          body: "Say what customers could experience if the plan does not work. “A customer books a repair but the service team never receives it” is more useful than “integration risk.”",
        },
      ],
      callout:
        "Try: “I know the event is fixed. Can we check exactly what customers have been promised for that day?”",
    },
    {
      eyebrow: "04 / COMPARE THE OPTIONS",
      title: "What could we change?",
      intro:
        "Ask the team what each option would take. A smaller promise still needs to be useful to the customer.",
      sections: [
        {
          title: "Keep the date; do less",
          body: "Could customers book repairs on November 1, with downloadable service reports added later? Name what would be ready and what would wait.",
        },
        {
          title: "Keep all the work; reconsider the date",
          body: "Ask the people doing the work when both features could be ready and what they still need to check. If they cannot give a reliable date yet, say when they will reassess it.",
        },
        {
          title: "Check whether more help would help",
          body: "A new person needs time to learn the work. A specialist might remove a specific problem. Include the time needed to teach, review, and test; do not assume extra people instantly make delivery faster.",
        },
        {
          title: "Keep the necessary checks",
          body: "Name the security, safety, and quality checks that must still happen. Explain the consequences of skipping them. Ask the people responsible for those checks to confirm the plan.",
        },
      ],
      callout:
        "Try: “We may be able to have booking ready for the event if reports come later. If both must be ready together, we need to review the date.”",
    },
    {
      eyebrow: "05 / CHECK HOW SURE YOU ARE",
      title: "How confident are we, and why?",
      intro:
        "“Medium confidence” is not much help on its own. Explain which work and date you mean, and what could change your view.",
      sections: [
        {
          title: "Name the plan you are assessing",
          body: "“Online booking by November 1” is different from “booking and reports by November 1.” Make sure everyone is talking about the same promise.",
        },
        {
          title: "Say what you know",
          body: "For example, the booking page is built and reviewed. The engineering lead has estimated the work left. Explain what those estimates are based on.",
        },
        {
          title: "Say what you still need to find out",
          body: "The engineering lead will check the calendar connection on Thursday. Until then, the date depends on that check succeeding.",
        },
        {
          title: "Agree what happens if the check fails",
          body: "Who will decide whether to show a demonstration instead? When must customers be told? Make that plan now, while there is still time to act.",
        },
      ],
      callout:
        "The Lab does not calculate the chance of hitting a date. It helps you explain your judgment and what you will check next.",
    },
    {
      eyebrow: "06 / HAVE THE CONVERSATION",
      title: "Give them something they can decide.",
      intro:
        "Bring a short recommendation, the reason for it, and the alternatives. Leave room for information you do not have.",
      sections: [
        {
          title: "Open with the customer need",
          body: "“Customers need to see online booking at the event. I want to keep that useful. Here is what the team has checked and what is still uncertain.”",
        },
        {
          title: "If the answer is “the date cannot move”",
          body: "“Understood. Which parts must be ready that day, and which could come later?” Bring the team into checking whether the smaller plan is possible.",
        },
        {
          title: "If the answer is “just add people”",
          body: "“Which part would another person help with? Who would get them started and check their work?” Ask the team to assess that option.",
        },
        {
          title: "Ask for a decision and record the response",
          body: "Name the person who can change the promise and when you need an answer. Record what they actually agree, decline, or ask you to check. Update customers through the person responsible for that relationship.",
        },
      ],
      callout:
        "Try: “I recommend focusing on booking for the event and adding reports later. Can we agree that, then confirm the customer message after Thursday's check?”",
    },
    {
      eyebrow: "07 / EXAMPLE",
      title: "Online booking by November 1. Reports too?",
      intro:
        "Fictional example: a sales director has promised online repair booking and downloadable service reports for a customer event. The event is fixed. The connection between booking and the repair calendar has not been tested.",
      sections: [
        {
          title: "What the product manager finds out",
          body: "Customers need to see how booking will work at the event. No contract requires downloadable reports that day. The engineering lead needs to test the calendar connection before confirming the smaller plan.",
        },
        {
          title: "The recommendation",
          body: "Keep the event, aim for working online booking, and explain that reports will come later. Confirm what we can promise after Thursday's calendar check.",
        },
        {
          title: "The conversation",
          body: "The product manager asks the sales director to agree that reports can come later. They also agree to show a demonstration only if Thursday's calendar check fails. The sales director will explain any change to customers.",
        },
        {
          title: "What happens next",
          body: "In this example, the sales director accepts the recommendation on Wednesday. The engineering lead checks the calendar connection on Thursday. They review the result before confirming what customers can use on November 1. The Lab example starts before this agreement.",
        },
      ],
      callout:
        "The event still matters. The team now knows what to check, and customers can be told what to expect.",
    },
    {
      eyebrow: "08 / USE THE LAB",
      title: "Work through one promised date.",
      intro:
        "Open the Lab from your Start page. You can come back to the Guide whenever a question needs more thought.",
      sections: [
        {
          title: "The promise",
          body: "Record what was promised, why the date matters, and what is still uncertain. Build Deadline Facts if you need to check your understanding with someone.",
        },
        {
          title: "Options",
          body: "Write down what could be ready on the date, what a later date might allow, and whether extra help would be useful. Build Delivery Options to compare them.",
        },
        {
          title: "How sure are we?",
          body: "Choose your current confidence, explain it, and name the next check. Say what you will do if that check changes the plan.",
        },
        {
          title: "The update",
          body: "Write the decision you need, who can make it, and when. Build Decision Update while it is still a proposal. Return after the meeting to record the response, then rebuild and share the updated version.",
        },
      ],
      callout:
        "Load Examples fills only the step you are on. If it would replace existing answers, you will be asked first.",
    },
    {
      eyebrow: "09 / AFTER THE CONVERSATION",
      title: "Did anything actually change?",
      intro:
        "A completed form can look satisfying. The useful part is what people do with it.",
      sections: [
        {
          title: "Follow up",
          body: "Check that the customer message and the team's plan say the same thing. Return after the promised technical check. If the result changes what you can deliver, tell the people relying on the date.",
        },
        {
          title: "Try saying it out loud",
          body: "Read your proposed message to someone you trust. Ask where they got lost or what sounded strange. Could you say this to the person in a real meeting? Change anything you would have to translate as you spoke.",
        },
        {
          title: "Keep the record",
          body: "Copy, download, or print anything you need to keep. Shared answers save in this browser on this device; they do not follow you to another device. Private notes are not saved. Export before clearing a draft or browser data.",
        },
        {
          title: "Check what happened",
          body: "Was the decision understood? Did someone act? Did the change help the people it was meant to help? If nobody responded, find out who can decide and agree when to ask again. Silence does not mean yes.",
        },
      ],
      callout:
        "You do not have to fix the whole organization in one conversation. Leave knowing what happens next, who will do it, and when you will check back.",
    },
  ],
  "priority-whiplash": [
    {
      eyebrow: "01 / START HERE",
      title: "One more thing. And it is urgent.",
      intro:
        "The team already has a full week. Then another request arrives. It may be a good idea. It may even be the most important thing. But what happens to the work people are already waiting for?",
      sections: [
        {
          title: "Find out what is needed",
          body: "A request to show a customer a new screen could mean a sketch, a clickable demonstration, or working software. Ask before treating those as the same amount of work.",
        },
        {
          title: "Check whether it fits",
          body: "List the work already promised and ask the team what the new request would take. Include support, testing, and review. Sometimes it fits. If it does not, something needs to change.",
        },
        {
          title: "Make a recommendation",
          body: "Could you do a smaller version? Put something else off? Use work you already have? Describe the choices and explain which you recommend.",
        },
        {
          title: "Get a clear answer",
          body: "If you are allowed to make the call, make it and tell the people affected. If it changes commitments someone else owns, take the recommendation to them. Record what is decided.",
        },
      ],
      callout:
        "You are not trying to win an argument about being busy. You are trying to make a plan people can actually follow.",
    },
    {
      eyebrow: "02 / BEFORE THE CONVERSATION",
      title: "You can be frustrated and still be curious.",
      intro:
        "A new urgent request can feel like nobody remembers the promises you are already trying to keep. That feeling is worth noticing before you write the reply.",
      sections: [
        {
          title: "What actually happened?",
          body: "Write down what was said or done. Then notice what you have added. “They asked for Friday” and “They do not care about the team” are different statements. You can check the first. You need to ask about the second.",
        },
        {
          title: "Why do you care?",
          body: "Who would be better off if this worked? A customer could stop chasing an answer. Your team could finish the work it promised. Start there. Give the other person a chance to tell you what matters to them too.",
        },
        {
          title: "What would better look like?",
          body: "Imagine the next few weeks going well. What would people be doing differently? Describe that in ordinary words, then ask the other person what they would add or change.",
        },
        {
          title: "Keep these notes to yourself",
          body: "Private notes in the Lab stay only in the open tab. They disappear when you refresh or leave and never appear in your exported documents. You can also think through these questions without typing.",
        },
      ],
      callout:
        "An opening you can adapt: “I want us to find a way through this. Can we look at what is happening and work out what to do next?”",
    },
    {
      eyebrow: "03 / LIST THE WORK",
      title: "What are we already asking people to do?",
      intro:
        "Use names people recognize. “Fix the broken invitation link” tells us more than “onboarding improvement.”",
      sections: [
        {
          title: "Start with the people waiting",
          body: "A new customer cannot join their account. Another customer is waiting for corrected report figures. Describe the work and who needs it.",
        },
        {
          title: "Include work that is easy to overlook",
          body: "Customer support, checking changes, meetings, and maintenance all use time. They do not disappear because they are missing from the feature list.",
        },
        {
          title: "Describe the new request",
          body: "Who asked, what do they need, and by when? Find out what they will use it for. In our example, the customer needs to react to a proposed report screen on Friday.",
        },
        {
          title: "Check the deadline",
          body: "Ask what confirms the timing. A booked customer meeting is different from a preferred date. Record what you have checked and what you still need to ask.",
        },
      ],
      callout:
        "Try: “What does the customer need to see on Friday? Would the sketches we already have be useful, or do they need to click through it?”",
    },
    {
      eyebrow: "04 / SEE WHAT WOULD CHANGE",
      title: "What would have to wait?",
      intro:
        "Work through the options with the people doing the work. Do not turn “we will squeeze it in” into a plan.",
      sections: [
        {
          title: "Name the work that changes",
          body: "In the example, a simple demonstration takes two days of team effort. That would mean putting off two days of work correcting a customer's report. Say who needs to know.",
        },
        {
          title: "Use the time check if it helps",
          body: "One person-day means one person working for one day. Two people each working for one day add up to two person-days. Compare available time and required work over the same dates. Include review and support.",
        },
        {
          title: "Understand what the numbers can tell you",
          body: "Ten days available, ten already needed, and two more requested means the entered plan needs twelve days of effort. The extra two must be addressed. It does not tell you the new finish date; ask the team about skills, waiting, and the order of work.",
        },
        {
          title: "Keep another option open",
          body: "Perhaps the existing sketches would do. Perhaps the demonstration can wait. Protect essential checks and customer promises, and explain the consequences of each choice.",
        },
      ],
      callout:
        "Changing the written recommendation does not change the calculator. Its numbers describe the work you entered before the proposed change.",
    },
    {
      eyebrow: "05 / MAKE A RECOMMENDATION",
      title: "What do you think we should do?",
      intro:
        "The person making the call needs more than a list of problems. Give them your recommendation and the reason for it.",
      sections: [
        {
          title: "Make the choice specific",
          body: "“Prepare the small demonstration and postpone the report correction” is a choice. “Be more flexible” is not enough for anyone to act on.",
        },
        {
          title: "Explain who benefits and who waits",
          body: "The customer in Friday's meeting can react to the idea. The customer waiting for correct report figures waits longer. Both belong in the conversation.",
        },
        {
          title: "Find the person who can make the call",
          body: "Use a real name. Who can approve changing these customer commitments? If that is you, decide within your authority and communicate the change.",
        },
        {
          title: "Say when an answer is needed",
          body: "In the example, Wednesday afternoon gives the team time to change the plan and tell the account manager by Thursday morning.",
        },
      ],
      callout:
        "Try: “I recommend the small demonstration, with the report correction moved back. We need a decision by Wednesday so we can tell the people affected.”",
    },
    {
      eyebrow: "06 / HAVE THE CONVERSATION",
      title: "Keep bringing it back to the actual work.",
      intro:
        "People may see a consequence you have missed. Listen, check the facts, and adjust the recommendation where needed.",
      sections: [
        {
          title: "“They are all top priority”",
          body: "“Which should the team work on first? If the new request goes first, are we agreeing that the report correction waits?”",
        },
        {
          title: "“It is only a day or two”",
          body: "“Does that include checking and testing it? Let us ask the people doing the work before we promise.”",
        },
        {
          title: "“Nothing can move”",
          body: "“Could we make the demonstration smaller, use the existing sketches, or change the date?” If none works, record the unresolved decision rather than silently assuming overtime.",
        },
        {
          title: "“This is an emergency”",
          body: "Follow the incident process if it is a real emergency. Name who can authorize the interruption, which work pauses, and when the temporary arrangement will be reviewed.",
        },
      ],
      callout:
        "Try: “I can see why Friday matters. Here is what we could do, and what would have to wait. Can we choose a plan together?”",
    },
    {
      eyebrow: "07 / EXAMPLE",
      title: "A Friday demonstration meets a full week.",
      intro:
        "Fictional example: the team is fixing a broken account invitation, checking customer-data security, and correcting inaccurate report totals. The sales director now wants a demonstration for Friday.",
      sections: [
        {
          title: "What is already promised",
          body: "New customers need the invitation fix. The next software update needs security checks. An existing customer needs corrected report figures. Support and review are included in the team's estimate of ten days of work.",
        },
        {
          title: "What the new request means",
          body: "The customer wants to react to a proposed report screen. A simple clickable demonstration would take two more days. The team has ten days of work time between them before Friday, and all ten are already needed.",
        },
        {
          title: "The recommendation",
          body: "Make a simple clickable demonstration and put off two days of work on the incorrect report totals. Check the new report-fix date with the team before promising it.",
        },
        {
          title: "The decision and follow-up",
          body: "In this example, the product director agrees on Wednesday to postpone the report correction. The team checks its new finish date. The product manager updates the plan; the account manager tells the affected customer. They review what happened after Friday's meeting. The Lab example starts before the decision.",
        },
      ],
      callout:
        "If the new work had fitted, there would have been no need to invent a tradeoff. Here it does not fit, so the people involved make a clear choice.",
    },
    {
      eyebrow: "08 / USE THE LAB",
      title: "From a new request to a clear answer.",
      intro:
        "Bring one new request and the work it competes with. You can prepare alone, then check your assumptions with the team.",
      sections: [
        {
          title: "Current work",
          body: "List the current commitments, the new request, and why it matters now. Build Current Work List if you want someone to check it.",
        },
        {
          title: "What changes",
          body: "Check the time available if useful. Write what would wait, who would be affected, and another option. Build What Would Change to review the consequences.",
        },
        {
          title: "Recommend",
          body: "Write your recommendation, name the person who can decide, and say when you need an answer.",
        },
        {
          title: "Record",
          body: "Keep the status as PROPOSAL before the conversation and leave the actual decision blank. Build Priority Decision Brief. After the conversation, record the response, update who will do what, and rebuild the brief.",
        },
      ],
      callout:
        "Copy, download, or print the brief to take into your usual work tools. The Lab does not send it or change the team's plan.",
    },
    {
      eyebrow: "09 / AFTER THE CONVERSATION",
      title: "Did anything actually change?",
      intro:
        "A completed form can look satisfying. The useful part is what people do with it.",
      sections: [
        {
          title: "Follow up",
          body: "Check that people followed the agreed choice. Did the postponed work actually wait, or did the team end up doing both? Were the affected customers told? Use what happened to improve the next decision.",
        },
        {
          title: "Try saying it out loud",
          body: "Read your proposed message to someone you trust. Ask where they got lost or what sounded strange. Could you say this to the person in a real meeting? Change anything you would have to translate as you spoke.",
        },
        {
          title: "Keep the record",
          body: "Copy, download, or print anything you need to keep. Shared answers save in this browser on this device; they do not follow you to another device. Private notes are not saved. Export before clearing a draft or browser data.",
        },
        {
          title: "Check what happened",
          body: "Was the decision understood? Did someone act? Did the change help the people it was meant to help? If nobody responded, find out who can decide and agree when to ask again. Silence does not mean yes.",
        },
      ],
      callout:
        "You do not have to fix the whole organization in one conversation. Leave knowing what happens next, who will do it, and when you will check back.",
    },
  ],
  "mandate-reset": [
    {
      eyebrow: "01 / START HERE",
      title: "You are responsible. But can you make the call?",
      intro:
        "You are asked why the release is late. Meanwhile, several directors have added work, and you are not allowed to put any of it off. Working harder will not answer the missing question: who gets to decide?",
      sections: [
        {
          title: "Choose one decision",
          body: "Start with a specific problem: who can approve adding another feature to this release? A conversation about that is easier to resolve than a general request for more authority.",
        },
        {
          title: "Find out how it works today",
          body: "Who brings the options? Who must be consulted? Whose approval is required? Who makes the final call? These may be different people.",
        },
        {
          title: "Ask for a practical change",
          body: "You might ask to make that decision within agreed limits. Or ask the person who retains it to respond within a day, with an agreed plan while you wait.",
        },
        {
          title: "Check the answer",
          body: "A new job title or a reassuring “you own it” does not tell the team what to do. Ask the people involved to confirm the arrangement and use it on the next real request.",
        },
      ],
      callout:
        "Here, your mandate means the decisions you are actually allowed to make. The tool helps you ask for a clear answer about one of them.",
    },
    {
      eyebrow: "02 / BEFORE THE CONVERSATION",
      title: "You can be frustrated and still be curious.",
      intro:
        "Being held responsible for a decision you cannot make is exhausting. You can describe that problem directly without deciding that everyone involved has bad intentions.",
      sections: [
        {
          title: "What actually happened?",
          body: "Write down what was said or done. Then notice what you have added. “They asked for Friday” and “They do not care about the team” are different statements. You can check the first. You need to ask about the second.",
        },
        {
          title: "Why do you care?",
          body: "Who would be better off if this worked? A customer could stop chasing an answer. Your team could finish the work it promised. Start there. Give the other person a chance to tell you what matters to them too.",
        },
        {
          title: "What would better look like?",
          body: "Imagine the next few weeks going well. What would people be doing differently? Describe that in ordinary words, then ask the other person what they would add or change.",
        },
        {
          title: "Keep these notes to yourself",
          body: "Private notes in the Lab stay only in the open tab. They disappear when you refresh or leave and never appear in your exported documents. You can also think through these questions without typing.",
        },
      ],
      callout:
        "An opening you can adapt: “I want us to find a way through this. Can we look at what is happening and work out what to do next?”",
    },
    {
      eyebrow: "03 / WHO CAN DECIDE",
      title: "Who does what when this decision comes up?",
      intro:
        "Map one decision using real names. Job titles alone may not tell you how the decision gets made.",
      sections: [
        {
          title: "Who brings the options and advice?",
          body: "One person prepares the recommendation. Others provide information: developers estimate the work, and an account manager explains customer promises. Giving advice does not automatically give someone the final say.",
        },
        {
          title: "Whose approval is required?",
          body: "For example, a security reviewer may have to approve the customer-data checks before release. A finance manager may have to approve extra spending. Keep those specific approvals clear.",
        },
        {
          title: "Who makes the final call and carries it out?",
          body: "Name who chooses what goes into the release, and who then builds, tests, communicates, or updates the plan. Also name who is expected to answer for the result.",
        },
        {
          title: "Check your understanding",
          body: "Is this written in a policy or agreement? Has the person confirmed it? Record what you have observed and what still needs checking. Someone influential may affect the choice without having formal permission to block it.",
        },
      ],
      callout:
        "The map records what you understand. It does not give anyone new authority.",
    },
    {
      eyebrow: "04 / EXPLAIN THE PROBLEM",
      title: "What are you expected to deliver that you cannot decide?",
      intro:
        "Show the connection between the result expected of you and the decision that keeps getting stuck.",
      sections: [
        {
          title: "Describe what happens",
          body: "“Directors ask developers to add features. I cannot postpone them, but I am still expected to meet the original date.” Someone else should be able to recognize that sequence.",
        },
        {
          title: "Explain the effect",
          body: "What waits? Who gets conflicting instructions? Which customer promise is now at risk? Use things you have seen. Label estimates as estimates.",
        },
        {
          title: "Ask for one change",
          body: "“Could all new requests go through the product director before they enter the plan?” Name the decision, the person, and any limits.",
        },
        {
          title: "Keep necessary approvals",
          body: "You are asking for a workable way to choose work. That does not remove required security, legal, or spending approvals. Include the people responsible for them.",
        },
      ],
      callout:
        "Try: “I am responsible for the date, but I cannot choose what waits when new work arrives. Can we agree how those requests get decided?”",
    },
    {
      eyebrow: "05 / ASK FOR THE CHANGE",
      title: "Make it easy to give you a clear answer.",
      intro:
        "“Empower me” can mean many things. Tell the person what you need to be able to do.",
      sections: [
        {
          title: "If you are asking to decide",
          body: "Say which decision you want to make, for how long, and within which budget or other limits. Name any approvals that would still be required.",
        },
        {
          title: "If someone else keeps the decision",
          body: "Ask who you should contact, how soon they will respond, and what plan the team should follow while waiting. Do not interpret no response as permission.",
        },
        {
          title: "Ask when it can be agreed",
          body: "Connect the date to the work. In the example, the team needs the arrangement confirmed before Monday's planning meeting.",
        },
        {
          title: "Choose a way to check it",
          body: "After the next two requests, ask whether someone made the call in time and the team received one clear plan. An agreement nobody uses needs another conversation.",
        },
      ],
      callout:
        "Try: “If the decision stays with you, could you respond within one working day? Until then, can we keep the last agreed plan?”",
    },
    {
      eyebrow: "06 / HAVE THE CONVERSATION",
      title: "Ask what they mean by “you own it.”",
      intro:
        "You may discover that leadership thinks you already have permission, or that an approval cannot move. Find out which problem you are solving.",
      sections: [
        {
          title: "Start with the work",
          body: "“I want the team to have one plan for the booking release. Here is what happens when a new request arrives, and where we get stuck.”",
        },
        {
          title: "“You need to influence people”",
          body: "“Who should I speak to, and who makes the final call? What should the team do while I am getting an answer?”",
        },
        {
          title: "“You already own it”",
          body: "“Can I postpone a director's new request to protect the release date? If so, could you confirm that with the directors and the team?”",
        },
        {
          title: "“We cannot give you that authority”",
          body: "Ask for a timely decision from the person who keeps it. If no workable arrangement is agreed, record the problem and raise it through the appropriate manager. Stay within the authority you actually have.",
        },
      ],
      callout:
        "The aim is a decision people can act on. You can be firm about the problem and still curious about what you do not know.",
    },
    {
      eyebrow: "07 / EXAMPLE",
      title: "Three directors. One release date.",
      intro:
        "Fictional example: a product manager is responsible for releasing an online repair-booking page. Several directors ask developers for extra features. Only the product director can approve changing the release plan.",
      sections: [
        {
          title: "The problem",
          body: "I am held responsible for the release date, but directors can add work and I cannot say what should wait. We have no agreed way to get a quick decision.",
        },
        {
          title: "The request",
          body: "Send new requests to the product director before adding them to the team's plan. The director should say whether to add them now and, if they do not fit, what should wait.",
        },
        {
          title: "What stays in place",
          body: "Security still approves the customer-data checks. Finance still approves extra spending. The engineering lead still confirms the software is ready. The request is about how new work enters the plan.",
        },
        {
          title: "What happens next",
          body: "In this example, the product director agrees to answer new requests within one working day and tells the other directors. The team keeps the last agreed plan while waiting. They check whether this worked after two requests. The Lab example starts before approval.",
        },
      ],
      callout:
        "The product manager now knows how to get a decision. The product director keeps the final call and agrees when to make it.",
    },
    {
      eyebrow: "08 / USE THE LAB",
      title: "Take one stuck decision through the Lab.",
      intro:
        "Start with the result expected of you and the decision you need to get there.",
      sections: [
        {
          title: "The problem",
          body: "Record what you are responsible for, which decision is stuck, and what happens while you wait.",
        },
        {
          title: "Who decides",
          body: "Name the people who recommend, advise, approve, decide, and carry out the work. Build Who Can Decide and ask them to check it.",
        },
        {
          title: "What needs to change",
          body: "Explain what you cannot decide and the change you are requesting. Include limits and an alternative if the decision must stay with someone else. Build The Decision Problem.",
        },
        {
          title: "Ask and follow up",
          body: "Name who needs to respond and by when. Build Decision Request before the conversation. Return to record the answer, what you will do while waiting, and when to check whether the arrangement works.",
        },
      ],
      callout:
        "Choose Copy, Download .txt, or Print after reviewing the document. A proposal remains a proposal until the person agrees.",
    },
    {
      eyebrow: "09 / AFTER THE CONVERSATION",
      title: "Did anything actually change?",
      intro:
        "A completed form can look satisfying. The useful part is what people do with it.",
      sections: [
        {
          title: "Follow up",
          body: "Confirm the arrangement with everyone affected. On the next request, check who decided, how long it took, and whether the team knew what to do. If the same problem continues, bring that example back to the person who agreed to help.",
        },
        {
          title: "Try saying it out loud",
          body: "Read your proposed message to someone you trust. Ask where they got lost or what sounded strange. Could you say this to the person in a real meeting? Change anything you would have to translate as you spoke.",
        },
        {
          title: "Keep the record",
          body: "Copy, download, or print anything you need to keep. Shared answers save in this browser on this device; they do not follow you to another device. Private notes are not saved. Export before clearing a draft or browser data.",
        },
        {
          title: "Check what happened",
          body: "Was the decision understood? Did someone act? Did the change help the people it was meant to help? If nobody responded, find out who can decide and agree when to ask again. Silence does not mean yes.",
        },
      ],
      callout:
        "You do not have to fix the whole organization in one conversation. Leave knowing what happens next, who will do it, and when you will check back.",
    },
  ],
  "product-project-translator": [
    {
      eyebrow: "01 / START HERE",
      title: "“Can you just give me the final requirements?”",
      intro:
        "You are still finding out what customers need. Someone needs a feature list, a date, or a budget. Both of you need an answer you can use. Start by asking what they need the answer for.",
      sections: [
        {
          title: "Find the decision behind the question",
          body: "Finance may need to reserve money. Sales may need to tell a customer when to expect something. Another team may need to plan its work. Ask rather than guessing.",
        },
        {
          title: "Say what you can answer now",
          body: "If the work is understood and the team can give a reliable date, use it. If an important question is still open, explain exactly what it is.",
        },
        {
          title: "Offer a useful next step",
          body: "Perhaps you can agree to test two booking designs with customers in the next two weeks, then bring a build estimate to Finance. Name the work, the limit, and what they will be able to decide afterward.",
        },
        {
          title: "Write a reply you would actually say",
          body: "The Lab helps you check the request, prepare a commitment, and write the response. You do not need to teach someone product-management vocabulary before helping them plan.",
        },
      ],
      callout:
        "Try: “What do you need the feature list for? Which decision are you trying to make, and when do you need to make it?”",
    },
    {
      eyebrow: "02 / BEFORE THE CONVERSATION",
      title: "You can be frustrated and still be curious.",
      intro:
        "A request for final details can feel like somebody has misunderstood your job. They may simply be trying to do theirs. Find out what they need before correcting them.",
      sections: [
        {
          title: "What actually happened?",
          body: "Write down what was said or done. Then notice what you have added. “They asked for Friday” and “They do not care about the team” are different statements. You can check the first. You need to ask about the second.",
        },
        {
          title: "Why do you care?",
          body: "Who would be better off if this worked? A customer could stop chasing an answer. Your team could finish the work it promised. Start there. Give the other person a chance to tell you what matters to them too.",
        },
        {
          title: "What would better look like?",
          body: "Imagine the next few weeks going well. What would people be doing differently? Describe that in ordinary words, then ask the other person what they would add or change.",
        },
        {
          title: "Keep these notes to yourself",
          body: "Private notes in the Lab stay only in the open tab. They disappear when you refresh or leave and never appear in your exported documents. You can also think through these questions without typing.",
        },
      ],
      callout:
        "An opening you can adapt: “I want us to find a way through this. Can we look at what is happening and work out what to do next?”",
    },
    {
      eyebrow: "03 / UNDERSTAND THE REQUEST",
      title: "Ask what they will use the answer for.",
      intro:
        "Your first interpretation might be wrong. Give the person a chance to explain.",
      sections: [
        {
          title: "“We need final requirements”",
          body: "“Which decision depends on that list? Do you need to reserve money, agree a contract, or get another team ready?” Find out which details need to be settled now.",
        },
        {
          title: "“We need a firm date”",
          body: "“Who is waiting for it, and what have they been told?” Ask the team for its current delivery estimate and what could change it.",
        },
        {
          title: "“We need the full roadmap”",
          body: "“How far ahead do you need to plan, and what will you use it for?” Explain which work is agreed, which is only a possibility, and when you will know more.",
        },
        {
          title: "Record what they actually confirm",
          body: "If you have not asked yet, write the question you will ask. Do not turn your guess about their motives into a fact in the reply.",
        },
      ],
      callout:
        "You are looking for an answer that helps them make their decision. Check that you understand it before writing the response.",
    },
    {
      eyebrow: "04 / OFFER A COMMITMENT",
      title: "What can we promise at this point?",
      intro:
        "Uncertainty does not have to leave the other person empty-handed. Be specific about what you can do and what they will learn from it.",
      sections: [
        {
          title: "Start with what you know",
          body: "For example, customers currently phone to book repairs. There are two possible online designs. Neither has been tried with customers.",
        },
        {
          title: "Name the question that matters",
          body: "Can customers complete a booking using either design? How much work would the better one take to build? Say how you will find out.",
        },
        {
          title: "Propose the work and its limits",
          body: "Ask to spend up to $5,000 over two weeks to try both designs with five customers and get an Engineering estimate. Name who does each part. Those are fictional example amounts, not recommended defaults.",
        },
        {
          title: "Explain what comes afterward",
          body: "Bring the findings and estimate to Finance. Ask whether to fund the build, change the idea, or stop. Do not promise a finished service when you are only promising a customer test.",
        },
      ],
      callout:
        "A useful commitment says what you will do, who will do it, how much time or money you will use, and when the other person will hear back.",
    },
    {
      eyebrow: "05 / WRITE THE REPLY",
      title: "Say it as you would in the meeting.",
      intro:
        "Start with what they need. Then explain what you can offer and ask for the decision you need.",
      sections: [
        {
          title: "Show that you heard them",
          body: "“You need a spending limit by Thursday.” Use the need they confirmed, rather than an explanation you invented.",
        },
        {
          title: "Make a concrete offer",
          body: "“Could we set aside up to $5,000 for two weeks to try both booking designs with five customers and check the build work with Engineering?”",
        },
        {
          title: "Explain what they will get back",
          body: "“We will bring you the results, an estimate, and a recommendation before asking you to pay for the full build.”",
        },
        {
          title: "Ask for a response",
          body: "“Would that give you enough to make Thursday's decision?” Let them tell you if the offer does not meet their need. Revise it together.",
        },
      ],
      callout:
        "Read the message aloud. If you would not say a phrase in conversation, find the words you would use.",
    },
    {
      eyebrow: "06 / WHEN THEY NEED MORE",
      title: "Keep working on the actual question.",
      intro:
        "Sometimes the first offer will not be enough. Ask what is missing.",
      sections: [
        {
          title: "“Just give me the date”",
          body: "If the team has a reliable estimate for the agreed work, share it with its assumptions. Otherwise say what needs checking and when you can return with an estimate. Use Deadline Reset if a date has already been promised.",
        },
        {
          title: "“We cannot approve an open-ended budget”",
          body: "Agree a maximum spend and a stopping point. Explain what that money buys and what will still be unknown. The person paying can change or decline the proposal.",
        },
        {
          title: "“We need to tell the customer something”",
          body: "Work with the person responsible for that customer. State what is available, what is still being checked, and when the next update will come. Check any existing contractual promise.",
        },
        {
          title: "“Why does the plan keep changing?”",
          body: "Explain what you learned and how it changed the choice. If poor planning or communication also played a part, say so. Learning does not excuse keeping people in the dark.",
        },
      ],
      callout:
        "Try: “I want to give you something you can plan around. Which part of this still leaves you unable to make the decision?”",
    },
    {
      eyebrow: "07 / EXAMPLE",
      title: "Finance needs a budget by Thursday.",
      intro:
        "Fictional example: the finance director asks for the final feature list for an online repair-booking service. Customers have not tried either proposed design yet.",
      sections: [
        {
          title: "The product manager asks why",
          body: "Finance needs a spending limit by Thursday. They do not need every screen agreed. The product manager checks that understanding before proposing a smaller first spend.",
        },
        {
          title: "The proposed commitment",
          body: "Propose spending up to $5,000 over two weeks to let five customers try both designs and ask Engineering what each would take to build. The product manager arranges the customer sessions; the engineering lead estimates the build work.",
        },
        {
          title: "The reply",
          body: "You need a budget by Thursday. Could we approve up to $5,000 for two weeks of customer testing first? Then we can show you which design works and what it would take to build before you commit to the full cost.",
        },
        {
          title: "What happens next",
          body: "In this example, Finance approves the limited spend on Thursday. The product manager books the customer sessions and the review two weeks later. Funding for the full build is still undecided. The Lab example starts before approval.",
        },
      ],
      callout:
        "Finance can plan the immediate spend. The team knows what to test. Nobody has pretended that the final design or full delivery date is already known.",
    },
    {
      eyebrow: "08 / USE THE LAB",
      title: "Bring the sentence you heard.",
      intro:
        "You can prepare the reply before the conversation and update it after you have checked what the other person needs.",
      sections: [
        {
          title: "The request",
          body: "Record their words, who asked, and what they need to decide. The starter buttons can help you begin; edit the wording to match your situation.",
        },
        {
          title: "What they need",
          body: "Choose the reason they need an answer, record what they confirmed, and name anything you still need to check. Build What They Need if you want to review your understanding.",
        },
        {
          title: "What we can promise",
          body: "Write what you know, what is still uncertain, and what you can offer now. Include the time, money, and other limits. Build Proposed Commitment.",
        },
        {
          title: "Your reply",
          body: "Write the short spoken version if useful, then the message. Name the decision you need and when. Build Your Reply as a proposal. Return after the conversation to record the answer and the next action.",
        },
      ],
      callout:
        "Load Examples shows the fictional booking-service case. Use your own facts before sharing a document.",
    },
    {
      eyebrow: "09 / AFTER THE CONVERSATION",
      title: "Did anything actually change?",
      intro:
        "A completed form can look satisfying. The useful part is what people do with it.",
      sections: [
        {
          title: "Follow up",
          body: "Bring the promised findings on the agreed date. Ask whether they helped the person make the decision. If you misunderstood the need or promised something too vague, revise the offer and check it with them.",
        },
        {
          title: "Try saying it out loud",
          body: "Read your proposed message to someone you trust. Ask where they got lost or what sounded strange. Could you say this to the person in a real meeting? Change anything you would have to translate as you spoke.",
        },
        {
          title: "Keep the record",
          body: "Copy, download, or print anything you need to keep. Shared answers save in this browser on this device; they do not follow you to another device. Private notes are not saved. Export before clearing a draft or browser data.",
        },
        {
          title: "Check what happened",
          body: "Was the decision understood? Did someone act? Did the change help the people it was meant to help? If nobody responded, find out who can decide and agree when to ask again. Silence does not mean yes.",
        },
      ],
      callout:
        "You do not have to fix the whole organization in one conversation. Leave knowing what happens next, who will do it, and when you will check back.",
    },
  ],
};

LEADERSHIP_GUIDE_PAGES["mandate-reset"][2].sources = [
  {
    name: "Further reading: Bain’s RAPID decision roles",
    url: "https://www.bain.com/insights/rapid-decision-making/",
  },
];

for (const slug of ["priority-whiplash", "mandate-reset"]) {
  LEADERSHIP_GUIDE_PAGES[slug][7].callout +=
    " Use Load Examples to see fictional answers for the current step. You will be asked before existing answers are replaced.";
}
