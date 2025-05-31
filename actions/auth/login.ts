"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSupabaseClient } from "@/lib/supabase/server";

import { z } from "zod";
import { authFormSchema } from "@/schematypes";
import { cookies } from "next/headers";

export async function login(values: z.infer<typeof authFormSchema>) {
    const supabase = await getSupabaseClient();

    const data = {
        email: values.username.toLowerCase() + "@gmail.com",
        password: values.password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    revalidatePath("/", "layout");
    redirect("/home");
}

export async function signup(values: z.infer<typeof authFormSchema>) {
    const supabase = await getSupabaseClient();

    const data = {
        email: values.username.toLowerCase() + "@gmail.com",
        password: values.password,
    };

    const { error } = await supabase.auth.signUp(data);
    console.log(error);
    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    // cookies logic for username
    const cookieStore = await cookies();
    // check cookies
    const username = cookieStore.get("username");
    if (username) {
        const usernameValue = username.value;
        if (usernameValue !== values.username.toLowerCase()) {
            // a new username has logged in
            cookieStore.delete('username');
            // set the new user to the cookie
            cookieStore.set({
                name: "username",
                value: values.username
                    .replace("@gmail.com", "")
                    .replace("@gmail.com", ""),
                httpOnly: true,
                secure: true,
                path: "/",
            });
        }
    } else {
        cookieStore.set({
            name: "username",
            value: values.username
                .replace("@gmail.com", "")
                .replace("@gmail.com", ""),
            httpOnly: true,
            secure: true,
            path: "/",
        });
    }

    revalidatePath("/", "layout");
    redirect("/home");
}

export async function signOut() {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    console.error(error);
    redirect("/login");
}
