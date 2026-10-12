import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import FieldToolsNav from "./FieldToolsNav";
import "./field-tools.css";

export default function FieldToolHero({
  eyebrow,
  headline,
  description,
  image,
  imageLayout = "portrait",
  children,
  primary,
  secondary,
  facts,
  showCaption = true,
}: {
  eyebrow: string;
  headline: ReactNode;
  description: string;
  image: string;
  imageLayout?: "portrait" | "wide";
  children?: ReactNode;
  primary: { label: string; href: string; onClick?: () => void };
  secondary?: { label: string; href: string };
  facts: string[];
  showCaption?: boolean;
}) {
  return (
    <div className={`ft-hero ft-hero--${imageLayout}`}>
      <div className="ft-hero-photo">
        <img
          src={image}
          alt="Nic Payne, founder of Rebel Leaders"
          width={imageLayout === "wide" ? 1672 : 1122}
          height={imageLayout === "wide" ? 941 : 1402}
          fetchPriority="high"
        />
        {showCaption && (
          <div className="ft-photo-caption">
            <span /> BETTER LEADERS. BRIGHTER WORK.
          </div>
        )}
      </div>
      <FieldToolsNav />
      <section className="ft-hero-inner">
        <div className="ft-hero-copy">
          <p className="ft-eyebrow">
            <span />
            {eyebrow}
          </p>
          <h1 className="ft-headline">{headline}</h1>
          <p className="ft-deck">{description}</p>
          {children}
          <div className="ft-actions">
            {primary.onClick ? (
              <button
                type="button"
                onClick={primary.onClick}
                className="ft-button ft-button-gold"
              >
                {primary.label}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ) : (
              <Link href={primary.href} className="ft-button ft-button-gold">
                {primary.label}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            )}
            {secondary &&
              (secondary.href.startsWith("#") ? (
                <a
                  href={secondary.href}
                  className="ft-button ft-button-outline"
                >
                  {secondary.label}
                </a>
              ) : (
                <Link
                  href={secondary.href}
                  className="ft-button ft-button-outline"
                >
                  {secondary.label}
                </Link>
              ))}
          </div>
          <p className="ft-founder-note">
            Built by Nic Payne · Working product leader, founder of Rebel
            Leaders
          </p>
        </div>
      </section>
      <div className="ft-facts">
        <div>
          {facts.map(fact => (
            <p key={fact}>
              <Check size={14} aria-hidden="true" />
              {fact}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
