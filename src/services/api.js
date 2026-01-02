import axios from "axios";
import { getToken } from "./auth";

// 1) Eğer .env ile verirsen onu kullanır
// 2) Yoksa dev'de proxy ile "/api" kullanır
const BASE = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
