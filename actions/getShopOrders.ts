"use server";

import { getSupabaseClient } from "@/lib/supabase/server";
import { getUser } from "./user/getUser";

export async function getShopOrders() {
    const user = await getUser();

    if (!user) {
        return {
            success: false,
            orders: [],
            error: "user not authenticated",
        };
    }

    if (!user.shop.id) {
        return {
            success: false,
            orders: [],
            error: "No shop for this user",
        };
    }

    const supabase = await getSupabaseClient();
    const { data: shopOrders, error: shopOrdersError } = await supabase
        .from("ShopOrders")
        .select(
            `
            order:Order(*),
            variant:Order(variant:Variant(*))
            `
        )
        .eq("shop_id", user.shop.id);

    if (shopOrdersError) {
        console.error("Error fetching shop orders " + shopOrdersError);
        return {
            success: false,
            orders: [],
            error: "Error fetching shop orders. See console.",
        };
    }

    if (shopOrders.length === 0) return [];

    // return shopOrders;

    const simplifiedOrders = shopOrders.map((item) => ({
        id: item.order.id,
        variantName: item.variant.variant.variantname,
        code: item.order.code,
        status: item.order.status,
        orderTime: item.order.ordertime,
    }));

    return simplifiedOrders;
}
