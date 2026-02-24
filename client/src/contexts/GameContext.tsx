/*
 * GAME ENGINE — The Rebel XP System
 * Tracks page visits, scroll completion, achievements, Easter eggs, and time played.
 * All state persisted to localStorage. XP capped at ~85% without Easter eggs.
 */

import { createContext, useContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/* ─── XP Configuration ─── */
const STORAGE_KEY = "rebel-leaders-game";

// Page visit XP (5 XP each = 45 XP for 9 pages)
const PAGE_VISIT_XP: Record<string, number> = {
  home: 5,
  map: 5,
  "new-player": 5,
  archives: 5,
  shelf: 5,
  about: 5,
  mirror: 5,
  armory: 5,
  residency: 5,
};

// Scroll completion bonus (10 XP each = 20 XP for 2 long pages)
const SCROLL_COMPLETE_XP: Record<string, number> = {
  home: 10,
  map: 10,
};

// Easter egg XP (reserved slots — 15 XP each, 5 eggs = 75 XP)
// Total possible: 45 + 20 + 75 = 140 XP
// Without Easter eggs: 65/140 = ~46% ... let's adjust
// Better: page visits = 5 each (9 pages = 45), scroll = 10 each (2 pages = 20)
// Normal max = 65 XP out of 100 scale = 65%
// Easter eggs fill the remaining 35% (5 eggs × 7 XP = 35)
// Total = 100 XP = 100%
const EASTER_EGG_XP = 7;
const TOTAL_EASTER_EGGS = 5;
const MAX_XP = 100; // 45 (visits) + 20 (scrolls) + 35 (eggs) = 100

/* ─── Achievement Definitions ─── */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji for now, pixel art later
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-visit", title: "Quest Begun", description: "Visited your first page", icon: "⚔️" },
  { id: "explorer", title: "Explorer", description: "Visited 5 different pages", icon: "🗺️" },
  { id: "cartographer", title: "Cartographer", description: "Visited every page", icon: "🏆" },
  { id: "scroll-home", title: "Deep Reader", description: "Read the full Home page", icon: "📜" },
  { id: "scroll-map", title: "Map Walker", description: "Read the full Manifesto", icon: "🧭" },
  { id: "xp-25", title: "Initiate", description: "Reached 25 XP", icon: "🌱" },
  { id: "xp-50", title: "Journeyman", description: "Reached 50 XP", icon: "🔥" },
  { id: "xp-65", title: "Rebel", description: "Reached 65 XP — max without secrets", icon: "⭐" },
  { id: "first-egg", title: "Secret Found", description: "Discovered a hidden Easter egg", icon: "🥚" },
  { id: "all-eggs", title: "Loremaster", description: "Found all hidden secrets", icon: "👑" },
  { id: "xp-100", title: "Fully Alive", description: "100% completion", icon: "✨" },
  { id: "time-30", title: "Present", description: "Spent 30 minutes in the rebellion", icon: "⏳" },
  { id: "time-60", title: "Committed", description: "Spent 1 hour in the rebellion", icon: "🕐" },
  { id: "runner_complete", title: "Level Complete", description: "Completed the Manifesto side-scroller", icon: "🎮" },
];

/* ─── State Shape ─── */
interface GameState {
  xp: number;
  visitedPages: string[];
  scrolledPages: string[];
  foundEggs: string[];
  unlockedAchievements: string[];
  timePlayedSeconds: number;
  hudMinimized: boolean;
  firstVisitTimestamp: number;
}

const DEFAULT_STATE: GameState = {
  xp: 0,
  visitedPages: [],
  scrolledPages: [],
  foundEggs: [],
  unlockedAchievements: [],
  timePlayedSeconds: 0,
  hudMinimized: false,
  firstVisitTimestamp: Date.now(),
};

/* ─── Toast Queue ─── */
export interface ToastItem {
  id: string;
  achievement: Achievement;
  timestamp: number;
}

/* ─── Context Interface ─── */
interface GameContextValue {
  state: GameState;
  xpPercent: number;
  trackPageVisit: (pageId: string) => void;
  trackScrollComplete: (pageId: string) => void;
  trackEasterEgg: (eggId: string) => void;
  toggleHud: () => void;
  toasts: ToastItem[];
  dismissToast: (id: string) => void;
  getAchievement: (id: string) => Achievement | undefined;
  isAchievementUnlocked: (id: string) => boolean;
  awardAchievement: (id: string) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

/* ─── Helpers ─── */
function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, firstVisitTimestamp: Date.now() };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE, firstVisitTimestamp: Date.now() };
  }
}

function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

/* ─── Provider ─── */
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(loadState);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastTimeouts = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Persist state on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Time tracking — increment every 10 seconds while page is visible
  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) {
        setState((prev) => ({
          ...prev,
          timePlayedSeconds: prev.timePlayedSeconds + 10,
        }));
      }
    }, 10_000);
    return () => clearInterval(interval);
  }, []);

  // Check time-based achievements
  useEffect(() => {
    const minutes = Math.floor(state.timePlayedSeconds / 60);
    if (minutes >= 30) unlockAchievement("time-30");
    if (minutes >= 60) unlockAchievement("time-60");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timePlayedSeconds]);

  // Show toast for achievement
  const showToast = useCallback((achievement: Achievement) => {
    const id = `${achievement.id}-${Date.now()}`;
    const toast: ToastItem = { id, achievement, timestamp: Date.now() };
    setToasts((prev) => [...prev, toast]);

    // Auto-dismiss after 4 seconds
    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      toastTimeouts.current.delete(id);
    }, 4000);
    toastTimeouts.current.set(id, timeout);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timeout = toastTimeouts.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      toastTimeouts.current.delete(id);
    }
  }, []);

  // Unlock achievement (idempotent)
  const unlockAchievement = useCallback(
    (achievementId: string) => {
      setState((prev) => {
        if (prev.unlockedAchievements.includes(achievementId)) return prev;
        const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
        if (achievement) {
          // Use setTimeout to avoid state update during render
          setTimeout(() => showToast(achievement), 100);
        }
        return {
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, achievementId],
        };
      });
    },
    [showToast]
  );

  // Check XP-based achievements
  const checkXpAchievements = useCallback(
    (xp: number) => {
      if (xp >= 25) unlockAchievement("xp-25");
      if (xp >= 50) unlockAchievement("xp-50");
      if (xp >= 65) unlockAchievement("xp-65");
      if (xp >= 100) unlockAchievement("xp-100");
    },
    [unlockAchievement]
  );

  // Check visit-count achievements
  const checkVisitAchievements = useCallback(
    (visitedPages: string[]) => {
      if (visitedPages.length >= 1) unlockAchievement("first-visit");
      if (visitedPages.length >= 5) unlockAchievement("explorer");
      if (visitedPages.length >= Object.keys(PAGE_VISIT_XP).length) unlockAchievement("cartographer");
    },
    [unlockAchievement]
  );

  // Track page visit
  const trackPageVisit = useCallback(
    (pageId: string) => {
      setState((prev) => {
        if (prev.visitedPages.includes(pageId)) return prev;
        if (!(pageId in PAGE_VISIT_XP)) return prev;

        const newVisited = [...prev.visitedPages, pageId];
        const newXp = Math.min(prev.xp + PAGE_VISIT_XP[pageId], MAX_XP);

        setTimeout(() => {
          checkVisitAchievements(newVisited);
          checkXpAchievements(newXp);
        }, 200);

        return { ...prev, visitedPages: newVisited, xp: newXp };
      });
    },
    [checkVisitAchievements, checkXpAchievements]
  );

  // Track scroll completion
  const trackScrollComplete = useCallback(
    (pageId: string) => {
      setState((prev) => {
        if (prev.scrolledPages.includes(pageId)) return prev;
        if (!(pageId in SCROLL_COMPLETE_XP)) return prev;

        const newScrolled = [...prev.scrolledPages, pageId];
        const newXp = Math.min(prev.xp + SCROLL_COMPLETE_XP[pageId], MAX_XP);

        const achievementId = pageId === "home" ? "scroll-home" : pageId === "map" ? "scroll-map" : null;
        if (achievementId) {
          setTimeout(() => {
            unlockAchievement(achievementId);
            checkXpAchievements(newXp);
          }, 200);
        }

        return { ...prev, scrolledPages: newScrolled, xp: newXp };
      });
    },
    [unlockAchievement, checkXpAchievements]
  );

  // Track Easter egg discovery
  const trackEasterEgg = useCallback(
    (eggId: string) => {
      setState((prev) => {
        if (prev.foundEggs.includes(eggId)) return prev;
        if (prev.foundEggs.length >= TOTAL_EASTER_EGGS) return prev;

        const newEggs = [...prev.foundEggs, eggId];
        const newXp = Math.min(prev.xp + EASTER_EGG_XP, MAX_XP);

        setTimeout(() => {
          if (newEggs.length === 1) unlockAchievement("first-egg");
          if (newEggs.length >= TOTAL_EASTER_EGGS) unlockAchievement("all-eggs");
          checkXpAchievements(newXp);
        }, 200);

        return { ...prev, foundEggs: newEggs, xp: newXp };
      });
    },
    [unlockAchievement, checkXpAchievements]
  );

  // Toggle HUD
  const toggleHud = useCallback(() => {
    setState((prev) => ({ ...prev, hudMinimized: !prev.hudMinimized }));
  }, []);

  const xpPercent = Math.round((state.xp / MAX_XP) * 100);

  const getAchievement = useCallback((id: string) => ACHIEVEMENTS.find((a) => a.id === id), []);
  const isAchievementUnlocked = useCallback((id: string) => state.unlockedAchievements.includes(id), [state.unlockedAchievements]);

  return (
    <GameContext.Provider
      value={{
        state,
        xpPercent,
        trackPageVisit,
        trackScrollComplete,
        trackEasterEgg,
        toggleHud,
        toasts,
        dismissToast,
        getAchievement,
        isAchievementUnlocked,
        awardAchievement: unlockAchievement,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
