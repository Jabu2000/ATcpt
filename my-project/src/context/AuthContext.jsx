import React, { createContext, useEffect, useState } from "react";
import { API } from "../lib/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/auth/me`, { credentials: "include" });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
}