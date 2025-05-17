"use server";

import { getSupabaseClient } from "@/lib/supabase/server";

export async function updateOrderStatus(orderId: string, currentStatus: string) {
    try {
        const supabase = await getSupabaseClient();
        const newStatus = currentStatus.toLowerCase() === "claimed" ? "pending" : "claimed";

        const { error } = await supabase
            .from("Order")
            .update({ status: newStatus })
            .eq("id", orderId);

        if (error) {
            console.error("Error updating order status:", error);
            return { error: `Failed to update order status: ${error.message}` };
        }

        return { status: newStatus };
    } catch (error) {
        console.error("Unexpected error in updateOrderStatus:", error);
        return { error: "Unexpected server error" };
    }
}