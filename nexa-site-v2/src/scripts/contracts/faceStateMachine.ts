export const faceStates = [
  "neutral",
  "smile",
  "focused",
  "surprised",
  "laugh",
  "squint",
  "look-left",
  "look-right",
  "sleepy",
  "pressed"
] as const;

export type FaceState = (typeof faceStates)[number];

export const faceEvents = [
  "intro-complete",
  "face-click",
  "launcher-open",
  "launcher-close",
  "blink",
  "look-left",
  "look-right",
  "smile",
  "focus",
  "surprise",
  "laugh",
  "squint",
  "sleepy",
  "press-release",
  "reduced-motion-on",
  "reduced-motion-off"
] as const;

export type FaceEvent = (typeof faceEvents)[number];

export interface FaceModel {
  state: FaceState;
  launcherOpen: boolean;
  reducedMotion: boolean;
  lastEvent?: FaceEvent;
}

export interface FaceTransitionOptions {
  reducedMotion?: boolean;
}

const reactionMap: Partial<Record<FaceEvent, FaceState>> = {
  "face-click": "pressed",
  blink: "sleepy",
  "look-left": "look-left",
  "look-right": "look-right",
  smile: "smile",
  focus: "focused",
  surprise: "surprised",
  laugh: "laugh",
  squint: "squint",
  sleepy: "sleepy",
  "press-release": "neutral"
};

export const initialFaceModel: FaceModel = {
  state: "neutral",
  launcherOpen: false,
  reducedMotion: false
};

export function transitionFace(
  current: FaceModel,
  event: FaceEvent,
  options: FaceTransitionOptions = {}
): FaceModel {
  const reducedMotion = options.reducedMotion ?? current.reducedMotion;
  const next: FaceModel = {
    ...current,
    reducedMotion,
    lastEvent: event
  };

  if (event === "reduced-motion-on") {
    return { ...next, state: "neutral", reducedMotion: true };
  }

  if (event === "reduced-motion-off") {
    return { ...next, reducedMotion: false };
  }

  if (event === "launcher-open") {
    return { ...next, state: "smile", launcherOpen: true };
  }

  if (event === "launcher-close") {
    return { ...next, state: "neutral", launcherOpen: false };
  }

  if (reducedMotion && ["blink", "look-left", "look-right"].includes(event)) {
    return { ...next, state: "neutral" };
  }

  return {
    ...next,
    state: reactionMap[event] ?? current.state
  };
}

export interface FutureFaceRendererBoundary {
  setState(state: FaceState): void;
  triggerEvent(event: FaceEvent): void;
  setReducedMotion(reducedMotion: boolean): void;
  destroy(): void;
}
