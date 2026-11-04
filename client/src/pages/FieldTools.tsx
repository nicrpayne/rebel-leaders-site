import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";
import AIStalemateEditions from "@/components/field-tools/AIStalemateEditions";

export default function FieldTools() {
  return (
    <main className="ft-collection">
      <FieldToolsNav />
      <header className="ft-collection-intro ft-collection-width">
        <p className="ft-collection-eyebrow">FIELD TOOLS BY REBEL LEADERS</p>
        <h1>
          Something at work
          <br />
          <em>keeps getting stuck?</em>
        </h1>
        <p className="ft-collection-lead">
          A difficult conversation. A team that’s busy but can’t seem to ship.
          Get clearer about what’s happening—and find a useful next step.
        </p>
        <div className="ft-collection-return">
          <span>Already have a Field Tool?</span>
          <Link href="/field-tools/sign-in" className="ft-collection-link">
            Open your tools <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </header>
      <section
        className="ft-collection-width ft-collection-products"
        aria-labelledby="collection-editions"
      >
        <div className="ft-collection-section-heading">
          <div>
            <p className="ft-collection-eyebrow">
              START WITH THE CONVERSATION ABOUT AI
            </p>
            <h2 id="collection-editions">AI Stalemate</h2>
          </div>
          <p>
            Choose the edition for your role.
            <br />
            Each works on its own.
          </p>
        </div>
        <AIStalemateEditions />
        <div className="ft-collection-included">
          <p>
            A Field Guide to think it through. Interactive tools to prepare your
            conversation and find where delivery gets stuck.
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
