export function revealScrollSections(reducedMotion: boolean) {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-section]"));
  const updateDockedState = () => {
    document.body.classList.toggle("face-docked", window.scrollY > Math.max(260, window.innerHeight * 0.55));
  };
  updateDockedState();
  window.addEventListener("scroll", updateDockedState, { passive: true });
  if (reducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("section-visible"));
    return () => window.removeEventListener("scroll", updateDockedState);
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
  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", updateDockedState);
  };
}
