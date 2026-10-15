import type { Audience } from "./ai-paths";
import type { FieldDef } from "./labs";

export const READINESS_CHOICES = [
  "CLARIFY THE CONVERSATION",
  "ASK A SPECIALIST",
  "READY FOR A BOUNDED TEST",
  "PREPARE FIRST",
  "USE EXISTING EVIDENCE",
  "STOP THIS USE",
];
export function readinessStep(audience: Audience) {
  const pm = audience === "pm";
  const fields: FieldDef[] = [
    {
      id: "businessContext",
      section: "01 / SHARE THE CONTEXT",
      label: pm
        ? "What do you want to improve, and what does your lead need to know about it?"
        : "What does your product manager want to improve, and why?",
      hint: "Start with what you have already discussed. Say who this would help and how. Include a deadline only if it matters to the request.",
    },
    {
      id: "sharedVision",
      label: pm
        ? "What future would you invite your lead to help shape?"
        : "What future could you and your PM want to build together?",
      hint: "What could get better for users, the team, and the company? Invite your colleague to add or change something. Keep it as an idea until you have shaped it together.",
    },
    {
      id: "counterpartConcern",
      label: pm
        ? "How would your lead describe their concern?"
        : "How would your product manager describe what they need?",
      hint: "Use their words if you have spoken. If you haven’t, jot down what you want to ask and come back to add their answer.",
    },
    {
      id: "openQuestions",
      label: "What do you agree on? What do you still need to work out?",
      hint: "It’s fine to still see things differently. What could you ask each other, learn, or get help checking?",
    },
    {
      id: "conversationStatus",
      label: "Is this a proposal or a next move you have both agreed?",
      type: "select",
      options: [
        "PROPOSED — NOT YET AGREED",
        "AGREED TOGETHER",
        "STILL DISAGREE",
      ],
      hint: "Keep this as a proposal until you have talked and both agreed. You can come back to update it afterward.",
    },
    {
      id: "businessBasis",
      label: pm
        ? "If someone says the delay costs money, where did that figure come from?"
        : "If someone says the delay costs money, who said it and how did they work it out?",
      hint: "Name who supplied it, what it includes, and who can check it. A possible future benefit is different from money already being lost.",
    },
    {
      id: "growthOpportunity",
      label: pm
        ? "What worthwhile opportunity could this create for your team?"
        : "What worthwhile opportunity could you and your PM help create?",
      hint: "What could customers do more easily? What could the team learn or help others do? Ask the other person what would make it worthwhile for them.",
    },
    {
      id: "accessModel",
      section: "OPTIONAL / TECHNICAL CONDITIONS",
      label: pm
        ? "Who should be allowed to see or change the information in these apps?"
        : "Who should be allowed to see or change which records across these apps?",
      hint: "For example, should a support agent see only their own customers? Who approves access, changes it when someone moves jobs, and removes it when they leave?",
    },
    {
      id: "securityChecks",
      label: pm
        ? "How will the team check that people can only access what they are allowed to?"
        : "How will you test that each server request checks the user's permission?",
      hint: "Name who will test both allowed and blocked access, including attempts to open another customer's records. Signing in or hiding a button isn’t enough to prove this works.",
    },
    {
      id: "automationBoundary",
      label: pm
        ? "What may the AI tool or agent read, change, or deploy?"
        : "What may the AI tool read, change, or release to live systems?",
      hint: "Say which systems and information it may use, what it may change, when a person must approve, and who could undo a mistake. Drafting code is different from changing a live system.",
    },
    {
      id: "teamReadiness",
      section: "OPTIONAL / TEAM SUPPORT",
      label: pm
        ? "What can the team already explain, test, review, and support?"
        : "What can your team confidently explain, test, review, and maintain?",
      hint: "Can they check sign-in and permissions, review code changes, find a bug, release a change, and undo it? Use work they have demonstrated rather than assuming from a job title.",
    },
    {
      id: "readinessSupport",
      label: pm
        ? "What training, time working with an experienced developer, or review does the team need?"
        : "What training, time working together, or specialist review does this task need?",
      hint: "Who could help, when could they make time, and what would the team practise together? Before starting, check that people can explain, test, and safely release the kind of change you’re asking them to make.",
    },
    {
      id: "readinessDecision",
      section: "02 / CHOOSE THE NEXT MOVE",
      label: pm
        ? "What would you like to do next with your lead?"
        : "What would you like to do next with your PM?",
      type: "select",
      options: READINESS_CHOICES,
      hint: "You can ask more questions, get specialist advice, prepare the team, review existing results, plan a small experiment with clear limits, or stop. Choose what helps now.",
    },
    {
      id: "prerequisitePlan",
      label: "What happens next, who will do it, and when will you check back?",
      hint: "For each thing that needs to happen first, name the person, action, and date. Say how you’ll know it is done. It is fine to use what you already know or decide not to pursue this use.",
    },
  ];
  return {
    eyebrow: "CONVERSATION",
    title: pm
      ? "Let’s hear what matters to each of you."
      : "Let’s hear what matters to each of you.",
    intro: pm
      ? "Pick up where you left off. Share what you hope to improve and ask about your lead’s concerns. You can use this page to prepare, then add what you work out together."
      : "Pick up where you left off. Ask what your PM hopes to improve and explain what you’d need to check. You can prepare here, then add what you work out together.",
    fields: [
      ...fields.filter(
        f =>
          ![
            "businessBasis",
            "growthOpportunity",
            "accessModel",
            "securityChecks",
            "automationBoundary",
            "teamReadiness",
            "readinessSupport",
          ].includes(f.id)
      ),
      ...fields.filter(f =>
        [
          "businessBasis",
          "growthOpportunity",
          "accessModel",
          "securityChecks",
          "automationBoundary",
          "teamReadiness",
          "readinessSupport",
        ].includes(f.id)
      ),
    ],
  };
}
export function readinessChapters(audience: Audience) {
  const pages = [
    {
      eyebrow: "SHARE WHAT YOU KNOW",
      title: "Explain why this matters.",
      intro:
        "Your colleague may not have heard what you heard from customers or leadership. Bring that information into the conversation, including anything you haven’t checked.",
      sections: [
        {
          title: "Who would this help?",
          body: "Describe the people and the work. In our fictional example, support staff copy repair requests into two systems. An app might remove that repeated work and reduce missed requests.",
        },
        {
          title: "Where did the number come from?",
          body: "If someone says this could be worth $500,000 a week, ask how they worked it out. Is that money currently being lost, money they hope to earn, or time they expect to save? Say who supplied the estimate and who will check it.",
        },
        {
          title: "What could the team learn?",
          body: "People may become better at checking generated code or teaching others where it helps. Ask what would make the work worthwhile for them too. Don’t promise promotion or rewards you can’t control.",
        },
        {
          title: "What would it take to find out?",
          body: "Ask what help, permission, training, or time is missing. Take that specific request to the person who can approve it. Name what other work would wait.",
        },
      ],
      callout:
        "Try: ‘Here’s what I’ve heard from the customer. I haven’t checked this figure yet. What else would you need to know before we decide whether to try it?’",
    },
    {
      eyebrow: "CHECK WHO CAN ACCESS THE DATA",
      title: "Who should be able to see this?",
      intro:
        "Imagine a customer opening the app and seeing another customer’s repair history. Before connecting real systems, the people responsible need to agree who may see and change each kind of record—and verify that the software enforces it.",
      sections: [
        {
          title: "Decide who may do what",
          body: "Name the users or groups, the records they may see, and whether they may change them. Decide who grants and removes access, including when someone changes jobs or leaves.",
        },
        {
          title: "Check more than the sign-in screen",
          body: "Signing in tells the system who someone is. It must also check what they are allowed to do. An API is a connection software uses to request data or actions; those requests need permission checks too. Hiding a button isn’t enough.",
        },
        {
          title: "Limit what the AI can do",
          body: "Say which code, data, and system it may use. Can it only read, or can it make changes, run commands, or release software? Agree who approves those actions and who can undo a mistake.",
        },
        {
          title: "Ask the right people to verify it",
          body: "The lead developer and the people responsible for security and data need to define and check the rules. Record their names, the checks, and where the results can be found. Filling in this form doesn’t grant permission.",
        },
      ],
      callout:
        "If nobody has agreed or tested the permissions, resolve that first. A test using made-up records may help, but it also needs approval.",
      sources: [
        {
          name: "Microsoft: app roles and groups",
          url: "https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps",
        },
        {
          name: "Microsoft: verify API scopes and roles",
          url: "https://learn.microsoft.com/en-us/entra/identity-platform/scenario-protected-web-api-verification-scope-app-roles",
        },
        {
          name: "OWASP: authorization checks",
          url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
        },
      ],
    },
    {
      eyebrow: "HELP THE TEAM PREPARE",
      title: "Can the team check the work it will be responsible for?",
      intro:
        "AI can produce code that looks plausible. Someone still needs to understand it, check it, and know what to do when it fails. Work out what help the team needs before giving it that responsibility.",
      sections: [
        {
          title: "Ask people to show their working",
          body: "Can the developer explain the change, test who can access the data, inspect the code changes, and investigate a failure? Can they explain how to release it and restore the previous version? Find out by working through a small example together.",
        },
        {
          title: "Make time for an experienced reviewer",
          body: "Pair a developer with someone who can check this kind of work. Ask them to explain how they know the result is correct. Agree time for that conversation as part of the work.",
        },
        {
          title: "Practise the whole change",
          body: "Agree what the finished work must do. Keep a record of code changes, have someone review them, run the required tests, and practise releasing and undoing the change.",
        },
        {
          title: "Keep the first task small",
          body: "Choose a piece of work people can understand and check. Record what the team needs to learn before taking on more. Don’t assume that writing more code means the team can safely maintain more software.",
        },
      ],
      callout:
        "‘Prepare first’ is a useful answer when it names actual work: who will pair with whom, what they will practise, and what they need to demonstrate before starting.",
      sources: [
        {
          name: "NIST: Secure Software Development Framework",
          url: "https://csrc.nist.gov/projects/ssdf",
        },
        {
          name: "GitHub: responsible use of Copilot agents",
          url: "https://docs.github.com/en/copilot/responsible-use/agents",
        },
        {
          name: "DORA: working in small batches",
          url: "https://dora.dev/capabilities/working-in-small-batches/",
        },
      ],
    },
  ];
  pages[0].title =
    audience === "pm"
      ? "Share what your lead may not have heard."
      : "Ask what is behind your PM’s request.";
  pages[0].intro =
    audience === "pm"
      ? "You may hear things from customers and leadership that your lead doesn’t. Explain what you heard, who said it, and what you haven’t checked yet."
      : "Your PM may have heard something from customers or leadership that you haven’t. Ask what they want to improve and why it matters now. Then explain what you would need to do the work.";
  return pages;
}
export const AI_READINESS_SAMPLE: Record<string, string> = {
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
};

export function aiSampleFor(audience: Audience): Record<string, string> {
  const sample = {
    ...AI_READINESS_SAMPLE,
    ...(audience === "lead-dev"
      ? {
          happened:
            "My PM and I have talked about AI for the repair app twice. I can see why they want to stop the double typing. But we still haven't worked out who can see the records or who'll check the code.",
          protecting:
            "I want customer records to stay private and the team to understand what we're putting out. We need to be able to fix it when something goes wrong.",
          observed:
            "I found parts of the API where we haven't tested whether someone can get into records they shouldn't see. We also don't know how much checking and fixing the AI-written code would need.",
          askOther:
            "What have you heard from Support? And can we make time to sort out permissions and who'll review the code before we try it?",
          story:
            "I'm assuming my PM just wants it done faster, whatever the cost. I haven't asked what's behind the request.",
          counterpartConcern:
            "Support types the same repair into two systems, and we still miss some. My PM wants to stop that and spare customers the chasing.",
          why: "I'd like us to get better at this together, use tools that help, and feel confident about the work we put out.",
        }
      : {}),
  };
  return {
    ...sample,
    conversationLeadershipUpdate:
      "PROPOSED — NOT YET AGREED\n\nWe'd like to stop the support team typing every repair request twice. Before we try AI, we need to agree who can see the records and give the developers some time with an experienced reviewer. Could we agree by Friday which help-page updates can wait to make room? We'll check in next Tuesday. We also need Finance to check the $500,000-a-week figure — we haven't seen the calculation yet.",
    conversationTeamUpdate:
      "PROPOSED — NOT YET AGREED\n\nWe've talked about using AI for the repair app. First, we'd like to practise the permission tests and putting out a change we can undo, with an experienced reviewer. We still need time agreed for that, so nothing's been added to your plan. We won't use real customer records or connect to live systems. What would you need to make this useful?",
    leadershipUpdate:
      "PROPOSED — NOT YET AGREED\n\nWe're pausing the AI experiment while we sort out who can see the records and practise checking and releasing the code. Could we agree time for that by Friday, including what other work can wait? Our engineering manager and data owner will help us prepare for Tuesday's check-in. We haven't run an experiment, so we don't have a result about time saved yet.",
    teamUpdate:
      "PROPOSED — NOT YET AGREED\n\nWe're not starting the AI experiment yet. We'd like to agree who can see the records and practise a small change together first. We still need to choose a reviewer, make time, and agree what other work waits. Nothing changes in your plan until we've sorted that out. We'll check in next Tuesday.",
    qualityChecks: JSON.stringify([
      {
        id: "allowed",
        check: "The right person can open the record",
        expected:
          "Someone who has access can open the repair record they need.",
        status: "NOT CHECKED",
        observed: "",
        evidence: "",
        verifier: "An experienced engineer — we still need to agree who",
      },
      {
        id: "denied",
        check: "Other people can't open it",
        expected:
          "Someone without access can't open the record, even by asking the API directly.",
        status: "NOT CHECKED",
        observed: "",
        evidence: "",
        verifier: "An experienced engineer — we still need to agree who",
      },
    ]),
    returnRecord:
      "We haven't had Tuesday's check-in yet. That's when we'll look at what the team has tried, what's still getting in the way, and what to do next.",
  };
}
