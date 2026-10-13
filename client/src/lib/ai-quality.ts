export type QualityCheck = { id: string; check: string; expected: string; status: "NOT CHECKED" | "PASSED" | "FAILED"; observed: string; evidence: string; verifier: string };
export const DEFAULT_QUALITY_CHECKS: QualityCheck[] = [
  { id: "acceptance", check: "Agreed acceptance check", expected: "", status: "NOT CHECKED", observed: "", evidence: "", verifier: "" },
  { id: "access", check: "Permission boundary, if relevant", expected: "", status: "NOT CHECKED", observed: "", evidence: "", verifier: "" },
];
export function readQualityChecks(raw?: string): QualityCheck[] {
  if (!raw?.trim()) return structuredClone(DEFAULT_QUALITY_CHECKS);
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return structuredClone(DEFAULT_QUALITY_CHECKS);
    return parsed.slice(0, 50).filter(row => row && typeof row === "object" && !Array.isArray(row)).map((row, i) => {
      const text = (key: string) => typeof row[key] === "string" ? row[key].slice(0, 10000) : "";
      return { id: `check-${i}`, check: text("check"), expected: text("expected"), status: row.status === "PASSED" || row.status === "FAILED" ? row.status : "NOT CHECKED", observed: text("observed"), evidence: text("evidence"), verifier: text("verifier") };
    });
  } catch { return structuredClone(DEFAULT_QUALITY_CHECKS); }
}
export function qualityChecksRecord(raw?: string) {
  const checks = readQualityChecks(raw);
  if (!checks.length) return "No quality checks recorded. Quality is not established.";
  return checks.map(c => `${c.check.trim() || "[check not named]"}: ${c.status}\n  Expected: ${c.expected.trim() || "[not defined]"}\n  Observed: ${c.observed.trim() || "[not recorded]"}\n  Evidence: ${c.evidence.trim() || "[not linked]"}\n  Verifier: ${c.verifier.trim() || "[not named]"}`).join("\n\n");
}
export function qualityChecksObserved(raw?: string) {
  if (!raw) return false;
  return readQualityChecks(raw).some(c => c.status !== "NOT CHECKED" || c.observed.trim() || c.evidence.trim());
}
