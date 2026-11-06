import type { DELIVERY_TOOLS } from "@/lib/ai-lab-tools";

type ToolIcon = "conversation-companion" | "delivery-map" | (typeof DELIVERY_TOOLS)[number]["icon"];

export default function AILabIcon({ name, size = 40 }: { name: ToolIcon; size?: number }) {
  return (
    <img
      src={`/assets/field-tools/tool-icons/${name}.webp`}
      alt=""
      width={size}
      height={size}
      className="shrink-0"
    />
  );
}
