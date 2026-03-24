import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { gravitasResults } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Gravitas Results Router
 *
 * save — accepts Gravitas results from the client.
 *   If the user is authenticated, writes to the database AND returns persisted: true.
 *   If the user is not authenticated, returns persisted: false (client handles localStorage).
 *   Never fails for unauthenticated users.
 *
 * list — returns all saved results for the authenticated user, newest first.
 *   Protected route — requires auth.
 */

const saveInputSchema = z.object({
  scanMode: z.enum(["SCAN", "DEEP_SCAN"]),
  identity: z.number().min(1).max(5),
  relationship: z.number().min(1).max(5),
  vision: z.number().min(1).max(5),
  culture: z.number().min(1).max(5),
  total: z.number().min(1).max(5),
  archetype: z.string(),
  leak: z.string(),
  force: z.string(),
  /** Full payload including descriptions, firstMove, raw answers, etc. */
  fullPayload: z.record(z.string(), z.unknown()).optional(),
});

export const gravitasRouter = router({
  /**
   * Save a Gravitas result.
   * Public procedure — works for both authenticated and unauthenticated users.
   * Authenticated users get their result persisted to the database.
   * Unauthenticated users get a success response; the client writes to localStorage.
   */
  save: publicProcedure
    .input(saveInputSchema)
    .mutation(async ({ ctx, input }) => {
      // If user is not authenticated, return gracefully
      if (!ctx.user) {
        return { success: true, persisted: false, id: null } as const;
      }

      const db = await getDb();
      if (!db) {
        console.warn("[Gravitas] Database not available, skipping persist");
        return { success: true, persisted: false, id: null } as const;
      }

      try {
        const result = await db.insert(gravitasResults).values({
          userId: ctx.user.id,
          scanMode: input.scanMode,
          identity: String(input.identity),
          relationship: String(input.relationship),
          vision: String(input.vision),
          culture: String(input.culture),
          total: String(input.total),
          archetype: input.archetype,
          leak: input.leak,
          force: input.force,
          fullPayload: input.fullPayload ?? null,
        });

        return {
          success: true,
          persisted: true,
          id: Number(result[0].insertId),
        } as const;
      } catch (error) {
        console.error("[Gravitas] Failed to persist result:", error);
        // Don't fail the request — the client still has localStorage
        return { success: true, persisted: false, id: null } as const;
      }
    }),

  /**
   * List all Gravitas results for the authenticated user, newest first.
   * Protected — requires auth.
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const rows = await db
      .select()
      .from(gravitasResults)
      .where(eq(gravitasResults.userId, ctx.user.id))
      .orderBy(desc(gravitasResults.createdAt))
      .limit(50);

    return rows;
  }),

  /**
   * Get the most recent Gravitas result for the authenticated user.
   * Used by Mirror to read the Gravitas signal.
   * Protected — requires auth.
   */
  latest: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const rows = await db
      .select()
      .from(gravitasResults)
      .where(eq(gravitasResults.userId, ctx.user.id))
      .orderBy(desc(gravitasResults.createdAt))
      .limit(1);

    return rows[0] ?? null;
  }),
});
