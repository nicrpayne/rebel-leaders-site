import FieldToolLink from "@/components/field-tools/FieldToolLink";
import { teachingSources } from "./TeachingNote";
import { useFieldToolContent } from "./FieldToolGate";
import { fieldToolBase } from "@/lib/field-tool-paths";
import "./ai-library.css";
import GuideReadingTime from "./GuideReadingTime";
import { guideReadingTime } from "../../../../shared/field-tool-reading-time";
export default function AIGuideVisual({
  index,
  slug = "ai-stalemate",
  visualIndex,
}: {
  index: number;
  slug?: string;
  visualIndex?: number;
}) {
  const content = useFieldToolContent();
  const visuals = content.companion?.filter(v => v.after === index) ?? [];
  if (visualIndex === undefined && slug === "when-the-team-goes-quiet") {
    return <>{visuals.map((visual, position) => <AIGuideVisual key={visual.title} index={index} slug={slug} visualIndex={position} />)}</>;
  }
  const visual = visuals[visualIndex ?? 0];
  if (!visual) return null;
  const resources =
    content.expansion?.resources.filter(item => {
      const destination =
        item.topic === "Holistic Shaping"
          ? content.companion?.at(-1)
          : (content.companion?.find(part => part.step === item.step) ??
            content.companion?.[0]);
      return destination?.after === index && (visualIndex === undefined || visualIndex === 0);
    }) ?? [];
  const base = fieldToolBase(slug, content.audience);
  const body = (
    <aside className="ai-visual">
      <p className="ai-eyebrow">{visual.eyebrow}</p>
      <h3 className="mt-3">{visual.title}</h3>
      <GuideReadingTime>{guideReadingTime(visual)}</GuideReadingTime>
      <p>{visual.intro}</p>
      <div className="ai-visual-grid">
        {visual.cards.map(card => (
          <div key={card.title}>
            <h4>{card.title}</h4>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
      <p className="border-t border-[var(--ft-line)] pt-4 mt-5">
        {visual.takeaway}
      </p>
      {visual.sources && (
        <ol className="mt-5 space-y-3 text-sm">
          {visual.sources.map(source => (
            <li key={source.url}>
              <FieldToolLink
                href={source.url}
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {source.name}
              </FieldToolLink>
            </li>
          ))}
        </ol>
      )}
      <FieldToolLink
        className="mt-4 inline-block text-xs underline"
        href={`${base}/lab?step=${visual.step}`}
      >
        Use these questions in the Conversation Companion →
      </FieldToolLink>
      {resources.length > 0 && (
        <details className="mt-6 border-t border-[var(--ft-line)] pt-4">
          <summary className="cursor-pointer text-sm font-semibold">
            Read or watch something that helps
          </summary>
          <ul className="mt-4 space-y-6">
            {resources.map(item => {
              const source = teachingSources[item.source];
              return (
                <li key={item.source}>
                  <FieldToolLink
                    href={source.url}
                    rel="noreferrer"
                    className="text-sm underline underline-offset-4"
                  >
                    {source.title}
                  </FieldToolLink>
                  <p className="!mt-1 !text-xs">
                    {source.author} · {source.kind}
                  </p>
                  <p className="!mt-2">{item.why}</p>
                  <p className="!mt-2">{item.question}</p>
                </li>
              );
            })}
          </ul>
        </details>
      )}
      {slug === "ai-stalemate" &&
        index === content.companion?.at(-1)?.after && (
          <FieldToolLink
            className="ml-5 inline-block text-xs underline"
            href={`${base}/resources`}
          >
            Choose a study resource →
          </FieldToolLink>
        )}
    </aside>
  );
  return slug === "when-the-team-goes-quiet" ? (
    <details className="mt-7 border-y border-[var(--ft-line)] py-5">
      <summary className="cursor-pointer font-ui text-sm font-semibold text-[var(--ft-accent)]">{visual.title} <span className="font-normal">· optional</span></summary>
      {body}
    </details>
  ) : body;
}
