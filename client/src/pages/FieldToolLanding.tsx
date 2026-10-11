import { Link } from "wouter";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { getFieldTool, type FieldTool } from "@/lib/field-tools";

const NIC_IMAGE = "/assets/workbench/brand/nic-victory.jpg";

function AiStalemateHero({ tool, slug }: { tool: FieldTool; slug: string }) {
  const benefitCopy = [
    "Get to what's really in the way.",
    "Separate signal from noise.",
    "Move forward with confidence.",
  ];

  return (
    <div className="relative overflow-hidden bg-[#050c09] text-[#f5f0e6]">
      <FieldToolsNav />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(107,145,116,0.18),transparent_34%),linear-gradient(100deg,#050c09_0%,#08130e_58%,#07100c_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <section className="relative mx-auto grid min-h-[780px] max-w-[1500px] items-stretch pt-[74px] lg:grid-cols-[1.02fr_.98fr]">
        <div className="relative z-20 flex flex-col justify-center px-5 py-14 md:px-10 lg:py-20">
          <div className="max-w-[760px]">
            <div className="flex items-center gap-4">
              <span className="border border-[#6f916f] bg-[#163122]/55 px-4 py-2 font-pixel text-[8px] tracking-[0.22em] text-[#c0d5b9]">
                FIELD TOOL 01
              </span>
              <span className="h-px w-24 bg-gradient-to-r from-[#6f916f] to-transparent" />
            </div>

            <h1 className="mt-7 font-display text-[54px] font-semibold leading-[0.91] tracking-[-0.045em] text-[#f5f0e6] sm:text-[68px] xl:text-[82px]">
              My PM won't
              <br />
              shut up <span className="text-[#e1b84d]">about AI.</span>
            </h1>

            <p className="mt-6 max-w-[680px] font-display text-[22px] leading-[1.25] text-[#ecebe4] md:text-[27px]">
              When Product and Engineering are fighting about AI, the problem usually isn't the tool.
              <span className="block">It's the unworked tension underneath it.</span>
            </p>

            <div className="mt-7 flex items-center gap-4 border-l border-[#e1b84d]/65 pl-4">
              <div className="flex h-11 w-11 items-center justify-center border border-[#d7ad48]/55 bg-[#0f2017] font-pixel text-[9px] text-[#e1b84d]">
                AI
              </div>
              <div>
                <p className="font-display text-[25px] font-semibold text-white">AI Stalemate</p>
                <p className="mt-0.5 font-pixel text-[7px] tracking-[0.26em] text-[#9fbd98]">A REBEL LEADERS FIELD TOOL</p>
              </div>
            </div>

            <div className="mt-8 grid max-w-[700px] gap-3 sm:grid-cols-3">
              {tool.chips.map((chip, index) => (
                <div key={chip} className="border-l border-[#56705a]/70 pl-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#78967a] bg-[#0c1c14] font-pixel text-[7px] text-[#e1b84d]">
                    0{index + 1}
                  </div>
                  <p className="mt-3 font-display text-[20px] font-semibold text-[#f3f2eb]">{chip}</p>
                  <p className="mt-1 font-display text-[15px] leading-[1.25] text-[#c7d0c8]">{benefitCopy[index]}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#get-tool"
                className="min-w-[230px] bg-[#e5bb52] px-6 py-4 text-center font-ui text-sm font-bold text-[#10140f] shadow-[4px_4px_0_#8d6f29] transition-transform hover:-translate-y-0.5"
              >
                See the Field Tool — {"$"}{tool.price} →
              </a>
              <Link
                href="/assessment"
                className="min-w-[230px] border border-[#78967a] bg-[#08130e]/70 px-6 py-4 text-center font-ui text-sm font-semibold text-[#eef3ee] transition-colors hover:bg-[#12271b]"
              >
                Start with the Assessment
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-ui text-xs text-[#8fa095]">
              <Link href={"/field-tools/" + slug + "/lab"} className="hover:text-white">Open Lab preview →</Link>
              <Link href={"/field-tools/" + slug + "/guide"} className="hover:text-white">Read the Field Guide →</Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[500px] overflow-hidden lg:min-h-full">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050c09] via-[#050c09]/25 to-transparent lg:w-[38%]" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050c09] via-transparent to-transparent opacity-70" />
          <img
            src={NIC_IMAGE}
            alt="Nic Payne"
            className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.92] contrast-[1.04] saturate-[0.92]"
          />
          <div className="absolute right-8 top-10 z-20 hidden font-pixel text-[7px] leading-[1.9] tracking-[0.3em] text-[#d9dfda] xl:block">
            BETTER<br />LEADERS<br />BRIGHTER<br />WORK
          </div>
        </div>
      </section>

      <div className="relative z-20 border-t border-[#b7943e]/25 bg-[#06100c]/96">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 divide-x divide-[#7c672f]/35 px-5 md:grid-cols-4 md:px-10">
          {[
            ["ONE REAL PROBLEM", "ONE WORKING PROCESS"],
            ["FULL-COST", "EVIDENCE"],
            ["CONTINUE · REVISE", "STOP · PAUSE"],
            ["NO COURSE", "PORTAL"],
          ].map(([top, bottom]) => (
            <div key={top} className="px-4 py-5 md:px-7">
              <p className="font-pixel text-[7px] tracking-[0.22em] text-[#d9b34d]">{top}</p>
              <p className="mt-1 font-pixel text-[6px] tracking-[0.2em] text-[#8da094]">{bottom}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenericHero({ tool, slug }: { tool: FieldTool; slug: string }) {
  return (
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
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {tool.headline}
          </h1>
          <p className="mt-2 font-display text-3xl italic text-[#d9b34d] md:text-4xl">{tool.accentLine}</p>
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
              className="bg-[#d9b34d] px-6 py-4 font-ui text-sm font-semibold text-[#07130f] shadow-[4px_4px_0_#725c26] transition-transform hover:-translate-y-0.5"
            >
              Get the Field Tool — {"$"}{tool.price} →
            </a>
            <Link
              href={"/field-tools/" + slug + "/lab"}
              className="border border-[#78907a] px-6 py-4 font-ui text-sm font-medium text-[#e4eee6] transition-colors hover:bg-white/5"
            >
              Open the Lab preview
            </Link>
            <Link
              href={"/field-tools/" + slug + "/guide"}
              className="px-2 py-4 font-ui text-sm font-medium text-[#d1ddd4] hover:underline"
            >
              Read the Field Guide
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[470px] items-end justify-center overflow-hidden md:min-h-[620px]">
          <div className="absolute inset-x-10 bottom-0 top-10 rounded-t-[48%] bg-[#153625]/45 blur-2xl" />
          <img
            src={NIC_IMAGE}
            alt="Nic Payne"
            className="relative z-10 max-h-[610px] w-full max-w-[560px] object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,.48)]"
          />
        </div>
      </section>
    </div>
  );
}

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
      {slug === "ai-stalemate" ? (
        <AiStalemateHero tool={tool} slug={slug} />
      ) : (
        <GenericHero tool={tool} slug={slug} />
      )}

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end">
            <div>
              <p className="font-pixel text-[8px] tracking-[0.24em] text-[#54715b]">{tool.sectionEyebrow}</p>
              <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
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
                <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.02em]">{card.title}</h3>
                <p className="mt-3 font-ui text-sm leading-6 text-[#59665e]">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10271d] px-5 py-16 text-[#eef3ec] md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-pixel text-[8px] tracking-[0.24em] text-[#d0b25c]">NOT A COURSE</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em]">
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
              <h2 className="font-display text-4xl font-semibold tracking-[-0.035em]">
                One problem. One working process. One useful output.
              </h2>
              <p className="mt-4 max-w-2xl font-ui text-sm leading-6 text-[#59665e]">
                Includes the printable Field Guide, interactive Lab, walkthrough, and Working Edition updates.
              </p>
              <Link href={"/field-tools/" + slug + "/guide"} className="mt-3 inline-block font-ui text-sm font-semibold text-[#45634b] hover:underline">
                Preview the Field Guide →
              </Link>
            </div>
            <div className="shrink-0 md:text-right">
              <p className="font-display text-5xl font-semibold text-[#173c2a]">{"$"}{tool.price}</p>
              {tool.checkoutUrl ? (
                <button
                  type="button"
                  className="mt-3 w-full bg-[#173c2a] px-6 py-4 font-ui text-sm font-semibold text-white transition-colors hover:bg-[#214f39] md:w-auto"
                  onClick={() => { window.location.href = tool.checkoutUrl!; }}
                >
                  Get the Field Tool →
                </button>
              ) : (
                <Link
                  href={"/field-tools/" + slug + "/lab"}
                  className="mt-3 inline-block w-full bg-[#173c2a] px-6 py-4 text-center font-ui text-sm font-semibold text-white transition-colors hover:bg-[#214f39] md:w-auto"
                >
                  Open Lab Preview →
                </Link>
              )}
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
                  <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em]">{next.headline}</p>
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
