/*
 * THE MAP — /manifesto
 * The full Rebel Manifesto rendered as a long-form RPG scroll.
 * Uses the scroll/map pixel art as the hero backdrop.
 * Design: Scriptorium-style, deep green, gold accents, drop caps.
 *
 * DEDUPLICATED: Only ideas that expand on the Home page remain.
 * Home covers: the diagnosis, Great Transfer, Vulture Culture, Hollow Crown,
 * the Flywheel, Bowl/Water/Current, Maps/Mirrors/Moves, and the invitation.
 * This page goes deeper: the philosophical roots, the three disconnections,
 * Holistic Impact Depth, the Transformed Teachers concept, and the ethos.
 */

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import DialogueBox from "@/components/DialogueBox";
import PixelDivider from "@/components/PixelDivider";
import RebelLogo from "@/components/RebelLogo";
import SubstackSignup from "@/components/SubstackSignup";

const SCROLL_MAP = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/LJSaRbdurtjnmgoI.png";
const HOPE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/XEp7JhlUZSYOHCylU47BD6-img-1_1771697605000_na1fn_aG9wZS1pcy1yZWJlbGxpb3VzLThiaXQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L1hFcDdKaGxVWlNZT0hDeWxVNDdCRDYtaW1nLTFfMTc3MTY5NzYwNTAwMF9uYTFmbl9hRzl3WlMxcGN5MXlaV0psYkd4cGIzVnpMVGhpYVhRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lH4pj8IuTDz9V4l5t11urTdwZmR9CfGvggQo5mmZXCFAeXukFYnVCXDtB4E7K1CWCC76~MxTT5rGi0NzR7ufrH9pxayb0hJp6zip4w2dBiiNoT5Zc3F~dCOlXbHLzZcg6UpUdhlhNStkT~5xZPi2lMfh0QDdG~9ZVio6KKd4GFHhm-GVgFyVBQ6LpN6cMQhseN72xgKBnWS-6nCfL0CXECfXkRqAPDxZXb2LZA7YAbEs7ng06wDxJ6MpWHXoz6spI1XkCUXDObZftbQgOrl2AJ6BaG2zIdpRZcaH-4h4rLFjrwRz97YZucLplxgPuYjRipSt0cB3oZkzSWpTDJKIoA__";

export default function Manifesto() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 md:py-32">
        <div className="absolute inset-0 opacity-45">
          <img src={SCROLL_MAP} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />

        <div className="relative z-10 container text-center">
          <FadeIn>
            <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">THE MAP</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-parchment mb-4 leading-tight">
              The Rebel Manifesto
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-display text-xl md:text-2xl italic text-parchment-dim max-w-2xl mx-auto">
              A Field Guide for the New Humanity
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Opening — the voice that draws you in */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <DialogueBox speaker="NARRATOR">
                <p className="italic">
                  This is not a leadership model. It is a rebellion and a remembering. As the Tao Te Ching says: "The further one goes, the less one knows."
                </p>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mt-10 drop-cap">
                It is for the leaders who cringe at the word "leadership." For the ones who feel the
                hollowness in the buzzwords and the exhaustion in the endless striving. For the ones
                who suspect the system isn't just broken, but that it was designed this way — and that
                they, in their deep humanity, were not.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-6">
                This is for the misfits, the quiet visionaries, the burdened empaths, and the reluctant
                leaders who feel the ache of the world but have not yet found the language for it.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-parchment-dim/70 text-base md:text-lg leading-relaxed font-display mt-6">
                The Home page told you what we see and what we believe. This manifesto goes deeper — into
                the roots, the philosophy, and the path forward.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Chapter I: The Roots — Philosophical grounding not covered on Home */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER I</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Roots: Why This Rebellion Is Ancient
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display drop-cap">
                The ache you feel is not new. The Stoics had a word for it: <em className="text-gold/70">oikeiosis</em> — the
                innate orientation toward wholeness that every living thing carries. It is the pull toward
                becoming what you already are. Your soul refusing to go numb is not weakness; it is this
                ancient instinct doing its work.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-6">
                Richard Rohr describes two halves of life. The first half is about building the container — 
                the career, the title, the competencies. The second half is about filling it with meaning.
                Most of the leadership industry is stuck in the first half, endlessly optimizing the
                container while the soul inside it starves. The rebellion is the shift from the first half
                to the second.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <DialogueBox speaker="CORE BELIEF" className="mt-8">
                <p className="italic text-lg md:text-xl">
                  Leadership is not a role to perform, but a way of being to cultivate. It is not about
                  having the right answers, but about holding the right questions. As Rilke wrote: "Live the questions now."
                </p>
              </DialogueBox>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Chapter II: The Three Disconnections — expands on Home's "existential crisis" line */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER II</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Three Disconnections
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                The Home page named the crisis as existential — a formation crisis, a disconnection from
                self, from others, and from purpose. Here is what that looks like when you trace it to its roots:
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-4 ml-4 border-l-2 border-gold/20 pl-6">
                <p className="text-parchment-dim/80 text-base font-display">
                  Disconnection from <strong className="text-parchment">self</strong> leads to a loss of identity.
                  Rohr calls it the False Self — the persona we construct to survive the system. We perform
                  competence while our inner life atrophies. The leader with the title but no soul.
                </p>
                <p className="text-parchment-dim/80 text-base font-display">
                  Disconnection from <strong className="text-parchment">others</strong> leads to a loss of community.
                  Putnam's research confirms what we already feel: social capital has collapsed. We have
                  colleagues but not companions. Networks but not neighbors.
                </p>
                <p className="text-parchment-dim/80 text-base font-display">
                  Disconnection from <strong className="text-parchment">purpose</strong> leads to a loss of meaning.
                  Frankl warned us that a person can endure almost any <em className="text-gold/70">how</em> if they
                  have a <em className="text-gold/70">why</em>. The modern workplace offers neither.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-8">
                When people are disconnected at all three levels, they are hollowed out. We exist to
                help people become whole while they lead, right where they are.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Chapter III: The Deeper Architecture — HID and environment-shaping */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER III</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Deeper Architecture
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                The Home page introduced the Rebel OS — the Flywheel, the Bowl, Maps, Mirrors, and Moves.
                But underneath those tools is a foundational insight: <strong className="text-gold/80">you
                cannot change behavior directly; you must first shape the environment that forms the person.</strong>{" "}
                This is the philosophy of Holistic Shaping.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="quest-card p-6">
                <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-4">HOLISTIC IMPACT DEPTH (HID)</p>
                <p className="text-parchment-dim/80 text-sm font-display leading-relaxed mb-6">
                  A leader is not just a set of competencies. They are a whole person. HID integrates
                  the five dimensions of a leader's health:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {[
                    { name: "Spiritual", desc: "Connection to meaning and transcendence" },
                    { name: "Emotional", desc: "Self-awareness, regulation, and empathy" },
                    { name: "Leading", desc: "The craft of stewarding others' growth" },
                    { name: "Physical", desc: "The body as the instrument of presence" },
                    { name: "Technical", desc: "The skills that serve the mission" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="font-display text-sm font-semibold text-parchment mb-1">{item.name}</p>
                      <p className="text-parchment-dim/50 text-xs font-display leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-8">
                Most leadership development touches only the last two — Leading and Technical. The Rebel OS
                starts with the first three. That is the difference between training and formation.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Chapter IV: The Path — the three-step journey of a Rebel Leader */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER IV</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Path: From Formed to Former
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                The goal is not to create better managers. It is to form <strong className="text-gold/80">Transformed
                Teachers</strong> — leaders who become carriers of this new way of being into their own
                corner of the world. We do not build the new world; we create the sacred space for it to be born.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <DialogueBox speaker="YOUR MISSION" className="mb-8">
                <div className="space-y-4 text-base">
                  <p>
                    <strong className="text-gold/80">1. Do your own inner work first.</strong>{" "}
                    You cannot give what you do not have. The journey begins with dismantling the
                    False Self — the persona the system taught you to wear — to lead from a place of wholeness.
                  </p>
                  <p>
                    <strong className="text-gold/80">2. Become a steward of the conditions around you.</strong>{" "}
                    Tend to the soil of your team's culture. Create psychological safety. Hold the space
                    for others to become more themselves.
                  </p>
                  <p>
                    <strong className="text-gold/80">3. Become a teacher.</strong>{" "}
                    Carry this into your world. Use the language. Live the principles. Become a
                    living cell of the new organism.
                  </p>
                </div>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="quest-card p-6 mt-8">
                <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-4">SO THAT...</p>
                <ul className="space-y-3 text-parchment-dim/80 text-sm md:text-base font-display">
                  <li className="flex gap-3">
                    <span className="text-gold/60 shrink-0">{">"}</span>
                    Loneliness lessens, character deepens, and courage spreads.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold/60 shrink-0">{">"}</span>
                    Humanity flourishes and people begin to hope again.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold/60 shrink-0">{">"}</span>
                    The world is marked by cultures of trust, leadership that is deeply human, and people operating in full alignment.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold/60 shrink-0">{">"}</span>
                    We midwife a new species of organization by awakening the humans inside them.
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Chapter V: The Ethos — unique lines that define the feel */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER V</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Ethos: How It Feels to Be a Rebel
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-4">
                {[
                  "Leadership is not about climbing higher — it's about digging deeper.",
                  "We measure success by depth, not just scale.",
                  "We are stewards of conditions, not heroes of outcomes.",
                  "The work is not to become something you are not, but to finally become the person you have always been.",
                ].map((quote, i) => (
                  <div key={i} className="border-l-2 border-gold/20 pl-6 py-1">
                    <p className="font-display text-lg md:text-xl italic text-parchment-dim/80">
                      "{quote}"
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Hope Is Rebellious — full-width image break */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src={HOPE_IMG}
          alt="Hope Is Rebellious"
          className="absolute inset-0 w-full h-full object-cover pixel-render"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/30" />

        {/* Spray-painted Rebel Leaders logo — bottom-right like a graffiti tag */}
        <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 z-10">
          <svg
            width="100"
            height="58"
            viewBox="0 0 120 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            style={{ filter: 'url(#spraypaint)' }}
          >
            <defs>
              <filter id="spraypaint" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="5" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            {/* Arch */}
            <path
              d="M 32 45 A 28 28 0 0 1 88 45 L 78 45 A 18 18 0 0 0 42 45 Z"
              fill="#c8a84e"
              opacity="0.85"
            />
            {/* Horizon line */}
            <rect x="16" y="51" width="88" height="7" fill="#c8a84e" opacity="0.85" />
          </svg>
        </div>
      </section>

      <PixelDivider />

      {/* Closing — the invitation, stripped to essentials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">THE INVITATION</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-8">
                Welcome Home
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-10">
                If this manifesto resonates in your bones, you are already one of us. The work is not
                to become something you are not, but to finally become the person you have always been.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mb-10">
                <SubstackSignup variant="featured" />
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              <RebelLogo size={48} className="mx-auto text-gold/50" />
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
