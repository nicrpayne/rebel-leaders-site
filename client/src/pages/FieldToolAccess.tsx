import FieldToolWelcome from "@/components/field-tools/FieldToolWelcome";
import { useFieldToolContent } from "@/components/field-tools/FieldToolGate";
import { fieldToolBase } from "@/lib/field-tool-paths";
export default function FieldToolAccess({ slug }: { slug: string }) {
  const content = useFieldToolContent();
  const base = fieldToolBase(slug, content.audience);
  const extras =
    slug === "ai-stalemate" || content.expansion
      ? [
          {
            title: "See the conversation take shape",
            detail:
              content.expansion?.welcome ??
              (content.audience === "lead-dev"
                ? "Follow a lead preparing their position on a restricted-data app and a proposed change in how the team develops. See what they recommend and what remains unresolved."
                : "Follow a PM and lead through a worked example, from their first concerns to a next step they can agree on."),
            href: `${base}/walkthrough`,
          },
        ]
      : [];
  return <FieldToolWelcome slug={slug} extras={extras} />;
}
