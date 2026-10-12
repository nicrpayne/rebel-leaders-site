import { FIELD_TOOL_PRESENTATIONS } from "./field-tool-presentations";
export type Audience = "pm" | "lead-dev";
export const fieldToolBase = (slug: string, audience: Audience = "pm") =>
  `/field-tools/${slug}${slug === "ai-stalemate" ? "/" + audience : ""}`;
export function fieldToolPresentation(slug: string, audience: Audience = "pm") {
  const base = FIELD_TOOL_PRESENTATIONS[slug];
  if (!base || slug !== "ai-stalemate") return base;
  return {
    ...base,
    ...(audience === "pm"
      ? {
          lead: "Your lead isn't convinced.",
          accent: "Let's find a move you can make together.",
          promise:
            "Make a credible case for the opportunity—and bring your lead into shaping it.",
          session:
            "Start with 10 minutes of PM preparation. Then bring your lead into a focused conversation and agree one useful next move.",
        }
      : {
          lead: "My PM won’t shut up about AI.",
          accent: "",
          promise:
            "Shape responsible AI use with your PM, protect the standards you own, and make the next move clear.",
          session:
            "Start with 10 minutes of engineering preparation. Then work with your PM to agree an outcome, conditions, and one useful next move.",
        }),
  };
}

import { getFieldTool, type FieldTool } from "./field-tools";
export function fieldToolForPath(
  slug: string,
  audience: Audience = "pm"
): FieldTool | undefined {
  const tool = getFieldTool(slug);
  if (!tool || slug !== "ai-stalemate") return tool;
  return {
    ...tool,
    who:
      audience === "pm"
        ? "For you, the PM who sees an opportunity and needs a credible way to move it forward with your lead developer."
        : "For you, the lead developer who wants to make technical judgment useful and shape responsible AI use with your PM.",
    sectionEyebrow:
      audience === "pm"
        ? "YOUR OUTCOME. YOUR LEAD'S JUDGMENT. A SHARED MOVE."
        : "YOUR JUDGMENT. YOUR PM'S OUTCOME. A SHARED MOVE.",
    sectionHeadline:
      audience === "pm"
        ? "Let's make your next conversation useful."
        : "Let's give your PM something they can work with.",
    sectionCopy:
      audience === "pm"
        ? "Get clear about your Why. Ask what your lead would need to protect. Shape one proposal together, then explain what the evidence supports."
        : "Name the actual work and risk. Ask which outcome matters to your PM. Shape the conditions together, then make the evidence and next action clear.",
    chips:
      audience === "pm"
        ? ["Clarify your Why", "Bring your lead in", "Make the case"]
        : [
            "Make costs concrete",
            "Shape responsible use",
            "Defend the decision",
          ],
    cards:
      audience === "pm"
        ? [
            {
              title: "Get your own thinking clear",
              copy: "Write the outcome, your Why, and the future you want to help create. Check the story you are telling about your lead.",
            },
            {
              title: "Invite your lead to shape it",
              copy: "Ask for their technical judgment. Turn concerns into conditions, make displaced work visible, and agree what evidence would change your view.",
            },
            {
              title: "Take a move back",
              copy: "Use existing evidence or run one bounded test. Give leadership a clear decision, its limits, and an accountable next action.",
            },
          ]
        : [
            {
              title: "Make your judgment concrete",
              copy: "Name the checks, costs, or maintenance responsibility involved. Describe the worthwhile future you could help create.",
            },
            {
              title: "Shape it with your PM",
              copy: "Ask about the outcome, define responsible conditions, and make the capacity tradeoff explicit together.",
            },
            {
              title: "Give the result a next move",
              copy: "Record full effort and quality. Help your PM explain what the evidence supports, what it doesn't, and what happens next.",
            },
          ],
  };
}
