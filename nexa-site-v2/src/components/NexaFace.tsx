import { useEffect, useMemo, useRef, useState } from "react";
import type { LauncherTile } from "../data/tiles";
import { blinkEyes, shiftFaceLogo, runFacePress } from "../scripts/motion/faceMotion";
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
import { CANONICAL_FACE_DESCRIPTION, CANONICAL_FACE_EYE_COUNT, CANONICAL_FACE_SMILE_COUNT } from "../scripts/contracts/nexaFaceIdentity";

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
  const faceButtonRef = useRef<HTMLButtonElement>(null);
  const stateResetRef = useRef<number | undefined>(undefined);

  const faceClass = useMemo(() => `face-svg face-${face.state} ${face.launcherOpen ? "face-launcher-open" : ""}`, [face.state, face.launcherOpen]);

  useEffect(() => {
    const reducedMotion = getReducedMotion();
    setFace((current) => ({ ...current, reducedMotion }));
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
      cleanupScroll();
      media.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!face.launcherOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeLauncher(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [face.launcherOpen]);

  useEffect(() => {
    if (!face.launcherOpen || !launcherRef.current) return;
    return revealLauncher(launcherRef.current, face.reducedMotion);
  }, [face.launcherOpen, face.reducedMotion]);

  useEffect(() => {
    if (face.reducedMotion) return;
    const eyes = Array.from(rootRef.current?.querySelectorAll("[data-eye]") ?? []);
    const logoParts = Array.from(rootRef.current?.querySelectorAll("[data-face-logo-part]") ?? []);
    let blinkId: number | undefined;
    let lookId: number | undefined;
    const startupId = window.setTimeout(() => {
      blinkId = window.setInterval(() => blinkEyes(eyes, false), 9800);
      lookId = window.setInterval(() => {
        const direction = Math.random() > 0.5 ? "left" : "right";
        shiftFaceLogo(logoParts, direction, false);
        window.setTimeout(() => shiftFaceLogo(logoParts, "center", false), 1200);
      }, 24000);
    }, 3200);
    return () => {
      window.clearTimeout(startupId);
      if (blinkId) window.clearInterval(blinkId);
      if (lookId) window.clearInterval(lookId);
    };
  }, [face.reducedMotion]);

  useEffect(() => {
    const logoParts = Array.from(rootRef.current?.querySelectorAll("[data-face-logo-part]") ?? []);
    if (face.state === "look-left") shiftFaceLogo(logoParts, "left", face.reducedMotion);
    if (face.state === "look-right") shiftFaceLogo(logoParts, "right", face.reducedMotion);
    if (face.state === "neutral" || face.state === "smile") shiftFaceLogo(logoParts, "center", face.reducedMotion);
  }, [face.state, face.reducedMotion]);

  function send(event: FaceEvent, holdState = true) {
    setFace((current) => transitionFace(current, event, { reducedMotion: current.reducedMotion }));
    if (!holdState) return;
    window.clearTimeout(stateResetRef.current);
    stateResetRef.current = window.setTimeout(() => {
      setFace((current) => transitionFace(current, current.launcherOpen ? "launcher-open" : "press-release"));
    }, 900);
  }

  function closeLauncher(focusFace = false) {
    window.clearTimeout(stateResetRef.current);
    setFace((current) => transitionFace(current, "launcher-close"));
    if (focusFace) {
      window.setTimeout(() => faceButtonRef.current?.focus(), 0);
    }
  }

  function openLauncher() {
    const shouldOpen = !face.launcherOpen;
    if (!shouldOpen) {
      closeLauncher();
      return;
    }
    if (rootRef.current) runFacePress(rootRef.current, face.reducedMotion);
    setFace((current) => transitionFace(current, "face-click"));
    window.setTimeout(() => {
      setFace((current) => transitionFace(current, "launcher-open"));
    }, face.reducedMotion ? 0 : 160);
  }

  function onTileHover(event: FaceEvent) {
    send(event);
  }

  return (
    <div className="nexa-system" ref={rootRef}>
      <button
        ref={faceButtonRef}
        className="face-control"
        type="button"
        aria-expanded={face.launcherOpen}
        aria-controls="nexa-launcher"
        aria-label={face.launcherOpen ? "Close NeXa system launcher" : "Open NeXa system launcher"}
        data-testid="nexa-face-control"
        onClick={openLauncher}
      >
        <svg className={faceClass} viewBox="0 0 360 360" role="img" aria-labelledby="nexa-face-title" data-testid="nexa-face-logo">
          <title id="nexa-face-title">Animated NeXa face</title>
          <desc>{CANONICAL_FACE_DESCRIPTION}</desc>
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
          </defs>
          <circle className="face-halo" cx="180" cy="180" r="172" />
          <circle className="face-aura" cx="180" cy="180" r="158" />
          <circle className="face-shell" cx="180" cy="180" r="130" />
          <circle className="face-core" data-testid="nexa-face-core" cx="180" cy="180" r="106" />
          <g
            className="face-inner"
            data-testid="nexa-face-canonical"
            data-canonical-eye-count={CANONICAL_FACE_EYE_COUNT}
            data-canonical-smile-count={CANONICAL_FACE_SMILE_COUNT}
          >
            <path data-eye data-testid="nexa-face-eye" data-face-logo-part className="eye eye-left" d="M122 109 C103 116, 98 150, 112 182 C122 207, 150 208, 160 183 C174 149, 155 101, 122 109Z" />
            <path data-eye data-testid="nexa-face-eye" data-face-logo-part className="eye eye-right" d="M238 109 C257 116, 262 150, 248 182 C238 207, 210 208, 200 183 C186 149, 205 101, 238 109Z" />
            <path data-testid="nexa-face-smile" data-face-logo-part className="smile-mark" d={smilePath(face.state)} />
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

function smilePath(state: FaceState) {
  if (state === "focused" || state === "squint" || state === "sleepy") return "M134 225 C154 240, 206 240, 226 225";
  if (state === "laugh" || state === "smile" || state === "surprised") return "M118 208 C145 255, 215 255, 242 208";
  return "M124 214 C150 248, 210 248, 236 214";
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

  .face-inner {
    transition: transform 180ms ease;
  }

  .eye {
    fill: #f5fdff;
    filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.34));
    transition: transform 180ms ease;
    transform-origin: center;
  }

  .smile-mark {
    fill: none;
    stroke: #f8fbff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 13;
    filter: drop-shadow(0 0 9px rgba(255, 255, 255, 0.24));
    transition: d 180ms ease, transform 180ms ease, stroke-width 180ms ease, filter 180ms ease;
  }

  .face-pressed .face-inner {
    transform: translateY(8px) scaleY(0.93);
    transform-origin: 180px 180px;
  }

  .face-launcher-open .face-aura {
    opacity: 0.92;
  }

  .face-smile .smile-mark,
  .face-launcher-open .smile-mark {
    stroke-width: 14;
    filter: drop-shadow(0 0 13px rgba(255, 255, 255, 0.3));
  }

  .face-squint .eye {
    transform: scaleY(0.72);
  }

  .face-sleepy .eye {
    transform: scaleY(0.42);
  }

  .face-focused .eye {
    transform: scaleY(0.84);
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
    .smile-mark,
    .launcher-tile,
    .face-inner {
      transition: none;
    }
  }
`;
