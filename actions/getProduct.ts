"use server";

import { getSupabaseClient } from "@/lib/supabase/server";

export async function getProduct(productId: string) {
    const supabase = await getSupabaseClient();

    // Fetch the product details by its ID
    const { data: product, error: productError } = await supabase
        .from("Product")
        .select("*")
        .eq("id", productId)
        .single(); // Single product expected

    if (productError) {
        console.error("Error fetching product:", productError);
        return null; // Return null if the product is not found or there's an error
    }

    // Fetch the variants for the product
    const { data: variants, error: variantsError } = await supabase
        .from("Variant")
        .select("*")
        .eq("product_id", productId);

    if (variantsError) {
        console.error("Error fetching variants:", variantsError);
    }

    // Attach variants to the product
    product.variants = variants || [];

    // Fetch the shop details for the product's shop
    const { data: shop, error: shopError } = await supabase
        .from("Shop")
        .select("*")
        .eq("id", product.shop_id)
        .single();

    if (shopError) {
        console.error("Error fetching shop:", shopError);
    }

    // Attach shop details to the product
    product.shop = shop || null;

    // Return the product with its variants and shop
    return product;
}
