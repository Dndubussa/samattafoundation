import { Target, Lightbulb, Rocket, Star } from "lucide-react";

const steps = [
  {
    icon: Target,
    step: "01",
    title: "Identify",
    description: "We reach underserved communities across Tanzania to identify youth with potential and passion.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Engage",
    description: "Through programs like the Samatta Cup, we engage youth in structured sports and mentorship.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Develop",
    description: "We provide coaching, life-skills training, and educational support for holistic growth.",
  },
  {
    icon: Star,
    step: "04",
    title: "Empower",
    description: "Youth graduate as leaders, role models, and advocates for positive change in their communities.",
  },
];

const HowItWorks = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-blue-50/40 via-sky-50/30 to-blue-50/40 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>
      
      {/* Background Decorations */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            How We Create Change
          </h2>
          <p className="text-muted-foreground text-lg">
            A proven pathway from potential to impact, built on the transformative power of sports.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative text-center group"
              >
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-6 shadow-primary-glow group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-secondary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
