import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";

export default function FieldToolTerms() {
  return (
    <div className="ft-theme bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolsNav />
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-10 md:py-16">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">Field Tools terms</h1>
        <p className="mt-4 font-ui text-base leading-7">
          Feel free to share what you make with your team. That includes the notes you write, the questions you bring to a meeting, and any plan you build in a Lab. Your teammates can read and use that work without buying a copy.
        </p>
        <p className="mt-4 font-ui text-base leading-7">
          The Field Guide, including the PDF, and access to the Labs are for one person. That’s you if you bought the tool for yourself, or the recipient if you bought it as a gift. Please keep the Guide and sign-in links with that person.
        </p>
        <h2 className="mt-10 font-display text-3xl">Purchases and refunds</h2>
        <p className="mt-4 font-ui text-base leading-7">
          Each edition is a one-time purchase. If it isn’t useful, email <a className="underline underline-offset-4" href="mailto:hello@rebel-leader.com">hello@rebel-leader.com</a> within 60 days of purchase for a full refund. Just include the email used at checkout. You don’t need to give a reason.
        </p>
        <p className="mt-4 font-ui text-base leading-7">
          Refunds go back to the original payment method, including for gifts. A full refund ends online access for that purchase. You keep any rights you have under applicable law. <a className="underline underline-offset-4" href="https://tools.rebel-leader.com/field-tools/purchase-help">Purchase and access help</a>
        </p>
      </main>
      <FieldToolsFooter />
    </div>
  );
}
