# React Authentication Frontend (Tailwind + shadcn/ui ready)

This app provides a complete authentication flow with React Router, reusable UI components, validation utilities, and a central API service that talks to the FastAPI backend.

## Quick Start

1. Install dependencies:
   - npm install

2. Configure environment:
   - cp .env.example .env
   - Fill in:
     - REACT_APP_SUPABASE_URL
     - REACT_APP_SUPABASE_ANON_KEY
     - REACT_APP_SITE_URL (optional for local dev)
     - REACT_APP_BACKEND_URL (e.g., http://localhost:8000)

3. Start dev server:
   - npm start

## Routes

- /              Home
- /signup        Create account
- /verify-email  Verify email with code
- /signin        Sign in
- /forgot-password Initiate password reset
- /reset-password  Reset password via email + code

## Components

- src/components/FormCard.jsx
- src/components/ui/Button.jsx
- src/components/ui/Input.jsx
- src/components/ui/Alert.jsx

## Validation

- src/lib/validation.js provides basic validators for required, email format, password strength.

## API Service

- src/services/api.js centralizes all backend calls (signup, send code, verify, signin, forgot, reset).
- Configure REACT_APP_BACKEND_URL to point to your FastAPI backend root.

## Supabase

Use the client from `src/lib/supabase.js` if needed in future features (social logins, session handling, etc.):

```js
import { getSupabaseClient, getAuthEmailRedirectTo } from "./lib/supabase";

const supabase = getSupabaseClient();
const redirectTo = getAuthEmailRedirectTo("/auth/callback");
```

See `assets/supabase.md` for more details.
