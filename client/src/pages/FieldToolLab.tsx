import {
  examplePatch,
  editLabValues,
  labReviewPrompts,
  withLabDefaults,
  type LabValues,
} from "@/lib/field-tool-session";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  FIELD_TOOL_GUIDE_CHAPTERS,
  FIELD_TOOL_START,
} from "@/lib/field-tool-workflow";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";
import { fieldToolForPath } from "@/lib/field-tool-paths";
import { fieldToolBase, fieldToolPresentation } from "@/lib/field-tool-paths";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolArtifact from "@/components/field-tools/FieldToolArtifact";
import AIEffortComparison from "@/components/field-tools/AIEffortComparison";
import LeadershipWorkSurface from "@/components/field-tools/LeadershipWorkSurface";
import { getFieldTool } from "@/lib/field-tools";

import {
  readFieldToolDraft,
  readAIFieldToolDraft,
  sharedDraftValues,
  purgeSavedReflection,
  PRIVATE_FIELD_IDS,
} from "@/lib/field-tool-drafts";
import type { FieldDef } from "../../../server/field-tool-content/labs";
import {
  FIELD_OUTPUT_BUILDERS,
  AI_OUTPUT_BUILDERS,
  TOOL_ARTIFACT_BUILDERS,
} from "@/lib/field-tool-output-builders";
import { useFieldToolContent } from "@/components/field-tools/FieldToolGate";
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
  const { audience } = useFieldToolContent();
  return <LabSession key={slug + "/" + audience} slug={slug} />;
}

function LabSession({ slug }: { slug: string }) {
  const content = useFieldToolContent();
  const tool = fieldToolForPath(slug, content.audience);
  const base = fieldToolBase(slug, content.audience);
  const config = useMemo(
    () => ({
      ...content.lab,
      buildOutput: FIELD_OUTPUT_BUILDERS[slug],
      outputs: content.lab.outputs?.map(item => ({
        ...item,
        build:
          TOOL_ARTIFACT_BUILDERS[item.id] ??
          AI_OUTPUT_BUILDERS[item.id as keyof typeof AI_OUTPUT_BUILDERS],
      })),
    }),
    [content, slug]
  );
  const storageKey = "rl_field_lab_" + slug + "_" + content.audience;
  const [initialDraft] = useState(() => {
    try {
      purgeSavedReflection(window.localStorage, [
        storageKey,
        "rl_field_lab_" + slug,
      ]);
      const key =
        content.audience === "pm" &&
        window.localStorage.getItem(storageKey) === null
          ? "rl_field_lab_" + slug
          : storageKey;
      return slug === "ai-stalemate"
        ? readAIFieldToolDraft(window.localStorage, key)
        : readFieldToolDraft(window.localStorage, key, config.steps.length);
    } catch {
      return { values: {}, step: 0 };
    }
  });
  const [step, setStep] = useState(() => {
    const requested = Number(
      new URLSearchParams(window.location.search).get("step")
    );
    return new URLSearchParams(window.location.search).has("step") &&
      Number.isInteger(requested) &&
      requested >= 0 &&
      requested < config.steps.length
      ? requested
      : initialDraft.step;
  });
  const [values, setValues] = useState<Record<string, string>>(() =>
    withLabDefaults(slug, initialDraft.values)
  );
  const [showOutput, setShowOutput] = useState(false);
  const [outputId, setOutputId] = useState("working-record");
  const [copyStatus, setCopyStatus] = useState("");
  const [storageStatus, setStorageStatus] = useState("");
  const [pendingAction, setPendingAction] = useState<
    "examples" | "clear" | null
  >(null);
  const [undo, setUndo] = useState<{ values: LabValues; step: number } | null>(
    null
  );
  const [editNotice, setEditNotice] = useState("");
  const priorStep = useRef(step);
  const actionTrigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (priorStep.current === step) return;
    priorStep.current = step;
    setShowOutput(false);
    const heading = document.getElementById("lab-step-heading");
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [step]);
  function editValue(id: string, value: string) {
    setValues(previous =>
      withLabDefaults(slug, editLabValues(previous, { [id]: value }))
    );
    setShowOutput(false);
    setUndo(null);
    setEditNotice(
      id === "readinessDecision"
        ? "Next move changed. Review the decision and any earlier bet before sharing. Your evidence and notes are still here."
        : ""
    );
  }

  useEffect(() => {
    // A Guide link selects a phase once; later refreshes resume the saved phase.
    const url = new URL(window.location.href);
    if (url.searchParams.has("step")) {
      url.searchParams.delete("step");
      window.history.replaceState(
        window.history.state,
        "",
        url.pathname + url.search + url.hash
      );
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ values: sharedDraftValues(values), step, version: 2 })
      );
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
  const preparationDecision =
    slug === "ai-stalemate" &&
    [
      "CLARIFY THE CONVERSATION",
      "ASK A SPECIALIST",
      "PREPARE FIRST",
      "STOP THIS USE",
    ].includes(values.readinessDecision);
  const atReadiness = slug === "ai-stalemate" && step === 1;
  function continueWork() {
    if (atReadiness && preparationDecision) {
      setValues(v => ({
        ...v,
        decision: v.readinessDecision === "STOP THIS USE" ? "STOP" : "PAUSE",
      }));
      setStep(4);
      return;
    }
    if (atReadiness && values.readinessDecision === "USE EXISTING EVIDENCE") {
      setStep(3);
      return;
    }
    if (atReadiness && !values.readinessDecision) {
      setStep(4);
      return;
    }
    setStep(Math.min(config.steps.length - 1, step + 1));
  }

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
    const fileLabel =
      selectedOutput?.id === "trial-card"
        ? "bet-brief"
        : (selectedOutput?.id ?? "output");
    anchor.download = slug + "-" + fileLabel + ".txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function clearDraft() {
    setValues(withLabDefaults(slug, {}));
    setUndo(null);
    setEditNotice("Local draft cleared.");
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
    if (!content.sampleValues) return;
    const patch = examplePatch(
      slug,
      step,
      current.fields,
      content.sampleValues
    );
    if (Object.keys(patch).some(id => values[id]?.trim())) {
      setPendingAction("examples");
    } else {
      replaceWithExample();
    }
  }
  function replaceWithExample() {
    const patch = examplePatch(
      slug,
      step,
      current.fields,
      content.sampleValues ?? {}
    );
    setUndo({ values: { ...values }, step });
    setValues(previous =>
      withLabDefaults(slug, editLabValues(previous, patch))
    );
    setShowOutput(false);
    setEditNotice(
      "Fictional example loaded into this step. Other steps are unchanged, except any decision that needs review after a changed next move."
    );
  }
  function restoreDraft() {
    if (!undo) return;
    setValues(undo.values);
    setStep(undo.step);
    setUndo(null);
    setShowOutput(false);
    setEditNotice("Your answers have been restored.");
  }

  const optionalIds = new Set(
    slug === "ai-stalemate" && step === 1
      ? [
          "businessBasis",
          "growthOpportunity",
          "accessModel",
          "securityChecks",
          "automationBoundary",
          "teamReadiness",
          "readinessSupport",
        ]
      : slug === "ai-stalemate" && step === 2
        ? [
            "betQualitative",
            "betRabbitHoles",
            "decisionRights",
            "deploymentPermission",
          ]
        : [
            "visionTeam",
            "visionProduct",
            "visionCompany",
            "emergencyException",
            "spokenResponse",
          ]
  );
  const renderFields = (fields: FieldDef[]) =>
    fields.map(field => (
      <div key={field.id}>
        {field.section && (
          <h3 className="mb-5 border-b border-[#cbd4c6] pb-3 pt-3 font-ui text-[10px] font-semibold tracking-[.16em] text-[#6a7d64]">
            {field.section}
          </h3>
        )}
        <FieldInput
          field={field}
          value={values[field.id] || ""}
          onChange={value => editValue(field.id, value)}
        />
      </div>
    ));
  const guideChapter = FIELD_TOOL_GUIDE_CHAPTERS[slug]?.[step] ?? 0;

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
                {slug === "ai-stalemate"
                  ? content.audience === "pm"
                    ? " / PM"
                    : " / Lead Developer"
                  : ""}
              </h1>
              <p className="mt-3 max-w-2xl font-ui text-sm leading-6 text-[#acbdb1]">
                {FIELD_TOOL_START[slug] ??
                  "Use the Field Guide for the thinking and this Lab for your situation."}
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
                onClick={event => {
                  actionTrigger.current = event.currentTarget;
                  setPendingAction("clear");
                }}
                className="self-start border border-white/15 px-4 py-2 font-ui text-xs text-[#bdcbbf]"
              >
                Clear local draft
              </button>
            </div>
          </div>

          <div
            className={
              "mt-8 grid gap-2 " +
              (config.steps.length === 5
                ? "grid-cols-2 sm:grid-cols-5"
                : "grid-cols-2 sm:grid-cols-4")
            }
          >
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
            <h2
              id="lab-step-heading"
              tabIndex={-1}
              className="scroll-mt-24 mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl"
            >
              {current.title}
            </h2>
            <p className="mt-4 font-ui text-sm leading-6 text-[#5c6960]">
              {current.intro}
            </p>

            <div className="mt-8 border-l-2 border-[#a1b89d] pl-4 font-ui text-xs leading-5 text-[#657268]">
              Private reflection is optional: think it through without typing,
              or use the private fields. Those notes stay only in this open tab
              and disappear when you refresh or leave the Lab. Shared fields
              save on this device and feed the records you can review before
              sharing.
            </div>
            <Link
              href={`${base}/guide#guide-${guideChapter}`}
              className="mt-5 inline-block font-ui text-sm underline underline-offset-4"
            >
              Read the matching Field Guide chapter →
            </Link>
          </aside>

          <div className="border border-[#c8d0c5] bg-[#fbf9f3] p-5 md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#cbd4c6] pb-4">
              <p className="font-ui text-xs text-[#657268]">
                {step === 0 && slug === "ai-stalemate"
                  ? "Private reflection · not saved or exported"
                  : "Shared work · saved on this device"}
              </p>
              <button
                type="button"
                onClick={event => {
                  actionTrigger.current = event.currentTarget;
                  loadExample();
                }}
                className="border border-[#aeb8aa] px-4 py-2 font-ui text-xs"
              >
                Load Examples
              </button>
            </div>
            {editNotice && (
              <div
                role="status"
                className="mb-6 border-l-2 border-[#78946b] bg-[#edf1e5] p-4 font-ui text-sm leading-6"
              >
                {editNotice}{" "}
                {undo && (
                  <button
                    type="button"
                    onClick={restoreDraft}
                    className="ml-2 font-semibold underline"
                  >
                    Undo example
                  </button>
                )}
              </div>
            )}
            <LeadershipWorkSurface
              slug={slug}
              step={step}
              values={values}
              onChange={editValue}
            />
            {slug === "ai-stalemate" && step === 3 && (
              <AIEffortComparison values={values} onChange={editValue} />
            )}
            <div className="space-y-6">
              {renderFields(
                current.fields.filter(
                  field =>
                    !optionalIds.has(field.id) &&
                    !PRIVATE_FIELD_IDS.has(field.id)
                )
              )}
              {current.fields.some(
                field =>
                  PRIVATE_FIELD_IDS.has(field.id) && !optionalIds.has(field.id)
              ) && (
                <details
                  open={slug === "ai-stalemate"}
                  className="border-l-2 border-[#a1b89d] pl-4"
                >
                  <summary className="cursor-pointer font-ui text-sm font-semibold">
                    Private reflection · optional, not saved or exported
                  </summary>
                  <div className="mt-5 space-y-6">
                    {renderFields(
                      current.fields.filter(
                        field =>
                          PRIVATE_FIELD_IDS.has(field.id) &&
                          !optionalIds.has(field.id)
                      )
                    )}
                  </div>
                </details>
              )}
              {current.fields.some(field => optionalIds.has(field.id)) && (
                <details
                  key={`optional-${step}`}
                  className="border-t border-[#cbd4c6] pt-5"
                >
                  <summary className="cursor-pointer font-ui text-sm font-semibold">
                    {slug !== "ai-stalemate"
                      ? "Optional help for this situation"
                      : step === 0
                        ? "Picture six months from now · optional, private"
                        : step === 2
                          ? "Bet conditions and decision rights · optional"
                          : "Explore business, technical, or team conditions · optional"}
                  </summary>
                  <div className="mt-5 space-y-6">
                    {renderFields(
                      current.fields.filter(field => optionalIds.has(field.id))
                    )}
                  </div>
                </details>
              )}
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
                  onClick={continueWork}
                  className="bg-[#173c2a] px-6 py-3 font-ui text-sm font-semibold text-white"
                >
                  {atReadiness && preparationDecision
                    ? values.readinessDecision === "STOP THIS USE"
                      ? "Write a STOP decision →"
                      : "Record the next move →"
                    : atReadiness &&
                        values.readinessDecision === "USE EXISTING EVIDENCE"
                      ? "Review existing evidence →"
                      : "Continue →"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    openOutput(
                      slug === "ai-stalemate"
                        ? "decision-brief"
                        : (config.outputs?.at(-1)?.id ?? "output")
                    )
                  }
                  className="bg-[#173c2a] px-6 py-3 font-ui text-sm font-semibold text-white"
                >
                  {config.outputs
                    ? slug === "ai-stalemate"
                      ? "Build the Decision Brief →"
                      : `Build ${config.outputs.at(-1)?.title} →`
                    : "Generate the output →"}
                </button>
              )}
            </div>
            {config.outputs && (slug !== "ai-stalemate" || step > 0) && (
              <div className="mt-6 border-t border-[#d7ddd3] pt-5">
                <p className="font-ui text-xs leading-6 text-[#657268]">
                  {slug !== "ai-stalemate"
                    ? "Build a record for the conversation. It updates from your shared inputs; private preparation stays out of every output."
                    : atReadiness
                      ? "Build a Shared Next-Step Brief to take into the conversation or record what you have agreed. Clarifying or preparing can be the right next move; an experiment is optional."
                      : "Export the Bet Brief before an approved test. Return for evidence and the decision; private preparation stays out of shared outputs."}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {config.outputs
                    .filter(
                      item =>
                        item.fromStep <= step &&
                        !(
                          preparationDecision &&
                          ["trial-card", "evidence-record"].includes(item.id)
                        )
                    )
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
            <p className="mt-3 font-ui text-sm leading-6 print:hidden">
              Review before sharing. Missing information appears as a prompt; a
              proposal does not record agreement. Editing an answer closes this
              preview so you can rebuild it.
            </p>
            {labReviewPrompts(slug, values).length > 0 && (
              <div
                className="mt-5 border border-[#adc3a1] p-4 font-ui text-sm leading-6"
                aria-label="Questions before sharing"
              >
                <p className="font-semibold">Before sharing</p>
                <ul className="mt-2 list-disc pl-5">
                  {labReviewPrompts(slug, values).map(prompt => (
                    <li key={prompt}>{prompt}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <FieldToolArtifact
                text={output}
                toolName={
                  tool.name +
                  (slug === "ai-stalemate"
                    ? content.audience === "pm"
                      ? " / PM"
                      : " / Lead Developer"
                    : "")
                }
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
          <Link href={base}>← Back to {tool.name}</Link>
          <div className="flex gap-4">
            <Link href={base + "/guide"}>Field Guide</Link>
            <Link href="/field-tools">All Field Tools →</Link>
          </div>
        </div>
      </footer>
      <AlertDialog
        open={pendingAction !== null}
        onOpenChange={open => {
          if (!open) setPendingAction(null);
        }}
      >
        <AlertDialogContent
          className="bg-[#fbf9f3] text-[#193025]"
          onCloseAutoFocus={event => {
            event.preventDefault();
            actionTrigger.current?.focus({ preventScroll: true });
          }}
        >
          <AlertDialogTitle>
            {pendingAction === "clear"
              ? "Clear this local draft?"
              : "Replace this step with the example?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#536058] leading-6">
            {pendingAction === "clear"
              ? "This removes the saved shared answers and private notes in this Lab. Export anything you want to keep first. This cannot be undone."
              : "The fictional example replaces the answers in this step. Other steps keep their answers; if the next move changes, its decision must be reviewed. You can undo the replacement before editing again."}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#173c2a] text-white"
              onClick={() => {
                if (pendingAction === "clear") clearDraft();
                else replaceWithExample();
              }}
            >
              {pendingAction === "clear" ? "Clear draft" : "Replace this step"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <FieldToolsFooter />
    </main>
  );
}
