import { useState } from "react";
import { Link, useLocation } from "wouter";
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
    <main className="min-h-screen bg-[#07110d] px-5 pb-20 pt-32 text-[#f3efe4]">
      <FieldToolsNav />
      {token ? (
        <div className="mx-auto max-w-xl border border-[#60775a] bg-[#12281b] p-8">
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
      ) : (
        <SignInForm slug={slug} audience={audience} />
      )}
    </main>
  );
}
