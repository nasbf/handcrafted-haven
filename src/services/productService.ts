import { supabase } from "@/lib/supabase";

type ProductInput = Record<
  string,
  string | number | boolean | null
>;

export async function getProducts() {
  return await supabase
    .from("products")
    .select(`
      *,
      product_images(*),
      categories(*)
    `);
}

export async function getProductById(id: string) {
  return await supabase
    .from("products")
    .select(`
      *,
      product_images(*),
      categories(*)
    `)
    .eq("id", id)
    .single();
}

export async function createProduct(product: ProductInput) {
  return await supabase
    .from("products")
    .insert(product);
}

export async function deleteProduct(id: string) {
  return await supabase
    .from("products")
    .delete()
    .eq("id", id);
}
