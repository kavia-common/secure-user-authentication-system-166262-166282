import React from "react";
import { Link } from "react-router-dom";
import { FormCard } from "../components/FormCard";

// PUBLIC_INTERFACE
export default function Home() {
  /** Simple home page linking to main auth routes. */
  return (
    <FormCard
      title="Secure Auth"
      subtitle="Choose an action to get started."
      footer={
        <div className="text-sm text-slate-600">
          This demo integrates a FastAPI backend and Supabase for auth flows.
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-2">
        <Link className="btn w-full" to="/signup">Create account</Link>
        <Link className="btn w-full" to="/signin">Sign in</Link>
        <Link className="btn w-full" to="/forgot-password">Forgot password</Link>
      </div>
    </FormCard>
  );
}
