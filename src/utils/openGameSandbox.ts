export function openGameSandbox(realUrl: string) {
  // Open about:blank first to hide referrer, then redirect to actual URL
  // This bypasses X-Frame-Options restrictions since we're not using iframes
  const win = window.open("about:blank", "_blank");
  if (!win) return;

  // Use location.replace to navigate without adding to history
  // This hides the referrer while avoiding iframe restrictions
  win.location.replace(realUrl);
}
