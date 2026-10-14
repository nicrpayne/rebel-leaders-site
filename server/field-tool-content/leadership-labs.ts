import type { FieldDef, LabConfig } from "./labs.ts";
import { LEADERSHIP_OUTPUT_BUILDERS as builders } from "../../client/src/lib/leadership-output.ts";

const field = (
  id: string,
  label: string,
  hint?: string,
  type: FieldDef["type"] = "textarea"
): FieldDef => ({ id, label, hint, type });
const choice = (id: string, label: string, options: string[]): FieldDef => ({
  id,
  label,
  type: "select",
  options,
});
const privatePrep = [
  field(
    "privateReaction",
    "How are you feeling about this?",
    "Private. Take a moment to notice the frustration before you reply."
  ),
  field(
    "privateAssumption",
    "What are you assuming about the other person?",
    "Private. What could you ask them to check whether that is true?"
  ),
];
const decisionStatus = choice(
  "decisionStatus",
  "Where does the decision stand?",
  [
    "PROPOSAL — awaiting a decision",
    "AGREED — decision recorded",
    "DECLINED — response recorded",
    "PAUSED — clarification needed",
  ]
);
const outputs = (ids: string[], titles: string[], fromSteps = [0, 1, 3]) =>
  ids.map((id, index) => ({
    id,
    title: titles[index],
    fromStep: fromSteps[index],
    build: builders[id],
  }));

export const LEADERSHIP_LABS: Record<string, LabConfig> = {
  "deadline-reset": {
    steps: [
      {
        eyebrow: "THE PROMISE",
        title: "What exactly has been promised?",
        intro:
          "Start with one promised date. Find out what people expect to be ready and what the team still needs to check.",
        fields: [
          field(
            "outcome",
            "What should customers or the team be able to do when this is finished?"
          ),
          field("date", "What date has been communicated?", undefined, "text"),
          field(
            "promise",
            "What was promised, and by whom?",
            "Use the words people were told. Was this an estimate, a target, or a promise they are relying on?"
          ),
          field("fixed", "What cannot change, and why?"),
          field(
            "constraintBasis",
            "How do you know it cannot change?",
            "For example, the event is booked or a contract sets the date. Name the person who confirmed it."
          ),
          field(
            "assumed",
            "What are we assuming about the work, the people available, or help from other teams?"
          ),
          field("unknown", "What still needs to be checked?"),
          ...privatePrep,
        ],
      },
      {
        eyebrow: "OPTIONS",
        title: "What could we change?",
        intro:
          "Ask the people doing the work what each option would take. Check whether extra help would really help, and keep the necessary quality checks.",
        fields: [
          field(
            "scopeMove",
            "If we keep the date, what could be ready and what would come later?",
            "Be specific about what customers would get. Ask the engineering lead to check whether it can be done."
          ),
          field(
            "dateMove",
            "If all the promised work must be ready together, when could we finish?",
            "Use the team's estimate and explain what it depends on. If they do not know yet, say what they need to check."
          ),
          field(
            "capacityMove",
            "Would extra help make a difference?",
            "Include time to teach someone the work, check their changes, and cover anything they would stop doing elsewhere."
          ),
          field(
            "qualityGuardrails",
            "Which quality, security, or safety checks must still happen?"
          ),
          field("consequence", "What happens if we keep the current plan?"),
          choice("chosenOption", "Which option do you recommend?", [
            "Keep date / change scope",
            "Keep scope / revisit date",
            "Change capacity after feasibility review",
            "Pause commitment / resolve unknowns",
          ]),
          field(
            "recommendation",
            "Why do you recommend that option?",
            "Explain who it helps and what would change for anyone else."
          ),
        ],
      },
      {
        eyebrow: "HOW SURE ARE WE?",
        title: "How sure are we that this plan will work?",
        intro:
          "Explain why you think the work can be ready. The Lab does not calculate the chance of meeting the date.",
        fields: [
          choice("confidence", "How confident are you?", [
            "Low",
            "Medium",
            "High",
            "Not assessed",
          ]),
          field(
            "confidenceScope",
            "Which work and finish date are you judging?"
          ),
          field(
            "forecastBasis",
            "What makes you think that?",
            "Describe work already finished, the team's estimate, and anything another team has confirmed. Say what is still uncertain."
          ),
          field(
            "evidenceNext",
            "What will we check next, and who will check it?"
          ),
          field(
            "checkpoint",
            "When will you review what you find out?",
            undefined,
            "text"
          ),
        ],
      },
      {
        eyebrow: "UPDATE",
        title: "What do you need someone to decide?",
        intro:
          "Prepare your request before the meeting. Come back afterward to record the answer.",
        fields: [
          field("decisionNeeded", "What decision do you need now?"),
          field("owner", "Who can make it?", undefined, "text"),
          field("decisionBy", "Decision needed by", undefined, "text"),
          decisionStatus,
          field(
            "finalDecision",
            "What did they say or agree to?",
            "If you haven't met yet, leave this blank. Your update will remain a proposal."
          ),
          field(
            "communication",
            "Who needs to be told, and who will tell them?",
            "Include the person who made the promise to customers."
          ),
        ],
      },
    ],
    outputs: outputs(
      ["deadline-reality", "deadline-options", "deadline-update"],
      ["Deadline Facts", "Delivery Options", "Decision Update"]
    ),
    buildOutput: builders["deadline-update"],
  },
  "priority-whiplash": {
    steps: [
      {
        eyebrow: "CURRENT WORK",
        title: "What are we already working on?",
        intro:
          "List the work people are waiting for, then add the new request. We will check whether it fits and what would need to change.",
        fields: [
          field(
            "outcome",
            "What are you trying to get done for customers or the team?"
          ),
          field("p1", "Work already promised: first item", undefined, "text"),
          field("p2", "Work already promised: second item", undefined, "text"),
          field("p3", "Work already promised: third item", undefined, "text"),
          field(
            "otherWork",
            "What else takes up the team's time?",
            "Include customer support, maintenance, checking changes, meetings, and other promised work."
          ),
          field("newAsk", "What new request has arrived?"),
          field("whyNow", "Why does it need attention now?"),
          field(
            "urgencyBasis",
            "What have you checked about the deadline and who needs this?",
            "Is there a booked meeting, a customer promise, or a problem happening now? Ask what they need and why that date matters."
          ),
          ...privatePrep,
        ],
      },
      {
        eyebrow: "WHAT CHANGES",
        title: "If we take this on, what would have to wait?",
        intro:
          "Check whether the request fits. If it does not, compare a smaller version, a later date, or putting other work off. Use the time check below if it helps.",
        fields: [
          choice("priorityChoice", "What do you suggest?", [
            "Accept / displace named work",
            "Narrow the request",
            "Defer to a named checkpoint",
            "Decline this request",
          ]),
          field(
            "moves",
            "What would we put off, do less of, or stop?",
            "Name the actual work and who is waiting for it. If nothing needs to change, say why it fits."
          ),
          field(
            "impact",
            "Who would this affect, and what would change for them?"
          ),
          field(
            "protected",
            "What work or checks must still happen?",
            "Include promises we still need to keep and essential safety, security, and quality checks."
          ),
          field(
            "alternative",
            "Is there another way to give them what they need?",
            "Could existing sketches work instead of a demonstration? Could a smaller version or a later date help? Explain the difference."
          ),
          field(
            "capacityWindow",
            "Which dates are you comparing in the time check?",
            undefined,
            "text"
          ),
          field(
            "capacityBasis",
            "Where did these time estimates come from?",
            "Use the same dates and count everyone's work time, including review and support. If an estimate is missing, say so."
          ),
        ],
      },
      {
        eyebrow: "RECOMMEND",
        title: "What do you think we should do?",
        intro:
          "If you are allowed to make this call, make it and tell the people affected. Otherwise, take your recommendation to the person who can.",
        fields: [
          field(
            "recommendation",
            "What do you recommend, and why?",
            "Explain what this would help us do, what would wait, and why you think it is the best option."
          ),
          field("decisionOwner", "Who can make this call?", undefined, "text"),
          field("decisionDate", "Decision needed by", undefined, "text"),
        ],
      },
      {
        eyebrow: "RECORD",
        title: "What was decided, and who needs to know?",
        intro:
          "Before the meeting, build the brief as a proposal. Afterward, come back and record the answer. Do not mark it agreed before someone agrees.",
        fields: [
          decisionStatus,
          field(
            "finalDecision",
            "What was actually decided?",
            "Record the choice and the person who made it. Leave blank before agreement."
          ),
          field(
            "communication",
            "Who will update the plan and tell the people affected? By when?"
          ),
          field(
            "reviewDate",
            "When will you review whether the choice is working?",
            undefined,
            "text"
          ),
        ],
      },
    ],
    outputs: outputs(
      ["priority-stack", "displacement-map", "tradeoff-brief"],
      ["Current Work List", "What Would Change", "Priority Decision Brief"]
    ),
    buildOutput: builders["tradeoff-brief"],
  },
  "mandate-reset": {
    steps: [
      {
        eyebrow: "THE PROBLEM",
        title: "Which decision is holding up the work?",
        intro:
          "Start with what you are expected to deliver and a decision you cannot make. We will work out who can make it and what you need to ask for.",
        fields: [
          field("outcome", "What are you expected to deliver or improve?"),
          field(
            "blockedDecision",
            "Which decision is blocking progress?",
            "For example, you are expected to meet the release date but cannot postpone new feature requests."
          ),
          field(
            "consequence",
            "What happens while we wait for that decision?",
            "Say what gets delayed, who gets conflicting instructions, or which customer is affected. Explain where any estimates came from."
          ),
          ...privatePrep,
        ],
      },
      {
        eyebrow: "WHO DECIDES",
        title: "Who does what when this decision comes up?",
        intro:
          "Use real names where you can. If you are unsure who is allowed to decide, say so and ask the people involved to confirm.",
        fields: [
          field(
            "recommend",
            "Who brings the recommendation?",
            "Who will explain the options and recommend one?",
            "text"
          ),
          field(
            "consult",
            "Who needs to be asked for advice or information?",
            "For example, ask developers how much work it takes and the account manager what customers were promised. Advice is different from required approval."
          ),
          field("approve", "Who makes the final call?", undefined, "text"),
          field("execute", "Who carries out the decision?", undefined, "text"),
          field(
            "block",
            "Who can stop this from going ahead?",
            undefined,
            "text"
          ),
          field(
            "accountable",
            "Who has to answer for the result?",
            undefined,
            "text"
          ),
          field(
            "rightsEvidence",
            "Which of these roles have people confirmed? What still needs checking?",
            "Name the policy, agreement, or person who confirmed this. If it is your assumption, say so."
          ),
          field(
            "requiredApprovals",
            "Whose approval is required before this can go ahead?",
            "For example, the security reviewer approves the data checks and Finance approves extra spending. Those approvals may be separate from the final decision about the work."
          ),
        ],
      },
      {
        eyebrow: "WHAT NEEDS TO CHANGE",
        title: "What would make it possible to get a decision?",
        intro:
          "You might ask to make this call yourself within agreed limits. Or ask the person who keeps it to respond within a set time.",
        fields: [
          field(
            "gap",
            "What are you responsible for that you cannot decide?",
            "Describe what happens. For example: directors add work, I cannot put it off, but I am still expected to meet the original date."
          ),
          field(
            "request",
            "What change are you asking for?",
            "Say which decision, who should make it, and any limits that should apply."
          ),
          field("boundaries", "What limits and approvals would still apply?"),
          field(
            "fallback",
            "If you cannot make the call, how will you get an answer?",
            "Who will you ask, how soon should they respond, and what will the team do while waiting?"
          ),
        ],
      },
      {
        eyebrow: "REQUEST",
        title: "Make the request easy to respond to.",
        intro:
          "Ask the person who can agree to this change. Record their answer after the conversation.",
        fields: [
          field("owner", "Who needs to act?", undefined, "text"),
          field("date", "Response needed by", undefined, "text"),
          decisionStatus,
          field("finalDecision", "What response has been recorded?"),
          field(
            "interimAction",
            "What will you do within your current authority while waiting?"
          ),
          field(
            "reviewDate",
            "When will you check whether the new arrangement is working? What will you look for?"
          ),
        ],
      },
    ],
    outputs: outputs(
      ["rights-map", "authority-gap", "mandate-request"],
      ["Who Can Decide", "The Decision Problem", "Decision Request"],
      [1, 2, 3]
    ),
    buildOutput: builders["mandate-request"],
  },
  "product-project-translator": {
    steps: [
      {
        eyebrow: "THE REQUEST",
        title: "Let's start with the sentence you heard.",
        intro:
          "Someone needs an answer so they can plan. Start with what they asked, then find out what they need it for.",
        fields: [
          field("request", "What did they ask for?", "Use their actual words."),
          field("stakeholder", "Who is asking?", undefined, "text"),
          field("context", "What do they need to decide or plan?"),
          ...privatePrep,
        ],
      },
      {
        eyebrow: "WHAT THEY NEED",
        title: "What do they need the answer for?",
        intro:
          "They may need to set a budget, tell a customer, or plan another team's work. Ask them before treating your guess as the answer.",
        fields: [
          choice("need", "Why do they need an answer?", [
            "Confidence",
            "Budget / staffing",
            "Sequencing",
            "Customer communication",
            "Accountability",
            "Risk management",
          ]),
          field(
            "needEvidence",
            "What have they confirmed about that need?",
            "Try: What decision will these requirements or dates help you make, and by when?"
          ),
          field(
            "assumption",
            "Which assumption needs to be checked?",
            "What do you still need to find out before you can give a reliable answer? Be specific; some of the work may already be clear."
          ),
        ],
      },
      {
        eyebrow: "COMMITMENT",
        title: "What can we promise now?",
        intro:
          "Say what you can do and when you will report back. Check any delivery promise with the people doing the work.",
        fields: [
          field(
            "outcome",
            "What should this help customers or the business do?"
          ),
          field("known", "What do you know, and what evidence supports it?"),
          field("unknown", "What remains unknown, and why does it matter?"),
          field("commit", "What can you responsibly commit to now?"),
          field(
            "commitmentBounds",
            "What work, spending limit, and approvals are included in that promise?"
          ),
          field(
            "checkpoint",
            "What will you find out next, who will do it, and when will you report back?"
          ),
        ],
      },
      {
        eyebrow: "RESPOND",
        title: "Write the answer you'd actually say.",
        intro:
          "Show that you heard what they need. Say what you can offer now, what you still need to check, and when they will hear back.",
        fields: [
          field(
            "response",
            "Your message or meeting script",
            "Start with what they need. Explain what you can offer and ask whether it will help them decide. Put the supporting detail in Proposed Commitment."
          ),
          field("decisionNeeded", "What decision do you need from them?"),
          field("owner", "Who can make that decision?", undefined, "text"),
          field("decisionDate", "Decision needed by", undefined, "text"),
          decisionStatus,
          field(
            "finalDecision",
            "What did they actually agree or ask you to revise?"
          ),
          field(
            "nextAction",
            "What happens next, who will do it, and by when?"
          ),
        ],
      },
    ],
    outputs: outputs(
      ["request-decoder", "commitment-card", "stakeholder-response"],
      ["What They Need", "Proposed Commitment", "Your Reply"],
      [1, 2, 3]
    ),
    buildOutput: builders["stakeholder-response"],
  },
};

// Add shared follow-through without changing existing step numbers or draft keys.
for (const lab of Object.values(LEADERSHIP_LABS)) {
  lab.steps[3].fields.push(
    field(
      "unresolvedPlan",
      "If they say no, do not reply, or cannot make the decision, what will you do?",
      "Name who can decide, what you can do while waiting, and when you will ask again. Silence does not mean yes."
    )
  );
}
LEADERSHIP_LABS["deadline-reset"].steps[2].fields.push(
  field(
    "checkpointFallback",
    "If the next check shows the plan will not work, what will you do?",
    "Name the alternative, who can approve it, and when people need to be told. Do not quietly change the promise."
  )
);
LEADERSHIP_LABS["priority-whiplash"].steps[1].fields.push(
  field(
    "emergencyException",
    "If this is an emergency, who can interrupt the plan and when will you review it?",
    "Optional. Follow your incident process first. Record who approved the interruption, which work stops, and when the normal plan will be reviewed."
  )
);
LEADERSHIP_LABS["product-project-translator"].steps[3].fields.unshift(
  field(
    "spokenResponse",
    "Optional: what would you say in 30 seconds?",
    "Say what they need, what you can offer, and what you need them to decide. Use the longer message below for the written follow-up."
  )
);
