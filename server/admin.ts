import { adminProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { users, gravitasResults } from "../drizzle/schema";
import { eq, desc, sql } from "drizzle-orm";

/**
 * Admin Router
 *
 * users — returns all users with their gravitas result counts.
 *   Admin-only — requires role === 'admin'.
 */
export const adminRouter = router({
  /**
   * List all users with their Gravitas result count.
   * Returns: id, email, name, role, createdAt, lastSignedIn, gravitasCount
   */
  users: adminProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const rows = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        lastSignedIn: users.lastSignedIn,
        gravitasCount: sql<number>`(
          SELECT COUNT(*) FROM ${gravitasResults}
          WHERE ${gravitasResults.userId} = ${users.id}
        )`.as("gravitasCount"),
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return rows;
  }),
});
