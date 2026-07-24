import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Dumbbell, BookOpen, HeartPulse, Users, ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Dumbbell,
    accent: "text-amber-500",
    dotColor: "bg-amber-400",
    borderAccent: "border-amber-400/40 hover:border-amber-400/70",
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
    borderAccent: "border-blue-400/40 hover:border-blue-400/70",
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
    borderAccent: "border-rose-400/40 hover:border-rose-400/70",
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
    borderAccent: "border-emerald-400/40 hover:border-emerald-400/70",
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

// Two pairs of cards shown side-by-side
const pairs = [
  [features[0], features[1]],
  [features[2], features[3]],
];

const INTERVAL_MS = 5500;

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [pair, setPair]       = useState(0);
  const [dir, setDir]         = useState<"next" | "prev">("next");
  const [visible, setVisible] = useState(false);
  const [paused, setPaused]   = useState(false);

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
      setPair(p => (p + 1) % pairs.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused]);

  const go = (d: 1 | -1) => {
    setDir(d === 1 ? "next" : "prev");
    setPair(p => (p + d + pairs.length) % pairs.length);
  };

  const animClass =
    dir === "next" ? "animate-slide-from-right" : "animate-slide-from-left";

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

        {/* Card viewport — overflow hidden for slide */}
        <div
          className={`relative overflow-hidden transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Animated pair */}
          <div
            key={pair}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${animClass}`}
          >
            {pairs[pair].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.number}
                  className={`bg-card rounded-2xl border ${f.borderAccent} p-6 md:p-8 flex flex-col gap-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
                >
                  {/* Header row: icon + ghost number */}
                  <div className="flex items-start justify-between">
                    <Icon className={`w-6 h-6 ${f.accent}`} strokeWidth={1.75} />
                    <span className={`text-4xl font-black leading-none select-none ${f.accent} opacity-[0.12]`}>
                      {f.number}
                    </span>
                  </div>

                  {/* Title + tag */}
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-bold text-foreground leading-snug mb-0.5">
                      {f.title}
                    </h3>
                    <p className={`text-[0.7rem] font-semibold uppercase tracking-widest ${f.accent}`}>
                      {f.tag}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[0.83rem] text-muted-foreground leading-relaxed flex-1">
                    {f.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-1.5 pt-3 border-t border-border/60">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-[0.78rem] text-foreground/70">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${f.dotColor}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls: dots + arrows */}
        <div
          className={`flex items-center justify-between mt-8 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {pairs.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > pair ? "next" : "prev"); setPair(i); }}
                aria-label={`Show pair ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === pair
                    ? "w-7 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex-1 mx-6 h-px bg-border overflow-hidden">
            <div
              key={`${pair}-${paused}`}
              className="h-full bg-primary rounded-full"
              style={{
                animation: paused ? "none" : `featProg ${INTERVAL_MS}ms linear forwards`,
              }}
            />
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Previous pair"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground hover:border-foreground/20 active:scale-95 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next pair"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground hover:border-foreground/20 active:scale-95 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideFromRight {
          from { transform: translateX(48px); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        @keyframes slideFromLeft {
          from { transform: translateX(-48px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        .animate-slide-from-right {
          animation: slideFromRight 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-slide-from-left {
          animation: slideFromLeft 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes featProg {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Features;
