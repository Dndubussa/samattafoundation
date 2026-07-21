import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { useBlogPosts } from "@/hooks/queries/use-blog";
import { formatLongDate } from "@/lib/utils/date";
import PageHero from "@/components/layout/PageHero";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import SEO from "@/components/SEO";

const Blog = () => {
  const { data: posts = [], isLoading } = useBlogPosts(20);

  return (
    <main>
      <SEO
        title="Blog - Samatta Foundation"
        description="Read the latest news, stories, and updates from the Samatta Foundation. Discover how we are making an impact in Tanzanian communities."
        url="/blog"
      />

      <PageHero
        badge="News & Stories"
        title="Our Blog"
        description="Stories of impact, news, and insights from the Samatta Foundation community."
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingSpinner message="Loading posts..." />
          ) : posts.length === 0 ? (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full border-2 border-border flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-3">No Blog Posts Yet</h2>
              <p className="text-muted-foreground">
                Check back soon for inspiring stories and updates from our foundation.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col shadow-sm">
                    {post.featured_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      {post.category && (
                        <span className="inline-block border border-secondary/40 text-secondary rounded-full text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 mb-4 w-fit">
                          {post.category}
                        </span>
                      )}
                      <h2 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatLongDate(post.published_at || post.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;