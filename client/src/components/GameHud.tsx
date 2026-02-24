/*
 * GAME HUD — The Rebel XP Interface
 * Pixel-art styled HUD in the bottom-right corner.
 * Shows XP bar, time played, and achievement toasts.
 * Minimizable to a small icon. Mobile-friendly.
 * Clicking the achievements count opens the full achievements panel.
 */

import { useState } from "react";
import { useGame, type ToastItem } from "@/contexts/GameContext";
import { AnimatePresence, motion } from "framer-motion";
import AchievementsPanel from "./AchievementsPanel";

/* ─── Time Formatter ─── */
function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}

/* ─── Achievement Toast ─── */
function AchievementToast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={() => onDismiss(toast.id)}
      className="cursor-pointer"
    >
      <div className="relative border-2 border-gold/60 bg-forest-deep/95 backdrop-blur-sm px-4 py-3 rounded-sm shadow-lg shadow-black/40 max-w-[280px]">
        {/* Pixel corner accents */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-gold/40" />
        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-gold/40" />
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-gold/40" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-gold/40" />

        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">{toast.achievement.icon}</span>
          <div>
            <p className="font-pixel text-[9px] text-gold tracking-wider uppercase leading-tight">
              Achievement Unlocked
            </p>
            <p className="font-pixel text-[11px] text-parchment mt-1 leading-tight">
              {toast.achievement.title}
            </p>
            <p className="text-parchment-dim/60 text-xs font-display mt-0.5 leading-snug">
              {toast.achievement.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── XP Bar (pixel art style) ─── */
function XpBar({ percent }: { percent: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="font-pixel text-[8px] text-gold/70 tracking-wider">XP</span>
        <span className="font-pixel text-[8px] text-parchment-dim/50">{percent}%</span>
      </div>
      <div className="h-2.5 bg-black/60 border border-gold/30 rounded-[1px] overflow-hidden relative">
        {/* Pixel-art segmented bar */}
        <motion.div
          className="h-full relative"
          style={{
            background: percent >= 100
              ? "linear-gradient(90deg, #d4a017, #f0c040, #d4a017)"
              : percent >= 65
                ? "linear-gradient(90deg, #2d8a4e, #3cb371, #2d8a4e)"
                : "linear-gradient(90deg, #1a6b3c, #228b22, #1a6b3c)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Scanline effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main HUD Component ─── */
export default function GameHud() {
  const { state, xpPercent, toggleHud, toasts, dismissToast } = useGame();
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <>
      {/* Achievements Panel Overlay */}
      <AchievementsPanel isOpen={showAchievements} onClose={() => setShowAchievements(false)} />

      {/* Toast Stack — top-right on mobile, bottom-right above HUD on desktop */}
      <div className="fixed top-16 right-3 md:bottom-24 md:top-auto md:right-4 z-[60] flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <AchievementToast key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>

      {/* HUD Panel — bottom-right corner */}
      <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-50">
        <AnimatePresence mode="wait">
          {state.hudMinimized ? (
            /* Minimized: just a small pixel icon */
            <motion.button
              key="minimized"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={toggleHud}
              className="w-10 h-10 bg-forest-deep/90 backdrop-blur-sm border border-gold/40 rounded-sm flex items-center justify-center hover:border-gold/70 transition-colors shadow-lg shadow-black/40 group"
              title="Open Rebel HUD"
            >
              <span className="font-pixel text-[10px] text-gold/60 group-hover:text-gold transition-colors">
                XP
              </span>
            </motion.button>
          ) : (
            /* Expanded HUD */
            <motion.div
              key="expanded"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative"
            >
              <div className="bg-forest-deep/95 backdrop-blur-sm border border-gold/30 rounded-sm shadow-xl shadow-black/50 w-[200px] md:w-[220px] overflow-hidden">
                {/* Pixel corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-gold/20" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-gold/20" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-gold/20" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-gold/20" />

                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-gold/15">
                  <span className="font-pixel text-[8px] text-gold/80 tracking-widest uppercase">
                    Rebel HUD
                  </span>
                  <button
                    onClick={toggleHud}
                    className="font-pixel text-[10px] text-parchment-dim/50 hover:text-gold hover:bg-gold/10 transition-all px-1.5 py-0.5 rounded-sm border border-transparent hover:border-gold/30"
                    title="Minimize HUD"
                  >
                    ▾
                  </button>
                </div>

                {/* XP Bar */}
                <div className="px-3 pt-2.5 pb-1.5">
                  <XpBar percent={xpPercent} />
                </div>

                {/* Stats Row */}
                <div className="px-3 pb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-pixel text-[7px] text-parchment-dim/40 tracking-wider">PAGES</span>
                    <span className="font-pixel text-[9px] text-parchment-dim/70">
                      {state.visitedPages.length}/9
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-pixel text-[7px] text-parchment-dim/40 tracking-wider">SECRETS</span>
                    <span className="font-pixel text-[9px] text-parchment-dim/70">
                      {state.foundEggs.length}/5
                    </span>
                  </div>
                </div>

                {/* Time Played */}
                <div className="px-3 pb-2.5 border-t border-gold/10 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-[7px] text-parchment-dim/40 tracking-wider">
                      TIME IN THE REBELLION
                    </span>
                    <span className="font-pixel text-[9px] text-parchment-dim/60">
                      {formatTime(state.timePlayedSeconds)}
                    </span>
                  </div>
                </div>

                {/* Achievements count — clickable to open panel */}
                <div className="px-3 pb-2.5">
                  <button
                    onClick={() => setShowAchievements(true)}
                    className="w-full flex items-center justify-between group hover:bg-gold/5 -mx-1 px-1 py-0.5 rounded-sm transition-colors"
                    title="View all achievements"
                  >
                    <span className="font-pixel text-[7px] text-parchment-dim/40 tracking-wider group-hover:text-gold/60 transition-colors">
                      ACHIEVEMENTS
                    </span>
                    <span className="font-pixel text-[9px] text-parchment-dim/60 group-hover:text-gold transition-colors">
                      {state.unlockedAchievements.length}/14 →
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
