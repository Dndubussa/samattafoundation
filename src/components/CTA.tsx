import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal, .counter-reveal").forEach((node, i) => {
              setTimeout(() => node.classList.add("is-visible"), i * 70);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, hsl(38 95% 42%) 0%, hsl(38 90% 35%) 30%, hsl(230 78% 20%) 65%, hsl(230 78% 12%) 100%)",
      }}
    >
      {/* Glow orb top-left (amber) */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(38 95% 55%) 0%, transparent 65%)" }}
      />
      {/* Glow orb bottom-right (navy) */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, hsl(205 70% 45%) 0%, transparent 65%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">

            {/* Left - headline */}
            <div className="relative">
              <span className="pointer-events-none absolute -top-6 -left-4 text-[7rem] md:text-[8rem] leading-none font-black text-white/5 select-none">
                "
              </span>
              <span className="reveal inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-white/70 mb-5">
                <span className="block h-px w-6 bg-white/40" />
                Make a Difference
              </span>
              <h2
                className="reveal text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight"
                style={{ transitionDelay: "80ms" }}
              >
                Join Us in{" "}
                <span className="text-amber-300">Transforming</span>{" "}
                Lives Across Tanzania
              </h2>
            </div>

            {/* Right - body + buttons */}
            <div>
              <p
                className="reveal text-base md:text-lg text-white/75 mb-8 leading-relaxed"
                style={{ transitionDelay: "160ms" }}
              >
                Your support helps the Samatta Foundation expand football development, education,
                health, sustainability, and community programs - making Tanzania's youth unstoppable.
              </p>

              <div
                className="reveal flex flex-col sm:flex-row gap-4"
                style={{ transitionDelay: "240ms" }}
              >
                <Button
                  size="lg"
                  className="rounded-full bg-white text-gray-900 font-bold hover:bg-amber-100 shadow-[0_4px_24px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.35)] hover:scale-[1.03] transition-all duration-200 w-full sm:w-auto"
                  asChild
                >
                  <Link to="/donate">
                    Support Our Mission
                    <ArrowRight className="ml-1.5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200 w-full sm:w-auto"
                  asChild
                >
                  <Link to="/volunteer">Become a Volunteer</Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div
                className="reveal mt-8 flex flex-wrap gap-4 md:gap-6 text-sm text-white/55"
                style={{ transitionDelay: "320ms" }}
              >
                {["100% Transparent", "UN Tourism Recognition", "Secure Donations"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
