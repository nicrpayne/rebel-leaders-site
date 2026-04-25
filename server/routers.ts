import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import { fetchSubstackArticles } from "./rss";
import { fetchYouTubeFullVideos, fetchYouTubeShorts } from "./youtube-rss";
import { gravitasRouter } from "./gravitas";
import { adminRouter } from "./admin";
import { wallRouter } from "./wall";
import {
  getMagicLinkUser,
  requestMagicLink,
  verifyToken,
  logEvent,
  saveGravitasAssessment,
  saveMirrorReading,
  getLatestMirrorReading,
  getLastGravitasAssessment,
  getGravitasHistory,
  getLatestGravitasDelta,
  getPraxisState,
  lockPraxisSeason,
  saveReflection,
  sendCodexEmail,
  saveCodexInteraction,
  getSavedCodexCartridges,
} from "./auth";

export const appRouter = router({
  system: systemRouter,

  // Gravitas result persistence
  gravitas: gravitasRouter,

  // Admin dashboard
  admin: adminRouter,

  // Wall feature
  wall: wallRouter,
  auth: router({
    // Returns the active user — checks Manus OAuth first, then magic-link JWT.
    me: publicProcedure.query(async ({ ctx }) => {
      if (ctx.user) return ctx.user;
      return getMagicLinkUser(ctx.req.headers.cookie);
    }),
    // Clears the Manus OAuth session cookie.
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      ctx.res.clearCookie("rl_session", {
        httpOnly: true,
        secure: ENV.isProduction,
        sameSite: "lax",
      });
      return { success: true } as const;
    }),
    // Magic-link auth procedures
    requestMagicLink,
    verifyToken,
    logEvent,
    saveGravitasAssessment,
    saveMirrorReading,
    getLatestMirrorReading,
    getLastGravitasAssessment,
    getGravitasHistory,
    getLatestGravitasDelta,
    getPraxisState,
    lockPraxisSeason,
    saveReflection,
    sendCodexEmail,
    saveCodexInteraction,
    getSavedCodexCartridges,
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
