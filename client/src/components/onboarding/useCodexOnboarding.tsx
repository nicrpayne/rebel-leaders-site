import { useState, useCallback } from "react";
import { CodexWelcome } from "./CodexWelcome";
import { CodexTour } from "./CodexTour";

const STORAGE_KEY = "codex_intro_seen";

type OnboardingPhase = "welcome" | "tour" | "done";

export function useCodexOnboarding() {
  const [phase, setPhase] = useState<OnboardingPhase>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "complete" ? "done" : "welcome";
    } catch {
      return "welcome";
    }
  });

  const handleEnter = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "complete");
    } catch {}
    setPhase("tour");
  }, []);

  const handleTourComplete = useCallback(() => {
    setPhase("done");
  }, []);

  function OnboardingUI() {
    if (phase === "welcome") return <CodexWelcome onEnter={handleEnter} />;
    if (phase === "tour")    return <CodexTour onComplete={handleTourComplete} />;
    return null;
  }

  return { OnboardingUI, phase };
}
