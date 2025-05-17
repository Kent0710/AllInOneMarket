"use server";

import { getSupabaseClient } from "@/lib/supabase/server";

export async function getShop(shopId: string) {
    const supabase = await getSupabaseClient();

    if (!shopId || shopId === "undefined") {
        console.error("Invalid shopId provided:", shopId);
        return null;
    }

    const { data: shop, error: shopError } = await supabase
        .from("Shop")
        .select("*")
        .eq("id", shopId)
        .single();

    if (shopError && shopError.code !== "PGRST116") {
        console.error("Error fetching shop:", shopError);
        return null;
    }

    if (!shop) {
        return null;
    }

    const { data: products, error: productsError } = await supabase
        .from("Product")
        .select("*")
        .eq("shop_id", shop.id);

    if (productsError) {
        console.error("Error fetching products:", productsError);
    } else {
        shop.products = products || [];

        if (products && products.length > 0) {
            const productIds = products.map((product) => product.id);

            const { data: variants, error: variantsError } = await supabase
                .from("Variant")
                .select("*")
                .in("product_id", productIds);

            if (variantsError) {
                console.error("Error fetching variants:", variantsError);
            } else {
                shop.products = products.map((product) => ({
                    ...product,
                    variants: variants
                        ? variants.filter(
                              (variant) => variant.product_id === product.id
                          )
                        : [],
                }));
            }
        }
    }

    return shop;
}
