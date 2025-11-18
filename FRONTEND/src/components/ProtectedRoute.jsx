// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { apiMe } from "../api/auth";
import Spinner from "./Spinner";

export default function ProtectedRoute({ allowRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const { user } = await apiMe();

        if (!user) {
          setAuthorized(false);
          return;
        }

        const role = user.role?.toLowerCase();

        // Role allowed?
        if (allowRoles.includes(role)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, [allowRoles]);

  if (loading) return <Spinner />;

  return authorized ? <Outlet /> : <Navigate to="/login" replace />;
}
