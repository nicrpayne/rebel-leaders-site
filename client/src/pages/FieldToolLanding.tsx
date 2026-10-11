import { Link } from "wouter";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { FIELD_TOOLS, getFieldTool } from "@/lib/field-tools";

const NIC_IMAGE = "/assets/workbench/brand/nic-victory.jpg";

export default function FieldToolLanding({ slug }: { slug: string }) {
  const tool = getFieldTool(slug);

  if (!tool) {
    return (
      <main className="min-h-screen bg-[#07130f] px-6 py-24 text-[#f2f3ec]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-pixel text-[9px] text-[#9ab493]">FIELD TOOL NOT FOUND</p>
          <h1 className="mt-6 font-ui text-5xl font-semibold">That tool isn't on the bench yet.</h1>
          <Link href="/field-tools" className="mt-8 inline-block border border-[#8aa08d] px-6 py-4 font-ui text-sm">
            Back to Field Tools →
          </Link>
        </div>
      </main>
    );
  }

  const related = tool.nextTools
    .map((nextSlug) => getFieldTool(nextSlug))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f3efe4] text-[#102019]">
      <div className="relative overflow-hidden bg-[#07130f] text-[#f4f4ee]">
        <FieldToolsNav />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(107,145,116,0.20),transparent_35%),linear-gradient(100deg,#07130f_0%,#0b1b15_62%,#091510_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <section className="relative mx-auto grid min-h-[700px] max-w-7xl items-end gap-6 px-5 pb-0 pt-28 md:grid-cols-[1.05fr_.95fr] md:px-8">
          <div className="z-10 pb-14 md:pb-20">
            <p className="font-pixel text-[8px] tracking-[0.24em] text-[#9ab493]">{tool.eyebrow}</p>
            <h1 className="mt-6 max-w-3xl font-ui text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {tool.headline}
            </h1>
            <p className="mt-2 font-display text-3xl italic text-[#b9d5ad] md:text-4xl">{tool.accentLine}</p>
            <p className="mt-6 max-w-2xl font-ui text-lg leading-8 text-[#c0ccc4]">{tool.subhead}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {tool.chips.map((chip) => (
                <span key={chip} className="border border-white/15 bg-white/[0.035] px-4 py-2 font-ui text-xs text-[#dbe6dd]">
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#get-tool"
                className="rounded-sm bg-[#b9d5ad] px-6 py-4 font-ui text-sm font-semibold text-[#07130f] shadow-[4px_4px_0_#5b765f] transition-transform hover:-translate-y-0.5"
              >
                Get the Field Tool — {"$"}{tool.price} →
              </a>
              <Link
                href="/assessment"
                className="border border-[#78907a] px-6 py-4 font-ui text-sm font-medium text-[#e4eee6] transition-colors hover:bg-white/5"
              >
                Not sure? Take the Pressure Test
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[#9aaca0]">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-white/15">
                <img src={NIC_IMAGE} alt="" className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <p className="font-ui text-sm font-semibold text-[#eff4ef]">Built by Nic Payne</p>
                <p className="font-ui text-xs">Rebel Leaders / practical tools for leading adaptive work</p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[470px] items-end justify-center overflow-hidden md:min-h-[620px]">
            <div className="absolute inset-x-10 bottom-0 top-10 rounded-t-[48%] bg-[#153625]/45 blur-2xl" />
            <img
              src={NIC_IMAGE}
              alt="Nic Payne"
              className="relative z-10 max-h-[610px] w-full max-w-[560px] object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,.48)]"
            />
            <div className="absolute bottom-16 right-2 z-20 hidden grid-cols-3 gap-1 opacity-50 md:grid">
              {[0,1,2,3,4].map((n) => <span key={n} className="h-3 w-3 bg-[#9ab493]" />)}
            </div>
          </div>
        </section>
      </div>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end">
            <div>
              <p className="font-pixel text-[8px] tracking-[0.24em] text-[#54715b]">{tool.sectionEyebrow}</p>
              <h2 className="mt-4 max-w-4xl font-ui text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {tool.sectionHeadline}
              </h2>
            </div>
            <p className="font-ui text-base leading-7 text-[#526057]">{tool.sectionCopy}</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {tool.cards.map((card, index) => (
              <article key={card.title} className="border border-[#ced5c9] bg-[#fbf9f3] p-6">
                <div className="flex h-11 w-11 items-center justify-center bg-[#e8ece3] font-pixel text-[8px] text-[#33533c]">
                  0{index + 1}
                </div>
                <h3 className="mt-7 font-ui text-2xl font-semibold tracking-[-0.02em]">{card.title}</h3>
                <p className="mt-3 font-ui text-sm leading-6 text-[#59665e]">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10271d] px-5 py-16 text-[#eef3ec] md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-pixel text-[8px] tracking-[0.24em] text-[#aac4a4]">NOT A COURSE</p>
            <h2 className="mt-4 font-ui text-4xl font-semibold tracking-[-0.035em]">
              Use it in the work. Leave with something real.
            </h2>
          </div>
          <div className="space-y-4 font-ui text-base leading-7 text-[#c2d0c5]">
            <p>{tool.who}</p>
            <p>
              Every Field Tool pairs a short field guide with a lightweight interactive workflow and a shareable artifact. No membership required.
            </p>
          </div>
        </div>
      </section>

      <section id="get-tool" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl border border-[#aebbaa] bg-[#fbf9f3] p-7 md:p-10">
          <p className="font-pixel text-[8px] tracking-[0.24em] text-[#54715b]">{tool.name.toUpperCase()}</p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-ui text-4xl font-semibold tracking-[-0.035em]">
                One problem. One working process. One useful output.
              </h2>
              <p className="mt-4 max-w-2xl font-ui text-sm leading-6 text-[#59665e]">
                Includes the Field Guide, interactive Lab, walkthrough, and Working Edition updates.
              </p>
            </div>
            <div className="shrink-0 md:text-right">
              <p className="font-display text-5xl font-semibold text-[#173c2a]">{"$"}{tool.price}</p>
              <button
                type="button"
                className="mt-3 w-full rounded-sm bg-[#173c2a] px-6 py-4 font-ui text-sm font-semibold text-white transition-colors hover:bg-[#214f39] md:w-auto"
                onClick={() => {
                  if (tool.checkoutUrl) window.location.href = tool.checkoutUrl;
                  else window.alert("Checkout is the next connection. This page is ready for the payment URL.");
                }}
              >
                Get the Field Tool →
              </button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-[#ccd4c9] px-5 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-pixel text-[8px] tracking-[0.22em] text-[#54715b]">RELATED PRESSURES</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {related.map((next) => next && (
                <Link
                  key={next.slug}
                  href={"/field-tools/" + next.slug}
                  className="group border border-[#ccd4c9] bg-[#fbf9f3] p-6 transition-colors hover:border-[#6e8c72]"
                >
                  <p className="font-ui text-sm text-[#6c796f]">{next.name}</p>
                  <p className="mt-2 font-ui text-2xl font-semibold tracking-[-0.02em]">{next.headline}</p>
                  <span className="mt-5 inline-block font-ui text-sm font-semibold group-hover:underline">See the tool →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#07130f] px-5 py-8 text-[#8ca091] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 font-ui text-xs sm:flex-row">
          <span>REBEL LEADERS / FIELD TOOLS</span>
          <Link href="/field-tools" className="hover:text-white">Browse all Field Tools →</Link>
        </div>
      </footer>
    </main>
  );
}
