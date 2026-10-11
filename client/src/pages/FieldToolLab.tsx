import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolArtifact from "@/components/field-tools/FieldToolArtifact";
import AIEffortComparison from "@/components/field-tools/AIEffortComparison";
import { getFieldTool } from "@/lib/field-tools";

import { readFieldToolDraft } from "@/lib/field-tool-drafts";
import { FIELD_LABS, type FieldDef } from "@/lib/field-tool-labs";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (value: string) => void;
}) {
  const shared =
    "mt-2 w-full border border-[#bfc8bb] bg-[#fffdf7] px-4 py-3 font-ui text-sm text-[#13231a] outline-none transition-colors focus:border-[#56775d]";

  return (
    <label className="block">
      <span className="font-ui text-sm font-semibold text-[#26392d]">
        {field.label}
      </span>
      {field.hint && (
        <span className="mt-1 block font-ui text-xs leading-5 text-[#6b776f]">
          {field.hint}
        </span>
      )}
      {field.type === "select" ? (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={shared}
        >
          <option value="">Select…</option>
          {field.options?.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "text" ? (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className={shared}
        />
      ) : (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          className={shared + " resize-y"}
        />
      )}
    </label>
  );
}

export default function FieldToolLab({ slug }: { slug: string }) {
  return <LabSession key={slug} slug={slug} />;
}

function LabSession({ slug }: { slug: string }) {
  const tool = getFieldTool(slug);
  const config = FIELD_LABS[slug];
  const storageKey = "rl_field_lab_" + slug;
  const [initialDraft] = useState(() => {
    try {
      return readFieldToolDraft(
        window.localStorage,
        storageKey,
        config?.steps.length ?? 1
      );
    } catch {
      return { values: {}, step: 0 };
    }
  });
  const [step, setStep] = useState(initialDraft.step);
  const [values, setValues] = useState<Record<string, string>>(
    initialDraft.values
  );
  const [showOutput, setShowOutput] = useState(false);
  const [outputId, setOutputId] = useState("working-record");
  const [copyStatus, setCopyStatus] = useState("");
  const [storageStatus, setStorageStatus] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ values, step }));
      setStorageStatus("");
    } catch {
      setStorageStatus(
        "This browser cannot save the draft. Keep this tab open and export your work before leaving."
      );
    }
  }, [storageKey, values, step]);

  const selectedOutput = config?.outputs?.find(item => item.id === outputId);
  const output = useMemo(
    () => selectedOutput?.build(values) ?? config?.buildOutput(values) ?? "",
    [config, values, selectedOutput]
  );
  useEffect(() => setCopyStatus(""), [output]);

  if (!tool || !config) {
    return (
      <main className="min-h-screen bg-[#07130f] p-8 text-white">
        Tool Lab not found.
      </main>
    );
  }

  const current = config.steps[step];
  const isLast = step === config.steps.length - 1;

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied to clipboard.");
    } catch {
      setCopyStatus(
        "Clipboard unavailable. Select the output or download the text file."
      );
    }
  }

  function downloadOutput() {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = slug + "-" + (selectedOutput?.id ?? "output") + ".txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function clearDraft() {
    if (!window.confirm("Clear this local draft and start over?")) return;
    setValues({});
    setStep(0);
    setShowOutput(false);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      /* The in-memory draft is still cleared. */
    }
  }

  function openOutput(id: string) {
    setOutputId(id);
    setCopyStatus("");
    setShowOutput(true);
    window.setTimeout(
      () =>
        document
          .getElementById("lab-output")
          ?.scrollIntoView({ behavior: "auto", block: "start" }),
      0
    );
  }

  function loadExample() {
    const sample = FIELD_TOOL_PRESENTATIONS[slug]?.sampleValues;
    if (!sample) return;
    if (
      Object.values(values).some(value => value.trim()) &&
      !window.confirm(
        "Replace this local draft with the fictional example? Export any work you need first."
      )
    )
      return;
    setValues({ ...sample });
    setStep(slug === "ai-stalemate" ? 1 : 0);
    setShowOutput(false);
  }

  return (
    <main
      className={
        "ft-lab min-h-screen bg-[#f3efe4] text-[#102019]" +
        (showOutput ? " ft-lab-print-output" : "")
      }
    >
      <FieldToolsNav />

      <section className="bg-[#07130f] px-5 pb-8 pt-24 text-[#eef3ec] md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-pixel text-[8px] tracking-[0.22em] text-[#9bb397]">
                {tool.eyebrow} / LAB
              </p>
              <h1 className="mt-4 font-ui text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                {tool.name}
              </h1>
              <p className="mt-3 max-w-2xl font-ui text-sm leading-6 text-[#acbdb1]">
                Your draft stays in this browser on this device. Export anything
                you need to keep. No account required.
              </p>
              {storageStatus && (
                <p
                  role="status"
                  className="mt-3 max-w-2xl font-ui text-xs leading-6 text-[#ead69a]"
                >
                  {storageStatus}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadExample}
                className="self-start border border-[#9aa76b] px-4 py-2 font-ui text-xs text-[#ead69a]"
              >
                Load fictional example
              </button>
              <button
                type="button"
                onClick={clearDraft}
                className="self-start border border-white/15 px-4 py-2 font-ui text-xs text-[#bdcbbf]"
              >
                Clear local draft
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-2">
            {config.steps.map((item, index) => (
              <button
                type="button"
                key={item.eyebrow}
                onClick={() => setStep(index)}
                aria-current={index === step ? "step" : undefined}
                className={
                  "border-t-2 pt-3 text-left font-ui text-[11px] " +
                  (index === step
                    ? "border-[#b9d5ad] text-white"
                    : "border-white/10 text-[#72857a]")
                }
              >
                <span className="hidden sm:inline">{index + 1}. </span>
                {item.eyebrow}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <aside>
            <p className="font-pixel text-[8px] tracking-[0.2em] text-[#607b64]">
              {current.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
              {current.title}
            </h2>
            <p className="mt-4 font-ui text-sm leading-6 text-[#5c6960]">
              {current.intro}
            </p>

            <div className="mt-8 border-l-2 border-[#a1b89d] pl-4 font-ui text-xs leading-5 text-[#657268]">
              This is a working instrument, not a course. Complete only what
              helps you make the next decision.
            </div>
          </aside>

          <div className="border border-[#c8d0c5] bg-[#fbf9f3] p-5 md:p-8">
            {slug === "ai-stalemate" && step === 2 && (
              <AIEffortComparison
                values={values}
                onChange={(id, value) =>
                  setValues(prev => ({ ...prev, [id]: value }))
                }
              />
            )}
            <div className="space-y-6">
              {current.fields.map(field => (
                <div key={field.id}>
                  {field.section && (
                    <h3 className="mb-5 border-b border-[#cbd4c6] pb-3 pt-3 font-ui text-[10px] font-semibold tracking-[.16em] text-[#6a7d64]">
                      {field.section}
                    </h3>
                  )}
                  <FieldInput
                    field={field}
                    value={values[field.id] || ""}
                    onChange={value =>
                      setValues(prev => ({ ...prev, [field.id]: value }))
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-[#d7ddd3] pt-6">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep(Math.max(0, step - 1))}
                className="border border-[#aeb8aa] px-5 py-3 font-ui text-sm disabled:cursor-default disabled:opacity-30"
              >
                ← Back
              </button>

              {!isLast ? (
                <button
                  type="button"
                  onClick={() =>
                    setStep(Math.min(config.steps.length - 1, step + 1))
                  }
                  className="bg-[#173c2a] px-6 py-3 font-ui text-sm font-semibold text-white"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    openOutput(config.outputs ? "decision-brief" : "output")
                  }
                  className="bg-[#173c2a] px-6 py-3 font-ui text-sm font-semibold text-white"
                >
                  {config.outputs
                    ? "Build the Decision Brief →"
                    : "Generate the output →"}
                </button>
              )}
            </div>
            {config.outputs && step > 0 && (
              <div className="mt-6 border-t border-[#d7ddd3] pt-5">
                <p className="font-ui text-xs leading-6 text-[#657268]">
                  Export the Trial Card before running the test. Return here for
                  evidence and the decision; your private preparation stays out
                  of every shared output.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {config.outputs
                    .filter(item => item.fromStep <= step)
                    .map(item => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => openOutput(item.id)}
                        className="border border-[#aeb8aa] px-4 py-3 font-ui text-xs"
                      >
                        Build {item.title} →
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showOutput && (
        <section
          id="lab-output"
          className="ft-lab-output-section scroll-mt-20 bg-[#10271d] px-5 py-12 text-[#eef3ec] md:px-8"
          aria-label={selectedOutput?.title ?? "Your output"}
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-pixel text-[8px] tracking-[0.22em] text-[#b0c8aa] print:hidden">
              YOUR OUTPUT
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold print:hidden">
              {selectedOutput?.title ?? "Your working brief"}
            </h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <FieldToolArtifact
                text={output}
                toolName={tool.name}
                title={selectedOutput?.title ?? "Your working brief"}
              />
              <div className="flex flex-wrap gap-2 lg:flex-col print:hidden">
                <button
                  type="button"
                  onClick={copyOutput}
                  className="bg-[#b9d5ad] px-5 py-3 font-ui text-sm font-semibold text-[#07130f]"
                >
                  Copy
                </button>
                <p role="status" className="font-ui text-xs leading-5">
                  {copyStatus}
                </p>
                <button
                  type="button"
                  onClick={downloadOutput}
                  className="border border-white/20 px-5 py-3 font-ui text-sm"
                >
                  Download .txt
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="border border-white/20 px-5 py-3 font-ui text-sm"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-ui text-xs text-[#667369]">
          <Link href={"/field-tools/" + slug}>← Back to {tool.name}</Link>
          <div className="flex gap-4">
            <Link href={"/field-tools/" + slug + "/guide"}>Field Guide</Link>
            <Link href="/field-tools">All Field Tools →</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
