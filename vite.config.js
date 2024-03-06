/* eslint-env node */

import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import { liveReload } from "vite-plugin-live-reload";
import postcssPresetEnv from "postcss-preset-env";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer, postcssPresetEnv({ stage: 1 })]
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  plugins: [
    ReactivityTransform(),
    vue(),
    VitePWA({
      includeAssets: ["assets/*", "icons/*"],
      manifest: {
        name: "S*M*A*S*H Scouting",
        short_name: "Scouting",
        description: "A scouting app by FRC Team 2152",
        theme_color: "#FF6400",
        background_color: "#FF6400",
        icons: [
          {
            src: "icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
    liveReload([
      "public/"
    ])
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
});
