"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateHeroContent(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const updates = {
    title_en: formData.get("title_en") as string,
    title_fr: formData.get("title_fr") as string,
    subtitle_en: formData.get("subtitle_en") as string,
    subtitle_fr: formData.get("subtitle_fr") as string,
    cta_text_en: formData.get("cta_text_en") as string,
    cta_text_fr: formData.get("cta_text_fr") as string,
    image_url: (formData.get("image_url") as string) || null,
  };

  const { error } = await supabase
    .from("hero_content")
    .update(updates)
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function updateAboutContent(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const updates = {
    title_en: formData.get("title_en") as string,
    title_fr: formData.get("title_fr") as string,
    body_en: formData.get("body_en") as string,
    body_fr: formData.get("body_fr") as string,
    years_experience: parseInt(formData.get("years_experience") as string, 10),
    happy_clients: parseInt(formData.get("happy_clients") as string, 10),
    image_url: (formData.get("image_url") as string) || null,
  };

  const { error } = await supabase
    .from("about_content")
    .update(updates)
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function updateContactInfo(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const updates = {
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    hours: formData.get("hours") as string,
    booking_url: formData.get("booking_url") as string,
  };

  const { error } = await supabase
    .from("contact_info")
    .update(updates)
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function upsertService(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const data = {
    name_en: formData.get("name_en") as string,
    name_fr: formData.get("name_fr") as string,
    description_en: formData.get("description_en") as string,
    description_fr: formData.get("description_fr") as string,
    icon: formData.get("icon") as string,
    display_order: parseInt(formData.get("display_order") as string, 10) || 0,
    image_url: (formData.get("image_url") as string) || null,
  };

  if (id) {
    const { error } = await supabase.from("services").update(data).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("services").insert(data);
    if (error) return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function upsertTestimonial(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const data = {
    client_name: formData.get("client_name") as string,
    service_en: formData.get("service_en") as string,
    service_fr: formData.get("service_fr") as string,
    quote_en: formData.get("quote_en") as string,
    quote_fr: formData.get("quote_fr") as string,
    rating: parseInt(formData.get("rating") as string, 10) || 5,
  };

  if (id) {
    const { error } = await supabase.from("testimonials").update(data).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("testimonials").insert(data);
    if (error) return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function upsertProduct(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const data = {
    name_en: formData.get("name_en") as string,
    name_fr: formData.get("name_fr") as string,
    description_en: formData.get("description_en") as string,
    description_fr: formData.get("description_fr") as string,
    price: parseFloat(formData.get("price") as string) || 0,
    category: formData.get("category") as string,
    in_stock: formData.get("in_stock") === "true",
    featured: formData.get("featured") === "true",
    image_url: (formData.get("image_url") as string) || null,
  };

  if (id) {
    const { error } = await supabase.from("products").update(data).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("products").insert(data);
    if (error) return { error: error.message };
  }

  revalidatePath("/products");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/products");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function updateBookingStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/bookings");
  return { success: true };
}

export async function deleteBooking(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/bookings");
  return { success: true };
}

export async function upsertBlogPost(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const data = {
    title_en: formData.get("title_en") as string,
    title_fr: formData.get("title_fr") as string,
    slug: formData.get("slug") as string,
    excerpt_en: formData.get("excerpt_en") as string,
    excerpt_fr: formData.get("excerpt_fr") as string,
    body_en: formData.get("body_en") as string,
    body_fr: formData.get("body_fr") as string,
    category: formData.get("category") as string,
    published: formData.get("published") === "true",
    updated_at: new Date().toISOString(),
    image_url: (formData.get("image_url") as string) || null,
  };

  if (id) {
    const { error } = await supabase.from("blog_posts").update(data).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("blog_posts").insert(data);
    if (error) return { error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true };
}
