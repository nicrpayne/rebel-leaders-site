import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { and, eq, gt, isNull, inArray, sql } from "drizzle-orm";
import { parse } from "cookie";
import { Resend } from "resend";
import type { Express, Request } from "express";
import express from "express";
import path from "node:path";
import { z } from "zod";
import { ownsFieldTool } from "../shared/field-tool-entitlements";
import { getDb } from "./db";
import {
  fieldToolOrders,
  fieldToolAccessTokens,
  fieldToolGifts,
} from "../drizzle/schema";
import { FIELD_TOOL_CHECKOUT_KEYS } from "./field-tool-checkout";

import {
  giftTokenHash,
  validateGiftOrder,
  notifyGiftRecipient,
} from "./field-tool-gifts";

export const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export function verifyLemonSignature(
  body: Buffer,
  signature: string,
  secret: string
) {
  if (!secret || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  return timingSafeEqual(
    Buffer.from(signature, "hex"),
    createHmac("sha256", secret).update(body).digest()
  );
}
export function previewEnabled(env = process.env) {
  return env.FIELD_TOOL_PREVIEW === "true" && env.LEMONSQUEEZY_MODE !== "live";
}
const slugSchema = z.enum(
  Object.keys(FIELD_TOOL_CHECKOUT_KEYS) as [string, ...string[]]
);
export const orderSchema = z.object({
  meta: z.object({
    event_name: z.enum(["order_created", "order_refunded"]),
    custom_data: z
      .object({
        field_tool_gift: z
          .string()
          .regex(/^[a-f0-9]{64}$/)
          .optional(),
      })
      .passthrough()
      .optional(),
  }),
  data: z.object({
    type: z.literal("orders"),
    id: z.string().regex(/^\d+$/),
    attributes: z.object({
      store_id: z.number().int().positive(),
      user_email: z.string().email(),
      test_mode: z.boolean(),
      status: z.enum([
        "pending",
        "failed",
        "paid",
        "refunded",
        "partial_refund",
        "fraudulent",
      ]),
      refunded: z.boolean(),
      updated_at: z.string().datetime(),
      first_order_item: z.object({ variant_id: z.number().int().positive() }),
    }),
  }),
});
export function parseLemonOrder(payload: unknown, env = process.env) {
  const p = orderSchema.parse(payload);
  const a = p.data.attributes;
  if (
    !env.LEMONSQUEEZY_STORE_ID ||
    String(a.store_id) !== env.LEMONSQUEEZY_STORE_ID
  )
    throw new Error("Store mismatch");
  if (!["live", "test"].includes(env.LEMONSQUEEZY_MODE ?? ""))
    throw new Error("Mode not configured");
  if (a.test_mode !== (env.LEMONSQUEEZY_MODE === "test"))
    throw new Error("Mode mismatch");
  const map = z
    .record(z.string(), slugSchema)
    .parse(JSON.parse(env.LEMONSQUEEZY_VARIANT_MAP ?? "{}"));
  const slug = map[String(a.first_order_item.variant_id)];
  if (!slug) return null;
  return {
    orderId: p.data.id,
    giftToken: p.meta.custom_data?.field_tool_gift,
    email: a.user_email.trim().toLowerCase(),
    slug,
    status:
      a.refunded || a.status === "refunded" || a.status === "fraudulent"
        ? ("revoked" as const)
        : ["paid", "partial_refund"].includes(a.status)
          ? ("active" as const)
          : ("inactive" as const),
    providerUpdatedAt: new Date(a.updated_at),
  };
}
export async function saveLemonOrder(
  order: NonNullable<ReturnType<typeof parseLemonOrder>>
) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.transaction(async tx => {
    const [existingGift] = await tx
      .select()
      .from(fieldToolGifts)
      .where(
        order.giftToken
          ? eq(fieldToolGifts.tokenHash, giftTokenHash(order.giftToken))
          : eq(fieldToolGifts.orderId, order.orderId)
      )
      .limit(1)
      .for("update");
    const gift = order.giftToken
      ? validateGiftOrder(existingGift, order)
      : existingGift;
    if (gift) {
      validateGiftOrder(gift, order);
      await tx
        .update(fieldToolGifts)
        .set({ orderId: order.orderId, buyerEmail: order.email })
        .where(eq(fieldToolGifts.tokenHash, gift.tokenHash));
    }
    const { giftToken: _giftToken, ...payment } = order;
    const entitlement = {
      ...payment,
      email: gift?.recipientEmail ?? order.email,
    };
    // Refunds without custom data still resolve the saved recipient. A delayed
    // paid event cannot overwrite a newer refund, including equal timestamps.
    const newer = sql`(${order.providerUpdatedAt} > ${fieldToolOrders.providerUpdatedAt} OR (${order.providerUpdatedAt} = ${fieldToolOrders.providerUpdatedAt} AND ${order.status} = 'revoked'))`;
    await tx
      .insert(fieldToolOrders)
      .values(entitlement)
      .onDuplicateKeyUpdate({
        set: {
          email: sql`IF(${newer}, ${entitlement.email}, ${fieldToolOrders.email})`,
          status: sql`IF(${newer}, ${order.status}, ${fieldToolOrders.status})`,
          providerUpdatedAt: sql`GREATEST(${fieldToolOrders.providerUpdatedAt}, ${order.providerUpdatedAt})`,
        },
      });
  });
  await notifyGiftRecipient(order.orderId);
}
const COOKIE = "rl_field_tools";
export async function buyerEmail(req: Pick<Request, "headers">) {
  const token = parse(req.headers.cookie ?? "")[COOKIE];
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const db = await getDb();
  if (!db) return null;
  const [row] = await db
    .select()
    .from(fieldToolAccessTokens)
    .where(
      and(
        eq(fieldToolAccessTokens.tokenHash, hashToken(token)),
        eq(fieldToolAccessTokens.kind, "session"),
        gt(fieldToolAccessTokens.expiresAt, new Date()),
        isNull(fieldToolAccessTokens.usedAt)
      )
    )
    .limit(1);
  return row?.email ?? null;
}
export async function purchasedSlugs(email: string | null) {
  if (!email) return [];
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({ slug: fieldToolOrders.slug })
    .from(fieldToolOrders)
    .where(
      and(
        eq(fieldToolOrders.email, email),
        eq(fieldToolOrders.status, "active")
      )
    );
  return Array.from(new Set(rows.map(r => r.slug)));
}
export async function hasFieldTool(
  req: Pick<Request, "headers">,
  slug: string,
  audience: "pm" | "lead-dev" = "pm"
) {
  if (previewEnabled()) return true;
  return ownsFieldTool(
    await purchasedSlugs(await buyerEmail(req)),
    slug,
    audience
  );
}
// Bounded per-process abuse controls; generic responses do not disclose buyer status.
const attempts = new Map<string, { count: number; until: number }>();
export function allowAttempt(key: string, now = Date.now(), limit = 5) {
  attempts.forEach((v, k) => {
    if (v.until < now) attempts.delete(k);
  });
  if (attempts.size > 10000) return false;
  const v = attempts.get(key) ?? { count: 0, until: now + 15 * 60 * 1000 };
  v.count++;
  attempts.set(key, v);
  return v.count <= limit;
}
export async function requestBuyerLink(
  email: string,
  slug: string,
  ip: string,
  audience: "pm" | "lead-dev" = "pm"
) {
  if (
    !allowAttempt("ip:" + ip, Date.now(), 30) ||
    !allowAttempt("email:" + hashToken(email))
  )
    throw new Error("Please wait before requesting another link.");
  const db = await getDb();
  if (!db || !process.env.RESEND_API_KEY || !process.env.APP_URL)
    throw new Error("Email access is temporarily unavailable.");
  if (!ownsFieldTool(await purchasedSlugs(email), slug, audience)) return;
  const token = randomBytes(32).toString("hex");
  await db.insert(fieldToolAccessTokens).values({
    tokenHash: hashToken(token),
    email,
    kind: "link",
    slug: slug === "ai-stalemate" ? slug + "/" + audience : slug,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });
  const url = new URL("/field-tools/sign-in", process.env.APP_URL);
  url.searchParams.set("slug", slug);
  url.searchParams.set("audience", audience);
  url.hash = "token=" + token;
  const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from:
      process.env.FIELD_TOOL_EMAIL_FROM ??
      "Rebel Leaders <hello@rebel-leader.com>",
    to: email,
    subject: "Open your Rebel Leaders Field Tool",
    html: `<div style="font-family:Arial;max-width:560px;line-height:1.7"><h1>Your Field Tool is ready.</h1><p>Use this secure link to sign in. It expires in 15 minutes.</p><p><a href="${url.toString().replace(/&/g, "&amp;")}">Open your Field Tool</a></p><p>Keep this sign-in link private. If you did not request it, you can ignore this email.</p></div>`,
  });
  if (result.error) {
    await db
      .delete(fieldToolAccessTokens)
      .where(eq(fieldToolAccessTokens.tokenHash, hashToken(token)));
    throw new Error("We could not send the access email. Please try again.");
  }
}
export async function redeemBuyerLink(token: string) {
  const db = await getDb();
  if (!db) throw new Error("Access is temporarily unavailable.");
  return db.transaction(async tx => {
    const condition = and(
      eq(fieldToolAccessTokens.tokenHash, hashToken(token)),
      eq(fieldToolAccessTokens.kind, "link"),
      isNull(fieldToolAccessTokens.usedAt),
      gt(fieldToolAccessTokens.expiresAt, new Date())
    );
    const [link] = await tx
      .select()
      .from(fieldToolAccessTokens)
      .where(condition)
      .limit(1)
      .for("update");
    if (!link)
      throw new Error(
        "This link has expired or already been used. Request a new one."
      );
    await tx
      .update(fieldToolAccessTokens)
      .set({ usedAt: new Date() })
      .where(condition);
    const session = randomBytes(32).toString("hex");
    await tx.insert(fieldToolAccessTokens).values({
      tokenHash: hashToken(session),
      email: link.email,
      slug: link.slug,
      kind: "session",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    return { session, slug: link.slug };
  });
}
export function registerFieldToolCommerce(app: Express) {
  app.post(
    "/api/field-tools/lemon-webhook",
    express.raw({ type: "application/json", limit: "256kb" }),
    async (req, res) => {
      if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET)
        return void res.status(503).json({ error: "Webhook not configured" });
      if (
        !Buffer.isBuffer(req.body) ||
        !verifyLemonSignature(
          req.body,
          req.get("X-Signature") ?? "",
          process.env.LEMONSQUEEZY_WEBHOOK_SECRET
        )
      )
        return void res.status(401).json({ error: "Invalid signature" });
      let order;
      try {
        const payload = JSON.parse(req.body.toString());
        if (
          !["order_created", "order_refunded"].includes(
            payload.meta?.event_name
          )
        )
          return void res.sendStatus(200);
        order = parseLemonOrder(payload);
      } catch {
        return void res.status(400).json({ error: "Invalid order" });
      }
      try {
        if (order) await saveLemonOrder(order);
        res.sendStatus(200);
      } catch {
        res.status(503).json({ error: "Please retry delivery" });
      }
    }
  );
  app.get("/api/field-tools/:slug/pdf", async (req, res) => {
    res.set("Cache-Control", "private, no-store");
    const pdfNames: Record<string, string> = {
      "ai-stalemate": `ai-stalemate-${req.query.audience === "lead-dev" ? "lead-dev" : "pm"}-field-guide.pdf`,
      "deadline-reset": "deadline-reset-field-guide.pdf",
      "priority-whiplash": "priority-whiplash-field-guide.pdf",
      "mandate-reset": "mandate-reset-field-guide.pdf",
      "product-project-translator":
        "product-project-translator-field-guide.pdf",
    };
    if (!Object.hasOwn(pdfNames, req.params.slug))
      return void res.sendStatus(404);
    try {
      if (
        !(await hasFieldTool(
          req,
          req.params.slug,
          req.query.audience === "lead-dev" ? "lead-dev" : "pm"
        ))
      )
        return void res
          .status(403)
          .send(
            "Sign in with your purchase email to download this Field Guide."
          );
      res.download(
        path.resolve(`private/field-tools/${pdfNames[req.params.slug]}`),
        pdfNames[req.params.slug]
      );
    } catch {
      res.sendStatus(503);
    }
  });
  // Retire the previously public download URL, including stale build files.
  app.get("/assets/field-tools/ai-stalemate-field-guide.pdf", (_req, res) =>
    res
      .status(410)
      .send("Download the Field Guide from your signed-in product page.")
  );
}
export const buyerCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
export const BUYER_COOKIE = COOKIE;

export async function revokeBuyerSession(req: Pick<Request, "headers">) {
  const token = parse(req.headers.cookie ?? "")[BUYER_COOKIE];
  if (!token) return;
  const db = await getDb();
  if (db)
    await db
      .update(fieldToolAccessTokens)
      .set({ usedAt: new Date() })
      .where(
        and(
          eq(fieldToolAccessTokens.tokenHash, hashToken(token)),
          eq(fieldToolAccessTokens.kind, "session")
        )
      );
}
