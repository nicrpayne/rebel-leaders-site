import { useEffect, useState, useRef } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { useGame } from "@/contexts/GameContext";
import WallGate from "./WallGate";
import WallGrid, { type WallEntry } from "./WallGrid";
import RichTextDisplay from "@/components/wall/RichTextDisplay";

export default function WallPage() {
  const [, params] = useRoute("/wall/:wallCode");
  const wallCode = params?.wallCode ?? "";

  const { awardAchievement } = useGame();

  const isAdminPreview = new URLSearchParams(window.location.search).get("admin") === "true";

  const storageKey = `wall_submitted_${wallCode}`;
  const [hasSubmitted, setHasSubmitted] = useState(() => {
    return localStorage.getItem(storageKey) === "true";
  });
  const [showSubmitBanner, setShowSubmitBanner] = useState(false);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showGate = !hasSubmitted && !isAdminPreview;

  const { data: wall, isLoading: wallLoading, refetch: refetchWall } = trpc.wall.getWall.useQuery(
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
    setShowSubmitBanner(true);
    awardAchievement("wall-witness");
    refetchEntries();
    bannerTimerRef.current = setTimeout(() => setShowSubmitBanner(false), 6000);
  }

  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, []);

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header — full-width image or dark gradient fallback */}
      <div className="relative w-full">
        {wall.headerImageUrl ? (
          <>
            <img src={wall.headerImageUrl} alt="" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-background" />
          </>
        ) : (
          <div className="w-full h-32 bg-gradient-to-b from-gray-900 to-background" />
        )}
        {/* Title + CONTRIBUTE overlaid on header */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 pb-3">
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
      </div>

      {/* Post-submission banner */}
      {showSubmitBanner && (
        <div className="px-4 py-3 border-b border-gold/20 bg-gold/5 flex items-center justify-between">
          <p className="font-display text-gold/80 text-sm leading-relaxed">
            Your page is on its way to the wall. It will appear there shortly.
          </p>
          <button
            onClick={() => setShowSubmitBanner(false)}
            className="font-pixel text-parchment/30 text-[9px] ml-4 shrink-0 active:opacity-70"
          >
            ✕
          </button>
        </div>
      )}

      {/* Wall description + prompt (shown before submission only) */}
      {(wall.description || wall.promptText) && showGate && (
        <div className="px-6 py-5 border-b border-parchment/10 max-w-lg mx-auto w-full">
          {wall.description && (
            <RichTextDisplay content={wall.description} className="mb-4" />
          )}
          {wall.promptText && (
            <p className="font-display text-parchment/70 text-base leading-snug">
              {wall.promptText}
            </p>
          )}
        </div>
      )}

      {/* Main content */}
      {!showGate ? (
        <WallGrid
          entries={entries}
          wallCode={wallCode}
          isAdminMode={isAdminPreview}
          wallId={wall.id}
          title={wall.title}
          description={wall.description ?? ""}
          wallData={{
            id: wall.id,
            title: wall.title,
            description: wall.description ?? "",
            isPrivate: false,
          }}
        />
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
