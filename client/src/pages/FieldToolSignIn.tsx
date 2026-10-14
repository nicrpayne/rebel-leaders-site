import { useState } from "react";
import { Link } from "wouter";
import { FIELD_TOOL_OFFERS } from "@/lib/field-tools";
import { trpc } from "@/lib/trpc";
import FieldToolsNav from "@/components/field-tools/FieldToolsNav";
import { FieldToolSignIn as SignInForm } from "@/components/field-tools/FieldToolGate";
export default function FieldToolSignIn() {
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const slug = params.get("slug") || "ai-stalemate";
  const audience = params.get("audience") === "lead-dev" ? "lead-dev" : "pm";
  const [token] = useState(() =>
    new URLSearchParams(window.location.hash.slice(1)).get("token")
  );
  const redeem = trpc.fieldTools.redeemAccess.useMutation({
    onSuccess: r => {
      window.history.replaceState({}, "", "/field-tools/sign-in");
      window.location.assign(`/field-tools/${r.slug}/access`);
    },
  });
  return (
    <main className="min-h-screen bg-[var(--ft-paper)] px-5 pb-20 pt-32 text-[var(--ft-ink)]">
      <FieldToolsNav />
      {token ? (
        <div className="mx-auto max-w-xl border border-[var(--ft-line)] bg-[var(--ft-tint)] p-8">
          <h1 className="font-display text-4xl">Welcome back.</h1>
          <p className="mt-4 leading-7">
            Confirm below to open your Field Tool on this device.
          </p>
          <button
            disabled={redeem.isPending}
            className="ft-button ft-button-gold mt-6"
            onClick={() => redeem.mutate({ token })}
          >
            {redeem.isPending ? "Opening…" : "Open my Field Tool"}
          </button>
          {redeem.error && (
            <p role="alert" className="mt-5">
              {redeem.error.message}
            </p>
          )}
          <Link
            href={`/field-tools/${slug}${slug === "ai-stalemate" ? "/" + audience : ""}/access`}
            className="mt-6 block underline"
          >
            Request a fresh access link
          </Link>
        </div>
      ) : !params.get("slug") ? (
        <section className="mx-auto max-w-2xl">
          <h1 className="font-display text-4xl">
            Which tool would you like to open?
          </h1>
          <div className="mt-8 grid gap-3">
            {FIELD_TOOL_OFFERS.map(tool => (
              <Link
                key={tool.slug}
                href={`/field-tools/${tool.slug}/access`}
                className="flex min-h-14 items-center justify-between gap-4 border-b border-[var(--ft-line)] py-4 font-ui text-base"
              >
                <span>{tool.name}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <SignInForm slug={slug} audience={audience} />
      )}
    </main>
  );
}
