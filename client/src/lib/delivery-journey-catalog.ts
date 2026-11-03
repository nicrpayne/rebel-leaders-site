// Plain-language starting points informed by the sources shown in the product.
// These are hypotheses to investigate, never an automatic diagnosis.
export type JourneyStageId =
  | "decide"
  | "shape"
  | "build"
  | "check"
  | "release"
  | "use";
export type JourneyTool =
  | "decision"
  | "review"
  | "example"
  | "release"
  | "experiment"
  | "slice"
  | "dependency";
export type JourneyCase = {
  id: string;
  label: string;
  title: string;
  check: string;
  action: string;
  people: string;
  watch: string;
  tool: JourneyTool;
  returnsTo?: JourneyStageId;
};
export type JourneySymptom = {
  id: string;
  label: string;
  question: string;
  mark: string;
  cases: JourneyCase[];
};
export type JourneyStage = {
  id: JourneyStageId;
  name: string;
  question: string;
  evidence: string;
  symptoms: JourneySymptom[];
};
export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "decide",
    name: "Decide",
    question: "What happened between the request and a decision?",
    evidence:
      "Find the request, the decision date, and who could make that decision. Was it deliberately parked, or waiting without a next step?",
    symptoms: [
      {
        label: "It sat waiting for a decision.",
        question: "What was keeping the decision open?",
        cases: [
          {
            label: "Nobody knew who could say yes.",
            title: "Make the next decision possible.",
            check:
              "Is the decision owner genuinely unclear, or are they waiting for information?",
            action:
              "For the next request, name the decision, the person able to make it, and the information they need. Agree when to revisit it.",
            people:
              "PM identifies the decision owner; lead dev supplies the technical unknowns.",
            watch:
              "Watch request-to-decision time and whether the decision has to be reopened.",
            id: "decide-1-1",
            tool: "decision",
          },
          {
            label: "We kept being asked for more evidence.",
            title: "Agree what is enough to decide.",
            check:
              "Ask which unanswered question would actually change the decision.",
            action:
              "Choose one question and the smallest useful way to answer it. Agree what result would let you proceed, change course, or stop.",
            people:
              "PM and decision owner set the question; the team proposes a proportionate check.",
            watch:
              "Watch time spent gathering evidence and whether it leads to a decision.",
            id: "decide-1-2",
            tool: "decision",
          },
        ],
        id: "decide-1",
        mark: "Waiting",
      },
      {
        label: "The priority changed before we finished.",
        question: "What tended to trigger the switch?",
        cases: [
          {
            label: "Every new request became urgent.",
            title: "Make the trade-off visible.",
            check:
              "Look at the last three switches. Which were genuine emergencies, and what work stopped?",
            action:
              "For the next non-emergency request, agree what will pause before starting it. Keep a visible list of the work already in flight.",
            people:
              "PM brings the trade-off to the requester; the team explains the interrupted work.",
            watch:
              "Watch interruptions and unfinished work. Keep a separate route for genuine incidents.",
            id: "decide-2-1",
            tool: "decision",
          },
          {
            label: "Different stakeholders wanted different things.",
            title: "Put the competing asks in one conversation.",
            check:
              "Do the stakeholders agree on the outcome and who can settle the trade-off?",
            action:
              "Bring the two competing requests to their decision owner. Agree which outcome matters first and what explicitly waits.",
            people:
              "PM convenes the decision; lead dev makes dependencies and consequences visible.",
            watch:
              "Watch whether the same priority decision is reopened before the agreed review date.",
            id: "decide-2-2",
            tool: "decision",
          },
        ],
        id: "decide-2",
        mark: "Switching",
      },
    ],
  },
  {
    id: "shape",
    name: "Shape",
    question: "What happened while you worked out what to build?",
    evidence:
      "Compare the original request with the first usable version. Ask where the team had to guess, and which guesses later changed.",
    symptoms: [
      {
        label: "We thought we agreed. We hadn’t.",
        question: "What was still unclear?",
        cases: [
          {
            label: "We pictured different user behaviour.",
            title: "Use one concrete example before building.",
            check:
              "Can the PM and developer each describe what the same user should be able to do?",
            action:
              "Walk through one normal case and one awkward case together. Write the expected result in plain language and check it with a user or representative.",
            people:
              "PM brings the user’s task; developer brings edge cases and questions.",
            watch:
              "Watch clarification delays and rework caused by a different understanding of the task.",
            id: "shape-1-1",
            tool: "example",
          },
          {
            label: "The important constraints showed up late.",
            title: "Surface one constraint while choices are cheap.",
            check:
              "Which constraint changed the work: data, security, integration, or something else?",
            action:
              "Invite the relevant specialist to review a small sketch of the next change before implementation. Record what is known and what still needs checking.",
            people:
              "Lead dev finds the right specialist; PM makes room for the check in the plan.",
            watch:
              "Watch late changes caused by that constraint. The specialist still owns any required approval.",
            id: "shape-1-2",
            tool: "example",
          },
        ],
        id: "shape-1",
        mark: "Unclear",
      },
      {
        label: "The first version kept getting bigger.",
        question: "Why did it keep growing?",
        cases: [
          {
            label: "We tried to serve everyone at once.",
            title: "Choose the first group to help.",
            check:
              "Can one group get a useful result without all the other variations?",
            action:
              "Choose one group and one complete task for the first release. Put other variations on an explicit later list and validate the boundary with that group.",
            people:
              "PM checks usefulness; lead dev checks that the smaller release can stand on its own.",
            watch:
              "Watch time to a usable release and whether the first group can actually finish its task.",
            id: "shape-2-1",
            tool: "slice",
          },
          {
            label: "New ideas kept joining work already underway.",
            title: "Give new ideas a decision point.",
            check:
              "Which additions were necessary for the original task, and which were another useful idea?",
            action:
              "For the next change, keep a visible first-release boundary. When a new idea arrives, explicitly swap scope, change the release plan, or save it for later.",
            people:
              "PM and developer make the trade-off together; the requester sees the consequence.",
            watch:
              "Watch scope added after work starts and whether the original user task still gets completed.",
            id: "shape-2-2",
            tool: "slice",
          },
        ],
        id: "shape-2",
        mark: "Growing",
      },
    ],
  },
  {
    id: "build",
    name: "Build",
    question: "What interrupted the work while it was being built?",
    evidence:
      "Ask the developer to walk through the last few working days. Separate coding, help they were waiting for, and time switched to other work.",
    symptoms: [
      {
        label: "We kept stopping to deal with something else.",
        question: "What pulled the team away?",
        cases: [
          {
            label: "Support questions reached everyone.",
            title: "Give incoming questions a first stop.",
            check:
              "Are these incidents, routine questions, or work only one specialist can answer?",
            action:
              "Try a named first responder for routine questions, with a backup and an escalation route. Reduce that person’s planned delivery work to make room.",
            people:
              "Lead dev agrees coverage with the team; PM adjusts the delivery commitment.",
            watch:
              "Watch interruptions across the team and response times. Avoid creating an overloaded gatekeeper.",
            id: "build-1-1",
            tool: "experiment",
          },
          {
            label: "We had too many things started.",
            title: "Finish a piece before starting another.",
            check:
              "Is the unfinished work blocked, or are people repeatedly switching between active items?",
            action:
              "Pick one small item the team can finish together. Agree which new work will wait and who can help unblock the current item.",
            people:
              "PM protects the priority; lead dev helps the team finish rather than start more.",
            watch:
              "Watch work reaching users and time spent blocked, not how busy everyone looks.",
            id: "build-1-2",
            tool: "experiment",
          },
        ],
        id: "build-1",
        mark: "Interrupted",
      },
      {
        label: "We were waiting on another team.",
        question: "What made the handoff difficult?",
        cases: [
          {
            label: "Our request was hard for them to act on.",
            title: "Make one dependency request answerable.",
            check:
              "Ask the receiving team what is missing before assuming it is a capacity problem.",
            action:
              "Send one concrete request: the user outcome, the exact help needed, what is already known, and when you need a response. Agree the next step with the recipient.",
            people:
              "Developer clarifies the dependency; PM explains timing and impact.",
            watch:
              "Watch time to an actionable response and how often the request comes back for clarification.",
            id: "build-2-1",
            tool: "dependency",
          },
          {
            label: "They understood it but had no capacity.",
            title: "Make the capacity trade-off explicit.",
            check:
              "Confirm the queue and realistic availability with the other team.",
            action:
              "Ask the responsible leads to agree a slot, an alternative route, or a smaller release that can proceed without the dependency. Change the plan accordingly.",
            people:
              "PM and engineering leads coordinate across teams; individual developers do not absorb the gap with overtime.",
            watch:
              "Watch actual waiting and displaced work. A promised date is not evidence of added capacity.",
            id: "build-2-2",
            tool: "dependency",
          },
        ],
        id: "build-2",
        mark: "Dependency",
      },
    ],
  },
  {
    id: "check",
    name: "Check",
    question: "The code was ready. What happened next?",
    evidence:
      "Take one recent pull request. Compare when it was ready, when someone first reviewed it, and when it was accepted. Ask what happened in the gaps.",
    symptoms: [
      {
        label: "It waited for someone to review it.",
        question: "What kept the review from starting?",
        cases: [
          {
            label: "Reviewers were busy with their own tickets.",
            title: "Make reviewing part of the work.",
            check:
              "Check the last few changes: were they waiting for capacity, or still missing information?",
            action:
              "For the next three small changes, agree a reviewer and time for review inside normal working hours. Start less new work to make that time possible.",
            people:
              "Lead dev and reviewers agree coverage; PM protects capacity by reducing new starts.",
            watch:
              "Compare ready-to-first-review time. Check rework, defects, and reviewer workload as well.",
            id: "check-1-1",
            tool: "review",
          },
          {
            label: "It wasn’t clear who should pick it up.",
            title: "Name the next pair of eyes.",
            check: "Was there a named reviewer who knew the change was ready?",
            action:
              "For the next three changes, agree a reviewer and backup when work starts. Include what changed, how it was checked, and the decision the reviewer needs to make.",
            people:
              "Author supplies context; lead dev agrees ownership and a backup with the team.",
            watch:
              "Watch time waiting before first review and how often authors have to chase a response.",
            id: "check-1-2",
            tool: "review",
          },
        ],
        id: "check-1",
        mark: "Waiting",
      },
      {
        label: "It kept coming back for more changes.",
        question: "What were those changes mostly about?",
        cases: [
          {
            label: "We disagreed about what it should do.",
            title: "Move one useful conversation earlier.",
            check:
              "Were these new requirements or different interpretations of the original request?",
            action:
              "For the next change, walk through a normal case and an edge case with the PM before coding. Show an early version while it is still cheap to change.",
            people:
              "PM and developer agree the behaviour; a user or representative checks that it is useful.",
            watch:
              "Watch rework caused by misunderstood behaviour. Keep useful learning visible rather than treating every change as failure.",
            id: "check-2-1",
            tool: "experiment",
            returnsTo: "shape",
          },
          {
            label: "The change was too big to review confidently.",
            title: "Find a smaller change that still holds together.",
            check:
              "Is size the problem, or does the reviewer lack context or relevant expertise?",
            action:
              "Agree a smaller, independently checkable change before coding. Include enough context to understand its purpose and keep the same quality checks.",
            people:
              "Author and reviewer agree the boundary; PM checks whether delivery scope needs to change.",
            watch:
              "Watch review turnaround, rework, and defects. Smaller diffs alone do not prove faster delivery.",
            id: "check-2-2",
            tool: "slice",
          },
        ],
        id: "check-2",
        mark: "Rework",
      },
    ],
  },
  {
    id: "release",
    name: "Release",
    question: "The change passed its checks. What kept it from users?",
    evidence:
      "Compare acceptance with actual availability to users. Identify what was being done and what was simply waiting in between.",
    symptoms: [
      {
        label: "It waited for a release or approval.",
        question: "What was it waiting for?",
        cases: [
          {
            label: "Several changes had to go out together.",
            title: "Find out what really has to travel together.",
            check:
              "Is batching required by a technical dependency, a release policy, or just the usual routine?",
            action:
              "Take one low-risk change to the release owner. Check whether it can be released independently under the existing controls, and what would need to change if it cannot.",
            people:
              "Lead dev and release owner assess the route; PM coordinates any user-facing rollout.",
            watch:
              "Watch ready-to-release waiting and release failures. Keep required controls and rollback checks.",
            id: "release-1-1",
            tool: "release",
          },
          {
            label: "Approvers needed context we hadn’t prepared.",
            title: "Prepare the approval evidence as you build.",
            check:
              "Confirm the evidence the approver needs and when they can review it.",
            action:
              "For the next change, prepare its purpose, test results, risks, and rollback approach alongside implementation. Ask for an early check that the evidence is complete.",
            people:
              "Team prepares the evidence; the authorized approver makes the decision.",
            watch:
              "Watch clarification rounds and approval waiting, while preserving the approval itself.",
            id: "release-1-2",
            tool: "release",
          },
        ],
        id: "release-1",
        mark: "Waiting",
      },
      {
        label: "Releasing it was a manual ordeal.",
        question: "Which part made the release difficult?",
        cases: [
          {
            label: "Only one person knew all the steps.",
            title: "Make the next release teachable.",
            check:
              "Ask that person which steps are fragile and which require their judgment.",
            action:
              "Pair on the next normal release and capture the real steps, checks, and rollback points. Let a second trained person walk through them with support.",
            people:
              "Release specialist and another engineer pair; PM makes room for the learning.",
            watch:
              "Watch handoff waits and missed steps. Do not use an untested checklist as permission to release.",
            id: "release-2-1",
            tool: "release",
          },
          {
            label: "The same repetitive step caused mistakes.",
            title: "Improve one repeatable release step.",
            check:
              "Confirm the failure comes from that step rather than an upstream defect.",
            action:
              "Choose one low-risk repetitive step to script or make repeatable in a safe environment. Test both success and failure before proposing use in a real release.",
            people:
              "Engineering and the release owner agree the change and its checks.",
            watch:
              "Watch hands-on release effort, failures, and recovery. Keep human judgment where it is needed.",
            id: "release-2-2",
            tool: "release",
          },
        ],
        id: "release-2",
        mark: "Manual work",
      },
    ],
  },
  {
    id: "use",
    name: "In use",
    question: "It shipped. Could people actually use it?",
    evidence:
      "Find the first intended user and ask them to try the task. Deployment alone does not tell you whether the change reached them or helped.",
    symptoms: [
      {
        label: "It was live, but people weren’t using it.",
        question: "What was stopping them?",
        cases: [
          {
            label: "They didn’t know it was there.",
            title: "Complete the last handoff to users.",
            check:
              "Check that awareness is the issue, rather than usefulness or an access problem.",
            action:
              "For the next release, name a first user group and a person responsible for reaching them. Show the task it helps with and invite a first use.",
            people:
              "PM or adoption owner handles the introduction; developer checks the feature is available.",
            watch:
              "Watch first successful use, not only announcements sent or logins.",
            id: "use-1-1",
            tool: "experiment",
          },
          {
            label: "It didn’t fit the way they actually worked.",
            title: "Watch the task in its real setting.",
            check:
              "Ask one intended user to do the task with the feature. Notice workarounds and unfinished steps.",
            action:
              "Observe a short use session, choose one point of friction, and agree a small change to test with that user.",
            people:
              "PM and developer observe together where possible; the user supplies the context.",
            watch:
              "Watch whether the user can finish the task and how much extra effort it takes.",
            id: "use-1-2",
            tool: "experiment",
            returnsTo: "shape",
          },
        ],
        id: "use-1",
        mark: "Not used",
      },
      {
        label: "We shipped it, but weren’t sure it helped.",
        question: "What was missing?",
        cases: [
          {
            label: "We hadn’t agreed what better would mean.",
            title: "Choose an outcome you can check.",
            check:
              "What user problem justified the change, and what observable improvement would matter?",
            action:
              "Agree one outcome for one user group, find a sensible starting point, and choose when to look again. Include what must not get worse.",
            people:
              "PM and user representative choose the outcome; developer checks what can be observed.",
            watch:
              "Watch that outcome and unwanted effects. Do not substitute feature usage for proof of value.",
            id: "use-2-1",
            tool: "experiment",
          },
          {
            label: "Nobody had followed up with users.",
            title: "Give the release a follow-up.",
            check:
              "Is feedback absent, or collected somewhere nobody on the team sees?",
            action:
              "Choose a person and a date to review the first few uses with the intended users. Bring one thing to keep, change, or investigate back to the team.",
            people:
              "PM or product owner arranges the follow-up; engineering joins when technical questions matter.",
            watch:
              "Watch whether feedback leads to a decision, and whether the user’s task becomes easier.",
            id: "use-2-2",
            tool: "experiment",
          },
        ],
        id: "use-2",
        mark: "Feedback gap",
      },
    ],
  },
];

JOURNEY_STAGES.find(s => s.id === "build")!.symptoms.push({
  id: "build-3",
  label: "AI wrote it quickly. Making sense of it took longer.",
  mark: "Understanding",
  question: "What took the extra work?",
  cases: [
    {
      id: "build-3-1",
      label: "The developer couldn’t explain or safely change the output.",
      title: "Make room to understand one AI-assisted change.",
      check:
        "Was the task beyond the developer’s current experience, or was the generated code unnecessarily complex?",
      action:
        "Choose one bounded task in an approved environment. Pair with someone who knows the area, explain the output together, and test a change to it. Include learning and review in the effort you record.",
      people:
        "Lead dev chooses a suitable task and partner; PM makes room for learning in the commitment.",
      watch:
        "Can the developer explain, test, and maintain the change? Look at the whole effort, including fixes, without adding overtime.",
      tool: "experiment",
    },
    {
      id: "build-3-2",
      label: "The output didn’t fit our existing code or architecture.",
      title: "Give the next task a clearer starting point.",
      check:
        "Which mismatch created rework: conventions, dependencies, interfaces, or a missing design decision?",
      action:
        "For the next similar task, agree the relevant interface and show an existing example of the intended pattern. Check an early, small piece of output before generating more.",
      people:
        "Developer and a reviewer who knows the codebase agree the pattern and the first check.",
      watch:
        "Watch integration rework, review effort, and maintainability. Only use approved tools and data.",
      tool: "example",
      returnsTo: "shape",
    },
  ],
});
JOURNEY_STAGES.find(s => s.id === "check")!.symptoms[0].cases.push({
  id: "check-1-3",
  label: "The reviewer had to reconstruct what changed and why.",
  title: "Give the reviewer enough context to begin.",
  check:
    "Ask what they had to find out before they could review. Do not assume a shorter description would fix a complex change.",
  action:
    "For the next two changes, include the user outcome, the intended approach, how you tested it, and any specific questions. Ask the reviewer what was still missing.",
  people:
    "Author supplies the context; reviewer helps define what is useful rather than adding a long template.",
  watch:
    "Watch clarification messages and time before review can begin, along with defects and review quality.",
  tool: "review",
});
JOURNEY_STAGES.find(s => s.id === "check")!.symptoms.push({
  id: "check-3",
  label: "Getting a trustworthy test result took ages.",
  mark: "Test friction",
  question: "What got in the way of checking it?",
  cases: [
    {
      id: "check-3-1",
      label: "We repeated the same manual checks every time.",
      title: "Make one repeated check easier to run.",
      check:
        "Is this a repeatable check with a clear expected result, or exploratory work that needs human judgment?",
      action:
        "Choose one repeated check and automate a small version. Try a known failure as well as a passing case before relying on it. Keep the existing check until the replacement is trustworthy.",
      people:
        "Developer owns the check and maintenance; PM helps identify the user behaviour it must protect.",
      watch:
        "Watch checking effort, false alarms, and failures missed. Include the cost of maintaining the check.",
      tool: "experiment",
    },
    {
      id: "check-3-2",
      label: "Tests failed unpredictably, or the environment wasn’t ready.",
      title: "Trace one source of unreliable feedback.",
      check:
        "Separate a real product failure from a flaky check, missing data, or an unavailable environment.",
      action:
        "Take one recent failure and reproduce its conditions with the environment or test owner. Fix one cause, then run the same check across several relevant changes before expanding the effort.",
      people:
        "Test or environment owner and developer investigate together; PM agrees which delivery work makes room for it.",
      watch:
        "Watch reruns, time waiting for a usable result, and whether real defects still get caught. Do not silence failures to get a green build.",
      tool: "experiment",
    },
  ],
});
