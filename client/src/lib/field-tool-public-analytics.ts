import posthog, { type CaptureResult, type PostHog } from "posthog-js";

const HOST = "tools.rebel-leader.com";
const ORIGIN = `https://${HOST}`;
export const PUBLIC_ACTIONS = new Set([
  "edition_pm",
  "edition_lead-dev",
  "buy",
  "gift",
  "checkout",
  "example_1",
  "example_2",
  "example_3",
  "newsletter_open",
  "get_help",
]);
const EVENTS = new Set([
  "field_tools_page_viewed",
  "field_tools_action",
  "field_tools_engagement",
]);

export function publicFieldToolPage(path: string) {
  if (path === "/field-tools" || path === "/field-tools/")
    return { page: "catalogue", edition: "none", path: "/field-tools" };
  const match = path.match(
    /^\/field-tools\/ai-stalemate\/(pm|lead-dev)(\/buy)?\/?$/
  );
  return match
    ? {
        page: match[2] ? "purchase" : "edition",
        edition: match[1],
        path: path.replace(/\/$/, ""),
      }
    : null;
}

export function publicAnalyticsAllowed(
  host: string,
  path: string,
  privacy: { doNotTrack?: string | null; globalPrivacyControl?: boolean }
) {
  return (
    host === HOST &&
    Boolean(publicFieldToolPage(path)) &&
    privacy.doNotTrack !== "1" &&
    privacy.globalPrivacyControl !== true
  );
}

// A strict allowlist also strips the SDK's default URL, referrer, session and
// person properties. Neither query strings nor arbitrary event data leave here.
export function sanitizePublicEvent(
  event: CaptureResult | null,
  path: string
): CaptureResult | null {
  const page = publicFieldToolPage(path);
  if (!event || !page || !EVENTS.has(event.event)) return null;
  const raw = event.properties;
  if (event.event === "field_tools_action" && !PUBLIC_ACTIONS.has(raw.action))
    return null;
  const properties: Record<string, unknown> = {
    token: raw.token,
    distinct_id: "$posthog_cookieless",
    $cookieless_mode: true,
    $process_person_profile: false,
    $current_url: ORIGIN + page.path,
    $host: HOST,
    $pathname: page.path,
    site: "field_tools",
    page: page.page,
    edition: page.edition,
    is_test: raw.is_test === true,
  };
  if (event.event === "field_tools_action") properties.action = raw.action;
  if (event.event === "field_tools_page_viewed") {
    const sources = [
      "direct",
      "rebel_leader",
      "substack",
      "youtube",
      "linkedin",
      "search",
      "other",
    ];
    properties.source = sources.includes(raw.source) ? raw.source : "other";
    properties.device = ["mobile", "tablet", "desktop"].includes(raw.device)
      ? raw.device
      : "desktop";
  }
  if (event.event === "field_tools_engagement") {
    properties.active_seconds = Math.min(
      30,
      Math.max(0, Math.round(Number(raw.active_seconds) || 0))
    );
    properties.scroll_percent = Math.min(
      100,
      Math.max(0, Math.round(Number(raw.scroll_percent) || 0))
    );
  }
  return {
    event: event.event,
    uuid: event.uuid,
    timestamp: event.timestamp,
    properties,
  };
}

export function referralCategory(referrer: string) {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    const domain = (name: string) => host === name || host.endsWith(`.${name}`);
    if (domain("rebel-leader.com")) return "rebel_leader";
    if (domain("substack.com")) return "substack";
    if (domain("youtube.com") || domain("youtu.be")) return "youtube";
    if (domain("linkedin.com")) return "linkedin";
    if (["google.com", "bing.com", "duckduckgo.com"].some(domain))
      return "search";
    return "other";
  } catch {
    return "other";
  }
}

let sdk: PostHog | undefined;
let privateDocument = false;
let testDocument = false;
function allowed() {
  const { hostname, pathname } = window.location;
  // No restart after entering any private Field Tool within this document.
  if (pathname.startsWith("/field-tools/") && !publicFieldToolPage(pathname))
    privateDocument = true;
  return (
    !privateDocument && publicAnalyticsAllowed(hostname, pathname, navigator)
  );
}

/** Explicit public events only. Never called with answers, email, or DOM text. */
export function startPublicFieldToolAnalytics() {
  // Keep explicitly marked browser QA out of customer reports, including SPA
  // navigation, and let it pass the SDK's automated-browser filter.
  testDocument ||=
    new URLSearchParams(window.location.search).get("analytics_test") === "1";
  if (!allowed() || !import.meta.env.VITE_POSTHOG_API_KEY) {
    if (testDocument)
      console.info("Field Tools analytics QA", {
        allowed: allowed(),
        configured: Boolean(import.meta.env.VITE_POSTHOG_API_KEY),
      });
    return () => {};
  }
  if (!sdk) {
    sdk = posthog.init(
      import.meta.env.VITE_POSTHOG_API_KEY,
      {
        api_host:
          import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
        cookieless_mode: "always",
        opt_out_useragent_filter: testDocument,
        person_profiles: "never",
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        capture_dead_clicks: false,
        capture_performance: false,
        capture_exceptions: false,
        enable_heatmaps: false,
        disable_session_recording: true,
        disable_surveys: true,
        advanced_disable_flags: true,
        disable_external_dependency_loading: true,
        before_send: event =>
          allowed()
            ? sanitizePublicEvent(event, window.location.pathname)
            : null,
      },
      "fieldToolsPublic"
    );
  }
  const path = window.location.pathname;
  // This flag is safe to expose; no other query value is captured.
  const isTest = testDocument;
  const capture = (event: string, properties: Record<string, unknown> = {}) => {
    if (allowed() && window.location.pathname === path)
      sdk?.capture(event, { ...properties, is_test: isTest });
  };
  capture("field_tools_page_viewed", {
    source: referralCategory(document.referrer),
    device:
      window.innerWidth < 768
        ? "mobile"
        : window.innerWidth < 1024
          ? "tablet"
          : "desktop",
  });
  let last = performance.now();
  let seconds = 0;
  let visible = document.visibilityState === "visible";
  let scroll = 0;
  let recentActivity = last;
  const activity = () => {
    recentActivity = performance.now();
  };
  const updateScroll = () => {
    activity();
    const height = document.documentElement.scrollHeight - window.innerHeight;
    scroll = Math.max(
      scroll,
      height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 100
    );
  };
  const accountTime = () => {
    const now = performance.now();
    if (visible && last - recentActivity < 60000)
      seconds +=
        Math.max(0, Math.min(now, recentActivity + 60000) - last) / 1000;
    last = now;
  };
  const flush = () => {
    accountTime();
    if (seconds >= 1)
      capture("field_tools_engagement", {
        active_seconds: Math.min(seconds, 30),
        scroll_percent: scroll,
      });
    seconds = 0;
  };
  const visibility = () => {
    flush();
    visible = document.visibilityState === "visible";
    if (visible) activity();
  };
  const click = (event: MouseEvent) => {
    activity();
    const element =
      event.target instanceof Element
        ? event.target.closest("[data-ft-action]")
        : null;
    const action = element?.getAttribute("data-ft-action");
    if (action && PUBLIC_ACTIONS.has(action))
      capture("field_tools_action", { action });
  };
  const timer = window.setInterval(flush, 15000);
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("pointerdown", activity, { passive: true });
  window.addEventListener("keydown", activity);
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", visibility);
  document.addEventListener("click", click, true);
  updateScroll();
  return () => {
    flush();
    clearInterval(timer);
    window.removeEventListener("scroll", updateScroll);
    window.removeEventListener("pointerdown", activity);
    window.removeEventListener("keydown", activity);
    window.removeEventListener("pagehide", flush);
    document.removeEventListener("visibilitychange", visibility);
    document.removeEventListener("click", click, true);
  };
}
