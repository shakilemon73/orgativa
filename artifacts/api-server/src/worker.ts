import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { z } from "zod";

// ── Environment Bindings ───────────────────────────────────────────────────
type Env = {
  Bindings: {
    ASSETS: {
      fetch: (request: Request | string) => Promise<Response>;
    };
  };
};

// ── Schema (mirrors @workspace/api-zod, inlined for edge bundling) ──────────
const HealthCheckResponse = z.object({ status: z.string() });

// ── App ──────────────────────────────────────────────────────────────────────
const app = new Hono<Env>();

app.use("*", cors());
app.use("*", logger());

app.get("/api/healthz", (c) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  return c.json(data);
});

// Unmatched API requests return JSON 404
app.all("/api/*", (c) => c.json({ message: "API endpoint not found" }, 404));

// All non-API routes (SPA routes like /admin, /cart, /, /products/*) delegate to static ASSETS, with index.html fallback
app.notFound(async (c) => {
  if (c.env && c.env.ASSETS) {
    // 1. Try fetching the static asset directly (e.g. /assets/index.js, /favicon.svg)
    const res = await c.env.ASSETS.fetch(c.req.raw);
    if (res.status !== 404) {
      return res;
    }

    // 2. For SPA client-side routes (like /admin, /admin/login, /cart), serve index.html
    const indexUrl = new URL("/index.html", c.req.url);
    const indexRes = await c.env.ASSETS.fetch(indexUrl.toString());
    if (indexRes.status === 200) {
      return new Response(indexRes.body, {
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      });
    }
  }

  return c.json({ message: "Not found" }, 404);
});

export default app;
