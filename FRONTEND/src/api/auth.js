// src/api/auth.js
import { httpRequest } from "./http";

/**
 * LOGIN USER
 * Stores token + role in localStorage
 */
export async function apiLogin({ email, password }) {
  const res = await httpRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Save token & role
  if (res.token) {
    localStorage.setItem("auth_token", res.token);
  }
  if (res.user?.role) {
    localStorage.setItem("auth_role", res.user.role.toLowerCase());
  }

  return res;
}

/**
 * REGISTER USER
 */
export async function apiRegister(data) {
  return await httpRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * ME (GET LOGGED-IN USER)
 * Always returns { user }
 */
export async function apiMe() {
  const res = await httpRequest("/auth/me", {
    method: "GET",
  });

  // Normalize output -> always return { user }
  return {
    user: res.user || res,
  };
}

/**
 * LOGOUT USER
 */
export function apiLogout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_role");
}
// Update logged-in user's profile
export async function apiUpdateMe(data) {
  return httpRequest("/auth/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
