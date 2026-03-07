import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock the Data API so we don't make real HTTP calls in tests
const mockCallDataApi = vi.fn();

vi.mock("./_core/dataApi", () => ({
  callDataApi: (...args: any[]) => mockCallDataApi(...args),
}));

// Sample Data API response for videos_latest
const mockVideoContents = [
  {
    type: "video",
    video: {
      videoId: "NrXlHMCGlVM",
      title: 'Your "Why" Is Whack - New Metaphors for Leadership',
      publishedTimeText: "4 months ago",
      descriptionSnippet: "A great video about leadership.",
      thumbnails: [
        { url: "https://i.ytimg.com/vi/NrXlHMCGlVM/default.jpg", width: 120, height: 90 },
        { url: "https://i.ytimg.com/vi/NrXlHMCGlVM/hqdefault.jpg", width: 480, height: 360 },
      ],
    },
  },
  {
    type: "video",
    video: {
      videoId: "HEiZivaxue0",
      title: "The Problem Of Mattering",
      publishedTimeText: "5 months ago",
      descriptionSnippet: "Why do leaders need to be reminded that people matter?",
      thumbnails: [
        { url: "https://i.ytimg.com/vi/HEiZivaxue0/hqdefault.jpg", width: 480, height: 360 },
      ],
    },
  },
];

// Sample Data API response for shorts_latest
const mockShortsContents = [
  {
    type: "video",
    video: {
      videoId: "w_Xvjt_WKA4",
      title: "ChatGPT Teaches Me Martin Buber's Philosophy",
      publishedTimeText: "1 month ago",
      descriptionSnippet: "A short about philosophy.",
      thumbnails: [
        { url: "https://i.ytimg.com/vi/w_Xvjt_WKA4/hqdefault.jpg", width: 480, height: 360 },
      ],
    },
  },
  {
    type: "video",
    video: {
      videoId: "5Gwh5O3HzMo",
      title: "Equipping vs. Developing Humans",
      publishedTimeText: "2 months ago",
      descriptionSnippet: "Yes. There is a difference.",
      thumbnails: [
        { url: "https://i.ytimg.com/vi/5Gwh5O3HzMo/hqdefault.jpg", width: 480, height: 360 },
      ],
    },
  },
];

describe("YouTube Data API Integration", () => {
  beforeEach(async () => {
    vi.resetModules();
    mockCallDataApi.mockReset();
  });

  it("fetches and parses full videos from Data API", async () => {
    mockCallDataApi.mockResolvedValueOnce({ contents: mockVideoContents });

    const { fetchYouTubeFullVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeFullVideos();

    expect(videos).toHaveLength(2);
    expect(videos[0].videoId).toBe("NrXlHMCGlVM");
    expect(videos[0].title).toContain("Why");
    expect(videos[0].isShort).toBe(false);
    expect(videos[0].link).toContain("youtube.com/watch");

    // Verify the Data API was called with correct params
    expect(mockCallDataApi).toHaveBeenCalledWith("Youtube/get_channel_videos", {
      query: {
        id: "UCQvL3b2AbMM_K38lY3FHdLg",
        filter: "videos_latest",
        hl: "en",
        gl: "US",
      },
    });
  });

  it("fetches and parses shorts from Data API", async () => {
    mockCallDataApi.mockResolvedValueOnce({ contents: mockShortsContents });

    const { fetchYouTubeShorts } = await import("./youtube-rss");
    const shorts = await fetchYouTubeShorts();

    expect(shorts).toHaveLength(2);
    expect(shorts[0].isShort).toBe(true);
    expect(shorts[0].videoId).toBeDefined();

    // Verify the Data API was called with shorts filter
    expect(mockCallDataApi).toHaveBeenCalledWith("Youtube/get_channel_videos", {
      query: {
        id: "UCQvL3b2AbMM_K38lY3FHdLg",
        filter: "shorts_latest",
        hl: "en",
        gl: "US",
      },
    });
  });

  it("separates full videos from shorts correctly", async () => {
    // First call for videos, second for shorts
    mockCallDataApi
      .mockResolvedValueOnce({ contents: mockVideoContents })
      .mockResolvedValueOnce({ contents: mockShortsContents });

    const { fetchYouTubeFullVideos, fetchYouTubeShorts } = await import("./youtube-rss");

    const fullVideos = await fetchYouTubeFullVideos();
    const shorts = await fetchYouTubeShorts();

    expect(fullVideos.every((v) => v.isShort === false)).toBe(true);
    expect(shorts.every((v) => v.isShort === true)).toBe(true);
    expect(fullVideos.length).toBe(2);
    expect(shorts.length).toBe(2);
  });

  it("returns empty array on Data API failure", async () => {
    mockCallDataApi.mockRejectedValueOnce(new Error("Network error"));

    const { fetchYouTubeFullVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeFullVideos();
    expect(videos).toEqual([]);
  });

  it("generates fallback thumbnail URLs for videos without thumbnails", async () => {
    const noThumbContents = [
      {
        type: "video",
        video: {
          videoId: "testId123",
          title: "Test Video",
          publishedTimeText: "1 day ago",
          descriptionSnippet: "",
          thumbnails: [],
        },
      },
    ];

    mockCallDataApi.mockResolvedValueOnce({ contents: noThumbContents });

    const { fetchYouTubeFullVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeFullVideos();

    expect(videos).toHaveLength(1);
    expect(videos[0].thumbnailUrl).toBe("https://i.ytimg.com/vi/testId123/hqdefault.jpg");
  });

  it("sorts videos by date, newest first", async () => {
    mockCallDataApi.mockResolvedValueOnce({ contents: mockVideoContents });

    const { fetchYouTubeFullVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeFullVideos();

    for (let i = 1; i < videos.length; i++) {
      const prevDate = new Date(videos[i - 1].pubDate).getTime();
      const currDate = new Date(videos[i].pubDate).getTime();
      expect(prevDate).toBeGreaterThanOrEqual(currDate);
    }
  });

  it("handles empty API response gracefully", async () => {
    mockCallDataApi.mockResolvedValueOnce({ contents: [] });

    const { fetchYouTubeFullVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeFullVideos();
    expect(videos).toEqual([]);
  });

  it("handles malformed video items gracefully", async () => {
    const malformedContents = [
      { type: "video", video: null },
      { type: "video", video: { videoId: "", title: "No ID" } },
      {
        type: "video",
        video: {
          videoId: "valid123",
          title: "Valid Video",
          publishedTimeText: "1 day ago",
          thumbnails: [],
        },
      },
    ];

    mockCallDataApi.mockResolvedValueOnce({ contents: malformedContents });

    const { fetchYouTubeFullVideos } = await import("./youtube-rss");
    const videos = await fetchYouTubeFullVideos();

    // Only the valid video should be returned
    expect(videos).toHaveLength(1);
    expect(videos[0].videoId).toBe("valid123");
  });
});
