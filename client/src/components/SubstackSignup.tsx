/**
 * SubstackSignup — RPG-styled Substack newsletter signup
 * Uses Substack's iframe embed with custom styling wrapper.
 * Variant "inline" = compact for footer/sidebar, "featured" = full section with context.
 */

import { useState, useRef } from "react";
import { toast } from "sonner";

const SUBSTACK_URL = "https://leaderrebellion.substack.com";

interface SubstackSignupProps {
  variant?: "inline" | "featured";
  className?: string;
}

export default function SubstackSignup({ variant = "inline", className = "" }: SubstackSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Use Substack's subscribe endpoint
      const res = await fetch(`${SUBSTACK_URL}/api/v1/free`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_url: window.location.href,
          first_referrer: document.referrer || "",
          current_url: window.location.href,
          current_referrer: document.referrer || "",
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setEmail("");
        toast("Quest accepted.", {
          description: "Check your inbox to confirm your subscription.",
        });
      } else {
        // Fallback: open Substack subscribe page
        window.open(`${SUBSTACK_URL}/subscribe?simple=true&next=https%3A%2F%2F${encodeURIComponent("leaderrebellion.substack.com")}%2F`, "_blank");
        toast("Opening Substack...", {
          description: "Complete your signup on Substack.",
        });
      }
    } catch {
      // CORS will likely block the API call — fallback to opening Substack
      window.open(`${SUBSTACK_URL}/subscribe?simple=true`, "_blank");
      toast("Opening Substack...", {
        description: "Complete your signup on Substack.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "featured") {
    return (
      <div className={`dialogue-box max-w-md mx-auto ${className}`}>
        <p className="font-pixel text-[8px] text-gold/50 mb-4 tracking-wider">NEW QUEST AVAILABLE</p>

        {isSuccess ? (
          <div className="text-center py-4">
            <p className="font-pixel text-[10px] text-gold tracking-wider mb-2">QUEST ACCEPTED ✓</p>
            <p className="font-display text-sm text-parchment-dim/70">
              Check your inbox to confirm. Welcome to the rebellion.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="flex-1 bg-forest-deep/60 border-2 border-wood/30 px-4 py-3 text-parchment placeholder:text-parchment-dim/30 font-ui text-sm focus:outline-none focus:border-gold/50 transition-colors duration-300"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold/15 border-2 border-gold/40 px-6 py-3 font-pixel text-[9px] tracking-wider text-gold hover:bg-gold/25 hover:border-gold/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "..." : "JOIN"}
              </button>
            </div>
            <p className="font-pixel text-[6px] text-parchment-dim/25 mt-3 tracking-wider">
              NO SPAM. NO HUSTLE. JUST IDEAS WORTH SITTING WITH.
            </p>
          </form>
        )}
      </div>
    );
  }

  // Inline variant — compact for footer
  return (
    <div className={className}>
      {isSuccess ? (
        <div className="text-center py-2">
          <p className="font-pixel text-[8px] text-gold/60 tracking-wider">QUEST ACCEPTED ✓</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-forest-deep/60 border border-wood/20 px-3 py-2 text-parchment placeholder:text-parchment-dim/25 font-ui text-xs focus:outline-none focus:border-gold/40 transition-colors duration-300 min-w-0"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold/10 border border-gold/30 px-4 py-2 font-pixel text-[7px] tracking-wider text-gold hover:bg-gold/20 hover:border-gold/50 transition-all duration-300 shrink-0 disabled:opacity-50"
            >
              {isSubmitting ? "..." : "JOIN"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
