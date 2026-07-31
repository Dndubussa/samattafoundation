import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import sports1 from "@/assets/SPORTS/SPORTS (1).jpeg";
import sports2 from "@/assets/SPORTS/SPORTS (2).jpeg";
import sports3 from "@/assets/SPORTS/SPORTS (3).jpeg";
import sports4 from "@/assets/SPORTS/SPORTS (4).jpeg";
import sports5 from "@/assets/SPORTS/SPORTS (5).jpeg";
import sports6 from "@/assets/SPORTS/SPORTS (6).jpeg";
import sports7 from "@/assets/SPORTS/SPORTS (7).jpeg";

const sportsSlides = [sports1, sports2, sports3, sports4, sports5, sports6, sports7];

const pillars = [
  {
    number: "01",
    title: "Youth & Sports Development",
    description:
      "The Samatta Nishati Safi Cup brings together 35 teams across 85 competitive matches, identifying talent in youth aged 15-25 and providing professional coaching, structured competition, and mentorship pathways.",
    items: [
      "35-team Samatta Cup tournament with 85 matches",
      "Talent identification and professional coaching",
      "Life-skills and leadership mentorship workshops",
    ],
  },
  {
    number: "02",
    title: "Education Support",
    description:
      "The Foundation supports school-going children from vulnerable backgrounds across Tanzania - covering school fees, investing in children's centres, and running awareness campaigns that champion equal access to quality learning.",
    items: [
      "School fee support for vulnerable families",
      "Children's centres and dedicated learning spaces",
      "Inclusive education advocacy campaigns",
    ],
  },
  {
    number: "03",
    title: "Health & Wellbeing",
    description:
      "Through the Clean Cooking Energy Campaign, the Foundation equips food vendors and households with clean equipment. SRHR education and donations of oxygen cylinders, wheelchairs, and hospital mattresses support underserved facilities.",
    items: [
      "Clean Cooking Energy Campaign for households",
      "SRHR education for youth and families",
      "Hospital equipment donations - oxygen, wheelchairs",
    ],
  },
  {
    number: "04",
    title: "Social Inclusion & Advocacy",
    description:
      "A strong voice against discrimination of People Living with Disabilities and people with albinism. The Foundation uses advocacy, inclusive programming, and direct support to dismantle systemic barriers across Tanzania.",
    items: [
      "Advocacy for persons with albinism and disabilities",
      "Wheelchair and hydrocephalus care programmes",
      "UN Tourism Special Recognition Award",
    ],
  },
];

const SLIDE_MS = 4500;

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide]     = useState(0);
  const [paused, setPaused]   = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((d: 1 | -1) => {
    setSlide(s => (s + d + sportsSlides.length) % sportsSlides.length);
  }, []);

  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => go(1), SLIDE_MS);
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
      id="programs"
      className="py-24 bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="max-w-xl">
            <span className="section-kicker">Our Focus Areas</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-foreground mb-3">
              Creating Lasting Impact
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Four interconnected pillars that build pathways for Tanzania's youth to reach their full potential.
            </p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-foreground font-bold text-sm hover:gap-3 transition-all duration-200 flex-shrink-0"
          >
            View all programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Main grid: image left, lists right ── */}
        <div
          className={`grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Left: sports image slideshow */}
          <div
            className="relative overflow-hidden rounded-2xl shadow-md bg-foreground sticky top-24"
            style={{ aspectRatio: "4/5" }}
          >
            {sportsSlides.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Samatta Foundation sports - ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: i === slide ? 1 : 0,
                  transition: "opacity 1s cubic-bezier(0.4,0,0.2,1)",
                  willChange: "opacity",
                }}
              />
            ))}

            {/* Arrows */}
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {sportsSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === slide ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-3 right-3 z-10 bg-black/50 rounded-full px-2.5 py-0.5 text-white text-xs font-mono">
              {slide + 1} / {sportsSlides.length}
            </div>
          </div>

          {/* Right: two-column pillar lists */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
            {pillars.map((p, idx) => (
              <div
                key={p.number}
                className={`py-7 ${
                  idx < pillars.length - 2 ? "border-b border-border" : ""
                } ${idx % 2 === 0 && idx < pillars.length - 1 ? "sm:border-r sm:pr-8 sm:border-border" : "sm:pl-8"}`}
              >
                {/* Number + title */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[0.68rem] font-black tracking-widest text-foreground/25 select-none">
                    {p.number}
                  </span>
                  <h3 className="font-heading text-base font-bold text-foreground leading-tight">
                    {p.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[0.82rem] text-muted-foreground leading-relaxed mb-4">
                  {p.description}
                </p>

                {/* Bullet list */}
                <ul className="space-y-1.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[0.78rem] text-foreground/80">
                      <span className="w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
