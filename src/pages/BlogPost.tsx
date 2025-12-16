import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogApi } from "@/lib/api";
import type { BlogPost as BlogPostType } from "@/lib/supabase";
import { Calendar, User, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const data = await blogApi.getPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <main className="pt-32">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading post...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="pt-32">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              Post Not Found
            </h1>
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
    <main className="pt-32">
      {/* Back Button */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      {post.featured_image_url && (
        <section className="relative h-[400px] overflow-hidden">
          <img
            src={post.featured_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        </section>
      )}

      {/* Article Content */}
      <article className="py-12 bg-gradient-to-b from-blue-50/20 via-sky-50/10 to-background relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            {post.category && (
              <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
                {post.category}
              </span>
            )}

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 pb-6 mb-8 border-b text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.published_at || post.created_at || "")}</span>
              </div>
              {post.views_count !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{post.views_count} views</span>
                </div>
              )}
            </div>

            {/* Content */}
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
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-heading font-bold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
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

