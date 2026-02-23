/*
 * DESIGN: "The Quest-Giver's Study" — 16-bit RPG meets Philosophical Depth
 * Deep forest green palette from the actual office. Pixel art hero scene.
 * RPG dialogue boxes for key quotes. Press Start 2P for UI, Cormorant Garamond
 * for body text. The dissonance IS the brand.
 * Logo icon (rising sun/horizon) used as section dividers and accent marks.
 */

import { useState } from "react";
import { motion } from "framer-motion";
// toast handled by SubstackSignup component
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import DialogueBox from "@/components/DialogueBox";
import TypewriterText from "@/components/TypewriterText";
import PixelDivider from "@/components/PixelDivider";
import RebelLogo from "@/components/RebelLogo";
import Footer from "@/components/Footer";
import SubstackSignup from "@/components/SubstackSignup";

/* ─── CDN Image URLs ─── */
const RPG_OFFICE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/zlNQJQinSxaqyYjB.png";
const RPG_BOOKSHELF = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/ytcCyobGtInvqMUp.png";
const EMBER_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-2_1771637252000_na1fn_c2VjdGlvbi1lbWJlci10ZXh0dXJl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTJfMTc3MTYzNzI1MjAwMF9uYTFmbl9jMlZqZEdsdmJpMWxiV0psY2kxMFpYaDBkWEpsLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=M4WZy1Lubw4lUZg-xkYa~3KnlMQoGJlZcqOujMhLv-HZHaL3oWFqAgMHgwZFQS~uvVL-uAX4opiGGBzwFXqZlaKDMyYmbKfbzwZy9X4UiX-LIZy~ymHGGhW8mAFRQk1zNs-ROgt8ftpo~5yP~DVqQFXqN3tM7pjR6ZKorjnOj61QGAhF-El0hjRIRFC30KZW1f7X7TQPADPpcb5PtstkU4yxTflVp1wZci9ho0t5UQL90u~yfcpxBV-6H9wJaYbxrs2YRRgAiCQ7bCEZVJ6e~4SE7Zl5Tx2J5q6pjLM4H62p~4CEX8T-47eqdNCVuNUsleO8w~IpN-axBxa09K12YQ__";

/* ─── Substack Article URLs ─── */
const SUBSTACK_GREAT_TRANSFER = "https://open.substack.com/pub/leaderrebellion/p/why-work-cant-be-your-church?r=5ubsq&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true";
const SUBSTACK_VULTURE_CULTURE = "https://open.substack.com/pub/leaderrebellion/p/culture-vulture?r=5ubsq&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true";
const SUBSTACK_HOLLOW_CROWN = "https://open.substack.com/pub/leaderrebellion/p/the-hollow-crown-why-our-leadership?r=5ubsq&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true";

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
          CHAPTER I: THE DIAGNOSIS — What We See
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
                  selling competency models to a world dying of loneliness. Aristotle called it <em className="text-gold/70">akrasia</em> — knowing the good but being unable to do it. This is{" "}
                  <a
                    href={SUBSTACK_GREAT_TRANSFER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-semibold not-italic hover:text-gold/80 underline decoration-gold/30 hover:decoration-gold/60 transition-colors"
                  >
                    The Great Transfer
                  </a>
                  : the impossible burden placed on the transactional workplace to do what formative
                  communities once did. The Tao Te Ching warned us: <em className="text-gold/70">"When the great Tao is forgotten, goodness and piety appear."</em> We forgot. And now we're buying it back at retail.
                </p>
                <p>
                  The result is what we name{" "}
                  <a
                    href={SUBSTACK_VULTURE_CULTURE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-semibold not-italic hover:text-gold/80 underline decoration-gold/30 hover:decoration-gold/60 transition-colors"
                  >
                    Vulture Culture
                  </a>
                  {" "}— organizations that extract human energy without replenishing the soul. Leaders
                  wearing the{" "}
                  <a
                    href={SUBSTACK_HOLLOW_CROWN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-semibold not-italic hover:text-gold/80 underline decoration-gold/30 hover:decoration-gold/60 transition-colors"
                  >
                    Hollow Crown
                  </a>
                  , performing authority while hemorrhaging meaning. A machine that optimizes for
                  everything except the one thing that matters: what the Greeks called <em className="text-gold/70">eudaimonia</em> — human flourishing.
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
          CHAPTER II: THE BELIEF — What We Stand For
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
              <DialogueBox speaker="THE REBEL PHILOSOPHY">
                <p className="italic">
                  "Eudaimonia — human flourishing is the point. Not profit. Not productivity. Not performance metrics.
                  The point is that people become more fully alive."
                </p>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.45}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display mt-8">
                We believe that every human being carries an irreducible dignity that no system can grant
                or revoke. That leadership is not a position but a posture — the posture of one who has
                done their own inner work and now creates conditions for others to grow. Meister Eckhart
                said it in the 13th century: <em className="text-gold/70">"The outward work will never be puny if the inward work is great."</em>{" "}
                The crisis under every crisis is not economic or political but{" "}
                <em className="text-gold/80">existential</em>: a disconnection from self, from others,
                and from purpose. Rumi named it eight centuries ago — <em className="text-gold/70">"Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it."</em>
              </p>
            </FadeIn>

            {/* Three beliefs as quest items */}
            <FadeIn delay={0.55}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { text: "Humanity is not a liability.", source: "— contra the Machine" },
                  { text: "Character cannot be outsourced.", source: "— Aristotle, Nicomachean Ethics" },
                  { text: "Hope is rebellious.", source: "— Václav Havel" },
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
                    <p className="font-pixel text-[6px] text-gold/30 mt-2 tracking-wider">
                      {item.source}
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
          CHAPTER III: THE WORK — The Rebel OS
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
                is our orbital system for transforming organizations from extraction machines into formation
                communities. It recovers what the ancients already knew — from Aristotle's <em className="text-gold/70">phronesis</em>{" "}
                (practical wisdom) to the Desert Fathers' <em className="text-gold/70">kenosis</em> (self-emptying) to the Buddhist concept of{" "}
                <em className="text-gold/70">beginner's mind</em> — and translates it through modern neuroscience, psychology, and sociology
                into a living system for today's leaders.
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
                      desc: "Rediscovering our unchanging essence of being and its connection to the universe. Requires relationship to be developed.",
                      level: "LVL 1",
                    },
                    {
                      title: "RELATIONSHIP",
                      subtitle: "Connect with depth",
                      desc: "Separation is an illusion. We only truly exist in relation to everything else, as does the rest of reality.",
                      level: "LVL 2",
                    },
                    {
                      title: "VISION",
                      subtitle: "See what could be",
                      desc: "What happens when connection and relationship give birth to a potential new future. Always bottoms up, co-created — 'hey, wouldn't it be cool if…?'",
                      level: "LVL 3",
                    },
                    {
                      title: "CULTURE",
                      subtitle: "Steward the conditions",
                      desc: "The Bowl, Water, and Current. The Bowl is attention and intention (Iain McGilchrist). The Water is Howard Thurman's 'deep ocean within.' The Current is Martin Buber's I/Thou philosophy. Leaders don't fill cups — they hold the bowl.",
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
                    desc: "Lenses that reveal the terrain you're standing in. Not to label you — to liberate you.",
                    href: "/manifesto",
                  },
                  {
                    title: "MIRRORS",
                    emoji: "🪞",
                    desc: "Tools for honest self-seeing. Spot the patterns. Choose the truer path.",
                    href: "/mirror",
                  },
                  {
                    title: "MOVES",
                    emoji: "⚔",
                    desc: "Small experiments you can actually do. Daily practices that shift the relational field.",
                    href: "/armory",
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="quest-card p-5 md:p-6 group block"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{item.emoji}</span>
                      <h3 className="font-pixel text-[10px] text-gold tracking-wider group-hover:text-parchment transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-parchment-dim/60 text-sm leading-relaxed font-display">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ═══════════════════════════════════════════════════════════
          CHAPTER IV: LORE — Writing / Content
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
                ANCIENT WISDOM RECOVERED · CROSS-DISCIPLINE SECRETS UNCOVERED
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "The Great Transfer",
                  subtitle: "Why the workplace can't save us — and what can",
                  tag: "ESSAY",
                  xp: "+200 XP",
                  href: SUBSTACK_GREAT_TRANSFER,
                  external: true,
                },
                {
                  title: "The Hollow Crown",
                  subtitle: "On the loneliness of leading without a soul",
                  tag: "ESSAY",
                  xp: "+150 XP",
                  href: SUBSTACK_HOLLOW_CROWN,
                  external: true,
                },
                {
                  title: "Maps, Mirrors, and Moves",
                  subtitle: "A practical guide to the inner work of leadership",
                  tag: "LENS",
                  xp: "+300 XP",
                  href: "/archives",
                  external: false,
                },
                {
                  title: "Bowl, Water, and Current",
                  subtitle: "Why culture is a container, not a program",
                  tag: "METAPHOR",
                  xp: "+250 XP",
                  href: "/archives",
                  external: false,
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={0.2 + i * 0.1}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left quest-card p-5 md:p-6 group block"
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
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="w-full text-left quest-card p-5 md:p-6 group block"
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
                    </Link>
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PixelDivider showIcon={false} />

      {/* ═══════════════════════════════════════════════════════════
          CHAPTER V: THE VISION — The Cosmic "So That"
          (Chapter V was previously "The Party" / About — now removed;
           renumbered from old Chapter VI)
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
                CHAPTER V: THE VISION
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-parchment mb-10 leading-tight">
                Millions of organizations,
                <br />
                <span className="italic font-normal text-gold">
                  mobilized as a distributed
                  <br />
                  formation network.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed font-display max-w-2xl mx-auto mb-10">
                The Stoics called it <em className="text-gold/70">cosmopolis</em> — the universal city. The Hebrew prophets called it <em className="text-gold/70">shalom</em> — the
                wholeness of all things. We're building toward it: leaders of character equipped to live with hope
                and courage in the modern world. Not better managers. Not more efficient systems.{" "}
                <strong className="text-parchment font-semibold">Whole humans</strong> — formed in
                community, tested by reality, and sent back into the world as what the Japanese call{" "}
                <em className="text-gold/70">ikigai</em> in motion: agents of repair.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <DialogueBox speaker="THE REBEL OATH" className="max-w-xl mx-auto text-center">
                <p className="italic text-xl md:text-2xl text-gold/80">
                  "It's not my job to fill your cup,
                  <br />
                  but it is to empty mine."
                  <br />
                  <span className="text-sm text-gold/40 not-italic font-display block mt-3">echoing the kenosis of Philippians 2:7</span>
                </p>
              </DialogueBox>
            </FadeIn>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ═══════════════════════════════════════════════════════════
          CHAPTER VI: JOIN THE PARTY — Newsletter / CTA
      ═══════════════════════════════════════════════════════════ */}
      <section id="join" className="relative py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-6">
                CHAPTER VI: JOIN THE PARTY
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
                this is all there is. The Ubuntu philosophy says <em className="text-gold/70">"I am because we are."</em>{" "}
                Join the party and receive essays, lenses, and invitations to go deeper.
              </p>
            </FadeIn>

            {/* Newsletter signup — Substack integration */}
            <FadeIn delay={0.45}>
              <SubstackSignup variant="featured" />
            </FadeIn>

            {/* Three steps — quest objectives */}
            <FadeIn delay={0.6}>
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {[
                  {
                    step: "STEP 01",
                    title: "Notice",
                    desc: "Pay attention to the ache. The Buddhists call it dukkha. McGilchrist calls it the left hemisphere's betrayal. Either way — that's not weakness. It's wisdom.",
                  },
                  {
                    step: "STEP 02",
                    title: "Name",
                    desc: "Give language to what you see. The Great Transfer. The Hollow Crown. Naming is the first act of resistance.",
                  },
                  {
                    step: "STEP 03",
                    title: "Take One Step",
                    desc: "Start the inner work. Find your people. Hold the bowl. As Lao Tzu said: 'A journey of a thousand miles begins beneath your feet.'",
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
