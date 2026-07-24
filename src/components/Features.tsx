import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Dumbbell, BookOpen, HeartPulse, Users, ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Dumbbell,
    accent: "text-amber-500",
    dotColor: "bg-amber-400",
    borderActive: "border-amber-400/60",
    title: "Youth & Sports Development",
    tag: "Football for Impact",
    description:
      "Through the Samatta Nishati Safi Cup - a tournament featuring 35 teams across 85 matches - the Foundation identifies talent in youth aged 15-25 and provides professional coaching, structured competition, and mentorship to shape future leaders.",
    bullets: [
      "35-team Samatta Cup tournament",
      "Talent identification pathways",
      "Life-skills & leadership workshops",
    ],
  },
  {
    number: "02",
    icon: BookOpen,
    accent: "text-blue-500",
    dotColor: "bg-blue-400",
    borderActive: "border-blue-400/60",
    title: "Education Support",
    tag: "Opening Doors",
    description:
      "The Foundation actively supports school-going children from vulnerable backgrounds across Tanzania - providing school fees, investing in children's centres, and running awareness initiatives that champion academic excellence and equal access to learning.",
    bullets: [
      "School fee support for vulnerable families",
      "Children's centres & learning spaces",
      "Inclusive education advocacy",
    ],
  },
  {
    number: "03",
    icon: HeartPulse,
    accent: "text-rose-500",
    dotColor: "bg-rose-400",
    borderActive: "border-rose-400/60",
    title: "Health & Wellbeing",
    tag: "Healthier Communities",
    description:
      "The Clean Cooking Energy Campaign equips food vendors and households with clean cooking equipment, reducing harmful indoor emissions. The Foundation also runs SRHR education and donates hospital equipment - oxygen cylinders, wheelchairs, and mattresses - to underserved facilities.",
    bullets: [
      "Clean Cooking Energy Campaign",
      "SRHR education for youth & families",
      "Hospital equipment donations",
    ],
  },
  {
    number: "04",
    icon: Users,
    accent: "text-emerald-600",
    dotColor: "bg-emerald-400",
    borderActive: "border-emerald-400/60",
    title: "Social Inclusion & Advocacy",
    tag: "Dignity for All",
    description:
      "Since its founding, the Foundation has been a strong voice against discrimination of People Living with Disabilities and people with albinism. Through advocacy, wheelchair donations, hydrocephalus care, and inclusive programming, it works to dismantle systemic barriers across Tanzania.",
    bullets: [
      "Advocacy for persons with albinism & disabilities",
      "Wheelchair & hydrocephalus care programmes",
      "UN Tourism Special Recognition",
    ],
  },
];

const CARD_INTERVAL = 4500;

const Features = () => {
  const sectionRef     = useRef<HTMLElement>(null);
  const [active, setActive]       = useState(0);
  const [dir, setDir]             = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible]     = useState(false);
  const [paused, setPaused]       = useState(false);

  /* Scroll reveal */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir("next");
      setAnimating(true);
      setTimeout(() => {
        setActive(a => (a + 1) % features.length);
        setAnimating(false);
      }, 320);
    }, CARD_INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const goTo = (idx: number) => {
    if (idx === active || animating) return;
    setDir(idx > active ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 320);
  };

  const step = (d: 1 | -1) => {
    const next = (active + d + features.length) % features.length;
    goTo(next);
  };

  const f = features[active];
  const Icon = f.icon;

  const slideClass = animating
    ? dir === "next"
      ? "translate-x-6 opacity-0"
      : "-translate-x-6 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="py-24 bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* Section header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 transition-all duration-700 ${
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
          <div className="flex-shrink-0">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-200"
            >
              View all programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tab buttons */}
        <div
          className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {features.map((feat, i) => {
            const TabIcon = feat.icon;
            const isActive = i === active;
            return (
              <button
                key={feat.number}
                onClick={() => goTo(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? `bg-foreground text-white border-foreground shadow-md scale-[1.03]`
                    : "bg-card border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-white" : feat.accent}`} strokeWidth={2} />
                <span className="hidden sm:inline">{feat.number}</span>
                <span className="hidden md:inline text-xs">
                  {feat.title.split(" ").slice(0, 2).join(" ")}
                </span>
              </button>
            );
          })}

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => step(-1)}
              aria-label="Previous pillar"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-all duration-200"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => step(1)}
              aria-label="Next pillar"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-all duration-200"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Animated content card */}
        <div
          className={`transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div
            className={`bg-card border ${f.borderActive} rounded-2xl p-7 md:p-10 shadow-sm transition-all duration-300 ease-out ${slideClass}`}
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">

              {/* Left: content */}
              <div>
                {/* Icon + number row */}
                <div className="flex items-center gap-3 mb-5">
                  <Icon className={`w-6 h-6 ${f.accent}`} strokeWidth={1.75} />
                  <span className={`text-[0.7rem] font-black uppercase tracking-[0.35em] ${f.accent} opacity-50`}>
                    {f.number}
                  </span>
                </div>

                <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground leading-tight mb-1">
                  {f.title}
                </h3>
                <p className={`text-[0.72rem] font-semibold uppercase tracking-widest mb-5 ${f.accent}`}>
                  {f.tag}
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6 max-w-xl">
                  {f.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-foreground/80">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.dotColor}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: large ghost number */}
              <div
                className="hidden md:flex items-center justify-center select-none pointer-events-none"
                aria-hidden
              >
                <span
                  className={`text-[7rem] lg:text-[9rem] font-black leading-none ${f.accent} opacity-[0.07]`}
                >
                  {f.number}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-8 h-px bg-border w-full overflow-hidden">
              <div
                key={`${active}-${paused}`}
                className={`h-full rounded-full ${f.dotColor}`}
                style={{
                  animation: paused ? "none" : `featProgress ${CARD_INTERVAL}ms linear forwards`,
                }}
              />
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to pillar ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? `w-6 h-1.5 ${features[active].dotColor}`
                    : "w-1.5 h-1.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes featProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Features;
