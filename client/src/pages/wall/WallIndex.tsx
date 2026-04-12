import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function WallIndex() {
  const { data: walls = [], isLoading } = trpc.wall.getActiveWalls.useQuery();

  const featuredWall = walls.find((w) => w.isFeatured);
  const otherWalls = walls.filter((w) => !w.isFeatured);

  return (
    <PageLayout>
      <section className="container py-16 md:py-24 max-w-2xl mx-auto">

        {/* Header */}
        <FadeIn>
          <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">COMMONS</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-parchment mb-4 leading-tight">
            The Wall
          </h1>
          <div className="w-12 h-px bg-gold/30 mb-6" />
          <p className="font-display text-lg text-parchment-dim/70 leading-relaxed max-w-lg">
            A living archive. Leave your mark. Witness the work of others.
            No likes. No comments. Just honest record.
          </p>
        </FadeIn>

        {/* Loading */}
        {isLoading && (
          <p className="font-pixel text-[9px] tracking-[0.2em] text-parchment/30 animate-pulse mt-12">
            LOADING...
          </p>
        )}

        {/* Empty */}
        {!isLoading && walls.length === 0 && (
          <p className="font-display text-parchment-dim/40 text-lg mt-12 italic">
            No walls yet.
          </p>
        )}

        {/* Featured wall */}
        {featuredWall && (
          <FadeIn delay={0.15}>
            <div className="mt-12">
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">FEATURED</p>
              <Link href={`/workbench/wall/${featuredWall.wallCode}`}>
                <div className="group border border-gold/30 hover:border-gold/60 bg-card px-6 py-6 cursor-pointer transition-all duration-300 hover:shadow-[0_0_24px_-8px_rgba(197,160,89,0.25)]">
                  {/* Corner accents */}
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/30 group-hover:border-gold/70 transition-colors -translate-x-[1px] -translate-y-[1px]" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/30 group-hover:border-gold/70 transition-colors translate-x-[1px] -translate-y-[1px]" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/30 group-hover:border-gold/70 transition-colors -translate-x-[1px] translate-y-[1px]" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/30 group-hover:border-gold/70 transition-colors translate-x-[1px] translate-y-[1px]" />

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2 className="font-display text-2xl font-semibold text-parchment group-hover:text-gold transition-colors duration-200 leading-snug">
                        {featuredWall.title}
                      </h2>
                      <span className="font-pixel text-[9px] tracking-widest text-gold/40 shrink-0 mt-1">
                        {featuredWall.wallCode}
                      </span>
                    </div>

                    {featuredWall.description && (
                      <p className="font-display text-parchment-dim/60 text-base leading-relaxed line-clamp-2 mb-5">
                        {stripHtml(featuredWall.description)}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors duration-200" />
                      <span className="font-display italic text-gold/60 group-hover:text-gold text-sm transition-colors duration-200">
                        Enter
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </FadeIn>
        )}

        {/* Divider between featured and the rest */}
        {featuredWall && otherWalls.length > 0 && (
          <div className="w-full h-px bg-gold/10 mt-10 mb-8" />
        )}

        {/* Other walls */}
        {otherWalls.length > 0 && (
          <FadeIn delay={featuredWall ? 0.25 : 0.15}>
            <div className={featuredWall ? "" : "mt-12"}>
              <div className="flex flex-col gap-3">
                {otherWalls.map((wall) => (
                  <Link key={wall.id} href={`/workbench/wall/${wall.wallCode}`}>
                    <div className="group border border-parchment/10 hover:border-gold/30 bg-card px-6 py-5 cursor-pointer transition-all duration-200">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="font-display text-xl font-semibold text-parchment group-hover:text-gold transition-colors duration-200 leading-snug">
                          {wall.title}
                        </h2>
                        <span className="font-pixel text-[9px] tracking-widest text-parchment/20 shrink-0 mt-1">
                          {wall.wallCode}
                        </span>
                      </div>

                      {wall.description && (
                        <p className="font-display text-parchment-dim/50 text-sm leading-relaxed line-clamp-2 mb-3">
                          {stripHtml(wall.description)}
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-parchment/20 group-hover:bg-gold/50 transition-colors duration-200" />
                        <span className="font-display italic text-parchment/30 group-hover:text-gold/60 text-sm transition-colors duration-200">
                          Enter
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Footer note */}
        {!isLoading && walls.length > 0 && (
          <FadeIn delay={0.4}>
            <p className="font-display italic text-parchment/20 text-sm text-center mt-16">
              Submit once to unlock the archive.
            </p>
          </FadeIn>
        )}

      </section>
    </PageLayout>
  );
}
