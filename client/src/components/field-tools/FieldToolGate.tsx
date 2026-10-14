import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Link } from "wouter";
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
  const request = trpc.fieldTools.requestAccess.useMutation();
  return (
    <div className="mx-auto max-w-xl border border-[#60775a] bg-[#12281b] p-7 text-[#f3efe4]">
      <h1 className="font-display text-4xl">Open your Field Tool</h1>
      <p className="mt-4 font-ui text-sm leading-7 text-[#b8c9b8]">
        Use the email you entered at checkout, or the email your gift was sent
        to. We’ll send you a secure sign-in link.
      </p>
      <p className="mt-3 font-ui text-xs leading-6 text-[#b8c9b8]">Bought this as a gift? We email the recipient after payment. They use their own email here.</p>
      <form
        className="mt-6"
        onSubmit={e => {
          e.preventDefault();
          request.mutate({ email, slug, audience });
        }}
      >
        <label className="block font-ui text-sm">
          Your email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-2 w-full bg-[#fffdf7] p-4 text-[#193025]"
          />
        </label>
        <button
          disabled={request.isPending}
          className="ft-button ft-button-gold mt-5"
        >
          {request.isPending ? "Sending…" : "Email my access link"}
        </button>
      </form>
      {request.isSuccess && (
        <p role="status" className="mt-5 text-sm leading-7">
          If this email has access to this tool, an access link is on its way.
          If the purchase was just made, allow a moment for payment confirmation
          and try again.
        </p>
      )}
      {request.error && (
        <p role="alert" className="mt-5 text-sm">
          {request.error.message}
        </p>
      )}
      <div className="mt-6 flex gap-5 text-sm underline">
        <Link href={`${fieldToolBase(slug, audience)}/buy`}>
          Get this Field Tool
        </Link>
        <Link href={fieldToolBase(slug, audience)}>Back to the product</Link>
      </div>
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
    access.data?.preview || access.data?.slugs.includes(slug)
  );
  const content = trpc.fieldTools.content.useQuery(
    { slug, audience },
    { enabled: allowed, retry: false }
  );
  if (allowed && content.data)
    return (
      <ContentContext.Provider value={content.data}>
        {access.data?.preview && (
          <div className="fixed bottom-0 inset-x-0 z-50 bg-[#d9b34d] px-4 py-2 text-center font-ui text-xs text-[#193025] print:hidden">
            Review preview · purchase verification is disabled here.
          </div>
        )}
        {children}
      </ContentContext.Provider>
    );
  return (
    <main className="min-h-screen bg-[#07110d] px-5 pb-20 pt-32">
      <FieldToolsNav />
      {access.isPending || (allowed && content.isPending) ? (
        <div
          role="status"
          aria-live="polite"
          className="mx-auto max-w-4xl border border-[#60775a] bg-[#12281b] p-8 text-[#f3efe4]"
        >
          <p className="font-display text-3xl">Opening your Field Tool…</p>
          <p className="mt-3 font-ui text-sm text-[#b8c9b8]">
            Checking access and loading your Guide and Lab.
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
        <div className="mx-auto max-w-xl text-[#f3efe4]">
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
  );
}
