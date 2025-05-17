"use server";

import { getSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "./user/getUser";

export async function getOrders() {
    const supabase = await getSupabaseClient();

    // Get authenticated user
    const user = await getUser();

    if (!user || !user.id) {
        return {
            success: false,
            orders: [],
            error: "User not authenticated",
        };
    }

    // Fetch all orders for the user
    const { data: orders, error: ordersError } = await supabase
        .from("Order")
        .select(
            `
            id,
            code,
            ordertime,
            quantity,
            status,
            product:Product(id, productname),
            shop:Shop!Order_shop_fkey(id, shopname),
            variant:Variant(id, variantname, price, sold, variantimage)
        `
        )
        .eq("user_id", user.id)
        .order("ordertime", { ascending: false });  

    if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        return {
            success: false,
            orders: [],
            error: "Failed to fetch orders. Try again.",
        };
    }

    return {
        success: true,
        orders: orders || [],
        error: null,
    };
}
