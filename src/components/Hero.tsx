import { useEffect, useRef } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import heroBg from "@/assets/SAMATTA.png";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.querySelectorAll(".reveal-hero").forEach((node, i) => {
        setTimeout(() => node.classList.add("is-visible"), i * 150);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#FAFAF8] pt-[160px] md:pt-[200px] pb-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Magazine-style Text Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-20">


          <h1 className="reveal-hero opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 text-4xl md:text-5xl lg:text-[4rem] font-heading font-black tracking-tight text-foreground leading-[1.1] mb-6">
            Empowering Youth<br />Through{" "}
            <AnimatedWords
              words={["Sports", "Education", "Community", "Dreams"]}
              className="text-secondary"
            />
          </h1>

          <p className="reveal-hero opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-200 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
            The Samatta Foundation is driven by the belief that every Tanzanian youth deserves the chance to live a healthy, dignified, and empowered life. Through our core pillars-sports and talent development, education and inclusion, health and wellbeing, and community relief-we invest in the future by providing pathways for young athletes, educational support for vulnerable children, and essential resources to underserved communities. Each initiative is rooted in compassion and a deep commitment to creating lasting change, empowering one life, one family, and one community at a time.
          </p>
        </div>

        {/* Ultra-wide Image Layout */}
        <div className="reveal-hero mx-auto max-w-4xl opacity-0 scale-95 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 [&.is-visible]:opacity-100 [&.is-visible]:scale-100 relative w-full aspect-[16/9] md:aspect-[2/1] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          <img
            src={heroBg}
            alt="Samatta Foundation - Youth playing football in Tanzania"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
            fetchPriority="high"
            decoding="async"
          />
          {/* Subtle gradient overlay to make it feel premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent mix-blend-multiply pointer-events-none" />
          
          {/* Bottom decorative bar */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-primary to-secondary opacity-90" />
        </div>

      </div>
    </section>
  );
};

export default Hero;
