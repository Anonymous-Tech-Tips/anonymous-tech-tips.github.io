import { defineConfig, ViteDevServer, Connect } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import fs from "node:fs";
import http from "node:http";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectManifest: {
        // Exclude the massive game files from precaching
        globIgnores: [
          '**/*.map',
          'sitemap.xml',
          '**/node_modules/**/*',
          'sw.js',
          'games/**/*'  // Exclude all game files from precaching
        ],
        maximumFileSizeToCacheInBytes: 5000000,
      },
      workbox: {
        navigateFallback: './index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/]
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
          { src: "./pwa-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ].filter(Boolean),
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Add hash to filenames for cache busting
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        // Manual chunks for better code splitting
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        }
      }
    }
  },
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        '.',
        path.resolve(__dirname, 'strongdog'),
        path.resolve(__dirname, 'topvaz66')
      ]
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
    }
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
