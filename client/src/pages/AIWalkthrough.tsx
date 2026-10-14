import { useState } from "react";
import { Link } from "wouter";
import { useFieldToolContent } from "@/components/field-tools/FieldToolGate";
import { fieldToolBase } from "@/lib/field-tool-paths";
import {
  buildReadinessBrief,
  buildTrialCard,
  buildEvidenceRecord,
  buildDecisionBrief,
} from "@/lib/ai-trial";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";
import "@/components/field-tools/ai-library.css";

export default function AIWalkthrough() {
  const content = useFieldToolContent();
  const base = fieldToolBase("ai-stalemate", content.audience);
  const [stage, setStage] = useState(0);
  const sample = content.sampleValues ?? {};
  const scenes = [
    {
      title: "The disagreement",
      move: "Support staff copy repair requests into two systems, and some requests get missed. The PM hopes AI could help build an app to save that work. The lead is worried about who can see the records and who will check the code.",
      question: "What matters to each person? What have you heard them say?",
    },
    {
      title: "The next useful move",
      move: "They both want to stop the repeated typing. First, they need someone to check the claimed financial benefit, agree who may see the repair records, and arrange practice and review time. That is their proposed next step; they have not agreed it yet.",
      question: "Who will check each question, and when will you hear back?",
      record: buildReadinessBrief(sample),
    },
    {
      title: "An experiment they might try",
      move: "Once those questions are answered, they could ask AI to help write permission tests for one part of the app. Before starting, they would agree how much time to spend, what to compare it with, which checks it must pass, and when to stop. They have not run this experiment.",
      question:
        "What do we want to find out? How much time will we spend? When would we stop?",
      record: buildTrialCard(sample),
    },
    {
      title: "After an experiment",
      move: "Count the time everyone spent setting up, writing, checking, reviewing, fixing, and following up. Compare it with similar work done without AI. Record which checks passed and where to see the results. Leave results blank until there is something to record.",
      question:
        "What would make us say, “That did not help as much as we expected”?",
      record: buildEvidenceRecord(sample),
    },
    {
      title: "A decision people can use",
      move: "This example stops at a proposal to prepare. There are no experiment results to report. They can explain the problem they want to solve, the questions they still need answered, and who they are asking to help. Then they come back to record what was decided.",
      question:
        "What do we know today, and what are we still asking someone to decide?",
      record: buildDecisionBrief(sample),
    },
  ];
  const scene = scenes[stage];
  return (
    <main className="font-ui min-h-screen bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolsNav />
      <section className="ft-walkthrough mx-auto max-w-5xl px-6 pb-16 pt-28">
        <Link href={`${base}/access`} className="text-xs underline">
          ← Your Field Tool
        </Link>
        <div className="ft-walkthrough-intro">
          <div>
            <p className="ai-eyebrow">AI STALEMATE / WORKED WALKTHROUGH</p>
            <h1 className="mt-4 font-display text-5xl">
              Play through the conversation.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--ft-muted)]">
              A fictional example: support staff are doing the same work twice,
              a PM wants to fix it, and a lead developer has questions about
              using AI. Follow their conversation without changing your own
              draft.
            </p>
            {content.walkthroughUrl && (
              <a
                className="ft-button ft-button-gold mt-5"
                target="_blank"
                rel="noreferrer"
                href={content.walkthroughUrl}
              >
                Watch Nic’s walkthrough ↗
              </a>
            )}
          </div>
          <img
            src="/assets/field-tools/ai-stalemate-hero-v2.webp"
            alt="Nic Payne in his study"
            width={1672}
            height={941}
          />
        </div>
        <div className="ft-step-nav mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {scenes.map((s, i) => (
            <button
              aria-current={stage === i ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${s.title}`}
              key={s.title}
              onClick={() => setStage(i)}
              className={`border-t-2 p-3 text-left text-xs ${stage === i ? "border-[var(--ft-accent)] bg-[var(--ft-tint)]" : "border-[var(--ft-line)]"}`}
            >
              <span className="ft-step-number" aria-hidden="true">
                {i + 1}
              </span>
              <span className="ft-step-label">{s.title}</span>
            </button>
          ))}
        </div>
        <article className="ai-visual ft-walkthrough-story">
          <p className="ai-eyebrow">{stage + 1} / WHAT CHANGES</p>
          <h2 className="mt-3 font-display text-3xl">{scene.title}</h2>
          <p>{scene.move}</p>
          <div className="ft-reflection">
            <h3 className="!text-xl">Ask yourself</h3>
            <p>{scene.question}</p>
          </div>
        </article>
        {scene.record && (
          <details className="border border-[var(--ft-line)] p-5">
            <summary className="cursor-pointer text-sm font-semibold">
              See the example document
            </summary>
            <pre className="mt-5 whitespace-pre-wrap break-words font-ui text-xs leading-6">
              {scene.record}
            </pre>
          </details>
        )}
        <div className="mt-7 flex flex-wrap gap-4">
          <button
            disabled={stage === 0}
            onClick={() => setStage(stage - 1)}
            className="border border-[var(--ft-line)] px-5 py-3 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          {stage < 4 ? (
            <button
              onClick={() => setStage(stage + 1)}
              className="ft-button ft-button-gold"
            >
              Next part →
            </button>
          ) : (
            <Link href={`${base}/lab`} className="ft-button ft-button-gold">
              Work my own situation →
            </Link>
          )}
        </div>
      </section>
      <FieldToolsFooter />
    </main>
  );
}
