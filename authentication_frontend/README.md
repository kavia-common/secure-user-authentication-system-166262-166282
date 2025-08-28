# React Authentication Frontend (Tailwind + shadcn/ui style)

This app provides a complete authentication flow with React Router, reusable UI components, validation utilities, and a central API service that talks to the FastAPI backend.

## Quick Start

1. Install dependencies:
   - npm install

2. Configure environment:
   - cp .env.example .env
   - Fill in as needed:
     - REACT_APP_BACKEND_URL (e.g., http://localhost:8000). In this environment, use:
       https://vscode-internal-34468-beta.beta01.cloud.kavia.ai:3001
       If not set, the app will call endpoints relative to the frontend origin and may receive HTML (e.g., index.html), causing JSON parse errors or "Failed to fetch".
     - REACT_APP_SUPABASE_URL (optional, if using Supabase client in browser)
     - REACT_APP_SUPABASE_ANON_KEY (optional)
     - REACT_APP_SITE_URL (optional for local dev, used for Supabase email redirects)

3. Start dev server:
   - npm start

4. Verify connectivity:
   - On the Home page, click "Check API connectivity". It will show whether the backend is reachable at your configured REACT_APP_BACKEND_URL.

## Routes

- /                 Home
- /signup           Create account
- /verify-email     Verify email with code
- /signin           Sign in
- /forgot-password  Initiate password reset
- /reset-password   Reset password via email + code

## Components

- src/components/FormCard.jsx
- src/components/ui/Button.jsx
- src/components/ui/Input.jsx
- src/components/ui/Alert.jsx

## Validation

- src/lib/validation.js provides validators for required fields, email format, and password strength.

## API Service

- src/services/api.js centralizes backend calls (signup, send code, verify, signin, forgot, reset).
- Configure REACT_APP_BACKEND_URL to point to your FastAPI backend root.
- The client provides clear error messages if the backend is unreachable or if HTML is received due to misconfiguration (e.g., CORS issues or missing env variables).

## Supabase

Use the client from `src/lib/supabase.js` if needed (e.g., social logins, session handling, or client-side auth):

```js
import { getSupabaseClient, getAuthEmailRedirectTo } from "./lib/supabase";

const supabase = getSupabaseClient();
const redirectTo = getAuthEmailRedirectTo("/auth/callback");
```

Environment:
- Copy `.env.example` to `.env` and set:
  - `REACT_APP_BACKEND_URL` (required)
  - `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` (optional, only if using the Supabase JS client)
  - `REACT_APP_SITE_URL` for consistent redirects (optional, defaults to current origin)

See `assets/supabase.md` for more details.

## Theming

A light/dark theme toggle is included in `AuthLayout`. It toggles the `dark` class on the root element. Tailwind classes in `index.css` provide styles for both modes.

## Security Notes

- Frontend normalizes server errors without leaking stack traces.
- Do not store access tokens in localStorage in production. Prefer HTTP-only cookies set by backend.
- Environment configuration is required; do not hard-code secrets.

## Troubleshooting

- "Failed to fetch" or network error:
  - Ensure `REACT_APP_BACKEND_URL` is set in `.env` and the backend is running.
  - Check CORS configuration on the FastAPI backend to allow the frontend origin.
  - Use the "Check API connectivity" button on the Home page to test reachability and view the configured backend URL.
- "Unexpected token < in JSON":
  - This usually means your frontend received HTML (e.g., index.html) instead of JSON. Verify `REACT_APP_BACKEND_URL`.
