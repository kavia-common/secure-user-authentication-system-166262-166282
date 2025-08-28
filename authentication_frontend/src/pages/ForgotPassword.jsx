import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormCard } from "../components/FormCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { required, isValidEmail } from "../lib/validation";
import { apiForgotPassword } from "../services/api";

// PUBLIC_INTERFACE
export default function ForgotPassword() {
  /** Forgot password page to trigger reset email/code. */
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ email: e.target.value });

  const validate = () => {
    const e = {};
    const reqEmail = required(form.email, "Email");
    if (reqEmail) e.email = reqEmail;
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    const res = await apiForgotPassword({ email: form.email });
    setLoading(false);

    if (!res.ok) {
      setServerError(res.error || "Failed to initiate password reset");
      return;
    }

    setSuccess("If the email exists, a reset code has been sent.");
    setTimeout(() => navigate(`/reset-password?email=${encodeURIComponent(form.email)}`), 600);
  };

  return (
    <FormCard
      title="Forgot password"
      subtitle="Enter your email to receive a reset code."
      footer={<p className="text-sm text-slate-600">Remembered it? <Link className="text-primary underline" to="/signin">Back to sign in</Link></p>}
    >
      {serverError ? <Alert variant="error" title="Request failed">{serverError}</Alert> : null}
      {success ? <Alert variant="success" title="Email sent">{success}</Alert> : null}
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send reset code"}
        </Button>
      </form>
    </FormCard>
  );
}
