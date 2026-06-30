import { resolveAssetUrl } from './assetUrl';

export { resolveAssetUrl };

// Resolve sandbox.html relative to the current page URL (strips hash first),
// so it works on any origin/subpath without build-time baking.
function sandboxUrl(): string {
  const base = window.location.href.split('#')[0];
  return new URL('./sandbox.html', base).href;
}

export function openSmart(url: string, forceRedirect: boolean = false, title?: string) {
  if (!url || url === "#") return;

  url = resolveAssetUrl(url);

  // STRATEGY A: DIRECT REDIRECT (For Miruro, Netflix, Disney+)
  // External URLs — still open new tab since we can't iframe cross-origin streaming sites.
  if (forceRedirect) {
    const win = window.open("about:blank", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head><title>Connecting...</title></head>
        <body style="background: #121217; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif;">
          <div style="text-align: center;">
            <p>Establishing secure connection...</p>
          </div>
          <script>
            window.opener = null;
            window.location.replace("${url}");
          </script>
        </body>
      </html>
    `);
    win.document.close();
    return;
  }

  // STRATEGY B: IN-PAGE OVERLAY (For games)
  // Render game inside the SPA via full-screen iframe overlay.
  // Avoids opening a new tab URL that content filters evaluate as a fresh request.
  window.dispatchEvent(new CustomEvent('open-game-overlay', { detail: { url, title } }));
}

// BACKWARDS COMPATIBILITY
export function openGameSandbox(realUrl: string, title?: string) {
  openSmart(realUrl, false, title);
}

export function openStream(realUrl: string) {
  openSmart(realUrl, true);
}
