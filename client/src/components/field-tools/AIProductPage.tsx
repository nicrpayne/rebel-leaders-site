import FieldToolSalesProof, {
  FieldToolBuyerQuestions,
} from "./FieldToolSalesProof";
import { Link } from "wouter";
import { Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import { aiProductCopy, AI_PRODUCT_INVENTORY } from "@/lib/ai-product";
import FieldToolsNav from "./FieldToolsNav";
import FieldToolsFooter from "./FieldToolsFooter";
import RelatedFieldTools from "./RelatedFieldTools";
import FieldToolBuyActions from "./FieldToolBuyActions";
import AIKitPreview from "./AIKitPreview";
import "./ai-library.css";

export default function AIProductPage({ audience }: { audience: Audience }) {
  const base = fieldToolBase("ai-stalemate", audience);
  const copy = aiProductCopy(audience);
  const access = trpc.fieldTools.access.useQuery();
  return (
    <main className="ai-product bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolsNav />
      {access.data?.proposal && (
        <div className="ai-review-ribbon">
          <Link href="/field-tools/proposal">
            Separate proposal · review desk →
          </Link>
        </div>
      )}
      <header className="ai-product-hero">
        <img
          src="/assets/field-tools/ai-stalemate-library-hero-v1.webp"
          alt="Nic Payne in his study"
          className="ai-teacher"
        />
        <div className="ai-hero-copy">
          <p className="ai-eyebrow">AI STALEMATE / {copy.role}</p>
          <h1>
            {copy.headline} {copy.accent && <em>{copy.accent}</em>}
          </h1>
          <p className="ai-promise">{copy.promise}</p>
          <FieldToolBuyActions
            buyHref={`${base}/buy`}
            buyLabel="Buy — $47"
            giftHref={`${base}/buy?gift=1`}
            tone="dark"
          />
          <p className="ai-hero-note">Field Guide · Lab · written examples</p>
        </div>
        <div className="ft-photo-caption">
          <span /> Hope is rebellious.
        </div>
      </header>
      <FieldToolSalesProof slug="ai-stalemate" audience={audience} />
      <section id="purchase" className="ai-purchase-section">
        <div>
          <AIKitPreview audience={audience} />
          <h2>What you get</h2>
          <ul className="ai-inventory">
            {AI_PRODUCT_INVENTORY.map(item => (
              <li key={item.title}>
                <Check size={19} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <aside className="ai-purchase-card">
          <p className="ai-eyebrow">
            AI STALEMATE / {audience === "pm" ? "PM" : "LEAD DEVELOPER"}
          </p>
          <p className="ai-price">
            $47 <small>USD · one time</small>
          </p>
          <p>
            Use on phone or computer.
            <br />
            Copy, download, or print your work.
            <br />
            No AI subscription required.
          </p>
          <FieldToolBuyActions
            buyHref={`${base}/buy`}
            giftHref={`${base}/buy?gift=1`}
            tone="dark"
          />
          <Link href={`${base}/access`} className="ai-small underline">
            {access.data?.preview
              ? "Open the review copy →"
              : "Already have this? Open your tool →"}
          </Link>
        </aside>
      </section>
      <FieldToolBuyerQuestions />
      <RelatedFieldTools slug="ai-stalemate" audience={audience} />
      <FieldToolsFooter />
    </main>
  );
}
