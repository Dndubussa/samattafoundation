import { Link, useParams } from "react-router-dom";
import { Calendar, User, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPost } from "@/hooks/queries/use-blog";
import { formatLongDate } from "@/lib/utils/date";
import { sanitizeHtml } from "@/lib/utils/sanitize";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPost(slug);

  if (isLoading) {
    return (
      <main className="pt-24">
        <div className="container mx-auto px-4 py-20">
          <LoadingSpinner message="Loading post..." />
        </div>
      </main>
    );
  }

  if (isError || !post) {
    return (
      <main className="pt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24">
      <section className="py-4 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {post.featured_image_url && (
        <section className="relative h-[400px] overflow-hidden">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </section>
      )}

      <article className="py-12 bg-background relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {post.category && (
              <span className="section-kicker mb-6">
                {post.category}
              </span>
            )}

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 pb-6 mb-8 border-b text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatLongDate(post.published_at || post.created_at)}</span>
              </div>
              {post.views_count !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{post.views_count} views</span>
                </div>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-img:rounded-xl prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-secondary 
                prose-blockquote:pl-6 prose-blockquote:italic
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-heading font-bold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
