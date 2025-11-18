// src/api/http.js

// Always call the correct backend API
const API_BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_PUBLIC_API_BASE)
    ? import.meta.env.VITE_PUBLIC_API_BASE
    : "http://localhost:5000/api";   // ✅ FIXED fallback

const API_KEY =
  (typeof import.meta !== "undefined" && import.meta.env)
    ? import.meta.env.VITE_PUBLIC_API_KEY
    : "";

// get token
function getAuthToken() {
  return localStorage.getItem("auth_token") || "";
}

export async function httpRequest(path, options = {}) {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
  };

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs || 15000
  );

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message =
      (isJson && data && data.message) ? data.message : res.statusText;
    throw new Error(message || "Request failed");
  }

  return data;
}
