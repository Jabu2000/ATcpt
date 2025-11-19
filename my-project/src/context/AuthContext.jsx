import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => mounted && setUser(res.data.user))
        .catch(() => mounted && setUser(null))
        .finally(() => mounted && setLoading(false));
    } else {
      setLoading(false);
    }
    return () => { mounted = false; };
  }, []);

  const register = async (form) => {
    const { data } = await api.post("/auth/register", form);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    return data;
  };

  const login = async (form) => {
    const { data } = await api.post("/auth/login", form);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    return data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);