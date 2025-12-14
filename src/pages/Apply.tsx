import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { programApi } from "@/lib/api";
import { trackProgramApplication } from "@/components/Analytics";
import SEO from "@/components/SEO";
import { User, Mail, Phone, GraduationCap, Trophy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Apply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
      await programApi.apply(formData);
      
      // Track program application
      trackProgramApplication(formData.program_name);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We'll review your application and contact you soon.",
      });

      // Reset form
      setFormData({
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
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32">
      <SEO
        title="Apply to Programs - Samatta Foundation"
        description="Apply to join the Samatta Cup and other youth development programs. Transform your potential through sports and education with the Samatta Foundation."
        url="/apply"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Join Our Programs
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Program Application
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto">
              Apply to join one of our transformative programs and unlock your potential through sports and education.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="mb-8">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Application Form
                </h2>
                <p className="text-muted-foreground">
                  Please fill out all required fields. If applying for a participant under 18, a parent or guardian must complete this form.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Program Selection */}
                <div className="space-y-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-secondary" />
                    Program Selection
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="program_name">Select Program *</Label>
                    <Select
                      value={formData.program_name}
                      onValueChange={(value) => handleSelectChange("program_name", value)}
                      required
                    >
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
                  </div>
                </div>

                {/* Applicant Information */}
                <div className="space-y-6 pt-6 border-t">
                  <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    Applicant Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="applicant_name">Full Name *</Label>
                    <Input
                      id="applicant_name"
                      name="applicant_name"
                      value={formData.applicant_name}
                      onChange={handleChange}
                      required
                      placeholder="Participant's full name"
                      className="h-12"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="applicant_email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="applicant_email"
                        name="applicant_email"
                        type="email"
                        value={formData.applicant_email}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="applicant_phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="applicant_phone"
                        name="applicant_phone"
                        type="tel"
                        value={formData.applicant_phone}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth *</Label>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Guardian Information (for minors) */}
                <div className="space-y-6 pt-6 border-t">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    Parent/Guardian Information
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Required if applicant is under 18 years old
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="guardian_name">Guardian Name</Label>
                      <Input
                        id="guardian_name"
                        name="guardian_name"
                        value={formData.guardian_name}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardian_phone">Guardian Phone</Label>
                      <Input
                        id="guardian_phone"
                        name="guardian_phone"
                        type="tel"
                        value={formData.guardian_phone}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Education & Sports Background */}
                <div className="space-y-6 pt-6 border-t">
                  <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-secondary" />
                    Education & Sports Background
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="school_name">School/Institution</Label>
                      <Input
                        id="school_name"
                        name="school_name"
                        value={formData.school_name}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade_level">Grade/Level</Label>
                      <Input
                        id="grade_level"
                        name="grade_level"
                        value={formData.grade_level}
                        onChange={handleChange}
                        placeholder="e.g., Grade 10, Form 4"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sports_experience">Sports Experience</Label>
                    <Textarea
                      id="sports_experience"
                      name="sports_experience"
                      value={formData.sports_experience}
                      onChange={handleChange}
                      placeholder="Tell us about your sports background, teams you've played for, positions, etc."
                      className="min-h-[120px] resize-none"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6 pt-6 border-t">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    Additional Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medical_conditions">Medical Conditions or Allergies</Label>
                    <Textarea
                      id="medical_conditions"
                      name="medical_conditions"
                      value={formData.medical_conditions}
                      onChange={handleChange}
                      placeholder="Please list any medical conditions, allergies, or special requirements we should be aware of"
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional_info">Additional Comments</Label>
                    <Textarea
                      id="additional_info"
                      name="additional_info"
                      value={formData.additional_info}
                      onChange={handleChange}
                      placeholder="Any additional information you'd like to share"
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    By submitting this application, you agree to our terms and conditions and privacy policy.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Apply;

