import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { FIELD_TOOLS } from "@/lib/field-tools";
import { FIELD_TOOL_PRESENTATIONS } from "@/lib/field-tool-presentations";
import { fieldToolBase, type Audience } from "@/lib/field-tool-paths";

export default function RelatedFieldTools({
  slug,
  audience = "pm",
}: {
  slug: string;
  audience?: Audience;
}) {
  const related = FIELD_TOOLS.filter(tool => tool.slug !== slug);
  if (!related.length) return null;
  return (
    <section
      aria-labelledby="related-field-tools"
      className="border-t border-[#435a46] bg-[#07110d] px-5 py-8 text-[#f5f0e6] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="related-field-tools" className="font-display text-2xl">
          Related products
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4">
          {related.map(tool => (
            <div key={tool.slug}>
              <Link
                href={fieldToolBase(tool.slug, audience)}
                className="group block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9b34d]"
              >
                <div className="flex h-52 items-center justify-center overflow-hidden rounded-sm bg-[#13231b] transition-colors group-hover:bg-[#1c3225] md:h-56">
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
                        : "h-44 w-auto max-w-[90%] rotate-[-3deg] object-contain shadow-md transition-transform duration-200 group-hover:scale-105 md:h-48"
                    }
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg leading-tight">
                      {tool.name}
                    </h3>
                    <p className="mt-1 font-ui text-xs text-[#afbfaa]">
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
              {tool.slug === "ai-stalemate" && (
                <div className="mt-3 flex flex-col gap-2 font-ui text-xs">
                  <Link
                    className="underline underline-offset-4"
                    href={fieldToolBase(tool.slug, "pm")}
                  >
                    For Product Managers →
                  </Link>
                  <Link
                    className="underline underline-offset-4"
                    href={fieldToolBase(tool.slug, "lead-dev")}
                  >
                    For Lead Developers →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
