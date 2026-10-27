import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sdk = vi.hoisted(() => ({
  init: vi.fn(),
  capture: vi.fn(),
  identify: vi.fn(),
  reset: vi.fn(),
  stopSessionRecording: vi.fn(),
  set_config: vi.fn(),
}));
vi.mock("posthog-js", () => ({ default: sdk }));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.stubEnv("VITE_POSTHOG_API_KEY", "test-key");
  vi.stubGlobal("window", { location: { pathname: "/about" } });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("Field Tool analytics privacy", () => {
  it("never initializes analytics on a direct Field Tool visit", async () => {
    window.location.pathname = "/field-tools/ai-stalemate/pm/lab";
    const analytics = await import("../client/src/lib/analytics");
    analytics.initPostHog();
    analytics.trackEvent("private", { answer: "DO_NOT_SEND" });
    analytics.identifyUser(1, "private@example.com");
    expect(sdk.init).not.toHaveBeenCalled();
    expect(sdk.capture).not.toHaveBeenCalled();
    expect(sdk.identify).not.toHaveBeenCalled();
  });

  it("stops recording on SPA entry and stays stopped on exit and reentry", async () => {
    const analytics = await import("../client/src/lib/analytics");
    analytics.initPostHog();
    const config = sdk.init.mock.calls[0][1];
    expect(config.session_recording).toMatchObject({
      maskAllInputs: true,
      blockClass: "ph-no-capture",
    });
    const event = { event: "$autocapture", properties: { text: "PUBLIC" } };
    expect(config.before_send(event)).toBe(event);
    window.location.pathname = "/field-tools/ai-stalemate/lead-dev/lab";
    analytics.protectFieldToolPrivacy(window.location.pathname);
    expect(sdk.stopSessionRecording).toHaveBeenCalledOnce();
    expect(sdk.set_config).toHaveBeenCalledWith({
      disable_session_recording: true,
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
    });
    for (const pathname of ["/about", "/field-tools/ai-stalemate/pm/access"]) {
      window.location.pathname = pathname;
      analytics.protectFieldToolPrivacy(pathname);
      analytics.initPostHog();
      analytics.trackEvent("draft", { text: "DO_NOT_SEND" });
      analytics.identifyUser(1, "private@example.com");
      expect(
        config.before_send({
          event: "$snapshot",
          properties: { text: "DO_NOT_SEND" },
        })
      ).toBeNull();
    }
    expect(sdk.init).toHaveBeenCalledOnce();
    expect(sdk.capture).not.toHaveBeenCalled();
    expect(sdk.identify).not.toHaveBeenCalled();
  });

  it("blocks SDK events immediately after URL changes, before the route effect", async () => {
    const analytics = await import("../client/src/lib/analytics");
    analytics.initPostHog();
    window.location.pathname = "/field-tools/sign-in";
    const config = sdk.init.mock.calls[0][1];
    expect(
      config.before_send({
        event: "$autocapture",
        properties: { email: "DO_NOT_SEND" },
      })
    ).toBeNull();
    expect(sdk.stopSessionRecording).toHaveBeenCalledOnce();
  });

  it("keeps ordinary marketing events available outside the Field Tools", async () => {
    const analytics = await import("../client/src/lib/analytics");
    analytics.initPostHog();
    analytics.trackEvent("public-link", { source: "about" });
    expect(sdk.capture).toHaveBeenCalledWith("public-link", {
      source: "about",
    });
  });
});
