import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import samattaLogo from "@/assets/SAMATTA FOUNDATION LOGO.png";
import NewsletterSignup from "./NewsletterSignup";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Contact", href: "/contact" },
    { label: "Get Involved", href: "/#cta" },
  ];

  const programs = [
    { label: "Samatta Cup", href: "/programs" },
    { label: "Youth Development", href: "/programs" },
    { label: "Education Support", href: "/programs" },
    { label: "Community Outreach", href: "/programs" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="mb-6 pb-6 border-b border-primary-foreground/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-xl font-bold mb-2">
              Stay Updated
            </h3>
            <p className="text-primary-foreground/70 mb-4">
              Subscribe to our newsletter to receive the latest news, updates, and stories from the Samatta Foundation.
            </p>
            <NewsletterSignup variant="footer" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src={samattaLogo}
              alt="Samatta Foundation"
              className="h-16 w-auto mb-3 rounded-lg bg-primary-foreground p-2"
            />
            <p className="text-primary-foreground/70 mb-3 leading-relaxed text-sm">
              Empowering youth and communities in Tanzania through sports, 
              education, and social inclusion.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-base mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading font-bold text-base mb-3">Programs</h4>
            <ul className="space-y-2">
              {programs.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-base mb-3">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  Dar es Salaam, Tanzania
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a
                  href="mailto:info@samattafoundation.org"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                >
                  info@samattafoundation.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+255712131079" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                    +255 712 131 079
                  </a>
                  <a href="tel:+255746411477" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                    +255 746 411 477
                  </a>
                  <a href="tel:+255656919595" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                    +255 656 919 595
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Samatta Foundation. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-primary-foreground/50 hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-primary-foreground/50 hover:text-secondary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
