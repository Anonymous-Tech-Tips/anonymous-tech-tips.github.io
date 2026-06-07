const GAMES_BASE = import.meta.env.VITE_GAMES_BASE as string | undefined;

export function resolveAssetUrl(url: string): string {
  if (!url || url === '#') return url;
  if (GAMES_BASE && url.startsWith('/')) {
    return GAMES_BASE + url;
  }
  return url;
}
