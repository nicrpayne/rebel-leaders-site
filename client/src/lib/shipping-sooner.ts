import {
  emptyAccessDraft,
  exampleAccessDraft,
  readAccessDraft,
  type AccessDraft,
} from "./shipping-access";
import {
  emptyShippingAction,
  exampleShippingAction,
  readShippingAction,
  type ShippingAction,
} from "./shipping-actions";

export const DELIVERY_STAGES = [
  { id: "coding", label: "Writing code", color: "#315c4b" },
  { id: "review", label: "Review & testing", color: "#77988b" },
  { id: "rework", label: "Fixes & rework", color: "#b59161" },
  { id: "waiting", label: "Waiting on people or access", color: "#d0c2ad" },
  { id: "release", label: "Releasing the change", color: "#8d9292" },
] as const;

export type DeliveryStage = (typeof DELIVERY_STAGES)[number]["id"];
export type DeliveryTimes = Record<DeliveryStage, string>;
export type ShippingDraft = {
  name: string;
  action: ShippingAction;
  access: AccessDraft;
  now: DeliveryTimes;
  // null follows the current value until the user changes this part of the scenario.
  scenario: Record<DeliveryStage, string | null>;
};

export const unchangedScenario = (): ShippingDraft["scenario"] => ({
  coding: null,
  review: null,
  rework: null,
  waiting: null,
  release: null,
});
export const emptyShippingDraft = (): ShippingDraft => ({
  name: "",
  action: emptyShippingAction(),
  access: emptyAccessDraft(),
  now: { coding: "", review: "", rework: "", waiting: "", release: "" },
  scenario: unchangedScenario(),
});
export const exampleShippingDraft = (): ShippingDraft => ({
  name: "A small internal app",
  action: exampleShippingAction(),
  access: exampleAccessDraft(),
  now: { coding: "2", review: "3", rework: "2", waiting: "12", release: "1" },
  scenario: { ...unchangedScenario(), coding: "1" },
});

export function deliveryDays(raw: string): number | null {
  if (!raw.trim()) return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 && value <= 1_000_000
    ? value
    : null;
}
export function scenarioValue(draft: ShippingDraft, id: DeliveryStage) {
  return draft.scenario[id] ?? draft.now[id];
}
export function shippingComparison(draft: ShippingDraft) {
  const rows = DELIVERY_STAGES.map(stage => ({
    ...stage,
    now: deliveryDays(draft.now[stage.id]),
    scenario: deliveryDays(scenarioValue(draft, stage.id)),
  }));
  if (rows.some(row => row.now === null || row.scenario === null)) return null;
  const complete = rows as ((typeof DELIVERY_STAGES)[number] & {
    now: number;
    scenario: number;
  })[];
  const current = complete.reduce((sum, row) => sum + row.now, 0);
  if (current === 0) return null;
  const scenario = complete.reduce((sum, row) => sum + row.scenario, 0);
  const saved = current - scenario;
  const coding = complete.find(row => row.id === "coding")!.now;
  return {
    rows: complete,
    current,
    scenario,
    saved: Math.abs(saved) < 1e-9 ? 0 : saved,
    percent: Math.abs(saved) < 1e-9 ? 0 : (saved / current) * 100,
    codingShare: (coding / current) * 100,
    codingOnlySaved: coding / 2,
    codingOnlyTotal: current - coding / 2,
    codingOnlyPercent: (coding / current) * 50,
  };
}

export function displayNumber(value: number) {
  if (value !== 0 && Math.abs(value) < 0.01) return "<0.01";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    value
  );
}

export function shippingSummary(draft: ShippingDraft, example: boolean) {
  const result = shippingComparison(draft);
  if (!result) return "";
  return [
    "WILL THIS GET US SHIPPING SOONER?",
    draft.name.trim() || "One piece of work",
    example
      ? "Illustrative example — not measured team data."
      : "Based on the times entered; check estimates against a recent piece of work.",
    "",
    ...result.rows.map(
      row =>
        `${row.label}: ${displayNumber(row.now)} → ${displayNumber(row.scenario)} working days`
    ),
    "",
    `Total elapsed time: ${displayNumber(result.current)} → ${displayNumber(result.scenario)} working days.`,
    result.saved === 0
      ? "No change in total elapsed time."
      : `${displayNumber(Math.abs(result.saved))} working ${Math.abs(result.saved) === 1 ? "day" : "days"} ${result.saved > 0 ? "less" : "more"}; ${displayNumber(Math.abs(result.percent))}% ${result.saved > 0 ? "less" : "more"} elapsed time.`,
    `Halving coding time alone would give ${displayNumber(result.codingOnlyTotal)} working days (${displayNumber(result.codingOnlyPercent)}% less), if everything else stayed the same.`,
    "",
    "Assumptions: one piece of work, the same scope and quality, and non-overlapping elapsed time. Waiting counts; person-hours are not added together. Changes in one stage may affect another. This is a scenario, not a delivery forecast, throughput measure, or evidence of AI savings.",
    "Question to discuss: What would need to change for this scenario to be realistic?",
  ].join("\n");
}

// Saved numbers are browser-local and never placed in a URL or sent to a service.
export function readShippingDraft(raw: string | null): ShippingDraft {
  if (!raw) return emptyShippingDraft();
  try {
    const parsed = JSON.parse(raw);
    if (
      ![1, 2, 3].includes(parsed.version) ||
      typeof parsed.draft?.name !== "string"
    )
      return emptyShippingDraft();
    const draft = parsed.draft;
    for (const { id } of DELIVERY_STAGES) {
      if (
        typeof draft.now?.[id] !== "string" ||
        draft.now[id].length > 30 ||
        !(
          draft.scenario?.[id] === null ||
          (typeof draft.scenario?.[id] === "string" &&
            draft.scenario[id].length <= 30)
        )
      )
        return emptyShippingDraft();
    }
    return {
      name: draft.name.slice(0, 180),
      action: readShippingAction(draft.action),
      access: readAccessDraft(draft.access),
      now: Object.fromEntries(
        DELIVERY_STAGES.map(({ id }) => [id, draft.now[id]])
      ) as DeliveryTimes,
      scenario: Object.fromEntries(
        DELIVERY_STAGES.map(({ id }) => [id, draft.scenario[id]])
      ) as ShippingDraft["scenario"],
    };
  } catch {
    return emptyShippingDraft();
  }
}
