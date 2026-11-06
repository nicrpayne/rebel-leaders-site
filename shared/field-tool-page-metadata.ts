import { FIELD_TOOLS_ORIGIN } from "./field-tool-domains";
import {
  AI_STALEMATE_PUBLIC_COPY,
  FIELD_TOOLS_PUBLIC_COPY,
} from "./field-tool-public-copy";

export const DEFAULT_PAGE_TITLE = "Rebel Leaders";
export const DEFAULT_PAGE_DESCRIPTION =
  "You've been playing the wrong game. Rebel Leaders is a movement to reclaim leadership as a human art.";

export function fieldToolPageMetadata(requestPath: string) {
  // Only public sales pages have share metadata. Never copy query strings,
  // request hosts, checkout codes, or sign-in tokens into social/canonical URLs.
  const path = requestPath.split(/[?#]/)[0].replace(/\/+$/, "");
  const page =
    path === "/field-tools"
      ? {
          title: "Field Tools — Rebel Leaders",
          description: FIELD_TOOLS_PUBLIC_COPY.description,
          image: "field-tools-share-v1.png",
          imageAlt:
            "Field Tools by Rebel Leaders. Everyone’s busy. The work’s still stuck. Guides and interactive tools for conversations and delivery.",
        }
      : path === "/field-tools/ai-stalemate/pm"
        ? {
            title: "AI Stalemate for Product Managers — Rebel Leaders",
            description: `${AI_STALEMATE_PUBLIC_COPY.pm.headline} Prepare the AI conversation and explore what’s holding delivery up. A Field Guide and two interactive Labs for Product Managers.`,
            image: "ai-stalemate-pm-share-v2.png",
            imageAlt: `AI Stalemate for Product Managers. ${AI_STALEMATE_PUBLIC_COPY.pm.headline} Nic Payne in his study.`,
          }
        : path === "/field-tools/ai-stalemate/lead-dev"
          ? {
              title: "AI Stalemate for Lead Developers — Rebel Leaders",
              description: `${AI_STALEMATE_PUBLIC_COPY["lead-dev"].headline} Work through the engineering concerns and find what’s holding delivery up. A Field Guide and two interactive Labs for Lead Developers.`,
              image: "ai-stalemate-lead-dev-share-v1.png",
              imageAlt: `AI Stalemate for Lead Developers. ${AI_STALEMATE_PUBLIC_COPY["lead-dev"].headline} Nic Payne laughing in his study.`,
            }
          : null;
  return page
    ? {
        ...page,
        canonical: FIELD_TOOLS_ORIGIN + path,
        image: `${FIELD_TOOLS_ORIGIN}/assets/field-tools/${page.image}`,
      }
    : null;
}

export function fieldToolMetaTags(
  page: NonNullable<ReturnType<typeof fieldToolPageMetadata>>
) {
  return [
    { name: "description", content: page.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Rebel Leaders" },
    { property: "og:title", content: page.title },
    { property: "og:description", content: page.description },
    { property: "og:url", content: page.canonical },
    { property: "og:image", content: page.image },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: page.imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: page.title },
    { name: "twitter:description", content: page.description },
    { name: "twitter:image", content: page.image },
    { name: "twitter:image:alt", content: page.imageAlt },
  ];
}
