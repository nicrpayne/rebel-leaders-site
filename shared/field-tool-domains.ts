export const REBEL_LEADERS_ORIGIN = "https://rebel-leader.com";
export const FIELD_TOOLS_HOST = "tools.rebel-leader.com";
export const FIELD_TOOLS_ORIGIN = `https://${FIELD_TOOLS_HOST}`;

// Keep local development and private review links on their own deployment.
// Only the main public website sends visitors across to the buyer-access site.
export function fieldToolsHref(hostname: string, path = "/field-tools") {
  if (hostname === "rebel-leader.com" || hostname === "www.rebel-leader.com") {
    return FIELD_TOOLS_ORIGIN + (path === "/field-tools" ? "/" : path);
  }
  return path;
}

// Existing reviewer links and browser-local drafts keep their original origin.
export function fieldToolsRootRedirect(hostname: string, originalUrl: string) {
  if (hostname !== FIELD_TOOLS_HOST || originalUrl.split("?")[0] !== "/") {
    return null;
  }
  return `/field-tools${originalUrl.slice(1)}`;
}

// A returning buyer may have drafts on a previous, explicitly configured host.
// Never build an email link from an arbitrary request Host/Origin header.
export function fieldToolAccessOrigin(
  appUrl: string,
  requestHostname?: string,
  legacyOrigins = ""
) {
  for (const value of legacyOrigins.split(",")) {
    try {
      const origin = new URL(value.trim());
      if (
        origin.protocol === "https:" &&
        !origin.username &&
        !origin.password &&
        !origin.port &&
        origin.pathname === "/" &&
        !origin.search &&
        !origin.hash &&
        origin.hostname === requestHostname
      )
        return origin.origin;
    } catch {
      // Ignore empty or malformed entries; the canonical origin remains safe.
    }
  }
  return appUrl;
}
