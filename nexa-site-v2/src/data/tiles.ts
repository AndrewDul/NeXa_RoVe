import type { FaceEvent } from "../scripts/contracts/faceStateMachine";

export interface LauncherTile {
  id: string;
  label: string;
  summary: string;
  iconKey: "system" | "prototype" | "hardware" | "story" | "code" | "demo" | "roadmap" | "boundary";
  targetId: string;
  category: string;
  href: string;
  reaction: FaceEvent;
}

export const launcherTiles: LauncherTile[] = [
  {
    id: "system-preview",
    label: "System Preview",
    summary: "The public feeling of NeXa as a composed, responsive interface.",
    iconKey: "system",
    targetId: "system-preview",
    category: "Interface",
    href: "#system-preview",
    reaction: "focus"
  },
  {
    id: "nexa-rove",
    label: "NeXa RoVe",
    summary: "The first physical prototype and public development vehicle.",
    iconKey: "prototype",
    targetId: "nexa-rove",
    category: "Physical prototype",
    href: "#nexa-rove",
    reaction: "smile"
  },
  {
    id: "hardware",
    label: "Hardware",
    summary: "Selected public parts, build decisions and physical constraints.",
    iconKey: "hardware",
    targetId: "hardware",
    category: "Engineering",
    href: "#hardware",
    reaction: "look-left"
  },
  {
    id: "build-story",
    label: "Build Story",
    summary: "A concise record of visible progress without private internals.",
    iconKey: "story",
    targetId: "build-story",
    category: "Progress",
    href: "#build-story",
    reaction: "look-right"
  },
  {
    id: "code-lab",
    label: "Code Lab",
    summary: "Small public examples that show engineering style and care.",
    iconKey: "code",
    targetId: "code-lab",
    category: "Software",
    href: "#code-lab",
    reaction: "focus"
  },
  {
    id: "demo",
    label: "Demo",
    summary: "Public demonstrations and safe entry points for the project.",
    iconKey: "demo",
    targetId: "demo",
    category: "Preview",
    href: "#demo",
    reaction: "surprise"
  },
  {
    id: "roadmap",
    label: "Roadmap",
    summary: "Near-term public direction for the site and prototype.",
    iconKey: "roadmap",
    targetId: "roadmap",
    category: "Direction",
    href: "#roadmap",
    reaction: "squint"
  },
  {
    id: "public-boundaries",
    label: "Public Boundaries",
    summary: "What is shared publicly and what remains intentionally private.",
    iconKey: "boundary",
    targetId: "public-boundaries",
    category: "Scope",
    href: "#public-boundaries",
    reaction: "sleepy"
  }
];
