import { z } from 'zod';

// Contact Form Validation Schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .optional()
    .or(z.literal('')),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
});

// Newsletter Signup Schema
export const newsletterFormSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
});

// Donation Form Validation Schema
export const donationFormSchema = z.object({
  donor_name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  donor_email: z.string()
    .email('Please enter a valid email address'),
  donor_phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .optional()
    .or(z.literal('')),
  amount: z.string()
    .refine((val) => !isNaN(parseFloat(val)), 'Amount must be a valid number')
    .refine((val) => parseFloat(val) > 0, 'Amount must be greater than 0'),
  currency: z.enum(['TZS', 'USD', 'EUR', 'GBP'], {
    errorMap: () => ({ message: 'Please select a valid currency' })
  }),
  is_anonymous: z.boolean().default(false),
  message: z.string()
    .max(500, 'Message must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  campaign: z.string()
    .min(1, 'Please select a campaign')
    .optional()
    .or(z.literal('general')),
});

// Volunteer Registration Schema
export const volunteerFormSchema = z.object({
  first_name: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must be less than 100 characters'),
  last_name: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must be less than 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters'),
  date_of_birth: z.string()
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Please enter a valid date')
    .optional()
    .or(z.literal('')),
  gender: z.enum(['Male', 'Female', 'Other', ''], {
    errorMap: () => ({ message: 'Please select a valid gender' })
  }).optional(),
  location: z.string()
    .max(100, 'Location must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  skills: z.string()
    .max(500, 'Skills must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  interests: z.string()
    .max(500, 'Interests must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  availability: z.string()
    .max(200, 'Availability must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  experience: z.string()
    .max(500, 'Experience must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  why_volunteer: z.string()
    .min(10, 'Please tell us why you want to volunteer (at least 10 characters)')
    .max(1000, 'Motivation must be less than 1000 characters'),
});

// Program Application Schema
export const programApplicationSchema = z.object({
  program_name: z.string()
    .min(1, 'Please select a program'),
  applicant_name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  applicant_email: z.string()
    .email('Please enter a valid email address'),
  applicant_phone: z.string()
    .min(10, 'Phone number must be at least 10 characters'),
  date_of_birth: z.string()
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Please enter a valid date')
    .optional()
    .or(z.literal('')),
  guardian_name: z.string()
    .max(100, 'Guardian name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  guardian_phone: z.string()
    .optional()
    .or(z.literal('')),
  school_name: z.string()
    .max(200, 'School name must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  grade_level: z.string()
    .max(50, 'Grade level must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  sports_experience: z.string()
    .max(500, 'Experience must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  medical_conditions: z.string()
    .max(500, 'Medical conditions must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  additional_info: z.string()
    .max(1000, 'Additional info must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
export type DonationFormData = z.infer<typeof donationFormSchema>;
export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
export type ProgramApplicationData = z.infer<typeof programApplicationSchema>;
