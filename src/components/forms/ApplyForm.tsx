import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { programApi } from "@/lib/api";
import { trackProgramApplication } from "@/components/Analytics";
import { useZodForm } from "@/hooks/use-zod-form";
import { programApplicationSchema, type ProgramApplicationValues } from "@/lib/schemas/forms";
import { getErrorMessage } from "@/lib/utils/errors";
import { User, Mail, Phone, GraduationCap, Trophy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultValues: ProgramApplicationValues = {
  program_name: "",
  applicant_name: "",
  applicant_email: "",
  applicant_phone: "",
  date_of_birth: "",
  guardian_name: "",
  guardian_phone: "",
  school_name: "",
  grade_level: "",
  sports_experience: "",
  medical_conditions: "",
  additional_info: "",
};

const ApplyForm = () => {
  const { toast } = useToast();
  const form = useZodForm(programApplicationSchema, defaultValues);
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = form;

  const onSubmit = async (values: ProgramApplicationValues) => {
    try {
      await programApi.apply(values);
      trackProgramApplication(values.program_name);
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application and contact you soon.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: getErrorMessage(error, "Failed to submit application. Please try again."),
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div className="space-y-6">
        <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          Program Selection
        </h3>
        <div className="space-y-2">
          <Label htmlFor="program_name">Select Program *</Label>
          <Controller
            name="program_name"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose a program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="samatta_cup">Samatta Cup</SelectItem>
                  <SelectItem value="youth_development">Youth Development Program</SelectItem>
                  <SelectItem value="education_support">Education Support</SelectItem>
                  <SelectItem value="coaching_clinic">Coaching Clinic</SelectItem>
                  <SelectItem value="health_awareness">Health & Wellness Program</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.program_name && <p className="text-sm text-destructive">{errors.program_name.message}</p>}
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
          <User className="w-5 h-5 text-secondary" />
          Applicant Information
        </h3>
        <div className="space-y-2">
          <Label htmlFor="applicant_name">Full Name *</Label>
          <Input id="applicant_name" {...register("applicant_name")} placeholder="Enter participant's full name" className="h-12" />
          {errors.applicant_name && <p className="text-sm text-destructive">{errors.applicant_name.message}</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="applicant_email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address *
            </Label>
            <Input id="applicant_email" type="email" {...register("applicant_email")} className="h-12" />
            {errors.applicant_email && <p className="text-sm text-destructive">{errors.applicant_email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="applicant_phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone Number *
            </Label>
            <Input id="applicant_phone" type="tel" {...register("applicant_phone")} className="h-12" />
            {errors.applicant_phone && <p className="text-sm text-destructive">{errors.applicant_phone.message}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date_of_birth">Date of Birth *</Label>
          <Input id="date_of_birth" type="date" {...register("date_of_birth")} className="h-12" />
          {errors.date_of_birth && <p className="text-sm text-destructive">{errors.date_of_birth.message}</p>}
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-heading text-xl font-semibold text-foreground">Parent/Guardian Information</h3>
        <p className="text-sm text-muted-foreground">Required if applicant is under 18 years old</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="guardian_name">Guardian Name</Label>
            <Input id="guardian_name" {...register("guardian_name")} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guardian_phone">Guardian Phone</Label>
            <Input id="guardian_phone" type="tel" {...register("guardian_phone")} className="h-12" />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-secondary" />
          Education & Sports Background
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="school_name">School/Institution</Label>
            <Input id="school_name" {...register("school_name")} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade_level">Grade/Level</Label>
            <Input id="grade_level" {...register("grade_level")} placeholder="Enter grade or level" className="h-12" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sports_experience">Sports Experience</Label>
          <Textarea id="sports_experience" {...register("sports_experience")} placeholder="Enter your sports experience and background" className="min-h-[120px] resize-none" />
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t">
        <h3 className="font-heading text-xl font-semibold text-foreground">Additional Information</h3>
        <div className="space-y-2">
          <Label htmlFor="medical_conditions">Medical Conditions or Allergies</Label>
          <Textarea id="medical_conditions" {...register("medical_conditions")} placeholder="Enter any medical conditions or allergies" className="min-h-[100px] resize-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="additional_info">Additional Comments</Label>
          <Textarea id="additional_info" {...register("additional_info")} placeholder="Enter any additional information" className="min-h-[100px] resize-none" />
        </div>
      </div>

      <div className="pt-6 border-t">
        <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting Application..." : "Submit Application"}
        </Button>
        <p className="text-sm text-muted-foreground text-center mt-4">
          By submitting this application, you agree to our terms and conditions and privacy policy.
        </p>
      </div>
    </form>
  );
};

export default ApplyForm;
