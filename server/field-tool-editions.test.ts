import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import { once } from "node:events";
import { fieldToolOrders } from "../drizzle/schema";
import { ownsFieldTool } from "../shared/field-tool-entitlements";
import {
  hasFieldTool,
  registerFieldToolCommerce,
  requestBuyerLink,
  hashToken,
  LINK_REQUEST_COOKIE,
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
  it.each(["rejected", "thrown"])(
    "cleans up a %s email delivery and allows a new link on retry",
    async failure => {
      const insert = buyer(["ai-stalemate/lead-dev"]);
      insert.mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) });
      const db = await mocks.getDb();
      const removeToken = vi.fn().mockResolvedValue(undefined);
      db.delete = vi.fn().mockReturnValue({ where: removeToken });
      vi.stubEnv("RESEND_API_KEY", "test-key");
      vi.stubEnv("APP_URL", "https://tools.example.com");
      if (failure === "rejected")
        mocks.send.mockResolvedValueOnce({
          error: { message: "provider unavailable" },
        });
      else mocks.send.mockRejectedValueOnce(new Error("network unavailable"));
      await expect(
        requestBuyerLink(
          `${failure}@example.com`,
          "ai-stalemate",
          `retry-${failure}`,
          "lead-dev"
        )
      ).rejects.toThrow("Please try again");
      expect(removeToken).toHaveBeenCalledOnce();
      mocks.send.mockResolvedValueOnce({
        data: { id: "delivered" },
        error: null,
      });
      await requestBuyerLink(
        `${failure}@example.com`,
        "ai-stalemate",
        `retry-${failure}`,
        "lead-dev"
      );
      expect(mocks.send).toHaveBeenCalledTimes(2);
      expect(mocks.send.mock.calls[1][0].replyTo).toBe(
        "hello@rebel-leader.com"
      );
      expect(removeToken).toHaveBeenCalledOnce();
    }
  );
  it.each([
    "tools.rebel-leader.com",
    "field-tools-reviewers-production.up.railway.app",
  ])(
    "pairs the emailed sign-in link with the requesting browser on %s",
    async hostname => {
      const insert = buyer(["ai-stalemate/lead-dev"]);
      insert.mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) });
      mocks.send.mockResolvedValue({ data: { id: "test" }, error: null });
      vi.stubEnv("RESEND_API_KEY", "test-key");
      vi.stubEnv("APP_URL", "https://tools.rebel-leader.com");
      vi.stubEnv(
        "FIELD_TOOL_LEGACY_ORIGINS",
        "https://field-tools-reviewers-production.up.railway.app"
      );
      const cookie = vi.fn();
      const client = fieldToolsRouter.createCaller({
        req: { ...req, hostname } as any,
        res: { setHeader: vi.fn(), cookie } as any,
        user: null,
      });
      await client.requestAccess({
        email: "migration@example.com",
        slug: "ai-stalemate",
        audience: "lead-dev",
      });
      const message = mocks.send.mock.calls[0][0];
      expect(message.text).toContain(
        `https://${hostname}/field-tools/sign-in?slug=ai-stalemate&audience=lead-dev#token=`
      );
      const token = message.text.match(/#token=([a-f0-9]{64})/)[1];
      expect(cookie).toHaveBeenCalledWith(LINK_REQUEST_COOKIE, hashToken(token), expect.objectContaining({ httpOnly: true, maxAge: 900000 }));
    }
  );
  it("only auto-redeems in the browser that requested this exact link", async () => {
    const token = "c".repeat(64);
    const transaction = vi.fn().mockResolvedValue({ session: "signed-in", slug: "ai-stalemate/pm" });
    mocks.getDb.mockResolvedValue({ transaction });
    const client = (marker: string) => fieldToolsRouter.createCaller({
      req: { ...req, headers: { cookie: `${LINK_REQUEST_COOKIE}=${marker}` } },
      res: { cookie: vi.fn() } as any,
      user: null,
    });
    for (const other of ["", hashToken("a different link")]) {
      await expect(client(other).redeemAccess({ token, automatic: true })).resolves.toEqual({ needsConfirmation: true });
    }
    expect(transaction).not.toHaveBeenCalled();
    await expect(client(hashToken(token)).redeemAccess({ token, automatic: true })).resolves.toMatchObject({ slug: "ai-stalemate/pm" });
    await expect(client("").redeemAccess({ token })).resolves.toMatchObject({ slug: "ai-stalemate/pm" });
    expect(transaction).toHaveBeenCalledTimes(2);
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
