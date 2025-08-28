Supabase Integration (Frontend)

Environment variables (see .env.example):
- REACT_APP_BACKEND_URL (required for backend API calls)
- REACT_APP_SUPABASE_URL (optional, only if using Supabase client in browser)
- REACT_APP_SUPABASE_ANON_KEY (optional)
- REACT_APP_SITE_URL (used by helpers for redirectTo/emailRedirectTo)

Client usage:
import { getSupabaseClient, getAuthEmailRedirectTo } from "../lib/supabase";
const supabase = getSupabaseClient();
const emailRedirectTo = getAuthEmailRedirectTo("/auth/callback");

Notes:
- Copy .env.example to .env and set values for your environment.
- REACT_APP_SITE_URL should be set to the deployed site URL by the deployment agent; locally it defaults to http://localhost:3000 if not set.
- Do not hardcode keys in code; always use env vars.
- In Supabase Dashboard -> Authentication -> URL Configuration:
  - Set Site URL to match REACT_APP_SITE_URL
  - Add redirect URLs for http://localhost:3000/** and production domain.
- If you add auth flows that call supabase.auth.* in the browser, ensure you pass:
  - emailRedirectTo: getAuthEmailRedirectTo("/auth/callback")
  - redirectTo: getAuthEmailRedirectTo("/auth/callback")
