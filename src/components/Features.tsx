import { Trophy, GraduationCap, Heart, Users } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Youth & Sports Development",
    description:
      "Organizing football tournaments, talent identification, and life-skills training through sport—fostering discipline, leadership, and teamwork.",
    color: "from-secondary to-secondary-light",
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    description:
      "Providing education awareness initiatives and support for school-going children from vulnerable backgrounds while encouraging academic excellence.",
    color: "from-primary to-primary-light",
  },
  {
    icon: Heart,
    title: "Health & Wellbeing",
    description:
      "Running health awareness campaigns and community outreach programs promoting healthy lifestyles for vulnerable children and families.",
    color: "from-secondary to-secondary-light",
  },
  {
    icon: Users,
    title: "Social Inclusion",
    description:
      "Advocating for marginalized groups including children with disabilities and people with albinism, promoting equal participation.",
    color: "from-primary to-primary-light",
  },
];

const Features = () => {
  return (
    <section id="programs" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
