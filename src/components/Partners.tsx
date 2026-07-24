import { useEffect, useRef } from "react";
import chapchapLogo from "@/assets/partners/chapchap-point.jpeg";
import gbbLogo from "@/assets/partners/gbb-insurance.jpeg";
import asasLogo from "@/assets/partners/asas.png";
import oryxLogo from "@/assets/partners/oryx-energies.png";
import sofascoreLogo from "@/assets/partners/sofascore.png";
import governmentLogo from "@/assets/partners/Government.jpeg";

const partners = [
  { name: "Government of Tanzania", logo: governmentLogo },
  { name: "Chap Chap Point", logo: chapchapLogo },
  { name: "GBB Insurance", logo: gbbLogo },
  { name: "ASAS", logo: asasLogo },
  { name: "Oryx Energies", logo: oryxLogo },
  { name: "Sofascore", logo: sofascoreLogo },
];

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Duplicate for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((node, i) => {
              setTimeout(() => node.classList.add("is-visible"), i * 60);
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
    <section ref={sectionRef} className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4 mb-10">
        <p className="reveal text-center text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
          Our Partners, Sponsors &amp; Collaborators
        </p>
      </div>

      {/* Infinite scroll ticker - pauses on hover via CSS */}
      <div className="relative overflow-hidden ticker-container">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{background: "linear-gradient(to right, hsl(var(--background)), transparent)"}} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{background: "linear-gradient(to left, hsl(var(--background)), transparent)"}} />

        <div className="flex animate-slide-left">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                title={partner.name}
                className="h-12 md:h-14 w-auto object-contain transition-all duration-400"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};

export default Partners;
