import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import samattaLogo from "@/assets/SF LOGO.png";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 sm:px-6 md:px-8 ${isScrolled ? "pt-4" : "pt-6 md:pt-8"}`}>
      <nav
        className={`mx-auto max-w-6xl transition-all duration-500 ease-in-out rounded-full ${
          isScrolled
            ? "bg-white/85 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 py-1.5 px-2"
            : "bg-white/95 backdrop-blur-md shadow-sm border border-black/5 py-2.5 px-4"
        }`}
      >
        <div className="flex items-center justify-between px-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            onClick={handleLogoClick}
            aria-label="Samatta Foundation - Home"
          >
            <img
              src={samattaLogo}
              alt="Samatta Foundation"
              className={`w-auto transition-all duration-500 group-hover:scale-105 ${isScrolled ? "h-12" : "h-16"}`}
            />

          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center bg-transparent">
            <div className="flex items-center gap-1 mr-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full group ${
                      isActive
                        ? "text-white bg-primary shadow-[0_2px_12px_hsl(230_78%_24%/0.35)] scale-[1.03]"
                        : "text-foreground/70 hover:text-foreground hover:bg-sky-100/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <Button variant="hero" size={isScrolled ? "sm" : "default"} className="rounded-full shadow-md hover:shadow-lg transition-all" asChild>
              <Link to="/donate">Support Our Mission</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 -mr-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span className={`absolute transition-all duration-300 ${isMobileMenuOpen ? "rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}>
                <Menu size={24} />
              </span>
              <span className={`absolute transition-all duration-300 ${isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-50"}`}>
                <X size={24} />
              </span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden absolute top-full left-4 right-4 mt-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`px-5 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-white bg-primary shadow-sm"
                    : "text-foreground/80 hover:text-foreground hover:bg-sky-100/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="px-2 pt-4 pb-2 mt-2 border-t border-border/50">
            <Button variant="hero" size="lg" className="w-full rounded-2xl shadow-md" asChild>
              <Link to="/donate">Support Our Mission</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
