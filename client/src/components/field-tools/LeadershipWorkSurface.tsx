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
        className="mb-8 border border-[#bac8b4] bg-[#e9eddf] p-5"
      >
        <p className="font-ui text-[10px] tracking-[.15em] text-[#59705d]">
          OPTIONAL / CHECK THE CAPACITY ASSUMPTIONS
        </p>
        <h3 className="mt-3 font-display text-2xl">
          Does the new ask fit the entered capacity?
        </h3>
        <p className="mt-2 text-xs leading-6 text-[#57695d]">
          Use person-days for one shared planning window. Include review and
          support. This is a capacity check, not a delivery forecast.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["availableCapacity", "Available person-days"],
            ["existingLoad", "Existing work person-days"],
            ["requestLoad", "New request person-days"],
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
                className="mt-2 w-full border border-[#afbea6] bg-white p-3 text-sm"
              />
            </label>
          ))}
        </div>
        <p
          role="status"
          className="mt-4 border-t border-[#bbc8b1] pt-4 text-sm font-semibold"
        >
          {snapshot
            ? `${Number(snapshot.total.toFixed(2))} person-days of demand / ${snapshot.available} available. ${snapshot.gap > 0 ? `${Number(snapshot.gap.toFixed(2))} person-days need displacement or a revised plan.` : "No numeric gap in these assumptions. Check skills, dependencies, and timing."}`
            : "Capacity remains unknown until all three estimates are entered."}
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
          ["Keep the scope", values.dateMove],
          ["Change capacity", values.capacityMove],
        ].map(([title, detail]) => (
          <div
            key={title}
            className="border-t-2 border-[#b29548] bg-[#e9eddf] p-4"
          >
            <h3 className="font-display text-xl">{title}</h3>
            <p className="mt-2 text-xs leading-6 text-[#57695d]">
              {detail ||
                "Describe this option below. Check it with the delivery team."}
            </p>
          </div>
        ))}
      </section>
    );
  if (slug === "mandate-reset" && step === 1)
    return (
      <section
        aria-label="Current decision rights"
        className="mb-8 border border-[#bac8b4] bg-[#e9eddf] p-5"
      >
        <h3 className="font-display text-2xl">
          One decision. Five different roles.
        </h3>
        <dl className="mt-4 space-y-2 text-sm">
          {[
            ["recommend", "Recommends"],
            ["approve", "Decides"],
            ["execute", "Executes"],
            ["block", "Constrains"],
            ["accountable", "Accountable"],
          ].map(([id, label]) => (
            <div
              key={id}
              className="grid grid-cols-[110px_1fr] gap-3 border-b border-[#c6cfbf] py-2"
            >
              <dt className="font-semibold">{label}</dt>
              <dd className="break-words text-[#57695d]">
                {values[id] || "Unknown — confirm with the people involved"}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-6">
          This map records your understanding. It does not grant authority.
        </p>
      </section>
    );
  if (slug === "product-project-translator" && step === 0)
    return (
      <section
        aria-label="Request starters"
        className="mb-8 border border-[#bac8b4] bg-[#e9eddf] p-5"
      >
        <h3 className="font-display text-2xl">
          Which sentence sounds familiar?
        </h3>
        <p className="mt-2 text-xs leading-6">
          Choose a starter while the request is blank, then make it your own.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Give me the final requirements.",
            "Just give me a committed date.",
            "We need the complete roadmap.",
            "What can we tell the customer?",
          ].map(text => (
            <button
              type="button"
              key={text}
              disabled={Boolean(values.request?.trim())}
              onClick={() => onChange("request", text)}
              className="border border-[#9aac91] bg-[#fbf9f3] p-3 text-left text-xs disabled:opacity-40"
            >
              {text}
            </button>
          ))}
        </div>
      </section>
    );
  return null;
}
