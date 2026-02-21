/*
 * NEW PLAYER — /start
 * Guided entry point for newcomers.
 * The "tutorial level" — explains what this is in 2 minutes.
 */

import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import DialogueBox from "@/components/DialogueBox";
import PixelDivider from "@/components/PixelDivider";
import RebelLogo from "@/components/RebelLogo";
import SubstackSignup from "@/components/SubstackSignup";

const RPG_OFFICE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/zlNQJQinSxaqyYjB.png";
const RPG_SPRITE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/GivLpGILaMTgVTZp.png";

export default function StartHere() {
  return (
    <PageLayout>
      {/* Hero — Tutorial Level */}
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
              <span className="italic font-normal text-parchment-dim">Good. Start here.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-display text-lg text-parchment-dim/70 max-w-xl mx-auto">
              Two minutes. That's all you need to understand what this is,
              why it exists, and whether you belong here.
            </p>
          </FadeIn>
        </div>
      </section>

      <PixelDivider />

      {/* Step 1: The Problem */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-pixel text-[9px] text-gold/60 border border-gold/30 px-3 py-1">01</span>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50">THE PROBLEM</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <DialogueBox speaker="NARRATOR">
                <p className="text-base md:text-lg">
                  The leadership industry is a $366 billion machine that produces hollow leaders.
                  It teaches skills but ignores the soul. It optimizes performance but destroys
                  the person. It has been running the same operating system since 1986 and wondering
                  why people are burning out.
                </p>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-parchment-dim/70 text-base font-display mt-6 leading-relaxed">
                Meanwhile, the institutions that used to form human character — family, faith
                communities, civic organizations — have collapsed. All that unmet need for meaning,
                belonging, and identity got dumped onto the workplace. We call this <strong className="text-parchment">The Great Transfer</strong>.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Step 2: The Belief */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-pixel text-[9px] text-gold/60 border border-gold/30 px-3 py-1">02</span>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50">THE BELIEF</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display">
                We believe the ache you feel is not weakness — it's sanity. We believe
                <strong className="text-gold/80"> human flourishing is the point</strong>, not
                productivity. We believe leadership is not a role to perform but a way of being
                to cultivate. And we believe the 90,000 hours you spend at work can be an engine
                of deep transformation, not just a paycheck.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Step 3: What We're Building */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-pixel text-[9px] text-gold/60 border border-gold/30 px-3 py-1">03</span>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50">WHAT WE'RE BUILDING</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-6">
                The <strong className="text-parchment">Rebel OS</strong> — an open-source operating
                system for human flourishing. Built on ancient wisdom, modern neuroscience, and
                spiritual formation. Translated into practical language for today's leaders.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/manifesto" className="quest-card p-5 group block">
                  <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-2">THE MAP</p>
                  <h3 className="font-display text-lg font-semibold text-parchment group-hover:text-gold transition-colors mb-2">
                    Maps
                  </h3>
                  <p className="text-parchment-dim/50 text-sm font-display">
                    Understand the terrain. The Manifesto, the Enneagram, Spiral Dynamics.
                  </p>
                </Link>

                <Link href="/mirror" className="quest-card p-5 group block">
                  <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-2">THE MIRROR</p>
                  <h3 className="font-display text-lg font-semibold text-parchment group-hover:text-gold transition-colors mb-2">
                    Mirrors
                  </h3>
                  <p className="text-parchment-dim/50 text-sm font-display">
                    See yourself clearly. Diagnostic tools for your inner landscape.
                  </p>
                </Link>

                <Link href="/armory" className="quest-card p-5 group block">
                  <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-2">THE ARMORY</p>
                  <h3 className="font-display text-lg font-semibold text-parchment group-hover:text-gold transition-colors mb-2">
                    Moves
                  </h3>
                  <p className="text-parchment-dim/50 text-sm font-display">
                    Take action. Downloads, frameworks, and micro-experiments in courage.
                  </p>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Step 4: Choose Your Path */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-pixel text-[9px] text-gold/60 border border-gold/30 px-3 py-1">04</span>
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50">CHOOSE YOUR PATH</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                There's no right order. Go where the pull is strongest.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-3">
                {[
                  {
                    label: "I want to understand the philosophy",
                    dest: "/manifesto",
                    tag: "READ THE MAP",
                  },
                  {
                    label: "I want to watch or read something",
                    dest: "/archives",
                    tag: "VISIT THE ARCHIVES",
                  },
                  {
                    label: "I want book recommendations",
                    dest: "/shelf",
                    tag: "BROWSE THE SHELF",
                  },
                  {
                    label: "I want 1:1 guidance",
                    dest: "/residency",
                    tag: "EXPLORE THE RESIDENCY",
                  },
                  {
                    label: "I want to know who's behind this",
                    dest: "/about",
                    tag: "MEET THE QUEST-GIVER",
                  },
                ].map((path, i) => (
                  <Link
                    key={i}
                    href={path.dest}
                    className="quest-card p-5 flex items-center justify-between gap-4 group block"
                  >
                    <div>
                      <p className="font-display text-base text-parchment group-hover:text-gold transition-colors">
                        {path.label}
                      </p>
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
                  One more thing. If you've read this far and something in you is saying
                  "yes" — trust that. You're not crazy for seeing what you see.
                  And you're not alone.
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
