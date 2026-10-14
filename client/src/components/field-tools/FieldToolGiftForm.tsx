import { useState, type FormEvent } from "react";
import { ArrowRight, Gift } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { giftDetailsSchema } from "../../../../shared/field-tool-gifts";
import type { Audience } from "@/lib/field-tool-paths";

export default function FieldToolGiftForm({
  slug,
  audience,
  name,
  available,
}: {
  slug: string;
  audience: Audience;
  name: string;
  available: boolean;
}) {
  const checkout = trpc.fieldTools.giftCheckout.useMutation();
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const inputClass =
    "mt-2 block w-full rounded-sm border border-[var(--ft-line)] bg-[var(--ft-white)] p-3 text-base text-[var(--ft-ink)] outline-offset-4";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!available || checkout.isPending) return;
    setError("");
    if (
      recipientEmail.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()
    ) {
      setError(
        "Those email addresses don’t match. Please check them before continuing."
      );
      return;
    }
    const parsed = giftDetailsSchema.safeParse({
      senderName,
      recipientName,
      recipientEmail,
      message,
    });
    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ?? "Please check the gift details."
      );
      return;
    }
    try {
      const result = await checkout.mutateAsync({
        slug,
        audience,
        gift: parsed.data,
      });
      window.location.assign(result.checkoutUrl);
    } catch {
      // The mutation displays its safe, public error below.
    }
  }
  return (
    <form
      onSubmit={submit}
      className="mt-6 space-y-5 font-ui text-sm"
      aria-label="Gift details"
    >
      <div>
        <h2 className="flex items-center gap-2 font-display text-2xl">
          <Gift size={20} aria-hidden="true" /> Give them {name}.
        </h2>
        <p className="mt-3 leading-6 text-[var(--ft-muted)]">
          They get their own Field Guide and Lab. To give another gift, come
          back and choose “Gift this” again.
        </p>
      </div>
      <label className="block">
        Your name
        <input
          className={inputClass}
          autoComplete="name"
          required
          maxLength={100}
          value={senderName}
          onChange={e => setSenderName(e.target.value)}
        />
      </label>
      <label className="block">
        Their name <span className="text-[var(--ft-muted)]">(optional)</span>
        <input
          className={inputClass}
          autoComplete="off"
          maxLength={100}
          value={recipientName}
          onChange={e => setRecipientName(e.target.value)}
        />
      </label>
      <label className="block">
        Their email
        <input
          className={inputClass}
          type="email"
          autoComplete="off"
          required
          maxLength={320}
          value={recipientEmail}
          onChange={e => setRecipientEmail(e.target.value)}
        />
      </label>
      <label className="block">
        Confirm their email
        <input
          className={inputClass}
          type="email"
          autoComplete="off"
          required
          maxLength={320}
          value={confirmEmail}
          onChange={e => setConfirmEmail(e.target.value)}
        />
      </label>
      <label className="block">
        A note from you{" "}
        <span className="text-[var(--ft-muted)]">(optional)</span>
        <textarea
          className={inputClass}
          rows={4}
          maxLength={1000}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Thought this might be useful for what you’re working through."
        />
        <span className="mt-1 block text-xs text-[var(--ft-muted)]">
          {message.length} / 1,000 characters
        </span>
      </label>
      <div className="border-l-2 border-[var(--ft-accent)] pl-4 text-xs leading-6 text-[var(--ft-muted)]">
        <p>
          We’ll email their gift as soon as payment is confirmed. Use{" "}
          <strong>your own email</strong> at checkout for your receipt.
        </p>
        <p className="mt-2">
          Their Lab work stays private. Buying the gift doesn’t give you access
          to their answers.
        </p>
        {slug === "ai-stalemate" && (
          <p className="mt-2">
            Their email will open the{" "}
            {audience === "lead-dev" ? "Lead Developer" : "PM"} edition. The
            other edition is sold separately.
          </p>
        )}
      </div>
      {(error || checkout.error) && (
        <p role="alert" className="text-[var(--ft-muted)]">
          {error || checkout.error?.message}
        </p>
      )}
      <button
        type="submit"
        disabled={!available || checkout.isPending}
        className="ft-button ft-button-gold w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {checkout.isPending
          ? "Preparing your gift…"
          : "Continue to gift checkout"}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
      {!available && (
        <p role="status" className="text-xs leading-6 text-[var(--ft-muted)]">
          Gift checkout opens when purchases open. Nothing is sent or saved from
          this form yet.
        </p>
      )}
    </form>
  );
}
