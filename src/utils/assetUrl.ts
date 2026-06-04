// Resolves /games/* and other root-relative paths against VITE_GAMES_BASE.
// Required when the app is served from a subdirectory (e.g. GCS bucket) where
// window.location.origin != the asset root.
const GAMES_BASE = (import.meta.env.VITE_GAMES_BASE as string) || '';

export function resolveAssetUrl(url: string): string {
  if (!url || url === '#') return url;
  if (url.startsWith('/')) return GAMES_BASE + url;
  return url;
}
