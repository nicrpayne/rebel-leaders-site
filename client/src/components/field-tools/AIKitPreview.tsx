import type { Audience } from "@/lib/field-tool-paths";
import FieldToolKitPreview from "./FieldToolKitPreview";

export default function AIKitPreview({ audience }: { audience: Audience }) {
  return (
    <figure className="mb-9">
      <FieldToolKitPreview slug="ai-stalemate" audience={audience} />
    </figure>
  );
}
