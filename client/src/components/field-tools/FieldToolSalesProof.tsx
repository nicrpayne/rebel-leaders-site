import { Link } from "wouter";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import { SALES_PROOF } from "@/lib/field-tool-sales-proof";

export function AIRoleLinks({ audience }: { audience: Audience }) {
  return (
    <nav
      aria-label="AI Stalemate editions"
      className="mb-8 border-l-2 border-[#a4b591] pl-4 font-ui text-sm leading-7"
    >
      <p>
        {audience === "pm" ? "Product Manager" : "Lead Developer"} edition. Both
        editions are included.
      </p>
      <Link
        className="font-semibold underline underline-offset-4"
        href={fieldToolBase(
          "ai-stalemate",
          audience === "pm" ? "lead-dev" : "pm"
        )}
      >
        See the {audience === "pm" ? "Lead Developer" : "Product Manager"}{" "}
        edition →
      </Link>
    </nav>
  );
}

export default function FieldToolSalesProof({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const key = slug === "ai-stalemate" ? `${slug}-${audience}` : slug;
  const proof = SALES_PROOF[key];
  if (!proof) return null;
  return (
    <section
      aria-labelledby="sales-proof-title"
      className="border-y border-[#cbd4c6] bg-[#e9ebdf] px-5 py-12 text-[#193025] md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        {slug === "ai-stalemate" && <AIRoleLinks audience={audience} />}
        <p className="font-ui text-xs tracking-widest text-[#53684d]">
          INSIDE THE FIELD TOOL
        </p>
        <h2 id="sales-proof-title" className="mt-3 font-display text-4xl">
          See what you can make.
        </h2>
        <p className="mt-4 max-w-3xl font-ui text-sm leading-7">
          {proof.context}
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <figure>
            <a
              href={`/assets/field-tools/${key}-lab-preview-v3.webp`}
              target="_blank"
              rel="noreferrer"
              className="block border border-[#b0bfa8] bg-[#fbf9f3] focus-visible:outline focus-visible:outline-2"
            >
              <img
                src={`/assets/field-tools/${key}-lab-preview-v3.webp`}
                alt={`${proof.name} interactive Lab preview`}
                width={1347}
                height={850}
                loading="lazy"
                className="h-auto w-full"
              />
            </a>
            <figcaption className="mt-3 font-ui text-xs leading-6 text-[#536058]">
              A real Lab screen. Select the image to enlarge it.
            </figcaption>
          </figure>
          <article
            className="border border-[#b0bfa8] bg-[#fffdf7] p-6 md:p-8"
            aria-label={`${proof.title} example`}
          >
            <p className="font-ui text-xs tracking-widest text-[#617457]">
              FICTIONAL EXAMPLE · EXCERPT
            </p>
            <h3 className="mt-3 font-display text-3xl">{proof.title}</h3>
            <div className="mt-5 space-y-5">
              {proof.sections.map(section => (
                <div key={section.title}>
                  <h4 className="font-ui text-xs font-semibold tracking-wide text-[#526849]">
                    {section.title}
                  </h4>
                  <p className="mt-2 whitespace-pre-line font-ui text-sm leading-6">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-[#d1d8c9] pt-4 font-ui text-xs leading-6 text-[#61705e]">
              The Lab turns your answers into a document you can review, copy,
              download, or print.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function FieldToolBuyerQuestions() {
  const questions = [
    [
      "Who is this for?",
      "Product managers and people leading teams who need to talk through a difficult request or decision. AI Stalemate has separate editions for Product Managers and Lead Developers.",
    ],
    [
      "What won’t it do?",
      "It will not make a plan or decision for you. Use what you know about your situation, check what you are unsure of, and talk with the people who need to decide.",
    ],
    [
      "Where does my work save?",
      "Shared answers save in this browser on this device. They do not sync between browsers or devices. Private reflection stays only in the open tab and is neither saved nor exported. Export shared work before clearing browser data or changing devices.",
    ],
    [
      "How does access work?",
      "After purchase, use your email—or the email your gift was sent to—to request a sign-in link.",
    ],
    [
      "Can I give this to someone?",
      "Yes. Choose Gift this beside Buy. Add their email and an optional note, then pay using your own email. They get access; you get the receipt. You can buy another gift at any time, even if you own the tool. Each person needs a separate checkout. Gift checkout opens when purchases open.",
    ],
    [
      "Do I need an AI subscription?",
      "No. You write the answers. The Lab puts them into documents you can review, copy, download, or print.",
    ],
    [
      "Is the walkthrough a video?",
      "It is a written example you can follow one step at a time. You can load its answers into the Lab to see how it works.",
    ],
  ];
  return (
    <section
      aria-labelledby="buyer-questions"
      className="bg-[#f3efe4] px-5 py-12 text-[#193025] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="buyer-questions" className="font-display text-3xl">
          Before you choose
        </h2>
        <div className="mt-6 grid gap-x-10 md:grid-cols-2">
          {questions.map(([question, answer]) => (
            <details key={question} className="border-t border-[#c2ccba] py-5">
              <summary className="cursor-pointer font-ui font-semibold">
                {question}
              </summary>
              <p className="mt-3 font-ui text-sm leading-7 text-[#536058]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
