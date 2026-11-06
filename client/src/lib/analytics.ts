import posthog, { type CaptureResult } from 'posthog-js';

// Analytics gets named routes and product actions. Raw URLs can contain sign-in
// tokens, Wall codes or text a visitor entered, even on ordinary page views.
const publicPaths = new Set([
  '/', '/manifesto', '/archives', '/shelf', '/residency', '/about', '/start',
  '/game', '/book', '/community', '/mirror', '/privacy', '/workbench',
  '/workbench/gravitas', '/workbench/results', '/workbench/codex',
  '/workbench/mirror', '/workbench/mirror/reading', '/workbench/praxis',
  '/workbench/wall', '/game-standalone', '/auth/verify', '/admin', '/admin/wall',
]);

const eventFields = new Map<string, string[]>([
  ['$pageview', []], ['$pageleave', []], ['$identify', []],
  ['gravitas_started', ['scanType']], ['gravitas_completed', ['archetype', 'leak']],
  ['gravitas_abandoned', ['questionIndex']], ['codex_loaded', ['cartridgeId', 'fromGravitas']],
  ['codex_read', ['cartridgeId']], ['codex_run_started', ['cartridgeId']],
  ['codex_run_completed', ['cartridgeId']], ['wall_viewed', []], ['wall_submitted', []],
  ['workbench_locked_plugin_clicked', ['pluginId']], ['easter_egg_found', ['eggId']],
  ['achievement_unlocked', ['achievementId']], ['auth_created', []], ['auth_returned', []],
  ['newsletter_signup_opened', ['placement']],
]);

const browserFields = [
  'token', 'distinct_id', '$anon_distinct_id', '$device_id', '$user_id',
  '$session_id', '$window_id', '$is_identified', '$process_person_profile',
  '$lib', '$lib_version', '$browser', '$browser_version', '$os', '$device_type',
];

export function analyticsPayload(event: CaptureResult | null): CaptureResult | null {
  if (!event) return null;
  const fields = eventFields.get(event.event);
  if (!fields) return null;

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const page = publicPaths.has(path) ? path
    : /^\/(?:workbench\/)?wall\//.test(path) ? '/workbench/wall' : '/other';
  const properties: Record<string, unknown> = {
    $current_url: window.location.origin + page,
    $pathname: page,
  };
  for (const field of [...browserFields, ...fields]) {
    if (event.properties[field] !== undefined) properties[field] = event.properties[field];
  }
  return { event: event.event, uuid: event.uuid, timestamp: event.timestamp, properties };
}

export function initPostHog() {
  if (typeof window === 'undefined') return;
  const key = import.meta.env.VITE_POSTHOG_API_KEY;
  if (!key) return;
  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
    disable_session_recording: true,
    autocapture: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    enable_heatmaps: false,
    disable_surveys: true,
    disable_external_dependency_loading: true,
    advanced_disable_flags: true,
    before_send: analyticsPayload,
  });
}

export function identifyUser(userId: number) {
  posthog.identify(String(userId));
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  posthog.capture(event, properties);
}

export function resetUser() {
  posthog.reset();
}

// ─── Typed event helpers ──────────────────────────────────────────────────────

export const events = {
  gravitasStarted: (scanType: string) =>
    trackEvent('gravitas_started', { scanType }),
  gravitasCompleted: (archetype: string, leak: string) =>
    trackEvent('gravitas_completed', { archetype, leak }),
  gravitasAbandoned: (questionIndex: number) =>
    trackEvent('gravitas_abandoned', { questionIndex }),
  codexLoaded: (cartridgeId: string, fromGravitas: boolean) =>
    trackEvent('codex_loaded', { cartridgeId, fromGravitas }),
  codexRead: (cartridgeId: string) =>
    trackEvent('codex_read', { cartridgeId }),
  codexRunStarted: (cartridgeId: string) =>
    trackEvent('codex_run_started', { cartridgeId }),
  codexRunCompleted: (cartridgeId: string) =>
    trackEvent('codex_run_completed', { cartridgeId }),
  wallViewed: (wallCode: string) =>
    trackEvent('wall_viewed', { wallCode }),
  wallSubmitted: (wallCode: string) =>
    trackEvent('wall_submitted', { wallCode }),
  workbenchLockedClicked: (pluginId: string) =>
    trackEvent('workbench_locked_plugin_clicked', { pluginId }),
  easterEggFound: (eggId: string) =>
    trackEvent('easter_egg_found', { eggId }),
  achievementUnlocked: (achievementId: string) =>
    trackEvent('achievement_unlocked', { achievementId }),
  authCreated: () =>
    trackEvent('auth_created'),
  authReturned: () =>
    trackEvent('auth_returned'),
};
