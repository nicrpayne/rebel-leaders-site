import { describe, expect, it } from "vitest";
import { fieldToolAccessEmail } from "./field-tool-email";

describe("buyer email destinations", () => {
  it.each(["pm", "lead-dev"] as const)(
    "keeps the %s bookmark separate from the single-use credential",
    audience => {
      const welcome = `https://tools.example.com/field-tools/ai-stalemate/${audience}/access`;
      const mail = fieldToolAccessEmail({
        slug: "ai-stalemate",
        audience,
        appUrl: "https://tools.example.com",
        signInUrl: `https://tools.example.com/field-tools/sign-in?slug=ai-stalemate&audience=${audience}#token=one-use-secret`,
      });
      const hrefs = [...mail.html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
      expect(
        hrefs.filter(href => href.includes("one-use-secret"))
      ).toHaveLength(1);
      expect(hrefs).toContain(welcome);
      expect(mail.text).toContain(`Bookmark your welcome page: ${welcome}`);
      expect(
        hrefs.some(href =>
          href.includes(
            `/ai-stalemate/${audience === "pm" ? "lead-dev" : "pm"}/access`
          )
        )
      ).toBe(false);
    }
  );
  it("handles canonical edition keys without repeating the audience path", () => {
    const mail = fieldToolAccessEmail({
      slug: "ai-stalemate/lead-dev",
      audience: "pm",
      appUrl: "https://tools.example.com",
      signInUrl: "https://tools.example.com/field-tools/sign-in#token=test",
    });
    expect(mail.text).toContain("AI Stalemate · Lead Developer");
    expect(mail.text).toContain("/ai-stalemate/lead-dev/access");
    expect(mail.text).not.toContain("/lead-dev/pm/");
  });
});
