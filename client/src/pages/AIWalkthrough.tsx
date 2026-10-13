import { useState } from "react";
import { Link } from "wouter";
import { useFieldToolContent } from "@/components/field-tools/FieldToolGate";
import { fieldToolBase } from "@/lib/field-tool-paths";
import { buildReadinessBrief, buildTrialCard, buildEvidenceRecord, buildDecisionBrief } from "@/lib/ai-trial";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";
import "@/components/field-tools/ai-library.css";

export default function AIWalkthrough() {
  const content = useFieldToolContent();
  const base = fieldToolBase("ai-stalemate", content.audience);
  const [stage, setStage] = useState(0);
  const sample = content.sampleValues ?? {};
  const scenes = [
    { title: "The disagreement", move: "The PM sees an opportunity to deliver faster. The lead sees permission gaps and a team that needs qualified support. Both are carrying relevant context.", question: "What would each person say they are protecting? What have you actually heard them say?" },
    { title: "The next useful move", move: "They clarify the outcome and name the access-policy and training questions. Preparing first is a useful proposal. The example has not turned that proposal into an agreement.", question: "Who can resolve the prerequisite, and when will you hear back?", record: buildReadinessBrief(sample) },
    { title: "A possible Bet", move: "Only after the conditions are resolved would they consider a bounded task, a comparator, a timebox, an effort budget, and a quality bar. A proposed Bet has no test results.", question: "What will we learn, what can we afford, and what would make us stop?", record: buildTrialCard(sample) },
    { title: "Evidence, when there is a test", move: "Count setup, implementation, verification, review, rework, and follow-up for both methods. Keep blank results unknown. Record the quality check and its evidence separately from the time saving.", question: "What result would count against our original expectation?", record: buildEvidenceRecord(sample) },
    { title: "A decision people can use", move: "In this case, the honest result is a preparation decision. They can communicate the opportunity, what remains unresolved, the proposed investment, and who needs to act. They return when the next action produces new information.", question: "What can we report today, and what still needs someone else's decision?", record: buildDecisionBrief(sample) },
  ];
  const scene = scenes[stage];
  return <main className="min-h-screen bg-[#f3efe4] text-[#193025]"><FieldToolsNav /><section className="mx-auto max-w-5xl px-6 pb-16 pt-28"><Link href={`${base}/access`} className="text-xs underline">← Your Field Tool</Link><p className="ai-eyebrow mt-8">AI STALEMATE / WORKED WALKTHROUGH</p><h1 className="mt-4 font-display text-5xl">Play through the conversation.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-[#536659]">A fictional composite of a familiar situation: business urgency, legitimate engineering concerns, and a team that needs support. Explore the steps without changing your own draft.</p>{content.walkthroughUrl && <a className="ft-button ft-button-gold mt-5" target="_blank" rel="noreferrer" href={content.walkthroughUrl}>Watch Nic’s walkthrough ↗</a>}
      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5">{scenes.map((s,i) => <button aria-current={stage === i ? "step" : undefined} key={s.title} onClick={() => setStage(i)} className={`border-t-2 p-3 text-left text-xs ${stage === i ? "border-[#c3a14b] bg-[#e9e5d8]" : "border-[#c8d0c5]"}`}>{i+1}. {s.title}</button>)}</div><article className="ai-visual"><p className="ai-eyebrow">{stage+1} / WHAT CHANGES</p><h2 className="mt-3 font-display text-3xl">{scene.title}</h2><p>{scene.move}</p><div className="mt-5 border-t border-[#69806b] pt-4"><h3 className="!text-xl">The question to carry into your work</h3><p>{scene.question}</p></div></article>
      {scene.record && <details className="border border-[#c8d0c5] p-5"><summary className="cursor-pointer text-sm font-semibold">See the example working record</summary><pre className="mt-5 whitespace-pre-wrap break-words font-ui text-xs leading-6">{scene.record}</pre></details>}
      <div className="mt-7 flex flex-wrap gap-4"><button disabled={stage === 0} onClick={() => setStage(stage-1)} className="border border-[#aeb8aa] px-5 py-3 text-sm disabled:opacity-40">Previous</button>{stage < 4 ? <button onClick={() => setStage(stage+1)} className="ft-button ft-button-gold">Next part →</button> : <Link href={`${base}/lab`} className="ft-button ft-button-gold">Work my own situation →</Link>}</div>
    </section><FieldToolsFooter /></main>;
}
