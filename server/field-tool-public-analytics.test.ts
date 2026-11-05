import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sdk = vi.hoisted(() => ({ init: vi.fn(), capture: vi.fn() }));
vi.mock("posthog-js", () => ({ default: sdk }));
let clock = 0;
beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.useFakeTimers();
  clock = 0;
  vi.stubGlobal("performance", { now: () => clock });
  vi.stubGlobal("navigator", { doNotTrack: null, globalPrivacyControl: false });
  vi.stubGlobal(
    "window",
    Object.assign(new EventTarget(), {
      location: {
        hostname: "tools.rebel-leader.com",
        pathname: "/field-tools",
        search: "",
      },
      innerWidth: 1200,
      innerHeight: 800,
      scrollY: 0,
      setInterval,
    })
  );
  vi.stubGlobal(
    "document",
    Object.assign(new EventTarget(), {
      referrer: "https://www.linkedin.com/feed/?private=DO_NOT_SEND",
      visibilityState: "visible",
      documentElement: { scrollHeight: 2400 },
    })
  );
  vi.stubEnv("VITE_POSTHOG_API_KEY", "phc_test");
  sdk.init.mockReturnValue(sdk);
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("Public Field Tools analytics", () => {
  it("allows only exact public routes on the customer domain", async () => {
    const { publicAnalyticsAllowed: allowed } = await import(
      "../client/src/lib/field-tool-public-analytics"
    );
    for (const path of [
      "/field-tools",
      "/field-tools/ai-stalemate/pm",
      "/field-tools/ai-stalemate/lead-dev/buy",
    ]) {
      expect(allowed("tools.rebel-leader.com", path, {})).toBe(true);
      expect(allowed("preview.up.railway.app", path, {})).toBe(false);
    }
    for (const path of [
      "/field-tools/review",
      "/field-tools/sign-in",
      "/field-tools/ai-stalemate/pm/access",
      "/field-tools/ai-stalemate/lead-dev/guide",
      "/field-tools/ai-stalemate/lead-dev/lab/delivery",
      "/api/field-tools/verify",
      "/about",
    ]) {
      expect(allowed("tools.rebel-leader.com", path, {})).toBe(false);
    }
  });
  it("honors privacy signals and never initializes on private entry", async () => {
    const {
      publicAnalyticsAllowed: allowed,
      startPublicFieldToolAnalytics: start,
    } = await import("../client/src/lib/field-tool-public-analytics");
    expect(
      allowed("tools.rebel-leader.com", "/field-tools", { doNotTrack: "1" })
    ).toBe(false);
    expect(
      allowed("tools.rebel-leader.com", "/field-tools", {
        globalPrivacyControl: true,
      })
    ).toBe(false);
    window.location.pathname = "/field-tools/ai-stalemate/pm/access";
    start();
    window.location.pathname = "/field-tools";
    start();
    expect(sdk.init).not.toHaveBeenCalled();
  });
  it("disables automatic collection and strips SDK-added identifiers and URLs", async () => {
    const { startPublicFieldToolAnalytics: start } = await import(
      "../client/src/lib/field-tool-public-analytics"
    );
    window.location.search =
      "?token=DO_NOT_SEND&email=private@example.com&analytics_test=1";
    const stop = start();
    const config = sdk.init.mock.calls[0][1];
    expect(config).toMatchObject({
      cookieless_mode: "always",
      person_profiles: "never",
      autocapture: false,
      capture_pageview: false,
      disable_session_recording: true,
      disable_external_dependency_loading: true,
      advanced_disable_flags: true,
    });
    const sanitized = config.before_send({
      event: "field_tools_action",
      properties: {
        action: "buy",
        token: "phc_test",
        distinct_id: "person@example.com",
        email: "DO_NOT_SEND",
        answer: "DO_NOT_SEND",
        $current_url: "https://tools.rebel-leader.com/?token=DO_NOT_SEND",
        $referrer: "DO_NOT_SEND",
        $session_id: "DO_NOT_SEND",
        $set: { name: "DO_NOT_SEND" },
      },
    });
    expect(JSON.stringify(sanitized)).not.toContain("DO_NOT_SEND");
    expect(JSON.stringify(sanitized)).not.toContain("person@example.com");
    expect(sanitized.properties).toMatchObject({
      distinct_id: "$posthog_cookieless",
      $cookieless_mode: true,
      action: "buy",
      $current_url: "https://tools.rebel-leader.com/field-tools",
    });
    expect(sdk.capture).toHaveBeenCalledWith(
      "field_tools_page_viewed",
      expect.objectContaining({ source: "linkedin", is_test: true })
    );
    expect(
      config.before_send({ event: "$snapshot", properties: {} })
    ).toBeNull();
    expect(
      config.before_send({
        event: "field_tools_action",
        properties: { action: "answer text" },
      })
    ).toBeNull();
    stop();
  });
  it("blocks delayed SDK events immediately on entering a private URL, including on Back", async () => {
    const { startPublicFieldToolAnalytics: start } = await import(
      "../client/src/lib/field-tool-public-analytics"
    );
    const stop = start();
    const config = sdk.init.mock.calls[0][1];
    window.location.pathname = "/field-tools/ai-stalemate/pm/lab";
    expect(
      config.before_send({ event: "field_tools_page_viewed", properties: {} })
    ).toBeNull();
    window.location.pathname = "/field-tools";
    expect(
      config.before_send({ event: "field_tools_page_viewed", properties: {} })
    ).toBeNull();
    stop();
  });
  it("counts visible active time in increments, never hidden time", async () => {
    const { startPublicFieldToolAnalytics: start } = await import(
      "../client/src/lib/field-tool-public-analytics"
    );
    const stop = start();
    clock = 15000;
    vi.advanceTimersByTime(15000);
    expect(sdk.capture).toHaveBeenLastCalledWith(
      "field_tools_engagement",
      expect.objectContaining({ active_seconds: 15 })
    );
    Object.assign(document, { visibilityState: "hidden" });
    document.dispatchEvent(new Event("visibilitychange"));
    sdk.capture.mockClear();
    clock = 45000;
    vi.advanceTimersByTime(30000);
    expect(sdk.capture).not.toHaveBeenCalled();
    Object.assign(document, { visibilityState: "visible" });
    document.dispatchEvent(new Event("visibilitychange"));
    clock = 50000;
    stop();
    expect(sdk.capture).toHaveBeenLastCalledWith(
      "field_tools_engagement",
      expect.objectContaining({ active_seconds: 5 })
    );
    sdk.capture.mockClear();
    clock = 80000;
    vi.advanceTimersByTime(30000);
    expect(sdk.capture).not.toHaveBeenCalled();
  });
  it("does not count idle background reading indefinitely", async () => {
    const { startPublicFieldToolAnalytics: start } = await import(
      "../client/src/lib/field-tool-public-analytics"
    );
    const stop = start();
    for (let i = 1; i <= 8; i++) {
      clock = i * 15000;
      vi.advanceTimersByTime(15000);
    }
    const total = sdk.capture.mock.calls
      .filter(([event]) => event === "field_tools_engagement")
      .reduce((sum, [, props]) => sum + props.active_seconds, 0);
    expect(total).toBe(60);
    stop();
  });
  it("classifies sources without sending URLs or trusting lookalike domains", async () => {
    const { referralCategory } = await import(
      "../client/src/lib/field-tool-public-analytics"
    );
    expect(
      referralCategory("https://rebel-leader.com/about?token=private")
    ).toBe("rebel_leader");
    expect(referralCategory("https://linkedin.com.attacker.example/path")).toBe(
      "other"
    );
    expect(referralCategory("")).toBe("direct");
  });
});
