import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // optional: call a /me endpoint; here we just mark ready
    setReady(true);
  }, []);

  const logout = async () => {
    await fetch((import.meta.env.VITE_API_URL || "http://localhost:4000") + "/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, setUser, ready, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}