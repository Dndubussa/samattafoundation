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

// Utility function for retrying failed requests
const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries = 2,
  delayMs = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx) except 429 (rate limit)
      if (error instanceof Error) {
        const is4xxError = error.message.includes('400') || 
                          error.message.includes('401') || 
                          error.message.includes('403') ||
                          error.message.includes('404');
        if (is4xxError && !error.message.includes('429')) {
          throw error;
        }
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => 
          setTimeout(resolve, delayMs * Math.pow(2, attempt))
        );
      }
    }
  }

  throw lastError || new Error('Request failed after retries');
};

// Helper function to get readable error messages
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Supabase error
    if ((error as any).code === '23505') {
      return 'This entry already exists. Please check your information.';
    }
    if ((error as any).code === '23503') {
      return 'Invalid reference. Please try again.';
    }
    if ((error as any).message.includes('JWT')) {
      return 'Authentication error. Please refresh and try again.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};

// Contact Form API
export const contactApi = {
  async submit(data: ContactSubmission) {
    return withRetry(async () => {
      const { data: result, error } = await supabase
        .from('contact_submissions')
        .insert([data])
        .select()
        .single();
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return result;
    });
  },
};

// Newsletter API
export const newsletterApi = {
  async subscribe(email: string, name?: string) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email, name }])
        .select()
        .single();
      
      if (error) {
        // Check if already subscribed (unique constraint violation)
        if ((error as any).code === '23505') {
          throw new Error('This email is already subscribed to our newsletter.');
        }
        throw new Error(getErrorMessage(error));
      }
      return data;
    });
  },

  async unsubscribe(email: string) {
    return withRetry(async () => {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ 
          is_active: false, 
          unsubscribed_at: new Date().toISOString() 
        })
        .eq('email', email);
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
    });
  },
};

// Volunteer API
export const volunteerApi = {
  async register(data: VolunteerRegistration) {
    return withRetry(async () => {
      const { data: result, error } = await supabase
        .from('volunteer_registrations')
        .insert([data])
        .select()
        .single();
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return result;
    });
  },
};

// Program Application API
export const programApi = {
  async apply(data: ProgramApplication) {
    return withRetry(async () => {
      const { data: result, error } = await supabase
        .from('program_applications')
        .insert([data])
        .select()
        .single();
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return result;
    });
  },

  async getEvents() {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return data as Event[];
    });
  },
};

// Blog API
export const blogApi = {
  async getPosts(limit = 10) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return data as BlogPost[];
    });
  },

  async getPostBySlug(slug: string) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      
      // Increment view count (non-critical, don't retry)
      if (data?.id) {
        try {
          await supabase.rpc('increment_blog_views', { post_id: data.id });
        } catch (err) {
          // Silently fail - view tracking is non-critical
          console.debug('Could not increment blog views:', err);
        }
      }
      
      return data as BlogPost;
    });
  },

  async getPostsByCategory(category: string) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .eq('category', category)
        .order('published_at', { ascending: false });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return data as BlogPost[];
    });
  },
};

// Testimonials API
export const testimonialsApi = {
  async getPublished() {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return data as Testimonial[];
    });
  },

  async getFeatured() {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return data as Testimonial[];
    });
  },
};

// Donations API
export const donationsApi = {
  async create(data: Donation) {
    return withRetry(async () => {
      const { data: result, error } = await supabase
        .from('donations')
        .insert([data])
        .select()
        .single();
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return result;
    });
  },

  async getRecentDonations(limit = 10) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('donor_name, amount, currency, created_at, is_anonymous')
        .eq('payment_status', 'completed')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      return data;
    });
  },

  async getTotalDonations() {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('amount')
        .eq('payment_status', 'completed');
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      
      const total = data?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;
      return total;
    });
  },
};

