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
  ];
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
