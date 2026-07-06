import type { FaceEvent, FaceState, FutureFaceRendererBoundary } from "./faceStateMachine";

export interface RiveFaceAdapterOptions {
  stateMachineName?: string;
  initialState?: FaceState;
  reducedMotion?: boolean;
}

export interface RiveFaceAdapter extends FutureFaceRendererBoundary {
  setState(state: FaceState): void;
  triggerEvent(event: FaceEvent): void;
  setReducedMotion(reducedMotion: boolean): void;
  destroy(): void;
}

export function createRiveFaceAdapter(_options: RiveFaceAdapterOptions = {}): RiveFaceAdapter {
  return {
    setState() {},
    triggerEvent() {},
    setReducedMotion() {},
    destroy() {}
  };
}
