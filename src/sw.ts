/// <reference lib="webworker" />
import { precacheAndRoute, createHandlerBoundToURL, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { clientsClaim } from 'workbox-core';

declare const self: ServiceWorkerGlobalScope;

// Cache version - increment this with each deployment
const CACHE_VERSION = 'v9';

// Skip waiting on install - take over immediately
self.skipWaiting();
clientsClaim();

// Clean up old caches automatically
cleanupOutdatedCaches();

// Delete all old caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => !cacheName.includes(CACHE_VERSION))
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      // Force all clients to reload with new service worker
      return self.clients.claim();
    })
  );
});

// Skip waiting message handler - force immediate activation
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLIENTS_CLAIM') {
    self.clients.claim();
  }
});

// self.__WB_MANIFEST is injected by vite-plugin-pwa
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);

const basePath = '';
const navigationHandler = createHandlerBoundToURL(`${basePath}/index.html`);
const navigationRoute = new NavigationRoute(navigationHandler, {
  allowlist: [new RegExp(`^${basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/.*$`)],
  denylist: [/\/api\/.*$/, /\.(?:css|js|json|png|jpg|jpeg|svg|gif|webp|woff2?|html|swf|wasm)$/, /\/strongdog\/.*$/, /\/topvaz66\/.*$/, /\/sitemap\.xml$/],
});
registerRoute(navigationRoute);

// Use NetworkFirst for HTML to always get fresh content
registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: `html-${CACHE_VERSION}`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 // 1 hour
      })
    ],
  })
);

// Use NetworkFirst for assets to always get fresh content
registerRoute(
  /\.(?:css|js|png|jpg|jpeg|svg|gif|webp|woff2?)$/,
  new NetworkFirst({
    cacheName: `static-assets-${CACHE_VERSION}`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
      })
    ],
  })
);
