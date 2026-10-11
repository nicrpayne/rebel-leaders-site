import { Link } from "wouter";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { FIELD_TOOLS } from "@/lib/field-tools";

const NIC_IMAGE = "/assets/workbench/brand/nic-victory.jpg";

export default function FieldTools() {
  return (
    <main className="min-h-screen bg-[#07130f] text-[#f2f3ec]">
      <FieldToolsNav />

      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(100,137,110,0.22),transparent_34%),linear-gradient(100deg,#07130f_0%,#0a1914_58%,#091510_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-end gap-8 px-5 pb-0 pt-16 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pt-20">
          <div className="z-10 pb-14 md:pb-20">
            <p className="mb-5 font-pixel text-[8px] tracking-[0.25em] text-[#9ab493]">FIELD TOOLS</p>
            <h1 className="max-w-3xl font-ui text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#f4f4ee] sm:text-6xl lg:text-7xl">
              Practical tools for the conversations product leaders are actually having.
            </h1>
            <p className="mt-6 max-w-2xl font-ui text-lg leading-8 text-[#bac8bf] md:text-xl">
              Modern product work inside organizations that still demand certainty. Start with the pressure you are carrying today.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="rounded-sm bg-[#b9d5ad] px-6 py-4 font-ui text-sm font-semibold text-[#07130f] shadow-[4px_4px_0_#5b765f] transition-transform hover:-translate-y-0.5"
              >
                Take the Pressure Test →
              </Link>
              <a
                href="#tools"
                className="rounded-sm border border-[#78907a] px-6 py-4 font-ui text-sm font-medium text-[#e4eee6] transition-colors hover:bg-white/5"
              >
                Browse the tools
              </a>
            </div>

            <p className="mt-5 font-ui text-sm text-[#819387]">
              Free assessment. Five focused Field Tools. No course portal required.
            </p>
          </div>

          <div className="relative flex min-h-[460px] items-end justify-center overflow-hidden md:min-h-[590px]">
            <div className="absolute inset-x-10 bottom-0 top-12 rounded-t-[45%] bg-[#123124]/45 blur-2xl" />
            <img
              src={NIC_IMAGE}
              alt="Nic Payne, founder of Rebel Leaders"
              className="relative z-10 max-h-[590px] w-full max-w-[560px] object-contain object-bottom drop-shadow-[0_28px_60px_rgba(0,0,0,.45)]"
            />
          </div>
        </div>
      </section>

      <section id="tools" className="bg-[#f3efe4] px-5 py-16 text-[#102019] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="font-pixel text-[8px] tracking-[0.24em] text-[#54715b]">WHAT ARE YOU DEALING WITH?</p>
            <h2 className="mt-4 font-ui text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Start with the sentence that sounds most like your Tuesday.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {FIELD_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={"/field-tools/" + tool.slug}
                className="group flex min-h-[300px] flex-col justify-between border border-[#cfd5c8] bg-[#fbf9f3] p-6 transition-all hover:-translate-y-1 hover:border-[#809b84] hover:shadow-[8px_8px_0_#d7ded2]"
              >
                <div>
                  <p className="font-pixel text-[7px] tracking-[0.18em] text-[#6a836e]">{tool.eyebrow}</p>
                  <h3 className="mt-5 font-ui text-3xl font-semibold leading-tight tracking-[-0.03em]">{tool.headline}</h3>
                  <p className="mt-1 font-display text-2xl italic text-[#54715b]">{tool.accentLine}</p>
                  <p className="mt-5 font-ui text-sm leading-6 text-[#536058]">{tool.subhead}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[#d9ddd4] pt-5 font-ui text-sm font-semibold">
                  <span>{"$"}{tool.price}</span>
                  <span className="transition-transform group-hover:translate-x-1">Open tool →</span>
                </div>
              </Link>
            ))}

            <Link
              href="/assessment"
              className="group flex min-h-[300px] flex-col justify-between border border-[#6f8c73] bg-[#153625] p-6 text-[#eef4ec] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_#aac09f]"
            >
              <div>
                <p className="font-pixel text-[7px] tracking-[0.18em] text-[#b6d1ad]">FREE ASSESSMENT</p>
                <h3 className="mt-5 font-ui text-3xl font-semibold leading-tight tracking-[-0.03em]">
                  Not sure which problem is actually driving the friction?
                </h3>
                <p className="mt-5 font-ui text-sm leading-6 text-[#c8d8c9]">
                  Take the Product Leadership Pressure Test and get the operating pressure most likely making your work harder right now.
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
