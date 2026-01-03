import axios from "axios";
import { getToken } from "./auth";

// Render backend URL (env) varsa onu kullan, yoksa local backend'e düş
const BASE =
  import.meta.env.VITE_API_URL?.trim() ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default api;