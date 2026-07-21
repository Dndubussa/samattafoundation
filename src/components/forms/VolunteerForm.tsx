import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { volunteerApi } from "@/lib/api";
import { trackVolunteerSignup } from "@/components/Analytics";
import { useZodForm } from "@/hooks/use-zod-form";
import { volunteerFormSchema, type VolunteerFormValues } from "@/lib/schemas/forms";
import { getErrorMessage } from "@/lib/utils/errors";
import { User, Mail, Phone, MapPin, Heart, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultValues: VolunteerFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  gender: "",
  location: "",
  skills: "",
  interests: "",
  availability: "",
  experience: "",
  why_volunteer: "",
};

const VolunteerForm = () => {
  const { toast } = useToast();
  const form = useZodForm(volunteerFormSchema, defaultValues);
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = form;

  const onSubmit = async (values: VolunteerFormValues) => {
    try {
      await volunteerApi.register(values);
      trackVolunteerSignup();
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll contact you soon.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting volunteer registration:", error);
      toast({
        title: "Error",
        description: getErrorMessage(error, "Failed to submit application. Please try again."),
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-6">
        <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
          <User className="w-5 h-5 text-secondary" />
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name *</Label>
            <Input id="first_name" {...register("first_name")} className="h-12" />
            {errors.first_name && <p className="text-sm text-destructive">{errors.first_name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name *</Label>
            <Input id="last_name" {...register("last_name")} className="h-12" />
            {errors.last_name && <p className="text-sm text-destructive">{errors.last_name.message}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address *
            </Label>
            <Input id="email" type="email" {...register("email")} className="h-12" />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone Number *
            </Label>
            <Input id="phone" type="tel" {...register("phone")} className="h-12" />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date_of_birth" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Date of Birth
            </Label>
            <Input id="date_of_birth" type="date" {...register("date_of_birth")} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Location
            </Label>
            <Input id="location" {...register("location")} placeholder="Enter your city and region" className="h-12" />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-secondary" />
          Volunteer Details
        </h3>
        <div className="space-y-2">
          <Label htmlFor="skills">Skills & Expertise</Label>
          <Textarea id="skills" {...register("skills")} placeholder="Enter your skills and expertise" className="min-h-[80px] resize-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interests">Areas of Interest</Label>
          <Textarea id="interests" {...register("interests")} placeholder="Enter your areas of interest" className="min-h-[80px] resize-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Textarea id="availability" {...register("availability")} placeholder="Enter your availability schedule" className="min-h-[80px] resize-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Previous Volunteer Experience</Label>
          <Textarea id="experience" {...register("experience")} placeholder="Enter your previous volunteer experience" className="min-h-[100px] resize-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="why_volunteer">Why do you want to volunteer with us? *</Label>
          <Textarea id="why_volunteer" {...register("why_volunteer")} placeholder="Enter your motivation for volunteering" className="min-h-[120px] resize-none" />
          {errors.why_volunteer && <p className="text-sm text-destructive">{errors.why_volunteer.message}</p>}
        </div>
      </div>

      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting Application..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default VolunteerForm;
