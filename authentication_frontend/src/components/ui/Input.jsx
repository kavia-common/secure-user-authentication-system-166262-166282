import React from "react";
import { cn } from "../../lib/utils";

// PUBLIC_INTERFACE
export function Input({ label, error, className, ...props }) {
  /** A reusable input with label and error text. */
  return (
    <div className="space-y-1">
      {label ? <label className="text-sm font-medium text-slate-700">{label}</label> : null}
      <input className={cn("input", error && "border-red-500 focus:ring-red-500", className)} {...props} />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
