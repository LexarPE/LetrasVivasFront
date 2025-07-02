// 1.


import axios from "axios";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const axiosInstanceToken = axios.create({
  baseURL: `${urlBack}`,
});

export const axiosInstance = axios.create({
  baseURL: `${urlBack}`,
});


