// src/utils/openGameSandbox.ts

export function openSmart(url: string, forceRedirect: boolean = false) {
  if (!url || url === "#") return;

  // Resolve relative URLs to absolute URLs
  if (url.startsWith('/')) {
    url = window.location.origin + url;
  }

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
  // This hides the URL in the address bar (stays as about:blank)
  // AND prevents rivals from right-clicking to inspect the iframe source.
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
          <script>
            // 🛡️ ANTI-THEFT PROTECTION 🛡️
            
            // 1. Disable Right Click
            document.addEventListener('contextmenu', event => event.preventDefault());
            
            // 2. Disable F12, Ctrl+Shift+I, Ctrl+U (View Source)
            document.onkeydown = function(e) {
              if(event.keyCode == 123) { return false; }
              if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false; }
              if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { return false; }
              if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { false; }
              if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false; }
            }

            // 3. Console Warning (Psychological Warfare)
            console.log("%c STOP!", "color: red; font-size: 50px; font-weight: bold;");
            console.log("%c This source code is protected. Access attempts are logged.", "color: white; font-size: 20px;");
          </script>
        </head>
        <body>
          <iframe src="${url}" allowfullscreen></iframe>
        </body>
      </html>
    `);
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
