import { FIELD_TOOL_PRESENTATIONS } from "./field-tool-presentations";
export type Audience = "pm" | "lead-dev";
export const fieldToolBase = (slug: string, audience: Audience = "pm") =>
  `/field-tools/${slug}${slug === "ai-stalemate" ? "/" + audience : ""}`;
export function fieldToolAccessPath(location: string) {
  const parts = location.split("/");
  const slug = parts[1] === "field-tools" ? parts[2] : "";
  if (!slug || !Object.hasOwn(FIELD_TOOL_PRESENTATIONS, slug))
    return "/field-tools";
  return (
    fieldToolBase(slug, parts[3] === "lead-dev" ? "lead-dev" : "pm") + "/access"
  );
}
export function fieldToolPresentation(slug: string, audience: Audience = "pm") {
  const base = FIELD_TOOL_PRESENTATIONS[slug];
  if (!base || slug !== "ai-stalemate") return base;
  return {
    ...base,
    ...(audience === "pm"
      ? {
          lead: "You think AI could help.",
          accent: "Your lead has questions.",
          promise:
            "Explain what you hope AI could improve, hear your lead’s concerns, and work out what to do next together.",
          session:
            "Take about 10 minutes to prepare, then talk with your lead. Agree what happens next, who will do it, and when you will talk again.",
        }
      : {
          lead: "Your PM thinks AI could help.",
          accent: "You have questions about the work.",
          promise:
            "Work through the engineering questions, the ongoing work, and the evidence you need. Help shape a decision you can stand behind—including when to stop.",
          session:
            "Take about 10 minutes to prepare, then talk with your PM. Explain what you would need to check and ask what they hope to improve.",
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
        ? "For product managers who think AI could help and want to work through the idea with their lead developer."
        : "For lead developers being asked to change how their team builds and ships, while responsible for security, quality, and the people doing the work.",
    sectionEyebrow:
      audience === "pm"
        ? "TALK IT THROUGH WITH YOUR LEAD"
        : "TALK IT THROUGH WITH YOUR PM",
    sectionHeadline:
      audience === "pm"
        ? "Let's make your next conversation useful."
        : "Let's make a decision you can stand behind.",
    sectionCopy:
      audience === "pm"
        ? "Say who you want to help and how. Ask what your lead would need to check. Decide what to do next, then explain what you agreed and what you still need to find out."
        : "Explain your engineering position, understand what your PM needs, and recommend an approach the team can responsibly take on.",
    chips:
      audience === "pm"
        ? [
            "Say why it matters",
            "Bring your lead in",
            "Explain what you agreed",
          ]
        : [
            "Explain your position",
            "Hear what your PM needs",
            "Recommend the next move",
          ],
    cards:
      audience === "pm"
        ? [
            {
              title: "Get your own thinking clear",
              copy: "Write down who you want to help, what could be better, and why you care. Notice what you are assuming about your lead.",
            },
            {
              title: "Invite your lead to shape it",
              copy: "Ask what they would need to check and how much time it would take. Let their answer change the idea. Agree what would make it worth pursuing.",
            },
            {
              title: "Tell people what happens next",
              copy: "Use what you already know or agree to a small experiment. Tell leadership what you decided, what remains uncertain, and who will do what next.",
            },
          ]
        : [
            {
              title: "Get clear on your position",
              copy: "Explain the security, access, and team-readiness concerns. Separate what you have seen from what still needs investigating.",
            },
            {
              title: "Understand the request",
              copy: "Ask why the change matters now. Separate the app’s requirements from the proposed development workflow and compare other ways to meet the need.",
            },
            {
              title: "Recommend a useful next move",
              copy: "Use the evidence you have. Propose preparation, specialist help, a smaller change, a spike, or stopping this use. Name who will do what and when you will return.",
            },
          ],
  };
}
