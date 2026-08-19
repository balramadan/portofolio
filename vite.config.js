import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import Sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    }),
    vueDevTools(),
    Sitemap({
      hostname: "https://codebyiqbal.dev",
      dynamicRoutes: ["/projects", "/certifications", "/comingsoon"],
      exclude: ["/_addproject", "/_addcertification"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("vue") ||
              id.includes("pinia") ||
              id.includes("@vueuse")
            ) {
              return "vue-vendor";
            }
            if (id.includes("gsap")) {
              return "gsap";
            }
            if (id.includes("@supabase")) {
              return "supabase";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    reportCompressedSize: false,
  },
});
