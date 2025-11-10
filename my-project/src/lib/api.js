export const API = import.meta.env.VITE_API_BASE || "https://adventuretimecpt.onrender.com";

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
