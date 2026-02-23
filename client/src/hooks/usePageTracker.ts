/*
 * usePageTracker — Combines page-visit XP and scroll-completion XP tracking.
 * Drop into any page component to automatically award XP.
 *
 * Usage:
 *   usePageTracker("home", true);  // tracks visit + scroll completion
 *   usePageTracker("shelf");       // tracks visit only
 */

import { useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { useScrollTracker } from "./useScrollTracker";

export function usePageTracker(pageId: string, trackScroll: boolean = false) {
  const { trackPageVisit, trackScrollComplete } = useGame();

  // Track page visit on mount
  useEffect(() => {
    trackPageVisit(pageId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  // Track scroll completion if enabled
  useScrollTracker(
    pageId,
    trackScroll ? trackScrollComplete : () => {}
  );
}
