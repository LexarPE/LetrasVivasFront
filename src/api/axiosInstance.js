// 1.


import axios from "axios";

const urlBack = import.meta.env.BACKEND_URL;

export const axiosInstanceToken = axios.create({
  baseURL: `${urlBack}/api`,
});

export const axiosInstance = axios.create({
  baseURL: `${urlBack}/api`,
});


