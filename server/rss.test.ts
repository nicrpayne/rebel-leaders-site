import { describe, expect, it } from "vitest";
import { fetchSubstackArticles } from "./rss";

describe("Substack RSS Feed", () => {
  it("fetches articles from the Substack RSS feed", async () => {
    const articles = await fetchSubstackArticles();

    expect(Array.isArray(articles)).toBe(true);
    expect(articles.length).toBeGreaterThan(0);

    // Check the shape of the first article
    const first = articles[0];
    expect(first).toHaveProperty("title");
    expect(first).toHaveProperty("link");
    expect(first).toHaveProperty("pubDate");
    expect(first).toHaveProperty("description");
    expect(first).toHaveProperty("creator");
    expect(first).toHaveProperty("imageUrl");

    // Title should be a non-empty string
    expect(typeof first.title).toBe("string");
    expect(first.title.length).toBeGreaterThan(0);

    // Link should be a valid Substack URL
    expect(first.link).toContain("leaderrebellion.substack.com");

    // pubDate should be a valid date string
    expect(new Date(first.pubDate).toString()).not.toBe("Invalid Date");

    // Description should be a non-empty string (truncated to ~200 chars)
    expect(typeof first.description).toBe("string");
    expect(first.description.length).toBeGreaterThan(0);
    expect(first.description.length).toBeLessThanOrEqual(210); // 200 + "..."
  });

  it("returns articles in newest-first order", async () => {
    const articles = await fetchSubstackArticles();

    if (articles.length >= 2) {
      const firstDate = new Date(articles[0].pubDate).getTime();
      const secondDate = new Date(articles[1].pubDate).getTime();
      expect(firstDate).toBeGreaterThanOrEqual(secondDate);
    }
  });

  it("caches results on subsequent calls", async () => {
    // First call populates cache
    const first = await fetchSubstackArticles();
    // Second call should return cached data (same reference)
    const second = await fetchSubstackArticles();

    expect(first).toBe(second); // Same array reference from cache
  });
});
