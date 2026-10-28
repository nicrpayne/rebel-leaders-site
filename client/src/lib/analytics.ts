import posthog from "posthog-js";

let initialized = false;
let privateVisit = false;

export function isFieldToolPath(pathname: string) {
  return pathname === "/field-tools" || pathname.startsWith("/field-tools/");
}

// Once a document enters the Field Tools, keep analytics off until a full
// reload. This avoids restarting recording on Back/Forward or a delayed SDK
// callback, and does not overwrite the visitor's own consent preferences.
export function protectFieldToolPrivacy(pathname: string) {
  if (!isFieldToolPath(pathname) || privateVisit) return;
  privateVisit = true;
  if (!initialized) return;
  posthog.stopSessionRecording();
  posthog.set_config({
    disable_session_recording: true,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
  });
}

function mayCapture() {
  if (typeof window === "undefined") return false;
  protectFieldToolPrivacy(window.location.pathname);
  return initialized && !privateVisit;
}

export function initPostHog() {
  if (typeof window === "undefined") return;
  protectFieldToolPrivacy(window.location.pathname);
  if (privateVisit || initialized) return;
  const key = import.meta.env.VITE_POSTHOG_API_KEY;
  if (!key) return;
  initialized = true;
  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: true,
    capture_pageleave: true,
    before_send: event => (mayCapture() ? event : null),
    session_recording: {
      maskAllInputs: true,
      blockClass: "ph-no-capture",
    },
  });
}

export function identifyUser(userId: number, email: string) {
  if (mayCapture()) posthog.identify(String(userId), { email });
}

export function trackEvent(
  event: string,
  properties?: Record<string, unknown>
) {
  if (mayCapture()) posthog.capture(event, properties);
}

export function resetUser() {
  if (initialized) posthog.reset();
}

// ─── Typed event helpers ──────────────────────────────────────────────────────

export const events = {
  gravitasStarted: (scanType: string) =>
    trackEvent("gravitas_started", { scanType }),
  gravitasCompleted: (archetype: string, leak: string) =>
    trackEvent("gravitas_completed", { archetype, leak }),
  gravitasAbandoned: (questionIndex: number) =>
    trackEvent("gravitas_abandoned", { questionIndex }),
  codexLoaded: (cartridgeId: string, fromGravitas: boolean) =>
    trackEvent("codex_loaded", { cartridgeId, fromGravitas }),
  codexRead: (cartridgeId: string) => trackEvent("codex_read", { cartridgeId }),
  codexRunStarted: (cartridgeId: string) =>
    trackEvent("codex_run_started", { cartridgeId }),
  codexRunCompleted: (cartridgeId: string) =>
    trackEvent("codex_run_completed", { cartridgeId }),
  wallViewed: (wallCode: string) => trackEvent("wall_viewed", { wallCode }),
  wallSubmitted: (wallCode: string) =>
    trackEvent("wall_submitted", { wallCode }),
  workbenchLockedClicked: (pluginId: string) =>
    trackEvent("workbench_locked_plugin_clicked", { pluginId }),
  easterEggFound: (eggId: string) => trackEvent("easter_egg_found", { eggId }),
  achievementUnlocked: (achievementId: string) =>
    trackEvent("achievement_unlocked", { achievementId }),
  authCreated: () => trackEvent("auth_created"),
  authReturned: () => trackEvent("auth_returned"),
};
