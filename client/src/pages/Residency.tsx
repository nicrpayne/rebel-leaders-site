/*
 * THE RESIDENCY — /residency
 * 1:1 leadership residency program.
 * Adapted from the existing rebel-leader.com content.
 */

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import DialogueBox from "@/components/DialogueBox";
import PixelDivider from "@/components/PixelDivider";
import RebelLogo from "@/components/RebelLogo";

const RPG_OFFICE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/zlNQJQinSxaqyYjB.png";

export default function Residency() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 opacity-45">
          <img src={RPG_OFFICE} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />

        <div className="relative z-10 container text-center">
          <FadeIn>
            <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">THE RESIDENCY</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-parchment mb-4 leading-tight">
              A season of
              <br />
              <span className="italic font-normal text-parchment-dim">formation, not information.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-display text-lg text-parchment-dim/70 max-w-xl mx-auto">
              A 1:1 leadership residency for leaders who are ready to do the inner work.
              Not a course. Not a coaching program. A guided apprenticeship in becoming whole.
            </p>
          </FadeIn>
        </div>
      </section>

      <PixelDivider />

      {/* The Problem */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <DialogueBox speaker="QUEST-GIVER">
                <p className="text-base md:text-lg">
                  You've read the books. You've been to the conferences. You know the frameworks.
                  And yet something is still missing. The gap isn't in your knowledge — it's in your
                  formation. You don't need more information. You need a different kind of space.
                </p>
              </DialogueBox>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">WHAT THIS IS</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                An apprenticeship in being human while leading.
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mb-6 drop-cap">
                The Residency is a multi-month 1:1 journey built on the Rebel OS and the philosophy
                of Holistic Shaping. It is not about giving you answers. It is about creating the
                conditions for you to discover who you already are beneath the performance, the
                striving, and the armor.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-parchment-dim/70 text-base md:text-lg leading-relaxed font-display mb-8">
                We work across all five dimensions of the Holistic Impact Depth framework — Spiritual,
                Emotional, Leading, Physical, and Technical — because you cannot lead from a place
                you have not been. The work is integrated because you are integrated.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "FORMAT",
                    value: "1:1 guided sessions, bi-weekly",
                  },
                  {
                    label: "DURATION",
                    value: "3-6 months (flexible)",
                  },
                  {
                    label: "FRAMEWORK",
                    value: "Rebel OS + Holistic Shaping",
                  },
                  {
                    label: "INVESTMENT",
                    value: "By conversation",
                  },
                ].map((item, i) => (
                  <div key={i} className="quest-card p-4">
                    <span className="font-pixel text-[6px] text-gold/40 tracking-wider">{item.label}</span>
                    <p className="font-display text-base text-parchment mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* What You'll Work On */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">THE CURRICULUM</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                What we'll work on together.
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-4">
                {[
                  {
                    title: "Identity Work",
                    desc: "Dismantling the False Self. Understanding your Enneagram type not as a label but as a map of your inner terrain. Finding your True Self beneath the performance.",
                    icon: "01",
                  },
                  {
                    title: "The Bowl",
                    desc: "Learning to tend to the cultural container of your team or organization. Shifting from managing outcomes to stewarding conditions for life to thrive.",
                    icon: "02",
                  },
                  {
                    title: "Integration",
                    desc: "Working across all five HID dimensions — Spiritual, Emotional, Leading, Physical, Technical — because fragmented leaders create fragmented cultures.",
                    icon: "03",
                  },
                  {
                    title: "Language",
                    desc: "Developing the vocabulary to name what you see. Learning to talk about Vulture Culture, The Great Transfer, and the Bowl and the Flow in your own context.",
                    icon: "04",
                  },
                  {
                    title: "Practice",
                    desc: "Micro-experiments in courage. Tiny moves that shift the system. Not grand gestures, but daily acts of rebellion against the Machine.",
                    icon: "05",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-gold/20 pl-6 py-3">
                    <div className="flex items-start gap-3">
                      <span className="font-pixel text-[8px] text-gold/40 mt-1">{item.icon}</span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-parchment mb-1">{item.title}</h3>
                        <p className="text-parchment-dim/60 text-sm font-display leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Who This Is For */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">PARTY REQUIREMENTS</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                This is for you if...
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-3">
                {[
                  "You lead people and feel the weight of it in your bones.",
                  "You're tired of performing leadership and want to actually become a leader.",
                  "You sense that the problem isn't your team — it's something deeper.",
                  "You've outgrown the frameworks but haven't found what comes next.",
                  "You're willing to do the uncomfortable inner work, not just learn new techniques.",
                  "You want a guide, not a guru. A companion, not a consultant.",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-gold/50 font-pixel text-[8px] mt-1.5">{">"}</span>
                    <p className="text-parchment-dim/80 text-base font-display">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <RebelLogo size={48} className="mx-auto text-gold/40 mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-4">
                Begin the journey.
              </h2>
              <p className="text-parchment-dim/70 text-base font-display mb-8 max-w-lg mx-auto">
                The Residency is by application only. If this resonates, reach out.
                No pitch, no pressure — just a conversation about where you are
                and where you want to go.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <a
                href="mailto:hello@rebel-leader.com"
                className="inline-flex items-center gap-3 font-pixel text-[9px] text-gold hover:text-parchment border-2 border-gold/50 hover:border-gold hover:bg-gold/10 px-8 py-4 transition-all duration-200"
              >
                START A CONVERSATION
                <span className="text-xs">{">"}</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
