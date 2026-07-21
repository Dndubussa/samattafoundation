import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import PageHero from "@/components/layout/PageHero";
import { Trophy, GraduationCap, Heart, Users } from "lucide-react";
import SEO from "@/components/SEO";

const impactAreas = [
  { icon: Trophy,        title: "Sports & Talent",        desc: "Fund youth tournaments, coaching clinics, and talent pathways",                                         amount: "50,000 TZS" },
  { icon: GraduationCap, title: "Education & Inclusion",  desc: "Provide school support, inclusive education resources, and children's centres",                         amount: "30,000 TZS" },
  { icon: Heart,         title: "Health & Clean Energy",  desc: "Support medical equipment, oxygen cylinders, clean cooking access, and public health outreach",          amount: "25,000 TZS" },
  { icon: Users,         title: "Community Relief",       desc: "Help provide food, mattresses, wheelchairs, and essential support to vulnerable families",               amount: "40,000 TZS" },
];

const Donate = () => {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .counter-reveal").forEach((node, i) => {
              setTimeout(() => node.classList.add("is-visible"), i * 70);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll("section[data-reveal]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef}>
      <SEO
        title="Donate - Samatta Foundation"
        description="Support the Samatta Foundation and help empower Tanzanian youth through sports and education. Your donation makes a real difference."
        url="/donate"
      />

      <PageHero
        badge="Make a Difference"
        title="Support Our Mission"
        description="Your generous donation helps the Samatta Foundation expand football development, education, health, sustainability, and community programmes across Tanzania."
      />

      {/* Where Your Donation Goes */}
      <section data-reveal className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <span className="section-kicker reveal">Impact Areas</span>
            <h2 className="section-heading reveal" style={{transitionDelay:"80ms"}}>Where Your Donation Goes</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
            {impactAreas.map((area) => (
              <div key={area.title} className="reveal group border border-border rounded-xl p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
                <area.icon className="w-5 h-5 text-secondary mb-4" strokeWidth={1.75} />
                <h3 className="font-heading font-semibold text-foreground mb-2 text-[15px]">{area.title}</h3>
                <p className="text-[13.5px] text-muted-foreground mb-4 leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section data-reveal className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="text-center mb-10">
              <Heart className="w-6 h-6 text-secondary mx-auto mb-4" strokeWidth={1.75} />
              <h2 className="reveal font-heading text-3xl font-black text-foreground mb-3">Make Your Donation</h2>
              <p className="reveal text-muted-foreground" style={{transitionDelay:"80ms"}}>Every contribution, big or small, creates lasting change in our communities.</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-border">
                    <th className="py-4 px-6 font-semibold text-foreground bg-zinc-50 w-1/3">Bank Name</th>
                    <td className="py-4 px-6 text-muted-foreground">CRDB BANK PLC TANZANIA</td>
                  </tr>
                  <tr className="border-b border-border">
                    <th className="py-4 px-6 font-semibold text-foreground bg-zinc-50">Swift Code</th>
                    <td className="py-4 px-6 text-muted-foreground">CORUTZTZ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <th className="py-4 px-6 font-semibold text-foreground bg-zinc-50">Branch Name</th>
                    <td className="py-4 px-6 text-muted-foreground">MBAGALA</td>
                  </tr>
                  <tr className="border-b border-border">
                    <th className="py-4 px-6 font-semibold text-foreground bg-zinc-50">Account Number</th>
                    <td className="py-4 px-6 text-muted-foreground">0152000BDTL00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <th className="py-4 px-6 font-semibold text-foreground bg-zinc-50">Account Name</th>
                    <td className="py-4 px-6 text-muted-foreground">SAMATTA FOUNDATION</td>
                  </tr>
                  <tr>
                    <th className="py-4 px-6 font-semibold text-foreground bg-zinc-50">Currency</th>
                    <td className="py-4 px-6 text-muted-foreground">TZS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </section>

      {/* Other Ways to Give */}
      <section data-reveal className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="reveal font-heading text-3xl font-black text-foreground text-center mb-12">Other Ways to Support Us</h2>
          <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
            {[
              { title: "Corporate Partnership", desc: "Become a corporate sponsor and amplify your social impact.", link: "/contact", cta: "Learn More" },
              { title: "Volunteer",             desc: "Give your time and skills to support our programs.",          link: "/volunteer", cta: "Apply Now" },
              { title: "In-Kind Donations",     desc: "Donate equipment, supplies, or services.",                   link: "/contact", cta: "Contact Us" },
            ].map((item) => (
              <div key={item.title} className="reveal border border-border rounded-xl p-6 hover:border-primary/30 transition-colors duration-300">
                <h3 className="font-heading font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <Link to={item.link} className="text-sm font-semibold text-secondary hover:text-primary transition-colors">
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Donate;