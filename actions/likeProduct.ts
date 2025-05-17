// actions/likeProduct.ts
"use server";

import { getSupabaseClient } from "@/lib/supabase/server";

export async function likeProduct(variantId: string) {
    const supabase = await getSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "User not authenticated" };
    }

    const { data: existingLike, error: checkError } = await supabase
        .from("UserLikes")
        .select("user_id, variant_id")
        .eq("user_id", user.id)
        .eq("variant_id", variantId)
        .single();

    if (checkError && checkError.code !== "PGRST116") {
        return { error: "Failed to check like status" };
    }

    if (existingLike) {
        const { error: deleteError } = await supabase
            .from("UserLikes")
            .delete()
            .eq("user_id", user.id)
            .eq("variant_id", variantId);

        if (deleteError) {
            return { error: "Failed to unlike variant" };
        }
        return { liked: false };
    } else {
        const { error: insertError } = await supabase
            .from("UserLikes")
            .insert({ user_id: user.id, variant_id: variantId });

        if (insertError) {
            return { error: "Failed to like variant" };
        }
        return { liked: true };
    }
}

export async function getLikeStatus(variantId: string) {
    const supabase = await getSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { liked: false };
    }

    const { data: existingLike } = await supabase
        .from("UserLikes")
        .select("user_id, variant_id")
        .eq("user_id", user.id)
        .eq("variant_id", variantId)
        .single();

    return { liked: !!existingLike };
}

export async function getLikeStatuses(variantIds: string[]) {
    const supabase = await getSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return Object.fromEntries(variantIds.map(id => [id, false]));
    }

    const { data: likes, error } = await supabase
        .from("UserLikes")
        .select("variant_id")
        .eq("user_id", user.id)
        .in("variant_id", variantIds);

    if (error) {
        return Object.fromEntries(variantIds.map(id => [id, false]));
    }

    const likedMap = Object.fromEntries(variantIds.map(id => [id, false]));
    likes.forEach(like => {
        likedMap[like.variant_id] = true;
    });

    return likedMap;
}