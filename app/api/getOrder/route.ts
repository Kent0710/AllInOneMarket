import { getSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getUser } from "@/actions/user/getUser";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
        return NextResponse.json(
            { error: "Order ID is required" },
            { status: 400 }
        );
    }

    const user = await getUser();
    if (!user || !user.shop?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
        .from("ShopOrders")
        .select(
            `
      order:Order(id, code, status, ordertime),
      variant:Order(variant:Variant(variantname))
      `
        )
        .eq("shop_id", user.shop.id)
        .eq("order_id", orderId)
        .single();

    if (error || !data) {
        console.error(
            "Error fetching order:",
            error?.message || "Order not found"
        );
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const simplifiedOrder = {
        id: data.order.id,
        username: data.order.username || "Unknown",
        variantName: data.variant.variant.variantname,
        code: data.order.code,
        status: data.order.status,
        orderTime: data.order.ordertime,
    };

    return NextResponse.json(simplifiedOrder);
}
