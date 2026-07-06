import { gsap } from "gsap";

export interface FaceMotionParts {
  root: HTMLElement;
  eyes: Element[];
  mouth: Element | null;
  pupils: Element[];
}

export function runFaceIntro(root: HTMLElement, reducedMotion: boolean) {
  if (reducedMotion) {
    gsap.set(root, { opacity: 1, y: 0 });
    return () => {};
  }

  const timeline = gsap.timeline();
  timeline.fromTo(root, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out" });
  return () => timeline.kill();
}

export function runFacePress(root: HTMLElement, reducedMotion: boolean) {
  if (reducedMotion) return;
  const inner = root.querySelector(".face-inner");
  const core = root.querySelector(".face-core");
  const aura = root.querySelector(".face-aura");
  gsap
    .timeline()
    .fromTo(inner, { scaleY: 0.9, y: 9, transformOrigin: "180px 180px" }, { scaleY: 1, y: 0, duration: 0.58, ease: "elastic.out(1, 0.38)" })
    .fromTo(core, { scale: 0.985, transformOrigin: "180px 180px" }, { scale: 1, duration: 0.52, ease: "elastic.out(1, 0.5)" }, 0)
    .fromTo(aura, { opacity: 0.34 }, { opacity: 1, duration: 0.42, ease: "power2.out" }, 0);
}

export function blinkEyes(eyes: Element[], reducedMotion: boolean) {
  if (reducedMotion || eyes.length === 0) return;
  gsap.fromTo(eyes, { scaleY: 1, transformOrigin: "50% 50%" }, { scaleY: 0.08, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" });
}

export function lookPupils(pupils: Element[], direction: "left" | "right" | "center", reducedMotion: boolean) {
  if (pupils.length === 0) return;
  const x = direction === "left" ? -9 : direction === "right" ? 9 : 0;
  gsap.to(pupils, { x, duration: reducedMotion ? 0 : 0.48, ease: "power3.out" });
}
