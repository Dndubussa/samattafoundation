import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { contactApi } from "@/lib/api";
import { trackContactFormSubmission } from "@/components/Analytics";
import { useZodForm } from "@/hooks/use-zod-form";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas/forms";
import { getErrorMessage } from "@/lib/utils/errors";
import { Mail, Phone, User, MessageSquare } from "lucide-react";

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const { toast } = useToast();
  const form = useZodForm(contactFormSchema, defaultValues);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form;

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await contactApi.submit(values);
      trackContactFormSubmission();
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: getErrorMessage(error, "Failed to send message. Please try again."),
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </Label>
          <Input id="name" {...register("name")} placeholder="Enter your full name" className="h-12" />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input id="email" type="email" {...register("email")} placeholder="Enter your email address" className="h-12" />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </Label>
          <Input id="phone" type="tel" {...register("phone")} placeholder="Enter your phone number" className="h-12" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Subject
          </Label>
          <Input id="subject" {...register("subject")} placeholder="Enter subject of your message" className="h-12" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Enter your message here"
          className="min-h-[150px] resize-none"
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
