import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { donationsApi } from "@/lib/api";
import { trackDonation } from "@/components/Analytics";
import { useZodForm } from "@/hooks/use-zod-form";
import { donationFormSchema, type DonationFormValues } from "@/lib/schemas/forms";
import { getErrorMessage } from "@/lib/utils/errors";
import { DollarSign, Heart, Mail, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const defaultValues: DonationFormValues = {
  donor_name: "",
  donor_email: "",
  donor_phone: "",
  amount: "",
  currency: "TZS",
  is_anonymous: false,
  message: "",
  campaign: "general",
};

const DonationForm = () => {
  const { toast } = useToast();
  const form = useZodForm(donationFormSchema, defaultValues);
  const { register, handleSubmit, control, watch, setValue, formState: { errors, isSubmitting }, reset } = form;
  const isAnonymous = watch("is_anonymous");

  const onSubmit = async (values: DonationFormValues) => {
    try {
      const amount = Number(values.amount);
      await donationsApi.create({
        ...values,
        amount,
        payment_status: "pending",
      });
      trackDonation(amount, values.currency);
      toast({
        title: "Donation Initiated!",
        description: "Thank you for your generosity. You will be redirected to complete the payment.",
      });
      reset(defaultValues);
    } catch (error) {
      console.error("Error processing donation:", error);
      toast({
        title: "Error",
        description: getErrorMessage(error, "Failed to process donation. Please try again."),
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-2">
        <Label htmlFor="campaign">Donation Purpose</Label>
        <Controller
          name="campaign"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-12">
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
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Amount *
          </Label>
          <Input
            id="amount"
            type="number"
            min="1"
            step="0.01"
            {...register("amount")}
            placeholder="Enter amount"
            className="h-12"
          />
          {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TZS">TZS (Tanzanian Shilling)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="donor_name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </Label>
          <Input
            id="donor_name"
            {...register("donor_name")}
            disabled={isAnonymous}
            placeholder="Enter your full name"
            className="h-12"
          />
          {errors.donor_name && <p className="text-sm text-destructive">{errors.donor_name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="donor_email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id="donor_email"
            type="email"
            {...register("donor_email")}
            placeholder="Enter your email address"
            className="h-12"
          />
          {errors.donor_email && <p className="text-sm text-destructive">{errors.donor_email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="donor_phone">Phone Number (Optional)</Label>
        <Input id="donor_phone" type="tel" {...register("donor_phone")} placeholder="Enter your phone number" className="h-12" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Enter your message or dedication (optional)"
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_anonymous"
          checked={isAnonymous}
          onCheckedChange={(checked) => {
            setValue("is_anonymous", checked === true);
            if (checked) setValue("donor_name", "");
          }}
        />
        <Label htmlFor="is_anonymous" className="text-sm font-normal cursor-pointer">
          Make this donation anonymous
        </Label>
      </div>

      <div className="pt-4">
        <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
          <Heart className="mr-2 w-5 h-5" />
          {isSubmitting ? "Processing..." : "Donate Now"}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Your donation is secure and will make a real difference in the lives of young Tanzanians.
        </p>
      </div>
    </form>
  );
};

export default DonationForm;
