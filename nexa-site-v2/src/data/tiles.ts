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
  active: boolean;
}

export const launcherTiles: LauncherTile[] = [
  {
    id: "nexa-rove",
    label: "NeXa RoVe",
    summary: "The developed public prototype flow.",
    iconKey: "prototype",
    targetId: "nexa-rove",
    category: "Primary",
    href: "#nexa-rove",
    reaction: "smile",
    active: true
  },
  {
    id: "system-preview",
    label: "System",
    summary: "Coming soon",
    iconKey: "system",
    targetId: "system-preview",
    category: "Coming soon",
    href: "",
    reaction: "focus",
    active: false
  },
  {
    id: "learn",
    label: "Learn",
    summary: "Coming soon",
    iconKey: "story",
    targetId: "learn",
    category: "Coming soon",
    href: "",
    reaction: "look-left",
    active: false
  },
  {
    id: "vision",
    label: "Vision",
    summary: "Coming soon",
    iconKey: "hardware",
    targetId: "vision",
    category: "Coming soon",
    href: "",
    reaction: "look-right",
    active: false
  },
  {
    id: "memory",
    label: "Memory",
    summary: "Coming soon",
    iconKey: "story",
    targetId: "memory",
    category: "Coming soon",
    href: "",
    reaction: "focus",
    active: false
  },
  {
    id: "automation",
    label: "Automation",
    summary: "Coming soon",
    iconKey: "code",
    targetId: "automation",
    category: "Coming soon",
    href: "",
    reaction: "surprise",
    active: false
  },
  {
    id: "voice",
    label: "Voice",
    summary: "Coming soon",
    iconKey: "demo",
    targetId: "voice",
    category: "Coming soon",
    href: "",
    reaction: "look-left",
    active: false
  },
  {
    id: "companion",
    label: "Companion",
    summary: "Coming soon",
    iconKey: "system",
    targetId: "companion",
    category: "Coming soon",
    href: "",
    reaction: "squint",
    active: false
  },
  {
    id: "workspace",
    label: "Workspace",
    summary: "Coming soon",
    iconKey: "roadmap",
    targetId: "workspace",
    category: "Coming soon",
    href: "",
    reaction: "look-right",
    active: false
  },
  {
    id: "more",
    label: "More",
    summary: "Coming soon",
    iconKey: "boundary",
    targetId: "more",
    category: "Coming soon",
    href: "",
    reaction: "sleepy",
    active: false
  }
];
