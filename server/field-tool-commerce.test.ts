import { afterEach, describe, expect, it, vi } from "vitest";
import { createHmac } from "node:crypto";
import express from "express";
import { once } from "node:events";
import {
  parseLemonOrder,
  verifyLemonSignature,
  previewEnabled,
  hashToken,
  allowAttempt,
  hasFieldTool,
  registerFieldToolCommerce,
} from "./field-tool-commerce";
import { fieldToolsRouter } from "./field-tools";
import { aiGuideFor, aiLabFor } from "./field-tool-content/ai-paths";
const env = {
  LEMONSQUEEZY_STORE_ID: "12",
  LEMONSQUEEZY_MODE: "live",
  LEMONSQUEEZY_VARIANT_MAP: '{"34":"ai-stalemate"}',
};
function order(status = "paid", test_mode = false) {
  return {
    meta: {
      event_name: status === "refunded" ? "order_refunded" : "order_created",
    },
    data: {
      type: "orders",
      id: "99",
      attributes: {
        store_id: 12,
        user_email: "Buyer@Example.com",
        test_mode,
        status,
        refunded: status === "refunded",
        updated_at: "2026-10-12T00:00:00.000Z",
        first_order_item: { variant_id: 34 },
      },
    },
  };
}
afterEach(() => vi.unstubAllEnvs());
describe("verified payment boundary", () => {
  it("verifies the raw body and rejects tampering or missing signatures", () => {
    const body = Buffer.from(JSON.stringify(order()));
    const sig = createHmac("sha256", "secret").update(body).digest("hex");
    expect(verifyLemonSignature(body, sig, "secret")).toBe(true);
    expect(
      verifyLemonSignature(Buffer.from(body.toString() + " "), sig, "secret")
    ).toBe(false);
    expect(verifyLemonSignature(body, "", "secret")).toBe(false);
    expect(verifyLemonSignature(body, sig, "")).toBe(false);
  });
  it("uses a configured variant, never checkout custom data, to grant a tool", () => {
    const payload = {
      ...order(),
      meta: {
        event_name: "order_created",
        custom_data: { slug: "mandate-reset", paid: true },
      },
    };
    expect(parseLemonOrder(payload, env)?.slug).toBe("ai-stalemate");
    expect(
      parseLemonOrder(payload, { ...env, LEMONSQUEEZY_VARIANT_MAP: "{}" })
    ).toBeNull();
  });
  it("rejects another store and separates test purchases from live access", () => {
    expect(() =>
      parseLemonOrder(order(), { ...env, LEMONSQUEEZY_STORE_ID: "13" })
    ).toThrow();
    expect(() => parseLemonOrder(order("paid", true), env)).toThrow();
    expect(
      parseLemonOrder(order("paid", true), {
        ...env,
        LEMONSQUEEZY_MODE: "test",
      })?.status
    ).toBe("active");
    expect(() =>
      parseLemonOrder(order(), { ...env, LEMONSQUEEZY_MODE: "" })
    ).toThrow();
  });
  it.each([
    ["paid", "active"],
    ["partial_refund", "active"],
    ["refunded", "revoked"],
    ["fraudulent", "revoked"],
    ["pending", "inactive"],
    ["failed", "inactive"],
  ])("handles %s orders as %s", (status, expected) => {
    expect(parseLemonOrder(order(status), env)?.status).toBe(expected);
  });
  it("requires a valid provider timestamp and normalizes purchase email", () => {
    expect(parseLemonOrder(order(), env)?.email).toBe("buyer@example.com");
    const p = order();
    p.data.attributes.updated_at = "bad";
    expect(() => parseLemonOrder(p, env)).toThrow();
  });
  it("does not store raw access secrets", () => {
    const token = "a".repeat(64);
    expect(hashToken(token)).toHaveLength(64);
    expect(hashToken(token)).not.toBe(token);
  });
  it("limits repeated access-email requests and allows them after the window", () => {
    const k = "test-" + Math.random();
    for (let i = 0; i < 5; i++) expect(allowAttempt(k, 100)).toBe(true);
    expect(allowAttempt(k, 100)).toBe(false);
    expect(allowAttempt(k, 100 + 16 * 60 * 1000)).toBe(true);
  });
  it("preview defaults off and cannot bypass a live store", () => {
    expect(previewEnabled({})).toBe(false);
    expect(previewEnabled({ FIELD_TOOL_PREVIEW: "true" })).toBe(true);
    expect(
      previewEnabled({ FIELD_TOOL_PREVIEW: "true", LEMONSQUEEZY_MODE: "live" })
    ).toBe(false);
  });
  it("denies anonymous paid content and PDF delivery, including the old public URL", async () => {
    vi.stubEnv("FIELD_TOOL_PREVIEW", "false");
    vi.stubEnv("LEMONSQUEEZY_WEBHOOK_SECRET", "secret");
    const app = express();
    registerFieldToolCommerce(app);
    const server = app.listen(0, "127.0.0.1");
    await once(server, "listening");
    const a = server.address() as { port: number };
    const base = `http://127.0.0.1:${a.port}`;
    try {
      expect(
        (await fetch(base + "/api/field-tools/ai-stalemate/pdf")).status
      ).toBe(403);
      expect(
        (await fetch(base + "/assets/field-tools/ai-stalemate-field-guide.pdf"))
          .status
      ).toBe(410);
      expect(
        (
          await fetch(base + "/api/field-tools/lemon-webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order()),
          })
        ).status
      ).toBe(401);
    } finally {
      server.close();
    }
    const caller = fieldToolsRouter.createCaller({
      req: { headers: {}, socket: {} } as any,
      res: { setHeader: vi.fn() } as any,
      user: null,
    });
    await expect(
      caller.content({ slug: "ai-stalemate", audience: "pm" })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    for (const slug of [
      "deadline-reset",
      "priority-whiplash",
      "mandate-reset",
      "when-the-team-goes-quiet",
    ]) {
      await expect(
        caller.content({ slug, audience: "pm" })
      ).rejects.toMatchObject({ code: "FORBIDDEN" });
    }
    expect(await caller.access()).toMatchObject({ signedIn: false, slugs: [] });
    expect(
      await caller.checkout({ slug: "ai-stalemate", audience: "pm" })
    ).toEqual({ checkoutUrl: null, provider: null });
  });
});
describe("distinct AI Stalemate paths", () => {
  it("has role-specific guides and private preparation without a role dropdown", () => {
    expect(aiGuideFor("pm")[0].title).toContain("Your lead");
    expect(aiGuideFor("lead-dev")[0].title).toContain("Your PM");
    for (const role of ["pm", "lead-dev"] as const) {
      expect(aiLabFor(role).steps[0].fields.some(f => f.id === "side")).toBe(
        false
      );
    }
    expect(aiLabFor("pm").steps[0].fields[0].label).not.toBe(
      aiLabFor("lead-dev").steps[0].fields[0].label
    );
  });
  it("keeps shared evidence standards and does not mutate either path", () => {
    const pm = aiLabFor("pm"),
      dev = aiLabFor("lead-dev");
    expect(dev.steps[1].fields.map(f => f.id)).toEqual(
      expect.arrayContaining([
        ...pm.steps[1].fields.map(f => f.id),
        "changeRequested",
        "engineeringPosition",
        "alternatives",
      ])
    );
    expect(aiGuideFor("pm")).toEqual(aiGuideFor("pm"));
    expect(aiGuideFor("pm")[0].intro).not.toBe(aiGuideFor("lead-dev")[0].intro);
  });
});
