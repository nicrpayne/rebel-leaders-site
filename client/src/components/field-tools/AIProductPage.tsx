import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import { aiProductCopy, AI_PRODUCT_INVENTORY } from "@/lib/ai-product";
import FieldToolsNav from "./FieldToolsNav";
import FieldToolsFooter from "./FieldToolsFooter";
import RelatedFieldTools from "./RelatedFieldTools";
import AIKitPreview from "./AIKitPreview";
import "./ai-library.css";

export default function AIProductPage({ audience }: { audience: Audience }) {
  const base = fieldToolBase("ai-stalemate", audience);
  const copy = aiProductCopy(audience);
  const checkout = trpc.fieldTools.checkout.useQuery({ slug: "ai-stalemate", audience }, { retry: false });
  const access = trpc.fieldTools.access.useQuery();
  return <main className="ai-product bg-[#f3efe4] text-[#193025]">
    <FieldToolsNav />
    {access.data?.proposal && <div className="ai-review-ribbon"><Link href="/field-tools/proposal">Separate proposal · review desk →</Link></div>}
    <header className="ai-product-hero">
      <img src="/assets/field-tools/ai-stalemate-library-hero-v1.webp" alt="Nic Payne in his study" className="ai-teacher" />
      <div className="ai-hero-copy"><p className="ai-eyebrow">AI STALEMATE / {copy.role}</p><h1>{copy.headline} {copy.accent && <em>{copy.accent}</em>}</h1><p className="ai-promise">{copy.promise}</p><a href="#purchase" className="ft-button ft-button-gold">Get the Field Tool — $47 <ArrowRight size={16} /></a><p className="ai-hero-note">Field Guide · Lab · usable working documents</p></div>
    </header>
    <section id="purchase" className="ai-purchase-section">
      <div><AIKitPreview audience={audience} /><h2>What you get</h2><ul className="ai-inventory">{AI_PRODUCT_INVENTORY.map(item => <li key={item.title}><Check size={19} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ul></div>
      <aside className="ai-purchase-card"><p className="ai-eyebrow">AI STALEMATE / {audience === "pm" ? "PM" : "LEAD DEVELOPER"}</p><h2>A working kit for<br />a real conversation.</h2><p className="ai-price">$47 <small>USD · one time</small></p><p>Use on phone or computer.<br />Copy, download, or print your work.<br />No AI subscription required.</p>
        {checkout.isPending ? <p role="status">Checking checkout…</p> : checkout.data?.checkoutUrl ? <a href={checkout.data.checkoutUrl} className="ft-button ft-button-gold">Buy the Field Tool <ArrowRight size={16} /></a> : access.data?.preview ? <><Link href={`${base}/access`} className="ft-button ft-button-gold">Open the review copy →</Link><p className="ai-small">Review access · no payment taken.</p></> : <div role="status" className="ai-small">{checkout.error ? "Checkout is temporarily unavailable." : "Purchases are not open yet."}<button className="block underline mt-2" onClick={() => checkout.refetch()}>Check again</button></div>}
        <Link href={`${base}/access`} className="ai-small underline">Already purchased? Open your tool →</Link>
      </aside>
    </section>
    <section className="ai-teacher-note"><p className="ai-eyebrow">A NOTE FROM NIC</p><p>“You don’t need to win the argument. You need a clearer picture of what matters, what needs to be true, and what you can do together.”</p><span>Nic Payne · Rebel Leaders</span></section>
    <RelatedFieldTools slug="ai-stalemate" audience={audience} /><FieldToolsFooter />
  </main>;
}
