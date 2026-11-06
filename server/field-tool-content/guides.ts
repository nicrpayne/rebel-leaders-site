import { LEADERSHIP_GUIDE_PAGES } from "./leadership-guides.ts";
import { AI_STALEMATE_GUIDE_PAGES } from "./ai-guide.ts";
import { FIELD_TOOLS } from "../../client/src/lib/field-tools.ts";
export type GuideSection = {
  title: string;
  body?: string;
  bullets?: string[];
};

export type FieldGuide = {
  slug: string;
  title: string;
  deck: string;
  reframe: string;
  rules: string[];
  sections: GuideSection[];
  exampleTitle: string;
  example: string[];
};

export const FIELD_GUIDES: Record<string, FieldGuide> = Object.fromEntries(
  Object.entries({
    ...LEADERSHIP_GUIDE_PAGES,
    "ai-stalemate": AI_STALEMATE_GUIDE_PAGES,
  }).map(([slug, pages]) => [
    slug,
    {
      slug,
      title:
        (FIELD_TOOLS.find(tool => tool.slug === slug)?.name ?? slug) +
        " Field Guide",
      deck: pages[0].intro,
      reframe: pages[0].sections[0].body,
      rules: pages[0].sections.map(section => section.body),
      sections: pages.map(page => ({
        title: page.title,
        body: page.intro,
        bullets: page.sections.map(section => section.body),
      })),
      exampleTitle: pages[7].title,
      example: pages[7].sections.map(section => section.body),
    },
  ])
);
