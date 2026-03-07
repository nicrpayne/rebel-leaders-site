/**
 * YouTube video fetching via Manus Data API.
 * Replaces the old RSS-based approach which was unreliable from production server IPs
 * (YouTube blocks RSS requests from cloud hosting).
 */
import { callDataApi } from "./_core/dataApi";

const YOUTUBE_CHANNEL_ID = "UCQvL3b2AbMM_K38lY3FHdLg";

// Cache results for 30 minutes
let cachedVideos: YouTubeVideo[] | null = null;
let cachedShorts: YouTubeVideo[] | null = null;
let videoCacheTimestamp = 0;
let shortsCacheTimestamp = 0;
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

function parseDataApiVideo(item: any, isShort: boolean): YouTubeVideo | null {
  try {
    const video = item?.video;
    if (!video) return null;

    const videoId = video.videoId || "";
    if (!videoId) return null;

    // Get the best thumbnail
    const thumbnails = video.thumbnails || [];
    const thumbnailUrl =
      thumbnails.length > 0
        ? thumbnails[thumbnails.length - 1]?.url || ""
        : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // Parse published time - the API returns relative text like "2 weeks ago"
    const publishedText = video.publishedTimeText || "";
    const pubDate = parseRelativeTime(publishedText);

    // Get description snippet
    const description = video.descriptionSnippet || "";
    const shortDesc = description.length > 200 ? description.slice(0, 200) + "..." : description;

    return {
      videoId,
      title: video.title || "Untitled",
      link: `https://www.youtube.com/watch?v=${videoId}`,
      pubDate,
      description: shortDesc,
      thumbnailUrl,
      isShort,
    };
  } catch {
    return null;
  }
}

/**
 * Convert relative time strings like "2 weeks ago" to ISO date strings.
 * This is approximate but good enough for display ordering.
 */
function parseRelativeTime(text: string): string {
  if (!text) return new Date().toISOString();

  const now = Date.now();
  const lower = text.toLowerCase();

  const match = lower.match(/(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/);
  if (!match) return new Date().toISOString();

  const amount = parseInt(match[1], 10);
  const unit = match[2];

  const msPerUnit: Record<string, number> = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
  };

  const ms = msPerUnit[unit] || 0;
  return new Date(now - amount * ms).toISOString();
}

async function fetchFromDataApi(
  filterType: "videos_latest" | "shorts_latest"
): Promise<YouTubeVideo[]> {
  try {
    console.log(`[YouTube DataAPI] Fetching ${filterType} for channel ${YOUTUBE_CHANNEL_ID}`);
    const result = (await callDataApi("Youtube/get_channel_videos", {
      query: {
        id: YOUTUBE_CHANNEL_ID,
        filter: filterType,
        hl: "en",
        gl: "US",
      },
    })) as any;

    const contents = result?.contents || [];
    console.log(`[YouTube DataAPI] Got ${contents.length} items for ${filterType}`);
    const isShort = filterType === "shorts_latest";

    const videos: YouTubeVideo[] = contents
      .map((item: any) => parseDataApiVideo(item, isShort))
      .filter((v: YouTubeVideo | null): v is YouTubeVideo => v !== null);

    // Sort by date, newest first
    videos.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    return videos;
  } catch (error) {
    console.error(
      `[YouTube DataAPI] Failed to fetch ${filterType}:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  // This returns ALL videos (both full and shorts) for backward compat
  const [full, shorts] = await Promise.all([
    fetchYouTubeFullVideos(),
    fetchYouTubeShorts(),
  ]);
  return [...full, ...shorts].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}

export async function fetchYouTubeFullVideos(): Promise<YouTubeVideo[]> {
  const now = Date.now();
  if (cachedVideos && now - videoCacheTimestamp < CACHE_TTL_MS) {
    return cachedVideos;
  }

  const videos = await fetchFromDataApi("videos_latest");

  if (videos.length > 0) {
    cachedVideos = videos;
    videoCacheTimestamp = now;
    return videos;
  }

  // Return cached if available, otherwise empty
  if (cachedVideos) return cachedVideos;
  return [];
}

export async function fetchYouTubeShorts(): Promise<YouTubeVideo[]> {
  const now = Date.now();
  if (cachedShorts && now - shortsCacheTimestamp < CACHE_TTL_MS) {
    return cachedShorts;
  }

  const shorts = await fetchFromDataApi("shorts_latest");

  if (shorts.length > 0) {
    cachedShorts = shorts;
    shortsCacheTimestamp = now;
    return shorts;
  }

  // Return cached if available, otherwise empty
  if (cachedShorts) return cachedShorts;
  return [];
}
