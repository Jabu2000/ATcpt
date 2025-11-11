import axios from "axios";

const api = axios.create({
  baseURL: "https://adventuretimecpt.onrender.com", // backend base URL
  withCredentials: true, // ✅ send cookies with every request
});



export default api;
