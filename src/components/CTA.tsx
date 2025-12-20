import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  const stats = [
    { icon: Users, value: "5,000+", label: "Youth Empowered" },
    { icon: Target, value: "50+", label: "Communities Served" },
    { icon: TrendingUp, value: "3", label: "Active Programs" },
    { icon: Heart, value: "100%", label: "Impact Driven" },
  ];

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-br from-blue-50/30 via-sky-50/20 to-cyan-50/30">

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 backdrop-blur-sm rounded-2xl mb-4 group hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main CTA Content */}
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-8 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <Heart className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-foreground font-medium">
              Make a Difference Today
            </span>
          </div>

          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: "500ms" }}
          >
            Join Us in Transforming{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Lives</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/30 -rotate-1" />
            </span>
          </h2>

          <p 
            className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            Your support empowers Tanzanian youth through sports, education, and community development. Together, we create lasting change.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "700ms" }}
          >
            <Button 
              variant="hero" 
              size="xl" 
              className="group shadow-2xl"
              asChild
            >
              <Link to="/donate">
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="shadow-lg"
              asChild
            >
              <Link to="/volunteer">
                Become a Volunteer
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="mt-8 pt-6 border-t border-foreground/20 animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <p className="text-foreground/70 text-sm mb-4">
              Trusted by communities across Tanzania
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center text-foreground/60 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>100% Transparent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Tax Deductible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Secure Donations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
