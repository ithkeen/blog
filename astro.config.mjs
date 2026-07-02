import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ithkeen.github.io",
  base: "/blog",
  trailingSlash: "always",
  integrations: [mdx(), react(), sitemap()],
});
