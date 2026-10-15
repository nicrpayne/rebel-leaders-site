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
              "Follow a PM and lead through a worked example, from their first concerns to a next step they can agree on.",
            href: `${base}/walkthrough`,
          },
        ]
      : [];
  return <FieldToolWelcome slug={slug} extras={extras} />;
}
