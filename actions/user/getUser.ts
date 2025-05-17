"use server";

import { getSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getUser() {
    const supabase = await getSupabaseClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        console.error("Error fetching user:", error);
        redirect("/login");
    }

    // If we have a user, check if they have a shop
    if (user) {
        // Fetch the user's shop
        const { data: shop, error: shopError } = await supabase
            .from("Shop")
            .select("*")
            .eq("owner_id", user.id)
            .single();

        if (shopError && shopError.code !== "PGRST116") {
            // PGRST116 is the error code for "no rows returned" which is fine - user might not have a shop
            console.error("Error fetching shop:", shopError);
        }

        // If the user has a shop, fetch their products and variants
        if (shop) {
            // Fetch products for this shop
            const { data: products, error: productsError } = await supabase
                .from("Product")
                .select("*")
                .eq("shop_id", shop.id);

            if (productsError) {
                console.error("Error fetching products:", productsError);
            } else {
                shop.products = products || [];

                // For each product, fetch its variants
                if (products && products.length > 0) {
                    const productIds = products.map(product => product.id);
                    
                    const { data: variants, error: variantsError } = await supabase
                        .from("Variant")
                        .select("*")
                        .in("product_id", productIds);

                    if (variantsError) {
                        console.error("Error fetching variants:", variantsError);
                    } else {
                        // Associate variants with their respective products
                        shop.products = products.map(product => ({
                            ...product,
                            variants: variants ? variants.filter(variant => variant.product_id === product.id) : []
                        }));
                    }
                }
            }
        }

        // Return user with shop data (if it exists)
        return {
            ...user,
            shop: shop || null
        };
    }

    return user;
}