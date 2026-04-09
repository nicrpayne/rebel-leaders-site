import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { useGame } from "@/contexts/GameContext";
import WallGate from "./WallGate";
import WallGrid, { type WallEntry } from "./WallGrid";

export default function WallPage() {
  const [, params] = useRoute("/wall/:wallCode");
  const wallCode = params?.wallCode ?? "";

  const { awardAchievement } = useGame();

  const storageKey = `wall_submitted_${wallCode}`;
  const [hasSubmitted, setHasSubmitted] = useState(() => {
    return localStorage.getItem(storageKey) === "true";
  });

  const { data: wall, isLoading: wallLoading } = trpc.wall.getWall.useQuery(
    { wallCode },
    { enabled: Boolean(wallCode) }
  );

  const { data: rawEntries = [], refetch: refetchEntries } = trpc.wall.getEntries.useQuery(
    { wallId: wall?.id ?? "" },
    { enabled: Boolean(wall?.id) }
  );
  const entries: WallEntry[] = rawEntries;

  // Sync localStorage on mount in case another tab submitted
  useEffect(() => {
    if (localStorage.getItem(storageKey) === "true") {
      setHasSubmitted(true);
    }
  }, [storageKey]);

  function handleSuccess() {
    localStorage.setItem(storageKey, "true");
    setHasSubmitted(true);
    awardAchievement("wall-witness");
    refetchEntries();
  }

  if (wallLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="font-pixel text-parchment/40 text-xs tracking-widest">LOADING...</span>
      </div>
    );
  }

  if (!wall) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="font-pixel text-parchment/40 text-xs tracking-widest">WALL NOT FOUND</span>
      </div>
    );
  }

  return (
    // TODO: swap bg-background for wall texture image when asset is ready
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-parchment/10">
        <div>
          <p className="font-pixel text-gold text-[11px] tracking-widest">THE WALL</p>
          <p className="font-pixel text-parchment/30 text-[9px] tracking-widest">COMMUNAL ARCHIVE</p>
        </div>
        {hasSubmitted && (
          <button
            onClick={() => setHasSubmitted(false)}
            className="font-pixel text-[9px] tracking-widest text-parchment/50 border border-parchment/20 px-3 py-1.5 active:opacity-70"
          >
            CONTRIBUTE
          </button>
        )}
      </div>

      {/* Main content */}
      {hasSubmitted ? (
        <WallGrid entries={entries} wallCode={wallCode} />
      ) : (
        <WallGate wall={wall} onSuccess={handleSuccess} />
      )}

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-parchment/10">
        <p className="font-pixel text-parchment/20 text-[9px] tracking-widest">
          {entries.length > 0
            ? `${entries.length} ${entries.length === 1 ? "ENTRY" : "ENTRIES"}`
            : "AWAITING FIRST CONTRIBUTION"}
        </p>
      </div>
    </div>
  );
}
