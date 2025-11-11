export const API = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function apiFetch(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: opts.body instanceof FormData ? {} : { "Content-Type": "application/json" },
    ...opts,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw data || new Error("API error");
  return data;
}
