/**
 * YouTube video fetching via YouTube Data API v3.
 * Replaces the Manus Data API approach which only works on Manus infrastructure.
 */
import { ENV } from "./_core/env";

const YOUTUBE_CHANNEL_ID = "UCQvL3b2AbMM_K38lY3FHdLg";
const YT_API_BASE = "https://www.googleapis.com/youtube/v3";

// Single shared cache — fetch videos and shorts together, split on read
let cache: { videos: YouTubeVideo[]; shorts: YouTubeVideo[] } | null = null;
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

/**
 * Parse an ISO 8601 duration string (e.g. "PT1M30S") to total seconds.
 */
function parseDurationSeconds(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] ?? "0", 10);
  const minutes = parseInt(match[2] ?? "0", 10);
  const seconds = parseInt(match[3] ?? "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

async function fetchFromYouTubeApi(): Promise<{ videos: YouTubeVideo[]; shorts: YouTubeVideo[] }> {
  const apiKey = ENV.youtubeApiKey;

  if (!apiKey) {
    console.error("[YouTube API] YOUTUBE_API_KEY is not set");
    return { videos: [], shorts: [] };
  }

  // Step 1: search.list — get recent uploads (videos only, ordered by date)
  const searchUrl = new URL(`${YT_API_BASE}/search`);
  searchUrl.searchParams.set("channelId", YOUTUBE_CHANNEL_ID);
  searchUrl.searchParams.set("type", "video");
  searchUrl.searchParams.set("order", "date");
  searchUrl.searchParams.set("maxResults", "25");
  searchUrl.searchParams.set("part", "id,snippet");
  searchUrl.searchParams.set("key", apiKey);

  let searchItems: any[];
  try {
    const res = await fetch(searchUrl.toString());
    if (!res.ok) {
      const body = await res.text();
      console.error(`[YouTube API] search.list failed ${res.status}: ${body}`);
      return { videos: [], shorts: [] };
    }
    const data = await res.json();
    searchItems = data.items ?? [];
    console.log(`[YouTube API] search.list returned ${searchItems.length} items`);
  } catch (err) {
    console.error("[YouTube API] search.list error:", err instanceof Error ? err.message : err);
    return { videos: [], shorts: [] };
  }

  if (searchItems.length === 0) return { videos: [], shorts: [] };

  // Step 2: videos.list — get durations to detect Shorts (≤ 60s)
  const videoIds = searchItems.map((i: any) => i.id?.videoId).filter(Boolean).join(",");
  const videosUrl = new URL(`${YT_API_BASE}/videos`);
  videosUrl.searchParams.set("id", videoIds);
  videosUrl.searchParams.set("part", "contentDetails");
  videosUrl.searchParams.set("key", apiKey);

  let durationMap: Record<string, number> = {};
  try {
    const res = await fetch(videosUrl.toString());
    if (!res.ok) {
      const body = await res.text();
      console.error(`[YouTube API] videos.list failed ${res.status}: ${body}`);
      // Proceed without duration data — treat all as full videos
    } else {
      const data = await res.json();
      for (const item of data.items ?? []) {
        durationMap[item.id] = parseDurationSeconds(item.contentDetails?.duration ?? "");
      }
    }
  } catch (err) {
    console.error("[YouTube API] videos.list error:", err instanceof Error ? err.message : err);
  }

  const videos: YouTubeVideo[] = [];
  const shorts: YouTubeVideo[] = [];

  for (const item of searchItems) {
    const videoId = item.id?.videoId;
    if (!videoId) continue;

    const snippet = item.snippet ?? {};
    const durationSecs = durationMap[videoId] ?? 9999;
    const isShort = durationSecs <= 60;

    const thumbnails = snippet.thumbnails ?? {};
    const thumbnailUrl =
      thumbnails.maxres?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      thumbnails.default?.url ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const description: string = snippet.description ?? "";
    const shortDesc = description.length > 200 ? description.slice(0, 200) + "..." : description;

    const video: YouTubeVideo = {
      videoId,
      title: snippet.title ?? "Untitled",
      link: isShort
        ? `https://www.youtube.com/shorts/${videoId}`
        : `https://www.youtube.com/watch?v=${videoId}`,
      pubDate: snippet.publishedAt ?? new Date().toISOString(),
      description: shortDesc,
      thumbnailUrl,
      isShort,
    };

    if (isShort) {
      shorts.push(video);
    } else {
      videos.push(video);
    }
  }

  console.log(`[YouTube API] Parsed ${videos.length} full videos, ${shorts.length} shorts`);
  return { videos, shorts };
}

async function getCache(): Promise<{ videos: YouTubeVideo[]; shorts: YouTubeVideo[] }> {
  const now = Date.now();
  if (cache && now - cacheTimestamp < CACHE_TTL_MS) {
    return cache;
  }

  const result = await fetchFromYouTubeApi();

  // Only update cache if we got results
  if (result.videos.length > 0 || result.shorts.length > 0) {
    cache = result;
    cacheTimestamp = now;
  }

  return result.videos.length > 0 || result.shorts.length > 0 ? result : cache ?? { videos: [], shorts: [] };
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const { videos, shorts } = await getCache();
  return [...videos, ...shorts].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}

export async function fetchYouTubeFullVideos(): Promise<YouTubeVideo[]> {
  const { videos } = await getCache();
  return videos;
}

export async function fetchYouTubeShorts(): Promise<YouTubeVideo[]> {
  const { shorts } = await getCache();
  return shorts;
}
