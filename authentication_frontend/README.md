# React Authentication Frontend (Tailwind + shadcn/ui ready)

This app is configured with TailwindCSS and shadcn-style utilities, and integrates Supabase Auth via a client helper.

## Quick Start

1. Install dependencies:
   - npm install

2. Configure environment:
   - cp .env.example .env
   - Fill in REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SITE_URL

3. Start dev server:
   - npm start

## Styling

- TailwindCSS is configured (see tailwind.config.js, postcss.config.js).
- Utility classes in src/index.css; reusable component classes like `.card`, `.btn`, `.input`.
- shadcn-style helpers available via class-variance-authority (cva) and clsx.

## Supabase

Use the client from `src/lib/supabase.js`:

```js
import { getSupabaseClient, getAuthEmailRedirectTo } from "./lib/supabase";

const supabase = getSupabaseClient();
const redirectTo = getAuthEmailRedirectTo("/auth/callback");
```

See `assets/supabase.md` for more details.
