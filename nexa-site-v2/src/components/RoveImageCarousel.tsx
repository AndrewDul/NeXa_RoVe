import { useEffect, useRef, useState } from "react";

export interface RoveCarouselImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface RoveImageCarouselProps {
  images: RoveCarouselImage[];
}

export default function RoveImageCarousel({ images }: RoveImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const selected = images[selectedIndex];

  function selectImage(index: number) {
    setSelectedIndex((index + images.length) % images.length);
  }

  function moveImage(direction: -1 | 1) {
    selectImage(selectedIndex + direction);
  }

  function openLightbox(trigger: HTMLElement | null) {
    lastTriggerRef.current = trigger;
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveImage(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveImage(-1);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(document.querySelectorAll<HTMLElement>("[data-rove-lightbox-control]")).filter(
        (control) => !control.hasAttribute("disabled")
      );
      if (!controls.length) return;
      const currentIndex = controls.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? currentIndex <= 0
          ? controls.length - 1
          : currentIndex - 1
        : currentIndex === controls.length - 1
          ? 0
          : currentIndex + 1;
      event.preventDefault();
      controls[nextIndex]?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, selectedIndex, images.length]);

  if (!images.length || !selected) return null;

  return (
    <div className="rove-carousel" data-testid="rove-carousel">
      <figure className="rove-carousel-main">
        <button
          ref={mainButtonRef}
          className="rove-carousel-main-button"
          type="button"
          data-testid="rove-carousel-main"
          aria-label={`Open full image: ${selected.caption}`}
          onClick={(event) => openLightbox(event.currentTarget)}
        >
          <img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} loading="lazy" decoding="async" />
        </button>
        <figcaption>{selected.caption}</figcaption>
      </figure>

      <div className="rove-carousel-controls" aria-label="NeXa RoVe image carousel controls">
        <button className="rove-carousel-step" type="button" aria-label="Previous image" onClick={() => moveImage(-1)}>
          Previous
        </button>
        <span aria-live="polite">
          {selectedIndex + 1} / {images.length}
        </span>
        <button className="rove-carousel-step" type="button" aria-label="Next image" onClick={() => moveImage(1)}>
          Next
        </button>
      </div>

      <div className="rove-carousel-thumbs" aria-label="NeXa RoVe image thumbnails">
        {images.map((image, index) => (
          <button
            className={`rove-carousel-thumb ${index === selectedIndex ? "rove-carousel-thumb-active" : ""}`}
            type="button"
            key={image.src}
            aria-label={`Show image: ${image.caption}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            data-testid="rove-carousel-thumbnail"
            onClick={() => selectImage(index)}
          >
            <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" />
            <span>{image.caption}</span>
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div className="rove-lightbox" role="dialog" aria-modal="true" aria-label="NeXa RoVe full image viewer" data-testid="rove-lightbox">
          <div className="rove-lightbox-surface">
            <button
              ref={closeButtonRef}
              className="rove-lightbox-close"
              type="button"
              aria-label="Close full image viewer"
              data-rove-lightbox-control
              data-testid="rove-lightbox-close"
              onClick={closeLightbox}
            >
              Close
            </button>
            <button
              className="rove-lightbox-nav rove-lightbox-prev"
              type="button"
              aria-label="Previous full image"
              data-rove-lightbox-control
              data-testid="rove-lightbox-prev"
              onClick={() => moveImage(-1)}
            >
              Previous
            </button>
            <figure className="rove-lightbox-figure">
              <img
                src={selected.src}
                alt={selected.alt}
                width={selected.width}
                height={selected.height}
                data-testid="rove-lightbox-image"
              />
              <figcaption aria-live="polite">{selected.caption}</figcaption>
            </figure>
            <button
              className="rove-lightbox-nav rove-lightbox-next"
              type="button"
              aria-label="Next full image"
              data-rove-lightbox-control
              data-testid="rove-lightbox-next"
              onClick={() => moveImage(1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
