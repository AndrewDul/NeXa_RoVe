import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
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
  const [contentActive, setContentActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLDivElement>(null);
  const faceButtonRef = useRef<HTMLButtonElement>(null);
  const stateResetRef = useRef<number | undefined>(undefined);

  const faceClass = useMemo(() => `face-svg face-${face.state} ${face.launcherOpen ? "face-launcher-open" : ""}`, [face.state, face.launcherOpen]);

  useEffect(() => {
    const reducedMotion = getReducedMotion();
    setFace((current) => ({ ...current, reducedMotion }));
    const cleanupScroll = revealScrollSections(reducedMotion);
    if (window.location.hash && window.location.hash !== "#top") {
      document.body.classList.add("content-active", "face-docked");
      setContentActive(true);
      updateFlowBarDockState();
    }
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
    if (!contentActive) {
      document.body.classList.remove("flow-bar-docked");
      return;
    }
    updateFlowBarDockState();
    const onScroll = () => updateFlowBarDockState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [contentActive]);

  useEffect(() => {
    const onReturnHome = (event: globalThis.MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = target.closest("[data-nexa-return-home]");
      if (!control) return;
      event.preventDefault();
      if (rootRef.current) runFacePress(rootRef.current, face.reducedMotion);
      returnHome();
    };
    document.addEventListener("click", onReturnHome);
    return () => document.removeEventListener("click", onReturnHome);
  }, [face.reducedMotion]);

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

  function returnHome() {
    window.clearTimeout(stateResetRef.current);
    closeLauncher(false);
    document.body.classList.remove("content-active", "face-docked", "flow-bar-docked");
    setContentActive(false);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    window.scrollTo({ top: 0, behavior: face.reducedMotion ? "auto" : "smooth" });
    setFace((current) => transitionFace({ ...current, launcherOpen: false }, "press-release"));
  }

  function openLauncher() {
    if (contentActive || document.body.classList.contains("content-active")) {
      if (rootRef.current) runFacePress(rootRef.current, face.reducedMotion);
      returnHome();
      return;
    }
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

  function onTileSelect(tile: LauncherTile, event: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    event.preventDefault();
    if (!tile.active) {
      send(tile.reaction);
      return;
    }
    send("smile", false);
    closeLauncher(false);
    document.body.classList.add("content-active", "face-docked");
    document.body.classList.remove("flow-bar-docked");
    setContentActive(true);
    window.setTimeout(() => {
      const target = document.getElementById(tile.targetId);
      if (!target) return;
      window.history.replaceState(null, "", `#${tile.targetId}`);
      target.scrollIntoView({ behavior: face.reducedMotion ? "auto" : "smooth", block: "start" });
    }, face.reducedMotion ? 0 : 120);
  }

  return (
    <div className="nexa-system" data-launcher-open={face.launcherOpen ? "true" : "false"} ref={rootRef}>
      <button
        ref={faceButtonRef}
        className={`face-control ${face.launcherOpen ? "face-control-open" : ""} ${contentActive ? "face-control-docked" : ""}`}
        type="button"
        aria-expanded={face.launcherOpen}
        aria-controls="nexa-launcher"
        aria-label={contentActive ? "Return to NeXa home" : face.launcherOpen ? "Close NeXa system launcher" : "Open NeXa system launcher"}
        title={contentActive ? "Return home" : undefined}
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
            <rect data-eye data-testid="nexa-face-eye" data-face-logo-part className="eye eye-left" x="108" y="70" width="46" height="128" rx="23" />
            <rect data-eye data-testid="nexa-face-eye" data-face-logo-part className="eye eye-right" x="206" y="70" width="46" height="128" rx="23" />
            <path data-testid="nexa-face-smile" data-face-logo-part className="smile-mark" d={smilePath(face.state)} />
          </g>
        </svg>
      </button>
      <div id="nexa-launcher" ref={launcherRef}>
        <SystemLauncher open={face.launcherOpen} tiles={tiles} onTileHover={onTileHover} onTileSelect={onTileSelect} />
      </div>
      <style>{faceStyles}</style>
    </div>
  );
}

function updateFlowBarDockState() {
  const shouldDock = window.scrollY > Math.max(180, window.innerHeight * 0.28);
  document.body.classList.toggle("flow-bar-docked", shouldDock);
}

function smilePath(state: FaceState) {
  if (state === "focused" || state === "squint" || state === "sleepy") return "M118 258 C148 282, 212 282, 242 258";
  if (state === "laugh" || state === "smile" || state === "surprised") return "M110 248 C142 306, 218 306, 250 248";
  return "M112 256 C144 296, 216 296, 248 256";
}

const faceStyles = `
  .nexa-system {
    position: relative;
    display: grid;
    width: min(100%, 1120px);
    height: 100%;
    min-height: 0;
    place-items: center;
    isolation: isolate;
    --launcher-radius: clamp(136px, min(32vw, 34svh), 300px);
    --tile-size: clamp(88px, min(13vw, 14svh), 128px);
  }

  .nexa-system::before {
    position: absolute;
    z-index: 0;
    width: min(76vw, 620px);
    aspect-ratio: 1;
    border-radius: 999px;
    pointer-events: none;
    content: "";
    background:
      radial-gradient(circle, rgba(137, 169, 255, 0.18), transparent 42%),
      radial-gradient(circle at 50% 56%, rgba(116, 240, 227, 0.13), transparent 50%);
    filter: blur(30px);
    opacity: 0.72;
  }

  .face-control {
    position: relative;
    z-index: 4;
    display: grid;
    grid-area: 1 / 1;
    width: clamp(238px, min(42vw, 58svh), 470px);
    aspect-ratio: 1;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    cursor: pointer;
    outline-offset: 14px;
    touch-action: manipulation;
    transition: filter 220ms ease;
  }

  #nexa-launcher {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
  }

  .face-control.face-control-open {
    z-index: 7;
    width: clamp(74px, min(12vw, 17svh), 104px) !important;
  }

  .nexa-system[data-launcher-open="true"] .face-control {
    z-index: 7;
    width: clamp(74px, min(12vw, 17svh), 104px) !important;
  }

  .face-control.face-control-docked {
    position: fixed;
    top: calc(var(--island-top) + 41px);
    left: 50%;
    z-index: var(--z-docked-face);
    width: clamp(58px, 5vw, 70px) !important;
    border: 1px solid rgba(216, 231, 247, 0.18);
    border-radius: 0 0 18px 18px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035)),
      rgba(5, 8, 14, 0.48);
    box-shadow: var(--shadow-glass);
    backdrop-filter: blur(16px);
    transform: translateX(-50%);
    transition: none;
  }

  .face-control.face-control-docked:hover,
  .face-control.face-control-docked:focus-visible {
    box-shadow: var(--shadow-focus);
  }

  body.content-active .face-control.face-control-docked {
    transition:
      opacity 220ms ease,
      transform 220ms ease,
      filter 220ms ease;
  }

  body.content-active.flow-bar-docked .face-control.face-control-docked {
    opacity: 0;
    pointer-events: none;
    filter: blur(4px);
    transform: translate(42vw, -8px) scale(0.88);
  }

  .face-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    filter:
      drop-shadow(0 40px 90px rgba(0, 0, 0, 0.64))
      drop-shadow(0 0 26px rgba(255, 255, 255, 0.18))
      drop-shadow(0 0 52px rgba(116, 240, 227, 0.2));
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
    filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.48));
    transition: transform 180ms ease;
    transform-origin: center;
  }

  .smile-mark {
    fill: none;
    stroke: #f8fbff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 13;
    filter: drop-shadow(0 0 13px rgba(255, 255, 255, 0.34));
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
    position: fixed;
    inset: 0;
    z-index: 3;
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
    width: min(100vw, 1120px);
    height: min(100svh, 760px);
    pointer-events: none;
  }

  .launcher-grid::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(var(--launcher-radius) * 2);
    aspect-ratio: 1;
    border: 1px solid rgba(216, 231, 247, 0.12);
    border-radius: 999px;
    pointer-events: none;
    content: "";
    box-shadow: 0 0 70px rgba(116, 240, 227, 0.08);
    transform: translate(-50%, -50%);
  }

  .launcher-tile {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    display: grid;
    width: var(--tile-size);
    height: var(--tile-size);
    min-height: 0;
    aspect-ratio: 1 / 1;
    grid-template-columns: 1fr;
    grid-template-areas:
      "icon"
      "copy";
    place-items: center;
    align-content: center;
    justify-content: center;
    gap: clamp(5px, 0.9vw, 9px);
    overflow: hidden;
    padding: clamp(11px, 1.5vw, 18px);
    border: 1px solid rgba(216, 231, 247, 0.18);
    border-radius: 999px;
    background:
      radial-gradient(circle at 34% 24%, rgba(255, 255, 255, 0.22), transparent 28%),
      radial-gradient(circle at 62% 74%, rgba(116, 240, 227, 0.13), transparent 46%),
      linear-gradient(145deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.026)),
      rgba(7, 12, 21, 0.86);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      inset 0 -18px 34px rgba(0, 0, 0, 0.24),
      0 18px 44px rgba(0, 0, 0, 0.38),
      0 0 28px rgba(116, 240, 227, 0.08);
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
      background 180ms ease,
      opacity 180ms ease,
      filter 180ms ease;
  }

  .launcher-tile-placeholder {
    cursor: default;
    opacity: 0.7;
    filter: saturate(0.72) brightness(0.82);
  }

  .launcher-tile-active {
    border-color: rgba(116, 240, 227, 0.72);
    background:
      radial-gradient(circle at 34% 24%, rgba(255, 255, 255, 0.31), transparent 30%),
      radial-gradient(circle at 50% 70%, rgba(116, 240, 227, 0.28), transparent 52%),
      linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04)),
      rgba(8, 19, 29, 0.92);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      inset 0 -18px 36px rgba(0, 0, 0, 0.22),
      0 0 0 1px rgba(116, 240, 227, 0.18),
      0 22px 50px rgba(0, 0, 0, 0.42),
      0 0 38px rgba(116, 240, 227, 0.3);
  }

  .launcher-tile::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: "";
    background:
      radial-gradient(circle at 31% 21%, rgba(255, 255, 255, 0.34), transparent 16%),
      linear-gradient(132deg, rgba(255, 255, 255, 0.14), transparent 42%);
    opacity: 0.62;
  }

  .launcher-tile:nth-child(1) { transform: translate(-50%, -50%) rotate(-90deg) translateX(var(--launcher-radius)) rotate(90deg); }
  .launcher-tile:nth-child(2) { transform: translate(-50%, -50%) rotate(-54deg) translateX(var(--launcher-radius)) rotate(54deg); }
  .launcher-tile:nth-child(3) { transform: translate(-50%, -50%) rotate(-18deg) translateX(var(--launcher-radius)) rotate(18deg); }
  .launcher-tile:nth-child(4) { transform: translate(-50%, -50%) rotate(18deg) translateX(var(--launcher-radius)) rotate(-18deg); }
  .launcher-tile:nth-child(5) { transform: translate(-50%, -50%) rotate(54deg) translateX(var(--launcher-radius)) rotate(-54deg); }
  .launcher-tile:nth-child(6) { transform: translate(-50%, -50%) rotate(90deg) translateX(var(--launcher-radius)) rotate(-90deg); }
  .launcher-tile:nth-child(7) { transform: translate(-50%, -50%) rotate(126deg) translateX(var(--launcher-radius)) rotate(-126deg); }
  .launcher-tile:nth-child(8) { transform: translate(-50%, -50%) rotate(162deg) translateX(var(--launcher-radius)) rotate(-162deg); }
  .launcher-tile:nth-child(9) { transform: translate(-50%, -50%) rotate(198deg) translateX(var(--launcher-radius)) rotate(-198deg); }
  .launcher-tile:nth-child(10) { transform: translate(-50%, -50%) rotate(234deg) translateX(var(--launcher-radius)) rotate(-234deg); }

  .launcher-icon {
    position: relative;
    display: grid;
    width: clamp(27px, 4vw, 40px);
    height: clamp(27px, 4vw, 40px);
    grid-area: icon;
    place-items: center;
    border: 1px solid rgba(216, 231, 247, 0.16);
    border-radius: 999px;
    background:
      radial-gradient(circle at 38% 24%, rgba(255, 255, 255, 0.18), transparent 36%),
      linear-gradient(145deg, rgba(116, 240, 227, 0.16), rgba(255, 255, 255, 0.04)),
      rgba(255, 255, 255, 0.035);
  }

  .launcher-icon svg {
    width: clamp(17px, 2.8vw, 22px);
    height: clamp(17px, 2.8vw, 22px);
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
    justify-items: center;
    gap: 0;
    min-width: 0;
    width: 100%;
    text-align: center;
  }

  .launcher-copy strong {
    max-width: 100%;
    overflow-wrap: anywhere;
    color: rgba(246, 252, 255, 0.94);
    font-size: clamp(0.68rem, 1.25vw, 0.86rem);
    font-weight: 780;
    line-height: 1.04;
    text-wrap: balance;
  }

  .launcher-copy small {
    display: none;
  }

  .launcher-category {
    display: none;
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

  .launcher-tile-placeholder:hover {
    border-color: rgba(216, 231, 247, 0.18);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      inset 0 -18px 34px rgba(0, 0, 0, 0.24),
      0 18px 44px rgba(0, 0, 0, 0.38),
      0 0 28px rgba(116, 240, 227, 0.08);
    translate: 0;
  }

  @media (min-width: 901px) {
    .launcher-grid {}
  }

  @media (max-width: 900px) {
    .nexa-system {
      --launcher-radius: clamp(118px, min(33vw, 25svh), 228px);
      --tile-size: clamp(70px, min(18vw, 11svh), 106px);
    }

    .system-launcher {
      inset: 0;
      width: 100%;
    }

    .launcher-grid {
      height: 100svh;
    }

    .launcher-tile {
      text-align: center;
    }
  }

  @media (max-width: 520px) {
    .nexa-system {
      width: 100%;
      justify-items: center;
      --launcher-radius: clamp(118px, min(40vw, 24svh), 172px);
      --tile-size: clamp(54px, 17vw, 74px);
    }

    .face-control {
      width: min(78vw, 306px);
    }

    .nexa-system[data-launcher-open="true"] .face-control {
      width: clamp(62px, 19vw, 76px) !important;
    }

    body.face-docked .nexa-system[data-launcher-open="false"] .face-control {
      width: 62px;
    }

    .launcher-tile {
      gap: 3px;
      padding: clamp(7px, 2vw, 9px);
    }

    .launcher-icon {
      width: clamp(20px, 6vw, 25px);
      height: clamp(20px, 6vw, 25px);
    }

    .launcher-icon svg {
      width: clamp(14px, 4vw, 17px);
      height: clamp(14px, 4vw, 17px);
    }

    .launcher-copy strong {
      font-size: clamp(0.5rem, 2.25vw, 0.62rem);
      line-height: 1;
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
