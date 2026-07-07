import { launcherTiles } from "./tiles";

export interface SiteSection {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
  photos?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
  codePreview?: {
    title: string;
    command: string;
    description: string;
  };
  docs?: {
    label: string;
    href: string;
  }[];
  video?: {
    src: string;
    poster: string;
    caption: string;
    posterWidth: number;
    posterHeight: number;
  };
  history?: string[];
  roadmap?: string[];
  related?: {
    label: string;
    href: string;
  }[];
}

const sectionCopy: Record<string, Omit<SiteSection, "id">> = {
  "system-preview": {
    eyebrow: "NeXa",
    title: "System Preview",
    intro: "A compact preview of NeXa as a composed interface shell.",
    points: [
      "Dark glass UI direction with controlled depth.",
      "Animated NeXa face as the primary interaction point.",
      "Public-safe modules prepared for future work."
    ]
  },
  "nexa-rove": {
    eyebrow: "Physical build",
    title: "NeXa RoVe",
    intro: "NeXa RoVe is presented as the first physical prototype for the wider NeXa direction.",
    points: [
      "Public development vehicle for visible robotics progress.",
      "Hardware and software progress shown selectively.",
      "Prototype story remains separate from private long-term goals."
    ],
    photos: [
      {
        src: "/generated/rove/nexa-rove-main-720.webp",
        alt: "Current NeXa RoVe setup",
        caption: "Current public build setup.",
        width: 720,
        height: 960
      },
      {
        src: "/generated/rove/front-720.webp",
        alt: "Front view of the NeXa RoVe prototype",
        caption: "Front display and physical layout.",
        width: 720,
        height: 960
      },
      {
        src: "/generated/rove/inside-720.webp",
        alt: "Inside view of the NeXa RoVe hardware layout",
        caption: "Internal hardware arrangement shown at a public level.",
        width: 720,
        height: 960
      }
    ],
    codePreview: {
      title: "Public example",
      command: "python3 examples/public_demo/demo_app.py",
      description: "A safe demo entry point that shows the public example flow without private runtime details."
    },
    docs: [
      { label: "Project overview", href: "/docs/project-overview.md" },
      { label: "System design", href: "/docs/system-design-overview.md" },
      { label: "Hardware overview", href: "/hardware/hardware-overview.md" },
      { label: "Public examples", href: "/docs/code-examples.md" }
    ],
    video: {
      src: "/media/videos/nexa-rove-26s-demo.mp4",
      poster: "/generated/rove/video-poster-960.webp",
      caption: "Short public demo clip for the current physical setup.",
      posterWidth: 960,
      posterHeight: 1280
    },
    history: [
      "Start with a local assistant direction and a visual feedback surface.",
      "Move into Raspberry Pi hardware, display, power and mounting work.",
      "Create public examples that explain ideas without private runtime files."
    ],
    roadmap: [
      "Refine the public v2 visual system and launcher.",
      "Add optimized media handling before deployment.",
      "Connect public demo, hardware and Code Lab sections with clearer navigation."
    ],
    related: [
      { label: "Vision", href: "#vision" },
      { label: "Interaction", href: "#interaction" },
      { label: "Automation", href: "#automation" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Public Boundaries", href: "#public-boundaries" }
    ]
  },
  capabilities: {
    eyebrow: "System",
    title: "Capabilities",
    intro: "This area frames the kinds of support NeXa can grow toward without exposing private plans.",
    points: [
      "Present clear status and next actions.",
      "Keep user control visible at every step.",
      "Separate public concepts from private implementation."
    ]
  },
  interaction: {
    eyebrow: "Input",
    title: "Interaction",
    intro: "Interaction is shown as a clean loop between intent, response and visible feedback.",
    points: [
      "Touch and launcher controls are direct.",
      "Voice ideas can be described without private runtime details.",
      "The face gives simple state feedback."
    ]
  },
  memory: {
    eyebrow: "Context",
    title: "Memory",
    intro: "Memory remains a placeholder for careful context design and user choice.",
    points: [
      "Public copy stays high level.",
      "No private logs or personal data are shown.",
      "Future settings should make scope understandable."
    ]
  },
  automation: {
    eyebrow: "Actions",
    title: "Automation",
    intro: "Automation is presented as a cautious support layer, not as uncontrolled action.",
    points: [
      "Tasks need clear permission and state.",
      "Physical behavior stays conservative.",
      "Public demos use safe examples only."
    ]
  },
  vision: {
    eyebrow: "Sensing",
    title: "Vision",
    intro: "Vision is described as public-facing feedback and awareness, separate from private internals.",
    points: [
      "Camera and sensing ideas stay bounded.",
      "Confidence and safety checks are part of the public story.",
      "Images are used only where they clarify the build."
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
  "build-direction": {
    eyebrow: "Process",
    title: "Build Direction",
    intro: "The public build direction stays focused on useful, readable progress.",
    points: [
      "Keep the home shell simple and system-led.",
      "Grow NeXa RoVe as the main content flow.",
      "Use local tests before any public switch."
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
  id: tile.targetId,
  ...sectionCopy[tile.targetId]
}));
