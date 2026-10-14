import type { Audience } from "./ai-paths";
import type { FieldDef } from "./labs";
import { communicationDraft } from "../../client/src/lib/ai-communication.ts";

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
      hint: "Make a short invitation: what could improve for users, the team, and the company? Ask what they would add or change. Identify it as an aspiration until you have shaped it together.",
    },
    {
      id: "counterpartConcern",
      label: pm
        ? "How would your lead describe their concern?"
        : "How would your product manager describe what they need?",
      hint: "Use their words where possible. If you have not asked, record the question instead of filling in their motives.",
    },
    {
      id: "openQuestions",
      label: "What do you agree on? What do you still need to work out?",
      hint: "Include disagreement fairly. What do you need to ask, learn, or have someone qualified verify?",
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
      hint: "Preparing a brief does not create an agreement. You can return and update it after talking.",
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
      hint: "Name who will test both allowed and blocked access, including attempts to open another customer's records. Signing in or hiding a button is not enough to prove this works.",
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
      hint: "Name who will help, when they have time, and what the team will demonstrate before starting. Knowing the team's meeting routine does not show that someone can safely change the software.",
    },
    {
      id: "readinessDecision",
      section: "02 / CHOOSE THE NEXT MOVE",
      label: pm
        ? "What next move would you propose or agree with your lead?"
        : "What next move would you propose or agree with your PM?",
      type: "select",
      options: READINESS_CHOICES,
      hint: "You can ask more questions, get specialist advice, prepare the team, review existing results, plan a small experiment with clear limits, or stop. Choose what helps now.",
    },
    {
      id: "prerequisitePlan",
      label: "What happens next, who will do it, and when will you check back?",
      hint: "For each thing that needs to happen first, name the person, action, and date. Say how you will know it is done. It is fine to use what you already know or decide not to pursue this use.",
    },
  ];
  return {
    eyebrow: "CONVERSATION",
    title: pm
      ? "Understand what matters to each of you."
      : "Understand what matters to each of you.",
    intro: pm
      ? "Pick up the conversation where you left it. Explain what you want to improve, ask about your lead's concerns, and decide what to do next. You do not have to run an experiment."
      : "Pick up the conversation where you left it. Ask what your product manager wants to improve, explain your concerns, and decide what to do next together.",
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
        "Your colleague may not have heard what you heard from customers or leadership. Bring that information into the conversation, including anything you have not checked.",
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
          body: "People may become better at checking generated code or teaching others where it helps. Ask what would make the work worthwhile for them too. Do not promise promotion or rewards you cannot control.",
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
          body: "Signing in tells the system who someone is. It must also check what they are allowed to do. An API is a connection software uses to request data or actions; those requests need permission checks too. Hiding a button is not enough.",
        },
        {
          title: "Limit what the AI can do",
          body: "Say which code, data, and system it may use. Can it only read, or can it make changes, run commands, or release software? Agree who approves those actions and who can undo a mistake.",
        },
        {
          title: "Ask the right people to verify it",
          body: "The lead developer and the people responsible for security and data need to define and check the rules. Record their names, the checks, and where the results can be found. Filling in this form does not grant permission.",
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
          body: "Choose a piece of work people can understand and check. Record what the team needs to learn before taking on more. Do not assume that writing more code means the team can safely maintain more software.",
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
      ? "You may hear things from customers and leadership that your lead does not. Explain what you heard, who said it, and what you have not checked yet."
      : "Your PM may have heard something from customers or leadership that you have not. Ask what they want to improve and why it matters now. Then explain what you would need to do the work.";
  return pages;
}
export const AI_READINESS_SAMPLE: Record<string, string> = {
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
};

export function aiSampleFor(audience: Audience): Record<string, string> {
  const sample = {
    ...AI_READINESS_SAMPLE,
    ...(audience === "lead-dev"
      ? {
          happened:
            "My PM and I have discussed using AI to help build the repair app twice. They want to save the support team repeated typing. I have asked who can see each customer’s records and who will review the code. We have not agreed what to do next.",
          protecting:
            "I need to know that customer records stay private and that the team can check, release, and look after the app.",
          observed:
            "I found parts of the app’s API where we have not tested whether forbidden access is blocked. We have not measured the time an AI-assisted change would take after review and fixes.",
          askOther:
            "What have you heard from the support team, and could we make time to check permissions and review the work before trying this?",
          story:
            "I am assuming my PM does not care about quality. I have not asked what is driving their request.",
          counterpartConcern:
            "Support staff copy repair requests twice, and some are missed. My PM wants to save that work and stop customers having to chase us.",
          why: "I would like our team to become confident engineers who can use helpful tools and stand behind their work.",
        }
      : {}),
  };
  return {
    ...sample,
    conversationLeadershipUpdate: communicationDraft(
      sample,
      audience,
      "conversation",
      "leadership"
    ).replace(
      "[specific request, decision owner, and response date]",
      "Priority owner: confirm protected pairing and qualified review capacity by Friday, including which documentation work may move. We will bring a readiness recommendation next Tuesday."
    ),
    conversationTeamUpdate: communicationDraft(
      sample,
      audience,
      "conversation",
      "team"
    ).replace(
      "[work, capacity, review, permissions, or no change yet]",
      "No experiment or production access is approved yet. We propose pairing on permission tests and a rollback exercise; the priority owner must confirm the capacity tradeoff."
    ),
    leadershipUpdate: communicationDraft(
      sample,
      audience,
      "decision",
      "leadership"
    ).replace(
      "[specific request, decision owner, and response date]",
      "Priority owner: confirm protected pairing and qualified review capacity by Friday. Technical/data owners: verify the access-model decision and acceptance conditions before the Tuesday readiness review."
    ),
    teamUpdate: communicationDraft(
      sample,
      audience,
      "decision",
      "team"
    ).replace(
      "[work, capacity, review, permissions, or no change yet]",
      "The proposed next move is preparation. Tool access and production permissions remain unapproved for this use. Pairing, qualified review, and displaced work need confirmation before scheduling."
    ),
    qualityChecks: JSON.stringify([
      {
        id: "allowed",
        check: "Approved user can access the permitted record",
        expected: "Approved role succeeds for the assigned resource.",
        status: "NOT CHECKED",
        observed: "",
        evidence: "",
        verifier: "Qualified engineering owner—name to be confirmed",
      },
      {
        id: "denied",
        check: "Unauthorized user cannot access another group's record",
        expected: "Direct API requests enforce the resource boundary.",
        status: "NOT CHECKED",
        observed: "",
        evidence: "",
        verifier: "Qualified engineering owner—name to be confirmed",
      },
    ]),
    returnRecord:
      "Not yet reviewed. Return after the access-model decision and supervised exercise; record the evidence, revised next move, owner, and review date.",
  };
}
