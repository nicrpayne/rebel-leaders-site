/*
 * THE MAP — /manifesto
 * The full Rebel Manifesto rendered as a long-form RPG scroll.
 * Uses the scroll/map pixel art as the hero backdrop.
 * Design: Scriptorium-style, deep green, gold accents, drop caps.
 */

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import DialogueBox from "@/components/DialogueBox";
import PixelDivider from "@/components/PixelDivider";
import RebelLogo from "@/components/RebelLogo";

const SCROLL_MAP = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/LJSaRbdurtjnmgoI.png";
const HOPE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/XEp7JhlUZSYOHCylU47BD6-img-1_1771697605000_na1fn_aG9wZS1pcy1yZWJlbGxpb3VzLThiaXQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L1hFcDdKaGxVWlNZT0hDeWxVNDdCRDYtaW1nLTFfMTc3MTY5NzYwNTAwMF9uYTFmbl9hRzl3WlMxcGN5MXlaV0psYkd4cGIzVnpMVGhpYVhRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lH4pj8IuTDz9V4l5t11urTdwZmR9CfGvggQo5mmZXCFAeXukFYnVCXDtB4E7K1CWCC76~MxTT5rGi0NzR7ufrH9pxayb0hJp6zip4w2dBiiNoT5Zc3F~dCOlXbHLzZcg6UpUdhlhNStkT~5xZPi2lMfh0QDdG~9ZVio6KKd4GFHhm-GVgFyVBQ6LpN6cMQhseN72xgKBnWS-6nCfL0CXECfXkRqAPDxZXb2LZA7YAbEs7ng06wDxJ6MpWHXoz6spI1XkCUXDObZftbQgOrl2AJ6BaG2zIdpRZcaH-4h4rLFjrwRz97YZucLplxgPuYjRipSt0cB3oZkzSWpTDJKIoA__";
const HOPE_IMG_ORIGINAL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/mcnYBUpLpZAnHhkQ.jpg";

export default function Manifesto() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <img src={SCROLL_MAP} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

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

      {/* Opening */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <DialogueBox speaker="NARRATOR">
                <p className="italic">
                  This is not a leadership framework. It is a rebellion and a remembering.
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
              <p className="text-gold/80 text-lg md:text-xl font-display mt-6 italic">
                If you are one of us, then you are not crazy for seeing what you see. And you are not alone.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Chapter 1: The Diagnosis */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER I</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Diagnosis: A World of Hollow Crowns
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display drop-cap">
                <strong className="text-parchment">There is a problem.</strong> We are living through a
                crisis of disconnection. We are lonely, anxious, and adrift in systems that were built
                for efficiency, not for meaning. Our institutions — the very places where we spend
                90,000 hours of our lives — are hollowing people out. This is not a bug; it is a
                feature of the current operating system.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-6">
                <strong className="text-parchment">This problem exists because of The Great Transfer.</strong>{" "}
                The traditional institutions that once provided formation, meaning, and belonging — family,
                church, civic groups — have collapsed. That profound human need did not disappear; it was
                unconsciously transferred onto the transactional structures of the workplace. We are asking
                our jobs to be our village, our purpose, and our identity, and the weight is crushing us.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="quest-card p-6 mt-8">
                <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-3">ENEMY IDENTIFIED</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-parchment">Vulture Culture</p>
                    <p className="text-parchment-dim/50 text-sm font-display mt-1">
                      A system that only loves you when you're producing.
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-parchment">The Machine</p>
                    <p className="text-parchment-dim/50 text-sm font-display mt-1">
                      An outdated OS from 1986 that treats humanity as a liability.
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-parchment">The Hollow Crown</p>
                    <p className="text-parchment-dim/50 text-sm font-display mt-1">
                      The leader with the title but disconnected from their soul.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Chapter 2: The Belief */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER II</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Belief: A Rebellion of Remembering
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display drop-cap">
                <strong className="text-parchment">But we believe a different world is not only possible,
                but is already emerging.</strong> We believe that the ache you feel is not a sign of your
                weakness, but a signal of your sanity. It is your soul refusing to go numb. It is the
                memory of a more ancient and truer way of being.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-6">
                We believe that <strong className="text-gold/80">human flourishing is the point.</strong> Not
                profit, not productivity, not performance. The ultimate purpose of any organization should
                be to grow people. We believe that your 90,000 hours can be an engine of deep transformation,
                not just a paycheck and some KPIs.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <DialogueBox speaker="CORE BELIEF" className="mt-8">
                <p className="italic text-lg md:text-xl">
                  Leadership is not a role to perform, but a way of being to cultivate. It is not about
                  having the right answers, but about holding the right questions.
                </p>
              </DialogueBox>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Chapter 3: The Purpose */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER III</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Purpose: To Solve for Loneliness
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                Our purpose is to solve the crisis under every other crisis: <strong className="text-parchment">existential loneliness.</strong>
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-4 ml-4 border-l-2 border-gold/20 pl-6">
                <p className="text-parchment-dim/80 text-base font-display">
                  Disconnection from <strong className="text-parchment">self</strong> leads to a loss of identity.
                </p>
                <p className="text-parchment-dim/80 text-base font-display">
                  Disconnection from <strong className="text-parchment">others</strong> leads to a loss of community.
                </p>
                <p className="text-parchment-dim/80 text-base font-display">
                  Disconnection from <strong className="text-parchment">purpose</strong> leads to a loss of meaning.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mt-8">
                When people feel disconnected at all three levels, they are hollowed out. We exist to
                help people become whole while they lead, right where they are.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Chapter 4: The Vision */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER IV</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Vision: A Distributed Formation Network
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display drop-cap">
                <strong className="text-parchment">Our vision is cosmic.</strong> We see a world where millions
                of companies, organizations, and institutions are no longer sites of extraction, but have been
                repurposed into a <strong className="text-gold/80">distributed character formation network</strong> — a
                global ecosystem of schools for the soul, producing generations of leaders equipped to live
                with hope and courage in the modern world.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
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

      {/* Chapter 5: The Mission */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER V</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Mission: Midwifing the New World
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                Our mission is to awaken and equip the midwives of this new world. We do not build it;
                we create the sacred space for it to be born.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "The Rebel OS",
                    desc: "An open-source operating system for human flourishing, translated from ancient wisdom, modern science, and spiritual formation into a practical language for today's leaders.",
                  },
                  {
                    title: "Maps, Mirrors & Moves",
                    desc: "Maps to understand the terrain of consciousness. Mirrors to give language for what you're already experiencing. Moves — tiny experiments in courage — to help you participate in reality differently.",
                  },
                  {
                    title: "Transformed Teachers",
                    desc: "Our goal is not to create better managers, but to form multipliers — leaders who become carriers of this new OS into their own corner of the world.",
                  },
                ].map((item, i) => (
                  <div key={i} className="quest-card p-5">
                    <h3 className="font-display text-lg font-semibold text-parchment mb-2">{item.title}</h3>
                    <p className="text-parchment-dim/60 text-sm font-display leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Chapter 6: The Artifact */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER VI</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Artifact: The Rebel OS & Holistic Shaping
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                The Rebel OS is an operating system for leadership that treats work as spiritual formation.
                It is built on the philosophy of <strong className="text-gold/80">Holistic Shaping</strong>,
                which understands that you cannot change behavior directly; you must first shape the
                environment that forms the person.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-4">
                {[
                  {
                    name: "The Flywheel",
                    desc: "Culture is attracted to Vision, Vision rests on Relationship, and Relationship is fostered in Identity.",
                  },
                  {
                    name: "Holistic Impact Depth (HID)",
                    desc: "Integrating the five key areas of a leader's health: Spiritual, Emotional, Leading, Physical, and Technical.",
                  },
                  {
                    name: "The Bowl and the Flow",
                    desc: "Conventional leadership obsesses over the Flow (the work). The Rebel Leader focuses on the Bowl (the cultural container), knowing a strong container is what enables a powerful flow.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-gold/30 pl-6 py-2">
                    <h3 className="font-display text-lg font-semibold text-parchment mb-1">{item.name}</h3>
                    <p className="text-parchment-dim/60 text-sm font-display leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Chapter 7: The Mobilization */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER VII</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Mobilization: A Call to the Courageous
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                We are mobilizing the leaders-in-the-making. The ones who feel the ache of the world.
                The ones who refuse to harden their hearts. The ones who are ready to remember who they are.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <DialogueBox speaker="YOUR MISSION" className="mb-8">
                <div className="space-y-4 text-base">
                  <p>
                    <strong className="text-gold/80">1. Do your own inner work first.</strong>{" "}
                    You cannot give what you do not have. The journey begins with dismantling your own
                    False Self to lead from a place of wholeness.
                  </p>
                  <p>
                    <strong className="text-gold/80">2. Become a steward of the conditions around you.</strong>{" "}
                    Tend to the soil of your team's culture. Create psychological safety. Hold the space
                    for others to become more themselves.
                  </p>
                  <p>
                    <strong className="text-gold/80">3. Become a teacher.</strong>{" "}
                    Carry this new OS into your world. Use the language. Live the principles. Become a
                    living cell of the new organism.
                  </p>
                </div>
              </DialogueBox>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* Chapter 8: The Ethos */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto md:ml-[10%]">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER VIII</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-parchment mb-8">
                The Ethos: How It Feels to Be a Rebel
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-4">
                {[
                  "It's not my job to fill your cup, but it is to empty mine.",
                  "Leadership is not about climbing higher — it's about digging deeper.",
                  "We measure success by depth, not just scale.",
                  "We are stewards of conditions, not heroes of outcomes.",
                  "Humanity is not a liability.",
                  "Hope is an act of rebellion.",
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

      {/* Chapter 9: The Invitation */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">CHAPTER IX</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-8">
                The Invitation
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-8">
                If this manifesto resonates in your bones, you are already one of us. The work is not
                to become something you are not, but to finally become the person you have always been.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                {[
                  { step: "Notice", desc: "Pay attention to the systems around you. Where do you see Vulture Culture?" },
                  { step: "Name it", desc: "Use the language. Talk about the Bowl and the Flow." },
                  { step: "Take one step", desc: "Choose one micro-practice of courage. Listen instead of command." },
                ].map((item, i) => (
                  <div key={i} className="quest-card p-5 text-left">
                    <span className="font-pixel text-[7px] text-gold/40 tracking-wider">STEP {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-xl font-semibold text-parchment mt-2 mb-2">{item.step}</h3>
                    <p className="text-parchment-dim/50 text-sm leading-relaxed font-display">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              <RebelLogo size={48} className="mx-auto text-gold/50 mb-6" />
              <p className="font-display text-2xl md:text-3xl italic text-gold/80">
                Welcome home.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
