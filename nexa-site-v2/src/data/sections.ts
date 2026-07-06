import { launcherTiles } from "./tiles";

export interface SiteSection {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
}

const sectionCopy: Record<string, Omit<SiteSection, "id">> = {
  "system-preview": {
    eyebrow: "NeXa",
    title: "System Preview",
    intro: "A refined dark interface that frames NeXa as the main public system.",
    points: [
      "Premium glass UI direction with controlled depth.",
      "Animated NeXa face as the primary interaction point.",
      "Content model prepared for public engineering updates."
    ]
  },
  prototype: {
    eyebrow: "Physical build",
    title: "NeXa RoVe Prototype",
    intro: "NeXa RoVe is presented as the first physical prototype for the wider NeXa direction.",
    points: [
      "Public development vehicle for visible robotics progress.",
      "Hardware and software progress shown selectively.",
      "Prototype story remains separate from private long-term goals."
    ]
  },
  hardware: {
    eyebrow: "Engineering",
    title: "Hardware",
    intro: "Selected public hardware notes can show real constraints without exposing private implementation details.",
    points: [
      "Chassis, sensing and control notes can be summarized here.",
      "Images should be optimized before being copied into v2.",
      "Heavy existing media should stay referenced until the migration plan is ready."
    ]
  },
  "build-story": {
    eyebrow: "Progress",
    title: "Build Story",
    intro: "The site can show measured progress through public milestones.",
    points: [
      "Short dated updates can replace long internal logs.",
      "Public failures and fixes can show engineering judgment.",
      "Private prompts, logs and deep runtime internals stay out."
    ]
  },
  "code-lab": {
    eyebrow: "Software",
    title: "Code Lab",
    intro: "Selected examples can make the engineering visible while preserving boundaries.",
    points: [
      "Small snippets and commands should be curated.",
      "Examples should point to safe public demos.",
      "Copy controls can be added as focused React islands later."
    ]
  },
  demo: {
    eyebrow: "Experience",
    title: "Demo",
    intro: "The demo area should give visitors a clear view of what is publicly available now.",
    points: [
      "Use short clips or lightweight previews after media optimization.",
      "Keep demo controls functional without requiring private services.",
      "Fallback links should remain available if JavaScript fails."
    ]
  },
  roadmap: {
    eyebrow: "Direction",
    title: "Roadmap",
    intro: "The public roadmap should stay practical and near-term.",
    points: [
      "Polish the visual system and launcher behavior.",
      "Port content into typed Astro data modules.",
      "Define the eventual deployment switch only after v2 passes local checks."
    ]
  },
  "public-boundaries": {
    eyebrow: "Scope",
    title: "Public Boundaries",
    intro: "The site should be clear about what is public and what is intentionally withheld.",
    points: [
      "Show selected build progress and public demos.",
      "Do not expose private implementation details.",
      "Do not reveal the full private long-term goal."
    ]
  }
};

export const sections: SiteSection[] = launcherTiles.map((tile) => ({
  id: tile.id,
  ...sectionCopy[tile.id]
}));
