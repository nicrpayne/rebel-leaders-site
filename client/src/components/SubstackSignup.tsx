import { useId, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const SUBSTACK_URL = "https://leaderrebellion.substack.com";

interface SubstackSignupProps {
  variant?: "inline" | "featured" | "field-tool";
  className?: string;
}

// All signup locations use the same publication and Substack's supported form.
// Load it only on request; never pass purchase email, draft text, or access URLs.
export default function SubstackSignup({
  variant = "inline",
  className = "",
}: SubstackSignupProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const fieldTool = variant === "field-tool";
  return (
    <div
      className={`${variant === "featured" ? "dialogue-box max-w-md mx-auto" : ""} ${className}`}
    >
      {!open ? (
        <button
          type="button"
          data-ft-action="newsletter_open"
          aria-expanded={false}
          aria-controls={id}
          className={
            fieldTool
              ? "ft-button ft-button-gold"
              : "w-full bg-gold/10 border border-gold/40 px-4 py-3 font-ui text-sm text-gold hover:bg-gold/20 transition-colors"
          }
          onClick={() => {
            setOpen(true);
            trackEvent("newsletter_signup_opened", { placement: variant });
          }}
        >
          Get Nic’s notes by email
        </button>
      ) : (
        <div id={id} className="overflow-hidden rounded-sm bg-white">
          <iframe
            src={`${SUBSTACK_URL}/embed`}
            title="Subscribe to Rebel Leaders on Substack"
            width="100%"
            height="560"
            style={{ border: 0, display: "block" }}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      <p
        className={
          fieldTool
            ? "mt-3 font-ui text-xs leading-6 text-[var(--ft-muted)]"
            : "mt-3 font-ui text-xs leading-relaxed text-parchment-dim/60"
        }
      >
        Free and optional. Practical notes on leading people, plus new Field
        Tools. Unsubscribe anytime.
      </p>
      {open && (
        <a
          href={`${SUBSTACK_URL}/subscribe?simple=true`}
          target="_blank"
          rel="noopener noreferrer"
          data-ft-action="newsletter_open"
          className={
            fieldTool
              ? "mt-2 inline-block font-ui text-xs underline text-[var(--ft-ink)]"
              : "mt-2 inline-block font-ui text-xs underline text-gold/80"
          }
        >
          Open the signup on Substack{fieldTool ? "" : " ↗"}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
