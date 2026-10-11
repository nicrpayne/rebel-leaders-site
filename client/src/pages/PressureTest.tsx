import { useMemo, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useSession } from "@/contexts/SessionContext";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { getFieldTool } from "@/lib/field-tools";

type Pressure = "ai" | "certainty" | "priority" | "authority" | "translation";

type Option = {
  label: string;
  pressure: Pressure;
  weight?: number;
};

type Question = {
  prompt: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    prompt: "When leadership adds something urgent, what usually happens?",
    options: [
      { label: "Something else explicitly comes out.", pressure: "priority", weight: 0 },
      { label: "We renegotiate scope or date.", pressure: "certainty", weight: 1 },
      { label: "The team absorbs it on top of everything else.", pressure: "priority", weight: 3 },
      { label: "It depends on who asked.", pressure: "authority", weight: 2 },
    ],
  },
  {
    prompt: "How are delivery dates usually treated?",
    options: [
      { label: "Forecasts that tighten as we learn.", pressure: "certainty", weight: 0 },
      { label: "Commitments after scope is reasonably understood.", pressure: "certainty", weight: 0 },
      { label: "Deadlines set before the work is understood.", pressure: "certainty", weight: 3 },
      { label: "Customer promises we reverse-engineer later.", pressure: "certainty", weight: 3 },
    ],
  },
  {
    prompt: "When a product tradeoff needs to be made, can you actually make it?",
    options: [
      { label: "Usually, within clear boundaries.", pressure: "authority", weight: 0 },
      { label: "I recommend; someone else decides.", pressure: "authority", weight: 2 },
      { label: "Nobody is quite sure who decides.", pressure: "authority", weight: 3 },
      { label: "It changes depending on the stakeholder.", pressure: "authority", weight: 3 },
    ],
  },
  {
    prompt: "Which sentence sounds most familiar lately?",
    options: [
      { label: "Everything is top priority.", pressure: "priority", weight: 3 },
      { label: "We already promised the date.", pressure: "certainty", weight: 3 },
      { label: "Just use AI to go faster.", pressure: "ai", weight: 3 },
      { label: "Why can't Product just give us the requirements?", pressure: "translation", weight: 3 },
    ],
  },
  {
    prompt: "What happens when evidence changes the plan?",
    options: [
      { label: "We update the plan and explain why.", pressure: "translation", weight: 0 },
      { label: "People understand, but are frustrated.", pressure: "translation", weight: 1 },
      { label: "It gets treated like Product or Engineering failed to plan.", pressure: "translation", weight: 3 },
      { label: "We try to hide the change until we have a replacement answer.", pressure: "certainty", weight: 2 },
    ],
  },
  {
    prompt: "What is your team's current relationship with AI?",
    options: [
      { label: "Specific use cases, clear boundaries, honest evidence.", pressure: "ai", weight: 0 },
      { label: "Curious, but inconsistent.", pressure: "ai", weight: 1 },
      { label: "Leadership pressure is ahead of team agreement.", pressure: "ai", weight: 3 },
      { label: "Product and Engineering are talking past each other about it.", pressure: "ai", weight: 3 },
    ],
  },
  {
    prompt: "When priorities conflict, what decides the winner?",
    options: [
      { label: "A visible priority system and accountable owner.", pressure: "priority", weight: 0 },
      { label: "The loudest customer or executive.", pressure: "priority", weight: 3 },
      { label: "Whichever deadline is closest.", pressure: "certainty", weight: 2 },
      { label: "The team quietly makes the tradeoff itself.", pressure: "authority", weight: 2 },
    ],
  },
  {
    prompt: "What does your organization most often ask Product for?",
    options: [
      { label: "Evidence and a recommendation.", pressure: "translation", weight: 0 },
      { label: "A fixed roadmap and firm dates.", pressure: "translation", weight: 3 },
      { label: "Coordination across teams without matching authority.", pressure: "authority", weight: 3 },
      { label: "More output without removing work.", pressure: "priority", weight: 3 },
    ],
  },
  {
    prompt: "When Engineering raises a quality or technical concern, what happens?",
    options: [
      { label: "We turn it into a concrete decision or experiment.", pressure: "ai", weight: 0 },
      { label: "It becomes a negotiation about the deadline.", pressure: "certainty", weight: 2 },
      { label: "Product experiences it as resistance.", pressure: "ai", weight: 3 },
      { label: "Engineering is expected to absorb the cost.", pressure: "ai", weight: 3 },
    ],
  },
  {
    prompt: "Where do you personally spend the most unnecessary energy?",
    options: [
      { label: "Re-explaining why estimates and plans changed.", pressure: "translation", weight: 3 },
      { label: "Trying to get someone to make a decision only they can make.", pressure: "authority", weight: 3 },
      { label: "Juggling too many simultaneous priorities.", pressure: "priority", weight: 3 },
      { label: "Trying to make an impossible date look possible.", pressure: "certainty", weight: 3 },
    ],
  },
];

const RESULTS: Record<Pressure, {
  name: string;
  copy: string;
  freeMove: string;
  toolSlug: string;
}> = {
  ai: {
    name: "The AI Collision",
    copy: "AI has become the point where opportunity, quality, capacity, and ownership collide. The argument is probably broader than the tool.",
    freeMove: "Before the next AI conversation, ask both sides: What are you protecting, and what evidence would change your view?",
    toolSlug: "ai-stalemate",
  },
  certainty: {
    name: "The Certainty Trap",
    copy: "Your organization is asking adaptive work to behave like a known project. Dates, scope, and confidence are being collapsed into one promise.",
    freeMove: "Write down what is actually fixed, what is assumed, and what has to flex if the date does not.",
    toolSlug: "deadline-reset",
  },
  priority: {
    name: "The Priority Collision",
    copy: "New work is entering faster than explicit tradeoffs are being made. Your team is absorbing strategy through capacity.",
    freeMove: "For the next urgent request, answer with: Yes—what should this replace?",
    toolSlug: "priority-whiplash",
  },
  authority: {
    name: "The Authority Gap",
    copy: "You are carrying responsibility for outcomes whose important levers live somewhere else. More ownership will not repair missing decision rights.",
    freeMove: "Name one decision you are accountable for but cannot actually make. Identify who can.",
    toolSlug: "mandate-reset",
  },
  translation: {
    name: "The Translation Gap",
    copy: "The surrounding organization is asking for project-style certainty from product work. You are spending energy translating between two operating models.",
    freeMove: "Take the next request for certainty and ask what coordination need sits underneath it: confidence, budget, sequence, ownership, or communication.",
    toolSlug: "product-project-translator",
  },
};

export default function PressureTest() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [finished, setFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const { sessionId } = useSession();
  const captureLead = trpc.fieldTools.capturePressureTestLead.useMutation();

  const result = useMemo(() => {
    const scores: Record<Pressure, number> = {
      ai: 0,
      certainty: 0,
      priority: 0,
      authority: 0,
      translation: 0,
    };

    for (const answer of answers) {
      scores[answer.pressure] += answer.weight ?? 1;
    }

    const winner = (Object.entries(scores) as Array<[Pressure, number]>)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ?? "translation";

    return { pressure: winner, scores, ...RESULTS[winner] };
  }, [answers]);

  const tool = getFieldTool(result.toolSlug);

  function choose(option: Option) {
    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);

    if (questionIndex >= QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }

    setQuestionIndex(questionIndex + 1);
  }

  function reset() {
    setAnswers([]);
    setQuestionIndex(0);
    setFinished(false);
    setLeadCaptured(false);
  }

  async function revealResult() {
    if (!email.trim()) return;
    await captureLead.mutateAsync({
      email: email.trim(),
      sessionId: sessionId || "pressure-test-anon",
      result: result.pressure,
      scoreSummary: result.scores,
    });
    setLeadCaptured(true);
  }

  return (
    <main className="min-h-screen bg-[#07130f] text-[#f3f4ee]">
      <FieldToolsNav />

      <section className="relative min-h-screen overflow-hidden px-5 pb-16 pt-28 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(111,151,121,.18),transparent_32%),linear-gradient(125deg,#07130f,#0a1b14_62%,#09130f)]" />
        <div className="relative mx-auto max-w-5xl">
          {!finished ? (
            <>
              <div className="mb-10 text-center">
                <p className="font-pixel text-[8px] tracking-[0.24em] text-[#a5bea0]">FREE ASSESSMENT</p>
                <h1 className="mt-5 font-ui text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  What's actually making your work harder?
                </h1>
                <p className="mx-auto mt-5 max-w-2xl font-ui text-base leading-7 text-[#b9c8be]">
                  10 questions. No fake personality type. Find the operating pressure most likely creating friction for you right now.
                </p>
              </div>

              <div className="mb-5 flex items-center justify-between font-ui text-xs text-[#819387]">
                <span>Question {questionIndex + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(((questionIndex + 1) / QUESTIONS.length) * 100)}%</span>
              </div>

              <div className="h-1 overflow-hidden bg-white/10">
                <div
                  className="h-full bg-[#b9d5ad] transition-all duration-300"
                  style={{ width: ((questionIndex + 1) / QUESTIONS.length) * 100 + "%" }}
                />
              </div>

              <div className="mt-7 border border-white/10 bg-white/[0.035] p-6 md:p-9">
                <h2 className="font-ui text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-3xl">
                  {QUESTIONS[questionIndex].prompt}
                </h2>
                <div className="mt-7 grid gap-3">
                  {QUESTIONS[questionIndex].options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => choose(option)}
                      className="border border-white/12 bg-[#10241b] px-5 py-4 text-left font-ui text-sm leading-6 text-[#e1eae3] transition-all hover:border-[#a6bea0] hover:bg-[#173225]"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : !leadCaptured ? (
            <div className="mx-auto max-w-2xl border border-white/12 bg-white/[0.035] p-6 md:p-9">
              <p className="font-pixel text-[8px] tracking-[0.24em] text-[#a5bea0]">YOUR RESULT IS READY</p>
              <h1 className="mt-5 font-ui text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                Where should I send your result?
              </h1>
              <p className="mt-4 font-ui text-base leading-7 text-[#b9c8be]">
                I'll show it here immediately too. You'll get the pressure pattern, one useful move, and the Field Tool that fits it best.
              </p>
              <div className="mt-7">
                <label className="font-ui text-sm font-semibold text-[#e8efe9]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") revealResult(); }}
                  placeholder="you@company.com"
                  className="mt-2 w-full border border-white/15 bg-[#0c1d16] px-4 py-4 font-ui text-sm text-white outline-none focus:border-[#a5bea0]"
                />
                <button
                  type="button"
                  onClick={revealResult}
                  disabled={!email.trim() || captureLead.isPending}
                  className="mt-3 w-full bg-[#b9d5ad] px-5 py-4 font-ui text-sm font-semibold text-[#07130f] disabled:opacity-50"
                >
                  {captureLead.isPending ? "Getting your result…" : "Show my result →"}
                </button>
                {captureLead.error && (
                  <p className="mt-3 font-ui text-xs text-[#e7aaa0]">
                    I couldn't save that right now. Try once more.
                  </p>
                )}
              </div>
              <p className="mt-5 font-ui text-xs leading-5 text-[#72857a]">
                No newsletter bait-and-switch. This captures your assessment result so Rebel Leaders can send the result and improve the tools.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              <p className="font-pixel text-[8px] tracking-[0.24em] text-[#a5bea0]">YOUR DOMINANT PRESSURE</p>
              <h1 className="mt-5 font-ui text-5xl font-semibold tracking-[-0.045em] md:text-7xl">
                {result.name}
              </h1>
              <p className="mt-6 max-w-3xl font-ui text-xl leading-8 text-[#c3d0c7]">{result.copy}</p>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <article className="border border-white/12 bg-white/[0.035] p-6">
                  <p className="font-pixel text-[7px] tracking-[0.2em] text-[#a5bea0]">DO THIS TODAY</p>
                  <p className="mt-4 font-ui text-lg leading-7 text-[#eef3ef]">{result.freeMove}</p>
                </article>

                <article className="border border-[#718c75] bg-[#133024] p-6">
                  <p className="font-pixel text-[7px] tracking-[0.2em] text-[#b9d5ad]">BEST NEXT TOOL</p>
                  <p className="mt-4 font-ui text-2xl font-semibold">{tool?.name}</p>
                  <p className="mt-2 font-ui text-sm leading-6 text-[#c6d3c8]">{tool?.subhead}</p>
                  <Link
                    href={"/field-tools/" + result.toolSlug}
                    className="mt-6 inline-block bg-[#b9d5ad] px-5 py-3 font-ui text-sm font-semibold text-[#07130f]"
                  >
                    See the Field Tool →
                  </Link>
                </article>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="border border-white/15 px-5 py-3 font-ui text-sm text-[#dce7df]"
                >
                  Retake the test
                </button>
                <Link href="/field-tools" className="px-5 py-3 font-ui text-sm text-[#b9d5ad]">
                  Browse all Field Tools →
                </Link>
              </div>

              <p className="mt-10 max-w-2xl font-ui text-xs leading-5 text-[#72857a]">
                This is a practical routing assessment, not a validated psychometric instrument. It reflects the operating pressures in your answers and recommends a useful next step.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
