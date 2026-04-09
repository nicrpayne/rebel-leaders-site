import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function WallIndex() {
  const { data: walls = [], isLoading } = trpc.wall.getActiveWalls.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="font-pixel text-parchment/40 text-xs tracking-widest">LOADING...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-lg mx-auto">
        <p className="font-pixel text-gold text-[11px] tracking-widest mb-1">THE WALL</p>
        <p className="font-pixel text-parchment/30 text-[9px] tracking-widest mb-8">ACTIVE ARCHIVES</p>

        {walls.length === 0 ? (
          <p className="font-pixel text-parchment/30 text-[10px] tracking-widest">NO ACTIVE WALLS</p>
        ) : (
          <div className="flex flex-col gap-3">
            {walls.map((wall) => (
              <Link key={wall.id} href={`/wall/${wall.wallCode}`}>
                <div className="border border-parchment/20 p-4 cursor-pointer active:opacity-70 hover:border-gold/40 transition-colors">
                  <p className="font-pixel text-parchment text-xs tracking-wider mb-1">{wall.title}</p>
                  {wall.promptText && (
                    <p className="font-display text-parchment/50 text-sm leading-snug line-clamp-2 mb-2">
                      {wall.promptText}
                    </p>
                  )}
                  <p className="font-pixel text-parchment/20 text-[9px] tracking-widest">{wall.wallCode}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
