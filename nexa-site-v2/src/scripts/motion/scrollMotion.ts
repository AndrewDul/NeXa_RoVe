import { gsap } from "gsap";

export function revealScrollSections(reducedMotion: boolean) {
  const sections = Array.from(document.querySelectorAll("[data-scroll-section]"));
  if (reducedMotion || !("IntersectionObserver" in window)) {
    gsap.set(sections, { opacity: 1, y: 0 });
    return () => {};
  }

  gsap.set(sections, { opacity: 0, y: 28 });
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.14 }
  );
  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}
