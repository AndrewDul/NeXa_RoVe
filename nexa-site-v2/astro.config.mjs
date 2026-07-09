import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const base = process.env.NEXA_V2_BASE ?? "/";

export default defineConfig({
  site: "https://andrewdul.github.io",
  base,
  devToolbar: {
    enabled: process.env.ASTRO_DEV_TOOLBAR !== "false"
  },
  integrations: [react()],
  output: "static"
});
