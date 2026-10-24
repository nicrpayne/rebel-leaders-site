export type FieldToolAudience = "pm" | "lead-dev";

export function fieldToolEntitlement(
  slug: string,
  audience: FieldToolAudience = "pm"
) {
  return slug === "ai-stalemate" ? `${slug}/${audience}` : slug;
}

// Orders sold before the edition split keep the access originally promised.
// New orders use edition-specific keys derived from the verified paid variant.
export function ownsFieldTool(
  purchased: readonly string[],
  slug: string,
  audience: FieldToolAudience = "pm"
) {
  return (
    purchased.includes(fieldToolEntitlement(slug, audience)) ||
    (slug === "ai-stalemate" && purchased.includes("ai-stalemate"))
  );
}
