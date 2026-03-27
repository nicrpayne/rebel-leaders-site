import { decimal, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Gravitas scan results — one row per completed scan.
 * Multiple rows per user to track transformation over time.
 * Raw answers stored as JSON so Mirror can re-interpret without re-scanning.
 */
export const gravitasResults = mysqlTable("gravitas_results", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to users.id — nullable because unauthenticated users save to localStorage only */
  userId: int("userId"),
  /** Which scan mode produced this result */
  scanMode: mysqlEnum("scanMode", ["SCAN", "DEEP_SCAN"]).notNull(),
  /** Dimension scores (1.0–5.0) */
  identity: decimal("identity", { precision: 3, scale: 1 }).notNull(),
  relationship: decimal("relationship", { precision: 3, scale: 1 }).notNull(),
  vision: decimal("vision", { precision: 3, scale: 1 }).notNull(),
  culture: decimal("culture", { precision: 3, scale: 1 }).notNull(),
  total: decimal("total", { precision: 3, scale: 1 }).notNull(),
  /** Derived archetype label */
  archetype: varchar("archetype", { length: 64 }).notNull(),
  /** Weakest dimension key */
  leak: varchar("leak", { length: 32 }).notNull(),
  /** Strongest dimension key */
  force: varchar("force", { length: 32 }).notNull(),
  /** Full scoring payload — includes descriptions, firstMove, raw answers, etc. */
  fullPayload: json("fullPayload"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GravitasResult = typeof gravitasResults.$inferSelect;
export type InsertGravitasResult = typeof gravitasResults.$inferInsert;
