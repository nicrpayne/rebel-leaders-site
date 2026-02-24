/*
 * ACHIEVEMENTS PANEL — Full Achievement Gallery
 * Shows all 14 achievements in a pixel-art styled overlay.
 * Locked achievements are grayed out; unlocked ones glow gold.
 * Accessible from the HUD achievements count.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useGame, ACHIEVEMENTS } from "@/contexts/GameContext";

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsPanel({ isOpen, onClose }: AchievementsPanelProps) {
  const { state } = useGame();
  const unlocked = state.unlockedAchievements;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[71] overflow-hidden"
          >
            <div className="relative h-full bg-forest-deep/98 border-2 border-gold/40 rounded-sm shadow-2xl shadow-black/60 flex flex-col">
              {/* Pixel corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 bg-gold/30" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-gold/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-gold/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-gold/30" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20">
                <div>
                  <h2 className="font-pixel text-[10px] md:text-xs text-gold tracking-widest uppercase">
                    Achievements
                  </h2>
                  <p className="font-display text-sm text-parchment-dim/50 mt-1">
                    {unlocked.length} / {ACHIEVEMENTS.length} unlocked
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="font-pixel text-[10px] text-parchment-dim/50 hover:text-gold hover:bg-gold/10 transition-all px-3 py-2 border border-transparent hover:border-gold/30 rounded-sm"
                >
                  CLOSE ✕
                </button>
              </div>

              {/* Progress bar */}
              <div className="px-6 py-3 border-b border-gold/10">
                <div className="h-2 bg-black/40 border border-gold/20 rounded-[1px] overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{
                      background:
                        unlocked.length === ACHIEVEMENTS.length
                          ? "linear-gradient(90deg, #d4a017, #f0c040, #d4a017)"
                          : "linear-gradient(90deg, #1a6b3c, #228b22, #1a6b3c)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Achievement Grid */}
              <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ACHIEVEMENTS.map((achievement, index) => {
                    const isUnlocked = unlocked.includes(achievement.id);
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.3 }}
                        className={`relative border rounded-sm p-4 transition-all duration-300 ${
                          isUnlocked
                            ? "border-gold/40 bg-gold/5"
                            : "border-gold/10 bg-black/20 opacity-50"
                        }`}
                      >
                        {/* Pixel corners for unlocked */}
                        {isUnlocked && (
                          <>
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-gold/40" />
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-gold/40" />
                            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-gold/40" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-gold/40" />
                          </>
                        )}

                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div
                            className={`w-10 h-10 flex items-center justify-center border rounded-sm shrink-0 ${
                              isUnlocked
                                ? "border-gold/30 bg-gold/10"
                                : "border-gold/10 bg-black/30"
                            }`}
                          >
                            <span className={`text-lg ${isUnlocked ? "" : "grayscale opacity-40"}`}>
                              {isUnlocked ? achievement.icon : "🔒"}
                            </span>
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-pixel text-[9px] tracking-wider leading-tight ${
                                isUnlocked ? "text-gold" : "text-parchment-dim/30"
                              }`}
                            >
                              {achievement.title}
                            </p>
                            <p
                              className={`font-display text-xs mt-1 leading-snug ${
                                isUnlocked ? "text-parchment-dim/70" : "text-parchment-dim/25"
                              }`}
                            >
                              {isUnlocked ? achievement.description : "???"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer hint */}
              <div className="px-6 py-3 border-t border-gold/10 text-center">
                <p className="font-pixel text-[7px] text-parchment-dim/30 tracking-wider">
                  {unlocked.length < ACHIEVEMENTS.length
                    ? "EXPLORE THE SITE TO UNLOCK MORE ACHIEVEMENTS"
                    : "ALL ACHIEVEMENTS UNLOCKED — YOU ARE FULLY ALIVE"}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
