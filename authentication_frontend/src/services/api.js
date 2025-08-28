/**
 * NOTE FOR DEVELOPERS:
 * If you see errors like 'Unexpected token < in JSON at position 0', it indicates
 * the response was HTML (often the frontend dev server index.html) instead of JSON.
 * Ensure REACT_APP_BACKEND_URL points to your FastAPI backend origin (e.g., http://localhost:8000
 * or https://vscode-internal-34468-beta.beta01.cloud.kavia.ai:3001). The request() helper below
 * has been hardened to detect non-JSON responses and surface helpful hints.
 */
const RAW_BASE_URL = process.env.REACT_APP_BACKEND_URL || ""; // Optionally provided by environment

/**
 * Normalize the backend base URL:
 * - trims whitespace
 * - removes trailing slash
 */
function getBackendBaseUrl() {
  const b = (RAW_BASE_URL || "").trim();
  if (!b) return "";
  return b.endsWith("/") ? b.slice(0, -1) : b;
}

/**
 * PUBLIC_INTERFACE
 */
export function getCurrentBackendBaseUrl() {
  /** Returns the normalized backend base URL used by the API client. */
  return getBackendBaseUrl();
}

/**
 * Internal helper for fetch with JSON, error normalization.
 * - Uses Content-Type header to decide JSON parsing.
 * - Returns helpful error messages for HTML/text responses (e.g., served by frontend dev server).
 * - Detects missing base URL and provides actionable guidance.
 */
async function request(path, options = {}) {
  const base = getBackendBaseUrl();

  if (!base) {
    return {
      ok: false,
      status: 0,
      error:
        "Backend URL is not configured. Set REACT_APP_BACKEND_URL in .env to your FastAPI backend (e.g., http://localhost:8000). See ENV_CHECKLIST.md.",
    };
  }

  // Ensure path begins with a single slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${normalizedPath}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });

    // Determine content type to parse appropriately
    const contentType = res.headers.get("content-type") || "";
    let parsed = null;
    let rawText = null;

    if (contentType.includes("application/json")) {
      // Safe JSON parsing
      try {
        parsed = await res.json();
      } catch (e) {
        // Fall back to text for diagnostics if JSON parsing fails
        rawText = await res.text();
      }
    } else {
      // Not JSON: read as text (often HTML error page or proxy response)
      rawText = await res.text();
    }

    if (!res.ok) {
      const serverMsg =
        (parsed && (parsed.detail || parsed.message || parsed.error)) ||
        (rawText && rawText.slice(0, 200)) || // show snippet of non-JSON response
        `Request failed with status ${res.status}`;

      // Detect common misconfigurations: HTML from frontend dev server or 404 HTML
      const looksLikeHtml =
        (rawText || "").trim().startsWith("<!DOCTYPE") ||
        (rawText || "").trim().startsWith("<html");
      const hint = looksLikeHtml
        ? `Received HTML instead of JSON from ${url}. Check REACT_APP_BACKEND_URL (${base}) and that the backend is reachable and CORS is configured.`
        : "";

      return {
        ok: false,
        status: res.status,
        error: hint ? `${serverMsg}. ${hint}` : serverMsg,
        data: parsed || null,
        raw: rawText || null,
      };
    }

    // Success path
    // Some successful endpoints may return 204 No Content
    if (res.status === 204) {
      return { ok: true, status: res.status, data: null };
    }

    if (parsed !== null) {
      return { ok: true, status: res.status, data: parsed };
    }

    // If content-type was not JSON yet res.ok, return raw as info
    return { ok: true, status: res.status, data: rawText };
  } catch (err) {
    // Network or CORS failure will appear here
    const networkMsg =
      err && err.message ? err.message : "Network error occurred.";

    // Provide CORS guidance when running on different origins
    const corsHint =
      " This may be due to CORS or an unreachable backend. Ensure the backend is running and configured to allow the frontend origin.";

    return {
      ok: false,
      status: 0,
      error: `${networkMsg}.${corsHint} URL attempted: ${getBackendBaseUrl()}`,
    };
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

// PUBLIC_INTERFACE
export async function apiHealth() {
  /** Simple health check for debugging backend connectivity. */
  return request("/", { method: "GET" });
}
