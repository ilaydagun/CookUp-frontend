import axios from "axios";

const BASE =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
});

// Token getter fonksiyonu - AuthProvider tarafindan set edilecek
let tokenGetter = () => null;

export const setTokenGetter = (getter) => {
  tokenGetter = getter;
};

api.interceptors.request.use((config) => {
  const token = tokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

// 401 hatalarinda logout icin interceptor
let logoutHandler = () => {};

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutHandler();
    }
    return Promise.reject(error);
  }
);

export default api;
