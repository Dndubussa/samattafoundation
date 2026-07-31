import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
      "Through the Clean Cooking Energy Campaign, the Foundation equips food vendors and households with clean equipment. SRHR education and hospital donations of oxygen cylinders, wheelchairs, and mattresses support underserved facilities.",
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

const SLIDE_MS = 5000;

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide]     = useState(0);
  const [visible, setVisible] = useState(false);

  const go = useCallback(() => {
    setSlide(s => (s + 1) % sportsSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(go, SLIDE_MS);
    return () => clearInterval(t);
  }, [go]);

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
    <section ref={sectionRef} id="programs" className="relative overflow-hidden py-24">

      {/* ── Full-bleed background images (object-cover — no empty space) ── */}
      {sportsSlides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          style={{
            opacity: i === slide ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.4,0,0.2,1)",
            willChange: "opacity",
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Dark overlay for readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(5,10,28,0.82) 0%, rgba(5,10,28,0.72) 60%, rgba(5,10,28,0.80) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Centered header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-amber-400 mb-4">
            <span className="block h-px w-6 bg-amber-400/50" />
            Our Focus Areas
            <span className="block h-px w-6 bg-amber-400/50" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white mb-4 leading-tight">
            Creating Lasting Impact
          </h2>
          <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Four interconnected pillars that build pathways for Tanzania's youth to reach their full potential.
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            View all programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── 2-column pillar list ── */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {pillars.map((p, idx) => (
            <div
              key={p.number}
              className={`py-8 ${
                idx < 2 ? "md:border-b border-white/10" : ""
              } ${
                idx % 2 === 0 ? "md:border-r md:pr-12 border-white/10" : "md:pl-12"
              } border-b border-white/10 last:border-b-0 md:last:border-b-0`}
            >
              {/* Number + title */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[0.65rem] font-black tracking-widest text-white/30 select-none flex-shrink-0">
                  {p.number}
                </span>
                <h3 className="font-heading text-lg font-bold text-white leading-tight">
                  {p.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[0.84rem] text-white/65 leading-relaxed mb-4 ml-7">
                {p.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-2 ml-7">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.79rem] text-white/75">
                    <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Slide dots ── */}
        <div
          className={`flex justify-center gap-2 mt-12 transition-all duration-700 delay-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {sportsSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Background image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === slide
                  ? "w-6 h-1.5 bg-amber-400"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
