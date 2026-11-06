import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { analyticsPage, analyticsPayload, observePage } from "../client/src/lib/analytics";
import posthog, { type CaptureResult } from "posthog-js";

const capture = vi.hoisted(() => vi.fn());
vi.mock("posthog-js", () => ({ default: { init: vi.fn(() => ({ capture })) } }));

let focused = true;
let doc: EventTarget & { hidden: boolean; hasFocus: () => boolean };
let win: EventTarget & { location: URL };
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "performance"] });
  vi.stubEnv("VITE_POSTHOG_API_KEY", "test");
  doc = Object.assign(new EventTarget(), { hidden: false, hasFocus: () => focused });
  win = Object.assign(new EventTarget(), { location: new URL("https://www.rebel-leader.com/workbench"),
    innerWidth: 1000, setInterval, clearInterval });
  focused = true;
  vi.stubGlobal("document", doc);
  vi.stubGlobal("window", win);
  vi.stubGlobal("navigator", {});
});
afterEach(() => { vi.clearAllMocks(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

it("sends cookieless counts without identities, scores, form fields, or user-entered URLs", () => {
  const event: CaptureResult = { uuid: "test", event: "gravitas_completed", $set: { email: "PRIVATE" },
    properties: { token: "project", page: "/workbench/gravitas", distinct_id: "PRIVATE",
      $device_id: "PRIVATE", $session_id: "PRIVATE", email: "PRIVATE", archetype: "PRIVATE",
      $current_url: "PRIVATE", $referrer: "PRIVATE", $elements: ["PRIVATE"], $raw_user_agent: "example-UA" } };
  const safe = analyticsPayload(event);
  expect(safe?.properties).toMatchObject({ $cookieless_mode: true, $process_person_profile: false,
    distinct_id: "$posthog_cookieless", $raw_user_agent: "example-UA", page: "/workbench/gravitas" });
  expect(JSON.stringify(safe)).not.toContain("PRIVATE");
  for (const type of ["$snapshot", "$autocapture", "$identify", "unknown"]) {
    expect(analyticsPayload({ ...event, event: type })).toBeNull();
  }
  for (const route of ["/admin", "/auth/verify", "/workbench/wall/PRIVATE", "/unlisted"]) {
    expect(analyticsPage(route)).toBeNull();
    expect(analyticsPayload({ ...event, properties: { page: route } })).toBeNull();
  }
  expect(analyticsPayload({ ...event, event: "site_link_clicked", properties: {
    page: "/workbench", destination: "/workbench/codex?PRIVATE" } })).toBeNull();
});

it("counts foreground seconds once, caps idle time, and attributes route cleanup to the old page", () => {
  const stop = observePage("/workbench");
  expect(posthog.init).toHaveBeenCalledWith("test", expect.objectContaining({
    autocapture: false, disable_session_recording: true, person_profiles: "never", cookieless_mode: "always",
  }), "mainSitePublic");
  const seconds = () => capture.mock.calls.filter(([type]) => type === "site_engagement")
    .reduce((sum, [, props]) => sum + props.active_seconds, 0);
  vi.advanceTimersByTime(90_000);
  expect(seconds()).toBe(60);
  win.dispatchEvent(new Event("pointerdown"));
  vi.advanceTimersByTime(5_000);
  doc.hidden = true; doc.dispatchEvent(new Event("visibilitychange"));
  vi.advanceTimersByTime(30_000);
  expect(seconds()).toBe(65);
  focused = false; doc.hidden = false; doc.dispatchEvent(new Event("visibilitychange"));
  vi.advanceTimersByTime(30_000);
  expect(seconds()).toBe(65);
  focused = true; win.dispatchEvent(new Event("focus"));
  vi.advanceTimersByTime(4_000);
  win.location.pathname = "/workbench/codex";
  stop?.();
  expect(seconds()).toBe(69);
  expect(capture.mock.calls.at(-1)?.[1].page).toBe("/workbench");
  vi.advanceTimersByTime(20_000);
  expect(seconds()).toBe(69);
});

it("skips opt-out signals, private routes and non-production hosts", () => {
  for (const browser of [{ doNotTrack: "1" }, { globalPrivacyControl: true }]) {
    vi.stubGlobal("navigator", browser);
    expect(observePage("/workbench")).toBeUndefined();
  }
  vi.stubGlobal("navigator", {});
  expect(observePage("/auth/verify")).toBeUndefined();
  win.location.hostname = "tools.rebel-leader.com";
  expect(observePage("/")).toBeUndefined();
  expect(capture).not.toHaveBeenCalled();
});
