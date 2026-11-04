import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { aiProductCopy } from "@/lib/ai-product";
import { fieldToolsHref } from "@shared/field-tool-domains";
import "./field-tools-collection.css";

export default function AIStalemateEditions() {
  return (
    <div className="ft-editions">
      {(["pm", "lead-dev"] as const).map(audience => {
        const copy = aiProductCopy(audience);
        const role = audience === "pm" ? "Product Manager" : "Lead Developer";
        return (
          <Link
            key={audience}
            href={fieldToolsHref(
              window.location.hostname,
              `/field-tools/ai-stalemate/${audience}`
            )}
            className="ft-edition"
            aria-label={`Explore AI Stalemate — ${role} edition`}
          >
            <div className="ft-edition-photo">
              <img
                src={
                  audience === "pm"
                    ? "/assets/field-tools/ai-stalemate-library-hero-v1.webp"
                    : "/assets/field-tools/ai-stalemate-hero-v2.webp"
                }
                alt={
                  audience === "pm"
                    ? "Nic Payne in his study"
                    : "Nic Payne laughing in his study"
                }
                width={1672}
                height={941}
                loading="lazy"
              />
              <p>
                Hope is
                <br />
                rebellious.
              </p>
            </div>
            <div className="ft-edition-copy">
              <p className="ft-collection-eyebrow">AI STALEMATE / {role}</p>
              <h3>{copy.headline}</h3>
              <p className="ft-edition-description">{copy.promise}</p>
              <div className="ft-edition-action">
                <span>
                  Explore this edition{" "}
                  <ArrowRight size={18} aria-hidden="true" />
                </span>
                <span>
                  $47 <small>USD</small>
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
