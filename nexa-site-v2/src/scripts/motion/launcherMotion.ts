import { gsap } from "gsap";

export function revealLauncher(root: HTMLElement, reducedMotion: boolean) {
  const tiles = Array.from(root.querySelectorAll("[data-launcher-tile]"));
  if (reducedMotion) {
    gsap.set(root, { opacity: 1 });
    gsap.set(tiles, { opacity: 1, y: 0, scale: 1 });
    return () => {};
  }

  const timeline = gsap.timeline();
  timeline.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.16, ease: "power1.out" });
  timeline.fromTo(tiles, { opacity: 0, y: 16, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.42, stagger: 0.035, ease: "power3.out" }, 0.03);
  return () => timeline.kill();
}
