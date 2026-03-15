import { createClient } from "@/lib/supabase/server";
import type {
  HeroContent,
  Service,
  AboutContent,
  Testimonial,
  Product,
  ContactInfo,
  Booking,
  BlogPost,
} from "@/types/database";

export async function getHeroContent(): Promise<HeroContent | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_content")
    .select("*")
    .limit(1)
    .single();
  return (data as HeroContent | null) ?? null;
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });
  return (data as Service[] | null) ?? [];
}

export async function getAboutContent(): Promise<AboutContent | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about_content")
    .select("*")
    .limit(1)
    .single();
  return (data as AboutContent | null) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*");
  return (data as Testimonial[] | null) ?? [];
}

export async function getProducts(category?: string): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase.from("products").select("*").order("featured", { ascending: false });
  if (category && category !== "All") {
    query = query.eq("category", category);
  }
  const { data } = await query;
  return (data as Product[] | null) ?? [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  return (data as Product | null) ?? null;
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_info")
    .select("*")
    .limit(1)
    .single();
  return (data as ContactInfo | null) ?? null;
}

export async function getBookings(): Promise<Booking[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Booking[] | null) ?? [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data as BlogPost[] | null) ?? [];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as BlogPost[] | null) ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return (data as BlogPost | null) ?? null;
}
