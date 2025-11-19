import axios from "axios";

const API = axios.create({
  baseURL: "https://adventuretimecpt.onrender.com/api",
  withCredentials: true, // include cookies for auth
});

export default API;