/*
 * useScrollTracker — Fires a callback when the user scrolls to ~90% of the page.
 * Used to award scroll-completion XP on long pages (Home, Map).
 */

import { useEffect, useRef } from "react";

export function useScrollTracker(pageId: string, onComplete: (pageId: string) => void) {
  const fired = useRef(false);

  useEffect(() => {
    fired.current = false;

    const handleScroll = () => {
      if (fired.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (docHeight <= 0) return;

      const scrollPercent = scrollTop / docHeight;

      if (scrollPercent >= 0.88) {
        fired.current = true;
        onComplete(pageId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageId, onComplete]);
}
