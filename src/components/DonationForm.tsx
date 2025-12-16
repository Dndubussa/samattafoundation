import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { donationsApi } from "@/lib/api";
import { trackDonation } from "@/components/Analytics";
import { DollarSign, Heart, Mail, User } from "lucide-react";
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
  const [formData, setFormData] = useState({
    donor_name: "",
    donor_email: "",
    donor_phone: "",
    amount: "",
    currency: "TZS",
    is_anonymous: false,
    message: "",
    campaign: "general",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create donation record
      const amount = parseFloat(formData.amount);
      await donationsApi.create({
        ...formData,
        amount,
        payment_status: "pending",
      });
      
      // Track donation
      trackDonation(amount, formData.currency);
      
      toast({
        title: "Donation Initiated!",
        description: "Thank you for your generosity. You will be redirected to complete the payment.",
      });

      // In production, redirect to payment gateway here
      // For now, just show success message

      // Reset form
      setFormData({
        donor_name: "",
        donor_email: "",
        donor_phone: "",
        amount: "",
        currency: "TZS",
        is_anonymous: false,
        message: "",
        campaign: "general",
      });
    } catch (error) {
      console.error("Error processing donation:", error);
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="campaign">Donation Purpose</Label>
        <Select
          value={formData.campaign}
          onValueChange={(value) => handleSelectChange("campaign", value)}
        >
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Amount *
          </Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            min="1"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="Enter amount"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => handleSelectChange("currency", value)}
          >
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
            name="donor_name"
            value={formData.donor_name}
            onChange={handleChange}
            required={!formData.is_anonymous}
            disabled={formData.is_anonymous}
            placeholder="Enter your full name"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="donor_email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id="donor_email"
            name="donor_email"
            type="email"
            value={formData.donor_email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className="h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="donor_phone">Phone Number (Optional)</Label>
        <Input
          id="donor_phone"
          name="donor_phone"
          type="tel"
          value={formData.donor_phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message or dedication (optional)"
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_anonymous"
          checked={formData.is_anonymous}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, is_anonymous: checked as boolean })
          }
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
        >
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

