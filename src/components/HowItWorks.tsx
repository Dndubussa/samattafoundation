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
    <section ref={sectionRef} id="about" className="py-24 bg-[#FAFAF8]">
      {/* Top ruled line */}
      <div className="border-t border-border" />

      <div className="container mx-auto px-4 pt-16">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <span className="section-kicker reveal">Our Approach</span>
          <h2 className="section-heading reveal" style={{ transitionDelay: "80ms" }}>
            How We Create Change
          </h2>
          <p className="text-muted-foreground text-lg reveal" style={{ transitionDelay: "160ms" }}>
            A proven pathway from potential to impact, built on the transformative power of sports
            and community.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-px bg-border z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="reveal group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Step number + connector dot */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full border-2 border-border bg-white flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors duration-300">
                    <span className="font-heading font-black text-lg text-primary">{step.step}</span>
                  </div>
                  {/* Horizontal connector for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex-1 h-px bg-border" />
                  )}
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Gold underline accent on hover */}
                <div className="mt-4 h-0.5 w-0 bg-secondary rounded-full group-hover:w-12 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-border mt-16" />
    </section>
  );
};

export default HowItWorks;
