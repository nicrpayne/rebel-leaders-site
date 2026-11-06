import { z } from "zod";

export const giftDetailsSchema = z.object({
  senderName: z.string().trim().min(1, "Add your name.").max(100),
  recipientName: z.string().trim().max(100).default(""),
  recipientEmail: z
    .string()
    .trim()
    .email("Check their email address.")
    .max(320)
    .transform(value => value.toLowerCase()),
  message: z.string().trim().max(1000).default(""),
});
export type GiftDetails = z.infer<typeof giftDetailsSchema>;
