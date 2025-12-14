import { supabase } from './supabase';
import type {
  ContactSubmission,
  NewsletterSubscription,
  VolunteerRegistration,
  ProgramApplication,
  BlogPost,
  Testimonial,
  Donation,
  Event,
} from './supabase';

// Contact Form API
export const contactApi = {
  async submit(data: ContactSubmission) {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },
};

// Newsletter API
export const newsletterApi = {
  async subscribe(email: string, name?: string) {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email, name }])
      .select()
      .single();
    
    if (error) {
      // Check if already subscribed
      if (error.code === '23505') {
        throw new Error('This email is already subscribed to our newsletter.');
      }
      throw error;
    }
    return data;
  },

  async unsubscribe(email: string) {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
      .eq('email', email);
    
    if (error) throw error;
  },
};

// Volunteer API
export const volunteerApi = {
  async register(data: VolunteerRegistration) {
    const { data: result, error } = await supabase
      .from('volunteer_registrations')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },
};

// Program Application API
export const programApi = {
  async apply(data: ProgramApplication) {
    const { data: result, error } = await supabase
      .from('program_applications')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async getEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });
    
    if (error) throw error;
    return data as Event[];
  },
};

// Blog API
export const blogApi = {
  async getPosts(limit = 10) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data as BlogPost[];
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) throw error;
    
    // Increment view count
    if (data) {
      await supabase.rpc('increment_blog_views', { post_id: data.id });
    }
    
    return data as BlogPost;
  },

  async getPostsByCategory(category: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .eq('category', category)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data as BlogPost[];
  },
};

// Testimonials API
export const testimonialsApi = {
  async getPublished() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Testimonial[];
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Testimonial[];
  },
};

// Donations API
export const donationsApi = {
  async create(data: Donation) {
    const { data: result, error } = await supabase
      .from('donations')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async getRecentDonations(limit = 10) {
    const { data, error } = await supabase
      .from('donations')
      .select('donor_name, amount, currency, created_at, is_anonymous')
      .eq('payment_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async getTotalDonations() {
    const { data, error } = await supabase
      .from('donations')
      .select('amount')
      .eq('payment_status', 'completed');
    
    if (error) throw error;
    
    const total = data?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;
    return total;
  },
};

