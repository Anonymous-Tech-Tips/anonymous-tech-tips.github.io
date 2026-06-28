const prefetched = new Set<string>();

export function prefetchGame(url: string): void {
  if (!url || url === '#' || prefetched.has(url)) return;
  prefetched.add(url);
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = 'document';
  document.head.appendChild(link);
}
