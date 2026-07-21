import { useQuery } from "@tanstack/react-query";
import { testimonialsApi } from "@/lib/api";
import type { Testimonial } from "@/lib/types/database";
import { queryKeys } from "@/hooks/queries/keys";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Mwaura",
    role: "Program Graduate, 2023",
    content:
      "The Samatta Foundation gave me more than football skills-it gave me hope and direction. Now I'm mentoring younger players in my community.",
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

export function useFeaturedTestimonials(limit = 3) {
  return useQuery({
    queryKey: queryKeys.testimonials.featured(),
    queryFn: async () => {
      try {
        const data = await testimonialsApi.getFeatured();
        return data.length > 0 ? data.slice(0, limit) : fallbackTestimonials;
      } catch {
        return fallbackTestimonials;
      }
    },
    retry: false,
  });
}

export { fallbackTestimonials };
