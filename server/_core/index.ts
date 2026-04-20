import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { getDb } from "../db";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { sql } from "drizzle-orm";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function runMigrations() {
  const db = await getDb();
  if (!db) {
    console.log("[Migrations] No database connection — skipping");
    return;
  }

  // Run Drizzle-tracked migrations
  try {
    console.log("[Migrations] Running...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("[Migrations] Up to date");
  } catch (error: any) {
    console.error("[Migrations] Drizzle migrate error:", error?.message ?? error);
  }

  // Belt-and-suspenders: directly ensure any columns that may have been
  // missed due to migration tracking getting out of sync with the real schema.
  const columnFixes: Array<{ label: string; ddl: string }> = [
    {
      label: "walls.is_featured",
      ddl: "ALTER TABLE walls ADD COLUMN is_featured BOOLEAN DEFAULT FALSE",
    },
    {
      label: "users.openId nullable",
      ddl: "ALTER TABLE `users` MODIFY COLUMN `openId` varchar(64) NULL",
    },
  ];

  // Belt-and-suspenders: ensure new foundation tables exist.
  const tableFixes: Array<{ label: string; ddl: string }> = [
    {
      label: "auth_tokens",
      ddl: `CREATE TABLE IF NOT EXISTS \`auth_tokens\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`email\` varchar(320) NOT NULL,
        \`token\` varchar(64) NOT NULL,
        \`expires_at\` timestamp NOT NULL,
        \`used\` boolean NOT NULL DEFAULT false,
        \`created_at\` timestamp NOT NULL DEFAULT (now()),
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`auth_tokens_token_unique\` (\`token\`)
      )`,
    },
    {
      label: "user_events",
      ddl: `CREATE TABLE IF NOT EXISTS \`user_events\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`user_id\` int,
        \`session_id\` varchar(64) NOT NULL,
        \`event_type\` varchar(64) NOT NULL,
        \`payload\` json,
        \`created_at\` timestamp NOT NULL DEFAULT (now()),
        PRIMARY KEY (\`id\`)
      )`,
    },
    {
      label: "gravitas_assessments",
      ddl: `CREATE TABLE IF NOT EXISTS \`gravitas_assessments\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`user_id\` int,
        \`session_id\` varchar(64) NOT NULL,
        \`scan_type\` varchar(10) NOT NULL,
        \`dimension_scores\` json NOT NULL,
        \`archetype\` varchar(64) NOT NULL,
        \`leak\` varchar(64) NOT NULL,
        \`force\` varchar(64) NOT NULL,
        \`first_move\` varchar(64) NOT NULL,
        \`raw_answers\` json NOT NULL,
        \`session_number\` int NOT NULL DEFAULT 1,
        \`created_at\` timestamp NOT NULL DEFAULT (now()),
        PRIMARY KEY (\`id\`)
      )`,
    },
    {
      label: "gravitas_deltas",
      ddl: `CREATE TABLE IF NOT EXISTS \`gravitas_deltas\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`user_id\` int NOT NULL,
        \`assessment_a_id\` int NOT NULL,
        \`assessment_b_id\` int NOT NULL,
        \`identity_delta\` decimal(4,2) NOT NULL,
        \`relationship_delta\` decimal(4,2) NOT NULL,
        \`vision_delta\` decimal(4,2) NOT NULL,
        \`culture_delta\` decimal(4,2) NOT NULL,
        \`archetype_shift\` boolean NOT NULL DEFAULT false,
        \`leak_shift\` boolean NOT NULL DEFAULT false,
        \`created_at\` timestamp NOT NULL DEFAULT (now()),
        PRIMARY KEY (\`id\`)
      )`,
    },
    {
      label: "codex_interactions",
      ddl: `CREATE TABLE IF NOT EXISTS \`codex_interactions\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`user_id\` int,
        \`session_id\` varchar(64) NOT NULL,
        \`cartridge_id\` varchar(64) NOT NULL,
        \`action\` varchar(32) NOT NULL,
        \`checkbox_progress\` json,
        \`time_spent_seconds\` int,
        \`arrived_from_gravitas\` boolean NOT NULL DEFAULT false,
        \`created_at\` timestamp NOT NULL DEFAULT (now()),
        PRIMARY KEY (\`id\`)
      )`,
    },
    {
      label: "mirror_readings",
      ddl: `CREATE TABLE IF NOT EXISTS \`mirror_readings\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`user_id\` int,
        \`session_id\` varchar(64) NOT NULL,
        \`responses\` json NOT NULL,
        \`result\` json NOT NULL,
        \`created_at\` timestamp NOT NULL DEFAULT (now()),
        PRIMARY KEY (\`id\`)
      )`,
    },
    {
      label: "praxis_seasons",
      ddl: `CREATE TABLE IF NOT EXISTS \`praxis_seasons\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`user_id\` int NOT NULL,
        \`cartridge_id\` varchar(64) NOT NULL,
        \`first_move\` varchar(64) NOT NULL,
        \`status\` enum('active','complete') NOT NULL DEFAULT 'active',
        \`session_number_at_lock\` int NOT NULL,
        \`locked_at\` timestamp NOT NULL DEFAULT (now()),
        \`completed_at\` timestamp,
        PRIMARY KEY (\`id\`)
      )`,
    },
    {
      label: "praxis_reflections",
      ddl: `CREATE TABLE IF NOT EXISTS \`praxis_reflections\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`season_id\` int NOT NULL,
        \`user_id\` int NOT NULL,
        \`day\` int NOT NULL,
        \`response\` text NOT NULL,
        \`completed_at\` timestamp NOT NULL DEFAULT (now()),
        PRIMARY KEY (\`id\`)
      )`,
    },
  ];

  for (const fix of tableFixes) {
    try {
      await db.execute(sql.raw(fix.ddl));
      console.log(`[Migrations] Table ensured: ${fix.label}`);
    } catch (e: any) {
      console.error(`[Migrations] Error ensuring ${fix.label}:`, e?.message);
    }
  }
  for (const fix of columnFixes) {
    try {
      await db.execute(sql.raw(fix.ddl));
      console.log(`[Migrations] Applied: ${fix.label}`);
    } catch (e: any) {
      // errno 1060 = ER_DUP_FIELDNAME — column already exists, nothing to do
      if (e?.errno === 1060 || e?.message?.includes("Duplicate column name")) {
        console.log(`[Migrations] Already exists: ${fix.label}`);
      } else {
        console.error(`[Migrations] Error applying ${fix.label}:`, e?.message);
      }
    }
  }
}

async function startServer() {
  await runMigrations();
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
