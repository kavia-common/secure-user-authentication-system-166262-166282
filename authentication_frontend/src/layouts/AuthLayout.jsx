import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function AuthLayout() {
  /** Layout wrapper for auth pages with theme toggle. */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Secure Auth
          </Link>
          <button className="btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
