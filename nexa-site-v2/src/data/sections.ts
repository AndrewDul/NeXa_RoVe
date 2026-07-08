import { launcherTiles } from "./tiles";
import { publicPath } from "../utils/publicPath";

export interface SiteSection {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
  rove?: {
    nav: {
      label: string;
      href: string;
    }[];
    overview: {
      eyebrow: string;
      title: string;
      body: string;
      highlights: string[];
    };
    demonstrates: {
      title: string;
      items: {
        label: string;
        text: string;
      }[];
    };
    media: {
      title: string;
      intro: string;
    };
    videoIntent: {
      title: string;
      text: string;
      linkLabel: string;
    };
    hardware: {
      title: string;
      items: {
        label: string;
        text: string;
      }[];
    };
    software: {
      title: string;
      text: string;
    };
    timeline: {
      title: string;
      items: {
        label: string;
        text: string;
      }[];
    };
    roadmap: {
      title: string;
      groups: {
        label: string;
        items: string[];
      }[];
    };
    boundaries: {
      title: string;
      text: string;
      items: string[];
    };
  };
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
    lines?: string[];
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
    intro: "NeXa RoVe is the first physical prototype shown publicly for the wider NeXa system direction.",
    points: [
      "A public showcase for selected robotics prototype progress.",
      "A practical bridge between interface design, sensing, and movement concepts.",
      "A bounded view of the work, separate from private implementation details."
    ],
    rove: {
      nav: [
        { label: "Overview", href: "#rove-overview" },
        { label: "Media", href: "#rove-media" },
        { label: "Hardware", href: "#rove-hardware" },
        { label: "Software", href: "#rove-software" },
        { label: "Build History", href: "#rove-build-history" },
        { label: "Roadmap", href: "#rove-roadmap" },
        { label: "Boundaries", href: "#rove-boundaries" }
      ],
      overview: {
        eyebrow: "Prototype status",
        title: "A physical development vehicle for NeXa",
        body: "NeXa RoVe is shown here as a prototype, not a finished product. It gives the public site a concrete build to anchor the wider NeXa direction while keeping deeper system work appropriately private.",
        highlights: [
          "First physical prototype for the NeXa public story.",
          "Useful for testing how a face-led interface can sit on real hardware.",
          "Presented as selected public progress rather than a complete technical disclosure."
        ]
      },
      demonstrates: {
        title: "What the prototype demonstrates",
        items: [
          {
            label: "Physical interaction",
            text: "A direction for voice, visual feedback, screen UI, and movement to work together in a small embodied setup."
          },
          {
            label: "Local-first direction",
            text: "A public explanation of how assistant behavior can be framed around local control, clear routing, and cautious interfaces."
          },
          {
            label: "Hardware plus software",
            text: "A working theme for connecting compute, sensors, display, audio, and prototype control without publishing private wiring or runtime details."
          },
          {
            label: "Interface shell",
            text: "A visible NeXa face and launcher pattern that can support demos, diagnostics, and future preview panels."
          }
        ]
      },
      media: {
        title: "Selected build media",
        intro: "A focused gallery shows the current prototype views with optimized images, while video remains a deliberate user action."
      },
      videoIntent: {
        title: "Demo video",
        text: "The linked clip is intended to show a short public view of the current physical setup. It opens only by user choice, with no autoplay and no eager MP4 request.",
        linkLabel: "Open demo video"
      },
      hardware: {
        title: "Hardware areas",
        items: [
          { label: "Raspberry Pi / compute", text: "Prototype compute layer for local experiments and public demos." },
          { label: "Camera / vision", text: "Vision input category for awareness and visual feedback concepts." },
          { label: "Microphone / audio", text: "Audio input category for voice interaction experiments." },
          { label: "Display / UI", text: "On-device surface for the NeXa face, state, and interface shell." },
          { label: "Sensors", text: "Support category for environment and prototype state signals." },
          { label: "Mobile base", text: "Movement platform used to explore physical interaction direction." },
          { label: "Power considerations", text: "Public-level reminder that reliable power and safe runtime limits matter for the build." }
        ]
      },
      software: {
        title: "Software direction",
        text: "The public software story centers on command routing, a safe local interface, a visual shell, prototype control, and diagnostic reporting. The example below is intentionally small and readable."
      },
      timeline: {
        title: "Selected build history",
        items: [
          { label: "Early visual prototype", text: "Initial public direction used a visual NeXa face to establish a recognizable interaction point." },
          { label: "Public demo shell", text: "Safe example flows framed the project without exposing private runtime files." },
          { label: "Canonical face lock", text: "The public identity was narrowed to two white vertical eyes and one lower smile." },
          { label: "Ring launcher", text: "The home shell moved toward a circular system launcher around the face." },
          { label: "RoVe content flow", text: "NeXa RoVe became the dedicated scrollable flow for the physical prototype story." },
          { label: "Media performance", text: "Generated WebP assets and intent-based video loading improved the public v2 performance profile." }
        ]
      },
      roadmap: {
        title: "Development direction",
        groups: [
          {
            label: "Near term",
            items: ["Content polish", "Deployment migration planning", "Clearer public navigation", "Richer demo media"]
          },
          {
            label: "Future",
            items: [
              "System preview panels",
              "Local-first assistant demonstrations",
              "Robotics prototype documentation",
              "Safe interaction demos"
            ]
          }
        ]
      },
      boundaries: {
        title: "Public boundaries",
        text: "This page is a public showcase. It shows selected progress and prototype direction, not the full private development record.",
        items: [
          "Private implementation details are intentionally withheld.",
          "Technical claims stay limited to what the public repo and media support.",
          "Unfinished work is framed as prototype, concept, placeholder, or roadmap."
        ]
      }
    },
    photos: [
      {
        src: publicPath("/generated/rove/nexa-rove-main-720.webp"),
        alt: "Current NeXa RoVe setup",
        caption: "Current public build setup, shown as a complete portrait image.",
        width: 720,
        height: 960
      },
      {
        src: publicPath("/generated/rove/front-720.webp"),
        alt: "Front view of the NeXa RoVe prototype",
        caption: "Front display and physical layout, preserved without cropping.",
        width: 720,
        height: 960
      },
      {
        src: publicPath("/generated/rove/inside-720.webp"),
        alt: "Inside view of the NeXa RoVe hardware layout",
        caption: "Internal hardware arrangement shown at a public level.",
        width: 720,
        height: 960
      }
    ],
    codePreview: {
      title: "Public-safe routing sketch",
      command: "python3 examples/public_demo/demo_app.py",
      description: "A safe demo entry point that shows the public example flow without private runtime details.",
      lines: [
        "intent = read_public_command()",
        "route = command_router.match(intent)",
        "if route.requires_private_runtime:",
        "    return public_placeholder(route.label)",
        "return visual_shell.respond(route.safe_summary)"
      ]
    },
    docs: [
      { label: "Project overview", href: publicPath("/docs/project-overview.md") },
      { label: "System design", href: publicPath("/docs/system-design-overview.md") },
      { label: "Hardware overview", href: publicPath("/hardware/hardware-overview.md") },
      { label: "Public examples", href: publicPath("/docs/code-examples.md") }
    ],
    video: {
      src: publicPath("/media/videos/nexa-rove-26s-demo.mp4"),
      poster: publicPath("/generated/rove/video-poster-960.webp"),
      caption: "Short public demo clip for the current physical setup. Opens only by user intent.",
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
      { label: "Overview", href: "#rove-overview" },
      { label: "Media", href: "#rove-media" },
      { label: "Hardware", href: "#rove-hardware" },
      { label: "Software", href: "#rove-software" },
      { label: "Roadmap", href: "#rove-roadmap" }
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

export const sections: SiteSection[] = launcherTiles.flatMap((tile) => {
  const copy = sectionCopy[tile.targetId];
  return copy ? [{ id: tile.targetId, ...copy }] : [];
});
