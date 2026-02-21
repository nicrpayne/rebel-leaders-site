/*
 * THE SHELF — /shelf
 * Recommended books & podcasts, organized by theme.
 * Uses the straight-on bookshelf pixel art as hero backdrop.
 */

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import PixelDivider from "@/components/PixelDivider";

const BOOKSHELF_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/yIOHdhgRJwHhvBLy.png";

interface BookEntry {
  title: string;
  author: string;
  why: string;
  tag: string;
}

const books: BookEntry[] = [
  {
    title: "The Master and His Emissary",
    author: "Iain McGilchrist",
    why: "The foundational text on the divided brain. If you read one book from this shelf, make it this one. It will change how you see everything.",
    tag: "THE BRAIN",
  },
  {
    title: "The Matter with Things",
    author: "Iain McGilchrist",
    why: "McGilchrist's magnum opus. A 1,500-page argument that the way we attend to the world changes the world we find.",
    tag: "THE BRAIN",
  },
  {
    title: "Falling Upward",
    author: "Richard Rohr",
    why: "The two halves of life. Why failure and suffering are not obstacles to growth but the very path itself.",
    tag: "THE SOUL",
  },
  {
    title: "Immortal Diamond",
    author: "Richard Rohr",
    why: "True Self vs. False Self. The inner work that every leader must do before they can hold space for others.",
    tag: "THE SOUL",
  },
  {
    title: "Servant Leadership",
    author: "Robert Greenleaf",
    why: "The original rebel text. Published in 1970, still more radical than anything the leadership industry has produced since.",
    tag: "LEADERSHIP",
  },
  {
    title: "Resonant Leadership",
    author: "Richard Boyatzis & Annie McKee",
    why: "The neuroscience of why leaders burn out and how renewal, mindfulness, and hope are not soft skills but survival skills.",
    tag: "LEADERSHIP",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    why: "The book that proves meaning can survive anything. The foundation of logotherapy and the case for purpose over pleasure.",
    tag: "MEANING",
  },
  {
    title: "The Myth of Normal",
    author: "Gabor Maté",
    why: "Why our culture makes us sick. The connection between trauma, disconnection, and the systems we've built.",
    tag: "FORMATION",
  },
  {
    title: "Bowling Alone",
    author: "Robert Putnam",
    why: "The data behind The Great Transfer. How the collapse of social capital left us isolated and searching.",
    tag: "SOCIETY",
  },
  {
    title: "Spiral Dynamics",
    author: "Don Beck & Christopher Cowan",
    why: "A map of human consciousness development. Understanding where people are — and where they're going.",
    tag: "MAPS",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    why: "Not a leadership book. Something better. A story about ordinary people carrying impossible burdens with courage and friendship. The original rebel narrative.",
    tag: "STORY",
  },
  {
    title: "The Silmarillion",
    author: "J.R.R. Tolkien",
    why: "The creation myth behind Middle-earth. A reminder that the deepest truths are always told in story, never in bullet points.",
    tag: "STORY",
  },
];

const podcasts = [
  {
    title: "The After Party",
    host: "Various",
    why: "Conversations about faith, deconstruction, and what comes after the old certainties fall apart.",
    tag: "FAITH",
  },
  {
    title: "On Being",
    host: "Krista Tippett",
    why: "The gold standard for conversations about meaning, spirituality, and what it means to be human.",
    tag: "MEANING",
  },
  {
    title: "The Knowledge Project",
    host: "Shane Parrish",
    why: "Mental models, decision-making, and wisdom from people who think deeply about how to live well.",
    tag: "WISDOM",
  },
];

export default function Shelf() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 opacity-25">
          <img src={BOOKSHELF_IMG} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/75 to-background" />

        <div className="relative z-10 container text-center">
          <FadeIn>
            <p className="font-pixel text-[9px] tracking-[0.3em] text-gold/60 mb-4">THE SHELF</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-parchment mb-4 leading-tight">
              The books that
              <br />
              <span className="italic font-normal text-parchment-dim">shaped the rebellion.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-display text-lg text-parchment-dim/70 max-w-xl mx-auto">
              These are not "recommended reading." These are the texts that broke something open.
              The ones that gave language to what I was already feeling. Start anywhere.
            </p>
          </FadeIn>
        </div>
      </section>

      <PixelDivider />

      {/* Books */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8">
                INVENTORY: BOOKS
              </p>
            </FadeIn>

            <div className="space-y-4">
              {books.map((book, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="quest-card p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-gold/20 bg-gold/5">
                        <span className="font-pixel text-[7px] text-gold/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-pixel text-[6px] text-gold/40 tracking-wider">{book.tag}</span>
                            <h3 className="font-display text-lg md:text-xl font-semibold text-parchment mt-1">
                              {book.title}
                            </h3>
                            <p className="font-display text-sm text-gold/60 italic">{book.author}</p>
                          </div>
                        </div>
                        <p className="text-parchment-dim/60 text-sm font-display leading-relaxed mt-3">
                          {book.why}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* Podcasts */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-8">
                INVENTORY: PODCASTS
              </p>
            </FadeIn>

            <div className="space-y-4">
              {podcasts.map((pod, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="quest-card p-5 md:p-6">
                    <span className="font-pixel text-[6px] text-gold/40 tracking-wider">{pod.tag}</span>
                    <h3 className="font-display text-lg font-semibold text-parchment mt-1">
                      {pod.title}
                    </h3>
                    <p className="font-display text-sm text-gold/60 italic">{pod.host}</p>
                    <p className="text-parchment-dim/60 text-sm font-display leading-relaxed mt-3">
                      {pod.why}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
