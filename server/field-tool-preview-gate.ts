import { createHash, timingSafeEqual } from "node:crypto";
import type { RequestHandler } from "express";

/** Preview bypass exposes paid content, so deployed previews need their own door. */
export function fieldToolPreviewGate(env = process.env): RequestHandler {
  return (req, res, next) => {
    if (
      env.FIELD_TOOL_PREVIEW !== "true" ||
      env.LEMONSQUEEZY_MODE === "live" ||
      env.NODE_ENV === "development" ||
      env.NODE_ENV === "test"
    )
      return next();

    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    // Contains no content or configuration; safe for platform health probes.
    if (req.method === "GET" && req.path === "/healthz") {
      res.status(200).send("ok");
      return;
    }
    const expected = env.FIELD_TOOL_PREVIEW_PASSWORD_HASH;
    if (!expected || !/^[a-f0-9]{64}$/.test(expected)) {
      res
        .status(503)
        .type("text")
        .send(
          "This private preview is being prepared. Please try again later."
        );
      return;
    }
    const match = /^Basic ([A-Za-z0-9+/]+={0,2})$/i.exec(
      req.headers.authorization || ""
    );
    const credentials = match
      ? Buffer.from(match[1], "base64").toString("utf8")
      : "";
    const colon = credentials.indexOf(":");
    const user = colon < 0 ? "" : credentials.slice(0, colon);
    const password = colon < 0 ? "" : credentials.slice(colon + 1);
    const digest = createHash("sha256").update(password).digest();
    if (
      user === "review" &&
      timingSafeEqual(digest, Buffer.from(expected, "hex"))
    ) {
      next();
      return;
    }
    res.setHeader(
      "WWW-Authenticate",
      'Basic realm="Rebel Leaders private review", charset="UTF-8"'
    );
    res
      .status(401)
      .type("text")
      .send(
        "This is Nic’s private review site. Please use the review sign-in provided to you."
      );
  };
}
