export interface FaceMotionParts {
  root: HTMLElement;
  eyes: Element[];
  mouth: Element | null;
  logoParts: Element[];
}

let gsapLoader: Promise<typeof import("gsap").gsap> | undefined;

function loadGsap() {
  gsapLoader ??= import("gsap").then((module) => module.gsap);
  return gsapLoader;
}

export function runFacePress(root: HTMLElement, reducedMotion: boolean) {
  if (reducedMotion) return;
  const inner = root.querySelector(".face-inner");
  const core = root.querySelector(".face-core");
  void loadGsap().then((gsap) => {
    gsap
      .timeline()
      .fromTo(inner, { scaleY: 0.9, y: 9, transformOrigin: "180px 180px" }, { scaleY: 1, y: 0, duration: 0.58, ease: "elastic.out(1, 0.38)" })
      .fromTo(core, { scale: 0.985, transformOrigin: "180px 180px" }, { scale: 1, duration: 0.52, ease: "elastic.out(1, 0.5)" }, 0);
  });
}

export function blinkEyes(eyes: Element[], reducedMotion: boolean) {
  if (reducedMotion || eyes.length === 0) return;
  void loadGsap().then((gsap) => {
    gsap.fromTo(eyes, { scaleY: 1, transformOrigin: "50% 50%" }, { scaleY: 0.08, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" });
  });
}

export function shiftFaceLogo(parts: Element[], direction: "left" | "right" | "center", reducedMotion: boolean) {
  if (parts.length === 0) return;
  const x = direction === "left" ? -7 : direction === "right" ? 7 : 0;
  if (reducedMotion) {
    parts.forEach((part) => {
      if (part instanceof HTMLElement || part instanceof SVGElement) {
        part.style.transform = `translateX(${x}px)`;
      }
    });
    return;
  }
  void loadGsap().then((gsap) => {
    gsap.to(parts, { x, duration: 0.48, ease: "power3.out" });
  });
}
