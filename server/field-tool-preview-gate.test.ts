import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { fieldToolPreviewGate } from "./field-tool-preview-gate";

const env = {
  NODE_ENV: "production",
  FIELD_TOOL_PREVIEW: "true",
  FIELD_TOOL_PREVIEW_PASSWORD_HASH: createHash("sha256")
    .update("private-test-only")
    .digest("hex"),
};
function request(
  authorization = "",
  changes = {},
  path = "/field-tools/review"
) {
  const next = vi.fn();
  const res = {
    setHeader: vi.fn(),
    status: vi.fn(),
    type: vi.fn(),
    send: vi.fn(),
  };
  res.status.mockReturnValue(res);
  res.type.mockReturnValue(res);
  fieldToolPreviewGate({ ...env, ...changes })(
    { method: "GET", path, headers: { authorization } } as any,
    res as any,
    next
  );
  return { res, next };
}
const basic = (value: string) =>
  `Basic ${Buffer.from(value).toString("base64")}`;
describe("private preview boundary", () => {
  it.each([
    "/field-tools/review",
    "/api/field-tools/content",
    "/assets/field-tools/example.pdf",
    "/",
  ])("blocks anonymous access to %s", path => {
    const { res, next } = request("", {}, path);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.setHeader).toHaveBeenCalledWith("Cache-Control", "no-store");
  });
  it.each([
    "Bearer anything",
    "Basic !!!",
    basic("review:wrong"),
    basic("other:private-test-only"),
  ])("rejects invalid credentials: %s", header => {
    const { res, next } = request(header);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });
  it("opens the preview for the review credential", () => {
    const { next } = request(basic("review:private-test-only"));
    expect(next).toHaveBeenCalledOnce();
  });
  it.each([undefined, "bad"])(
    "fails closed when the configured hash is %s",
    hash => {
      const { res, next } = request(basic("review:private-test-only"), {
        FIELD_TOOL_PREVIEW_PASSWORD_HASH: hash,
      });
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(503);
    }
  );
  it.each([
    { FIELD_TOOL_PREVIEW: "false" },
    { LEMONSQUEEZY_MODE: "live" },
    { NODE_ENV: "development" },
    { NODE_ENV: "test" },
  ])(
    "leaves buyer auth or local development to its own controls: %o",
    changes => {
      expect(request("", changes).next).toHaveBeenCalledOnce();
    }
  );
  it("allows only a minimal health response without content", () => {
    const { res, next } = request("", {}, "/healthz");
    expect(next).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith("ok");
  });
});
