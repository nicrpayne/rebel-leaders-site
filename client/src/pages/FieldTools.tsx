import FieldToolChooser from "@/components/field-tools/FieldToolChooser";
import { Link } from "wouter";
import FieldToolHero from "@/components/field-tools/FieldToolHero";
import { FIELD_TOOLS } from "@/lib/field-tools";

export default function FieldTools() {
  return (
    <main className="ft-catalog min-h-screen bg-[#07130f] text-[#f2f3ec]">
      <FieldToolHero
        eyebrow="REBEL LEADERS / FIELD TOOLS"
        headline={
          <>
            Field tools for the conversations product leaders are{" "}
            <em>actually having.</em>
          </>
        }
        description="Practical tools for modern product work inside organizations that still demand certainty. Start with the pressure you are carrying today."
        image="/assets/field-tools/field-tools-catalog-hero-v1.webp"
        imageLayout="wide"
        primary={{ label: "Take the free Pressure Test", href: "/assessment" }}
        secondary={{ label: "Browse the five tools", href: "#tools" }}
        facts={[
          "Five focused Field Tools",
          "$47 USD each · one time",
          "Interactive Lab + Field Guide",
          "No course portal required",
        ]}
      />

      <section className="bg-[#e9ebdf] px-5 py-8 text-[#193025]">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl">
            AI Stalemate: start with your situation
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link
              href="/field-tools/ai-stalemate/pm"
              className="border border-[#9baa8e] bg-[#fbf9f3] p-5"
            >
              <span className="font-display text-2xl">I'm the PM →</span>
              <p className="mt-2 text-sm">
                I see an opportunity. My lead isn't convinced.
              </p>
            </Link>
            <Link
              href="/field-tools/ai-stalemate/lead-dev"
              className="border border-[#9baa8e] bg-[#fbf9f3] p-5"
            >
              <span className="font-display text-2xl">
                I'm the lead developer →
              </span>
              <p className="mt-2 text-sm">
                My PM sees potential. I need to make the conditions clear.
              </p>
            </Link>
          </div>
        </div>
      </section>
      <FieldToolChooser />
      <section
        id="tools"
        className="bg-[#f3efe4] px-5 py-16 text-[#102019] md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="font-pixel text-[8px] tracking-[0.24em] text-[#54715b]">
              WHAT ARE YOU DEALING WITH?
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Start with the sentence that sounds most like your Tuesday.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {FIELD_TOOLS.map(tool => (
              <Link
                key={tool.slug}
                href={"/field-tools/" + tool.slug}
                className="group flex min-h-[300px] flex-col justify-between border border-[#cfd5c8] bg-[#fbf9f3] p-6 transition-all hover:-translate-y-1 hover:border-[#809b84] hover:shadow-[8px_8px_0_#d7ded2]"
              >
                <div>
                  <p className="font-pixel text-[7px] tracking-[0.18em] text-[#6a836e]">
                    {tool.eyebrow}
                  </p>
                  <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    {tool.headline}
                  </h3>
                  <p className="mt-1 font-display text-2xl italic text-[#54715b]">
                    {tool.accentLine}
                  </p>
                  <p className="mt-5 font-ui text-sm leading-6 text-[#536058]">
                    {tool.subhead}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[#d9ddd4] pt-5 font-ui text-sm font-semibold">
                  <span>
                    {"$"}
                    {tool.price}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">
                    Open tool →
                  </span>
                </div>
              </Link>
            ))}

            <Link
              href="/assessment"
              className="group flex min-h-[300px] flex-col justify-between border border-[#6f8c73] bg-[#153625] p-6 text-[#eef4ec] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_#aac09f]"
            >
              <div>
                <p className="font-pixel text-[7px] tracking-[0.18em] text-[#b6d1ad]">
                  FREE ASSESSMENT
                </p>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.03em]">
                  Not sure where to start?
                </h3>
                <p className="mt-5 font-ui text-sm leading-6 text-[#c8d8c9]">
                  Take the Product Leadership Pressure Test to work out what is
                  making your job harder and which problem to address first.
                </p>
              </div>
              <div className="mt-8 border-t border-white/15 pt-5 font-ui text-sm font-semibold">
                Take the free test →
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
