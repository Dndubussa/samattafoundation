import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

const Features = () => {
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
    <section ref={sectionRef} id="programs" className="py-24" style={{ background: "#f4f5f7" }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Centered header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <span className="section-kicker">Our Focus Areas</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-foreground mb-4 leading-tight">
            Creating Lasting Impact
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6">
            Four interconnected pillars that build pathways for Tanzania's youth to reach their full potential.
          </p>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-foreground font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            View all programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2-column pillar list */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {pillars.map((p, idx) => (
            <div
              key={p.number}
              className={`py-8 ${idx < 2 ? "border-b border-border" : ""} ${
                idx % 2 === 0 ? "md:border-r md:pr-12 border-border" : "md:pl-12"
              } border-b border-border last:border-b-0 md:[&:nth-child(even):last-child]:border-b-0`}
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[0.65rem] font-black tracking-widest text-foreground/25 select-none flex-shrink-0">
                  {p.number}
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                  {p.title}
                </h3>
              </div>
              <p className="text-[0.84rem] text-muted-foreground leading-relaxed mb-4 ml-7">
                {p.description}
              </p>
              <ul className="space-y-2 ml-7">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.79rem] text-foreground/75">
                    <span className="w-1 h-1 rounded-full bg-foreground/40 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
