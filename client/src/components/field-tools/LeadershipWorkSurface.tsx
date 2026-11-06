import { capacitySnapshot } from "@/lib/leadership-output";

type Props = {
  slug: string;
  step: number;
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
};
export default function LeadershipWorkSurface({
  slug,
  step,
  values,
  onChange,
}: Props) {
  if (slug === "priority-whiplash" && step === 1) {
    const snapshot = capacitySnapshot(values);
    return (
      <section
        aria-label="Optional capacity check"
        className="mb-8 border border-[var(--ft-line)] bg-[var(--ft-tint)] p-5"
      >
        <p className="font-ui text-[10px] tracking-[.15em] text-[var(--ft-muted)]">
          OPTIONAL / CHECK WHETHER THE WORK FITS
        </p>
        <h3 className="mt-3 font-display text-2xl">
          Do we have time for the new request?
        </h3>
        <p className="mt-2 text-xs leading-6 text-[var(--ft-muted)]">
          Use the same week or period for all three estimates. One person-day
          means one person working for one day; two people working for a day use
          two person-days. Include review and support. These estimates show how
          much work fits; they do not calculate a delivery date.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["availableCapacity", "Time available (person-days)"],
            ["existingLoad", "Work already planned (person-days)"],
            ["requestLoad", "New work (person-days)"],
          ].map(([id, label]) => (
            <label key={id} className="text-xs font-semibold">
              {label}
              <input
                type="number"
                min="0"
                step="0.5"
                inputMode="decimal"
                value={values[id] || ""}
                onChange={e => onChange(id, e.target.value)}
                className="mt-2 w-full border border-[var(--ft-line)] bg-white p-3 text-sm"
              />
            </label>
          ))}
        </div>
        <p
          role="status"
          className="mt-4 border-t border-[var(--ft-line)] pt-4 text-sm font-semibold"
        >
          {snapshot
            ? `${Number(snapshot.total.toFixed(2))} person-days of work / ${snapshot.available} available. ${snapshot.gap > 0 ? `${Number(snapshot.gap.toFixed(2))} person-days will not fit. Let’s look at what could wait or change.` : "The estimates fit. Check that the right people are available at the right time and that nothing else must finish first."}`
            : "Enter all three estimates to see whether the work fits."}
        </p>
      </section>
    );
  }
  if (slug === "deadline-reset" && step === 1)
    return (
      <section
        aria-label="Deadline options"
        className="mb-8 grid gap-3 sm:grid-cols-3"
      >
        {[
          ["Keep the date", values.scopeMove],
          ["Keep all the promised work", values.dateMove],
          ["Add or change the help available", values.capacityMove],
        ].map(([title, detail]) => (
          <div
            key={title}
            className="border-t-2 border-[var(--ft-line)] bg-[var(--ft-tint)] p-4"
          >
            <h3 className="font-display text-xl">{title}</h3>
            <p className="mt-2 text-xs leading-6 text-[var(--ft-muted)]">
              {detail ||
                "Add an option below, then check it with the people doing the work."}
            </p>
          </div>
        ))}
      </section>
    );
  if (slug === "mandate-reset" && step === 1)
    return (
      <section
        aria-label="Current decision rights"
        className="mb-8 border border-[var(--ft-line)] bg-[var(--ft-tint)] p-5"
      >
        <h3 className="font-display text-2xl">Who needs to be involved?</h3>
        <dl className="mt-4 space-y-2 text-sm">
          {[
            ["recommend", "Recommends"],
            ["consult", "Gives advice"],
            ["requiredApprovals", "Required approval"],
            ["approve", "Makes the call"],
            ["execute", "Does the work"],
            ["block", "Sets limits"],
            ["accountable", "Answers for the result"],
          ].map(([id, label]) => (
            <div
              key={id}
              className="grid grid-cols-[110px_1fr] gap-3 border-b border-[var(--ft-line)] py-2"
            >
              <dt className="font-semibold">{label}</dt>
              <dd className="break-words text-[var(--ft-muted)]">
                {values[id] || "Still to check with the people involved"}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-6">
          Check this with the people named. This shows your understanding; any
          change to who can decide still needs agreement.
        </p>
      </section>
    );
  return null;
}
