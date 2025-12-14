import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { testimonialsApi } from "@/lib/api";
import type { Testimonial as TestimonialType } from "@/lib/supabase";

// Fallback testimonials if no data in database
const fallbackTestimonials = [
  {
    id: "1",
    name: "John Mwaura",
    role: "Program Graduate, 2023",
    content:
      "The Samatta Foundation gave me more than football skills—it gave me hope and direction. Now I'm mentoring younger players in my community.",
    rating: 5,
  },
  {
    id: "2",
    name: "Grace Mwakasege",
    role: "Parent & Community Member",
    content:
      "Through the education support program, my daughter was able to stay in school. The Foundation truly cares about every child's future.",
    rating: 5,
  },
  {
    id: "3",
    name: "David Kimaro",
    role: "Community Partner",
    content:
      "Partnering with Samatta Foundation has shown us the real impact of sports on youth development. Their commitment is inspiring.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsApi.getFeatured();
        // Use fetched data if available, otherwise fallback
        setTestimonials(data.length > 0 ? data.slice(0, 3) : fallbackTestimonials as TestimonialType[]);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials(fallbackTestimonials as TestimonialType[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return null; // Don't show loading state for testimonials
  }

  return (
    <section id="impact" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            Impact Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Voices of Change
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from the communities we serve and the lives we've touched together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center shadow-glow">
                  <Quote className="w-5 h-5 text-secondary-foreground" />
                </div>
              </div>

              {/* Rating */}
              {testimonial.rating && (
                <div className="mt-4 mb-3">
                  {renderStars(testimonial.rating)}
                </div>
              )}

              {/* Quote */}
              <p className="text-foreground/90 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {testimonial.avatar_url ? (
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-heading font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  {testimonial.role && (
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.organization && `, ${testimonial.organization}`}
                    </div>
                  )}
                </div>
              </div>

              {/* Accent Line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
