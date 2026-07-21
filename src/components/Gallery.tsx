import { useState, useEffect, useRef } from "react";

import img120 from "@/assets/NISHATI SAFI CUP/img120.jpg";
import img204 from "@/assets/NISHATI SAFI CUP/img204.jpg";
import img216 from "@/assets/NISHATI SAFI CUP/img216.jpg";
import img239 from "@/assets/NISHATI SAFI CUP/img239.jpg";
import img54 from "@/assets/NISHATI SAFI CUP/img54.jpg";
import img56 from "@/assets/NISHATI SAFI CUP/img56.jpg";
import img58 from "@/assets/NISHATI SAFI CUP/img58.jpg";
import img65 from "@/assets/NISHATI SAFI CUP/img65.jpg";
import img67 from "@/assets/NISHATI SAFI CUP/img67.jpg";
import img75 from "@/assets/NISHATI SAFI CUP/img75.jpg";
import img77 from "@/assets/NISHATI SAFI CUP/img77.jpg";
import img79 from "@/assets/NISHATI SAFI CUP/img79.jpg";
import img86 from "@/assets/NISHATI SAFI CUP/img86.jpg";
import img90 from "@/assets/NISHATI SAFI CUP/img90.jpg";
import img92 from "@/assets/NISHATI SAFI CUP/img92.jpg";

// Split images into two groups for side-by-side slideshows
const leftSlides = [img54, img56, img58, img65, img67, img75, img216];
const rightSlides = [img77, img79, img86, img90, img92, img204, img120, img239];

interface MiniSlideshowProps {
  images: string[];
  intervalMs?: number;
  label: string;
}

const MiniSlideshow = ({ images, intervalMs = 3500, label }: MiniSlideshowProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [images.length, intervalMs]);

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md bg-foreground">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${label} - photo ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-300 ${
              i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((node) =>
              node.classList.add("is-visible")
            );
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-kicker reveal">Our Impact</span>
          <h2 className="section-heading reveal" style={{ transitionDelay: "80ms" }}>
            Moments That Matter
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto reveal" style={{ transitionDelay: "160ms" }}>
            Official photography from the Samatta Nishati Safi Cup and Foundation community events.
          </p>
        </div>

        {/* Two side-by-side automatic slideshows */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <MiniSlideshow images={leftSlides} intervalMs={3500} label="Nishati Safi Cup - Gallery A" />
          <MiniSlideshow images={rightSlides} intervalMs={4200} label="Nishati Safi Cup - Gallery B" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
