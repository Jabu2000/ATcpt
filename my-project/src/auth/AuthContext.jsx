import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // while checking /me

  // On app mount, get current user from cookie
  useEffect(() => {
    let mounted = true;
    api.get("/auth/me")
      .then(res => {
        if (!mounted) return;
        setUser(res.data.user);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const register = async (form) => {
    const { data } = await api.post("/auth/register", form);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user)); // optional caching
    return data;
  };

  const login = async (form) => {
    const { data } = await api.post("/auth/login", form);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);