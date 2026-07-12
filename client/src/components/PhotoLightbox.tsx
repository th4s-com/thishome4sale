/**
 * RENOVATION LEDGER COMPONENT
 * The gallery is immersive but restrained: full-bleed photography, precise controls,
 * Oxford navy surfaces, and the renovation-green progress accent.
 */

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

type PhotoLightboxProps = {
  images: readonly string[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export default function PhotoLightbox({ images, index, onChange }: PhotoLightboxProps) {
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowRight") onChange(((index ?? 0) + 1) % images.length);
      if (event.key === "ArrowLeft") onChange(((index ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, index, isOpen, onChange]);

  if (index === null) return null;

  const previous = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Property photo viewer">
      <button className="lightbox__close" onClick={() => onChange(null)} aria-label="Close photo viewer">
        <X size={22} />
      </button>
      <button className="lightbox__arrow lightbox__arrow--left" onClick={previous} aria-label="Previous photo">
        <ChevronLeft size={28} />
      </button>
      <figure className="lightbox__figure">
        <img src={images[index]} alt={`Property photo ${index + 1} of ${images.length}`} />
        <figcaption>
          <span>1210 Miremont Drive</span>
          <span>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        </figcaption>
      </figure>
      <button className="lightbox__arrow lightbox__arrow--right" onClick={next} aria-label="Next photo">
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

