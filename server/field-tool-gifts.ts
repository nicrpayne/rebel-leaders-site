import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { fieldToolGifts, fieldToolOrders } from "../drizzle/schema";
import {
  giftDetailsSchema,
  type GiftDetails,
} from "../shared/field-tool-gifts";
import { fieldToolEntitlement } from "../shared/field-tool-entitlements";
import { getDb } from "./db";

export const giftTokenHash = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export function giftCheckoutUrl(checkoutUrl: string, token: string) {
  const url = new URL(checkoutUrl);
  if (
    url.protocol !== "https:" ||
    !url.hostname.endsWith(".lemonsqueezy.com") ||
    !/^[a-f0-9]{64}$/.test(token)
  )
    throw new Error("Gift checkout is unavailable.");
  url.searchParams.set("checkout[custom][field_tool_gift]", token);
  return url.toString();
}

export async function createGiftCheckout(
  input: {
    slug: string;
    audience: "pm" | "lead-dev";
    gift: GiftDetails;
  },
  checkoutUrl: string
) {
  const db = await getDb();
  if (!db) throw new Error("Gift checkout is unavailable.");
  const token = randomBytes(32).toString("hex");
  const url = giftCheckoutUrl(checkoutUrl, token);
  await db.insert(fieldToolGifts).values({
    tokenHash: giftTokenHash(token),
    slug: fieldToolEntitlement(input.slug, input.audience),
    audience: input.audience,
    ...giftDetailsSchema.parse(input.gift),
  });
  return { checkoutUrl: url };
}

export function validateGiftOrder(
  gift: typeof fieldToolGifts.$inferSelect | undefined,
  order: { orderId: string; slug: string }
) {
  if (
    !gift ||
    gift.slug !== order.slug ||
    (gift.orderId && gift.orderId !== order.orderId)
  )
    throw new Error("Gift does not match this order.");
  return gift;
}

const names: Record<string, string> = {
  "ai-stalemate": "AI Stalemate",
  "ai-stalemate/pm": "AI Stalemate / Product Manager",
  "ai-stalemate/lead-dev": "AI Stalemate / Lead Developer",
  "deadline-reset": "Deadline Reset",
  "priority-whiplash": "Priority Whiplash",
  "mandate-reset": "Mandate Reset",
  "when-the-team-goes-quiet": "When the Team Goes Quiet",
};
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    char =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!
  );

export function giftNotification(
  gift: typeof fieldToolGifts.$inferSelect,
  appUrl: string
) {
  const name = names[gift.slug];
  if (!name) throw new Error("Unknown gift product.");
  const path =
    gift.slug === "ai-stalemate"
      ? `${gift.slug}/${gift.audience === "lead-dev" ? "lead-dev" : "pm"}`
      : gift.slug;
  const accessUrl = new URL(`/field-tools/${path}/access`, appUrl).toString();
  const greeting = gift.recipientName ? `Hi ${gift.recipientName},` : "Hello,";
  const intro = `${gift.senderName} bought you ${name}, a Field Guide and interactive Lab from Rebel Leaders.`;
  const instructions = `It's yours to use. Open your gift and enter ${gift.recipientEmail} to receive your own secure sign-in link. You don't need to pay or enter card details.`;
  const privacy =
    "Your Lab answers are yours. The person who bought this gift cannot see them unless you choose to share them.";
  return {
    to: gift.recipientEmail,
    subject: `A Field Tool for you: ${name}`,
    text: [
      greeting,
      intro,
      gift.message ? `A note from ${gift.senderName}:\n${gift.message}` : "",
      instructions,
      accessUrl,
      privacy,
    ]
      .filter(Boolean)
      .join("\n\n"),
    html: `<div style="font-family:Arial;max-width:560px;line-height:1.7"><p>${escapeHtml(greeting)}</p><h1>A Field Tool for you.</h1><p>${escapeHtml(intro)}</p>${gift.message ? `<p>A note from ${escapeHtml(gift.senderName)}:</p><blockquote style="white-space:pre-wrap">${escapeHtml(gift.message)}</blockquote>` : ""}<p>${escapeHtml(instructions)}</p><p><a href="${escapeHtml(accessUrl)}">Open your gift</a></p><p>${escapeHtml(privacy)}</p></div>`,
  };
}

// The paid entitlement is committed before email delivery. Provider retries can
// retry a failed email without changing ownership or restoring refunded access.
export async function notifyGiftRecipient(orderId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.transaction(async tx => {
    const [gift] = await tx
      .select()
      .from(fieldToolGifts)
      .where(eq(fieldToolGifts.orderId, orderId))
      .limit(1)
      .for("update");
    if (!gift || gift.notifiedAt) return;
    const [order] = await tx
      .select()
      .from(fieldToolOrders)
      .where(eq(fieldToolOrders.orderId, orderId))
      .limit(1)
      .for("update");
    if (!order || order.status !== "active") return;
    if (!process.env.RESEND_API_KEY || !process.env.APP_URL)
      throw new Error("Gift email is unavailable");
    const result = await new Resend(process.env.RESEND_API_KEY).emails.send(
      {
        from:
          process.env.FIELD_TOOL_EMAIL_FROM ??
          "Rebel Leaders <hello@rebel-leader.com>",
        ...giftNotification(gift, process.env.APP_URL),
      },
      {
        idempotencyKey: `field-tool-gift/${process.env.LEMONSQUEEZY_MODE}/${orderId}`,
      }
    );
    if (result.error) throw new Error("Gift email needs retry");
    await tx
      .update(fieldToolGifts)
      .set({ notifiedAt: new Date() })
      .where(eq(fieldToolGifts.tokenHash, gift.tokenHash));
  });
}
