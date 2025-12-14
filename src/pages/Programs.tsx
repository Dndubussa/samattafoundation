import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, GraduationCap, Heart, Users, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import event1 from "@/assets/gallery/event-1.jpg";
import event3 from "@/assets/gallery/event-3.jpg";
import event4 from "@/assets/gallery/event-4.jpg";

const Programs = () => {
  const programs = [
    {
      title: "Samatta Cup",
      description: "Our flagship youth football tournament that brings together talented young players from across Tanzania, providing them with a platform to showcase their skills and compete at a high level.",
      icon: Trophy,
      image: event1,
      features: ["Annual youth football tournament", "Talent identification program", "Professional coaching clinics", "Scholarship opportunities"],
      featured: true,
    },
    {
      title: "Education Support",
      description: "Providing educational resources, scholarships, and mentorship programs to help young people achieve their academic goals alongside their sporting ambitions.",
      icon: GraduationCap,
      image: event3,
      features: ["School supplies distribution", "Scholarship programs", "After-school tutoring", "Career guidance"],
    },
    {
      title: "Health & Wellbeing",
      description: "Promoting physical and mental health awareness through sports activities, health screenings, and wellness education programs.",
      icon: Heart,
      image: event4,
      features: ["Health screenings", "Mental health awareness", "Nutrition education", "Sports medicine support"],
    },
    {
      title: "Community Development",
      description: "Building stronger communities through sports infrastructure development, volunteer programs, and social inclusion initiatives.",
      icon: Users,
      image: event1,
      features: ["Sports facility upgrades", "Volunteer programs", "Disability inclusion", "Women's empowerment"],
    },
  ];

  return (
    <main className="pt-32">
      <SEO
        title="Our Programs - Samatta Foundation"
        description="Explore our programs including the Samatta Cup, Education Support, Health & Wellbeing, and Community Development initiatives transforming lives across Tanzania."
        url="/programs"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              What We Do
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Our Programs
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto">
              Discover how we're making a difference through sports, education, and community initiatives across Tanzania.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Program - Samatta Cup */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-secondary/10 to-primary/5 rounded-3xl p-8 md:p-12 animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                    Flagship Program
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  The Samatta Cup
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  The Samatta Cup is our premier youth football tournament, designed to discover and nurture 
                  the next generation of Tanzanian football talent. This annual event brings together young 
                  players from all corners of the country for a week of competition, learning, and inspiration.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">Annual Event</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">Nationwide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">500+ Participants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">Scholarship Awards</span>
                  </div>
                </div>
                <Button variant="hero" size="lg" className="group" asChild>
                  <Link to="/apply">
                    Apply Now
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <img
                  src={event1}
                  alt="Samatta Cup"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-heading font-bold">2024</div>
                  <div className="text-sm">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Programs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Making Impact
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Other Initiatives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beyond the Samatta Cup, we run various programs addressing education, health, and community needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(1).map((program, index) => (
              <div
                key={program.title}
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <program.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{program.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {program.description}
                  </p>
                  <ul className="space-y-2">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Get Involved
          </h2>
          <p className="text-primary-foreground/85 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Whether you want to volunteer, donate, or partner with us, there are many ways to support our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl">
              Donate Now
              <ArrowRight className="ml-2" />
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Programs;
