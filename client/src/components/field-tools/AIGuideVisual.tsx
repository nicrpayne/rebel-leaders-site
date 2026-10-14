import { Link } from "wouter";
import { useFieldToolContent } from "./FieldToolGate";
import { fieldToolBase } from "@/lib/field-tool-paths";
import "./ai-library.css";
export default function AIGuideVisual({ index }: { index: number }) {
  const content = useFieldToolContent();
  const visual = content.companion?.find(v => v.after === index);
  if (!visual) return null;
  const base = fieldToolBase("ai-stalemate", content.audience);
  return <aside className="ai-visual"><p className="ai-eyebrow">{visual.eyebrow}</p><h3 className="mt-3">{visual.title}</h3><p>{visual.intro}</p><div className="ai-visual-grid">{visual.cards.map(card => <div key={card.title}><h4>{card.title}</h4><p>{card.body}</p></div>)}</div><p className="border-t border-[var(--ft-line)] pt-4 mt-5">{visual.takeaway}</p><Link className="mt-4 inline-block text-xs underline" href={`${base}/lab?step=${visual.step}`}>Use these questions in the Lab →</Link>{index === 11 && <Link className="ml-5 inline-block text-xs underline" href={`${base}/resources`}>Choose a study resource →</Link>}</aside>;
}
