# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on port 8080 (host `::`), HMR overlay disabled
- `npm run build` / `npm run build:dev` — production / development-mode build
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run test` — Vitest run (jsdom)
- `npm run test:watch` — Vitest watch
- Single test: `npx vitest run src/path/to/file.test.ts` (or `-t "test name"`)

Package manager: both `bun.lock` and `package-lock.json` exist; npm scripts above work with either. No typecheck script — use `npx tsc -p tsconfig.app.json --noEmit`.

## Environment

Supabase client (`src/integrations/supabase/client.ts`) reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from Vite env. Without these, auth + content fetching break at runtime.

## Architecture

**Stack**: Vite + React 18 + TypeScript, React Router v6, TanStack Query, Supabase (auth + Postgres), shadcn/ui (Radix + Tailwind), Tailwind, Framer Motion. Path alias `@/*` → `src/*`. Lovable platform integration via `lovable-tagger` plugin (dev only) and `@lovable.dev/cloud-auth-js`.

**Routing** (`src/App.tsx`): public site (`/`, `/planos`, `/quem-atendemos`, `/blog`, `/blog/:slug`) + admin area under `/admin/*` (login, dashboard, cms, forms, analytics, tags, settings). All non-index routes lazy-loaded via `React.lazy` + `Suspense`. `AuthProvider`, `TrackingScripts`, `PageTracker` wrap the router.

**Auth** (`src/hooks/useAuth.tsx`): Supabase session + `isAdmin` derived from `supabase.rpc("has_role", { _user_id, _role: "admin" })`. Two-stage effect: subscribe to `onAuthStateChange`, then resolve admin role once `authReady`. Admin routes must check `isAdmin` + `loading`.

**CMS content model** (`src/hooks/useSectionContent.ts`): each site section keyed by string (e.g. `hero`, `services`, `footer`). `DEFAULT_CONTENT` is the source of truth for shape + fallback copy. Runtime merges DB row from `site_content` table (column `content` jsonb) over defaults: `{ ...DEFAULT_CONTENT[key], ...dbContent }`. **When adding a section field, update `DEFAULT_CONTENT` — fields missing there won't render even if present in DB.** `PreviewContext` lets the admin CMS preview unsaved edits in-place by overriding a single section.

**Supabase schema**: migrations in `supabase/migrations/*.sql`. Generated types in `src/integrations/supabase/types.ts` (do not hand-edit — regenerate from Supabase).

**Components**: `src/components/*.tsx` are landing-page sections (Hero, Services, etc.); `src/components/ui/*` are shadcn primitives (see `components.json` for aliases); `src/components/admin/*` for admin UI. Add shadcn components via `npx shadcn@latest add <name>` — config in `components.json` (style `default`, baseColor `slate`, no prefix).

**Tracking**: `TrackingScripts` injects third-party scripts; `PageTracker` logs route changes; `useTrackCTA` for CTA events. Likely Supabase-backed analytics tables.

## Conventions

- All UI copy is Portuguese (pt-BR) — keep new copy in Portuguese unless instructed otherwise
- Lazy-load new routes via `lazy()` in `App.tsx` (only `Index` is eager)
- New CMS-editable sections: add key + default shape to `DEFAULT_CONTENT`, then read via `useSectionContent("key")`
