import FieldToolLink from "@/components/field-tools/FieldToolLink";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import { SALES_PROOF } from "@/lib/field-tool-sales-proof";
import FieldToolScreenPreview from "./FieldToolScreenPreview";

export function AIRoleLinks({ audience }: { audience: Audience }) {
  return (
    <nav
      aria-label="AI Stalemate editions"
      className="mb-8 border-l-2 border-[var(--ft-line)] pl-4 font-ui text-sm leading-7"
    >
      <p>
        {audience === "pm" ? "Product Manager" : "Lead Developer"} edition ·
        $47. Each edition is sold separately.
      </p>
      <FieldToolLink
        className="font-semibold underline underline-offset-4"
        href={fieldToolBase(
          "ai-stalemate",
          audience === "pm" ? "lead-dev" : "pm"
        )}
      >
        See the {audience === "pm" ? "Lead Developer" : "Product Manager"}{" "}
        edition →
      </FieldToolLink>
    </nav>
  );
}

export default function FieldToolSalesProof({
  slug,
  audience = "pm",
  showRoleLinks = true,
}: {
  slug: string;
  audience?: Audience;
  showRoleLinks?: boolean;
}) {
  const key = slug === "ai-stalemate" ? `${slug}-${audience}` : slug;
  const proof = SALES_PROOF[key];
  if (!proof) return null;
  const device =
    key === "ai-stalemate-lead-dev" || key === "when-the-team-goes-quiet"
      ? "phone"
      : "laptop";
  return (
    <section aria-labelledby="sales-proof-title" className="ft-sales-proof">
      <div className="ft-sales-proof-inner">
        {slug === "ai-stalemate" && showRoleLinks && (
          <AIRoleLinks audience={audience} />
        )}
        <div className="ft-sales-proof-heading">
          <p className="font-ui text-xs tracking-widest text-[var(--ft-muted)]">
            INSIDE THE FIELD TOOL
          </p>
          <h2 id="sales-proof-title" className="mt-3 font-display text-4xl">
            See what you can make.
          </h2>
          <p className="mt-4 max-w-3xl font-ui text-sm leading-7">
            {proof.context}
          </p>
        </div>
        <div className={`ft-sales-proof-grid ft-sales-proof-grid--${device}`}>
          <FieldToolScreenPreview productKey={key} device={device} />
          <article
            className="ft-proof-document"
            aria-label={`${proof.title} example`}
          >
            <p className="font-ui text-xs tracking-widest text-[var(--ft-muted)]">
              FICTIONAL EXAMPLE · EXCERPT
            </p>
            <h3 className="mt-3 font-display text-3xl">{proof.title}</h3>
            <div className="mt-5 space-y-5">
              {proof.sections.map(section => (
                <div key={section.title}>
                  <h4 className="font-ui text-xs font-semibold tracking-wide text-[var(--ft-muted)]">
                    {section.title}
                  </h4>
                  <p className="mt-2 whitespace-pre-line font-ui text-sm leading-6">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function FieldToolBuyerQuestions({
  audience,
}: {
  audience?: Audience;
} = {}) {
  const edition =
    audience === "lead-dev" ? "Lead Developer" : "Product Manager";
  const counterpart =
    audience === "lead-dev" ? "your PM" : "your lead developer";
  const questions = [
    ...(audience
      ? [
          [
            "Do we both need to buy an edition?",
            `No. Choose the ${edition} edition for your role. You can use it on your own and share your questions and exported notes with ${counterpart}. They don’t need to buy anything to join the conversation. Each purchase gives one person access to their own Guide and interactive tools.`,
          ],
        ]
      : []),
    [
      "Who is this for?",
      audience === "lead-dev"
        ? "Lead developers and engineering leads whose PM is asking the team to build and ship differently with AI. You need to work through security, user access, and what the team can realistically take on—then bring a useful recommendation to your PM."
        : audience === "pm"
          ? "Product managers who see an opportunity for AI and need to work through it with their lead developer. You want to explain why it matters, understand the engineering concerns, and find a useful next step together."
          : "Product managers and people leading teams who need to talk through a difficult request or decision. AI Stalemate has separate editions for Product Managers and Lead Developers.",
    ],
    [
      "What won’t it do?",
      audience === "lead-dev"
        ? "It won’t assess your codebase or make an engineering decision for you. It helps you clarify what you know, what still needs checking, and what you recommend to your PM."
        : audience === "pm"
          ? "It won’t prove the business case or make the decision for you. It helps you explain the opportunity, check your assumptions, and prepare a conversation with your lead developer."
          : "It will not make a plan or decision for you. Use what you know about your situation, check what you are unsure of, and talk with the people who need to decide.",
    ],
    [
      "Where does my work save?",
      audience
        ? "Your conversation notes and delivery map save in this browser on this device. They do not sync between browsers or devices. Private reflection in the Conversation Companion stays only in the open tab and is neither saved nor exported. Download your notes before clearing browser data or changing devices."
        : "Shared answers save in this browser on this device. They do not sync between browsers or devices. Private reflection stays only in the open tab and is neither saved nor exported. Export shared work before clearing browser data or changing devices.",
    ],
    [
      "How does access work?",
      audience
        ? `After purchase, use your email—or the email your gift was sent to—to request a sign-in link. It opens the ${edition} Guide and both Lab paths. The other edition is sold separately.`
        : "After purchase, use your email—or the email your gift was sent to—to request a sign-in link.",
    ],
    [
      "Can I give this to someone?",
      `${audience ? `Yes. Choose Gift this to give someone the ${edition} edition.` : "Yes. Choose Gift this beside Buy."} Add their email and an optional note, then pay using your own email. They get access; you get the receipt. You can buy another gift at any time, even if you own the tool. Each person needs a separate checkout. Gift checkout opens when purchases open.`,
    ],
    [
      "Do I need an AI subscription?",
      audience
        ? `No. You make the choices and write the notes. The Lab helps you explore delivery problems and prepare a next step to discuss with ${counterpart}. You can copy or download your work.`
        : "No. You write the answers. The Lab puts them into documents you can review, copy, download, or print.",
    ],
    [
      "Is the walkthrough a video?",
      audience
        ? `The ${edition} examples are written. You can load sample answers into the Conversation Companion or try the review-delay example in the Delivery Map.`
        : "It is a written example you can follow one step at a time. You can load its answers into the Lab to see how it works.",
    ],
  ];
  return (
    <section
      aria-labelledby="buyer-questions"
      className="bg-[var(--ft-paper)] px-5 py-12 text-[var(--ft-ink)] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="buyer-questions" className="font-display text-3xl">
          Before you choose
        </h2>
        <div className="mt-6 grid gap-x-10 md:grid-cols-2">
          {questions.map(([question, answer]) => (
            <details
              key={question}
              className="border-t border-[var(--ft-line)] py-5"
            >
              <summary className="cursor-pointer font-ui font-semibold">
                {question}
              </summary>
              <p className="mt-3 font-ui text-sm leading-7 text-[var(--ft-muted)]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
