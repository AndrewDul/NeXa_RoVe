import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "../..");
const outDir = resolve(repoRoot, "nexa-site-v2/public/generated/rove");

const assets = [
  {
    source: "media/images/Presentation/nexa-rove-main-photo.jpg",
    output: "nexa-rove-main-720.webp",
    size: "720:-2"
  },
  {
    source: "media/images/Presentation/front.jpeg",
    output: "front-720.webp",
    size: "720:-2"
  },
  {
    source: "media/images/Presentation/inside.jpeg",
    output: "inside-720.webp",
    size: "720:-2"
  },
  {
    source: "media/images/Presentation/front.jpeg",
    output: "video-poster-960.webp",
    size: "960:-2"
  }
];

mkdirSync(outDir, { recursive: true });

for (const asset of assets) {
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      resolve(repoRoot, asset.source),
      "-vf",
      `scale=${asset.size}`,
      "-quality",
      "72",
      resolve(outDir, asset.output)
    ],
    { stdio: "inherit" }
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
