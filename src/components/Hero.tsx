import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AnimatedWords from "@/components/AnimatedWords";
import samattaPortrait from "@/assets/SAMATTA.png";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.querySelectorAll(".reveal-hero").forEach((node, i) => {
        setTimeout(() => node.classList.add("is-visible"), i * 150);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[88svh] overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, hsl(230 78% 10%) 0%, hsl(230 78% 16%) 50%, hsl(205 70% 20%) 100%)",
      }}
    >
      {/* ── Decorative background elements ── */}
      {/* Large soft glow orb — top-left */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(205 70% 50%) 0%, transparent 70%)",
        }}
      />
      {/* Medium glow orb — right side, behind portrait */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[560px] h-[560px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, hsl(230 70% 40%) 0%, transparent 70%)",
        }}
      />



      {/* ── Main content grid ── */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl flex-1 flex items-center pt-[130px] md:pt-[148px] pb-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-0 lg:gap-8 items-end min-h-[calc(88svh-148px)]">

          {/* ── LEFT COLUMN — Text ── */}
          <div className="flex flex-col justify-center py-10 lg:py-16 lg:pr-8">

            {/* Kicker */}
            <div className="reveal-hero opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-[0ms] [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-amber-400/60 block" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.35em]">
                Samatta Foundation
              </span>
              <span className="h-px w-8 bg-amber-400/60 block" />
            </div>

            {/* Headline */}
            <h1 className="reveal-hero opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem] font-heading font-black tracking-tight text-white leading-[1.08] mb-6">
              Empowering Youth<br />Through{" "}
              <AnimatedWords
                words={["Sports", "Education", "Community", "Dreams"]}
                className="text-amber-400"
              />
            </h1>

            {/* Body */}
            <p className="reveal-hero opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 text-base md:text-lg text-white/75 leading-relaxed max-w-xl mb-10">
              The Samatta Foundation is driven by the belief that every
              Tanzanian youth deserves the chance to live a healthy, dignified,
              and empowered life — through sports, education, health, and
              community relief.
            </p>

            {/* CTA buttons */}
            <div className="reveal-hero opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-[300ms] [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 text-gray-900 font-bold text-sm tracking-wide shadow-[0_4px_24px_hsl(38_95%_48%/0.45)] hover:bg-amber-300 hover:shadow-[0_6px_32px_hsl(38_95%_48%/0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                Support Our Mission
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-semibold text-sm tracking-wide hover:bg-white/10 hover:border-white/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>


          </div>

          {/* ── RIGHT COLUMN — Portrait ── */}
          <div className="reveal-hero opacity-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[200ms] [&.is-visible]:opacity-100 relative flex items-end justify-center lg:justify-end h-full min-h-[380px] lg:min-h-0">

            {/* Glow halo behind the figure */}
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[85%] rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at bottom, hsl(205 70% 55%) 0%, transparent 65%)",
                filter: "blur(40px)",
              }}
            />

            {/* Bottom accent bar */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 rounded-full opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(38 95% 48%), hsl(230 78% 60%), transparent)",
              }}
            />

            {/* Portrait image — object-contain preserves full image, no crop */}
            <img
              src={samattaPortrait}
              alt="Mbwana Samatta — Founder, Samatta Foundation"
              className="relative z-10 w-auto max-w-full h-auto max-h-[92svh] lg:max-h-[calc(100svh-40px)] object-contain object-bottom select-none"
              style={{
                filter:
                  "drop-shadow(0 0 48px hsl(205 70% 50% / 0.35)) drop-shadow(0 24px 48px hsl(230 78% 10% / 0.6))",
              }}
              fetchPriority="high"
              decoding="async"
            />
          </div>

        </div>
      </div>


    </section>
  );
};

export default Hero;
