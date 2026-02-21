import { describe, expect, it, vi, beforeEach } from "vitest";

// We need to mock rss-parser so the module under test uses our mock
const mockParseURL = vi.fn();

vi.mock("rss-parser", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      parseURL: mockParseURL,
    })),
  };
});

// Sample RSS feed data mimicking YouTube's Atom feed
const mockFeedItems = [
  {
    videoId: "NrXlHMCGlVM",
    title: 'Your "Why" Is Whack - New Metaphors for Leadership',
    link: "https://www.youtube.com/watch?v=NrXlHMCGlVM",
    pubDate: "2025-10-25T13:44:19.000Z",
    isoDate: "2025-10-25T13:44:19.000Z",
    mediaGroup: '<media:description>A great video about leadership.</media:description><media:thumbnail url="https://i3.ytimg.com/vi/NrXlHMCGlVM/hqdefault.jpg" width="480" height="360"/>',
  },
  {
    videoId: "w_Xvjt_WKA4", // Known Short
    title: "ChatGPT Teaches Me Martin Buber's Philosophy",
    link: "https://www.youtube.com/shorts/w_Xvjt_WKA4",
    pubDate: "2026-01-25T19:37:04.000Z",
    isoDate: "2026-01-25T19:37:04.000Z",
    mediaGroup: '<media:description>A short about philosophy.</media:description><media:thumbnail url="https://i4.ytimg.com/vi/w_Xvjt_WKA4/hqdefault.jpg" width="480" height="360"/>',
  },
  {
    videoId: "HEiZivaxue0",
    title: "The Problem Of Mattering",
    link: "https://www.youtube.com/watch?v=HEiZivaxue0",
    pubDate: "2025-10-02T20:50:00.000Z",
    isoDate: "2025-10-02T20:50:00.000Z",
    mediaGroup: '<media:description>Why do leaders need to be reminded that people matter?</media:description><media:thumbnail url="https://i1.ytimg.com/vi/HEiZivaxue0/hqdefault.jpg" width="480" height="360"/>',
  },
  {
    videoId: "5Gwh5O3HzMo", // Known Short
    title: "Equipping vs. Developing Humans",
    link: "https://www.youtube.com/shorts/5Gwh5O3HzMo",
    pubDate: "2026-01-23T19:37:16.000Z",
    isoDate: "2026-01-23T19:37:16.000Z",
    mediaGroup: '<media:description>Yes. There is a difference.</media:description><media:thumbnail url="https://i2.ytimg.com/vi/5Gwh5O3HzMo/hqdefault.jpg" width="480" height="360"/>',
  },
];

describe("YouTube RSS Integration", () => {
  beforeEach(async () => {
    // Reset modules to clear the cache in youtube-rss.ts
    vi.resetModules();
    mockParseURL.mockReset();
  });

  it("fetches and parses YouTube videos from RSS feed", async () => {
    mockParseURL.mockResolvedValueOnce({ items: mockFeedItems });

    // Dynamic import after resetModules to get fresh module with cleared cache
    const { fetchYouTubeVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeVideos();

    expect(videos).toHaveLength(4);
    expect(videos[0].videoId).toBeDefined();
    expect(videos[0].title).toBeDefined();
    expect(videos[0].thumbnailUrl).toBeDefined();
  });

  it("separates full videos from shorts", async () => {
    mockParseURL.mockResolvedValueOnce({ items: mockFeedItems });

    const { fetchYouTubeFullVideos, fetchYouTubeShorts } = await import("./youtube-rss");

    // fetchYouTubeFullVideos calls fetchYouTubeVideos internally (which caches)
    const fullVideos = await fetchYouTubeFullVideos();
    const shorts = await fetchYouTubeShorts();

    expect(fullVideos.length).toBe(2);
    expect(shorts.length).toBe(2);

    // Shorts should be the known IDs
    const shortIds = shorts.map((s) => s.videoId);
    expect(shortIds).toContain("w_Xvjt_WKA4");
    expect(shortIds).toContain("5Gwh5O3HzMo");

    // Full videos should NOT contain shorts
    const fullIds = fullVideos.map((v) => v.videoId);
    expect(fullIds).not.toContain("w_Xvjt_WKA4");
    expect(fullIds).not.toContain("5Gwh5O3HzMo");
  });

  it("sorts videos by date, newest first", async () => {
    mockParseURL.mockResolvedValueOnce({ items: mockFeedItems });

    const { fetchYouTubeVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeVideos();

    for (let i = 1; i < videos.length; i++) {
      const prevDate = new Date(videos[i - 1].pubDate).getTime();
      const currDate = new Date(videos[i].pubDate).getTime();
      expect(prevDate).toBeGreaterThanOrEqual(currDate);
    }
  });

  it("returns empty array on feed fetch failure", async () => {
    mockParseURL.mockRejectedValueOnce(new Error("Network error"));

    const { fetchYouTubeVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeVideos();
    expect(videos).toEqual([]);
  });

  it("generates fallback thumbnail URLs for videos without media:group", async () => {
    const itemsWithoutMedia = [
      {
        videoId: "testId123",
        title: "Test Video",
        link: "https://www.youtube.com/watch?v=testId123",
        pubDate: "2025-12-01T00:00:00.000Z",
        isoDate: "2025-12-01T00:00:00.000Z",
        mediaGroup: undefined,
      },
    ];

    mockParseURL.mockResolvedValueOnce({ items: itemsWithoutMedia });

    const { fetchYouTubeVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeVideos();

    expect(videos).toHaveLength(1);
    expect(videos[0].thumbnailUrl).toBe("https://i.ytimg.com/vi/testId123/hqdefault.jpg");
  });
});
