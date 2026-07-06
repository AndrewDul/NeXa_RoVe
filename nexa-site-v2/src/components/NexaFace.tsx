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

  const faceClass = useMemo(() => `face-svg face-${face.state}`, [face.state]);

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
    if (rootRef.current) runFacePress(rootRef.current, face.reducedMotion);
    setFace((current) => transitionFace(current, current.launcherOpen ? "launcher-close" : "face-click"));
    window.setTimeout(() => {
      setFace((current) => transitionFace(current, current.launcherOpen ? "launcher-close" : "launcher-open"));
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
        aria-label="Open NeXa system launcher"
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
              <stop stopColor="#1f2b37" />
              <stop offset="1" stopColor="#090d14" />
            </radialGradient>
          </defs>
          <circle className="face-aura" cx="180" cy="180" r="158" />
          <circle className="face-shell" cx="180" cy="180" r="130" />
          <circle className="face-core" cx="180" cy="180" r="106" />
          <g className="face-inner">
            <ellipse data-eye className="eye eye-left" cx="136" cy="158" rx="18" ry="28" />
            <ellipse data-eye className="eye eye-right" cx="224" cy="158" rx="18" ry="28" />
            <circle data-pupil className="pupil pupil-left" cx="136" cy="162" r="7" />
            <circle data-pupil className="pupil pupil-right" cx="224" cy="162" r="7" />
            <path className="brow brow-left" d="M105 121 C124 111, 148 111, 166 123" />
            <path className="brow brow-right" d="M194 123 C212 111, 236 111, 255 121" />
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
    width: min(100%, 1040px);
    min-height: clamp(430px, 65svh, 660px);
    place-items: center;
    isolation: isolate;
  }

  .face-control {
    position: relative;
    z-index: 3;
    display: grid;
    width: clamp(238px, 35vw, 430px);
    aspect-ratio: 1;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
  }

  .face-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    filter: drop-shadow(0 40px 90px rgba(0, 0, 0, 0.56));
  }

  .face-aura {
    fill: rgba(116, 240, 227, 0.08);
    stroke: rgba(116, 240, 227, 0.16);
    stroke-width: 1;
  }

  .face-shell {
    fill: url(#face-shell);
    opacity: 0.94;
  }

  .face-core {
    fill: url(#face-core);
    stroke: rgba(255, 255, 255, 0.16);
    stroke-width: 2;
  }

  .eye {
    fill: #eefaff;
    transition: rx 180ms ease, ry 180ms ease, transform 180ms ease;
  }

  .pupil {
    fill: #061012;
  }

  .brow {
    fill: none;
    stroke: rgba(238, 250, 255, 0.72);
    stroke-linecap: round;
    stroke-width: 9;
    transition: transform 180ms ease;
  }

  .mouth {
    fill: none;
    stroke: #eefaff;
    stroke-linecap: round;
    stroke-width: 13;
    transition: d 180ms ease, transform 180ms ease;
  }

  .face-pressed .face-inner {
    transform: translateY(8px) scaleY(0.94);
    transform-origin: 180px 180px;
  }

  .face-squint .eye {
    ry: 12;
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
    z-index: 2;
    display: grid;
    place-items: center;
    pointer-events: none;
    opacity: 0;
  }

  .system-launcher[data-open="true"] {
    pointer-events: auto;
    opacity: 1;
  }

  .launcher-grid {
    display: grid;
    width: min(100%, 980px);
    min-height: min(100%, 600px);
    grid-template-columns: repeat(4, minmax(132px, 1fr));
    grid-template-areas:
      "a b c d"
      ". face face ."
      "e f g h";
    align-items: center;
    gap: 14px;
    padding: 12px;
  }

  .launcher-tile {
    display: grid;
    min-height: 104px;
    align-content: center;
    gap: 8px;
    padding: 16px;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-sm);
    background: linear-gradient(145deg, rgba(14, 20, 30, 0.82), rgba(255, 255, 255, 0.075));
    box-shadow: var(--shadow-soft);
    color: var(--color-text);
    text-decoration: none;
    backdrop-filter: blur(20px);
  }

  .launcher-tile:nth-child(1) { grid-area: a; }
  .launcher-tile:nth-child(2) { grid-area: b; }
  .launcher-tile:nth-child(3) { grid-area: c; }
  .launcher-tile:nth-child(4) { grid-area: d; }
  .launcher-tile:nth-child(5) { grid-area: e; }
  .launcher-tile:nth-child(6) { grid-area: f; }
  .launcher-tile:nth-child(7) { grid-area: g; }
  .launcher-tile:nth-child(8) { grid-area: h; }

  .launcher-tile span {
    font-size: 0.9rem;
    font-weight: 760;
  }

  .launcher-tile small {
    color: var(--color-muted);
    font-size: 0.75rem;
    line-height: 1.35;
  }

  .launcher-tile:hover,
  .launcher-tile:focus-visible {
    border-color: var(--color-line-strong);
    box-shadow: var(--shadow-focus);
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
      min-height: 96px;
    }
  }

  @media (max-width: 520px) {
    .nexa-system {
      width: 100%;
      justify-items: center;
    }

    .face-control {
      width: min(78vw, 292px);
    }

    .launcher-grid {
      grid-template-columns: 1fr;
      width: min(100%, 360px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .eye,
    .brow,
    .mouth {
      transition: none;
    }
  }
`;
