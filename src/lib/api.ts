import { supabase } from "@/lib/supabase/client";
import { assertData, assertNoError, handleUniqueViolation } from "@/lib/api/base";
import { submitForm } from "@/lib/api/submit-form";
import type {
  ContactSubmission,
  VolunteerRegistration,
  ProgramApplication,
  BlogPost,
  Testimonial,
  Donation,
  Event,
} from "@/lib/types/database";

const BLOG_LIST_COLUMNS =
  "id, title, slug, excerpt, author, featured_image_url, category, published_at, created_at";
const BLOG_DETAIL_COLUMNS = `${BLOG_LIST_COLUMNS}, content, tags, views_count, updated_at`;

export const contactApi = {
  async submitDirect(data: ContactSubmission) {
    const { data: result, error } = await supabase
      .from("contact_submissions")
      .insert([data])
      .select()
      .single();

    assertNoError(error);
    return assertData(result);
  },

  async submit(data: ContactSubmission) {
    const result = await submitForm("contact", data);
    return result.record ?? data;
  },
};

export const newsletterApi = {
  async subscribeDirect(email: string, name?: string) {
    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .insert([{ email, name }])
      .select()
      .single();

    if (error) {
      handleUniqueViolation(error, "This email is already subscribed to our newsletter.");
    }

    return assertData(data);
  },

  async subscribe(email: string, name?: string) {
    const result = await submitForm("newsletter", { email, name });
    return result.record ?? { email, name };
  },

  async unsubscribe(email: string) {
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
      .eq("email", email);

    assertNoError(error);
  },
};

export const volunteerApi = {
  async registerDirect(data: VolunteerRegistration) {
    const { data: result, error } = await supabase
      .from("volunteer_registrations")
      .insert([data])
      .select()
      .single();

    assertNoError(error);
    return assertData(result);
  },

  async register(data: VolunteerRegistration) {
    const result = await submitForm("volunteer", data);
    return result.record ?? data;
  },
};

export const programApi = {
  async applyDirect(data: ProgramApplication) {
    const { data: result, error } = await supabase
      .from("program_applications")
      .insert([data])
      .select()
      .single();

    assertNoError(error);
    return assertData(result);
  },

  async apply(data: ProgramApplication) {
    const result = await submitForm("program_application", data);
    return result.record ?? data;
  },

  async getEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("id, title, slug, description, event_type, location, start_date, end_date, featured_image_url")
      .eq("is_published", true)
      .gte("start_date", new Date().toISOString())
      .order("start_date", { ascending: true });

    assertNoError(error);
    return (data ?? []) as Event[];
  },
};

export const blogApi = {
  async getPosts(limit = 10) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(BLOG_LIST_COLUMNS)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit);

    assertNoError(error);
    return (data ?? []) as BlogPost[];
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(BLOG_DETAIL_COLUMNS)
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    assertNoError(error);
    const post = assertData(data) as BlogPost;

    if (post.id) {
      void supabase.rpc("increment_blog_views", { post_id: post.id });
    }

    return post;
  },

  async getPostsByCategory(category: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(BLOG_LIST_COLUMNS)
      .eq("is_published", true)
      .eq("category", category)
      .order("published_at", { ascending: false });

    assertNoError(error);
    return (data ?? []) as BlogPost[];
  },
};

export const testimonialsApi = {
  async getPublished() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, role, organization, content, avatar_url, rating, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    assertNoError(error);
    return (data ?? []) as Testimonial[];
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, role, organization, content, avatar_url, rating, created_at")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    assertNoError(error);
    return (data ?? []) as Testimonial[];
  },
};

export const donationsApi = {
  async createDirect(data: Donation) {
    const { data: result, error } = await supabase
      .from("donations")
      .insert([data])
      .select()
      .single();

    assertNoError(error);
    return assertData(result);
  },

  async create(data: Donation) {
    const result = await submitForm("donation", data);
    return result.record ?? data;
  },

  async getRecentDonations(limit = 10) {
    const { data, error } = await supabase
      .from("donations")
      .select("donor_name, amount, currency, created_at, is_anonymous")
      .eq("payment_status", "completed")
      .order("created_at", { ascending: false })
      .limit(limit);

    assertNoError(error);
    return data ?? [];
  },

  async getTotalDonations() {
    const { data, error } = await supabase.rpc("get_total_donations");

    assertNoError(error);
    return Number(data ?? 0);
  },
};
