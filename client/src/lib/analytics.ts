import posthog, { type CaptureResult, type PostHog } from "posthog-js";

const mainHosts = new Set(["www.rebel-leader.com", "rebel-leader.com"]);
let testVisit = false;
const publicPages = new Set([
  "/", "/manifesto", "/archives", "/shelf", "/residency", "/about", "/start",
  "/game", "/book", "/community", "/mirror", "/privacy", "/workbench",
  "/workbench/gravitas", "/workbench/results", "/workbench/codex",
  "/workbench/mirror", "/workbench/mirror/reading", "/workbench/praxis",
  "/workbench/wall", "/game-standalone",
]);
const namedActions = new Set([
  "gravitas_started", "gravitas_completed", "mirror_started", "mirror_completed",
  "codex_loaded", "workbench_locked_plugin_clicked", "newsletter_signup_opened",
]);
const externalDestinations = new Map([
  ["tools.rebel-leader.com", "field_tools"],
  ["leaderrebellion.substack.com", "substack"],
  ["www.youtube.com", "youtube"],
]);

export function analyticsPage(pathname: string) {
  const page = pathname.replace(/\/+$/, "") || "/";
  return publicPages.has(page) ? page : null;
}

function allowed() {
  return typeof window !== "undefined" && mainHosts.has(window.location.hostname) &&
    navigator.doNotTrack !== "1" &&
    !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
}

// Build a fresh payload rather than forwarding SDK defaults, raw URLs, or a
// previous sign-in identity. PostHog uses the user agent transiently for its
// daily cookieless count. It is removed by the ingestion pipeline.
export function analyticsPayload(event: CaptureResult | null): CaptureResult | null {
  if (!event || !allowed()) return null;
  const raw = event.properties;
  if (!publicPages.has(raw.page)) return null;
  const properties: Record<string, unknown> = {
    token: raw.token,
    distinct_id: "$posthog_cookieless",
    $cookieless_mode: true,
    $raw_user_agent: raw.$raw_user_agent,
    $process_person_profile: false,
    $host: "www.rebel-leader.com",
    $current_url: "https://www.rebel-leader.com" + raw.page,
    $pathname: raw.page,
    site: "main_site",
    page: raw.page,
    is_test: testVisit,
  };
  switch (event.event) {
    case "$pageview":
      if (["mobile", "tablet", "desktop"].includes(raw.device)) properties.device = raw.device;
      break;
    case "site_link_clicked":
      if (!publicPages.has(raw.destination) && !["field_tools", "substack", "youtube"].includes(raw.destination)) return null;
      properties.destination = raw.destination;
      break;
    case "site_engagement":
      if (!Number.isSafeInteger(raw.active_seconds) || raw.active_seconds < 1) return null;
      properties.active_seconds = raw.active_seconds;
      break;
    default:
      if (!namedActions.has(event.event)) return null;
      if (event.event === "newsletter_signup_opened" && ["inline", "featured", "field-tool"].includes(raw.placement)) {
        properties.placement = raw.placement;
      }
  }
  return { event: event.event, uuid: event.uuid, timestamp: event.timestamp, properties };
}

let sdk: PostHog | undefined;

export function initPostHog() {
  const key = import.meta.env.VITE_POSTHOG_API_KEY;
  if (sdk || !key || !allowed()) return;
  testVisit = new URLSearchParams(window.location.search).get("analytics_test") === "1";
  sdk = posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
    cookieless_mode: "always",
    person_profiles: "never",
    opt_out_useragent_filter: testVisit,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    autocapture: false,
    capture_dead_clicks: false,
    capture_performance: false,
    capture_exceptions: false,
    enable_heatmaps: false,
    disable_surveys: true,
    disable_external_dependency_loading: true,
    advanced_disable_flags: true,
    before_send: analyticsPayload,
  }, "mainSitePublic");
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  const page = analyticsPage(window.location.pathname);
  if (page && allowed()) sdk?.capture(event, { ...properties, page });
}

const IDLE_MS = 60_000;
const REPORT_MS = 15_000;

// Each route owns its timer. An outgoing page's final seconds belong to that
// page even if the address bar already points to the next one during cleanup.
export function observePage(pathname: string) {
  const page = analyticsPage(pathname);
  if (!page || !allowed()) return;
  initPostHog();
  if (!sdk) return;
  function report(event: string, props: Record<string, unknown>, immediate = false) {
    if (!allowed()) return;
    sdk?.capture(event, { ...props, page }, immediate ? { send_instantly: true, transport: "sendBeacon" } : undefined);
  }
  const view = () => report("$pageview", {
    device: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
  });
  let last = performance.now();
  let lastActivity = last;
  let pendingMs = 0;
  let active = !document.hidden && document.hasFocus();
  function account(now: number) {
    if (active) pendingMs += Math.max(0, Math.min(now, lastActivity + IDLE_MS) - last);
    last = now;
  }
  function flush(immediate = false) {
    account(performance.now());
    const seconds = Math.floor(pendingMs / 1000);
    if (seconds > 0) {
      report("site_engagement", { active_seconds: seconds }, immediate);
      pendingMs -= seconds * 1000;
    }
  }
  function activity() {
    const now = performance.now();
    account(now);
    lastActivity = now;
  }
  function updateVisibility() {
    flush(true);
    active = !document.hidden && document.hasFocus();
    if (active) lastActivity = last;
  }
  function leave() {
    flush(true);
    active = false;
  }
  function restore(event: PageTransitionEvent) {
    if (event.persisted) { updateVisibility(); view(); }
  }
  function linkClick(event: MouseEvent) {
    if (event.type === "auxclick" && event.button !== 1) return;
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(link instanceof HTMLAnchorElement)) return;
    if (!["http:", "https:"].includes(link.protocol)) return;
    const destination = mainHosts.has(link.hostname) ? analyticsPage(link.pathname) : externalDestinations.get(link.hostname);
    if (destination && !(destination === page && link.hash)) report("site_link_clicked", { destination }, true);
  }

  const controller = new AbortController();
  const options = { signal: controller.signal, passive: true };
  window.addEventListener("scroll", activity, { ...options, capture: true });
  window.addEventListener("pointerdown", activity, options);
  window.addEventListener("keydown", activity, options);
  window.addEventListener("blur", updateVisibility, options);
  window.addEventListener("focus", updateVisibility, options);
  window.addEventListener("pagehide", leave, options);
  window.addEventListener("pageshow", restore, options);
  document.addEventListener("visibilitychange", updateVisibility, options);
  document.addEventListener("click", linkClick, { ...options, capture: true });
  document.addEventListener("auxclick", linkClick, { ...options, capture: true });
  const timer = window.setInterval(flush, REPORT_MS);
  view();
  return () => { leave(); controller.abort(); window.clearInterval(timer); };
}
