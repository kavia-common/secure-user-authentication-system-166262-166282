Supabase Integration (Frontend)

Environment variables (see .env.example):
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_ANON_KEY
- REACT_APP_SITE_URL

Client usage:
import { getSupabaseClient, getAuthEmailRedirectTo } from "../lib/supabase";
const supabase = getSupabaseClient();
const emailRedirectTo = getAuthEmailRedirectTo("/auth/callback");

Notes:
- REACT_APP_SITE_URL should be set to the deployed site URL by the deployment agent; locally it defaults to http://localhost:3000 if not set.
- Do not hardcode keys in code; always use env vars.
