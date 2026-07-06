import { useEffect, useMemo, useRef, useState } from "react";
import type { LauncherTile } from "../data/tiles";
import { blinkEyes, lookPupils, runFaceIntro, runFacePress } from "../scripts/motion/faceMotion";
import { revealLauncher } from "../scripts/motion/launcherMotion";
import { revealScrollSections } from "../scripts/motion/scrollMotion";
import {
  initialFaceModel,
  transitionFace,
  type FaceEvent,
  type FaceModel,
  type FaceState
} from "../scripts/contracts/faceStateMachine";
import SystemLauncher from "./SystemLauncher";

interface NexaFaceProps {
  tiles: LauncherTile[];
}

function getReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function NexaFace({ tiles }: NexaFaceProps) {
  const [face, setFace] = useState<FaceModel>(initialFaceModel);
  const rootRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLDivElement>(null);
  const stateResetRef = useRef<number | undefined>(undefined);

  const faceClass = useMemo(() => `face-svg face-${face.state} ${face.launcherOpen ? "face-launcher-open" : ""}`, [face.state, face.launcherOpen]);

  useEffect(() => {
    const reducedMotion = getReducedMotion();
    setFace((current) => ({ ...current, reducedMotion }));
    const cleanupIntro = rootRef.current ? runFaceIntro(rootRef.current, reducedMotion) : () => {};
    const cleanupScroll = revealScrollSections(reducedMotion);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      setFace((current) =>
        transitionFace(current, media.matches ? "reduced-motion-on" : "reduced-motion-off", {
          reducedMotion: media.matches
        })
      );
    };
    media.addEventListener("change", onMotionChange);
    return () => {
      cleanupIntro();
      cleanupScroll();
      media.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!face.launcherOpen || !launcherRef.current) return;
    return revealLauncher(launcherRef.current, face.reducedMotion);
  }, [face.launcherOpen, face.reducedMotion]);

  useEffect(() => {
    if (face.reducedMotion) return;
    const eyes = Array.from(rootRef.current?.querySelectorAll("[data-eye]") ?? []);
    const pupils = Array.from(rootRef.current?.querySelectorAll("[data-pupil]") ?? []);
    const blinkId = window.setInterval(() => blinkEyes(eyes, false), 9800);
    const lookId = window.setInterval(() => {
      const direction = Math.random() > 0.5 ? "left" : "right";
      lookPupils(pupils, direction, false);
      window.setTimeout(() => lookPupils(pupils, "center", false), 1200);
    }, 24000);
    return () => {
      window.clearInterval(blinkId);
      window.clearInterval(lookId);
    };
  }, [face.reducedMotion]);

  useEffect(() => {
    const pupils = Array.from(rootRef.current?.querySelectorAll("[data-pupil]") ?? []);
    if (face.state === "look-left") lookPupils(pupils, "left", face.reducedMotion);
    if (face.state === "look-right") lookPupils(pupils, "right", face.reducedMotion);
    if (face.state === "neutral" || face.state === "smile") lookPupils(pupils, "center", face.reducedMotion);
  }, [face.state, face.reducedMotion]);

  function send(event: FaceEvent, holdState = true) {
    setFace((current) => transitionFace(current, event, { reducedMotion: current.reducedMotion }));
    if (!holdState) return;
    window.clearTimeout(stateResetRef.current);
    stateResetRef.current = window.setTimeout(() => {
      setFace((current) => transitionFace(current, current.launcherOpen ? "launcher-open" : "press-release"));
    }, 900);
  }

  function openLauncher() {
    const shouldOpen = !face.launcherOpen;
    if (rootRef.current) runFacePress(rootRef.current, face.reducedMotion);
    setFace((current) => transitionFace(current, shouldOpen ? "face-click" : "launcher-close"));
    window.setTimeout(() => {
      setFace((current) => transitionFace(current, shouldOpen ? "launcher-open" : "launcher-close"));
    }, face.reducedMotion ? 0 : 160);
  }

  function onTileHover(event: FaceEvent) {
    send(event);
  }

  return (
    <div className="nexa-system" ref={rootRef}>
      <button
        className="face-control"
        type="button"
        aria-expanded={face.launcherOpen}
        aria-controls="nexa-launcher"
        aria-label={face.launcherOpen ? "Close NeXa system launcher" : "Open NeXa system launcher"}
        data-testid="nexa-face-control"
        onClick={openLauncher}
      >
        <svg className={faceClass} viewBox="0 0 360 360" role="img" aria-labelledby="nexa-face-title">
          <title id="nexa-face-title">Animated NeXa face</title>
          <defs>
            <linearGradient id="face-shell" x1="70" x2="290" y1="48" y2="318" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f8fbff" />
              <stop offset="0.48" stopColor="#74f0e3" />
              <stop offset="1" stopColor="#9ff6ba" />
            </linearGradient>
            <radialGradient id="face-core" cx="50%" cy="44%" r="60%">
              <stop stopColor="#263645" />
              <stop offset="0.56" stopColor="#111925" />
              <stop offset="1" stopColor="#070b12" />
            </radialGradient>
            <linearGradient id="face-glass" x1="108" x2="252" y1="84" y2="260" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.36)" />
              <stop offset="0.52" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="1" stopColor="rgba(116,240,227,0.1)" />
            </linearGradient>
          </defs>
          <circle className="face-halo" cx="180" cy="180" r="172" />
          <circle className="face-aura" cx="180" cy="180" r="158" />
          <circle className="face-shell" cx="180" cy="180" r="130" />
          <circle className="face-core" cx="180" cy="180" r="106" />
          <path className="face-glass" d="M93 160 C104 94, 151 70, 204 82 C170 100, 137 123, 93 160Z" />
          <path className="face-rim" d="M80 180 C80 118, 118 74, 180 74 C242 74, 280 118, 280 180 C280 242, 242 286, 180 286 C118 286, 80 242, 80 180Z" />
          <g className="face-inner">
            <ellipse className="eye-socket eye-socket-left" cx="136" cy="158" rx="34" ry="43" />
            <ellipse className="eye-socket eye-socket-right" cx="224" cy="158" rx="34" ry="43" />
            <ellipse data-eye className="eye eye-left" cx="136" cy="158" rx="18" ry="29" />
            <ellipse data-eye className="eye eye-right" cx="224" cy="158" rx="18" ry="29" />
            <circle data-pupil className="pupil pupil-left" cx="136" cy="162" r="6.6" />
            <circle data-pupil className="pupil pupil-right" cx="224" cy="162" r="6.6" />
            <circle className="pupil-spark pupil-spark-left" cx="132" cy="156" r="2.2" />
            <circle className="pupil-spark pupil-spark-right" cx="220" cy="156" r="2.2" />
            <path className="brow brow-left" d="M103 122 C122 111, 150 111, 169 124" />
            <path className="brow brow-right" d="M191 124 C210 111, 238 111, 257 122" />
            <path className="mouth" d={mouthPath(face.state)} />
          </g>
        </svg>
      </button>
      <div id="nexa-launcher" ref={launcherRef}>
        <SystemLauncher open={face.launcherOpen} tiles={tiles} onTileHover={onTileHover} onTileSelect={() => send("smile")} />
      </div>
      <style>{faceStyles}</style>
    </div>
  );
}

function mouthPath(state: FaceState) {
  if (state === "surprised") return "M166 222 C166 202, 194 202, 194 222 C194 243, 166 243, 166 222";
  if (state === "laugh") return "M132 214 C156 260, 204 260, 228 214";
  if (state === "focused" || state === "squint") return "M142 226 C166 216, 194 216, 218 226";
  if (state === "sleepy") return "M148 226 C170 238, 190 238, 212 226";
  return "M128 214 C154 248, 206 248, 232 214";
}

const faceStyles = `
  .nexa-system {
    position: relative;
    display: grid;
    width: min(100%, 1120px);
    min-height: clamp(450px, 66svh, 690px);
    place-items: center;
    isolation: isolate;
  }

  .nexa-system::before {
    position: absolute;
    z-index: 0;
    width: min(82vw, 760px);
    aspect-ratio: 1;
    border-radius: 999px;
    pointer-events: none;
    content: "";
    background:
      radial-gradient(circle, rgba(116, 240, 227, 0.17), transparent 38%),
      conic-gradient(from 180deg, transparent, rgba(137, 169, 255, 0.16), transparent, rgba(255, 159, 194, 0.12), transparent);
    filter: blur(18px);
    opacity: 0.74;
  }

  .face-control {
    position: relative;
    z-index: 4;
    display: grid;
    width: clamp(238px, 35vw, 430px);
    aspect-ratio: 1;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
    touch-action: manipulation;
  }

  .face-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    filter:
      drop-shadow(0 44px 94px rgba(0, 0, 0, 0.62))
      drop-shadow(0 0 36px rgba(116, 240, 227, 0.1));
  }

  .face-halo {
    fill: none;
    stroke: rgba(116, 240, 227, 0.1);
    stroke-dasharray: 2 15;
    stroke-linecap: round;
    stroke-width: 2;
  }

  .face-aura {
    fill: rgba(116, 240, 227, 0.075);
    stroke: rgba(216, 231, 247, 0.18);
    stroke-width: 1;
    transition: opacity 220ms ease;
  }

  .face-shell {
    fill: url(#face-shell);
    opacity: 0.94;
  }

  .face-core {
    fill: url(#face-core);
    stroke: rgba(255, 255, 255, 0.2);
    stroke-width: 2;
  }

  .face-glass {
    fill: url(#face-glass);
    opacity: 0.68;
    mix-blend-mode: screen;
  }

  .face-rim {
    fill: none;
    stroke: rgba(255, 255, 255, 0.18);
    stroke-width: 1.5;
  }

  .face-inner {
    transition: transform 180ms ease;
  }

  .eye-socket {
    fill: rgba(0, 0, 0, 0.16);
    stroke: rgba(116, 240, 227, 0.08);
    stroke-width: 1;
  }

  .eye {
    fill: #f5fdff;
    filter: drop-shadow(0 0 12px rgba(116, 240, 227, 0.26));
    transition: rx 180ms ease, ry 180ms ease, transform 180ms ease, opacity 180ms ease;
  }

  .pupil {
    fill: #061016;
  }

  .pupil-spark {
    fill: rgba(255, 255, 255, 0.86);
    pointer-events: none;
  }

  .brow {
    fill: none;
    stroke: rgba(238, 250, 255, 0.72);
    stroke-linecap: round;
    stroke-width: 8;
    transition: transform 180ms ease;
  }

  .mouth {
    fill: none;
    stroke: #eefaff;
    stroke-linecap: round;
    stroke-width: 12;
    filter: drop-shadow(0 0 10px rgba(116, 240, 227, 0.2));
    transition: d 180ms ease, transform 180ms ease, stroke-width 180ms ease;
  }

  .face-pressed .face-inner {
    transform: translateY(8px) scaleY(0.93);
    transform-origin: 180px 180px;
  }

  .face-launcher-open .face-aura {
    opacity: 0.92;
  }

  .face-smile .mouth,
  .face-launcher-open .mouth {
    stroke-width: 13;
  }

  .face-squint .eye {
    ry: 11;
  }

  .face-sleepy .eye {
    ry: 8;
  }

  .face-focused .brow-left,
  .face-squint .brow-left {
    transform: translate(8px, 10px) rotate(8deg);
    transform-origin: 136px 128px;
  }

  .face-focused .brow-right,
  .face-squint .brow-right {
    transform: translate(-8px, 10px) rotate(-8deg);
    transform-origin: 224px 128px;
  }

  .system-launcher {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: grid;
    place-items: center;
    pointer-events: none;
    opacity: 0;
  }

  .system-launcher[data-open="true"] {
    pointer-events: none;
    opacity: 1;
  }

  .launcher-grid {
    display: grid;
    width: min(100%, 1080px);
    min-height: min(100%, 640px);
    grid-template-columns: repeat(6, minmax(108px, 1fr));
    grid-template-areas:
      ". a a . b b"
      "c c . . d d"
      "e e . . f f"
      ". g g . h h";
    align-items: center;
    gap: clamp(10px, 1.4vw, 16px);
    padding: 10px;
  }

  .launcher-tile {
    position: relative;
    z-index: 1;
    display: grid;
    min-height: 112px;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "icon copy"
      "meta meta";
    align-content: center;
    gap: 11px 12px;
    overflow: hidden;
    padding: 15px;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-sm);
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.035)),
      rgba(8, 13, 21, 0.82);
    box-shadow: var(--shadow-glass);
    color: var(--color-text);
    text-decoration: none;
    backdrop-filter: blur(20px);
    cursor: pointer;
    pointer-events: auto;
    transform: translateZ(0);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease,
      background 180ms ease;
  }

  .launcher-tile::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: "";
    background:
      linear-gradient(120deg, rgba(255, 255, 255, 0.18), transparent 32%),
      radial-gradient(circle at 20% 12%, rgba(116, 240, 227, 0.13), transparent 28%);
    opacity: 0.75;
  }

  .launcher-tile:nth-child(1) { grid-area: a; }
  .launcher-tile:nth-child(2) { grid-area: b; }
  .launcher-tile:nth-child(3) { grid-area: c; }
  .launcher-tile:nth-child(4) { grid-area: d; }
  .launcher-tile:nth-child(5) { grid-area: e; }
  .launcher-tile:nth-child(6) { grid-area: f; }
  .launcher-tile:nth-child(7) { grid-area: g; }
  .launcher-tile:nth-child(8) { grid-area: h; }

  .launcher-icon {
    position: relative;
    display: grid;
    width: 38px;
    height: 38px;
    grid-area: icon;
    place-items: center;
    border: 1px solid rgba(216, 231, 247, 0.2);
    border-radius: 999px;
    background:
      linear-gradient(145deg, rgba(116, 240, 227, 0.14), rgba(255, 255, 255, 0.045)),
      rgba(255, 255, 255, 0.04);
  }

  .launcher-icon svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: var(--color-soft);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
  }

  .launcher-copy {
    position: relative;
    display: grid;
    grid-area: copy;
    gap: 5px;
    min-width: 0;
  }

  .launcher-copy strong {
    font-size: 0.9rem;
    font-weight: 760;
    line-height: 1.16;
  }

  .launcher-copy small {
    color: var(--color-muted);
    font-size: 0.75rem;
    line-height: 1.35;
  }

  .launcher-category {
    position: relative;
    width: fit-content;
    grid-area: meta;
    padding: 4px 8px;
    border: 1px solid rgba(216, 231, 247, 0.16);
    border-radius: 999px;
    color: var(--color-soft);
    font-size: 0.68rem;
    font-weight: 700;
    line-height: 1;
  }

  .launcher-tile:hover,
  .launcher-tile:focus-visible {
    border-color: var(--color-line-strong);
    box-shadow: var(--shadow-focus);
    transform: translateY(-3px);
  }

  .launcher-tile:focus-visible {
    outline: 0;
  }

  @media (max-width: 900px) {
    .nexa-system {
      min-height: auto;
      gap: 18px;
      padding-bottom: 0;
    }

    .system-launcher {
      position: relative;
      inset: auto;
      width: 100%;
      margin-top: 8px;
    }

    .system-launcher[data-open="false"] {
      display: none;
    }

    .launcher-grid {
      min-height: 0;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas: none;
      gap: 10px;
      padding: 0;
    }

    .launcher-tile {
      grid-area: auto !important;
      min-height: 92px;
      padding: 13px;
    }

    .launcher-icon {
      width: 34px;
      height: 34px;
    }
  }

  @media (max-width: 520px) {
    .nexa-system {
      width: 100%;
      justify-items: center;
    }

    .face-control {
      width: min(76vw, 292px);
    }

    .launcher-grid {
      grid-template-columns: 1fr;
      width: min(100%, 366px);
    }

    .launcher-tile {
      min-height: 76px;
      grid-template-columns: auto 1fr auto;
      grid-template-areas: "icon copy meta";
      align-items: center;
    }

    .launcher-copy small {
      font-size: 0.72rem;
    }

    .launcher-category {
      align-self: center;
      white-space: nowrap;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .eye,
    .brow,
    .mouth,
    .launcher-tile,
    .face-inner {
      transition: none;
    }
  }
`;
