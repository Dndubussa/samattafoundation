import ContactForm from "@/components/ContactForm";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import SEO from "@/components/SEO";

const Contact = () => {
  return (
    <main className="pt-32">
      <SEO
        title="Contact Us - Samatta Foundation"
        description="Get in touch with the Samatta Foundation. We'd love to hear from you about partnerships, volunteering, or how you can support our mission."
        url="/contact"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto">
              Have questions or want to get involved? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 via-sky-50/20 to-background relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card p-8 rounded-2xl shadow-lg">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card p-8 rounded-2xl shadow-lg">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Address</h4>
                      <p className="text-muted-foreground">
                        Dar es Salaam, Tanzania
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <a
                        href="mailto:info@samattafoundation.org"
                        className="text-muted-foreground hover:text-secondary transition-colors"
                      >
                        info@samattafoundation.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                      <p className="text-muted-foreground">+255 712 131 079 | +255 746 411 477 | +255 656 919 595</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Office Hours</h4>
                      <p className="text-muted-foreground">
                        Monday - Friday<br />
                        9:00 AM - 5:00 PM EAT
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-primary-glow p-8 rounded-2xl shadow-lg text-primary-foreground">
                <h3 className="font-heading text-xl font-bold mb-3">
                  Need Immediate Assistance?
                </h3>
                <p className="text-primary-foreground/85 mb-4">
                  For urgent matters, please call us directly or send an email. We respond to all inquiries within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

