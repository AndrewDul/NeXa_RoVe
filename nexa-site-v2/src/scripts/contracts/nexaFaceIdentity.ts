export const CANONICAL_FACE_EYE_COUNT = 2;
export const CANONICAL_FACE_SMILE_COUNT = 1;

export const CANONICAL_FACE_DESCRIPTION =
  "The canonical NeXa face is the NeXa logo identity: two white vertical bean-shaped eyes and one medium-thick curved smile line.";

export const CANONICAL_FACE_RULES = {
  mainEyes: CANONICAL_FACE_EYE_COUNT,
  mainSmileMarks: CANONICAL_FACE_SMILE_COUNT,
  eyeColor: "white",
  eyeShape: "vertical bean",
  smileShape: "medium-thick curved line",
  separateVisiblePupils: false,
  separateVisibleBrows: false,
  separateVisibleEyeSockets: false,
  auraAndBackgroundAllowed: true,
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
