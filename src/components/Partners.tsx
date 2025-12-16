import chapchapLogo from "@/assets/partners/chapchap-point.jpeg";
import gbbLogo from "@/assets/partners/gbb-insurance.jpeg";
import asasLogo from "@/assets/partners/asas.png";
import oryxLogo from "@/assets/partners/oryx-energies.png";
import sofascoreLogo from "@/assets/partners/sofascore.png";
import governmentLogo from "@/assets/partners/Government.jpeg";

const partners = [
  { name: "Government of Tanzania", logo: governmentLogo },
  { name: "Chap Chap Point", logo: chapchapLogo },
  { name: "GBB Insurance", logo: gbbLogo },
  { name: "ASAS", logo: asasLogo },
  { name: "Oryx Energies", logo: oryxLogo },
  { name: "Sofascore", logo: sofascoreLogo },
];

const Partners = () => {
  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/20 via-sky-50/10 to-blue-50/20 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-sky-300/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 mb-10 relative z-10">
        <h2 className="text-center text-lg font-medium text-muted-foreground uppercase tracking-wider">
          Our Partners & Sponsors
        </h2>
      </div>
      
      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />
        
        {/* Sliding container */}
        <div className="flex animate-slide-left">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
