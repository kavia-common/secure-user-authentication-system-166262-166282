import React, { useState, useEffect } from 'react';
import './index.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element (for Tailwind dark mode toggling if used)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="card dark:card-dark w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold tracking-tight">Secure Auth</h1>
          <button
            className="btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          TailwindCSS and shadcn-style utilities are configured. Supabase client is ready via environment variables.
        </p>
        <div className="mt-4 space-y-2">
          <input className="input" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />
          <button className="btn w-full">Continue</button>
        </div>
      </div>
    </div>
  );
}

export default App;
