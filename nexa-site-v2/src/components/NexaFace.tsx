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
import {
  CANONICAL_FACE_DESCRIPTION,
  CANONICAL_FACE_EYE_COUNT,
  CANONICAL_FACE_HAS_BORDER,
  CANONICAL_FACE_HAS_FRAME,
  CANONICAL_FACE_MIN_SMILE_Y,
  CANONICAL_FACE_SMILE_COUNT
} from "../scripts/contracts/nexaFaceIdentity";

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
    <div className="nexa-system" data-launcher-open={face.launcherOpen ? "true" : "false"} ref={rootRef}>
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
          <g
            className="face-inner face-core"
            data-testid="nexa-face-core"
            data-face-role="canonical"
            data-canonical-eye-count={CANONICAL_FACE_EYE_COUNT}
            data-canonical-smile-count={CANONICAL_FACE_SMILE_COUNT}
            data-canonical-has-frame={CANONICAL_FACE_HAS_FRAME}
            data-canonical-has-border={CANONICAL_FACE_HAS_BORDER}
            data-canonical-min-smile-y={CANONICAL_FACE_MIN_SMILE_Y}
          >
            <path data-eye data-testid="nexa-face-eye" data-face-logo-part className="eye eye-left" d="M123 86 C103 94, 98 128, 110 161 C120 188, 150 190, 161 163 C175 126, 157 78, 123 86Z" />
            <path data-eye data-testid="nexa-face-eye" data-face-logo-part className="eye eye-right" d="M237 86 C257 94, 262 128, 250 161 C240 188, 210 190, 199 163 C185 126, 203 78, 237 86Z" />
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
  if (state === "focused" || state === "squint" || state === "sleepy") return "M128 260 C152 278, 208 278, 232 260";
  if (state === "laugh" || state === "smile" || state === "surprised") return "M116 250 C144 304, 216 304, 244 250";
  return "M120 258 C148 294, 212 294, 240 258";
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
    width: min(74vw, 680px);
    aspect-ratio: 1;
    border-radius: 999px;
    pointer-events: none;
    content: "";
    background:
      radial-gradient(circle, rgba(116, 240, 227, 0.14), transparent 44%),
      radial-gradient(circle at 50% 64%, rgba(255, 255, 255, 0.08), transparent 48%);
    filter: blur(34px);
    opacity: 0.58;
  }

  .face-control {
    position: relative;
    z-index: 4;
    display: grid;
    width: clamp(246px, 35vw, 430px);
    aspect-ratio: 1;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
    outline-offset: 14px;
    touch-action: manipulation;
    transition: width 380ms ease;
  }

  .nexa-system[data-launcher-open="true"] .face-control {
    width: clamp(128px, 12vw, 160px);
  }

  body.face-docked .nexa-system[data-launcher-open="false"] .face-control {
    position: fixed;
    top: calc(var(--island-top) + 46px);
    left: 50%;
    z-index: 90;
    width: clamp(58px, 7vw, 76px);
    border: 1px solid rgba(216, 231, 247, 0.18);
    border-radius: 18px;
    background: rgba(5, 8, 14, 0.38);
    box-shadow: var(--shadow-glass);
    backdrop-filter: blur(16px);
    transform: translateX(-50%);
  }

  .face-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    filter:
      drop-shadow(0 44px 94px rgba(0, 0, 0, 0.62))
      drop-shadow(0 0 36px rgba(116, 240, 227, 0.1));
  }

  .face-core {
    transform-box: fill-box;
    transform-origin: center;
  }

  .face-inner {
    transition: transform 180ms ease;
  }

  .eye {
    fill: #f5fdff;
    filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.38));
    transition: transform 180ms ease;
    transform-origin: center;
  }

  .smile-mark {
    fill: none;
    stroke: #f8fbff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 12;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.28));
    transition: d 180ms ease, transform 180ms ease, stroke-width 180ms ease, filter 180ms ease;
  }

  .face-pressed .face-inner {
    transform: translateY(8px) scaleY(0.93);
    transform-origin: 180px 180px;
  }

  .face-launcher-open .face-inner {
    transform: translateY(-2px);
  }

  .face-smile .smile-mark,
  .face-launcher-open .smile-mark {
    stroke-width: 13;
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
    inset: -10px;
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

  .system-launcher[data-open="false"] .launcher-tile {
    visibility: hidden;
    pointer-events: none;
  }

  .system-launcher[data-open="true"] .launcher-tile {
    visibility: visible;
  }

  .launcher-grid {
    position: relative;
    width: min(100%, 1080px);
    min-height: min(100%, 660px);
    pointer-events: none;
  }

  .launcher-tile {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    display: grid;
    width: clamp(150px, 13vw, 182px);
    height: 116px;
    min-height: 0;
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
    transform: translate(-50%, -50%);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      translate 180ms ease,
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

  .launcher-tile:nth-child(1) { transform: translate(-50%, -50%) translate(0, -255px); }
  .launcher-tile:nth-child(2) { transform: translate(-50%, -50%) translate(260px, -164px); }
  .launcher-tile:nth-child(3) { transform: translate(-50%, -50%) translate(336px, 0); }
  .launcher-tile:nth-child(4) { transform: translate(-50%, -50%) translate(260px, 164px); }
  .launcher-tile:nth-child(5) { transform: translate(-50%, -50%) translate(0, 232px); }
  .launcher-tile:nth-child(6) { transform: translate(-50%, -50%) translate(-260px, 164px); }
  .launcher-tile:nth-child(7) { transform: translate(-50%, -50%) translate(-336px, 0); }
  .launcher-tile:nth-child(8) { transform: translate(-50%, -50%) translate(-260px, -164px); }

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
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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
    translate: 0 -3px;
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
      display: grid;
      min-height: 0;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas: none;
      gap: 10px;
      padding: 0;
    }

    .launcher-tile {
      grid-area: auto !important;
      position: relative;
      top: auto;
      left: auto;
      width: auto;
      height: auto;
      min-height: 92px;
      padding: 13px;
      transform: none !important;
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

    .nexa-system[data-launcher-open="true"] .face-control {
      width: min(48vw, 180px);
    }

    body.face-docked .nexa-system[data-launcher-open="false"] .face-control {
      width: 58px;
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
