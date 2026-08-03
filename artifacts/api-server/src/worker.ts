import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

// ── Environment Bindings ───────────────────────────────────────────────────
// ASSETS binding is available (but not needed here since run_worker_first = ["/api/*"]
// means this Worker is ONLY invoked for /api/* routes. Static assets and SPA
// routes like /admin are served directly by Cloudflare Assets CDN with
// not_found_handling = "single-page-application" serving index.html as fallback.
type Env = {
  Bindings: {
    ASSETS: Fetcher;
  };
};

// ── Schema ───────────────────────────────────────────────────────────────────
const HealthCheckResponse = z.object({ status: z.string() });

// ── App ──────────────────────────────────────────────────────────────────────
const app = new Hono<Env>();

app.use("*", cors());

// ── API Routes ───────────────────────────────────────────────────────────────
app.get("/api/healthz", (c) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  return c.json(data);
});

// Any unmatched /api/* route returns JSON 404
app.all("/api/*", (c) => c.json({ message: "API endpoint not found" }, 404));

// NOTE: No catch-all needed. This Worker is ONLY invoked for /api/* because of
// run_worker_first = ["/api/*"] in wrangler.toml. All other routes (/, /admin,
// /admin/login, /cart, /category/*, etc.) are handled by Cloudflare Assets CDN
// which serves index.html for any unmatched path (SPA mode).

export default app;
