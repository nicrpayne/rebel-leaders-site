import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fieldToolPageMetadata } from "../shared/field-tool-page-metadata";
import { withFieldToolMetadata } from "./field-tool-page-metadata";

const template = readFileSync(
  new URL("../client/index.html", import.meta.url),
  "utf8"
);

describe("public Field Tools share metadata", () => {
  it.each([
    "/field-tools",
    "/field-tools/ai-stalemate/pm",
    "/field-tools/ai-stalemate/lead-dev",
  ])(
    "serves complete, route-specific metadata before JavaScript on %s",
    path => {
      const page = fieldToolPageMetadata(path)!;
      const html = withFieldToolMetadata(template, path);
      expect(html).toContain(`<title>${page.title}</title>`);
      expect(html).toContain(
        `property="og:url" content="https://tools.rebel-leader.com${path}"`
      );
      expect(html).toContain(`property="og:image" content="${page.image}"`);
      expect(html).toContain(
        'name="twitter:card" content="summary_large_image"'
      );
      expect(html.match(/name="description"/g)).toHaveLength(1);
      expect(html.match(/rel="canonical"/g)).toHaveLength(1);
      expect(html).toContain('src="/src/main.tsx"');
    }
  );
  it("ignores query strings and fragments, including reviewer codes and tokens", () => {
    const clean = withFieldToolMetadata(
      template,
      "/field-tools/ai-stalemate/pm"
    );
    expect(
      withFieldToolMetadata(
        template,
        "/field-tools/ai-stalemate/pm/?discount=PRIVATE&token=SECRET#example"
      )
    ).toBe(clean);
    expect(fieldToolPageMetadata("//untrusted.example/field-tools")).toBeNull();
  });
  it.each([
    "/",
    "/about",
    "/field-tools/review",
    "/field-tools/ai-stalemate/pm/buy",
    "/field-tools/ai-stalemate/lead-dev/lab/delivery",
    "/field-tools/sign-in?token=SECRET",
    "/field-tools/ai-stalemate/pm/access",
    "/field-tools/ai-stalemate/lead-dev/guide",
  ])("leaves unrelated and buyer-only pages unchanged: %s", path => {
    expect(withFieldToolMetadata(template, path)).toBe(template);
  });
  it("gives the two editions distinct titles and share images", () => {
    const pm = fieldToolPageMetadata("/field-tools/ai-stalemate/pm")!;
    const dev = fieldToolPageMetadata("/field-tools/ai-stalemate/lead-dev")!;
    expect(pm.title).toContain("Product Managers");
    expect(dev.title).toContain("Lead Developers");
    expect(pm.image).not.toBe(dev.image);
  });
});
