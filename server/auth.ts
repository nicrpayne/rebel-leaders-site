import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { authTokens, users, gravitasAssessments, userEvents } from "../drizzle/schema";
import { eq, and, gt } from "drizzle-orm";
import { Resend } from "resend";
import { randomBytes } from "crypto";
import { magicLinkEmail } from "./emails/magic-link";
import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./_core/env";
import { parse as parseCookies } from "cookie";

const RL_SESSION_COOKIE = "rl_session";
const COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getJwtSecret() {
  return new TextEncoder().encode(ENV.cookieSecret);
}

async function signSessionToken(userId: number, email: string): Promise<string> {
  return new SignJWT({ userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(getJwtSecret());
}

/** Read the magic-link session cookie and return the user, or null. */
export async function getMagicLinkUser(cookieHeader: string | undefined) {
  if (!cookieHeader) return null;
  const cookies = parseCookies(cookieHeader);
  const token = cookies[RL_SESSION_COOKIE];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<{ userId: number; email: string }>(
      token,
      getJwtSecret()
    );
    const db = await getDb();
    if (!db) return null;
    const [user] = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
    return user ?? null;
  } catch {
    return null;
  }
}

// ─── Exported procedures (composed into auth router in routers.ts) ────────────

export const requestMagicLink = publicProcedure
  .input(z.object({
    email: z.string().email(),
    sessionId: z.string(),
  }))
  .mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await db.insert(authTokens).values({
      email: input.email.toLowerCase(),
      token,
      expiresAt,
    });

    const url = `${ENV.appUrl}/auth/verify?token=${token}&sessionId=${input.sessionId}`;

    if (ENV.resendApiKey) {
      const resend = new Resend(ENV.resendApiKey);
      await resend.emails.send({
        from: "Rebel Leaders <hello@rebel-leader.com>",
        to: input.email,
        subject: "Your sign-in link",
        html: magicLinkEmail(url),
      });
    } else {
      console.log(`[Auth] Magic link (no RESEND_API_KEY set): ${url}`);
    }

    return { success: true } as const;
  });

export const verifyToken = publicProcedure
  .input(z.object({
    token: z.string(),
    sessionId: z.string(),
    pendingGravitasResult: z.any().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const [authToken] = await db
      .select()
      .from(authTokens)
      .where(
        and(
          eq(authTokens.token, input.token),
          eq(authTokens.used, false),
          gt(authTokens.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!authToken) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired token" });
    }

    await db.update(authTokens)
      .set({ used: true })
      .where(eq(authTokens.id, authToken.id));

    let [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, authToken.email))
      .limit(1);

    if (!user) {
      const [inserted] = await db.insert(users).values({
        email: authToken.email,
        name: authToken.email.split("@")[0],
        loginMethod: "magic_link",
        role: "user",
      }).$returningId();

      const [newUser] = await db.select().from(users).where(eq(users.id, inserted.id)).limit(1);
      user = newUser;

      await db.insert(userEvents).values({
        userId: user.id,
        sessionId: input.sessionId,
        eventType: "auth_created",
        payload: {},
      });
    } else {
      await db.update(users)
        .set({ lastSignedIn: new Date() })
        .where(eq(users.id, user.id));

      await db.insert(userEvents).values({
        userId: user.id,
        sessionId: input.sessionId,
        eventType: "auth_returned",
        payload: {},
      });
    }

    // Stitch anonymous session events to this user
    await db.update(userEvents)
      .set({ userId: user.id })
      .where(eq(userEvents.sessionId, input.sessionId));

    // Retroactive save of Gravitas result if provided
    if (input.pendingGravitasResult) {
      const r = input.pendingGravitasResult;
      if (r?.archetype) {
        await db.insert(gravitasAssessments).values({
          userId: user.id,
          sessionId: input.sessionId,
          scanType: r.scanType ?? (r.scanMode === "DEEP_SCAN" ? "deep" : "quick"),
          dimensionScores: r.dimensionScores ?? {
            identity: r.identity,
            relationship: r.relationship,
            vision: r.vision,
            culture: r.culture,
          },
          archetype: r.archetype,
          leak: r.leak ?? "",
          force: r.force ?? "",
          firstMove: r.firstMove ?? "",
          rawAnswers: r.rawAnswers ?? r.fullPayload ?? {},
          sessionNumber: 1,
        });
      }
    }

    const sessionToken = await signSessionToken(user.id, user.email ?? "");

    ctx.res.cookie(RL_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: ENV.isProduction,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_MS,
    });

    return { success: true, user: { id: user.id, email: user.email } } as const;
  });

export const logEvent = publicProcedure
  .input(z.object({
    sessionId: z.string(),
    eventType: z.string(),
    payload: z.any().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);

    await db.insert(userEvents).values({
      userId: magicUser?.id,
      sessionId: input.sessionId,
      eventType: input.eventType,
      payload: input.payload ?? {},
    });

    return { success: true } as const;
  });

export const saveGravitasAssessment = publicProcedure
  .input(z.object({
    sessionId: z.string(),
    scanType: z.enum(["quick", "deep"]),
    dimensionScores: z.object({
      identity: z.number(),
      relationship: z.number(),
      vision: z.number(),
      culture: z.number(),
    }),
    archetype: z.string(),
    leak: z.string(),
    force: z.string(),
    firstMove: z.string(),
    rawAnswers: z.record(z.number()),
  }))
  .mutation(async ({ input, ctx }) => {
    const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
    if (!magicUser) return { saved: false } as const;

    const db = await getDb();
    if (!db) return { saved: false } as const;

    const prior = await db
      .select()
      .from(gravitasAssessments)
      .where(eq(gravitasAssessments.userId, magicUser.id));

    await db.insert(gravitasAssessments).values({
      userId: magicUser.id,
      sessionId: input.sessionId,
      scanType: input.scanType,
      dimensionScores: input.dimensionScores,
      archetype: input.archetype,
      leak: input.leak,
      force: input.force,
      firstMove: input.firstMove,
      rawAnswers: input.rawAnswers,
      sessionNumber: prior.length + 1,
    });

    return { saved: true, sessionNumber: prior.length + 1 } as const;
  });
