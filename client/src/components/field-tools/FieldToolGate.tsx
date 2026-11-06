import { fieldToolKitLabel } from "@shared/field-tool-public-copy";
import FieldToolLink from "@/components/field-tools/FieldToolLink";
import { ownsFieldTool } from "../../../../shared/field-tool-entitlements";
import type { Audience } from "@/lib/field-tool-paths";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MailCheck } from "lucide-react";
import { trpc } from "@/lib/trpc";
import FieldToolsNav from "./FieldToolsNav";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../../server/routers";

type Content = inferRouterOutputs<AppRouter>["fieldTools"]["content"];
const ContentContext = createContext<Content | null>(null);
export function useFieldToolContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("Field Tool content is not loaded");
  return value;
}
export function FieldToolSignIn({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [sendCount, setSendCount] = useState(0);
  const [resendAt, setResendAt] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const confirmationHeading = useRef<HTMLHeadingElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const request = trpc.fieldTools.requestAccess.useMutation();

  useEffect(() => {
    if (!resendAt) return;
    const update = () => {
      const remaining = Math.max(0, Math.ceil((resendAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (!remaining) setResendAt(0);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [resendAt]);

  useEffect(() => {
    if (sentTo) confirmationHeading.current?.focus();
    else if (sendCount) emailInput.current?.focus();
  }, [sentTo, sendCount]);

  function sendLink(address: string) {
    if (request.isPending) return;
    const submittedEmail = address.trim().toLowerCase();
    request.mutate(
      { email: submittedEmail, slug, audience },
      {
        onSuccess: () => {
          setSendCount(sentTo === submittedEmail ? sendCount + 1 : 1);
          setSentTo(submittedEmail);
          setSecondsLeft(30);
          setResendAt(Date.now() + 30_000);
        },
      }
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-[var(--ft-line)] bg-[var(--ft-tint)] p-7 text-[var(--ft-ink)] sm:p-10">
      <p className="mb-4 font-ui text-xs uppercase tracking-widest text-[var(--ft-accent)]">
        {slug === "ai-stalemate"
          ? `AI Stalemate · ${audience === "pm" ? "Product Manager" : "Lead Developer"}`
          : "Rebel Leaders Field Tools"}
      </p>
      {sentTo ? (
        <>
          <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--ft-line)] bg-[var(--ft-paper)] text-[var(--ft-accent)]">
            <MailCheck size={26} aria-hidden="true" />
          </div>
          <div role="status" aria-live="polite" aria-atomic="true">
            <h1
              ref={confirmationHeading}
              tabIndex={-1}
              className="mt-6 font-display text-4xl outline-none"
            >
              {sendCount > 1 ? "Check your inbox again." : "Check your inbox."}
            </h1>
            <p className="mt-4 font-ui text-sm leading-7 text-[var(--ft-muted)]">
              {sendCount > 1
                ? "We’ve requested another sign-in link for:"
                : "You’ve requested a sign-in link for:"}
            </p>
            <p className="mt-1 break-words font-ui text-base font-semibold text-[var(--ft-ink)]">
              {sentTo}
            </p>
            <p className="mt-4 font-ui text-sm leading-7 text-[var(--ft-muted)]">
              If this email has access to this edition, your link is on its way.
              Open it to get into your {fieldToolKitLabel(slug)}.
            </p>
          </div>
          <p className="mt-5 font-ui text-sm leading-7 text-[var(--ft-muted)]">
            Give it a minute, and check Spam or Promotions too. Look for an
            email from{" "}
            <span className="break-words">hello@rebel-leader.com</span>.
          </p>
          <div className="mt-7 flex flex-col items-start gap-4">
            <button
              type="button"
              disabled={request.isPending || secondsLeft > 0}
              onClick={() => sendLink(sentTo)}
              className="ft-button ft-button-gold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {request.isPending
                ? "Sending again…"
                : secondsLeft > 0
                  ? `Resend available in ${secondsLeft}s`
                  : "Resend access link"}
            </button>
            <button
              type="button"
              disabled={request.isPending}
              onClick={() => {
                setSentTo(null);
                request.reset();
              }}
              className="font-ui text-sm text-[var(--ft-accent)] underline underline-offset-4 disabled:opacity-60"
            >
              Use a different email
            </button>
          </div>
          <p className="mt-5 font-ui text-xs leading-6 text-[var(--ft-muted)]">
            Just purchased? Payment confirmation can take a moment. If nothing
            arrives, check that you used your checkout or gift email, then
            resend.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-display text-4xl">Glad you’re here.</h1>
          <p className="mt-4 font-ui text-sm leading-7 text-[var(--ft-muted)]">
            Let’s get you into your {fieldToolKitLabel(slug)}. Use the email you entered at
            checkout, or the email your gift was sent to. We’ll send you a
            secure sign-in link—no password to remember.
          </p>
          <p className="mt-3 font-ui text-xs leading-6 text-[var(--ft-muted)]">
            Bought this as a gift? We email the recipient after payment. They
            use their own email here.
          </p>
          <form
            className="mt-6"
            onSubmit={e => {
              e.preventDefault();
              sendLink(email);
            }}
          >
            <label className="block font-ui text-sm">
              Your email
              <input
                ref={emailInput}
                type="email"
                name="email"
                autoComplete="email"
                disabled={request.isPending}
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-2 w-full bg-[var(--ft-white)] p-4 text-[var(--ft-ink)]"
              />
            </label>
            <button
              disabled={request.isPending}
              className="ft-button ft-button-gold mt-5"
            >
              {request.isPending ? "Sending…" : "Email my access link"}
            </button>
          </form>
        </>
      )}
      {request.error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-[var(--ft-line)] bg-[var(--ft-paper)] p-4 font-ui text-sm leading-6"
        >
          {request.error.message}
        </p>
      )}
      <p className="mt-5 font-ui text-xs leading-6 text-[var(--ft-muted)]">
        Your sign-in link works once and expires in 15 minutes. You can request another anytime.
      </p>
      <p className="mt-6 font-ui text-xs leading-6 text-[var(--ft-muted)]">
        Trouble getting in?{" "}
        <FieldToolLink className="underline" href="mailto:hello@rebel-leader.com">
          Email hello@rebel-leader.com
        </FieldToolLink>
        .{" "}
        <FieldToolLink className="underline" href="/field-tools/purchase-help">
          Access and refund help
        </FieldToolLink>
        .
      </p>
    </div>
  );
}
export default function FieldToolGate({
  slug,
  children,
  audience = "pm",
}: {
  slug: string;
  children: ReactNode;
  audience?: Audience;
}) {
  const access = trpc.fieldTools.access.useQuery(undefined, { retry: false });
  const allowed = Boolean(
    access.data?.preview ||
      ownsFieldTool(access.data?.slugs ?? [], slug, audience)
  );
  const content = trpc.fieldTools.content.useQuery(
    { slug, audience },
    { enabled: allowed, retry: false }
  );
  if (allowed && content.data)
    return (
      <ContentContext.Provider value={content.data}>
        {access.data?.preview && (
          <div className="ft-review-notice fixed bottom-0 inset-x-0 z-50 bg-[var(--ft-tint)] px-4 py-2 text-center font-ui text-xs text-[var(--ft-ink)] print:hidden">
            Review preview · purchase verification is disabled here.
          </div>
        )}
        {children}
      </ContentContext.Provider>
    );
  return (
    <>
      <FieldToolsNav />
      <main className="min-h-screen bg-[var(--ft-paper)] px-5 pb-20 pt-14">
        {access.isPending || (allowed && content.isPending) ? (
          <div
            role="status"
            aria-live="polite"
            className="mx-auto max-w-4xl border border-[var(--ft-line)] bg-[var(--ft-tint)] p-8 text-[var(--ft-ink)]"
          >
            <p className="font-display text-3xl">Opening your Field Tool…</p>
            <p className="mt-3 font-ui text-sm text-[var(--ft-muted)]">
              Checking access and loading your {fieldToolKitLabel(slug)}.
            </p>
            <div
              aria-hidden="true"
              className="mt-8 grid gap-5 md:grid-cols-[1fr_2fr]"
            >
              <div className="h-28 bg-white/5" />
              <div className="h-56 bg-white/10" />
            </div>
          </div>
        ) : access.error || content.error ? (
          <div className="mx-auto max-w-xl text-[var(--ft-ink)]">
            <p role="alert">We couldn’t open your tool. Please try again.</p>
            <button
              className="ft-button mt-5"
              onClick={() => {
                access.refetch();
                content.refetch();
              }}
            >
              Try again
            </button>
          </div>
        ) : (
          <FieldToolSignIn slug={slug} audience={audience} />
        )}
      </main>
    </>
  );
}
