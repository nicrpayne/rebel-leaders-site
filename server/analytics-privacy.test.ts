import { afterEach, expect, it, vi } from "vitest";
import { analyticsPayload, identifyUser, initPostHog } from "../client/src/lib/analytics";
import posthog from "posthog-js";

vi.mock("posthog-js", () => ({ default: { init: vi.fn(), identify: vi.fn() } }));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

it("disables recording and form autocapture even for signed-in visits", () => {
  vi.stubGlobal("window", { location: new URL("https://example.com/about") });
  vi.stubEnv("VITE_POSTHOG_API_KEY", "test");
  initPostHog();
  expect(posthog.init).toHaveBeenCalledWith("test", expect.objectContaining({
    disable_session_recording: true, autocapture: false, before_send: analyticsPayload,
  }));
  identifyUser(42);
  expect(posthog.identify).toHaveBeenCalledWith("42");
});

it("drops replay, input events, private URLs and profile fields while keeping named actions", () => {
  vi.stubGlobal("window", { location: new URL("https://example.com/workbench/wall/PRIVATE?note=PRIVATE#PRIVATE") });
  const event = {
    uuid: "test", event: "newsletter_signup_opened",
    properties: { token: "project", placement: "inline", email: "PRIVATE", $set: { name: "PRIVATE" },
      $current_url: "PRIVATE", $referrer: "PRIVATE", $elements: ["PRIVATE"] },
    $set: { email: "PRIVATE" }, $set_once: { $initial_current_url: "PRIVATE" },
  };
  for (const type of ["$snapshot", "$autocapture", "$copy_autocapture", "$exception", "PRIVATE"]) {
    expect(analyticsPayload({ ...event, event: type })).toBeNull();
  }
  expect(analyticsPayload(event)?.properties).toEqual({
    token: "project", placement: "inline",
    $current_url: "https://example.com/workbench/wall", $pathname: "/workbench/wall",
  });
  expect(JSON.stringify(analyticsPayload(event))).not.toContain("PRIVATE");
});
