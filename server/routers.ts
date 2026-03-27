import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { fetchSubstackArticles } from "./rss";
import { fetchYouTubeFullVideos, fetchYouTubeShorts } from "./youtube-rss";
import { gravitasRouter } from "./gravitas";
import { adminRouter } from "./admin";

export const appRouter = router({
  system: systemRouter,

  // Gravitas result persistence
  gravitas: gravitasRouter,

  // Admin dashboard
  admin: adminRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Substack RSS feed integration
  substack: router({
    articles: publicProcedure.query(async () => {
      const articles = await fetchSubstackArticles();
      return articles;
    }),
  }),

  // YouTube RSS feed integration
  youtube: router({
    videos: publicProcedure.query(async () => {
      const videos = await fetchYouTubeFullVideos();
      return videos;
    }),
    shorts: publicProcedure.query(async () => {
      const shorts = await fetchYouTubeShorts();
      return shorts;
    }),
  }),
});

export type AppRouter = typeof appRouter;
