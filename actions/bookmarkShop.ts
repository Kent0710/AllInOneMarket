"use server";

import { getSupabaseClient } from "@/lib/supabase/server";

export async function bookmarkShop(shopId: string) {
    try {
        const supabase = await getSupabaseClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { error: "User not authenticated" };
        }

        const { data: existingBookmark, error: checkError } = await supabase
            .from("UserBookmarks")
            .select("user_id, shop_id")
            .eq("user_id", user.id)
            .eq("shop_id", shopId)
            .single();

        if (checkError && checkError.code !== "PGRST116") {
            console.error("Error checking bookmark status:", checkError);
            return { error: `Failed to check bookmark status: ${checkError.message}` };
        }

        if (existingBookmark) {
            const { error: deleteError } = await supabase
                .from("UserBookmarks")
                .delete()
                .eq("user_id", user.id)
                .eq("shop_id", shopId);

            if (deleteError) {
                console.error("Error unbookmarking shop:", deleteError);
                return { error: `Failed to unbookmark shop: ${deleteError.message}` };
            }
            return { bookmarked: false };
        } else {
            const { error: insertError } = await supabase
                .from("UserBookmarks")
                .insert({ user_id: user.id, shop_id: shopId });

            if (insertError) {
                console.error("Error bookmarking shop:", insertError);
                return { error: `Failed to bookmark shop: ${insertError.message}` };
            }
            return { bookmarked: true };
        }
    } catch (error) {
        console.error("Unexpected error in bookmarkShop:", error);
        return { error: "Unexpected server error" };
    }
}

export async function getBookmarkStatus(shopId: string) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { bookmarked: false };
        }

        const { data: existingBookmark } = await supabase
            .from("UserBookmarks")
            .select("user_id, shop_id")
            .eq("user_id", user.id)
            .eq("shop_id", shopId)
            .single();

        return { bookmarked: !!existingBookmark };
    } catch (error) {
        console.error("Error fetching bookmark status:", error);
        return { bookmarked: false };
    }
}

export async function getBookmarkStatuses(shopIds: string[]) {
    try {
        const supabase = await getSupabaseClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return Object.fromEntries(shopIds.map(id => [id, false]));
        }

        const { data: bookmarks, error } = await supabase
            .from("UserBookmarks")
            .select("shop_id")
            .eq("user_id", user.id)
            .in("shop_id", shopIds);

        if (error) {
            console.error("Error fetching bookmark statuses:", error);
            return Object.fromEntries(shopIds.map(id => [id, false]));
        }

        const bookmarkedMap = Object.fromEntries(shopIds.map(id => [id, false]));
        bookmarks.forEach(bookmark => {
            bookmarkedMap[bookmark.shop_id] = true;
        });

        return bookmarkedMap;
    } catch (error) {
        console.error("Unexpected error in getBookmarkStatuses:", error);
        return Object.fromEntries(shopIds.map(id => [id, false]));
    }
}