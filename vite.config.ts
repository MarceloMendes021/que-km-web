import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["Logo-Que-KM-é-esse.png", "icons/*.svg"],
      manifest: {
        name: "Que KM é esse?",
        short_name: "Que KM",
        description: "Clareza financeira diária para motoristas autônomos",
        theme_color: "#0b0f14",
        background_color: "#0b0f14",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "Logo-Que-KM-é-esse.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "Logo-Que-KM-é-esse.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
