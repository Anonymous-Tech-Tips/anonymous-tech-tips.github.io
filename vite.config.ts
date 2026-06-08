import { defineConfig, ViteDevServer, Connect } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import fs from "node:fs";
import http from "node:http";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectManifest: {
        globIgnores: [
          '**/*.map',
          'sitemap.xml',
          '**/node_modules/**/*',
          'sw.js',
          'games/**/*',
        ],
        maximumFileSizeToCacheInBytes: 5000000,
      },
      workbox: {
        navigateFallback: './index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
      },
      manifest: {
        name: "Anonymous Tech Tips",
        short_name: "Anonymous Tech Tips",
        start_url: "./#/",
        display: "standalone",
        background_color: "#0b0b0b",
        theme_color: "#FFD84D",
        icons: [
          { src: "./pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "./pwa-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ].filter(Boolean),
  publicDir: mode === 'development' ? 'public' : false,
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_getters: true,
      },
      format: {
        comments: false,
      },
    },
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'motion-vendor': ['framer-motion'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-toast',
          ],
        },
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        '.',
        path.resolve(__dirname, 'strongdog'),
        path.resolve(__dirname, 'topvaz66'),
      ],
    },
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: Connect.IncomingMessage, res: http.ServerResponse, next: Connect.NextFunction) => {
        if (req.url && (req.url.startsWith('/strongdog/') || req.url.startsWith('/topvaz66/'))) {
          const filePath = path.join(__dirname, req.url.split('?')[0]);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', getMimeType(filePath));
            res.end(fs.readFileSync(filePath));
            return;
          }
        }
        next();
      });
    },
  },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const types: Record<string, string> = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wasm': 'application/wasm',
  };
  return types[ext] || 'application/octet-stream';
}
