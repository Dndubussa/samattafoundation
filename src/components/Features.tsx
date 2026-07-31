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

const PillarItem = ({
  p,
  borderBottom,
  alignRight,
}: {
  p: (typeof pillars)[0];
  borderBottom?: boolean;
  alignRight?: boolean;
}) => (
  <div
    className={`py-7 flex-1 ${borderBottom ? "border-b border-border" : ""} ${
      alignRight ? "text-right" : ""
    }`}
  >
    <div
      className={`flex items-baseline gap-3 mb-2 ${
        alignRight ? "flex-row-reverse" : ""
      }`}
    >
      <span className="text-[0.68rem] font-black tracking-widest text-foreground/25 select-none">
        {p.number}
      </span>
      <h3 className="font-heading text-base font-bold text-foreground leading-tight">
        {p.title}
      </h3>
    </div>
    <p className="text-[0.82rem] text-muted-foreground leading-relaxed mb-4">
      {p.description}
    </p>
    <ul className={`space-y-1.5 ${alignRight ? "items-end" : ""}`}>
      {p.items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-2 text-[0.78rem] text-foreground/80 ${
            alignRight ? "flex-row-reverse" : ""
          }`}
        >
          <span className="w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0 mt-1.5" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide]     = useState(0);
  const [visible, setVisible] = useState(false);

  const go = useCallback(() => {
    setSlide(s => (s + 1) % sportsSlides.length);
  }, []);

  /* Auto-slide only — no arrows */
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
    <section ref={sectionRef} id="programs" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Centered header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="section-kicker">Our Focus Areas</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-foreground mb-3">
            Creating Lasting Impact
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-5">
            Four interconnected pillars that build pathways for Tanzania's youth to reach their full potential.
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-foreground font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            View all programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── 3-column: [01+03] | [image] | [02+04] ── */}
        <div
          className={`transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Desktop 3-col */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_300px_1fr] gap-x-8 items-stretch">

            {/* Left: 01 + 03 */}
            <div className="flex flex-col">
              <PillarItem p={pillars[0]} borderBottom />
              <PillarItem p={pillars[2]} />
            </div>

            {/* Center: image slideshow — object-contain, full image visible */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-100/80 shadow-md">
              {sportsSlides.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Sports moment ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    opacity: i === slide ? 1 : 0,
                    transition: "opacity 1.1s cubic-bezier(0.4,0,0.2,1)",
                    willChange: "opacity",
                  }}
                />
              ))}

              {/* Dot indicators only */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                {sportsSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === slide
                        ? "w-4 h-1.5 bg-foreground"
                        : "w-1.5 h-1.5 bg-foreground/25 hover:bg-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: 02 + 04 */}
            <div className="flex flex-col">
              <PillarItem p={pillars[1]} borderBottom alignRight />
              <PillarItem p={pillars[3]} alignRight />
            </div>
          </div>

          {/* Mobile: single column list + image strip */}
          <div className="lg:hidden space-y-0">
            {/* Image */}
            <div
              className="relative rounded-2xl overflow-hidden bg-neutral-100/80 shadow-md mb-8"
              style={{ aspectRatio: "16/9" }}
            >
              {sportsSlides.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Sports moment ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    objectFit: "contain",
                    opacity: i === slide ? 1 : 0,
                    transition: "opacity 1.1s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              ))}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                {sportsSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === slide ? "w-4 h-1.5 bg-foreground" : "w-1.5 h-1.5 bg-foreground/25"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Pillars stacked */}
            {pillars.map((p, idx) => (
              <PillarItem
                key={p.number}
                p={p}
                borderBottom={idx < pillars.length - 1}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
