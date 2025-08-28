import React from "react";
import { cn } from "../../lib/utils";

// PUBLIC_INTERFACE
export function Alert({ title, children, variant = "info", className }) {
  /** A reusable alert banner with variants. */
  const variants = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div className={cn("border rounded-md p-3", variants[variant], className)}>
      {title ? <div className="font-medium mb-0.5">{title}</div> : null}
      {children ? <div className="text-sm">{children}</div> : null}
    </div>
  );
}
