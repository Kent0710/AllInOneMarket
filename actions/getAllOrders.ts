"use server";

import { getSupabaseClient } from "@/lib/supabase/server";

export async function getAllOrders() {
    const supabase = await getSupabaseClient();

    const { data: orders, error } = await supabase
        .from("Order")
        .select(
            `
            code,
            ordertime,
            quantity,
            product:Product(id, productname),
            shop:Shop(id, shopname),
            variant:Variant(id, variantname, price, sold),
            user:User(id, email)  -- optional: join user info
        `
        )
        .order("ordertime", { ascending: false });

    if (error) {
        console.error("Error fetching all orders:", error);
        return {
            success: false,
            orders: null,
            error: "Failed to fetch all orders.",
        };
    }

    return {
        success: true,
        orders: orders || [],
        error: null,
    };
}
