import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import { once } from "node:events";
import { fieldToolOrders } from "../drizzle/schema";
import { ownsFieldTool } from "../shared/field-tool-entitlements";
import {
  hasFieldTool,
  registerFieldToolCommerce,
  requestBuyerLink,
  parseLemonOrder,
} from "./field-tool-commerce";
import { fieldToolsRouter } from "./field-tools";
import { validateGiftOrder, giftNotification } from "./field-tool-gifts";
const mocks = vi.hoisted(() => ({ getDb: vi.fn(), send: vi.fn() }));
vi.mock("./db", () => ({ getDb: mocks.getDb }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));
const req = {
  headers: { cookie: `rl_field_tools=${"a".repeat(64)}` },
  socket: {},
  ip: "edition-test",
} as any;
const caller = () =>
  fieldToolsRouter.createCaller({
    req,
    res: { setHeader: vi.fn() } as any,
    user: null,
  });
function buyer(slugs: string[]) {
  const insert = vi.fn();
  mocks.getDb.mockResolvedValue({
    select: () => {
      let rows: any[] = [];
      const query: any = {
        from: (table: unknown) => {
          rows =
            table === fieldToolOrders
              ? slugs.map(slug => ({ slug }))
              : [{ email: "buyer@example.com" }];
          return query;
        },
        where: () => query,
        limit: () => query,
        then: (resolve: any) => Promise.resolve(rows).then(resolve),
      };
      return query;
    },
    insert,
  });
  return insert;
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("FIELD_TOOL_PREVIEW", "false");
});
afterEach(() => vi.unstubAllEnvs());
describe("separately purchased AI editions", () => {
  it.each(["pm", "lead-dev"] as const)(
    "allows %s content and denies the other edition at the server",
    async audience => {
      buyer([`ai-stalemate/${audience}`]);
      const other = audience === "pm" ? "lead-dev" : "pm";
      expect(await hasFieldTool(req, "ai-stalemate", audience)).toBe(true);
      expect(await hasFieldTool(req, "ai-stalemate", other)).toBe(false);
      expect(
        (await caller().content({ slug: "ai-stalemate", audience })).audience
      ).toBe(audience);
      await expect(
        caller().content({ slug: "ai-stalemate", audience: other })
      ).rejects.toMatchObject({ code: "FORBIDDEN" });
      expect(
        ownsFieldTool([`ai-stalemate/${audience}`], "ai-stalemate", other)
      ).toBe(false);
    }
  );
  it("retains both editions for legacy purchases and combines two new purchases", async () => {
    for (const slugs of [
      ["ai-stalemate"],
      ["ai-stalemate/pm", "ai-stalemate/lead-dev"],
    ]) {
      buyer(slugs);
      expect(await hasFieldTool(req, "ai-stalemate", "pm")).toBe(true);
      expect(await hasFieldTool(req, "ai-stalemate", "lead-dev")).toBe(true);
    }
  });
  it("protects the PDF endpoint by edition, even with a valid buyer session", async () => {
    buyer(["ai-stalemate/lead-dev"]);
    const app = express();
    registerFieldToolCommerce(app);
    const server = app.listen(0, "127.0.0.1");
    await once(server, "listening");
    const base = `http://127.0.0.1:${(server.address() as any).port}`;
    try {
      expect(
        (
          await fetch(`${base}/api/field-tools/ai-stalemate/pdf?audience=pm`, {
            headers: req.headers,
          })
        ).status
      ).toBe(403);
      const own = await fetch(
        `${base}/api/field-tools/ai-stalemate/pdf?audience=lead-dev`,
        { headers: req.headers }
      );
      expect(own.status).toBe(200);
      expect(own.headers.get("content-type")).toContain("application/pdf");
    } finally {
      server.close();
    }
  });
  it("does not send an access link for an unpurchased edition", async () => {
    const insert = buyer(["ai-stalemate/pm"]);
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("APP_URL", "https://example.com");
    await requestBuyerLink(
      "edition@example.com",
      "ai-stalemate",
      "edition-link-test",
      "lead-dev"
    );
    expect(insert).not.toHaveBeenCalled();
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it("uses the paid variant rather than a custom audience to choose access", () => {
    const payment = {
      meta: {
        event_name: "order_created",
        custom_data: { audience: "lead-dev", slug: "ai-stalemate/lead-dev" },
      },
      data: {
        type: "orders",
        id: "99",
        attributes: {
          store_id: 12,
          user_email: "buyer@example.com",
          test_mode: true,
          status: "paid",
          refunded: false,
          updated_at: "2026-10-14T12:00:00Z",
          first_order_item: { variant_id: 34 },
        },
      },
    };
    expect(
      parseLemonOrder(payment, {
        LEMONSQUEEZY_STORE_ID: "12",
        LEMONSQUEEZY_MODE: "test",
        LEMONSQUEEZY_VARIANT_MAP: '{"34":"ai-stalemate/pm"}',
      })?.slug
    ).toBe("ai-stalemate/pm");
  });
  it("requires the edition's own checkout and variant mapping; never falls back to the old bundle", async () => {
    buyer([]);
    for (const [key, value] of Object.entries({
      DATABASE_URL: "test-db",
      RESEND_API_KEY: "test-key",
      APP_URL: "https://example.com",
      LEMONSQUEEZY_WEBHOOK_SECRET: "test-secret",
      LEMONSQUEEZY_STORE_ID: "12",
      LEMONSQUEEZY_MODE: "test",
      LEMONSQUEEZY_VARIANT_MAP: '{"34":"ai-stalemate"}',
      FIELD_TOOL_AI_STALEMATE_CHECKOUT_URL:
        "https://shop.lemonsqueezy.com/checkout/buy/old",
    }))
      vi.stubEnv(key, value);
    expect(
      (await caller().checkout({ slug: "ai-stalemate", audience: "pm" }))
        .checkoutUrl
    ).toBeNull();
    vi.stubEnv("LEMONSQUEEZY_VARIANT_MAP", '{"35":"ai-stalemate/pm"}');
    expect(
      (await caller().checkout({ slug: "ai-stalemate", audience: "pm" }))
        .checkoutUrl
    ).toBeNull();
    vi.stubEnv(
      "FIELD_TOOL_AI_STALEMATE_PM_CHECKOUT_URL",
      "https://shop.lemonsqueezy.com/checkout/buy/pm"
    );
    expect(
      (await caller().checkout({ slug: "ai-stalemate", audience: "pm" }))
        .checkoutUrl
    ).toContain("/buy/pm");
    expect(
      (await caller().checkout({ slug: "ai-stalemate", audience: "lead-dev" }))
        .checkoutUrl
    ).toBeNull();
  });
  it("binds a gift to its paid edition and sends the matching recipient destination", () => {
    const gift = {
      slug: "ai-stalemate/lead-dev",
      audience: "lead-dev",
      orderId: null,
      senderName: "Alex",
      recipientEmail: "taylor@example.com",
    } as any;
    expect(() =>
      validateGiftOrder(gift, { slug: "ai-stalemate/pm", orderId: "99" })
    ).toThrow();
    expect(
      validateGiftOrder(gift, { slug: "ai-stalemate/lead-dev", orderId: "99" })
    ).toBe(gift);
    const email = giftNotification(gift, "https://example.com");
    expect(email.subject).toContain("Lead Developer");
    expect(email.text).toContain("/ai-stalemate/lead-dev/access");
  });
});
