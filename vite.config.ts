import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/Anonymous-Tech-Tips/",
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      workbox: {
        navigateFallback: '/Anonymous-Tech-Tips/index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/]
      },
      manifest: {
        name: "Tech Tips",
        short_name: "Tech Tips",
        start_url: "/Anonymous-Tech-Tips/#/",
        display: "standalone",
        background_color: "#0b0b0b",
        theme_color: "#FFD84D",
        icons: [
          { src: "/Anonymous-Tech-Tips/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/Anonymous-Tech-Tips/pwa-512.png", sizes: "512x512", type: "image/png" }
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
    rollupOptions: {
      output: {
        // Add hash to filenames for cache busting
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        manualChunks: undefined,
      }
    }
  },
  server: { host: "::", port: 8080 },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
