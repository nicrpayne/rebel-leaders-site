import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import AIStalemateEditions from "./field-tools/AIStalemateEditions";
import { fieldToolsHref } from "@shared/field-tool-domains";

export default function FieldToolsHomeSection() {
  return (
    <section
      className="ft-home-bridge"
      id="field-tools"
      aria-labelledby="field-tools-heading"
    >
      <div className="ft-collection-width">
        <div className="ft-home-intro">
          <div>
            <p className="ft-collection-eyebrow">REBEL LEADERS / FIELD TOOLS</p>
            <h2 id="field-tools-heading">
              Something at work
              <br />
              <em>keeps getting stuck?</em>
            </h2>
            <p className="ft-collection-lead">
              Practical guides and interactive tools for the conversations you
              keep putting off—and the work that keeps getting held up.
            </p>
          </div>
          <Link
            className="ft-collection-link"
            href={fieldToolsHref(window.location.hostname)}
          >
            Explore Field Tools <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <AIStalemateEditions />
        <p className="ft-collection-note">
          Start with AI Stalemate. Two perspectives on the same stuck
          conversation. Choose the edition for your role.
        </p>
      </div>
    </section>
  );
}
