import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { newsletterApi } from "@/lib/api";
import { newsletterFormSchema, type NewsletterFormData } from "@/lib/validations";
import { trackNewsletterSubscription } from "@/components/Analytics";
import { Mail, AlertCircle } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "default" | "footer";
}

const NewsletterSignup = ({ variant = "default" }: NewsletterSignupProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);

    try {
      await newsletterApi.subscribe(data.email, data.name);
      
      // Track newsletter subscription
      trackNewsletterSubscription();
      
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });

      reset();
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to subscribe. Please try again.";
      toast({
        title: "Subscription Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          aria-label="Email Address"
          aria-invalid={!!errors.email}
          disabled={isSubmitting}
          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={isSubmitting}
          className="shrink-0"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "..." : "Subscribe"}
        </Button>
        {errors.email && (
          <div className="text-xs text-destructive absolute mt-10">
            {errors.email.message}
          </div>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email address"
          {...register("email")}
          aria-label="Email Address"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isSubmitting}
          className="pl-10 h-12"
        />
        {errors.email && (
          <div id="email-error" className="flex items-center gap-2 text-sm text-destructive mt-2">
            <AlertCircle className="w-4 h-4" />
            {errors.email.message}
          </div>
        )}
      </div>
      <Button
        type="submit"
        variant="hero"
        size="lg"
        disabled={isSubmitting}
        className="shrink-0"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterSignup;