import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { walls, wallSubmissions, wallEntries } from "../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { uploadWallImage } from "./r2";
import { ENV } from "./_core/env";
import { randomUUID } from "crypto";

function requireAdmin(secret: string) {
  if (secret !== ENV.wallAdminSecret) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid secret" });
  }
}

function generateWallCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seg = () =>
    Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${seg()}-${seg()}`;
}

export const wallRouter = router({
  // ─── Public ───────────────────────────────────────────────────────────────

  getWall: publicProcedure
    .input(z.object({ wallCode: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const rows = await db
        .select()
        .from(walls)
        .where(and(eq(walls.wallCode, input.wallCode), eq(walls.isActive, true)))
        .limit(1);
      return rows[0] ?? null;
    }),

  getActiveWalls: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(walls).where(eq(walls.isActive, true)).orderBy(desc(walls.createdAt));
  }),

  getEntries: publicProcedure
    .input(z.object({ wallId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(wallEntries)
        .where(eq(wallEntries.wallId, input.wallId))
        .orderBy(desc(wallEntries.createdAt));
    }),

  submitEntry: publicProcedure
    .input(z.object({
      wallId: z.string(),
      wallCode: z.string(),
      imageBase64: z.string(),
      contentType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const imageBuffer = Buffer.from(input.imageBase64, "base64");
      const imageUrl = await uploadWallImage(imageBuffer, input.contentType, input.wallCode);

      const submissionId = randomUUID();
      await db.insert(wallSubmissions).values({
        id: submissionId,
        wallId: input.wallId,
        imageUrl,
        status: "pending",
      });

      return { success: true, submissionId } as const;
    }),

  // ─── Admin ────────────────────────────────────────────────────────────────

  adminVerify: publicProcedure
    .input(z.object({ secret: z.string() }))
    .mutation(({ input }) => {
      requireAdmin(input.secret);
      return { authenticated: true } as const;
    }),

  adminGetWalls: publicProcedure
    .input(z.object({ secret: z.string() }))
    .query(async ({ input }) => {
      requireAdmin(input.secret);
      const db = await getDb();
      if (!db) return [];
      return db.select().from(walls).orderBy(desc(walls.createdAt));
    }),

  adminGetSubmissions: publicProcedure
    .input(z.object({
      secret: z.string(),
      wallId: z.string().optional(),
      status: z.string().optional(),
    }))
    .query(async ({ input }) => {
      requireAdmin(input.secret);
      const db = await getDb();
      if (!db) return [];

      const conditions = [];
      if (input.wallId) conditions.push(eq(wallSubmissions.wallId, input.wallId));
      if (input.status) conditions.push(eq(wallSubmissions.status, input.status as "pending" | "approved" | "rejected"));

      const q = db.select().from(wallSubmissions);
      return conditions.length > 0
        ? q.where(and(...conditions)).orderBy(desc(wallSubmissions.submittedAt))
        : q.orderBy(desc(wallSubmissions.submittedAt));
    }),

  adminApproveSubmission: publicProcedure
    .input(z.object({ secret: z.string(), submissionId: z.string() }))
    .mutation(async ({ input }) => {
      requireAdmin(input.secret);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const rows = await db
        .select()
        .from(wallSubmissions)
        .where(eq(wallSubmissions.id, input.submissionId))
        .limit(1);
      const submission = rows[0];
      if (!submission) throw new TRPCError({ code: "NOT_FOUND", message: "Submission not found" });

      await db
        .update(wallSubmissions)
        .set({ status: "approved" })
        .where(eq(wallSubmissions.id, input.submissionId));

      await db.insert(wallEntries).values({
        id: randomUUID(),
        wallId: submission.wallId,
        imageUrl: submission.imageUrl,
        displayOrder: 0,
      });

      return { success: true } as const;
    }),

  adminRejectSubmission: publicProcedure
    .input(z.object({ secret: z.string(), submissionId: z.string() }))
    .mutation(async ({ input }) => {
      requireAdmin(input.secret);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      await db
        .update(wallSubmissions)
        .set({ status: "rejected" })
        .where(eq(wallSubmissions.id, input.submissionId));

      return { success: true } as const;
    }),

  adminUpdateWall: publicProcedure
    .input(z.object({
      secret: z.string(),
      wallId: z.string(),
      title: z.string(),
      description: z.string().optional(),
      promptText: z.string().optional(),
      headerImageUrl: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      requireAdmin(input.secret);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      await db.update(walls).set({
        title: input.title,
        description: input.description ?? null,
        promptText: input.promptText ?? null,
        headerImageUrl: input.headerImageUrl ?? null,
      }).where(eq(walls.id, input.wallId));

      return { success: true } as const;
    }),

  adminCreateWall: publicProcedure
    .input(z.object({
      secret: z.string(),
      title: z.string(),
      description: z.string().optional(),
      promptText: z.string().optional(),
      headerImageUrl: z.string().optional(),
      sourceType: z.string().optional(),
      sourceRef: z.string().optional(),
      wallCode: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      requireAdmin(input.secret);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const wallCode = input.wallCode ?? generateWallCode();
      await db.insert(walls).values({
        id: randomUUID(),
        title: input.title,
        description: input.description ?? null,
        wallCode,
        isActive: true,
        headerImageUrl: input.headerImageUrl ?? null,
        promptText: input.promptText ?? null,
        sourceType: input.sourceType ?? null,
        sourceRef: input.sourceRef ?? null,
      });

      return { wallCode, shareableUrl: `/wall/${wallCode}` } as const;
    }),
});
