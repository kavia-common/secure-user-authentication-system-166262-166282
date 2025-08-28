import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormCard } from "../components/FormCard";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { apiHealth, getCurrentBackendBaseUrl } from "../services/api";

// PUBLIC_INTERFACE
export default function Home() {
  /** Simple home page linking to main auth routes with an API connectivity check. */
  const [checking, setChecking] = useState(false);
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");

  const onCheck = async () => {
    setChecking(true);
    setHealth(null);
    setError("");
    const res = await apiHealth();
    setChecking(false);
    if (!res.ok) {
      setError(res.error || "Failed to reach backend");
    } else {
      setHealth(res.data || { message: "OK" });
    }
  };

  const backendUrl = getCurrentBackendBaseUrl();

  return (
    <FormCard
      title="Secure Auth"
      subtitle="Choose an action to get started."
      footer={
        <div className="text-sm text-slate-600 space-y-1">
          <div>This demo integrates a FastAPI backend and Supabase for auth flows.</div>
          <div>
            Backend URL: <span className="font-mono">{backendUrl || "(not configured)"}</span>
          </div>
        </div>
      }
    >
      {error ? (
        <Alert variant="error" title="Connectivity issue">
          {error}
        </Alert>
      ) : null}
      {health ? (
        <Alert variant="success" title="Backend healthy">
          {typeof health === "string" ? health : health.message || "OK"}
        </Alert>
      ) : null}

      <div className="grid grid-cols-1 gap-2">
        <Link className="btn w-full" to="/signup">Create account</Link>
        <Link className="btn w-full" to="/signin">Sign in</Link>
        <Link className="btn w-full" to="/forgot-password">Forgot password</Link>
        <Button className="w-full" onClick={onCheck} disabled={checking}>
          {checking ? "Checking..." : "Check API connectivity"}
        </Button>
      </div>
    </FormCard>
  );
}
