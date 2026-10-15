import { Link } from "wouter";
const choices = [
  [
    "deadline-reset",
    "Someone promised a date. You’re not sure the team can meet it.",
    "Deadline Reset",
    "Decision Update",
  ],
  [
    "priority-whiplash",
    "Someone wants more work. The team is already busy.",
    "Priority Whiplash",
    "Priority Decision Brief",
  ],
  [
    "mandate-reset",
    "You’re responsible, but the decision is out of your hands.",
    "Mandate Reset",
    "Decision Request",
  ],
  [
    "when-the-team-goes-quiet",
    "Concerns come out after the meeting, instead of in it.",
    "When the Team Goes Quiet",
    "Your Follow-through",
  ],
] as const;
export default function FieldToolChooser() {
  return (
    <section className="bg-[var(--ft-white)] px-5 py-12 text-[var(--ft-ink)] md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl">Which Field Tool fits?</h2>
        <p className="mt-3 max-w-3xl font-ui text-sm leading-7">
          Choose the situation you need help with now.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[580px] text-left font-ui text-sm">
            <caption className="sr-only">
              Choose a Field Tool by the pressure and the output you need
            </caption>
            <thead>
              <tr className="border-b border-[var(--ft-line)]">
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
              <tr className="border-b border-[var(--ft-line)]">
                <td className="py-5 pr-5">
                  You and your colleague disagree about using AI.
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
                <td className="py-5">Next Step Together</td>
              </tr>
              {choices.map(([slug, pressure, title, output]) => (
                <tr key={slug} className="border-b border-[var(--ft-line)]">
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
