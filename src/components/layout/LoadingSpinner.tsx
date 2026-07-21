import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner = ({ message = "Loading...", className }: LoadingSpinnerProps) => (
  <div className={cn("text-center py-12", className)}>
    <div
      className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
      role="status"
      aria-label={message}
    />
    <p className="text-muted-foreground mt-4">{message}</p>
  </div>
);

export default LoadingSpinner;
