import { supabase } from "@/lib/supabase";

type ReviewInput = Record<
  string,
  string | number | boolean | null
>;

export async function getReviews(
  productId: string
) {
  return await supabase
    .from("reviews")
    .select(`
      *,
      profiles (
        first_name,
        last_name,
        avatar_url
      )
    `)
    .eq("product_id", productId);
}

export async function createReview(review: ReviewInput) {
  return await supabase
    .from("reviews")
    .insert(review);
}

export async function deleteReview(
  reviewId: string
) {
  return await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);
}
