import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { authTokens, users, gravitasAssessments, gravitasDeltas, userEvents, mirrorReadings, praxisSeasons, praxisReflections } from "../drizzle/schema";
import { eq, and, gt, desc, aliasedTable } from "drizzle-orm";
import { Resend } from "resend";
import { randomBytes } from "crypto";
import { magicLinkEmail } from "./emails/magic-link";
import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./_core/env";
import { parse as parseCookies } from "cookie";

const RL_SESSION_COOKIE = "rl_session";

function buildGravitasEmailHtml(data: {
  archetype: string;
  leak: string;
  force: string;
  firstMove: string;
  sessionNumber: number;
  dimensionScores: {
    identity: number;
    relationship: number;
    vision: number;
    culture: number;
  };
}): string {
  const { archetype, leak, force, firstMove, sessionNumber, dimensionScores } = data;

  const bar = (score: number) => {
    const filled = Math.round((score / 5) * 12);
    return "█".repeat(filled) + "░".repeat(12 - filled);
  };

  const fmt = (n: number) => n.toFixed(2);

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gravitas Field Report</title>
</head>
<body style="margin:0;padding:0;background-color:#050c05;font-family:'Courier New',Courier,monospace;color:#4ade80;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050c05;padding:40px 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding:0 0 32px 0;border-bottom:1px solid #1a3a1a;">
            <p style="margin:0 0 6px 0;font-size:10px;letter-spacing:0.4em;color:#2d6a2d;">REBEL-LEADER.COM // GRAVITAS INSTRUMENT</p>
            <p style="margin:0 0 6px 0;font-size:10px;letter-spacing:0.3em;color:#2d6a2d;">SESSION ${sessionNumber.toString().padStart(3,"0")} // FIELD REPORT</p>
            <p style="margin:0;font-size:22px;letter-spacing:0.2em;color:#4ade80;font-weight:normal;">SIGNAL ACQUIRED</p>
          </td>
        </tr>

        <!-- Opening -->
        <tr>
          <td style="padding:32px 0 24px 0;border-bottom:1px solid #1a3a1a;">
            <p style="margin:0;font-size:15px;line-height:1.8;color:#86efac;letter-spacing:0.05em;">The field was read. Here is what it found.</p>
          </td>
        </tr>

        <!-- Archetype -->
        <tr>
          <td style="padding:32px 0 0 0;">
            <p style="margin:0 0 6px 0;font-size:9px;letter-spacing:0.4em;color:#2d6a2d;">GRAVITATIONAL STATE</p>
            <p style="margin:0 0 24px 0;font-size:24px;letter-spacing:0.15em;color:#4ade80;">${archetype.toUpperCase()}</p>
          </td>
        </tr>

        <!-- Dimension Scores -->
        <tr>
          <td style="padding:0 0 32px 0;border-bottom:1px solid #1a3a1a;">
            <p style="margin:0 0 20px 0;font-size:9px;letter-spacing:0.4em;color:#2d6a2d;">DIMENSIONAL SCAN</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${["identity","relationship","vision","culture"].map(dim => `
              <tr>
                <td style="padding:6px 0;">
                  <p style="margin:0;font-size:11px;letter-spacing:0.25em;color:#4ade80;">
                    ${dim.toUpperCase().padEnd(14," ")} ${bar(dimensionScores[dim as keyof typeof dimensionScores])} ${fmt(dimensionScores[dim as keyof typeof dimensionScores])}
                  </p>
                </td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>

        <!-- Leak + Force -->
        <tr>
          <td style="padding:32px 0;border-bottom:1px solid #1a3a1a;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding-right:20px;">
                  <p style="margin:0 0 8px 0;font-size:9px;letter-spacing:0.4em;color:#2d6a2d;">LEAK DETECTED</p>
                  <p style="margin:0;font-size:14px;letter-spacing:0.15em;color:#fbbf24;">${leak.toUpperCase()}</p>
                  <p style="margin:8px 0 0 0;font-size:11px;line-height:1.7;color:#86efac;">Where the system is losing energy. Where to begin.</p>
                </td>
                <td width="50%" style="padding-left:20px;border-left:1px solid #1a3a1a;">
                  <p style="margin:0 0 8px 0;font-size:9px;letter-spacing:0.4em;color:#2d6a2d;">FORCE ACTIVE</p>
                  <p style="margin:0;font-size:14px;letter-spacing:0.15em;color:#4ade80;">${force.toUpperCase()}</p>
                  <p style="margin:8px 0 0 0;font-size:11px;line-height:1.7;color:#86efac;">The strongest current in the field. Build from here.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- First Move -->
        <tr>
          <td style="padding:32px 0;border-bottom:1px solid #1a3a1a;">
            <p style="margin:0 0 8px 0;font-size:9px;letter-spacing:0.4em;color:#2d6a2d;">FIRST MOVE</p>
            <p style="margin:0 0 16px 0;font-size:18px;letter-spacing:0.15em;color:#4ade80;">${firstMove.toUpperCase()}</p>
            <p style="margin:0;font-size:12px;line-height:1.8;color:#86efac;">This is your posture for what comes next. Not a destination — a direction. The Codex will tell you what to do with it.</p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:32px 0;border-bottom:1px solid #1a3a1a;">
            <p style="margin:0 0 20px 0;font-size:12px;line-height:1.8;color:#86efac;">The field doesn't lie. What it named is real. The question now is what you do with the reading.</p>
            <a href="https://rebel-leader.com/workbench/gravitas" style="display:inline-block;padding:12px 28px;background-color:transparent;border:1px solid #4ade80;color:#4ade80;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.3em;text-decoration:none;">RETURN TO THE FIELD →</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:32px 0 0 0;">
            <p style="margin:0;font-size:9px;letter-spacing:0.25em;color:#1a3a1a;">REBEL LEADERS // rebel-leader.com</p>
            <p style="margin:6px 0 0 0;font-size:9px;letter-spacing:0.15em;color:#1a3a1a;">You received this because you ran a Gravitas scan. No tracking. No drip sequence. Just the reading.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
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
        const resend = new Resend(ENV.resendApiKey);
        await resend.emails.send({
          from: "Rebel Leaders <hello@rebel-leader.com>",
          to: magicUser.email,
          subject: `Your field reading — ${input.archetype}`,
          html: buildGravitasEmailHtml({
            archetype: input.archetype,
            leak: input.leak,
            force: input.force,
            firstMove: input.firstMove,
            sessionNumber,
            dimensionScores: input.dimensionScores,
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

  const [activeSeason] = await db
    .select()
    .from(praxisSeasons)
    .where(and(eq(praxisSeasons.userId, magicUser.id), eq(praxisSeasons.status, "active")))
    .orderBy(desc(praxisSeasons.lockedAt))
    .limit(1);

  let seasonReflections: typeof praxisReflections.$inferSelect[] = [];
  if (activeSeason) {
    seasonReflections = await db
      .select()
      .from(praxisReflections)
      .where(eq(praxisReflections.seasonId, activeSeason.id))
      .orderBy(praxisReflections.day);
  }

  return {
    hasHistory,
    sessionCount,
    latestAssessment,
    latestDelta,
    activeSeason: activeSeason
      ? { ...activeSeason, reflections: seasonReflections }
      : null,
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

export const lockPraxisSeason = publicProcedure
  .input(z.object({
    cartridgeId: z.string(),
    firstMove: z.string(),
    sessionNumberAtLock: z.number().int(),
  }))
  .mutation(async ({ ctx, input }) => {
    const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
    if (!magicUser) throw new TRPCError({ code: "UNAUTHORIZED" });

    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    // Complete any existing active season before creating a new one
    await db
      .update(praxisSeasons)
      .set({ status: "complete", completedAt: new Date() })
      .where(and(eq(praxisSeasons.userId, magicUser.id), eq(praxisSeasons.status, "active")));

    await db.insert(praxisSeasons).values({
      userId: magicUser.id,
      cartridgeId: input.cartridgeId,
      firstMove: input.firstMove,
      status: "active",
      sessionNumberAtLock: input.sessionNumberAtLock,
    });

    return { locked: true } as const;
  });

export const saveReflection = publicProcedure
  .input(z.object({
    seasonId: z.number().int(),
    day: z.union([z.literal(1), z.literal(7), z.literal(14)]),
    response: z.string().min(1),
  }))
  .mutation(async ({ ctx, input }) => {
    const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
    if (!magicUser) throw new TRPCError({ code: "UNAUTHORIZED" });

    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    await db.insert(praxisReflections).values({
      seasonId: input.seasonId,
      userId: magicUser.id,
      day: input.day,
      response: input.response,
    });

    return { saved: true } as const;
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

export const getLatestMirrorReading = publicProcedure.query(async ({ ctx }) => {
  const magicUser = await getMagicLinkUser(ctx.req.headers.cookie);
  if (!magicUser) return null;

  const db = await getDb();
  if (!db) return null;

  const [last] = await db
    .select()
    .from(mirrorReadings)
    .where(eq(mirrorReadings.userId, magicUser.id))
    .orderBy(desc(mirrorReadings.createdAt))
    .limit(1);

  return last || null;
});
