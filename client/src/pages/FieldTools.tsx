import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";
import AIStalemateEditions from "@/components/field-tools/AIStalemateEditions";
import AIKitPreview from "@/components/field-tools/AIKitPreview";
import DeliveryExample from "@/components/field-tools/DeliveryExample";
import { FIELD_TOOLS_PUBLIC_COPY } from "@shared/field-tool-public-copy";
import { useSalesPageAnchor } from "@/components/field-tools/useSalesPageAnchor";

export default function FieldTools() {
  useSalesPageAnchor();
  return (
    <main className="ft-collection">
      <FieldToolsNav />
      <header className="ft-collection-intro ft-collection-width">
        <div>
          <p className="ft-collection-eyebrow">FIELD TOOLS BY REBEL LEADERS</p>
          <h1>
            {FIELD_TOOLS_PUBLIC_COPY.headline}
            <br />
            <em>{FIELD_TOOLS_PUBLIC_COPY.accent}</em>
          </h1>
          <p className="ft-collection-lead">
            {FIELD_TOOLS_PUBLIC_COPY.description}
          </p>
          <div className="ft-collection-actions">
            <a href="#collection-editions" className="ft-collection-primary">
              Find your edition <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="#delivery-example" className="ft-collection-link">
              See a quick example
            </a>
          </div>
        </div>
        <div className="ft-collection-preview">
          <AIKitPreview audience="pm" />
          <p>
            Inside AI Stalemate: the Guide and interactive tools.
            <br />
            Start with the part you need today.
          </p>
        </div>
      </header>
      <section
        className="ft-collection-width ft-collection-products"
        aria-labelledby="collection-editions"
      >
        <div className="ft-collection-section-heading">
          <div>
            <p className="ft-collection-eyebrow">AVAILABLE NOW</p>
            <h2 id="collection-editions">AI Stalemate</h2>
          </div>
          <p>
            Choose the edition for your role.
            <br />
            You don’t need both.
          </p>
        </div>
        <p className="ft-collection-product-intro">
          Prepare the AI conversation. Then look beyond the coding to find
          what’s holding delivery up.
        </p>
        <AIStalemateEditions />
        <div className="ft-collection-included">
          <p>
            Start on your own. Take your questions and notes into the
            conversation. Your colleague doesn’t need to buy a copy to talk it
            through with you.
          </p>
          <p>
            $47 USD per edition, one time.
            <br />
            <Link href="/field-tools/purchase-help">
              60-day full refund. No explanation needed.
            </Link>
          </p>
        </div>
      </section>
      <DeliveryExample />
      <aside className="ft-collection-about">
        <div className="ft-collection-width">
          <div>
            <p className="ft-collection-eyebrow">
              THE THINKING BEHIND THE TOOLS
            </p>
            <h2>
              The work matters.
              <br />
              <em>So do the people doing it.</em>
            </h2>
          </div>
          <div>
            <p>
              Field Tools put Nic’s Holistic Shaping work into practice: pay
              attention to the work, the people, and what your everyday choices
              are shaping.
            </p>
            <a
              className="ft-collection-link"
              href="https://rebel-leader.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Rebel Leaders <ArrowRight size={18} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </aside>
      <FieldToolsFooter />
    </main>
  );
}
