import { useEffect, useRef, useState } from "react";

// ── Auto-discover ALL images in NIFUATE IMAGES folder ────────────────────────
// Adding a new image to the folder is enough — no code change required.
const imageModules = import.meta.glob(
  "/src/assets/NIFUATE IMAGES/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}",
  { eager: true }
) as Record<string, { default: string }>;

const allImages: string[] = Object.values(imageModules)
  .map((m) => m.default)
  .filter(Boolean);

// Distribute images round-robin across 3 rows so they stay balanced
const row1: string[] = [];
const row2: string[] = [];
const row3: string[] = [];
allImages.forEach((img, i) => {
  if (i % 3 === 0) row1.push(img);
  else if (i % 3 === 1) row2.push(img);
  else row3.push(img);
});

// Duplicate track for seamless infinite CSS loop
const mkTrack = (imgs: string[]) => [...imgs, ...imgs];

/** One infinite-scrolling row */
const TickerRow = ({
  images,
  reverse,
  duration,
}: {
  images: string[];
  reverse?: boolean;
  duration: number;
}) => {
  if (!images.length) return null;
  const track = mkTrack(images);
  return (
    <div className="overflow-hidden select-none" style={{ height: 210 }}>
      <div
        className="flex"
        style={{
          gap: 10,
          width: "max-content",
          animation: `${reverse ? "tickerRight" : "tickerLeft"} ${duration}s linear infinite`,
        }}
      >
        {track.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden rounded-xl"
            style={{ height: 210, aspectRatio: "4/3" }}
          >
            <img
              src={src}
              alt={`Gallery moment ${(i % images.length) + 1}`}
              loading={i < 8 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover"
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
    >
      {/* Ambient orb */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(205 70% 50%) 0%, transparent 70%)" }}
      />

      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6">
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

      {/* 3-row ticker — bleeds edge to edge */}
      <div
        className={`flex flex-col gap-3 transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <TickerRow images={row1} duration={38} />
        <TickerRow images={row2} reverse duration={32} />
        <TickerRow images={row3} duration={44} />
      </div>

      {/* Image count hint */}
      <p className="text-center text-white/20 text-xs mt-8 tracking-widest uppercase">
        {allImages.length} moments captured
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
