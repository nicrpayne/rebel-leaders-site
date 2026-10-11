export const FIELD_TOOL_CHECKOUT_KEYS: Record<string, string> = {
  "ai-stalemate": "FIELD_TOOL_AI_STALEMATE_CHECKOUT_URL",
  "deadline-reset": "FIELD_TOOL_DEADLINE_RESET_CHECKOUT_URL",
  "priority-whiplash": "FIELD_TOOL_PRIORITY_WHIPLASH_CHECKOUT_URL",
  "mandate-reset": "FIELD_TOOL_MANDATE_RESET_CHECKOUT_URL",
  "product-project-translator":
    "FIELD_TOOL_PRODUCT_PROJECT_TRANSLATOR_CHECKOUT_URL",
};

export function getFieldToolCheckout(
  slug: string,
  environment: Record<string, string | undefined>
) {
  const key = Object.hasOwn(FIELD_TOOL_CHECKOUT_KEYS, slug)
    ? FIELD_TOOL_CHECKOUT_KEYS[slug]
    : undefined;
  const raw = key ? environment[key]?.trim() : undefined;
  if (!raw) return { checkoutUrl: null, provider: null };
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password)
      return { checkoutUrl: null, provider: null };
    const provider =
      url.hostname === "buy.stripe.com"
        ? "Stripe"
        : url.hostname.endsWith(".lemonsqueezy.com")
          ? "Lemon Squeezy"
          : "secure checkout";
    return { checkoutUrl: url.href, provider };
  } catch {
    return { checkoutUrl: null, provider: null };
  }
}
