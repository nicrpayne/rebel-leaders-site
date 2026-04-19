import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { authTokens, users, gravitasAssessments, gravitasDeltas, userEvents, mirrorReadings } from "../drizzle/schema";
import { eq, and, gt, desc, aliasedTable } from "drizzle-orm";
import { Resend } from "resend";
import { randomBytes } from "crypto";
import { magicLinkEmail } from "./emails/magic-link";
import { gravitas_reading_email } from "./emails/gravitas-reading";
import { getGravitasEmailContent } from "./lib/gravitas-hints";
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
    pendingMirrorResult: z.any().optional(),
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

    // Retroactive save of Mirror result if provided
    if (input.pendingMirrorResult) {
      const m = input.pendingMirrorResult;
      if (m?.top_family) {
        await db.insert(mirrorReadings).values({
          userId: user.id,
          sessionId: input.sessionId,
          responses: {},
          result: m,
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

    const sessionNumber = prior.length + 1;

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
      sessionNumber,
    });

    // Delta computation — only when this is a return scan
    try {
      if (sessionNumber > 1) {
        const [newRow] = await db
          .select({ id: gravitasAssessments.id })
          .from(gravitasAssessments)
          .where(and(
            eq(gravitasAssessments.userId, magicUser.id),
            eq(gravitasAssessments.sessionNumber, sessionNumber),
          ))
          .limit(1);

        const [prevRow] = await db
          .select({
            id: gravitasAssessments.id,
            archetype: gravitasAssessments.archetype,
            leak: gravitasAssessments.leak,
            dimensionScores: gravitasAssessments.dimensionScores,
          })
          .from(gravitasAssessments)
          .where(and(
            eq(gravitasAssessments.userId, magicUser.id),
            eq(gravitasAssessments.sessionNumber, sessionNumber - 1),
          ))
          .limit(1);

        if (newRow && prevRow) {
          const prev = prevRow.dimensionScores as { identity: number; relationship: number; vision: number; culture: number };
          const curr = input.dimensionScores;
          await db.insert(gravitasDeltas).values({
            userId: magicUser.id,
            assessmentAId: prevRow.id,
            assessmentBId: newRow.id,
            identityDelta: String(curr.identity - prev.identity),
            relationshipDelta: String(curr.relationship - prev.relationship),
            visionDelta: String(curr.vision - prev.vision),
            cultureDelta: String(curr.culture - prev.culture),
            archetypeShift: input.archetype !== prevRow.archetype,
            leakShift: input.leak !== prevRow.leak,
          });
        }
      }
    } catch (err) {
      console.error("[saveGravitasAssessment] delta computation failed:", err);
    }

    try {
      if (ENV.resendApiKey && magicUser.email) {
        const emailContent = getGravitasEmailContent(
          input.archetype,
          input.leak,
          input.force,
          input.firstMove,
        );
        const resend = new Resend(ENV.resendApiKey);
        await resend.emails.send({
          from: "Rebel Leaders <hello@rebel-leader.com>",
          to: magicUser.email,
          subject: `Your field reading — ${input.archetype}`,
          html: gravitas_reading_email({
            name: magicUser.email,
            archetype: input.archetype,
            leak: input.leak,
            force: input.force,
            firstMove: input.firstMove,
            identity: input.dimensionScores.identity,
            relationship: input.dimensionScores.relationship,
            vision: input.dimensionScores.vision,
            culture: input.dimensionScores.culture,
            ...emailContent,
          }),
        });
      }
    } catch (err) {
      console.error("[saveGravitasAssessment] email send failed:", err);
    }

    return { saved: true, sessionNumber } as const;
  });

export const getLastGravitasAssessment = publicProcedure.query(async ({ ctx }) => {
  const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
  if (!magicUser) return null;

  const db = await getDb();
  if (!db) return null;

  const [last] = await db
    .select()
    .from(gravitasAssessments)
    .where(eq(gravitasAssessments.userId, magicUser.id))
    .orderBy(desc(gravitasAssessments.createdAt))
    .limit(1);
  return last || null;
});

export const getPraxisState = publicProcedure.query(async ({ ctx }) => {
  const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
  if (!magicUser) return null;

  const db = await getDb();
  if (!db) return null;

  const assessments = await db
    .select({
      id: gravitasAssessments.id,
      sessionNumber: gravitasAssessments.sessionNumber,
      archetype: gravitasAssessments.archetype,
      leak: gravitasAssessments.leak,
      force: gravitasAssessments.force,
      firstMove: gravitasAssessments.firstMove,
      dimensionScores: gravitasAssessments.dimensionScores,
      createdAt: gravitasAssessments.createdAt,
    })
    .from(gravitasAssessments)
    .where(eq(gravitasAssessments.userId, magicUser.id))
    .orderBy(desc(gravitasAssessments.createdAt));

  const sessionCount = assessments.length;
  const latestAssessment = assessments[0] || null;
  const hasHistory = sessionCount > 1;

  let latestDelta = null;
  if (hasHistory) {
    const assessmentA = aliasedTable(gravitasAssessments, "pa");
    const assessmentB = aliasedTable(gravitasAssessments, "pb");

    const [deltaRow] = await db
      .select({
        identityDelta: gravitasDeltas.identityDelta,
        relationshipDelta: gravitasDeltas.relationshipDelta,
        visionDelta: gravitasDeltas.visionDelta,
        cultureDelta: gravitasDeltas.cultureDelta,
        archetypeShift: gravitasDeltas.archetypeShift,
        leakShift: gravitasDeltas.leakShift,
        previousDate: assessmentA.createdAt,
        currentDate: assessmentB.createdAt,
        previousArchetype: assessmentA.archetype,
        currentArchetype: assessmentB.archetype,
        previousLeak: assessmentA.leak,
        currentLeak: assessmentB.leak,
      })
      .from(gravitasDeltas)
      .innerJoin(assessmentA, eq(gravitasDeltas.assessmentAId, assessmentA.id))
      .innerJoin(assessmentB, eq(gravitasDeltas.assessmentBId, assessmentB.id))
      .where(eq(gravitasDeltas.userId, magicUser.id))
      .orderBy(desc(gravitasDeltas.createdAt))
      .limit(1);

    latestDelta = deltaRow || null;
  }

  return {
    hasHistory,
    sessionCount,
    latestAssessment,
    latestDelta,
    activeSeason: null,
  };
});

export const getLatestGravitasDelta = publicProcedure.query(async ({ ctx }) => {
  const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
  if (!magicUser) return null;

  const db = await getDb();
  if (!db) return null;

  // Alias the two assessment joins so we can pull fields from both
  const assessmentA = aliasedTable(gravitasAssessments, "assessment_a");
  const assessmentB = aliasedTable(gravitasAssessments, "assessment_b");

  const [row] = await db
    .select({
      identityDelta: gravitasDeltas.identityDelta,
      relationshipDelta: gravitasDeltas.relationshipDelta,
      visionDelta: gravitasDeltas.visionDelta,
      cultureDelta: gravitasDeltas.cultureDelta,
      archetypeShift: gravitasDeltas.archetypeShift,
      leakShift: gravitasDeltas.leakShift,
      previousDate: assessmentA.createdAt,
      currentDate: assessmentB.createdAt,
      previousArchetype: assessmentA.archetype,
      currentArchetype: assessmentB.archetype,
      previousLeak: assessmentA.leak,
      currentLeak: assessmentB.leak,
    })
    .from(gravitasDeltas)
    .innerJoin(assessmentA, eq(gravitasDeltas.assessmentAId, assessmentA.id))
    .innerJoin(assessmentB, eq(gravitasDeltas.assessmentBId, assessmentB.id))
    .where(eq(gravitasDeltas.userId, magicUser.id))
    .orderBy(desc(gravitasDeltas.createdAt))
    .limit(1);

  return row || null;
});

export const getGravitasHistory = publicProcedure.query(async ({ ctx }) => {
  const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
  if (!magicUser) return [];

  const db = await getDb();
  if (!db) return [];

  const rows = await db
    .select({
      id: gravitasAssessments.id,
      sessionNumber: gravitasAssessments.sessionNumber,
      archetype: gravitasAssessments.archetype,
      leak: gravitasAssessments.leak,
      force: gravitasAssessments.force,
      firstMove: gravitasAssessments.firstMove,
      dimensionScores: gravitasAssessments.dimensionScores,
      createdAt: gravitasAssessments.createdAt,
    })
    .from(gravitasAssessments)
    .where(eq(gravitasAssessments.userId, magicUser.id))
    .orderBy(gravitasAssessments.createdAt);

  return rows;
});

export const saveMirrorReading = publicProcedure
  .input(z.object({
    sessionId: z.string(),
    responses: z.any(),
    result: z.object({
      top_family: z.string(),
      secondary_family: z.string().nullable(),
      confidence_band: z.string(),
      gravitas_combo: z.string(),
      confirmation_pair_used: z.string().nullable(),
      adaptive_question_used: z.string().nullable(),
      reading_tone_flags: z.array(z.string()),
      codex_framing_flags: z.array(z.string()),
      resistance_core_key: z.string(),
      move_logic_family: z.string(),
      family_scores: z.any(),
    }),
  }))
  .mutation(async ({ input, ctx }) => {
    const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
    if (!magicUser) return { saved: false } as const;

    const db = await getDb();
    if (!db) return { saved: false } as const;

    await db.insert(mirrorReadings).values({
      userId: magicUser.id,
      sessionId: input.sessionId,
      responses: input.responses,
      result: input.result,
    });

    return { saved: true } as const;
  });
