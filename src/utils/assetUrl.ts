export function resolveAssetUrl(url: string): string {
  if (!url || url === '#') return url;
  return url;
}
