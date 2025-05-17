"use server";

import { ProductType, ShopType, VariantType } from "@/lib/supabase/dbtypes";
import { getSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getUserLikes() {
    const supabase = await getSupabaseClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        console.error("Error fetching user:", error);
        redirect("/login");
    }

    const { data: userLikes, error: likesError } = await supabase
        .from("UserLikes")
        .select("variant_id")
        .eq("user_id", user.id);

    if (likesError) {
        console.error("Error fetching user likes:", likesError);
        return [];
    }

    if (!userLikes || userLikes.length === 0) {
        return [];
    }

    const variantIds = userLikes.map((like: { variant_id: string; }) => like.variant_id);

    const { data: variants, error: variantsError } = await supabase
        .from("Variant")
        .select("*")
        .in("id", variantIds);

    if (variantsError) {
        console.error("Error fetching variants:", variantsError);
        return [];
    }

    const productIds = variants.map((variant : VariantType) => variant.product_id);
    const { data: products, error: productsError } = await supabase
        .from("Product")
        .select("*")
        .in("id", productIds);

    if (productsError) {
        console.error("Error fetching products:", productsError);
        return [];
    }

    const shopIds = products.map((product : ProductType) => product.shop_id);
    const { data: shops, error: shopsError } = await supabase
        .from("Shop")
        .select("*")
        .in("id", shopIds);

    if (shopsError) {
        console.error("Error fetching shops:", shopsError);
        return [];
    }

    const shopsWithProducts = shops.map((shop : ShopType) => {
        const shopProducts = products
            .filter((product : ProductType) => product.shop_id === shop.id)
            .map((product : ProductType) => ({
                ...product,
                variants: variants.filter(
                    (variant : VariantType) => variant.product_id === product.id
                ),
            }));

        return {
            ...shop,
            products: shopProducts,
        };
    });

    return shopsWithProducts;
}
