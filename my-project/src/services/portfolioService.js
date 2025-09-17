import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Axios instance with auth + cookies
const API = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

// Add token if stored
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ---------------- SAVED ADVENTURES ----------------
export const getSavedAdventures = async () => {
  const { data } = await API.get("/saved");
  return data;
};

export const saveAdventure = async (type, refId, details) => {
  const { data } = await API.post("/saved", { type, refId, details });
  return data;
};

export const removeAdventure = async (type, refId) => {
  const { data } = await API.delete(`/saved/${type}/${refId}`);
  return data;
};

// ---------------- COMMENTS ----------------
export const addComment = async (type, refId, formData) => {
  const { data } = await API.post(`/${type}s/${refId}/comment`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteComment = async (type, refId, commentId) => {
  const { data } = await API.delete(`/${type}s/${refId}/comment/${commentId}`);
  return data;
};