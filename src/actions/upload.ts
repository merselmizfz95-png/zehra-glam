"use server";

import { createClient } from "@/lib/supabase/server";

const BUCKET = "images";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadImage(
  formData: FormData
): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "general";

  if (!file || file.size === 0) {
    return { error: "No file provided" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Invalid file type. Use JPG, PNG, WebP, or GIF." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: "File too large. Maximum size is 5 MB." };
  }

  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return { url: urlData.publicUrl };
}

export async function deleteImage(
  imageUrl: string
): Promise<{ success: boolean } | { error: string }> {
  const supabase = await createClient();

  const bucketPath = imageUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1];
  if (!bucketPath) {
    return { error: "Invalid image URL" };
  }

  const { error } = await supabase.storage.from(BUCKET).remove([bucketPath]);
  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
