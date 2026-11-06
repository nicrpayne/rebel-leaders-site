// A fictional composite. No workplace names, confidential datasets, or measured results.
export const AI_DEV_SAMPLE: Record<string, string> = {
  happened:
    "My PM wants us to use agents to build an internal app after an executive demo. The app needs restricted data, and we haven’t set up access to it. The team is still learning to review and support its own code.",
  story:
    "I’m assuming my PM thinks the demo means we can ship quickly. I need to ask what they actually expect.",
  protecting:
    "People’s data, software we can support, and the team’s chance to learn the work properly.",
  why: "I’ll be responsible for helping the team fix what we ship. I want them to understand it too.",
  futurePicture:
    "We could deliver small apps more reliably, with people who can explain and support their work.",
  observed:
    "Recent changes have needed close review from an experienced engineer. We don’t have an agreed access model for this dataset.",
  prediction:
    "Managing several agents could give us more code than the team can confidently review. We haven’t tested that here.",
  changeMind:
    "I could support a smaller workflow if we have review capacity and people can explain and debug the result. We still need the app’s access requirements met.",
  askOther:
    "What did the executive ask for? Is the priority this app, or a change in how all our development works?",
  changeRequested:
    "Use agents to build an internal app and start changing how the team develops and ships. Our infrastructure doesn’t yet have the connection and permissions this dataset needs.",
  businessContext:
    "Fictional example. My PM says people are waiting too long for small internal tools. I want to understand who needs this app, what they do today, and what has already been promised.",
  counterpartConcern:
    "My PM wants us to consider a different way of delivering instead of assuming every small request needs the same long process.",
  sharedVision:
    "My PM and I want useful apps delivered sooner, with a team that can understand and support what it builds.",
  engineeringPosition:
    "I don’t recommend putting this team into a multi-agent workflow yet. Recent changes still need close review, and we haven’t agreed who can see this app’s data. I can support investigating a smaller approach with proper help.",
  alternatives:
    "Check whether an existing approved platform can meet the need. Otherwise, narrow the app and build it with ordinary code. We could separately explore agent assistance on one small sandbox task.",
  accessModel:
    "The data owner needs to say which users may see or change which records. Platform needs to help us work out the connection, service identity, and how access is granted and removed. Company sign-in alone won’t settle the data permissions.",
  securityChecks:
    "Have the platform engineer review the design. Test allowed and denied requests at the server, including direct requests for another user’s records. Agree logging, secrets handling, and support ownership before using real data.",
  automationBoundary:
    "For a possible spike: an approved sandbox with invented records. No live credentials, production data, deployment access, or changes across services.",
  teamReadiness:
    "The team can make small changes with help. Recent reviews still catch gaps in tests and error handling. We need to see whether people can explain and debug an agent-assisted change with the support we can actually provide.",
  readinessSupport:
    "Reserve an experienced engineer for pairing and review. Agree learning time, a tool budget, and which other work waits. We haven’t secured that time yet.",
  growthOpportunity:
    "Ask the engineers whether a paired task would help them learn the tool and strengthen their debugging and review skills.",
  openQuestions:
    "We haven’t agreed the access design or reviewer availability. My PM wants to know whether there is a quicker option. I want to compare those options before committing the team.",
  conversationStatus: "PROPOSED — NOT YET AGREED",
  businessBasis:
    "No benefit figure has been agreed. Ask the PM for examples of the work people are waiting on before estimating the value.",
  readinessDecision: "PREPARE FIRST",
  prerequisitePlan:
    "Recommend that the PM brings the data owner and Platform together by Friday. I’ll check reviewer capacity and compare a smaller approach. We’ll return Friday to decide whether a spike is worth doing.",
  outcome:
    "Find out whether one engineer can complete, explain, and debug a small agent-assisted change with an experienced reviewer.",
  task: "One isolated task in a sandbox using invented records. No real data connection, deployment, or orchestration across services.",
  betBasis:
    "We need evidence about the workflow and review load for this team. A product demo doesn’t answer that.",
  betHypothesis:
    "With an experienced partner, an engineer may be able to use an agent on a small change and still understand the result.",
  expectedLift:
    "We have no measured speed-up to predict. We want to learn about understanding, debugging, quality, and total review effort.",
  betQualitative:
    "The engineer can explain the change, find a deliberately introduced bug, and describe where the agent needed correction.",
  comparator:
    "If we compare effort, use a similar recent task without an agent and record differences in scope, experience, and review. Choose the task before starting.",
  tool: "Choose an approved coding tool with the reviewer before starting.",
  toolVersion:
    "Record the tool, model, version, settings, and permissions when selected.",
  inputs: "Invented records and sandbox code only.",
  approvalOwner:
    "The lead and relevant security or platform owner must agree the tool’s access. Names still to confirm.",
  qualityBar:
    "Agreed behavior and tests pass. The engineer explains the change and debugs a seeded fault. The experienced reviewer records issues and fixes. No live connections or credentials.",
  capacity:
    "Proposed cap: twelve total team hours including pairing, review, and fixes, plus $100 for tool use. We haven’t agreed which other work waits.",
  betTimebox:
    "Propose one week after the people and scope are agreed. Confirm dates before starting.",
  betRabbitHoles:
    "A bigger feature, missing dependencies, extra permissions, or unplanned platform work. Stop and review the scope if those arise.",
  success:
    "The engineer can explain and debug the change, agreed checks pass, and the work stays within the cap. Review whether the support required is available for another task.",
  stop: "Stop at the time or spend cap, at a permissions boundary, or if there is no one available to review the work safely.",
  owners:
    "Engineer and experienced reviewer still to confirm. The lead recommends next steps; the PM helps prioritize the investment. Platform owns its part of the access investigation.",
  betStatus: "PROPOSED — NOT YET ACCEPTED",
  decisionRights:
    "Confirm who can approve the tool’s use and the investment. Ask the data owner and Platform for the app’s access decision.",
  deploymentPermission:
    "A spike does not approve production use. The app still needs its access design, security checks, support owner, and release approval.",
  betResult: "The spike has not run.",
  comparability: "No comparison has been made.",
  withoutAi: "",
  withAi: "",
  quality: "",
  otherCosts: "No actual costs recorded.",
  laterCheck: "Agree a reviewer and follow-up date if the spike runs.",
  valueAndEffort:
    "No results yet. We have identified missing access work and review capacity. We have not measured a productivity gain.",
  decision: "PAUSE",
  reason:
    "I recommend preparing first. We need an access owner and reviewer time before making a commitment. The smaller spike is still a proposal.",
  betLearning:
    "So far we’ve identified two different jobs: the app’s access design and whether the team can handle the development workflow. We haven’t tested the workflow.",
  limits:
    "No spike result yet. This recommendation concerns this team, dataset, and proposed workflow. It is not a conclusion about all AI tools.",
  next: "PM to arrange the data-owner and Platform conversation; lead to check reviewer capacity. Return Friday with the options.",
  unresolvedPlan:
    "If we still disagree, ask the engineering decision owner to review the options with us. Continue already-approved work while waiting; don’t commit to shipping this app.",
  conversationLeadershipUpdate:
    "PROPOSED — NOT YET AGREED\n\nWe need help identifying the data owner and reserving review time. We’ll compare a smaller approach and return Friday. We have not committed the team to deliver the app.",
  conversationTeamUpdate:
    "PROPOSED — NOT YET AGREED\n\nWe’re looking at the request and the support it would need. No new workflow has been agreed. I’d like to hear where agent assistance could help and what you’d need to review the result confidently.",
  leadershipUpdate:
    "PROPOSED — NOT YET AGREED\n\nWe recommend preparing first. Access decisions and reviewer time are still unresolved. We’ll bring options Friday; there are no spike results or measured time savings yet.",
  teamUpdate:
    "PROPOSED — NOT YET AGREED\n\nWe haven’t agreed or started the spike. Please keep working on the current plan. We’ll discuss the task, pairing, and learning time before anything changes.",
  returnRecord:
    "Return Friday to check the access owner, reviewer capacity, and alternatives. Update this record after the conversation.",
  qualityChecks: JSON.stringify([
    {
      id: "understanding",
      check: "Engineer can explain and debug the change",
      expected:
        "Explain the code and diagnose a seeded fault with the support agreed for the task.",
      status: "NOT CHECKED",
      observed: "",
      evidence: "",
      verifier: "Experienced reviewer — name to agree",
    },
    {
      id: "isolation",
      check: "Sandbox stays isolated",
      expected:
        "No real records, live connections, credentials, or deployments.",
      status: "NOT CHECKED",
      observed: "",
      evidence: "",
      verifier: "Lead and platform reviewer — names to agree",
    },
  ]),
};
