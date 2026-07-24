import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * Shared page hero — branded deep-navy gradient, amber kicker, white text.
 * Used across About, Programs, Contact, Volunteer, Apply, Blog, Donate.
 */
const PageHero = ({ badge, title, description, className }: PageHeroProps) => (
  <section
    className={cn("pt-36 pb-20 relative overflow-hidden", className)}
    style={{
      background:
        "linear-gradient(135deg, hsl(230 78% 10%) 0%, hsl(230 78% 16%) 55%, hsl(205 70% 20%) 100%)",
    }}
  >
    {/* Soft glow orbs */}
    <div
      className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
      style={{ background: "radial-gradient(circle, hsl(205 70% 50%) 0%, transparent 70%)" }}
    />
    <div
      className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-15"
      style={{ background: "radial-gradient(circle, hsl(38 95% 48%) 0%, transparent 70%)" }}
    />



    <div className="container mx-auto px-4 relative z-20">
      <div className="max-w-3xl">
        {/* Amber kicker */}
        <span className="inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-amber-400 mb-5">
          <span className="block h-px w-6 bg-amber-400/50" />
          {badge}
        </span>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  </section>
);

export default PageHero;