import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { FIELD_TOOL_OFFERS } from "@/lib/field-tools";
import { type Audience } from "@/lib/field-tool-paths";

export default function RelatedFieldTools({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const current = slug === "ai-stalemate" ? `${slug}/${audience}` : slug;
  const related = FIELD_TOOL_OFFERS.filter(tool => tool.slug !== current);
  if (!related.length) return null;
  return (
    <section
      aria-labelledby="related-field-tools"
      className="border-t border-[var(--ft-line)] bg-[var(--ft-paper)] px-5 py-8 text-[var(--ft-ink)] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="related-field-tools" className="font-display text-2xl">
          Related products
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
          {related.map(tool => (
            <div key={tool.slug}>
              <Link
                href={"/field-tools/" + tool.slug}
                className="group block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ft-accent)]"
              >
                <div className="flex h-52 items-center justify-center overflow-hidden rounded-sm bg-[var(--ft-tint)] transition-colors group-hover:bg-[var(--ft-tint)] md:h-56">
                  <img
                    src={
                      tool.slug.startsWith("ai-stalemate/")
                        ? `/assets/field-tools/${tool.slug.replace("/", "-")}-cover-v2.webp`
                        : `/assets/field-tools/${tool.slug}-guide-cover.webp`
                    }
                    alt={`${tool.name} Field Guide cover`}
                    loading="lazy"
                    width={420}
                    height={594}
                    className="h-44 w-auto max-w-[90%] rotate-[-3deg] object-contain transition-transform duration-200 group-hover:scale-105 md:h-48"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg leading-tight">
                      {tool.name}
                    </h3>
                    <p className="mt-1 font-ui text-xs text-[var(--ft-muted)]">
                      ${tool.price}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
