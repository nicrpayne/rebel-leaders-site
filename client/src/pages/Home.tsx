/*
 * DESIGN: "The Quest-Giver's Study" — 16-bit RPG meets Philosophical Depth
 * Deep forest green palette from the actual office. Pixel art hero scene.
 * RPG dialogue boxes for key quotes. Press Start 2P for UI, Cormorant Garamond
 * for body text. The dissonance IS the brand.
 * Logo icon (rising sun/horizon) used as section dividers and accent marks.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import DialogueBox from "@/components/DialogueBox";
import TypewriterText from "@/components/TypewriterText";
import PixelDivider from "@/components/PixelDivider";
import RebelLogo from "@/components/RebelLogo";
import Footer from "@/components/Footer";

/* ─── CDN Image URLs ─── */
const RPG_OFFICE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/zlNQJQinSxaqyYjB.png";
const RPG_BOOKSHELF = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/ytcCyobGtInvqMUp.png";
const RPG_BANNER = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/wovXMRQGUNlUpQiu.png";
const EMBER_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-2_1771637252000_na1fn_c2VjdGlvbi1lbWJlci10ZXh0dXJl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTJfMTc3MTYzNzI1MjAwMF9uYTFmbl9jMlZqZEdsdmJpMWxiV0psY2kxMFpYaDBkWEpsLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=M4WZy1Lubw4lUZg-xkYa~3KnlMQoGJlZcqOujMhLv-HZHaL3oWFqAgMHgwZFQS~uvVL-uAX4opiGGBzwFXqZlaKDMyYmbKfbzwZy9X4UiX-LIZy~ymHGGhW8mAFRQk1zNs-ROgt8ftpo~5yP~DVqQFXqN3tM7pjR6ZKorjnOj61QGAhF-El0hjRIRFC30KZW1f7X7TQPADPpcb5PtstkU4yxTflVp1wZci9ho0t5UQL90u~yfcpxBV-6H9wJaYbxrs2YRRgAiCQ7bCEZVJ6e~4SE7Zl5Tx2J5q6pjLM4H62p~4CEX8T-47eqdNCVuNUsleO8w~IpN-axBxa09K12YQ__";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — The Quest-Giver's Study
          Pixel art office scene with RPG title overlay
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Pixel art background */}
        <div className="absolute inset-0">
          <img
            src={RPG_OFFICE}
            alt="Pixel art scholar's study"
            className="w-full h-full object-cover pixel-render opacity-50 md:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/40 to-forest-deep" />
          {/* Subtle scanline overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center px-6">
          {/* Logo icon above title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <RebelLogo size={48} className="text-gold" />
          </motion.div>

          {/* Pixel font title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1 className="font-pixel text-lg sm:text-xl md:text-2xl lg:text-3xl text-gold mb-4 leading-relaxed tracking-wider">
              REBEL LEADERS
            </h1>
          </motion.div>

          {/* Serif subtitle — the hook */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
          >
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-parchment font-semibold leading-tight mb-3 max-w-3xl mx-auto">
              You've been playing
              <br />
              <span className="italic font-normal text-gold">the wrong game.</span>
            </p>
          </motion.div>

          {/* Dialogue box prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="max-w-xl mx-auto mt-8"
          >
            <div className="dialogue-box text-left">
              <p className="font-pixel text-[9px] md:text-[10px] text-gold/70 mb-2 tracking-wider">NARRATOR</p>
              <p className="font-display text-base md:text-lg text-parchment leading-relaxed">
                <TypewriterText
                  text="The leadership industry spent $366 billion teaching people to manage. Nobody taught them to be human. Until now."
                  speed={30}
                  delay={2200}
                  onComplete={() => setHeroReady(true)}
                />
              </p>
            </div>
          </motion.div>

          {/* Press Start prompt */}
          {heroReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <button
                onClick={() => document.querySelector("#diagnosis")?.scrollIntoView({ behavior: "smooth" })}
                className="font-pixel text-[10px] text-gold/60 hover:text-gold transition-colors tracking-widest"
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ▼ SCROLL TO BEGIN ▼
                </motion.span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <PixelDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: THE DIAGNOSIS — What We See
      ═══════════════════════════════════════════════════════════ */}
      <section id="diagnosis" className="relative py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto md:ml-[8%] lg:ml-[12%]">
            <FadeIn>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-6">
                CHAPTER I: THE DIAGNOSIS
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-8 leading-tight">
                Something is deeply wrong
                <br />
                <span className="italic font-normal text-parchment-dim">and everyone can feel it.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-6 text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display">
                <p className="drop-cap">
                  The institutions that once formed us — families, churches, civic organizations,
                  neighborhoods — have hollowed out. What remains is a $366 billion leadership industry
                  selling competency models to a world dying of loneliness. We call this{" "}
                  <em className="text-gold/80 not-italic font-semibold">The Great Transfer</em>: the impossible
                  burden placed on the transactional workplace to do what formative communities once did.
                </p>
                <p>
                  The result is what we name{" "}
                  <em className="text-gold/80 not-italic font-semibold">Vulture Culture</em> — organizations that
                  extract human energy without replenishing the soul. Leaders wearing the{" "}
                  <em className="text-gold/80 not-italic font-semibold">Hollow Crown</em>, performing authority
                  while hemorrhaging meaning. A machine that optimizes for everything except the one thing
                  that matters: human flourishing.
                </p>
              </div>
            </FadeIn>

            {/* RPG-style stat box */}
            <FadeIn delay={0.5}>
              <div className="mt-10 dialogue-box">
                <p className="font-pixel text-[8px] text-gold/50 mb-4 tracking-wider">STATUS REPORT</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { stat: "$366B", label: "Spent on leadership training", sublabel: "annually" },
                    { stat: "77%", label: "Workers disengaged", sublabel: "globally" },
                    { stat: "0", label: "Addressing the real crisis", sublabel: "the soul gap" },
                  ].map((item, i) => (
                    <div key={i} className="text-center py-2">
                      <p className="font-pixel text-sm md:text-base text-gold">{item.stat}</p>
                      <p className="font-display text-sm text-parchment-dim mt-1">{item.label}</p>
                      <p className="font-pixel text-[7px] text-parchment-dim/40 mt-1">{item.sublabel}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: THE BELIEF — What We Stand For
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Subtle pixel bookshelf background */}
        <div className="absolute inset-0 opacity-10">
          <img src={RPG_BOOKSHELF} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-background/90" />

        <div className="relative z-10 container">
          <div className="max-w-3xl mx-auto md:mr-[8%] lg:mr-[12%] md:ml-auto">
            <FadeIn>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-6">
                CHAPTER II: THE BELIEF
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-10 leading-tight">
                We believe the rebellion
                <br />
                <span className="italic font-normal text-parchment-dim">is one of remembering.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <DialogueBox speaker="THE REBEL CREED">
                <p className="italic">
                  "Human flourishing is the point. Not profit. Not productivity. Not performance metrics.
                  The point is that people become more fully alive."
                </p>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.45}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mt-8">
                We believe that every human being carries an irreducible dignity that no system can grant
                or revoke. That leadership is not a position but a posture — the posture of one who has
                done their own inner work and now creates conditions for others to grow. That the crisis
                under every crisis is not economic or political but{" "}
                <em className="text-gold/80">existential</em>: a disconnection from self, from others,
                and from purpose.
              </p>
            </FadeIn>

            {/* Three beliefs as quest items */}
            <FadeIn delay={0.55}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { text: "Humanity is not a liability." },
                  { text: "Character cannot be outsourced." },
                  { text: "Hope is rebellious." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="quest-card p-5 text-center group"
                  >
                    <RebelLogo
                      size={16}
                      className="mx-auto mb-3 text-gold/30 group-hover:text-gold/60 transition-colors duration-300"
                    />
                    <p className="font-display text-base md:text-lg italic text-parchment">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: THE WORK — The Rebel OS
      ═══════════════════════════════════════════════════════════ */}
      <section id="the-work" className="relative py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-6">
                CHAPTER III: QUEST LOG
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-3 leading-tight">
                The Rebel OS
              </h2>
              <p className="font-pixel text-[9px] text-gold/50 mb-8 tracking-wider">
                AN OPERATING SYSTEM FOR THE SOUL OF AN ORGANIZATION
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-10">
                Built on the philosophy of{" "}
                <strong className="text-parchment font-semibold">Holistic Shaping</strong>, the Rebel OS
                is our framework for transforming organizations from extraction machines into formation
                communities. It doesn't add another layer of training. It rewires the operating system —
                from the leader's inner life outward to the culture they steward.
              </p>
            </FadeIn>

            {/* The Flywheel — styled as RPG skill tree */}
            <FadeIn delay={0.4}>
              <div className="dialogue-box mb-10">
                <p className="font-pixel text-[9px] text-gold/60 mb-6 tracking-wider text-center">
                  ◆ THE FLYWHEEL ◆
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    {
                      title: "IDENTITY",
                      subtitle: "Know who you are",
                      desc: "The inner work of self-awareness through Maps, Mirrors, and Moves. Enneagram, Spiral Dynamics, and the True Self.",
                      level: "LVL 1",
                    },
                    {
                      title: "RELATIONSHIP",
                      subtitle: "Connect with depth",
                      desc: "From transactional to covenantal. Building trust, vulnerability, and the bonding agent of authentic community.",
                      level: "LVL 2",
                    },
                    {
                      title: "VISION",
                      subtitle: "See what could be",
                      desc: "Not strategic planning but prophetic imagination. The ability to name reality and call forth possibility.",
                      level: "LVL 3",
                    },
                    {
                      title: "CULTURE",
                      subtitle: "Steward the conditions",
                      desc: "The Bowl and the Flow. Leaders don't fill cups — they hold the bowl. Culture is the soil, not the crop.",
                      level: "LVL 4",
                    },
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-pixel text-[7px] text-forest-light bg-gold/15 px-2 py-1 tracking-wider">
                          {item.level}
                        </span>
                        <span className="font-pixel text-[10px] text-gold tracking-wider">
                          {item.title}
                        </span>
                      </div>
                      <p className="font-display text-sm italic text-parchment-dim mb-2">
                        {item.subtitle}
                      </p>
                      <p className="text-parchment-dim/60 text-sm leading-relaxed font-display">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Center connector */}
                <div className="hidden sm:flex justify-center mt-6">
                  <div className="flex items-center gap-2 text-gold/30">
                    <div className="w-8 h-[1px] bg-gold/20" />
                    <RebelLogo size={16} />
                    <div className="w-8 h-[1px] bg-gold/20" />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Maps, Mirrors, Moves — as inventory items */}
            <FadeIn delay={0.5}>
              <p className="font-pixel text-[9px] text-gold/50 mb-4 tracking-wider text-center">
                INVENTORY
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "MAPS",
                    emoji: "🗺",
                    desc: "Frameworks that show you where you are: Enneagram, Spiral Dynamics, the Divided Brain. Not to label, but to liberate.",
                  },
                  {
                    title: "MIRRORS",
                    emoji: "🪞",
                    desc: "Honest reflection from trusted others. The courage to see your False Self patterns and choose the True Self instead.",
                  },
                  {
                    title: "MOVES",
                    emoji: "⚔",
                    desc: "Practical disciplines and daily practices. Small acts of rebellion against the machine. The work of becoming.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="quest-card p-5 md:p-6 group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{item.emoji}</span>
                      <h3 className="font-pixel text-[10px] text-gold tracking-wider">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-parchment-dim/60 text-sm leading-relaxed font-display">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: LORE — Writing / Content
      ═══════════════════════════════════════════════════════════ */}
      <section id="writing" className="relative py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-6">
                CHAPTER IV: LORE
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-4 leading-tight">
                Ideas worth sitting with.
              </h2>
              <p className="font-pixel text-[8px] text-parchment-dim/40 mb-10 tracking-wider">
                ESSAYS, FRAMEWORKS, AND FIELD NOTES FROM THE REBELLION
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "The Great Transfer",
                  subtitle: "Why the workplace can't save us — and what can",
                  tag: "ESSAY",
                  xp: "+200 XP",
                },
                {
                  title: "The Hollow Crown",
                  subtitle: "On the loneliness of leading without a soul",
                  tag: "ESSAY",
                  xp: "+150 XP",
                },
                {
                  title: "Maps, Mirrors, and Moves",
                  subtitle: "A practical guide to the inner work of leadership",
                  tag: "FRAMEWORK",
                  xp: "+300 XP",
                },
                {
                  title: "The Bowl and the Flow",
                  subtitle: "Why culture is a container, not a program",
                  tag: "METAPHOR",
                  xp: "+250 XP",
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={0.2 + i * 0.1}>
                  <button
                    onClick={() =>
                      toast("Coming soon", {
                        description: "This quest will be available soon.",
                      })
                    }
                    className="w-full text-left quest-card p-5 md:p-6 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-pixel text-[7px] text-forest-light bg-gold/10 px-2 py-1 tracking-wider">
                        {item.tag}
                      </span>
                      <span className="font-pixel text-[7px] text-gold/30 tracking-wider">
                        {item.xp}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-parchment mb-2 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-parchment-dim/50 text-sm leading-relaxed font-display">
                      {item.subtitle}
                    </p>
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: THE PARTY — About
      ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="relative py-20 md:py-32 overflow-hidden">
        {/* Banner background */}
        <div className="absolute inset-0 opacity-15">
          <img
            src={RPG_BANNER}
            alt=""
            className="w-full h-full object-cover pixel-render"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

        <div className="relative z-10 container">
          <div className="max-w-3xl mx-auto md:ml-[5%]">
            <FadeIn>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-6">
                CHAPTER V: THE PARTY
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-8 leading-tight">
                Trained where leadership
                <br />
                <span className="italic font-normal text-parchment-dim">had to work without leverage.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-6 text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display">
                <p className="drop-cap">
                  Nic spent years in environments where you couldn't fire anyone, couldn't offer a raise,
                  and couldn't promise a promotion. The only currency was trust. The only authority was
                  character. In those crucibles — military service, ministry, frontline leadership — he
                  learned that the conventional leadership playbook was not just insufficient. It was
                  upside down.
                </p>
                <p>
                  What emerged was a conviction: that the deepest crisis in organizations is not a skills
                  gap but a <em className="text-gold/80 not-italic font-semibold">soul gap</em>. That we
                  don't need better managers — we need transformed teachers. People who have done their own
                  inner work and can now hold space for others to do theirs.
                </p>
              </div>
            </FadeIn>

            {/* Character card */}
            <FadeIn delay={0.5}>
              <div className="dialogue-box mt-10">
                <p className="font-pixel text-[8px] text-gold/50 mb-4 tracking-wider">CHARACTER SHEET</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {[
                    { stat: "CLASS", value: "Rebel Leader" },
                    { stat: "ORIGIN", value: "Military / Ministry" },
                    { stat: "WEAPON", value: "Holistic Shaping" },
                    { stat: "QUEST", value: "Reclaim the Soul" },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="font-pixel text-[7px] text-gold/40 tracking-wider mb-1">{item.stat}</p>
                      <p className="font-display text-sm text-parchment">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: THE VISION — The Cosmic "So That"
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <img src={EMBER_IMG} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-background/90" />

        <div className="relative z-10 container">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <RebelLogo size={40} className="mx-auto text-gold/50 mb-6" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-6">
                CHAPTER VI: THE VISION
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-parchment mb-10 leading-tight">
                Millions of organizations,
                <br />
                <span className="italic font-normal text-gold">
                  repurposed as a distributed
                  <br />
                  formation network.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display max-w-2xl mx-auto mb-10">
                Producing leaders of character equipped to live with hope and courage in the modern world.
                Not better managers. Not more efficient systems.{" "}
                <strong className="text-parchment font-semibold">Whole humans</strong> — formed in
                community, tested by reality, and sent back into the world as agents of repair.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <DialogueBox speaker="THE REBEL OATH" className="max-w-xl mx-auto text-center">
                <p className="italic text-xl md:text-2xl text-gold/80">
                  "It's not my job to fill your cup,
                  <br />
                  but it is to empty mine."
                </p>
              </DialogueBox>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: JOIN THE PARTY — Newsletter / CTA
      ═══════════════════════════════════════════════════════════ */}
      <section id="join" className="relative py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-6">
                CHAPTER VII: JOIN THE PARTY
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-6 leading-tight">
                You're not crazy.
                <br />
                <span className="italic font-normal text-parchment-dim">You're not alone.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mb-10 max-w-xl mx-auto">
                There's a language for what you feel. A community of people who refuse to accept that
                this is all there is. Join the party and receive essays, frameworks, and invitations to
                go deeper.
              </p>
            </FadeIn>

            {/* Newsletter signup — RPG dialogue box style */}
            <FadeIn delay={0.45}>
              <div className="dialogue-box max-w-md mx-auto">
                <p className="font-pixel text-[8px] text-gold/50 mb-4 tracking-wider">NEW QUEST AVAILABLE</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    className="flex-1 bg-forest-deep/60 border-2 border-wood/30 px-4 py-3 text-parchment placeholder:text-parchment-dim/30 font-ui text-sm focus:outline-none focus:border-gold/50 transition-colors duration-300"
                  />
                  <button
                    onClick={() =>
                      toast("Welcome, rebel.", {
                        description: "Newsletter signup coming soon.",
                      })
                    }
                    className="bg-gold/15 border-2 border-gold/40 px-6 py-3 font-pixel text-[9px] tracking-wider text-gold hover:bg-gold/25 hover:border-gold/60 transition-all duration-300"
                  >
                    JOIN
                  </button>
                </div>
                <p className="font-pixel text-[6px] text-parchment-dim/25 mt-3 tracking-wider">
                  NO SPAM. NO HUSTLE. JUST IDEAS WORTH SITTING WITH.
                </p>
              </div>
            </FadeIn>

            {/* Three steps — quest objectives */}
            <FadeIn delay={0.6}>
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {[
                  {
                    step: "STEP 01",
                    title: "Notice",
                    desc: "Pay attention to the ache. The sense that something is missing. That's not weakness — it's wisdom.",
                  },
                  {
                    step: "STEP 02",
                    title: "Name",
                    desc: "Give language to what you see. The Great Transfer. The Hollow Crown. Naming is the first act of resistance.",
                  },
                  {
                    step: "STEP 03",
                    title: "Take One Step",
                    desc: "Start the inner work. Find your people. Hold the bowl. Just steward your corner of it.",
                  },
                ].map((item, i) => (
                  <div key={i} className="quest-card p-5">
                    <span className="font-pixel text-[7px] text-gold/40 tracking-wider">{item.step}</span>
                    <h3 className="font-display text-xl font-semibold text-parchment mt-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-parchment-dim/50 text-sm leading-relaxed font-display">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
