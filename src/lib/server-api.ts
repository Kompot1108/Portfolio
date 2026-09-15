import { createServerFn } from "@tanstack/react-start";
import { supabaseServer } from "./supabase";
import { defaultPortfolioData, PortfolioData } from "./portfolio-store";

// Example of server-side fetch from Supabase
export const fetchPortfolioFromSupabase = createServerFn({
  method: "GET",
}).handler(async (): Promise<PortfolioData> => {
  try {
    // 1. Fetch from Supabase safely (server-side only)
    const { data, error } = await supabaseServer
      .from("portfolio_data")
      .select("*")
      .single();

    if (error || !data) {
      console.warn("Supabase fetch failed or no data, falling back to default.", error);
      return defaultPortfolioData; // Fallback to our default constants
    }

    // 2. Map Supabase data format to our PortfolioData format if needed
    return data as PortfolioData;
  } catch (err) {
    console.error("Error fetching from Supabase:", err);
    return defaultPortfolioData;
  }
});
