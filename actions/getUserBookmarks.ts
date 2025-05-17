"use server";

import { getSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getUserBookmarks() {
    const supabase = await getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error("Error fetching user:", error);
        redirect("/login");
    }

    const { data: userBookmarks, error: bookmarksError } = await supabase
        .from("UserBookmarks")
        .select("shop_id")
        .eq("user_id", user.id);

    if (bookmarksError) {
        console.error("Error fetching user bookmarks:", bookmarksError);
        return [];
    }

    if (!userBookmarks || userBookmarks.length === 0) {
        return [];
    }

    const shopIds = userBookmarks.map(bookmark => bookmark.shop_id);

    const { data: shops, error: shopsError } = await supabase
        .from("Shop")
        .select("*")
        .in("id", shopIds);

    if (shopsError) {
        console.error("Error fetching shops:", shopsError);
        return [];
    }

    const { data: products, error: productsError } = await supabase
        .from("Product")
        .select("*")
        .in("shop_id", shopIds);

    if (productsError) {
        console.error("Error fetching products:", productsError);
        return shops;
    }

    const productIds = products.map(product => product.id);
    const { data: variants, error: variantsError } = await supabase
        .from("Variant")
        .select("*")
        .in("product_id", productIds);

    if (variantsError) {
        console.error("Error fetching variants:", variantsError);
        return shops;
    }

    const shopsWithProducts = shops.map(shop => {
        const shopProducts = products
            .filter(product => product.shop_id === shop.id)
            .map(product => ({
                ...product,
                variants: variants.filter(variant => variant.product_id === product.id),
            }));

        return {
            ...shop,
            products: shopProducts,
        };
    });

    return shopsWithProducts;
}