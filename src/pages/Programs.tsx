import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Trophy, Users, Heart,
  Leaf, Globe, Award, Zap, HandHeart, Building2, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageHero from "@/components/layout/PageHero";

// Images
import samattaCupImage from "@/assets/NISHATI SAFI CUP.png";
import samakibaImage from "@/assets/Nifuate.png";
import samakibaImageSecondary from "@/assets/Nifuate 2.png";
import orphanageImage from "@/assets/SAMATTA (10).jpg";
import oryxEnergies from "@/assets/partners/oryx-energies.png";
import samatta8 from "@/assets/SAMATTA (8).jpg";
import samatta9 from "@/assets/SAMATTA (9).jpg";
import samatta11 from "@/assets/SAMATTA (11).jpg";

// Nifuate event images
import nif1 from "@/assets/NIFUATE IMAGES/Samakiba (1).jpeg";
import nif2 from "@/assets/NIFUATE IMAGES/Samakiba (2).jpeg";
import nif3 from "@/assets/NIFUATE IMAGES/Samakiba (3).jpeg";
import nif4 from "@/assets/NIFUATE IMAGES/Samakiba (4).jpeg";
import nif5 from "@/assets/NIFUATE IMAGES/Samakiba (5).jpeg";

const nifuateSlides = [nif2, nif3, nif4, nif1, nif5];

// Mini slideshow for the Nifuate section
const NifuateGallery = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setActive(c => (c + dir + nifuateSlides.length) % nifuateSlides.length);
  }, []);

  useEffect(() => {
    if (paused) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => go(1), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, go]);

  return (
    <div
      className="flex flex-col gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg bg-foreground" style={{ aspectRatio: "16/10" }}>
        {nifuateSlides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`SamaKiba Nifuate - moment ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === active ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1)",
              willChange: "opacity",
            }}
          />
        ))}
        {/* Arrows */}
        <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
        {/* Counter */}
        <div className="absolute bottom-3 right-3 z-10 bg-black/50 rounded-full px-2.5 py-0.5 text-white text-xs font-mono">
          {active + 1} / {nifuateSlides.length}
        </div>
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-5 gap-2">
        {nifuateSlides.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative overflow-hidden rounded-xl transition-all duration-200 ${
              i === active
                ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-[1.04]"
                : "opacity-60 hover:opacity-90"
            }`}
            style={{ aspectRatio: "1" }}
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-px bg-border overflow-hidden rounded-full">
        <div
          key={`${active}-${paused}`}
          className="h-full bg-primary rounded-full"
          style={{ animation: paused ? "none" : "nifProg 4000ms linear forwards" }}
        />
      </div>

      <style>{`
        @keyframes nifProg { from { width: 0% } to { width: 100% } }
      `}</style>
    </div>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────

const nifuateImpact = [
  { value: "6,000+", label: "Beneficiaries reached", icon: Users },
  { value: "Schools", label: "Educational support", icon: Building2 },
  { value: "Oxygen", label: "Cylinders donated", icon: Heart },
  { value: "Wheelchairs", label: "Donated to PWDs", icon: HandHeart },
  { value: "UN Tourism", label: "Award for Excellence", icon: Award },
  { value: "AFCON 2027", label: "Promotion & visibility", icon: Globe },
];

const nifuateHighlights = [
  { icon: Trophy, title: "Charity Football", desc: "Team Samatta vs Team Kiba in an annual charity match uniting fans across Tanzania." },
  { icon: Users, title: "Youth Empowerment", desc: "Mentorship, workshops, and talent programs targeting Tanzania's future generation." },
  { icon: Building2, title: "Community Development", desc: "Direct support to schools, hospitals, and underserved communities." },
  { icon: Globe, title: "Sports Tourism", desc: "Recognized globally for promoting sustainable sports tourism in Tanzania." },
  { icon: Leaf, title: "Environmental Awareness", desc: "Climate change education integrated into all events and campaigns." },
  { icon: Zap, title: "Clean Energy", desc: "Awareness campaigns on clean cooking and renewable energy solutions." },
  { icon: HandHeart, title: "Disability Support", desc: "Hydrocephalus care, wheelchairs, and inclusive programming for persons with disabilities." },
];

const nishatiExpectedImpact = [
  { icon: Users, title: "Youth Empowerment", desc: "Football as a pathway to discipline, leadership and career opportunities for youth aged 15–25." },
  { icon: Heart, title: "Public Health", desc: "Reducing indoor air pollution and improving community wellbeing through clean energy adoption." },
  { icon: Zap, title: "Clean Cooking", desc: "Food vendors serving participating teams receive clean cooking equipment and gas cylinders." },
  { icon: Leaf, title: "Environmental Sustainability", desc: "Reducing carbon footprint and promoting eco-friendly practices at community level." },
  { icon: Building2, title: "Community Partnerships", desc: "Engagement with local government, NGOs, and corporate partners for sustained impact." },
  { icon: Trophy, title: "Football Talent", desc: "Talent identification and pathways to professional football development for gifted players." },
];

const whyMatters = [
  { icon: Trophy, label: "Sports" },
  { icon: Building2, label: "Education" },
  { icon: Heart, label: "Health" },
  { icon: Leaf, label: "Sustainability" },
  { icon: Users, label: "Youth" },
  { icon: Globe, label: "National Unity" },
  { icon: Zap, label: "Economic Empowerment" },
  { icon: HandHeart, label: "Community Development" },
];

const programPartners = [
  { name: "Samatta Foundation", type: "Lead Organizer" },
  { name: "Alikiba Foundation", type: "Co-organizer" },
  { name: "Sauti ya Mtoto Foundation", type: "Social Partner" },
  { name: "Government Partners", type: "Institutional" },
  { name: "Corporate Sponsors", type: "Funding" },
  { name: "Development Agencies", type: "NGO Support" },
  { name: "Media Partners", type: "Visibility" },
  { name: "Bongo FM", type: "Media Partner" },
];

// ─── Component ───────────────────────────────────────────────────────────────

const Programs = () => {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = pageRef.current;
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

  return (
    <main ref={pageRef}>
      <SEO
        title="Our Programs - Samatta Foundation"
        description="Explore our flagship programs: Samatta Nishati Safi Cup, SamaKiba Nifuate, and Clean Cooking Energy Campaign - transforming lives across Tanzania."
        url="/programs"
      />

      <PageHero
        badge="What We Do"
        title="Our Programs"
        description="Flagship initiatives spanning football development, youth empowerment, clean energy, and community transformation across Tanzania."
      />

      {/* ── 1. Samatta Nishati Safi Cup - Featured ──────────────────────── */}
      <section data-reveal className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal-from-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary mb-6">
                Flagship Program
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
                Samatta Nishati Safi Cup
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                A youth football tournament combining sport, sustainability, and social impact. 35 teams compete across 85 matches at Bandari Stadium over 4+ months, with players aged 15-25 competing for talent recognition and community pride.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The tournament integrates a <strong className="text-foreground">Clean Cooking Campaign</strong>, equipping food vendors serving participating teams with clean cooking equipment and gas cylinders - promoting healthier and more sustainable cooking practices across communities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-border">
                {[
                  { icon: Calendar, text: "4+ Months duration" },
                  { icon: MapPin, text: "Bandari Stadium" },
                  { icon: Users, text: "35 Teams" },
                  { icon: Trophy, text: "85 Matches" },
                ].map((m) => (
                  <div key={m.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <m.icon className="w-4 h-4 text-secondary flex-shrink-0" />
                    {m.text}
                  </div>
                ))}
              </div>
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/apply">Apply Now <ArrowRight className="ml-1.5 transition-transform group-hover:translate-x-1" /></Link>
              </Button>
            </div>

            <div className="reveal-from-right relative" style={{ transitionDelay: "80ms" }}>
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img src={samattaCupImage} alt="Samatta Nishati Safi Cup" className="w-full h-auto object-cover" loading="lazy" decoding="async" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Nishati Safi Cup - Expected Impact ───────────────────────── */}
      <section data-reveal className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <span className="section-kicker reveal">Expected Outcomes</span>
            <h2 className="section-heading reveal" style={{ transitionDelay: "80ms" }}>
              Expected Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl reveal" style={{ transitionDelay: "160ms" }}>
              The Samatta Nishati Safi Cup is designed to create ripple effects far beyond the football pitch.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nishatiExpectedImpact.map((item, i) => (
              <div
                key={item.title}
                className="reveal bg-card rounded-2xl p-6 border border-border shadow-sm hover:border-primary/20 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <item.icon className="w-5 h-5 text-secondary mb-4" strokeWidth={1.75} />
                <h3 className="font-heading font-semibold text-foreground mb-2 text-[15px]">{item.title}</h3>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SamaKiba Nifuate - Overview ──────────────────────────────── */}
      <section data-reveal className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Image left - Nifuate gallery slideshow */}
            <div className="reveal-from-left flex flex-col gap-4">
              <NifuateGallery />
              {/* UN Recognition badge */}
              <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
                <Award className="w-6 h-6 text-secondary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">UN Tourism Award</strong> - Excellence in Sustainable Sports Tourism
                </p>
              </div>
            </div>

            {/* Content right */}
            <div className="reveal-from-right" style={{ transitionDelay: "80ms" }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                Annual Initiative · Since 2016
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
                SamaKiba Nifuate
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                SamaKiba Nifuate is an annual charity football initiative born from the partnership between the <strong className="text-foreground">Samatta Foundation</strong> and the <strong className="text-foreground">Alikiba Foundation</strong>. The event combines sports, youth empowerment, community development, tourism promotion, and social impact - bringing together Team Samatta and Team Ali Kiba in a beloved annual tradition.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The 2026 edition, themed <strong className="text-foreground">"Asante TZ"</strong>, is a heartfelt celebration of gratitude to Tanzanians for their unwavering support. The campaign honors national unity and pride while driving awareness on climate change, clean energy, and AFCON 2027.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Community development & youth empowerment",
                  "Sports tourism promotion",
                  "Climate change & clean energy awareness",
                  "AFCON 2027 promotion",
                  "Disability & health support programs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />{item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Button variant="hero" size="lg" className="group" asChild>
                  <Link to="/contact">Partner With Us <ArrowRight className="ml-1.5 transition-transform group-hover:translate-x-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Nifuate Impact Stats ──────────────────────────────────────── */}
      <section data-reveal className="py-20 bg-foreground">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 text-center">
            <span className="section-kicker reveal" style={{ color: "hsl(var(--secondary))" }}>Proven Results</span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-white mb-4 reveal" style={{ transitionDelay: "80ms" }}>
              SamaKiba Nifuate Impact
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto reveal" style={{ transitionDelay: "160ms" }}>
              A decade of impact delivered through sport, compassion, and community action.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nifuateImpact.map((item, i) => (
              <div
                key={item.label}
                className="reveal bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <item.icon className="w-5 h-5 text-secondary mb-4" strokeWidth={1.75} />
                <div className="text-2xl font-heading font-black text-white mb-1">{item.value}</div>
                <div className="text-[13px] text-white/60">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Program Highlights (Nifuate) ─────────────────────────────── */}
      <section data-reveal className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <span className="section-kicker reveal">Initiative Pillars</span>
            <h2 className="section-heading reveal" style={{ transitionDelay: "80ms" }}>Program Highlights</h2>
            <p className="text-muted-foreground max-w-2xl reveal" style={{ transitionDelay: "160ms" }}>
              SamaKiba Nifuate goes beyond football, touching every dimension of community life.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {nifuateHighlights.map((item, i) => (
              <div
                key={item.title}
                className="reveal bg-card rounded-2xl p-5 border border-border shadow-sm hover:border-secondary/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <item.icon className="w-4 h-4 text-secondary mb-3" strokeWidth={1.75} />
                <h3 className="font-heading font-semibold text-[13.5px] text-foreground mb-1">{item.title}</h3>
                <p className="text-[12.5px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Clean Cooking Campaign ────────────────────────────────────── */}
      <section data-reveal className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal-from-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary mb-6">
                Sustainability Initiative
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
                Clean Cooking Energy Campaign
              </h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                A major sustainability initiative embedded within the Samatta Nishati Safi Cup. The Foundation addresses indoor air pollution - one of Tanzania's leading public health challenges - by promoting the adoption of clean cooking technology.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Food vendors serving participating teams receive clean cooking equipment and gas cylinders, directly reducing harmful emissions while cutting household cooking costs and supporting environmental sustainability.
              </p>
              <ul className="space-y-3">
                {[
                  "Reduces indoor air pollution",
                  "Improves public health outcomes",
                  "Lowers household cooking costs",
                  "Supports environmental sustainability",
                  "Empowers food vendors with cleaner solutions",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />{point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal-from-right" style={{ transitionDelay: "80ms" }}>
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img src={oryxEnergies} alt="Clean Cooking Energy Campaign" className="w-full h-auto object-cover" loading="lazy" decoding="async" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Why These Programs Matter ────────────────────────────────── */}
      <section data-reveal className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal-from-left">
              <span className="section-kicker">Our Purpose</span>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mt-2 mb-5 leading-tight">
                Why These Programs Matter
              </h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                Together, the Samatta Nishati Safi Cup and SamaKiba Nifuate represent more than sporting events. They are engines of systemic change across Tanzania, touching lives in ways that last far beyond the final whistle.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each initiative is intentionally designed to address interconnected challenges - from youth unemployment and poor health outcomes to environmental degradation and social exclusion - proving that sport can be a vehicle for holistic community transformation.
              </p>
            </div>
            <div className="reveal-from-right grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ transitionDelay: "80ms" }}>
              {whyMatters.map((item, i) => (
                <div
                  key={item.label}
                  className="reveal flex flex-col items-center text-center p-4 bg-white rounded-xl border border-border hover:border-secondary/20 hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <item.icon className="w-5 h-5 text-secondary mb-2.5" strokeWidth={1.75} />
                  <span className="text-[12px] font-semibold text-foreground/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Gallery strip using available images ──────────────────────── */}
      <section data-reveal className="py-12 bg-card border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[samatta8, samatta9, samatta11, samattaCupImage, orphanageImage].map((src, i) => (
              <div key={i} className="reveal aspect-square overflow-hidden rounded-xl" style={{ transitionDelay: `${i * 60}ms` }}>
                <img src={src} alt={`Foundation moment ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Partners ──────────────────────────────────────────────────── */}
      <section data-reveal className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="section-kicker reveal">Collaboration</span>
            <h2 className="section-heading reveal" style={{ transitionDelay: "80ms" }}>Program Partners</h2>
            <p className="text-muted-foreground max-w-xl mx-auto reveal" style={{ transitionDelay: "160ms" }}>
              Our programs succeed because of the incredible organizations and institutions that stand with us.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {programPartners.map((partner, i) => (
              <div
                key={partner.name}
                className="reveal bg-card rounded-2xl p-5 border border-border shadow-sm text-center hover:border-primary/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">{partner.type}</div>
                <div className="font-heading font-bold text-sm text-foreground">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CTA ──────────────────────────────────────────────────────── */}
      <section data-reveal className="py-20 bg-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="section-kicker reveal" style={{ color: "hsl(var(--secondary))" }}>Get Involved</span>
          <h2 className="reveal font-heading text-3xl md:text-4xl font-black text-white mt-3 mb-5" style={{ transitionDelay: "80ms" }}>
            Join Us in Creating Lasting Impact
          </h2>
          <p className="reveal text-white/70 max-w-xl mx-auto mb-10" style={{ transitionDelay: "160ms" }}>
            Whether you're a volunteer, donor, corporate sponsor, or community partner, your support helps transform lives through sport, education, health, and sustainable development.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center" style={{ transitionDelay: "240ms" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Partner With Us <ArrowRight className="ml-1.5" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/donate">Support Our Mission</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Programs;