import { gsap } from "gsap";

export interface FaceMotionParts {
  root: HTMLElement;
  eyes: Element[];
  mouth: Element | null;
  pupils: Element[];
}

export function runFaceIntro(root: HTMLElement, reducedMotion: boolean) {
  if (reducedMotion) {
    gsap.set(root, { opacity: 1, scale: 1 });
    return () => {};
  }

  const timeline = gsap.timeline();
  timeline.fromTo(root, { opacity: 0, scale: 0.92, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" });
  return () => timeline.kill();
}

export function runFacePress(root: HTMLElement, reducedMotion: boolean) {
  if (reducedMotion) return;
  gsap.fromTo(root, { scale: 0.985 }, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.42)" });
}

export function blinkEyes(eyes: Element[], reducedMotion: boolean) {
  if (reducedMotion || eyes.length === 0) return;
  gsap.fromTo(eyes, { scaleY: 1, transformOrigin: "50% 50%" }, { scaleY: 0.08, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" });
}

export function lookPupils(pupils: Element[], direction: "left" | "right" | "center", reducedMotion: boolean) {
  if (pupils.length === 0) return;
  const x = direction === "left" ? -8 : direction === "right" ? 8 : 0;
  gsap.to(pupils, { x, duration: reducedMotion ? 0 : 0.42, ease: "power2.out" });
}
