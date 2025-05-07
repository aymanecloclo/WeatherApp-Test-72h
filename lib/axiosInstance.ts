// lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export default axiosInstance;
