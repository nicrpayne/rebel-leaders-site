import { fieldToolKitLabel } from "@shared/field-tool-public-copy";
import FieldToolLink from "@/components/field-tools/FieldToolLink";
import { useEffect, useRef, useState } from "react";
import { AVAILABLE_FIELD_TOOL_OFFERS } from "@/lib/field-tools";
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
  const attempted = useRef(false);
  const redeem = trpc.fieldTools.redeemAccess.useMutation({
    onSuccess: r => {
      if (!r.needsConfirmation) window.location.replace(`/field-tools/${r.slug}/access`);
    },
  });
  const { mutate } = redeem;
  useEffect(() => {
    // Wait for the buyer to open the tab before spending a single-use link.
    function openWhenVisible() {
      if (!token || document.visibilityState !== "visible" || attempted.current) return;
      attempted.current = true;
      mutate({ token, automatic: true });
    }
    openWhenVisible();
    document.addEventListener("visibilitychange", openWhenVisible);
    return () => document.removeEventListener("visibilitychange", openWhenVisible);
  }, [mutate, token]);

  return (
    <>
      <FieldToolsNav />
      <main className="min-h-screen bg-[var(--ft-paper)] px-5 pb-20 pt-14 text-[var(--ft-ink)]">
        {token ? (
          <div className="mx-auto max-w-xl border border-[var(--ft-line)] bg-[var(--ft-tint)] p-8">
            {redeem.error ? (
              <>
                <h1 className="font-display text-4xl">Let’s get you a fresh link.</h1>
                <p role="alert" className="mt-4 leading-7">{redeem.error.message}</p>
                <FieldToolLink
                  href={`/field-tools/${slug}${slug === "ai-stalemate" ? "/" + audience : ""}/access`}
                  className="ft-button ft-button-gold mt-6"
                >
                  Go to my welcome page
                </FieldToolLink>
              </>
            ) : redeem.data?.needsConfirmation ? (
              <>
                <h1 className="font-display text-4xl">Sign in on this browser.</h1>
                <p className="mt-4 leading-7">
                  Open your welcome page to get to your {fieldToolKitLabel(slug)}.
                </p>
                <button disabled={redeem.isPending} className="ft-button ft-button-gold mt-6" onClick={() => mutate({ token })}>
                  Sign in
                </button>
              </>
            ) : (
              <p role="status" className="font-display text-3xl">Opening your welcome page…</p>
            )}
          </div>
        ) : !params.get("slug") ? (
          <section className="mx-auto max-w-2xl">
            <h1 className="font-display text-4xl">
              Which tool would you like to open?
            </h1>
            <div className="mt-8 grid gap-3">
              {AVAILABLE_FIELD_TOOL_OFFERS.map(tool => (
                <FieldToolLink
                  key={tool.slug}
                  href={`/field-tools/${tool.slug}/access`}
                  className="flex min-h-14 items-center justify-between gap-4 border-b border-[var(--ft-line)] py-4 font-ui text-base"
                >
                  <span>{tool.name}</span>
                  <span aria-hidden="true">→</span>
                </FieldToolLink>
              ))}
            </div>
          </section>
        ) : (
          <SignInForm slug={slug} audience={audience} />
        )}
      </main>
    </>
  );
}
