import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Target, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import founderImage from "@/assets/SAMATTA.jpg";

const About = () => {
  return (
    <main className="pt-32">
      <SEO
        title="About Us - Samatta Foundation"
        description="Learn about the Samatta Foundation and our founder Mbwana Ally Samatta. Discover our mission to empower Tanzanian youth through sports, education, and community development."
        url="/about"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Our Story
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              About Samatta Foundation
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto">
              Transforming lives through the power of sports, education, and community development in Tanzania.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <img
                src={founderImage}
                alt="Mbwana Ally Samatta"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
                Our Founder
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Mbwana Ally Samatta
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Mbwana Ally Samatta is a professional Tanzanian footballer who has played for top clubs 
                  across Europe including Genk in Belgium, Aston Villa in the English Premier League, 
                  and Fenerbahçe in Turkey. As the former captain of the Tanzania national team, 
                  he has been a trailblazer for Tanzanian football on the international stage.
                </p>
                <p>
                  Born in Dar es Salaam, Samatta understands the challenges faced by young people 
                  in underserved communities. His journey from humble beginnings to international 
                  football stardom inspired him to give back to his homeland and create opportunities 
                  for the next generation.
                </p>
                <p>
                  In founding the Samatta Foundation, he envisioned an organization that would use 
                  sports as a vehicle for social change, providing young Tanzanians with the tools 
                  they need to succeed both on and off the field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission & Vision
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-lg animate-fade-in-up">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower children, youth, and underserved communities in Tanzania through sports, 
                education, health awareness, and community support programs that create lasting positive change.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                A Tanzania where every child has the opportunity to develop their talents, 
                access quality education, and participate fully in society regardless of their background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              What We Stand For
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Trophy, title: "Excellence", desc: "Striving for the highest standards in everything we do" },
              { icon: Users, title: "Inclusion", desc: "Creating opportunities for all, especially marginalized groups" },
              { icon: Heart, title: "Compassion", desc: "Serving with empathy and genuine care for communities" },
              { icon: Target, title: "Impact", desc: "Focusing on sustainable, measurable outcomes" },
            ].map((value, index) => (
              <div 
                key={value.title}
                className="text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Join Our Mission
          </h2>
          <p className="text-primary-foreground/85 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Together, we can create lasting change in the lives of young Tanzanians.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/programs">
                Explore Programs
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
