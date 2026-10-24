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
          "Start with the customer message, not the date you think Sales meant. Record what was actually promised and what Engineering has confirmed. Leave unknowns as questions to take back to them.",
        fields: [
          field(
            "outcome",
            "What should customers or the team be able to do when this is finished?"
          ),
          field("date", "What date were people given?", undefined, "text"),
          field(
            "promise",
            "What was promised, and by whom?",
            "Use the words people were told. Was this an estimate, a target, or a promise they are relying on?"
          ),
          field("fixed", "What can’t change, and why?"),
          field(
            "constraintBasis",
            "How do you know it can’t change?",
            "For example, the event is booked or a contract sets the date. Name the person who confirmed it."
          ),
          field(
            "assumed",
            "What are we assuming about the work, the people available, or help from other teams?"
          ),
          field("unknown", "What still needs to be checked?"),
          field(
            "privateReaction",
            "What is hardest about going back to Sales with this?",
            "Are you worried about being blamed, repeating an unchecked promise, or asking the team to rescue the date?"
          ),
          field(
            "privateAssumption",
            "What are you assuming about how the date was promised?",
            "Just for you. What do you need to ask before treating that as true?"
          ),
        ],
      },
      {
        eyebrow: "OPTIONS",
        title: "What could we change?",
        intro:
          "Compare options with the engineering lead before taking them to Sales. A smaller release still needs its checks; a demonstration needs to be clearly described as a demonstration.",
        fields: [
          field(
            "scopeMove",
            "If we keep the date, what could be ready and what would come later?",
            "Be specific about what customers would get. Ask the engineering lead to check whether it can be done."
          ),
          field(
            "dateMove",
            "If all the promised work must be ready together, when could we finish?",
            "Use the team's estimate and explain what it depends on. If they don’t know yet, say what they need to check."
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
          "What gives you confidence in this plan, and what still needs checking? We’re putting your judgment into words here; the Lab doesn’t calculate the chance of meeting the date.",
        fields: [
          choice("confidence", "How confident are you?", [
            "Low",
            "Medium",
            "High",
            "Not assessed",
          ]),
          field(
            "confidenceScope",
            "Which work and finish date does that confidence apply to?"
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
          "Prepare the decision you need from the person who made the customer promise. Include the conditions Engineering gave you and who will explain any change to the customer. Come back after the conversation to record the answer.",
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
          "List the customer work already promised and the new request competing with it. Check whether a developer has already been asked to start. You are preparing a choice, not finding room for everything.",
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
          field(
            "privateReaction",
            "What makes this request hard to answer?",
            "Are you tempted to say yes before checking, or to dismiss the request before hearing what the customer needs?"
          ),
          field(
            "privateAssumption",
            "What are you assuming about why this is urgent?",
            "Just for you. What do you need to ask before treating that as true?"
          ),
        ],
      },
      {
        eyebrow: "WHAT CHANGES",
        title: "If we take this on, what would have to wait?",
        intro:
          "Ask the team what would stop if this request starts. Check the skills and review time needed, not just the total hours. Use the time check as a rough comparison, then explain the choice in words.",
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
            "What would the customer miss if you used existing sketches? Compare that with making another customer wait for a fix. Explain which choice you recommend."
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
          "You have looked at the options. Which would you choose, and why? If the call is yours, explain it to the people affected. Otherwise, take your recommendation to the person who can decide.",
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
          "Your brief can help you start the conversation. Keep it as a proposal for now, then come back to add what was decided and who needs to know.",
        fields: [
          decisionStatus,
          field(
            "finalDecision",
            "What was actually decided?",
            "After the conversation, add the choice and who made it. You can leave this blank until then."
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
          "Bring one decision you tried to make and what happened next. Did someone override it, leave it unanswered, or expect you to settle conflicting instructions? Use a real sequence you can discuss with your manager.",
        fields: [
          field("outcome", "What are you expected to deliver or improve?"),
          field(
            "blockedDecision",
            "Which decision is blocking progress?",
            "For example, you’re expected to meet the release date but can’t postpone new feature requests."
          ),
          field(
            "consequence",
            "What happens while we wait for that decision?",
            "Say what gets delayed, who gets conflicting instructions, or which customer is affected. Explain where any estimates came from."
          ),
          field(
            "privateReaction",
            "What worries you about raising this with your manager?",
            "Are you worried it will sound like you cannot handle the role? Start with what happened to one decision."
          ),
          field(
            "privateAssumption",
            "What do you think your manager believes you can already decide?",
            "Just for you. What do you need to ask before treating that as true?"
          ),
        ],
      },
      {
        eyebrow: "WHO DECIDES",
        title: "Who does what when this decision comes up?",
        intro:
          "Who gets involved in this decision? Start with the people you know. If you’re unsure about someone’s role, note it here so you can ask them.",
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
          "What permission and backing do you need from your manager? If they keep the decision, ask how quickly they will answer and what the team should do when another director gives a different instruction.",
        fields: [
          field(
            "gap",
            "What are you responsible for that you can’t decide?",
            "Describe what happens. For example: directors add work, I can’t put it off, but I’m still expected to meet the original date."
          ),
          field(
            "request",
            "What change are you asking for?",
            "Name the decision, its limits, and what your manager needs to do when someone challenges or bypasses it."
          ),
          field("boundaries", "What limits and approvals would still apply?"),
          field(
            "fallback",
            "If you can’t make the call, how will you get an answer?",
            "Who will you ask, how soon should they respond, and what will the team do while waiting?"
          ),
        ],
      },
      {
        eyebrow: "REQUEST",
        title: "Make the request easy to respond to.",
        intro:
          "Let’s get your request ready for the person who can agree to it. Add when you need an answer, then return after the conversation to record what they said.",
        fields: [
          field("owner", "Who needs to act?", undefined, "text"),
          field("date", "Response needed by", undefined, "text"),
          decisionStatus,
          field("finalDecision", "What did they say?"),
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
  "when-the-team-goes-quiet": {
    steps: [
      {
        eyebrow: "NOTICE",
        title: "Think of one meeting.",
        intro:
          "Choose a planning or review meeting where you asked for input but heard the concern afterward. What did you say or do just before the room went quiet?",
        fields: [
          {
            id: "moment",
            label: "What happened in the meeting?",
            type: "textarea",
            hint: "Describe what you saw or heard. Leave out names and anything shared with you in confidence.",
          },
          {
            id: "effect",
            label: "What might we be missing because of it?",
            type: "textarea",
            hint: "A question left unanswered, a problem found too late, or something else you need to check.",
          },
          {
            id: "privateReaction",
            label: "What is your first reaction?",
            type: "textarea",
            hint: "Just for you. What might make it hard to hear the answer?",
          },
          {
            id: "privateAssumption",
            label: "What are you assuming about the silence?",
            type: "textarea",
            hint: "Just for you. What else might explain it?",
          },
        ],
      },
      {
        eyebrow: "INVITE",
        title: "How will you bring it up?",
        intro:
          "Choose one person and a way to ask that gives them room to answer. You don’t need a polished speech.",
        fields: [
          {
            id: "person",
            label: "Who do you want to speak with?",
            type: "text",
            hint: "A role is enough.",
          },
          {
            id: "setting",
            label: "How will you invite the conversation?",
            type: "textarea",
            hint: "Offer a time or a way to reply. They can say they’d rather not.",
          },
          {
            id: "opening",
            label: "What will you say to begin?",
            type: "textarea",
            hint: "If you interrupted or brushed something aside, acknowledge that first.",
          },
          {
            id: "question",
            label: "What do you want to ask them?",
            type: "textarea",
            hint: "One question is enough to start. Give them time to answer.",
          },
        ],
      },
      {
        eyebrow: "LISTEN",
        title: "What did you hear?",
        intro:
          "Use this after you’ve talked, or to practise with the example. Check your understanding with the person before deciding what to do.",
        fields: [
          {
            id: "understanding",
            label: "What can you safely carry forward?",
            type: "textarea",
            hint: "Leave this blank until you’ve talked. Keep only the work issue or wording the person is comfortable sharing. Private details belong in the optional notes below.",
          },
          {
            id: "myChange",
            label: "What could you do differently?",
            type: "textarea",
            hint: "Choose something you control. You can propose it, then ask whether it would help.",
          },
          {
            id: "sharePermission",
            label: "What did you agree could be shared?",
            type: "textarea",
            hint: "If you haven’t asked, say so. Don’t repeat a private comment or identify its source without checking.",
          },
          {
            id: "quietHeard",
            label: "Private: what did they say?",
            type: "textarea",
            hint: "Optional. These notes disappear when you refresh or leave. They are never saved or exported.",
          },
          {
            id: "quietCorrection",
            label: "Private: what did they correct when you said it back?",
            type: "textarea",
            hint: "Try: “Let me check I’ve got this.” Record the correction privately; only carry forward what they are comfortable sharing.",
          },
        ],
      },
      {
        eyebrow: "FOLLOW THROUGH",
        title: "What will happen next?",
        intro:
          "Keep this short. What will you do, when will you do it, and how will you find out whether it helped?",
        fields: [
          {
            id: "decisionStatus",
            label: "Where are you with this?",
            type: "select",
            options: [
              "PROPOSAL — not discussed yet",
              "DISCUSSED — no change agreed",
              "AGREED — change recorded",
            ],
          },
          {
            id: "finalDecision",
            label: "What, if anything, did you agree together?",
            type: "textarea",
            hint: "Leave blank if you haven’t talked. A plan you’ve written is still a proposal.",
          },
          {
            id: "nextAction",
            label: "What will you do next, and when?",
            type: "textarea",
          },
          {
            id: "checkpoint",
            label: "When will you check back, and what will you ask?",
            type: "textarea",
            hint: "Ask about what happened, rather than rating how safe or open the team is.",
          },
          {
            id: "teamUpdate",
            label: "Optional: a short note you’re comfortable sharing",
            type: "textarea",
            hint: "Include your action and when you’ll check back. Leave out the private conversation.",
          },
        ],
      },
    ],
    outputs: outputs(
      ["quiet-conversation", "quiet-change", "quiet-follow-through"],
      ["Your Conversation Plan", "A Change to Try", "Your Follow-through"],
      [1, 2, 3]
    ),
    buildOutput: builders["quiet-follow-through"],
  },
};

// Add shared follow-through without changing existing step numbers or draft keys.
for (const [slug, lab] of Object.entries(LEADERSHIP_LABS)) {
  if (slug === "when-the-team-goes-quiet") continue;
  lab.steps[3].fields.push(
    field(
      "unresolvedPlan",
      "If they say no, don’t reply, or can’t make the decision, what will you do?",
      "Name who can decide, what you can do while waiting, and when you’ll ask again. Silence doesn’t mean yes."
    )
  );
}
LEADERSHIP_LABS["deadline-reset"].steps[2].fields.push(
  field(
    "checkpointFallback",
    "If the next check shows the plan won’t work, what will you do?",
    "What could you do instead, who would need to agree, and when would you tell the people relying on the original promise?"
  )
);
LEADERSHIP_LABS["priority-whiplash"].steps[1].fields.push(
  field(
    "emergencyException",
    "If this is an emergency, who can interrupt the plan and when will you review it?",
    "Optional. Follow your incident process first. Record who approved the interruption, which work stops, and when the normal plan will be reviewed."
  )
);
