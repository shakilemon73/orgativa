import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { z } from "zod";

// ── Environment Bindings ───────────────────────────────────────────────────
type Env = {
  Bindings: {
    ASSETS: {
      fetch: (request: Request) => Promise<Response>;
    };
  };
};

// ── Schema (mirrors @workspace/api-zod, inlined for edge bundling) ──────────
const HealthCheckResponse = z.object({ status: z.string() });

// ── App ──────────────────────────────────────────────────────────────────────
const app = new Hono<Env>();

app.use("*", cors());
app.use("*", logger());

// ── API Routes ───────────────────────────────────────────────────────────────
app.get("/api/healthz", (c) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  return c.json(data);
});

// Any unmatched /api/* route returns JSON 404
app.all("/api/*", (c) => c.json({ message: "API endpoint not found" }, 404));

// ── Static Assets & SPA Client-Side Routing ──────────────────────────────────
// All non-API routes (e.g. /, /admin, /admin/login, /cart, /category/*)
app.get("*", async (c) => {
  if (c.env && c.env.ASSETS) {
    // 1. Try serving exact static asset (e.g. /assets/index.js, /favicon.svg)
    const assetRes = await c.env.ASSETS.fetch(c.req.raw);
    if (assetRes.status !== 404) {
      return assetRes;
    }

    // 2. Fallback to /index.html for SPA client-side routes (/admin, /cart, etc.)
    const indexUrl = new URL("/index.html", c.req.url);
    const indexReq = new Request(indexUrl.toString(), {
      method: "GET",
      headers: c.req.raw.headers,
    });
    const indexRes = await c.env.ASSETS.fetch(indexReq);
    if (indexRes.status === 200 || indexRes.status === 304) {
      return indexRes;
    }
  }

  return c.json({ message: "Not found" }, 404);
});

export default app;
