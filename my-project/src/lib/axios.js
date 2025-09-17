import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // backend base URL
  withCredentials: true, // ✅ send cookies with every request
});



export default api;