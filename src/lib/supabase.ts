import { createClient } from "@supabase/supabase-js";

// Safe init on server: using process.env strictly
// We don't expose these to Vite via VITE_ prefix to prevent leaking service keys to the client bundle.
const supabaseUrl = process.env.SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "placeholder-key";

// Initialize Supabase client
// This instance should ONLY be used in server functions (e.g., createServerFn)
export const supabaseServer = createClient(supabaseUrl, supabaseKey);
