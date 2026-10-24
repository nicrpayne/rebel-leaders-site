export type AIGuidePage = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
  callout: string;
  reflectionTime?: string;
  table?: string[][];
  sources?: { name: string; url: string }[];
};

export const LEADERSHIP_GUIDE_PAGES: Record<string, AIGuidePage[]> = {
  "deadline-reset": [
    {
      eyebrow: "01 / START HERE",
      title: "The date has already been promised. Now what?",
      intro:
        "You find out in a customer email: November 1. Sales has already said yes. Your engineering lead has not. Now you need to explain the gap without blaming Sales, speaking for Engineering, or quietly making the promise yourself.",
      sections: [
        {
          title: "Find out what the promise is protecting",
          body: "Before you reply-all, ask the person who gave the date what the customer is counting on. Is there an event, a business change, or a previous delay behind it? You need that context to recommend something they can take back to the customer.",
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
          title: "Prepare the conversation you actually need",
          body: "Leave with a smaller promise the team has assessed, an alternative if that cannot work, and a clear request to the person who can change the commitment. Use the Guide for help and the Lab or your own notes to prepare; you do not need to complete both.",
        },
      ],
      callout:
        "Your first useful step is to get clear on the promise. From there, we can work out what’s possible and what to ask next.",
    },
    {
      eyebrow: "02 / BEFORE THE CONVERSATION",
      reflectionTime: "allow 5-10 min for your notes",
      title: "You’re about to be the person with bad news.",
      intro:
        "You may want to forward the email to Engineering with “Can we make this happen?” Or tell Sales they should have asked first. Neither gives you a reliable answer to take back to the customer.",
      sections: [
        {
          title: "Notice what you are about to promise",
          body: "“I’ll see what we can do” can sound like acceptance. Try: “I’m checking the remaining work with the team. I can come back Thursday with the options; I can’t confirm November 1 yet.” Be clear about what your next update will contain.",
        },
        {
          title: "Check your story about Sales",
          body: "You know they gave a date. You may not know what they heard from the customer or which earlier estimate they relied on. Ask: “What led us to promise both features?” You can address how the promise was made after you understand it.",
        },
        {
          title: "Give Engineering a question it can answer",
          body: "Ask what remains to make the customer task work, which checks are missing, and what could be ready first. “Can you try harder?” produces pressure. A concrete option gives the lead something to assess.",
        },
        {
          title: "Be honest about your own part",
          body: "Did you describe a rough target as likely, or leave an old date in the roadmap? Say so if you did. Own what you contributed without accepting responsibility for choices you cannot make. Private Lab notes disappear when you refresh or leave; they are not saved or exported.",
        },
      ],
      callout:
        "Try: “I understand customers are expecting this. I need us to check what we can actually deliver before I repeat the date.”",
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
          title: "Separate the event from the release",
          body: "An event can be fixed while the release plan is still open. Ask whether the customer expects to use the software that day, see a demonstration, or decide whether to buy. A demo is a different promise; get the customer owner to confirm it would help.",
        },
        {
          title: "List what still needs checking",
          body: "Does the booking page put appointments into the repair calendar? Can customers see only their own bookings? Has the team tested those things, or are we assuming they work?",
        },
        {
          title: "Explain what is at risk",
          body: "Say what customers could experience if the plan doesn’t work. “A customer books a repair but the service team never receives it” is more useful than “integration risk.”",
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
          body: "Ask the people doing the work when both features could be ready and what they still need to check. If they can’t give a reliable date yet, say when they will reassess it.",
        },
        {
          title: "Check whether more help would help",
          body: "A new person needs time to learn the work. A specialist might remove a specific problem. Include the time needed to teach, review, and test; don’t assume extra people instantly make delivery faster.",
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
        "“Medium confidence” isn’t much help on its own. Explain which work and date you mean, and what could change your view.",
      sections: [
        {
          title: "Name the plan you’re assessing",
          body: "“Online booking by November 1” is different from “booking and reports by November 1.” Make sure everyone is talking about the same promise.",
        },
        {
          title: "Keep the engineering lead’s conditions attached",
          body: "If the lead says “booking could fit if Thursday’s check passes,” carry the whole sentence forward. Do not turn it into “Engineering says we can do it.” Name the work already checked and what remains uncertain.",
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
        "The Lab doesn’t calculate the chance of hitting a date. It helps you explain your judgment and what you’ll check next.",
    },
    {
      eyebrow: "06 / HAVE THE CONVERSATION",
      title: "“We can’t go back to the customer again.”",
      intro:
        "The person who made the promise may be worried about losing credibility. Help them explain a change while there is still time to choose. You are asking them to take responsibility for the customer commitment with you.",
      sections: [
        {
          title: "Start with what you can support",
          body: "“Booking is what customers most need to see. The team thinks that may fit if reports wait and Thursday’s calendar check passes. I recommend we check that option before confirming the release.”",
        },
        {
          title: "“I’ve already told them both will be ready”",
          body: "“I know. What would be hardest about changing that message? We can explain a smaller release now, or keep a promise we haven’t checked. Can we agree who speaks to them and when?” Hear the concern before deciding the wording.",
        },
        {
          title: "“Can the team just work this weekend?”",
          body: "“What do you expect the extra time to solve? The calendar connection still needs checking.” Ask the lead whether the help addresses the actual problem. Include review and recovery time; do not volunteer other people’s evenings.",
        },
        {
          title: "If they still will not change the promise",
          body: "Record the unconfirmed work and the decision you requested. Ask your manager to help resolve the commitment before the next customer update. Explain what you can responsibly confirm today; do not hide the uncertainty to make the meeting easier.",
        },
      ],
      callout:
        "Ask for the exact answer: “Can reports come later, and can we agree a demonstration instead if Thursday’s booking check fails?”",
    },
    {
      eyebrow: "07 / EXAMPLE",
      title: "Online booking by November 1. Reports too?",
      intro:
        "Fictional example: a sales director has promised online repair booking and downloadable service reports for a customer event. The event is fixed. The connection between booking and the repair calendar hasn’t been tested.",
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
          body: "Record what was promised, why the date matters, and what is still uncertain. Preview Deadline Facts if you need to check your understanding with someone.",
        },
        {
          title: "Options",
          body: "Write down what could be ready on the date, what a later date might allow, and whether extra help would be useful. Preview Delivery Options to compare them.",
        },
        {
          title: "How sure are we?",
          body: "Choose your current confidence, explain it, and name the next check. Say what you’ll do if that check changes the plan.",
        },
        {
          title: "The update",
          body: "Write the decision you need, who can make it, and when. Preview Decision Update while it is still a proposal. Return after the meeting to record the response, then rebuild and share the updated version.",
        },
      ],
      callout:
        "Load Examples fills only the step you’re on. If it would replace existing answers, you’ll be asked first.",
    },
    {
      eyebrow: "09 / AFTER THE CONVERSATION",
      title: "Make sure the new promise reaches the customer.",
      intro:
        "The meeting can sound settled while Sales, Engineering, and the customer still expect three different things. Your next job is to close that gap.",
      sections: [
        {
          title: "Read back the decision and its conditions",
          body: "“Reports can come later. Working booking still depends on Thursday’s check. If it fails, we will show a demonstration.” Ask the person changing the promise to confirm that this is what they agreed.",
        },
        {
          title: "Check the message that actually goes out",
          body: "Who will tell the customer, by when, and what will they say is available? Ask to see that wording. “We’re on track” can undo the careful distinction between a demonstration and software customers can use.",
        },
        {
          title: "Return even when the check disappoints",
          body: "If the calendar connection fails, report it at the agreed time. Use the fallback if it was approved; otherwise ask for the next decision. Do not let a smaller feature list turn into another unchecked date.",
        },
        {
          title: "Change how the next date gets offered",
          body: "Ask Sales and the engineering lead to agree who checks scope and delivery assumptions before a customer date is confirmed. Keep the decision update somewhere the people making promises will find it. Export anything you need; Lab drafts stay in this browser, and private notes are not saved.",
        },
      ],
      callout:
        "You have made progress when the customer knows what to expect and the team is working toward that same promise.",
    },
  ],
  "priority-whiplash": [
    {
      eyebrow: "01 / START HERE",
      title: "“Can we squeeze this in for Friday?”",
      intro:
        "You have just explained the week’s plan. Now Sales messages you about Friday’s customer meeting, and someone has already asked a developer for a quick demo. You need to help without making the team absorb another invisible commitment.",
      sections: [
        {
          title: "Check what has already started",
          body: "Ask what Sales needs the customer to decide and whether anyone has begun work. A sketch, a clickable demonstration, and a live feature are different asks. Find out which one is needed before agreeing to “a quick demo.”",
        },
        {
          title: "Check whether it fits",
          body: "List the work already promised and ask the team what the new request would take. Include support, testing, and review. Sometimes it fits. If it doesn’t, something needs to change.",
        },
        {
          title: "Make the cost visible",
          body: "Show the useful result each option would give the customer and the existing work it would interrupt. Include the time to stop and pick that work up again. Bring a recommendation; a list of competing priorities leaves the difficult choice with the team.",
        },
        {
          title: "Get a clear answer",
          body: "If you’re allowed to make the call, make it and tell the people affected. If it changes commitments someone else owns, take the recommendation to them. Record what is decided.",
        },
      ],
      callout:
        "Start by getting the current work and the new request in one place. That gives you something concrete to talk through with the team.",
    },
    {
      eyebrow: "02 / BEFORE THE CONVERSATION",
      reflectionTime: "allow 5-10 min for your notes",
      title: "You don’t want to be the PM who always says no.",
      intro:
        "You also don’t want another Friday where the team stays late and the original customer still asks where their fix is. Prepare to explain the choice without treating the requester as the problem.",
      sections: [
        {
          title: "Catch the automatic yes",
          body: "If you say “we’ll try” before checking, people may hear a commitment. Try: “Let me check what a demo would take and what it would move. I’ll come back this afternoon.” Give a time for your answer that you can keep.",
        },
        {
          title: "Find out why this request matters",
          body: "A sales opportunity can be real even if it arrived badly. Ask what the customer will decide on Friday and what happens if the team cannot provide a new demo. Do not assume enthusiasm means the full feature is needed.",
        },
        {
          title: "Notice whose promise you are tempted to hide",
          body: "It is easier to disappoint a customer who is not in this meeting. Bring their report fix, deadline, and account manager into the choice. Avoid treating quiet stakeholders as spare capacity.",
        },
        {
          title: "Check the work, not people’s willingness",
          body: "Someone may offer to do both to avoid the argument. Ask what they would stop, what review they need, and when they would actually do it. Optional private Lab notes are for your preparation; they disappear when you refresh or leave and are not exported.",
        },
      ],
      callout:
        "Try: “I want Friday to be useful. Before I say yes, let’s look at what we’d be asking the team to put down.”",
    },
    {
      eyebrow: "03 / LIST THE WORK",
      title: "What are we already asking people to do?",
      intro:
        "Use names people recognize. “Fix the broken invitation link” tells us more than “onboarding improvement.”",
      sections: [
        {
          title: "Start with the people waiting",
          body: "A new customer can’t join their account. Another customer is waiting for corrected report figures. Describe the work and who needs it.",
        },
        {
          title: "Include the interruption itself",
          body: "Ask what someone would have to stop and what it would take to resume. The developer who can build the demo may also be the only person who can fix the report. Total hours across the team do not make those skills interchangeable.",
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
        "Let’s check with the people doing the work. If the request won’t fit, what could be smaller, happen later, or wait while this gets done?",
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
          body: "Ten days available, ten already needed, and two more requested means the entered plan needs twelve days of effort. The extra two must be addressed. It doesn’t tell you the new finish date; ask the team about skills, waiting, and the order of work.",
        },
        {
          title: "Keep another option open",
          body: "Perhaps the existing sketches would do. Perhaps the demonstration can wait. Protect essential checks and customer promises, and explain the consequences of each choice.",
        },
      ],
      callout:
        "Changing the written recommendation doesn’t change the calculator. Its numbers describe the work you entered before the proposed change.",
    },
    {
      eyebrow: "05 / MAKE A RECOMMENDATION",
      title: "What do you think we should do?",
      intro:
        "You have looked at what would change. Which option would you recommend, and why? That gives the person making the call a useful place to start.",
      sections: [
        {
          title: "Make the choice specific",
          body: "“Prepare the small demonstration and postpone the report correction” is a choice. “Be more flexible” isn’t enough for anyone to act on.",
        },
        {
          title: "Explain who benefits and who waits",
          body: "The customer in Friday's meeting can react to the idea. The customer waiting for correct report figures waits longer. Both belong in the conversation.",
        },
        {
          title: "Make the call at the right level",
          body: "If you can reorder this work, decide after hearing the people affected. If it changes a customer commitment outside your authority, take the choice to the product director. Do not ask Engineering to settle a disagreement between business priorities.",
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
          body: "“Who has those two days? The person who can do the demo is fixing the report. Can we use the sketches, or are we agreeing to make that customer wait?” Check the estimate with the team, including review and the cost of restarting work.",
        },
        {
          title: "“Nothing can move”",
          body: "“Then I can offer the sketches for Friday. I can’t also promise a new demo on the current plan.” If the person insists, take the unresolved choice to whoever can change the commitments. Make the conflict visible before it becomes overtime.",
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
        "If the new work had fitted, there would have been no need to invent a tradeoff. Here it doesn’t fit, so the people involved make a clear choice.",
    },
    {
      eyebrow: "08 / USE THE LAB",
      title: "From a new request to a clear answer.",
      intro:
        "Bring one new request and the work it competes with. You can prepare alone, then check your assumptions with the team.",
      sections: [
        {
          title: "Current work",
          body: "List the current commitments, the new request, and why it matters now. Preview Current Work List if you want someone to check it.",
        },
        {
          title: "What changes",
          body: "Check the time available if useful. Write what would wait, who would be affected, and another option. Preview What Would Change to review the consequences.",
        },
        {
          title: "Recommend",
          body: "Write your recommendation, name the person who can decide, and say when you need an answer.",
        },
        {
          title: "Record",
          body: "Keep the status as PROPOSAL before the conversation and leave the actual decision blank. Preview Priority Decision Brief. After the conversation, record the response, update who will do what, and rebuild the brief.",
        },
      ],
      callout:
        "Copy, download, or print the brief to take into your usual work tools. The Lab doesn’t send it or change the team's plan. Use Load Examples to see fictional answers for the current step. You’ll be asked before existing answers are replaced.",
    },
    {
      eyebrow: "09 / AFTER THE CONVERSATION",
      title: "Did the work actually stop?",
      intro:
        "You agreed to postpone the report fix. Then the account manager messages its developer to ask whether they could “just finish it anyway.” This is where a priority decision either holds or disappears.",
      sections: [
        {
          title: "Give the team one plan",
          body: "Confirm what starts, what pauses, and what continues. Ask whether anyone has received a different instruction. If they have, resolve it with the requester and the person who made the call; do not leave the developer to choose whom to disappoint.",
        },
        {
          title: "Tell the customer who is waiting",
          body: "Check that the account manager explained the change and that any new date came from the team. Two person-days of displaced effort do not automatically mean a two-day calendar delay.",
        },
        {
          title: "Check whether Friday was worth the interruption",
          body: "What did the customer learn or decide from the demo? Did the report fix really pause, or did someone do both in the evening? Record both the useful result and the work it cost.",
        },
        {
          title: "Address the repeat request",
          body: "If this keeps happening, ask Sales to check the purpose and effort of a demo before promising it. If nobody can make competing priorities stick, use Mandate Reset for that decision problem. Export the brief if you need a shared record; Lab drafts stay in this browser.",
        },
      ],
      callout:
        "A useful priority decision gives someone permission to leave work unfinished while they do the work you chose.",
    },
  ],
  "mandate-reset": [
    {
      eyebrow: "01 / START HERE",
      title: "You’re responsible. But can you make the call?",
      intro:
        "Your manager says “you own the release.” A director asks a developer to add something, your plan changes, and you are still the person explaining the missed date. You need to know which calls are yours and whether your manager will back them.",
      sections: [
        {
          title: "Bring the decision you tried to make",
          body: "Use one recent request you deferred, escalated, or could not resolve. What happened after you gave your answer? This shows whether permission is missing, the arrangement is unclear, or someone is overriding an agreement.",
        },
        {
          title: "Find out how it works today",
          body: "Who brings the options? Who must be consulted? Whose approval is required? Who makes the final call? These may be different people.",
        },
        {
          title: "Ask for permission that holds in practice",
          body: "You might ask to sequence work within an agreed release goal. If the director keeps that call, ask when they will answer and who covers for them. In either case, agree what happens when another director gives the team a different instruction.",
        },
        {
          title: "Check the answer",
          body: "A new job title or a reassuring “you own it” doesn’t tell the team what to do. Ask the people involved to confirm the arrangement and use it on the next real request.",
        },
      ],
      callout:
        "Here, your mandate means the decisions you’re actually allowed to make. The tool helps you ask for a clear answer about one of them.",
    },
    {
      eyebrow: "02 / BEFORE THE CONVERSATION",
      reflectionTime: "allow 5-10 min for your notes",
      title: "“Shouldn’t I be able to handle this myself?”",
      intro:
        "You may worry that asking for help makes you look less senior. So you negotiate privately, chase every answer, and keep saying the date is yours. Prepare to show where influence stops and a decision needs backing.",
      sections: [
        {
          title: "Bring two moments, not a character judgment",
          body: "“On Tuesday I deferred the reports request. On Wednesday a director asked a developer to start it. At Friday’s review I was asked why booking had slipped.” Describe what happened without claiming to know anyone’s motive.",
        },
        {
          title: "Check whether you used the authority you have",
          body: "Did you make a clear recommendation? Did you tell people the consequences? Did you seek permission for a decision already assigned to you? Ask your manager what they expected you to do differently.",
        },
        {
          title: "Say what backing would look like",
          body: "“If I defer a request within our agreed limits, will you support that call when someone challenges it? If you change it, can we also change the delivery expectation?” A job title alone does not answer those questions.",
        },
        {
          title: "Keep the request about the work",
          body: "You want the team to know which instruction to follow. You do not need to win an argument about who is in charge. Use private notes for the reaction you need to work through; they are not saved or exported and disappear when you refresh or leave.",
        },
      ],
      callout:
        "Try: “I want to own this properly. Can we agree which decisions I can make, and what happens when another director wants a different answer?”",
    },
    {
      eyebrow: "03 / WHO CAN DECIDE",
      title: "Who does what when this decision comes up?",
      intro:
        "Let’s follow one decision from the request to the answer. Who gets involved along the way? Use names where you can, and note anything you need to check.",
      sections: [
        {
          title: "Who brings the options and advice?",
          body: "One person prepares the recommendation. Others provide information: developers estimate the work, and an account manager explains customer promises. Giving advice doesn’t automatically give someone the final say.",
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
          title: "Compare the written role with the last decision",
          body: "Who was supposed to decide? Who actually changed the plan? Bring both to your manager. An influential director may need to be consulted, but that does not automatically make every request an approved instruction to the team.",
        },
      ],
      callout:
        "Use this map to check your understanding with the people named. Any change to who can decide still needs their agreement.",
      sources: [
        {
          name: "Further reading: Bain’s RAPID decision roles",
          url: "https://www.bain.com/insights/rapid-decision-making/",
        },
      ],
    },
    {
      eyebrow: "04 / EXPLAIN THE PROBLEM",
      title: "What are you expected to deliver that you can’t decide?",
      intro:
        "Let’s connect the decision to the work. What are you expected to deliver, and what can’t happen until someone makes the call?",
      sections: [
        {
          title: "Describe what happens",
          body: "“Directors ask developers to add features. I can’t postpone them, but I’m still expected to meet the original date.” Someone else should be able to recognize that sequence.",
        },
        {
          title: "Explain the effect",
          body: "What waits? Who gets conflicting instructions? Which customer promise is now at risk? Use things you have seen. Label estimates as estimates.",
        },
        {
          title: "Ask your manager to own their part",
          body: "“Could you confirm with the directors that new requests need a release decision before a developer starts them?” Do not agree to enforce a rule your manager will not explain or support. Ask what they will do when that route is bypassed.",
        },
        {
          title: "Keep necessary approvals",
          body: "You’re asking for a workable way to choose work. That doesn’t remove required security, legal, or spending approvals. Include the people responsible for them.",
        },
      ],
      callout:
        "Try: “I’m responsible for the date, but I can’t choose what waits when new work arrives. Can we agree how those requests get decided?”",
    },
    {
      eyebrow: "05 / ASK FOR THE CHANGE",
      title: "Make it easy to give you a clear answer.",
      intro:
        "A specific request is easier to answer. What would you like to be able to decide, or what response do you need from the person who keeps that decision?",
      sections: [
        {
          title: "If you’re asking to decide",
          body: "Say which decision you want to make, for how long, and within which budget or other limits. Name any approvals that would still be required.",
        },
        {
          title: "If someone else keeps the decision",
          body: "Ask who you should contact, how soon they will respond, and what plan the team should follow while waiting. Don’t interpret no response as permission.",
        },
        {
          title: "Ask when it can be agreed",
          body: "Connect the date to the work. In the example, the team needs the arrangement confirmed before Monday's planning meeting.",
        },
        {
          title: "Test it when someone disagrees",
          body: "Agree to review the next two requests, including one that challenges the plan. Did your decision stand? Did the director answer in time? Did the team get one instruction? A quiet week alone does not show that the arrangement works.",
        },
      ],
      callout:
        "Try: “If the decision stays with you, could you respond within one working day? Until then, can we keep the last agreed plan?”",
    },
    {
      eyebrow: "06 / HAVE THE CONVERSATION",
      title: "Ask what they mean by “you own it.”",
      intro:
        "You may discover that leadership thinks you already have permission, or that an approval can’t move. Find out which problem you’re solving.",
      sections: [
        {
          title: "Start with the work",
          body: "“I want the team to have one plan for the booking release. Here is what happens when a new request arrives, and where we get stuck.”",
        },
        {
          title: "“You need to influence people”",
          body: "“I will talk through the options. If we still disagree, who makes the call? Last time the team received two instructions. What should they do then?” Ask for the point at which the decision moves to someone with the authority to settle it.",
        },
        {
          title: "“You already own it”",
          body: "“Can I postpone a director's new request to protect the release date? If so, could you confirm that with the directors and the team?”",
        },
        {
          title: "“I can’t give you that authority”",
          body: "“Then I need you to make these calls in time for the team to act. Can we agree a response time, a backup, and what they do while waiting?” If neither authority nor a workable route is available, ask your manager which delivery expectations must change.",
        },
      ],
      callout:
        "The aim is a decision people can act on. You can be firm about the problem and still curious about what you don’t know.",
    },
    {
      eyebrow: "07 / EXAMPLE",
      title: "Three directors. One release date.",
      intro:
        "Fictional example: a product manager is responsible for releasing an online repair-booking page. Several directors ask developers for extra features. Only the product director can approve changing the release plan.",
      sections: [
        {
          title: "The problem",
          body: "I’m held responsible for the release date, but directors can add work and I can’t say what should wait. We don’t have any agreed way to get a quick decision.",
        },
        {
          title: "The request",
          body: "Send new requests to the product director before adding them to the team's plan. The director should say whether to add them now and, if they don’t fit, what should wait.",
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
          body: "Record what you’re responsible for, which decision is stuck, and what happens while you wait.",
        },
        {
          title: "Who decides",
          body: "Name the people who recommend, advise, approve, decide, and carry out the work. Preview Who Can Decide and ask them to check it.",
        },
        {
          title: "What needs to change",
          body: "Explain what you can’t decide and the change you’re requesting. Include limits and an alternative if the decision must stay with someone else. Preview The Decision Problem.",
        },
        {
          title: "Ask and follow up",
          body: "Name who needs to respond and by when. Preview Decision Request before the conversation. Return to record the answer, what you’ll do while waiting, and when to check whether the arrangement works.",
        },
      ],
      callout:
        "Choose Copy, Download .txt, or Print after reviewing the document. A proposal remains a proposal until the person agrees. Use Load Examples to see fictional answers for the current step. You’ll be asked before existing answers are replaced.",
    },
    {
      eyebrow: "09 / AFTER THE CONVERSATION",
      title: "Will the agreement survive the next director’s request?",
      intro:
        "A supportive one-to-one is a start. The test comes when someone asks the team to do something different. Your manager’s response matters as much as the wording you agreed.",
      sections: [
        {
          title: "Have the person with authority explain it",
          body: "Ask your manager to confirm the arrangement with the directors and team. Include which decisions are yours, which remain theirs, and how a disagreement gets resolved. You should not have to establish their agreement through private persuasion.",
        },
        {
          title: "Bring back the first exception",
          body: "“We agreed new requests would come through you. This one went straight to a developer. Which instruction should they follow?” Check whether this is an intentional exception and what changes as a result.",
        },
        {
          title: "If the answer is still “just make it work”",
          body: "Set out the result you are being asked to deliver, the decisions outside your control, and the support you have requested. Ask your manager to reconcile them. Do not imply that completing this exercise creates authority the organization has not given you.",
        },
        {
          title: "Make the arrangement usable without you",
          body: "Keep a short record where requesters and developers can find it: who decides, within what limits, how to reach them, and what happens while waiting. Review it after two requests. Export your Lab notes if you need a shared copy; drafts stay in this browser.",
        },
      ],
      callout:
        "The result you want is a decision the team can rely on, including when someone more senior prefers another answer.",
    },
  ],
  "when-the-team-goes-quiet": [
    {
      eyebrow: "01 / START HERE",
      title: "The meeting was quiet. The conversation afterward wasn’t.",
      intro:
        "You’re the PM or Product Owner trying to get a release plan agreed. You ask for concerns, hear very little, and move on. Later, an analyst tells you about a problem they tried to raise. You wish they had spoken up. Then you remember cutting the question short.",
      sections: [
        {
          title: "Start with the meeting you helped shape",
          body: "Choose one planning, review, or team meeting you were part of. What did you say just before people went quiet? You may not manage these colleagues, but how you handle their questions still affects what you get to hear.",
        },
        {
          title: "Give yourself five minutes",
          body: "Write down what you noticed, what you want to ask, and how you’ll invite the conversation. That is enough to get started. The later pages help with the answer and what you do next.",
        },
        {
          title: "Use the bits you need",
          body: "Prepare in the Lab or on paper. Read the worked conversation if you want to see it unfold. The Scrum section is optional. You won’t need this much preparation for every conversation; these habits get more familiar with practice.",
        },
        {
          title: "What this helps you do",
          body: "You’ll have words to open the conversation, questions to help you understand, and a small change you can follow through on. The other person still gets to choose what they share.",
        },
      ],
      callout:
        "You don’t have to make the whole team open up today. Start by making one conversation worth having.",
    },
    {
      eyebrow: "02 / NOTICE THE MOMENT",
      title: "What did you actually notice?",
      intro:
        "Silence can mean a lot of things. Someone may agree, be thinking, lack the information, or be tired of having the same concern brushed aside. We need to ask.",
      sections: [
        {
          title: "Describe what happened",
          body: "“I asked for concerns and moved on after a few seconds” is something you can check. “Nobody cares” is a conclusion. Keep those separate.",
        },
        {
          title: "Look at how you presented the decision",
          body: "Did you ask for input after telling people the date could not move? Did you explain your solution before asking what they saw? Say which parts are still open to influence. People cannot help shape a decision you present as settled.",
        },
        {
          title: "Ask yourself who was missing",
          body: "Did the people affected have a chance to see the plan? Was there time to think? If Support wasn’t invited, a quiet meeting tells you very little about what Support needs.",
        },
        {
          title: "Keep private comments private",
          body: "Prepare with neutral descriptions. Don’t collect a list of who said what about whom. Before repeating something shared privately, ask what the person is comfortable passing on.",
        },
      ],
      callout:
        "Try writing two sentences: “What I noticed was…” and “What I still need to ask is…”",
    },
    {
      eyebrow: "03 / INVITE THE CONVERSATION",
      title: "Give them a way into it.",
      intro:
        "Speak to the person whose experience you want to understand. If you interrupted them, start there. A short private conversation may be easier than asking them to explain themselves in front of everyone.",
      sections: [
        {
          title: "Name your part plainly",
          body: "“I moved on while you were raising a question. I’m sorry. I’d like to hear what I missed.” You can explain the time pressure later if it helps; first, let them answer.",
        },
        {
          title: "Ask about their experience",
          body: "“What was it like trying to raise that?” is different from “Why didn’t you speak up?” Ask one question, then leave room for the answer.",
        },
        {
          title: "Let them choose the setting",
          body: "“Would you rather talk now, find another time, or send me a note?” They can decline. Don’t turn an invitation into another demand.",
        },
        {
          title: "If you don’t run the meeting",
          body: "Ask the person who does: “Could we leave a few minutes for questions before we decide?” You can make that request without speaking for colleagues or naming a private source.",
        },
      ],
      callout:
        "An opening you can adapt: “I think I moved us on too quickly. What didn’t we get to hear?”",
    },
    {
      eyebrow: "04 / LISTEN AND CHECK",
      title: "Before you explain, check you understood.",
      intro:
        "An uncomfortable answer can make you want to defend what you meant. Take a breath. First find out what happened for the other person.",
      sections: [
        {
          title: "Ask for an example",
          body: "“Can you walk me through that moment?” Listen for what they were trying to contribute and what happened next. You’re learning about their experience, not testing whether they deserve to be upset.",
        },
        {
          title: "Say it back in your own words",
          body: "“Let me check I’ve got this. You wanted the report checked before we agreed to Friday.” Keep it short enough for them to correct. Do not turn their answer into a speech about how you meant well.",
        },
        {
          title: "Leave room for a correction",
          body: "“You wanted us to check the report before we agreed to Friday, and my answer made it sound like that wasn’t up for discussion. Is that right?” If they correct you, use the correction.",
        },
        {
          title: "You can understand and still disagree",
          body: "“I see why that worried you. I’m not sure we need to move the date, but we do need to check the report.” Hearing a concern doesn’t commit you to every solution suggested.",
        },
      ],
      callout:
        "Ask “What have I missed?” before “Can I explain why I did that?”",
    },
    {
      eyebrow: "05 / MAKE A CHANGE",
      title: "What will you do differently?",
      intro:
        "A good conversation matters. What happens in the next meeting will give people something more to go on.",
      sections: [
        {
          title: "Choose something in your part of the meeting",
          body: "As PM, you can explain the user need and the constraints without presenting every delivery choice as settled. Send the proposal early, say what needs a decision, and let the people doing the work explain what they see. Agree meeting changes with whoever facilitates it.",
        },
        {
          title: "Ask whether it would help",
          body: "“If I sent the plan the day before and left time for questions, would that help? What would still get in the way?” Their answer may change your idea.",
        },
        {
          title: "Handle the work problem too",
          body: "If the report is wrong, get the right people together to fix it. Don’t turn an urgent concern into a discussion about communication and leave the original problem untouched.",
        },
        {
          title: "Make a promise you can keep",
          body: "Name your action and when you’ll do it. If something needs another person’s approval, say that. Don’t promise that speaking up will never have consequences you can’t control.",
        },
      ],
      callout:
        "“At the next meeting, I’ll…” is a useful start. “We all need to be more open” leaves everyone guessing.",
    },
    {
      eyebrow: "06 / IF THE ANSWER IS DIFFICULT",
      title: "You may not get the conversation you hoped for.",
      intro:
        "An invitation doesn’t undo what came before it. How you respond now still matters.",
      sections: [
        {
          title: "“It’s fine.”",
          body: "“Okay. You don’t need to talk about it now. I’m still going to work on not cutting questions short.” Leave the door open without repeatedly asking for a different answer.",
        },
        {
          title: "“We’ve raised this before.”",
          body: "“You’re right. What did we say we’d do, and what actually happened?” Start with the unfinished promise. Another discussion won’t substitute for keeping it.",
        },
        {
          title: "“I don’t want you telling everyone I said this.”",
          body: "Ask what, if anything, they are comfortable sharing. You can change your own behaviour without identifying them. Don’t promise secrecy if your role requires you to act on what you hear.",
        },
        {
          title: "“There’s a reason people don’t speak up.”",
          body: "Take concrete accounts of threats, harassment, or retaliation seriously. A team conversation isn’t a substitute for an appropriate reporting or support route. Ask what support is needed; don’t press for a public account.",
        },
      ],
      callout:
        "You can respect someone’s choice not to talk and still change something you’ve noticed yourself.",
    },
    {
      eyebrow: "07 / FOLLOW THROUGH",
      title: "Come back with what you did.",
      intro:
        "After the next meeting or two, ask what was different. The point is to find out whether the change helped, not to get reassurance that you’re a good leader.",
      sections: [
        {
          title: "Make your part visible",
          body: "“I sent the plan earlier and left the release questions open until we’d heard from the people doing the work.” Describe what you changed without announcing who prompted it.",
        },
        {
          title: "Ask about a real moment",
          body: "“Did you have enough information and time to raise a concern? What happened when you did?” More talking on its own doesn’t prove people are being heard.",
        },
        {
          title: "Notice whether a concern changed a decision",
          body: "Did the team check the report before confirming Friday? Did the analyst get an answer, even if the release plan stayed the same? Counting how many people spoke will not tell you whether their judgment mattered.",
        },
        {
          title: "Keep adjusting",
          body: "If the same problem returns, ask what is still getting in the way. You may need help from the meeting owner or a more senior colleague. Say what you can do and what you need from them.",
        },
      ],
      callout:
        "Follow-through sounds like: “We said we’d try this. Here’s what happened. What should we keep or change?”",
    },
    {
      eyebrow: "08 / A NOTE YOU CAN SHARE",
      title: "Keep the follow-up short.",
      intro:
        "This fictional note contains the PM’s proposed change. It leaves out the analyst’s private comments. The PM has not yet discussed the change with the team.",
      sections: [
        {
          title: "What I’m changing",
          body: "“For the next two planning meetings, I’ll send the proposed plan the day before and leave time to hear concerns before we decide.”",
        },
        {
          title: "How you can take part",
          body: "“You can bring a question to the meeting or send it beforehand. If I move on before you’ve finished, please tell me; I’ll also work on noticing it myself.”",
        },
        {
          title: "When we’ll check",
          body: "“After the second meeting, let’s check whether this gave us enough time to discuss what mattered.”",
        },
        {
          title: "Before you share it",
          body: "Check the wording with anyone whose contribution you mention. Remove personal comments that aren’t needed. Only call something agreed after the people involved have agreed to it.",
        },
      ],
      callout:
        "A short note can be enough. You don’t need to distribute your whole conversation plan.",
    },
    {
      eyebrow: "09 / THE THINKING BEHIND IT",
      title: "What are people learning from working with us?",
      intro:
        "Holistic Shaping asks us to notice how work changes people, including us. A meeting is one of the everyday places where that happens.",
      sections: [
        {
          title: "Culture",
          body: "What becomes normal here? If concerns are repeatedly waved away, people may learn that raising them isn’t worth it. What happens next time can start to change that expectation.",
        },
        {
          title: "Relationship",
          body: "Can we question each other and stay curious? A colleague’s concern may help us see something we missed. We have to leave room for it to change our thinking.",
        },
        {
          title: "Identity",
          body: "What place does a person come to believe they have here? Being heard as someone with judgment is different from being called on only to confirm the plan.",
        },
        {
          title: "Vision",
          body: "What are we trying to make possible together? Bring the conversation back to the people the work should help. That gives disagreement a purpose beyond proving who is right.",
        },
      ],
      callout:
        "You’re part of this too. What did the conversation change in how you see the work, the other person, or yourself?",
    },
  ],
};
