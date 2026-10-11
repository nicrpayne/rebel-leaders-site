import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { getFieldTool } from "@/lib/field-tools";

type FieldType = "text" | "textarea" | "select";

type FieldDef = {
  id: string;
  label: string;
  hint?: string;
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
};

const CONFIGS: Record<string, LabConfig> = {
  "ai-stalemate": {
    steps: [
      {
        eyebrow: "PRIVATE PREP",
        title: "Start with your side of the table.",
        intro: "Separate observation from interpretation. Your counterpart does not need to see this page.",
        fields: [
          { id: "side", label: "Which side are you starting from?", type: "select", options: ["Product / Leadership", "Engineering / Tech Leadership"] },
          { id: "happened", label: "What actually happened?", type: "textarea", hint: "Use actual words, requests, or events where you can." },
          { id: "story", label: "What story are you adding about the other person's motive?", type: "textarea" },
          { id: "protecting", label: "What opportunity, cost, or responsibility are you protecting?", type: "textarea" },
          { id: "observed", label: "What have you actually observed?", type: "textarea" },
          { id: "prediction", label: "What is still prediction?", type: "textarea" },
          { id: "changeMind", label: "What would change your mind?", type: "textarea" },
        ],
      },
      {
        eyebrow: "SHARED WORK",
        title: "Design one test you could both believe.",
        intro: "If existing evidence already answers the question, use it. If approval or ownership is missing, pause and name the prerequisite.",
        fields: [
          { id: "outcome", label: "What work outcome are we trying to improve?", type: "textarea" },
          { id: "task", label: "Exact task — and what is explicitly out of scope", type: "textarea" },
          { id: "tool", label: "Tool / version / approved inputs / approval owner", type: "textarea" },
          { id: "qualityBar", label: "Acceptance checks and accountable engineering owner", type: "textarea" },
          { id: "capacity", label: "Protected time, reviewer time, and work displaced", type: "textarea" },
          { id: "success", label: "Success bar", type: "textarea" },
          { id: "stop", label: "Stop rule", type: "textarea" },
          { id: "owners", label: "Task owner, reviewer, decision owner, review date", type: "textarea" },
        ],
      },
      {
        eyebrow: "EVIDENCE",
        title: "Count the full cost.",
        intro: "Drafting speed is not team productivity if the burden simply moves to verification, review, rework, or later defects.",
        fields: [
          { id: "withoutAi", label: "Comparable effort without AI", type: "textarea", hint: "Setup + implementation + verification + review + rework." },
          { id: "withAi", label: "Comparable effort with AI", type: "textarea" },
          { id: "quality", label: "Quality, defects, reviewer experience, and other evidence", type: "textarea" },
        ],
      },
      {
        eyebrow: "DECISION",
        title: "Continue, revise, stop, or pause.",
        intro: "A failed use case can be a successful leadership outcome if it gives you evidence you can act on.",
        fields: [
          { id: "decision", label: "Decision", type: "select", options: ["CONTINUE", "REVISE", "STOP", "PAUSE"] },
          { id: "reason", label: "Reason and unresolved disagreement", type: "textarea" },
          { id: "limits", label: "What this evidence does not establish", type: "textarea" },
          { id: "next", label: "Next action, accountable owner, and date", type: "textarea" },
        ],
      },
    ],
    buildOutput: (v) => `AI STALEMATE — DECISION BRIEF

WORK OUTCOME
${v.outcome || "[not entered]"}

TESTED TASK
${v.task || "[not entered]"}

EVIDENCE
Without AI: ${v.withoutAi || "[not entered]"}
With AI: ${v.withAi || "[not entered]"}
Quality / reviewer evidence: ${v.quality || "[not entered]"}

DECISION
${v.decision || "[not selected]"}

WHY
${v.reason || "[not entered]"}

LIMITS
${v.limits || "[not entered]"}

NEXT ACTION / OWNER / DATE
${v.next || "[not entered]"}`,
  },

  "deadline-reset": {
    steps: [
      {
        eyebrow: "REALITY MAP",
        title: "Separate the promise from the reality.",
        intro: "The goal is not to make the date disappear. It is to make the actual constraint visible.",
        fields: [
          { id: "date", label: "What date has been communicated?", type: "text" },
          { id: "promise", label: "What exactly was promised — and by whom?", type: "textarea" },
          { id: "fixed", label: "What is genuinely fixed?", type: "textarea", hint: "Regulatory window, event, contract, dependency, public commitment..." },
          { id: "assumed", label: "What is currently assumed?", type: "textarea" },
          { id: "unknown", label: "What important facts are still unknown?", type: "textarea" },
        ],
      },
      {
        eyebrow: "TRADEOFF",
        title: "If the date is fixed, something else has to move.",
        intro: "Make the trade explicit rather than asking the team to absorb it invisibly.",
        fields: [
          { id: "scopeMove", label: "What scope can shrink, sequence, or move?", type: "textarea" },
          { id: "capacityMove", label: "Can capacity change responsibly? If so, how?", type: "textarea" },
          { id: "qualityGuardrails", label: "Which quality / safety guardrails will not be traded away?", type: "textarea" },
          { id: "consequence", label: "What is the consequence if nothing changes?", type: "textarea" },
        ],
      },
      {
        eyebrow: "CONFIDENCE",
        title: "Say what you know without pretending certainty.",
        intro: "A forecast should become more useful as evidence arrives.",
        fields: [
          { id: "confidence", label: "Current confidence", type: "select", options: ["Low", "Medium", "High"] },
          { id: "evidenceNext", label: "What evidence will materially change confidence?", type: "textarea" },
          { id: "checkpoint", label: "Next checkpoint / decision date", type: "text" },
          { id: "decisionNeeded", label: "What decision do you need from stakeholders now?", type: "textarea" },
        ],
      },
      {
        eyebrow: "STAKEHOLDER UPDATE",
        title: "Turn uncertainty into a responsible update.",
        intro: "Give stakeholders something they can coordinate around without turning a forecast into theater.",
        fields: [
          { id: "owner", label: "Who owns the next decision?", type: "text" },
          { id: "tone", label: "Tone", type: "select", options: ["Direct", "Collaborative", "Executive concise"] },
        ],
      },
    ],
    buildOutput: (v) => `DEADLINE RESET — STAKEHOLDER UPDATE

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
${v.scopeMove || v.capacityMove || "[not entered]"}

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
        intro: "Priority problems hide when every request is discussed in isolation.",
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
          { id: "moves", label: "What moves, shrinks, or stops?", type: "textarea" },
          { id: "impact", label: "What is the consequence of that displacement?", type: "textarea" },
          { id: "protected", label: "What must remain protected?", type: "textarea" },
        ],
      },
      {
        eyebrow: "DECISION",
        title: "Put the tradeoff with the person who owns it.",
        intro: "The team should not quietly make a strategy decision by working harder.",
        fields: [
          { id: "decisionOwner", label: "Who owns this tradeoff?", type: "text" },
          { id: "recommendation", label: "Your recommendation", type: "textarea" },
          { id: "decisionDate", label: "Decision needed by", type: "text" },
        ],
      },
      {
        eyebrow: "BRIEF",
        title: "Make the choice portable.",
        intro: "Leave the conversation with a record of what entered, what moved, and why.",
        fields: [
          { id: "finalDecision", label: "Decision made", type: "textarea" },
        ],
      },
    ],
    buildOutput: (v) => `PRIORITY WHIPLASH — TRADEOFF BRIEF

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
          { id: "outcome", label: "Outcome you are accountable for", type: "textarea" },
          { id: "blockedDecision", label: "Decision you need but cannot actually make", type: "textarea" },
          { id: "consequence", label: "What happens while this remains unresolved?", type: "textarea" },
        ],
      },
      {
        eyebrow: "DECISION RIGHTS",
        title: "Map the real decision path.",
        intro: "Recommendation, approval, execution, veto, and accountability are not the same thing.",
        fields: [
          { id: "recommend", label: "Who recommends?", type: "text" },
          { id: "approve", label: "Who can approve / decide?", type: "text" },
          { id: "execute", label: "Who executes?", type: "text" },
          { id: "block", label: "Who can block or materially constrain?", type: "text" },
          { id: "accountable", label: "Who is held accountable for the outcome?", type: "text" },
        ],
      },
      {
        eyebrow: "THE GAP",
        title: "Turn frustration into a specific reset.",
        intro: "Do not ask for vague empowerment. Ask for a decision right, an owner, or an escalation path.",
        fields: [
          { id: "gap", label: "Where exactly do accountability and authority diverge?", type: "textarea" },
          { id: "request", label: "What specific reset are you requesting?", type: "textarea" },
          { id: "fallback", label: "If that cannot change, what escalation or operating rule is needed?", type: "textarea" },
        ],
      },
      {
        eyebrow: "ESCALATION BRIEF",
        title: "Make the system problem visible without drama.",
        intro: "The brief should let leadership fix the operating condition rather than evaluate your attitude.",
        fields: [
          { id: "owner", label: "Who needs to act?", type: "text" },
          { id: "date", label: "Decision / reset needed by", type: "text" },
        ],
      },
    ],
    buildOutput: (v) => `MANDATE RESET — DECISION RIGHTS BRIEF

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
        intro: "The request may be reasonable even when the operating assumption underneath it is not.",
        fields: [
          { id: "request", label: "What did they ask for?", type: "textarea", hint: "Example: Give me the final requirements and a committed date." },
          { id: "stakeholder", label: "Who is asking?", type: "text" },
          { id: "context", label: "What are they trying to coordinate or protect?", type: "textarea" },
        ],
      },
      {
        eyebrow: "DECODE",
        title: "Find the need beneath the project language.",
        intro: "Most certainty requests are really requests for coordination.",
        fields: [
          { id: "need", label: "Primary underlying need", type: "select", options: ["Confidence", "Budget / staffing", "Sequencing", "Customer communication", "Accountability", "Risk management"] },
          { id: "assumption", label: "What assumption about product work is embedded in the request?", type: "textarea" },
        ],
      },
      {
        eyebrow: "PRODUCT REALITY",
        title: "Say what the work can responsibly support.",
        intro: "Do not answer uncertainty with vagueness. Replace false certainty with useful evidence.",
        fields: [
          { id: "known", label: "What do we know now?", type: "textarea" },
          { id: "unknown", label: "What remains unknown?", type: "textarea" },
          { id: "commit", label: "What can we responsibly commit to?", type: "textarea" },
          { id: "checkpoint", label: "What evidence / checkpoint comes next?", type: "textarea" },
        ],
      },
      {
        eyebrow: "TRANSLATION",
        title: "Give the room a better answer.",
        intro: "Meet the coordination need without pretending the work is more knowable than it is.",
        fields: [
          { id: "response", label: "Draft your final response / meeting script", type: "textarea" },
        ],
      },
    ],
    buildOutput: (v) => `PRODUCT / PROJECT TRANSLATOR

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

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (value: string) => void;
}) {
  const shared =
    "mt-2 w-full border border-[#bfc8bb] bg-[#fffdf7] px-4 py-3 font-ui text-sm text-[#13231a] outline-none transition-colors focus:border-[#56775d]";

  return (
    <label className="block">
      <span className="font-ui text-sm font-semibold text-[#26392d]">{field.label}</span>
      {field.hint && <span className="mt-1 block font-ui text-xs leading-5 text-[#6b776f]">{field.hint}</span>}
      {field.type === "select" ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={shared}>
          <option value="">Select…</option>
          {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : field.type === "text" ? (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={shared} />
      ) : (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={shared + " resize-y"} />
      )}
    </label>
  );
}

export default function FieldToolLab({ slug }: { slug: string }) {
  const tool = getFieldTool(slug);
  const config = CONFIGS[slug];
  const storageKey = "rl_field_lab_" + slug;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setValues(parsed.values || {});
      setStep(Math.min(parsed.step || 0, (config?.steps.length || 1) - 1));
    } catch {
      // Ignore malformed local draft.
    }
  }, [storageKey, config?.steps.length]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ values, step }));
    } catch {
      // Local persistence is convenience only.
    }
  }, [storageKey, values, step]);

  const output = useMemo(() => config?.buildOutput(values) || "", [config, values]);

  if (!tool || !config) {
    return <main className="min-h-screen bg-[#07130f] p-8 text-white">Tool Lab not found.</main>;
  }

  const current = config.steps[step];
  const isLast = step === config.steps.length - 1;

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
  }

  function downloadOutput() {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = slug + "-output.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function clearDraft() {
    if (!window.confirm("Clear this local draft and start over?")) return;
    setValues({});
    setStep(0);
    setShowOutput(false);
    window.localStorage.removeItem(storageKey);
  }

  return (
    <main className="min-h-screen bg-[#f3efe4] text-[#102019]">
      <FieldToolsNav />

      <section className="bg-[#07130f] px-5 pb-8 pt-24 text-[#eef3ec] md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-pixel text-[8px] tracking-[0.22em] text-[#9bb397]">{tool.eyebrow} / LAB</p>
              <h1 className="mt-4 font-ui text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{tool.name}</h1>
              <p className="mt-3 max-w-2xl font-ui text-sm leading-6 text-[#acbdb1]">
                Your work stays in this browser in this V1. No account required.
              </p>
            </div>
            <button type="button" onClick={clearDraft} className="self-start border border-white/15 px-4 py-2 font-ui text-xs text-[#bdcbbf]">
              Clear local draft
            </button>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-2">
            {config.steps.map((item, index) => (
              <button
                type="button"
                key={item.eyebrow}
                onClick={() => setStep(index)}
                className={"border-t-2 pt-3 text-left font-ui text-[11px] " + (index === step ? "border-[#b9d5ad] text-white" : "border-white/10 text-[#72857a]")}
              >
                <span className="hidden sm:inline">{index + 1}. </span>{item.eyebrow}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <aside>
            <p className="font-pixel text-[8px] tracking-[0.2em] text-[#607b64]">{current.eyebrow}</p>
            <h2 className="mt-4 font-ui text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">{current.title}</h2>
            <p className="mt-4 font-ui text-sm leading-6 text-[#5c6960]">{current.intro}</p>

            <div className="mt-8 border-l-2 border-[#a1b89d] pl-4 font-ui text-xs leading-5 text-[#657268]">
              This is a working instrument, not a course. Complete only what helps you make the next decision.
            </div>
          </aside>

          <div className="border border-[#c8d0c5] bg-[#fbf9f3] p-5 md:p-8">
            <div className="space-y-6">
              {current.fields.map((field) => (
                <FieldInput
                  key={field.id}
                  field={field}
                  value={values[field.id] || ""}
                  onChange={(value) => setValues((prev) => ({ ...prev, [field.id]: value }))}
                />
              ))}
            </div>

            <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-[#d7ddd3] pt-6">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep(Math.max(0, step - 1))}
                className="border border-[#aeb8aa] px-5 py-3 font-ui text-sm disabled:cursor-default disabled:opacity-30"
              >
                ← Back
              </button>

              {!isLast ? (
                <button
                  type="button"
                  onClick={() => setStep(Math.min(config.steps.length - 1, step + 1))}
                  className="bg-[#173c2a] px-6 py-3 font-ui text-sm font-semibold text-white"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowOutput(true)}
                  className="bg-[#173c2a] px-6 py-3 font-ui text-sm font-semibold text-white"
                >
                  Generate the output →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {showOutput && (
        <section className="bg-[#10271d] px-5 py-12 text-[#eef3ec] md:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="font-pixel text-[8px] tracking-[0.22em] text-[#b0c8aa]">YOUR OUTPUT</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <pre className="whitespace-pre-wrap border border-white/12 bg-black/15 p-6 font-mono text-xs leading-6 text-[#d8e4da]">{output}</pre>
              <div className="flex gap-2 lg:flex-col">
                <button type="button" onClick={copyOutput} className="bg-[#b9d5ad] px-5 py-3 font-ui text-sm font-semibold text-[#07130f]">Copy</button>
                <button type="button" onClick={downloadOutput} className="border border-white/20 px-5 py-3 font-ui text-sm">Download .txt</button>
                <button type="button" onClick={() => window.print()} className="border border-white/20 px-5 py-3 font-ui text-sm">Print</button>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-ui text-xs text-[#667369]">
          <Link href={"/field-tools/" + slug}>← Back to {tool.name}</Link>
          <Link href="/field-tools">All Field Tools →</Link>
        </div>
      </footer>
    </main>
  );
}
