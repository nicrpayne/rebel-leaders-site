import { readQualityChecks, type QualityCheck } from "@/lib/ai-quality";
import "./ai-library.css";
export default function AIQualityChecks({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const rows = readQualityChecks(value);
  const update = (index: number, key: keyof QualityCheck, text: string) =>
    onChange(
      JSON.stringify(
        rows.map((row, i) => (i === index ? { ...row, [key]: text } : row))
      )
    );
  return (
    <section className="ai-workbench-panel">
      <p className="ai-eyebrow">CHECK THE WORK</p>
      <h3 className="mt-2 font-display text-2xl">
        What was checked—and what happened?
      </h3>
      <p className="mt-3 text-xs leading-6">
        Use the checks you agreed in the Experiment Plan. Say what should
        happen, what actually happened, where to see the result, and who checked
        it. Leave a check marked NOT CHECKED until someone has done it.
      </p>
      {rows.map((row, i) => (
        <div className="ai-quality-row" key={i}>
          <div className="ai-quality-grid">
            <label>
              Check
              <input
                value={row.check}
                onChange={e => update(i, "check", e.target.value)}
              />
            </label>
            <label>
              Result
              <select
                value={row.status}
                onChange={e => update(i, "status", e.target.value)}
              >
                {["NOT CHECKED", "PASSED", "FAILED"].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="ai-quality-grid">
            <label>
              What should happen?
              <textarea
                rows={2}
                value={row.expected}
                onChange={e => update(i, "expected", e.target.value)}
              />
            </label>
            <label>
              What actually happened?
              <textarea
                rows={2}
                value={row.observed}
                onChange={e => update(i, "observed", e.target.value)}
              />
            </label>
          </div>
          <div className="ai-quality-grid">
            <label>
              Where can we see the result?
              <input
                value={row.evidence}
                onChange={e => update(i, "evidence", e.target.value)}
              />
            </label>
            <label>
              Who checked it?
              <input
                value={row.verifier}
                onChange={e => update(i, "verifier", e.target.value)}
              />
            </label>
          </div>
          <button
            type="button"
            className="mt-3 text-xs underline"
            onClick={() =>
              onChange(JSON.stringify(rows.filter((_, n) => n !== i)))
            }
          >
            Remove this check
          </button>
        </div>
      ))}
      <button
        type="button"
        className="mt-5 border border-[#aeb8aa] px-4 py-2 text-xs"
        onClick={() =>
          onChange(
            JSON.stringify([
              ...rows,
              {
                id: `check-${rows.length}`,
                check: "",
                expected: "",
                status: "NOT CHECKED",
                observed: "",
                evidence: "",
                verifier: "",
              },
            ])
          )
        }
      >
        Add a quality check +
      </button>
      <p className="mt-4 text-xs leading-6">
        If a check failed or has not been done, decide who will do what next. A
        pass records what the person checking found. Your usual approval process
        still applies before releasing the change.
      </p>
    </section>
  );
}
