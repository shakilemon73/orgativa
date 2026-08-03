# Orgativa

A professional organic grocery e-commerce website for Bangladesh with full Bangla localization, Supabase backend, and a complete admin panel.

## Stack

- **Monorepo**: pnpm workspaces, TypeScript 5.9
- **Frontend**: React 19 + Vite + TailwindCSS v4 → **Cloudflare Pages**
- **API**: Hono (edge-native) → **Cloudflare Workers**
- **Database**: PostgreSQL + Drizzle ORM (via Supabase)
- **Auth / Realtime**: Supabase

## Project Structure

```
artifacts/
  orgativa/        → React/Vite storefront + admin panel (Cloudflare Pages)
  api-server/      → Hono API (Cloudflare Worker)
  mockup-sandbox/  → Local design sandbox
lib/
  db/              → Drizzle schema + migrations
  api-zod/         → Shared Zod schemas
  api-spec/        → OpenAPI spec + Orval codegen
  api-client-react/→ Generated React Query hooks
```

## Local Development

```bash
# Install dependencies
pnpm install

# Run the storefront (Vite dev server, port 8080)
pnpm --filter @workspace/orgativa run dev

# Run the API Worker (Wrangler dev, port 8787)
pnpm --filter @workspace/api-server run dev

# Typecheck all packages
pnpm run typecheck
```

## Deployment

### Frontend → Cloudflare Pages

```bash
# Build the frontend
pnpm run build

# Deploy to Cloudflare Pages
pnpm run deploy
# (runs: wrangler pages deploy artifacts/orgativa/dist/public --project-name orgativa)
```

### API → Cloudflare Worker

```bash
# Deploy the Hono Worker
pnpm --filter @workspace/api-server run deploy
# (runs: wrangler deploy from artifacts/api-server/)
```

### Required Secrets (Cloudflare Dashboard or wrangler CLI)

| Secret | Where to set |
|---|---|
| `VITE_SUPABASE_URL` | Cloudflare Pages env vars |
| `VITE_SUPABASE_ANON_KEY` | Cloudflare Pages env vars |
| `DATABASE_URL` | `wrangler secret put DATABASE_URL` (if Worker needs DB) |

## Database

```bash
# Push schema changes (local dev only, requires DATABASE_URL)
pnpm --filter @workspace/db run push

# Regenerate API hooks from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen
```

Run `supabase-schema.sql` in the Supabase SQL editor before connecting — it creates all tables, RLS policies, indexes, and seed data.

## Architecture Notes

- **Supabase is optional**: When `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are absent, customer pages fall back to hardcoded static data.
- **Admin panel** uses Supabase directly (no Worker API layer). Routes live at `/admin/*`.
- **Routing**: wouter with `BASE_URL` base — all routes must be relative to the app base path.
