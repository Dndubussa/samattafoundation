export const queryKeys = {
  blog: {
    all: ["blog"] as const,
    posts: (limit?: number) => [...queryKeys.blog.all, "posts", limit] as const,
    post: (slug: string) => [...queryKeys.blog.all, "post", slug] as const,
    byCategory: (category: string) => [...queryKeys.blog.all, "category", category] as const,
  },
  testimonials: {
    all: ["testimonials"] as const,
    featured: () => [...queryKeys.testimonials.all, "featured"] as const,
    published: () => [...queryKeys.testimonials.all, "published"] as const,
  },
  events: {
    upcoming: ["events", "upcoming"] as const,
  },
  donations: {
    recent: (limit?: number) => ["donations", "recent", limit] as const,
    total: ["donations", "total"] as const,
  },
} as const;
