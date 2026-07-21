import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * Shared page hero - clean white editorial style, no gradient background.
 * Uses a thick left-border primary rule and ruled bottom divider.
 */
const PageHero = ({ badge, title, description, className }: PageHeroProps) => (
  <section className={cn("pt-36 pb-16 bg-white border-b border-border", className)}>
    <div className="container mx-auto px-4">
      <div className="max-w-3xl">
        <span className="section-kicker">{badge}</span>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-5">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  </section>
);

export default PageHero;