import { useEffect, useRef } from "react";
import samatta9 from "@/assets/SAMATTA (9).jpg";
import samatta10 from "@/assets/SAMATTA (10).jpg";
import samatta11 from "@/assets/SAMATTA (11).jpg";
import samatta8 from "@/assets/SAMATTA (8).jpg";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const features = [
  {
    number: "01",
    title: "Youth & Sports Development",
    description:
      "Organizing football tournaments, talent identification, and life-skills training through sport - fostering discipline, leadership, and teamwork across Tanzanian communities.",
    image: samatta9,
    imageAlt: "Youth football training in Tanzania",
    className: "md:col-span-2",
  },
  {
    number: "02",
    title: "Education Support",
    description:
      "Providing education awareness initiatives and support for school-going children from vulnerable backgrounds while encouraging academic excellence and equal access.",
    image: samatta10,
    imageAlt: "Education support for Tanzanian children",
    className: "md:col-span-1",
  },
  {
    number: "03",
    title: "Health & Wellbeing",
    description:
      "Running health awareness campaigns and community outreach programs promoting healthy lifestyles, clean energy adoption, and SRHR education for vulnerable families.",
    image: samatta11,
    imageAlt: "Health and wellbeing community outreach",
    className: "md:col-span-1",
  },
  {
    number: "04",
    title: "Social Inclusion",
    description:
      "Advocating for marginalized groups including children with disabilities and people with albinism - promoting dignity, equality, and full participation in society.",
    image: samatta8,
    imageAlt: "Social inclusion advocacy for marginalized groups",
    className: "md:col-span-2",
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal-bento").forEach((node, i) => {
              setTimeout(() => {
                node.classList.add("is-visible");
              }, i * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="section-kicker reveal-bento opacity-0 translate-y-4 transition-all duration-700 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">Our Focus Areas</span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4 reveal-bento opacity-0 translate-y-4 transition-all duration-700 delay-100 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
              Creating Lasting Impact
            </h2>
            <p className="text-muted-foreground text-lg reveal-bento opacity-0 translate-y-4 transition-all duration-700 delay-200 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
              Through sports, education, health, and advocacy, we build pathways for Tanzania's youth
              to reach their full potential.
            </p>
          </div>
          <div className="reveal-bento opacity-0 translate-y-4 transition-all duration-700 delay-300 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
            <Link to="/programs" className="inline-flex items-center text-primary font-bold hover:underline">
              View all programs <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[320px]">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`reveal-bento opacity-0 translate-y-8 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 transition-all duration-1000 group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl ${feature.className}`}
            >
              {/* Image Background */}
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content Container */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                    {feature.title}
                  </h3>
                  <span className="text-xl md:text-3xl font-black text-white/20 select-none">
                    {feature.number}
                  </span>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-[80px] md:h-[60px]">
                  <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>
                </div>
                
                {/* Decorative Line */}
                <div className="h-1 w-12 bg-primary mt-4 rounded-full transform origin-left transition-transform duration-500 group-hover:w-full group-hover:bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

