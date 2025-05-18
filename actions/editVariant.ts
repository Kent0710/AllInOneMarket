"use server";

import { getSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editVariantSchema = z.object({
    id: z.string().uuid(),
    variantname: z.string().min(1, "Variant name is required"),
    price: z.number().int().positive("Price must be a positive integer"),
    quantity: z.number().int().min(0, "Quantity cannot be negative"),
    sold: z.number().int().min(0, "Sold cannot be negative"),
});

export async function editVariant(formData: FormData) {
    const supabase = await getSupabaseClient();

    const validated = editVariantSchema.safeParse({
        id: formData.get("id"),
        variantname: formData.get("variantname"),
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        sold: Number(formData.get("sold")),
    });

    if (!validated.success) {
        return { error: validated.error.format() };
    }

    const { id, variantname, price, quantity, sold } = validated.data;

    const { error } = await supabase
        .from("Variant")
        .update({ variantname, price, quantity, sold })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/account')
    return { success: true };
}
