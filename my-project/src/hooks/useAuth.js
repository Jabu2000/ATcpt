import { useEffect, useState } from "react";
import api from "../lib/axios";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get("/auth/me")
      .then(res => mounted && setUser(res.data.user))
      .catch(() => mounted && setUser(null))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  return { user, loading };
}
