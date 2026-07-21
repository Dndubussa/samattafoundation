import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const DEV_SUPABASE_URL = "https://oxdwsddpvlpernigkzro.supabase.co";
const DEV_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZHdzZGRwdmxwZXJuaWdrenJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NzkyODEsImV4cCI6MjA4MTI1NTI4MX0.gO9IwB3R7rn8WdjY9Uf5Ppg8-tbmtA_zXrsHGLvsD1M";

function resolveSupabaseConfig(): { url: string; anonKey: string } {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (url && anonKey) {
    return { url, anonKey };
  }

  if (import.meta.env.DEV) {
    console.warn(
      "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set - using local development defaults. Copy .env.example to .env.local for explicit configuration.",
    );
    return { url: DEV_SUPABASE_URL, anonKey: DEV_SUPABASE_ANON_KEY };
  }

  throw new Error(
    "Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
  );
}

const { url, anonKey } = resolveSupabaseConfig();

export const supabase: SupabaseClient = createClient(url, anonKey);
