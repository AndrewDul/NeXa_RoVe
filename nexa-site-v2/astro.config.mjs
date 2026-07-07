import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const base = process.env.NEXA_V2_BASE ?? "/";

export default defineConfig({
  site: "https://andrewdul.github.io",
  base,
  integrations: [react()],
  output: "static"
});
