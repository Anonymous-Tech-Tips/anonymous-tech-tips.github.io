---
name: run-anonymous-tech-tips
description: Run, build, screenshot, and drive the anonymous-tech-tips site. Use when asked to start the dev server, test a feature, take a screenshot, interact with the app, or verify a UI change.
---

# run-anonymous-tech-tips

Vite + React SPA with two faces: educational exterior (public) and gaming interior (authenticated). Driven with Chrome DevTools MCP (`chrome-devtools__*` tools). Dev server at `http://localhost:8080`.

## Prerequisites

```bash
npm ci
```

No extra apt packages needed — pure Node.js.

## Build

```bash
npm run build          # GitHub Pages mode (base: "./")
npm run build:gcs      # GCS mode — sets VITE_GAMES_BASE=https://storage.googleapis.com/website2026
npm run type-check     # tsc --noEmit
npm run lint           # eslint
```

## Run (agent path — Chrome DevTools MCP)

Start dev server:

```bash
npm run dev -- --port 8080
# wait ~3s, then verify: curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/
```

Then drive with MCP tools:

```
# Navigate
chrome-devtools__navigate_page  type=url  url=http://localhost:8080/

# Snapshot (a11y tree → uids for clicking)
chrome-devtools__take_snapshot

# Click by uid from snapshot
chrome-devtools__click  uid=<uid>

# Screenshot
chrome-devtools__take_screenshot  filePath=./screenshot.png

# Run JS
chrome-devtools__evaluate_script  function="() => { return document.title; }"
```

### Suppress coach marks on first load

CoachMarks modal appears on every fresh browser profile. Suppress before navigating:

```
chrome-devtools__evaluate_script
  function="() => { localStorage.setItem('coachMarksCompleted', 'true'); }"
```

Then reload.

### Log in as demo user (unlocks interior)

After navigating to `/#/login`, click "Demo Student Account →" (snapshot uid ends in the button with that label). This uses Firebase anonymous auth — no credentials needed, works offline.

Interior shows: MODULES / ENTERTAINMENT / UTILITIES nav, game grid with GameIcon initials, "Afternoon, Gamer" greeting.

### Open a game (in-page overlay)

Games open as a full-screen iframe overlay within the SPA — NOT a new tab. Clicking "Launch" fires a `CustomEvent('open-game-overlay')`. The overlay renders the game URL in an iframe; press Escape to close.

## Run (human path)

```bash
npm run dev
# opens http://localhost:8080 — visit in browser, click Login → Demo Student Account
```

## Gotchas

- **`publicDir: false` in prod builds** — game files (4.5 GB in `public/games/html/`) are excluded from `dist/`. They live in GCS bucket `website2026`. Don't revert this.
- **Coach marks block login page** — always set `localStorage.coachMarksCompleted = 'true'` before interacting with login in a fresh browser context.
- **Daily login bonus modal** — appears immediately after auth. Dismiss by clicking "Claim Reward" or the × button before interacting with the page.
- **GCS bucket may get Lightspeed-blocked** — school content filter (`website2026` bucket). If blocked, create new `website####` bucket, copy game files bucket-to-bucket, update `.env.gcs` + `deploy-gcs.yml`.
- **Games load in overlay, not new tab** — `openSmart()` dispatches `open-game-overlay` CustomEvent. `sandbox.html` still exists but is no longer used for games. `forceRedirect=true` (streaming) still opens new tab.
- **HashRouter** — all routes use `/#/path`. Use `src/lib/paths.ts` helpers (`hash()`, `asset()`) not hardcoded URLs.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Port 8080 already in use | `npm run dev -- --port 8081` |
| `premiumUtilities is not defined` | Already fixed — was undefined var in UtilitiesPage.tsx |
| Stale chunk error after deploy | Hard refresh: Ctrl+Shift+R — SW serving old hashed chunk |
| Game overlay doesn't appear | Check `window.dispatchEvent` fires `open-game-overlay`; GameOverlay must be mounted in App.tsx |
| GCS billing XML error on game load | `resolveAssetUrl` not prefixing VITE_GAMES_BASE — check `.env.gcs` and that `build:gcs` was used |
