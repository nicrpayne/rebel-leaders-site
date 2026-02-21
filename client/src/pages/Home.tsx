/*
 * DESIGN: "The Scriptorium" — Medieval Manuscript Meets Digital Monastery
 * Dark warm palette, stained glass accents, Cormorant Garamond display,
 * Source Serif 4 body, Outfit UI. Asymmetric manuscript layout.
 * Content unfolds like turning pages. Slow, reverent animations.
 */

import { motion } from "framer-motion";
import { ArrowDown, BookOpen, Flame, Users, Pen, Mail } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import StainedGlassDivider from "@/components/StainedGlassDivider";
import Footer from "@/components/Footer";

/* ─── Image URLs ─── */
const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-1_1771637264000_na1fn_aGVyby1zdGFpbmVkLWdsYXNz.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTFfMTc3MTYzNzI2NDAwMF9uYTFmbl9hR1Z5YnkxemRHRnBibVZrTFdkc1lYTnoucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TN4KnZvqfQEgxrEO7eCZsCGziPeiWSlF25RE~UmmhsxG4DlIOk0GWjFKy1wptamS7wL5rB~bJf76YPhlqvaiBSBuknjw9VQntUI73X8qC424g8iQJpI-r~LFz0k31l6JJ6Osz9uqzBZkOVjz-WjeK2QrHPLMtXWGyKIol~lTJk70KUW07kO99urHwyqd-VjbaUi0zgUYh3tDgXFSUETPiKNVZSiaz65M7rUhK7wb-6bDHFXR4IsJ1UI3AUzCtOAhAPykB1wWgNUSvFOi~gd6HyZLabqpMZWq66DWlWlmxSaNDGkEXCJ-jKLP~uHvh2wWLi7fjXSzQNDA-hLHJilhnQ__";

const EMBER_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-2_1771637252000_na1fn_c2VjdGlvbi1lbWJlci10ZXh0dXJl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTJfMTc3MTYzNzI1MjAwMF9uYTFmbl9jMlZqZEdsdmJpMWxiV0psY2kxMFpYaDBkWEpsLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=M4WZy1Lubw4lUZg-xkYa~3KnlMQoGJlZcqOujMhLv-HZHaL3oWFqAgMHgwZFQS~uvVL-uAX4opiGGBzwFXqZlaKDMyYmbKfbzwZy9X4UiX-LIZy~ymHGGhW8mAFRQk1zNs-ROgt8ftpo~5yP~DVqQFXqN3tM7pjR6ZKorjnOj61QGAhF-El0hjRIRFC30KZW1f7X7TQPADPpcb5PtstkU4yxTflVp1wZci9ho0t5UQL90u~yfcpxBV-6H9wJaYbxrs2YRRgAiCQ7bCEZVJ6e~4SE7Zl5Tx2J5q6pjLM4H62p~4CEX8T-47eqdNCVuNUsleO8w~IpN-axBxa09K12YQ__";

const LANDSCAPE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-3_1771637262000_na1fn_YWJvdXQtcG9ydHJhaXQtYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTNfMTc3MTYzNzI2MjAwMF9uYTFmbl9ZV0p2ZFhRdGNHOXlkSEpoYVhRdFltYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pob9I06EkGaMNTBuivge-pozIIpQjbETKJQoF1O5lSWtaCRcace3ZxR3VAy0Fm7Pl6Pbso7zbgFplQqN5eWj6qhQZl58nYqG6eB1T7pwbsJZAzKymIXxp-MDOnYWFhama5tT0wTIutYWEnN92LkdG6eAWI1s9HqilY62yXR81l~0mhcwQguv6~BkCJy0pUcCcP2U~SpdlePmLcNjABsP73ruChXRQ-AV7aVf-vHeMa4MGZ9CXo5iAeIjbb7hyMz~nTh9mLZsMr-S0WOz1x1Y5FSTal9sW65wwWUkn5CNIF2tOxOUnL5BWnU6Pqvs3C7tYYWfnuMD86JDTKXussl5NQ__";

const MANIFESTO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/xhIF6cqEZNRR3ezVrvcq6V/sandbox/cLlPwzBL30WhHHj2soLbdt-img-5_1771637258000_na1fn_bWFuaWZlc3RvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveGhJRjZjcUVaTlJSM2V6VnJ2Y3E2Vi9zYW5kYm94L2NMbFB3ekJMMzBXaEhIajJzb0xiZHQtaW1nLTVfMTc3MTYzNzI1ODAwMF9uYTFmbl9iV0Z1YVdabGMzUnZMV0puLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Z-AIBawOGkcL2-g74xwtQGfhUliCSt8D6kSUG8bk13CkjMQPwK4iynaFZ2CRZXekFOMoUamr1y4Ljbp5EK7elGtsZoNvWG7p-v3QQZ0KcYQb-D2oMDlPUrODZxmdwoyj5jHThV0WYnq~Oj0i~p-1BRz~pF43WOgQDCFbQF1m-PRqgNt9q8WnIxlNonLXHQ1ptAxhIRNqJD9u-7rAihutCP8RO6ixIoQEPAkqYgN76ihmRYvAEzaG~4A3CHyNWC96e470s3ZVnNTwUTvxeinuyQ8eC9pDjZRQfywdXrnVoWL2hdjoK3mARdJED7eQmmlztY4y9lTUlgHd8x7Cqwl~2A__";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — The Rose Window
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
          >
            <p className="font-ui text-xs md:text-sm tracking-[0.3em] uppercase text-gold mb-6 md:mb-8">
              A Quiet Rebellion
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-parchment mb-6 md:mb-8 max-w-5xl mx-auto"
          >
            The system wasn't built
            <br />
            <span className="italic font-normal text-gold">for humans.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="font-body text-lg md:text-xl text-parchment-dim max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            But you were built for more than surviving it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex justify-center"
          >
            <button
              onClick={() => document.querySelector("#diagnosis")?.scrollIntoView({ behavior: "smooth" })}
              className="text-parchment-dim hover:text-gold transition-colors duration-500"
              aria-label="Scroll down"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={24} strokeWidth={1} />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: THE DIAGNOSIS — What We See
      ═══════════════════════════════════════════════════════════ */}
      <section id="diagnosis" className="relative py-24 md:py-36">
        <div className="container">
          <div className="max-w-3xl mx-auto md:ml-[10%] lg:ml-[15%]">
            <FadeIn>
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
                The Diagnosis
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-8 leading-tight">
                Something is deeply wrong<br />
                <span className="italic font-normal text-parchment-dim">and everyone can feel it.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-6 text-parchment-dim/90 text-base md:text-lg leading-relaxed">
                <p className="drop-cap">
                  The institutions that once formed us — families, churches, civic organizations, neighborhoods — have
                  hollowed out. What remains is a $366 billion leadership industry selling competency models to a world
                  dying of loneliness. We call this <em className="text-gold/80">The Great Transfer</em>: the impossible
                  burden placed on the transactional workplace to do what formative communities once did.
                </p>
                <p>
                  The result is what we name <em className="text-gold/80">Vulture Culture</em> — organizations that
                  extract human energy without replenishing the soul. Leaders wearing the <em className="text-gold/80">Hollow Crown</em>,
                  performing authority while hemorrhaging meaning. A machine that optimizes for everything except the
                  one thing that matters: human flourishing.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <StainedGlassDivider variant="full" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: THE BELIEF — What We Stand For
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-20">
          <img src={MANIFESTO_BG} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-background/80" />

        <div className="relative z-10 container">
          <div className="max-w-3xl mx-auto md:mr-[10%] lg:mr-[15%] md:ml-auto">
            <FadeIn>
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
                The Belief
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-10 leading-tight">
                We believe the rebellion<br />
                <span className="italic font-normal text-parchment-dim">is one of remembering.</span>
              </h2>
            </FadeIn>

            <div className="space-y-8">
              <FadeIn delay={0.3}>
                <blockquote className="border-l-2 border-gold/40 pl-6 py-2">
                  <p className="font-display text-xl md:text-2xl italic text-parchment leading-relaxed">
                    "Human flourishing is the point. Not profit. Not productivity. Not performance metrics.
                    The point is that people become more fully alive."
                  </p>
                </blockquote>
              </FadeIn>

              <FadeIn delay={0.45}>
                <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed">
                  We believe that every human being carries an irreducible dignity that no system can grant or revoke.
                  That leadership is not a position but a posture — the posture of one who has done their own inner work
                  and now creates conditions for others to grow. That the crisis under every crisis is not economic or
                  political but <em className="text-gold/80">existential</em>: a disconnection from self, from others,
                  and from purpose.
                </p>
              </FadeIn>

              <FadeIn delay={0.55}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                  {[
                    { text: "Humanity is not a liability.", icon: Flame },
                    { text: "Character cannot be outsourced.", icon: BookOpen },
                    { text: "Hope is an act of rebellion.", icon: Users },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="border border-gold/15 bg-stone/30 p-6 text-center group hover:border-gold/30 transition-colors duration-500"
                    >
                      <item.icon
                        size={20}
                        className="mx-auto mb-3 text-gold/50 group-hover:text-gold/80 transition-colors duration-500"
                        strokeWidth={1.2}
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
        </div>
      </section>

      <StainedGlassDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: THE WORK — What We're Building
      ═══════════════════════════════════════════════════════════ */}
      <section id="the-work" className="relative py-24 md:py-36">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
                The Work
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-6 leading-tight">
                The Rebel OS
              </h2>
              <p className="font-display text-xl md:text-2xl italic text-parchment-dim mb-10">
                An operating system for the soul of an organization.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed mb-10">
                Built on the philosophy of <strong className="text-parchment font-medium">Holistic Shaping</strong>,
                the Rebel OS is our framework for transforming organizations from extraction machines into formation
                communities. It doesn't add another layer of training. It rewires the operating system — from the
                leader's inner life outward to the culture they steward.
              </p>
            </FadeIn>

            {/* The Flywheel */}
            <FadeIn delay={0.4}>
              <div className="relative border border-gold/15 bg-[oklch(0.12_0.008_60)] p-8 md:p-12 mb-12">
                <p className="font-ui text-xs tracking-[0.3em] uppercase text-gold/50 mb-8 text-center">
                  The Flywheel
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Identity",
                      subtitle: "Know who you are",
                      desc: "The inner work of self-awareness through Maps, Mirrors, and Moves. Enneagram, Spiral Dynamics, and the True Self.",
                    },
                    {
                      title: "Relationship",
                      subtitle: "Connect with depth",
                      desc: "From transactional to covenantal. Building trust, vulnerability, and the bonding agent of authentic community.",
                    },
                    {
                      title: "Vision",
                      subtitle: "See what could be",
                      desc: "Not strategic planning but prophetic imagination. The ability to name reality and call forth possibility.",
                    },
                    {
                      title: "Culture",
                      subtitle: "Steward the conditions",
                      desc: "The Bowl and the Flow. Leaders don't fill cups — they hold the bowl. Culture is the soil, not the crop.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-display text-2xl md:text-3xl font-semibold text-gold">
                          {item.title}
                        </span>
                      </div>
                      <p className="font-display text-sm italic text-parchment-dim mb-2">
                        {item.subtitle}
                      </p>
                      <p className="text-parchment-dim/70 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Connecting arrows (CSS) */}
                <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                  <div className="w-full h-full border border-gold/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gold/40 rounded-full" />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Maps, Mirrors, Moves */}
            <FadeIn delay={0.5}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Maps",
                    desc: "Frameworks that show you where you are: Enneagram, Spiral Dynamics, the Divided Brain. Not to label, but to liberate.",
                    icon: BookOpen,
                  },
                  {
                    title: "Mirrors",
                    desc: "Honest reflection from trusted others. The courage to see your False Self patterns and choose the True Self instead.",
                    icon: Users,
                  },
                  {
                    title: "Moves",
                    desc: "Practical disciplines and daily practices. Small acts of rebellion against the machine. The work of becoming.",
                    icon: Flame,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border border-gold/10 bg-[oklch(0.12_0.008_60)] p-6 md:p-8 hover:border-gold/25 transition-all duration-500 group"
                  >
                    <item.icon
                      size={20}
                      className="text-gold/40 mb-4 group-hover:text-gold/70 transition-colors duration-500"
                      strokeWidth={1.2}
                    />
                    <h3 className="font-display text-xl font-semibold text-parchment mb-3">
                      {item.title}
                    </h3>
                    <p className="text-parchment-dim/70 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <StainedGlassDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: WRITING — Featured Content
      ═══════════════════════════════════════════════════════════ */}
      <section id="writing" className="relative py-24 md:py-36">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
                Writing
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-12 leading-tight">
                Ideas worth sitting with.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "The Great Transfer",
                  subtitle: "Why the workplace can't save us — and what can",
                  tag: "Essay",
                },
                {
                  title: "The Hollow Crown",
                  subtitle: "On the loneliness of leading without a soul",
                  tag: "Essay",
                },
                {
                  title: "Maps, Mirrors, and Moves",
                  subtitle: "A practical guide to the inner work of leadership",
                  tag: "Framework",
                },
                {
                  title: "The Bowl and the Flow",
                  subtitle: "Why culture is a container, not a program",
                  tag: "Metaphor",
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={0.2 + i * 0.1}>
                  <button
                    onClick={() => toast("Coming soon", { description: "This essay is being prepared for publication." })}
                    className="w-full text-left border border-gold/10 bg-[oklch(0.12_0.008_60)] p-6 md:p-8 hover:border-gold/25 transition-all duration-500 group"
                  >
                    <span className="font-ui text-[10px] tracking-[0.2em] uppercase text-gold/40 mb-3 block">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-parchment mb-2 group-hover:text-gold transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-parchment-dim/60 text-sm leading-relaxed">
                      {item.subtitle}
                    </p>
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: ABOUT — The Story
      ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="relative py-24 md:py-36 overflow-hidden">
        {/* Background landscape */}
        <div className="absolute inset-0">
          <img
            src={LANDSCAPE_IMG}
            alt=""
            className="w-full h-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        </div>

        <div className="relative z-10 container">
          <div className="max-w-3xl mx-auto md:ml-[5%]">
            <FadeIn>
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
                About
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-8 leading-tight">
                Trained where leadership<br />
                <span className="italic font-normal text-parchment-dim">had to work without leverage.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-6 text-parchment-dim/90 text-base md:text-lg leading-relaxed">
                <p className="drop-cap">
                  Nic spent years in environments where you couldn't fire anyone, couldn't offer a raise, and couldn't
                  promise a promotion. The only currency was trust. The only authority was character. In those crucibles —
                  military service, ministry, frontline leadership — he learned that the conventional leadership playbook
                  was not just insufficient. It was upside down.
                </p>
                <p>
                  What emerged was a conviction: that the deepest crisis in organizations is not a skills gap but a
                  <em className="text-gold/80"> soul gap</em>. That we don't need better managers — we need transformed
                  teachers. People who have done their own inner work and can now hold space for others to do theirs.
                </p>
                <p>
                  Rebel Leaders is the expression of that conviction. It's not a consulting firm. It's not a training
                  company. It's a movement to reclaim leadership as a human art — and to build the infrastructure that
                  makes character formation scalable without making it shallow.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <StainedGlassDivider variant="full" />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: THE VISION — The Cosmic "So That"
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36">
        <div className="absolute inset-0 opacity-15">
          <img src={EMBER_IMG} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-background/85" />

        <div className="relative z-10 container">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
                The Vision
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-parchment mb-10 leading-tight">
                Millions of organizations,<br />
                <span className="italic font-normal text-gold">
                  repurposed as a distributed<br />
                  formation network.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
                Producing leaders of character equipped to live with hope and courage in the modern world.
                Not better managers. Not more efficient systems. <strong className="text-parchment font-medium">Whole
                humans</strong> — formed in community, tested by reality, and sent back into the world as agents of
                repair.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <blockquote className="max-w-xl mx-auto">
                <p className="font-display text-xl md:text-2xl italic text-gold/80 leading-relaxed">
                  "It's not my job to fill your cup,<br />
                  but it is to empty mine."
                </p>
              </blockquote>
            </FadeIn>
          </div>
        </div>
      </section>

      <StainedGlassDivider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: JOIN THE REBELLION
      ═══════════════════════════════════════════════════════════ */}
      <section id="join" className="relative py-24 md:py-36">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-ui text-xs tracking-[0.3em] uppercase text-gold/70 mb-6">
                Join the Rebellion
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-parchment mb-6 leading-tight">
                You're not crazy.<br />
                <span className="italic font-normal text-parchment-dim">You're not alone.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-parchment-dim/90 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                There's a language for what you feel. A community of people who refuse to accept that this is all there
                is. Join us and receive essays, frameworks, and invitations to go deeper.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 bg-[oklch(0.14_0.008_60)] border border-gold/15 px-5 py-3.5 text-parchment placeholder:text-parchment-dim/40 font-ui text-sm focus:outline-none focus:border-gold/40 transition-colors duration-300"
                  />
                  <button
                    onClick={() => toast("Welcome to the rebellion", { description: "Newsletter signup coming soon." })}
                    className="bg-gold/15 border border-gold/30 px-6 py-3.5 font-ui text-sm tracking-wider uppercase text-gold hover:bg-gold/25 hover:border-gold/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail size={14} strokeWidth={1.5} />
                    Join
                  </button>
                </div>
                <p className="font-ui text-[10px] text-parchment-dim/30 mt-3 tracking-wider">
                  No spam. No hustle. Just ideas worth sitting with.
                </p>
              </div>
            </FadeIn>

            {/* Three invitations */}
            <FadeIn delay={0.6}>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                {[
                  {
                    step: "01",
                    title: "Notice",
                    desc: "Pay attention to the ache. The sense that something is missing. That's not weakness — it's wisdom.",
                  },
                  {
                    step: "02",
                    title: "Name",
                    desc: "Give language to what you see. The Great Transfer. The Hollow Crown. Vulture Culture. Naming is the first act of resistance.",
                  },
                  {
                    step: "03",
                    title: "Take One Step",
                    desc: "Start the inner work. Find your people. Hold the bowl. You don't have to save the world. Just steward your corner of it.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-t border-gold/15 pt-6">
                    <span className="font-ui text-xs text-gold/40 tracking-wider">{item.step}</span>
                    <h3 className="font-display text-xl font-semibold text-parchment mt-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-parchment-dim/60 text-sm leading-relaxed">
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
