// 2.



import { axiosInstanceToken } from "./axiosInstance";

// Envia el token de autorización en las solicitudes
axiosInstanceToken.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
