import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import auth from "auth-astro";

export default defineConfig({
  integrations: [auth({ autoRoutes: false })],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
