/// <reference lib="webworker" />
import { precacheAndRoute, createHandlerBoundToURL, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { clientsClaim } from 'workbox-core';

declare const self: ServiceWorkerGlobalScope;

// Cache version - increment this with each deployment
const CACHE_VERSION = 'v8';

// Skip waiting on install
self.skipWaiting();
clientsClaim();

// Clean up old caches automatically
cleanupOutdatedCaches();

// Skip waiting message handler
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// self.__WB_MANIFEST is injected by vite-plugin-pwa
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);

const basePath = self.location.pathname.split('/').slice(0, -1).join('/') || '/';
const navigationHandler = createHandlerBoundToURL(`${basePath}/index.html`);
const navigationRoute = new NavigationRoute(navigationHandler, {
  allowlist: [new RegExp(`^${basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/.*$`)],
  denylist: [/\/api\/.*$/],
});
registerRoute(navigationRoute);

// Use NetworkFirst for assets to always get fresh content
registerRoute(
  /\.(?:css|js|png|jpg|jpeg|svg|gif|webp|woff2?)$/,
  new NetworkFirst({
    cacheName: `static-assets-${CACHE_VERSION}`,
    plugins: [
      new ExpirationPlugin({ 
        maxEntries: 200, 
        maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days instead of 30
      })
    ],
  })
);
