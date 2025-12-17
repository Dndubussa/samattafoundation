import { Trophy, GraduationCap, Heart, Users } from "lucide-react";
import samatta9 from "@/assets/SAMATTA (9).jpg";
import samatta10 from "@/assets/SAMATTA (10).jpg";
import samatta11 from "@/assets/SAMATTA (11).jpg";
import samatta8 from "@/assets/SAMATTA (8).jpg";

const features = [
  {
    icon: Trophy,
    title: "Youth & Sports Development",
    description:
      "Organizing football tournaments, talent identification, and life-skills training through sport—fostering discipline, leadership, and teamwork.",
    color: "from-secondary to-secondary-light",
    image: samatta9,
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    description:
      "Providing education awareness initiatives and support for school-going children from vulnerable backgrounds while encouraging academic excellence.",
    color: "from-primary to-primary-light",
    image: samatta10,
  },
  {
    icon: Heart,
    title: "Health & Wellbeing",
    description:
      "Running health awareness campaigns and community outreach programs promoting healthy lifestyles for vulnerable children and families.",
    color: "from-secondary to-secondary-light",
    image: samatta11,
  },
  {
    icon: Users,
    title: "Social Inclusion",
    description:
      "Advocating for marginalized groups including children with disabilities and people with albinism, promoting equal participation.",
    color: "from-primary to-primary-light",
    image: samatta8,
  },
];

const Features = () => {
  return (
    <section id="programs" className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            Our Focus Areas
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Creating Lasting Impact
          </h2>
          <p className="text-muted-foreground text-lg">
            Through sports, education, health, and advocacy, we're building pathways 
            for Tanzania's youth to reach their full potential.
          </p>
        </div>

        {/* Features Flow */}
        <div className="max-w-6xl mx-auto space-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group flex flex-col ${
                index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-8 md:gap-12 transition-all duration-500`}
            >
              {/* Image Section */}
              <div className="flex-shrink-0 w-full md:w-2/5">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg backdrop-blur-sm bg-opacity-95`}
                    >
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Progress Line */}
                <div className="pt-2">
                  <div className="h-1 w-0 group-hover:w-32 bg-gradient-to-r from-primary to-sky-500 transition-all duration-700 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Features;
