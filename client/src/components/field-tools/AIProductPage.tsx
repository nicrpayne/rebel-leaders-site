import { AI_LABS, AI_LAB_UPDATES } from "@shared/field-tool-public-copy";
import FieldToolLink from "@/components/field-tools/FieldToolLink";
import FieldToolSalesProof, {
  FieldToolBuyerQuestions,
} from "./FieldToolSalesProof";
import { trpc } from "@/lib/trpc";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import { aiProductCopy } from "@/lib/ai-product";
import FieldToolsNav from "./FieldToolsNav";
import FieldToolsFooter from "./FieldToolsFooter";
import AIProductContents from "./AIProductContents";
import FieldToolBuyActions from "./FieldToolBuyActions";
import AIKitPreview from "./AIKitPreview";
import DeliveryExample from "./DeliveryExample";
import { useSalesPageAnchor } from "./useSalesPageAnchor";
import "./ai-library.css";

export default function AIProductPage({ audience }: { audience: Audience }) {
  useSalesPageAnchor();
  const base = fieldToolBase("ai-stalemate", audience);
  const copy = aiProductCopy(audience);
  const access = trpc.fieldTools.access.useQuery();
  return (
    <main className="ai-product bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolsNav />
      {access.data?.proposal && (
        <div className="ai-review-ribbon">
          <FieldToolLink href="/field-tools/proposal">
            Separate proposal · review desk →
          </FieldToolLink>
        </div>
      )}
      <header className={`ai-product-hero ai-product-hero-${audience}`}>
        <div className="ai-hero-photo">
          <img
            src={
              audience === "lead-dev"
                ? "/assets/field-tools/ai-stalemate-hero-v2.webp"
                : "/assets/field-tools/ai-stalemate-library-hero-v1.webp"
            }
            alt={
              audience === "lead-dev"
                ? "Nic Payne laughing in his study"
                : "Nic Payne in his study"
            }
            className="ai-teacher"
          />
        </div>
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
          <p className="ai-hero-note">
            A Field Guide and two interactive Labs · $47, one time
          </p>
          <FieldToolLink className="ai-hero-example-link" href="#delivery-example">
            See how the Delivery Map works →
          </FieldToolLink>
        </div>
        <div className="ft-photo-caption">
          <span /> Hope is rebellious.
        </div>
      </header>
      <section id="purchase" className="ai-purchase-section">
        <div>
          <AIProductContents audience={audience} />
          <div className="ai-kit-included">
            <AIKitPreview audience={audience} />
          </div>
        </div>
        <aside className="ai-purchase-card">
          <p className="ai-eyebrow">
            AI STALEMATE / {audience === "pm" ? "PM" : "LEAD DEVELOPER"}
          </p>
          <p className="ai-price">
            $47 <small>USD · one time</small>
          </p>
          <p>
            Your {audience === "pm" ? "Product Manager" : "Lead Developer"} Field
            Guide and {AI_LABS}. {AI_LAB_UPDATES}
          </p>
          <p>
            Start on your own, then take your notes into the conversation. Your{" "}
            {audience === "pm" ? "lead developer" : "PM"} doesn’t need to buy a
            copy to talk it through with you.
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
          <div className="ai-purchase-help">
            <p className="ai-refund-note">
              <strong>60-day full refund. No explanation needed.</strong>
              <FieldToolLink href="/field-tools/purchase-help" className="underline">
                Purchase, access, and refund details
              </FieldToolLink>
            </p>
            <div className="ai-purchase-links">
              <FieldToolLink href={`${base}/access`} className="ai-small underline">
                {access.data?.preview
                  ? "Open the review copy →"
                  : "Already have this? Open your tool →"}
              </FieldToolLink>
              <FieldToolLink
                href={fieldToolBase(
                  "ai-stalemate",
                  audience === "pm" ? "lead-dev" : "pm"
                )}
                className="ai-small underline"
              >
                Looking for the {audience === "pm" ? "Lead Developer" : "PM"}{" "}
                edition? →
              </FieldToolLink>
            </div>
          </div>
        </aside>
      </section>
      <DeliveryExample />
      <details className="ai-product-example">
        <summary>
          See the Conversation Companion in action{" "}
          <span>A fictional conversation and the notes you can make</span>
        </summary>
        <FieldToolSalesProof
          slug="ai-stalemate"
          audience={audience}
          showRoleLinks={false}
        />
      </details>
      <FieldToolBuyerQuestions audience={audience} />
      <FieldToolsFooter />
    </main>
  );
}
