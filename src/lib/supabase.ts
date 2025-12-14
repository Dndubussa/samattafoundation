import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oxdwsddpvlpernigkzro.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZHdzZGRwdmxwZXJuaWdrenJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NzkyODEsImV4cCI6MjA4MTI1NTI4MX0.gO9IwB3R7rn8WdjY9Uf5Ppg8-tbmtA_zXrsHGLvsD1M';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (auto-generated interfaces)
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewsletterSubscription {
  id?: string;
  email: string;
  name?: string;
  is_active?: boolean;
  subscribed_at?: string;
  unsubscribed_at?: string;
}

export interface VolunteerRegistration {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth?: string;
  gender?: string;
  location?: string;
  skills?: string;
  interests?: string;
  availability?: string;
  experience?: string;
  why_volunteer?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProgramApplication {
  id?: string;
  program_name: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  date_of_birth?: string;
  guardian_name?: string;
  guardian_phone?: string;
  school_name?: string;
  grade_level?: string;
  sports_experience?: string;
  medical_conditions?: string;
  additional_info?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: string;
  featured_image_url?: string;
  category?: string;
  tags?: string[];
  is_published?: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  views_count?: number;
}

export interface Testimonial {
  id?: string;
  name: string;
  role?: string;
  organization?: string;
  content: string;
  avatar_url?: string;
  rating?: number;
  is_featured?: boolean;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Donation {
  id?: string;
  donor_name?: string;
  donor_email: string;
  donor_phone?: string;
  amount: number;
  currency?: string;
  payment_method?: string;
  payment_reference?: string;
  payment_status?: string;
  is_anonymous?: boolean;
  message?: string;
  campaign?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id?: string;
  title: string;
  slug: string;
  description: string;
  event_type: string;
  location: string;
  start_date: string;
  end_date?: string;
  registration_deadline?: string;
  max_participants?: number;
  current_participants?: number;
  featured_image_url?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

