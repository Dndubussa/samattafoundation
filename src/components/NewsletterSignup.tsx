import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { newsletterApi } from "@/lib/api";
import { trackNewsletterSubscription } from "@/components/Analytics";
import { useZodForm } from "@/hooks/use-zod-form";
import { newsletterFormSchema, type NewsletterFormValues } from "@/lib/schemas/forms";
import { getErrorMessage } from "@/lib/utils/errors";
import { Mail } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "default" | "footer";
}

const NewsletterSignup = ({ variant = "default" }: NewsletterSignupProps) => {
  const { toast } = useToast();
  const form = useZodForm(newsletterFormSchema, { email: "" });
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form;

  const onSubmit = async (values: NewsletterFormValues) => {
    try {
      await newsletterApi.subscribe(values.email);
      trackNewsletterSubscription();
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      reset();
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Subscription Error",
        description: getErrorMessage(error, "Failed to subscribe. Please try again."),
        variant: "destructive",
      });
    }
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2" noValidate>
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <Button type="submit" variant="secondary" disabled={isSubmitting} className="shrink-0">
          {isSubmitting ? "..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email address"
          {...register("email")}
          className="pl-10 h-12"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>
      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="shrink-0">
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterSignup;
