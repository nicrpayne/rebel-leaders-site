import { Link } from "wouter";
const choices = [
  [
    "deadline-reset",
    "A date has been promised; the delivery basis is unclear.",
    "Deadline Reset",
    "Stakeholder Update",
  ],
  [
    "priority-whiplash",
    "A new request competes with work already committed.",
    "Priority Whiplash",
    "Tradeoff Brief",
  ],
  [
    "mandate-reset",
    "You own the outcome but cannot make the needed decision.",
    "Mandate Reset",
    "Reset Request",
  ],
  [
    "product-project-translator",
    "A stakeholder needs certainty before the solution is known.",
    "Product / Project Translator",
    "Commitment Card",
  ],
] as const;
export default function FieldToolChooser() {
  return (
    <section className="bg-[#fbf9f3] px-5 py-12 text-[#193025] md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl">Which Field Tool fits?</h2>
        <p className="mt-3 max-w-3xl font-ui text-sm leading-7">
          Start with the decision blocking your next conversation. If several
          pressures overlap, work on that one first.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[580px] text-left font-ui text-sm">
            <caption className="sr-only">
              Choose a Field Tool by the pressure and the output you need
            </caption>
            <thead>
              <tr className="border-b border-[#b8c7ac]">
                <th scope="col" className="py-3 pr-5">
                  What is stuck?
                </th>
                <th scope="col" className="py-3 pr-5">
                  Start here
                </th>
                <th scope="col" className="py-3">
                  Leave with
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#d5dccc]">
                <td className="py-5 pr-5">
                  Product and Engineering need a responsible next move on AI.
                </td>
                <td className="py-5 pr-5">
                  <Link
                    className="underline"
                    href="/field-tools/ai-stalemate/pm"
                  >
                    AI Stalemate / PM
                  </Link>
                  <br />
                  <Link
                    className="underline"
                    href="/field-tools/ai-stalemate/lead-dev"
                  >
                    AI Stalemate / Lead Developer
                  </Link>
                </td>
                <td className="py-5">Shared Next-Step Brief</td>
              </tr>
              {choices.map(([slug, pressure, title, output]) => (
                <tr key={slug} className="border-b border-[#d5dccc]">
                  <td className="py-5 pr-5">{pressure}</td>
                  <td className="py-5 pr-5">
                    <Link
                      className="underline underline-offset-4"
                      href={`/field-tools/${slug}`}
                    >
                      {title}
                    </Link>
                  </td>
                  <td className="py-5">{output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
