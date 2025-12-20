import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Target, Users, Trophy, Scale, Shield, TrendingUp, Leaf, GraduationCap, Activity, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import founderImage from "@/assets/SAMATTA.jpg";
import teamImage from "@/assets/OUR TEAM.jpg";

const About = () => {
  return (
    <main className="pt-32">
      <SEO
        title="About Us - Samatta Foundation"
        description="Samatta Foundation is a Tanzania-based social development organization founded in 2020 by Mbwana Ally Samatta. Guided by 'Haina Kufeli' (Never Give Up!), we promote equality and drive social change for vulnerable communities."
        url="/about"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Haina Kufeli - Never Give Up!
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              About Samatta Foundation
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto">
              Inspiring hope, promoting equality, and driving meaningful social and economic change for vulnerable and marginalized communities in Tanzania.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-gradient-to-br from-blue-50/20 via-sky-50/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Who We Are
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              A Force for Social Change
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Samatta Foundation is a Tanzania-based social development organization founded in 2020 by Mbwana Ally Samatta, a professional footballer and national icon. The Foundation was established to inspire hope, promote equality, and drive meaningful social and economic change for vulnerable and marginalized communities in Tanzania.
              </p>
              <p className="text-xl font-semibold text-secondary italic">
                Guided by the slogan "Haina Kufeli" (Never Give Up!), the Foundation is built on the belief that determination, opportunity, and inclusion can transform lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <img
                src={founderImage}
                alt="Mbwana Ally Samatta - Founder"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                From the Field to the Foundation
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Growing up and rising through football to the international stage, Mbwana Samatta witnessed firsthand the challenges faced by many young people and vulnerable groups in Tanzania. While his football career inspired countless youth, he felt a deeper responsibility to use his influence to create lasting social impact beyond sport.
                </p>
                <p>
                  From the beginning, the Foundation became a strong voice against the stereotyping and discrimination of People Living with Disabilities (PLwD) and people with albinism, advocating for dignity, equality, and inclusion.
                </p>
                <p className="font-semibold text-foreground">
                  In 2023, Samatta Foundation entered a new phase of growth. The organization strengthened its internal teams, expanded its areas of action, and partnered with recognized experts and institutions to design and implement innovative, sustainable, and high-impact programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-background via-blue-50/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission & Vision
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-lg animate-fade-in-up border-t-4 border-secondary">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To create a barrier-free society where people with albinism, disabilities, and other vulnerable groups enjoy an equal quality of life — practically, emotionally, medically, and spiritually — alongside able-bodied individuals.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg animate-fade-in-up border-t-4 border-primary" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To promote and protect equal opportunities, advance the realization of human rights, and deliver impactful media awareness and educational campaigns that support the social integration, security, and wellbeing of people with disabilities, people with albinism, and other vulnerable communities in Tanzania.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              What We Stand For
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Heart, title: "Human Dignity", desc: "We believe every person deserves respect, care, and recognition as a human being." },
              { icon: Scale, title: "Equality & Equity", desc: "We promote fairness, justice, and equal access to opportunities for all." },
              { icon: Shield, title: "Integrity & Inclusivity", desc: "We uphold strong moral and ethical principles while embracing diversity and inclusion." },
              { icon: TrendingUp, title: "Result-Oriented Impact", desc: "We focus on delivering meaningful, measurable, and sustainable outcomes." },
            ].map((value, index) => (
              <div 
                key={value.title}
                className="text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in-up"
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

      {/* Areas of Intervention */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 via-sky-50/20 to-cyan-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Our Work
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Areas of Intervention
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Samatta Foundation works across four core thematic areas:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: Trophy, 
                title: "Football for Impact", 
                desc: "Using sport as a tool to inspire youth, build discipline, teamwork, and social cohesion.",
                color: "text-blue-600"
              },
              { 
                icon: Activity, 
                title: "Health Access & Education", 
                desc: "Promoting awareness and education, including Sexual and Reproductive Health and Rights (SRHR).",
                color: "text-green-600"
              },
              { 
                icon: Lightbulb, 
                title: "Youth Skills, Innovation & Livelihoods", 
                desc: "Supporting life skills development, innovation, and pathways to economic empowerment.",
                color: "text-orange-600"
              },
              { 
                icon: Leaf, 
                title: "Environment Conservation & Technology", 
                desc: "Encouraging responsible use of technology and initiatives that protect the environment.",
                color: "text-teal-600"
              },
            ].map((area, index) => (
              <div 
                key={area.title}
                className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6`}>
                  <area.icon className={`w-7 h-7 ${area.color}`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{area.title}</h3>
                <p className="text-muted-foreground">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Do
              </h2>
              <p className="text-muted-foreground">
                Through community-based programs and partnerships, we:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {[
                "Organize football activities and events that create positive social impact for youth and adolescents",
                "Increase awareness and education on health, including sexual and reproductive health rights",
                "Conduct life-skills, leadership, and socio-economic workshops for young men and women",
                "Implement initiatives that promote technology use and environmental conservation",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-secondary font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gradient-to-b from-background via-blue-50/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Leadership
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Samatta Foundation is led by a committed and diverse team
            </p>
          </div>
          <div className="max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <img
              src={teamImage}
              alt="Samatta Foundation Team"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Our Location
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Where We Work
            </h2>
            <p className="text-muted-foreground text-lg">
              We are based in Dar es Salaam, Tanzania, and implement programs across urban and community settings, working closely with local stakeholders and partners to create lasting impact.
            </p>
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
            Together, we can create lasting change and build a barrier-free society for all Tanzanians.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/programs">
                Explore Programs
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 hover:bg-white/20 text-white border-white/30" asChild>
              <Link to="/volunteer">
                Get Involved
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
