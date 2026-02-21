/*
 * ComingSoon — reusable "coming soon" page for unreleased features.
 * Each page gets its own pixel art background, chapter title, and teaser text.
 */

import { motion } from "framer-motion";
import PageLayout from "./PageLayout";
import FadeIn from "./FadeIn";
import RebelLogo from "./RebelLogo";
import DialogueBox from "./DialogueBox";

interface ComingSoonProps {
  chapter: string;
  title: string;
  subtitle: string;
  description: string;
  teaser?: string;
  bgImage?: string;
  icon?: string;
}

export default function ComingSoon({
  chapter,
  title,
  subtitle,
  description,
  teaser,
  bgImage,
  icon,
}: ComingSoonProps) {
  return (
    <PageLayout>
      <section className="relative min-h-[80vh] flex items-center justify-center py-20 md:py-32">
        {bgImage && (
          <>
            <div className="absolute inset-0 opacity-20">
              <img src={bgImage} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          </>
        )}

        <div className="relative z-10 container">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <RebelLogo size={40} className="mx-auto text-gold/40 mb-6" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">
                {chapter}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              {icon && <span className="text-4xl mb-4 block">{icon}</span>}
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-parchment mb-3 leading-tight">
                {title}
              </h1>
              <p className="font-display text-xl md:text-2xl italic text-parchment-dim mb-8">
                {subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="text-parchment-dim/80 text-base md:text-lg leading-relaxed font-display mb-10 max-w-xl mx-auto">
                {description}
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <DialogueBox speaker="SYSTEM" className="max-w-md mx-auto">
                <div className="text-center">
                  <motion.p
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-pixel text-[10px] text-gold tracking-wider"
                  >
                    QUEST LOCKED
                  </motion.p>
                  <p className="font-display text-sm text-parchment-dim/60 mt-2">
                    {teaser || "This area is still being forged. Check back soon."}
                  </p>
                </div>
              </DialogueBox>
            </FadeIn>

            <FadeIn delay={0.65}>
              <a
                href="/"
                className="inline-block mt-10 font-pixel text-[8px] text-parchment-dim/50 hover:text-gold transition-colors tracking-wider"
              >
                {"<"} RETURN TO THE STUDY
              </a>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
