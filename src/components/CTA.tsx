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
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">


          {/* CTA content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - headline */}
            <div>
              <span className="section-kicker reveal">Make a Difference</span>
              <h2
                className="reveal text-3xl md:text-4xl lg:text-5xl font-heading font-black text-foreground leading-tight mb-0"
                style={{ transitionDelay: "80ms" }}
              >
                Join Us in{" "}
                <span className="text-primary">Transforming</span>{" "}
                Lives Across Tanzania
              </h2>
            </div>

            {/* Right - body + buttons */}
            <div>
              <p
                className="reveal text-lg text-muted-foreground mb-8 leading-relaxed"
                style={{ transitionDelay: "160ms" }}
              >
                Your support helps the Samatta Foundation expand football development, education,
                health, sustainability, and community programs - making Tanzania's youth unstoppable.
              </p>

              <div
                className="reveal flex flex-col sm:flex-row gap-4"
                style={{ transitionDelay: "240ms" }}
              >
                <Button variant="hero" size="lg" className="group" asChild>
                  <Link to="/donate">
                    Support Our Mission
                    <ArrowRight className="ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/volunteer">Become a Volunteer</Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div
                className="reveal mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground"
                style={{ transitionDelay: "320ms" }}
              >
                {["100% Transparent", "UN Tourism Recognition", "Secure Donations"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
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
