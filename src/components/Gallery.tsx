import event1 from "@/assets/gallery/event-1.jpg";
import event2 from "@/assets/gallery/event-2.jpg";
import event3 from "@/assets/gallery/event-3.jpg";
import event4 from "@/assets/gallery/event-4.jpg";
import event5 from "@/assets/gallery/event-5.jpg";
import event6 from "@/assets/gallery/event-6.jpg";

const galleryImages = [
  {
    src: event1,
    alt: "Community event with partners",
    caption: "Community Outreach",
  },
  {
    src: event2,
    alt: "Partnership meeting with TIKA",
    caption: "International Partnerships",
  },
  {
    src: event3,
    alt: "Team collaboration meeting",
    caption: "Building Connections",
  },
  {
    src: event4,
    alt: "Partnership handshake",
    caption: "Strengthening Bonds",
  },
  {
    src: event5,
    alt: "Foundation meeting with TIKA representatives",
    caption: "TIKA Partnership",
  },
  {
    src: event6,
    alt: "Mbwana Samatta with international partners",
    caption: "Global Collaboration",
  },
];

const Gallery = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-sky-50/30 via-blue-50/20 to-cyan-50/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Moments That Matter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Capturing the essence of our work through community engagement, partnerships, and the smiles we create together.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-video animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-primary-foreground">
                  <p className="font-heading font-semibold text-lg">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
