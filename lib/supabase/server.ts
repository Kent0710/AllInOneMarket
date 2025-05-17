import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Cache the Supabase client per request
const supabaseClientCache = new Map<string, ReturnType<typeof createServerClient>>();

export async function getSupabaseClient() {
  const cookieStore = await cookies();
  const requestId = Math.random().toString(36).substring(2); // Unique ID for the request

  // Check if client exists for this request
  if (supabaseClientCache.has(requestId)) {
    return supabaseClientCache.get(requestId)!;
  }

  // Create new client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore errors in Server Components
          }
        },
      },
    }
  );

  // Cache the client for this request
  supabaseClientCache.set(requestId, supabase);

  // Clean up cache after request (optional, to avoid memory leaks)
  setTimeout(() => supabaseClientCache.delete(requestId), 0);

  return supabase;
}