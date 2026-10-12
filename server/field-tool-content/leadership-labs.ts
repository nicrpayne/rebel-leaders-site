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
    "What is this situation bringing up for you?",
    "Private. Name the frustration before it writes your next message."
  ),
  field(
    "privateAssumption",
    "What are you assuming about the other person?",
    "Private. What will you ask instead of treating your interpretation as fact?"
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
const outputs = (ids: string[], titles: string[]) =>
  ids.map((id, index) => ({
    id,
    title: titles[index],
    fromStep: index === 0 ? 0 : index === 1 ? 1 : 3,
    build: builders[id],
  }));

export const LEADERSHIP_LABS: Record<string, LabConfig> = {
  "deadline-reset": {
    steps: [
      {
        eyebrow: "REALITY",
        title: "Let's separate the date from the promise.",
        intro:
          "Bring one commitment. You can respect why the date matters and still make the work visible.",
        fields: [
          field(
            "outcome",
            "What customer or team outcome are you trying to deliver?"
          ),
          field("date", "What date has been communicated?", undefined, "text"),
          field(
            "promise",
            "What was promised, and by whom?",
            "Quote the commitment. A forecast and a customer promise need different follow-up."
          ),
          field("fixed", "What is genuinely fixed?"),
          field(
            "constraintBasis",
            "Who or what confirms that constraint?",
            "Record the contract, event, accountable owner, or evidence. Check rather than assume."
          ),
          field(
            "assumed",
            "What has been assumed about scope, staffing, or dependencies?"
          ),
          field("unknown", "What still needs to be checked?"),
          ...privatePrep,
        ],
      },
      {
        eyebrow: "OPTIONS",
        title: "Give the room an actual choice.",
        intro:
          "Work with your lead to describe viable options. Adding people or cutting quality is not an automatic answer.",
        fields: [
          field(
            "scopeMove",
            "Keep the date: what smaller outcome could we deliver?",
            "Name what stays and what moves later. Ask Engineering to check feasibility."
          ),
          field(
            "dateMove",
            "Keep the scope: what date or range needs to be reconsidered?",
            "Use an evidence-based forecast when available. Otherwise record the assessment needed."
          ),
          field(
            "capacityMove",
            "Could capacity change responsibly?",
            "Include onboarding, specialist skills, review, and work displaced elsewhere."
          ),
          field(
            "qualityGuardrails",
            "What quality, security, or safety conditions stay protected?"
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
            "Why is that the right next move?",
            "Connect it to the customer outcome and acknowledge its cost."
          ),
        ],
      },
      {
        eyebrow: "CONFIDENCE",
        title: "Make your confidence explainable.",
        intro:
          "The Lab does not calculate a delivery probability. Explain your current judgment and the evidence that could change it.",
        fields: [
          choice("confidence", "Current confidence", [
            "Low",
            "Medium",
            "High",
            "Not assessed",
          ]),
          field(
            "confidenceScope",
            "Which scope and date does that assessment apply to?"
          ),
          field(
            "forecastBasis",
            "What evidence supports the assessment?",
            "Completed work, team forecast, dependency confirmation, remaining uncertainty. Label estimates as estimates."
          ),
          field(
            "evidenceNext",
            "What will we check next, and who will check it?"
          ),
          field(
            "checkpoint",
            "When is the next evidence checkpoint?",
            undefined,
            "text"
          ),
        ],
      },
      {
        eyebrow: "UPDATE",
        title: "Take a clear update back to leadership.",
        intro:
          "Ask for a decision. Record agreement only after the responsible person has made it.",
        fields: [
          field("decisionNeeded", "What decision do you need now?"),
          field("owner", "Who can make it?", undefined, "text"),
          field("decisionBy", "Decision needed by", undefined, "text"),
          decisionStatus,
          field(
            "finalDecision",
            "What response or agreement has actually been recorded?",
            "If you haven't met yet, leave this blank. Your update will remain a proposal."
          ),
          field(
            "communication",
            "Who needs the update, and who will communicate it?",
            "Include the owner of any external customer promise."
          ),
        ],
      },
    ],
    outputs: outputs(
      ["deadline-reality", "deadline-options", "deadline-update"],
      ["Reality Map", "Options Brief", "Stakeholder Update"]
    ),
    buildOutput: builders["deadline-update"],
  },
  "priority-whiplash": {
    steps: [
      {
        eyebrow: "THE STACK",
        title: "Let's put the competing work in one place.",
        intro:
          "Start with the commitments people already rely on. Your goal is a usable priority decision, not a longer list.",
        fields: [
          field("outcome", "What outcome or current goal are you protecting?"),
          field("p1", "Current commitment 1", undefined, "text"),
          field("p2", "Current commitment 2", undefined, "text"),
          field("p3", "Current commitment 3", undefined, "text"),
          field(
            "otherWork",
            "What other work uses the same capacity?",
            "Support, maintenance, review, meetings, and commitments outside the top three."
          ),
          field("newAsk", "What new request has arrived?"),
          field("whyNow", "Why does it need attention now?"),
          field(
            "urgencyBasis",
            "What confirms the urgency, and who benefits?",
            "An incident, customer commitment, event, or stakeholder hypothesis? Ask for the basis."
          ),
          ...privatePrep,
        ],
      },
      {
        eyebrow: "DISPLACEMENT",
        title: "Show what the new yes would change.",
        intro:
          "You can welcome a worthwhile opportunity while making its cost explicit. Use the optional capacity check as a conversation aid.",
        fields: [
          choice("priorityChoice", "Which move do you recommend?", [
            "Accept / displace named work",
            "Narrow the request",
            "Defer to a named checkpoint",
            "Decline this request",
          ]),
          field(
            "moves",
            "What moves, shrinks, or pauses?",
            "Name the specific commitment and the affected owner."
          ),
          field("impact", "Who is affected, and what is the consequence?"),
          field(
            "protected",
            "What must stay protected?",
            "Include essential safety, security, quality, and the current goal."
          ),
          field(
            "alternative",
            "What other option could meet the need?",
            "A narrower demo, another sequence, or a later slot. Include its consequence."
          ),
          field(
            "capacityWindow",
            "What planning window does the capacity check cover?",
            undefined,
            "text"
          ),
          field(
            "capacityBasis",
            "What supports the entered capacity and effort estimates?",
            "Use the same person-day units and window. Include review and support. Missing estimates stay unknown."
          ),
        ],
      },
      {
        eyebrow: "RECOMMEND",
        title: "Bring a recommendation to the person who can choose.",
        intro:
          "If this tradeoff is yours to decide, decide within your mandate. If it crosses that boundary, take it to the owner.",
        fields: [
          field(
            "recommendation",
            "What do you recommend, and why?",
            "State the benefit, displacement, and why it is worth that cost."
          ),
          field("decisionOwner", "Who owns the tradeoff?", undefined, "text"),
          field("decisionDate", "Decision needed by", undefined, "text"),
        ],
      },
      {
        eyebrow: "RECORD",
        title: "Record the choice and update the people it affects.",
        intro:
          "A recommendation is useful before the meeting. A decision record becomes useful after it. Keep those two states clear.",
        fields: [
          decisionStatus,
          field(
            "finalDecision",
            "What was actually decided?",
            "Record the choice and the person who made it. Leave blank before agreement."
          ),
          field(
            "communication",
            "Who will update the plan and affected stakeholders, and when?"
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
      ["Priority Stack", "Displacement Map", "Tradeoff Brief"]
    ),
    buildOutput: builders["tradeoff-brief"],
  },
  "mandate-reset": {
    steps: [
      {
        eyebrow: "ACCOUNTABILITY",
        title: "Let's name the decision you need.",
        intro:
          "Start with one outcome and one blocked lever. A specific request is easier to act on than a general complaint about empowerment.",
        fields: [
          field("outcome", "What outcome are you accountable for?"),
          field(
            "blockedDecision",
            "Which decision is blocking progress?",
            "For example: who may sequence new scope, approve spend, or resolve a dependency?"
          ),
          field(
            "consequence",
            "What is the business or team consequence of waiting?",
            "Use observable effects; attribute estimates."
          ),
          ...privatePrep,
        ],
      },
      {
        eyebrow: "DECISION RIGHTS",
        title: "Map the working reality, then verify it.",
        intro:
          "Titles don't always tell you who can decide. Mark unknown rights and ask the people involved to confirm the map.",
        fields: [
          field("recommend", "Who recommends?", undefined, "text"),
          field(
            "approve",
            "Who has the final decision right?",
            undefined,
            "text"
          ),
          field("execute", "Who executes the decision?", undefined, "text"),
          field("block", "Who can constrain or block it?", undefined, "text"),
          field(
            "accountable",
            "Who is accountable for the outcome?",
            undefined,
            "text"
          ),
          field(
            "rightsEvidence",
            "Which rights are confirmed, and what is still assumed?",
            "Record the policy, agreement, or person who can verify them."
          ),
          field(
            "requiredApprovals",
            "Which specialist or policy approvals remain necessary?",
            "Security, safety, legal, spending, or data access may have separate accountable owners."
          ),
        ],
      },
      {
        eyebrow: "RESET",
        title: "Ask for a right, a boundary, or a response rule.",
        intro:
          "You don't need unlimited authority. You need a workable way to make this particular decision.",
        fields: [
          field(
            "gap",
            "Where do accountability and authority diverge?",
            "Describe the observable decision path, without diagnosing motives."
          ),
          field(
            "request",
            "What specific reset are you requesting?",
            "Define which decision, who may make it, and the conditions."
          ),
          field(
            "boundaries",
            "What limits and approvals would that right have?"
          ),
          field(
            "fallback",
            "If authority cannot change, what escalation rule would work?",
            "Name the recipient, response time, and safe interim action."
          ),
        ],
      },
      {
        eyebrow: "REQUEST",
        title: "Make the request easy to respond to.",
        intro:
          "Take this to the person who can change the operating condition. Until agreement, it remains a request.",
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
            "When will you review the reset, and what would show it works?"
          ),
        ],
      },
    ],
    outputs: outputs(
      ["rights-map", "authority-gap", "mandate-request"],
      ["Decision Rights Map", "Authority Gap Statement", "Reset Request"]
    ),
    buildOutput: builders["mandate-request"],
  },
  "product-project-translator": {
    steps: [
      {
        eyebrow: "THE REQUEST",
        title: "Let's start with the sentence you heard.",
        intro:
          "Your stakeholder needs something they can use. We can answer that need without inventing certainty or giving a lecture about Product.",
        fields: [
          field("request", "What did they ask for?", "Use their actual words."),
          field("stakeholder", "Who is asking?", undefined, "text"),
          field(
            "context",
            "What decision or coordination problem are they facing?"
          ),
          ...privatePrep,
        ],
      },
      {
        eyebrow: "DECODE",
        title: "Check the need beneath the words.",
        intro:
          "Budget, a customer message, sequencing, or accountability? Treat your first interpretation as a question to ask.",
        fields: [
          choice("need", "Primary coordination need", [
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
            "Some work is well understood and can be planned. Identify the actual uncertainty in this request."
          ),
        ],
      },
      {
        eyebrow: "COMMITMENT",
        title: "Offer something dependable now.",
        intro:
          "Commit to work and evidence you can own. Coordinate any forecast or delivery promise with the people who will do the work.",
        fields: [
          field(
            "outcome",
            "What customer or business outcome are we pursuing?"
          ),
          field("known", "What do you know, and what evidence supports it?"),
          field("unknown", "What remains unknown, and why does it matter?"),
          field("commit", "What can you responsibly commit to now?"),
          field(
            "commitmentBounds",
            "What scope, budget, quality, or approval conditions bound it?"
          ),
          field(
            "checkpoint",
            "What evidence arrives next, who owns it, and when?"
          ),
        ],
      },
      {
        eyebrow: "RESPOND",
        title: "Write the answer you'd actually say.",
        intro:
          "Recognize their need. Say what you can offer now, what remains open, and when the next decision becomes possible.",
        fields: [
          field(
            "response",
            "Your message or meeting script",
            "Keep the first version to a short paragraph. Put the detail in the Commitment Card."
          ),
          field("decisionNeeded", "What decision do you need from them?"),
          field("owner", "Who owns that decision?", undefined, "text"),
          field("decisionDate", "Decision needed by", undefined, "text"),
          decisionStatus,
          field(
            "finalDecision",
            "What did they actually agree or ask you to revise?"
          ),
          field("nextAction", "What is the next action, owner, and date?"),
        ],
      },
    ],
    outputs: outputs(
      ["request-decoder", "commitment-card", "stakeholder-response"],
      ["Request Decoder", "Commitment Card", "Stakeholder Response"]
    ),
    buildOutput: builders["stakeholder-response"],
  },
};
