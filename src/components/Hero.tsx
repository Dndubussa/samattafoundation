import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedWords from "@/components/AnimatedWords";
import heroBg from "@/assets/gallery/event-6.jpg";

const Hero = () => {
  return (
    <section className="relative flex items-center overflow-hidden pt-24 pb-12 bg-gradient-to-br from-blue-50/30 via-sky-50/20 to-cyan-50/30">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <div className="relative overflow-hidden">
            <img
              src={heroBg}
              alt="Youth playing football"
              className="w-full h-auto object-cover object-center rounded-lg"
            />
          </div>

          {/* Right Side - Content */}
          <div className="relative p-4 md:p-8 flex flex-col justify-center">
            <h1 className="animate-fade-in-up text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-extrabold text-foreground mb-6 leading-tight" style={{ animationDelay: "0.1s" }}>
              Empowering Youth Through{" "}
              <AnimatedWords 
                words={["Sports", "Education", "Community", "Dreams", "Opportunity"]}
                className="text-primary font-extrabold"
              />
            </h1>

            <p className="animate-fade-in-up text-base md:text-lg text-foreground/80 mb-8 leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Building a Tanzania where every child has the opportunity to develop their talents, 
              access education, and participate fully in society through the power of sport.
            </p>

            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/donate">
                  Support Our Mission
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" className="group">
                <Play size={20} className="mr-2" />
                Watch Our Story
              </Button>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up mt-12 grid grid-cols-2 gap-4" style={{ animationDelay: "0.4s" }}>
              {[
                { value: "5,000+", label: "Youth Impacted" },
                { value: "50+", label: "Communities" },
                { value: "20+", label: "Programs" },
                { value: "100%", label: "Passion" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-white/50 border border-sky-200">
                  <div className="text-xl md:text-2xl font-heading font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
