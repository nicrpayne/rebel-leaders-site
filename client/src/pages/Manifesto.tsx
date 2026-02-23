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
import { usePageTracker } from "@/hooks/usePageTracker";

const SCROLL_MAP = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/LJSaRbdurtjnmgoI.png";
const HOPE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/XEp7JhlUZSYOHCylU47BD6-img-1_1771697605000_na1fn_aG9wZS1pcy1yZWJlbGxpb3VzLThiaXQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L1hFcDdKaGxVWlNZT0hDeWxVNDdCRDYtaW1nLTFfMTc3MTY5NzYwNTAwMF9uYTFmbl9hRzl3WlMxcGN5MXlaV0psYkd4cGIzVnpMVGhpYVhRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lH4pj8IuTDz9V4l5t11urTdwZmR9CfGvggQo5mmZXCFAeXukFYnVCXDtB4E7K1CWCC76~MxTT5rGi0NzR7ufrH9pxayb0hJp6zip4w2dBiiNoT5Zc3F~dCOlXbHLzZcg6UpUdhlhNStkT~5xZPi2lMfh0QDdG~9ZVio6KKd4GFHhm-GVgFyVBQ6LpN6cMQhseN72xgKBnWS-6nCfL0CXECfXkRqAPDxZXb2LZA7YAbEs7ng06wDxJ6MpWHXoz6spI1XkCUXDObZftbQgOrl2AJ6BaG2zIdpRZcaH-4h4rLFjrwRz97YZucLplxgPuYjRipSt0cB3oZkzSWpTDJKIoA__";

export default function Manifesto() {
  usePageTracker("map", true); // track visit + scroll completion
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
                  We don't teach leadership — there are plenty of coaches for that. But your leadership and your life are about to change forever.
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
                This is the deeper story. The roots beneath the rebellion, the philosophy that holds it together,
                and the path forward for anyone willing to walk it.
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
                  To redefine leadership as relational infrastructure that forms humans — so that
                  workplaces, where we spend the majority of our waking lives, stop hollowing us out.
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
                These are not three separate problems. They are a single fracture that runs through
                modern life, each break causing the next.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6 ml-4 border-l-2 border-gold/20 pl-6">
                <div>
                  <p className="text-parchment-dim/80 text-base font-display">
                    <strong className="text-parchment">Disconnection from self.</strong>{" "}
                    Since the Industrial Revolution, workplaces have been designed for transaction, not
                    transformation. They were never meant to be environments for healthy human development.
                    Gabor Maté's trauma research reveals the cost: in these systems, we are forced to
                    choose between authenticity and attachment. We always choose attachment. We adapt who
                    we are to survive. Rohr calls the result the False Self — the persona we construct
                    to make it through the day. Those who adapt most completely get promoted fastest.
                    We call them leaders. They are often the most deformed.
                  </p>
                </div>
                <div>
                  <p className="text-parchment-dim/80 text-base font-display">
                    <strong className="text-parchment">Disconnection from others.</strong>{" "}
                    For most of human history, the need for connection, formation, and purpose was held
                    by civic institutions — churches, lodges, neighborhood associations, extended families.
                    Robert Putnam documented their collapse in <em className="text-gold/70">Bowling Alone</em>:
                    between 1960 and 2000, participation in community organizations fell by more than half.
                    When those structures disappeared, all that unmet human need didn't vanish. It floated
                    like a spirit looking for a body to inhabit. And it landed in the only institution left
                    standing: the workplace.
                  </p>
                </div>
                <div>
                  <p className="text-parchment-dim/80 text-base font-display">
                    <strong className="text-parchment">Disconnection from purpose.</strong>{" "}
                    Suddenly workplaces had to address symptoms they didn't understand — disengagement,
                    turnover, suffering relationships with customers and each other. So they reached for
                    purpose statements and engagement surveys. But here is what almost nobody sees:
                    how purpose is practiced in a team reveals what that team actually believes about
                    leadership. Command-and-control leaders practice purpose differently than servant
                    leaders. The ontology of leadership — what we believe it <em className="text-gold/70">is</em> —
                    comes before Why. Purpose rests on that foundation. Wrong container means wrong
                    identity means wrong application of Why. This is why so many organizations "Start
                    With Why" and can't understand why it's not getting them anywhere.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-8">
                When people are disconnected at all three levels, what you get is exactly what we're
                seeing in society. We exist to help people become whole while they lead, right where they are.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Chapter III: The Path — the three-step journey of a Rebel Leader */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER III</p>
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
                <div className="space-y-6 text-base">
                  <div>
                    <p className="font-semibold text-gold/80 mb-1">1. Notice the game you've been playing.</p>
                    <p>
                      Name the invisible rules shaping you — performance-as-worth, control-as-safety,
                      image-as-survival. See the scripts without shame.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gold/80 mb-1">2. Reclaim your center.</p>
                    <p className="text-parchment-dim/60 text-xs font-pixel tracking-wider mb-2">IDENTITY + RELATIONSHIP</p>
                    <p>
                      Return to what's true underneath the persona. Reconnect to yourself and one
                      other person as a human — not a role. This is the first turn of the flywheel:
                      becoming real again.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gold/80 mb-1">3. Tend the soil.</p>
                    <p>
                      Now you can shape conditions instead of managing people: trust, clarity, belonging,
                      agency. You don't force fruit — you build the environment where it grows.
                    </p>
                  </div>
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

      {/* Chapter IV: The Ethos — unique lines that define the feel */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER IV</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Ethos: How It Feels to Be a Rebel
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-8">
                <div className="border-l-2 border-gold/20 pl-6 py-1">
                  <p className="font-display text-lg md:text-xl italic text-parchment-dim/90">
                    "Leadership isn't a ladder. It's a return."
                  </p>
                  <p className="text-parchment-dim/50 text-sm font-display mt-2">
                    Not climbing higher — remembering what's real.
                  </p>
                </div>
                <div className="border-l-2 border-gold/20 pl-6 py-1">
                  <p className="font-display text-lg md:text-xl italic text-parchment-dim/90">
                    "We measure impact by what changes in people."
                  </p>
                  <p className="text-parchment-dim/50 text-sm font-display mt-2">
                    Not just what ships. Not just what scales. Who becomes more whole?
                  </p>
                </div>
                <div className="border-l-2 border-gold/20 pl-6 py-1">
                  <p className="font-display text-lg md:text-xl italic text-parchment-dim/90">
                    "We don't 'influence' humans. We tend conditions."
                  </p>
                  <p className="text-parchment-dim/50 text-sm font-display mt-2">
                    Trust. Meaning. Belonging. Agency. That's the real infrastructure.
                  </p>
                </div>
                <div className="border-l-2 border-gold/20 pl-6 py-1">
                  <p className="font-display text-lg md:text-xl italic text-parchment-dim/90">
                    "The work isn't self-improvement. It's unlearning the False Self."
                  </p>
                  <p className="text-parchment-dim/50 text-sm font-display mt-2">
                    So you can finally lead from wholeness, not performance.
                  </p>
                </div>
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
