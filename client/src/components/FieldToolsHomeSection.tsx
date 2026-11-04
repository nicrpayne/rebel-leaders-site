import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import AIStalemateEditions from "./field-tools/AIStalemateEditions";
import { fieldToolsHref } from "@shared/field-tool-domains";
import { FIELD_TOOLS_PUBLIC_COPY } from "@shared/field-tool-public-copy";

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
              {FIELD_TOOLS_PUBLIC_COPY.headline}
              <br />
              <em>{FIELD_TOOLS_PUBLIC_COPY.accent}</em>
            </h2>
            <p className="ft-collection-lead">
              {FIELD_TOOLS_PUBLIC_COPY.description}
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
          AI Stalemate has an edition for each side of the conversation. Choose
          the one for your role. You don’t need both.
        </p>
      </div>
    </section>
  );
}
