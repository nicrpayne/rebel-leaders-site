import FadeIn from "@/components/FadeIn";

interface Panel {
  num: string;
  label: string;
  heading: string;
  body: string;
  antiDef?: { label: string; text: string };
  callout?: string;
  link?: { text: string; href: string; external?: boolean };
}

const PANELS: Panel[] = [
  {
    num: "01",
    label: "THE DISTURBANCE",
    heading: "Something is shaping you.",
    body: "Most people think work is where they perform. They miss that it is also where they are being formed. Every system shapes the people inside it — not through its mission statement, but through what it rewards, what it punishes, and what it silently normalizes. You are being shaped right now, whether you are paying attention or not.",
    antiDef: {
      label: "THE OLD STORY",
      text: "Leadership is about influencing behavior. Get the right people, teach them the right skills, and the organization follows.",
    },
  },
  {
    num: "02",
    label: "THE FIELD",
    heading: "There is a gravity here.",
    body: "Every team lives inside a field. Not a metaphor — a real structural force that either pulls people into orbit or lets them drift. We call it Culture. But not the way the industry uses that word. Culture is not a program you install. It is not your values poster. It is not morale. Culture is the gravity generated when three deeper things gain mass. You cannot build it directly any more than you can build gravity directly.",
    callout: "Three realities build mass: Identity, Relationship, Vision. One reality expresses their pull: Culture.",
    link: {
      text: "Read more about culture as gravity →",
      href: "https://leaderrebellion.substack.com/p/you-have-a-culture-problem",
      external: true,
    },
  },
  {
    num: "03",
    label: "THE INSTRUMENT",
    heading: "Fields can be read.",
    body: "Gravitas is your first instrument. It reads the gravitational state of your field across the three mass-builders and the field they produce. It surfaces what is carrying the system — and what is leaking. A Leak is the dimension where the field is losing energy. Not broken — constrained. A Force is what is holding orbit even while something else bleeds. The instrument does not judge. It reveals.",
    antiDef: {
      label: "NOT A QUIZ",
      text: "Answer for where things actually are — not where you wish they were. The signal is only as honest as the person holding the instrument.",
    },
    link: {
      text: "Run your first scan →",
      href: "/workbench/gravitas",
    },
  },
  {
    num: "04",
    label: "THE ROOTS",
    heading: "What is visible has roots.",
    body: "Some problems live in the canopy — in what you can see and measure. But the canopy grows from what is underground. Beneath the field there is a root system: five channels through which formation enters or damages a person and a system. Spiritual. Emotional. Leading. Technical. Physical. Apple trees don't strive to produce apples. Apples are the overflow of what the tree is. If you want different fruit, tend the roots. The moves in this archive intervene at the root, not at the fruit.",
    antiDef: {
      label: "THE ORBITAL LAW",
      text: "Mass creates gravity. Gravity reshapes mass. What is formed inwardly generates a field outwardly. What is generated outwardly feeds back inwardly and forms people in return.",
    },
  },
  {
    num: "05",
    label: "THE STEWARDSHIP TURN",
    heading: "You are not here to be the hero.",
    body: "Leadership — in this world — is not a title or a trait. It is a quality of attention. The bowl that holds. The water that moves. The current that flows between people who are genuinely meeting each other. Your job is not to fix the culture. Your job is to tend the conditions. Create the environment where Identity can form, where Relationship can become real, where Vision can emerge from the depth of genuine connection. Trust the gravity to follow.",
    link: {
      text: "Watch: Bowl, Water, Current →",
      href: "https://www.youtube.com/channel/UCQvL3b2AbMM_K38lY3FHdLg",
      external: true,
    },
  },
];

export default function FieldBriefing() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto">

          {/* Section header */}
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gold/20" />
              <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/40 shrink-0">FIELD BRIEFING</p>
              <div className="h-px flex-1 bg-gold/20" />
            </div>
          </FadeIn>

          <div className="space-y-14">
            {PANELS.map((panel, i) => (
              <FadeIn key={panel.num} delay={i * 0.08}>
                <div className="quest-card p-6 md:p-8">

                  {/* Panel number + label */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-pixel text-[9px] text-gold/60 border border-gold/30 px-3 py-1 shrink-0">
                      {panel.num}
                    </span>
                    <p className="font-pixel text-[8px] tracking-[0.3em] text-gold/50">
                      {panel.label}
                    </p>
                  </div>

                  {/* Heading */}
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-parchment mb-4 leading-snug">
                    {panel.heading}
                  </h2>

                  {/* Body */}
                  <p className="font-display text-base md:text-lg text-parchment-dim/80 leading-relaxed mb-5">
                    {panel.body}
                  </p>

                  {/* Callout block (amber-bordered highlight) */}
                  {panel.callout && (
                    <div
                      className="my-5 pl-4 py-3 pr-4 font-display text-base md:text-lg italic text-gold/80 leading-relaxed"
                      style={{ borderLeft: "2px solid oklch(0.76 0.13 80 / 0.5)", background: "oklch(0.76 0.13 80 / 0.04)" }}
                    >
                      {panel.callout}
                    </div>
                  )}

                  {/* Anti-definition block */}
                  {panel.antiDef && (
                    <div
                      className="my-5 pl-4 py-3 pr-4"
                      style={{ borderLeft: "2px solid oklch(0.76 0.13 80 / 0.2)" }}
                    >
                      <p className="font-pixel text-[8px] tracking-[0.25em] text-gold/30 mb-2">
                        {panel.antiDef.label}
                      </p>
                      <p className="font-display text-sm md:text-base italic text-parchment-dim/40 leading-relaxed">
                        {panel.antiDef.text}
                      </p>
                    </div>
                  )}

                  {/* Link */}
                  {panel.link && (
                    <a
                      href={panel.link.href}
                      {...(panel.link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-block font-display text-sm text-gold/60 hover:text-gold transition-colors mt-2"
                    >
                      {panel.link.text}
                    </a>
                  )}

                </div>
              </FadeIn>
            ))}
          </div>

          {/* Completion footer */}
          <FadeIn delay={0.5}>
            <div className="mt-14 text-center space-y-3">
              <p className="font-pixel text-[8px] tracking-[0.35em] text-gold/30">
                FIELD BRIEFING COMPLETE
              </p>
              <p className="font-display text-base italic text-parchment-dim/40">
                Do not master the system first. Run the scan.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
