import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormCard } from "../components/FormCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { isValidEmail, validatePasswordStrength, required } from "../lib/validation";
import { apiSignup } from "../services/api";

// PUBLIC_INTERFACE
export default function Signup() {
  /** Signup page: collects email and password, calls backend and forwards to verify page. */
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const e = {};
    const reqEmail = required(form.email, "Email");
    if (reqEmail) e.email = reqEmail;
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address";

    const reqPass = required(form.password, "Password");
    if (reqPass) e.password = reqPass;
    else {
      const strength = validatePasswordStrength(form.password);
      if (!strength.ok) e.password = `Password must meet: ${strength.issues.join(", ")}`;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    const res = await apiSignup({ email: form.email, password: form.password });
    setLoading(false);

    if (!res.ok) {
      setServerError(res.error || "Failed to sign up");
      return;
    }

    setSuccess("Account created. Please check your email for the verification code.");
    // Navigate to verification page pre-filling the email
    setTimeout(() => navigate(`/verify-email?email=${encodeURIComponent(form.email)}`), 600);
  };

  return (
    <FormCard
      title="Create your account"
      subtitle="Start by entering your email and a strong password."
      footer={
        <p className="text-sm text-slate-600">
          Already have an account? <Link className="text-primary underline" to="/signin">Sign in</Link>
        </p>
      }
    >
      {serverError ? <Alert variant="error" title="Sign up failed">{serverError}</Alert> : null}
      {success ? <Alert variant="success" title="Success">{success}</Alert> : null}

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
          {loading ? "Creating..." : "Create account"}
        </Button>
      </form>
    </FormCard>
  );
}
