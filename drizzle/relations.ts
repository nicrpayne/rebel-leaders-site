import { relations } from "drizzle-orm";
import { users, gravitasResults } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  gravitasResults: many(gravitasResults),
}));

export const gravitasResultsRelations = relations(gravitasResults, ({ one }) => ({
  user: one(users, {
    fields: [gravitasResults.userId],
    references: [users.id],
  }),
}));
