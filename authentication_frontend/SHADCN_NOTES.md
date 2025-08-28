shadcn/ui usage notes

This project uses TailwindCSS and shadcn-style utilities (cva/clsx). While the official shadcn CLI is not required, components can be added manually or via copy from shadcn/ui (React + Tailwind) and updated to use:
- class-variance-authority (cva)
- clsx
- tailwind-merge (optional)

If you add official shadcn/ui components, ensure their styles rely on Tailwind classes and that any necessary CSS variables are defined in globals if required.

When integrating auth flows, use src/lib/supabase.js and the getAuthEmailRedirectTo helper to set emailRedirectTo to REACT_APP_SITE_URL.
