/*
 * THE ARCHIVES — /archives
 * YouTube videos + Shorts auto-populated from YouTube RSS.
 * Substack articles auto-populated from Substack RSS.
 * Three wings: "Visions" (video), "Quick Strikes" (shorts), and "Scrolls" (written).
 */

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import { usePageTracker } from "@/hooks/usePageTracker";
import PixelDivider from "@/components/PixelDivider";
import { trpc } from "@/lib/trpc";

const RPG_BANNER = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/NOhnYtwgYOzpzngc.png";

type Tab = "visions" | "shorts" | "scrolls";

/* ─── Date formatter ─── */
function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

/* ─── Loading skeleton ─── */
function VideoSkeleton({ count = 3, aspect = "video" }: { count?: number; aspect?: "video" | "short" }) {
  return (
    <div className={`grid grid-cols-1 ${aspect === "short" ? "sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center" : "md:grid-cols-2 gap-4"}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`quest-card overflow-hidden animate-pulse ${aspect === "short" ? "w-full max-w-[280px]" : ""}`}>
          <div className={aspect === "short" ? "aspect-[9/16] max-h-[420px] bg-gold/5" : "aspect-video bg-gold/5"} />
          <div className="p-4">
            <div className="h-2 bg-gold/10 rounded w-16 mb-2" />
            <div className="h-4 bg-parchment/10 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Visions Tab (auto-populated from YouTube RSS) ─── */
function VisionsTab() {
  const { data: videos, isLoading, error } = trpc.youtube.videos.useQuery();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8 text-center">LOADING VISIONS...</p>
        <VideoSkeleton count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="dialogue-box text-center">
          <p className="font-pixel text-[8px] text-gold/50 mb-2">CONNECTION LOST</p>
          <p className="font-display text-parchment-dim/70">
            Unable to fetch the latest visions. Visit{" "}
            <a href="https://www.youtube.com/@LeaderRebellion" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              YouTube directly
            </a>.
          </p>
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-parchment-dim/50">No videos found.</p>
      </div>
    );
  }

  // First video is featured (newest)
  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8 text-center">
          LATEST VISIONS
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="space-y-8">
          {/* Featured video — large */}
          <div className="quest-card overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${featured.videoId}`}
                title={featured.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-pixel text-[7px] text-gold/40 tracking-wider">LATEST</span>
                <span className="font-pixel text-[6px] text-parchment-dim/30 tracking-wider">
                  {formatDate(featured.pubDate)}
                </span>
              </div>
              <p className="font-display text-lg text-parchment">{featured.title}</p>
              {featured.description && (
                <p className="font-display text-sm text-parchment-dim/50 mt-2 leading-relaxed">
                  {featured.description}
                </p>
              )}
            </div>
          </div>

          {/* Remaining videos in grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rest.map((video) => (
                <div key={video.videoId} className="quest-card overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-pixel text-[7px] text-gold/40 tracking-wider">VIDEO</span>
                      <span className="font-pixel text-[6px] text-parchment-dim/30 tracking-wider">
                        {formatDate(video.pubDate)}
                      </span>
                    </div>
                    <p className="font-display text-base text-parchment">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Channel link */}
          <div className="text-center mt-8">
            <a
              href="https://www.youtube.com/@LeaderRebellion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-pixel text-[9px] text-gold/70 hover:text-gold border-2 border-gold/30 hover:border-gold/60 px-6 py-3 transition-all duration-200"
            >
              VIEW ALL VISIONS ON YOUTUBE
              <span className="text-xs">{">"}</span>
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

/* ─── Quick Strikes Tab (auto-populated from YouTube RSS) ─── */
function ShortsTab() {
  const { data: shorts, isLoading, error } = trpc.youtube.shorts.useQuery();

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8 text-center">LOADING STRIKES...</p>
        <VideoSkeleton count={3} aspect="short" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="dialogue-box text-center">
          <p className="font-pixel text-[8px] text-gold/50 mb-2">CONNECTION LOST</p>
          <p className="font-display text-parchment-dim/70">
            Unable to fetch the latest strikes. Visit{" "}
            <a href="https://www.youtube.com/@LeaderRebellion/shorts" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              YouTube directly
            </a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <FadeIn>
        <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-3 text-center">
          QUICK STRIKES
        </p>
        <p className="font-display text-lg text-parchment-dim/60 text-center mb-10 max-w-lg mx-auto">
          Bite-sized provocations. 60 seconds to rethink everything.
          New shorts appear here automatically.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {shorts && shorts.map((short) => (
            <div key={short.videoId} className="quest-card overflow-hidden w-full max-w-[280px]">
              <div className="aspect-[9/16] max-h-[420px]">
                <iframe
                  src={`https://www.youtube.com/embed/${short.videoId}`}
                  title={short.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-pixel text-[6px] text-gold/40 tracking-wider">SHORT</span>
                  <span className="font-pixel text-[5px] text-parchment-dim/30 tracking-wider">
                    {formatDate(short.pubDate)}
                  </span>
                </div>
                <p className="font-display text-sm text-parchment leading-snug">
                  {short.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Channel link */}
      <div className="text-center mt-10">
        <a
          href="https://www.youtube.com/@LeaderRebellion/shorts"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-pixel text-[9px] text-gold/70 hover:text-gold border-2 border-gold/30 hover:border-gold/60 px-6 py-3 transition-all duration-200"
        >
          VIEW ALL SHORTS ON YOUTUBE
          <span className="text-xs">{">"}</span>
        </a>
      </div>
    </div>
  );
}

/* ─── Scrolls Tab (auto-populated from Substack RSS) ─── */
function ScrollsTab() {
  const { data: articles, isLoading, error } = trpc.substack.articles.useQuery();

  return (
    <div className="max-w-3xl mx-auto">
      <FadeIn>
        <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8 text-center">
          LATEST SCROLLS
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="text-center mb-10">
          <p className="font-display text-lg text-parchment-dim/70 mb-6">
            Long-form essays, lenses, and reflections published on Substack.
            New posts appear here automatically.
          </p>
          <a
            href="https://leaderrebellion.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-pixel text-[9px] text-gold/70 hover:text-gold border-2 border-gold/30 hover:border-gold/60 px-6 py-3 transition-all duration-200"
          >
            SUBSCRIBE ON SUBSTACK
            <span className="text-xs">{">"}</span>
          </a>
        </div>
      </FadeIn>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="quest-card p-6 animate-pulse">
              <div className="h-3 bg-gold/10 rounded w-16 mb-3" />
              <div className="h-5 bg-parchment/10 rounded w-3/4 mb-2" />
              <div className="h-3 bg-parchment-dim/10 rounded w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="dialogue-box text-center">
          <p className="font-pixel text-[8px] text-gold/50 mb-2">CONNECTION LOST</p>
          <p className="font-display text-parchment-dim/70">
            Unable to fetch the latest scrolls. Visit{" "}
            <a href="https://leaderrebellion.substack.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              Substack directly
            </a>.
          </p>
        </div>
      )}

      {/* Articles from RSS */}
      {articles && articles.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="space-y-4">
            {articles.map((article, i) => (
              <a
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="quest-card p-6 block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-pixel text-[7px] text-gold/40 tracking-wider">SCROLL</span>
                      {article.pubDate && (
                        <span className="font-pixel text-[6px] text-parchment-dim/30 tracking-wider">
                          {formatDate(article.pubDate)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-parchment mt-1 mb-2 group-hover:text-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-parchment-dim/50 text-sm font-display leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                  <span className="font-pixel text-[10px] text-parchment-dim/30 group-hover:text-gold transition-colors shrink-0 mt-2">
                    {">"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      )}
    </div>
  );
}

export default function Archives() {
  usePageTracker("archives");
  const [activeTab, setActiveTab] = useState<Tab>("visions");

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 opacity-45">
          <img src={RPG_BANNER} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />

        <div className="relative z-10 container text-center">
          <FadeIn>
            <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">THE ARCHIVES</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-parchment mb-4 leading-tight">
              Dispatches from
              <br />
              <span className="italic font-normal text-parchment-dim">the Rebellion</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-display text-lg text-parchment-dim/70 max-w-xl mx-auto">
              Video essays, written reflections, and conversations about what it means to lead
              with your whole self in a world that wants you to perform.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="py-8">
        <div className="container">
          <div className="flex justify-center gap-2 flex-wrap">
            {([
              { key: "visions" as Tab, label: "VISIONS (VIDEO)" },
              { key: "shorts" as Tab, label: "QUICK STRIKES" },
              { key: "scrolls" as Tab, label: "SCROLLS (WRITTEN)" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-pixel text-[8px] md:text-[9px] tracking-wider px-4 md:px-6 py-3 border-2 transition-all duration-200 ${
                  activeTab === tab.key
                    ? "border-gold/60 bg-gold/15 text-gold"
                    : "border-wood/30 text-parchment-dim/50 hover:border-gold/30 hover:text-gold/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Content Area */}
      <section className="py-12 md:py-20">
        <div className="container">
          {activeTab === "visions" && <VisionsTab />}
          {activeTab === "shorts" && <ShortsTab />}
          {activeTab === "scrolls" && <ScrollsTab />}
        </div>
      </section>
    </PageLayout>
  );
}
