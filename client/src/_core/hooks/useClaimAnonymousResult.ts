/**
 * useClaimAnonymousResult — Claims anonymous localStorage results after OAuth login
 *
 * After a user completes OAuth and the session is established, this hook:
 * 1. Checks if there are unclaimed Gravitas/Mirror results in localStorage
 * 2. Re-saves them to the database with the new userId
 * 3. Marks them as claimed so it doesn't re-fire
 *
 * Should be mounted once, high in the component tree (e.g., App.tsx or a layout wrapper).
 */

import { useEffect, useRef } from "react";
import { useAuth } from "./useAuth";
import { trpcVanilla } from "@/lib/trpc-vanilla";

export function useClaimAnonymousResult() {
  const { user, isAuthenticated, loading } = useAuth();
  const claimedRef = useRef(false);

  useEffect(() => {
    // Wait for auth to resolve
    if (loading) return;
    // Only run for authenticated users
    if (!isAuthenticated || !user) return;
    // Only claim once per session
    if (claimedRef.current) return;
    // Check if we already claimed
    if (localStorage.getItem("resultsClaimed") === "true") return;

    claimedRef.current = true;

    const claimResults = async () => {
      try {
        // Check for unclaimed Gravitas results
        const gravitasStored = localStorage.getItem("gravityCheckResults");
        const gravitasSaved = localStorage.getItem("gravitasReadingSaved");

        if (gravitasStored && gravitasSaved !== "true") {
          const results = JSON.parse(gravitasStored);

          // Also check for Mirror results to include in the payload
          const mirrorStored = localStorage.getItem("mirrorResult");
          const mirrorResult = mirrorStored ? JSON.parse(mirrorStored) : null;

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
            fullPayload: {
              ...results,
              ...(mirrorResult ? { mirrorResult } : {}),
            },
          });

          // Mark as saved
          localStorage.setItem("gravitasReadingSaved", "true");
          if (mirrorResult) {
            localStorage.setItem("mirrorReadingSaved", "true");
          }

          console.log("[ClaimResult] Anonymous Gravitas result claimed for user", user.id);
        }

        // Mark claiming as complete
        localStorage.setItem("resultsClaimed", "true");

        // Handle post-auth redirect if one was stored
        const redirectPath = localStorage.getItem("postAuthRedirect");
        if (redirectPath) {
          localStorage.removeItem("postAuthRedirect");
          // Only redirect if we're on the home page (OAuth callback redirects to /)
          if (window.location.pathname === "/") {
            window.location.href = redirectPath;
          }
        }
      } catch (err) {
        console.error("[ClaimResult] Failed to claim anonymous result:", err);
        // Don't mark as claimed so it can retry next time
        claimedRef.current = false;
      }
    };

    claimResults();
  }, [loading, isAuthenticated, user]);
}
