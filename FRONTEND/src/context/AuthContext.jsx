import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiMe, apiLogout } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setUser(null);
        } else {
          const data = await apiMe();
          if (active) setUser(data.user || null);
        }
      } catch (_e) {
        setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  function logout() {
    apiLogout();
    setUser(null);
  }

  const value = useMemo(() => ({ user, setUser, loading, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


