/*
 * NEW PLAYER — /start
 * The tutorial level. 30 seconds to answer three questions:
 * What is this? Is this for me? What do I do next?
 */

import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import DialogueBox from "@/components/DialogueBox";
import PixelDivider from "@/components/PixelDivider";
import SubstackSignup from "@/components/SubstackSignup";

const RPG_OFFICE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/zlNQJQinSxaqyYjB.png";
const RPG_SPRITE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/oCdVePFazaeRgvNO.png";

export default function StartHere() {
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
            <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">TUTORIAL LEVEL</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-parchment mb-4 leading-tight">
              New here?
              <br />
              <span className="italic font-normal text-parchment-dim">30 seconds. Three questions.</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      <PixelDivider />

      {/* Question 1: What is this? */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-pixel text-[9px] text-gold/60 border border-gold/30 px-3 py-1">01</span>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50">WHAT IS THIS?</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <DialogueBox speaker="NARRATOR">
                <p className="text-base md:text-lg">
                  Rebel Leaders is a movement to redefine leadership as relational infrastructure
                  that forms humans. We recover ancient wisdom and confirm it through modern
                  science to build what the $366 billion leadership industry can't: leaders who
                  are actually whole.
                </p>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-parchment-dim/60 text-sm font-display mt-5 leading-relaxed">
                Not a course. Not a coaching program. A growing body of writing, tools,
                and community for people who suspect the game is rigged and want to play a different one.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Question 2: Is this for me? */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-pixel text-[9px] text-gold/60 border border-gold/30 px-3 py-1">02</span>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50">IS THIS FOR ME?</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-6">
                If any of these sound familiar, you're in the right place:
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-3">
                {[
                  "You've read the leadership books and something still feels missing.",
                  "You sense the problem isn't skills — it's something deeper.",
                  "You care more about who your people are becoming than what they're producing.",
                  "You've done inner work and you're wondering why no one talks about it at work.",
                  "You feel like you're the only one who sees it.",
                  "The word 'leadership' makes you cringe — because everything you've seen called leadership is just power hoarding in a polo shirt.",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-pixel text-[8px] text-gold/40 mt-1.5 shrink-0">{">"}</span>
                    <p className="text-parchment-dim/70 text-base font-display leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-gold/70 text-base font-display mt-6 italic">
                You're not crazy. And you're not alone.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Question 3: What do I do? */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-pixel text-[9px] text-gold/60 border border-gold/30 px-3 py-1">03</span>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50">WHAT DO I DO?</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                Go where the pull is strongest. There's no right order.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-3">
                {[
                  {
                    label: "Read the full story",
                    desc: "The landing page walks you through everything.",
                    dest: "/",
                    tag: "HOME",
                  },
                  {
                    label: "Go deeper into the philosophy",
                    desc: "The manifesto behind the movement.",
                    dest: "/manifesto",
                    tag: "THE MAP",
                  },
                  {
                    label: "Read an essay",
                    desc: "Start with The Great Transfer or The Hollow Crown.",
                    dest: "/archives",
                    tag: "ARCHIVES",
                  },
                  {
                    label: "See what we're reading",
                    desc: "The books and voices that shaped this.",
                    dest: "/shelf",
                    tag: "THE SHELF",
                  },
                  {
                    label: "Get 1:1 guidance",
                    desc: "The Residency — intensive formation work.",
                    dest: "/residency",
                    tag: "RESIDENCY",
                  },
                  {
                    label: "Find out who's behind this",
                    desc: "The quest-giver's backstory.",
                    dest: "/about",
                    tag: "ABOUT",
                  },
                ].map((path, i) => (
                  <Link
                    key={i}
                    href={path.dest}
                    className="quest-card p-4 md:p-5 flex items-center justify-between gap-4 group block"
                  >
                    <div>
                      <p className="font-display text-base text-parchment group-hover:text-gold transition-colors">
                        {path.label}
                      </p>
                      <p className="text-parchment-dim/40 text-sm font-display mt-0.5">{path.desc}</p>
                    </div>
                    <span className="font-pixel text-[7px] text-gold/40 group-hover:text-gold transition-colors shrink-0 tracking-wider">
                      {path.tag} {">"}
                    </span>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Closing */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <img src={RPG_SPRITE} alt="" className="w-20 mx-auto pixel-render mb-6" loading="lazy" />
            </FadeIn>
            <FadeIn delay={0.15}>
              <DialogueBox speaker="QUEST-GIVER" className="text-left">
                <p className="text-base md:text-lg">
                  If something in you is saying "yes" — trust that.
                  Subscribe below and I'll send you the essays, lenses, and
                  invitations that are helping people lead differently.
                </p>
                <p className="text-gold/70 mt-4 italic">Welcome to the rebellion.</p>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10">
                <SubstackSignup variant="featured" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
