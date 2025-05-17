"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSupabaseClient } from "@/lib/supabase/server";

import { z } from "zod";
import { authFormSchema } from "@/schematypes";

export async function login(values: z.infer<typeof authFormSchema>) {
    const supabase = await getSupabaseClient();

    const data = {
        email: values.username + "@gmail.com",
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
        email: values.username + "@gmail.com",
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

    revalidatePath("/", "layout");
    redirect("/home");
}

export async function signOut() {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    redirect("/login");
}
