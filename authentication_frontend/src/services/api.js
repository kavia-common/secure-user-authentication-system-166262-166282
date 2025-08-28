const DEFAULT_BASE_URL = process.env.REACT_APP_BACKEND_URL || ""; // Optionally provided by environment

/**
 * Internal helper for fetch with JSON, error normalization.
 */
async function request(path, options = {}) {
  const base = DEFAULT_BASE_URL || "";
  const url = `${base}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const message =
        (data && (data.detail || data.message || data.error)) ||
        `Request failed with status ${res.status}`;
      return { ok: false, status: res.status, error: message, data };
    }

    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, error: err.message || "Network error" };
  }
}

// PUBLIC_INTERFACE
export async function apiSignup({ email, password }) {
  /** Calls backend signup endpoint. */
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// PUBLIC_INTERFACE
export async function apiSendVerificationCode({ email }) {
  /** Calls backend send verification code endpoint. */
  return request("/auth/send-code", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// PUBLIC_INTERFACE
export async function apiVerifyEmailCode({ email, code }) {
  /** Calls backend verify email endpoint. */
  return request("/auth/verify", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
}

// PUBLIC_INTERFACE
export async function apiSignin({ email, password }) {
  /** Calls backend signin endpoint. */
  return request("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// PUBLIC_INTERFACE
export async function apiForgotPassword({ email }) {
  /** Calls backend forgot password endpoint. */
  return request("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// PUBLIC_INTERFACE
export async function apiResetPassword({ email, code, new_password }) {
  /** Calls backend reset password endpoint. */
  return request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, code, new_password }),
  });
}
