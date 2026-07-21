import { z } from "zod";

const emailField = z.string().trim().email("Please enter a valid email address");
const phoneField = z.string().trim().optional().or(z.literal(""));

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: emailField,
  phone: phoneField,
  subject: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export const newsletterFormSchema = z.object({
  email: emailField,
  name: z.string().trim().optional(),
});

export const donationFormSchema = z
  .object({
    donor_name: z.string().trim().optional().or(z.literal("")),
    donor_email: emailField,
    donor_phone: phoneField,
    amount: z
      .string()
      .trim()
      .min(1, "Amount is required")
      .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, "Amount must be greater than zero"),
    currency: z.enum(["TZS", "USD", "EUR", "GBP"]),
    is_anonymous: z.boolean(),
    message: z.string().trim().optional().or(z.literal("")),
    campaign: z.string().trim().min(1),
  })
  .superRefine((data, ctx) => {
    if (!data.is_anonymous && !data.donor_name?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name is required unless donating anonymously",
        path: ["donor_name"],
      });
    }
  });

export const volunteerFormSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  email: emailField,
  phone: z.string().trim().min(7, "Phone number is required"),
  date_of_birth: z.string().trim().optional().or(z.literal("")),
  gender: z.string().trim().optional().or(z.literal("")),
  location: z.string().trim().optional().or(z.literal("")),
  skills: z.string().trim().optional().or(z.literal("")),
  interests: z.string().trim().optional().or(z.literal("")),
  availability: z.string().trim().optional().or(z.literal("")),
  experience: z.string().trim().optional().or(z.literal("")),
  why_volunteer: z.string().trim().min(10, "Please tell us why you want to volunteer"),
});

export const programApplicationSchema = z.object({
  program_name: z.string().trim().min(1, "Please select a program"),
  applicant_name: z.string().trim().min(2, "Applicant name is required"),
  applicant_email: emailField,
  applicant_phone: z.string().trim().min(7, "Phone number is required"),
  date_of_birth: z.string().trim().min(1, "Date of birth is required"),
  guardian_name: z.string().trim().optional().or(z.literal("")),
  guardian_phone: phoneField,
  school_name: z.string().trim().optional().or(z.literal("")),
  grade_level: z.string().trim().optional().or(z.literal("")),
  sports_experience: z.string().trim().optional().or(z.literal("")),
  medical_conditions: z.string().trim().optional().or(z.literal("")),
  additional_info: z.string().trim().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
export type DonationFormValues = z.infer<typeof donationFormSchema>;
export type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;
export type ProgramApplicationValues = z.infer<typeof programApplicationSchema>;

export type FormSubmissionType =
  | "contact"
  | "newsletter"
  | "volunteer"
  | "program_application"
  | "donation";
