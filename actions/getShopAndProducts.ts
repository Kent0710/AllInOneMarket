"use server";

import { getSupabaseClient } from "@/lib/supabase/server";

export async function getShopAndProducts() {
    const supabase = await getSupabaseClient();

    // Fetch all shops
    const { data: shops, error: shopsError } = await supabase
        .from("Shop")
        .select("*");

    if (shopsError) {
        console.error("Error fetching shops:", shopsError);
        return [];
    }

    // Fetch all products for those shops
    const shopIds = shops.map((shop) => shop.id);
    const { data: products, error: productsError } = await supabase
        .from("Product")
        .select("*")
        .in("shop_id", shopIds);

    if (productsError) {
        console.error("Error fetching products:", productsError);
        return shops;
    }

    // Fetch all variants for those products
    const productIds = products.map((product) => product.id);
    const { data: variants, error: variantsError } = await supabase
        .from("Variant")
        .select("*")
        .in("product_id", productIds);

    if (variantsError) {
        console.error("Error fetching variants:", variantsError);
        return shops;
    }

    // Associate products and variants
    const shopsWithProducts = shops.map((shop) => {
        const shopProducts = products
            .filter((product) => product.shop_id === shop.id)
            .map((product) => ({
                ...product,
                variants: variants.filter((v) => v.product_id === product.id),
            }));

        return {
            ...shop,
            products: shopProducts,
        };
    });

    return shopsWithProducts;
}
