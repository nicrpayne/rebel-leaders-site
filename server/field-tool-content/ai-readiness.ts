import { AI_DEV_SAMPLE } from "./ai-dev-sample.ts";
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
      hint: "Bring the customer and leadership context the other person may not have heard. What does waiting mean? What do you know about where the work is getting stuck?",
    },
    {
      id: "sharedVision",
      label: pm
        ? "What future would you invite your lead to help shape?"
        : "What future could you and your PM want to build together?",
      hint: "What could get better for users? What could each team member learn for this role, their next one, or a side project? Invite your colleague to change the idea.",
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
        ? "What does each person want to learn, and how will you support that?"
        : "What would you and the team like to learn, and what support would help?",
      hint: "Ask people rather than choosing for them. Make learning part of the plan: time, an experienced partner, tools, and a token or usage budget.",
    },
    {
      id: "accessModel",
      section: "WHEN YOU HAVE A TASK / TECHNICAL CONDITIONS",
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
      section: "WHEN YOU HAVE A TASK / TEAM SUPPORT",
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
      hint: "Who could pair with the team? Which tests or review tools could help? Agree time, a token or usage budget, and what other work waits. Match preparation to the task; a prototype is not a live release.",
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
  const pm = audience === "pm";
  return [
    {
      eyebrow: "SHARE WHAT YOU KNOW",
      title: pm
        ? "Share what your lead may not have heard."
        : "Ask what is behind your PM’s request.",
      intro: pm
        ? "You’re in rooms your lead isn’t. Share the customer needs, commitments, dependencies, and choices behind the request so you can think about the whole system together. Invite the context you’re missing too."
        : "Your PM may be hearing about costs, commitments, and customer problems you haven’t seen. Ask for that context. Explain the dependencies, support work, and choices that affect what the team can deliver.",
      sections: [
        {
          title: "What happens while we wait?",
          body: "In our fictional example, support staff keep copying repair requests twice. Find out how often, what gets missed, and who it affects. Ask what makes a date meaningful. Delays matter, but urgency doesn’t tell you which tool will help.",
        },
        {
          title: "What is the opportunity worth?",
          body: "Ask who owns the benefit estimate and what it assumes about adoption. Estimated annual business value divided by total team hours can help compare options. It is not hourly revenue or a measure of an individual developer. The value-and-effort chapter shows an example.",
        },
        {
          title: "What could each person learn?",
          body: "Make development a central reason for the work. Ask what skills people want for this role, a future one, or a side project. Plan time to learn and share what works. Don’t assume everyone wants the same future or promise a promotion.",
        },
        {
          title: "What would make it possible?",
          body: "Ask for the time, tools, token budget, training, and experienced help the team needs. Name what other work will wait. A request to improve how we work needs support from the people setting priorities.",
        },
      ],
      callout: pm
        ? "Try: ‘Here’s what I’m hearing from users and leadership. What am I missing about the work? What could we learn together that would help us move this forward?’"
        : "Try: ‘Help me understand what waiting means for users and the business. I’ll walk you through what is slowing us down. Then let’s choose something we can learn from.’",
    },
    {
      eyebrow: "SET UP THE EXPERIMENT",
      title: pm
        ? "Agree what you’re trying before the details."
        : "Match the checks to what you’re trying.",
      intro:
        "Once you have a specific experiment, decide what it needs. A prototype to learn about a workflow and a change to live customer software have different responsibilities. Be clear which one you are discussing.",
      sections: [
        {
          title: "Name the question and the finish line",
          body: "Are you learning whether users understand a workflow, whether a tool helps build it, or how to improve review? Pick a manageable question. Say what the result must show and what it will not establish.",
        },
        {
          title: "Choose the environment and information",
          body: "Agree the tool, data, and access it needs. For an isolated prototype, made-up records may be enough. If real systems or records are involved, bring in the people responsible before connecting them.",
        },
        {
          title: "Let the lead define the technical checks",
          body: pm
            ? "Ask your lead which checks matter for this task and who will perform them. When access to real records is involved, the team must test who can see or change them. You don’t need to design those tests yourself."
            : "For work involving protected records, define allowed and blocked access and test it at the server or API. Signing in and hiding buttons are not enough. For a prototype, state clearly which production checks remain outside this experiment.",
        },
        {
          title: "Keep the next decision visible",
          body: "Agree who can accept the experiment, where its use ends, and what would require another decision. Don’t let a useful demo quietly become a live service. Don’t require a finished service just to learn from an isolated demo.",
        },
      ],
      callout:
        "These are setup questions for the task you choose. They don’t need to be the opening conversation about whether you’re willing to explore a better approach.",
      sources: [
        {
          name: "OWASP: authorization checks",
          url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
        },
      ],
    },
    {
      eyebrow: "HELP THE TEAM LEARN",
      title: "Make it possible to learn and do good work.",
      intro: pm
        ? "If the team is being asked to change how it works, help make room for that. Ask what people want to learn and what is getting in their way. Don’t mistake missing support for unwillingness."
        : "Help the team choose what to practise and what support it needs. Name gaps without turning the experiment into a test of anyone’s worth. You can care about the craft and explore new ways to do it.",
      sections: [
        {
          title: "Pair on a real, small piece of work",
          body: "Arrange time with someone who knows the tools and the work. Walk through a change together: what it does, how you check it, and what you would do if it failed. The purpose is to build confidence and find where help is needed.",
        },
        {
          title: "Help people get through reviews",
          body: "Try useful automation alongside human judgment: tests, static checks, or an AI review tool. For example, Copilot can suggest issues and fixes on pull requests. Check whether the suggestions help and what they miss; budget the tool and human review time.",
        },
        {
          title: "Make the route to acceptance clear",
          body: "Agree who reviews, which checks apply, and how to ask for help before work begins. A pull request is a proposed code change. Keep it small enough to understand. Give feedback people can act on, and include the person doing the work in the conversation.",
        },
        {
          title: "Look at the process as well as the tool",
          body: "If work stalls, ask where: unclear scope, waiting for a decision, learning a new system, review, or rework? The familiar process deserves examination too. Use what you find to improve it, not to build a case against a colleague.",
        },
      ],
      callout:
        "Leave with a practical agreement: who will help, time and budget set aside, a task to learn on, and a date to compare what happened with what you hoped.",
      sources: [
        {
          name: "GitHub: Copilot code review",
          url: "https://docs.github.com/en/copilot/concepts/agents/code-review",
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
}
export const AI_READINESS_SAMPLE: Record<string, string> = {
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
    "Could we set aside twelve total team hours and $100 for tools to try one small workflow? We'll bring back user feedback, what the team learned, and a next-step recommendation. We still need to agree the people and what other work waits.",
  valueAndEffort:
    "No results yet. The sponsor's annual value estimate still needs checking. We will record total team hours, tool costs, user feedback, learning, and remaining work before making any claim about value or time saved.",
};

export function aiSampleFor(audience: Audience): Record<string, string> {
  if (audience === "lead-dev") return structuredClone(AI_DEV_SAMPLE);
  return {
    ...AI_READINESS_SAMPLE,
    conversationLeadershipUpdate:
      "PROPOSED — NOT YET AGREED\n\nSupport is still entering repairs twice. Could we try a small prototype to learn whether a different tool and review approach helps? We're asking for twelve total team hours and a $100 tools and token cap, with an experienced partner. Please help us agree what other work can wait by Friday. We'll review next Tuesday. The annual benefit estimate still needs checking.",
    conversationTeamUpdate:
      "PROPOSED — NOT YET AGREED\n\nWe'd like to try one repair-request workflow using made-up records. What would you want to learn, and what help would make this worthwhile? We're asking for time, an experienced partner, and a tool budget. Nothing has been added to your workload yet. Let's choose the approach together.",
    leadershipUpdate:
      "PROPOSED — NOT YET AGREED\n\nWe're holding off starting until we've agreed time, people, and a tool budget. Could we make room for twelve team hours and $100 in usage, including review and user feedback? The PM and lead will confirm the plan with the team by Friday and review next Tuesday. We have no experiment results yet.",
    teamUpdate:
      "PROPOSED — NOT YET AGREED\n\nWe haven't started the experiment. First let's agree the task, what you'd like to learn, who will help and review, and which work waits. The proposal is twelve team hours and a $100 tool cap. We'll use made-up records and keep the prototype away from live systems. Please help us improve the plan.",
    qualityChecks: JSON.stringify([
      {
        id: "workflow",
        check: "Support can complete the task",
        expected:
          "A test user enters a repair once and can see where it went, using made-up records.",
        status: "NOT CHECKED",
        observed: "",
        evidence: "",
        verifier: "PM and a support user — names to agree",
      },
      {
        id: "isolation",
        check: "The prototype stays separate",
        expected:
          "No real customer records, live credentials, or live-system connections. The agreed checks pass.",
        status: "NOT CHECKED",
        observed: "",
        evidence: "",
        verifier: "An experienced reviewer — name to agree",
      },
    ]),
    returnRecord:
      "We haven't had the check-in yet. Next Tuesday we'll see what has been agreed, what is still getting in the way, and whether we're ready to start.",
  };
}
