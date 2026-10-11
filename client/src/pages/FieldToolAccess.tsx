import { Link } from "wouter";
import { ArrowRight, FileText, FlaskConical } from "lucide-react";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { getFieldTool } from "@/lib/field-tools";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";

// A lightweight start page, not payment verification or an entitlement boundary.
export default function FieldToolAccess({ slug }: { slug: string }) {
  const tool = getFieldTool(slug);
  const presentation = FIELD_TOOL_PRESENTATIONS[slug];
  if (!tool || !presentation)
    return (
      <main className="min-h-screen bg-[#07110d] p-10 text-white">
        <h1 className="font-display text-4xl">Field Tool not found.</h1>
        <Link href="/field-tools" className="mt-5 inline-block underline">
          Browse the tools
        </Link>
      </main>
    );
  return (
    <main className="relative min-h-screen bg-[#07110d] text-[#f5f0e6]">
      <FieldToolsNav />
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-32 md:px-10">
        <p className="font-ui text-[11px] tracking-[.2em] text-[#b5c8ac]">
          YOUR FIELD TOOL / START HERE
        </p>
        <h1 className="mt-5 font-display text-5xl font-semibold md:text-7xl">
          {tool.name}
        </h1>
        <p className="mt-5 max-w-2xl font-ui text-base leading-7 text-[#b8c9b8]">
          {presentation.promise} Bookmark this page so you can come back to the
          process.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            href={`/field-tools/${slug}/guide`}
            className="border border-[#617857] bg-[#12281b] p-7"
          >
            <FileText size={26} className="text-[#d9b34d]" aria-hidden="true" />
            <p className="mt-5 font-ui text-xs text-[#a9be9f]">
              01 / GET ORIENTED
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              Read the Field Guide
            </h2>
            <p className="mt-3 font-ui text-sm leading-6 text-[#b5c6b2]">
              The reframe, working rules, process, and a concrete example. Print
              it or save it as a PDF.
            </p>
            <ArrowRight
              size={20}
              className="mt-6 text-[#d9b34d]"
              aria-hidden="true"
            />
          </Link>
          <Link
            href={`/field-tools/${slug}/lab`}
            className="border border-[#a38f49] bg-[#1a2b1b] p-7"
          >
            <FlaskConical
              size={26}
              className="text-[#e4bc59]"
              aria-hidden="true"
            />
            <p className="mt-5 font-ui text-xs text-[#c8ba86]">
              02 / USE IT IN THE WORK
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              Open the Lab
            </h2>
            <p className="mt-3 font-ui text-sm leading-6 text-[#b5c6b2]">
              Bring one live situation. Work the questions, then copy, download,
              or print your brief.
            </p>
            <ArrowRight
              size={20}
              className="mt-6 text-[#e4bc59]"
              aria-hidden="true"
            />
          </Link>
        </div>
        <div className="mt-9 border-t border-[#435a46] pt-7 font-ui text-sm leading-7 text-[#acbfaa]">
          <p>{presentation.session}</p>
          <p className="mt-3">
            Use the walkthrough to see Nic work one realistic case from conversation to decision.
          </p>
          <p className="mt-3">
            Your draft lives in this browser on this device. Export anything you
            need to keep. This page does not show order or payment status; use
            the receipt from your checkout provider for that.
          </p>
        </div>
        <Link
          href="/field-tools"
          className="mt-9 inline-block font-ui text-xs text-[#c6d7c1] underline underline-offset-4"
        >
          All Field Tools →
        </Link>
      </section>
    </main>
  );
}
