// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";
import obfuscator from "vite-plugin-javascript-obfuscator";

// https://astro.build/config
export default defineConfig({
  // Server-side rendering for dynamic pages
  output: "server",

  // Disable automatic prefetching to control navigation manually
  prefetch: false,

  vite: {
    plugins: [
      tailwindcss(),
      obfuscator({
        options: {
          compact: true,
          controlFlowFlattening: true,
          deadCodeInjection: true,
          stringArray: true,
          stringArrayEncoding: ["base64"],
          splitStrings: true,
          debugProtection: false,
        },
      }),
    ],
  },

  site: "https://www.animeratv.com/",
  adapter: vercel(),
  integrations: [sitemap()],
});
