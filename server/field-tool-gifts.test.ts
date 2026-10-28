import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import {
  createGiftCheckout,
  giftCheckoutUrl,
  giftNotification,
  giftTokenHash,
  notifyGiftRecipient,
  validateGiftOrder,
} from "./field-tool-gifts";
import { parseLemonOrder, saveLemonOrder } from "./field-tool-commerce";
import { giftDetailsSchema } from "../shared/field-tool-gifts";
import { fieldToolGifts, fieldToolOrders } from "../drizzle/schema";
import { fieldToolsRouter } from "./field-tools";

const mocks = vi.hoisted(() => ({ getDb: vi.fn(), send: vi.fn() }));
vi.mock("./db", () => ({ getDb: mocks.getDb }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));
const details = {
  senderName: "Alex",
  recipientName: "Taylor",
  recipientEmail: "taylor@example.com",
  message: "Thought this might help.",
};
const token = "a".repeat(64);
const gift = {
  tokenHash: giftTokenHash(token),
  slug: "ai-stalemate",
  audience: "lead-dev",
  ...details,
  orderId: null as string | null,
  buyerEmail: null as string | null,
  notifiedAt: null as Date | null,
  createdAt: new Date(),
};
const payment = {
  orderId: "99",
  email: "buyer@example.com",
  slug: "ai-stalemate",
  status: "active" as const,
  providerUpdatedAt: new Date("2026-10-14T12:00:00Z"),
  giftToken: token,
};
function database(selections: unknown[][] = []) {
  const inserts: { table: unknown; value: any; update?: any }[] = [];
  const updates: { table: unknown; value: any }[] = [];
  const conditions: any[] = [];
  const db: any = {
    select: vi.fn(() => {
      const rows = selections.shift() ?? [];
      const chain: any = {
        from: () => chain,
        where: (condition: any) => {
          conditions.push(condition);
          return chain;
        },
        limit: () => chain,
        for: () => Promise.resolve(rows),
        then: (resolve: any) => Promise.resolve(rows).then(resolve),
      };
      return chain;
    }),
    insert: (table: unknown) => ({
      values: (value: unknown) => {
        const entry = { table, value };
        inserts.push(entry);
        return {
          onDuplicateKeyUpdate: (update: unknown) => {
            Object.assign(entry, { update });
            return Promise.resolve();
          },
          then: (resolve: any) => Promise.resolve().then(resolve),
        };
      },
    }),
    update: (table: unknown) => ({
      set: (value: unknown) => ({
        where: async () => {
          updates.push({ table, value });
        },
      }),
    }),
    transaction: vi.fn((fn: any) => fn(db)),
  };
  mocks.getDb.mockResolvedValue(db);
  return { db, inserts, updates, conditions };
}
beforeEach(() => {
  vi.clearAllMocks();
  mocks.send.mockResolvedValue({ data: { id: "email-id" }, error: null });
});
afterEach(() => vi.unstubAllEnvs());
const emailEnvironment = () => {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("APP_URL", "https://example.com");
  vi.stubEnv("LEMONSQUEEZY_MODE", "test");
};

describe("gift checkout", () => {
  it("stores recipient details privately and puts only an opaque reference in checkout", async () => {
    const { inserts } = database();
    const result = await createGiftCheckout(
      {
        slug: gift.slug,
        audience: "lead-dev",
        gift: { ...details, recipientEmail: " Taylor@Example.com " },
      },
      "https://shop.lemonsqueezy.com/checkout/buy/123"
    );
    const checkout = new URL(result.checkoutUrl);
    const reference = checkout.searchParams.get(
      "checkout[custom][field_tool_gift]"
    )!;
    expect(reference).toMatch(/^[a-f0-9]{64}$/);
    expect(result.checkoutUrl).not.toContain("example.com");
    expect(result.checkoutUrl).not.toContain("Alex");
    expect(inserts).toHaveLength(1);
    expect(inserts[0].table).toBe(fieldToolGifts);
    expect(inserts[0].value).toMatchObject({
      recipientEmail: "taylor@example.com",
      slug: "ai-stalemate/lead-dev",
      tokenHash: giftTokenHash(reference),
    });
    expect(inserts.some(entry => entry.table === fieldToolOrders)).toBe(false);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("requires valid recipient and sender details and bounds the note", () => {
    expect(() =>
      giftDetailsSchema.parse({ ...details, recipientEmail: "wrong" })
    ).toThrow();
    expect(() =>
      giftDetailsSchema.parse({ ...details, senderName: "   " })
    ).toThrow();
    expect(() =>
      giftDetailsSchema.parse({ ...details, message: "x".repeat(1001) })
    ).toThrow();
    expect(() =>
      giftCheckoutUrl("https://evil.example/checkout", token)
    ).toThrow();
    expect(() =>
      giftCheckoutUrl("http://shop.lemonsqueezy.com/checkout", token)
    ).toThrow();
  });
  it("keeps gifts disabled in review mode even when services appear configured", async () => {
    const { inserts } = database();
    emailEnvironment();
    vi.stubEnv("FIELD_TOOL_PREVIEW", "true");
    vi.stubEnv("DATABASE_URL", "test-db");
    vi.stubEnv("LEMONSQUEEZY_STORE_ID", "12");
    vi.stubEnv("LEMONSQUEEZY_WEBHOOK_SECRET", "test-secret");
    vi.stubEnv("LEMONSQUEEZY_VARIANT_MAP", '{"34":"ai-stalemate"}');
    vi.stubEnv(
      "FIELD_TOOL_AI_STALEMATE_CHECKOUT_URL",
      "https://shop.lemonsqueezy.com/checkout/buy/34"
    );
    const caller = fieldToolsRouter.createCaller({
      req: { headers: {}, socket: {}, ip: "gift-test" } as any,
      res: { setHeader: vi.fn() } as any,
      user: null,
    });
    await expect(
      caller.giftCheckout({ slug: gift.slug, audience: "pm", gift: details })
    ).rejects.toMatchObject({ code: "PRECONDITION_FAILED" });
    expect(inserts).toHaveLength(0);
    expect(mocks.send).not.toHaveBeenCalled();
  });
});

describe("paid gift ownership", () => {
  it("binds one paid order to the recipient, retaining the buyer separately", async () => {
    const { inserts, updates } = database([[gift], []]);
    await saveLemonOrder(payment);
    expect(
      inserts.find(entry => entry.table === fieldToolOrders)?.value
    ).toMatchObject({
      orderId: "99",
      email: "taylor@example.com",
      status: "active",
    });
    expect(updates[0].value).toEqual({
      orderId: "99",
      buyerEmail: "buyer@example.com",
    });
  });
  it("refunds the recipient’s access even when refund metadata omits the gift reference", async () => {
    const bound = { ...gift, orderId: "99", buyerEmail: payment.email };
    const { inserts, conditions } = database([
      [bound],
      [bound],
      [{ ...payment, email: gift.recipientEmail, status: "revoked" }],
    ]);
    await saveLemonOrder({
      ...payment,
      giftToken: undefined,
      status: "revoked",
    });
    expect(inserts[0].value).toMatchObject({
      email: "taylor@example.com",
      status: "revoked",
    });
    const condition = new MySqlDialect().sqlToQuery(conditions[0]);
    expect(condition.sql).toContain("order_id");
    expect(condition.params).toContain("99");
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("rejects an unknown gift, a different product, and reuse on a second order", () => {
    expect(() => validateGiftOrder(undefined, payment)).toThrow();
    expect(() =>
      validateGiftOrder({ ...gift, slug: "mandate-reset" }, payment)
    ).toThrow();
    expect(() =>
      validateGiftOrder({ ...gift, orderId: "100" }, payment)
    ).toThrow();
    expect(
      validateGiftOrder({ ...gift, orderId: "99" }, payment).recipientEmail
    ).toBe(details.recipientEmail);
  });
  it("does not grant any access when the gift reference cannot be verified", async () => {
    const { inserts } = database([[]]);
    await expect(saveLemonOrder(payment)).rejects.toThrow(
      "Gift does not match"
    );
    expect(inserts).toHaveLength(0);
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("ignores client recipient/slug claims and obtains the product from the paid variant", () => {
    const parsed = parseLemonOrder(
      {
        meta: {
          event_name: "order_created",
          custom_data: {
            field_tool_gift: token,
            recipient_email: "attacker@example.com",
            slug: "mandate-reset",
          },
        },
        data: {
          type: "orders",
          id: "99",
          attributes: {
            store_id: 12,
            user_email: payment.email,
            test_mode: true,
            status: "paid",
            refunded: false,
            updated_at: payment.providerUpdatedAt.toISOString(),
            first_order_item: { variant_id: 34 },
          },
        },
      },
      {
        LEMONSQUEEZY_STORE_ID: "12",
        LEMONSQUEEZY_MODE: "test",
        LEMONSQUEEZY_VARIANT_MAP: '{"34":"ai-stalemate"}',
      }
    );
    expect(parsed).toMatchObject({
      slug: "ai-stalemate",
      email: payment.email,
      giftToken: token,
    });
    expect(parsed).not.toHaveProperty("recipient_email");
  });
});

describe("gift delivery", () => {
  it("sends a recipient notice once and retries with a stable provider idempotency key", async () => {
    emailEnvironment();
    const bound = { ...gift, orderId: "99" };
    const { updates } = database([
      [bound],
      [payment],
      [{ ...bound, notifiedAt: new Date() }],
    ]);
    await notifyGiftRecipient("99");
    await notifyGiftRecipient("99");
    expect(mocks.send).toHaveBeenCalledTimes(1);
    expect(mocks.send.mock.calls[0][0].to).toBe(gift.recipientEmail);
    expect(mocks.send.mock.calls[0][1]).toEqual({
      idempotencyKey: "field-tool-gift/test/99",
    });
    expect(updates[0].value.notifiedAt).toBeInstanceOf(Date);
  });
  it("leaves failed email delivery retryable", async () => {
    emailEnvironment();
    const { updates } = database([[{ ...gift, orderId: "99" }], [payment]]);
    mocks.send.mockResolvedValueOnce({
      error: { message: "provider unavailable" },
    });
    await expect(notifyGiftRecipient("99")).rejects.toThrow("needs retry");
    expect(updates).toHaveLength(0);
  });
  it.each(["inactive", "revoked"])(
    "does not email a gift for a currently %s order",
    async status => {
      emailEnvironment();
      database([[{ ...gift, orderId: "99" }], [{ ...payment, status }]]);
      await notifyGiftRecipient("99");
      expect(mocks.send).not.toHaveBeenCalled();
    }
  );
  it("escapes personal notes and links to recipient sign-in, never a buyer session", () => {
    const mail = giftNotification(
      {
        ...gift,
        senderName: '<img src=x onerror="bad">',
        message: "<script>bad()</script>\nHello & welcome",
      },
      "https://example.com"
    );
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).not.toContain("<img");
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.text).toContain("/field-tools/ai-stalemate/lead-dev/access");
    expect(mail.html).not.toContain("token=");
    expect(mail.html).not.toContain(payment.email);
    expect(mail.text).toContain("don't need to pay");
  });
});
