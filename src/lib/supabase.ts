import { createClient } from "@supabase/supabase-js";

// During build time on Vercel, these might be missing if not properly configured.
// We provide fallbacks and check for their presence to avoid crashing the build.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (process.env.NODE_ENV === "production") {
    console.warn("Supabase environment variables are missing in production/build!");
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
