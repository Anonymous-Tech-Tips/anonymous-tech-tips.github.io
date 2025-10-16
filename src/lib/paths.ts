export const BASE = import.meta.env.BASE_URL?.replace(/\/+$/, '') || '';

export const withBase = (p: string) =>
  `${BASE}${p.startsWith('/') ? p : `/${p}`}`;

// Hash routes (we use HashRouter)
export const hash = (p: string) => `${withBase('/#')}${p.startsWith('/') ? p : `/${p}`}`;

// Assets in docs/public
export const asset = (p: string) => withBase(p);

// Canonical for SEO (HashRouter URLs)
export const canonical = (hashPath = '/') =>
  `https://subset28.github.io${withBase('')}${
    hashPath.startsWith('/#') ? hashPath : `/#${hashPath.replace(/^\//, '')}` 
  }`;
