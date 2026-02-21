import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: ["enclosure", "dc:creator"],
  },
});

const SUBSTACK_FEED_URL = "https://leaderrebellion.substack.com/feed";

// Cache RSS results for 15 minutes to avoid hammering Substack
let cachedArticles: SubstackArticle[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export interface SubstackArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  imageUrl: string | null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function extractFirstImage(content: string): string | null {
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}

export async function fetchSubstackArticles(): Promise<SubstackArticle[]> {
  const now = Date.now();
  if (cachedArticles && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedArticles;
  }

  try {
    const feed = await parser.parseURL(SUBSTACK_FEED_URL);

    const articles: SubstackArticle[] = (feed.items || []).map((item) => {
      const rawDesc = item.contentSnippet || item.content || "";
      const description = stripHtml(rawDesc).slice(0, 200) + (rawDesc.length > 200 ? "..." : "");
      const imageUrl = extractFirstImage(item.content || (item as any)["content:encoded"] || "");

      return {
        title: item.title || "Untitled",
        link: item.link || "",
        pubDate: item.pubDate || "",
        description,
        creator: (item as any)["dc:creator"] || "Nic",
        imageUrl,
      };
    });

    cachedArticles = articles;
    cacheTimestamp = now;
    return articles;
  } catch (error) {
    console.error("[RSS] Failed to fetch Substack feed:", error);
    // Return cached data if available, even if stale
    if (cachedArticles) return cachedArticles;
    return [];
  }
}
