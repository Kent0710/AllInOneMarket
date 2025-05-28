'use server'

import { getSupabaseClient } from "@/lib/supabase/server";
import { cookies } from "next/headers"

export async function getUsernameFromCookies() {
    const cookieStore = await cookies();
    const username = cookieStore.get('username');

    if (username) {
        const usernameValue = username.value;
        return usernameValue;
    } else {
        const supabase = await getSupabaseClient();

        const {data : {user}, error} = await supabase.auth.getUser();

        if (!user && error) {
            return "No username"
        }

        return user.email.replace('@gmail.com', '')
    }
}