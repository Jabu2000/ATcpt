import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. https://adventure-backend.onrender.com/api
  withCredentials: true,                 // allow secure cookie auth
});

export default api;
