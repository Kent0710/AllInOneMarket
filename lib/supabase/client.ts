import { createBrowserClient } from "@supabase/ssr";

// Create a single Supabase client instance for client-side usage
export const supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
