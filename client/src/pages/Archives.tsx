/*
 * THE ARCHIVES — /archives
 * YouTube videos hosted on-site + Substack articles.
 * Two wings: "Visions" (video) and "Scrolls" (written).
 * Uses the RPG banner as backdrop.
 */

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import PixelDivider from "@/components/PixelDivider";
import RebelLogo from "@/components/RebelLogo";

const RPG_BANNER = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/0LjJnmqWfqjIjhXH.png";

type Tab = "visions" | "scrolls";

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
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveTab("visions")}
              className={`font-pixel text-[9px] tracking-wider px-6 py-3 border-2 transition-all duration-200 ${
                activeTab === "visions"
                  ? "border-gold/60 bg-gold/15 text-gold"
                  : "border-wood/30 text-parchment-dim/50 hover:border-gold/30 hover:text-gold/70"
              }`}
            >
              VISIONS (VIDEO)
            </button>
            <button
              onClick={() => setActiveTab("scrolls")}
              className={`font-pixel text-[9px] tracking-wider px-6 py-3 border-2 transition-all duration-200 ${
                activeTab === "scrolls"
                  ? "border-gold/60 bg-gold/15 text-gold"
                  : "border-wood/30 text-parchment-dim/50 hover:border-gold/30 hover:text-gold/70"
              }`}
            >
              SCROLLS (WRITTEN)
            </button>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Content Area */}
      <section className="py-12 md:py-20">
        <div className="container">
          {activeTab === "visions" ? (
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8 text-center">
                  LATEST VISIONS
                </p>
              </FadeIn>

              {/* YouTube Channel Embed — latest videos */}
              <FadeIn delay={0.15}>
                <div className="space-y-8">
                  {/* Featured video — large */}
                  <div className="quest-card overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed?listType=user_uploads&list=LeaderRebellion"
                        title="Latest from Rebel Leaders"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-2">FEATURED</p>
                      <p className="font-display text-lg text-parchment">
                        Watch the latest from the Rebel Leaders channel
                      </p>
                    </div>
                  </div>

                  {/* Channel link */}
                  <div className="text-center">
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

                  {/* Placeholder grid for when more videos are added */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {[
                      "The leadership industry is broken. Here's why.",
                      "You've been playing the wrong game.",
                      "What if your job was a school for the soul?",
                      "The Great Transfer: Why your workplace can't hold you.",
                    ].map((title, i) => (
                      <a
                        key={i}
                        href="https://www.youtube.com/@LeaderRebellion"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quest-card p-5 group"
                      >
                        <div className="aspect-video bg-forest-deep/60 mb-4 flex items-center justify-center border border-wood/20">
                          <div className="text-center">
                            <RebelLogo size={32} className="mx-auto text-gold/20 mb-2" />
                            <p className="font-pixel text-[7px] text-parchment-dim/30">COMING SOON</p>
                          </div>
                        </div>
                        <p className="font-display text-base text-parchment group-hover:text-gold transition-colors">
                          {title}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          ) : (
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
                    href="https://substack.com/@leaderrebellion"
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
                      title: "The Great Transfer",
                      preview: "Why the collapse of formative institutions created an impossible burden on the modern workplace.",
                      tag: "DIAGNOSIS",
                    },
                    {
                      title: "The Bowl and the Flow",
                      preview: "Stop obsessing over the work. Start tending to the container that holds it.",
                      tag: "FRAMEWORK",
                    },
                    {
                      title: "Humanity Is Not a Liability",
                      preview: "The leadership industry spent $366 billion trying to fix people. What if people aren't the problem?",
                      tag: "MANIFESTO",
                    },
                    {
                      title: "The Leader Video Game",
                      preview: "You've been grinding XP on the wrong skill tree. Here's the real game.",
                      tag: "METAPHOR",
                    },
                    {
                      title: "Stewards of Conditions",
                      preview: "The shift from hero to gardener. From commanding outcomes to cultivating soil.",
                      tag: "PRACTICE",
                    },
                  ].map((article, i) => (
                    <a
                      key={i}
                      href="https://substack.com/@leaderrebellion"
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
