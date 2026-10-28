import { Link } from "wouter";
import { ArrowRight, Gift } from "lucide-react";
import "./field-tool-buy-actions.css";

export default function FieldToolBuyActions({
  buyHref,
  giftHref,
  buyLabel = "Buy",
  tone = "light",
  className = "",
}: {
  buyHref?: string | null;
  giftHref: string;
  buyLabel?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const buyContent = (
    <>
      {buyLabel}
      <ArrowRight size={16} aria-hidden="true" />
    </>
  );
  return (
    <div className={`ft-buy-actions ft-buy-actions--${tone} ${className}`}>
      {!buyHref ? (
        <button type="button" className="ft-button ft-button-gold" disabled>
          {buyContent}
        </button>
      ) : buyHref.startsWith("#") || /^https?:\/\//.test(buyHref) ? (
        <a href={buyHref} className="ft-button ft-button-gold">
          {buyContent}
        </a>
      ) : (
        <Link href={buyHref} className="ft-button ft-button-gold">
          {buyContent}
        </Link>
      )}
      <Link href={giftHref} className="ft-button ft-buy-gift">
        <Gift size={16} aria-hidden="true" /> Gift this
      </Link>
    </div>
  );
}
