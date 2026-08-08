import { useEffect, useRef, useState } from "react";

// ── NISHATI SAFI CUP ────────────────────────────────────────────────────────
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

// ── SPORTS ───────────────────────────────────────────────────────────────────
import sp1 from "@/assets/SPORTS/SPORTS (1).jpeg";
import sp2 from "@/assets/SPORTS/SPORTS (2).jpeg";
import sp3 from "@/assets/SPORTS/SPORTS (3).jpeg";
import sp4 from "@/assets/SPORTS/SPORTS (4).jpeg";
import sp5 from "@/assets/SPORTS/SPORTS (5).jpeg";
import sp6 from "@/assets/SPORTS/SPORTS (6).jpeg";
import sp7 from "@/assets/SPORTS/SPORTS (7).jpeg";

// ── NIFUATE IMAGES (Samakiba 2 was deleted) ─────────────────────────────────
import nif1 from "@/assets/NIFUATE IMAGES/Samakiba (1).jpeg";
import nif3 from "@/assets/NIFUATE IMAGES/Samakiba (3).jpeg";
import nif4 from "@/assets/NIFUATE IMAGES/Samakiba (4).jpeg";
import nif5 from "@/assets/NIFUATE IMAGES/Samakiba (5).jpeg";

// ── GALLERY EVENTS ───────────────────────────────────────────────────────────
import ev1 from "@/assets/gallery/event-1.jpg";
import ev2 from "@/assets/gallery/event-2.jpg";
import ev3 from "@/assets/gallery/event-3.jpg";
import ev4 from "@/assets/gallery/event-4.jpg";
import ev5 from "@/assets/gallery/event-5.jpg";
import ev6 from "@/assets/gallery/event-6.jpg";

// ── Row assignments: mix images across all 3 rows ────────────────────────────
const row1 = [img120, sp1, nif3, img239, ev1, img56, sp4, img79, nif4, img86, ev4];
const row2 = [sp2,  img67, ev2, nif1,  sp5, img75, img90, ev5, img58, sp7, img204];
const row3 = [sp3,  img92, ev3, nif5,  sp6, img77, img65, ev6, img54, img216, img86];

// Duplicate each row for seamless infinite loop
const mkTrack = (imgs: string[]) => [...imgs, ...imgs];

const CARD_HEIGHT = 200; // px
const CARD_ASPECT = "4/3";
const GAP = 10; // px

/** One infinite-scrolling ticker row */
const TickerRow = ({
  images,
  reverse,
  duration,
  paused,
}: {
  images: string[];
  reverse?: boolean;
  duration: number;
  paused: boolean;
}) => {
  const track = mkTrack(images);
  return (
    <div className="overflow-hidden select-none" style={{ height: CARD_HEIGHT }}>
      <div
        className="flex"
        style={{
          gap: GAP,
          width: "max-content",
          animation: `${reverse ? "tickerRight" : "tickerLeft"} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {track.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden rounded-xl"
            style={{ height: CARD_HEIGHT, aspectRatio: CARD_ASPECT }}
          >
            <img
              src={src}
              alt={`Gallery moment ${(i % images.length) + 1}`}
              loading={i < 6 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover"
              style={{ willChange: "transform" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused]   = useState(false);

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
      id="gallery"
      className="py-20 relative overflow-hidden"
      style={{ background: "hsl(230 78% 8%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient orb */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(205 70% 50%) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="inline-flex items-center justify-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-amber-400 mb-3">
            <span className="block h-px w-6 bg-amber-400/50" />
            Our Impact
            <span className="block h-px w-6 bg-amber-400/50" />
          </span>
          <h2 className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
            Moments That Matter
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Official photography from the Samatta Nishati Safi Cup, SamaKiba Nifuate, and Foundation community events across Tanzania.
          </p>
        </div>
      </div>

      {/* Full-width ticker rows — overflow intentionally bleeds past container */}
      <div
        className={`flex flex-col gap-3 transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <TickerRow images={row1} duration={40} paused={paused} />
        <TickerRow images={row2} reverse duration={34} paused={paused} />
        <TickerRow images={row3} duration={46} paused={paused} />
      </div>

      {/* Hint */}
      <p className="text-center text-white/25 text-xs mt-8 tracking-widest uppercase">
        Hover to pause &nbsp;·&nbsp; {row1.length + row2.length + row3.length} moments captured
      </p>

      <style>{`
        @keyframes tickerLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tickerRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
