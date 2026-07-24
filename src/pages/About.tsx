import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Target, Scale, Shield, TrendingUp, Trophy, Activity, Lightbulb, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageHero from "@/components/layout/PageHero";
import founderImage from "@/assets/SAMATTA.png";
import mbwanaSamattaImage from "@/assets/TEAM/MBWANA SAMATTA.png";
import jeromeNdubussaImage from "@/assets/TEAM/JEROME NDUBUSSA.png";
import hasbunaHabibuImage from "@/assets/TEAM/HASBUNA HABIBU.png";

const teamMembers = [
  {
    name: "Mbwana Samatta",
    role: "Founder",
    image: mbwanaSamattaImage,
  },
  {
    name: "Jerome Ndubussa",
    role: "Co-Founder and Director of Creativity",
    image: jeromeNdubussaImage,
  },
  {
    name: "Hasbuna Habibu",
    role: "Co-Founder and Managing Director",
    image: hasbunaHabibuImage,
  },
];

const values = [
  { icon: Heart,      title: "Human Dignity",         desc: "We believe every person deserves respect, care, and recognition as a human being." },
  { icon: Scale,      title: "Equality & Equity",      desc: "We promote fairness, justice, and equal access to opportunities for all." },
  { icon: Shield,     title: "Integrity & Inclusivity", desc: "We uphold strong moral principles while embracing diversity and inclusion." },
  { icon: TrendingUp, title: "Result-Oriented Impact", desc: "We focus on delivering meaningful, measurable, and sustainable outcomes." },
];

const areas = [
  { icon: Trophy,    title: "Football for Impact",                  desc: "Using sport to inspire youth, build discipline, teamwork, and social cohesion." },
  { icon: Activity,  title: "Health Access & Education",            desc: "Promoting awareness and SRHR education for healthier, informed communities." },
  { icon: Lightbulb, title: "Youth Skills & Livelihoods",          desc: "Supporting life skills, innovation, and pathways to economic empowerment." },
  { icon: Leaf,      title: "Environment & Technology",             desc: "Encouraging clean energy adoption and responsible environmental stewardship." },
];

function useScrollReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-from-left, .reveal-from-right").forEach((node, i) => {
              setTimeout(() => node.classList.add("is-visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll("section[data-reveal]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}

const About = () => {
  const pageRef = useRef<HTMLElement>(null);
  useScrollReveal(pageRef);

  return (
    <main ref={pageRef} className="pt-0">
      <SEO
        title="About Us - Samatta Foundation"
        description="Samatta Foundation is a Tanzania-based social development organization founded in 2020 by Mbwana Ally Samatta. Guided by Haina Kufeli (Never Give Up!), we promote equality and drive social change."
        url="/about"
      />

      <PageHero
        badge="Haina Kufeli - Never Give Up!"
        title="About Samatta Foundation"
        description="Empowering youth and communities through football, education, health, sustainability, and community development across Tanzania."
      />

      {/* Who We Are */}
      <section data-reveal className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="section-kicker reveal">Who We Are</span>
          <h2 className="section-heading reveal" style={{transitionDelay:"80ms"}}>A Force for Social Change</h2>
          <div className="space-y-5 text-muted-foreground text-lg reveal" style={{transitionDelay:"160ms"}}>
            <p>
              Samatta Foundation is a Tanzania-based social development organization founded by Tanzanian international footballer Mbwana Ally Samatta. The Foundation uses football as a platform for youth empowerment, talent identification, leadership, discipline, teamwork, and community transformation.
            </p>
            <p className="text-xl font-semibold text-secondary italic border-l-4 border-secondary pl-5 text-left">
              "Haina Kufeli" - Never Give Up! Determination, opportunity, and inclusion can transform lives.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section data-reveal className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
            <div className="reveal-from-left">
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img src={founderImage} alt="Mbwana Ally Samatta - Founder" className="w-full h-auto object-cover" loading="lazy" decoding="async" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
              </div>
            </div>
            <div className="reveal-from-right" style={{transitionDelay:"80ms"}}>
              <span className="section-kicker">Our Story</span>
              <h2 className="section-heading">From the Field to the Foundation</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Growing up and rising through football to the international stage, Mbwana Samatta witnessed firsthand the challenges faced by many young people and vulnerable groups in Tanzania. While his career inspired countless youth, he felt a deeper responsibility to create lasting social impact beyond sport.</p>
                <p>From the beginning, the Foundation became a strong voice against the stereotyping and discrimination of People Living with Disabilities (PLwD) and people with albinism, advocating for dignity, equality, and inclusion.</p>
                <p className="font-semibold text-foreground">In 2023, the Foundation entered a new phase of growth - strengthening internal teams, expanding areas of action, and partnering with recognized institutions to design high-impact programs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section data-reveal className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="section-heading reveal">Our Mission &amp; Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Heart,  label: "Our Vision",  accent: "text-secondary",
                text: "To create a barrier-free society where people with albinism, disabilities, and other vulnerable groups enjoy an equal quality of life - practically, emotionally, medically, and spiritually." },
              { icon: Target, label: "Our Mission", accent: "text-primary",
                text: "To promote and protect equal opportunities, advance human rights, and deliver impactful awareness and educational campaigns that support the social integration, security, and wellbeing of vulnerable communities in Tanzania." },
            ].map((item, i) => (
              <div key={item.label} className="reveal bg-card rounded-2xl p-8 border border-border shadow-sm" style={{transitionDelay:`${i*80}ms`}}>
                <item.icon className={`w-6 h-6 ${item.accent} mb-5`} strokeWidth={1.75} />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.label}</h3>
                <p className="text-muted-foreground leading-relaxed text-[14.5px]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section data-reveal className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="section-kicker reveal">What We Stand For</span>
            <h2 className="section-heading reveal" style={{transitionDelay:"80ms"}}>Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
            {values.map((v) => (
              <div key={v.title} className="reveal group text-center p-6 bg-background rounded-xl border border-border shadow-sm hover:border-primary/20 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <v.icon className="w-6 h-6 text-secondary mx-auto mb-4" strokeWidth={1.75} />
                <h3 className="font-heading font-semibold text-foreground mb-2 text-[15px]">{v.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">{v.desc}</p>
                <div className="mt-4 h-px w-0 bg-secondary/60 group-hover:w-8 mx-auto transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Intervention */}
      <section data-reveal className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="section-kicker reveal">Our Work</span>
            <h2 className="section-heading reveal" style={{transitionDelay:"80ms"}}>Areas of Intervention</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 reveal-stagger">
            {areas.map((a) => (
              <div key={a.title} className="reveal flex items-start gap-4 p-6 rounded-xl border border-border hover:border-primary/20 group transition-all duration-300">
                <a.icon className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1.5 text-[15px] group-hover:text-primary transition-colors duration-300">{a.title}</h3>
                  <p className="text-[13.5px] text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Recognition */}
      <section data-reveal className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="section-kicker reveal">Impact &amp; Recognition</span>
            <h2 className="section-heading reveal" style={{transitionDelay:"80ms"}}>Community Impact in Action</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="reveal rounded-2xl border border-border bg-background p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-foreground mb-5">What Our Work Has Reached</h3>
              <ul className="space-y-3">
                {[
                  "Supporting more than 6,000 beneficiaries through community-focused programmes.",
                  "Donating hospital equipment, oxygen cylinders, wheelchairs, mattresses, food support, and school assistance.",
                  "Investing in inclusive education, children's centres, and youth football development.",
                  "Driving environmental campaigns and clean energy awareness as part of long-term community transformation.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground">
                    <span className="text-secondary mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal rounded-2xl border border-border bg-background p-8 shadow-sm" style={{transitionDelay:"80ms"}}>
              <h3 className="font-heading text-xl font-bold text-foreground mb-5">SamaKiba Nifuate &amp; International Recognition</h3>
              <p className="text-muted-foreground mb-4">SamaKiba Nifuate is one of the Foundation's largest annual charity initiatives, launched in partnership with the Alikiba Foundation in 2016. The campaign brings together sport, music, charity, and community development under the theme "Asante TZ" for 2026.</p>
              <p className="font-semibold text-foreground border-l-4 border-primary pl-4">The Foundation has received Special Recognition for Community Impact in Sports Tourism from UN Tourism - an important sign of the work's international standing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section data-reveal className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <span className="section-kicker reveal">Leadership</span>
            <h2 className="section-heading reveal" style={{transitionDelay:"80ms"}}>Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto reveal" style={{transitionDelay:"160ms"}}>Samatta Foundation is led by a committed and diverse team dedicated to sustainable community impact.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className="reveal group text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative mx-auto mb-5 aspect-[3/4] max-w-xs overflow-hidden rounded-2xl border border-border bg-card shadow-md">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-reveal className="py-20 bg-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="reveal font-heading text-3xl md:text-4xl font-black text-white mb-5">Join Our Mission</h2>
          <p className="reveal text-white/70 max-w-xl mx-auto mb-8" style={{transitionDelay:"80ms"}}>Together, we can create lasting change and build a barrier-free society for all Tanzanians.</p>
          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center" style={{transitionDelay:"160ms"}}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/programs">Explore Programs <ArrowRight className="ml-1.5" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/volunteer">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;