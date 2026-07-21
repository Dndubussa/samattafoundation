import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

/** Clean section wrapper used across content pages. No gradient blobs. */
const SectionBackground = ({ children, className }: SectionBackgroundProps) => (
  <section
    className={cn(
      "py-20 bg-white border-t border-border",
      className,
    )}
  >
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

export default SectionBackground;