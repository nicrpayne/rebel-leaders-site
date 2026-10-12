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
        ? "What outcome matters to you, and what context would help your lead understand it?"
        : "What outcome and context have you understood from your PM?",
      hint: "Use the conversation you are already having. Describe who benefits and why it matters; include urgency only when it is relevant.",
    },
    {
      id: "counterpartConcern",
      label: pm
        ? "How would your lead describe their concern?"
        : "How would your PM describe what they need?",
      hint: "Use their words where possible. If you have not asked, record the question instead of filling in their motives.",
    },
    {
      id: "openQuestions",
      label: "What do you understand together, and what is still unresolved?",
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
        ? "Where does the delay-cost estimate come from?"
        : "Who supplied the delay-cost estimate, and what supports it?",
      hint: "Record the source, assumptions, uncertainty, and who can validate it. A stakeholder claim is not automatically an established loss.",
    },
    {
      id: "growthOpportunity",
      label: pm
        ? "What worthwhile opportunity could this create for your team?"
        : "What worthwhile opportunity could you and your PM help create?",
      hint: "Connect customer value, engineering capability, influence over standards, and possible career opportunities. Invite your counterpart to shape the picture.",
    },
    {
      id: "accessModel",
      section: "OPTIONAL / TECHNICAL CONDITIONS",
      label: pm
        ? "What access decisions need your lead and the data owner?"
        : "What access model needs to be agreed across these apps?",
      hint: "Which users or groups can perform which actions on which data? Include resource boundaries, membership changes, and the accountable access-policy owner.",
    },
    {
      id: "securityChecks",
      label: pm
        ? "What API and permission checks must be demonstrated?"
        : "What checks will demonstrate that APIs and routes enforce permissions?",
      hint: "Name the engineering/security owner and evidence for denied access, approved access, and data boundaries. Hiding a screen or adding sign-in does not establish authorization.",
    },
    {
      id: "automationBoundary",
      label: pm
        ? "What may the AI tool or agent read, change, or deploy?"
        : "What permissions and operating boundaries may the tool or agent have?",
      hint: "Record environment, data, credentials, write/deploy permissions, human approvals, and rollback. An assistant drafting code and an agent acting on systems need different boundaries.",
    },
    {
      id: "teamReadiness",
      section: "OPTIONAL / TEAM SUPPORT",
      label: pm
        ? "What engineering capabilities can your team demonstrate today?"
        : "What can your team confidently explain, test, review, and maintain?",
      hint: "Consider authentication/authorization, testing, Git and review, debugging, deployment, rollback, and working in small increments. Use demonstrated capability rather than age or job title.",
    },
    {
      id: "readinessSupport",
      label: pm
        ? "What training, pairing, or qualified review should you help protect?"
        : "What training, pairing, or qualified review does this use require?",
      hint: "Name the support, its owner, reserved capacity, and a readiness check. Scrum familiarity and secure engineering capability each need their own attention.",
    },
    {
      id: "readinessDecision",
      section: "02 / CHOOSE THE NEXT MOVE",
      label: pm
        ? "What next move would you propose or agree with your lead?"
        : "What next move would you propose or agree with your PM?",
      type: "select",
      options: READINESS_CHOICES,
      hint: "Clarify the conversation, ask a specialist, prepare the team, review existing evidence, design a bounded test, or stop this use. Choose what fits where you are.",
    },
    {
      id: "prerequisitePlan",
      label: "What must happen next, who owns it, and when will you review?",
      hint: "For each unresolved prerequisite, name the action, accountable owner, date, and evidence that will show it is resolved. Existing evidence or a justified stop can be the right next move.",
    },
  ];
  return {
    eyebrow: "CONVERSATION",
    title: pm
      ? "Understand what matters to each of you."
      : "Understand what matters to each of you.",
    intro: pm
      ? "Start wherever the ongoing conversation stands. Share the outcome you care about, hear your lead’s concerns, and choose one useful next move. A trial is one possibility."
      : "Start wherever the ongoing conversation stands. Ask what your PM hopes to improve, make your concerns concrete, and choose one useful next move together.",
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
  const pm = audience === "pm";
  return [
    {
      eyebrow: "SHARE THE BUSINESS CONTEXT",
      title: pm
        ? "Bring the rooms you're in into this room."
        : "Ask what your PM is hearing.",
      intro: pm
        ? "Your lead may not hear the revenue, customer, or operational consequences discussed with leadership. Share that context so the team can judge the opportunity with you."
        : "Your PM may hear costs of delay, customer commitments, and opportunities you haven't seen. Ask for the context behind the urgency, then help turn it into a credible investment.",
      sections: [
        {
          title: "Name the outcome and the consequence",
          body: pm
            ? "Describe who benefits, what changes, and why timing matters. If a sponsor says each week costs $500,000, attribute the estimate and explain what is included."
            : "Ask which outcome matters, who is affected by delay, and what timing changes. If you hear $500,000 per week, ask where the estimate comes from and which assumptions it depends on.",
        },
        {
          title: "Keep estimates open to examination",
          body: "Separate an observed cost, a forecast, and a stakeholder's claim. Name who can validate the figure. Urgency helps prioritize an investment; the engineering and access requirements still need owners.",
        },
        {
          title: "Make the opportunity shared",
          body: "A team that establishes trustworthy practices could improve delivery and influence how the company works. Connect that possibility to learning, mastery, customer value, and professional opportunity for both leaders.",
        },
        {
          title: "Make the investment explicit",
          body: pm
            ? "Ask what capacity, platform work, training, or review would make progress responsible. Take the tradeoff to the person who owns priorities, then report a next move with an owner and date."
            : "Translate the concern into an investment your PM can discuss: an access-model decision, a qualified reviewer, training, or a smaller use. Explain what that investment would enable.",
        },
      ],
      callout:
        "Try together: The opportunity matters. Let's put the business case and the conditions for responsible delivery in one picture.",
    },
    {
      eyebrow: "PROTECT THE SYSTEM",
      title: "Make access a design decision.",
      intro: pm
        ? "Your lead's concern about an unprotected API is a concrete issue to resolve. Help identify the data owner, the access decision, and the evidence needed before connecting a new app to real systems."
        : "Make the specific access gap visible to your PM. Name the route, action, or data boundary at risk and the design decision and verification it needs.",
      sections: [
        {
          title: "Specify who can do what to which data",
          body: "Map users or groups to application roles, allowed actions, and resource boundaries. Include joiners, movers, leavers, and ownership of access changes. New apps need a coherent access model across the relevant systems.",
        },
        {
          title: "Verify permissions in the API",
          body: "Microsoft Entra sign-in establishes identity. APIs also need the appropriate token, scope, role, and resource-level authorization checks. Hiding a button does not protect a route. Include tests where access must be denied.",
        },
        {
          title: "Bound what an agent can do",
          body: "Record which environment and data it can use, which credentials it receives, and whether it can read, write, run commands, or deploy. Name approval points, least-privilege boundaries, and a recovery owner.",
        },
        {
          title: "Assign the decision and verification",
          body: pm
            ? "Ask your lead and the security/data owners to define and verify these conditions. You can help protect their capacity and escalate missing decisions. A completed Lab form is not a security approval."
            : "Name the access-policy owner, engineering/security reviewer, required checks, and evidence of completion. Use the Lab to coordinate the work; verify implementation through the appropriate technical review.",
        },
      ],
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
      callout:
        "A real prerequisite can change the next move: resolve the access model, restrict the environment, or pause this use until the required verification exists.",
    },
    {
      eyebrow: "PREPARE THE TEAM",
      title: "Match the responsibility with the capability.",
      intro: pm
        ? "Your team may be developing engineering skills while delivering important work. Help make training, pairing, review, and operating practices part of the investment."
        : "Assess the work your team can explain and verify today. Make the support required for this use visible to your PM, with a concrete readiness check.",
      sections: [
        {
          title: "Start with demonstrated capability",
          body: "Can the developer explain the change, test permission boundaries, review a diff, debug a failure, and describe deployment and rollback? Prior roles and age do not establish these capabilities; practical evidence does.",
        },
        {
          title: "Protect learning and qualified review",
          body: "Use pairing, focused training, small changes, and a reviewer qualified for the risk. Ask developers to explain why the generated change is correct and how they checked it. Reserve time for learning and review.",
        },
        {
          title: "Build a repeatable delivery practice",
          body: "Clarify acceptance criteria, Git and review practices, testing, deployment ownership, and feedback. Scrum familiarity helps a team coordinate; secure engineering capability also needs deliberate practice and coaching.",
        },
        {
          title: "Treat acceleration as conditional",
          body: "DORA describes AI as amplifying the strengths and weaknesses of the surrounding delivery system. Small batches strengthen feedback and review. Record what this team needs for this use, then evaluate accepted work at its full cost.",
        },
      ],
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
        {
          name: "DORA: AI-assisted development research",
          url: "https://dora.dev/research/publications/",
        },
      ],
      callout:
        "Prepare first can be a productive decision. Name the training, pairing, review, or platform work, the owner, and the evidence that will show the team is ready.",
    },
  ];
}
export const AI_READINESS_SAMPLE: Record<string, string> = {
  happened:
    "We have discussed AI in planning twice. The PM wants faster delivery; the lead has asked for clear boundaries and review capacity. Neither has proposed a next move they both understand.",
  story:
    "I am treating their hesitation as resistance, but I have not asked what would make progress worthwhile for them.",
  protecting:
    "A worthwhile customer outcome and a team that can stand behind what it ships.",
  why: "I want the team to spend less time on repetitive work and more time solving the hard problems.",
  futurePicture:
    "Six months from now, we could have a few trustworthy practices that create room for better work.",
  observed:
    "The lead identified missing authorization checks; we have not measured full effort in this workflow.",
  prediction:
    "AI may shorten drafting, but total effort and quality are still unknown here.",
  changeMind:
    "A full-effort comparison and demonstrated quality checks could change my view.",
  askOther:
    "What would you need to understand or protect before we choose a next move?",
  visionTeam:
    "The team can explain and verify its changes, and reviewers have protected time.",
  visionProduct:
    "Customers wait less for reliable improvements to their workflow.",
  visionCompany:
    "We could establish a useful standard and create opportunities for both leaders to coach other teams.",
  counterpartConcern:
    "Unverified route permissions and review work that the current plan does not account for.",
  openQuestions:
    "We both want reliable delivery. We need to validate the urgency, resolve access ownership, and make review capacity explicit.",
  conversationStatus: "PROPOSED — NOT YET AGREED",
  outcome:
    "Reduce the delay in an internal workflow app while protecting access to operational data.",
  sharedVision:
    "Build a delivery practice the team can trust and other teams can learn from, with more room for skilled engineering work.",
  businessContext:
    "Fictional case: the sponsor reports that each week of delay costs $500,000 in operational opportunity. The team has not heard the assumptions behind that estimate.",
  businessBasis:
    "Sponsor estimate; Finance has not validated the amount or separated current loss from forecast opportunity. PM will clarify the basis with Finance by Thursday.",
  growthOpportunity:
    "The team could build secure reusable patterns, strengthen engineering capability, and help shape company standards. Career opportunities are possible rather than promised.",
  accessModel:
    "Users require different access to operational records across apps. Roles, resource boundaries, group assignment ownership, and membership changes have not yet been agreed.",
  securityChecks:
    "Engineering manager identified routes without demonstrated authorization coverage. Security owner will review the access design and require allowed/denied-access tests before any production connection.",
  automationBoundary:
    "No agent access to production data, deployment credentials, or write permissions. A future bounded test may use an approved non-production environment with synthetic data after review.",
  teamReadiness:
    "Developers have analyst and IT-services experience. They have not yet demonstrated authorization tests, repeatable code review, or deployment/rollback practice for this app.",
  readinessSupport:
    "Engineering manager arranges pairing and a qualified reviewer; PM protects capacity. Team demonstrates a reviewed change, permission tests, and a rollback exercise before readiness review.",
  readinessDecision: "PREPARE FIRST",
  prerequisitePlan:
    "PM validates business assumptions Thursday. Data/security owner agrees the access model Friday. Engineering manager leads pairing and verification. Both leaders review readiness next Tuesday.",
  decision: "PAUSE",
  reason:
    "The opportunity merits investment, but access design and demonstrated engineering readiness are prerequisites to this use.",
  limits:
    "No AI productivity result has been measured. The sponsor's delay-cost figure is unvalidated. This decision applies to this proposed use and environment.",
  next: "Complete the access-model decision, permission tests, and supervised engineering exercise; review with PM and engineering manager next Tuesday.",
  leadershipUpdate:
    "We propose protected preparation time to establish access boundaries and team readiness, then decide whether an approved synthetic-data trial is worthwhile.",
};

export function aiSampleFor(audience: Audience): Record<string, string> {
  return {
    ...AI_READINESS_SAMPLE,
    ...(audience === "lead-dev"
      ? {
          story:
            "I am assuming my PM does not care about quality. I have not asked what is driving their request.",
          counterpartConcern:
            "Customers are waiting for an operational improvement; the sponsor expects us to find a responsible way to move faster.",
          why: "I would like our team to become confident engineers who can use helpful tools and stand behind their work.",
        }
      : {}),
  };
}
