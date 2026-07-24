import { useEffect, useRef } from "react";
import VolunteerForm from "@/components/forms/VolunteerForm";
import PageHero from "@/components/layout/PageHero";
import SEO from "@/components/SEO";

const benefits = [
  { title: "Make Real Impact",   desc: "Directly contribute to changing lives and building stronger communities across Tanzania." },
  { title: "Gain Experience",    desc: "Develop new skills and gain valuable experience in community development and social work." },
  { title: "Join a Community",   desc: "Connect with like-minded individuals passionate about making a real difference." },
];

const Volunteer = () => {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((node, i) => {
              setTimeout(() => node.classList.add("is-visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    el.querySelectorAll("section[data-reveal]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef}>
      <SEO
        title="Become a Volunteer - Samatta Foundation"
        description="Join our team of passionate volunteers and make a real difference in the lives of Tanzanian youth. Apply to volunteer with the Samatta Foundation today."
        url="/volunteer"
      />

      <PageHero
        badge="Join Our Team"
        title="Become a Volunteer"
        description="Make a difference in the lives of young Tanzanians. Join our community of passionate volunteers and help build a better future."
      />

      {/* Why Volunteer */}
      <section data-reveal className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <span className="section-kicker reveal">Why Volunteer</span>
            <h2 className="section-heading reveal" style={{ transitionDelay: "80ms" }}>Why Volunteer With Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 reveal-stagger">
            {benefits.map((b, i) => (
              <div key={b.title} className="reveal group border border-border rounded-xl p-7 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl font-heading font-black text-primary/10 mb-4 leading-none select-none">
                  0{i + 1}
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                <div className="mt-4 h-0.5 w-0 bg-secondary rounded-full group-hover:w-10 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section data-reveal className="py-20 bg-[#FAFAF8]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="mb-8">
              <span className="section-kicker reveal">Application</span>
              <h2 className="reveal font-heading text-3xl font-black text-foreground" style={{ transitionDelay: "80ms" }}>
                Volunteer Application Form
              </h2>
              <p className="reveal text-muted-foreground mt-2" style={{ transitionDelay: "160ms" }}>
                Fill in the form below and a member of our team will get back to you shortly.
              </p>
            </div>
            <VolunteerForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Volunteer;