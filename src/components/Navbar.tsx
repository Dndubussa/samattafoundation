import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import samattaLogo from "@/assets/SAMATTA FOUNDATION LOGO.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-primary/10' 
          : 'bg-white/90 backdrop-blur-md shadow-md'
      }`}
    >
      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-4 group relative"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-sky-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
              <img
                src={samattaLogo}
                alt="Samatta Foundation"
                className="w-auto h-16 relative z-10 transition-all duration-500 group-hover:scale-105 drop-shadow-lg"
              />
            </div>
            {/* Foundation Name */}
            <div className="hidden sm:flex flex-col">
              <span className="font-heading text-xl font-bold text-foreground leading-tight tracking-tight">
                Samatta Foundation
              </span>
              <span className="text-xs font-medium text-primary/70 tracking-wide uppercase">
                Empowering Youth
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative px-4 py-2 font-semibold text-sm transition-all duration-300 group ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-foreground/70 hover:text-primary'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover Background */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/10 scale-100' 
                      : 'bg-primary/5 scale-0 group-hover:scale-100'
                  }`} />
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary to-sky-500 rounded-full" />
                  )}
                  {/* Hover Underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>
              );
            })}
            
            {/* CTA Button */}
            <div className="ml-4 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-sky-500 rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300" />
              <Button variant="hero" size="default" className="relative shadow-lg" asChild>
                <Link to="/donate">
                  <span className="flex items-center gap-2">
                    Donate Now
                    <span className="text-lg">❤️</span>
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-300 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="transition-transform duration-300 rotate-90" />
            ) : (
              <Menu size={24} className="transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white backdrop-blur-xl border-b border-primary/10 shadow-2xl animate-fade-in-up z-40">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground/70 hover:bg-primary/5 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="flex items-center justify-between">
                      {link.label}
                      {isActive && <span className="text-primary">•</span>}
                    </span>
                  </Link>
                );
              })}
              
              <div className="mt-4 pt-4 border-t border-primary/10">
                <Button variant="hero" size="lg" className="w-full shadow-lg" asChild>
                  <Link to="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="flex items-center justify-center gap-2">
                      Donate Now
                      <span className="text-lg">❤️</span>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
