import React, { useMemo, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FormCard } from "../components/FormCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { required, isValidEmail } from "../lib/validation";
import { apiSendVerificationCode, apiVerifyEmailCode } from "../services/api";

// PUBLIC_INTERFACE
export default function VerifyEmail() {
  /** Verify email using a code sent to email, with ability to resend code. */
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialEmail = params.get("email") || "";

  const [form, setForm] = useState({ email: initialEmail, code: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    const reqEmail = required(form.email, "Email");
    if (reqEmail) e.email = reqEmail;
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address";
    const reqCode = required(form.code, "Verification code");
    if (reqCode) e.code = reqCode;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    const res = await apiVerifyEmailCode({ email: form.email, code: form.code });
    setLoading(false);

    if (!res.ok) {
      setServerError(res.error || "Verification failed");
      return;
    }
    setSuccess("Email verified. You can now sign in.");
    setTimeout(() => navigate("/signin"), 600);
  };

  const onResend = async () => {
    setServerError("");
    setSuccess("");
    const e = {};
    if (!form.email) e.email = "Email is required to resend";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setResending(true);
    const res = await apiSendVerificationCode({ email: form.email });
    setResending(false);

    if (!res.ok) {
      setServerError(res.error || "Failed to resend verification email");
      return;
    }
    setSuccess("Verification email sent again.");
  };

  return (
    <FormCard
      title="Verify your email"
      subtitle="Enter the verification code sent to your inbox."
      footer={<p className="text-sm text-slate-600">Return to <Link className="text-primary underline" to="/signin">Sign in</Link></p>}
    >
      {serverError ? <Alert variant="error" title="Verification failed">{serverError}</Alert> : null}
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
          name="code"
          label="Verification code"
          placeholder="Enter code"
          value={form.code}
          onChange={onChange}
          error={errors.code}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify email"}
        </Button>
      </form>

      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-slate-600">Didn't receive a code?</span>
        <Button variant="secondary" onClick={onResend} disabled={resending}>
          {resending ? "Sending..." : "Resend code"}
        </Button>
      </div>
    </FormCard>
  );
}
