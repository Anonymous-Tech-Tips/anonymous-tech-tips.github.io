import { resolveAssetUrl } from './assetUrl';

export { resolveAssetUrl };

// Resolve sandbox.html relative to the current page URL (strips hash first),
// so it works on any origin/subpath without build-time baking.
function sandboxUrl(): string {
  const base = window.location.href.split('#')[0];
  return new URL('./sandbox.html', base).href;
}

export function openSmart(url: string, forceRedirect: boolean = false) {
  if (!url || url === "#") return;

  url = resolveAssetUrl(url);

  const win = window.open("about:blank", "_blank");
  if (!win) return;

  // STRATEGY A: DIRECT REDIRECT (For Miruro, Netflix, Disney+)
  // Strip referrer so destination doesn't know traffic origin.
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
            window.opener = null;
            window.location.replace("${url}");
          </script>
        </body>
      </html>
    `);
  }

  // STRATEGY B: SAME-ORIGIN SANDBOX (For games, proxies)
  // sandbox.html is served from the same origin — no cross-origin requests.
  else {
    win.location.href = `${sandboxUrl()}?url=${encodeURIComponent(url)}`;
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
