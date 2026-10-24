import { teachingSources } from "./TeachingNote";
import { Link } from "wouter";
import { useFieldToolContent } from "./FieldToolGate";
import { fieldToolBase } from "@/lib/field-tool-paths";
import "./ai-library.css";
import GuideReadingTime from "./GuideReadingTime";
import { guideReadingTime } from "../../../../shared/field-tool-reading-time";
export default function AIGuideVisual({
  index,
  slug = "ai-stalemate",
}: {
  index: number;
  slug?: string;
}) {
  const content = useFieldToolContent();
  const visual = content.companion?.find(v => v.after === index);
  if (!visual) return null;
  const resources =
    content.expansion?.resources.filter(item => {
      const destination =
        item.topic === "Holistic Shaping"
          ? content.companion?.at(-1)
          : (content.companion?.find(part => part.step === item.step) ??
            content.companion?.[0]);
      return destination?.after === index;
    }) ?? [];
  const base = fieldToolBase(slug, content.audience);
  return (
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
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {source.name} ↗
              </a>
            </li>
          ))}
        </ol>
      )}
      <Link
        className="mt-4 inline-block text-xs underline"
        href={`${base}/lab?step=${visual.step}`}
      >
        Use these questions in the Lab →
      </Link>
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
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline underline-offset-4"
                  >
                    {source.title} ↗
                  </a>
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
          <Link
            className="ml-5 inline-block text-xs underline"
            href={`${base}/resources`}
          >
            Choose a study resource →
          </Link>
        )}
    </aside>
  );
}
