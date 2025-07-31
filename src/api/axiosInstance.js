// 1.

import axios from "axios";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const axiosInstanceToken = axios.create({
  baseURL: `${urlBack}`
});

axiosInstanceToken.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem("sesion"))
    if (token.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const axiosInstance = axios.create({
  baseURL: `${urlBack}`,
});
