import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["yt:videoId", "videoId"],
      ["media:group", "mediaGroup"],
    ],
  },
});

const YOUTUBE_CHANNEL_ID = "UCQvL3b2AbMM_K38lY3FHdLg";
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

// Cache results for 30 minutes
let cachedVideos: YouTubeVideo[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 30 * 60 * 1000;

export interface YouTubeVideo {
  videoId: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnailUrl: string;
  isShort: boolean;
}

// Known Shorts video IDs (YouTube RSS doesn't distinguish Shorts from regular videos)
// We identify Shorts by their known IDs from the channel
const KNOWN_SHORTS_IDS = new Set([
  "w_Xvjt_WKA4",
  "1_s6IfOiBJk",
  "5Gwh5O3HzMo",
]);

function extractFromMediaGroup(mediaGroup: any): { description: string; thumbnailUrl: string } {
  let description = "";
  let thumbnailUrl = "";

  if (typeof mediaGroup === "string") {
    // Parse XML-like media:group content
    const descMatch = mediaGroup.match(/<media:description[^>]*>([\s\S]*?)<\/media:description>/);
    if (descMatch) description = descMatch[1].trim();

    const thumbMatch = mediaGroup.match(/<media:thumbnail[^>]+url="([^"]+)"/);
    if (thumbMatch) thumbnailUrl = thumbMatch[1];
  } else if (mediaGroup && typeof mediaGroup === "object") {
    // Parsed object form
    if (mediaGroup["media:description"]) {
      const desc = mediaGroup["media:description"];
      description = typeof desc === "string" ? desc : (desc?.[0] || desc?._ || "");
    }
    if (mediaGroup["media:thumbnail"]) {
      const thumb = mediaGroup["media:thumbnail"];
      thumbnailUrl = typeof thumb === "string" ? thumb : (thumb?.$?.url || thumb?.[0]?.$?.url || "");
    }
  }

  return { description, thumbnailUrl };
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const now = Date.now();
  if (cachedVideos && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedVideos;
  }

  try {
    const feed = await parser.parseURL(YOUTUBE_FEED_URL);

    const videos: YouTubeVideo[] = (feed.items || []).map((item: any) => {
      const videoId = item.videoId || item.id?.replace("yt:video:", "") || "";
      const { description, thumbnailUrl } = extractFromMediaGroup(item.mediaGroup);

      // Use high-quality thumbnail if available
      const thumbnail = thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      // Truncate description
      const shortDesc = description.length > 200 ? description.slice(0, 200) + "..." : description;

      return {
        videoId,
        title: item.title || "Untitled",
        link: item.link || `https://www.youtube.com/watch?v=${videoId}`,
        pubDate: item.pubDate || item.isoDate || "",
        description: shortDesc,
        thumbnailUrl: thumbnail,
        isShort: KNOWN_SHORTS_IDS.has(videoId),
      };
    });

    // Sort by date, newest first
    videos.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    cachedVideos = videos;
    cacheTimestamp = now;
    return videos;
  } catch (error) {
    console.error("[YouTube RSS] Failed to fetch feed:", error);
    if (cachedVideos) return cachedVideos;
    return [];
  }
}

export async function fetchYouTubeFullVideos(): Promise<YouTubeVideo[]> {
  const all = await fetchYouTubeVideos();
  return all.filter((v) => !v.isShort);
}

export async function fetchYouTubeShorts(): Promise<YouTubeVideo[]> {
  const all = await fetchYouTubeVideos();
  return all.filter((v) => v.isShort);
}
