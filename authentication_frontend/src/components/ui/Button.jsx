import React from "react";
import { cn } from "../../lib/utils";

// PUBLIC_INTERFACE
export function Button({ children, className, variant = "primary", type = "button", disabled = false, ...props }) {
  /** A reusable button component with variants. */
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";
  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button type={type} disabled={disabled} className={cn(base, variants[variant] || variants.primary, className)} {...props}>
      {children}
    </button>
  );
}
