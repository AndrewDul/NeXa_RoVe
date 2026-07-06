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
    id: "nexa-rove",
    label: "NeXa RoVe",
    summary: "The developed public prototype flow.",
    iconKey: "prototype",
    targetId: "nexa-rove",
    category: "Primary",
    href: "#nexa-rove",
    reaction: "smile"
  },
  {
    id: "system-preview",
    label: "System Preview",
    summary: "A calm view of the future NeXa interface.",
    iconKey: "system",
    targetId: "system-preview",
    category: "Interface",
    href: "#system-preview",
    reaction: "focus"
  },
  {
    id: "capabilities",
    label: "Capabilities",
    summary: "Public-safe areas the system can grow into.",
    iconKey: "system",
    targetId: "capabilities",
    category: "Model",
    href: "#capabilities",
    reaction: "look-left"
  },
  {
    id: "interaction",
    label: "Interaction",
    summary: "How touch, voice and visual feedback can meet.",
    iconKey: "demo",
    targetId: "interaction",
    category: "Input",
    href: "#interaction",
    reaction: "look-right"
  },
  {
    id: "memory",
    label: "Memory",
    summary: "A placeholder for careful personal context design.",
    iconKey: "story",
    targetId: "memory",
    category: "Context",
    href: "#memory",
    reaction: "focus"
  },
  {
    id: "automation",
    label: "Automation",
    summary: "Safe task support without private control details.",
    iconKey: "code",
    targetId: "automation",
    category: "Actions",
    href: "#automation",
    reaction: "surprise"
  },
  {
    id: "vision",
    label: "Vision",
    summary: "A public preview of visual awareness ideas.",
    iconKey: "hardware",
    targetId: "vision",
    category: "Sensing",
    href: "#vision",
    reaction: "look-left"
  },
  {
    id: "roadmap",
    label: "Roadmap",
    summary: "Near-term public direction for v2.",
    iconKey: "roadmap",
    targetId: "roadmap",
    category: "Direction",
    href: "#roadmap",
    reaction: "squint"
  },
  {
    id: "build-direction",
    label: "Build Direction",
    summary: "How public work can stay focused and useful.",
    iconKey: "story",
    targetId: "build-direction",
    category: "Process",
    href: "#build-direction",
    reaction: "look-right"
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
