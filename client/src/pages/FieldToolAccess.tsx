import { fieldToolForPath } from "@/lib/field-tool-paths";
import { trpc } from "@/lib/trpc";
import { fieldToolBase, fieldToolPresentation } from "@/lib/field-tool-paths";
import { useFieldToolContent } from "@/components/field-tools/FieldToolGate";
import { Link } from "wouter";
import { ArrowRight, FileText, FlaskConical } from "lucide-react";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { getFieldTool } from "@/lib/field-tools";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";

// Content is rendered only within the server-authorized FieldToolGate.
export default function FieldToolAccess({ slug }: { slug: string }) {
  const signOut = trpc.fieldTools.signOut.useMutation({
    onSuccess: () => window.location.reload(),
  });
  const content = useFieldToolContent();
  const base = fieldToolBase(slug, content.audience);
  const tool = fieldToolForPath(slug, content.audience);
  const presentation = fieldToolPresentation(slug, content.audience);
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
          {slug === "ai-stalemate"
            ? content.audience === "pm"
              ? " / PM"
              : " / Lead Developer"
            : ""}
        </h1>
        <p className="mt-5 max-w-2xl font-ui text-base leading-7 text-[#b8c9b8]">
          {presentation.promise} Start with one situation you want to move
          forward. Bookmark this page to return to your tool.
        </p>
        <div className="mt-8 border-l-2 border-[#d9b34d] bg-[#12281b] p-6">
          <h2 className="font-display text-3xl">Your first useful move</h2>
          <p className="mt-3 font-ui text-sm leading-7 text-[#b8c9b8]">
            {slug === "ai-stalemate"
              ? "Skim the Guide for the reframe, then open Private Prep in the Lab. Bring one real disagreement. Then use Readiness together to share the business context and agree the system and team prerequisites. Return to the Guide whenever a question needs explanation."
              : content.firstMove}
          </p>
          <Link href={`${base}/lab`} className="ft-button ft-button-gold mt-5">
            Start with my situation →
          </Link>
          <a
            href={`/api/field-tools/${slug}/pdf?audience=${content.audience}`}
            className="ml-5 inline-block text-sm underline"
          >
            Download the Field Guide ↓
          </a>
        </div>
        {content.walkthroughUrl && (
          <section className="mt-8 border border-[#60775a] p-6">
            <h2 className="font-display text-3xl">
              Watch Nic work the example
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#b8c9b8]">
              See the whole process, then work your own situation.
            </p>
            <a
              href={content.walkthroughUrl}
              target="_blank"
              rel="noreferrer"
              className="ft-button ft-button-gold mt-5"
            >
              Watch the walkthrough ↗
            </a>
          </section>
        )}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            href={`${base}/guide`}
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
            href={`${base}/lab`}
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
            The Guide explains the thinking. The Lab sequences your work. Your
            exported record is what you share with colleagues.
          </p>
          <p className="mt-3">
            Your draft lives in this browser on this device. Export anything you
            need to keep. Keep your Lemon Squeezy receipt for order and payment
            details. Use your purchase email to sign in on another device.
          </p>
        </div>
        <button
          onClick={() => signOut.mutate()}
          className="mt-8 block text-xs underline"
        >
          Sign out on this device
        </button>
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
