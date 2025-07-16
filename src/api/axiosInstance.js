// 1.

import axios from "axios";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const axiosInstanceToken = axios.create({
  baseURL: `${urlBack}`
});

axiosInstanceToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const axiosInstance = axios.create({
  baseURL: `${urlBack}`,
});
