import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormCard } from "../components/FormCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { isValidEmail, required } from "../lib/validation";
import { apiSignin } from "../services/api";

// PUBLIC_INTERFACE
export default function Signin() {
  /** Sign in page using email and password. */
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    const reqEmail = required(form.email, "Email");
    if (reqEmail) e.email = reqEmail;
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address";
    const reqPass = required(form.password, "Password");
    if (reqPass) e.password = reqPass;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setTokenInfo(null);
    if (!validate()) return;

    setLoading(true);
    const res = await apiSignin({ email: form.email, password: form.password });
    setLoading(false);

    if (!res.ok) {
      setServerError(res.error || "Sign in failed");
      return;
    }

    setTokenInfo(res.data);
  };

  return (
    <FormCard
      title="Welcome back"
      subtitle="Sign in to your account"
      footer={
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>New here? <Link className="text-primary underline" to="/signup">Create an account</Link></span>
          <Link className="text-primary underline" to="/forgot-password">Forgot password?</Link>
        </div>
      }
    >
      {serverError ? <Alert variant="error" title="Sign in failed">{serverError}</Alert> : null}
      {tokenInfo ? (
        <Alert variant="success" title="Signed in">
          Your token has been received. Store it securely on the client (e.g., httpOnly cookie).<br />
          token_type: {tokenInfo.token_type || "bearer"}
        </Alert>
      ) : null}

      <form className="space-y-3" onSubmit={onSubmit} noValidate>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          error={errors.email}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={onChange}
          error={errors.password}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </FormCard>
  );
}
