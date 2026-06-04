// src/utils/openGameSandbox.ts

import { resolveAssetUrl } from './assetUrl';

const GAMES_BASE = (import.meta.env.VITE_GAMES_BASE as string) || '';

export { resolveAssetUrl };

export function openSmart(url: string, forceRedirect: boolean = false) {
  if (!url || url === "#") return;

  url = resolveAssetUrl(url);

  const win = window.open("about:blank", "_blank");
  if (!win) return;

  // STRATEGY A: DIRECT REDIRECT (For Miruro, Netflix, Disney+)
  // We can't hide the URL here because these sites block iframes.
  // But we CAN strip the referrer so they don't know the traffic came from you.
  if (forceRedirect) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head><title>Connecting...</title></head>
        <body style="background: #121217; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif;">
          <div style="text-align: center;">
            <p>Establishing secure connection...</p>
          </div>
          <script>
            // The "noreferrer" reset
            window.opener = null;
            window.location.replace("${url}");
          </script>
        </body>
      </html>
    `);
  }

  // STRATEGY B: THE "BLACK BOX" CLOAK (For Slides, Games, Proxies)
  // We use a dedicated sandbox file to ensure the origin is correct (localhost/domain)
  // This fixes issues with TurboWarp/Cloud Data blocking 'about:blank' (null origin).
  else {
    win.location.href = `${GAMES_BASE}/sandbox.html?url=${encodeURIComponent(url)}`;
  }
  win.document.close();
}

// BACKWARDS COMPATIBILITY
export function openGameSandbox(realUrl: string) {
  openSmart(realUrl, false);
}

export function openStream(realUrl: string) {
  openSmart(realUrl, true);
}
