/**
 * YouTube video fetching via YouTube Data API v3.
 * Uses dedicated playlist IDs to reliably separate Shorts from full videos:
 *   Uploads playlist:  UU + channel_suffix
 *   Shorts playlist:   UUSH + channel_suffix
 * Cost: 2 API units per cache refresh (vs ~101 for the search+videos approach).
 */
import { ENV } from "./_core/env";

const YOUTUBE_CHANNEL_ID = "UCQvL3b2AbMM_K38lY3FHdLg";
const YT_API_BASE = "https://www.googleapis.com/youtube/v3";

// Derive playlist IDs from channel ID (replace "UC" prefix)
const CHANNEL_SUFFIX = YOUTUBE_CHANNEL_ID.slice(2); // "QvL3b2AbMM_K38lY3FHdLg"
const UPLOADS_PLAYLIST_ID = "UU" + CHANNEL_SUFFIX;
const SHORTS_PLAYLIST_ID = "UUSH" + CHANNEL_SUFFIX;

// Single shared cache
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

/** Decode common HTML entities returned by the YouTube API in titles/descriptions. */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

interface PlaylistItem {
  videoId: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnailUrl: string;
}

async function fetchPlaylistItems(playlistId: string, label: string): Promise<PlaylistItem[]> {
  const apiKey = ENV.youtubeApiKey;

  const url = new URL(`${YT_API_BASE}/playlistItems`);
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("maxResults", "25");
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      const body = await res.text();
      console.error(`[YouTube API] ${label} playlist fetch failed ${res.status}: ${body}`);
      return [];
    }

    const data = await res.json();
    const items: any[] = data.items ?? [];
    console.log(`[YouTube API] ${label} playlist (${playlistId}): ${items.length} items`);

    return items.map((item: any) => {
      const snippet = item.snippet ?? {};
      const videoId: string = snippet.resourceId?.videoId ?? item.contentDetails?.videoId ?? "";
      const thumbnails = snippet.thumbnails ?? {};
      const thumbnailUrl =
        thumbnails.maxres?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const rawDesc: string = snippet.description ?? "";
      const shortDesc = rawDesc.length > 200 ? rawDesc.slice(0, 200) + "..." : rawDesc;

      return {
        videoId,
        title: decodeHtmlEntities(snippet.title ?? "Untitled"),
        pubDate: item.contentDetails?.videoPublishedAt ?? snippet.publishedAt ?? new Date().toISOString(),
        description: decodeHtmlEntities(shortDesc),
        thumbnailUrl,
      };
    }).filter((v: PlaylistItem) => Boolean(v.videoId));
  } catch (err) {
    console.error(`[YouTube API] ${label} playlist error:`, err instanceof Error ? err.message : err);
    return [];
  }
}

async function fetchFromYouTubeApi(): Promise<{ videos: YouTubeVideo[]; shorts: YouTubeVideo[] }> {
  if (!ENV.youtubeApiKey) {
    console.error("[YouTube API] YOUTUBE_API_KEY is not set");
    return { videos: [], shorts: [] };
  }

  // Fetch uploads and shorts playlists in parallel
  const [allUploads, shortsItems] = await Promise.all([
    fetchPlaylistItems(UPLOADS_PLAYLIST_ID, "Uploads"),
    fetchPlaylistItems(SHORTS_PLAYLIST_ID, "Shorts"),
  ]);

  const shortsIds = new Set(shortsItems.map((v) => v.videoId));

  const shorts: YouTubeVideo[] = shortsItems.map((v) => ({
    ...v,
    isShort: true,
    link: `https://www.youtube.com/shorts/${v.videoId}`,
  }));

  // Full videos = uploads not in the Shorts playlist
  const videos: YouTubeVideo[] = allUploads
    .filter((v) => !shortsIds.has(v.videoId))
    .map((v) => ({
      ...v,
      isShort: false,
      link: `https://www.youtube.com/watch?v=${v.videoId}`,
    }));

  console.log(`[YouTube API] Result: ${videos.length} full videos, ${shorts.length} shorts`);
  return { videos, shorts };
}

async function getCache(): Promise<{ videos: YouTubeVideo[]; shorts: YouTubeVideo[] }> {
  const now = Date.now();
  if (cache && now - cacheTimestamp < CACHE_TTL_MS) {
    return cache;
  }

  const result = await fetchFromYouTubeApi();

  if (result.videos.length > 0 || result.shorts.length > 0) {
    cache = result;
    cacheTimestamp = now;
    return result;
  }

  // Fall back to stale cache rather than returning empty
  return cache ?? { videos: [], shorts: [] };
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
