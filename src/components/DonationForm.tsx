import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { donationsApi } from "@/lib/api";
import { donationFormSchema, type DonationFormData } from "@/lib/validations";
import { trackDonation } from "@/components/Analytics";
import { initiateClickPesaPayment } from "@/lib/payment";
import { DollarSign, Heart, Mail, User, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DonationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donor_name: "",
      donor_email: "",
      donor_phone: "",
      amount: "",
      currency: "TZS",
      is_anonymous: false,
      message: "",
      campaign: "general",
    },
  });

  const amount = watch("amount");

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);

    try {
      // Create donation record in database
      const parsedAmount = parseFloat(data.amount);
      const donationRecord = await donationsApi.create({
        ...data,
        amount: parsedAmount,
        payment_status: "pending",
      });
      
      // Track donation
      trackDonation(parsedAmount, data.currency);
      
      toast({
        title: "Processing Payment...",
        description: "Redirecting to ClickPesa to complete your donation.",
      });

      // Initiate ClickPesa payment
      const paymentResult = await initiateClickPesaPayment({
        amount: parsedAmount,
        currency: data.currency,
        email: data.donor_email,
        phone: data.donor_phone,
        description: `Donation to Samatta Foundation - ${data.campaign}`,
        metadata: {
          donor_name: data.is_anonymous ? undefined : data.donor_name,
          campaign: data.campaign,
          donation_id: donationRecord?.id,
        },
      });

      if (paymentResult.status !== 'success') {
        throw new Error(paymentResult.message);
      }

      // Note: User will be redirected by initiateClickPesaPayment
      // No need to reset or show success here
    } catch (error) {
      console.error("Error processing donation:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to process donation. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnonymousChange = (checked: boolean) => {
    setIsAnonymous(checked);
    setValue("is_anonymous", checked);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="campaign">Donation Purpose</Label>
        <Select
          {...register("campaign")}
          onValueChange={(value) => setValue("campaign", value)}
        >
          <SelectTrigger className="h-12" aria-label="Donation Purpose">
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Fund</SelectItem>
            <SelectItem value="samatta_cup">Samatta Cup</SelectItem>
            <SelectItem value="education">Education Support</SelectItem>
            <SelectItem value="health">Health & Wellness</SelectItem>
            <SelectItem value="infrastructure">Sports Infrastructure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Amount <span className="text-destructive">*</span>
          </Label>
          <Input
            id="amount"
            type="number"
            min="1"
            step="0.01"
            {...register("amount")}
            placeholder="Enter amount"
            className="h-12"
            aria-label="Donation Amount"
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? "amount-error" : undefined}
          />
          {errors.amount && (
            <div id="amount-error" className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" />
              {errors.amount.message}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            {...register("currency")}
            onValueChange={(value) => setValue("currency", value as "TZS" | "USD" | "EUR" | "GBP")}
          >
            <SelectTrigger className="h-12" aria-label="Currency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TZS">TZS (Tanzanian Shilling)</SelectItem>
              <SelectItem value="USD">USD (US Dollar)</SelectItem>
              <SelectItem value="EUR">EUR (Euro)</SelectItem>
              <SelectItem value="GBP">GBP (British Pound)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="donor_name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name {!isAnonymous && <span className="text-destructive">*</span>}
          </Label>
          <Input
            id="donor_name"
            {...register("donor_name")}
            disabled={isAnonymous}
            placeholder={isAnonymous ? "Anonymous" : "Enter your full name"}
            className="h-12"
            aria-label="Donor Name"
            aria-invalid={!!errors.donor_name}
            aria-describedby={errors.donor_name ? "donor_name-error" : undefined}
          />
          {errors.donor_name && (
            <div id="donor_name-error" className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" />
              {errors.donor_name.message}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="donor_email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="donor_email"
            type="email"
            {...register("donor_email")}
            placeholder="Enter your email address"
            className="h-12"
            aria-label="Donor Email"
            aria-invalid={!!errors.donor_email}
            aria-describedby={errors.donor_email ? "donor_email-error" : undefined}
          />
          {errors.donor_email && (
            <div id="donor_email-error" className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" />
              {errors.donor_email.message}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="donor_phone">Phone Number (Optional)</Label>
        <Input
          id="donor_phone"
          type="tel"
          {...register("donor_phone")}
          placeholder="Enter your phone number"
          className="h-12"
          aria-label="Donor Phone"
          aria-invalid={!!errors.donor_phone}
          aria-describedby={errors.donor_phone ? "donor_phone-error" : undefined}
        />
        {errors.donor_phone && (
          <div id="donor_phone-error" className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="w-4 h-4" />
            {errors.donor_phone.message}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Enter your message or dedication (optional)"
          className="min-h-[100px] resize-none"
          aria-label="Donation Message"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <div id="message-error" className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="w-4 h-4" />
            {errors.message.message}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_anonymous"
          checked={isAnonymous}
          onCheckedChange={handleAnonymousChange}
          aria-label="Make this donation anonymous"
        />
        <Label
          htmlFor="is_anonymous"
          className="text-sm font-normal cursor-pointer"
        >
          Make this donation anonymous
        </Label>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
          aria-busy={isSubmitting}
        >
          <Heart className="mr-2 w-5 h-5" />
          {isSubmitting ? "Processing..." : amount ? `Donate ${amount}` : "Donate Now"}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Your donation is secure and will make a real difference in the lives of young Tanzanians.
        </p>
      </div>
    </form>
  );
};

export default DonationForm;