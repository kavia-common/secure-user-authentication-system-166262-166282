import React, { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FormCard } from "../components/FormCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { required, isValidEmail, validatePasswordStrength } from "../lib/validation";
import { apiResetPassword } from "../services/api";

// PUBLIC_INTERFACE
export default function ResetPassword() {
  /** Reset password page using email + code + new password. */
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialEmail = params.get("email") || "";

  const [form, setForm] = useState({ email: initialEmail, code: "", new_password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    const reqEmail = required(form.email, "Email");
    if (reqEmail) e.email = reqEmail;
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address";
    const reqCode = required(form.code, "Reset code");
    if (reqCode) e.code = reqCode;
    const reqPass = required(form.new_password, "New password");
    if (reqPass) e.new_password = reqPass;
    else {
      const strength = validatePasswordStrength(form.new_password);
      if (!strength.ok) e.new_password = `Password must meet: ${strength.issues.join(", ")}`;
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
    const res = await apiResetPassword({ email: form.email, code: form.code, new_password: form.new_password });
    setLoading(false);

    if (!res.ok) {
      setServerError(res.error || "Password reset failed");
      return;
    }

    setSuccess("Password reset successful. You can now sign in.");
  };

  return (
    <FormCard
      title="Reset password"
      subtitle="Enter the reset code and your new password."
      footer={<p className="text-sm text-slate-600">Return to <Link className="text-primary underline" to="/signin">Sign in</Link></p>}
    >
      {serverError ? <Alert variant="error" title="Reset failed">{serverError}</Alert> : null}
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
          label="Reset code"
          placeholder="Enter code"
          value={form.code}
          onChange={onChange}
          error={errors.code}
        />
        <Input
          name="new_password"
          label="New password"
          type="password"
          placeholder="••••••••"
          value={form.new_password}
          onChange={onChange}
          error={errors.new_password}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </FormCard>
  );
}
