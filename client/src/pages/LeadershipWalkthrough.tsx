import { useRef, useState } from "react";
import { Link } from "wouter";
import { useFieldToolContent } from "@/components/field-tools/FieldToolGate";
import { fieldToolBase, fieldToolForPath } from "@/lib/field-tool-paths";
import { LEADERSHIP_OUTPUT_BUILDERS } from "@/lib/leadership-output";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";
import NotFound from "./NotFound";
import "@/components/field-tools/ai-library.css";
import "@/components/field-tools/leadership-expansion.css";

export default function LeadershipWalkthrough({ slug }: { slug: string }) {
  const content = useFieldToolContent();
  const [stage, setStage] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const expansion = content.expansion;
  const tool = fieldToolForPath(slug, content.audience);
  if (!expansion || !tool) return <NotFound />;
  const base = fieldToolBase(slug, content.audience);
  const scene = expansion.scenes[stage];
  // These are fictional example values, never the reader's saved Lab draft.
  const record =
    scene.record &&
    LEADERSHIP_OUTPUT_BUILDERS[scene.record]?.({
      ...content.sampleValues,
      ...scene.values,
    });
  const changeStage = (next: number) => {
    setStage(next);
    requestAnimationFrame(() =>
      heading.current?.focus({ preventScroll: true })
    );
  };
  return (
    <main className="font-ui min-h-screen bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolsNav />
      <section className="ft-walkthrough mx-auto max-w-5xl px-6 pb-16 pt-28">
        <Link href={`${base}/access`} className="text-sm underline">
          ← Your Field Tool
        </Link>
        <div className="ft-walkthrough-intro">
          <div>
            <p className="ai-eyebrow">{tool.name} / WORKED WALKTHROUGH</p>
            <h1 className="mt-4 font-display text-5xl">
              Play through the conversation.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--ft-muted)]">
              {expansion.intro} Your own Lab draft stays as you left it.
            </p>
            {content.walkthroughUrl && (
              <a
                className="ft-button ft-button-gold mt-5"
                href={content.walkthroughUrl}
                target="_blank"
                rel="noreferrer"
              >
                Watch Nic’s walkthrough ↗
              </a>
            )}
          </div>
          <img
            src={FIELD_TOOL_PRESENTATIONS[slug].image}
            alt="Nic Payne"
            width={1672}
            height={941}
          />
        </div>
        <nav
          aria-label="Example steps"
          className="ft-step-nav mt-8 grid grid-cols-2 gap-2 sm:grid-cols-5"
        >
          {expansion.scenes.map((item, index) => (
            <button
              key={item.title}
              aria-current={stage === index ? "step" : undefined}
              aria-label={`Step ${index + 1}: ${item.title}`}
              onClick={() => changeStage(index)}
              className={`border-t-2 p-3 text-left text-xs ${stage === index ? "border-[var(--ft-accent)] bg-[var(--ft-tint)]" : "border-[var(--ft-line)]"}`}
            >
              <span className="ft-step-number" aria-hidden="true">
                {index + 1}
              </span>
              <span className="ft-step-label">{item.title}</span>
            </button>
          ))}
        </nav>
        <article
          key={stage}
          className="ai-visual ft-walkthrough-story ft-scene-enter"
        >
          <p className="ai-eyebrow">{stage + 1} / THE CONVERSATION</p>
          <h2
            ref={heading}
            tabIndex={-1}
            className="mt-3 font-display text-3xl"
          >
            {scene.title}
          </h2>
          <p>{scene.move}</p>
          <div className="ft-dialogue" aria-label="Fictional conversation">
            {scene.dialogue.map((line, index) => (
              <div key={index}>
                <p className="ft-dialogue-speaker">{line.speaker}</p>
                <blockquote>“{line.words}”</blockquote>
              </div>
            ))}
          </div>
          <div className="ft-reflection">
            <h3 className="!text-xl">Ask yourself</h3>
            <p>{scene.question}</p>
          </div>
        </article>
        {record && (
          <details
            key={`record-${stage}`}
            className="ft-example-record border-y border-[var(--ft-line)] py-5"
          >
            <summary className="cursor-pointer text-sm font-semibold">
              See the example document
            </summary>
            <pre className="mt-5 whitespace-pre-wrap break-words font-ui text-xs leading-6">
              {record}
            </pre>
          </details>
        )}
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            disabled={stage === 0}
            onClick={() => changeStage(stage - 1)}
            className="border border-[var(--ft-line)] px-5 py-3 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          {stage < expansion.scenes.length - 1 ? (
            <button
              onClick={() => changeStage(stage + 1)}
              className="ft-button ft-button-gold"
            >
              Next part →
            </button>
          ) : (
            <Link href={`${base}/lab`} className="ft-button ft-button-gold">
              Work my own situation →
            </Link>
          )}
          <Link
            className="text-sm underline underline-offset-4"
            href={`${base}/lab?step=${scene.step}`}
          >
            Open this part of my Lab →
          </Link>
        </div>
      </section>
      <FieldToolsFooter />
    </main>
  );
}
