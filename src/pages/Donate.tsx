import DonationForm from "@/components/DonationForm";
import { Heart, Users, GraduationCap, Trophy } from "lucide-react";
import SEO from "@/components/SEO";

const Donate = () => {
  const impactAreas = [
    {
      icon: Trophy,
      title: "Sports Development",
      description: "Fund youth tournaments and coaching programs",
      amount: "50,000 TZS",
    },
    {
      icon: GraduationCap,
      title: "Education Support",
      description: "Provide school supplies and scholarships",
      amount: "30,000 TZS",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Support health screenings and awareness",
      amount: "25,000 TZS",
    },
    {
      icon: Users,
      title: "Community Programs",
      description: "Empower local communities and families",
      amount: "40,000 TZS",
    },
  ];

  return (
    <main className="pt-32">
      <SEO
        title="Donate - Samatta Foundation"
        description="Support the Samatta Foundation and help empower Tanzanian youth through sports and education. Your donation makes a real difference."
        url="/donate"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Make a Difference
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Support Our Mission
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto">
              Your generous donation empowers youth through sports, education, and community development.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Where Your Donation Goes
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-md text-center group hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <area.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {area.description}
                  </p>
                  <div className="text-secondary font-semibold">
                    From {area.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Make Your Donation
                </h2>
                <p className="text-muted-foreground">
                  Every contribution, big or small, creates lasting change in our communities.
                </p>
              </div>
              
              <DonationForm />
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 text-center">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Why Donate to Samatta Foundation?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div>
                  <div className="text-3xl font-heading font-bold text-secondary mb-2">
                    100%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Transparent use of funds
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-secondary mb-2">
                    5,000+
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Youth impacted
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-secondary mb-2">
                    50+
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Communities served
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Ways to Give */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-8">
              Other Ways to Support Us
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-xl shadow-md">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  Corporate Partnership
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Become a corporate sponsor and amplify your social impact.
                </p>
                <a
                  href="/contact"
                  className="text-secondary hover:underline text-sm font-semibold"
                >
                  Learn More →
                </a>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-md">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  Volunteer
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Give your time and skills to support our programs.
                </p>
                <a
                  href="/volunteer"
                  className="text-secondary hover:underline text-sm font-semibold"
                >
                  Apply Now →
                </a>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-md">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  In-Kind Donations
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Donate equipment, supplies, or services.
                </p>
                <a
                  href="/contact"
                  className="text-secondary hover:underline text-sm font-semibold"
                >
                  Contact Us →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Donate;

