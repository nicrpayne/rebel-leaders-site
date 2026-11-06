import FieldToolLink from "@/components/field-tools/FieldToolLink";
import { useState } from "react";
import { QUIET_RESPONSES, QUIET_WAVELENGTH, QUIET_HEALTH } from "@/lib/quiet-reflections";

type Props = { step: number; values: Record<string, string>; onChange: (id: string, value: string) => void };
const input = "mt-2 w-full rounded-sm border border-[var(--ft-line)] bg-[var(--ft-white)] p-3 text-sm";
export default function QuietInRoom({ step, values, onChange }: Props) {
  const [pendingOpening, setPendingOpening] = useState<string | null>(null);
  const response = QUIET_RESPONSES.find(item => item.id === values.quietLensResponse);
  const root = QUIET_HEALTH.find(([id]) => id === values.quietLensRoot);
  function note(id: string, label: string, hint?: string) {
    return <label className="mt-5 block text-sm font-semibold">{label}{hint && <span className="mt-1 block text-xs font-normal leading-6 text-[var(--ft-muted)]">{hint}</span>}<textarea className={input} rows={3} value={values[id] ?? ""} onChange={e => onChange(id, e.target.value)} /></label>;
  }
  if (step !== 1 && step !== 2) return null;
  return <details key={step} className="mt-7 border-y border-[var(--ft-line)] py-5 font-ui">
    <summary className="cursor-pointer text-sm font-semibold text-[var(--ft-accent)]">{step === 1 ? "Want help finding a different response?" : "Want to look beneath this meeting?"} <span className="font-normal">· optional</span></summary>
    <div className="mt-5">
      <p className="text-xs leading-6 text-[var(--ft-muted)]">Use one question if it helps. These reflections stay only in this tab; they are not saved or exported.</p>
      {step === 1 ? <>
        <h3 className="mt-4 font-display text-2xl">Choose what this moment needs.</h3>
        <p className="mt-2 text-sm leading-7">You may need to acknowledge a dismissal before inviting more input. Participation needs a decision people can actually influence.</p>
        <label className="mt-4 block text-sm font-semibold">A response to explore<select className={input} value={values.quietLensResponse ?? ""} onChange={e => { onChange("quietLensResponse", e.target.value); setPendingOpening(null); }}><option value="">Choose only if useful</option>{QUIET_RESPONSES.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        {response && <div className="mt-4 border-l-2 border-[var(--ft-accent)] bg-[var(--ft-tint)] p-5 text-sm leading-7">
          <p className="text-xs text-[var(--ft-muted)]">Goleman’s {response.source.toLowerCase()} style · practical application</p><p className="mt-2">{response.use}</p><p className="mt-3"><strong>Watch for:</strong> {response.cost}</p><p className="mt-3"><strong>Make it possible:</strong> {response.condition}</p>
          <p className="mt-4">“{response.opening}”</p>
          <button type="button" className="mt-3 text-sm underline underline-offset-4" onClick={() => values.opening?.trim() ? setPendingOpening(response.opening) : onChange("opening", response.opening)}>Use this as my opening</button>
          {pendingOpening && <div role="status" className="mt-4 border-t border-[var(--ft-line)] pt-3"><p>You already have an opening. Replace it with this starter?</p><div className="mt-2 flex gap-5"><button type="button" className="underline" onClick={() => { onChange("opening", pendingOpening); setPendingOpening(null); }}>Replace opening</button><button type="button" className="underline" onClick={() => setPendingOpening(null)}>Keep my words</button></div></div>}
          <p className="mt-3 text-xs text-[var(--ft-muted)]">Only the opening you choose to use goes into your saved conversation plan. Make it your own.</p>
          {["pace", "contain"].includes(response.id) && note("quietLensBoundary", "When will this response end?", "Name its scope, review point, and how you will return to listening and participation.")}
        </div>}
        <details className="mt-6 border-t border-[var(--ft-line)] pt-4"><summary className="cursor-pointer text-sm">Do you need to translate how you think? · Paterson’s wavelength</summary><p className="mt-4 text-xs leading-6">Compare your preference with what this situation asks. These adapted reflection prompts do not assign a type, rate ability, or tell you someone else’s wavelength. Higher is not better. Leave anything unanswered.</p>
          {QUIET_WAVELENGTH.map(([id, label, low, high]) => <fieldset key={id} className="mt-5 border-t border-[var(--ft-line)] pt-4"><legend className="text-sm font-semibold">{label}</legend><p className="text-xs leading-6 text-[var(--ft-muted)]">1 · {low}<br />10 · {high}</p><div className="mt-2 grid grid-cols-2 gap-3">{[["Preferred", "My preference"], ["Needed", "This situation asks"]].map(([kind, title]) => <label key={kind} className="text-xs">{title}<select className={input} value={values[`quietLens${kind}_${id}`] ?? ""} onChange={e => onChange(`quietLens${kind}_${id}`, e.target.value)}><option value="">Unanswered</option>{Array.from({length:10}, (_, i) => <option key={i} value={String(i+1)}>{i+1}</option>)}</select></label>)}</div></fieldset>)}
          {note("quietLensBridge", "What would help you meet this situation?", "Explain the steps, name the open questions, give people time, or ask for support. Wavelength does not determine your leadership response.")}
          <FieldToolLink href="https://drive.google.com/file/d/1n6iEx72rHwvkLJX4-fL6PjGoB1A677TP/view" rel="noreferrer" className="mt-4 inline-block text-xs underline">Source: The Paterson Center, Thinking Wavelength</FieldToolLink>
        </details>
      </> : <>
        <h3 className="mt-4 font-display text-2xl">One practice. One place to begin.</h3><p className="mt-2 text-sm leading-7">HID connects an activity to the whole person and what repeated experience forms. Pick one channel to explore; you do not need to complete a matrix.</p>
        {note("quietLensPractice", "Which repeated practice are you looking at?", "For example: showing the plan only when it is time to approve it.")}
        <label className="mt-5 block text-sm font-semibold">A health channel worth noticing<select className={input} value={values.quietLensRoot ?? ""} onChange={e => onChange("quietLensRoot", e.target.value)}><option value="">Still unsure</option>{QUIET_HEALTH.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>
        {root && <p className="mt-3 text-sm leading-7">{root[2]}</p>}
        {note("quietLensEvidence", "What have you noticed, and what do you need to ask?", "Keep an observed event separate from a possible explanation. Unknown is useful.")}
        <details className="mt-5 border-t border-[var(--ft-line)] pt-4"><summary className="cursor-pointer text-sm">The Base Elements · what repeated practice forms</summary><p className="mt-4 text-sm leading-7">Identity asks who people are becoming. Relationship asks what happens between them. Vision asks what future can emerge together. Culture grows from these and shapes them in return; it is not a fourth equal lever.</p>
          <label className="mt-4 block text-sm font-semibold">Where might this show up?<select className={input} value={values.quietLensElement ?? ""} onChange={e => onChange("quietLensElement", e.target.value)}><option value="">Leave open</option><option value="identity">Identity — my voice and judgment</option><option value="relationship">Relationship — what happens when we disagree</option><option value="vision">Vision — what we can imagine together</option></select></label>
          {note("quietLensFormation", "What might people learn from this practice?", "Treat this as a question to explore, not a diagnosis.")}{note("quietLensCulture", "What becomes normal, and pulls people back into it?")}
        </details><p className="mt-5 text-sm leading-7">If this suggests a useful change, put it in <strong>What could you do differently?</strong> above. Only that deliberate proposal enters your saved note.</p>
      </>}
      <FieldToolLink className="mt-5 inline-block text-xs underline underline-offset-4" href={`/field-tools/when-the-team-goes-quiet/guide#guide-${step===1?2:4}`}>Read the optional connections in the Guide →</FieldToolLink>
    </div>
  </details>;
}
