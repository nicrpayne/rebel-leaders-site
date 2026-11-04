import { describe, expect, it } from "vitest";
import {
  fieldToolsHref,
  fieldToolsRootRedirect,
  fieldToolAccessOrigin,
} from "../shared/field-tool-domains";

describe("Field Tools custom domain", () => {
  it("keeps returning buyers on an explicitly trusted old origin, never an arbitrary request host", () => {
    const canonical = "https://tools.rebel-leader.com";
    const oldHost = "field-tools-reviewers-production.up.railway.app";
    const configured = `https://${oldHost}`;
    expect(fieldToolAccessOrigin(canonical, oldHost, configured)).toBe(
      configured
    );
    for (const host of [
      undefined,
      "tools.rebel-leader.com",
      "evil.test",
      `${oldHost}.evil.test`,
      `https://${oldHost}`,
    ]) {
      expect(fieldToolAccessOrigin(canonical, host, configured)).toBe(
        canonical
      );
    }
    for (const invalid of [
      "",
      "not a URL",
      `http://${oldHost}`,
      `https://user:pass@${oldHost}`,
      `https://${oldHost}/redirect`,
      `https://${oldHost}?next=evil`,
      `https://${oldHost}#token`,
      `https://${oldHost}:444`,
    ]) {
      expect(fieldToolAccessOrigin(canonical, oldHost, invalid)).toBe(
        canonical
      );
    }
  });
  it("sends main-site visitors to the tool service and keeps review/local visits on their origin", () => {
    for (const host of ["rebel-leader.com", "www.rebel-leader.com"]) {
      expect(fieldToolsHref(host)).toBe("https://tools.rebel-leader.com/");
      expect(fieldToolsHref(host, "/field-tools/ai-stalemate/pm")).toBe(
        "https://tools.rebel-leader.com/field-tools/ai-stalemate/pm"
      );
    }
    for (const host of [
      "localhost",
      "tools.rebel-leader.com",
      "field-tools-reviewers-production.up.railway.app",
      "rebel-leader.com.example.org",
    ]) {
      expect(fieldToolsHref(host)).toBe("/field-tools");
      expect(fieldToolsHref(host, "/field-tools/ai-stalemate/lead-dev")).toBe(
        "/field-tools/ai-stalemate/lead-dev"
      );
    }
  });

  it("opens the collection at the tools root, preserving query parameters without redirecting existing product or API paths", () => {
    expect(fieldToolsRootRedirect("tools.rebel-leader.com", "/")).toBe(
      "/field-tools"
    );
    expect(
      fieldToolsRootRedirect("tools.rebel-leader.com", "/?utm_source=website")
    ).toBe("/field-tools?utm_source=website");
    for (const path of [
      "/field-tools",
      "/field-tools/ai-stalemate/pm/access",
      "/api/field-tools/sign-in?token=example",
    ]) {
      expect(fieldToolsRootRedirect("tools.rebel-leader.com", path)).toBeNull();
    }
    for (const host of [
      "rebel-leader.com",
      "localhost",
      "field-tools-reviewers-production.up.railway.app",
    ]) {
      expect(fieldToolsRootRedirect(host, "/")).toBeNull();
    }
  });
});
