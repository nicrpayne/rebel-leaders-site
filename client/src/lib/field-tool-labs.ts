import {
  buildAITrialPackage,
  buildTrialCard,
  buildEvidenceRecord,
  buildDecisionBrief,
} from "./ai-trial";

type FieldType = "text" | "textarea" | "select";

export type FieldDef = {
  id: string;
  label: string;
  hint?: string;
  section?: string;
  type?: FieldType;
  options?: string[];
};

type StepDef = {
  eyebrow: string;
  title: string;
  intro: string;
  fields: FieldDef[];
};

type LabConfig = {
  steps: StepDef[];
  buildOutput: (v: Record<string, string>) => string;
  outputs?: Array<{
    id: string;
    title: string;
    fromStep: number;
    build: (v: Record<string, string>) => string;
  }>;
};

export const FIELD_LABS: Record<string, LabConfig> = {
  "ai-stalemate": {
    steps: [
      {
        eyebrow: "PRIVATE PREP",
        title: "Start with your side of the table.",
        intro:
          "Separate observation from interpretation. Your counterpart does not need to see this page.",
        fields: [
          {
            id: "side",
            label: "Which side are you starting from?",
            type: "select",
            options: ["Product / Leadership", "Engineering / Tech Leadership"],
          },
          {
            id: "happened",
            label: "What actually happened?",
            type: "textarea",
            hint: "Use actual words, requests, or events where you can.",
          },
          {
            id: "story",
            label: "What story are you adding about the other person's motive?",
            type: "textarea",
          },
          {
            id: "protecting",
            label:
              "What opportunity, cost, or responsibility are you protecting?",
            type: "textarea",
          },
          {
            id: "observed",
            label: "What have you actually observed?",
            type: "textarea",
          },
          {
            id: "prediction",
            label: "What is still prediction?",
            type: "textarea",
          },
          {
            id: "changeMind",
            label: "What would change your mind?",
            type: "textarea",
          },
          {
            id: "askOther",
            label: "What do you still need to ask the other person?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "SHARED WORK",
        title: "Design one test you could both believe.",
        intro:
          "If existing evidence already answers the question, use it. If approval or ownership is missing, pause and name the prerequisite.",
        fields: [
          {
            id: "outcome",
            section: "01 / BOUND THE WORK",
            label: "What work outcome are we trying to improve?",
            type: "textarea",
          },
          {
            id: "task",
            label: "Exact task — and what is explicitly out of scope",
            type: "textarea",
          },
          {
            id: "comparator",
            label:
              "Comparator — what work without AI will you compare against?",
            type: "textarea",
            hint: "Name the comparable task and why its complexity, quality bar, and experience are similar.",
          },
          {
            id: "tool",
            label: "AI tool",
            type: "text",
            section: "02 / TOOL AND PERMISSION",
          },
          { id: "toolVersion", label: "Tool / model version", type: "text" },
          {
            id: "inputs",
            label: "Allowed inputs and data boundaries",
            type: "textarea",
          },
          {
            id: "approvalOwner",
            label: "Who approves the tool and these inputs?",
            type: "text",
          },
          {
            id: "qualityBar",
            section: "03 / QUALITY AND CAPACITY",
            label: "Acceptance checks and accountable engineering owner",
            type: "textarea",
          },
          {
            id: "capacity",
            label: "Protected time, reviewer time, and work displaced",
            type: "textarea",
          },
          {
            id: "success",
            label: "Success bar",
            type: "textarea",
            section: "04 / THE BAR AND OWNERS",
          },
          { id: "stop", label: "Stop rule", type: "textarea" },
          {
            id: "owners",
            label: "Task owner, reviewer, decision owner, review date",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "EVIDENCE",
        title: "Count the full cost.",
        intro:
          "Drafting speed is not team productivity if the burden simply moves to verification, review, rework, or later defects.",
        fields: [
          {
            id: "comparability",
            label: "What limits the comparison?",
            type: "textarea",
            hint: "Different task size, author experience, first-use learning, or changed quality bar?",
          },
          {
            id: "withoutAi",
            label: "Without-AI workflow notes",
            type: "textarea",
          },
          { id: "withAi", label: "With-AI workflow notes", type: "textarea" },
          {
            id: "quality",
            label: "Quality checks, defects, and reviewer experience",
            type: "textarea",
          },
          {
            id: "otherCosts",
            label: "Elapsed time, tool cost, and learning effects",
            type: "textarea",
            hint: "Person-minutes above are effort, not elapsed time or a financial ROI calculation.",
          },
          {
            id: "laterCheck",
            label: "Later defect check — what, who, and when?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "DECISION",
        title: "Continue, revise, stop, or pause.",
        intro:
          "A failed use case can be a successful leadership outcome if it gives you evidence you can act on.",
        fields: [
          {
            id: "decision",
            label: "Decision",
            type: "select",
            options: ["CONTINUE", "REVISE", "STOP", "PAUSE"],
          },
          {
            id: "reason",
            label: "Reason and unresolved disagreement",
            type: "textarea",
          },
          {
            id: "limits",
            label: "What this evidence does not establish",
            type: "textarea",
          },
          {
            id: "next",
            label: "Next action, accountable owner, and date",
            type: "textarea",
          },
          {
            id: "leadershipUpdate",
            label: "One-sentence update to leadership",
            type: "textarea",
          },
        ],
      },
    ],
    buildOutput: buildAITrialPackage,
    outputs: [
      {
        id: "trial-card",
        title: "Trial Card",
        fromStep: 1,
        build: buildTrialCard,
      },
      {
        id: "evidence-record",
        title: "Evidence Record",
        fromStep: 2,
        build: buildEvidenceRecord,
      },
      {
        id: "decision-brief",
        title: "Decision Brief",
        fromStep: 3,
        build: buildDecisionBrief,
      },
      {
        id: "working-record",
        title: "Full working record",
        fromStep: 3,
        build: buildAITrialPackage,
      },
    ],
  },

  "deadline-reset": {
    steps: [
      {
        eyebrow: "REALITY MAP",
        title: "Separate the promise from the reality.",
        intro:
          "The goal is not to make the date disappear. It is to make the actual constraint visible.",
        fields: [
          {
            id: "date",
            label: "What date has been communicated?",
            type: "text",
          },
          {
            id: "promise",
            label: "What exactly was promised — and by whom?",
            type: "textarea",
          },
          {
            id: "fixed",
            label: "What is genuinely fixed?",
            type: "textarea",
            hint: "Regulatory window, event, contract, dependency, public commitment...",
          },
          {
            id: "assumed",
            label: "What is currently assumed?",
            type: "textarea",
          },
          {
            id: "unknown",
            label: "What important facts are still unknown?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "TRADEOFF",
        title: "If the date is fixed, something else has to move.",
        intro:
          "Make the trade explicit rather than asking the team to absorb it invisibly.",
        fields: [
          {
            id: "scopeMove",
            label: "What scope can shrink, sequence, or move?",
            type: "textarea",
          },
          {
            id: "capacityMove",
            label: "Can capacity change responsibly? If so, how?",
            type: "textarea",
          },
          {
            id: "qualityGuardrails",
            label: "Which quality / safety guardrails will not be traded away?",
            type: "textarea",
          },
          {
            id: "consequence",
            label: "What is the consequence if nothing changes?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "CONFIDENCE",
        title: "Say what you know without pretending certainty.",
        intro: "A forecast should become more useful as evidence arrives.",
        fields: [
          {
            id: "confidence",
            label: "Current confidence",
            type: "select",
            options: ["Low", "Medium", "High"],
          },
          {
            id: "evidenceNext",
            label: "What evidence will materially change confidence?",
            type: "textarea",
          },
          {
            id: "checkpoint",
            label: "Next checkpoint / decision date",
            type: "text",
          },
          {
            id: "decisionNeeded",
            label: "What decision do you need from stakeholders now?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "STAKEHOLDER UPDATE",
        title: "Turn uncertainty into a responsible update.",
        intro:
          "Give stakeholders something they can coordinate around without turning a forecast into theater.",
        fields: [
          { id: "owner", label: "Who owns the next decision?", type: "text" },
        ],
      },
    ],
    buildOutput: v => `DEADLINE RESET — STAKEHOLDER UPDATE

CURRENT COMMITMENT
The communicated date is ${v.date || "[date]"}.
The current promise is: ${v.promise || "[promise not entered]"}.

WHAT IS ACTUALLY FIXED
${v.fixed || "[not entered]"}

WHAT IS STILL ASSUMED / UNKNOWN
Assumptions: ${v.assumed || "[not entered]"}
Unknowns: ${v.unknown || "[not entered]"}

TRADEOFF
To protect the date, the responsible scope/capacity move is:
Scope / sequence: ${v.scopeMove || "[not entered]"}
Capacity: ${v.capacityMove || "[not entered]"}

IF NOTHING CHANGES
${v.consequence || "[not entered]"}

GUARDRAILS WE WILL NOT TRADE
${v.qualityGuardrails || "[not entered]"}

CURRENT CONFIDENCE
${v.confidence || "[not selected]"}

WHAT CHANGES CONFIDENCE NEXT
${v.evidenceNext || "[not entered]"}

DECISION NEEDED NOW
${v.decisionNeeded || "[not entered]"}

NEXT CHECKPOINT / OWNER
${v.checkpoint || "[date]"} — ${v.owner || "[owner]"}`,
  },

  "priority-whiplash": {
    steps: [
      {
        eyebrow: "THE STACK",
        title: "Put all the work on one surface.",
        intro:
          "Priority problems hide when every request is discussed in isolation.",
        fields: [
          { id: "p1", label: "Current priority 1", type: "text" },
          { id: "p2", label: "Current priority 2", type: "text" },
          { id: "p3", label: "Current priority 3", type: "text" },
          { id: "newAsk", label: "New urgent request", type: "textarea" },
          { id: "whyNow", label: "Why is it urgent now?", type: "textarea" },
        ],
      },
      {
        eyebrow: "DISPLACEMENT",
        title: "Every new yes is also a no.",
        intro: "If the new work enters, name what actually changes.",
        fields: [
          {
            id: "moves",
            label: "What moves, shrinks, or stops?",
            type: "textarea",
          },
          {
            id: "impact",
            label: "What is the consequence of that displacement?",
            type: "textarea",
          },
          {
            id: "protected",
            label: "What must remain protected?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "DECISION",
        title: "Put the tradeoff with the person who owns it.",
        intro:
          "The team should not quietly make a strategy decision by working harder.",
        fields: [
          {
            id: "decisionOwner",
            label: "Who owns this tradeoff?",
            type: "text",
          },
          {
            id: "recommendation",
            label: "Your recommendation",
            type: "textarea",
          },
          { id: "decisionDate", label: "Decision needed by", type: "text" },
        ],
      },
      {
        eyebrow: "BRIEF",
        title: "Make the choice portable.",
        intro:
          "Leave the conversation with a record of what entered, what moved, and why.",
        fields: [
          { id: "finalDecision", label: "Decision made", type: "textarea" },
        ],
      },
    ],
    buildOutput: v => `PRIORITY WHIPLASH — TRADEOFF BRIEF

CURRENT PRIORITIES
1. ${v.p1 || "[not entered]"}
2. ${v.p2 || "[not entered]"}
3. ${v.p3 || "[not entered]"}

NEW REQUEST
${v.newAsk || "[not entered]"}

WHY NOW
${v.whyNow || "[not entered]"}

IF THIS ENTERS, WHAT MOVES
${v.moves || "[not entered]"}

CONSEQUENCE
${v.impact || "[not entered]"}

WHAT STAYS PROTECTED
${v.protected || "[not entered]"}

RECOMMENDATION
${v.recommendation || "[not entered]"}

DECISION OWNER / DATE
${v.decisionOwner || "[owner]"} — ${v.decisionDate || "[date]"}

FINAL DECISION
${v.finalDecision || "[not entered]"}`,
  },

  "mandate-reset": {
    steps: [
      {
        eyebrow: "ACCOUNTABILITY",
        title: "Name what you're being held responsible for.",
        intro: "Start with the outcome, not the org chart.",
        fields: [
          {
            id: "outcome",
            label: "Outcome you are accountable for",
            type: "textarea",
          },
          {
            id: "blockedDecision",
            label: "Decision you need but cannot actually make",
            type: "textarea",
          },
          {
            id: "consequence",
            label: "What happens while this remains unresolved?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "DECISION RIGHTS",
        title: "Map the real decision path.",
        intro:
          "Recommendation, approval, execution, veto, and accountability are not the same thing.",
        fields: [
          { id: "recommend", label: "Who recommends?", type: "text" },
          { id: "approve", label: "Who can approve / decide?", type: "text" },
          { id: "execute", label: "Who executes?", type: "text" },
          {
            id: "block",
            label: "Who can block or materially constrain?",
            type: "text",
          },
          {
            id: "accountable",
            label: "Who is held accountable for the outcome?",
            type: "text",
          },
        ],
      },
      {
        eyebrow: "THE GAP",
        title: "Turn frustration into a specific reset.",
        intro:
          "Do not ask for vague empowerment. Ask for a decision right, an owner, or an escalation path.",
        fields: [
          {
            id: "gap",
            label: "Where exactly do accountability and authority diverge?",
            type: "textarea",
          },
          {
            id: "request",
            label: "What specific reset are you requesting?",
            type: "textarea",
          },
          {
            id: "fallback",
            label:
              "If that cannot change, what escalation or operating rule is needed?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "ESCALATION BRIEF",
        title: "Make the system problem visible without drama.",
        intro:
          "The brief should let leadership fix the operating condition rather than evaluate your attitude.",
        fields: [
          { id: "owner", label: "Who needs to act?", type: "text" },
          { id: "date", label: "Decision / reset needed by", type: "text" },
        ],
      },
    ],
    buildOutput: v => `MANDATE RESET — DECISION RIGHTS BRIEF

OUTCOME I AM ACCOUNTABLE FOR
${v.outcome || "[not entered]"}

DECISION I CANNOT CURRENTLY MAKE
${v.blockedDecision || "[not entered]"}

CURRENT DECISION PATH
Recommend: ${v.recommend || "[unknown]"}
Approve / decide: ${v.approve || "[unknown]"}
Execute: ${v.execute || "[unknown]"}
Can block: ${v.block || "[unknown]"}
Held accountable: ${v.accountable || "[unknown]"}

THE AUTHORITY GAP
${v.gap || "[not entered]"}

CONSEQUENCE IF UNRESOLVED
${v.consequence || "[not entered]"}

REQUESTED RESET
${v.request || "[not entered]"}

IF THAT CANNOT CHANGE
${v.fallback || "[not entered]"}

ACTION OWNER / DATE
${v.owner || "[owner]"} — ${v.date || "[date]"}`,
  },

  "product-project-translator": {
    steps: [
      {
        eyebrow: "THE REQUEST",
        title: "Start with the sentence you actually heard.",
        intro:
          "The request may be reasonable even when the operating assumption underneath it is not.",
        fields: [
          {
            id: "request",
            label: "What did they ask for?",
            type: "textarea",
            hint: "Example: Give me the final requirements and a committed date.",
          },
          { id: "stakeholder", label: "Who is asking?", type: "text" },
          {
            id: "context",
            label: "What are they trying to coordinate or protect?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "DECODE",
        title: "Find the need beneath the project language.",
        intro: "Most certainty requests are really requests for coordination.",
        fields: [
          {
            id: "need",
            label: "Primary underlying need",
            type: "select",
            options: [
              "Confidence",
              "Budget / staffing",
              "Sequencing",
              "Customer communication",
              "Accountability",
              "Risk management",
            ],
          },
          {
            id: "assumption",
            label:
              "What assumption about product work is embedded in the request?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "PRODUCT REALITY",
        title: "Say what the work can responsibly support.",
        intro:
          "Do not answer uncertainty with vagueness. Replace false certainty with useful evidence.",
        fields: [
          { id: "known", label: "What do we know now?", type: "textarea" },
          { id: "unknown", label: "What remains unknown?", type: "textarea" },
          {
            id: "commit",
            label: "What can we responsibly commit to?",
            type: "textarea",
          },
          {
            id: "checkpoint",
            label: "What evidence / checkpoint comes next?",
            type: "textarea",
          },
        ],
      },
      {
        eyebrow: "TRANSLATION",
        title: "Give the room a better answer.",
        intro:
          "Meet the coordination need without pretending the work is more knowable than it is.",
        fields: [
          {
            id: "response",
            label: "Draft your final response / meeting script",
            type: "textarea",
          },
        ],
      },
    ],
    buildOutput: v => `PRODUCT / PROJECT TRANSLATOR

ORIGINAL REQUEST
"${v.request || "[not entered]"}"

WHO IS ASKING
${v.stakeholder || "[not entered]"}

WHAT THEY LIKELY NEED
${v.need || "[not selected]"}
Context: ${v.context || "[not entered]"}

PROJECT ASSUMPTION TO TRANSLATE
${v.assumption || "[not entered]"}

PRODUCT REALITY
Known now: ${v.known || "[not entered]"}
Still unknown: ${v.unknown || "[not entered]"}
We can responsibly commit to: ${v.commit || "[not entered]"}
Next evidence / checkpoint: ${v.checkpoint || "[not entered]"}

RESPONSIBLE RESPONSE
${v.response || "[not entered]"}`,
  },
};
