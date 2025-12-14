import chapchapLogo from "@/assets/partners/chapchap-point.jpeg";
import gbbLogo from "@/assets/partners/gbb-insurance.jpeg";
import asasLogo from "@/assets/partners/asas.png";
import oryxLogo from "@/assets/partners/oryx-energies.png";
import sofascoreLogo from "@/assets/partners/sofascore.png";

const partners = [
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
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
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
