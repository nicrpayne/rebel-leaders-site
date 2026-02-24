/*
 * THE SHELF — /shelf
 * Recommended books, podcasts, and voices — organized by theme.
 * Uses the straight-on bookshelf pixel art as hero backdrop.
 */

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import { usePageTracker } from "@/hooks/usePageTracker";
import PixelDivider from "@/components/PixelDivider";
import DialogueBox from "@/components/DialogueBox";
import EasterEgg from "@/components/EasterEgg";

const BOOKSHELF_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/fHPXctuxSsjvwkhg.png";

interface BookEntry {
  title: string;
  author: string;
  why: string;
  startHere?: boolean;
}

interface CategorySection {
  id: string;
  tag: string;
  label: string;
  description: string;
  books: BookEntry[];
}

const categories: CategorySection[] = [
  {
    id: "start-here",
    tag: "START HERE",
    label: "The Essential Five",
    description: "If you're new to the rebellion, start with these. They'll break something open.",
    books: [
      {
        title: "The Master and His Emissary",
        author: "Iain McGilchrist",
        why: "The foundational text on the divided brain. If you read one book from this shelf, make it this one. It will change how you see everything.",
        startHere: true,
      },
      {
        title: "Falling Upward",
        author: "Richard Rohr",
        why: "The two halves of life. Why failure and suffering are not obstacles to growth but the very path itself.",
        startHere: true,
      },
      {
        title: "Man's Search for Meaning",
        author: "Viktor Frankl",
        why: "The book that proves meaning can survive anything. The foundation of logotherapy and the case for purpose over pleasure.",
        startHere: true,
      },
      {
        title: "The Myth of Normal",
        author: "Gabor Maté",
        why: "Why our culture makes us sick. The connection between trauma, disconnection, and the systems we've built.",
        startHere: true,
      },
      {
        title: "I and Thou",
        author: "Martin Buber",
        why: "The philosophy behind 'The Current' — what happens when one deep ocean meets another. Relationship as the fundamental unit of reality.",
        startHere: true,
      },
    ],
  },
  {
    id: "identity-formation",
    tag: "IDENTITY & FORMATION",
    label: "The Bowl — Who You Are Before What You Do",
    description: "The inner work. The container that holds everything else.",
    books: [
      {
        title: "Immortal Diamond",
        author: "Richard Rohr",
        why: "True Self vs. False Self. The inner work that every leader must do before they can hold space for others.",
      },
      {
        title: "Let Your Life Speak",
        author: "Parker J. Palmer",
        why: "Vocation as listening, not choosing. What happens when you stop performing and start paying attention.",
      },
      {
        title: "The Body Keeps the Score",
        author: "Bessel van der Kolk",
        why: "The trauma lens grounded in neuroscience. Your body remembers what your mind tries to forget.",
      },
      {
        title: "Waking the Tiger",
        author: "Peter Levine",
        why: "The somatic side of formation. Healing isn't just cognitive — it's held in the body.",
      },
      {
        title: "New Seeds of Contemplation",
        author: "Thomas Merton",
        why: "The monk who saw the modern crisis before anyone else. Solitude, identity, and the false self — from the inside.",
      },
      {
        title: "12 Rules for Life",
        author: "Jordan B. Peterson",
        why: "Say what you will — the chapter on telling the truth is worth the whole book. Order, chaos, and personal responsibility.",
      },
    ],
  },
  {
    id: "spiritual-formation",
    tag: "SPIRITUAL FORMATION & PHILOSOPHY",
    label: "The Water — The Deep Ocean Within",
    description: "Ancient wisdom from mystics, poets, and philosophers. The traditions that knew before we forgot.",
    books: [
      {
        title: "Tao Te Ching",
        author: "Lao Tzu",
        why: "81 verses. 5,000 words. More wisdom per sentence than most libraries. The original leadership manual.",
      },
      {
        title: "Love Poems From God",
        author: "Daniel Ladinsky",
        why: "Twelve sacred voices across centuries — Rumi, Hafiz, Meister Eckhart, St. Francis — all saying the same thing in different languages.",
      },
      {
        title: "Rumi",
        author: "Coleman Barks (translation)",
        why: "The wound is the place where the light enters you. Eight centuries old and still the truest thing anyone has said about growth.",
      },
      {
        title: "Letters from a Stoic",
        author: "Seneca",
        why: "Practical philosophy for people who have to lead in the real world. Written 2,000 years ago. Nothing has changed.",
      },
      {
        title: "The Way of Zen",
        author: "Alan Watts",
        why: "The Western bridge to Eastern thought. Watts makes the ineffable feel like common sense.",
      },
      {
        title: "The Universal Christ",
        author: "Richard Rohr",
        why: "Seeing the divine in everything. Not religion — recognition. This book will rewire how you see the world.",
      },
      {
        title: "The Divine Dance",
        author: "Richard Rohr (with Mike Morrell)",
        why: "The Trinity as a model for relationship, not hierarchy. The theological foundation for everything relational.",
      },
      {
        title: "The Wisdom Pattern",
        author: "Richard Rohr",
        why: "Order → Disorder → Reorder. The pattern behind every transformation. Once you see it, you see it everywhere.",
      },
      {
        title: "Walking on Water",
        author: "Madeleine L'Engle",
        why: "Art, faith, and the courage to create. A quiet rebellion against the tyranny of the useful.",
      },
      {
        title: "The Naked Gospel",
        author: "Andrew Farley",
        why: "Stripping religion back to its core. What's left when you remove the performance?",
      },
      {
        title: "Love Wins",
        author: "Rob Bell",
        why: "The book that got a pastor fired for asking the right questions. Courage in 200 pages.",
      },
      {
        title: "Everything Is Spiritual",
        author: "Rob Bell",
        why: "Physics, theology, and the argument that there is no secular. Everything is connected.",
      },
      {
        title: "Drops Like Stars",
        author: "Rob Bell",
        why: "Suffering as the raw material of creativity. Beautiful, short, and devastating.",
      },
      {
        title: "What We Talk About When We Talk About God",
        author: "Rob Bell",
        why: "Language, mystery, and why the old words don't work anymore — but the reality behind them still does.",
      },
      {
        title: "How (Not) to Speak of God",
        author: "Peter Rollins",
        why: "The most intellectually dangerous book on this shelf. Deconstruction as an act of faith.",
      },
      {
        title: "The Idolatry of God",
        author: "Peter Rollins",
        why: "What if the thing you're worshipping is the very thing keeping you from the divine? Rollins at his most provocative.",
      },
      {
        title: "God of the Possible",
        author: "Gregory A. Boyd",
        why: "Open theism — the idea that the future is genuinely open. A theological framework for agency and hope.",
      },
      {
        title: "The Hauerwas Reader",
        author: "Stanley Hauerwas",
        why: "The most cantankerous theologian alive. Ethics, community, and why character is formed in practice, not theory.",
      },
      {
        title: "The Universe Next Door",
        author: "James W. Sire",
        why: "A map of worldviews. Useful for understanding why people see the same reality so differently.",
      },
      {
        title: "Simplicity",
        author: "Richard Rohr",
        why: "The Franciscan path. Less as more. The quiet rebellion of enough.",
      },
      {
        title: "The Tears of Things",
        author: "Richard Rohr",
        why: "Grief as a teacher. The things we lose shape us more than the things we gain.",
      },
      {
        title: "What Do We Do with the Bible?",
        author: "Richard Rohr",
        why: "How to read sacred texts without weaponizing them. A guide for people who've been hurt by the book that was supposed to heal them.",
      },
    ],
  },
  {
    id: "systems-culture",
    tag: "SYSTEMS, CULTURE & EMERGENCE",
    label: "The Soil — Conditions That Shape Everything",
    description: "How systems work, why cultures form, and what happens when you tend conditions instead of managing people.",
    books: [
      {
        title: "Thinking in Systems",
        author: "Donella Meadows",
        why: "The primer on systems thinking. Once you learn to see leverage points, you can't unsee them.",
      },
      {
        title: "Leadership and the New Science",
        author: "Margaret Wheatley",
        why: "Quantum physics meets organizational theory. The case for self-organizing systems and letting go of control.",
      },
      {
        title: "The Fifth Discipline",
        author: "Peter Senge",
        why: "The learning organization. Systems thinking applied to teams. Still ahead of most companies.",
      },
      {
        title: "Reinventing Organizations",
        author: "Frederic Laloux",
        why: "What organizations look like when you stop treating humans as resources. The most hopeful business book ever written.",
      },
      {
        title: "Leadership Without Easy Answers",
        author: "Ronald Heifetz",
        why: "Adaptive leadership — the difference between technical problems and adaptive challenges. Most leaders only solve the first kind.",
      },
      {
        title: "Bowling Alone",
        author: "Robert Putnam",
        why: "The data behind The Great Transfer. How the collapse of social capital left us isolated and searching — and why all that need landed in the workplace.",
      },
      {
        title: "Spiral Dynamics",
        author: "Don Beck & Christopher Cowan",
        why: "A map of human consciousness development. Understanding where people are — and where they're going.",
      },
    ],
  },
  {
    id: "anti-industrial",
    tag: "ANTI-\"LEADERSHIP INDUSTRIAL COMPLEX\"",
    label: "The Rebellion — Against the Machine",
    description: "The thinkers who see through the performance. The ones who name what's broken.",
    books: [
      {
        title: "The Burnout Society",
        author: "Byung-Chul Han",
        why: "A 70-page demolition of the achievement society. Han argues we've become our own slave drivers. He's right.",
      },
      {
        title: "Seeing Like a State",
        author: "James C. Scott",
        why: "Why top-down systems fail. The case for local knowledge, practical wisdom, and the limits of legibility.",
      },
      {
        title: "Alchemy",
        author: "Rory Sutherland",
        why: "The argument that perception matters more than spreadsheets. Behavioral economics meets common sense. Funny, sharp, and subversive.",
      },
    ],
  },
  {
    id: "leadership-business",
    tag: "LEADERSHIP & BUSINESS",
    label: "The Bridge — Where the Rebellion Meets the Boardroom",
    description: "Some of these you'll outgrow. Some will surprise you. All of them shaped the journey.",
    books: [
      {
        title: "Servant Leadership",
        author: "Robert Greenleaf",
        why: "The original rebel text. Published in 1970, still more radical than anything the leadership industry has produced since.",
      },
      {
        title: "Resonant Leadership",
        author: "Richard Boyatzis & Annie McKee",
        why: "The neuroscience of why leaders burn out and how renewal, mindfulness, and hope are not soft skills but survival skills.",
      },
      {
        title: "Dare to Lead",
        author: "Brené Brown",
        why: "Vulnerability as strength. A credibility bridge for people who need permission to be human at work.",
      },
      {
        title: "The Infinite Game",
        author: "Simon Sinek",
        why: "The shift from winning to sustaining. Useful framing, even if it doesn't go deep enough.",
      },
      {
        title: "Good to Great",
        author: "Jim Collins",
        why: "Level 5 leadership — humility plus will. The research holds up better than most business books.",
      },
      {
        title: "Start With Why",
        author: "Simon Sinek",
        why: "The book that started a movement. We'd argue you need to start with Who before Why — but it opened the door.",
      },
      {
        title: "Switch",
        author: "Chip Heath & Dan Heath",
        why: "The elephant and the rider. Practical change management that actually understands human nature.",
      },
      {
        title: "Essentialism",
        author: "Greg McKeown",
        why: "The disciplined pursuit of less. A quiet rebellion against the cult of busy.",
      },
      {
        title: "It Doesn't Have to Be Crazy at Work",
        author: "Jason Fried & David Heinemeier Hansson",
        why: "The anti-hustle manifesto. Proof that calm companies can outperform frantic ones.",
      },
      {
        title: "Blitzscaling",
        author: "Reid Hoffman & Chris Yeh",
        why: "Know thy enemy. Understanding the growth-at-all-costs mindset helps you see what you're rebelling against.",
      },
      {
        title: "Conscious Leadership",
        author: "Various",
        why: "The attempt to bring awareness into the boardroom. A step in the right direction.",
      },
      {
        title: "Tribes",
        author: "Seth Godin",
        why: "Permission to lead without a title. Godin at his most concise and compelling.",
      },
      {
        title: "The Practice",
        author: "Seth Godin",
        why: "Shipping creative work. The discipline of showing up and making things for people who care.",
      },
    ],
  },
  {
    id: "story",
    tag: "STORY & NARRATIVE",
    label: "The Lore — Because the Deepest Truths Are Told in Story",
    description: "Not leadership books. Something better.",
    books: [
      {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        why: "A story about ordinary people carrying impossible burdens with courage and friendship. The original rebel narrative.",
      },
      {
        title: "The Silmarillion",
        author: "J.R.R. Tolkien",
        why: "The creation myth behind Middle-earth. A reminder that the deepest truths are always told in story, never in bullet points.",
      },
      {
        title: "A Promised Land",
        author: "Barack Obama",
        why: "Leadership in real time. The weight of decisions, the loneliness of the office, and the stubborn persistence of hope.",
      },
    ],
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
  usePageTracker("shelf");
  const [activeCategory, setActiveCategory] = useState<string>("start-here");

  const activeSection = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 opacity-50">
          <img src={BOOKSHELF_IMG} alt="" className="w-full h-full object-cover pixel-render" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />

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
              These are not &ldquo;recommended reading.&rdquo; These are the texts that broke something open.
              The ones that gave language to what I was already feeling. Start anywhere — or start
              with the five that changed everything.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="mt-4 flex justify-center">
              <EasterEgg
                id="egg-shelf-book"
                mode="click"
                quote="A reader lives a thousand lives before he dies. The man who never reads lives only one."
                attribution="George R.R. Martin"
              >
                <span className="font-pixel text-[8px] text-gold/20 hover:text-gold/40 transition-colors cursor-pointer select-none tracking-widest">
                  📖 ???
                </span>
              </EasterEgg>
            </div>
          </FadeIn>
        </div>
      </section>

      <PixelDivider />

      {/* Category Navigation */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Category tabs */}
            <FadeIn>
              <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`font-pixel text-[7px] md:text-[8px] tracking-wider px-3 py-2 border transition-all duration-200 ${
                      activeCategory === cat.id
                        ? "border-gold/60 bg-gold/10 text-gold"
                        : "border-gold/15 text-parchment-dim/50 hover:border-gold/30 hover:text-parchment-dim/70"
                    }`}
                  >
                    {cat.tag}
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Active category header */}
            <FadeIn key={activeSection.id}>
              <div className="mb-8">
                <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-3">
                  {activeSection.tag}
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-parchment mb-3">
                  {activeSection.label}
                </h2>
                <p className="font-display text-base text-parchment-dim/60">
                  {activeSection.description}
                </p>
              </div>
            </FadeIn>

            {/* Books in active category */}
            <div className="space-y-4">
              {activeSection.books.map((book, i) => (
                <FadeIn key={`${activeSection.id}-${i}`} delay={i * 0.04}>
                  <div className={`quest-card p-5 md:p-6 ${book.startHere ? "border-gold/30" : ""}`}>
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 w-10 h-10 flex items-center justify-center border ${
                        book.startHere ? "border-gold/40 bg-gold/10" : "border-gold/20 bg-gold/5"
                      }`}>
                        <span className="font-pixel text-[7px] text-gold/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            {book.startHere && (
                              <span className="font-pixel text-[6px] text-gold/70 tracking-wider">★ START HERE</span>
                            )}
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

      <PixelDivider />

      {/* Voices / Substackers — placeholder */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50 mb-4">
                INVENTORY: VOICES
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-parchment mb-4">
                Writers, Thinkers & Fellow Rebels
              </h2>
              <p className="font-display text-base text-parchment-dim/60 mb-8">
                Substackers, bloggers, and independent voices doing the real work.
                The people writing things that matter in places that matter.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <DialogueBox speaker="COMING SOON">
                <p className="text-parchment-dim/70">
                  This section is being curated. If you're a writer doing work that challenges
                  the leadership industrial complex — work rooted in formation, not performance —
                  we'd love to feature you here.
                </p>
              </DialogueBox>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
