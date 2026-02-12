import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
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
        globIgnores: ['**/*.map', 'sitemap.xml', '**/node_modules/**/*', 'sw.js'],
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
  server: { host: "::", port: 8080 },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
