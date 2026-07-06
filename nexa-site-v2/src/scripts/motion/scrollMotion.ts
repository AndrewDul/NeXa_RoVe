export function revealScrollSections(reducedMotion: boolean) {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-section]"));
  if (reducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("section-visible"));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.14 }
  );
  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}
