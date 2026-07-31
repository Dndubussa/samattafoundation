import { useState, useEffect, useRef, useCallback } from "react";

import img120 from "@/assets/NISHATI SAFI CUP/img120.jpg";
import img204 from "@/assets/NISHATI SAFI CUP/img204.jpg";
import img216 from "@/assets/NISHATI SAFI CUP/img216.jpg";
import img239 from "@/assets/NISHATI SAFI CUP/img239.jpg";
import img54  from "@/assets/NISHATI SAFI CUP/img54.jpg";
import img56  from "@/assets/NISHATI SAFI CUP/img56.jpg";
import img58  from "@/assets/NISHATI SAFI CUP/img58.jpg";
import img65  from "@/assets/NISHATI SAFI CUP/img65.jpg";
import img67  from "@/assets/NISHATI SAFI CUP/img67.jpg";
import img75  from "@/assets/NISHATI SAFI CUP/img75.jpg";
import img77  from "@/assets/NISHATI SAFI CUP/img77.jpg";
import img79  from "@/assets/NISHATI SAFI CUP/img79.jpg";
import img86  from "@/assets/NISHATI SAFI CUP/img86.jpg";
import img90  from "@/assets/NISHATI SAFI CUP/img90.jpg";
import img92  from "@/assets/NISHATI SAFI CUP/img92.jpg";

/* High-res images first so they're featured in the spotlight cards */
const slides = [
  img120, img239,
  img56, img58, img67, img75, img79,
  img86, img90, img204, img65, img77,
  img92, img54, img216,
];

const INTERVAL_MS = 5000;

const Gallery = () => {
  const [featured, setFeatured]   = useState(0);
  const [paused,   setPaused]     = useState(false);
  const [visible,  setVisible]    = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setFeatured(c => (c + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => go(1), INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, go]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: "hsl(230 78% 8%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft ambient orb */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(205 70% 50%) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div>
            <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-amber-400 mb-3">
              <span className="block h-px w-6 bg-amber-400/50" />
              Our Impact
            </span>
            <h2 className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
              Moments That Matter
            </h2>
            <p className="text-white/50 text-sm mt-2 max-w-md">
              Official photography from the Samatta Nishati Safi Cup and Foundation community events.
            </p>
          </div>

          {/* Counter only */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-white/40 text-xs font-mono tracking-widest tabular-nums">
              {String(featured + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Card grid layout ── */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {slides.map((src, i) => {
            const isActive = i === featured;
            return (
              <button
                key={i}
                onClick={() => setFeatured(i)}
                aria-label={`View image ${i + 1}`}
                className={`group relative overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 transition-all duration-300 ${
                  isActive
                    ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-[hsl(230_78%_8%)] shadow-[0_0_28px_hsl(38_95%_48%/0.4)]"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={src}
                  alt={`Gallery moment ${i + 1}`}
                  loading={i < 4 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    willChange: "transform",
                    imageRendering: "high-quality" as React.CSSProperties["imageRendering"],
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                {/* Active amber badge */}
                {isActive && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_hsl(38_95%_48%)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Progress bar ── */}
        <div className="mt-4 h-px bg-white/10 w-full overflow-hidden">
          <div
            key={`${featured}-${paused}`}
            className="h-full bg-amber-400 rounded-full"
            style={{
              animation: paused ? "none" : `galleryProgress ${INTERVAL_MS}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes galleryProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
