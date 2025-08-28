import React from "react";
import { cn } from "../lib/utils";

// PUBLIC_INTERFACE
export function FormCard({ title, subtitle, children, footer, className }) {
  /** A card wrapper for authentication forms with title and subtitle. */
  return (
    <div className={cn("card w-full max-w-md", className)}>
      {title || subtitle ? (
        <div className="mb-4">
          {title ? <h1 className="text-xl font-semibold tracking-tight">{title}</h1> : null}
          {subtitle ? <p className="text-sm text-slate-600 mt-1">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className="space-y-4">{children}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}
