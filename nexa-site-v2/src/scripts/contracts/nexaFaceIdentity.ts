export const CANONICAL_FACE_EYE_COUNT = 2;
export const CANONICAL_FACE_SMILE_COUNT = 1;
export const CANONICAL_FACE_HAS_FRAME = false;
export const CANONICAL_FACE_HAS_BORDER = false;
export const CANONICAL_FACE_MIN_SMILE_Y = 242;

export const CANONICAL_FACE_DESCRIPTION =
  "The canonical NeXa face is the NeXa logo identity: two white vertical bean-shaped eyes and one medium-thick curved smile line drawn directly on the dark background.";

export const CANONICAL_FACE_RULES = {
  mainEyes: CANONICAL_FACE_EYE_COUNT,
  mainSmileMarks: CANONICAL_FACE_SMILE_COUNT,
  hasVisibleFrame: CANONICAL_FACE_HAS_FRAME,
  hasVisibleBorder: CANONICAL_FACE_HAS_BORDER,
  eyeColor: "white",
  eyeShape: "vertical bean",
  smileShape: "medium-thick curved line",
  smileMinimumY: CANONICAL_FACE_MIN_SMILE_Y,
  drawnDirectlyOnDarkBackground: true,
  separateVisibleLogoShell: false,
  separateVisibleLogoRim: false,
  separateVisiblePupils: false,
  separateVisibleBrows: false,
  separateVisibleEyeSockets: false,
  auraAndBackgroundAllowed: true,
  launcherMustNotBecomeFaceFrame: true,
  animationMustPreserveLogoIdentity: true
} as const;

export const ALLOWED_FACE_ANIMATION_MODES = [
  "blink",
  "look-left",
  "look-right",
  "smile-glow",
  "pressed",
  "launcher-open",
  "idle-glow",
  "reduced-motion"
] as const;
