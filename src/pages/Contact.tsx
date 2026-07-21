import { useEffect, useRef } from "react";
import { CONTACT_EMAIL } from "@/lib/constants/site";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/layout/PageHero";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import SEO from "@/components/SEO";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    content: "Dar es Salaam, Tanzania",
    href: null,
  },
  {
    icon: Mail,
    label: "Email",
    content: null,
    isEmail: true,
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+255 712 131 079", "+255 746 411 477", "+255 656 919 595"],
    hrefs: ["tel:+255712131079", "tel:+255746411477", "tel:+255656919595"],
  },
  {
    icon: Clock,
    label: "Office Hours",
    content: "Monday – Friday\n9:00 AM – 5:00 PM EAT",
    href: null,
  },
];

const Contact = () => {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-from-left, .reveal-from-right").forEach((node, i) => {
              setTimeout(() => node.classList.add("is-visible"), i * 70);
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
        title="Contact Us - Samatta Foundation"
        description="Get in touch with the Samatta Foundation. We love hearing from partners, volunteers, and supporters who want to make a difference."
        url="/contact"
      />

      <PageHero
        badge="Get In Touch"
        title="Contact Us"
        description="Have questions or want to get involved? We would love to hear from you."
      />

      <section data-reveal className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form - wider column */}
            <div className="lg:col-span-3 reveal-from-left">
              <div className="bg-white border border-border rounded-2xl p-8 md:p-10 shadow-sm">
                <h2 className="font-heading text-2xl font-black text-foreground mb-7">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-5 reveal-from-right" style={{ transitionDelay: "80ms" }}>
              {/* Contact details card */}
              <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-foreground mb-7">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-3.5">
                      <item.icon className="w-4 h-4 text-secondary mt-1 flex-shrink-0" strokeWidth={1.75} />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                          {item.label}
                        </p>
                        {item.isEmail ? (
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="text-foreground hover:text-secondary transition-colors duration-200 font-medium"
                          >
                            {CONTACT_EMAIL}
                          </a>
                        ) : item.lines ? (
                          <div className="space-y-0.5">
                            {item.lines.map((line, i) => (
                              <a
                                key={line}
                                href={item.hrefs?.[i]}
                                className="block text-foreground hover:text-secondary transition-colors duration-200 font-medium"
                              >
                                {line}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="text-foreground font-medium whitespace-pre-line">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Urgent assistance */}
              <div className="bg-foreground rounded-2xl p-7 text-white">
                <h3 className="font-heading font-bold text-lg mb-2">Need Immediate Assistance?</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  For urgent matters, call us directly or send an email. We respond to all inquiries within 24–48 hours.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;