import FieldToolChooser from "@/components/field-tools/FieldToolChooser";
import { Link } from "wouter";
import FieldToolHero from "@/components/field-tools/FieldToolHero";
import { FIELD_TOOLS } from "@/lib/field-tools";

export default function FieldTools() {
  return (
    <main className="ft-catalog min-h-screen bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolHero
        eyebrow="REBEL LEADERS / FIELD TOOLS"
        headline={
          <>
            Field tools for the conversations product leaders are{" "}
            <em>actually having.</em>
          </>
        }
        description="Work through a difficult request, prepare for a conversation, and decide what to do next."
        image="/assets/field-tools/field-tools-catalog-hero-v1.webp"
        imageLayout="wide"
        primary={{ label: "Take the free Pressure Test", href: "/assessment" }}
        secondary={{ label: "Browse the five tools", href: "#tools" }}
        facts={[
          "Five focused Field Tools",
          "$47 USD each · one time",
          "Interactive Lab + Field Guide",
          "No subscription",
        ]}
      />

      <section
        id="tools"
        className="bg-[var(--ft-paper)] px-5 py-16 text-[var(--ft-ink)] md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="font-ui text-[10px] tracking-[0.24em] text-[var(--ft-muted)]">
              WHAT ARE YOU DEALING WITH?
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              What’s happening at work?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {FIELD_TOOLS.map(tool => (
              <Link
                key={tool.slug}
                href={"/field-tools/" + tool.slug}
                className="group flex min-h-[300px] flex-col justify-between border border-[var(--ft-line)] bg-[var(--ft-white)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--ft-line)] hover:shadow-none"
              >
                <div>
                  <p className="font-ui text-[10px] tracking-[0.18em] text-[var(--ft-muted)]">
                    {tool.eyebrow}
                  </p>
                  <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    {tool.headline}
                  </h3>
                  <p className="mt-1 font-display text-2xl italic text-[var(--ft-muted)]">
                    {tool.accentLine}
                  </p>
                  <p className="mt-5 font-ui text-sm leading-6 text-[var(--ft-muted)]">
                    {tool.subhead}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[var(--ft-line)] pt-5 font-ui text-sm font-semibold">
                  <span>
                    {"$"}
                    {tool.price}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">
                    See what’s included →
                  </span>
                </div>
              </Link>
            ))}

            <Link
              href="/assessment"
              className="group flex min-h-[300px] flex-col justify-between border border-[var(--ft-line)] bg-[var(--ft-tint)] p-6 text-[var(--ft-ink)] transition-all hover:-translate-y-1 hover:shadow-none"
            >
              <div>
                <p className="font-ui text-[10px] tracking-[0.18em] text-[var(--ft-muted)]">
                  FREE ASSESSMENT
                </p>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em]">
                  Not sure where to start?
                </h3>
                <p className="mt-5 font-ui text-sm leading-6 text-[var(--ft-muted)]">
                  Take the Product Leadership Pressure Test to work out what is
                  making your job harder and which problem to address first.
                </p>
              </div>
              <div className="mt-8 border-t border-[var(--ft-line)] pt-5 font-ui text-sm font-semibold">
                Take the free test →
              </div>
            </Link>
          </div>
        </div>
      </section>
      <details className="bg-[var(--ft-white)] px-5 py-8 text-[var(--ft-ink)] md:px-10">
        <summary className="mx-auto max-w-6xl cursor-pointer font-ui font-semibold">
          Compare the tools
        </summary>
        <FieldToolChooser />
      </details>
    </main>
  );
}
