import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { z } from "zod";

// ── Schema (mirrors @workspace/api-zod, inlined for edge bundling) ──────────
const HealthCheckResponse = z.object({ status: z.string() });

// ── App ──────────────────────────────────────────────────────────────────────
const app = new Hono();

app.use("*", cors());
app.use("*", logger());

app.get("/api/healthz", (c) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  return c.json(data);
});

app.notFound((c) => c.json({ message: "Not found" }, 404));

export default app;
