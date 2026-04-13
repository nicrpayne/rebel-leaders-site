import posthog from 'posthog-js';

export function initPostHog() {
  if (typeof window === 'undefined') return;
  const key = import.meta.env.VITE_POSTHOG_API_KEY;
  if (!key) return;
  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: { password: true },
    },
  });
}

export function identifyUser(userId: number, email: string) {
  posthog.identify(String(userId), { email });
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
