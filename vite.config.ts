import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/Armaan-Tech-Tips/",
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      workbox: {
        navigateFallback: '/Armaan-Tech-Tips/index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/]
      },
      manifest: {
        name: "Armaan's Tech Tips",
        short_name: "Tech Tips",
        start_url: "/Armaan-Tech-Tips/",
        display: "standalone",
        background_color: "#0b0b0b",
        theme_color: "#FFD84D",
        icons: [
          { src: "/Armaan-Tech-Tips/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/Armaan-Tech-Tips/pwa-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ].filter(Boolean),
  build: {
    outDir: "docs",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: true
  },
  server: { host: "::", port: 8080 },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
