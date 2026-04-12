import { boolean, decimal, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

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

export const walls = mysqlTable("walls", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  wallCode: varchar("wall_code", { length: 10 }).unique().notNull(),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  headerImageUrl: text("header_image_url"),
  promptText: text("prompt_text"),
  sourceType: varchar("source_type", { length: 50 }),
  sourceRef: varchar("source_ref", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wallSubmissions = mysqlTable("wall_submissions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  wallId: varchar("wall_id", { length: 36 }).notNull(),
  imageUrl: text("image_url").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const wallEntries = mysqlTable("wall_entries", {
  id: varchar("id", { length: 36 }).primaryKey(),
  wallId: varchar("wall_id", { length: 36 }).notNull(),
  imageUrl: text("image_url").notNull(),
  displayOrder: int("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
