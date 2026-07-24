import { useEffect, useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Identify",
    description:
      "We reach underserved communities across Tanzania to identify youth with potential and passion for change.",
  },
  {
    step: "02",
    title: "Engage",
    description:
      "Through programs like the Samatta Cup, we engage youth in structured sports, mentorship, and life-skills workshops.",
  },
  {
    step: "03",
    title: "Develop",
    description:
      "We provide coaching, educational support, health awareness, and tools for holistic personal growth.",
  },
  {
    step: "04",
    title: "Empower",
    description:
      "Youth graduate as leaders, role models, and advocates for positive change in their communities and beyond.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal, .reveal-from-left").forEach((node, i) => {
              setTimeout(() => node.classList.add("is-visible"), i * 80);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(230 78% 10%) 0%, hsl(230 78% 15%) 60%, hsl(220 60% 14%) 100%)",
      }}
    >
      {/* Soft glow orb top-right */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(205 70% 50%) 0%, transparent 70%)" }}
      />
      {/* Soft glow orb bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(38 95% 48%) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="reveal inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-amber-400 mb-4">
            <span className="block h-px w-6 bg-amber-400/40" />
            Our Approach
            <span className="block h-px w-6 bg-amber-400/40" />
          </span>
          <h2
            className="reveal text-[1.85rem] md:text-[2.5rem] lg:text-[3rem] font-heading font-bold text-white mb-5"
            style={{ transitionDelay: "80ms", letterSpacing: "-0.025em", lineHeight: 1.15 }}
          >
            How We Create Change
          </h2>
          <p
            className="reveal text-white/60 text-base md:text-lg"
            style={{ transitionDelay: "160ms" }}
          >
            A proven pathway from potential to impact, built on the transformative power of sports
            and community.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-px bg-white/10 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="reveal group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Step circle */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 border border-white/15 group-hover:border-amber-400/50 transition-colors duration-300"
                    style={{ background: "hsl(230 78% 18%)" }}
                  >
                    <span className="font-heading font-black text-lg text-amber-400">
                      {step.step}
                    </span>
                  </div>
                  {/* Mobile connector */}
                  {index < steps.length - 1 && (
                    <div className="sm:hidden flex-1 h-px bg-white/10" />
                  )}
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/55 leading-relaxed text-sm">{step.description}</p>

                {/* Amber underline on hover */}
                <div className="mt-5 h-0.5 w-0 bg-amber-400 rounded-full group-hover:w-10 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
