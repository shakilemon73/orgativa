# Cloudflare Deployment Guide — Orgativa

This project deploys as two separate Cloudflare services:

| Part | Service | Directory |
|------|---------|-----------|
| Frontend (React SPA) | Cloudflare Pages | `artifacts/orgativa/` |
| API (health + future routes) | Cloudflare Worker | `artifacts/api-server/` |

---

## Prerequisites

```bash
# Install Wrangler globally (one-time)
npm install -g wrangler

# Authenticate
wrangler login
```

---

## 1 — Deploy the Frontend (Cloudflare Pages)

```bash
cd artifacts/orgativa

# Build the static site
pnpm run build

# First deploy: creates the Pages project
wrangler pages deploy dist/public --project-name orgativa

# Subsequent deploys
pnpm run deploy
```

### Environment variables (required)

Set these in **Cloudflare Dashboard → Pages → orgativa → Settings → Environment variables**  
as **Build environment variables** (not encrypted secrets) so Vite can inline them:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://ccqbulvntwynjakrptjd.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | your anon key |

> These are also needed for **production** runtime environment variables in Pages.

---

## 2 — Deploy the API Worker

```bash
cd artifacts/api-server

# First deploy: creates the Worker
pnpm run deploy

# Or directly:
wrangler deploy
```

### Secrets (if needed)

```bash
# Add a secret (prompted, never stored in wrangler.toml)
wrangler secret put MY_SECRET
```

---

## 3 — Connect frontend to Worker API (optional)

If you add API routes to the Worker that the frontend calls, set the Worker URL  
as an env var in your Pages project:

```
VITE_API_URL = https://orgativa-api.<your-subdomain>.workers.dev
```

Then in your frontend code use `import.meta.env.VITE_API_URL`.

---

## SPA routing

`public/_redirects` already contains:
```
/* /index.html 200
```
Cloudflare Pages picks this up automatically — all client-side routes work correctly.

## Cache headers

`public/_headers` sets long-lived cache headers for hashed assets and short  
cache for static files — no changes needed.

---

## Verify after deploy

- Frontend: `https://orgativa.pages.dev`
- API health: `https://orgativa-api.<subdomain>.workers.dev/api/healthz`
