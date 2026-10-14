import {
  AI_EFFORT_STAGES,
  effortMinutes,
  summarizeEffort,
} from "@/lib/ai-trial";

export default function AIEffortComparison({
  values,
  onChange,
}: {
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}) {
  const baseline = summarizeEffort(values, "baseline");
  const ai = summarizeEffort(values, "ai");
  const complete = baseline.complete && ai.complete;
  const reviewBefore = effortMinutes(values.baseline_review);
  const reviewAfter = effortMinutes(values.ai_review);
  return (
    <section
      className="mb-8 border-b border-[#c8d0c5] pb-8"
      aria-labelledby="effort-title"
    >
      <h3 id="effort-title" className="font-display text-2xl font-semibold">
        Count all the time spent.
      </h3>
      <p className="mt-3 font-ui text-xs leading-6 text-[#5c6960]">
        Add everyone’s working minutes. Two people working for 30 minutes use 60
        person-minutes. Enter 0 if no time was spent; leave a box blank if you
        do not know. Compare the quality of the finished work too.
      </p>
      <table className="mt-5 w-full table-fixed font-ui text-xs">
        <thead>
          <tr className="border-b border-[#c8d0c5] text-left">
            <th scope="col" className="w-[46%] pb-3">
              Work
            </th>
            <th scope="col" className="pb-3 text-center">
              Without AI
            </th>
            <th scope="col" className="pb-3 text-center">
              With AI
            </th>
          </tr>
        </thead>
        <tbody>
          {AI_EFFORT_STAGES.map(stage => (
            <tr key={stage.id} className="border-b border-[#e0e5db]">
              <th
                scope="row"
                className="py-4 pr-3 text-left font-normal leading-5"
              >
                {stage.label}
              </th>
              {(["baseline", "ai"] as const).map(method => (
                <td key={method} className="px-1 py-2">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    aria-label={`${stage.label} — ${method === "baseline" ? "without AI" : "with AI"} (minutes)`}
                    value={values[`${method}_${stage.id}`] || ""}
                    onChange={e =>
                      onChange(`${method}_${stage.id}`, e.target.value)
                    }
                    className="w-full min-w-0 border border-[#bfc8bb] bg-[#fffdf7] px-2 py-3 text-center focus:outline-[#56775d]"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" className="pt-4 text-left leading-5">
              {complete ? "Total effort" : "Recorded so far"}
            </th>
            <td className="pt-4 text-center font-semibold">
              {baseline.minutes} min
            </td>
            <td className="pt-4 text-center font-semibold">{ai.minutes} min</td>
          </tr>
        </tfoot>
      </table>
      <div
        role="status"
        className="mt-5 border-l-2 border-[#a1b89d] pl-4 font-ui text-xs leading-6 text-[#405747]"
      >
        {complete ? (
          <p>
            The work with AI took{" "}
            {Math.abs(Math.round((ai.minutes - baseline.minutes) * 100) / 100)}{" "}
            {ai.minutes === baseline.minutes
              ? "additional minutes: recorded effort is equal."
              : ai.minutes > baseline.minutes
                ? "more person-minutes."
                : "fewer person-minutes."}{" "}
            Check whether the finished work passed the agreed checks too.
          </p>
        ) : (
          <p>
            Comparison pending: {baseline.entered}/6 stages without AI;{" "}
            {ai.entered}/6 with AI. Partial totals don't show a saving.
          </p>
        )}
        {reviewBefore !== null &&
          reviewAfter !== null &&
          reviewAfter > reviewBefore && (
            <p className="mt-2">
              Reviewer checking increased by{" "}
              {Math.round((reviewAfter - reviewBefore) * 100) / 100} minutes.
              Ask the reviewer what caused the extra work.
            </p>
          )}
      </div>
    </section>
  );
}
