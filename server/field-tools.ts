import { z } from "zod";
import { Resend } from "resend";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { userEvents } from "../drizzle/schema";
import { ENV } from "./_core/env";

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
  capturePressureTestLead: publicProcedure
    .input(z.object({
      email: z.string().email(),
      sessionId: z.string().min(1),
      result: resultSchema,
      scoreSummary: z.record(z.string(), z.number()).optional(),
    }))
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
