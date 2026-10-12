import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getFieldTool, type FieldTool } from "@/lib/field-tools";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";

export default function RelatedFieldTools({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const related = (getFieldTool(slug)?.nextTools ?? [])
    .map(getFieldTool)
    .filter((tool): tool is FieldTool => tool !== undefined && tool.slug !== slug);
  if (!related.length) return null;
  return (
    <section
      aria-labelledby="related-field-tools"
      className="border-t border-[#cbd4c6] bg-[#f3efe4] px-5 py-12 text-[#193025] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="related-field-tools"
          className="font-display text-3xl font-semibold"
        >
          Related products
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {related.map(tool => (
            <Link
              key={tool.slug}
              href={fieldToolBase(tool.slug, audience)}
              className="group block overflow-hidden border border-[#cbd4c6] bg-[#fffdf7] transition-colors hover:border-[#6e8056] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6e8056]"
            >
              <div className="flex h-48 items-center justify-center overflow-hidden bg-[#e7eadf]">
                <img
                  src={
                    tool.slug === "ai-stalemate"
                      ? FIELD_TOOL_PRESENTATIONS[tool.slug].image
                      : `/assets/field-tools/${tool.slug}-guide-cover.webp`
                  }
                  alt={
                    tool.slug === "ai-stalemate"
                      ? "AI Stalemate"
                      : `${tool.name} Field Guide cover`
                  }
                  loading="lazy"
                  width={tool.slug === "ai-stalemate" ? 1672 : 420}
                  height={tool.slug === "ai-stalemate" ? 941 : 594}
                  className={
                    tool.slug === "ai-stalemate"
                      ? "h-full w-full object-cover object-right"
                      : "h-40 w-auto rotate-[-3deg] object-contain shadow-lg"
                  }
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-2xl">{tool.name}</h3>
                  <p className="mt-2 font-ui text-sm text-[#607063]">
                    ${tool.price} · one time
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
