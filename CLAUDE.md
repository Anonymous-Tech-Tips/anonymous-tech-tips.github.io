# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack
Vite 5 · React 18 · ShadCN/Radix UI · TypeScript · Firebase (Auth + Firestore) · PWA · GitHub Pages · GCS

## Commands
```bash
npm run dev              # local dev on :8080
npm run build            # validate:data → generate:sitemap → vite build
npm run build:gcs        # same but mode=gcs (GCS asset backend)
npm run type-check       # tsc --noEmit
npm run lint             # eslint
npm run deploy           # predeploy (build) → gh-pages -d dist
```
No test runner exists yet — add vitest before adding features.

## Architecture

### Routing & Auth
- `HashRouter` — all routes use `/#/path`. Use `src/lib/paths.ts` helpers (`hash()`, `asset()`, `canonical()`) instead of hardcoding URLs.
- Almost all routes are `<ProtectedRoute>` — requires Firebase auth. Anonymous login supported via `loginAnonymously()`.
- Auth auto-logs out after 5 min inactivity (`AuthContext`).
- `AppContent` wraps all routes and handles SW updates, page-view tracking, and pending room invites.

### Context layers (order matters in `App.tsx`)
```
QueryClient → TooltipProvider → Auth → Rewards(deprecated) → Progression → UserPrefs
```
- `ProgressionContext` — source of truth for points/purchases. `RewardsContext` is deprecated wrapper kept for compat.
- `UserPrefsContext` — user settings persisted to localStorage (theme, streaks, achievements, game stats).

### Data flow
- Content lives in `src/data/*.json` (games, utilities, guides) and is validated by `scripts/validate-data.ts` at build time using Zod schemas in `src/lib/schemas.ts`.
- Adding/modifying content: edit the JSON → schemas must pass → build proceeds.
- `src/lib/schemas.ts` exports `Game`, `Utility`, `Guide`, `UserPrefs` types and Zod validators.

### Game/Content loading
- Games open via `openSmart()` (`src/utils/openGameSandbox.ts`):
  - `forceRedirect=false` → `sandbox.html?url=...` (same-origin iframe for games/proxies)
  - `forceRedirect=true` → blank window with `window.opener=null` redirect (streaming sites)
- `topvaz66/` and `strongdog/` dirs served by custom Vite dev middleware; in prod they are static dirs alongside `dist/`.
- `src/data/topvaz-games.json` — secondary game catalog from topvaz66 dir.

### Build modes
- Default: GitHub Pages. `base: "./"`, `publicDir` disabled in build (avoids 1GB copy of game files). Essential assets copied via CI workflow.
- `build:gcs`: same except `mode=gcs`, uses GCS bucket (`anonymoustechtips`) for game assets.
- `publicDir: false` in prod is intentional — don't revert.
- `manualChunks` splits react/ui/firebase vendors; game files excluded from SW precache.

### Firebase
- Only `firebase/auth` and `firebase/firestore` imported — tree-shaking required. Never `import * from 'firebase'`.
- Config in `src/lib/firebase.ts` (public API key, safe to commit for Firebase web apps).

### Feature flags
- `src/lib/featureFlags.ts` — `FEATURE_FLAGS` const object. Ads disabled by default (`ADS_ADSENSE_APPROVED: false`).

### PWA
- `injectManifest` strategy with custom `src/sw.ts`. Game files excluded from precache.
- SW `controllerchange` → hard reload. Beware stale prerendered shells after deploy.

## Known issues (audit 2026-06-06)
- `crypto-js` dep — replace with native `crypto.subtle` (`src/utils/crypto.ts` + `secure.ts`)
- `dist/` committed to git — should be gh-pages branch only
- React 18 — other projects on 19
- Many Radix UI components imported but may be unused (Lovable.ai generated base)
