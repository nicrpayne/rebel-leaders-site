/*
 * THE QUEST-GIVER — /about
 * Expanded About page with personal story and contact info.
 * Uses the RPG character sprite and office scene.
 */

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import DialogueBox from "@/components/DialogueBox";
import PixelDivider from "@/components/PixelDivider";
import RebelLogo from "@/components/RebelLogo";

const RPG_SPRITE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/ItPGFmjOWJPnlXQR.png";
const RPG_BOOKSHELF = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/2jPWTJqJuqHFPJBP.png";

export default function About() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 opacity-45">
          <img src={RPG_BOOKSHELF} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />

        <div className="relative z-10 container">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <FadeIn>
              <div className="shrink-0">
                <img
                  src={RPG_SPRITE}
                  alt="Character sprite"
                  className="w-32 md:w-40 pixel-render"
                  loading="lazy"
                />
              </div>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">THE QUEST-GIVER</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-display text-4xl md:text-5xl font-semibold text-parchment mb-4 leading-tight">
                  Hey. I'm the guy
                  <br />
                  <span className="italic font-normal text-parchment-dim">behind all of this.</span>
                </h1>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Story */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">BACKSTORY</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The short version.
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display drop-cap">
                I spent years inside organizations watching the same pattern repeat: good people, bad
                systems, hollow results. Leaders who cared deeply but were trapped in an operating
                system that rewarded performance over presence, extraction over formation, and
                competency over character.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-6">
                I watched the leadership industry pour $366 billion into fixing the symptoms while
                ignoring the disease. More frameworks, more assessments, more "leadership development"
                that developed everything except the actual human being doing the leading.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-6">
                So I started asking different questions. Not "how do we make better leaders?" but
                "what kind of environment grows a whole human being?" Not "what skills do leaders
                need?" but "who is this work turning us into?"
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-6">
                Those questions led me to McGilchrist's divided brain, Rohr's True Self, Greenleaf's
                servant leadership, Frankl's logotherapy, Maté's trauma work, the Enneagram, Spiral
                Dynamics, and a hundred conversations with leaders who were quietly dying inside
                their roles. Out of all of that came the Rebel OS — an operating system for
                leadership that treats work as spiritual formation.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* What I Actually Do */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CLASS & ABILITIES</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                What I actually do.
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <DialogueBox speaker="QUEST-GIVER">
                <p className="text-base">
                  I write, I teach, I make videos, and I walk alongside leaders who are ready to do
                  the inner work. I'm not a guru. I'm a fellow traveler who happens to have spent a
                  lot of time studying the map.
                </p>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  {
                    title: "Writing & Teaching",
                    desc: "Essays, frameworks, and video content that translate ancient wisdom into modern leadership language.",
                  },
                  {
                    title: "The Residency",
                    desc: "1:1 leadership formation for leaders who are ready to go deeper than techniques.",
                  },
                  {
                    title: "The Rebel OS",
                    desc: "Building an open-source operating system for human flourishing in organizations.",
                  },
                  {
                    title: "Community",
                    desc: "Creating spaces where rebel leaders can find each other and not feel crazy anymore.",
                  },
                ].map((item, i) => (
                  <div key={i} className="quest-card p-5">
                    <h3 className="font-display text-lg font-semibold text-parchment mb-2">{item.title}</h3>
                    <p className="text-parchment-dim/50 text-sm font-display leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* The Influences */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">SKILL TREE</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The thinkers who shaped this work.
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-3">
                {[
                  { name: "Iain McGilchrist", contribution: "The divided brain — why attention shapes reality" },
                  { name: "Richard Rohr", contribution: "True Self / False Self — the inner work of leadership" },
                  { name: "Robert Greenleaf", contribution: "Servant leadership — the original rebel framework" },
                  { name: "Viktor Frankl", contribution: "Logotherapy — meaning as the primary human drive" },
                  { name: "Gabor Maté", contribution: "Trauma and disconnection — why our systems make us sick" },
                  { name: "Richard Boyatzis", contribution: "Resonant leadership — the neuroscience of renewal" },
                  { name: "Robert Putnam", contribution: "Social capital — the data behind The Great Transfer" },
                  { name: "Beck & Cowan", contribution: "Spiral Dynamics — mapping consciousness development" },
                  { name: "J.R.R. Tolkien", contribution: "Story — the deepest truths are always told, never explained" },
                ].map((person, i) => (
                  <div key={i} className="flex items-start gap-4 border-l-2 border-gold/15 pl-5 py-2">
                    <div>
                      <p className="font-display text-base font-semibold text-parchment">{person.name}</p>
                      <p className="text-parchment-dim/50 text-sm font-display">{person.contribution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Contact */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <RebelLogo size={48} className="mx-auto text-gold/40 mb-6" />
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CONTACT</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-4">
                Say hello.
              </h2>
              <p className="text-parchment-dim/70 text-base font-display mb-8 max-w-lg mx-auto">
                Whether you want to talk about the work, explore the Residency, collaborate on
                something, or just tell me I'm wrong about everything — I'd love to hear from you.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@rebel-leader.com"
                  className="inline-flex items-center justify-center gap-3 font-pixel text-[9px] text-gold hover:text-parchment border-2 border-gold/50 hover:border-gold hover:bg-gold/10 px-8 py-4 transition-all duration-200"
                >
                  SEND A MESSAGE
                </a>
                <a
                  href="https://www.youtube.com/@LeaderRebellion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 font-pixel text-[9px] text-parchment-dim/60 hover:text-gold border-2 border-wood/30 hover:border-gold/40 px-8 py-4 transition-all duration-200"
                >
                  YOUTUBE
                </a>
                <a
                  href="https://substack.com/@leaderrebellion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 font-pixel text-[9px] text-parchment-dim/60 hover:text-gold border-2 border-wood/30 hover:border-gold/40 px-8 py-4 transition-all duration-200"
                >
                  SUBSTACK
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
