/**
 * SaveReadingPrompt — "Save Your Reading" UI Surface
 *
 * Behavior:
 *   - If user is authenticated → save silently, show toast confirmation
 *   - If user is not authenticated → show inline prompt with OAuth CTA
 *   - Never blocks the experience; appears after the reading has landed
 *
 * Props:
 *   - context: "gravitas" | "mirror" — determines what data to save
 *   - onSaved?: () => void — callback after successful save
 */

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpcVanilla } from "@/lib/trpc-vanilla";
import { cn } from "@/lib/utils";

type SaveContext = "gravitas" | "mirror";

interface SaveReadingPromptProps {
  context: SaveContext;
  onSaved?: () => void;
}

// ─── Toast Notification ─────────────────────────────────────────────

function SaveToast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0e0e12] border border-green-900/40 rounded-sm shadow-lg">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
        <span className="text-[10px] font-pixel tracking-widest text-green-400/80 uppercase">
          {message}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export default function SaveReadingPrompt({ context, onSaved }: SaveReadingPromptProps) {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [showToast, setShowToast] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // ─── Auto-save for authenticated users ─────────────────────────

  const saveToDatabase = useCallback(async () => {
    if (saveState !== "idle") return;
    setSaveState("saving");

    try {
      if (context === "gravitas") {
        const stored = localStorage.getItem("gravityCheckResults");
        if (!stored) {
          setSaveState("error");
          return;
        }
        const results = JSON.parse(stored);
        await trpcVanilla.gravitas.save.mutate({
          scanMode: results.scanMode || "SCAN",
          identity: results.identity,
          relationship: results.relationship,
          vision: results.vision,
          culture: results.culture,
          total: results.total,
          archetype: results.archetype,
          leak: results.leak,
          force: results.force,
          fullPayload: results,
        });
      } else if (context === "mirror") {
        // Mirror results are saved alongside Gravitas — the Mirror result
        // enriches the Gravitas payload. Save the combined data.
        const gravitasStored = localStorage.getItem("gravityCheckResults");
        const mirrorStored = localStorage.getItem("mirrorResult");
        if (!gravitasStored) {
          setSaveState("error");
          return;
        }
        const gravitasResults = JSON.parse(gravitasStored);
        const mirrorResult = mirrorStored ? JSON.parse(mirrorStored) : null;
        await trpcVanilla.gravitas.save.mutate({
          scanMode: gravitasResults.scanMode || "SCAN",
          identity: gravitasResults.identity,
          relationship: gravitasResults.relationship,
          vision: gravitasResults.vision,
          culture: gravitasResults.culture,
          total: gravitasResults.total,
          archetype: gravitasResults.archetype,
          leak: gravitasResults.leak,
          force: gravitasResults.force,
          fullPayload: {
            ...gravitasResults,
            mirrorResult,
          },
        });
      }

      setSaveState("saved");
      setShowToast(true);
      // Mark as saved in localStorage so we don't prompt again this session
      localStorage.setItem(`${context}ReadingSaved`, "true");
      onSaved?.();

      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("[SaveReading] Failed to save:", err);
      setSaveState("error");
    }
  }, [context, saveState, onSaved]);

  // Auto-save when authenticated and not already saved
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) return;
    if (saveState !== "idle") return;

    // Check if already saved this session
    const alreadySaved = localStorage.getItem(`${context}ReadingSaved`);
    if (alreadySaved === "true") {
      setSaveState("saved");
      return;
    }

    saveToDatabase();
  }, [authLoading, isAuthenticated, saveState, context, saveToDatabase]);

  // ─── Don't render anything while auth is loading ───────────────

  if (authLoading) return null;

  // ─── Authenticated: just show the toast ────────────────────────

  if (isAuthenticated) {
    return <SaveToast message="Reading saved" visible={showToast} />;
  }

  // ─── Unauthenticated: show the save prompt ────────────────────

  // Don't show if dismissed
  if (dismissed) return null;

  // Don't show if already saved (e.g., from a previous session)
  if (localStorage.getItem(`${context}ReadingSaved`) === "true") return null;

  const handleSignIn = () => {
    // Store the current path so we can redirect back after OAuth
    localStorage.setItem("postAuthRedirect", window.location.pathname);
    window.location.href = getLoginUrl();
  };

  return (
  <>
    <div
      className="mt-6 mx-auto max-w-lg"
      style={{ animation: "savePromptFadeIn 0.6s ease-out 2s backwards" }}
    >
      <div
        style={{
          backgroundColor: "#0a0a0e",
          border: "1px solid rgba(197,160,89,0.12)",
          borderRadius: "2px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(197,160,89,0.6)" }} />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "15px",
                letterSpacing: "0.2em",
                color: "rgba(197,160,89,0.9)",
              }}
            >
              Save Your Reading
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            style={{ color: "rgba(197,160,89,0.3)", fontSize: "12px" }}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
        {/* Copy */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "16px",
            lineHeight: "1.7",
            color: "rgba(197,160,89,0.65)",
          }}
        >
          Create a free account to keep this reading and access it later.
          No spam, no gatekeeping — just a place to store what you've built here.
        </p>
        {/* CTA */}
        <button
          onClick={handleSignIn}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid rgba(197,160,89,0.25)",
            backgroundColor: "transparent",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "15px",
            letterSpacing: "0.2em",
            color: "rgba(197,160,89,0.85)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(197,160,89,0.6)";
            e.currentTarget.style.color = "rgba(197,160,89,0.85)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(197,160,89,0.25)";
            e.currentTarget.style.color = "rgba(197,160,89,0.85)";
          }}
        >
          Create Free Account
        </button>
        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "12px",
            textAlign: "center",
            letterSpacing: "0.1em",
            color: "rgba(197,160,89,0.55)",
          }}
        >
          Your reading stays even if you don't
        </p>
      </div>
    </div>
    <style>{`
      @keyframes savePromptFadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </>
);
}
