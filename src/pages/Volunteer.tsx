import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { volunteerApi } from "@/lib/api";
import { trackVolunteerSignup } from "@/components/Analytics";
import SEO from "@/components/SEO";
import { User, Mail, Phone, MapPin, Heart, Calendar } from "lucide-react";
import { z } from "zod";
import { sendVolunteerWelcome } from "@/lib/email";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Validation schema for volunteer form
const volunteerFormSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters").max(50),
  last_name: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  date_of_birth: z.string().optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
  skills: z.string().optional(),
  interests: z.string().optional(),
  availability: z.string().optional(),
  experience: z.string().optional(),
  why_volunteer: z.string().min(10, "Please tell us why you want to volunteer"),
});

type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

const Volunteer = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof VolunteerFormData, string>>>({});
  const [formData, setFormData] = useState({
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
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = volunteerFormSchema.parse(formData);
      
      // Submit to database
      const result = await volunteerApi.register(validatedData);
      
      // Send welcome email
      try {
        await sendVolunteerWelcome({
          email: validatedData.email,
          name: `${validatedData.first_name} ${validatedData.last_name}`,
          interests: validatedData.interests || '',
        });
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Don't fail the whole process if email fails
      }
      
      // Track volunteer signup
      trackVolunteerSignup();
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We've sent a confirmation email and will contact you soon.",
      });

      // Reset form
      setFormData({
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
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof VolunteerFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof VolunteerFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        const firstErrorField = Object.keys(fieldErrors)[0];
        toast({
          title: "Please fix the errors",
          description: `${firstErrorField}: ${fieldErrors[firstErrorField as keyof VolunteerFormData]}`,
          variant: "destructive",
        });
      } else {
        console.error("Error submitting volunteer registration:", error);
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32">
      <SEO
        title="Become a Volunteer - Samatta Foundation"
        description="Join our team of passionate volunteers and make a real difference in the lives of Tanzanian youth. Apply to volunteer with the Samatta Foundation today."
        url="/volunteer"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Join Our Team
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Become a Volunteer
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto">
              Make a difference in the lives of young Tanzanians. Join our community of passionate volunteers.
            </p>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Why Volunteer With Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Make Real Impact",
                  description: "Directly contribute to changing lives and building stronger communities.",
                },
                {
                  title: "Gain Experience",
                  description: "Develop new skills and gain valuable experience in community development.",
                },
                {
                  title: "Join a Community",
                  description: "Connect with like-minded individuals passionate about making a difference.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-md text-center"
                >
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 via-sky-50/20 to-background relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-lg">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Volunteer Application Form
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className={`h-12 ${errors.first_name ? "border-destructive" : ""}`}
                      />
                      {errors.first_name && (
                        <p className="text-sm text-destructive">{errors.first_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className={`h-12 ${errors.last_name ? "border-destructive" : ""}`}
                      />
                      {errors.last_name && (
                        <p className="text-sm text-destructive">{errors.last_name}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`h-12 ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`h-12 ${errors.phone ? "border-destructive" : ""}`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date of Birth
                      </Label>
                      <Input
                        id="date_of_birth"
                        name="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                      >
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your city and region"
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Volunteer Information */}
                <div className="space-y-6 pt-6 border-t">
                  <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                    <Heart className="w-5 h-5 text-secondary" />
                    Volunteer Details
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills & Expertise</Label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="Enter your skills and expertise"
                      className="min-h-[80px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Areas of Interest</Label>
                    <Textarea
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="Enter your areas of interest"
                      className="min-h-[80px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Textarea
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="Enter your availability schedule"
                      className="min-h-[80px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Previous Volunteer Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Enter your previous volunteer experience"
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="why_volunteer">Why do you want to volunteer with us? *</Label>
                    <Textarea
                      id="why_volunteer"
                      name="why_volunteer"
                      value={formData.why_volunteer}
                      onChange={handleChange}
                      required
                      placeholder="Enter your motivation for volunteering"
                      className={`min-h-[120px] resize-none ${errors.why_volunteer ? "border-destructive" : ""}`}
                    />
                    {errors.why_volunteer && (
                      <p className="text-sm text-destructive">{errors.why_volunteer}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Volunteer;

