import { supabase } from "@/lib/supabase";

type SellerProfileInput = Record<
  string,
  FormDataEntryValue | null
>;

export async function getAllSellers() {
  return await supabase
    .from("seller_profiles")
    .select("*");
}

export async function getSellerProfile(userId: string) {
  return await supabase
    .from("seller_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
}

export async function createSellerProfile(
  profile: SellerProfileInput
) {
  return await supabase
    .from("seller_profiles")
    .insert(profile);
}

export async function updateSellerProfile(
  sellerId: string,
  updates: SellerProfileInput
) {
  return await supabase
    .from("seller_profiles")
    .update(updates)
    .eq("id", sellerId);
}

export async function deleteSellerProfile(id: string) {
  return await supabase
    .from("seller_profiles")
    .delete()
    .eq("id", id);
}
