import { AI_READINESS_SAMPLE } from "./field-tool-content/ai-readiness";
import { FIELD_TOOL_PRESENTATIONS } from "../client/src/lib/field-tool-presentations";
import { aiGuideFor, aiLabFor } from "./field-tool-content/ai-paths";
import { LEADERSHIP_GUIDE_PAGES } from "./field-tool-content/leadership-guides";
import { LEADERSHIP_SAMPLES } from "./field-tool-content/leadership-samples";
import { TRPCError } from "@trpc/server";
import { FIELD_LABS } from "./field-tool-content/labs";
import { FIELD_GUIDES } from "./field-tool-content/guides";
import { AI_STALEMATE_GUIDE_PAGES } from "./field-tool-content/ai-guide";
import {
  previewEnabled,
  buyerEmail,
  purchasedSlugs,
  hasFieldTool,
  requestBuyerLink,
  redeemBuyerLink,
  buyerCookie,
  BUYER_COOKIE,
  revokeBuyerSession,
} from "./field-tool-commerce";
import { z } from "zod";
import { Resend } from "resend";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import {
  userEvents,
  fieldToolOrders,
  fieldToolAccessTokens,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { getFieldToolCheckout } from "./field-tool-checkout";

const resultSchema = z.enum([
  "ai",
  "certainty",
  "priority",
  "authority",
  "translation",
]);

const RESULT_LABELS: Record<z.infer<typeof resultSchema>, string> = {
  ai: "The AI Collision",
  certainty: "The Certainty Trap",
  priority: "The Priority Collision",
  authority: "The Authority Gap",
  translation: "The Translation Gap",
};

const TOOL_SLUGS: Record<z.infer<typeof resultSchema>, string> = {
  ai: "ai-stalemate",
  certainty: "deadline-reset",
  priority: "priority-whiplash",
  authority: "mandate-reset",
  translation: "product-project-translator",
};

export const fieldToolsRouter = router({
  access: publicProcedure.query(async ({ ctx }) => {
    ctx.res.setHeader("Cache-Control", "private, no-store");
    const email = await buyerEmail(ctx.req);
    return {
      preview: previewEnabled(),
      signedIn: Boolean(email),
      slugs: await purchasedSlugs(email),
    };
  }),
  requestAccess: publicProcedure
    .input(
      z.object({
        email: z
          .string()
          .email()
          .transform(v => v.trim().toLowerCase()),
        slug: z.string().max(64),
        audience: z.enum(["pm", "lead-dev"]).default("pm"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!Object.hasOwn(FIELD_LABS, input.slug))
        throw new TRPCError({ code: "NOT_FOUND" });
      try {
        await requestBuyerLink(
          input.email,
          input.slug,
          ctx.req.ip ?? ctx.req.socket.remoteAddress ?? "unknown",
          input.audience
        );
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (e as Error).message,
        });
      }
      return { success: true };
    }),
  redeemAccess: publicProcedure
    .input(z.object({ token: z.string().regex(/^[a-f0-9]{64}$/) }))
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await redeemBuyerLink(input.token);
        ctx.res.cookie(BUYER_COOKIE, result.session, buyerCookie);
        return { slug: result.slug };
      } catch (e) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: (e as Error).message,
        });
      }
    }),
  signOut: publicProcedure.mutation(async ({ ctx }) => {
    await revokeBuyerSession(ctx.req);
    ctx.res.clearCookie(BUYER_COOKIE, { ...buyerCookie, maxAge: undefined });
    return { success: true };
  }),
  content: publicProcedure
    .input(
      z.object({
        slug: z.string().max(64),
        audience: z.enum(["pm", "lead-dev"]).default("pm"),
      })
    )
    .query(async ({ input, ctx }) => {
      ctx.res.setHeader("Cache-Control", "private, no-store");
      if (!Object.hasOwn(FIELD_LABS, input.slug))
        throw new TRPCError({ code: "NOT_FOUND" });
      if (!(await hasFieldTool(ctx.req, input.slug)))
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Sign in with your purchase email.",
        });
      const lab =
        input.slug === "ai-stalemate"
          ? aiLabFor(input.audience)
          : FIELD_LABS[input.slug];
      return {
        audience: input.audience,
        firstMove: (
          {
            "deadline-reset":
              "Bring one promised date. Skim the Guide's opening, then start Reality in the Lab. Check the constraint, shape options with your lead, and build a Stakeholder Update for the person who can make the tradeoff.",
            "priority-whiplash":
              "Bring one new urgent request and the commitments it competes with. Start The Stack in the Lab. Name what would change, then build a Tradeoff Brief for the decision owner. Return to record what they actually decide.",
            "mandate-reset":
              "Bring one outcome and one decision you cannot make. Start Accountability in the Lab, then verify the decision-rights map. Build a specific Reset Request with boundaries, an owner, and a response date.",
            "product-project-translator":
              "Bring the exact sentence a stakeholder asked you. Start The Request in the Lab. Confirm the need behind it, shape a bounded offer, and leave with a short Stakeholder Response and Commitment Card.",
          } as Record<string, string>
        )[input.slug],
        sampleValues:
          input.slug === "ai-stalemate"
            ? AI_READINESS_SAMPLE
            : LEADERSHIP_SAMPLES[input.slug],
        lab: {
          steps: lab.steps,
          outputs: lab.outputs?.map(({ build, ...output }) => output),
        },
        guide: FIELD_GUIDES[input.slug],
        guidePages:
          input.slug === "ai-stalemate"
            ? aiGuideFor(input.audience)
            : LEADERSHIP_GUIDE_PAGES[input.slug],
        aiPages:
          input.slug === "ai-stalemate" ? aiGuideFor(input.audience) : null,
        walkthroughUrl:
          process.env[
            "FIELD_TOOL_" +
              input.slug.replaceAll("-", "_").toUpperCase() +
              "_WALKTHROUGH_URL"
          ] || null,
      };
    }),
  checkout: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1).max(100),
        audience: z.enum(["pm", "lead-dev"]).default("pm"),
      })
    )
    .query(async ({ input }) => {
      const env = process.env;
      let map: Record<string, string> = {};
      try {
        map = JSON.parse(env.LEMONSQUEEZY_VARIANT_MAP ?? "{}");
      } catch {}
      let databaseReady = false;
      try {
        const db = await getDb();
        if (db) {
          await db.select().from(fieldToolOrders).limit(1);
          await db.select().from(fieldToolAccessTokens).limit(1);
          databaseReady = true;
        }
      } catch {}
      const ready = Boolean(
        databaseReady &&
          env.DATABASE_URL &&
          env.RESEND_API_KEY &&
          env.APP_URL &&
          env.LEMONSQUEEZY_WEBHOOK_SECRET &&
          env.LEMONSQUEEZY_STORE_ID &&
          ["live", "test"].includes(env.LEMONSQUEEZY_MODE ?? "") &&
          Object.values(map).includes(input.slug) &&
          !previewEnabled()
      );
      const key =
        "FIELD_TOOL_" +
        input.slug.replaceAll("-", "_").toUpperCase() +
        "_CHECKOUT_URL";
      const roleKey =
        "FIELD_TOOL_" +
        input.slug.replaceAll("-", "_").toUpperCase() +
        "_" +
        input.audience.replaceAll("-", "_").toUpperCase() +
        "_CHECKOUT_URL";
      const checkout = getFieldToolCheckout(input.slug, {
        ...env,
        [key]: env[roleKey] ?? env[key],
      });
      return ready && checkout.provider === "Lemon Squeezy"
        ? checkout
        : { checkoutUrl: null, provider: null };
    }),
  capturePressureTestLead: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        sessionId: z.string().min(1),
        result: resultSchema,
        scoreSummary: z.record(z.string(), z.number()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const normalizedEmail = input.email.trim().toLowerCase();
      const db = await getDb();

      if (db) {
        await db.insert(userEvents).values({
          sessionId: input.sessionId,
          eventType: "pressure_test_lead",
          payload: {
            email: normalizedEmail,
            result: input.result,
            resultLabel: RESULT_LABELS[input.result],
            scoreSummary: input.scoreSummary ?? {},
          },
        });
      }

      if (ENV.resendApiKey) {
        const resend = new Resend(ENV.resendApiKey);
        const toolUrl = `${ENV.appUrl}/field-tools/${TOOL_SLUGS[input.result]}`;
        await resend.emails.send({
          from: "Rebel Leaders <hello@rebel-leader.com>",
          to: normalizedEmail,
          subject: `Your Pressure Test result: ${RESULT_LABELS[input.result]}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#13231a;line-height:1.6">
              <p style="font-size:12px;letter-spacing:.16em;color:#58735f">REBEL LEADERS / PRESSURE TEST</p>
              <h1 style="font-size:34px;line-height:1.1;margin:18px 0">${RESULT_LABELS[input.result]}</h1>
              <p>Your answers point most strongly to <strong>${RESULT_LABELS[input.result]}</strong> as the operating pressure making your work harder right now.</p>
              <p>This is a practical routing result, not a personality type or psychometric score. The point is to help you make one useful next move.</p>
              <p style="margin:28px 0"><a href="${toolUrl}" style="background:#173c2a;color:white;text-decoration:none;padding:14px 20px;display:inline-block">See your recommended Field Tool →</a></p>
              <p style="font-size:13px;color:#6b776f">You can always retake the Pressure Test as the situation changes.</p>
            </div>
          `,
        });
      }

      return { success: true } as const;
    }),
});
