// src/utils/openGameSandbox.ts

// 🔒 THE NEW SMART OPENER (Internal Logic)
export function openSmart(url: string, forceRedirect: boolean = false) {
  if (!url || url === "#") return;

  const win = window.open("about:blank", "_blank");
  if (!win) return;

  // STRATEGY A: DIRECT REDIRECT (For Miruro, Netflix, Disney+)
  // Use this if the site has "X-Frame-Options: DENY" (The Firefox Error)
  if (forceRedirect) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head><title>Loading...</title></head>
        <body style="background: #121217; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif;">
          <div style="text-align: center;">
            <p>Connecting securely...</p>
          </div>
          <script>
            // Strip referrer so they don't know you came from school
            window.location.replace("${url}");
          </script>
        </body>
      </html>
    `);
  } 
  
  // STRATEGY B: IFRAME CLOAK (For Google Slides, Canva, Games)
  // Keeps the URL hidden in the bar
  else {
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Classroom Activity</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: #000; overflow: hidden; }
            iframe { width: 100vw; height: 100vh; border: none; }
          </style>
        </head>
        <body>
          <iframe src="${url}" allowfullscreen></iframe>
        </body>
      </html>
    `);
  }
  win.document.close();
}

// 🎮 BACKWARD COMPATIBILITY EXPORT (Crucial!)
// This fixes the crash by restoring the function your Games Pages are looking for.
// It simply redirects to the new 'openSmart' using the default Cloaked strategy.
export function openGameSandbox(realUrl: string) {
  openSmart(realUrl, false); // Games usually support cloaking
}

// 📺 EXPORT FOR STREAMING
export function openStream(realUrl: string) {
  openSmart(realUrl, true); // Force redirect for streams by default (safer for Firefox)
}
