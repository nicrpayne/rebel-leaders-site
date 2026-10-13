import type { Audience } from "@/lib/field-tool-paths";

// Exact product assets, composed in CSS. No generated text or skewed screen contents.
export default function AIKitPreview({ audience }: { audience: Audience }) {
  return <figure className="ai-kit" aria-label="The Field Guide and interactive Lab">
    <div className="ai-kit-book"><img src={`/assets/field-tools/ai-stalemate-${audience}-cover.webp`} alt={`${audience === "pm" ? "PM" : "Lead developer"} Field Guide cover`} /></div>
    <div className="ai-kit-laptop"><div className="ai-kit-screen"><img src="/assets/field-tools/ai-stalemate-lab-preview.webp" alt="Actual AI Stalemate Lab preview showing the Conversation step" /></div><div className="ai-kit-base" /></div>
    <div className="ai-kit-phone" aria-hidden="true"><small>YOUR LAB</small><strong>One useful<br />next move.</strong><span>01 / SHARE THE CONTEXT</span><div>What outcome matters?</div><div>What is still unresolved?</div><b>Build my brief →</b></div>
    <figcaption>READ IT. WORK IT. TAKE THE RESULT INTO THE ROOM.</figcaption>
  </figure>;
}
