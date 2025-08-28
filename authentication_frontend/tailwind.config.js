/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#f59e42",
      },
      borderRadius: {
        lg: "12px",
      },
    },
  },
  plugins: [],
};
