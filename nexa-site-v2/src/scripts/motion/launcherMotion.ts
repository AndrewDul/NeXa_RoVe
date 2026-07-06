let gsapLoader: Promise<typeof import("gsap").gsap> | undefined;

function loadGsap() {
  gsapLoader ??= import("gsap").then((module) => module.gsap);
  return gsapLoader;
}

export function revealLauncher(root: HTMLElement, reducedMotion: boolean) {
  const tiles = Array.from(root.querySelectorAll("[data-launcher-tile]"));
  if (reducedMotion) {
    root.style.opacity = "1";
    tiles.forEach((tile) => {
      if (tile instanceof HTMLElement) {
        tile.style.opacity = "1";
        tile.style.transform = "none";
        tile.style.filter = "none";
      }
    });
    return () => {};
  }

  let killed = false;
  let timeline: any;
  void loadGsap().then((gsap) => {
    if (killed) return;
    timeline = gsap.timeline();
    timeline.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "power1.out" });
    timeline.fromTo(
      tiles,
      { opacity: 0, y: 18, scale: 0.94, filter: "blur(8px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.46, stagger: 0.045, ease: "power3.out" },
      0.04
    );
  });
  return () => {
    killed = true;
    timeline?.kill();
  };
}
