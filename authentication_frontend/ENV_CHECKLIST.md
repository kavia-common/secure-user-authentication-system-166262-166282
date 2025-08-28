# Frontend ENV Checklist

Set authentication_frontend/.env from .env.example

Required:
- REACT_APP_BACKEND_URL = http://localhost:8000 (or your backend URL)

Optional:
- REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY (if using Supabase client)
- REACT_APP_SITE_URL = http://localhost:3000 (for redirect helpers)

Validation:
- Start frontend: npm start
- Check Network tab calls to `${REACT_APP_BACKEND_URL}/` return JSON, not HTML
- If you see HTML response, fix REACT_APP_BACKEND_URL or backend CORS.
