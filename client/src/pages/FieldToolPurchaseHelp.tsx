import { Link } from "wouter";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import FieldToolsFooter from "@/components/field-tools/FieldToolsFooter";

export default function FieldToolPurchaseHelp() {
  return (
    <main className="min-h-screen bg-[var(--ft-paper)] text-[var(--ft-ink)]">
      <FieldToolsNav />
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:px-10">
        <p className="font-ui text-xs tracking-[.18em] text-[var(--ft-muted)]">
          REBEL LEADERS / FIELD TOOLS
        </p>
        <h1 className="mt-5 font-display text-4xl md:text-5xl">
          Your purchase, access, and refunds.
        </h1>
        <div className="mt-10 space-y-10 font-ui text-sm leading-7">
          <section id="refunds">
            <h2 className="font-display text-3xl">Try it for 60 days.</h2>
            <p className="mt-4">
              If it isn’t useful to you, email{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:hello@rebel-leader.com"
              >
                hello@rebel-leader.com
              </a>{" "}
              within 60 days of purchase and we’ll refund you in full. No
              explanation needed.
            </p>
            <p className="mt-3">
              Include the email used at checkout so we can find your order. You
              don’t need to finish the Guide or Lab, show your work, or prove
              that you tried it.
            </p>
            <p className="mt-3">
              Refunds are processed through Lemon Squeezy to the original
              payment method. For gifts, the refund goes to the purchaser. A
              full refund ends online access from that purchase. This guarantee
              does not limit any rights you have under applicable law.
            </p>
          </section>
          <section>
            <h2 className="font-display text-3xl">What you’re buying</h2>
            <p className="mt-4">
              Each Field Tool is a one-time purchase of its Guide, downloadable
              PDF, and interactive Lab. There is no subscription. AI Stalemate’s
              PM and Lead Developer editions are separate $47 USD purchases;
              buying one does not unlock the other. Any tax is shown at
              checkout.
            </p>
            <p className="mt-3">
              Use the tool yourself and share the notes or plans you create with
              the people involved. The purchase does not include live coaching,
              shared editing, or a guarantee that another person will agree with
              your recommendation.
            </p>
          </section>
          <section id="access">
            <h2 className="font-display text-3xl">Getting back to your tool</h2>
            <p className="mt-4">
              Follow the link in your purchase receipt and use your checkout
              email to request a sign-in link. Gift recipients use the email the
              gift was sent to. You can sign in on another device to read the
              Guide or use the Lab.
            </p>
            <p className="mt-3">
              If you can’t find your receipt or access email, check your spam
              folder, then contact{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:hello@rebel-leader.com"
              >
                hello@rebel-leader.com
              </a>
              . Include your purchase email or order number. Please don’t send
              payment-card details or private workplace notes.
            </p>
          </section>
          <section id="drafts">
            <h2 className="font-display text-3xl">
              Your draft stays in your browser
            </h2>
            <p className="mt-4">
              Lab drafts save in the browser and device where you write them.
              Signing in elsewhere does not move those answers across. Clearing
              browser data can remove them. Copy or download anything you want
              to keep.
            </p>
            <p className="mt-3">
              Private reflection stays only in the open Lab tab. It is excluded
              from saved drafts and shared outputs, and disappears when you
              refresh or leave. Review your exported notes before sharing them.
            </p>
          </section>
          <Link
            href="/field-tools"
            className="inline-block text-[var(--ft-accent)] underline underline-offset-4"
          >
            Back to the Field Tools →
          </Link>
        </div>
      </article>
      <FieldToolsFooter />
    </main>
  );
}
