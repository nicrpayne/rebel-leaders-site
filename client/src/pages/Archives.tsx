/*
 * THE ARCHIVES — /archives
 * YouTube videos hosted on-site + Substack articles.
 * Three wings: "Visions" (video), "Quick Strikes" (shorts), and "Scrolls" (written).
 * Uses the RPG banner as backdrop.
 */

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import PixelDivider from "@/components/PixelDivider";

const RPG_BANNER = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/NOhnYtwgYOzpzngc.png";

type Tab = "visions" | "shorts" | "scrolls";

/* ─── Video Data ─── */
const VIDEOS = [
  {
    id: "NrXlHMCGlVM",
    title: "Your \"Why\" Is Whack — New Metaphors for Leadership Ep 2 (of 5): The Bowl",
    tag: "LATEST",
    featured: true,
  },
  {
    id: "NcEf1pJRMBc",
    title: "Ruin Your Idea of Leadership in the Best Way (In 10 Minutes or Less)",
    tag: "3-PART SERIES · PT 1",
  },
  {
    id: "sAN9JDeQf_I",
    title: "Leaders Aren't The Cure. They're a Symptom.",
    tag: "3-PART SERIES · PT 2",
  },
  {
    id: "SubKk4B3RHY",
    title: "What Leaders Can't Say",
    tag: "3-PART SERIES · PT 3",
  },
  {
    id: "HEiZivaxue0",
    title: "The Problem Of Mattering",
    tag: "VIDEO ESSAY",
  },
];

const SHORTS = [
  {
    id: "w_Xvjt_WKA4",
    title: "ChatGPT Teaches Me Martin Buber's Philosophy",
  },
  {
    id: "5Gwh5O3HzMo",
    title: "Equipping vs. Developing Humans",
  },
  {
    id: "1_s6IfOiBJk",
    title: "Modifying Leader's Behavior?",
  },
];

export default function Archives() {
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

          {/* ─── VISIONS TAB ─── */}
          {activeTab === "visions" && (
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8 text-center">
                  LATEST VISIONS
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="space-y-8">
                  {/* Featured video — large */}
                  {VIDEOS.filter(v => v.featured).map((video) => (
                    <div key={video.id} className="quest-card overflow-hidden">
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-2">{video.tag}</p>
                        <p className="font-display text-lg text-parchment">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* 3-Part Series Section */}
                  <div className="mt-4">
                    <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-6 text-center">
                      3 QUOTES ABOUT LEADERSHIP THAT DON'T MENTION LEADERSHIP
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {VIDEOS.filter(v => v.tag.includes("SERIES")).map((video) => (
                        <div key={video.id} className="quest-card overflow-hidden">
                          <div className="aspect-video">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.id}`}
                              title={video.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <p className="font-pixel text-[6px] text-gold/40 tracking-wider mb-1">{video.tag}</p>
                            <p className="font-display text-sm text-parchment leading-snug">
                              {video.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Remaining videos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {VIDEOS.filter(v => !v.featured && !v.tag.includes("SERIES")).map((video) => (
                      <div key={video.id} className="quest-card overflow-hidden">
                        <div className="aspect-video">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-1">{video.tag}</p>
                          <p className="font-display text-base text-parchment">
                            {video.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

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
          )}

          {/* ─── QUICK STRIKES (SHORTS) TAB ─── */}
          {activeTab === "shorts" && (
            <div className="max-w-5xl mx-auto">
              <FadeIn>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-3 text-center">
                  QUICK STRIKES
                </p>
                <p className="font-display text-lg text-parchment-dim/60 text-center mb-10 max-w-lg mx-auto">
                  Bite-sized provocations. 60 seconds to rethink everything.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {SHORTS.map((short) => (
                    <div key={short.id} className="quest-card overflow-hidden w-full max-w-[280px]">
                      <div className="aspect-[9/16] max-h-[420px]">
                        <iframe
                          src={`https://www.youtube.com/embed/${short.id}`}
                          title={short.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-pixel text-[6px] text-gold/40 tracking-wider mb-1">SHORT</p>
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
          )}

          {/* ─── SCROLLS TAB ─── */}
          {activeTab === "scrolls" && (
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8 text-center">
                  LATEST SCROLLS
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="text-center mb-10">
                  <p className="font-display text-lg text-parchment-dim/70 mb-6">
                    Long-form essays, frameworks, and reflections published on Substack.
                    Subscribe to receive new scrolls directly.
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

              {/* Article previews */}
              <FadeIn delay={0.3}>
                <div className="space-y-4">
                  {[
                    {
                      title: "The Hollow Crown",
                      preview: "Why our leadership stories are failing us — a personal reckoning with the industry.",
                      tag: "ESSAY",
                      url: "https://leaderrebellion.substack.com/p/the-hollow-crown-why-our-leadership",
                    },
                    {
                      title: "Servant Leadership Is Dead. Long Live Leader-as-a-Service.",
                      preview: "A shift from leader-as-hero to leadership as invisible infrastructure.",
                      tag: "FRAMEWORK",
                      url: "https://leaderrebellion.substack.com/p/the-magic-of-mr-greenleaf-a-servant",
                    },
                    {
                      title: "The Great Transfer",
                      preview: "Why the collapse of formative institutions created an impossible burden on the modern workplace.",
                      tag: "DIAGNOSIS",
                      url: "https://leaderrebellion.substack.com",
                    },
                    {
                      title: "The Bowl and the Flow",
                      preview: "Stop obsessing over the work. Start tending to the container that holds it.",
                      tag: "METAPHOR",
                      url: "https://leaderrebellion.substack.com",
                    },
                    {
                      title: "Humanity Is Not a Liability",
                      preview: "The leadership industry spent $366 billion trying to fix people. What if people aren't the problem?",
                      tag: "MANIFESTO",
                      url: "https://leaderrebellion.substack.com",
                    },
                  ].map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quest-card p-6 block group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="font-pixel text-[7px] text-gold/40 tracking-wider">{article.tag}</span>
                          <h3 className="font-display text-xl font-semibold text-parchment mt-1 mb-2 group-hover:text-gold transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-parchment-dim/50 text-sm font-display leading-relaxed">
                            {article.preview}
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
            </div>
          )}

        </div>
      </section>
    </PageLayout>
  );
}
