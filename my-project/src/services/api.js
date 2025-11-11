import axios from "axios";

const API = axios.create({
  baseURL: "https://adventuretimecpt.onrender.com/api",
  withCredentials: true, // <--- allow sending cookies
});

// POSTS
export const createPost = (formData) =>
  API.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getPosts = () => API.get("/posts");
export const getUserPosts = (userId) => API.get(`/posts/user/${userId}`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// COMMENTS
export const addComment = (postId, comment) => API.post(`/posts/${postId}/comment`, comment);
export const deleteComment = (postId, commentId) =>
  API.delete(`/posts/${postId}/comment/${commentId}`);

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // user token from login
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
