import { defineConfig } from "astro/config";
import auth from "auth-astro";

export default defineConfig({
  integrations: [auth()],
});
