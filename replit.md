# Orgativa

A professional organic grocery e-commerce website for Bangladesh with full Bangla localization, Supabase backend, and a complete admin panel.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/orgativa/` — React + Vite web app (customer storefront + admin panel)
- `artifacts/orgativa/src/lib/supabase.ts` — Supabase client + TypeScript DB types
- `artifacts/orgativa/src/lib/supabase-hooks.ts` — React hooks (useProducts, useProduct, useCategories, submitOrder) with static data fallback
- `artifacts/orgativa/src/data/products.ts` — Static fallback data + shared types (Product, Category)
- `artifacts/orgativa/src/pages/admin/` — Full admin panel (Dashboard, Products, Categories, Orders, Settings)
- `supabase-schema.sql` — Full PostgreSQL schema with seed data (run this in Supabase SQL editor)

## Architecture decisions

- **Supabase is optional**: When `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are absent, all customer pages fall back to hardcoded static data — the site always renders.
- **Supabase client is `null` when unconfigured**: `createClient()` throws on empty strings, so `supabase` is typed as `SupabaseClient | null`. Use `supabase!` (non-null assertion) only after an `isSupabaseConfigured` guard.
- **Admin panel uses Supabase directly** (no Express API layer). Admin routes live at `/admin/*` and are protected by a `useEffect` auth redirect in `AdminLayout`.
- **Routing**: wouter with `BASE_URL` base — all routes must be relative to the app's base path.

## Product

- **Storefront**: Home page, category browsing, product detail, cart, checkout (bKash/Nagad/COD)
- **Admin panel** (`/admin/*`): Login, dashboard with revenue stats, product management (CRUD), category management, order tracking with status updates, site settings
- All text in Bangla; BDT pricing; Bangladesh delivery zones

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run `supabase-schema.sql` in the Supabase SQL editor before connecting; it creates all tables, RLS policies, indexes, and seed data.
- Set secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` via Replit secrets panel — the site works without them (static fallback), but the admin panel and live data require them.
- The `Category` type must be exported from `src/data/products.ts` — it's used by both static data and Supabase hooks.
- Admin auth uses Supabase's built-in `auth.signInWithPassword` — create an admin user via the Supabase dashboard (Authentication → Users).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
