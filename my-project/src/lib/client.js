import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const client = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // keep cookies behavior if you use them
});

// Attach Bearer token automatically if present
client.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default client;

// -- convenient endpoints exported as helpers --
// Use named exports from this file for common operations (optional)
export const postsApi = {
  createPost: (formData) =>
    client.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getPosts: () => client.get("/posts"),
  getUserPosts: (userId) => client.get(`/posts/user/${userId}`),
  deletePost: (id) => client.delete(`/posts/${id}`),
  addComment: (postId, comment) =>
    client.post(`/posts/${postId}/comment`, comment), // comment as { text }
  deleteComment: (postId, commentId) =>
    client.delete(`/posts/${postId}/comment/${commentId}`),
};

export const savedApi = {
  getSaved: () => client.get("/saved"),
  saveAdventure: (payload) => client.post("/saved", payload),
  removeAdventure: (type, refId) => client.delete(`/saved/${type}/${refId}`),
};

export const restaurantsApi = {
  list: () => client.get("/restaurants"),
  get: (id) => client.get(`/restaurants/${id}`),
  addComment: (restaurantId, payload) =>
    client.post(`/restaurants/${restaurantId}/comment`, payload),
  deleteComment: (restaurantId, commentId) =>
    client.delete(`/restaurants/${restaurantId}/comment/${commentId}`),
};