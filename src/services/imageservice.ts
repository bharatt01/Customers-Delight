import { supabase } from "@/supabase/supabase";

/**
 * Upload image to Supabase Storage
 */
export async function uploadImageToSupabase(
  file: File,
  folder: string = "blog-images"
): Promise<string> {
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("abhasys-bucket")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Get public URL using the correct format
  const { data: { publicUrl } } = supabase.storage
    .from("abhasys-bucket")
    .getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Delete image from Supabase Storage
 */
export async function deleteImageFromSupabase(url: string): Promise<void> {
  // Extract path from URL - handles both formats:
  // https://eozrjdcpklgbpngjwhop.supabase.co/storage/v1/object/public/abhasys-bucket/blog-images/xxx.png
  const match = url.match(/\/abhasys-bucket\/(.+)$/);
  if (!match) return;

  const filePath = match[1];

  const { error } = await supabase.storage
    .from("abhasys-bucket")
    .remove([filePath]);

  if (error) {
    console.error("Failed to delete image:", error.message);
  }
}