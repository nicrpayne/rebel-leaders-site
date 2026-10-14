import { Link } from "wouter";
import { fieldToolForPath, type Audience } from "@/lib/field-tool-paths";
import CompactFieldToolLanding from "@/components/field-tools/CompactFieldToolLanding";
import AIProductPage from "@/components/field-tools/AIProductPage";
export default function FieldToolLanding({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  if (!fieldToolForPath(slug, audience)) {
    return (
      <main className="min-h-screen bg-[var(--ft-paper)] px-6 py-24 text-[var(--ft-ink)]">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-5xl">
            That tool isn't on the bench yet.
          </h1>
          <Link href="/field-tools" className="mt-8 inline-block underline">
            Browse Field Tools →
          </Link>
        </div>
      </main>
    );
  }
  if (slug === "ai-stalemate")
    return <AIProductPage audience={audience} />;
  return <CompactFieldToolLanding slug={slug} audience={audience} />;
}
